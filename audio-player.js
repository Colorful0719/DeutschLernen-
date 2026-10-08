'use strict';
(function(){
  const player = new Audio();
  player.preload = 'auto';
  let sequence = 0;
  const nativeSpeak = window.speakGerman;
  const originalStop = window.stopAllAudio;
  function stopFile(){
    sequence++;
    player.onended = null;
    player.onerror = null;
    player.onplaying = null;
    player.pause();
  }
  window.stopAllAudio = function(silent=false){
    stopFile();
    if (typeof originalStop === 'function') originalStop(silent);
  };
  window.speakGerman = function(text, callback=null){
    const file = window.GERMAN_AUDIO_FILES[String(text)];
    stopFile();
    if (typeof cancelGermanSpeech === 'function') cancelGermanSpeech();
    if (!file) { nativeSpeak(text,callback);return; }
    const request = sequence;
    player.src = file;
    const rate = document.getElementById('playbackRate');
    player.playbackRate = rate ? Number(rate.value) : .9;
    player.volume = 1;
    const status = message => {const el=document.getElementById('audio-status');if(el)el.textContent=message;};
    const fail = () => {
      if(request!==sequence)return;
      window.stopAllAudio(true);
      status('音檔未能播放，請確認 audio 資料夾已完整上傳，再點一次朗讀');
    };
    player.onplaying = () => {if(request===sequence)status('正在播放德語音檔');};
    player.onended = () => {
      if(request!==sequence)return;
      status('朗讀完成');
      if(callback)callback();
    };
    player.onerror = fail;
    status('正在載入德語音檔');
    // Start directly within the tap handler and reuse the same audio element.
    const pending = player.play();
    if(pending)pending.catch(fail);
  };
})();

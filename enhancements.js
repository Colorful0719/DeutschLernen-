'use strict';
let audioSession=0;
function stopAllAudio(silent=false){
  // Cancel sequential playback flags before cancelling the active utterance.
  audioSession++;
  isPlayingAZ = false;
  isPlayingNumbers = false;
  for(const [id,text] of [['btn-play-all-az','連續朗讀 A-Z'],['btn-play-all-num','連續朗讀 1–30'],['play-full-dialogue-btn','播放完整對話']]){
    const btn=document.getElementById(id);if(btn){btn.disabled=false;btn.textContent=text;}
  }
  document.querySelectorAll('#classroom-words-table-body tr').forEach(el=>el.classList.remove('bg-orange-100/70'));
  document.querySelectorAll('#dialogue-messages-feed > div').forEach(el=>el.classList.remove('ring-2','ring-orange-400','rounded-2xl'));
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  if (!silent) document.getElementById('audio-status').textContent='已停止朗讀。';
}
const outcomeItems=[
 ['feedback','學生電子回饋單','完成課程要求的電子回饋。'],
 ['report','結案報告','彙整見習活動、學習紀錄與成果。'],
 ['exhibition','成果展／靜態展','展出地點：校內／德國文化中心。'],
 ['poster','田野調查研究海報','包含研究問題、研究方法與過程、研究發現、結論建議。']
];
QUIZ_DATA[1]={category:'參訪禮儀',question:'在幼兒園參訪時，拍照前應怎麼做？',audioCue:'Dürfen wir ein Foto machen?',options:['直接拍攝並上傳','依園方規範，先取得必要同意','只要用手機就可以拍','只要不開閃光燈就可以拍'],answer:1,explain:'先詢問園方，遵守現場拍攝與使用照片的規範。原網站的幼兒園對話中，園方明確要求不要拍攝孩童的臉。'};
QUIZ_DATA.push(
 {category:'簡報文法',question:'Ich gebe dir ein Buch. 句中的 dir 是哪個格？',audioCue:'Ich gebe dir ein Buch.',options:['主格 Nominativ','受格 Akkusativ','與格 Dativ','屬格 Genitiv'],answer:2,explain:'dir 是 du 的與格，表示接受這本書的人。ein Buch 是直接受詞。'},
 {category:'跳蚤市場',question:'Fünf Euro fünfzig. 表示多少錢？',audioCue:'Fünf Euro fünfzig.',options:['5,05 €','5,50 €','50,00 €','55,00 €'],answer:1,explain:'五歐元五十分，金額寫作 5,50 €。'},
 {category:'日期時間',question:'halb neun 是幾點？',audioCue:'halb neun',options:['08:15','08:30','09:30','09:45'],answer:1,explain:'德語的 halb neun 表示距離九點還有半小時，即八點半。'}
);
let outcomeState={};
try{const v=JSON.parse(localStorage.getItem('deutsch_outcomes_v1'));if(v&&typeof v==='object'&&!Array.isArray(v))outcomeState=v;}catch{}
function updateOutcomeProgress(){document.getElementById('outcome-progress').textContent=`已完成 ${outcomeItems.filter(([id])=>outcomeState[id]).length} / ${outcomeItems.length} 項`;}
function renderOutcomes(){
 const wrap=document.getElementById('outcome-checklist');
 for(const [id,title,note] of outcomeItems){
  const label=document.createElement('label');label.className='outcome-row';
  const input=document.createElement('input');input.type='checkbox';input.checked=!!outcomeState[id];
  const words=document.createElement('span');const strong=document.createElement('strong');strong.textContent=title;
  const p=document.createElement('p');p.textContent=note;words.append(strong,p);label.append(input,words);wrap.append(label);
  input.addEventListener('change',()=>{outcomeState[id]=input.checked;try{localStorage.setItem('deutsch_outcomes_v1',JSON.stringify(outcomeState));}catch{document.getElementById('audio-status').textContent='瀏覽器無法儲存勾選狀態，此次勾選僅保留於目前頁面。';}updateOutcomeProgress();});
 }updateOutcomeProgress();
}
window.addEventListener('DOMContentLoaded',()=>{
 renderOutcomes();
 document.querySelectorAll('button').forEach(b=>{
   if (!b.textContent.replace(/[\uE000-\uF8FF]/g,'').trim() && !b.getAttribute('aria-label')) {
     const action=b.getAttribute('onclick')||'';
     b.setAttribute('aria-label',action.includes('prevFlashcard')?'上一張單字卡':action.includes('nextFlashcard')?'下一張單字卡':b.getAttribute('title')||'朗讀德語');
   }
 });
 document.getElementById('quiz-score-badge').textContent=`0 / ${QUIZ_DATA.length}`;
 const requested=location.hash.slice(1).replace(/^tab-/,'');
 switchTab(document.getElementById('tab-'+requested)?requested:'overview');
 // Retain the original speech/card interactions, with keyboard access.
 document.querySelectorAll('main div, main tr, header [onclick]').forEach(el=>{
  if (typeof el.onclick !== 'function' || /^(BUTTON|A|INPUT|SELECT)$/.test(el.tagName)) return;
  el.tabIndex=0;el.setAttribute('role','button');
  el.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();el.click();}});
 });
 const observer=new MutationObserver(records=>{
  for(const record of records)for(const node of record.addedNodes){
   if(node.nodeType!==1)continue;
   const nodes=[node,...node.querySelectorAll('*')];
   for(const el of nodes)if(typeof el.onclick === 'function'&&!/^(BUTTON|A|INPUT|SELECT)$/.test(el.tagName)&&!el.hasAttribute('tabindex')){
    el.tabIndex=0;el.setAttribute('role','button');el.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();el.click();}});
   }
  }
 });observer.observe(document.getElementById('main-content'),{subtree:true,childList:true});
});
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1).replace(/^tab-/,'');if(document.getElementById('tab-'+id))switchTab(id);});

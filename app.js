const lessons = [
 {day:"DAY 01",title:"打招呼與自我介紹",sw:"Habari! Unaitwa nani?",zh:"你好！你叫什麼名字？",pron:"ha-BA-ri · u-na-I-twa NA-ni",reply:"Ninaitwa Pan. Nafurahi kukutana nawe.",replyZh:"我叫 Pan，很高興認識你。",grammar:"Unaitwa nani? 是自然常用的「你叫什麼名字？」。Ninaitwa 是「我叫／我被稱為」。"},
 {day:"DAY 02",title:"介紹我的家庭",sw:"Huyu ni mama yangu.",zh:"這是我的媽媽。",pron:"HU-yu ni MA-ma YAN-gu",reply:"Hii ni familia yangu.",replyZh:"這是我的家庭。",grammar:"Huyu 常用來指稱人（這位）；yangu 表示「我的」，會依名詞類別搭配。"},
 {day:"DAY 03",title:"在商店購物",sw:"Hii ni bei gani?",zh:"這個多少錢？",pron:"HI-i ni BE-i GA-ni",reply:"Ni shilingi mia tano.",replyZh:"五百先令。",grammar:"Hii 是「這個」；bei gani 是「什麼價格／多少錢」。實際購物時可搭配手勢指物。"},
 {day:"DAY 04",title:"搭車與問路",sw:"Nataka kwenda mjini.",zh:"我想去市中心。",pron:"na-TA-ka KWEN-da m-JI-ni",reply:"Gari linaondoka saa ngapi?",replyZh:"車子幾點出發？",grammar:"Nataka + 動詞表示「我想要……」。肯亞交通情境也常聽到 matatu（小巴）。"},
 {day:"DAY 05",title:"食物與點餐",sw:"Naomba maji, tafadhali.",zh:"麻煩請給我水。",pron:"na-OM-ba MA-ji ta-fa-DHA-li",reply:"Ungependa kula nini?",replyZh:"你想吃什麼？",grammar:"Naomba 是禮貌的「我想請求／麻煩給我」；tafadhali 是「請」。"},
 {day:"DAY 06",title:"職場初次見面",sw:"Ninafurahi kufanya kazi nawe.",zh:"我很高興與你共事。",pron:"ni-na-fu-RA-hi ku-FA-nya KA-zi NA-we",reply:"Tuna mkutano leo.",replyZh:"我們今天有會議。",grammar:"nawe 是「和你」；kazi 是工作。這是禮貌、適合職場的表達。"}
];
const $ = id => document.getElementById(id);
let current = 0, mode = "listen";
let saved = JSON.parse(localStorage.getItem("jk-progress") || '{"done":[],"xp":0}');
function persist(){localStorage.setItem("jk-progress",JSON.stringify(saved));renderStats();}
function renderStats(){
 $("xpValue").textContent=saved.xp; $("completedValue").textContent=saved.done.length;
 $("progressXp").textContent=saved.xp; $("progressLessons").textContent=saved.done.length;
 $("progressWords").textContent=saved.done.length;
 $("completedList").innerHTML=lessons.map((l,i)=>`<div class="completed-row"><span>${l.title}</span><span class="${saved.done.includes(i)?'done-tag':''}">${saved.done.includes(i)?'✓ 已完成':'待學習'}</span></div>`).join("");
 $("chapterList").innerHTML=lessons.map((l,i)=>`<div class="chapter"><span class="chapter-icon">${["👋","🏡","🛍️","🚌","🍲","💼"][i]}</span><div class="chapter-info"><strong>${l.title}</strong><small>${l.day} · ${saved.done.includes(i)?"已完成":"待解鎖／可先練習"}</small></div><button data-open="${i}">前往</button></div>`).join("");
 document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>{current=Number(b.dataset.open);showTab("today");renderLesson();}));
}
function renderLesson(){
 const l=lessons[current];
 $("lessonDay").textContent=l.day+" · 肯亞生活 Kiswahili"; $("lessonNumber").textContent=`${current+1} / ${lessons.length}`;
 $("lessonProgress").style.width=((current+1)/lessons.length*100)+"%";
 $("lessonTitle").textContent=l.title; $("swahiliPhrase").textContent=l.sw; $("chineseMeaning").textContent=l.zh;
 $("pronunciation").textContent="發音提示："+l.pron; $("replyPhrase").textContent=l.reply; $("replyMeaning").textContent=l.replyZh;
 $("completeLesson").textContent=saved.done.includes(current)?"已完成 ✓":"完成本課＋20 XP";
 $("completeLesson").disabled=saved.done.includes(current);
 $("prevLesson").disabled=current===0; $("nextLesson").disabled=current===lessons.length-1;
 $("grammarTip").textContent=l.grammar; $("grammarTip").hidden=true; $("revealGrammar").textContent="查看句型提示＋";
 $("speechResult").textContent="尚未開始錄音";
}
function showTab(name){
 document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===name));
 ["today","map","progress"].forEach(t=>$(t+"Panel").hidden=t!==name);
}
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>showTab(b.dataset.tab)));
document.querySelectorAll(".mode").forEach(b=>b.addEventListener("click",()=>{
 mode=b.dataset.mode;document.querySelectorAll(".mode").forEach(x=>x.classList.toggle("active",x===b));
 $("speakArea").hidden=mode!=="speak";$("readArea").hidden=mode!=="read";
 $("phraseLabel").textContent=mode==="listen"?"先聽史瓦希利語":mode==="speak"?"請跟著說一次":"閱讀並理解句子";
}));
function speak(rate=0.9){
 if(!("speechSynthesis" in window)){ $("voiceNote").textContent="此瀏覽器不支援語音播放，請使用文字跟讀。";return; }
 speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(lessons[current].sw);u.lang="sw-KE";u.rate=rate;
 const voices=speechSynthesis.getVoices();const v=voices.find(x=>x.lang.toLowerCase().startsWith("sw"));
 if(v)u.voice=v;else $("voiceNote").textContent="裝置目前沒有找到 Kiswahili 語音，將使用系統可用語音；建議日後加入肯亞母語者錄音。";
 speechSynthesis.speak(u);
}
$("playBtn").addEventListener("click",()=>speak(.9));$("slowBtn").addEventListener("click",()=>speak(.68));
$("prevLesson").addEventListener("click",()=>{if(current>0){current--;renderLesson();}});
$("nextLesson").addEventListener("click",()=>{if(current<lessons.length-1){current++;renderLesson();}});
$("completeLesson").addEventListener("click",()=>{if(!saved.done.includes(current)){saved.done.push(current);saved.xp+=20;persist();renderLesson();}});
$("revealGrammar").addEventListener("click",()=>{$("grammarTip").hidden=!$("grammarTip").hidden;$("revealGrammar").textContent=$("grammarTip").hidden?"查看句型提示＋":"收起句型提示－";});
$("quizOptions").addEventListener("click",e=>{
 const b=e.target.closest("button[data-answer]");if(!b)return;
 document.querySelectorAll("#quizOptions button").forEach(x=>x.disabled=true);
 $("quizFeedback").textContent=b.dataset.answer==="Asante"?"✓ 答對了！Asante = 謝謝。":"再試一次！正確答案是 Asante，意思是「謝謝」。";
});
const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
$("recordBtn").addEventListener("click",()=>{
 if(!SpeechRecognition){$("speechResult").textContent="此瀏覽器未提供語音辨識。請改用跟讀模式，或使用支援語音辨識的瀏覽器。";return;}
 const rec=new SpeechRecognition();rec.lang="sw-KE";rec.interimResults=false;rec.maxAlternatives=3;
 $("speechResult").textContent="正在聆聽……請說出上方句子。";
 rec.onresult=e=>{$("speechResult").textContent="辨識結果："+e.results[0][0].transcript+"（僅供文字辨識參考，非發音評分）";};
 rec.onerror=e=>{$("speechResult").textContent="辨識暫時無法使用："+e.error+"。可先使用播放與跟讀功能。";};
 rec.onend=()=>{};rec.start();
});
let deferredPrompt=null;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("installBtn").hidden=false;});
$("installBtn").addEventListener("click",async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("installBtn").hidden=true;});
if("serviceWorker" in navigator && location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(console.error));
renderStats();renderLesson();

const $ = id => document.getElementById(id);
const KEY = "jk-progress-v2";
const PASS = 4, QUIZ_LEN = 5;

function load(){
 try{
  const s = JSON.parse(localStorage.getItem(KEY) || "null");
  if(s && Array.isArray(s.done)) return Object.assign({done:[],xp:0,unit:0,hard:[]}, s);
 }catch(e){}
 return {done:[],xp:0,unit:0,hard:[]};
}
let saved = load();
function persist(){ try{ localStorage.setItem(KEY, JSON.stringify(saved)); }catch(e){} }

let unit = Math.min(Math.max(saved.unit|0, 0), UNITS.length-1);
let phrase = 0, step = "phrases", zhHidden = false;
const pad = n => String(n+1).padStart(2,"0");
const shuffle = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* 發音提示：史瓦希利語的重音固定落在倒數第二個音節 */
function syllables(word){
 const w = word.toLowerCase(), out = []; let cur = "";
 for(let i=0;i<w.length;i++){
  const c = w[i]; cur += c;
  if("aeiou".includes(c)){ out.push(cur); cur = ""; }
  else if(i===0 && (c==="m"||c==="n") && w[1] && !"aeiouwy".includes(w[1]) && !(c==="m" && "bv".includes(w[1])) && !(c==="n" && "dgjyz".includes(w[1]))){ out.push(cur); cur = ""; }
 }
 if(cur){ if(out.length) out[out.length-1] += cur; else out.push(cur); }
 return out;
}
function pronHint(text){
 return text.split(/\s+/).map(tok => {
  const word = tok.replace(/[^A-Za-z'-]/g,"");
  if(!word || !/[aeiou]/i.test(word)) return null;
  const s = syllables(word.replace(/[-']/g,""));
  const k = s.length>1 ? s.length-2 : 0;
  return s.map((x,i)=> i===k ? x.toUpperCase() : x).join("-");
 }).filter(Boolean).join(" · ");
}

/* 語音 */
function speak(text, rate){
 if(!("speechSynthesis" in window)) return;
 speechSynthesis.cancel();
 const u = new SpeechSynthesisUtterance(text.replace(/\s*\/\s*/g, ", ").replace(/^-/,""));
 u.lang = "sw-KE"; u.rate = rate || 0.9;
 const v = speechSynthesis.getVoices().find(x => x.lang.toLowerCase().startsWith("sw"));
 if(v) u.voice = v;
 else $("voiceNote").textContent = "這台裝置沒有 Kiswahili 語音，播放的發音可能不準；請點「Google 發音」聽正確唸法。";
 speechSynthesis.speak(u);
}
function openGoogleTranslate(text){
 const url = "https://translate.google.com/?sl=sw&tl=zh-TW&op=translate&text=" + encodeURIComponent(text);
 const w = window.open(url, "_blank", "noopener");
 if(!w) location.href = url;
}

/* 畫面 */
function showTab(name){
 document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab===name));
 ["learn","map","review","progress"].forEach(t => $(t+"Panel").hidden = t!==name);
 if(name==="review") nextFlash();
 window.scrollTo(0,0);
}
function showStep(name){
 step = name;
 document.querySelectorAll(".mode").forEach(b => b.classList.toggle("active", b.dataset.step===name));
 ["phrases","vocab","grammar","quiz"].forEach(s => $(s+"Step").hidden = s!==name);
 if(name==="quiz") startQuiz();
}
function renderStats(){
 const done = saved.done.length;
 $("xpValue").textContent = saved.xp; $("doneValue").textContent = done;
 $("progressXp").textContent = saved.xp; $("progressUnits").textContent = done;
 $("progressWords").textContent = saved.done.reduce((n,i) => n + UNITS[i].p.length + UNITS[i].v.length, 0);
 $("chapterList").innerHTML = UNITS.map((u,i) =>
  (i===0?'<p class="part-label">第一部分 · 生活基礎</p>':i===6?'<p class="part-label">第二部分 · 進階情境</p>':"") +
  `<button class="chapter${i===unit?" current":""}" data-open="${i}"><span class="chapter-icon">${u.icon}</span><span class="chapter-info"><strong>${pad(i)} ${esc(u.zh)}</strong><small>${esc(u.sw)}</small></span><span class="${saved.done.includes(i)?"done-tag":"todo-tag"}">${saved.done.includes(i)?"✓ 完成":"開始"}</span></button>`).join("");
 $("completedList").innerHTML = done
  ? saved.done.slice().sort((a,b)=>a-b).map(i => `<div class="completed-row"><span>${pad(i)} ${esc(UNITS[i].zh)}</span><span class="done-tag">✓ 已完成</span></div>`).join("")
  : '<p class="hint">還沒有完成的單元。通過單元測驗就會出現在這裡。</p>';
}
function renderUnit(){
 const u = UNITS[unit];
 saved.unit = unit; persist();
 $("unitIcon").textContent = u.icon;
 $("unitKicker").textContent = `UNIT ${pad(unit)} · ${u.sw}` + (saved.done.includes(unit) ? " · ✓" : "");
 $("unitTitle").textContent = u.zh;
 $("unitGoal").textContent = "學會：" + u.goal;
 $("vocabCount").textContent = u.v.length + " 個單字";
 $("vocabList").innerHTML = u.v.map((w,i) => `<button class="vocab-row" data-word="${i}"><strong>${esc(w[0])}</strong><span>${esc(w[1])}</span></button>`).join("");
 $("grammarTitle").textContent = u.g.t;
 $("grammarText").textContent = u.g.x;
 $("grammarExamples").innerHTML = u.g.e.map(e => `<div class="example"><strong>${esc(e[0])}</strong><span>${esc(e[1])}</span></div>`).join("");
 $("prevUnit").disabled = unit===0; $("nextUnit").disabled = unit===UNITS.length-1;
 phrase = 0; renderPhrase(); showStep("phrases"); renderStats();
}
function renderPhrase(){
 const u = UNITS[unit], p = u.p[phrase];
 $("phraseCount").textContent = `${phrase+1} / ${u.p.length}`;
 $("phraseProgress").style.width = ((phrase+1)/u.p.length*100) + "%";
 $("phraseSw").textContent = p[0];
 $("phraseZh").textContent = zhHidden ? "· · ·" : p[1];
 $("phrasePron").textContent = "重音提示：" + pronHint(p[0]);
 $("hideZh").textContent = zhHidden ? "顯示中文" : "遮住中文";
 $("prevPhrase").disabled = phrase===0;
 $("nextPhrase").textContent = phrase===u.p.length-1 ? "看單字 →" : "下一句";
}

/* 測驗 */
let quiz = null;
function startQuiz(){
 const u = UNITS[unit], pool = u.p.concat(u.v);
 quiz = {items: shuffle(pool).slice(0, QUIZ_LEN), i:0, score:0, pool};
 renderQuestion();
}
function renderQuestion(){
 const q = quiz.items[quiz.i], toZh = Math.random() < 0.6, a = toZh?1:0, b = toZh?0:1;
 const wrong = shuffle(quiz.pool.filter(x => x[a]!==q[a] && x[b]!==q[b])).slice(0,2);
 const opts = shuffle([q].concat(wrong));
 $("quizCount").textContent = `${quiz.i+1} / ${QUIZ_LEN}`;
 $("quizProgress").style.width = (quiz.i/QUIZ_LEN*100) + "%";
 $("quizBody").innerHTML = `<p class="quiz-ask">${toZh?"這句話的意思是？":"哪一個是對應的史瓦希利語？"}</p><p class="${toZh?"swahili":"meaning big"}">${esc(q[b])}</p><div class="quiz-options">${opts.map(o => `<button data-ok="${o===q?1:0}">${esc(o[a])}</button>`).join("")}</div><p id="quizFeedback" class="quiz-feedback" aria-live="polite"></p>`;
 if(toZh) speak(q[0]);
}
$("quizBody").addEventListener("click", e => {
 const b = e.target.closest("button"); if(!b) return;
 if(b.dataset.retry){ startQuiz(); return; }
 if(b.dataset.next){ if(unit < UNITS.length-1){ unit++; renderUnit(); window.scrollTo(0,0); } return; }
 if(b.dataset.ok===undefined || b.disabled) return;
 const ok = b.dataset.ok==="1", q = quiz.items[quiz.i];
 document.querySelectorAll("#quizBody .quiz-options button").forEach(x => { x.disabled = true; if(x.dataset.ok==="1") x.classList.add("right"); });
 if(ok) quiz.score++; else { b.classList.add("wrong"); if(!saved.hard.includes(q[0])) saved.hard.push(q[0]); persist(); }
 $("quizFeedback").textContent = ok ? "✓ 答對了！" : `正確答案：${q[0]} ＝ ${q[1]}`;
 setTimeout(() => { quiz.i++; quiz.i < QUIZ_LEN ? renderQuestion() : finishQuiz(); }, ok ? 700 : 1900);
});
function finishQuiz(){
 const pass = quiz.score >= PASS, first = pass && !saved.done.includes(unit);
 if(first){ saved.done.push(unit); saved.xp += 20; persist(); }
 $("quizProgress").style.width = "100%";
 $("quizBody").innerHTML = `<div class="quiz-result"><p class="result-score">${quiz.score} / ${QUIZ_LEN}</p><p class="meaning">${pass ? (first?"Hongera! 完成本單元，＋20 XP":"Vizuri sana! 這個單元你已經完成過了") : "Pole! 再練習一下句子和單字，然後重考一次。"}</p><div class="audio-controls"><button class="secondary-btn" data-retry="1">再考一次</button>${pass && unit<UNITS.length-1 ? '<button class="primary-btn" data-next="1">下一單元 →</button>' : ""}</div></div>`;
 renderStats();
 $("unitKicker").textContent = `UNIT ${pad(unit)} · ${UNITS[unit].sw}` + (saved.done.includes(unit) ? " · ✓" : "");
}

/* 複習卡 */
let flash = null;
function reviewPool(){
 const ids = saved.done.length ? saved.done : [0];
 return ids.flatMap(i => UNITS[i].p.concat(UNITS[i].v));
}
function nextFlash(){
 const pool = reviewPool(), hard = pool.filter(x => saved.hard.includes(x[0]));
 const from = hard.length && Math.random() < 0.6 ? hard : pool;
 let pick = from[Math.floor(Math.random()*from.length)];
 if(flash && pick===flash && pool.length>1) pick = pool[(pool.indexOf(pick)+1) % pool.length];
 flash = pick;
 $("flashFront").textContent = flash[0];
 $("flashBack").textContent = flash[1]; $("flashBack").hidden = true;
 $("flashHint").textContent = "點一下卡片看答案";
 $("reviewInfo").textContent = `${pool.length} 張 · ${hard.length} 張待加強`;
}
$("flashCard").addEventListener("click", () => {
 if($("flashBack").hidden){ $("flashBack").hidden = false; $("flashHint").textContent = "重音提示：" + pronHint(flash[0]); speak(flash[0]); }
 else speak(flash[0]);
});
$("flashAgain").addEventListener("click", () => { if(!saved.hard.includes(flash[0])) saved.hard.push(flash[0]); persist(); nextFlash(); });
$("flashGood").addEventListener("click", () => { saved.hard = saved.hard.filter(x => x!==flash[0]); persist(); nextFlash(); });

/* 事件 */
document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => showTab(b.dataset.tab)));
document.querySelectorAll(".mode").forEach(b => b.addEventListener("click", () => showStep(b.dataset.step)));
$("playBtn").addEventListener("click", () => speak(UNITS[unit].p[phrase][0], .9));
$("slowBtn").addEventListener("click", () => speak(UNITS[unit].p[phrase][0], .6));
$("gtBtn").addEventListener("click", () => openGoogleTranslate(UNITS[unit].p[phrase][0]));
$("prevPhrase").addEventListener("click", () => { if(phrase>0){ phrase--; renderPhrase(); } });
$("nextPhrase").addEventListener("click", () => { if(phrase < UNITS[unit].p.length-1){ phrase++; renderPhrase(); } else showStep("vocab"); });
$("hideZh").addEventListener("click", () => { zhHidden = !zhHidden; renderPhrase(); });
$("vocabList").addEventListener("click", e => { const b = e.target.closest("[data-word]"); if(b) speak(UNITS[unit].v[b.dataset.word][0]); });
$("chapterList").addEventListener("click", e => { const b = e.target.closest("[data-open]"); if(b){ unit = Number(b.dataset.open); renderUnit(); showTab("learn"); } });
$("prevUnit").addEventListener("click", () => { if(unit>0){ unit--; renderUnit(); window.scrollTo(0,0); } });
$("nextUnit").addEventListener("click", () => { if(unit<UNITS.length-1){ unit++; renderUnit(); window.scrollTo(0,0); } });
$("resetBtn").addEventListener("click", () => {
 const b = $("resetBtn");
 if(b.dataset.armed){ saved = {done:[],xp:0,unit:0,hard:[]}; persist(); unit = 0; delete b.dataset.armed; b.textContent = "清除所有進度"; renderUnit(); }
 else { b.dataset.armed = "1"; b.textContent = "再點一次確認清除"; setTimeout(() => { delete b.dataset.armed; b.textContent = "清除所有進度"; }, 4000); }
});

if("serviceWorker" in navigator && location.protocol.startsWith("http")) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(console.error));
renderUnit();

const topics={
nyaya:{
title:"Nyāya Logic",cs:"Propositional logic • Inference engines • Explainable AI",
text:"Nyāya provides a structured approach to reasoning. The five-member inference is presented here as an educational model.",
items:["Pratijñā — proposition","Hetu — reason","Udāharaṇa — example","Upanaya — application","Nigamana — conclusion"]
},
pingala:{
title:"Piṅgala’s Chandaḥśāstra",cs:"Binary systems • Combinatorics • Algorithmic generation",
text:"Prosodic patterns can be represented using Laghu–Guru symbols. This website uses a simple 0/1 analogy to demonstrate pattern generation.",
items:["Laghu → 0","Guru → 1","Prastāra → systematic enumeration","Pattern generation → combinatorial thinking"]
},
panini:{
title:"Pāṇini’s Aṣṭādhyāyī",cs:"Formal grammar • Rewrite systems • Parsing • NLP",
text:"Pāṇini’s grammatical system is studied in the syllabus through rule-based generation, meta-rules, precedence and context-sensitive operations.",
items:["Rule-based generation","Meta-rules","Rule precedence","Context-sensitive operations","Conflict resolution"]
},
ayurveda:{
title:"Ayurvedic Rule-Based Classification",cs:"Expert systems • Decision trees • Feature engineering",
text:"This simplified educational model treats symptoms as input features and demonstrates rule-based classification using the Tridoṣa framework.",
items:["Tridoṣa framework","Symptom–feature mapping","Multi-attribute classification","Decision principles"]
},
artha:{
title:"Arthaśāstra Cryptography",cs:"Symmetric encryption • Cipher algorithms • Basic steganography",
text:"The topic examines secret communication, coded messaging and information protection as a bridge to modern cybersecurity concepts.",
items:["Secret communication","Substitution and transposition","Concealment and coded messaging","Information protection"]
}};
function openTopic(id){let t=topics[id];document.getElementById("modalContent").innerHTML=`<div class="eyebrow">IKS TOPIC</div><h2>${t.title}</h2><span class="cs">${t.cs}</span><p>${t.text}</p><ul>${t.items.map(x=>`<li>${x}</li>`).join("")}</ul>`;document.getElementById("modal").classList.add("show")}
function closeModal(e){if(!e||e.target.id==="modal")document.getElementById("modal").classList.remove("show")}
function runLab(){let v=document.getElementById("labInput").value;let out={nyaya:"IF smoke is observed AND the established relation is smoke → fire, THEN the simplified inference output is: fire on the hill.",dry:"IF selected features include dryness + irregularity, THEN the simplified classroom rule assigns the input toward Vata.",binary:"Map Laghu → 0 and Guru → 1. Example: Laghu–Guru–Guru becomes 011 in this simplified binary analogy.",cipher:"Apply a simple substitution mapping to transform readable text into a coded form. This demonstrates the basic idea of transforming information for secrecy."};document.getElementById("labOutput").textContent=out[v]}
const quiz=[
["Which Nyāya member represents the conclusion?",["Nigamana","Hetu","Udāharaṇa","Pratijñā"],0],
["Piṅgala is connected in the syllabus with which CS idea?",["Binary representation and combinatorics","Database normalization","Cloud computing","Operating systems"],0],
["Pāṇini’s topic is connected with:",["Formal grammar and NLP","Image processing","Computer networks","Cryptocurrency"],0],
["Ayurvedic classification is presented as a:",["Rule-based expert system","Web server","Sorting algorithm","File system"],0],
["Arthaśāstra cryptography connects with:",["Cybersecurity and cipher algorithms","Computer graphics","Operating systems","UI design"],0]
];
let qi=0,score=0,locked=false;
function loadQ(){locked=false;let x=quiz[qi];document.getElementById("qnum").textContent=`QUESTION ${qi+1} / ${quiz.length}`;document.getElementById("question").textContent=x[0];document.getElementById("answers").innerHTML="";document.getElementById("feedback").textContent="";document.getElementById("next").disabled=true;quiz[qi][1].forEach((a,i)=>{let b=document.createElement("button");b.className="answer";b.textContent=a;b.onclick=()=>pick(b,i);document.getElementById("answers").appendChild(b)})}
function pick(btn,i){if(locked)return;locked=true;let x=quiz[qi];document.querySelectorAll(".answer").forEach((b,k)=>{b.disabled=true;if(k===x[2])b.classList.add("correct")});if(i===x[2]){score++;document.getElementById("feedback").textContent="Correct ✓"}else{btn.classList.add("wrong");document.getElementById("feedback").textContent="The highlighted answer is correct."}document.getElementById("next").disabled=false}
document.getElementById("next").onclick=()=>{if(qi<quiz.length-1){qi++;loadQ()}else{document.getElementById("question").textContent=`Your score: ${score}/${quiz.length}`;document.getElementById("answers").innerHTML="";document.getElementById("feedback").textContent="Quiz complete!";document.getElementById("next").textContent="Restart ↻";document.getElementById("next").disabled=false;document.getElementById("next").onclick=()=>{qi=0;score=0;document.getElementById("next").textContent="Next →";loadQ()}}};
loadQ();

// ===== ADVANCED FEATURES =====
const STORAGE={saved:'iks_saved_topics',topics:'iks_topics_seen',score:'iks_best_score',notes:'iks_notes',theme:'iks_theme',history:'iks_lab_history'};
const getStore=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)) ?? d}catch{return d}};
const putStore=(k,v)=>localStorage.setItem(k,JSON.stringify(v));

function refreshDashboard(){
 const seen=getStore(STORAGE.topics,[]), saved=getStore(STORAGE.saved,[]), notes=localStorage.getItem(STORAGE.notes)||'', best=getStore(STORAGE.score,null);
 document.getElementById('topicProgress').textContent=`${seen.length} / 5`; document.getElementById('topicBar').style.width=(seen.length/5*100)+'%';
 document.getElementById('savedCount').textContent=saved.length; document.getElementById('noteCount').textContent=notes.trim()?notes.trim().length+' chars':'0';
 document.getElementById('bestScore').textContent=best===null?'Not attempted':`${best} / ${quiz.length}`;
 document.querySelectorAll('.topic').forEach(card=>{const id=card.className.split(' ').find(x=>topics[x]); const mark=card.querySelector('.save-mark'); if(mark&&saved.includes(id)){mark.classList.add('saved');mark.textContent='♥'}});
}
function toggleSave(e,mark){const card=mark.closest('.topic');const id=Object.keys(topics).find(k=>card.classList.contains(k));let saved=getStore(STORAGE.saved,[]);if(saved.includes(id)){saved=saved.filter(x=>x!==id);mark.classList.remove('saved');mark.textContent='♡'}else{saved.push(id);mark.classList.add('saved');mark.textContent='♥'}putStore(STORAGE.saved,saved);refreshDashboard();}
function openTopic(id){let t=topics[id];let seen=getStore(STORAGE.topics,[]);if(!seen.includes(id)){seen.push(id);putStore(STORAGE.topics,seen)};document.getElementById("modalContent").innerHTML=`<div class="eyebrow">IKS TOPIC • INTERACTIVE CARD</div><h2>${t.title}</h2><span class="cs">${t.cs}</span><p>${t.text}</p><ul>${t.items.map(x=>`<li>${x}</li>`).join("")}</ul><div style="margin-top:22px;padding:15px;border-radius:14px;background:rgba(25,168,154,.08);border:1px solid rgba(25,168,154,.18)"><b style="font-size:11px;color:#167d75">LEARNING PROMPT</b><p style="margin:7px 0 0;font-size:11px">Can you explain this IKS concept and its CS connection in two sentences for your viva?</p></div>`;document.getElementById("modal").classList.add("show");refreshDashboard()}
function filterTopics(){const q=document.getElementById('topicSearch').value.toLowerCase().trim();const active=document.querySelector('.filter.active')?.dataset?.cat||'all';document.querySelectorAll('.topic').forEach(c=>{const okQ=!q||c.dataset.name.includes(q);const okC=active==='all'||c.dataset.category===active;c.classList.toggle('hidden',!(okQ&&okC))})}
function setFilter(cat,btn){document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');btn.dataset.cat=cat;document.querySelectorAll('.filter').forEach(x=>{if(x!==btn)x.dataset.cat=x.textContent.toLowerCase()});filterTopics()}
function toggleTheme(){document.body.classList.toggle('dark');localStorage.setItem(STORAGE.theme,document.body.classList.contains('dark')?'dark':'light');document.querySelector('.nav-icon').textContent=document.body.classList.contains('dark')?'☀':'☾'}
function openNotes(){document.getElementById('notesArea').value=localStorage.getItem(STORAGE.notes)||'';document.getElementById('notesModal').classList.add('show')}
function closeNotes(e){if(!e||e.target.id==='notesModal')document.getElementById('notesModal').classList.remove('show')}
function saveNotes(){localStorage.setItem(STORAGE.notes,document.getElementById('notesArea').value);document.getElementById('notesSaved').textContent='Saved automatically ✓';refreshDashboard()}
function showSavedTopics(){const saved=getStore(STORAGE.saved,[]);if(!saved.length){alert('No saved topics yet. Click the ♡ icon on a topic to save it.');return}const names=saved.map(x=>topics[x]?.title).join('\n• ');alert('Your saved topics:\n\n• '+names)}
function addLabHistory(value,label){let h=getStore(STORAGE.history,[]);h.unshift({label,time:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})});h=h.slice(0,4);putStore(STORAGE.history,h);let box=document.getElementById('labHistory');if(!box)return;box.innerHTML='<div class="history-title">RECENT RUNS</div>'+h.map(x=>`<span class="history-item">${x.label} · ${x.time}</span>`).join('')}
const oldRunLab=runLab;runLab=function(){oldRunLab();const sel=document.getElementById('labInput');addLabHistory(sel.value,sel.options[sel.selectedIndex].text)};
const oldPick=pick;pick=function(btn,i){oldPick(btn,i);if(qi===quiz.length-1 && locked){const best=getStore(STORAGE.score,null);if(best===null||score>best)putStore(STORAGE.score,score);refreshDashboard()}};

// Add history area once DOM is ready
window.addEventListener('DOMContentLoaded',()=>{const lab=document.getElementById('labOutput');if(lab&&!document.getElementById('labHistory'))lab.insertAdjacentHTML('afterend','<div class="lab-history" id="labHistory"></div>');const h=getStore(STORAGE.history,[]);if(document.getElementById('labHistory'))document.getElementById('labHistory').innerHTML='<div class="history-title">RECENT RUNS</div>'+(h.length?h.map(x=>`<span class="history-item">${x.label} · ${x.time}</span>`).join(''):'<small style="color:#7b8790">No runs yet — try a rule above.</small>');if(localStorage.getItem(STORAGE.theme)==='dark'){document.body.classList.add('dark');document.querySelector('.nav-icon').textContent='☀'}refreshDashboard()});

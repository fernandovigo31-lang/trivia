/* ====== PROGRESO ====== */
const K="trivia_infinita_v1";let S={};try{S=JSON.parse(localStorage.getItem(K))||{}}catch(e){}
S=Object.assign({xp:0,ans:0,ok:0,games:0,maxStreak:0,best:{},ach:{},cat:{},imp:0,perfect:0},S);
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const lvl=x=>Math.floor(Math.sqrt(x/40))+1,RK=["Novato","Aprendiz","Curioso","Estudioso","Sabio","Erudito","Maestro","Gran Maestro","Leyenda"];
const rank=x=>RK[Math.min(8,(lvl(x)-1)/3|0)];
const ACH=[["first","🎯 Primer paso","Termina una partida",()=>S.games>=1],["s5","🔥 Racha de 5","5 aciertos seguidos",()=>S.maxStreak>=5],["s10","⚡ Racha de 10","10 aciertos seguidos",()=>S.maxStreak>=10],["a100","📚 Cien respuestas","Responde 100 preguntas",()=>S.ans>=100],["l5","⭐ Nivel 5","Llega al nivel 5",()=>lvl(S.xp)>=5],["perf","💎 Perfecto","Partida de 10+ sin fallos",()=>S.perfect>0],["imp","👑 Reto difícil","Acierta una pregunta difícil",()=>S.imp>0],["exp","🧭 Explorador","Juega 10 categorías",()=>Object.keys(S.cat).length>=10]];
function chk(){ACH.forEach(a=>{if(!S.ach[a[0]]&&a[3]()){S.ach[a[0]]=1;toast("Logro: "+a[1])}});save()}
function toast(t){const d=document.createElement("div");d.className="toast";d.textContent=t;document.body.append(d);setTimeout(()=>d.remove(),2600)}

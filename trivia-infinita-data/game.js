/* ====== LÓGICA DE PARTIDAS ====== */
function start(m){
 const cats=m==="rand"?Object.keys(D):[...sel];let lo=0,hi=2;
 if(diff!=="all")lo=hi=+diff;if(m==="exp")lo=hi=2;
 if(!cats.length){showNoticeModal("Elige una categoría","Selecciona al menos una categoría en el modal.");return}
 const pool=[],seen=new Set();cats.forEach(c=>D[c].forEach(q=>{const normalized=q.q.trim().toLocaleLowerCase();if(q.d>=lo&&q.d<=hi&&!seen.has(normalized)){pool.push(q);seen.add(normalized)}}));
 if(!pool.length){showNoticeModal("No hay preguntas disponibles","Cambia las categorías o la dificultad y vuelve a intentarlo.");return}
 const requested={cl:10,exp:10,rand:15,cus:cnt}[m]||pool.length,max=Math.min(requested,pool.length);
 G={m,pool:shuf(pool),i:0,score:0,lives:3,streak:0,best:0,ok:0,n:0,left:60,max,played:new Set()};next()
}
function confirmEndGame(){showConfirmModal({title:"¿Terminar la partida?",message:"La partida se cerrará y verás el resultado con tus respuestas hasta ahora.",confirmText:"Terminar partida",cancelText:"Seguir jugando",onConfirm:end})}
function next(){clearInterval(tm);if(G.n>=G.max||G.i>=G.pool.length)return end();
 const q=G.q=G.pool[G.i++];G.opts=shuf([q.a,...q.w]);G.tq=20;G.lock=false;G.played.add(q.id);
 app.innerHTML=`<div class="row"><b>${G.score} pts</b><span>${G.m==="sur"?"❤️".repeat(G.lives):""} ${G.streak>1?"🔥"+G.streak:""} ${G.m==="time"?"⏱️ <span id=lf></span>s":""}</span><span class="sm">${G.n+1}/${G.max}</span></div>
 <div class="bar"><i id=tb style="width:100%"></i></div><div class="card"><div class="sm">${CATS[q.c][0]} ${CATS[q.c][1]} · ${DIFF[q.d]}</div><div class="q">${q.q}</div>
 <div class="g" style="grid-template-columns:1fr">${G.opts.map((o,i)=>`<button class="opt" id="o${i}" onclick="ans(${i})">${"ABCD"[i]}. ${o}</button>`).join("")}</div></div><div id=fb></div><button onclick="confirmEndGame()" class="sm">Terminar</button>`;
 tick();tm=setInterval(()=>{G.tq-=.1;if(G.m==="time")G.left-=.1;if(G.m==="time"&&G.left<=0){clearInterval(tm);return end()}if(G.tq<=0)ans(-1);else tick()},100)}
function tick(){const b=$("tb");if(b)b.style.width=G.tq/20*100+"%";const l=$("lf");if(l)l.textContent=Math.ceil(G.left)}
function ans(k){if(G.lock)return;G.lock=true;clearInterval(tm);const q=G.q,ci=G.opts.indexOf(q.a),ok=k===ci;G.n++;S.ans++;
 const c=S.cat[q.c]=S.cat[q.c]||[0,0];c[1]++;
 if(ok){c[0]++;S.ok++;G.ok++;G.streak++;G.best=Math.max(G.best,G.streak);S.maxStreak=Math.max(S.maxStreak,G.streak);if(q.d===2)S.imp++;
 G.score+=TriviaScoring.points({difficulty:q.d,remainingTime:G.tq,streak:G.streak});beep(660,0);beep(880,.12)}
 else{G.streak=0;if(G.m==="sur")G.lives--;beep(180,0,"sawtooth",.3)}
 $("o"+ci).classList.add("ok");if(!ok&&k>=0)$("o"+k).classList.add("bad");document.body.classList.remove("flashok","flashbad");void document.body.offsetWidth;document.body.classList.add(ok?"flashok":"flashbad");
 const over=(G.m==="sur"&&G.lives<=0)||(G.m==="streak"&&!ok);
 $("fb").innerHTML=`<div class="card"><b>${ok?"✅ ¡Correcto!":k<0?"⌛ Se acabó el tiempo":"❌ Incorrecto"}</b><br>Respuesta: ${q.a}.<br><span class="sm">${q.e}</span><br><br><button onclick="${over?"end()":"next()"}">${over?"Ver resultados":"Siguiente ➜"}</button></div>`;chk()}
function end(){clearInterval(tm);if(!G)return;const g=G;G=null;const l0=lvl(S.xp);S.xp+=g.score;S.games++;S.best[g.m]=Math.max(S.best[g.m]||0,g.score);
 if(g.n>=10&&g.ok===g.n)S.perfect++;chk();const l1=lvl(S.xp);
 app.innerHTML=`<h1>🏁 Resultados</h1><div class="card"><h2>${g.score} puntos</h2>Aciertos: ${g.ok}/${g.n} · Mejor racha: ${g.best}<br>${g.score>=(S.best[g.m]||0)&&g.score>0?"🏅 ¡Récord personal en este modo!<br>":""}${l1>l0?"🎉 ¡Subiste al nivel "+l1+" ("+rank(S.xp)+")!":"XP total: "+S.xp}</div><div class="row"><button onclick="start('${g.m}')">🔁 Jugar de nuevo</button><button onclick="home()">🏠 Menú</button></div>`}

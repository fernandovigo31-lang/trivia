/* ====== MENÚ E INTERFAZ PRINCIPAL ====== */
let sel=new Set(Object.keys(D)),diff="all",cnt=10,G=null,tm=null;
const $=id=>document.getElementById(id),app=$("app");
const total=()=>Object.values(D).reduce((s,a)=>s+a.length,0);
function home(){clearInterval(tm);const l=lvl(S.xp),lo=40*(l-1)**2,hi=40*l*l;
 const modes=[["cl","🏁 Clásico","10 preguntas"],["inf","♾️ Infinito","Sin repetir preguntas disponibles"],["time","⏱️ Contrarreloj","60 segundos"],["sur","❤️ Supervivencia","3 vidas"],["streak","🔥 Racha","Hasta fallar"],["exp","🧠 Experto","Solo preguntas difíciles"],["rand","🎲 Aleatorio","Todas las categorías"],["cus","⚙️ Personalizado","Tu selección y cantidad"]];
 const chosen=[...sel].map(c=>`${CATS[c][0]} ${CATS[c][1]}`);const summary=chosen.length?chosen.slice(0,3).join(", ")+(chosen.length>3?` y ${chosen.length-3} más`:""):"Ninguna categoría seleccionada";
 const available=[...sel].reduce((n,c)=>n+D[c].filter(q=>diff==="all"||q.d===+diff).length,0);
 app.innerHTML=`<div class="row"><h1>🧠 Trivia Infinita</h1><button onclick="snd=!snd;home()" aria-label="Alternar sonido">${snd?"🔊":"🔇"}</button></div>
 <div class="card"><div class="row"><b>Nivel ${l} · ${rank(S.xp)}</b><span class="sm">${S.xp} XP · ${total()} preguntas</span></div><div class="bar xp"><i style="width:${(S.xp-lo)/(hi-lo)*100}%"></i></div></div>
 <h2>Modo de juego</h2><div class="g">${modes.map(m=>`<button onclick="start('${m[0]}')">${m[1]}<br><span class="sm">${m[2]}</span></button>`).join("")}</div>
 <h2>Tu selección</h2><div class="card"><div class="row"><div><b>${sel.size} categorías</b><div class="sm">${summary}</div><div class="sm">${available} preguntas disponibles · ${diff==="all"?"todas las dificultades":DIFF[+diff]}</div></div><button onclick="openCategoryModal()">Elegir categorías y dificultad</button></div><p class="sm">Partida personalizada: ${cnt} preguntas</p></div>
 <button onclick="prof()">🏆 Perfil, estadísticas y logros</button>`}

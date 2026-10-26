function prof(){const nm={cl:"Clásico",inf:"Infinito",time:"Contrarreloj",sur:"Supervivencia",streak:"Racha",exp:"Experto",rand:"Aleatorio",cus:"Personalizado"};
app.innerHTML=`<h1>🏆 Perfil</h1><div class="card">Nivel ${lvl(S.xp)} · ${rank(S.xp)} · ${S.xp} XP<br>Respuestas: ${S.ans} · Aciertos: ${S.ans?Math.round(S.ok/S.ans*100):0}% · Partidas: ${S.games}<br>Mejor racha: ${S.maxStreak}</div>
<h2>Récords</h2><div class="card">${Object.keys(nm).map(m=>`${nm[m]}: <b>${S.best[m]||0}</b>`).join(" · ")}</div>
<h2>Por categoría</h2><div class="card">${Object.keys(S.cat).map(c=>`${CATS[c][0]} ${CATS[c][1]}: ${S.cat[c][0]}/${S.cat[c][1]}`).join("<br>")||"Aún no has jugado."}</div>
<h2>Logros</h2><div class="g">${ACH.map(a=>`<div class="card" style="opacity:${S.ach[a[0]]?1:.4}"><b>${a[1]}</b><br><span class="sm">${a[2]}</span></div>`).join("")}</div>
<div class="row"><button onclick="home()">⬅ Volver</button><button onclick="confirmResetProgress()">Borrar progreso</button></div>`}

function confirmResetProgress(){showConfirmModal({title:"¿Borrar el progreso?",message:"Se eliminarán el XP, las estadísticas y los logros guardados en este navegador.",confirmText:"Borrar progreso",cancelText:"Conservar",danger:true,onConfirm:()=>{localStorage.removeItem(K);location.reload()}})}

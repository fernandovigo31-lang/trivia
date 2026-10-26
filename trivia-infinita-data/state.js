const CATS=Object.fromEntries(TRIVIA_CATEGORIES.map(c=>[c.id,[c.emoji,c.name]]));
const DIFF=["Fácil","Media","Difícil"];
/* El banco vive en archivos independientes por categoría. */
const D=Object.fromEntries(Object.entries(TRIVIA_QUESTIONS).map(([c,questions])=>[c,questions.map(q=>({id:q.id,c,q:q.question,a:q.options[q.correctIndex],w:q.options.filter((_,i)=>i!==q.correctIndex),d:q.difficulty,e:q.explanation}))]));
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};

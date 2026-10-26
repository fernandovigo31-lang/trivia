/* ====== SONIDO ====== */
let snd=true,AC;function beep(f,t,ty="sine",d=.15){if(!snd)return;try{AC=AC||new AudioContext();const o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.value=f;g.gain.value=.08;o.connect(g);g.connect(AC.destination);o.start(AC.currentTime+t);o.stop(AC.currentTime+t+d)}catch(e){}}

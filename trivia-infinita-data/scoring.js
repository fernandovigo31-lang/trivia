window.TriviaScoring=Object.freeze({points({difficulty,remainingTime,streak}){return 10*(difficulty+1)+Math.ceil(remainingTime/2)+Math.min(streak,10)}});

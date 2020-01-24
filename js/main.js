'use strict';

{   const words = [
    'apple',
    'sky',
    'blue',
    'set',
];
    let word;
    let loc;
    let score;//let=後から値が変更される
    let miss;
    const timeLimit = 3 *1000;
    let startTime;
    let isPlaying = false;
    const target = document.getElementById('target');
    const scorelabel = document.getElementById('score');
    const misslabel = document.getElementById('miss');
    const timerlabel = document.getElementById('timer');

    function updateTarget(){
        let placeholder = '';
        for (let i=0; i<loc; i++){
            placeholder += '_';
        }
        target.textContent = placeholder + word.substring(loc);

    }
    function updateTimer(){
        const timeLeft =startTime + timeLimit - Date.now();
        timerlabel.textContent = (timeLeft/ 1000).toFixed(2);
        const timeoutId = setTimeout(()=>{
            updateTimer();

        },10);
        if (timeLeft<0){
            isPlaying = false;
            clearTimeout(timeoutId);
            timerlabel.textContent = '0.00';
            setTimeout(()=>{
                showResult();
            } ,100);
            target.textContent = 'click to replay';
        }
    }
    function showResult(){
        const accuracy = score+miss===0 ?0 :score/(score+miss)*100;
        alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
    }
window.addEventListener('click', ()=>{
    if (isPlaying === true){
        return;
    }
    isPlaying =true;
    loc = 0;
    score =0;
    miss = 0;
    scorelabel.textContent = score;
    misslabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;
    startTime =Date.now();
    updateTimer();
});

    window.addEventListener('keydown', e=>{
        if (isPlaying !== true){
            return;
        }
        if (e.key === word[loc]){
            loc++;
            if (loc === word.length){
                word = words[Math.floor(Math.random() * words.length)];
                loc=0;
            }
            updateTarget();
            score++;
            scorelabel.textContent = score;
        } else{
            
            miss++;
            misslabel.textContent = miss;
        }
    });
}
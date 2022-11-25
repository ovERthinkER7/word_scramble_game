const wordElement = document.querySelector(".word");
const hintElement = document.querySelector(".hint span");
const refreshword = document.querySelector(".refreshbtn");
const checkword = document.querySelector(".checkbtn");
const input = document.querySelector("input");
const timeElement = document.querySelector(".time span b");
const scoreElement = document.querySelector(".score span");
const attemptElement = document.querySelector(".num span");

let word='';
let timer;
let score=0;
let attempt=3;
let time=10;

function initialgame(){
    let ranindex=Math.floor(Math.random()*words.length);
    let ranobj=words[ranindex];
    word=ranobj.word.toLowerCase();
    //shuffles characters in the string
    let wordarr=word.split("").sort(()=>Math.random()-0.5);
    let scrambleWord=wordarr.join("");
    //if word is not shuffle successfully   call the initialgame again
    if(scrambleWord===word){
        return initialgame();
    }
    //render HTML
    attemptElement.innerText=attempt;
    scoreElement.innerText=score;
    wordElement.innerText=scrambleWord;
    hintElement.innerText=ranobj.hint;
    timeElement.innerText=time;
    input.value="";
    checkword.setAttribute("disabled",true);
    //initial timer
    timer=setInterval(()=>{
        if(time>0){
            time--;
            return timeElement.innerText=time;
        }
        losegame(`Time Out! ${word.toUpperCase()} is a correct word`);
    },1000)
}
initialgame();

//refresh button- refresh all value except score and attempt left
refreshword.addEventListener("click",()=>losegame());

function refreshGame(msg){
    if(msg) alert(msg);
    word='';
    time=10;
    clearInterval(timer);
    initialgame();
}

function gameOver(){
    let msg=`Game Over! You get ${score} points, play again!`;
    attempt=3;
    score=0;
    refreshGame(msg);
}

function losegame(msg){
    attempt--;
    if(attempt<1){
        return gameOver();
    }
    refreshGame(msg);    
}

function winGame(msg){
    score++;
    refreshGame(msg);
}

input.addEventListener("input",(e)=>{
    if(!e.target.value.trim()){
        checkword.setAttribute("disabled",true);
    }
    else{
        checkword.removeAttribute("disabled");
    }
})


//check the word
checkword.addEventListener("click",()=>{
    let ans=input.value.toLowerCase().trim();
    if(ans!== word){
        return losegame(`Oops! ${ans.toUpperCase()} is not a correct word!`);
    }
    return winGame(`Congrats! ${ans.toUpperCase()} is a correct word!`);
})
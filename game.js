var gamePattern = [];
var userPattern = [];
var gameColors =[
    "red",
    "blue",
    "yellow",
    "green"
];
var level = 0;
var userColor;
var score = 0;
//start
startGame();


//functions
function startGame(){
    level = 0;
    $(document).on("keydown", function (){
        showSequence();
        
    });
}

function mouseOn(){
    $(".btn").on("click", function (){
        userColor = $(this).attr("id");
        userPattern.push(userColor);
        buttonAnimation(userColor);
        checkPattern();
    });
}

function showSequence(){
    level += 1;
    score = 0;
    $(document).off();
    $(".btn").off();
    userPattern = [];
    $("h1").text("Level "+level);
    generateRandom();
    nextSequence();
    
}

function generateRandom(){
    var randomIndex = Math.floor(Math.random()*4);
    gamePattern.push(gameColors[randomIndex]);
}

function waitforme(millisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}

async function nextSequence(){
    
    for(let i=0;i<gamePattern.length;i++)
    {
        await waitforme(500);
        buttonAnimation(gamePattern[i]);
    }
    mouseOn();
}

function buttonAnimation(color){
    playSound(color);
    $("#"+color).toggleClass("pressed");
    setTimeout(function(){
        $("#"+color).toggleClass("pressed");
    },200);
}

function loopDelay(time){
    setTimeout(function(){},600*time);
}

function playSound(soundId){
    var audio = new Audio("./sounds/"+soundId+".mp3");
    audio.play();
}

function checkPattern(){
    var checkIndex = userPattern.length - 1;
    if(gamePattern[checkIndex] !== userPattern[checkIndex])
    {
        resetGame();
    }
    else{
        score += 1;
        if(score === level)
        {
            $(".btn").off();
            showSequence();
        }
    }
}

function resetGame(){
    $("body").toggleClass("game-over");
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    level = 0;
    $(".btn").off();
    setTimeout(function(){
        $("body").toggleClass("game-over");
    },150);
    gamePattern = [];
    startGame();
}
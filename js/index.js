let inputDir={x:0,y:0};
const  gameoversound= new Audio('music/gameover.mp3')
const foodsound = new Audio("music/food.mp3")
const movesound= new Audio('music/move.mp3')
const musicsound= new Audio("music/music.mp3")
let  speed= 20;
let score=0;
let lasttime=0;
let snakeArr=[{x:13,y:15}]// head of snake;

food= {x:6,y:7}; // object becoz it move and snake eat then grow

// game function
function main(currTime){
    window.requestAnimationFrame(main);
    // console.log(currTime);

    // control fps by logic
    if((currTime-lasttime)/1000<1/speed){
        return;
    }
    lasttime= currTime;

    gameEngine()// making a method function
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;

}

function gameEngine(){
     //1. for update snake array variable
     if(isCollide(snakeArr)){
        gameoversound.play();
        musicsound.pause();
        inputDir={x:0,y:0};
        alert("Game over Press any key to play again!!")
        snakeArr=[{x:13,y:15}]; // reset snake head
        musicsound.play();
        score=0;
     }

     // if snake had eaten the food, increment score and regenerate the food
     if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodsound.play();
        score += 10;

        if(score>HighScorebox){
            HighScorebox=score;

            localStorage.setItem("HighScorebox",JSON.stringify(HighScorebox));
            HighScorebox.innerHTML="HighScorebox: "+  HighScorebox
        }

        // unshift basically insert new element at start of the array 
        scorebox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 1;
        let b = 18;
        //generate random number between a & b using [a+(b-a)*Math.random() ]
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        
     }

      // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



     //2. display the snake 
     board.innerHTML=""; // empty the board div
     snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head')

        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);

     });

    //  display the  food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}



window.requestAnimationFrame(main);// calling main function to make loop

window.addEventListener('keydown',e=>{
    inputDir= {x:0,y:1}// start the game
    movesound.play();
    musicsound.play();
        switch(e.key){
            case "ArrowUp":
                // console.log("ArrowUp");
                inputDir.x=0;
                inputDir.y=-1 ;
                break;
            case "ArrowDown":
                // console.log("ArrowDown");
                inputDir.x=0;
                inputDir.y= 1;
                break;

            case "ArrowLeft":
                // console.log("ArrowLeft");
                inputDir.x=-1;
                inputDir.y= 0;
                break;
            
            case "ArrowRight":
                // console.log("ArrowRight");
                inputDir.x=1;
                inputDir.y= 0;
                break;


        }
    
})

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boyImg;

var ground, groundImg, iGround;

var junkFood, junkFoodG, healthyFood, healthyFoodG;

var gameOverS;

var fruitsImg, vegiesImg;

var burgers,fries,pizzas;

var gameOver, gameOverImg;

var restart, restartImg, live = 0;

var bg;

function preload() {
    boyImg = loadImage("images/boy.png");
    fruitsImg = loadImage("images/friuts.png");
    vegiesImg = loadImage("images/vegies.png");
    burgers = loadImage("images/burger.png");
    fries = loadImage("images/fries.png");
    pizzas = loadImage("images/pizza.png");
    gameOverImg = loadImage("images/gameOver.png");
    restartImg = loadImage("images/restart.png");
    bg = loadImage("images/bg.webp");
    groundImg = loadImage("images/floor.png");
    gameOverS = loadSound("gameOver.mp4");
}

function setup() {
    createCanvas(1000,600);
    ground = createSprite(500,790,1000,30);
    ground.addImage(groundImg);
    ground.scale = 4.7;

    iGround = createSprite(500,590,1000,30);

    boy = createSprite(100,400);
    boy.addImage(boyImg);
    boy.scale = 0.2;
    
    gameOver = createSprite(500,150);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;

    restart = createSprite(500,400);
    restart.addImage(restartImg);
    restart.scale = 0.5;

    healthyFoodG = new Group();
    junkFoodG = new Group();
}

function draw() {
    background(bg);

    if(gameState === PLAY) {
        iGround.visible = false;
    boy.collide(iGround);

    ground.velocityX = -5;
    if (ground.x < 0){
        ground.x = ground.width/2;
    }

    if(keyDown("space")) {
        boy.velocityY = -12;
    }
    boy.velocityY += 1;
    boy.visible = true;

    textSize(35);
    fill("black");
    text("Lives: " + live, 50,50);

    gameOver.visible = false;
    restart.visible = false;

    if(boy.isTouching(healthyFoodG)) {
        live= live + 1;
        healthyFoodG.destroyEach();
    }

    if(boy.isTouching(junkFoodG)) {
        gameState = END;
        junkFoodG.destroyEach();
    }

    if(boy.isTouching(junkFoodG) && live !== 0) {
       live -= 1;
       junkFoodG.destroyEach();
    }
    obstacle();
    lives();
}

    if(gameState === END) {
        gameOver.visible = true;
        restart.visible = true;

        boy.visible = false;
        gameOverS.play(0.1);
    }

    if(mousePressedOver(restart)) {
        gameState = PLAY;
        reset();
    }

    drawSprites();
}

function obstacle() {
    var x = Math.round(random(130,150))
    if(frameCount % x === 0) {
        junkFood = createSprite(1000,550,20,20);
        junkFood.velocityX = -5;
        junkFood.scale = 0.5;
        var rand = Math.round(random(1,3));
        switch(rand) {
            case 1: junkFood.addImage(burgers);
            junkFood.scale = 0.06;
            break;
            case 2: junkFood.addImage(fries);
            junkFood.scale = 0.5;
            break;
            case 3: junkFood.addImage(pizzas);
            junkFood.scale = 0.095;
            break;
            default: break;
        }
        junkFoodG.add(junkFood);
    }

}
function lives() {
    var x = Math.round(random(130,150));
    if(frameCount % x === 0) {
        healthyFood = createSprite(1000,150,20,20);
        healthyFood.velocityX = -5;
        healthyFood.scale = 0.5;
        var rand = Math.round(random(1,2));
        switch(rand) {
            case 1: healthyFood.addImage(vegiesImg);
            healthyFood.scale = 0.5;
            break;
            case 2: healthyFood.addImage(fruitsImg);
            healthyFood.scale = 0.05;
            break;
            default: break;
        } 
        healthyFoodG.add(healthyFood);
    }
   
}

function reset() {
    iGround.visible = false;
    boy.collide(iGround);

    ground.velocityX = -5;
    if (ground.x < 0){
        ground.x = ground.width/2;
    }

    if(keyDown("space")) {
        boy.velocityY = -12;
    }
    boy.velocityY += 1;
    boy.visible = true;

    textSize(35);
    fill("black");
    text("Lives: " + live, 50,50);

    gameOver.visible = false;
    restart.visible = false;
}
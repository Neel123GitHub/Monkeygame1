
var monkey , monkey_running,monkeyCollided;
var banana ,bananaImage, obstacle, obstacleImage,ground,groundImg;
var FoodGroup, obstacleGroup;
var survivalTime,PLAY=0,END=1;
var gameState=PLAY,invisibleGround;
var survivalTime,bananasCollected;
 localStorage["HighestScore"]=0;
function preload(){
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImg = loadImage("grassimg.png");
  monkeyCollided=loadAnimation("sprite_1.png");
}

function setup() {
  createCanvas(400,400);

  //adding groups
  obstacleGroup= createGroup();
  FoodGroup= createGroup();
  
  //adding monkey
  monkey=createSprite(50,340,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkeyCollided);
  monkey.scale=0.2;
  
  //creating the ground
  ground=createSprite(40,340,20,20);
  ground.addImage(groundImg);
  ground.scale=1;
  ground.x=ground.width/2;
  ground.velocityX=-3;
  ground.depth=monkey.depth;
  monkey.depth=monkey.depth+1;
  
  //creating invisible Ground
  invisibleGround=createSprite(200,397,400,7);
  invisibleGround.visible=false;
  
  //initial survivalTime
  survivalTime=0;
  
  //collecting bananas
  bananasCollected=0;
}

function draw() {
  background("lightblue")
  
  if(gameState ===PLAY){
    //adding text
    text("Survival Time:" +survivalTime,50,50);
    textSize=15;
    text("Bananas Collected:" +bananasCollected,270,50);
    textSize=15;
    
    //resetting ground
    if(ground.x<0){
      ground.x=ground.width/2;
  } 
    
    //calculating time
    survivalTime=Math.ceil(frameCount/frameRate());
    
    //spawning fruits
  spawnFood();
    
   //spawning obstacles
  spawnObstacles();
    
    //making monkey jump
    if(keyDown("space")){
      monkey.velocityY=-15;
 } 
    //adding gravity
    monkey.velocityY=monkey.velocityY + 0.8;
    
    //collecting bananas
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      bananasCollected=bananasCollected+1;
   }
    
    //colliding monkey
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
  }
}
  
  if(gameState===END){
    monkey.changeAnimation("collided",monkeyCollided);
    ground.velocityX=0;
    FoodGroup.velocityXEach=0;
    FoodGroup.destroyEach();
    obstacleGroup.velocityXEach=0;
    obstacleGroup.destroyEach();
    FoodGroup.lifetime=-1;
    obstacleGroup.lifetime=-1;
    monkey.destroy();
    
    //calculating highscore
    if(localStorage["HighestScore"]<survivalTime){
      localStorage["HighestScore"]=survivalTime;
}
    //displaying text
    text("HighestTime:"+localStorage["HighestScore"],170,150);
}
  drawSprites();
  
  //making monkey collide with invisible ground
  monkey.collide(invisibleGround);
}

function spawnFood(){
  if(frameCount%80===0){
    banana=createSprite(200,60,20,20);
    banana.addImage(bananaImage);
    banana.lifetime=400/3;
    banana.velocityX=-3;
    banana.scale=0.25;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%200===0){
    obstacle=createSprite(450,350,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.lifetime=400/3;
    obstacle.velocityX=-3;
    obstacle.scale=0.5;
    obstacleGroup.add(obstacle);
  }
}





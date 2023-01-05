var PLAY = 1
var END = 0
var gameState = PLAY
var bunny, bunnyImg;
var backgroundImg;
var invsGround;
var carrotImg;
var carrotGroup, carrot;
var score = 0;
var rocksImg, treeImg, obstacle1, obstacleGroup;

function preload(){
  backgroundImg = loadImage("./pics/Background.jpeg");
  bunnyImg = loadImage("./pics/bunny.png")
  carrotImg = loadImage("./pics/carrotR.png")
  rocksImg = loadImage("./pics/rocks1R.png")
  treeImg = loadImage("./pics/treeTrunkR.png")

}

function setup(){
  createCanvas(800,600);
  
  bunny = createSprite(50, 550, 50,50 )
  bunny.addImage("bunny", bunnyImg)
  bunny.scale = 0.4

  invsGround = createSprite(400,600,800,10)

  carrotGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw(){
  background(backgroundImg);

  textSize(18)
  fill("white")
  text("Score : " + score, 400, 100)

  if(keyDown("up_arrow")){
    bunny.velocityY = - 15;
  }

  bunny.velocityY = bunny.velocityY + 0.5;

  if (gameState === PLAY){
    if(keyDown("right_arrow")){
      bunny.x = bunny.x + 3;
    }

    spawnObstacles();
    
    spawnCarrots();
    
    if(bunny.overlap(carrotGroup, function(collector,collected){
      collected.destroy();
      score = score + 5;
    }))

    if(obstacleGroup.isTouching(bunny)){
      console.log("hello")
      gameState = END
    }

  

  }
  else if (gameState === END) {
    obstacleGroup.setVelocityXEach(0);
    carrotGroup.setVelocityXEach(0);

  }
    
    bunny.collide(invsGround)
    
    drawSprites();

 

}

function spawnCarrots(){
  if(frameCount % 120 === 0){
    carrot = createSprite(800,300,10,30);
    carrot.y = Math.round(random(200,400));
    carrot.addImage(carrotImg);
    carrot.velocityX = -4;
    carrot.scale = 0.5;
    carrot.lifetime = 200;

    carrotGroup.add(carrot);
  }
}

function spawnObstacles(){
  if(frameCount % 240 === 0){
    obstacle1 = createSprite(800,550,10,30);
    obstacle1.addImage(rocksImg);
    obstacle1.scale = 0.2;
    obstacle1.lifetime = 200;
    obstacle1.velocityX = -4;

    var rand = Math.round(random(1,2));

    obstacleGroup.add(obstacle1);

    // if(rand === 1){
    //   obstacle1.addImage(rocksImg)
    // }
    // else{
    //   obstacle1.addImage(treeImg)
    // }
  }

}

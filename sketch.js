var sword, swordImage;
var fruitImg1, fruitImg2,fruitImg3,fruitImg4,fruitsGroup;
var  aliensImg1, aliensGroup,aliensImg2; 
var gameState, END, PLAY;
var gmoImg;
var cutSound, gameoverSound;

function preload(){
  
  swordImage = loadImage("sword.png"); 
  fruitImg1 = loadImage("fruit1.png");
  fruitImg2 = loadImage("fruit2.png");
  fruitImg3 = loadImage("fruit3.png");
  fruitImg4 = loadImage("fruit4.png");
  aliensImg1 = loadImage("alien1.png");
  aliensImg2 = loadImage("alien2.png");
  gmoImg = loadImage("gameover.png");
  cutSound = loadSound("knifeSwooshSound.mp3");
  gameoverSound = loadSound("gameover.mp3");
}

function setup(){
  
  createCanvas(400,400)
  sword = createSprite(200,200,10,10);  
  sword.addImage(swordImage);
  sword.scale = 0.5;
  score = 0;
  fruitsGroup = new Group();
  aliensGroup = new Group();
  PLAY = 1;
  END = 0;
  gameState = PLAY;
}

function draw(){
 background("cyan")

 
  
 
  
  if (gameState  === PLAY){
     sword.x = mouseX;
     sword.y = mouseY;
    
     spawnFruit();
     spawnAliens();
    
    if (sword.isTouching(fruitsGroup)){
     fruitsGroup.destroyEach();
     score = score+2;
     cutSound.play();
    }
    
   if (sword.isTouching(aliensGroup)){
      aliensGroup.destroyEach();
      fruitsGroup.destroyEach();
      score = 0;
      gameoverSound.play();
      gameState = END;
      
   }
    
 }
  
  else if(gameState=== END){
    
    sword.addImage(gmoImg);
    sword.x = 200;
    sword.y = 200;
  }
  drawSprites();
  text("score"+" " +"is"+" "+ score,180,10);
  
}
function spawnFruit(){
  if (frameCount%80===0){
  var fruit = createSprite(390,Math.round(random(30,370)),10,10);
  fruit.velocityX = -4;
  var r = Math.round(random(1,4));
  switch(r){
    case 1 : fruit.addImage(fruitImg1);
             break;
    case 2 : fruit.addImage(fruitImg2);
             break;
    case 3 : fruit.addImage(fruitImg3);
             break;
    case 4 : fruit.addImage(fruitImg4);
             break;         
  }
    var position = Math.round(random(1.2));
    
    if(position===1 && score>=10){
      fruit.x = 0;
      fruit.velocityX = 7+score/4;
    }
    else if(position ===2){
      fruit.velocityX = -7-score/4;
      fruit.x = 400;
    }
       
  fruit.scale = 0.2;
  fruit.lifetime= 100;
  fruitsGroup.add(fruit);
  
  }
}

function spawnAliens(){
  
  if (frameCount%200===0){
    var alien = createSprite(370,Math.round(random(30,370)),10,10);
    alien.velocityX = -4-score/10;
    r = Math.round(random(1,2));
    if (r===1){
      alien.addImage(aliensImg1);
    }
    else{
      alien.addImage(aliensImg2);
    }
    
    var position = Math.round(random(1.2));
    
   if(position===1 && score>=14){
      alien.x = 0;
      alien.velocityX = 7+score/10;
    }
    else if(position ===2){
      alien.velocityX = -7-score/10;
      alien.x = 400;
    }
    
    alien.scale = 1;
    alien.lifetime = 100;
    aliensGroup.add(alien);
  }
  
}






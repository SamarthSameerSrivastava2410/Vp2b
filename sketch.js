var foodValue, food, foodSt, x, feed, addFood, lastFed, lastfed, button1, button2, y, x,
hour;

function preload() {
  dog_img = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  milkBottle = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(800, 800);
  database = firebase.database();
  dog = createSprite(630, 350, 10, 10);
  dog.addImage(dog_img);
  dog.scale = 0.3

  button1 = createButton('Feed Dog');
  button1.position(630, 500);

  button2 = createButton('Add stock');
  button2.position(760, 500);

  foodValue = database.ref('/');
  foodValue.on("value", readValue);

  lastFed = database.ref('/');
  lastFed.on("value", readTime);

  button1.mousePressed(writeStock);
  button2.mousePressed(addFood);

  timing();

  /*milk1 = createSprite(100, 230, 20, 20);
  milk2 = createSprite(150, 230, 20, 20);
  milk3 = createSprite(200, 230, 20, 20);
  milk4 = createSprite(250, 230, 20, 20);
  milk5 = createSprite(300, 230, 20, 20);
  milk6 = createSprite(100, 300, 20, 20);
  milk7 = createSprite(150, 300, 20, 20);
  milk8 = createSprite(200, 300, 20, 20);
  milk9 = createSprite(250, 300, 20, 20);
  milk10 = createSprite(300, 300, 20, 20);

  milk1.addImage(milkBottle);
  milk2.addImage(milkBottle);
  milk3.addImage(milkBottle);
  milk4.addImage(milkBottle);
  milk5.addImage(milkBottle);
  milk6.addImage(milkBottle);
  milk7.addImage(milkBottle);
  milk8.addImage(milkBottle);
  milk9.addImage(milkBottle);
  milk10.addImage(milkBottle);

  milk1.scale = 0.1;
  milk2.scale = 0.1;
  milk3.scale = 0.1;
  milk4.scale = 0.1;
  milk5.scale = 0.1;
  milk6.scale = 0.1;
  milk7.scale = 0.1;
  milk8.scale = 0.1;
  milk9.scale = 0.1;
  milk10.scale = 0.1;
*/
  
}


function readValue(data) {
  foodSt = data.val();
  food = foodSt.Food;
  console.log(food);
}


function readTime(data) {
  timeS = data.val();
  lastfed = timeS.FeedTime;
  console.log(lastfed);
}


function writeStock() {

  if (food <= 0) {
    food = 0
  }
  else {
    food= food - 1
  }

  database.ref('/').set({
    Food: food,
    FeedTime: hour,
  })


}

function addFood() {

  

  database.ref('/').set({
    Food:food+1,
    FeedTime: hour,
  })


}

async function timing() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  hour = datetime.slice(11, 13);
  console.log(hour);
}

function draw() {
  background(46,139,87);


 push();
  fill("white");
  textSize(20);
  text("Food Remaining: " + food, 250, 150);
  text("Last Fed: " + lastfed, 250, 100);
  pop();
/*
milk1.display();
  milk2.display();
  milk3.display();
  milk4.display();
  milk5.display();
  milk6.display();
  milk7.display();
  milk8.display();
  milk9.display();
  milk10.display();
*/
 
drawSprites();
var x=70,y=150; 
if (food != 0){
  
  for(var i = 0; i < food; i++){
    if(i%10 === 0){
      x = 70
      y = y + 50

    }
    image(milkBottle, x, y, 50, 50);
    x = x + 30



  }
}
}

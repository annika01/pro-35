//Create variables here

var dog, dogimg1, dogimg2, db, foods, foodstock, fedtime,lastfed, feed,addfood,foodobject

function preload()
{
  //load images here
  dogimg1=loadImage("images/Dog.png")
  dogimg2=loadImage("images/happydog.png")
}

function setup() {
	createCanvas(800, 700);
  db=firebase.database()
  dog=createSprite(450, 300)
  dog.addImage(dogimg1)
  dog.scale= 0.15
  db.ref("Food").on("value",readStock)
  foodobject=new Food()
  feed= createButton("feed the dog")
  feed.position(500,95)
  feed.mousePressed(feedDog)

  addfood= createButton("add food")
  addfood.position(600,95)
  addfood.mousePressed(addFood)
  
}


function draw() { 
  background("yellow") 
  foodobject.display()

db.ref("feedtime").on("value",function(data) {
  lastfed=data.val()
})


  drawSprites();
  textSize(25)
  if(lastfed>=12){
    text("lastfed:"+lastfed%12+"pm",350,30)

  }
else if(lastfed==0){
  text("lastfed:12am",350,30)

}
else {
text("lastfed:"+lastfed+"am",350,30)

}
  
  //add styles here

}
function readStock(data){
foods= data.val()
foodobject.updateFoodStock(foods)
}
function feedDog() {
  dog.addImage(dogimg2)
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
  db.ref("/").update({
    Food:foodobject.getFoodStock(),
    feedtime:hour()
  })
}
function addFood() {
  foods++
  db.ref("/").update({
Food: foods
  })
}

var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
//Detect any key is pressed or not.

$(document).on("keypress",function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

// check whether any button clicked
  $('.btn').click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound("sounds/"+userChosenColor+".mp3");
    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length)-1);
  });

//playsound function which user clicked button

function playSound(name)
{
  var audio = new Audio(name);
  audio.play();
}

function nextSequence()
{
  userClickedPattern = [];
  var randomNumber = Math.random();
  var randomNumber = Math.floor(randomNumber*4);
  randomChoosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColor);

  $('#'+randomChoosenColor).fadeOut(50).fadeIn(50);
  var songFile = "sounds/"+randomChoosenColor+".mp3";
  playSound(songFile);
  animatePress(randomChoosenColor);
  $("#level-title").text("Level "+level);
  level++;

}
function animatePress(currentcolor)
{
  $("#"+currentcolor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentcolor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
      console.log(userClickedPattern);
      console.log(gamePattern);
      console.log("sucesss");
      if(userClickedPattern.length === gamePattern.length)
      {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else
    {
      console.log(userClickedPattern);
      console.log(gamePattern);
      console.log("fail");
      playSound("sounds/wrong.mp3");
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function () {
          $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}
function startOver()
{
  started = false;
  gamePattern = [];
  level = 0;
}

// initiate variables

var colors = ['green', 'red', 'yellow', 'blue'];
// array to store increasing random sequence
var sequence = [];
var round = 0;
// array to store player's plays
var plays = [];
// count how many plays the player made in a round
var playCount = 0;
var strict = false;
var running = false;

// start a new round  
function newRound (){
  playCount = 0;
  //check if the last play was correct. If not, and if the game isn't in strict mode, repeat last sequence
  if (ok){
    sequence.push(Math.floor(Math.random()*4));  
    round++;
    if (round > 20) { // alert when pass round 20
      alert('You won!');
      restartGame();
    }
      
  }  else { 
    ok = 1;
  }
  animate(sequence);
  // append 0
  if (round < 10){
    $('#display').html('0'+round);
  } else {
    $('#display').html(round);
  }
};

// animate sequence calling the lightUp in order
function animate(sequence){
  var i = 0;
  var interval = setInterval(function(){
    lightUp('#'+colors[sequence[i]]);
    i++;
    if (i >= sequence.length){
      clearInterval(interval);
    }
  }, 600);
}

// function for light up and sound
function lightUp(tile) {
  $(tile).addClass('lit');
  var c = tile
  if( tile.charAt( 0 ) === '#' )
     var c = tile.slice(1);
  $("#sound"+c).get(0).cloneNode().play();
  setTimeout(function(){
    $(tile).removeClass('lit');
  }, 300);
}

var ok = 1; //variable to store correct play
function checkOk(play, c){
  if (play != sequence[c-1]) { // check if the player made a mistake
    $("#soundWrong").get(0).cloneNode().play();
    $('#display').html('!!');
    ok = 0;
    setTimeout(function(){ // restart the game if it is in Strict mode 
      if(strict)
        restartGame();
      else 
        newRound();
      
    },1000)
  } 
}
// restart all important variables and display
function restartGame(){
  sequence = [];
  round = 0;
  plays = [];
  playCount = 0;
  $('#display').html('0'+round);
  $('#start').prop('disabled',false);
}

// check if all the plays in a round were correct and start a new round in 1 second
function startNewRound(playCount){
  if (sequence.length == playCount)
    setTimeout(newRound, 1000);
}


// event handlers, buttons functions
$(document).ready(function(){
  
  $('.piece').click(function(){
    
    playCount++;
    var piece = $(this).attr('data-tile');
    
    lightUp('#'+$(this).attr('id'));
    plays.push(piece);
    checkOk(piece, playCount);
    
    
    if(ok>0)
      startNewRound(playCount);
    

  });
  
  $('#reset').click(restartGame);

  $('#strict').click(function(){
    $(this).toggleClass('red');

    if (strict == true) 
      strict = false;
    else 
      strict = true;
    

  });


  $('#start').click(function(){
    ok = 1;
    newRound();
    $(this).prop('disabled',true);
    running = true;
  });

})
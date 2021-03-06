 var matched_cards = 0
 //global variable that stores the number of matched cards

 var card_list =
 //array that hold all the 16 possible card classes
 ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle",
 "fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o",
 "fa-cube"];

 var create_deck =
 document.getElementById('cards_deck').appendChild(makeUL(shuffle(card_list)));
 //create the deck


 var list = [];
 //array that holds the opened card elements

//all timer related global variables
var start_time = document.getElementsByTagName('p')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    seconds = 0, minutes = 0, hours = 0,
    t;

//all moves related global variables
var moves = document.getElementsByClassName('moves')[0];
var start_move = 0;

var star_rating = 3;

function makeUL(array) {
  //Create the list element:
  var list = document.createElement('ul');
  list.className = 'card';
  list.className = 'deck';

  for(var i = 0; i < array.length; i++){
    //Create the list item:
    var item = document.createElement('li');
    var att = document.createAttribute("class");
    att.value = "card " + "fa " + array[i];
    item.setAttributeNode(att);

    //Add it to the list:
    list.appendChild(item);
  }

  //return the constructed list:
  return list;
}


function restarting(){
  'use strict';
  $(".restart").each(function(){
    $( ".restart" ).click(function() {
      //by clicking on the restart button you reload the page
      location.reload();
  })});}


function shuffle(array) {
  // Shuffle function from http://stackoverflow.com/a/2450976
    'use strict';
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function open_card(list_item){
  //display the clicked card
  'use strict';
  list_item.addClass("open show");
}

function add_to_opened_cards(list_item){
  //add the clicked card to a list
  'use strict';
  list.push(list_item);
}


function remove_from_opened_cards(list_item){
  //remove the clicked card from a list
  'use strict';
  list.pop(list_item);
  list_item.removeClass("open show");
}


function matched(list_item){
  //add a class match so the user knows they guessed right
  'use strict';
  list_item.addClass("match");
}


function delayedFunction(input_function) {
  //wait 2 seconds before executing the function
  'use strict';
  window.setTimeout(input_function, 2000);
}


function timer (input_function) {
  //wait x seconds before executing the function
  'use strict';
  window.setInterval(input_function, 1000);
}


function remove_stars(){
  //remove one star after 10 moves and another one after 20 moves
  'use strict';
  if (start_move==1){
    var star = document.getElementById('stars');
    star.removeChild(star.childNodes[0]);
  }
  else{
    if(start_move==10){
      var star = document.getElementById('stars');
      star.removeChild(star.childNodes[0]);
      star_rating = 2;
    }
    else{
      if(start_move==11){
        var star = document.getElementById('stars');
        star.removeChild(star.childNodes[0]);
      }
      else{
        if(start_move==20){
          var star = document.getElementById('stars');
          star.removeChild(star.childNodes[0]);
          star_rating = 1;
      }
    }
}
}}


function matching(){
  //checks if there is more than one card open
  'use strict';
  if (list.length>1){
    start_move++;
    moves.textContent = start_move+" move(s)";
    remove_stars();
    //checks if the two cards are the same
    if(list[0]===list[1]){
      //if the two cards are the same the class match is added
      $("li").each(function(){
        if($(this).hasClass(list[0])===true){
          matched($(this));
          matched_cards = matched_cards+1;
          remove_from_opened_cards($(this));
          game_won();
      }})}
    else{
      //if they are different, then the class open and show are removed
      $("li").each(function(){
          remove_from_opened_cards($(this));

      //remove_from_opened_cards($(this));
  })}}}


function play_game(){
  //function that executes all functions when clicking on the single card items
  'use strict';
  $("#cards_deck li").each(function(){
    $(this).click(function(){
    //function to show the symbol of the card
      open_card($(this));
      add_to_opened_cards(this.className);
      delayedFunction(matching);
    }
      );});}

//Alternative function to restarting:
function restart_game(){
  //function to shuffle deck and start a new game
  'use strict';
  $(".restart").each(function(){
    $( ".restart" ).click(function() {
      $('.remove_deck').empty();
      document.getElementById('cards_deck').appendChild(makeUL(shuffle(card_list)));
      play_game();
    })})}


function game_won(){
    //function to check if all cards matched
    'use strict';
    if(matched_cards===16){
        if(confirm("Congratulations, you won!!\nIt took you "+minutes+":"+seconds+" to finish the game with a "+star_rating+" star rating!"+"\nDo you want to play again?")){
          location.reload();
        }else{
          alert("Thanks for playing, see you soon!");
        }}}


function add() {
  //function to add seconds, minutes and hours to the timer
  'use strict';
  seconds++;
  if (seconds >= 60) {
  seconds = 0;
  minutes++;
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }}
  start_time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  }


function timer() {
  //function to repeat the add function every second
  'use strict';
  t = setInterval(add, 1000);
  }

// Start button
start.onclick = function(){
  'use strict';
  timer();
  }

// Stop button
stop.onclick = function() {
  'use strict';
  clearTimeout(t);
  }


$( document ).ready(function(){
  'use strict';
  play_game();
  restarting();
  game_won();
  })

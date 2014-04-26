if (localStorage.getItem("totalClicks")==null){
	localStorage.setItem("totalClicks", 0);	
}

var total_numClicks=parseInt(localStorage.getItem("totalClicks"));
var numclicks=0;
var match=[];
var matching = [];
var all_left= new Array();
var cardsLeft=0;
var pts=0;
var single=document.createElement("BUTTON");
var multi=document.createElement("BUTTON");
var net=document.createElement("BUTTON");
var s_text=document.createTextNode("Single Player");
var m_text=document.createTextNode("MultiPlayer");
var net_text=document.createTextNode("Network Play");
var game_mode;
var player_turn=1;
var turn=document.createElement("div");
var player1;
var player2;
var player1points=0;
var player2points=0;
var player1pts=document.createElement("div");
var player2pts=document.createElement("div");


var createDeck = function() {
// based on code from http://www.brainjar.com/js/cards/default2.asp
  var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9",
                        "10", "J", "Q", "K"];
  var suits = ["♣", "♦", "♠", "♥"];  
  var j, k, index=0;
  var pack_size;

  // Set array of cards.
  // total number of cards
  pack_size = ranks.length * suits.length;
  var cards = [];
  

  // Fill the array with 'n' packs of cards.
  while (index < pack_size){
    for (j = 0; j < suits.length; j++){
       for (k = 0; k < ranks.length; k++){
          console.log("k:",k,"index:",index);
          cards[index] = {rank:ranks[k], suite:suits[j]};
          index++;
          }
       }
    }
  console.log(cards.length);
  return cards;
}


var showCards = function(cardJSON) {
var cardDiv=[];
txt = cardJSON.rank + cardJSON.suite;   
card = document.createElement("p");
card.textContent = txt;
card.className = "card";
card.innerHTML = card.innerHTML +"<div onclick='getClick(this);' class='overlay'></div>";
if(txt.match(/♣/g)){
    card.className=card.className+" club";
}
if(txt.match(/♦/g)){
    card.className=card.className+" diamond";
}
if(txt.match(/♥/g)){
    card.className=card.className+" heart";
}
if(txt.match(/♠/g)){
    card.className=card.className+" spade";
}

console.log(card);
document.querySelector(".sideBox").appendChild(card);
}

var getClick=function(a){
  if (game_mode==0){
  	if (a.id==="match"){
  	}
  	else if (a.id==="clicked"){
  	}
  	else{
  		a.id="clicked";
    		cardClicked();
  	}
  }
  else
  {
    if (a.id==="match"){
    }
    else if (a.id==="clicked"){
    }
    else{
      a.id="clicked";
      multicardClicked();
    }
  }
}

var gameDeck = function(deck) {
    var idx;
    var ind;
    var i;
    var cards1=[];
    for (idx = 0; idx < 8; ++idx) {
        console.log("so far, so good",deck[idx]);
        ind=Math.floor((Math.random()*52));
        cards1[idx]=deck[ind];
    }
    for (idx = 8; idx < 16; ++idx) {
        console.log("so far, so good",deck[idx]);
        cards1[idx]=cards1[idx-8];
    }
      
    shuffle(cards1);
    for(i=0;i<cards1.length;i++){
        showCards(cards1[i]);
    }
    
}
var showDeck = function(deck){
    var idx;
    for (idx = 0; idx < 16; ++idx) {
            console.log("so far, so good",deck[idx]);
            showCards(deck[idx]);
    }
}

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function cardClicked(){
	document.getElementById("flip").play();
	var movesLeft=document.getElementById("moves");
	var points=document.getElementById("pts");
	if (total_numClicks<24){
		numclicks+=1;
	    var x = document.getElementById('clicked');
		x.className="show";	
		matching[numclicks]=x;
	    match[numclicks]=x.parentNode.textContent;
	    if (numclicks==2)
		{
      total_numClicks+=1; 
      movesLeft.innerHTML="Moves left: "+(24-total_numClicks);
			if(match[1]===match[2]){
				document.getElementById("match").play();
				points.innerHTML="Points: "+(pts+=100);
				matching[1].id="match";
				matching[2].id="match";
			}
			else{
				setTimeout(function() {
					matching[1].className="overlay";
					matching[2].className="overlay";
				},300);
			}
			numclicks=0;
		}
	    if(x.id!=="match"){
	    	x.id="init";
	    }
	    var all = document.getElementsByClassName("show");
	    if (all.length==16){
	    	alert ("Game Completed!");
	    }
	}
	else
	{
		document.getElementById("gameOver").play();
		all_left = document.getElementsByClassName("overlay");
		try{
			while (all_left[0].className!=="show")
			{
				all_left[0].className="show";
			}
		}
		catch (error){

		}
		alert("Game Over");
	}
}



function multicardClicked(){
  document.getElementById("flip").play();
  var movesLeft=document.getElementById("moves");
    numclicks+=1;
    var x = document.getElementById('clicked');
    x.className="show"; 
    matching[numclicks]=x;
      match[numclicks]=x.parentNode.textContent;
      if (numclicks==2)
    {
      if(match[1]===match[2]){
        document.getElementById("match").play();
        if (player_turn==1){
          player1pts.innerHTML=player1+": "+(player1points+=100);
        }
        if (player_turn==2){
          player2pts.innerHTML=player2+": "+(player2points+=100);
        }
        matching[1].id="match";
        matching[2].id="match";
      }
      else{
        if (player_turn==1){
          player_turn=2;
        }
        else
        {
          player_turn=1;
        }
        setTimeout(function() {
          matching[1].className="overlay";
          matching[2].className="overlay";
        },300);
      }
      if (player_turn==1){
      	turn.innerHTML=player1+"'s Turn";
      }
      else
      {
      	turn.innerHTML=player2+"'s Turn";
      }
      numclicks=0;
    }
      if(x.id!=="match"){
        x.id="init";
      }
      var all = document.getElementsByClassName("show");
      if (all.length==16){
        if (player1points>player2points){
          alert (player1+" Wins!");
        }
        else if (player2points>player1points){
          alert (player2+" Wins!");
        }
        else{
          alert("Game Tie!")
        }
        
      }
  /*else
  {
    document.getElementById("gameOver").play();
    all_left = document.getElementsByClassName("overlay");
    try{
      while (all_left[0].className!=="show")
      {
        all_left[0].className="show";
      }
    }
    catch (error){

    }
    alert("Game Over");
  }*/
}

var saveGame = function(){
	if (typeof(Storage) != "undefined"){
  	// Store
  		localStorage.setItem("totalClicks", total_numClicks);
      if (localStorage.getItem("name")===null){
    		var name = window.prompt("Please enter your name","");
    		localStorage.setItem("name",name);
      }
  		var player=document.getElementById("player");
		  player.innerHTML="You are playing as "+localStorage.getItem("name");
	}
}


function newGame(){
  		location.reload();
      localStorage.setItem("totalClicks",0);
      var name = window.prompt("Please enter your name","");
      localStorage.setItem("name",name);
      var player=document.getElementById("player");
      player.innerHTML="You are playing as "+localStorage.getItem("name");
  		var ov=Array.prototype.slice.call(document.getElementsByClassName("overlay"));
  		var shw=Array.prototype.slice.call(document.getElementsByClassName("show"));
  		var tot=ov.concat(shw);
}

function t(){
  if (typeof(Storage) != "undefined"){
    document.getElementById("player").innerHTML="You are playing as "+localStorage.getItem("name");
  }
    var numclicks=0;  
    var deck = createDeck();
    gameDeck(deck);
}


function mode(){
    single.appendChild(s_text);
    multi.appendChild(m_text);
    net.appendChild(net_text);
    single.className="single";
    multi.className="multi";
    net.className="net";
    document.body.appendChild(single);
    document.body.appendChild(multi);
    document.body.appendChild(net);

    single.onclick=function(){
      document.getElementById("pts").style.visibility="visible";
      document.getElementById("moves").style.visibility="visible";
      game_mode=0;
      single.style.display="none";
      multi.style.display="none";
      net.style.display="none";
      /*document.body.removeChild(single);
      document.body.removeChild(multi);*/

      t();
    }
    multi.onclick=function(){
      document.getElementById("player").style.display="none";
      document.getElementById("pts").style.display="none";
      document.getElementById("moves").style.display="none";
      player1=window.prompt("Please enter your name","player1");
      player2=window.prompt("Please enter your name","player2");
      game_mode=1;
      single.style.display="none";
      multi.style.display="none";
      net.style.display="none";
      turn.className="turn";
      document.body.appendChild(turn);
      turn.innerHTML=player1+"'s Turn";
      player1pts.className="player1pts";
      player1pts.innerHTML=player1+" "+":"+" "+player1points;
      document.body.appendChild(player1pts);

      player2pts.className="player2pts";
      player2pts.innerHTML=player2+" "+":"+" "+player2points;
      document.body.appendChild(player2pts);
      /*document.body.removeChild(single);
      document.body.removeChild(multi);*/

      t();
    }

    net.onclick=function(){

      single.style.display="none";
      multi.style.display="none";
      net.style.display="none";
      location.href='index.html'

      t();      
    }

}



window.onload = mode;

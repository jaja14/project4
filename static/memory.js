var createDeck = function() {
// based on code from http://www.brainjar.com/js/cards/default2.asp
  var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9",
                        "10", "J", "Q", "K"];
  var suits = ["C", "D", "H", "S"];
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
txt = cardJSON.rank + cardJSON.suite;    
card = document.createElement("p");
card.textContent = txt;
card.className = "card";
console.log(card);
document.querySelector(".sideBox").appendChild(card);
}

var showDeck = function(deck){
    var idx;
    for (idx = 0; idx < deck.length; ++idx) {
            console.log("so far, so good",deck[idx]);
            showCards(deck[idx]);
    }
}

var deck = createDeck();
showDeck(deck);
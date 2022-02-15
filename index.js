// Create Variables
// var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
// var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = [];
let players = [];
let currentPlayer = 0;
let startingCardCount = 0;
let startingChipCount = 100;

let gameBody = document.querySelector("#game-body");
let startButton = document.querySelector("#btnStart");
let hitButton = document.querySelector("#btnHit");
let playersButton = document.querySelector("#players-button");
let newPlayerForm = document.querySelector("#new-player");
let newNameForm = document.querySelector("#new-name");
let playerDiv = document.querySelector("#players")

let completeDeck, deckId, oneCard, deckSpace, playerArea, playerName, playerNumber;
let playerChips, playerStartCard1, playerStartCard2, cardImage1, cardImage2;


// Add DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(){
    // createDeck();
    // shuffle();
    // createPlayers(1);
    firstDeck();
    newDeck();
    drawCard();
    drawTwoCards();
    
});

// Add Init 
function firstDeck() {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=8`)
      .then((res) => res.json())
      .then((deckData) => {
        deckId = deckData.deck_id
        completeDeck = deckData
        console.log("FIRST DECK:", deckData)
        });
}

function newDeck() {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=8`)
      .then((res) => res.json())
      .then((deckData) => {
        deckId = deckData.deck_id
        completeDeck = deckData
        console.log("NEW DECK:", deckData)
        });
}

function drawCard () {
    fetch("https://deckofcardsapi.com/api/deck/il3c2tz6fgoi/draw/?count=1")
    .then((res) => res.json())
    .then((drawCard) => {
        oneCard = drawCard
        console.log("ONE CARD:", drawCard)
        // createGamblers(drawCard)
        });
}

function drawTwoCards () {
    fetch("https://deckofcardsapi.com/api/deck/il3c2tz6fgoi/draw/?count=2")
    .then((res) => res.json())
    .then((drawCard) => { 
        cardImage1 = drawCard.cards[0].image
        cardImage2 = drawCard.cards[1].image
        console.log("Card Image 1: ", cardImage1)
        console.log("Card Image 2: ", cardImage2)
        console.log("TWO CARDS:", drawCard)
        // createGamblers(drawCard)
        });
}



// Add Functions to Modify

// FOR PLAYERS BUTTON WANT TO CREATE A BLOCK THAT WILL HAVE DIV FOR IMAGE & CHIP COUNTER

playersButton.addEventListener("click", function (event) {
    // Create Elements for Player Area
    playerArea = document.createElement("div")
    playerName = document.createElement("h5")
    playerNumber = document.createElement("h5")
    playerChips = document.createElement("h5")
    playerStartCard1 = document.createElement("img")
    playerStartCard2 = document.createElement("img")

    // Add Content
    playerArea.className = "newPlayerCard"
    playerName.textContent = newNameForm.value
    playerNumber.textContent = "Card Count: " + startingCardCount
    playerChips.textContent = "Chip Count: " + startingChipCount
    
    drawTwoCards();
    playerStartCard1.src = cardImage1
    playerStartCard2.src = cardImage2
    playerStartCard1.id = "deck-card"
    playerStartCard2.id = "deck-card"

    // Append Details
    playerArea.append(playerName, playerNumber, playerChips,playerStartCard1,playerStartCard2)
    playerDiv.append(playerArea)

    
    newPlayerForm.reset()
})

// HIT BUTTON BELOW - PROBABLY NEED TO ADD CARD VALUES/21OVERBUST FUNCTINOALITY HERE

hitButton.addEventListener("click", function (event) {
    function fetchCards () {
    fetch("https://deckofcardsapi.com/api/deck/il3c2tz6fgoi/draw/?count=1")
    .then((res) => res.json())
    .then((drawCard) => {
        oneCard = drawCard
        console.log("ONE CARD:", drawCard)
        createCards(drawCard)
        });  
    console.log("HIT BUTTON CLICKED")
    }
    fetchCards();
})

function createCards (card) {
    deckSpace = document.createElement("img")
    deckSpace.src = card.cards[0].image
    deckSpace.id = "deck-card"
    gameBody.append(deckSpace)
}



// function createGamblers(card) {
//     // Create or Modify Element
//     deckSpace = document.createElement("img")    

//     // Add Content or Style to Element  
//     deckSpace.src = card.cards[0].image
//     deckSpace.id = "deck-card"
    

//     // Append if Necessary
//     gameBody.append(deckSpace)
// }


// function createDeck()
// {
//     deck = [];
//     for (var i = 0 ; i < values.length; i++)
//     {
//         for(var x = 0; x < suits.length; x++)
//         {
//             var weight = parseInt(values[i]);
//             if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
//                 weight = 10;
//             if (values[i] == "A")
//                 weight = 11;
//             var card = { Value: values[i], Suit: suits[x], Weight: weight };
//             deck.push(card);
//         }
//     }
// }

// function createPlayers(num)
// {
//     players = [];
//     for(let i = 1; i <= num; i++)
//     {
//         let hand = []
//         let player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
//         players.push(player);
//     }
// }

// function createPlayersUI()
// {
//     document.getElementById('players').innerHTML = '';
//     for(var i = 0; i < players.length; i++)
//     {
//         var div_player = document.createElement('div');
//         var div_playerid = document.createElement('div');
//         var div_hand = document.createElement('div');
//         var div_points = document.createElement('div');

//         div_points.className = 'points';
//         div_points.id = 'points_' + i;
//         div_player.id = 'player_' + i;
//         div_player.className = 'player';
//         div_hand.id = 'hand_' + i;

//         div_playerid.innerHTML = 'Player ' + players[i].ID;
//         div_player.appendChild(div_playerid);
//         div_player.appendChild(div_hand);
//         div_player.appendChild(div_points);
//         document.getElementById('players').appendChild(div_player);
//     }
// }

// function shuffle()
// {
//     // for 1000 turns
//     // switch the values of two random cards
//     for (var i = 0; i < 1000; i++)
//     {
//         var location1 = Math.floor((Math.random() * deck.length));
//         var location2 = Math.floor((Math.random() * deck.length));
//         var tmp = deck[location1];

//         deck[location1] = deck[location2];
//         deck[location2] = tmp;
//     }
// }

// function startblackjack()
// {
//     document.getElementById('btnStart').value = 'Restart';
//     document.getElementById("status").style.display="none";
//     // deal 2 cards to every player object
//     currentPlayer = 0;
//     createDeck();
//     shuffle();
//     createPlayers(2);
//     createPlayersUI();
//     dealHands();
//     document.getElementById('player_' + currentPlayer).classList.add('active');
// }

// function dealHands()
// {
//     // alternate handing cards to each player
//     // 2 cards each
//     for(var i = 0; i < 2; i++)
//     {
//         for (var x = 0; x < players.length; x++)
//         {
//             var card = deck.pop();
//             players[x].Hand.push(card);
//             renderCard(card, x);
//             updatePoints();
//         }
//     }

//     updateDeck();
// }

// function renderCard(card, player)
// {
//     var hand = document.getElementById('hand_' + player);
//     hand.appendChild(getCardUI(card));
// }

// function getCardUI(card)
// {
//     var el = document.createElement('div');
//     var icon = '';
//     if (card.Suit == 'Hearts')
//     icon='&hearts;';
//     else if (card.Suit == 'Spades')
//     icon = '&spades;';
//     else if (card.Suit == 'Diamonds')
//     icon = '&diams;';
//     else
//     icon = '&clubs;';
    
//     el.className = 'card';
//     el.innerHTML = card.Value + '<br/>' + icon;
//     return el;
// }

// // returns the number of points that a player has in hand
// function getPoints(player)
// {
//     var points = 0;
//     for(var i = 0; i < players[player].Hand.length; i++)
//     {
//         points += players[player].Hand[i].Weight;
//     }
//     players[player].Points = points;
//     return points;
// }

// function updatePoints()
// {
//     for (var i = 0 ; i < players.length; i++)
//     {
//         getPoints(i);
//         document.getElementById('points_' + i).innerHTML = players[i].Points;
//     }
// }

// function hitMe()
// {
//     // pop a card from the deck to the current player
//     // check if current player new points are over 21
//     var card = deck.pop();
//     players[currentPlayer].Hand.push(card);
//     renderCard(card, currentPlayer);
//     updatePoints();
//     updateDeck();
//     check();
// }

// function stay()
// {
//     // move on to next player, if any
//     if (currentPlayer != players.length-1) {
//         document.getElementById('player_' + currentPlayer).classList.remove('active');
//         currentPlayer += 1;
//         document.getElementById('player_' + currentPlayer).classList.add('active');
//     }

//     else {
//         end();
//     }
// }

// function end()
// {
//     var winner = -1;
//     var score = 0;

//     for(var i = 0; i < players.length; i++)
//     {
//         if (players[i].Points > score && players[i].Points < 22)
//         {
//             winner = i;
//         }

//         score = players[i].Points;
//     }

//     document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID;
//     document.getElementById("status").style.display = "inline-block";
// }

// function check()
// {
//     if (players[currentPlayer].Points > 21)
//     {
//         document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
//         document.getElementById('status').style.display = "inline-block";
//         end();
//     }
// }

// function updateDeck()
// {
//     document.getElementById('deckcount').innerHTML = deck.length;
// }


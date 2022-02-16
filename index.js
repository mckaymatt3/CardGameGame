// Create Variables
// var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
// var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = [];
let playerData = [];
let currentPlayer = 0;
let startingCardCount = 0;
let startingChipCount = 100;

let gameBody = document.querySelector("#game-body");
let dealButton = document.querySelector("#btnDeal");
let newGameButton = document.querySelector("#btnStart");
let hitButton = document.querySelector("#btnHit");
let stayButton = document.querySelector("#btnStay")
let playersButton = document.querySelector("#players-button");
let shuffleButton = document.querySelector("#btnShuffle")
let newPlayerForm = document.querySelector("#new-player");
let newNameForm = document.querySelector("#new-name");
let playerDiv = document.querySelector("#players");

let completeDeck, deckId, oneCard, playerArea, playerName, playerNumber;
let playerChips, playerStartCard1, playerStartCard2, cardImage1, cardImage2, cardImage1Value, cardImage2Value;
let deckSpace, deckSpaceValue, playerUpdatedNumber;

// Add DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(){
    // createDeck();
    // shuffle();
    // createPlayers(1);
    firstDeck();
    newDeck();
    drawCard();
    // drawTwoCards();
    // shuffleCards();
    
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
    fetch("https://deckofcardsapi.com/api/deck/vnynz95sxexi/draw/?count=1")
    .then((res) => res.json())
    .then((drawCard) => {
        oneCard = drawCard
        console.log("ONE CARD:", drawCard)
        // createGamblers(drawCard)
        });
}

function drawTwoCards (player) {
    fetch("https://deckofcardsapi.com/api/deck/vnynz95sxexi/draw/?count=2")
    .then((res) => res.json())
    .then((drawCard) => { 
        // Declare Card Elements
        cardImage1 = drawCard.cards[0].image
        cardImage2 = drawCard.cards[1].image
        // NEED TO UPDATE THE ACES TO BE ONE OR TEN
        cardImage1Value = parseInt(drawCard.cards[0].value) ? parseInt(drawCard.cards[0].value) : 10
        cardImage2Value = parseInt(drawCard.cards[1].value) ? parseInt(drawCard.cards[1].value) : 10
        
        // Create Images for Cards
        playerStartCard1 = document.createElement("img")
        playerStartCard2 = document.createElement("img")
        playerNumber = document.createElement("h5")
        
        // Create Content
        playerStartCard1.src = cardImage1
        playerStartCard2.src = cardImage2
        playerStartCard1.id = "deck-card"
        playerStartCard1.className = "userCard"
        playerStartCard2.id = "deck-card"
        playerStartCard2.className = "userCard"
        
        let CardCount = Object.values(playerData[currentPlayer])
        playerNumber.textContent = "Card Count: " + CardCount[2]
        playerNumber.className = "playerNumber"
        
        let updateCardCount = player.cardCount
        updateCardCount = updateCardCount + cardImage1Value + cardImage2Value 
        console.log("Starting Card: ", startingCardCount)
        console.log("Card Image 1: ", cardImage1Value)
        console.log("Card Image 2: " , cardImage2Value)
        playerNumber.textContent = "Card Count: " + updateCardCount
        playerNumber.className = "playerNumber"
        console.log("UpdateCardCount: ", updateCardCount)
        console.log("Player: ", player)
        console.log("Player Data Update: ", playerData)
        player.cardCount = updateCardCount


        //Append
        player.playerDiv.append(playerNumber, playerStartCard1, playerStartCard2)

        //Console Logs
        console.log("Card Image 1: ", cardImage1)
        console.log("Card Image 1 Type: ", typeof(cardImage1))
        console.log("Card Image 2: ", cardImage2)
        console.log("Card Image 2 Type: ", typeof(cardImage2))
        console.log("Card Image 1 Value: ", cardImage1Value)
        console.log("Card Image 2 Value: ", cardImage2Value)

        console.log("TWO CARDS:", drawCard)
        // createGamblers(drawCard)
        });
}

function shuffleCards () {
    fetch(`https://deckofcardsapi.com/api/deck/vnynz95sxexi/shuffle/`)
    .then((res) => res.json())
    .then((drawCard) => console.log(drawCard)) 
}


// Add Functions to Modify

// FOR PLAYERS BUTTON WANT TO CREATE A BLOCK THAT WILL HAVE DIV FOR IMAGE & CHIP COUNTER

playersButton.addEventListener("click", function (event) {
    // Create Elements for Player Area
    playerArea = document.createElement("div")
    playerName = document.createElement("h5")
    playerChips = document.createElement("h5")
    playerNumber = document.createElement("h5")
    
    // Add Content
    playerName.textContent = newNameForm.value
    createPlayerDiv(newNameForm.value, playerArea)

    playerArea.className = "newPlayerCard"
    playerArea.id = newNameForm.value
    
    let chipCount = Object.values(playerData[currentPlayer])
    console.log(chipCount)
    playerChips.textContent = "Chip Count: " + chipCount[1]
    playerChips.className = "playerChips"
    

    // Append Details
    playerArea.append(playerName, playerChips)
    playerDiv.append(playerArea)

    // drawTwoCards();
    // playerData.push(playerArea)
    console.log("ALL PLAYERS: ", playerData)
    newPlayerForm.reset()
})



// function createCards (card) {
//     deckSpace = document.createElement("img")
//     deckSpace.src = card.cards[0].image
//     deckSpace.id = "deck-card"
//     gameBody.append(deckSpace)
// }

//Deal Button Below - to Deal Cards to Each Player
dealButton.addEventListener("click", function () {
    // For each player - deal two cards
    playerData.forEach(individual => {
        drawTwoCards(individual)
        console.log("PLAYER DIV: ", individual)
    });
})


// Shuffle Button Below - to Shuffle Deck and Clear Out Players
shuffleButton.addEventListener("click", function () {
    // Shuffle the Deck
    shuffleCards();

    // And Then Remove Elements
    while (playerDiv.firstChild) {
        playerDiv.removeChild(playerDiv.firstChild)
    }
})

// New Game Button Below - to Clear Out Each Game Content
newGameButton.addEventListener("click", function () {
  //  
    playerData.forEach(individual => {
      newGame(individual)
      console.log("NEw GAME PLAYER DIV: ", individual)
  });
})

function newGame (player) {
    // remove Player Count h5 Element
    let playerNumberRemove = player.playerDiv.querySelector(".playerNumber")
    console.log("Player Number Remove: ", playerNumberRemove)
    playerNumberRemove.remove();
    // reset player count to zero
    player.cardCount = 0
    console.log("Player Card Count to Zero: ", player.cardCount)
    // reset current player to zero
    currentPlayer = 0
    // remove card
    let playerCards = document.querySelectorAll(".userCard")
    console.log(playerCards)
    playerCards.forEach(element => element.remove());
}


// HIT BUTTON BELOW - PROBABLY NEED TO ADD CARD VALUES/21OVERBUST FUNCTINOALITY HERE

hitButton.addEventListener("click", function (event) {
    fetch("https://deckofcardsapi.com/api/deck/vnynz95sxexi/draw/?count=1")
    .then((res) => res.json())
    .then((drawCard) => {
        console.log("ONE CARD:", drawCard)
        // createCards(drawCard)
        deckSpace = document.createElement("img")
        deckSpace.src = drawCard.cards[0].image
        deckSpace.id = "deck-card"
        deckSpace.className = "userCard"
        deckSpaceValue = parseInt(drawCard.cards[0].value) ? parseInt(drawCard.cards[0].value) : 10
        let playerNumberUpdate = playerData[currentPlayer].playerDiv.querySelector(".playerNumber")
        console.log("Player Number Update: ", playerNumberUpdate)
        let playerCardUpdate = playerData[currentPlayer].playerDiv
        console.log("Player Card Update: ", playerCardUpdate)

        let currentCountPlayer = playerData[currentPlayer].cardCount
        currentCountPlayer = currentCountPlayer + deckSpaceValue

        playerNumberUpdate.textContent = "Card Count: " + currentCountPlayer
        playerData[currentPlayer].cardCount = currentCountPlayer

        playerCardUpdate.append(deckSpace)
        
        });  
    console.log("HIT BUTTON CLICKED")
})

stayButton.addEventListener("click", function (event) {
    if (currentPlayer < playerData.length - 1) {
    currentPlayer = currentPlayer + 1
    currentPlayer = currentPlayer
    }
    else {
        currentPlayer = currentPlayer
    }
    }
)

// function eachTurn () {
//     console.log("ALL PLAYERS: ", allPlayers)
//     let currentPlayerDiv = allPlayers[currentPlayer]
//     stay
//     // Stay BUtton to Increment Current Player
//     // stayButton.addEventListener
//     // Run to the end of array length - 1 (if)

// }

// eachTurn();

// function getCurrentPlayerDiv () {
//     return playerData[currentPlayer]
// }


// function getCurrentPlayerNumber () {
//     return getCurrentPlayerDiv().querySelector(".playerNumber")
// }

// function getCurrentPlayerChips() {
//     return getCurrentPlayerDiv().querySelector(".playerChips")
// }

function createPlayerDiv(name, div) {
    let playerState = {
        name: `${name}`,
        chipCount: 100,
        cardCount: 0,
        playerDiv: div
    };
    playerData.push(playerState);
}

function hit() {
    playerData[currentPlayer]
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


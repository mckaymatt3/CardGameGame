// Create Variables
let deck = [];
let playerData = [];
let currentPlayer = 0;
let startingCardCount = 0;
let startingChipCount = 100;
let dealerCardCount = 0;

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
let dealerButton = document.querySelector("#dealerBtn");
let deckDealer = document.querySelector(".dealer");
let deckDealerDiv = document.querySelector("#deckcount");
let dealerCount = document.querySelector("#dealer-count");
let dealerFirstCard = document.querySelector("#dealer-card-first");

let completeDeck, deckId, oneCard, playerArea, playerName, playerNumber, playerBetButton;
let playerChips, playerStartCard1, playerStartCard2, cardImage1, cardImage2, cardImage1Value, cardImage2Value;
let deckSpace, deckSpaceValue, playerUpdatedNumber;
let dealerCardImage, dealerCardImageValue, dealerStartCard, dealerNumber, updateDealerCardCount;


// Add DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(){
    // createDeck();
    // shuffle();
    // createPlayers(1);
    firstDeck();
    newDeck();
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
        //Declare Card Elements
        dealerCardImage = drawCard.cards[0].image
        // NEED TO UPDATE THE ACES TO BE ONE OR TEN
        dealerCardImageValue = parseInt(drawCard.cards[0].value) ? parseInt(drawCard.cards[0].value) : 10
        // Create Images and Headers for Cards
        dealerStartCard = document.createElement("img")
        // Edit Content
        dealerStartCard.src = dealerCardImage
        dealerStartCard.id = "dealer-card"
        dealerStartCard.className = "dealer-card"
        dealerCount.textContent = "Card Count: " + dealerCardCount
        dealerCardCount = dealerCardCount + dealerCardImageValue 
        dealerCount.textContent = "Card Count: " + dealerCardCount

        //Append
        deckDealerDiv.append(dealerStartCard)
        
        });
}

function drawFirstCard () {
    fetch("https://deckofcardsapi.com/api/deck/vnynz95sxexi/draw/?count=1")
    .then((res) => res.json())
    .then((drawCard) => {
        oneCard = drawCard
        console.log("ONE CARD:", drawCard)
        //Declare Card Elements
        dealerCardImage = drawCard.cards[0].image
        // NEED TO UPDATE THE ACES TO BE ONE OR TEN
        dealerCardImageValue = parseInt(drawCard.cards[0].value) ? parseInt(drawCard.cards[0].value) : 10
        // Create Images and Headers for Cards
        dealerStartCard = document.createElement("img")
        // Edit Content
        dealerStartCard.src = dealerCardImage
        dealerStartCard.id = "dealer-card-first"
        dealerStartCard.className = "dealer-card"
        dealerCount.textContent = "Card Count: " + dealerCardCount
        dealerCardCount = dealerCardCount + dealerCardImageValue 
        dealerCount.textContent = "Card Count: " + dealerCardCount

        //Append
        deckDealerDiv.append(dealerStartCard)
        
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
    playerBetButton = document.createElement("button")
    
    // Add Content
    playerName.textContent = newNameForm.value
    createPlayerDiv(newNameForm.value, playerArea)

    playerArea.className = "newPlayerCard"
    playerArea.id = newNameForm.value
    
    let chipCount = Object.values(playerData[currentPlayer])
    console.log(chipCount)
    playerChips.textContent = "Chip Count: " + chipCount[1]
    playerChips.className = "playerChips"

    playerBetButton.textContent = "Bet"
    playerBetButton.addEventListener("click", function (event){
       console.log("CLICKED BET")
       

    })
    
    // Append Details
    playerArea.append(playerName, playerChips, playerBetButton)
    playerDiv.append(playerArea)

    // drawTwoCards();
    // playerData.push(playerArea)
    console.log("ALL PLAYERS: ", playerData)
    newPlayerForm.reset()
})

//Bet Button Function Below


//Deal Button Below - to Deal Cards to Each Player
dealButton.addEventListener("click", function () {
    // For each player - deal two cards
    playerData.forEach(individual => {
        drawTwoCards(individual)
        console.log("PLAYER DIV: ", individual)
    });
    drawFirstCard();
    drawCard();
})


// Dealer Button to Go
dealerButton.addEventListener("click", function () {
    if (dealerCardCount < 16) {
        drawCard();
    }
    else if (dealerCardCount >= 16) {
        dealerCount.style.display = "block";
        console.log(dealerFirstCard)
        // TO FIX: DEALER FIRST CARD NOT WORKING - CANNOT ACCESS
        // dealerFirstCard.style.display = "block";
    }
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
    dealerCardCount = 0;
    let dealerCards = document.querySelectorAll(".dealer-card")
    let dealerCardHeader = document.querySelector("#dealer-count")
    dealerCards.forEach(element => element.remove());
    dealerCardHeader.remove();
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

function createPlayerDiv(name, div) {
    let playerState = {
        name: `${name}`,
        chipCount: 100,
        cardCount: 0,
        playerDiv: div
    };
    playerData.push(playerState);
}


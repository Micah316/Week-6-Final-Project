//Defining the card class with a single playing card
class Card {
    //suit and rank properties represent the card's suit and rank
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
    //this method returns the numerical value of the card's rank
    getRankValue() {
        if (this.rank === 'A') return 14;  //This is an Ace
        if (this.rank === 'K') return 13; //This is the King
        if (this.rank === 'Q') return 12; //This is a Queen
        if (this.rank === 'J') return 11; //This is a Jack
        return parseInt(this.rank);  //This is the numbered cards, non face cards
    }
}
//Defining the deck to represent a deck of cards, the deck class initializes a deck of 52 cards using the card class
class Deck {
    constructor() {
        this.cards = []; 

        const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
    }
    //method shuffles the deck randomly
    shuffle() {
        for (let i = this.cards.length -1; i > 0; i --) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    //this method returns a single card from the deck
    dealCard() {
        return this.cards.pop();
    }
}
//Player is being represented as a player in the game
class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.hand = [];
    }
    //method to remove and return the top card from the player's hand 
    playCard() {
        return this.hand.pop();
    }
    //method adds a card to the player's hand
    receiveCard(card) {
        this.hand.unshift(card);
    }
    //method increases the player's score by 1
    incrementScore() {
        this.score++; 
    }

}
//This is the main game loop and game logic
class WarGame {
    constructor() {
      this.deck = new Deck();
      this.player1 = new Player('Player 1');
      this.player2 = new Player('Player 2');
    }
    //method distributes the cards from the deck to the two players
    dealCards() {
      this.deck.shuffle();
  
      while (this.deck.cards.length > 0) {
        this.player1.receiveCard(this.deck.dealCard());
        this.player2.receiveCard(this.deck.dealCard());
      }
    }
    //method simulates a turn in the game, each player plays a card using the playCard method from the player class
    playTurn() {
      const card1 = this.player1.playCard();
      const card2 = this.player2.playCard();
  
      console.log(`${this.player1.name} plays ${card1.rank} of ${card1.suit}`);
      console.log(`${this.player2.name} plays ${card2.rank} of ${card2.suit}`);
      //compares the ranks of the two played cards using getRankValue method from the card class
      const rankValue1 = card1.getRankValue();
      const rankValue2 = card2.getRankValue();
      
      if (rankValue1 > rankValue2) {
        this.player1.incrementScore();
        console.log(`${this.player1.name} wins the turn.`);
      } else if (rankValue1 < rankValue2) {
        this.player2.incrementScore();
        console.log(`${this.player2.name} wins the turn.`);
      } else {
        console.log('It\'s a tie!');
      }
    }
    //method that starts the game and continues playing turns until one of the players runs out of cards
    playGame() {
      this.dealCards();
  
      while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
        this.playTurn();
      }

      console.log(`\n----- GAME OVER -----\n`);
      console.log(`Final score:`);
      console.log(`${this.player1.name}: ${this.player1.score}`);
      console.log(`${this.player2.name}: ${this.player2.score}`);
    }
  }
  
  // Create a new instance of the game and start playing
  const warGame = new WarGame();
  warGame.playGame();


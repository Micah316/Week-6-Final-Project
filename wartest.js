
const assert = chai.assert;
//test to ensure the correct rank values are being returned
describe('Card', function() {
  it('should return correct rank values', function() {
    const cardA = new Card('Spades', 'A');
    const card5 = new Card('Hearts', '5');
    const cardK = new Card('Diamonds', 'K');

    assert.strictEqual(cardA.getRankValue(), 14);
    assert.strictEqual(card5.getRankValue(), 5);
    assert.strictEqual(cardK.getRankValue(), 13);
  });
});
//test to ensure there are 52 cards after initilaization
describe('Deck', function() {
  it('should have 52 cards after initialization', function() {
    const deck = new Deck();

    assert.strictEqual(deck.cards.length, 52);
  });
//test to ensure a card is dealt
  it('should deal a card', function() {
    const deck = new Deck();
    const card = deck.dealCard();

    assert.strictEqual(deck.cards.length, 51);
    assert.instanceOf(card, Card);
  });
});

$(function(){
  describe("a card", function() {
    Mocks.getCard(function(card) {
      it("must have a name", function() {
        expect(card.name).toBeKnown();
      });
    
      it("must have a type", function() {
        expect(card.type).toBeKnown();
      });
    
      it("must be placed somewhere");
      it("has to tell us about its states");
      it("must be able to change states");
    });
  });
});
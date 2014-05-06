$(function(){

  var prepare = function(card) {
   card.tap = function() {
    this.state.tap = !this.state.tap;
   }
   card.faceDown = function() {
    this.state.faceDown = !this.state.faceDown;
   }
   card.flip = function() {
    this.state.flip = !this.state.flip;
   }

   return card;
  }
  
  describe("a card", function() {
    Mocks.getCard(function(card) {
      card = prepare(card);
      it("must have a name", function() {
        expect(card.name).toBeKnown();
      });
    
      it("must have a type", function() {
        expect(card.type).toBeKnown();
      });
    
      it("must be placed somewhere", function() {
        expect(card.place).toBeKnown();
      });
      it("has to tell us about its states", function() {
       expect(card.state).toBeKnown();
      });
      it("deos state exist", function () {
       if (card.state){
         expect(card.state.flip).toBeKnown();
         expect(card.state.faceDown).toBeKnown();
         expect(card.state.tap).toBeKnown();
       }
      });
      it("must be able to change states", function(){
       if(card.state) {
         expect(card.state.flip).toBe(0);
         expect(card.state.faceDown).toBe(0);
         expect(card.state.tap).toBe(0);

         card.flip();
	 card.tap();
	 card.faceDown();      
	 
         expect(card.state.flip).toBe(1);
         expect(card.state.faceDown).toBe(1);
         expect(card.state.tap).toBe(1);
         
         card.flip();
	 card.tap();
	 card.faceDown();      
	 
         expect(card.state.flip).toBe(0);
         expect(card.state.faceDown).toBe(0);
         expect(card.state.tap).toBe(0);         
       }     
      });
    });
  });
});
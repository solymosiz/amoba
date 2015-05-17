var expect = require('chai').expect;
var Amoba = require('./amoba.js');

var amoba = new Amoba();

describe('Amoba', function() {

  beforeEach('Alap pálya létrehozása', function(done){
    amoba.newGame(10);
    done();
  });
  
  describe('#putHere', function() {
    it('ha elhelyezek egy X-et 3,3-ra, akkor legyen is ott', function() {
        amoba.putHere(3,3);
      
        var result = amoba.map[3][3];
        expect(result).to.eql("X");
    });
  });

});
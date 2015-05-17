var expect = require('chai').expect;
var Amoba = require('./amoba.js');

var amoba = new Amoba();

describe('Amoba', function() {

  beforeEach('Alap pálya létrehozása', function(done){
    amoba.newGame(10);
    done();
  });
  
  describe('#get', function() {
    it('le tudok kérni elemet', function() {
        var result = amoba.get(3,3);
        expect(result).to.eql(amoba.NOTHING_SYMBOL);
    });
  });
  
  describe('#get', function() {
    it('módosított elemet jól kérek le', function() {
        amoba.__put(3,3,3);
        var result = amoba.get(3,3);
        expect(result).to.eql(3);
    });
  });
  
  describe('#putHere', function() {
    it('ha elhelyezek egy X-et 3,3-ra, akkor legyen is ott', function() {
        amoba.putHere(3,3);
      
        var result = amoba.get(3,3);
        expect(result).to.eql(amoba.PLAYER_SYMBOL);
    });
  });
  
  describe('#enemyTurn', function() {
    it('ha már léptem, szeretném ha az ellenfél is lépne', function() {
        amoba.putHere(3,3);
        
        var result = false;
        for (var i = 0; i < amoba.getSize(); i++){
          for (var j = 0; j < amoba.getSize(); j++){
            if (amoba.get(j,i)==amoba.ENEMY_SYMBOL) result = true;
          }
        }
        expect(result).to.eql(true);
    });
  });
  
  describe('#enemyTurn', function() {
    it('a gép csak üres mezőre tehet, ez a teszt meghagyja a [4,6] koordinátát üresen, ott kéne lennie az ellenfél lépésének', function() {
        for (var i = 0; i < amoba.getSize(); i++){
          for (var j = 0; j < amoba.getSize(); j++){
            amoba.__put(j,i,amoba.PLAYER_SYMBOL);
          }
        }
        amoba.__put(4,6,amoba.NOTHING_SYMBOL);
        amoba.__put(3,3,amoba.NOTHING_SYMBOL);
        amoba.putHere(3,3);
        
        var result = amoba.get(4,6);
        
        expect(result).to.eql(amoba.ENEMY_SYMBOL);
    });
  });

});

/*
Az adott pont felteszi, hogy a felette lévő, már kész

------------------------------ Alapvető funkciók, ezek mind kellenek a demóhoz
[x] Játék tábla: (1p)				       Felhasználóként szeretném látni a játéktáblát, hogy tudjak reagálni a játékra.
[x] Jel lerakása: (1p)			      	Felhasználóként szeretném a saját jelem(X/O) elhelyezni a pályán, hogy elkezdhessem a játékot.
[x] Ellenfél: (1p)					        Felhasználóként szeretném, ha a gép is tenne le jeleket az ő körében, hogy ne magammal játszak.
[x] Gép legális lépése: (1p)  	  	Felhasználóként szeretném, ha a gép csak üres mezőre tenne, hogy ne írja föl más korábbi lépését.
------------------------------ Innentől demózható, nagyon fontos funkciók jönnek, amik a játék szerves részei
[ ] Játék vége: (3p)			        	Felhasználóként szeretném, ha megállna játék, mikor valaki 5 elemet elhelyezett egymás mellett, hogy ne folytatódjon, a szabály szerűen végzett meccs.
[ ] Nyertes: (1p)				          	Felhasználóként szeretném, ha a játék jelezné, melyik játékos nyert, hogy átláthatatlan nagyságú pályán kiderüljön ki nyert.
[ ] Új játék: (1p)				        	Felhasználóként szeretnék egy új játék gombot, hogy végzett játékot újra lehessen kezdeni.
[ ] Jel legális elhelyezése: (2p) 	Felhasználóként szeretném, ha a jelemet csak üres helyre tehetném, hogy ne írjam fölül a korábbi saját vagy ellenfél lépését.
[ ] Gép nyerés érzékelése: (3p)	  	Felhasználóként szeretném, ha a gép észrevenné, hogy nyerésre állok, hogy megállítson a saját javára.
[ ] Gép nyerni szeretne: (3p)	    	Felhasználóként szeretné, ha a gép megpróbálna törekedni arra, hogy megnyerje a játékot, hogy számomra nagyobb kihívást jelentsen.
[ ] Játékmódok: (2p)			        	Felhasználóként szeretném, ha lehetne választani játék elején, hogy hány (3,4,5) jel szükséges a nyeréshez, hogy több módban is játszhassak.
------------------------------ A játék alapja kész, kényelmi, extra funkciók következnek
[ ] Utolsó lépés láthatósága: (1p)	Felhasználóként szeretném, ha a gép utolsó lépése kiemelten jelenne meg, hogy tudjam mivel reagált az én lépésemre.
[ ] Nyertes jelek láthatósága: (1p)	Felhasználóként szeretném, ha láthatnám kiemelten, hogy melyik jelek a győztesek, hogy ne kelljen keresgetnem, ha azonnal nem venném észre.
[ ] Ki kezdjen: (2p)			        	Felhasználóként szeretném beállítani, hogy kié legyen a kezdő lépés, hogy nagyobb kihívásban részüljek, hisz a gép lépés előnyre tesz szert.
[ ] Meccs állás: (2p)			        	Felhasználóként szeretném, ha láthatnám, a győzelem/vereség/döntetlen állások számait, hogy követhető legyen a tényleges meccs állás.
[ ] A vesztes kezdjen: (2p)	    		Felhasználóként szeretnék egy opciónális funkciót, hogy a vesztes kezdjen a következő körben (a "Ki Kezdjen" sztori mellet), hogy valós meccs szimulációjában vehessek részt.
[ ] Döntetlen: (1p)				        	Felhasználóként szeretném, hogy ha elfogy terület, akkor döntetlen legyen az állás, hogy ilyen esetben is véget érjen a játék.
[ ] Felváltott kezdés: (2p)	    		Felhasználóként szeretném, hogy felváltva történjen a kezdés, mert ez is lehet egyfajta játékmód kiegyenlített esélyekkel.
------------------------------ A játék teljes és élvezhető, luxus funkciók, jövőbeli extra tervek
[ ] Pálya méret: (1p)		        		Felhasználóként szeretném beállítani a pálya méretét, hogy még több féle (akár a 3*3-as) mód is elérhető legyen.
[ ] Ember vs Ember mód: (2p)	     	Felhasználóként szeretnék nem gép ellen játszani, hogy versenyezhessek társaimmal.
[ ] Név megadása: (1p)			      	Felhasználóként szeretnék nevet adni mindkét játékosnak, hogy könnyebb legyen a megkülönböztetés.
[ ] Visszavonás: (2p)			        	Felhasználóként szeretném, ha az utolsó lépésemet visszavonhatnám, hogy ha félrekattintottam, vagy figyelmetlen voltam, javíthassak.
[ ] Akármennyi visszavonás: (3p)  	Felhasználóként szeretném, hogy akármennyi lépést visszavonhassak, hogy egy korábbi kiindulási pontból folytathassam a játékot.





*/
var Amoba = function() {};

Amoba.prototype = {
    map : [],
    ENEMY_SYMBOL : 2,
    PLAYER_SYMBOL : 1,
    NOTHING_SYMBOL : 0,
    SYMBOL_FOR_WIN : 5,
    
    newGame : function(size){
        this.__inicMap(size);
    },
    
    __inicMap : function(size){
        for (var j = 0; j < size; ++j){
        	this.map[j] = [];
			for (var i = 0; i < size; ++i){
				this.map[j][i] = this.NOTHING_SYMBOL;
			}
		}
    },
    
    getSize : function(){
    	return this.map.length;
    },
    
    putHere : function(x, y){
        if (this.__isEmpty(x,y)){
            if (!this.isEnd()){
            	this.__put(x,y,this.PLAYER_SYMBOL);
            }
            if (!this.isEnd()){
            	this.enemyTurn();
            }
        }
    },
    
    enemyTurn : function(){
        var players = [this.ENEMY_SYMBOL, this.PLAYER_SYMBOL]; // először a maga javát nézi, aztán védekezik
        
        for (var i = 1; i <= 4; i++){
            for (var p = 0; p<players.length; p++){
                var koords = this.__getWinnerKoordsForSymbol(players[p], i);
                if (koords.length != 0){
                    var r = random(0,koords.length); // a jó lehetőségek közül válasszon
                    return this.__enemyPutHere(koords[r].x,koords[r].y);
                }
            }
        }
        
        
        
        // nincsenek lehetőségek, valahova kell tenni
        while(true){
            var i = random(0, this.getSize()-1);
            var j = random(0, this.getSize()-1);
           if (this.__isEmpty(j,i)) return this.__enemyPutHere(j,i); 
        }
        
    	
    },
    
    
    
    
    __getWinnerKoordsForSymbol : function(symbol,priority){
        var max = 0;
        var koords = [];
        
        var directions = [
                {x:1, y:0},
                {x:-1, y:0},
                {x:0, y:1},
                {x:0, y:-1},
                
                {x:1, y:1},
                {x:1, y:-1},
                {x:-1, y:1},
                {x:-1, y:-1},
            ];
        
        // cleen code :DD
        for (var d = 0; d < directions.length; d++){
            for (var i = 0; i < this.getSize(); i++){
                for (var j = 0; j < this.getSize(); j++){
                    if (this.get(j,i) == this.NOTHING_SYMBOL){
                        var place = {x:j, y:i};
                        
                        // 5-ös amőbához igazítva
                        /*
                             típusok: 
                             c jelzi, a ciklus aktuális helyét
                             A jelzi, hogy ott bármit lehet
                             0 jelzi, hogy ott csak semmi lehet
                             X jelzi, hogy ott a kívánt symbolum lehet
                             
                             fontossági sorrendbe helyezve
                             
                             a szimmetrikus párokat fölösleges megnézi, mert a ciklus másik irányba is megy
                             
                             AcXXXXA
                             AXXcXXA
                             AXcXXXA
                             
                             AcXXX0
                             AcXX0X0
                             AcX0XX0
                             0XcXX0
                             0XXcX0
                             
                             0cX0X0
                             0cXX0
                             0XcX0
                             
                        */
                        
                        var distance = []; // 0-tól, 5-ig; 0 a ciklus jelenlegi koordinátája, 5 a ciklusponttól ebbe az irányba 5 távolságra lévő cella
                        for (var k = -5; k <= 5; k++){
                            distance[k] = {x:j+k*directions[d].x,  y:i+k*directions[d].y};
                        }
                        
                        var mask;
                        var sym = symbol+"";
                        var nul = this.NOTHING_SYMBOL+"";
                        
                        if (priority==1){
                            
                            mask = nul+sym+sym+sym+sym; // AcXXXXA
                            if (this.__isDirectionLooksLikeThis(distance[0],directions[d],mask)){
                                koords.push(place);
                            }
                            
                            mask = sym+sym+nul+sym+sym; // AXXcXXA
                            if (this.__isDirectionLooksLikeThis(distance[-2],directions[d],mask)){
                                koords.push(place);
                            }
                            
                            mask = sym+nul+sym+sym+sym; // AXcXXXA
                            if (this.__isDirectionLooksLikeThis(distance[-1],directions[d],mask)){
                                koords.push(place);
                            }
                        }
                        if (priority==2){
                            
                            mask = nul+nul+sym+sym+sym+nul; // 0cXXX0
                            if (this.__isDirectionLooksLikeThis(distance[-1],directions[d],mask)){
                                koords.push(place);
                            }
                            
                            mask = nul+sym+sym+sym+nul+nul; // 0XXXc0
                            if (this.__isDirectionLooksLikeThis(distance[-4],directions[d],mask)){
                                koords.push(place);
                            }
                            
                            mask = nul+sym+sym+sym+nul; // AcXXX0
                            if (this.__isDirectionLooksLikeThis(distance[0],directions[d],mask)){
                                koords.push(place);
                            }
                            
                            mask = nul+sym+nul+sym+sym+nul; // 0XcXX0
                            if (this.__isDirectionLooksLikeThis(distance[-2],directions[d],mask)){
                                koords.push(place);
                            }
                            
                            mask = nul+sym+sym+nul+sym+nul; // 0XXcX0
                            if (this.__isDirectionLooksLikeThis(distance[-3],directions[d],mask)){
                                koords.push(place);
                            }
                            
                            if (symbol == this.ENEMY_SYMBOL){
                                mask = nul+nul+sym+sym+sym; // 0cXXXA
                                if (this.__isDirectionLooksLikeThis(distance[-1],directions[d],mask)){
                                    koords.push(
                                        {
                                            x: place.x-directions[d].x,
                                            y: place.y-directions[d].y
                                        }
                                    );
                                }
                            }
                        
                        }
                        else if (priority==3){
                        
                            mask = nul+nul+sym+nul+sym+nul; // 0cX0X0
                            if (this.__isDirectionLooksLikeThis(distance[-1],directions[d],mask)){
                                koords.push(place);
                            }
                            
                            mask = nul+nul+sym+sym+nul; // 0cXX0
                            if (this.__isDirectionLooksLikeThis(distance[-1],directions[d],mask)){
                                if (symbol == this.ENEMY_SYMBOL){
                                    koords.push(
                                        {
                                            x: place.x-directions[d].x,
                                            y: place.y-directions[d].y
                                        }
                                    );
                                }
                                else{
                                    koords.push(place);
                                }
                            }
                            
                            mask = nul+sym+nul+sym+nul; // 0XcX0
                            if (this.__isDirectionLooksLikeThis(distance[-2],directions[d],mask)){
                                koords.push(place);
                            }
                        
                        }
                        else if (priority==4){
                        
                            mask = nul+sym; // AcXA
                            if (this.__isDirectionLooksLikeThis(distance[0],directions[d],mask)){
                                koords.push(place);
                            }
                        }
                             
                        
                        
                        /*var search_x = j;
                        var search_y = i;
                        var sameSymbol = 0;
                        var wrongSymbol = false;
                        
                        while(this.__isOnMap(search_x,search_y) && sameSymbol < symbolsInARow && !wrongSymbol){
                            search_x += directions[d].x;
                            search_y += directions[d].y;
                            
                            if (this.__isOnMap(search_x,search_y) && this.get(search_x,search_y) == symbol){
                                sameSymbol++;
                            }
                            else{
                                wrongSymbol = true;
                            }
                        }
                        
                        if (
                            sameSymbol == symbolsInARow && // megfelelő mennyiségű van egymás után és
                            (
                                (symbolsInARow >= this.SYMBOL_FOR_WIN-1 ) || // ez már elég lenne a nyeréshez vagy
                                ( 
                                    this.__isOnMap(search_x+directions[d].x,search_y+directions[d].y) && 
                                    this.get(search_x+directions[d].x,search_y+directions[d].y)==this.NOTHING_SYMBOL // a következő üres, szóval ez két oldalról szabad és összefüggő
                                )
                            )
                        ){
                                (function(place){
                                    koords.push(place);
                                })(place);
                        }*/
                    }
                }
            }
        }
        return koords;
        
    },
    
    __isDirectionLooksLikeThis : function(startDir, dir, mask){
        for (var i = 0; i < mask.length; i++){
            if (
                !this.__isOnMap(startDir.x+dir.x*i, startDir.y+dir.y*i) || 
                this.get(startDir.x+dir.x*i, startDir.y+dir.y*i) != mask.charAt(i)
            ) return false;
        }
        return true;
    },
    
    get : function(x,y){
    	return this.map[x][y];
    },
    
    __isEmpty : function(x,y){
    	return this.get(x,y)==this.NOTHING_SYMBOL;
    },
    
    __enemyPutHere : function(x,y){
        this.__put(x,y,this.ENEMY_SYMBOL);
    },
    
    __put : function(x,y,symbol){
        this.map[x][y] = symbol;
    },
    
    isEnd : function(){
        return this.isPlayerWon() || this.isEnemyWon();
    },
    
    isPlayerWon : function(){
        return this.__isThisPlayerWon(this.PLAYER_SYMBOL);
    },
    
    isEnemyWon : function(){
        return this.__isThisPlayerWon(this.ENEMY_SYMBOL);
    },
    
    __isThisPlayerWon : function(playersSymbol){
        return this.SYMBOL_FOR_WIN <= this.__getMaxNumberOfSameSymbolInAllDirection(playersSymbol);
    },
    
    __getMaxNumberOfSameSymbolInAllDirection : function(symbol){
        return Math.max(
            this.__getMaxNumberOfSameSymbolRightDirection(symbol),
            this.__getMaxNumberOfSameSymbolBottomDirection(symbol),
            this.__getMaxNumberOfSameSymbolBottomRightDirection(symbol),
            this.__getMaxNumberOfSameSymbolBottomLeftDirection(symbol)
        );
    },
    
    __getMaxNumberOfSameSymbolRightDirection : function(symbol){
        return this.__getMaxNumberOfSameSymbolInOneDirection(symbol, {x:1, y:0});
    },
    
    __getMaxNumberOfSameSymbolBottomDirection : function(symbol){
        return this.__getMaxNumberOfSameSymbolInOneDirection(symbol, {x:0, y:1});
    },
    
    __getMaxNumberOfSameSymbolBottomRightDirection : function(symbol){
        return this.__getMaxNumberOfSameSymbolInOneDirection(symbol, {x:1, y:1});
    },
    
    __getMaxNumberOfSameSymbolBottomLeftDirection : function(symbol){
        return this.__getMaxNumberOfSameSymbolInOneDirection(symbol, {x:-1, y:1});
    },
    
    __getMaxNumberOfSameSymbolInOneDirection : function(symbol, direction){
        var max = 0;
        
        for (var i = 0; i < this.getSize(); i++){
            for (var j = 0; j < this.getSize(); j++){
                var x = j;
                var y = i;
                var tmpMax = 0;
                
                while (this.__isOnMap(x,y) && this.get(x,y)==symbol){
                    tmpMax++;
                    x+=direction.x;
                    y+=direction.y;
                }
                
                max = Math.max(max,tmpMax);
            }
        }
        return max;
    },
    
    __isOnMap : function(x,y){
        return x>=0 && y>=0 && x<this.getSize() && y<this.getSize();
    },
    
    toString : function(){
        var s = "";
        for (var i = 0; i < this.getSize(); i++){
            for (var j = 0; j < this.getSize(); j++){
                s += this.get(j,i);
            }
            s += "\n";
        }
        return s;
    }
};

function random(min, max){
    return Math.floor((Math.random() * max) + min); 
}

module.exports = Amoba;
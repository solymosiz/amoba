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
    	for (var i = 0; i < this.getSize(); i++){
          for (var j = 0; j < this.getSize(); j++){
            if (this.__isEmpty(j,i)) return this.__enemyPutHere(j,i);
          }
        }
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

module.exports = Amoba;
var Amoba = function() {};

Amoba.prototype = {
    map : [],
    ENEMY_SYMBOL : 2,
    PLAYER_SYMBOL : 1,
    NOTHING_SYMBOL : 0,
    
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
    
    drawMap : function(place){
        var table = document.createElement('table');
		table.appendChild(document.createElement('tbody'));
		var tbody = table.children[0];
	
		for (var i = 0; i < this.getSize(); i++){
			
			var tr = document.createElement('tr');
			tbody.appendChild(tr);
			
			for (var j = 0; j < this.getSize(); j++){
			
				var td = document.createElement('td');
				tr.appendChild(td);
				td.innerHTML = this.__get(j,i);
			}
		}
	
		if (place.children[0]) place.removeChild(place.children[0]);
		place.appendChild(table);
    },
    
    getSize : function(){
    	return this.map.length;
    },
    
    putHere : function(x, y){
    	this.__put(x,y,this.PLAYER_SYMBOL);
    	this.enemyTurn();
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
    }
};

module.exports = Amoba;
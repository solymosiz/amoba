var Amoba = function() {};

Amoba.prototype = {
    map : [],
    
    newGame : function(size){
        this.__inicMap(size);
    },
    
    __inicMap : function(size){
        for (var j = 0; j < size; ++j){
        	this.map[j] = [];
			for (var i = 0; i < size; ++i){
				this.map[j][i] = 0;
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
				td.innerHTML = this.map[j][i];
			}
		}
	
		if (place.children[0]) place.removeChild(place.children[0]);
		place.appendChild(table);
    },
    
    getSize : function(){
    	return this.map.length;
    },
    
    putHere : function(x, y){
    	this.map[x][y] = "X";
    }
};

module.exports = Amoba;
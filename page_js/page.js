window.addEventListener('load',init);

function init(){
    var amoba = new Amoba();
    amoba.newGame(10);
    
    document.getElementById("new_game_button").addEventListener("click", function(){
        amoba.newGame(10);
        guiRefresh(amoba);
    });
    
    newGame(document.getElementById("game"), amoba);
    
}

function newGame(place, amoba){
    var table = document.createElement('table');
    table.id = "table";
	table.appendChild(document.createElement('tbody'));
	var tbody = table.children[0];

	for (var i = 0; i < amoba.getSize(); i++){
		
		var tr = document.createElement('tr');
		tbody.appendChild(tr);
		
		for (var j = 0; j < amoba.getSize(); j++){
		
			var td = document.createElement('td');
			tr.appendChild(td);
			
			(function(koord){
				td.addEventListener("click",function(){
				    amoba.putHere(koord.x,koord.y);
				    guiRefresh(amoba);
				});
			})({x:j,y:i});
		}
	}

	if (place.children[0]) place.removeChild(place.children[0]);
	place.appendChild(table);
}


function guiRefresh(amoba){
    __tableRefresh(document.getElementById("table"), amoba);
    __msgRefresh(amoba);
}

function __tableRefresh(table, amoba){
    for (var i = 0, row; row = table.rows[i]; i++) {
       for (var j = 0, col; col = row.cells[j]; j++) {
           switch(amoba.get(j,i)){
               case 1: col.innerHTML = "X"; break;
               case 2: col.innerHTML = "O"; break;
               default: col.innerHTML = ""; break;
           }
       }  
    }
}

function __msgRefresh(amoba){
    if (amoba.isPlayerWon()) document.getElementById("msg").innerHTML = "Játékos nyert!";
    else if (amoba.isEnemyWon()) document.getElementById("msg").innerHTML = "Ellenfél nyert!";
    else document.getElementById("msg").innerHTML = "";
}
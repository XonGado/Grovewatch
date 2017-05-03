//changes game.js was changed to game-clyde.js

peasantProjectiles = [];

window.onload = function () {
    
    createCards();
	goldLeafModify(0);
    setUpCards();

    var creature_card_btns = document.getElementsByClassName("creature-btn");
	for (var i = creature_card_btns.length - 1; i >= 0; i--) {
		createButtonListeners(i);
	}

	var tiles = document.getElementsByClassName("tile");

	for (var i = tiles.length - 1; i >= 0; i--) {
		createTileListeners(i);
	}

	document.getElementById("menu-btn").addEventListener("click", openMenu);
	document.getElementById("resume").addEventListener("click", closeMenu);



    // testCreaturesCreate();
    // testMonstersCreate();

    var monster1 = new NormalMonster(9, 2);
    monster1.show();

    var creature1 = new PeasantCreature(0, 2);
    creature1.show();
    creature1.startAttack();

    setTimeout(creature1.stopAttack.bind(creature1), 10000);

    // SETUP FOR ANIMATION AND GAME LOOP INTERVAL
    lastFrame = +new Date;
    fps = 30;
    timeInterval = 1000/fps;
    changeInTime = 0;
    setInterval(gameSimulation, timeInterval);

}

function testCreaturesCreate() {
    var normalCreature1;

    var i;
    var leni = 10;
    for (i = 0; i < leni; i++) {
        var j;
        var lenj = 5;
        for (j = 0; j < lenj; j++) {
            normalCreature1 = new PeasantCreature(i, j);
            normalCreature1.show();
        }
    }
};

function testMonstersCreate() {
    var normalMonster1;
    var i;
    var leni = 10;
    for (i = 0; i < leni; i++) {
        var j;
        var lenj = 5;
        for (j = 0; j < lenj; j++) {
            normalMonster1 = new NormalMonster(i, j);
            normalMonster1.show();
        }
    }
};


function gameSimulation(){
    for (var i = 0; i < peasantProjectiles.length; i++) {
        if (peasantProjectiles[i].state == "alive") {
            peasantProjectiles[i].move();
            peasantProjectiles[i].show();
        }
        else{
            //kill the projectile
        }
    };
};
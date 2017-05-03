peasantProjectiles = [];

lanes = [];


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



// kill projectile
function gameSimulation(){
    // requestAnimationFrame(gameSimulation);
    for (var i = 0; i < peasantProjectiles.length; i++) {
        if (peasantProjectiles[i].state == "alive") {
            peasantProjectiles[i].move();
            peasantProjectiles[i].show();
        }
    };
};
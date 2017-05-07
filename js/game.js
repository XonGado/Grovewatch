
peasantProjectiles = [];



lanes = [];

for (var i = 0; i < 5; i++) {
    lanes.push(new Lane([],[],[]));
}
    



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

    // var monster1 = new NormalMonster(2, 2);
    // monster1.show();

    // var creature1 = new PeasantCreature(0, 2);
    // creature1.show();
    // creature1.startAttack();

    // setTimeout(creature1.stopAttack.bind(creature1), 10000);



    // var creature2 = new PeasantCreature(1, 2);
    // creature2.show();
    // creature2.startAttack();

    // setTimeout(creature2.stopAttack.bind(creature2), 10000);


    // setTimeout(function(){
    //     var creature3 = new PeasantCreature(2, 1);
    //     creature3.show();
    //     creature3.startAttack();
    // }, 5000);

    // setTimeout(creature3.stopAttack.bind(creature2), 10000);


    // testCreaturesAttack(3,5);

    // SETUP FOR ANIMATION AND GAME LOOP INTERVAL
    time = 0;
    now = 0;
    running = true;
    // fps=30;
    gameSimulation();




    // setInterval(
    //     function () {
    //         document.querySelectorAll("#creature-container .creature")[0].className = "creature";
    //         setTimeout(
    //             function(){
    //                 document.querySelectorAll("#creature-container .creature")[0].className = "creature damaged";
    //             }
    //         ,50);
    //     }
    // ,1000);

    // setInterval(
    //     function () {
    //         document.querySelectorAll("#monster-container .monster")[0].className = "monster";
    //         setTimeout(
    //             function(){
    //                 document.querySelectorAll("#monster-container .monster")[0].className = "monster damaged";
    //             }
    //         ,50);
    //     }
    // ,1000);
}



// kill projectile
function gameSimulation(){
    requestAnimationFrame(gameSimulation);
    now = new Date().getTime(),
        dt = now - (time || now);
// start of game loop


    // for (var i = 0; i < peasantProjectiles.length; i++) {
    //     if (peasantProjectiles[i].state == "alive") {
    //         peasantProjectiles[i].move();
    //         peasantProjectiles[i].show();
    //     }
    // }

    var i = 0;
    var len = lanes.length;
    for (i = 0; i < len; i++) {
        var lane = lanes[i];
        // For creatures
        var j = 0;
        // var len2 = lanes[i].creatures.length;
        // for (var j = 0; j<len2; j++) {
        //     // lanes[i].creatures[j].mover();
        //     // lanes[i].creatures[j].mover();
        // }

        // For monsters
        len2 = lanes[i].monsters.length;
        for (j = 0; j < len2; j++) {

        }

        // For projectiles

        len2 = lane.peasantProjectiles.length;
        var projectile;
        for (j = 0; j < len2; j++) {
            projectile = lane.peasantProjectiles[j];
            if (projectile.state == "alive") {
                projectile.move();
                projectile.show();
            }
        }

        for (j = len2 - 1; j >= 0; j--) {
            projectile = lane.peasantProjectiles[j];
            if (projectile.state == "dead") {
                lane.peasantProjectiles.splice(j, 1);
            }   
        }

    }





// end of game loop
    time = now;
};
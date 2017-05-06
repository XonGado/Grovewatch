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



    var prmt = confirm("Start game?");

    if(prmt){
        testCreaturesAttack(1,5);
        // testMonstersAttack(9,5);
        var monster1 = new NormalMonster(9, 0);
        lanes[0].monsters.push(monster1);
        lanes[0].monsters[0].show();


        setTimeout(function  () {
            lanes[0].monsters.splice(0, 1);

            setTimeout(function  () {
                var monster1 = new NormalMonster(9, 0);
                lanes[0].monsters.push(monster1);
                lanes[0].monsters[0].show();
            }
            , 14000);


        }
            , 14000);
    }











    // SETUP FOR ANIMATION AND GAME LOOP INTERVAL
    time = 0;
    now = 0;
    running = true;
    gameSimulation();

}



function gameSimulation(){
    requestAnimationFrame(gameSimulation);
    now = new Date().getTime(),
    dt = now - (time || now);
    

    // start of game loop

    var i = 0;
    var len = lanes.length;
    for (i = 0; i < len; i++) {
        var lane = lanes[i];
        // For creatures
        var j = 0;
        var creature;
        len2 = lane.creatures.length;
        var nearestMonster = lane.getNearestMonster();
        console.log(nearestMonster);
        for (j = 0; j < len2; j++) {
            var creature = lane.creatures[j];
            if(nearestMonster){
                //therefore there is a monster
                creature.isAttacking = true;
            }
            else {
            //     //therefore there is no monster
                creature.stopAttack();
            }
            creature.attack();
        }

        // For monsters
        len2 = lane.monsters.length;
        var monster;
        for (j = 0; j < len2; j++) {
            monster = lane.monsters[j];
            if (monster.state == "alive") {
                monster.move();
                monster.show();
            }
        }


        for (j = len2 - 1; j >= 0; j--) {
            monster = lane.monsters[j];
            if (monster.state == "dead") {
                lane.killMonster(j);
            }   
        }

        // For projectiles

        len2 = lane.peasantProjectiles.length;
        var projectile;
        for (j = len2 - 1; j >= 0; j--) {
            // console.log(lane.peasantProjectiles);
            projectile = lane.peasantProjectiles[j];
            if (projectile.state == "alive") {

                if(projectile.x >= nearestMonster.x){
                    nearestMonster.inflictDamage(projectile.damage);
                    lane.killPeasantProjectile(j);
                    continue;
                }

                projectile.move();
                projectile.show();
                console.log("projectile moving");
            }
        }

        for (j = len2 - 1; j >= 0; j--) {
            projectile = lane.peasantProjectiles[j];
            if (projectile.state == "dead") {
                lane.killPeasantProjectile(j);
            }   
        }





    }





// end of game loop
    time = now;
};
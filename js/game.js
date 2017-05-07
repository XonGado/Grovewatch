for (var i = 0; i < 5; i++) {
    lanes.push(new Lane([],[],[]));
}
window.onload = function () {
    
    setup();    

    var prmt = confirm("Start game?");

    if(prmt){

        // var monster1 = new NormalMonster(3, 0);
        // lanes[0].monsters.push(monster1);


        var monster3 = new NormalMonster(9, 0);
        lanes[0].monsters.push(monster3);

        var normalCreature3 = new PeasantCreature(0,0);
        lanes[normalCreature3.gridY].creatures.push(normalCreature3);


        var monster3 = new NormalMonster(5, 2);
        lanes[2].monsters.push(monster3);

        var normalCreature3 = new PeasantCreature(4,2);
        lanes[normalCreature3.gridY].creatures.push(normalCreature3);

        var monster4 = new NormalMonster(7, 4);
        lanes[4].monsters.push(monster4);

        var normalCreature4 = new PeasantCreature(8,4);
        lanes[normalCreature4.gridY].creatures.push(normalCreature4);

    }




    // SETUP FOR ANIMATION AND GAME LOOP INTERVAL
    gameSimulation();
}



function gameSimulation(){
    
    requestAnimationFrame(gameSimulation);
    if(running){
        now = new Date().getTime() - timeDilation,
        dt = now - (time || now);
    }


    // start of game loop


    var i = 0;
    var len = lanes.length;
    for (i = 0; i < len; i++) {
        var lane = lanes[i];
        // For creatures
        var j = 0;
        var creature;
        len3 = lane.creatures.length;

        var hasMonster = lane.hasMonster();
        // console.log(nearestMonster);
        for (j = 0; j < len3; j++) {
            var creature = lane.creatures[j];

            if(hasMonster){
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
        len3 = lane.monsters.length;
        var monster;
        for (j = 0; j < len3; j++) {
            monster = lane.monsters[j];
            if (monster.state == "alive") {
                monster.move();
                monster.show();
            }
        }


        for (j = len3 - 1; j >= 0; j--) {
            monster = lane.monsters[j];
            if (monster.state == "dead") {
                lane.killMonster(j);
            }   
        }

        // For projectiles
        var nearestMonster = lane.getNearestMonster();
        len3 = lane.peasantProjectiles.length;
        var projectile;
        for (j = len3 - 1; j >= 0; j--) {
            // console.log(lane.peasantProjectiles);
            projectile = lane.peasantProjectiles[j];
            if (projectile.state == "alive") {

                if(hasMonster){
                    if(projectile.x >= nearestMonster.x){
                        nearestMonster.inflictDamage(projectile.damage);
                        lane.killPeasantProjectile(j);
                        continue;
                    }
                }



                projectile.move();
                projectile.show();
            }
        }


        
        len3 = lane.peasantProjectiles.length;
        for (j = len3 - 1; j >= 0; j--) {
            projectile = lane.peasantProjectiles[j];
            if (projectile.state == "dead") {
                lane.killPeasantProjectile(j);
            }   
        }





    }





// end of game loop
    time = now;
};
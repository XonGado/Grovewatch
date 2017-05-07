
lanes = [];


//GAMEPLAY
time = 0;
now = 0;
running = true;
timeDilation = 0;
oldTime = 0;

for (var i = 0; i < 5; i++) {
    lanes.push(new Lane([],[],[]));
}

window.onload = function () {
    
    setup();    




    var prmt = confirm("Start game?");

    if(prmt){
        // testCreaturesAttack(2,5);

        var normalCreature1 = new PeasantCreature(1, 0);
        normalCreature1.show();
        normalCreature1.startAttack();
        lanes[0].creatures.push(normalCreature1);

        // var normalCreature2 = new PeasantCreature(8, 0);
        // normalCreature2.show();
        // normalCreature2.startAttack();
        // lanes[0].creatures.push(normalCreature2);




        // testMonstersAttack(9,5);
        var monster1 = new NormalMonster(10, 0);
        lanes[0].monsters.push(monster1);
        lanes[0].monsters[0].show();


        setTimeout(function  () {
            // lanes[0].monsters.splice(0, 1);

            setTimeout(function  () {
                var monster2 = new NormalMonster(10, 0);
                lanes[0].monsters.push(monster2);
                lanes[0].monsters[0].show();
            }
            , 4000);


        }
            , 4000);
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


    console.log(timeDilation);

    // start of game loop

    console.log("running = " + running);

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

                if(nearestMonster){
                    if(projectile.x >= nearestMonster.x){
                        nearestMonster.inflictDamage(projectile.damage);
                        lane.killPeasantProjectile(j);
                        continue;
                    }
                }



                projectile.move();
                projectile.show();
                console.log("projectile moving");
            }
        }
        len2 = lane.peasantProjectiles.length;
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
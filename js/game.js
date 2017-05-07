for (var i = 0; i < 5; i++) {
    lanes.push(new Lane([],[],[]));
}
window.onload = function () {
    
    setup();    

    var prmt = confirm("Start game?");


    // console.log(document.getElementsByClassName("creature bomb")[0]);
    // document.getElementsByClassName("creature bomb")[0].children[1].addEventListener("webkitAnimationEnd", function(){
    //     document.getElementsByClassName("creature bomb")[0].style.display = "none";
    // });

    // setTimeout(function(){
    //     document.getElementById("sunny").children[1].children[0].children[0].style.display = "block";
    //     document.getElementById("sunny").className = "creature sunflower grow";
    // }, 3000);

    // setTimeout(function(){
    //     document.getElementById("sunny").className = "creature sunflower picked";
    //     document.getElementById("sunny").children[1].children[0].children[0].addEventListener("webkitAnimationEnd", testingSun);
    // }, 6000);

    // setTimeout(function(){
    //     document.getElementById("sunny").children[1].children[0].children[0].style.display = "block";
    //     document.getElementById("sunny").className = "creature sunflower grow";
    // }, 9000);

    // function testingSun(){
    //     document.getElementById("sunny").children[1].children[0].children[0].style.display = "none";
    //     document.getElementById("sunny").children[1].children[0].children[0].removeEventListener("webkitAnimationEnd", testingSun);
    // }

    //pausing
    pauseGame();

    if(prmt){

        //unpausing

        unpauseGame();

        // var monster1 = new NormalMonster(3, 0);
        // lanes[0].monsters.push(monster1);


        // var monster3 = new GiantMonster(9, 0);
        // lanes[0].monsters.push(monster3);

        // var normalCreature3 = new PeasantCreature(0,0);
        // lanes[normalCreature3.gridY].creatures.push(normalCreature3);


        // var monster3_1 = new NormalMonster(5, 2);
        // lanes[monster3_1.gridY].monsters.push(monster3_1);

        // var monster3_2 = new NormalMonster(4, 2);
        // lanes[monster3_2.gridY].monsters.push(monster3_2);

        // var monster3_3 = new NormalMonster(3, 2);
        // lanes[monster3_3.gridY].monsters.push(monster3_3);

        // var monster3_4 = new NormalMonster(2, 2);
        // lanes[monster3_4.gridY].monsters.push(monster3_4);

        // var monster3_5 = new NormalMonster(1, 2);
        // lanes[monster3_5.gridY].monsters.push(monster3_5);

        // var monster3_6 = new NormalMonster(0, 2);
        // lanes[monster3_6.gridY].monsters.push(monster3_6);





        // var normalCreature3 = new PeasantCreature(4,2);
        // lanes[normalCreature3.gridY].creatures.push(normalCreature3);







        // var monster4 = new NormalMonster(9, 4);
        // lanes[4].monsters.push(monster4);

        // var normalCreature4 = new PeasantCreature(8,4);
        // lanes[normalCreature4.gridY].creatures.push(normalCreature4);




        // SETUP FOR ANIMATION AND GAME LOOP INTERVAL
        time = 0;
        now = +new Date();
        // running = true;
        timeDilation = 0;
        oldTime = 0;

        monsterGenerator = new MonsterGenerator();

        gameSimulation();

    }
}



function gameSimulation(){
    
    requestAnimationFrame(gameSimulation);
    if(running){
        now = new Date().getTime() - timeDilation,
        dt = now - (time || now);
    }


    // start of game loop

    // updateGUI();

    monsterGenerator.generate();


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

            if(creature.producing){
                creature.producing();
            }


        }

        for (j = len3 - 1; j >= 0; j--) {
            creature = lane.creatures[j];
            if (creature.state == "dead") {
                lane.killCreature(j);
            }
        }

        // For monsters
        len3 = lane.monsters.length;
        var monster;
        for (j = 0; j < len3; j++) {
            monster = lane.monsters[j];
            if (monster.state == "alive") {
                var creatureAttacked = lane.getNearestCreature(monster.x);

                if(creatureAttacked){
                    //therefore there is a plant
                    monster.isAttacking = true;
                }
                else {
                //     //therefore there is no monster
                    monster.stopAttack();
                }



                if (!monster.isAttacking){
                    monster.move();
                    monster.show();
                }
                monster.attack(creatureAttacked);
            }
        }


        for (j = len3 - 1; j >= 0; j--) {
            monster = lane.monsters[j];
            if (monster.state == "dead") {
                lane.killMonster(j);
            }
        }

        // For projectiles
        var nearestMonster;
        len3 = lane.peasantProjectiles.length;
        var projectile;
        for (j = len3 - 1; j >= 0; j--) {
            // console.log(lane.peasantProjectiles);
            projectile = lane.peasantProjectiles[j];

            if (projectile.state == "alive") {
                if(hasMonster){
                    // if(projectile.x >= nearestMonster.x){
                    //     nearestMonster.inflictDamage(projectile.damage);
                    //     lane.killPeasantProjectile(j);
                    //     continue;
                    // }


                    //check lane
                    nearestMonster = null;
                    if(nearestMonster = lane.getNearestMonster(projectile.x)){
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
for (var i = 0; i < 5; i++) {
    lanes.push(new Lane([],[],[]));
}
window.onload = function () {
    
    setup();    




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

    console.log(document.cookie);
    if (document.cookie) {
        console.log(cookiesToArray());
    }

    start_interface = document.getElementById("starting-interface");
    start_interface.style.display = "flex";
    start = document.getElementById("initialize-game");
    countdown = document.getElementById("countdown");

    start.addEventListener("click", startGame);



    // var end_interface = document.getElementById("ending-interface");
    // end_interface.style.top = "0";

    // var leaderboard_form = document.getElementById("leaderboard-form");
    // var username = document.getElementById("username");
    // leaderboard_form.addEventListener("submit", function(){
    //     if (username.value) {
    //         addToLeaderboard();
    //     } else{
    //         username.style.backgroundColor = "#F8BBD0";
    //         return false;
    //     }
    // });

    // function addToLeaderboard(){
    //     var cookies = document.cookie.split(";");
    //     document.cookie = document.cookie + "player" + count + "=" + username.value + "-" + score + "-" + "-" +";"; 
    // }

    //pausing
    pauseGame();

}

function startGame(){
    // gameOver();
    start.style.display = "none";
    countdown.style.color = "#03A9F4";
    countdown.innerHTML = "3";
    setTimeout(function(){
        countdown.style.color = "#CDDC39";
        countdown.innerHTML = "2";
    }, 1000);
    setTimeout(function(){
        countdown.style.color = "#FFC107";
        countdown.innerHTML = "1";
    }, 2000);
    setTimeout(function(){
        countdown.style.color = "#E91E63";
        countdown.innerHTML = "SUMMON!";
    }, 3000);
    setTimeout(function(){
        start_interface.style.top = "-100vh";
    }, 3500);

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

function gameOver(){
    pauseGame();
    endGame = true;
    document.getElementById("final-score").innerHTML = score;
    var end_interface = document.getElementById("ending-interface");
    var form = document.getElementById("leaderboard-form");
    var name = document.getElementById("username");
    var cookies = cookiesToArray();
    if (cookies.length < 10 || score > cookies[cookies.length-1][1]) {
        form.style.display = "block";
        form.addEventListener("submit", addToLeaderboard);
        name.addEventListener("input", function(){
            name.value = name.value.replace(/[^a-z]/ig, '');
        });
    }
    end_interface.style.top = "0";
}

function cookiesToArray(){
    var cookies = document.cookie.split(";");
    var cookie_values = [];
    var temp = [];

    if (!(document.cookie == "")) {
        for (var i = 0; i < cookies.length || i < 10; i++) {
            console.log(cookies[i]);
        }

        for (var i = 0; i < cookies.length || i < 10; i++) {
            temp = cookies[i].split("=");
            cookies[i] = temp[1]; 
            cookies[i] = cookies[i].split("$-$");
            cookie_values.push(cookies[i]);
            // console.log(cookies[i]);
        }
    }

    cookie_values.sort(function (a,b){
        return b[1] - a[1];
    });

    // console.log("cookie sorted:");
    // for (var i = 0; i < cookie_values.length; i++) {
    //     console.log(cookie_values[i]);
    // }

    return cookie_values;
}

function addToLeaderboard(e){
    e.preventDefault();
    var cookies = document.cookie.split(";");

    console.log(cookies);
    // var newCookie = "player" + (cookies.length + 1) + "=" + username.value + "-" + score + "-" + waves + "-" + kills + ";"; 
    // console.log(newCookie);
    
    if(cookies[0] == ""){
        length = 0;
    }
    else{
        length = cookies.length;
    }

    document.cookie = "player" + (length + 1) + "=" + username.value + "$-$" + score + "$-$" + waves + "$-$" + kills + ";";

    console.log(document.cookie);
    console.log((cookiesToArray())[0]);

    var form = document.getElementById("leaderboard-form");
    form.innerHTML = "<h3 class='thanks'>Thank you for playing!</h3>";
}

function gameSimulation(){
    
    if(!endGame){
        requestAnimationFrame(gameSimulation);
    }

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
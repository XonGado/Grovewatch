//todo  [x] Create creature object
//todo  [x]  Create peasant_creature
//todo  [x] Create monster object
//todo  [x]  Create normal_monster

//note  ask clyde to change the name of the creature to normal-creature
//note  Use camelcasting in javascript, use hyphen for css/html

// Creatures ######################################################################################
var divCreature0 = document.getElementById("hidden-creatures").getElementsByClassName("creature")[0];
var gridCreature = document.getElementById("creature-container");
function Creature(gridX, gridY) {
    // positioning, display
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = (gridX * 8) + 2.5;
    this.y = (gridY * 9.2);
    this.width = 8;

    //Life
    this.life = 5;
    this.state = "alive";

    //Time
    this.dt = 1;
    this.attackPeriod = 1; //seconds

    this.isAttacking = false;
    this.lastFrame = now;



    this.div = divCreature0.cloneNode(true);
    
    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";

    if(gridX >= 0 && gridY >= 0){
        console.log(this.div);
        gridCreature.appendChild(this.div);
    }
};

Creature.prototype.show = function () {
//    var grid = document.getElementsByClassName("grid")[0];
  
    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";

};


Creature.prototype.attack = function () {


};

Creature.prototype.startAttack = function () {

};

Creature.prototype.stopAttack = function () {

};

Creature.prototype.inflictDamage = function (damage) {
    this.life -= damage;
    if(this.life <= 0){
        this.kill();
    }else{
        this.damageFeedback();
    }
}

Creature.prototype.damageFeedback = function () {
    this.div.className = "creature";
    that = this;
    setTimeout( function () {
        that.div.className = "creature damaged";
    }, 50);
}


Creature.prototype.kill = function(){
    this.state = "dead";
}

Creature.prototype.unshow = function () {
    this.div.style.display = "none";
}



PeasantCreature.prototype = new Creature();
PeasantCreature.prototype.constructor = PeasantCreature;

function PeasantCreature(gridX, gridY){
    Creature.call(this, gridX, gridY);
    this.attackContext;
    this.isAttacking = false;
    this.attackPeriod = 2; //seconds
    // this.isAttackNow = false;
}

PeasantCreature.prototype.startAttack = function () {
    // this.attackContext = setInterval(this.attack.bind(this), 1000);
    this.isAttacking = true;
    this.lastFrame = now;
};

PeasantCreature.prototype.stopAttack = function () {
    // clearInterval(this.attackContext);
    this.isAttacking = false;
};

PeasantCreature.prototype.attack = function () {
    this.dt = now - this.lastFrame;
    if(this.dt > 1000*this.attackPeriod && this.isAttacking){
        this.lastFrame = now;
        var projectile = new Projectile(this.gridX,this.gridY);
        lanes[this.gridY].peasantProjectiles.push(projectile);
    }
};



var divCreatureLaser = document.getElementById("hidden-creatures").getElementsByClassName("creature")[1];
var divLaser = document.getElementById("hidden-projectiles").getElementsByClassName("projectile")[1];
var gridProjectile = document.getElementById("projectile-container");

LaserCreature.prototype = new PeasantCreature();
LaserCreature.prototype.constructor = LaserCreature;

function LaserCreature(gridX, gridY){
    PeasantCreature.call(this, gridX, gridY);
    this.attackPeriod = 3; //seconds
    this.damage = 2;

    this.div = divCreatureLaser.cloneNode(true);

    gridCreature.lastChild.remove();

    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";

    if(gridX >= 0 && gridY >= 0){
        console.log(this.div);
        gridCreature.appendChild(this.div);
    }
}


LaserCreature.prototype.attack = function () {
    this.dt = now - this.lastFrame;
    if(this.dt > 1000*this.attackPeriod && this.isAttacking){
        this.lastFrame = now;
        var laser = divLaser.cloneNode(true);
        laser.style.left = this.x + "vw";
        laser.style.top = this.y + "vw";
        
        gridProjectile.appendChild(laser);

        console.log(laser);

        var monsters = lanes[this.gridY].monsters;
        var i = monsters.length - 1;
        for (i; i >= 0; i--) {
            if(monsters[i].x > this.x){
                monsters[i].inflictDamage(this.damage);
                // monsters[i].x += 10;
            }
        }

        // var projectile = new Projectile(this.gridX,this.gridY);
        // lanes[this.gridY].peasantProjectiles.push(projectile);
    }
};




StoneCreature.prototype = new Creature();
StoneCreature.prototype.constructor = StoneCreature;

var divCreatureStone = document.getElementById("hidden-creatures").getElementsByClassName("creature")[2];

function StoneCreature(gridX, gridY){
    Creature.call(this, gridX, gridY);
    this.life = 30;
    this.div = divCreatureStone.cloneNode(true);

    gridCreature.lastChild.remove();

    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";

    if(gridX >= 0 && gridY >= 0){
        console.log(this.div);
        gridCreature.appendChild(this.div);
    }
}

StoneCreature.prototype.damageFeedback = function () {
    this.div.className = "creature stone";
    that = this;
    setTimeout( function () {
        that.div.className = "creature stone damaged";
    }, 50);
}








GoldCreature.prototype = new Creature();
GoldCreature.prototype.constructor = GoldCreature;

var divCreatureGold = document.getElementById("hidden-creatures").getElementsByClassName("creature")[3];

function GoldCreature(gridX, gridY){
    Creature.call(this, gridX, gridY);
    this.life = 3;
    this.div = divCreatureGold.cloneNode(true);

    gridCreature.lastChild.remove();

    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";


    this.isReady = false;
    this.produceInterval = 15;
    this.goldValue = 50;


    if(gridX >= 0 && gridY >= 0){
        console.log(this.div);
        gridCreature.appendChild(this.div);
    }
}

GoldCreature.prototype.damageFeedback = function () {
    // this.div.className = "creature sunflower";
    // that = this;
    // setTimeout( function () {
    //     that.div.className = "creature sunflower damaged";
    // }, 50);
}

GoldCreature.prototype.pickGold = function () {
    if(this.isReady){
        console.log("picking gold");
        this.lastFrame = now;
        this.isReady = false;
        this.div.className = "creature sunflower picked";
        var x = this.removeGold.bind(this);
        // this.div.children[1].children[0].children[0].addEventListener("webkitAnimationEnd", x);
        this.div.children[1].children[0].children[0].onwebkitanimationend = x;
        // Toolbox.addListener(window, 'webkitAnimationEnd', x);
    }
}


GoldCreature.prototype.producing = function () {
    this.dt = now - this.lastFrame;
    if(this.dt > 1000*this.produceInterval && !this.isReady){
        console.log("ready to harvest");
        this.lastFrame = now;
        this.isReady = true;
        this.produceGold();
    }
}


GoldCreature.prototype.produceGold = function () {
    console.log("producing gold");
    this.div.children[1].children[0].children[0].style.display = "block";
    this.div.className = "creature sunflower grow";
}

GoldCreature.prototype.removeGold = function () {
    console.log(this);

    console.log("removing gold");
    console.log(this.goldValue);

    goldLeafModify(this.goldValue);
    this.div.children[1].children[0].children[0].style.display = "none";
    
    var x = this.removeGold.bind(this);
    // this.div.children[1].children[0].children[0].removeEventListener("webkitAnimationEnd", x);
    this.div.children[1].children[0].children[0].onwebkitanimationend = null;
    // Toolbox.addListener(window, 'webkitAnimationEnd', x);
}



// Monsters #########################################################################################
// You can use float for gridX and gridY
var divMonster0 = document.getElementById("hidden-monsters").getElementsByClassName("monster")[0];
var gridMonster = document.getElementById("monster-container");
function Monster(gridX, gridY) {
    
    //For display and positioning
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = (gridX*8) + 2.5;
    this.y = (gridY*9.2);
    this.width = 8;


    //For life
    this.life = 10;
    this.state = "alive";
    this.points = 10;


    //Mostly monsters will have negative directions
    //To the left = negative dir
    this.dir = -1;

    // this.speed = 0.001;
    this.speed = 0.001;



    //Timing properties
    this.dt = 0;
    this.lastFrame = now;


    //Attacking
    this.isAttacking = false;
    this.damage = 1;
    this.attackPeriod = 1; //1 second


    this.div = divMonster0.cloneNode(true);

    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";

    if(gridX >= 0 && gridY >= 0){
        gridMonster.appendChild(this.div);
    }

};

Monster.prototype.startAttack = function () {
    this.isAttacking = true;
    this.lastFrame = now;
};

Monster.prototype.stopAttack = function () {
    this.isAttacking = false;
};

Monster.prototype.attack = function (creature) {
    this.dt = now - this.lastFrame;
    // console.log(creature);
    if(this.dt > 1000*this.attackPeriod && this.isAttacking && creature){
        this.lastFrame = now;
        creature.inflictDamage(this.damage);
        console.log("damaging");
    }
};

Monster.prototype.show = function () {
    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";

};

Monster.prototype.move = function(){
    this.dt = now - this.lastFrame;
    this.lastFrame = now;

    this.x += this.speed*this.dt*this.dir;


    if(this.x <= -5){
        gameOver();
    }
}

Monster.prototype.kill = function(){
    this.state = "dead";
    scoreUp(this.points);
    kill();
}

Monster.prototype.unshow = function () {
    this.div.style.display = "none";
}

Monster.prototype.inflictDamage = function (damage) {
    this.life -= damage;

    if(this.life <= 0){
        this.kill();
    }else{
        this.damageFeedback();
    }
}

Monster.prototype.damageFeedback = function () {
    this.div.className = "monster";
    that = this;
    setTimeout( function () {
        that.div.className = "monster damaged";
    }, 50);
    
}





NormalMonster.prototype = new Monster();
NormalMonster.prototype.constructor = NormalMonster;

function NormalMonster(gridX, gridY){
    Monster.call(this, gridX, gridY);
}






LeatherMonster.prototype = new Monster();
LeatherMonster.prototype.constructor = LeatherMonster;

var divMonsterLeather = document.getElementById("hidden-monsters").getElementsByClassName("monster")[1];
function LeatherMonster(gridX, gridY){
    Monster.call(this, gridX, gridY);
    this.div = divMonsterLeather.cloneNode(true);
    this.life = 20;
    this.points = 20;
    gridMonster.lastChild.remove();
    console.log(this.div);

    if(gridY >= 0 && gridY >= 0){
        gridMonster.appendChild(this.div);
    }
}

LeatherMonster.prototype.inflictDamage = function (damage) {
    this.life -= damage;

    if(this.life <= 0){
        this.kill();
    }
    else{
        this.damageFeedback();
    }
}



MetalMonster.prototype = new LeatherMonster();
MetalMonster.prototype.constructor = MetalMonster;

var divMonsterMetal = document.getElementById("hidden-monsters").getElementsByClassName("monster")[2];
function MetalMonster(gridX, gridY){
    LeatherMonster.call(this, gridX, gridY);
    this.div = divMonsterMetal.cloneNode(true);
    this.life = 30;
    this.points = 30;
    gridMonster.lastChild.remove();
    console.log(this.div);
    gridMonster.appendChild(this.div);
}



ImpMonster.prototype = new Monster();
ImpMonster.prototype.constructor = ImpMonster;

var divMonsterImp = document.getElementById("hidden-monsters").getElementsByClassName("monster")[3];
function ImpMonster(gridX, gridY){
    Monster.call(this, gridX, gridY);
    this.div = divMonsterImp.cloneNode(true);
    this.life = 6;
    this.speed = 0.003;
    this.attackPeriod = 0.5;
    gridMonster.lastChild.remove();
    console.log(this.div);
    gridMonster.appendChild(this.div);
}

ImpMonster.prototype.damageFeedback = function () {
    this.div.className = "monster imp";
    that = this;
    setTimeout( function () {
        that.div.className = "monster imp damaged";
    }, 50);
    
}

GiantMonster.prototype = new Monster();
GiantMonster.prototype.constructor = GiantMonster;

var divMonsterGiant = document.getElementById("hidden-monsters").getElementsByClassName("monster")[4];
function GiantMonster(gridX, gridY){
    Monster.call(this, gridX, gridY);
    this.div = divMonsterGiant.cloneNode(true);
    this.life = 100;
    this.attackPeriod = 2;
    this.damage = 14;
    this.width = 16;
    gridMonster.lastChild.remove();
    console.log(this.div);
    gridMonster.appendChild(this.div);
}

GiantMonster.prototype.inflictDamage = function (damage) {
    this.life -= damage;

    if(this.life <= 0){
        this.kill();
    }else{
        // this.damageFeedback();
    }
}

//Projectile #########################################################################
var divProjectile = document.getElementById("hidden-projectiles").getElementsByClassName("projectile")[0];
var gridProjectile = document.getElementById("projectile-container");
function Projectile(gridX, gridY) {
    this.damage = 1;
    this.speed = 0.02;
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = this.gridX*8 + 3; //offset = 3
    this.y = this.gridY*9.2;
    this.div = divProjectile.cloneNode(true);
    this.lastFrame = now;
    this.dt = 1;

    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";
    this.state = "alive";
    gridProjectile.appendChild(this.div);
}

Projectile.prototype.show = function () {
    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";
}

Projectile.prototype.move = function () {
    this.dt = now - this.lastFrame;
    this.lastFrame = now;
    this.x += this.speed*this.dt;

    if(this.x > 110){
        this.kill();
    }
}

Projectile.prototype.kill = function () {
    this.state = "dead";
}

Projectile.prototype.unshow = function () {
    this.div.style.display = "none";
}


// ########################################   LANE OBJECT

function Lane (creatures, monsters, peasantProjectiles) {
    this.creatures = creatures;
    this.monsters = monsters;
    this.peasantProjectiles = peasantProjectiles;
}



Lane.prototype.getNearestMonster = function (projectileX) {
    var monsters = this.monsters;
    var length = monsters.length;

    if(length <= 0){
        return null;
    }

    var monster;
    var nearestMonster;
    var i = length - 1;
    for (i; i >= 0; i--) {
        monster = monsters[i];
        if(monster.x < projectileX && projectileX < (monster.x + monster.width - 3)){
            nearestMonster = monster;
        }
    }



    if(!nearestMonster){
        return null;
    }

    return nearestMonster;
}

function Lane (creatures, monsters, peasantProjectiles) {
    this.creatures = creatures;
    this.monsters = monsters;
    this.peasantProjectiles = peasantProjectiles;
}



Lane.prototype.getNearestCreature = function (monsterX) {
    var creatures = this.creatures;
    var length = creatures.length;

    if(length <= 0){
        return null;
    }

    var creature;
    var nearestCreature;
    var i = length - 1;
    for (i; i >= 0; i--) {
        creature = creatures[i];
        if(monsterX > creature.x - 2 && monsterX < (creature.x + creature.width - 2)){
            nearestCreature = creature;
        }
    }



    if(!nearestCreature){
        return null;
    }

    return nearestCreature;
}


Lane.prototype.hasMonster = function(){
    if(this.monsters.length > 0){
        return true;
    }
    return false;
}

Lane.prototype.killPeasantProjectile = function(index){
    this.peasantProjectiles[index].unshow();
    this.peasantProjectiles.splice(index, 1);
}

Lane.prototype.killMonster = function(index){
    this.monsters[index].unshow();
    this.monsters.splice(index, 1);
}

Lane.prototype.killCreature = function(index){
    this.creatures[index].unshow();
    this.creatures.splice(index, 1);
}

Lane.prototype.isGridXAvail = function (gridX){
    var creatures = this.creatures;
    var len = creatures.length;

    for (var i = len - 1; i >= 0; i--) {
        if(creatures[i].gridX == gridX){
            return false;
        }
    }


    return true;
}


// WAVE GENERATOR
function MonsterGenerator(){
    this.lastFrame = now;
    this.lastGenerate = now;
    this.dt = 0;
    this.interval = 20; //at first, add 5 sec per wave
    this.monsterPoints = 1;
    this.maxMonsterPoints = 1;
    this.generateDiff = 0;
}

function hasMonsters(){
    var i = lanes.length - 1
    for (i; i >= 0; i--) {
        if(lanes[i].monsters.length > 0){
            return true;
        }
    }
    return false;
}

//run always
MonsterGenerator.prototype.generate = function(argument){
    this.dt = now - this.lastFrame;
    if(running){
        var hasMonstersLane = hasMonsters();

        if(this.dt > 1000*this.interval && this.monsterPoints <= 0 && !hasMonstersLane){
            this.lastFrame = now;
            this.interval += 5;
            

            if(waves % 2 == 0){
                this.maxMonsterPoints += this.maxMonsterPoints;
            }
            else{
                this.maxMonsterPoints += 3;
            }


            this.monsterPoints = this.maxMonsterPoints;
            nextWave();
            console.log("next wave");
            console.log("Max Points" + this.monsterPoints);
        }
        else{
            this.generateDiff = now - this.lastGenerate;
            if(this.monsterPoints > 0 && this.generateDiff > 500){
                this.lastGenerate = now;
                //1 to 100
                var random = Math.floor((Math.random() * 100) + 1);

                //Lanes 0 - 4
                var randomGridY = Math.floor(Math.random() * 5);

                //Monster spawn will be 1.5 tile wide
                var randomXOffset = Math.random(); 




                console.log("random = " + random);

                console.log("randomY = " + randomGridY);

                console.log("randomX = " + randomXOffset);

                if(random >= 0 && random < 30){
                    //Normal monster
                    if(this.monsterPoints >= 1){
                        this.monsterPoints -= 1;
                        var monsterRandom = new NormalMonster(10 + randomXOffset, randomGridY);
                        lanes[monsterRandom.gridY].monsters.push(monsterRandom);
                        this.lastGenerate = now;
                    }
                }
                else if(random >= 30 && random < 55){
                    //Leather monster
                    if(this.monsterPoints >= 3){
                        this.monsterPoints -= 3;
                        var monsterRandom = new LeatherMonster(10 + randomXOffset, randomGridY);
                        lanes[monsterRandom.gridY].monsters.push(monsterRandom);
                        this.lastGenerate = now;
                    }
                }

                else if(random >= 55 && random < 80){
                    //Metal monster
                    if(this.monsterPoints >= 5){
                        this.monsterPoints -= 5;
                        var monsterRandom = new MetalMonster(10 + randomXOffset, randomGridY);
                        lanes[monsterRandom.gridY].monsters.push(monsterRandom);
                        this.lastGenerate = now;
                    }
                }

                else if(random >= 80 && random < 90){
                    //Imp monster
                    if(this.monsterPoints >= 1){
                        this.monsterPoints -= 1;
                        var monsterRandom = new ImpMonster(10 + randomXOffset, randomGridY);
                        lanes[monsterRandom.gridY].monsters.push(monsterRandom);
                        this.lastGenerate = now;
                    }
                }

                else if(random >= 90 && random < 100){
                    //Giant monster
                    if(this.monsterPoints >= 8){
                        this.monsterPoints -= 8;
                        var monsterRandom = new GiantMonster(10 + randomXOffset, randomGridY);
                        lanes[monsterRandom.gridY].monsters.push(monsterRandom);
                        this.lastGenerate = now;
                    }
                }


            }
        }
    }
};


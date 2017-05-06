//todo  [x] Create creature object
//todo  [x]  Create peasant_creature
//todo  [x] Create monster object
//todo  [x]  Create normal_monster

//note  ask clyde to change the name of the creature to normal-creature
//note  Use camelcasting in javascript, use hyphen for css/html

// Creatures ######################################################################################
var divCreature0 = document.getElementById("hidden-creatures").getElementsByClassName("creature")[0];
function Creature(gridX, gridY, width) {
    // positioning, display
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = gridX * 8;
    this.y = gridY * 9.2;
    this.width = 8;
    this.div = divCreature0.cloneNode(true);

    //Life
    this.life = 3;

    //Time
    this.lastFrame = new Date();
    this.dt = 1;
    this.attackPeriod = 1; //seconds



};
var gridCreature = document.getElementById("creature-container");
Creature.prototype.show = function () {
//    var grid = document.getElementsByClassName("grid")[0];
  
    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";
    gridCreature.appendChild(this.div);
};

PeasantCreature.prototype = new Creature();
PeasantCreature.prototype.constructor = PeasantCreature;

function PeasantCreature(gridX, gridY, width){
    Creature.call(this, gridX, gridY, width);
    this.attackContext;
    this.isAttacking = false;
    // this.isAttackNow = false;
}

PeasantCreature.prototype.startAttack = function () {
    // this.attackContext = setInterval(this.attack.bind(this), 1000);
    this.isAttacking = true;
    this.lastFrame = +new Date();
};

PeasantCreature.prototype.stopAttack = function () {
    // clearInterval(this.attackContext);
    this.isAttacking = false;
};

PeasantCreature.prototype.attack = function () {
    this.dt = now - this.lastFrame;
    // console.log("dt: " + this.dt);
    // console.log("isAttackNow: " + this.isAttackNow)
    // console.log("isAttacking: " + this.isAttacking);
    if(this.dt > 1000*this.attackPeriod && this.isAttacking){
        this.lastFrame = now;
        var projectile = new Projectile(this.gridX,this.gridY);
        lanes[this.gridY].peasantProjectiles.push(projectile);
        // console.log(lanes[this.gridY].peasantProjectiles);
        // console.log("Attack!");
        // this.attackNow = false;
    }
    // console.log("After Attack;");
};

// Monsters #########################################################################################
// You can use float for gridX and gridY
var divMonster0 = document.getElementById("hidden-monsters").getElementsByClassName("monster")[0];


function Monster(gridX, gridY, width) {
    
    //For display and positioning
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = gridX*8;
    this.y = gridY*9.2;
    this.width = 8;


    //For life
    this.life = 10;
    this.state = "alive";


    //Mostly monsters will have negative directions
    //To the left = negative dir
    this.dir = -1;
    this.speed = 0.001;

    //Timing properties
    this.dt = 0;
    this.lastFrame = +new Date();

    this.div = divMonster0.cloneNode(true);
    console.log('this.div', this.div);
};

var gridMonster = document.getElementById("monster-container");
Monster.prototype.show = function () {
    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";
    gridMonster.appendChild(this.div);
};

Monster.prototype.move = function(){
    this.dt = now - this.lastFrame;
    this.lastFrame = now;

    this.x += this.speed*this.dt*this.dir;
}

Monster.prototype.kill = function(){
    this.state = "dead";
}

Monster.prototype.unshow = function () {
    this.div.style.display = "none";
}

Monster.prototype.inflictDamage = function (damage) {
    this.life -= damage;

    if(this.life <= 0){
        this.kill();
    }
}


NormalMonster.prototype = new Monster();
NormalMonster.prototype.constructor = NormalMonster;

function NormalMonster(gridX, gridY, width){
    Monster.call(this, gridX, gridY, width);
}



//Projectile #########################################################################
var divProjectile = document.getElementById("hidden-projectiles").getElementsByClassName("projectile")[0];
function Projectile(gridX, gridY) {
    this.damage = 1;
    this.speed = 0.05;
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = this.gridX*8 + 3; //offset = 3
    this.y = this.gridY*9.2;
    this.div = divProjectile.cloneNode(true);
    this.lastFrame = +new Date();
    this.dt = 1;

    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";
    this.state = "alive";
    gridCreature.appendChild(this.div);
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


Lane.prototype.getNearestMonster = function(){
    var monsters = this.monsters;
    var length = monsters.length;

    if(length <= 0){
        return null;
    }

    var nearest = monsters[0];
    var nearestX = nearest.x;
    var i = length - 1;
    for (i; i >= 1; i--) {
        if(monsters[i].x < nearestX){
            nearest = monsters[i];
            nearesX = nearest.x;
        }
    }


    return nearest;
}

Lane.prototype.killPeasantProjectile = function(index){
    this.peasantProjectiles[index].unshow();
    this.peasantProjectiles.splice(index, 1);
}

Lane.prototype.killMonster = function(index){
    this.monsters[index].unshow();
    this.monsters.splice(index, 1);
}
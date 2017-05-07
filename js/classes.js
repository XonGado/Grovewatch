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
    this.x = gridX * 8;
    this.y = gridY * 9.2;
    this.width = 8;

    //Life
    this.life = 5;
    this.state = "alive";

    //Time
    this.lastFrame = now;
    this.dt = 1;
    this.attackPeriod = 1; //seconds

    







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




StoneCreature.prototype = new Creature();
StoneCreature.prototype.constructor = StoneCreature;

function StoneCreature(gridX, gridY){
    Creature.call(this, gridX, gridY);
    this.life = 30;
    this.div = divCreature1.cloneNode(true);
}












PeasantCreature.prototype = new Creature();
PeasantCreature.prototype.constructor = PeasantCreature;

function PeasantCreature(gridX, gridY){
    Creature.call(this, gridX, gridY);
    this.attackContext;
    this.isAttacking = false;
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



// Monsters #########################################################################################
// You can use float for gridX and gridY
var divMonster0 = document.getElementById("hidden-monsters").getElementsByClassName("monster")[0];
var gridMonster = document.getElementById("monster-container");
function Monster(gridX, gridY) {
    
    //For display and positioning
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = gridX*8;
    this.y = gridY*9.2;
    this.width = 8;


    //For life
    this.life = 10;
    this.state = "alive";
    this.points = 10;


    //Mostly monsters will have negative directions
    //To the left = negative dir
    this.dir = -1;
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



//Projectile #########################################################################
var divProjectile = document.getElementById("hidden-projectiles").getElementsByClassName("projectile")[0];
var gridProjectile = document.getElementById("projectile-container");
function Projectile(gridX, gridY) {
    this.damage = 1;
    this.speed = 0.02;
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = this.gridX*8 + 1; //offset = 3
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

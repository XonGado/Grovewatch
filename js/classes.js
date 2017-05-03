//todo  [x] Create creature object
//todo  [x]  Create peasant_creature
//todo  [x] Create monster object
//todo  [x]  Create normal_monster

//note  ask clyde to change the name of the creature to normal-creature
//note  Use camelcasting in javascript, use hyphen for css/html

// Creatures ######################################################################################
var divCreature0 = document.getElementById("hidden-creatures").getElementsByClassName("creature")[0];
function Creature(gridX, gridY, width) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = gridX * 8;
    this.y = gridY * 9.2;
    this.width = 8;
    this.life = 3;
    this.div = divCreature0.cloneNode(true);
    console.log('this.div', this.div);
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
}

PeasantCreature.prototype.startAttack = function () {
    this.attackContext = setInterval(this.attack.bind(this), 1000);
};

PeasantCreature.prototype.stopAttack = function () {
    clearInterval(this.attackContext);
};

PeasantCreature.prototype.attack = function () {
    var projectile = new Projectile(this.gridX,this.gridY);

    lanes[this.gridY].peasantProjectiles.push(projectile);
    console.log(lanes[this.gridY].peasantProjectiles);

};

// Monsters #########################################################################################
// You can use float for gridX and gridY
var divMonster0 = document.getElementById("hidden-monsters").getElementsByClassName("monster")[0];
function Monster(gridX, gridY, width) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = gridX*8;
    this.y = gridY*9.2;
    this.width = 8;
    this.life = 10;
    this.div = divMonster0.cloneNode(true);
    console.log('this.div', this.div);
};

var gridMonster = document.getElementById("monster-container");
Monster.prototype.show = function () {

    
    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";
    gridMonster.appendChild(this.div);
};

NormalMonster.prototype = new Monster();
NormalMonster.prototype.constructor = NormalMonster;

function NormalMonster(gridX, gridY, width){
    Monster.call(this, gridX, gridY, width);
}



//Projectile #########################################################################

function Projectile(gridX, gridY) {
    this.damage = 1;
    this.speed = 0.05;
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = this.gridX*8 + 3; //offset = 3
    this.y = this.gridY*9.2;
    this.div = document.getElementById("hidden-projectiles").getElementsByClassName("projectile")[0].cloneNode(true);
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



// ########################################   LANE OBJECT

function Lane (creatures, monsters, peasantProjectiles) {
    this.creatures = creatures;
    this.monsters = monsters;
    this.peasantProjectiles = peasantProjectiles;
}

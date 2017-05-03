//todo  [x] Create creature object
//todo  [x]  Create peasant_creature
//todo  [x] Create monster object
//todo  [x]  Create normal_monster

//note  ask clyde to change the name of the creature to normal-creature
//note  Use camelcasting in javascript, use hyphen for css/html

// Creatures ######################################################################################
function Creature(gridX, gridY, width) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = gridX*8;
    this.y = gridY*9.2;
    this.width = 8;
    this.life = 3;
    this.div = document.getElementById("hidden-creatures").getElementsByClassName("creature")[0].cloneNode(true);
    console.log('this.div', this.div);
};

Creature.prototype.show = function () {
//    var grid = document.getElementsByClassName("grid")[0];
    
    var grid = document.getElementById("creature-container");
    
    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";
    grid.appendChild(this.div);
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
    // var projectile = new Projectile(this.gridX,this.gridY);
    var projectile = new Projectile(0,2);
    peasantProjectiles.push(projectile);
    console.log(peasantProjectiles);
};

// Monsters #########################################################################################
// You can use float for gridX and gridY
function Monster(gridX, gridY, width) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = gridX*8;
    this.y = gridY*9.2;
    this.width = 8;
    this.life = 10;
    this.div = document.getElementById("hidden-monsters").getElementsByClassName("monster")[0].cloneNode(true);
    console.log('this.div', this.div);
};

Monster.prototype.show = function () {
    var grid = document.getElementById("creature-container");
    
    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";
    grid.appendChild(this.div);
};

NormalMonster.prototype = new Monster();
NormalMonster.prototype.constructor = NormalMonster;

function NormalMonster(gridX, gridY, width){
    Monster.call(this, gridX, gridY, width);
}



//Projectile #########################################################################

function Projectile(gridX, gridY) {
    this.damage = 1;
    this.speed = 0.1;
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = this.gridX*8 + 3; //offset = 3
    this.y = this.gridY*9.2;
    this.div = document.getElementById("hidden-projectiles").getElementsByClassName("projectile")[0].cloneNode(true);
    this.lastFrame = +new Date();
    this.changeInTime = 1;

    var grid = document.getElementById("creature-container");
    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";
    this.state = "alive";
    grid.appendChild(this.div);

}


Projectile.prototype.show = function () {
    this.div.style.left = this.x + "vw";
    this.div.style.top = this.y + "vw";
}

Projectile.prototype.move = function () {
    var now = +new Date();
    this.changeInTime = now - this.lastFrame;
    this.x += this.speed*this.changeInTime/timeInterval;
    lastFrame = now;
}



// ########################################   LANE OBJECT

function Lane (argument) {
    
}

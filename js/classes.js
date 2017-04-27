//todo  [x] Create creature object
//todo  [x]  Create peasant_creature
//todo  [x] Create monster object
//todo  [x]  Create normal_monster

//note  ask clyde to change the name of the creature to normal-creature
//note  Use camelcasting in javascript, use hyphen for css/html

// Creatures ######################################################################################
function Creature(gridX, gridY) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.div = document.getElementById("creature-container").getElementsByClassName("creature")[0].cloneNode(true);
    console.log('this.div', this.div);
};

Creature.prototype.show = function () {
//    var grid = document.getElementsByClassName("grid")[0];
    
    
    var grid = document.getElementById("creature-container");
    
    this.div.style.left = this.gridX*8 + "vw";
    this.div.style.top = this.gridY*9.2 + "vw";
    grid.appendChild(this.div);
};

PeasantCreature.prototype = new Creature();
PeasantCreature.prototype.constructor = PeasantCreature;

function PeasantCreature(gridX, gridY){
    Creature.call(this, gridX, gridY);
}


// Monsters #########################################################################################
// You can use float for gridX and gridY
function Monster(gridX, gridY) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.div = document.getElementById("monster-container").getElementsByClassName("monster")[0].cloneNode(true);
    console.log('this.div', this.div);
};

Monster.prototype.show = function () {
    var grid = document.getElementById("creature-container");
    
    this.div.style.left = this.gridX*8 + "vw";
    this.div.style.top = this.gridY*9.2 + "vw";
    grid.appendChild(this.div);
};

NormalMonster.prototype = new Monster();
NormalMonster.prototype.constructor = NormalMonster;

function NormalMonster(gridX, gridY){
    Monster.call(this, gridX, gridY);
}

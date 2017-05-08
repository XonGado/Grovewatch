//GAMEPLAY

lanes = [];



time = 0;
now = +new Date();
running = true;
timeDilation = 0;
oldTime = 0;

//Monster generator
var monsterGenerator = null;


//UI
var cd0, cd1, cd2, cd3, cd4, cd5, cd6, cd7, cd8, cd9;
var gold_leaves = 500;
var waves = 0;
var kills = 0;
var score = 0;
var endGame = false;
var selected = -1;


var isUnsummonToggle = false;

function setUnsummonToggle(){
	document.getElementById("unsummon-btn").addEventListener("click", unsummonToggle);
}

function unsummonToggle(){
	isUnsummonToggle = !isUnsummonToggle;
	if(isUnsummonToggle){
		document.getElementsByClassName("grid")[0].style.cursor = "url(unsummon.PNG), crosshair";
	}
	else{
		document.getElementsByClassName("grid")[0].style.cursor = "auto";
	}
}

function unsummonCreature(index){
	if(isUnsummonToggle && selected == -1){
		var gridX = (index%10);
		var gridY = Math.floor(index/10);
	
		if(lanes[gridY].creatures.length > 0){
			var creatures = lanes[gridY].creatures;
			var i = creatures.length - 1;
			for (i; i >= 0; i--) {
			 	if(creatures[i].gridX == gridX){
			 		creatures[i].kill();
			 	}
			} 
		}
		unsummonToggle();
	}
}


function createCards(){
	creatures_card = [];

	creatures_card.push(new CreatureCard("normal creature", 2000, 100, true, 0, PeasantCreature));
	creatures_card.push(new CreatureCard("normal creature", 10000, 50, true, 1, GoldCreature));
	creatures_card.push(new CreatureCard("normal creature", 45000, 150, true, 2, StoneCreature));
	creatures_card.push(new CreatureCard("normal creature", 3000, 100, true, 3, LaserCreature));
	creatures_card.push(new CreatureCard("normal creature", 3000, 200, true, 4));
	creatures_card.push(new CreatureCard("normal creature", 3000, 225, true, 5));
	creatures_card.push(new CreatureCard("normal creature", 3000, 300, true, 6));
	creatures_card.push(new CreatureCard("normal creature", 3000, 350, true, 7));
	creatures_card.push(new CreatureCard("normal creature", 3000, 400, true, 8));
	creatures_card.push(new CreatureCard("normal creature", 3000, 450, true, 9));
}

function setUpCards(){
	var creature_cards = document.getElementsByClassName("creature-card");
	
	for (var i = 0; i < creature_cards.length - 5; i++) {
    	unlock(i);
	}

	for (var i = 0; i <= creatures_card.length - 1; i++) {
    	unaffordable(i);
		creature_cards[i].children[3].children[1].innerHTML = creatures_card[i].cost;
	}
}

function CreatureCard(name, cooldown, cost, locked, index, creatureConstructor) {
    this.name = name;
    this.cooldown = cooldown;
    this.cost = cost;
    this.locked = locked;

    this.index = index;


    this.dt = 0;
    this.lastFrame = now;
    this.isCoolingDown = false;

    this.creatureConstructor = creatureConstructor;
}

CreatureCard.prototype.cooldowning = function () {
    this.dt = now - this.lastFrame;
    if(this.dt > 1000 && this.isCoolingDown){
        this.lastFrame = now;
        cooldownTick(this.index);
    }
}

CreatureCard.prototype.startCooldown = function () {
    // this.lastFrame = now;
    // this.isCoolingDown = true;
    setCooldown(this.index);
}

CreatureCard.prototype.createCreature = function (gridX, gridY){
	var creatureCreated = new this.creatureConstructor(gridX, gridY);
	lanes[gridY].creatures.push(creatureCreated);
}



function createButtonListeners(index){
    var creature_card_btns = document.getElementsByClassName("creature-btn");
	creature_card_btns[index].addEventListener("click", function(){toggleCard(index)});
}

function createTileListeners(index){
	var tiles = document.getElementsByClassName("tile");
	tiles[index].addEventListener("click", function(){checkAction(index)});
	tiles[index].addEventListener("click", function(){getGold(index)});
	tiles[index].addEventListener("click", function(){unsummonCreature(index)});
}

function getGold(index){
	var gridX = (index%10);
	var gridY = Math.floor(index/10);

	if(lanes[gridY].creatures.length > 0){
		var creatures = lanes[gridY].creatures;
		var i = creatures.length - 1;
		for (i; i >= 0; i--) {
		 	if(creatures[i].gridX == gridX){
		 		var creature = creatures[i];
		 		if(creature.pickGold){
		 			creature.pickGold();
		 			break;
		 		}
		 	}
		} 
	}
}

function toggleCard(index){
	var creature = creatures_card[index];
	if (creatures_card[index].cost <= gold_leaves) {
		var creature_btn = document.getElementsByClassName("creature-btn");
		if (creature_btn[index].className == "creature-btn") {
			for (var i = creature_btn.length - 1; i >= 0; i--) {
				creature_btn[i].className = "creature-btn";
			}
			creature_btn[index].className = "creature-btn selected";
			selected = index;
			console.log(selected);
		} else if (creature_btn[index].className == "creature-btn selected") {
			creature_btn[index].className = "creature-btn";
			selected = -1;
		}
	}
}

function checkAction(index){
	if (selected != -1) {
		summon(index);
	}
}

function summon(index){
	console.log("Summoning monster type " + selected + " on tile number " + index);
	var gridX = (index%10);
	var gridY = Math.floor(index/10);
	console.log(gridY + "," + gridX);
	var creature_btn = document.getElementsByClassName("creature-btn");
	for (var i = creature_btn.length - 1; i >= 0; i--) {
		creature_btn[i].className = "creature-btn";
	}
	// setCooldown(selected);
	//if gridX avail creatures, check lane gridY

	if(lanes[gridY].isGridXAvail(gridX)){
		creatures_card[selected].startCooldown();
		creatures_card[selected].createCreature(gridX, gridY);
		goldLeafModify(-creatures_card[selected].cost);
	}


	selected = -1;
}

function unaffordable(index) {
	// console.log("creatures_card[index].cost >= gold_leaves = " + creatures_card[index].cost >= gold_leaves);
    creature_cards = document.getElementsByClassName("creature-card");
    if (!creatures_card[index].locked && gold_leaves >= creatures_card[index].cost) {
        creature_cards[index].children[0].style.display = "none";
    } else if (!creatures_card[index].locked && gold_leaves < creatures_card[index].cost){
        creature_cards[index].children[0].style.display = "flex";
    	// console.log(gold_leaves + " " +  creatures_card[index].cost + ", "+ index + " unaffordable");
    }
}

function unlock(index) {
	creatures_card[index].locked = false;
    creature_cards = document.getElementsByClassName("creature-card");
    creature_cards[index].children[1].style.display = "none";
}

function setCooldown(index) {
    if (!creatures_card[index].locked) {
        // creature_cards = document.getElementsByClassName("creature-card");
        var temp_div = document.getElementsByClassName("creature-card")[index].children[2];
        temp_div.style.display = "flex";
        temp_div.firstChild.addEventListener("webkitAnimationEnd", 
        	function () {
        		temp_div.style.display = "none";
        	}

        	);
        // cooldown_div = document.getElementsByClassName("cooldown");
        // var time = cooldown_div[index].children[0];
        // // console.log(cooldown);
        // time.innerHTML = (creatures_card[index].cooldown / 1000);
        // console.log(time.innerHTML);
     //    if (selected == 0) {
	    // 	cd0 = setInterval(function(){cooldownTick(0)}, 1000);
	    // } else if (selected == 1) {
	    // 	cd1 = setInterval(function(){cooldownTick(1)}, 1000);
	    // } else if (selected == 2) {
	    // 	cd2 = setInterval(function(){cooldownTick(2)}, 1000);
	    // } else if (selected == 3) {
	    // 	cd3 = setInterval(function(){cooldownTick(3)}, 1000);
	    // } else if (selected == 4) {
	    // 	cd4 = setInterval(function(){cooldownTick(4)}, 1000);
	    // } else if (selected == 5) {
	    // 	cd5 = setInterval(function(){cooldownTick(5)}, 1000);
	    // } else if (selected == 6) {
	    // 	cd6 = setInterval(function(){cooldownTick(6)}, 1000);
	    // } else if (selected == 7) {
	    // 	cd7 = setInterval(function(){cooldownTick(7)}, 1000);
	    // } else if (selected == 8) {
	    // 	cd8 = setInterval(function(){cooldownTick(8)}, 1000);
	    // } else if (selected == 9) {
	    // 	cd9 = setInterval(function(){cooldownTick(9)}, 1000);
	    // }
    }
}

// function cooldownTick(index) {
//     cooldown_UI = document.getElementsByClassName("cooldown");
//     var cooldown = parseInt(cooldown_UI[index].children[0].innerHTML);
//     // console.log(time);

//     if(running){
// 	    if (cooldown > 0) {
// 	        cooldown--;
// 	        cooldown_UI[index].children[0].innerHTML = cooldown;
// 	    } else {
// 	        var id = "creature_" + index + "_cd";
// 	        creature_cards = document.getElementsByClassName("creature-card");
// 	        creature_cards[index].children[2].style.display = "none";
	        
// 	        creatures_card[index].isCoolingDown = false;

// 	        // if (index == 0) {
// 	        //     clearTimeout(cd0);
// 	        // } else if (index == 1) {
// 	        //     clearTimeout(cd1);
// 	        // } else if (index == 2) {
// 	        //     clearTimeout(cd2);
// 	        // } else if (index == 3) {
// 	        //     clearTimeout(cd3);
// 	        // } else if (index == 4) {
// 	        //     clearTimeout(cd4);
// 	        // } else if (index == 5) {
// 	        //     clearTimeout(cd5);
// 	        // } else if (index == 6) {
// 	        //     clearTimeout(cd6);
// 	        // } else if (index == 7) {
// 	        //     clearTimeout(cd7);
// 	        // } else if (index == 8) {
// 	        //     clearTimeout(cd8);
// 	        // } else if (index == 9) {
// 	        //     clearTimeout(cd9);
// 	        // }
// 	    }
//     }
// }

function kill() {
    kills++;
    document.getElementById("kill-count").innerHTML = kills;
}

function nextWave() {
    waves++;
    document.getElementById("wave-count").innerHTML = waves;
}

function scoreUp(points) {
    score += points;
    document.getElementById("score-count").innerHTML = score;
}

function goldLeafModify(leaves) {
    gold_leaves += leaves;
    document.getElementById("gold-leaf-count").innerHTML = gold_leaves;
    for (var i = 0; i <= creatures_card.length - 1; i++) {
    	unaffordable(i);
	}
}

function openMenu(){
	document.getElementById("menu").style.display = "flex";
	pauseGame();
}

function closeMenu(){
	document.getElementById("menu").style.display = "none";
	unpauseGame();
}

function pauseGame(){
	var cards = document.querySelectorAll(".creature-card > .cooldown > .cooldown-bar");

	running = false;
	oldTime = now;
	time = now;
	for (var i = cards.length - 1; i >= 0; i--) {
		cards[i].style.animationPlayState = "paused";
	}
}

function unpauseGame(){
	var cards = document.querySelectorAll(".creature-card > .cooldown > .cooldown-bar");
	running = true;
	now = +new Date();
	timeDilation = (now - oldTime);
	for (var i = cards.length - 1; i >= 0; i--) {
		cards[i].style.animationPlayState = "running";
	}
}

function setup () {
	createCards();
	goldLeafModify(0);
    setUpCards();
    setUnsummonToggle();

    var creature_card_btns = document.getElementsByClassName("creature-btn");
	for (var i = creature_card_btns.length - 1; i >= 0; i--) {
		createButtonListeners(i);
	}

	var tiles = document.getElementsByClassName("tile");

	for (var i = tiles.length - 1; i >= 0; i--) {
		createTileListeners(i);
	}

	document.getElementById("menu-btn").addEventListener("click", openMenu);
	document.getElementById("resume").addEventListener("click", closeMenu);
}


// function updateGUI () {
// 	var len = creatures_card.length;

// 	for (var i = len - 1; i >= 0; i--) {
// 		creatures_card[i].cooldowning();
// 	}
// }

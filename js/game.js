var cd1, cd2, cd3, cd4, cd5, cd6, cd7, cd8, cd9;
var gold_leaves = 50;
var waves = 0;
var kills = 0;
var score = 0;
var endGame = false;	
window.onload = function(){
	document.getElementById("gold-leaf-count").innerHTML = gold_leaves;


	creatures = [];

	creatures.push(new CreatureCard("normal creature", 1000, 100, true));
	creatures.push(new CreatureCard("normal creature", 2000, 200, true));
	creatures.push(new CreatureCard("normal creature", 3000, 300, true));
	creatures.push(new CreatureCard("normal creature", 4000, 400, true));
	creatures.push(new CreatureCard("normal creature", 5000, 500, true));
	creatures.push(new CreatureCard("normal creature", 6000, 600, true));
	creatures.push(new CreatureCard("normal creature", 7000, 700, true));
	creatures.push(new CreatureCard("normal creature", 8000, 800, true));
	creatures.push(new CreatureCard("normal creature", 9000, 900, true));
	creatures.push(new CreatureCard("normal creature", 10000, 1000, true));


	// var creature2 = new Creature("caretaker", 5000, 100);
	// var creature3 = new Creature("bombby", 10000, 100);
	// var creature4 = new Creature("bombby", 10000, 100);
	// var creature5 = new Creature("bombby", 10000, 100);
	// var creature6 = new Creature("bombby", 10000, 100);
	// var creature7 = new Creature("bombby", 10000, 100);
	// var creature8 = new Creature("bombby", 10000, 100);
	// var creature9 = new Creature("bombby", 10000, 100);
	// var creature10 = new Creature("bombby", 10000, 100);

	creature_cards = document.getElementsByClassName("creature-card");

	// var cooldowns = document.getElementsByClassName("cooldown");

	creature_buttons = document.getElementsByClassName("creature-btn");

	for (var i = 0; i < creatures.length - 1; i++) {
	// for (var i = creatures.length - 1; i >= 0; i--) {
		// var index = i;
		// console.log(index);
		creature_buttons[i].addEventListener("click", function(){setCooldown(i)});
	}

	
	// creature_buttons[0].addEventListener("click", function(){setCooldown(creature_cards[0], creatures[0].cooldown)});
	// creature_buttons[1].addEventListener("click", function(){setCooldown(creature_cards[1], creatures[1].cooldown)});
	// creature_buttons[2].addEventListener("click", function(){setCooldown(creature_cards[2], creatures[2].cooldown)});
	// creature_buttons[3].addEventListener("click", function(){setCooldown(creature_cards[3], creatures[3].cooldown)});
	// creature_buttons[4].addEventListener("click", function(){setCooldown(creature_cards[4], creatures[4].cooldown)});
	// creature_buttons[5].addEventListener("click", function(){setCooldown(creature_cards[5], creatures[5].cooldown)});
	// creature_buttons[6].addEventListener("click", function(){setCooldown(creature_cards[6], creatures[6].cooldown)});
	// creature_buttons[7].addEventListener("click", function(){setCooldown(creature_cards[7], creatures[7].cooldown)});
	// creature_buttons[8].addEventListener("click", function(){setCooldown(creature_cards[8], creatures[8].cooldown)});
	// creature_buttons[9].addEventListener("click", function(){setCooldown(creature_cards[9], creatures[9].cooldown)});

	unaffordable(1, creatures[1].locked);
	creatures[5].locked = unlock(5);
	creatures[2].locked = unlock(2);

	// setInterval( function(){
	// 	setCooldown(5, creatures[5].locked, creatures[5].cooldown);
	// 	cd5 = setInterval(function(){cooldownTick(5)}, 1000);
	// }, 10000);

	// setInterval( function(){
	// 	setCooldown(2, creatures[2].locked, creatures[2].cooldown);
	// 	cd2 = setInterval(function(){cooldownTick(2)}, 1000);
	// }, 10000);

	setCooldown(2, creatures[2].locked, creatures[2].cooldown);
	cd2 = setInterval(function(){cooldownTick(2)}, 1000);
	
	creatures[1].locked = unlock(1);
	goldLeafModify(-creatures[1].cost);
	setTimeout(function(){
		creatures[0].locked = unlock(0);
	},7000);
	setTimeout(function(){
		creatures[3].locked = unlock(3);
	},10000);
}

function CreatureCard(name, cooldown, cost, locked){
	this.name = name;
	this.cooldown = cooldown;
	this.cost = cost;
	this.locked = locked;
}

function unaffordable(index, locked){
	if (!locked) {
		creature_cards = document.getElementsByClassName("creature-card");
		creature_cards[index].children[0].style.display = "flex";
	}
}

function unlock(index){
	creature_cards = document.getElementsByClassName("creature-card");
	creature_cards[index].children[1].style.display = "none";
	return false;
}

function setCooldown(index, locked, cooldown){
	if (!locked) {
		creature_cards = document.getElementsByClassName("creature-card");
		creature_cards[index].children[2].style.display = "flex";
		cooldown_div = document.getElementsByClassName("cooldown");
		var time = cooldown_div[index].children[0];	
		console.log(cooldown);
		time.innerHTML = (cooldown/1000);
		console.log(time.innerHTML);
	}
}

function cooldownTick(index){
	cooldown = document.getElementsByClassName("cooldown");
	var time = parseInt(cooldown[index].children[0].innerHTML);
	console.log(time);

	if (time) {
		time--;
		time.innerHTML = time;
		cooldown[index].children[0].innerHTML = time;
	} else{
		var id = "creature_" + index + "_cd";
		creature_cards = document.getElementsByClassName("creature-card");
		creature_cards[index].children[2].style.display = "none";
		if (index==0) {clearTimeout(creature_0_cd);}
		else if (index==1) {clearTimeout(cd1);}
		else if (index==2) {clearTimeout(cd2);}
		else if (index==3) {clearTimeout(cd3);}
		else if (index==4) {clearTimeout(cd4);}
		else if (index==5) {clearTimeout(cd5);}
		else if (index==6) {clearTimeout(cd6);}
		else if (index==7) {clearTimeout(cd7);}
		else if (index==8) {clearTimeout(cd8);}
		else if (index==9) {clearTimeout(cd9);}
	}
}

function kill(){
	kills++;
	document.getElementById("kill-count").innerHTML = kills;
}

function nextWave(){
	// Generate Zombies here. Maybe?
	waves++;
	document.getElementById("wave-count").innerHTML = kills;
}

function scoreUp(points){
	score += points;
	document.getElementById("score-count").innerHTML = score;
}

function goldLeafModify(leaves){
	gold_leaves += leaves;
	document.getElementById("gold-leaf-count").innerHTML = gold_leaves;
}
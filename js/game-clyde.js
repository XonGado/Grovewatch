window.onload = function () {
	var endGame = false;

	creatures = [];

	creatures.push(new Creature("normal creature", 3000, 100));
	creatures.push(new Creature("normal creature", 3000, 100));
	creatures.push(new Creature("normal creature", 3000, 100));
	creatures.push(new Creature("normal creature", 3000, 100));
	creatures.push(new Creature("normal creature", 3000, 100));
	creatures.push(new Creature("normal creature", 3000, 100));
	creatures.push(new Creature("normal creature", 3000, 100));
	creatures.push(new Creature("normal creature", 3000, 100));
	creatures.push(new Creature("normal creature", 3000, 100));
	creatures.push(new Creature("normal creature", 3000, 100));

    
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

	for (var i = 0; i < creatures.length; i++) {
		var c = creature_cards[i];
		creature_buttons[i].addEventListener("click", function() {console.log(creature_cards[i]);setCooldown(creature_cards[i])});
		console.log();
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





}


function Creature(name, cooldown, cost){
	this.name = name;
	this.cooldown = cooldown;
	this.cost = cost;
}

function setCooldown(creature){
	// console.log(index);
	console.log(creature);

	// var creature_card = document.getElementsByClassName("creature-card");

 	//console.log(creature_card[index]);

	//var cooldown_display = creature_card[index].children[2];
	//var index = this.getAttribute("data-index");
	creature.children[2].style.display = "flex";

}
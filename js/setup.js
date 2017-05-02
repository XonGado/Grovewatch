var cd1, cd2, cd3, cd4, cd5, cd6, cd7, cd8, cd9;
var gold_leaves = 1000;
var waves = 0;
var kills = 0;
var score = 0;
var endGame = false;
var selected = -1;

function createCards(){
	creatures_card = [];

	creatures_card.push(new CreatureCard("normal creature", 3000, 25, true));
	creatures_card.push(new CreatureCard("normal creature", 3000, 50, true));
	creatures_card.push(new CreatureCard("normal creature", 3000, 100, true));
	creatures_card.push(new CreatureCard("normal creature", 3000, 150, true));
	creatures_card.push(new CreatureCard("normal creature", 3000, 200, true));
	creatures_card.push(new CreatureCard("normal creature", 3000, 225, true));
	creatures_card.push(new CreatureCard("normal creature", 3000, 300, true));
	creatures_card.push(new CreatureCard("normal creature", 3000, 350, true));
	creatures_card.push(new CreatureCard("normal creature", 3000, 400, true));
	creatures_card.push(new CreatureCard("normal creature", 3000, 450, true));
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

function CreatureCard(name, cooldown, cost, locked) {
    this.name = name;
    this.cooldown = cooldown;
    this.cost = cost;
    this.locked = locked;
}

function createButtonListeners(index){
    var creature_card_btns = document.getElementsByClassName("creature-btn");
	creature_card_btns[index].addEventListener("click", function(){toggleCard(index)});
}

function createTileListeners(index){
	var tiles = document.getElementsByClassName("tile");
	tiles[index].addEventListener("click", function(){checkAction(index)});
	// console.log("created listener for tile " + index);
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
	var gridX = (index%10) + 1;
	var gridY = Math.floor(index/10) + 1;
	console.log(gridY + "," + gridX);
	var creature_btn = document.getElementsByClassName("creature-btn");
	for (var i = creature_btn.length - 1; i >= 0; i--) {
		creature_btn[i].className = "creature-btn";
	}
	setCooldown(selected);
	goldLeafModify(-creatures_card[selected].cost)
	selected = -1
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
        creature_cards = document.getElementsByClassName("creature-card");
        creature_cards[index].children[2].style.display = "flex";
        cooldown_div = document.getElementsByClassName("cooldown");
        var time = cooldown_div[index].children[0];
        // console.log(cooldown);
        time.innerHTML = (creatures_card[index].cooldown / 1000);
        // console.log(time.innerHTML);
        if (selected == 0) {
	    	cd0 = setInterval(function(){cooldownTick(0)}, 1000);
	    } else if (selected == 1) {
	    	cd1 = setInterval(function(){cooldownTick(1)}, 1000);
	    } else if (selected == 2) {
	    	cd2 = setInterval(function(){cooldownTick(2)}, 1000);
	    } else if (selected == 3) {
	    	cd3 = setInterval(function(){cooldownTick(3)}, 1000);
	    } else if (selected == 4) {
	    	cd4 = setInterval(function(){cooldownTick(4)}, 1000);
	    } else if (selected == 5) {
	    	cd5 = setInterval(function(){cooldownTick(5)}, 1000);
	    } else if (selected == 6) {
	    	cd6 = setInterval(function(){cooldownTick(6)}, 1000);
	    } else if (selected == 7) {
	    	cd7 = setInterval(function(){cooldownTick(7)}, 1000);
	    } else if (selected == 8) {
	    	cd8 = setInterval(function(){cooldownTick(8)}, 1000);
	    } else if (selected == 9) {
	    	cd9 = setInterval(function(){cooldownTick(9)}, 1000);
	    }
    }
}

function cooldownTick(index) {
    cooldown = document.getElementsByClassName("cooldown");
    var time = parseInt(cooldown[index].children[0].innerHTML);
    // console.log(time);

    if (time) {
        time--;
        time.innerHTML = time;
        cooldown[index].children[0].innerHTML = time;
    } else {
        var id = "creature_" + index + "_cd";
        creature_cards = document.getElementsByClassName("creature-card");
        creature_cards[index].children[2].style.display = "none";
        if (index == 0) {
            clearTimeout(cd0);
        } else if (index == 1) {
            clearTimeout(cd1);
        } else if (index == 2) {
            clearTimeout(cd2);
        } else if (index == 3) {
            clearTimeout(cd3);
        } else if (index == 4) {
            clearTimeout(cd4);
        } else if (index == 5) {
            clearTimeout(cd5);
        } else if (index == 6) {
            clearTimeout(cd6);
        } else if (index == 7) {
            clearTimeout(cd7);
        } else if (index == 8) {
            clearTimeout(cd8);
        } else if (index == 9) {
            clearTimeout(cd9);
        }
    }
}

function kill() {
    kills++;
    document.getElementById("kill-count").innerHTML = kills;
}

function nextWave() {
    waves++;
    document.getElementById("wave-count").innerHTML = kills;
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
}

function closeMenu(){
	document.getElementById("menu").style.display = "none";
}


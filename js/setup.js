var cd1, cd2, cd3, cd4, cd5, cd6, cd7, cd8, cd9;
var gold_leaves = 50;
var waves = 0;
var kills = 0;
var score = 0;
var endGame = false;

function createCards(){
	creatures_card = [];

	creatures_card.push(new CreatureCard("normal creature", 3000, 100, false));
	creatures_card.push(new CreatureCard("normal creature", 3000, 100, false));
	creatures_card.push(new CreatureCard("normal creature", 3000, 100, false));
	creatures_card.push(new CreatureCard("normal creature", 3000, 100, false));
	creatures_card.push(new CreatureCard("normal creature", 3000, 100, false));
	creatures_card.push(new CreatureCard("normal creature", 3000, 100, false));
	creatures_card.push(new CreatureCard("normal creature", 3000, 100, false));
	creatures_card.push(new CreatureCard("normal creature", 3000, 100, false));
	creatures_card.push(new CreatureCard("normal creature", 3000, 100, false));
	creatures_card.push(new CreatureCard("normal creature", 3000, 100, false));
}

function CreatureCard(name, cooldown, cost, locked) {
    this.name = name;
    this.cooldown = cooldown;
    this.cost = cost;
    this.locked = locked;
}

function toggleCard(){

}

function unaffordable(index) {
    if (!creatures[index].locked) {
        creature_cards = document.getElementsByClassName("creature-card");
        creature_cards[index].children[0].style.display = "flex";
    }
}

function unlock(index) {
    creature_cards = document.getElementsByClassName("creature-card");
    creature_cards[index].children[1].style.display = "none";
    return false;
}

function setCooldown(index) {
    if (!creatures_card[index].locked) {
        creature_cards = document.getElementsByClassName("creature-card");
        creature_cards[index].children[2].style.display = "flex";
        cooldown_div = document.getElementsByClassName("cooldown");
        var time = cooldown_div[index].children[0];
        console.log(cooldown);
        time.innerHTML = (creatures_card[index].cooldown / 1000);
        console.log(time.innerHTML);
    }
}

function cooldownTick(index) {
    cooldown = document.getElementsByClassName("cooldown");
    var time = parseInt(cooldown[index].children[0].innerHTML);
    console.log(time);

    if (time) {
        time--;
        time.innerHTML = time;
        cooldown[index].children[0].innerHTML = time;
    } else {
        var id = "creature_" + index + "_cd";
        creature_cards = document.getElementsByClassName("creature-card");
        creature_cards[index].children[2].style.display = "none";
        if (index == 0) {
            clearTimeout(creature_0_cd);
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
}
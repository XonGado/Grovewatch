//changes game.js was changed to game-clyde.js

window.onload = function () {
	// testCreaturesCreate();
    // testMonstersCreate();

    createCards();
	goldLeafModify(0);
    setUpCards();

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

function testCreaturesCreate() {
    var normalCreature1;

    var i;
    var leni = 10;
    for (i = 0; i < leni; i++) {
        var j;
        var lenj = 5;
        for (j = 0; j < lenj; j++) {
            normalCreature1 = new PeasantCreature(i, j);
            normalCreature1.show();
        }
    }
};

function testMonstersCreate() {
    var normalMonster1;
    var i;
    var leni = 10;
    for (i = 0; i < leni; i++) {
        var j;
        var lenj = 5;
        for (j = 0; j < lenj; j++) {
            normalMonster1 = new NormalMonster(i, j);
            normalMonster1.show();
        }
    }
};

// Merged JS Until the end.







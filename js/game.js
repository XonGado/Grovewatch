//changes game.js was changed to game-clyde.js

window.onload = function () {
    //    testCreaturesCreate();
    //    testMonstersCreate();
    createCards();

    for (var i = creatures_card.length - 1; i >= 0; i--) {
    	unlock(i);
    }
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







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



function testCreaturesAttack(x, y){
    var normalCreature1;

    console.log(x + " " + y);

    var i;
    var leni = x;
    for (i = 0; i < leni; i++) {
        var j;
        var lenj = y;
        console.log("asd");
        for (j = 0; j < lenj; j++) {
            console.log("hehe");
            normalCreature1 = new PeasantCreature(i, j);
            normalCreature1.show();
            normalCreature1.startAttack();
            lanes[j].creatures.push(normalCreature1);
            console.log("x: " + x + " y: " + y);
            console.log("creature " + i + " " + normalCreature1);
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

function testMonstersAttack(x, y) {
    var normalMonster1;
    var i;
    var leni = x;
    for (i = 0; i < leni; i++) {
        var j;
        var lenj = y;
        for (j = 0; j < lenj; j++) {
            normalMonster1 = new NormalMonster(i, j);
            normalMonster1.show();
        }
    }
};
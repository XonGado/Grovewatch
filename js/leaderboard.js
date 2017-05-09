window.onload = function(){
	var players = cookiesToArray();
	var panel = "";
	var list = document.getElementById("top-player-list");

	for (var i = 0; i < players.length && i < 10; i++) {
		panel = "<li>" + 
			"<h2>" + players[i][0] + "</h2>" +
			"<h3>" + (i + 1) + "</h3>" +
			"<ul class = 'stats'>" +
			"<li class = 'score'>Score: " + players[i][1] + "</li>" +
			"<li><img src='images/kills.png' alt='kills_logo'>" + players[i][2] + "</li>" +
			"<li><img src='images/monster_wave.png' alt='waves_logo'>" + players[i][3] + "</li>" +
			"<ul>" +
			"</li>";
		list.innerHTML += panel;
	}
}

function cookiesToArray(){
    var cookies = document.cookie.split("; ");
    var cookie_values = [];
    var temp = [];
    console.log(cookies);

    if (cookies[0] != "") {
        for (var i = 0; i < cookies.length && i < 10; i++) {
            console.log(cookies[i]);
        }

        for (var i = 0; i < cookies.length && i < 10; i++) {
            temp = cookies[i].split("=");
            cookies[i] = temp[1]; 
            cookies[i] = cookies[i].split("$-$");
            cookie_values.push(cookies[i]);
        }
    }

    cookie_values.sort(function (a,b){
        return b[1] - a[1];
    });

    return cookie_values;
}
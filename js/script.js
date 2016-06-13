/*jslint browser: true*/
/*global $, jQuery, alert*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */
"use strict";


var kaarten = ["img/clubs2.png",
                   "img/clubs3.png",
                   "img/clubs4.png",
                   "img/clubs5.png",
                   "img/clubs6.png",
                   "img/clubs7.png",
                   "img/clubs8.png",
                   "img/clubs9.png",
                   "img/clubs10.png",
                   "img/clubsj.png",
                   "img/clubsq.png",
                   "img/clubsk.png",
                   "img/clubsa.png" ];

        
var randomNummer = Math.floor((Math.random() * kaarten.length));
var punten = 0;
var aantalPogingen = 5;
        
function drawKaart() {
    $("#afbeeldingKaart").attr("src", kaarten[randomNummer]);
}

function gameOver() {

    $("#speelKnopHoger").hide();
    $("#speelKnopLager").hide();
    $("#afbeeldingKaart").hide();
    $("#puntenGameOver").html("Points : " + punten);
            
    $("#gameOver").show();
}

$(document).ready(drawKaart);
        
function hogereKaart() {
    if (aantalPogingen > 0) {
        var hoger = Math.floor((Math.random() * kaarten.length));
        $("#afbeeldingKaart").attr("src", kaarten[hoger]);
        if (hoger >= randomNummer) {
            punten = punten + 1;
            $("#score2").html("CORRECT +1");
               
            $("#score2").fadeOut(800, function () {
                $("#score2").fadeIn(100);
                $("#score2").html("SCORE : " + punten);
            });
        } else {
            aantalPogingen = aantalPogingen - 1;
            $("#score2").html("FAULT -1");
               
            $("#score2").fadeOut(800, function () {
                $("#score2").fadeIn(100);
                $("#score2").html("SCORE : " + punten);
            });
                
            if (aantalPogingen === 4) {
                $("#hart5").attr("src", "img/hart1.png");
                    
            } else if (aantalPogingen === 3) {
                $("#hart4").attr("src", "img/hart1.png");
            } else if (aantalPogingen === 2) {
                $("#hart3").attr("src", "img/hart1.png");
            } else if (aantalPogingen === 1) {
                $("#hart2").attr("src", "img/hart1.png");
            } else if (aantalPogingen === 0) {
                gameOver();
            }
        }
           
        randomNummer = hoger;
        $("#afbeeldingKaart").attr("src", kaarten[hoger]);
    }
}
        
function lagereKaart() {
    if (aantalPogingen > 0) {
        var lager = Math.floor((Math.random() * kaarten.length));
        $("#afbeeldingKaart").attr("src", kaarten[lager]);
        if (lager <= randomNummer) {
            punten = punten + 1;
            $("#score2").html("CORRECT +1");
            
            $("#score2").fadeOut(800, function () {
                $("#score2").fadeIn(100);
                $("#score2").html("SCORE : " + punten);
            });
        } else {
            aantalPogingen = aantalPogingen - 1;
            $("#score2").html("FAULT -1");
               
            $("#score2").fadeOut(800, function () {
                $("#score2").fadeIn(100);
                $("#score2").html("SCORE : " + punten);
            });
                
            if (aantalPogingen === 4) {
                $("#hart5").attr("src", "img/hart1.png");
            } else if (aantalPogingen === 3) {
                $("#hart4").attr("src", "img/hart1.png");
            } else if (aantalPogingen === 2) {
                $("#hart3").attr("src", "img/hart1.png");
            } else if (aantalPogingen === 1) {
                $("#hart2").attr("src", "img/hart1.png");
            } else if (aantalPogingen === 0) {
                gameOver();
            }
        }
        randomNummer = lager;
        $("#afbeeldingKaart").attr("src", kaarten[lager]);
    }
}
        
function playAgain() {
    punten = 0;
    aantalPogingen = 5;
    $("#speelKnopHoger").show();
    $("#speelKnopLager").show();
    $("#afbeeldingKaart").show();
            
    $("#gameOver").hide();
            
    $("#score2").html("Score: 0 ");
    $("#hart1").attr("src", "img/hart2.png");
    $("#hart2").attr("src", "img/hart2.png");
    $("#hart3").attr("src", "img/hart2.png");
    $("#hart4").attr("src", "img/hart2.png");
    $("#hart5").attr("src", "img/hart2.png");
}

// DATABASE VOOR TOPSCORE AANMAKEN

var topscore, rijen, topscoreTekst, HigherLowerDatabase, db, naam, score;

function updateTablesSQL() {
    HigherLowerDatabase.transaction(function (tx) {
        tx.executeSql('SELECT * FROM highscores order by score desc', [], function (tx, results) {
            var lengte = 1;
            topscoreTekst = "";
            for (rijen = 0; rijen < lengte; rijen += 1) {
                topscoreTekst += "<tr><td>" + results.rows.item(rijen).score + "<\/td><\/tr>";
            }
            $("#highscoreTableDB tbody").html(topscoreTekst);
            $("#topscoorder").html(topscoreTekst);

        }, null);
    });

}

$(document).ready(function () {
    score = 0;
    topscore = [{
        "score" : score
    }];
    
    $(document).bind('pageinit', function () {
        $.mobile.defaultPageTransition = 'none';
    });
    
    HigherLowerDatabase = openDatabase('hlDatabase', '1.0', 'DB', 0.1 * 1024 * 1024);

    HigherLowerDatabase.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS highscores (score)');
        tx.executeSql('select count(*) as aantal from highscores where score like ?', [score], function (tx, results) {
            console.log("select werkt");
            if (results.rows.item(0).aantal === 0) {
                tx.executeSql('INSERT INTO highscores (score) VALUES (?)', [score], function (tx, results) {
                    console.log("ok!");
                }, function (tx, error) {
                    console.log("NOK!");
                });
            }

        }, function (tx, error) {
            console.log("NOK!");
        });
    });

				
    updateTablesSQL();

    $("#voegToe").click(function () {
        score = punten;
        topscore.push({
            "score" : score
        });

        HigherLowerDatabase.transaction(function (tx) {
            tx.executeSql('INSERT INTO highscores (score) VALUES (?)', [score]);
        });
					
        updateTablesSQL();

    });

});

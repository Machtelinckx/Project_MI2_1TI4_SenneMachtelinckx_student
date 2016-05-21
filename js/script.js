"use strict";
var kaartenHart = ["img/clubs2.png",
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

        
        var randomNummer = Math.floor((Math.random() * kaartenHart.length));
        var punten = 0;
        var aantalPogingen = 5;
        
        function drawKaart() {
            $("#afbeeldingKaart").attr("src", kaartenHart[randomNummer]);
        }

        $(document).ready(drawKaart);
        
       function hogereKaart() {
           if (aantalPogingen > 0) {
           var hoger = Math.floor((Math.random() * kaartenHart.length)); 
           $("#afbeeldingKaart").attr("src", kaartenHart[hoger]); 
           if (hoger >= randomNummer){
               punten++; 
               $("#score2").html("CORRECT +1");
               $("#pogingen").html("SCORE : " + punten);
               
               $("#score2").fadeOut(1500, function(){
                   $("#score2").fadeIn(100);
                   $("#score2").html("SCORE : " + punten);
                });
               $("#pogingen").fadeOut(1500, function(){
                   $("#pogingen").fadeIn(100);
                   $("#pogingen").html("Wrong guesses left : " + aantalPogingen);
               });
            }
            else 
            {
                aantalPogingen--; 
                if(aantalPogingen == 0)
                {
                    $("#pogingen").html("Wrong guesses left : " + aantalPogingen);
                    gameOver();
                }
                else
                {
                    $("#score2").html("FAULT -1");
                    $("#pogingen").html("Wrong guesses left : " + aantalPogingen);
               
                    $("#score2").fadeOut(1500, function(){
                        $("#score2").fadeIn(100);
                        $("#score2").html("SCORE : " + punten);
                    });
                }   
            }
           
             randomNummer = hoger;
             $("#afbeeldingKaart").attr("src", kaartenHart[hoger]);
               }
       }
        
function lagereKaart() {
    if (aantalPogingen > 0) {
        var lager = Math.floor((Math.random() * kaartenHart.length));
        $("#afbeeldingKaart").attr("src", kaartenHart[lager]); 
        if (lager <= randomNummer){
            punten++; 
            $("#score2").html("CORRECT +1");
            $("#pogingen").html("SCORE : " + punten);
            
            $("#score2").fadeOut(1500, function(){
                $("#score2").fadeIn(100);
                $("#score2").html("SCORE : " + punten);
            });
            $("#pogingen").fadeOut(1500, function(){
                $("#pogingen").fadeIn(100);
                $("#pogingen").html("Wrong guesses left : " + aantalPogingen);
            });
        }
        
        else
        {
            aantalPogingen--;
            if(aantalPogingen == 0) 
            {
                gameOver();
            }
            else
            {
                $("#score2").html("FAULT -1");
                $("#pogingen").html("Wrong guesses left : " + aantalPogingen);
               
                $("#score2").fadeOut(1500, function(){
                    $("#score2").fadeIn(100);
                    $("#score2").html("SCORE : " + punten);
                });
               
            }   
        }
        randomNummer = lager;
        $("#afbeeldingKaart").attr("src", kaartenHart[lager]);
    }
}
        
function gameOver(){

    $("#speelKnopHoger").hide();
    $("#speelKnopLager").hide();
    $("#afbeeldingKaart").hide(); 
    $("#puntenGameOver").html("Points : " + punten);
            
    $("#gameOver").show();
}
        
function playAgain() {
    punten = 0;
    aantalPogingen = 5;
    $("#speelKnopHoger").show();
    $("#speelKnopLager").show();
    $("#afbeeldingKaart").show();
            
    $("#gameOver").hide();
            
    $("#score2").html("Score: 0 ");
    $("#pogingen").html("Wrong guesses left : 5 ");
}


var highScore, teller, tText, HigherLowerDatabase3, db, naam, score;

function updateTablesSQL() {
				HigherLowerDatabase3.transaction(function (tx) {
					tx.executeSql('SELECT * FROM highscores order by score desc', [], function (tx, results) {
						var len = 1;
						tText = "";
						for (teller = 0; teller < len; teller += 1) {
							tText += "<tr><td>" + results.rows.item(teller).score + "<\/td><\/tr>";
						}
						$("#highscoreTableDB tbody").html(tText);
                        $("#topscoorder").html("Highscore : " + tText);

					}, null);
				});

			}

$(document).ready(function () {
    score = 0;
    highScore = [{
        "score" : score
    }];
    
    $(document).bind('pageinit', function () {
					$.mobile.defaultPageTransition = 'none';
				});
    
    HigherLowerDatabase3 = openDatabase('hl3Database', '1.0', 'DB', 1 * 1024 * 1024);

HigherLowerDatabase3.transaction(function (tx) {
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
					highScore.push({
						"score" : score
					});

					HigherLowerDatabase3.transaction(function (tx) {
						tx.executeSql('INSERT INTO highscores (score) VALUES (?)', [score]);
					});
					
					updateTablesSQL();

				});

			});

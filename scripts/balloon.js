$(document).ready(function () {

    $('.container').css({
        'height' : '600px'
    });

    var game1 = {
        operator: '*', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 84,
        balloonImage: 'img/balloons2.png',
        balloonCount: 4,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [12, 15, 20, 7]
    };

    var game2 = {
        operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 101,
        balloonImage: 'img/balloons2.png',
        balloonCount: 4,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [96, 16, 5, 7]
    };

    var game3 = {
        operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 34,
        balloonImage: 'img/balloons2.png',
        balloonCount: 4,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [10, 10, 20, 4]
    };

    var game4 = {
        operator: '*', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 120,
        balloonImage: 'img/balloons2.png',
        balloonCount: 4,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [12, 5, 2, 21]
    };

    var game5 = {
        operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 55,
        balloonImage: 'img/balloons2.png',
        balloonCount: 4,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [22, 35, 7, 33]
    };

    var game6 = {
        operator: '*', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 400,
        balloonImage: 'img/balloons2.png',
        balloonCount: 4,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [20, 20, 2, 21]
    };

    //all games
    var games = [game2, game3, game4, game5, game6];
    games.sort();

    var balloons = [];
    var gameHeight = $('.container').height();
    var resultValues = [];
    var result = '.resultNumber';
    var gamePanel = '.gamePanel';
    var mathOp = '.mathOp';
    var checkComplete = false;
    var animateRate = 5800;
    var timeIsOver = false;

    console.log(gameHeight);

    //first game
    var game = game1;
    loadGame(game);

    function prepareBalloons(game) {
        for (let i = 0; i < game.balloonCount; i++) {
            var blnAlignLimit = 0;

            if (i % 2 == 0) {
                blnAlignLimit = 5;
            }

            balloonHtml = "<div class='col-md-3 mt-" + blnAlignLimit + "'>" +
                "<div id='balloon" + i + "' class='blnShape' value='" + game.balloonValues[i] + "'><span class='text-center balloonNumber'>" + game.balloonValues[i] + "</span></div></div>";
            $(".bln").append(balloonHtml);
        }

        $(".blnShape").each(function () {
            var blnShapeId = ($(this).attr("id"));

            balloons.push(blnShapeId);
            balloons.sort();
        });

        balloons.forEach(function (balloon) {
            var balloonId = "#" + balloon;
            blnPosition = game.internalPosition + "px";

            $(balloonId).css({
                'background-image': 'url("' + game.balloonImage + '")',
                'background-repeat': 'no-repeat',
                'height': game.balloonHeight + "px",
                'width': game.balloonWidth + "px",
                'background-position': '-5px ' + blnPosition
            });

            game.internalPosition -= 160;

            moveBalloon(balloonId);
        });
    }

    function moveBalloon(balloonId) {
        $(balloonId).animate({
            marginTop: gameHeight,
        }, animateRate, function () {
            timeIsOver = true;
        });
    }

    function balloonClick() {
        balloons.forEach(function (balloon) {
            var balloonId = "#" + balloon;
            var balloonValue;

            $(balloonId).click(function () {
                if (checkComplete) {
                    return;
                }

                boomEffect(balloonId);
                checkBalloonCalculate(balloonId);

                balloonValue = $(balloonId).attr('value');

                $(mathOp).append(" " + balloonValue + " " + game.operator);

                if (checkComplete) {
                    nextGame();
                }
            });

            var timer = setInterval(function () {
                var balloonHeight = $(balloonId).offset().top;

                if (balloonHeight >= gameHeight) {
                    boomEffect(balloonId);
                    clearInterval(timer);
                    timeIsOver = true;
                }

                // if (!checkComplete && timeIsOver) {
                //     gameover(result);
                //     clearInterval(timer);
                // }

            }, 1000);
        });
    }

    function boomEffect(balloonId) {
        $(balloonId).css({
            'background-image': 'url(img/boom.gif)',
            'background-position': '0 0'
        });

        $(balloonId + " span").hide();

        if (!checkComplete) {
            setTimeout(function () {
                $(balloonId).hide();
            }, 900);
        }
    }

    function loadGameStyle() {
        $(gamePanel).css({
            'border-radius': '15px',
            'height': '800px',
            'background-color': 'inherit!important',
        });

        $(result).css({
            'font-size': '30px',
            'color': 'orange',
            'font-weight': 'bold'
        });

        $('.mathOp').css({
            'font-size': '20px',
            'color': 'orange',
            'font-weight': 'bold'
        });

        $('body').css({
            'cursor': 'url("img/cursor.png"), auto',
        });
    }

    function checkBalloonCalculate(balloonId) {
        var value = $(balloonId).attr('value');
        balloonValue = parseInt(value);
        var totalValueNonSum = 1;
        var totalValue = 0;
        resultValues.push(balloonValue);

        for (var i = 0; i < resultValues.length; i++) {
            if (game.operator == '*') {
                totalValueNonSum *= resultValues[i];

                if (totalValueNonSum == game.resultNumber) {
                    checkComplete = true;
                    success(result);
                }
            }

            if (game.operator == '+') {
                totalValue += resultValues[i];

                if (totalValue == game.resultNumber) {
                    checkComplete = true;
                    success(result);
                }
            }

            if (game.operator == '-') {
                totalValue -= resultValues[i];

                if (totalValue == game.resultNumber) {
                    checkComplete = true;
                    success(result);
                }
            }

            if (game.operator == '/') {
                totalValueNonSum /= resultValues[i];

                if (totalValueNonSum == game.resultNumber) {
                    checkComplete = true;
                    success(result);
                }
            }
        }
    }

    function setCalcArea() {
        $(result).html('"' + game.operator + '" &#8594; ' + game.resultNumber);
    }

    function loadGame(game) {
        prepareBalloons(game);
        loadGameStyle();
        setCalcArea();
        balloonClick();
    }

    function clearGame() {
        $(mathOp).html(" ");
        $(".bln").html("");
        balloons = [];
        resultValues = [];
        checkComplete = false;
        timeIsOver = false;
    }

    function nextGame() {
        for (let i = 0; i < games.length; i++) {
            setTimeout(function () {
                if (checkComplete) {
                    clearGame();
                    game = games[i];
                    loadGame(game);
                    games.shift();
                }

                if (!checkComplete && timeIsOver) {
                    gameover(result);
                    clearInterval(timer);
                }

            }, 2000);
        }
    }

    function success(result) {
        $(result).html(game.resultNumber + ": Successful");

        $(result).css({
            'color': 'chartreuse'
        });
    }

    function gameover(result) {
        $(result).html("Game Over ! You Failed !");
        $(mathOp).append(" ");

        $(result).css({
            'color': 'maroon',
        });
    }
});
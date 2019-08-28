$(document).ready(function () {
    // var game1 = {
    //     operator: '-', //Plus = +, Minus = -, Divide = /, Multiply = * 
    //     resultNumber: 6,
    //     balloonImage: 'img/balloons3.png',
    //     balloonCount: 3,
    //     balloonHeight: 140,
    //     balloonWidth: 120,
    //     internalPosition: -5,
    //     balloonValues: [9, 5, 3]
    // };

    // var game2 = {
    //     operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
    //     resultNumber: 101,
    //     balloonImage: 'img/balloons3.png',
    //     balloonCount: 4,
    //     balloonHeight: 140,
    //     balloonWidth: 120,
    //     internalPosition: -5,
    //     balloonValues: [96, 16, 5, 7]
    // };

    // var game3 = {
    //     operator: '/', //Plus = +, Minus = -, Divide = /, Multiply = * 
    //     resultNumber: 2,
    //     balloonImage: 'img/balloons3.png',
    //     balloonCount: 4,
    //     balloonHeight: 140,
    //     balloonWidth: 120,
    //     internalPosition: -5,
    //     balloonValues: [58, 2, 20, 4]
    // };

    // var game4 = {
    //     operator: '*', //Plus = +, Minus = -, Divide = /, Multiply = * 
    //     resultNumber: 120,
    //     balloonImage: 'img/balloons3.png',
    //     balloonCount: 5,
    //     balloonHeight: 140,
    //     balloonWidth: 120,
    //     internalPosition: -5,
    //     balloonValues: [12, 5, 2, 21, 7]
    // };

    // var game5 = {
    //     operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
    //     resultNumber: 55,
    //     balloonImage: 'img/balloons3.png',
    //     balloonCount: 6,
    //     balloonHeight: 140,
    //     balloonWidth: 120,
    //     internalPosition: -5,
    //     balloonValues: [22, 35, 7, 33, 7, 5]
    // };

    // var game6 = {
    //     operator: '*', //Plus = +, Minus = -, Divide = /, Multiply = * 
    //     resultNumber: 400,
    //     balloonImage: 'img/balloons3.png',
    //     balloonCount: 5,
    //     balloonHeight: 140,
    //     balloonWidth: 120,
    //     internalPosition: -5,
    //     balloonValues: [20, 20, 2, 21, 17]
    // };

    var game1 = {
        operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 2,
        balloonImage: 'img/balloons3.png',
        balloonCount: 3,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [1, 1, 3]
    };

    var game2 = {
        operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 3,
        balloonImage: 'img/balloons3.png',
        balloonCount: 4,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [2, 16, 1, 7]
    };

    var game3 = {
        operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 4,
        balloonImage: 'img/balloons3.png',
        balloonCount: 4,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [2, 2, 20, 4]
    };

    var game4 = {
        operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 3,
        balloonImage: 'img/balloons3.png',
        balloonCount: 5,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [1, 5, 2, 21, 7]
    };

    var game5 = {
        operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 4,
        balloonImage: 'img/balloons3.png',
        balloonCount: 6,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [2, 35, 2, 33, 7, 5]
    };

    var game6 = {
        operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 3,
        balloonImage: 'img/balloons3.png',
        balloonCount: 5,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [1, 20, 2, 21, 17]
    };

    var game7 = {
        operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 5,
        balloonImage: 'img/balloons3.png',
        balloonCount: 5,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [10, 2, 8, 17]
    };

    
    var game8 = {
        operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 4,
        balloonImage: 'img/balloons3.png',
        balloonCount: 5,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [10, 2, 8, 2, 10]
    }; //s

    $('.container').css({
        'height': '600px'
    });

    //all games
    var games = [game2, game3, game4, game5, game6, game7, game8];
    games.sort();

    var balloons = [];
    var resultValues = [];
    var selectedBalloons = [];
    var gameHeight = $('.container').height();
    var result = '.resultNumber';
    var gamePanel = '.gamePanel';
    var mathOp = '.mathOp';
    var checkComplete = false;
    var timeIsOver = false;
    var animateRate = 11000;

    //first game
    var game = game1;
    loadGame(game);

    function prepareBalloons(game) {
        for (let i = 0; i < game.balloonCount; i++) {
            var blnAlignLimit = 0;

            if (i % 2 == 0) {
                blnAlignLimit = 5;
            }

            var balloonClass = 'col-md mt-' + blnAlignLimit;

            balloonHtml = "<div class='" + balloonClass + "'>" +
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

            var balloonValue = $(balloonId).attr("value");

            if (balloonValue.toString().length > 2) {
                $(balloonId + " > .balloonNumber").css({
                    'margin' : '30%',
                    'margin-top' : '40%',
                });
            }

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
            //animate completed
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

                selectedBalloons.push(balloonId);

                var check = hasDuplicates(selectedBalloons);

                if (check) {
                    selectedBalloons = selectedBalloons.filter(onlyUnique);
                    return;
                }

                boomEffect(balloonId);
                checkBalloonCalculate(balloonId);

                balloonValue = $(balloonId).attr('value');

                if (selectedBalloons.length == 1) {
                    $(mathOp).append(balloonValue);
                }
                else {
                    $(mathOp).append(" " + game.operator + " " + balloonValue);
                }

                if (checkComplete) {
                    nextGame();
                }
            });

            var balloonHeight;
            var timer;

            timer = window.setInterval(function () {
                if (games.length != 0 && !checkComplete) {
                    balloonHeight = $(balloonId).offset().top;
                }

                if (balloonHeight >= gameHeight) {
                    boomEffect(balloonId);
                    window.clearInterval(timer);
                    timeIsOver = true;

                    window.location.reload();
                }

                if (games.length == 0 && checkComplete) {
                    $(balloonId).hide();
                    window.clearInterval(timer);
                    $(result).html("You Won !");

                    window.location.reload();
                }

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
        var totalValueMulti = 1;
        var totalValueSum = 0;
        var totalValueDivide = resultValues[0];
        var totalValueMinus = resultValues[0];
        var resultValueExpect = 0;
        resultValues.push(balloonValue);

        for (var i = 0; i < resultValues.length; i++) {
            if (game.operator == '*') {
                totalValueMulti *= resultValues[i];

                if (totalValueMulti == game.resultNumber) {
                    checkComplete = true;
                    success(result);
                }
            }

            if (game.operator == '+') {
                totalValueSum += resultValues[i];

                if (totalValueSum == game.resultNumber) {
                    checkComplete = true;
                    success(result);
                }
            }

            if (game.operator == '-') {

                if (resultValues[i] > resultValues[i + 1]) {
                    resultValueExpect++;
                    totalValueMinus = totalValueMinus - resultValues[i + 1];
                }

                if (totalValueMinus == game.resultNumber && resultValueExpect > 0) {
                    checkComplete = true;
                    success(result);
                }
            }

            if (game.operator == '/') {

                if (resultValues[i] > resultValues[i + 1]) {
                    resultValueExpect++;
                    totalValueDivide = totalValueDivide / resultValues[i + 1];
                }

                if (totalValueDivide == game.resultNumber && resultValueExpect > 0) {
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
        $('.bln').append('<img class="grassBarrier img-fluid" src="img/grass.png" alt="">');

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
        selectedBalloons = [];
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

    function hasDuplicates(array) {
        var object = {};
        var result = false;

        array.forEach(function (item) {
            if (!object[item])
                object[item] = 0;
            object[item] += 1;
        })

        for (var prop in object) {
            if (object[prop] >= 2) {
                result = true;
            }
        }

        return result;
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
});
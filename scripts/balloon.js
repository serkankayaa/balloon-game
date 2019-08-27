$(document).ready(function () {
    var game1 = {
        operator: '-', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 11,
        balloonImage: 'img/balloons2.png',
        balloonCount: 4,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [25, 3, 12, 2]
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
        operator: '/', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 2,
        balloonImage: 'img/balloons2.png',
        balloonCount: 4,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [120, 2, 20, 4]
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

    $('.container').css({
        'height': '600px'
    });

    //all games
    var games = [game2, game3, game4, game5, game6];
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
    var animateRate = 10000;

    //first game
    var game = game1;
    loadGame(game);

    function prepareBalloons(game) {
        for (let i = 0; i < game.balloonCount; i++) {
            var blnAlignLimit = 0;

            if (i % 2 == 0) {
                blnAlignLimit = 5;
            }

            var colMdString = 'col-md';

            balloonHtml = "<div class='" + colMdString + "' mt-" + blnAlignLimit + "'>" +
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

                console.log("tıklandı");

                selectedBalloons.push(balloonId);

                var check = hasDuplicates(selectedBalloons);

                if (check) {
                    selectedBalloons = selectedBalloons.filter(onlyUnique);

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

                if (games.length == 0 && (checkComplete || timeIsOver)) {
                    $(balloonId).hide();

                    $(result).html("You Won !");
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
                    totalValueMinus = totalValueMinus - resultValues[i + 1];
                }

                if (totalValueMinus == game.resultNumber) {
                    checkComplete = true;
                    success(result);
                }
            }

            if (game.operator == '/') {

                if (resultValues[i] > resultValues[i + 1]) {
                    totalValueDivide = totalValueDivide / resultValues[i + 1];
                }

                if (totalValueDivide == game.resultNumber) {
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
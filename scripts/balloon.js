$(document).ready(function () {
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
        resultNumber: 34,
        balloonImage: 'img/balloons2.png',
        balloonCount: 4,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [10, 10, 20, 4]
    };

    var game = game1;
    var balloons = [];
    var gameHeight = $('.container').height();
    var resultValues = [];
    var result = '.resultNumber';
    var gamePanel = '.gamePanel';
    var mathOp = '.mathOp';
    var checkComplete = false;
    var animateRate = 5800;
    var timeIsOver = false;

    prepareBalloons();
    loadGameStyle();
    setCalcArea();

    function prepareBalloons() {
        for (let i = 0; i < game.balloonCount; i++) {
            var blnAlignLimit = 0;

            if (i % 2 == 0) {
                blnAlignLimit = 5;
            }

            var balloonHtml = "<div class='col-md-3 mt-" + blnAlignLimit + "'>" +
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

    balloons.forEach(function (balloon) {
        var balloonId = "#" + balloon;
        var balloonValue;

        $(balloonId).click(function () {
            boomEffect(balloonId);
            checkBalloonCalculate(balloonId);
            balloonValue = $(balloonId).attr('value');

            $(mathOp).append(" " + balloonValue + " " + game.operator);

            if (checkComplete) {
                $(mathOp).html("");
                $(result).html(game.resultNumber + ": Successful");
                game = game2;
            }
        });


        var timer = setInterval(function () {
            var balloonHeight = $(balloonId).offset().top;

            if (balloonHeight >= gameHeight) {
                boomEffect(balloonId);
                clearInterval(timer);

                timeIsOver = true;
            }
        }, 1000);

    });

    function boomEffect(balloonId) {
        $(balloonId).css({
            'background-image': 'url(img/boom.gif)',
            'background-position': '0 0'
        });

        $(balloonId + " span").hide();

        setTimeout(function () {
            $(balloonId).hide();
        }, 800);
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
        var totalValue = 0;
        resultValues.push(balloonValue);

        for (var i = 0; i < resultValues.length; i++) {
            if (game.operator == '*') {
                totalValueMulti *= resultValues[i];

                if (totalValueMulti == game.resultNumber) {
                    checkComplete = true;
                }
            }

            if (game.operator == '+') {
                totalValue += resultValues[i];

                if (totalValue == game.resultNumber) {
                    checkComplete = true;
                }
            }

            if (game.operator == '-') {
                totalValue -= resultValues[i];

                if (totalValue == game.resultNumber) {
                    checkComplete = true;
                }
            }

            if (game.operator == '/') {
                totalValue /= resultValues[i];

                if (totalValue == game.resultNumber) {
                    checkComplete = true;
                }
            }
        }
    }

    function setCalcArea() {
        $(result).html('"' + game.operator + '" &#8594; ' + game.resultNumber);
    }
});
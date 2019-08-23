$(document).ready(function () {
    var game = {
        operator: '+', //Plus = +, Minus = -, Divide = /, Multiply = * 
        resultNumber: 42,
        balloonImage: '../img/balloons2.png',
        balloonCount: 4,
        balloonHeight: 140,
        balloonWidth: 120,
        internalPosition: -5,
        balloonValues: [12, 15, 20, 7]
    };

    var balloons = [];
    var selectedBalloons = [];
    var gameHeight = $('.container').height();
    var resultValues = [];

    prepareBalloons();
    loadGameStyle();

    function prepareBalloons() {
        $('.resultNumber').html('"' +game.operator+'" &#8594; ' + game.resultNumber);

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
            // setInterval(function () {
            
            // }, 1000);
        });
    }

    function moveBalloon(balloonId) {
        $(balloonId).animate({
            marginTop: gameHeight,
        }, 4000);

    }

    balloons.forEach(function (balloon) {
        var balloonId = "#" + balloon;
        $(balloonId).click(function () {
            boomEffect(balloonId);
            selectedBalloons.push(balloon);
            checkBalloonCalculate(balloonId);
        })
    });

    function boomEffect(balloonId) {
        $(balloonId).css({
            'background-image': 'url(../img/boom.gif)',
            'background-position': '0 0'
        });

        $(balloonId + " span").hide();

        setTimeout(function () {
            $(balloonId).hide();
        }, 800);
    }

    function loadGameStyle() {
        $('.gamePanel').css({
            'border-radius': '15px',
            'height': '800px',
            'background-color': 'inherit!important',
        });

        $('.resultNumber').css({
            'font-size': '35px',
            'color': 'orange',
            'font-weight': 'bold'
        })

        $('body').css({
            'cursor': 'url("../img/cursor.png"), auto',
        })
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
                    $('.resultNumber').html(game.resultNumber + ": Successful");
                }
            }

            if (game.operator == '+') {
                totalValue += resultValues[i];

                if (totalValue == game.resultNumber) {
                    $('.resultNumber').html(game.resultNumber + ": Successful");
                }
            }

            if (game.operator == '-') {
                totalValue -= resultValues[i];

                if (totalValue == game.resultNumber) {
                    $('.resultNumber').html(game.resultNumber + ": Successful");
                }
            }

            if (game.operator == '/') {
                totalValue /= resultValues[i];

                if (totalValue == game.resultNumber) {
                    $('.resultNumber').html(game.resultNumber + ": Successful");
                }
            }
        }
    }
});
$(document).ready(function () {
    $('.container').css({
        'height': '600px'
    });

    //all games
    var games = [game2, game3, game4, game5, game6, game7, game8];

    games.sort(function (a, b) {
        return a.degreeOfDifficulty - b.degreeOfDifficulty;
    });

    var balloons = [];
    var resultValues = [];
    var selectedBalloons = [];
    var gameHeight = $('.container').height();
    var result = '.resultNumber';
    var gamePanel = '.gamePanel';
    var mathOp = '.mathOp';
    var checkComplete = false;
    var timeIsOver = false;

    //first game
    var game = game1;
    loadGame(game);

    $(document).on("click", "#btnPlayAgain", function () {
        window.location.reload();
    });

    function prepareBalloons(game) {
        if (game === undefined) {
            return;
        }

        var balloonCount = game.balloonValues.length;

        for (let i = 0; i < balloonCount; i++) {
            var blnAlignLimit = 0;

            if (i % 2 == 0) {
                blnAlignLimit = 5;
            }

            var balloonClass = 'col-md balloonCol mt-' + blnAlignLimit;

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
                    'margin': '30%',
                    'margin-top': '40%',
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
        }, gameOption.animateRate, function () {
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

                var checkMultipleClick = hasDuplicates(selectedBalloons);

                if (checkMultipleClick) {
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

                if (games.length == 0 && checkComplete) {
                    $('.balloonCol').remove();
                    $('.bln').attr("class", "row bln");

                    var successHtml = '<div class="card successBox mt-5">';

                    successHtml += '<div class="card-body">';
                    successHtml += '<h5 class="card-title text-center">Success 🎈</h5>';
                    successHtml += '<p class="card-text text-center">Congratulations. You Won.</p>';
                    successHtml += '<button class="button-box mt-2" id="btnPlayAgain"><h1 class="green">Play Again</h1></button>';
                    successHtml += '</div></div>';

                    $('.bln').append(successHtml);

                    $('.successBox').hide();
                    $('.successBox').show('slow');
                }
            });

            var balloonHeight;
            var timer;

            timer = setInterval(function () {
                try {
                    if (games.length > 0 && !checkComplete && balloonId.length) {
                        balloonHeight = $(balloonId).offset().top;
                    }

                    if (balloonHeight >= gameHeight) {
                        boomEffect(balloonId);
                        window.clearInterval(timer);
                        timeIsOver = true;

                        if (timeIsOver) {
                            $('.balloonCol').remove();
                            $('.bln').attr("class", "row bln");

                            var failedHtml = '<div class="card failedBox mt-5">';

                            failedHtml += '<div class="card-body">';
                            failedHtml += '<h5 class="card-title text-center">Failed 💥</h5>';
                            failedHtml += '<p class="card-text text-center">You failed. Balloons exploded !</p>';
                            failedHtml += '<button class="button-box mt-2" id="btnPlayAgain"><h1 class="green">Play Again</h1></button>';
                            failedHtml += '</div></div>';

                            $('.bln').append(failedHtml);

                            $('.failedBox').hide();
                            $('.failedBox').show('slow');
                        }
                    }

                    if (games.length == 0 && checkComplete) {
                        //if game successfuly ended
                        $(balloonId).hide();
                        clearInterval(timer);
                        balloons = [];
                        $(result).html("Congratulations You Won!");
                    }
                } catch (error) {
                    if (error instanceof TypeError === true) {
                        return;
                    }
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
            }, gameOption.stopBoomDuration);
        }
    }

    function loadGameStyle() {
        $(gamePanel).css({
            'border-radius': '15px',
            'height': '800px',
        });

        $(result).css({
            'font-size': '30px',
            'color': 'orange',
            'font-weight': 'bold'
        });

        $(mathOp).css({
            'font-size': '20px',
            'color': 'orange',
            'font-weight': 'bold'
        });

        $('body').css({
            'cursor': 'url("img/cursor.png"), auto',
            'background-image': 'url("../img/game-background.jpg")',
            'background-repeat': 'no-repeat',
            'background-attachment': 'fixed',
            'width': '100%',
            'height': 'auto',
            '-webkit-background-size': 'cover',
            '-moz-background-size': 'cover',
            '-o-background-size': 'cover',
            'background-size': 'cover',
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

            }, gameOption.beforeNextGame);
        }
    }

    function success(result) {
        $(result).html(game.resultNumber + ": Successful &#9989;");

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
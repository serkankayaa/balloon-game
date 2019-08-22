$(document).ready(function () {
    var balloons = [];
    var selectedBalloons = [];
    var balloonCount = 4;
    var imageURL = "../img/balloons.png";
    var balloonHeight = 140;
    var balloonWidth = 120;
    var internalPosition = -5;
    var gameHeight = $('.container').height();

    prepareBalloons();

    function prepareBalloons() {
        for (let i = 1; i <= balloonCount; i++) {
            var blnAlignLimit = 0;

            if (i % 2 == 0) {
                blnAlignLimit = 5;
            }

            var balloonHtml = "<div class='col-md-3 mt-" + blnAlignLimit + "'>" +
                "<div id='balloon" + i + "' class='blnShape'></div></div>";
            $(".bln").append(balloonHtml);
        }

        $(".blnShape").each(function () {
            var blnShapeId = ($(this).attr("id"));

            balloons.push(blnShapeId);
            balloons.sort();
        });

        balloons.forEach(balloon => {
            var balloonId = "#" + balloon;
            blnPosition = internalPosition + "px";

            $(balloonId).css({
                'background-image': 'url("' + imageURL + '")',
                'background-repeat': 'no-repeat',
                'height': balloonHeight + "px",
                'width': balloonWidth + "px",
                'background-position': '-5px ' + blnPosition
            });

            internalPosition -= 160;

            moveBalloon(balloonId);
        });

    }

    function moveBalloon(balloonId) {
        $(balloonId).animate({
            marginTop: gameHeight,
        }, 4000);
    }

    balloons.forEach(balloon => {
        var balloonId = "#" + balloon;
        $(balloonId).click(function () {
            boomEffect(balloonId);
            selectedBalloons.push(balloon);
            
        })
    });

    function boomEffect(balloonId) {
        $(balloonId).css({
            'background-image' : 'url(../img/boom.gif)',
            'background-position' : '0 0'
        });

        setTimeout(function () {
            $(balloonId).hide();
        }, 850);
    }
});
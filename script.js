$(document).ready(function(){
    initializeGame();
});

var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 9;
var matchCounter = 1;
var canBeClicked = true;
var matched = true;
var trueMatch = 0;
var gameplayCount = 1;

function initializeGame(){
    attachClickHandlers();
    shuffleCards();
}
function attachClickHandlers(){
    canBeClickedHandler();
    matchResetHandler();
    rulesClickHandler();
    staminaMeterClickHandler();
    healthMeterClickHandler();
}
function canBeClickedHandler(){
    $('.back').click(handleClick);
}
function matchResetHandler(){
    $('.reset').click(matchReset);
}
function handleClick(){
    if(canBeClicked === true){
        cardClicked(this);
        resetGame();
    }
    if(canBeClicked == false || firstCardClicked == secondCardClicked){
        $('.attempts .value').text(matchCounter++);
    }
}
function shuffleCards(){
    for(var randomCards = []; randomCards.length <= 18;){
        var i = Math.floor(Math.random() * $('.card').length);
        randomCards.push($('.card').splice(i, 1)[0]);
    }
    $('#game-area').append(randomCards);
}
function flipCard(cardBack){
    $(cardBack).addClass('flipped');
}
function cardClicked(cardBack){
    flipCard(cardBack);
    if(firstCardClicked === null){
        firstCardClicked = cardBack;
    } else {
        secondCardClicked = cardBack;
        canBeClicked = false;
        var firstCardImg = $(firstCardClicked).parent().find('.front img').attr('src');
        var secondCardImg = $(secondCardClicked).parent().find('.front img').attr('src');
        if(firstCardImg === secondCardImg){
            cardValuesReset();
            matched = true;
            trueMatch++;
        } else{
            matched = false;
            timeOut();
        }
        accuracy();
    }
}
function cardValuesReset(){
    firstCardClicked = null;
    secondCardClicked = null;
    canBeClicked = true;
}
function accuracy(){
    var accuracyVal = (trueMatch/matchCounter)*100;
    accuracyVal = accuracyVal.toFixed(2);
    $('.accuracy .value').text(accuracyVal + '%');
}
function matchReset(){
    $('.back').removeClass('flipped');
    matchCounter = 1;
    trueMatch = 0;
    $('.attempts .value').text('');
    $('.accuracy .value').text('');
    gamesPlayed();
    shuffleCards();
}
function timeOut(){
    setTimeout(function(){
        staminaReplenish();
        unflipCard(firstCardClicked,secondCardClicked);
        cardValuesReset();
    }, 2000);
}
function unflipCard(firstClicked, secondClicked){
    $(firstClicked).parent().find('.back').removeClass('flipped');
    $(secondClicked).last().removeClass('flipped');
}
function gamesPlayed() {
    $('.games-played .value').text(gameplayCount++);
}
function healthMeterClickHandler(){
    var $healthBar = $('.progress-bar.progress-bar-danger');
    var healthBarWidth = 100;
    $('.back').click(function(){
       if(firstCardClicked !== null && secondCardClicked !== null){
           if(matched === false){
               healthBarWidth -= 5;
               $healthBar.animate({
                   width: healthBarWidth + '%'
               }, 300);
           }
       }

    });
}
function staminaMeterClickHandler() {
    var $staminaBar = $('.progress-bar-warning');
    $('.back').click(function(){
        if(firstCardClicked !== null) {
            $staminaBar.animate({
                width: '50%'
            }, 100);
            if(secondCardClicked !== null) {
                $staminaBar.animate({
                    width: '0%'
                }, 100);
            }
        } else if(firstCardClicked === secondCardClicked){
            $staminaBar.animate({
                width:'100%'
            }, 100);
        }
    });
}
function staminaReplenish(){
    var $staminaBar = $('.progress-bar-warning');
    $staminaBar.animate({
        width: '100%'
    }, 50);
}
function rulesClickHandler(){
    $('.rules').click(function(){
        $('#rules-modal').modal('show');
    });
}
function resetGame(){
    if(trueMatch === totalPossibleMatches){
        $('.front').parent().find('.back').removeClass('flipped');
        shuffleCards();
    }
}

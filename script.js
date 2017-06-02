var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 9;
var matchCounter = 1;
var canBeClicked = true;
var matched = true;
var trueMatch = 0;
var gameplayCount = 1;

/*
 * Initialize Game and Attach Click Handlers
 */

$(document).ready(function(){
    initializeGame();
});

function initializeGame(){
    attachClickHandlers();
    shuffleCards();
}
function attachClickHandlers(){
    attemptsClickHandler();
    matchResetHandler();
    rulesClickHandler();
    staminaMeterClickHandler();
    healthMeterClickHandler();
    audioHandler();
}
function shuffleCards(){
    for(var randomCards = []; randomCards.length <= 18;){
        var i = Math.floor(Math.random() * $('.card').length);
        randomCards.push($('.card').splice(i, 1)[0]);
    }
    $('#game-area').append(randomCards);
}
function attemptsClickHandler(){
    $('.back').on('click', handleAttemptIncrements);
}
function matchResetHandler(){
    $('.reset').on('click', matchReset);
}
function rulesClickHandler(){
    $('.rules').click(function(){
        $('#rules-modal').modal('show');
    });
}

/*
 * Card Actions
 */

function flipCard(cardBack){
    $(cardBack).addClass('flipped');
}
function unflipCard(firstClicked, secondClicked){
    $(firstClicked).parent().find('.back').removeClass('flipped');
    $(secondClicked).last().removeClass('flipped');
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
            preventClick();
        }
        accuracy();
    }
    if(trueMatch === totalPossibleMatches) {
        $('.front').parent().find('.back').removeClass('flipped');
        showWinModal();
        gameRefresh()
    }
}
function cardValuesReset(){
    firstCardClicked = null;
    secondCardClicked = null;
    canBeClicked = true;
}
function preventClick(){
    setTimeout(function(){
        staminaReplenish();
        unflipCard(firstCardClicked,secondCardClicked);
        cardValuesReset();
    }, 1000);
}

/*
 * Stats
 */

function handleAttemptIncrements(){
    if(canBeClicked === true){
        cardClicked(this);
    }
    if(canBeClicked == false || firstCardClicked === secondCardClicked){
        $('.attempts .value').text(matchCounter++);
    }
}
function accuracy(){
    var accuracyVal = (trueMatch/matchCounter)*100;
    accuracyVal = accuracyVal.toFixed(2);
    $('.accuracy .value').text(accuracyVal + '%');
}
function gamesPlayed() {
    $('.games-played .value').text(gameplayCount++);
}

/*
 * Health and Stamina Bar Functions for Depletion and Replenishing
 */

function healthMeterClickHandler(){
    var healthBar = $('.progress-bar.progress-bar-danger');
    var healthBarWidth = 100;
    $('.card').on('click', function(){
       if(firstCardClicked !== null && secondCardClicked !== null){
           if(matched === false){
               healthBarWidth -= 5;
               healthBar.animate({
                   width: healthBarWidth + '%'
               }, 200);
               if(healthBarWidth === 0){
                   showLossModal();
                   gameRefresh();
               }
           }
       }
    });
}
function healthReplenish(){
    var healthBar = $('.progress-bar.progress-bar-danger');
    healthBar.css('width','100%').attr('aria-valuenow', '100');
    healthBar.animate({
        width: '100%'
    }, 50);
}
function staminaMeterClickHandler() {
    var staminaBar = $('.progress-bar-warning');
    $('.back').click(function(){
        if(firstCardClicked !== null) {
            staminaBar.animate({
                width: '50%'
            }, 100);
            if(secondCardClicked !== null) {
                staminaBar.animate({
                    width: '0%'
                }, 100);
            }
        } else if(firstCardClicked === secondCardClicked){
            staminaBar.animate({
                width:'100%'
            }, 100);
        }
    });
}
function staminaReplenish(){
    var staminaBar = $('.progress-bar-warning');
    staminaBar.animate({
        width: '100%'
    }, 50);
}
function resetBars(){
    staminaReplenish();
    healthReplenish();
}

/*
 * Audio
 */

function musicOn() {
    $('.music-on').addClass('audio-color');
    $('.music-off').removeClass('audio-color');
    $('.music-theme').trigger('play');
}
function musicOff(){
    $('.music-off').addClass('audio-color');
    $('.music-on').removeClass('audio-color');
    $('.music-theme').trigger('pause');
}
function audioHandler(){
    $('.music-on').click(musicOn);
    $('.music-off').click(musicOff);
}

/*
 * Win Condition and Resetting
 */

function showWinModal(){
    $('#win-modal').modal('show');
}
function showLossModal(){
    $('#loss-modal').modal('show');
}
function gameRefresh(){
    matchReset();
    shuffleCards();
    resetBars();
}
function matchReset(){
    $('.back').removeClass('flipped');
    matchCounter = 1;
    trueMatch = 0;
    $('.attempts .value').text('');
    $('.accuracy .value').text('');
    gamesPlayed();
    shuffleCards();
    resetBars();
}
function fullReset(){
    location.reload();
}

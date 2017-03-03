var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 9;
var matchCounter = 1;
var canBeClicked = true;
var matched = true;
var trueMatch = 0;
var gameplayCount = 1;

function initializeGame(){
    console.log('initialized');
    initializeClickHandler();
}
function initializeClickHandler(){
    $('.back').click(handleClick);
    $('.reset').click(matchReset);
}
function handleClick(){
    console.log("canBeClicked: " + canBeClicked);
    if(canBeClicked === true){
        cardClicked(this);
        attempts();
    }
}
function flipCard(cardBack){
    $(cardBack).addClass('flipped');
}
function cardClicked(cardBack){
    flipCard(cardBack);
    if(firstCardClicked === null){
        console.log('first card clicked');
        firstCardClicked = cardBack;
    } else {
        console.log('second clicked');
        secondCardClicked = cardBack;
        canBeClicked = false;
        var firstCardImg = $(firstCardClicked).parent().find('.front img').attr('src');
        var secondCardImg = $(secondCardClicked).parent().find('.front img').attr('src');
        if(firstCardImg === secondCardImg){
            console.log('they match');
            firstCardClicked = null;
            secondCardClicked = null;
            canBeClicked = true;
            matched = true;
            trueMatch++;
            console.log(matched);
        } else{
            console.log('they don\'t match');
            matched = false;
            console.log(matched);
            timeOut();
        }
        accuracy();
    }
}
function attempts(){
    if(canBeClicked == false || firstCardClicked == secondCardClicked){
        $('.attempts .value').text(matchCounter++);
    }
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
}
function wiggle(){
    $('.back').click(function(){
        $(this).effect('shake', {distance:2}, 300);
    });
}
function timeOut(){
    setTimeout(function(){
        unflipCard(firstCardClicked,secondCardClicked);
        wiggle();
        canBeClicked = true;
        firstCardClicked = null;
        secondCardClicked = null;
    }, 2000);
}
function unflipCard(firstClicked, secondClicked){
        $(firstClicked).parent().find('.back').removeClass('flipped');
        $(secondClicked).last().removeClass('flipped');
}
function gamesPlayed(){
    $('.games-played .value').text(gameplayCount++);
}
function resetGame(){
    //$('.front').parent().find('.back').removeClass('flipped');
}
$(document).ready(initializeGame);











/*
//example
function initializeGame(){
    initializeClickHandlers();
}
function initializeClickHandlers(){
    $('.back').click(handleClick);
}
function handleClick(){
    cardClicked(this);
}
function cardClicked(cardBack){
    flipCard(cardBack);
    if(firstCardClicked === null){
        console.log('first clicked');
        firstCardClicked = cardBack;
    } else {
        console.log('second clicked');
        secondCardBack = cardBack;
        var firstCardImage = $('firstCardClicked').parent().find(.front).css('background-image') or .attr('src');
        var secondCardImage = $('secondCardClicked').parent().find(.front).css('background-image') or .attr('src')
        if(firstCardClicked === secondCardClicked){
            console.log('they match');
        } else {
        console.log('they don't match');
        alert('delay');
        }
    }
}
function flipCard(cardBack){
    $(cardBack).addClass('.flipped');
}
function unflipCard(cardBack){
$(cardBack).removeClass('flipped');
*/
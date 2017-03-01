var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 2;
var matchCounter = 0;
var canBeClicked = true;

function initializeGame(){
    console.log('initialized');
    initializeClickHandler();
}
function initializeClickHandler(){
    $('.back').click(handleClick);
}
function handleClick(){
    if(firstCardClicked !== null && secondCardClicked !== null){
        return false;
    } else {
        cardClicked(this);
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
        var firstCardImg = $(firstCardClicked).parent().find('.front img').attr('src');
        var secondCardImg = $(secondCardClicked).parent().find('.front img').attr('src');
        if(firstCardImg === secondCardImg){
            console.log('they match');
            firstCardClicked = null;
            secondCardClicked = null;
        } else{
            console.log('they don\'t match');

            firstCardClicked = null;
            secondCardClicked = null;
            timeOut();
        }
    }
}
function timeOut(){
    setTimeout(function(){
        unflipCard();
    }, 1000);
}
function unflipCard(){
        $('.front').parent().find('.back').removeClass('flipped');
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
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
    $('.reset').click(matchReset);
}
function handleClick(){
    console.log("canBeClicked: " + canBeClicked);
    if(canBeClicked === true){
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
        canBeClicked = false;
        var firstCardImg = $(firstCardClicked).parent().find('.front img').attr('src');
        var secondCardImg = $(secondCardClicked).parent().find('.front img').attr('src');
        if(firstCardImg === secondCardImg){
            console.log('they match');
            matched();
            firstCardClicked = null;
            secondCardClicked = null;
            canBeClicked = true;
        } else{
            console.log('they don\'t match');
            timeOut();
            firstCardClicked = null;
            secondCardClicked = null;
        }
    }
}
function matched(){
    var misMatched = null;

}
function matchReset(){
    $('.back').removeClass('flipped');
    matchCounter = 0;
    $('.attempts .value').text('');
}
function timeOut(){
    setTimeout(function(){
        canBeClicked = true;
        unflipCard();
    }, 2000);
}
function unflipCard(){
    if(firstCardClicked != null && secondCardClicked != null){
        $('.front').parent().find('.back').removeClass('flipped');

}
function resetGame(){
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
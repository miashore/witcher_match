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
    particles();
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
function particles(){
    var PARTICLE_QUANT = 60;
    var FPS = 60;
    var BOUNCE = -1;
    var PARTICLE_COLOR = 'rgba(200, 0, 50,.6)';
    var ARC_RADIUS = 1;
    var Particles = function($element) {
        if ($element.length === 0) { return; }
        this.$element = $element;
        this.lastTimeStamp = null;
        this.particles = [];
        this.init();
    };
    var proto = Particles.prototype;
    proto.init = function() {
        this.createChildren();
        this.layout();
        this.enable();
    };
    proto.createChildren = function() {
        this.canvas = this.$element[0];
        this.context = this.canvas.getContext('2d');
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.lastTimeStamp = new Date().getTime();
        return this;
    };
    proto.layout = function() {
        window.requestAnimFrame = (function() {
            return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame         ||
                window.mozRequestAnimationFrame;
        })();
        return this;
    };
    proto.removeChildren = function() {
        this.context = null;
        this.canvasWidth = null;
        this.canvasHeight = null;
        this.lastTimeStamp = null;
        return this;
    };
    proto.enable = function() {
        this.createParticleData();
        this.renderLoop();
    };
    proto.createParticleData = function() {
        var i = 0;
        var l = PARTICLE_QUANT;

        for(; i < l; i++) {
            this.particles[i] = {};
            this.setParticleData(this.particles[i]);
        }
    };
    proto.setParticleData = function(particle) {
        particle.x = Math.random() * this.canvasWidth;
        particle.y = Math.random() * this.canvasHeight;
        particle.vx = (Math.random()) - 0.5;
        particle.vy = (Math.random()) - 0.5;
    };
    proto.update = function() {
        var i = 0;
        var l = PARTICLE_QUANT;

        for (; i < l; i++) {
            var particle = this.particles[i];

            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x > this.canvasWidth) {
                particle.x = this.canvasWidth;
                particle.vx *= BOUNCE;
            } else if (particle.x < 0) {
                particle.x = 0;
                particle.vx *= BOUNCE;
            }

            if (particle.y > this.canvasHeight) {
                particle.y = this.canvasHeight;
                particle.vy *= BOUNCE;
            } else if (particle.y < 0) {
                particle.y = 0;
                particle.vy *= BOUNCE;
            }
        }
    };
    proto.draw = function() {
        var i = 0;

        if (!this.context) {
            return;
        }
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.context.strokeStyle = PARTICLE_COLOR;

        for(; i < PARTICLE_QUANT; i++) {
            var particle = this.particles[i];
            this.context.save();
            this.context.beginPath();
            this.context.arc(particle.x, particle.y, ARC_RADIUS, 0, Math.PI * 2);
            this.context.stroke();
            this.context.restore();
        }
    };
    proto.renderLoop = function() {
        requestAnimationFrame(this.renderLoop.bind(this));
        this.update();
        this.draw();
    };
    var particles = new Particles($('#js-particles'));
}
function resetGame(){
    if(trueMatch === totalPossibleMatches){
        $('.front').parent().find('.back').removeClass('flipped');
        shuffleCards();
    }
}

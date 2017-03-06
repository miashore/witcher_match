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
    particles();
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
        staminaMeter();
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
        staminaMeter();
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
function healthMeter(){

}
function staminaMeter() {
    var $staminaBar = $('.progress-bar-warning');
    $('.back').click(function(){
        if (firstCardClicked == true) {
            $staminaBar.animate({
                width: '50%'
            }, 500);
            console.log('width is ' + $staminaBar);
        } else if (secondCardClicked == true) {
            $staminaBar.animate({
                width: 0
            }, 500);
            console.log('width is ' + $staminaBar);
        } else {
            $staminaBar.animate({
                width: '100%'
            }, 500);
        }
    });
}
function particles(){
    var PARTICLE_QUANT = 60;
    var FPS = 60;
    var BOUNCE = -1;
    var PARTICLE_COLOR = 'rgba(200, 0, 50,.6)';
    var ARC_RADIUS = 1;

    /**
     * Particles lib class
     *
     * @class Particles
     * @constructor
     */
    var Particles = function($element) {
        // if element doesnt exist in the DOM return early
        if ($element.length === 0) { return; }

        /**
         * A reference to the containing DOM element.
         *
         * @default null
         * @property {jQuery} $element
         * @public
         */
        this.$element = $element;

        /**
         * Initial timestamp use to for baseline of animation loop
         *
         * @default null
         * @property lastTimeStamp
         * @type {number}
         * @public
         */
        this.lastTimeStamp = null;

        /**
         * array representing particles
         *
         * @default empty array
         * @property lastTimeStamp
         * @type {array}
         * @public
         */
        this.particles = [];

        this.init();
    };

    var proto = Particles.prototype;

    /**
     * Initializes the class.
     * Runs a single setupHandlers call, followed by createChildren and layout.
     * Exits early if it is already initialized.
     *
     * @method init
     * @private
     */
    proto.init = function() {
        this.createChildren()
            .layout()
            .enable();
    };

    /**
     * Create any child objects or references to DOM elements.
     * Should only be run on initialization of the view.
     *
     * @method createChildren
     * @returns {Particles}
     * @private
     */
    proto.createChildren = function() {
        this.canvas = this.$element[0];
        this.context = this.canvas.getContext('2d');
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.lastTimeStamp = new Date().getTime();

        return this;
    };

    /**
     * handles layout of DOM elements
     *
     * @method layout
     * @returns {ParticlesController}
     * @private
     */
    proto.layout = function() {
        window.requestAnimFrame = (function() {
            return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame         ||
                window.mozRequestAnimationFrame;
        })();

        return this;
    };

    /**
     * Remove any child objects or references to DOM elements.
     *
     * @method removeChildren
     * @returns {Particles}
     * @public
     */
    proto.removeChildren = function() {
        this.context = null;
        this.canvasWidth = null;
        this.canvasHeight = null;
        this.lastTimeStamp = null;

        return this;
    };

    /**
     * Enables the component.
     * Performs any event binding to handlers.
     * Exits early if it is already enabled.
     *
     * @method enable
     * @public
     */
    proto.enable = function() {
        this.createParticleData();
        this.renderLoop();
    };

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHODS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * Creates particle data objects
     *
     * @method createParticleData
     * @private
     */
    proto.createParticleData = function() {
        var i = 0;
        var l = PARTICLE_QUANT;

        for(; i < l; i++) {
            this.particles[i] = {};
            this.setParticleData(this.particles[i]);
        }
    };

    /**
     * Sets the base particle data
     *
     * @method setParticleData
     * @private
     */
    proto.setParticleData = function(particle) {
        particle.x = Math.random() * this.canvasWidth;
        particle.y = Math.random() * this.canvasHeight;
        particle.vx = (Math.random()) - 0.5;
        particle.vy = (Math.random()) - 0.5;
    };

    /**
     * Updates the particle data object
     *
     * @method update
     * @private
     */
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

    /**
     * Renders the particle on the canvas
     *
     * @method draw
     * @private
     */
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

    /**
     * Creates the animation loop
     *
     * @method renderLoop
     * @private
     */
    proto.renderLoop = function() {
        requestAnimationFrame(this.renderLoop.bind(this));
        this.update();
        this.draw();
    };
    var particles = new Particles($('#js-particles'));
}
function resetGame(){
    //$('.front').parent().find('.back').removeClass('flipped');
}
$(document).ready(initializeGame);

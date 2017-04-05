// Vue.config.debug = true;

var rows = 6;
var columns = 6;
var x = 0;
var y = 0;
var nbDrops = 50;
var fallingDrops = [];
var contextBackground;

var vue = new Vue({
    el: '#timer',
    data: {
        timer: '',
        ended: false
    },
    computed: {
    },
    methods: {
    }
});

if (window.addEventListener) { // Mozilla, Netscape, Firefox
    window.addEventListener('load', WindowLoad, false);
}
else if (window.attachEvent) { // IE
    window.attachEvent('onload', WindowLoad);
}

/** Loads all images
 * @param {String} sources
 * @param {function} callback
 */
function loadImages(sources, callback) {
    var nb = 0;
    var loaded = 0;
    var imgs = {};
    for (var i in sources) {
        if (sources.hasOwnProperty(i)) {
            nb++;
            imgs[i] = new Image();
            imgs[i].src = sources[i];
            imgs[i].onload = function () {
                loaded++;
                if (loaded == nb) {
                    callback(imgs);
                }
            }
        }
    }
}

/**
 * Create and run the animation
 * @param {Event} window event
 */
function WindowLoad(event) {
    /* images */
    var sprites = {
        spongebob1: "./assets/spongebob1.jpg",
        spongebob2: "./assets/spongebob2.jpeg",
        spongebob3: "./assets/spongebob3.jpg",
    }
    var canvasBackground = document.getElementById('background');
    animateBackground(canvasBackground);
    loadImages(sprites, function (imgs) {
        var canvas = document.getElementById('canvas');
        var game = new Game(imgs, canvas, rows, columns);
        game.animateRandomly();
        startTimer(10);
    });
}

function draw() {
    for (var i = 0; i < nbDrops; i++) {
        contextBackground.drawImage(fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y, 5, 5); //The rain drop

        fallingDrops[i].y += fallingDrops[i].speed; //Set the falling speed
        if (fallingDrops[i].y > screen.availHeight) {  //Repeat the raindrop when it falls out of view
            fallingDrops[i].y = -25 //Account for the image size
            fallingDrops[i].x = Math.random() * screen.availWidth;    //Make it appear randomly along the width    
        }

    }
}

/**
 * 
 */
function animateBackground(canvas) {
    if (canvas.getContext) {
        contextBackground = canvas.getContext('2d');
        setInterval(draw, 36);
        for (var i = 0; i < nbDrops; i++) {
            var fallingDr = new Object();
            fallingDr["image"] = new Image();
            fallingDr.image.src = "./assets/spongebob1.jpg";

            fallingDr["x"] = Math.random() * 600;
            fallingDr["y"] = Math.random() * 5;
            fallingDr["speed"] = 3 + Math.random() * 5;
            fallingDrops.push(fallingDr);
        }

    }

    setInterval(function () {
        $('#animate').css("background-color", "yellow");
        setTimeout(function () {
            $('#animate').css("background-color", "red");
        }, 100);
    }, 200);
}

function startTimer(duration) {
    var timer = duration, minutes, seconds;
    var t = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        vue.timer = minutes + ":" + seconds;
        if (--timer < 0 || vue.ended) {
            clearInterval(t);
            // I will never end
            startTimer(duration);
        }
    }, 1000);
}
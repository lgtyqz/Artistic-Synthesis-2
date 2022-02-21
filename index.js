// Yeah we making canvas things lol


let canvas = document.createElement("canvas");

canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");

let activePoints = [];
let mouseDown = false;
const FRICTION = 0.95;

let startingHue = 220;
let lifespan = 180;
let startingLightness = 50;
let startingXMag = 5;
let startingYMag = 5;
let startingSize = 5;

class Point {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = {
            hue: startingHue,
            saturation: 80,
            lightness: startingLightness,
            alpha: 0.5
        }
    }

    draw(){
        ctx.fillStyle = `hsla(${this.color.hue}, ${this.color.saturation}%, ${this.color.lightness}%, ${this.color.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        this.color.hue = (this.color.hue + 1) % 360;
    }
}

class Particle {
    constructor(x, y, r, xVel, yVel) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = {
            hue: startingHue,
            saturation: 80,
            lightness: startingLightness,
            alpha: 0.5
        }
        this.xVel = xVel;
        this.yVel = yVel;
        this.lifespan = lifespan;
    }

    draw(){
        ctx.fillStyle = `hsla(${this.color.hue}, ${this.color.saturation}%, ${this.color.lightness}%, ${this.color.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.radius, -Math.PI, 2 * Math.PI);
        ctx.fill();
        this.x += this.xVel;
        this.y += this.yVel;
        this.xVel *= FRICTION;
        this.yVel *= FRICTION;
        this.color.hue = (this.color.hue + 1) % 360;
        this.lifespan--;
    }
}

let currentColor = {
    hue: 220,
    saturation: 80,
    lightness: 50,
    alpha: 0.5
};

canvas.onmousedown = function(e) { mouseDown = true; }
canvas.onmouseup = function(e) { mouseDown = false; }

canvas.onmousemove = function(e) {
    if(mouseDown){
        // activePoints.push(new Point(e.offsetX, e.offsetY, 5));
        for (let i = 0; i < 4; i++){
            activePoints.push(new Particle(e.offsetX, e.offsetY, startingSize,
                Math.random() * startingXMag - 0.5 * startingXMag,
                Math.random() * startingYMag - 0.5 * startingYMag));
        }
    }
}

function draw() {
    for(let i in activePoints) {
        activePoints[i].draw();
        if(activePoints[i].lifespan <= 0){
            activePoints.splice(i, 1);
        }
    }
    requestAnimationFrame(draw);
    // console.log("g");
}

function changeHue(event){
    startingHue = this.value;
}

function changeLifespan(event){
    lifespan = this.value;
}

function changeLightness(event){
    startingLightness = this.value;
}

function changeXMag(event){
    startingXMag = this.value;
}

function changeYMag(event){
    startingYMag = this.value;
}

function changeSize(event){
    startingSize = this.value;
}

window.onload = function(){
    let canvasHolder = document.getElementById("art-wrapper");
    canvasHolder.appendChild(canvas);
    requestAnimationFrame(draw);
    // draw();

    document.getElementById("hue-slider").addEventListener("input", changeHue);
    document.getElementById("lifespan-slider").addEventListener("input", changeLifespan);
    document.getElementById("lightness-slider").addEventListener("input", changeLightness);
    document.getElementById("xmag-slider").addEventListener("input", changeXMag);
    document.getElementById("ymag-slider").addEventListener("input", changeYMag);
    document.getElementById("size-slider").addEventListener("input", changeSize);
}
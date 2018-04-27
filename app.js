let bubble = [];            //array to save new bubbles

function setUp() {          // generates new bubbles
    for (let i = 0; i < 120; i++) {
        let x = Math.floor(Math.random() * (2000 - 50 + 1) + 50);
        let y = Math.floor(Math.random() * (1000 - 50 + 1) + 50);
        let r = Math.floor(Math.random() * (50 - 5 + 1) + 5);
        let color = getRandomColor();
        bubble[i] = new Bubbles(x, y, r, color);
    }
}

function getRandomColor() {     //random bubble color generator
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function draw(c) {              //draws and moves bubble
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 2000, 1000);
    for (let i = 0; i < bubble.length; i++) {
        bubble[i].show(ctx);
        bubble[i].move();
    }
}

class Bubbles {
    constructor(x, y, r, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
    }

    move() {
        this.y = this.y - Math.random();
        if (this.y < 0 || this.x < 0) {
            this.y = Math.floor(Math.random() * (1000 - 999 + 1) + 999);
            this.x = Math.random() * 2000;
        } else if (this.y > 1000 || this.x > 2000) {
            this.y = Math.floor(Math.random() * (1000 - 999 + 1) + 999);
            this.x = Math.random() * 2000;
        }
    }

    show(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.c;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.fill();
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        let smallx = this.x + this.r * Math.cos(-45 * Math.PI / 180) * 0.5;
        let smally = this.y + this.r * Math.sin(-45 * Math.PI / 180) * 0.5;
        ctx.arc(smallx, smally, this.r / 7, 0, 2 * Math.PI);
        ctx.fillStyle = "#eff0f2";
        ctx.fill();

    }
}

$(document).ready(function () {
    let c = document.getElementById("myCanvas");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    setUp();
    setInterval(function () {
        draw(c)
    }, 10);
});
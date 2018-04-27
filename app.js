let bubble = [];            //array to save new bubbles

function setUp(c) {        // generates new bubbles
    let m;
    let size;
    if (c.width < 700) {
        m = 30;
        size = 30;
    } else {
        m = 100;
        size = 50;
    }
    for (let i = 0; i < m; i++) {
        let x = Math.floor(Math.random() * c.width);
        let y = Math.floor(Math.random() * (c.height - 50 + 1) + 50);
        let r = Math.floor(Math.random() * (size - 5 + 1) + 5);
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
    ctx.clearRect(0, 0, c.width, c.height);
    for (let i = 0; i < bubble.length; i++) {
        bubble[i].show(ctx);
        bubble[i].move(c);
    }
}

class Bubbles {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }

    move(c) {
        this.y = this.y - Math.random();
        if (this.y < 0 || this.x < 0) {
            this.y = Math.floor(Math.random() * (c.height - (c.height - 1) + 1) + (c.height - 1));
            this.x = Math.random() * c.width;
        } else if (this.y > c.height || this.x > c.width) {
            this.y = Math.floor(Math.random() * (c.height - (c.height - 1) + 1) + (c.height - 1));
            this.x = Math.random() * c.width;
        }
    }

    show(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.fill();
        ctx.globalAlpha = 0.6;
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
    setUp(c);
    setInterval(function () {
        draw(c)
    }, 10);
});

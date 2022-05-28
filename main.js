const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const townImage = new Image();
townImage.src = "./img/Pellet Town.png";

const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

const offset = {
    x: -450,
    y: -250,
};

class Sprite {
    constructor({ position, image }) {
        this.position = position;
        this.image = image;
    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: townImage,
});

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    context.drawImage(
        playerDownImage,
        0,
        0,
        playerDownImage.width / 4,
        playerDownImage.height,
        canvas.width / 2 - playerDownImage.width / 4 / 2,
        canvas.height / 2 - playerDownImage.height / 2,
        playerDownImage.width / 4,
        playerDownImage.height
    );

    if (keys.w.pressed && lastKey === "w") background.position.y += 3;
    else if (keys.a.pressed && lastKey === "a") background.position.x += 3;
    else if (keys.s.pressed && lastKey === "s") background.position.y -= 3;
    else if (keys.d.pressed && lastKey === "d") background.position.x -= 3;
}

animate();

let lastKey = "";
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "w":
            keys.w.pressed = true;
            lastKey = "w";
            break;
        case "a":
            keys.a.pressed = true;
            lastKey = "a";
            break;
        case "s":
            keys.s.pressed = true;
            lastKey = "s";
            break;
        case "d":
            keys.d.pressed = true;
            lastKey = "d";
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
    }
});

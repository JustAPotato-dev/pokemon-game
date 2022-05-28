const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const townImage = new Image();
townImage.src = "./img/Pellet Town.png";

const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

townImage.onload = () => {
    context.drawImage(townImage, -450, -250);
    playerDownImage.onload = () => {
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
    };
};

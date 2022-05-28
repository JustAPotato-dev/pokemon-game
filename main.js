const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const townImage = new Image();
townImage.src = "./img/Pellet Town.png";

townImage.onload = () => {
    context.drawImage(townImage, -450, -250);
};

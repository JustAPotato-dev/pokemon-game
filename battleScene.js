const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./img/battleBackground.png";
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    image: battleBackgroundImage,
});

const draggle = new Monster(monsters.Draggle);
const emby = new Monster(monsters.Emby);

const renderedSprites = [draggle, emby];

emby.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.querySelector("#attacksBox").append(button);
});

function animateBattle() {
    window.requestAnimationFrame(animateBattle);
    battleBackground.draw();

    renderedSprites.forEach((sprite) => {
        sprite.draw();
    });
}

// animate();
animateBattle();

const queue = [];

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (event) => {
        const selectedAttack = attacks[event.currentTarget.innerHTML];
        emby.attack({
            attack: selectedAttack,
            recipient: draggle,
            renderedSprites,
        });

        queue.push(() => {
            draggle.attack({
                attack: attacks.Tackle,
                recipient: emby,
                renderedSprites,
            });
        });
    });
});

document.querySelector("#dialogueBox").addEventListener("click", (event) => {
    console.log(queue);
    if (queue.length > 0) {
        queue[0]();
        queue.shift();
    } else event.currentTarget.style.display = "none";
    console.log("clicked dialogue");
});

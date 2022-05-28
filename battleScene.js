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

        if (draggle.health <= 0) {
            queue.push(() => {
                draggle.faint();
            });

            return;
        }
        // draggle or enemy attacks right here
        const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)];

        queue.push(() => {
            draggle.attack({
                attack: randomAttack,
                recipient: emby,
                renderedSprites,
            });

            if (emby.health <= 0) {
                queue.push(() => {
                    emby.faint();
                });
            }
        });
    });

    button.addEventListener("mouseenter", (event) => {
        const selectedAttack = attacks[event.currentTarget.innerHTML];
        document.querySelector("#attackType").innerHTML = selectedAttack.type;
        document.querySelector("#attackType").style.color = selectedAttack.color;
    });
});

document.querySelector("#dialogueBox").addEventListener("click", (event) => {
    if (queue.length > 0) {
        queue[0]();
        queue.shift();
    } else event.currentTarget.style.display = "none";
});

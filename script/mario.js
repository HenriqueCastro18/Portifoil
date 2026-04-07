const mario = document.getElementById('mario-sim');
const obstacle = document.getElementById('obstacle-sim');
const jumpBtn = document.getElementById('jump-trigger');
const valVel = document.getElementById('val-vel');
const valHit = document.getElementById('val-hit');

let isJumping = false;
let score = 0;
let gameSpeed = 5;

function jump() {
    if (isJumping) return;
    
    isJumping = true;
    mario.style.bottom = '120px';
    valVel.innerText = "450";

    setTimeout(() => {
        mario.style.bottom = '20px';
        valVel.innerText = "0";
        setTimeout(() => { isJumping = false; }, 300);
    }, 500);
}

function gameLoop() {
    let obstaclePos = obstacle.offsetLeft;
    let marioPos = parseInt(window.getComputedStyle(mario).bottom);

    if (obstaclePos < -50) {
        obstacle.style.right = '-50px';
        obstacle.style.left = 'auto';
        gameSpeed = 5 + (score / 1000);
    } else {
        obstacle.style.left = (obstacle.offsetLeft - gameSpeed) + "px";
    }

    if (obstaclePos <= 100 && obstaclePos > 50 && marioPos < 60) {
        valHit.innerText = "COLLISION";
        valHit.className = "text-red";
        obstacle.style.background = "#ff0055";
    } else {
        valHit.innerText = "SAFE";
        valHit.className = "text-green";
        obstacle.style.background = "#fbd000";
    }

    score++;
    requestAnimationFrame(gameLoop);
}

jumpBtn.addEventListener('click', jump);
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') jump();
});

gameLoop();
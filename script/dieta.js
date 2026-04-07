const valLevel = document.getElementById('val-level');
const valStreak = document.getElementById('val-streak');
const valPet = document.getElementById('val-pet');
const valXpText = document.getElementById('val-xp-text');
const xpBar = document.getElementById('xp-bar');
const userTitle = document.getElementById('user-title');
const btnWorkout = document.getElementById('btn-workout');

let currentLevel = 1;
let currentXp = 0;
let currentStreak = 0;
const xpPerLevel = 2000;

const rewards = [
    { level: 10, title: "Operador Core", pet: "🦆 Pato (Ducky)" },
    { level: 20, title: "Veterano Fit", pet: "🐈 Gato (Walk)" },
    { level: 30, title: "Mestre do Santuário", pet: "🐦 Corvo (Crow)" }
];

function updateUI() {
    valLevel.innerText = currentLevel;
    valStreak.innerText = currentStreak;
    valXpText.innerText = `${currentXp} / ${xpPerLevel} XP`;
    
    let progress = (currentXp / xpPerLevel) * 100;
    xpBar.style.width = `${progress}%`;

    let activePet = "Nenhum";
    let activeTitle = "Iniciante Core";

    rewards.forEach(reward => {
        if (currentLevel >= reward.level) {
            activePet = reward.pet;
            activeTitle = reward.title;
        }
    });

    valPet.innerText = activePet;
    userTitle.innerText = activeTitle;

    if(progress >= 100) {
        xpBar.style.background = "linear-gradient(90deg, #10b981, #34d399)";
    } else {
        xpBar.style.background = "linear-gradient(90deg, var(--orange-primary), #ff9100)";
    }
}

function processWorkout() {
    btnWorkout.disabled = true;
    btnWorkout.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';

    setTimeout(() => {
        currentStreak++;
        let baseXP = 500;
        let streakBonus = currentStreak * 300;
        if (streakBonus > 1500) {
            streakBonus = 1500;
        }

        let totalGainedXP = baseXP + streakBonus;
        currentXp += totalGainedXP;

        while (currentXp >= xpPerLevel) {
            currentLevel++;
            currentXp -= xpPerLevel;
        }

        updateUI();
        btnWorkout.disabled = false;
        btnWorkout.innerHTML = '<i class="fas fa-dumbbell"></i> Concluir Treino de Hoje';

        showXpPopup(totalGainedXP);

    }, 600);
}

function showXpPopup(amount) {
    const popup = document.createElement('div');
    popup.innerText = `+ ${amount} XP`;
    popup.style.position = 'absolute';
    popup.style.color = '#ff6b00';
    popup.style.fontWeight = '900';
    popup.style.fontSize = '1.5rem';
    popup.style.animation = 'floatUp 1s ease-out forwards';
    popup.style.pointerEvents = 'none';

    const rect = btnWorkout.getBoundingClientRect();
    popup.style.left = `${rect.left + (rect.width/2) - 20}px`;
    popup.style.top = `${rect.top - 20}px`;

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

const style = document.createElement('style');
style.innerHTML = `
    @keyframes floatUp {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-50px) scale(1.5); }
    }
`;
document.head.appendChild(style);

btnWorkout.addEventListener('click', processWorkout);

updateUI();
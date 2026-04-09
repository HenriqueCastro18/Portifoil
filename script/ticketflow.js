const simulateBtn = document.getElementById('simulate-btn');
const queueTrack = document.getElementById('request-queue');
const dbStatus = document.getElementById('db-status');
const logs = document.getElementById('logs');

const addLog = (text) => {
    logs.innerHTML += `<div>> ${text}</div>`;
    logs.scrollTop = logs.scrollHeight;
};

async function startSimulation() {
    simulateBtn.disabled = true;
    logs.innerHTML = "> Starting Stress Test...";

    for(let i = 1; i <= 5; i++) {
        const packet = document.createElement('div');
        packet.className = 'request-packet';
        packet.innerText = `REQ_${i}`;
        queueTrack.appendChild(packet);
        addLog(`Request REQ_${i} entering queue...`);
        await new Promise(r => setTimeout(r, 200));
    }

    addLog("DATABASE_LOCK: Initiating ACID Transaction...");
    
    const packets = document.querySelectorAll('.request-packet');
    for (const p of packets) {
        dbStatus.innerText = "PROCESSING...";
        dbStatus.style.color = "#ff8800";
        p.style.boxShadow = "0 0 15px #00d1ff";
        
        addLog(`Isolating ${p.innerText}... processing transaction.`);
        await new Promise(r => setTimeout(r, 800));
        
        p.style.opacity = "0";
        addLog(`Transaction SUCCESS: ${p.innerText} finalized.`);
        
        await new Promise(r => setTimeout(r, 300));
        p.remove();
    }

    dbStatus.innerText = "IDLE";
    dbStatus.style.color = "#00d1ff";
    addLog("STRESS_TEST_COMPLETE: Zero race conditions detected.");
    simulateBtn.disabled = false;
}

simulateBtn.addEventListener('click', startSimulation);
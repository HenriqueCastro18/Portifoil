const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

document.querySelectorAll(".cipher-hover").forEach(element => {
    element.addEventListener("mouseover", event => {
        let iterations = 0;
        const target = event.target;
        const originalText = target.dataset.value;

        clearInterval(target.interval);

        target.interval = setInterval(() => {
            target.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if(index < iterations) { return originalText[index]; }
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");

            if(iterations >= originalText.length) { clearInterval(target.interval); }
            iterations += 1 / 3;
        }, 30);
    });
});

const terminalOutput = document.getElementById('terminal-output');

function addLog(message, styleClass = "") {
    const p = document.createElement('p');
    p.innerHTML = `<span class="prompt">></span> <span class="${styleClass}">${message}</span>`;
    terminalOutput.appendChild(p);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function runSimulation(type) {
    if (type === 'bruteforce') {
        addLog("Detectando múltiplas tentativas de login de IP: 192.168.1.45...");
        setTimeout(() => addLog("Aviso: Falha na tentativa 1/3", "text-red"), 500);
        setTimeout(() => addLog("Aviso: Falha na tentativa 2/3", "text-red"), 1000);
        setTimeout(() => addLog("Aviso: Falha na tentativa 3/3", "text-red"), 1500);
        setTimeout(() => addLog("[SECURITY LOCKOUT] Acionado Rate Limiting. IP Bloqueado por 5 minutos.", "text-green"), 2000);
    } 
    else if (type === '2fa') {
        addLog("Autenticação primária (BCrypt) efetuada com sucesso.");
        setTimeout(() => addLog("Isolando utilizador na zona de Pré-Autenticação..."), 800);
        setTimeout(() => addLog("Gerando Token Criptográfico OTP...", "text-blue"), 1500);
        setTimeout(() => addLog("E-mail disparado via API segura. Aguardando input do utilizador (Timeout: 120s).", "text-green"), 2200);
    }
    else if (type === 'sql') {
        addLog("Payload recebido: ' OR 1=1; DROP TABLE users;--");
        setTimeout(() => addLog("Analisando inputs via Middleware de Validação...", "text-blue"), 600);
        setTimeout(() => addLog("Padrão malicioso detectado! Sanitização aplicada via Django ORM paramétrico.", "text-red"), 1400);
        setTimeout(() => addLog("[BLOCKED] Requisição CSRF/SQLi descartada. Acesso Negado.", "text-green"), 2000);
    }
}
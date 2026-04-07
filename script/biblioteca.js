const btnAdd = document.getElementById('btn-add');
const btnUndo = document.getElementById('btn-undo');
const valRecords = document.getElementById('val-records');
const valStack = document.getElementById('val-stack');
const dbRecords = document.getElementById('db-records');
const dbLog = document.getElementById('db-log');

let database = [];
let commandStack = [];

const bookMocks = [
    "Clean Code - Uncle Bob",
    "Design Patterns - GoF",
    "C# in Depth - Jon Skeet",
    "Domain-Driven Design",
    "Refactoring - M. Fowler"
];

function updateUI() {

    valRecords.innerText = database.length;
    valStack.innerText = commandStack.length;

    btnUndo.disabled = commandStack.length === 0;

    dbRecords.innerHTML = '';
    database.forEach(item => {
        const row = document.createElement('div');
        row.className = 'db-record-row';
        row.innerHTML = `
            <span>#${item.id}</span>
            <span style="color: #fff;">${item.title}</span>
            <span style="color: #10b981;">[OK]</span>
        `;
        dbRecords.appendChild(row);
    });

    dbRecords.scrollTop = dbRecords.scrollHeight;
}

function addLog(msg, type) {
    const p = document.createElement('p');
    p.innerText = `> ${msg}`;
    if (type === 'cmd') p.className = 'cmd-text';
    if (type === 'undo') p.className = 'undo-text';
    
    dbLog.appendChild(p);
    dbLog.scrollTop = dbLog.scrollHeight;
}

btnAdd.addEventListener('click', () => {
    const randomBook = bookMocks[Math.floor(Math.random() * bookMocks.length)];
    const generateId = Math.floor(Math.random() * 9000) + 1000;

    const actionCommand = {
        action: 'ADD',
        id: generateId,
        title: randomBook
    };

    database.push(actionCommand);
    commandStack.push(actionCommand);

    addLog(`EXEC: INSERT INTO Books ('${randomBook}')`, 'cmd');
    updateUI();
});

btnUndo.addEventListener('click', () => {
    if (commandStack.length === 0) return;

    const lastCommand = commandStack.pop();

    database = database.filter(book => book.id !== lastCommand.id);

    addLog(`UNDO: DELETE FROM Books WHERE id=${lastCommand.id}`, 'undo');
    updateUI();
});
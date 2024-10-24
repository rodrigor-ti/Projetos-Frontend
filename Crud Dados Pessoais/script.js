document.getElementById('personalForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    if (name === '' || email === '' || age === '') {
        alert('Por favor, preencha todos os campos');
        return;
    }

    addUserToTable(name, email, age);
    clearForm();
});

function addUserToTable(name, email, age) {
    const tableBody = document.querySelector('#usersTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${age}</td>
        <td>
            <button class="edit" onclick="editUser(this)">Editar</button>
            <button class="delete" onclick="deleteUser(this)">Deletar</button>
        </td>
    `;

    tableBody.appendChild(row);
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('age').value = '';
}

function deleteUser(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

function editUser(button) {
    const row = button.parentElement.parentElement;
    const name = row.children[0].textContent;
    const email = row.children[1].textContent;
    const age = row.children[2].textContent;

    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('age').value = age;

    row.remove();
}

document.getElementById('downloadPDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Relatório de Dados Pessoais', 14, 22);

    doc.setFontSize(12);
    doc.text('Nome', 14, 32);
    doc.text('Email', 64, 32);
    doc.text('Idade', 144, 32);

    const tableBody = document.querySelectorAll('#usersTable tbody tr');
    let yOffset = 42; // Posição inicial no eixo Y

    tableBody.forEach(function(row) {
        const name = row.children[0].textContent;
        const email = row.children[1].textContent;
        const age = row.children[2].textContent;

        doc.text(name, 14, yOffset);
        doc.text(email, 64, yOffset);
        doc.text(age, 144, yOffset);

        yOffset += 10; // Incrementa a posição Y para a próxima linha
    });

    // Baixar o PDF
    doc.save('relatorio-dados-pessoais.pdf');
});

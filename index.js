document.addEventListener('DOMContentLoaded', function () {
    const GIST_ID = '5b9d875032016dfafcc54eb8c5b16dad';  // Replace with your Gist ID
    const GIST_URL = `https://gist.github.com/wildkangaroo/5b9d875032016dfafcc54eb8c5b16dad`;
    let passwordTable = document.getElementById('passwordTable').getElementsByTagName('tbody')[0];
    let addButton = document.getElementById('addButton');
    let saveButton = document.getElementById('saveButton');
    let cancelButton = document.getElementById('cancelButton');
    let formContainer = document.getElementById('formContainer');
    let websiteInput = document.getElementById('website');
    let usernameInput = document.getElementById('username');
    let passwordInput = document.getElementById('password');
    let currentData = [];

    function fetchData() {
        fetch(GIST_URL)
            .then(response => response.json())
            .then(data => {
                currentData = JSON.parse(data.files['data.json'].content);
                renderTable();
            });
    }

    function saveData() {
        const token = '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';  // Replace with your GitHub Personal Access Token
        fetch(GIST_URL, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                files: {
                    'data.json': {
                        content: JSON.stringify(currentData, null, 2)
                    }
                }
            })
        }).then(response => response.json())
          .then(data => {
              alert('Data saved successfully!');
              fetchData();
          });
    }

    function renderTable() {
        passwordTable.innerHTML = '';
        currentData.forEach((entry, index) => {
            let row = passwordTable.insertRow();
            row.insertCell(0).innerText = entry.website;
            row.insertCell(1).innerText = entry.username;
            row.insertCell(2).innerText = entry.password;
            let actions = row.insertCell(3);
            let editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.onclick = () => handleEditClick(index);
            actions.appendChild(editButton);
            let deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => handleDeleteClick(index);
            actions.appendChild(deleteButton);
        });
    }

    function handleAddClick() {
        formContainer.classList.remove('hidden');
        websiteInput.value = '';
        usernameInput.value = '';
        passwordInput.value = '';
        saveButton.onclick = handleSaveClick;
    }

    function handleEditClick(index) {
        formContainer.classList.remove('hidden');
        websiteInput.value = currentData[index].website;
        usernameInput.value = currentData[index].username;
        passwordInput.value = currentData[index].password;
        saveButton.onclick = () => handleSaveClick(index);
    }

    function handleDeleteClick(index) {
        currentData.splice(index, 1);
        saveData();
    }

    function handleSaveClick(index) {
        let entry = {
            website: websiteInput.value,
            username: usernameInput.value,
            password: passwordInput.value
        };
        if (index >= 0) {
            currentData[index] = entry;
        } else {
            currentData.push(entry);
        }
        saveData();
        formContainer.classList.add('hidden');
    }

    cancelButton.onclick = () => formContainer.classList.add('hidden');
    addButton.onclick = handleAddClick;
    fetchData();
});

document.addEventListener('DOMContentLoaded', function () {
    const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1XbsKGQ2f5t34n4K6yoxQWjUc25dqzuGmxVt_0Hq94fc/edit?usp=sharing';
    const spreadsheetId = '1XbsKGQ2f5t34n4K6yoxQWjUc25dqzuGmxVt_0Hq94fc';
    const apiKey = 'YOUR_GOOGLE_API_KEY'; // You need to replace this with your actual API key

    // Initialize Tabletop
    Tabletop.init({
        key: SPREADSHEET_URL,
        simpleSheet: true,
        callback: function (data) {
            loadTable(data);
        }
    });

    // Function to load the table
    function loadTable(data) {
        const tbody = document.querySelector('#passwordTable tbody');
        tbody.innerHTML = ''; // Clear existing data

        data.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.Website}</td>
                <td>${entry.Username}</td>
                <td>${entry.Password}</td>
                <td>
                    <button class="editButton" data-index="${index}">Edit</button>
                    <button class="deleteButton" data-index="${index}">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.editButton').forEach(button => {
            button.addEventListener('click', editEntry);
        });
        document.querySelectorAll('.deleteButton').forEach(button => {
            button.addEventListener('click', deleteEntry);
        });
    }

    // Function to handle adding new entry
    document.getElementById('addButton').addEventListener('click', function () {
        document.getElementById('formContainer').classList.remove('hidden');
    });

    // Function to handle saving an entry
    document.getElementById('saveButton').addEventListener('click', function () {
        const website = document.getElementById('website').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Save the data to Google Sheets
        // For simplicity, here we'll just log the data. You need to send a request to your backend to update Google Sheets
        console.log('Save', { website, username, password });

        // Hide the form and clear fields
        document.getElementById('formContainer').classList.add('hidden');
        document.getElementById('website').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        // Reload the table (re-fetch the data)
        Tabletop.init({
            key: SPREADSHEET_URL,
            simpleSheet: true,
            callback: function (data) {
                loadTable(data);
            }
        });
    });

    // Function to handle cancel button
    document.getElementById('cancelButton').addEventListener('click', function () {
        document.getElementById('formContainer').classList.add('hidden');
    });

    // Function to handle editing an entry
    function editEntry(event) {
        const index = event.target.getAttribute('data-index');
        // Load the entry data into the form (For simplicity, here we'll just log the index)
        console.log('Edit', index);
    }

    // Function to handle deleting an entry
    function deleteEntry(event) {
        const index = event.target.getAttribute('data-index');
        // Delete the entry from Google Sheets (For simplicity, here we'll just log the index)
        console.log('Delete', index);
    }
});

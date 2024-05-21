document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.getElementById('createUserForm');
    const userList = document.getElementById('userList');

    // Function to fetch and display users
    function fetchUsers() {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                userList.innerHTML = '';
                users.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = `${user.name} (${user.email})`;
                    userList.appendChild(li);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => deleteUser(user.id));
                    li.appendChild(deleteButton);

                    const updateButton = document.createElement('button');
                    updateButton.textContent = 'Update';
                    updateButton.addEventListener('click', () => updateUser(user.id, user.name, user.email));
                    li.appendChild(updateButton);
                });
            });
    }

    // Function to create a new user
    createUserForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(createUserForm);
        const name = formData.get('name');
        const email = formData.get('email');

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.json())
        .then(() => {
            createUserForm.reset();
            fetchUsers();
        });
    });

    // Function to delete a user
    function deleteUser(id) {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
        .then(() => fetchUsers());
    }

    // Function to update a user
    function updateUser(id, currentName, currentEmail) {
        const name = prompt('Enter new name:', currentName);
        const email = prompt('Enter new email:', currentEmail);

        if (name && email) {
            fetch(`http://localhost:3000/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            })
            .then(() => fetchUsers());
        }
    }

    // Initial fetch of users
    fetchUsers();
});

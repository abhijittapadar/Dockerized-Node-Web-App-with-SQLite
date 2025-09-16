document.addEventListener('DOMContentLoaded', function() {
    const addUserForm = document.getElementById('addUserForm');
    const usersContainer = document.getElementById('usersContainer');
    
    // Load users on page load
    loadUsers();
    
    // Handle form submission
    addUserForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addUserForm.reset();
                loadUsers();
            } else {
                alert('Error adding user: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding user');
        });
    });
    
    // Load all users
    function loadUsers() {
        usersContainer.innerHTML = '<p class="loading">Loading users...</p>';
        
        fetch('/users')
            .then(response => response.json())
            .then(users => {
                if (users.length === 0) {
                    usersContainer.innerHTML = '<p>No users found. Add some users above!</p>';
                    return;
                }
                
                usersContainer.innerHTML = '';
                users.forEach(user => {
                    const userElement = document.createElement('div');
                    userElement.className = 'user-card';
                    userElement.innerHTML = `
                        <div class="user-info">
                            <strong>${user.name}</strong> - ${user.email}
                        </div>
                        <div class="user-actions">
                            <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
                        </div>
                    `;
                    usersContainer.appendChild(userElement);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                usersContainer.innerHTML = '<p>Error loading users</p>';
            });
    }
    
    // Expose deleteUser to global scope for onclick attribute
    window.deleteUser = function(id) {
        if (confirm('Are you sure you want to delete this user?')) {
            fetch(`/users/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadUsers();
                } else {
                    alert('Error deleting user: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error deleting user');
            });
        }
    };
});
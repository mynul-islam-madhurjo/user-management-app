const userManager = new UserManager();

const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Function to render all users
const renderUsers = () => {
    const { users } = userManager;
    userList.innerHTML = users.map(user => userManager.generateUserCard(user)).join('');
};

// Event handler for form submission using arrow function
userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Destructuring form elements
    const { name, email, role } = e.target.elements;

    userManager.addUser(name.value, email.value, role.value);

    e.target.reset();
    renderUsers();
});

// Edit user function - demonstrates 'call'
function editUser(userId) {
    const user = userManager.getUserById(userId);
    if (!user) return;

    const newName = prompt(`Edit name for ${user.name}:`, user.name);
    const newEmail = prompt(`Edit email for ${user.name}:`, user.email);
    const newRole = prompt(`Edit role for ${user.name}:`, user.role);

    if (newName && newEmail && newRole) {
        userManager.updateUser({
            id: userId,
            name: newName,
            email: newEmail,
            role: newRole
        });
        renderUsers();
    }
}

// Delete user function
function deleteUser(userId) {
    const user = userManager.getUserById(userId);
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        userManager.deleteUser(userId);
        renderUsers();
    }
}

// Example of using bind
window.addEventListener('load', () => {
    const users = userManager.users;
    users.forEach(user => {
        // Using bind to create a bound function for each user
        const formatGreeting = userManager.formatUserDetails.bind(user);
        console.log(formatGreeting('Welcome back'));
    });
    renderUsers();
});
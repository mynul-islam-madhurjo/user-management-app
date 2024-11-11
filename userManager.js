class UserManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentId = this.users.length > 0
            ? Math.max(...this.users.map(user => user.id)) + 1
            : 1;
    }

    // Method to add a new user using arrow function and template literals
    addUser = (name, email, role) => {
        const newUser = {
            id: this.currentId++,
            name,  // ES6 shorthand property
            email,
            role,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveToLocalStorage();
        return newUser;
    }

    // Delete user method
    deleteUser(id) {
        this.users = this.users.filter(user => user.id !== id);
        this.saveToLocalStorage();
    }

    // Update user method using object destructuring
    updateUser({ id, name, email, role }) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            // Using spread operator to merge objects
            this.users[index] = {
                ...this.users[index],
                name,
                email,
                role,
                updatedAt: new Date().toISOString()
            };
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    // Save to localStorage
    saveToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Get user by ID using arrow function
    getUserById = (id) => this.users.find(user => user.id === id);

    // Generate user card HTML using template literals
    generateUserCard(user) {
        return `
            <div class="user-card" data-id="${user.id}">
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Role:</strong> ${user.role}</p>
                <p><strong>Created:</strong> ${new Date(user.createdAt).toLocaleDateString()}</p>
                ${user.updatedAt ?
            `<p><strong>Updated:</strong> ${new Date(user.updatedAt).toLocaleDateString()}</p>`
            : ''}
                <div class="user-actions">
                    <button class="edit-btn" onclick="editUser.call(this, ${user.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteUser.apply(this, [${user.id}])">Delete</button>
                </div>
            </div>
        `;
    }

    // Method to format user details using bind
    formatUserDetails = function(greeting) {
        return `${greeting}, ${this.name} (${this.role})`;
    }
}
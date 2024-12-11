class UsersStorage {
    constructor() {
        this.storage = {};
        this.id = 0;
    }

    addUser({firstName, lastName, age, email, bio}) {
        const id = this.id;
        this.storage[id] = {id, firstName, lastName, age, email, bio};
        this.id++;
    }

    getUsers() {
        return Object.values(this.storage);
    }

    getAllUsers(id) {
        return this.storage[id];
    }

    updateUser(id, {firstName, lastName, age, email, bio}) {
        this.storage[id] = {id, firstName, lastName, age, email, bio};
    }

    deleteUser(id) {
        delete this.storage[id];
    }
}

const userStorage = new UsersStorage();

export default userStorage;
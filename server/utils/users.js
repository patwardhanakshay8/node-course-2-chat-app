class Users {
    constructor () {
        this.users = [];
    }

    addUser (id,name,room) {
        
        var user = {
            id : id,
            name : name,
            room : room
        };

        this.users.push(user);

        return user;
    }

    getUserList(room) {
        return this.users.filter((user) =>  user.room === room ).map(( user ) => user.name );
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    removeUser(id) {
        var user = this.getUser(id);
        if ( user ) {
            this.users = this.users.filter((user) => user.id !==id );
        }
        return user;
    }
}


module.exports = { Users };
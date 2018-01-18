const expect = require('expect');

const { Users } =  require('./users');

describe('users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id : '1',
                name : 'Mike',
                room : 'A'
            },
            {
                id : '2',
                name : 'Mikey',
                room : 'B'
            },
            {
                id : '3',
                name : 'Nike',
                room : 'B'
            },
            
        ]
    });

    it('should add new user', () => {
        var users = new Users();
        var id = '#123';
        var name = 'Akshay';
        var room = 'test';
        var localUser = {id,name,room};
        var user = users.addUser(id,name,room);
        
        expect(typeof user).toBe("object");
        expect(user).toEqual(localUser);
        expect(users.users).toEqual([localUser]);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = '193';
        var user = users.removeUser(userId);        
        expect(user).toBe(undefined);
        expect(users.users.length).toBe(3);
    });

    it('should get a user', () => {
        var userId = '1';
        var user = users.getUser(userId);
        expect(user).toEqual(users.users[0]);
    });

    it('should not get a user', () => {
        var userId = '67';
        var user = users.getUser(userId);
        expect(user).toEqual(undefined);
    });

    it('should return users for room B', () => {
        var userList = users.getUserList('B');
        expect(userList).toEqual(['Mikey','Nike']);
    });

    it('should return users for room A', () => {
        var userList = users.getUserList('A');
        expect(userList).toEqual(['Mike']);
    });
})
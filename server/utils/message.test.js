var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from  = 'abc@example.com';
        var text = 'Test';
        var message = generateMessage('abc@example.com','Test');
        expect(typeof message.createdAt).toBe('number');
        expect(message.from === from && message.text === text).toBeTruthy();
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Akshay';
        var longitude = '1234';
        var latitude = '1234';
        var locationURL = `https://www.google.com/maps/?q=${longitude},${latitude}`;

        var locationMessage = generateLocationMessage(from,longitude,latitude);
        expect(typeof locationMessage.createdAt).toBe('number');
        expect(locationMessage.from === from && locationMessage.location_url === locationURL).toBeTruthy();

    });
})
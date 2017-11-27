var expect = require('expect');
var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from  = 'abc@example.com';
        var text = 'Test';
        var message = generateMessage('abc@example.com','Test');
        expect(typeof message.createdAt).toBe('number');
        expect(message.from === from && message.text === text).toBeTruthy();
    });
});
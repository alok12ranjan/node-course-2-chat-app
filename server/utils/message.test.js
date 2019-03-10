var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object ', () => {
        var from = 'Alok';
        var text = 'Some message';
        var message = generateMessage(from, text);
        
        expect(from).toEqual('Alok');
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text });

        // "expect": "^24.3.1", with this lib
        // expect(typeof (message.createdAt)).toBe('number');
        // expect(message).toMatchObject({from, text });
    });
});
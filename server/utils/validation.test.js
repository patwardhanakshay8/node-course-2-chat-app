const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString',() => {
    it('should reject non-string values', () => {
        var number = 1;
        var object = {'name': 'akshay'};
        var isRealStringResForNumber = isRealString(number);
        var isRealStringResForObj = isRealString(object);
        expect( typeof isRealStringResForNumber ).toBe('boolean');
        expect(isRealStringResForNumber == false).toBeTruthy();
        expect( typeof isRealStringResForObj ).toBe('boolean');
        expect(isRealStringResForObj == false).toBeTruthy();
    });
    
    it('should reject string with only spaces', () => {
        var emptyStr = '';
        var isRealStringResForemptyStr = isRealString(emptyStr);
        expect( typeof isRealStringResForemptyStr ).toBe('boolean');
        expect(isRealStringResForemptyStr == false).toBeTruthy();    
    });

    it('should accept string with no spaces', () => {
        var str = 'Node Room';
        var isRealStringResForstr = isRealString(str);
        expect( typeof isRealStringResForstr ).toBe('boolean');
        expect(isRealStringResForstr).toBeTruthy();
    });
    
});


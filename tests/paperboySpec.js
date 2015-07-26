describe('paperboy', function() {
    it('should exist', function() {
        expect(paperboy).toBeDefined();
    });
    it('should be an Object', function() {
        expect(typeof paperboy === 'object').toEqual(true);
    });
    it('should have a property topics', function() {
        expect(paperboy.hasOwnProperty('topics')).toEqual(true);
    });
    describe('subscribe', function() {
        it('should be defined', function() {
            expect(paperboy.subscribe).toBeDefined();
        });
        it('should be a property of paperboy', function() {
            expect(paperboy.hasOwnProperty('subscribe')).toEqual(true);
        });
    });
    describe('unscubscribe', function() {
        it('should be defined', function() {
            expect(paperboy.unsubscribe).toBeDefined(); 
        });
        it('should be a property of paperboy', function(){
            expect(paperboy.hasOwnProperty('unsubscribe')).toEqual(true);
        });
    });
    describe('publish', function() {
        it('should be defined', function() {
            expect(paperboy.publish).toBeDefined();
        });
        it('should be a property of paperboy', function() {
            expect(paperboy.hasOwnProperty('publish')).toEqual(true);
        });
    });
    describe('broadcast', function() {
        it('should be defined', function() {
            expect(paperboy.broadcast).toBeDefined();
        });
        it('should be a property of paperboy', function() {
            expect(paperboy.hasOwnProperty('broadcast')).toEqual(true);
        });
    });
});

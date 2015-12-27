describe('paperboy', function() {
    var mock_topic, mock_publish_data, mock_topic_callback;
    beforeEach(function() {
        mock_topic = 'news';
        mock_publish_data = 'published to this topic';
        mock_topic_callback = function mock_topic_callback(data) {
            console.log(mock_topic + ': ' + data);
        }
    });
    afterEach(function() {
        mock_topic = undefined;
        mock_publish_date = undefined;
        mock_topic_callback = undefined;
    });

    it('should exist', function() {
        expect(paperboy).toBeDefined();
    });
    it('should be an Object', function() {
        expect(typeof paperboy === 'object').toEqual(true);
    });
    it('should have an own property topics', function() {
        expect(paperboy.hasOwnProperty('topics')).toEqual(true);
    });
    describe('subscribe', function() { 
        it('should be defined', function() {
            expect(paperboy.subscribe).toBeDefined();
        });
        it('should be an own property of paperboy', function() {
            expect(paperboy.hasOwnProperty('subscribe')).toEqual(true);
        });
        it('should register a topic and listener to topics', function() {
            paperboy.subscribe(mock_topic, mock_topic_callback);
            expect(paperboy.topics[mock_topic]).toBeDefined();
            expect(paperboy.topics[mock_topic]).toContain(mock_topic_callback);
        });
    });
    describe('publish', function() {
        beforeEach(function() {
             paperboy.subscribe(mock_topic, mock_topic_callback);
        });
        it('should be defined', function() {
            expect(paperboy.publish).toBeDefined();
        });
        it('should be an own property of paperboy', function() {
            expect(paperboy.hasOwnProperty('publish')).toEqual(true);
        });
        it('should notify a topic with new data', function() { 
            //expect(paperboy.publish([mock_topic], mock_publish_data)).toEqual(mock_topic + ': ' + mock_publish_data);
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
    describe('unscubscribe', function() {
        it('should be defined', function() {
            expect(paperboy.unsubscribe).toBeDefined(); 
        });
        it('should be a property of paperboy', function(){
            expect(paperboy.hasOwnProperty('unsubscribe')).toEqual(true);
        });
    });
});

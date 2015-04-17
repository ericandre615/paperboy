(function(name, global, definition) {
    if(typeof module !== 'undefined' && module.exports) {
        module.exports = definition(name, global);
    } else {
        global[name] = definition(name, global);
    }
})('paperboy', this, function(name, global) {
    'use strict';

    var paperboy = {

        topics: {},        

        subscribe: function(topic, listener) {
            // check if the topic exists, if not create one
            if(!this.topics[topic]) {
                this.topics[topic] = [];
            }

            // add the listener
            this.topics[topic].push(listener);
        },
        
        unsubscribe: function(topic, listener) {
            if(this.topics[topic] && this.topics[topic].length > 0) {
                var topicListeners = this.topics[topic];
                this.topics[topic].forEach(function(item, index) {
                    if(item == listener) {
                       topicListeners.splice(index, 1);
                       return;
                    }
                });
            }
            return;
        },

        remove: function(topic) {
            if(this.topics[topic]) {
                delete this.topics[topic];
            }
            return;
        },

        removeAll: function() {
            this.topics = {};
        },
        
        publish: function(topic, data) {
            // if object assume array (only beause isArray does not work in IE < 9
            if(typeof topic === 'object') {
                var noTopic = [];
                for(var i = 0, len = topic.length; i < len; i++) {
                    if(!this.topics[topic[i]]) {
                        noTopic.push(topic[i]);
                    }

                    if(this.topics[topic[i]] && this.topics[topic[i]].length > 0) {
                        // notify all the listeners
                        this.topics[topic[i]].forEach(function(listener){
                            listener(data || {});
                        });
                    }
                }

                if(noTopic.length > 0) {
                    console.log('Topics were not published: ', noTopic);
                }
            } else {
            
                // check if topic exists or has listeners
                if(!this.topics[topic]) {
                    return new Error('this topic does not exist');
                }

                if(this.topics[topic].length < 1) {
                    return new Error('no listeners registered for this topic');
                }

                // notify all the listeners
                this.topics[topic].forEach(function(listener){
                    listener(data || {});
                });
            }
        }
    };

    return paperboy;
});

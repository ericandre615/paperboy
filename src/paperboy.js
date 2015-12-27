;(function(name, global, definition) {
    if(typeof module !== 'undefined' && module.exports) {
        module.exports = definition(name, global);
    } else {
        global[name] = definition(name, global);
    }
})('paperboy', this, function(name, global) {
    'use strict';

    var paperboy = {

        topics: {},        

        subscribe: function subscribe(topic, listener) {
            // check if the topic exists, if not create one
            if(!this.topics[topic]) {
                this.topics[topic] = [];
            }

            // add the listener
            this.topics[topic].push(listener);
        },
        
        unsubscribe: function unsubscribe(topic, listener) {
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

        remove: function remove(topic) {
            if(this.topics[topic]) {
                this.topics[topic] = null;
            }
            return;
        },

        removeAll: function removeAll() {
            this.topics = {};
        },
        
        publish: function publish(topic, data) { 
            var topicType = Object.prototype.toString.call(topic);
            if(topicType === '[object Array]') {
                var noTopic = [];
                // check if topic exists or has listeners
                if(!this.topics[topic]) {
                    throw new ReferenceError('this topic does not exist');
                    return;
                }

                if(!this.topics[topic].length) {
                    throw new ReferenceError('no listeners registered for this topic');
                    return;
                }

                for(var i = 0, len = topic.length; i < len; i++) {
                    if(!this.topics[topic[i]]) {
                        noTopic.push(topic[i]);
                    }

                    if(this.topics[topic[i]] && this.topics[topic[i]].length) {
                        // notify all the listeners
                        this.topics[topic[i]].forEach(function(listener){
                            listener(data || {});
                        });
                    }
                }

                if(noTopic.length) {
                    console.warn('Topics were not published: ', noTopic);
                }
            } else {
                throw new TypeError('Expected first argument to be an Array instead got ', topicType);                
                return;
            }
        },

        broadcast: function broadcast(data) {
            var topicCollection = [];
            for(var topic in this.topics) {
                if(this.topics.hasOwnProperty(topic)) {
                    topicCollection.push(topic);
                }
            };

            for(var i = 0, len = topicCollection.length; i < len; i++) {
                this.topics[topicCollection[i]].forEach(function(listener){
                    listener(data || {});
                });
            }
        }
    };

    return paperboy;
});

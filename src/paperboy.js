'use strict';

const paperboy = {

  topics: {},        

  subscribe(topic, listener) {
      // check if the topic exists, if not create one
      if(!this.topics[topic]) {
          this.topics[topic] = [];
      }

      // add the listener
      this.topics[topic].push(listener);
  },
  
  unsubscribe(topic, listener) {
      if(this.topics[topic] && this.topics[topic].length > 0) {
        let topicListeners = this.topics[topic];
          this.topics[topic].forEach((item, index) => {
              if(item == listener) {
                 topicListeners.splice(index, 1);
                 return;
              }
          });
      }
      return;
  },

  remove(topic) {
      if(this.topics[topic]) {
          this.topics[topic] = null;
      }
      return;
  },

  removeAll() {
      this.topics = {};
  },
  
  publish(topic, data) { 
      let topicType = Object.prototype.toString.call(topic);
      if(topicType === '[object Array]') {
          var noTopic = [];
          // check if topic exists or has listeners
          if(!this.topics[topic]) {
              throw new ReferenceError('this topic does not exist');
          }

          if(!this.topics[topic].length) {
              throw new ReferenceError('no listeners registered for this topic');
          }

          for(var i = 0, len = topic.length; i < len; i++) {
              if(!this.topics[topic[i]]) {
                  noTopic.push(topic[i]);
              }

              if(this.topics[topic[i]] && this.topics[topic[i]].length) {
                  // notify all the listeners
                  this.topics[topic[i]].forEach(listener => listener(data || {}));
              }
          }

          if(noTopic.length) {
              console.warn(`Topics were not published: ${ noTopic }`);
          }
      } else {
          throw new TypeError(`Expected first argument to be an Array instead got ${ topicType }`); 
      }
  },

  broadcast(data) {
      var topicCollection = [];
      for(var topic in this.topics) {
          if(this.topics.hasOwnProperty(topic)) {
              topicCollection.push(topic);
          }
      }

      for(let i = 0, len = topicCollection.length; i < len; i++) {
          this.topics[topicCollection[i]].forEach(listener => listener(data || {}));
      }
  }
};

export default paperboy;

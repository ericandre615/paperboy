# Paperboy

A simple implementation of the Pub/Sub pattern for modern javsacript applications

Publish/Subscribe is a variation on the traditional [observer pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)
It provides a loosely coupled notification system in which you subscribe to a topic and publish
notifications to those topics. 

## Usage

Add paperboy.js script

    <script src="path/to/paperboy.js"></script>

Or `<script src="path/to/paperboy.min.js"></script>`

Works with Node.js

    var paperboy = require('paperboy') // installed via npm or
    var paperboy = require('./path/to/paperboy.js');

Example

    paperboy.subscribe('news', function(data) {
        console.log('News update!', data);
    }); // subscribe our listener callback to the 'news' topic

    paperboy.publish(['news'], 'This just in about News!'); // note previously you could use a string or array (now only arrays will work)

    /* the listener callback is called with the data that was published
    ** in the above example we output to console.log
    */ 'News update! This just in about News!'

You can pass in anonymous functions to .subscribe as in the above example. However,
there will be no reference to that listener to unsubscribe it later. If you need to unsubscribe

Better Example

    function newsListener1(data) { 
        console.log('news updated with',data);
    }

    function newsListener2(data) {
        console.log('news updated 2', data);
    }

    paperboy.subscribe('news', newsListener1);

    paperboy.subscribe('news', newsListener2);

    // publish as much as you want. And the data will be passed to both functions!

    paperboy.unsubscribe('news', newsListener1);

    // keep publishing, will publish to newsListener2, but no longer to newsListener1!

Even supports publishing to an array of topics. In this way you can

    paperboy.publish(['news', 'events', 'something else'], 'Info/data about update');

The data/info will be passed to all listeners in those 3 topics!

## Methods

 - **subscribe(topic, listener)**: subscribe to a topic with the callback listener
 - **unsubscribe(topic, listener)**: unsubscribe / stop callback from listening to topic
 - **publish(topics, data)**: first argument is an array of strings for mulitple topics
   data is what you want to tell them, pass an object, array, string, whatever
 - **remove(topic)**: removes a topic from paperboy
 - **removeAll()**: no arguments, removes all topics from paperboy, clears everything!
 - **broadcast(data)**: publish _data_ to all topics and listeners at once 


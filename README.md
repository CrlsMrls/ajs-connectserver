Connect AngularJS to Server
=========

A short tutorial on how to connect AngularJS (v1.3) to a server. Three options are shown:

  - $http service
  - $resource service
  - JSONP

The example code lists topics and votes, representing a basic CRUD (Create, Read, Update and Delete) application.
The same functionality is implemented with *$http* and *$resource* services. The *JSONP* conterpart only reads the list of topics.

A NodeJS web server simulates a RESTful service, accessing to a Mongo database.

The PDF used in the Meetup presentation is also included. The [Meetup event] took place in Zürich on 8.sept.2014


### Install & Run

In order to execute the code a Node webserver and a database needs to  be installed. Follow installation instructions based on your system for [NodeJS download] [1] and [MongoDB download] [2]. Together with NodeJS, the Node Package Modules (*npm*) is installed.

Then download the code and install dependencies with *npm*, including those managed by *bower*:


```sh
git clone https://github.com/carlos-/ajs-connectserver.git
cd ajs-connectserver
npm install
```

Run the web server by typing in the command line:

```sh
node bin/server.js
```

Some Linux distributions may need to rename *node* with *nodejs*.

You are ready to go. Type in your favorite browser http://localhost:3000 

**Happy learning!!**



Simulate Same-origin policy
---------------------------

In order to apply Cross-origin resource sharing (CORS) used in JSONP, a second NodeJS web sever will be available at port 3001, execute this in a second command line:

```sh
node bin/alternative-server.js 
```

Following this URL http://localhost:3001, $http and $resource won't work because the port is different, and the browser considers it violates the same-origin policy. You could prevent this uncommenting in the file *bin/server.js* the line:

> // app.use(cors());


Dummy data
----------

You can include some dummy data, not required but useful:

```sh
mongoimport --db simple --collection topics --jsonArray data.js 
```


Tech
----

This tutorial uses a number of open source projects to work properly:

* [AngularJS] - Superheroic JavaScript MVW Framework
* [NodeJS] - evented I/O for the backend
* [npm] - package manager for node
* [Express] - fast node.js network app framework 
* [MongoDB] - NoSQL open-source document database
* [mongoose] - elegant mongodb object modeling for node.js
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [Bower] - package manager for the web



License
-------

MIT 


**Free Software, Hell Yeah!**

[Meetup event]:http://www.meetup.com/AngularJS-ZRH/events/205343792/
[NodeJS]:http://nodejs.org
[MongoDB]:http://www.mongodb.org/

[1]:http://nodejs.org/download/
[2]:http://www.mongodb.org/downloads

[AngularJS]:https://angularjs.org/
[npm]: https://github.com/npm/npm
[express]:http://expressjs.com
[mongoose]:http://mongoosejs.com/
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[Bower]:http://bower.io/

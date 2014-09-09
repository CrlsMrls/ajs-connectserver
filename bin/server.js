var express = require("express"),
	mongoose = require("mongoose"),
 	cors = require("cors"),
	bodyParser = require('body-parser');



// APP
// =============================================

var app = express();

 app.use(cors()); /// => allow Cross-origin resource sharing (CORS)
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({ extended: true }) ); // to support URL-encoded bodies
app.use(express.static(__dirname + '/../app'));

app.set('jsonp callback name', 'callback'); // Required for JSONP calls

// DB
// =============================================

mongoose.connect('mongodb://localhost/simple')

var Schema = mongoose.Schema;
	
// define the model
var topicSchema = new Schema({
    title: String,
    votes: Number
}, 
{ 	
	versionKey: false 
});
var Topic = mongoose.model('Topic', topicSchema)


// ROUTES 
// =============================================

// instance of the express Router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	//console.log(req);
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
	res.send("Welcome to our API.");	
});

router.route('/topics')
	// create a new topic
	.post(function(req, res) {
		var topic = new Topic();
		topic.title = req.body.title;
		topic.votes = req.body.votes;

		// simulate server/commn is slow
		//setTimeout(function() {

			topic.save(function(err) {
					if (err) res.send(err);
					else res.json(topic);
		    });

		//}, 1000);
		
	})
	// get all topics
	.get(function(req, res) {
		Topic.find(function(err, votes) {

			//var txt = 'JSON_CALLBACK(' + 

			if(err) res.send(err);
			else res.jsonp(votes);
		});
	});

router.route('/topics/:topic_id')
	// get one topic
	.get(function(req, res) {
		Topic.findById(req.params.topic_id, function(err, topic) {
			if(err) res.send(err);
			else res.json(topic);
		});
	})
	// update one topic
	.put(function(req,res) {
		Topic.findById(req.params.topic_id, function(err, topic) {
			if(err) res.send(err);
			else {
				topic.title = req.body.title;
				topic.votes = req.body.votes;
				topic.save(function(err) {
					if (err) res.send(err);
					else res.json({ message: 'Topic updated!' });
				});
			}
		})
	})
	// delete one topic
	.delete(function(req, res) {
		Topic.remove({
			_id: req.params.topic_id
		}, function(err, topic) {
			if(err) res.send(err);
			else res.json({message: 'Topic deleted'})
		});
	});

app.use('/api', router);

app.listen(3000);
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/Ism', function(request, response){
	var isms = require('./IsmController.js');
	var value = isms.GetIsms(request);
	response.writeHead(200, {"Content-Type": "application/json"});
	response.write(getHipChatMessage(value));
	response.end();
});

app.post('/Ism', function(request, response){
	var isms = require('./IsmController.js');
	var value = isms.GetIsmPost(request.body);
	var Description = value["Description"];
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(getHipChatMessage(value));
});

 function constructHipChatJSON(value){
	return JSON.stringify({"color":"green", "message" : value, "notify" :  false, "message_format" : "html"});
 }

 function getHipChatMessage(ismValue){
	var htmlValue = turnIsmJsonIntoHtml(ismValue);
	var constructJSON = constructHipChatJSON(htmlValue);
 	console.log(constructJSON);
 	return constructJSON;
 }

// //Name, Description, ImageUrl
 function turnIsmJsonIntoHtml(value)
 {
 	var htmlValue = "";
	console.log(value);
 	var ismName = value["IsmName"];
 	var ismDescription = value["Description"];
 	var ismImageUrl = value["ImageUrl"];
 	htmlValue += "<strong>"+ismName+"</strong>";
 	htmlValue += "<br/>";
 	htmlValue += ""+ ismDescription +"";
 	htmlValue += "<br/>";
 	htmlValue += "<img style='height:150px;' src='"+ismImageUrl+ "' />";
 	return htmlValue;
 }

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



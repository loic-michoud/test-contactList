var contacts;
var prompt = require('prompt');
 
// 
// Start the prompt 
// 
prompt.start();



const NodeCouchDb = require('node-couchdb');
 
// node-couchdb instance with default options 
const couch = new NodeCouchDb();
 
// node-couchdb instance with Memcached 
const MemcacheNode = require('node-couchdb-plugin-memcached');
const couchWithMemcache = new NodeCouchDb({
    cache: new MemcacheNode
});
 
// node-couchdb instance talking to external service 
const couchExternal = new NodeCouchDb({
    host: 'couchdb.external.service',
    protocol: 'https',
    port: 5984
});
 
// not admin party 
/*const couchAuth = new NodeCouchDb({
    auth: {
        user: "Loic_Michoud",
        pass: "secret"
    }
});*/
var displayOptions = function(){
	console.log("Welcome to your contacts manager!");
	console.log("1: List contacts");
	console.log("2: Add a contact");
	console.log("0: Quit");
	console.log("Write your option:")	
	prompt.get(['option'], callback);
}

// Create database
function addContact(contact, displayOptions)
{
	console.log("Add contact:");
	prompt.get(['name'], function (err, result) {

    console.log('Command-line input received:');
    console.log('  name: ' + result.name);
    console.log("premier");
    console.log(result.name);
    var slice=result.name.split(" ");
    result.name=slice[0] + '_' + slice[1];
    console.log("deuxieme");
    console.log(result.name);
    createDatabase(contact);
	});
}

function createDatabase(contact, callback){
	var nano = require('nano')('http://Loic_Michoud:secret@localhost/');
	console.log("coucou 1");
	var http = require("http"); 
	console.log("coucou 2");
	var server = http.createServer(function (request, response) { 
	console.log("coucou 3");
	    nano.db.create(result.name, function (err, body, header) { 
	        if (err) { 
	            console.log(500, { "Content-Type": "text/plain" }); 
	            console.log("Database creation failed. " + err + "\n"); 
	        } else { 
	            console.log(200, { "Content-Type": "text/plain" }); 
	            console.log("Database created. Response: " + JSON.stringify(body) + "\n"); 
	        } 
	    }); 
	}); 
}
	




function display(dbs){
	
    //function affichage(dbs){
	var slice=dbs.split("_");
		console.log("Last name: "+slice[1]+", first name: "+slice[0]);
//}	
	console.log("apres affichage");

}




var callback = function (err, result) {
	// 
	// Log the results. 
	// 
	console.log('Command-line input received:');
	console.log('  option: ' + result.option);
	var commentaire =  result.option;
	
	switch (commentaire)
	{
		case "0":
			process.exit(0);
		break;
		case "1":
			couch.listDatabases().then(dbs => dbs.map(display), err => {
			});
			console.log("juste apres display");
			displayOptions();
		break;
		case "2":
			addContact(displayOptions);
		break;
		default:
			console.log("wrong message: use 0 or 1 or 2");
			displayOptions();

	}

}


displayOptions();







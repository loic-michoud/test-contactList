var contacts;
var prompt = require('prompt');

var name_choice="max michoud";
var name_delete="maman michoud";
// 
// Start the prompt 
// 
prompt.start();



const NodeCouchDb = require('node-couchdb');
 
// node-couchdb instance with default options 
const couch = new NodeCouchDb({
	 auth: {
        user: "Loic_Michoud",
        password: "secret"
    }
});
var viewUrl='http://localhost:5984';


 // hapi configuration

/*
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 5984, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/angularjs.js',
    handler: function (request, reply) {
        request=dbs;
    }
});
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});*/




// functions




var displayOptions = function(){
	console.log("Welcome to your contacts manager!");
	console.log("1: List contacts");
	console.log("2: Add a contact");
	console.log("0: Quit");
	console.log("Write your option:")	
	prompt.get(['option'], callback);
}

// Create database
function addContact(name_choice, displayOptions)
{

	//console.log("Add contact:");
	//prompt.get(['name'], function (err, result) {

   // console.log('Command-line input received:');
   // console.log('  name: ' + result.name);
   // console.log(result.name);
    var slice=name_choice.split(" ");
    name_choice=slice[0] + '_' + slice[1];
   // console.log(result.name);
    couch.listDatabases().then(function(dbs){
    var controller = 0;
    for(var i= 0; i <= dbs.length; i++){
        if(name_choice== dbs[i]){
            controller += 1;
        }
    }
    if(controller == 0){
        couch.createDatabase(name_choice).then(function(){
         console.log('Contact added');
     },
     function(err){
         res.send(err);
     });
    }
	});
//});
}

	




function display(dbs){
	
    //function affichage(dbs){
	var slice=dbs.split("_");
		console.log("Last name: "+slice[1]+", first name: "+slice[0]);

}

function funcdelete(name_delete, displayOptions)
{
	var slice=name_delete.split(" ");
    name_delete=slice[0] + '_' + slice[1];
    console.log("nom final: "+name_delete);
	couch.listDatabases().then(function(dbs){
    	for(var i= 0; i <= dbs.length; i++){
    		console.log("nom: "+i + ": "+dbs[i]);
        	if(name_delete== dbs[i]){
            	couch.dropDatabase(name_delete).then(function(){
				console.log("contact deleted")
        		});
   			}
		}
	});
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
			addContact(name_choice, displayOptions);
		break;
		case "3":
			funcdelete(name_delete, displayOptions);
		break;
		default:
			console.log("wrong message: use 0 or 1 or 2 or 3");
			displayOptions();

	}

}


displayOptions();







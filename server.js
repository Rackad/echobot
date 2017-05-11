var restify = require('restify');
var builder = require('botbuilder');

// Get secrets from server environment
var botConnectorOptions = {
    appId: process.env.BOTFRAMEWORK_APPID,
    appPassword: process.env.BOTFRAMEWORK_APPSECRET
};

// Create bot
var connector = new builder.ChatConnector(botConnectorOptions);
var bot = new builder.UniversalBot(connector);


bot.dialog('/', [
  /*function(session){
    builder.Prompts.text(session,'مرحبا بك في متجر ');
  },*/
  function (session) {
    builder.Prompts.choice(session, "بأيش أقدر أخدمك:", 'طلب جديد| حالة الطلب | التواصل مع البائع | إنهاء المحادثة ');
  },
  function (session, results) {

            switch (results.response.index) {
                case 0:
                    session.send('اطلب');
                    break;
                case 1:

                    session.send('حالة الطلب');
                    break;
                case 2:
                    session.send('الايميل');
                    break;
                default:
                    session.endDialog();
                    break;
            }


 } ]);
 
// Setup Restify Server
var server = restify.createServer();

// Handle Bot Framework messages
server.post('/api/messages', connector.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

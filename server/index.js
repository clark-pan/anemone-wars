var path = require('path'),
	express = require('express');
var app = express();

app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/jspm_packages', express.static(path.join(__dirname, '../jspm_packages'), { 'redirect': false }));
app.use('/shared', express.static(path.join(__dirname, '../shared')));

app.get(/^\/(?!(client)|(jspm_packages)|(shared))/, function(req, res) {
	res.sendFile(path.join(__dirname, app.get('env') === 'production' ? 'index.prod.html' : 'index.html'));
});

app.listen(process.env.PORT);

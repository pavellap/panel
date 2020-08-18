const express = require('express');
const path = require('path');
const app = express();
const chalk = require('chalk')

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000, () => {
    console.log(chalk.white("Сервер для production версии запущен на: ") + chalk.blue("http://localhost:9000"))
});

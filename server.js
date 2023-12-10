const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'narseler'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/config', (req, res) => {
    const config = {
        "realm": process.env.KEYPRACTICA_REALM,
        "auth-server-url": process.env.KEYPRACTICA_AUTH_SERVER_URL,
        "resource": process.env.KEYPRACTICA_RESOURCE
    };
    res.json(config);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

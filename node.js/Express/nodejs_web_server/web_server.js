
const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
const PORT = 3500;
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next()
})

app.use(cors())
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')))


app.get(['/', '/index', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get(['/new-page', '/new-page.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});


app.get('/old-page', (req, res) => {
    res.redirect(301, '/new-page.html');
});

const one = (req, res, next) => {
    console.log('one');
    next()
}

const two = (req, res, next) => {
    console.log('two');
    // next()
}

const three = (req, res, next) => {
    console.log('three');
    res.send("hi")
    next()
}

app.get('/chain', [one, three, two]);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

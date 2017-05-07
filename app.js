const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const app = express();

app.use(cookieParser());
app.use(session({
    secret: 'ARSENIY_HAS_NO_SECRETS',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        url: 'mongodb://localhost:27017/ArseniyMongo',
        touchAfter: 24 * 3600
    })
}));

let articles;
let users;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/articles', (req, res) => {
    const config = parseQuery(req.query);
    const filter = config.filterConfig;
    articles.find(filter).sort({createdAt: -1}).toArray((err, articles) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        const currAmount = Number(config.amount) + Number(config.skip);
        const hasMore = articles.length > currAmount;
        const result = {
            articles: articles.slice(config.skip, currAmount),
            hasMore
        }
        res.send(result);
    });
});

app.get('/authors', (req, res) => {
    articles.distinct('author', (err, result) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.send(result);
    });
});

app.get('/articles/:id', (req, res) => {
    articles.findOne({ _id: ObjectID(req.params.id) }, (err, article) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.send(article);
    });
});

app.post('/article', (req, res) => {
    const article = parseBodyAdd(req.body);
    articles.insert(article, (err, result) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    })
});

app.put('/article/:id', (req, res) => {
    const options = parseBodyUpdate(req.body);
    articles.updateOne({ _id: ObjectID(req.params.id) }, { $set: options }, (err, result) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

app.delete('/article/:id', (req, res) => {
    articles.deleteOne({ _id: ObjectID(req.params.id) }, (err) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    users.findOne({ _id: ObjectID(id) }, (err, user) => {
        if (err) {
            done(err, false);
        } else if (!user) {
            done(null, false);
        } else {
            done(null, user);
        }
    });
});

passport.use(new LocalStrategy(
    (username, password, done) => {
        users.findOne({ username, password }, (err, user) => {
            if (err) {
                return done(err, false);
            } else if (!user) {
                return done(null, false);
            }
            done(null, user);
        });
    }
));

app.post('/login', function (req, res) {
    passport.authenticate('local', (err, user) => {
        if (!user) {
            return res.sendStatus(401);
        }
        const sess = req.session;
        sess.user = user;
        sess.save();

        res.send(sess.user);
    })(req, res);
});

app.get('/logout', function (req, res) {
    req.session.destroy((error) => {
        if (error) {
            res.sendStatus(500);
        }
    });
    res.sendStatus(200);
});

app.get('/user', function (req, res) {
    const sess = req.session;
    res.send(sess.user ? sess.user.username : '');
});

function parseBodyUpdate(body) {
    let options = {};
    if (body.title) options.title = body.title;
    if (body.img) options.img = body.img;
    if (body.summary) options.summary = body.summary;
    if (body.content) options.content = body.content;
    return options;
}

function parseQuery(query) {
    let filterConfig = {};
    if (query.author) {
        filterConfig.author = { $eq: query.author };
    }
    const date = {};
    if (query.dateFrom && query.dateFrom !== 'Invalid Date') {
        date['$gte'] = Number(query.dateFrom);
    }
    if (query.dateTo && query.DateTo !== 'Invalid Date') {
        date['$lte'] = Number(query.dateTo);
    }
    if (Object.keys(date).length) {
        filterConfig.createdAt = date;
    }
    const skip = query.skip || 0;
    const amount = query.amount || 5;
    return {
        filterConfig,
        skip,
        amount
    };
}

function parseBodyAdd(body) {
    const article = {
        title: body.title,
        summary: body.summary,
        img: body.img,
        createdAt: Date.now(),
        author: body.author,
        content: body.content
    };
    return article;
}

MongoClient.connect('mongodb://localhost:27017/ArseniyMongo', (err, database) => {
    if (err) {
        return console.log(err);
    }
    articles = database.collection('articles');
    users = database.collection('users');
    app.listen(3000, function () {
        console.log('App listening on port 3000!');
    });
});
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const session = require('express-session');
// const dataMapRouter = require('./routes/data_map');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect( process.env.MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure OAuth2 strategy
passport.use(new OAuth2Strategy({
    authorizationURL: process.env.OAUTH_AUTHORIZATION_URL,
    tokenURL: process.env.OAUTH_TOKEN_URL,
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: process.env.OAUTH_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    // Store tokens and user info in the session
    return cb(null, { accessToken, refreshToken, profile });
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// OAuth routes
app.get('/auth/oauth2', passport.authenticate('oauth2'));

app.get('/auth/oauth2/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// Auth middleware - protect routes
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

// Routes
// app.use('/api/map', ensureAuthenticated, dataMapRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
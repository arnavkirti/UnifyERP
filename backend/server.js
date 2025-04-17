const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const { google } = require('googleapis');
const crypto = require('crypto');
require('dotenv').config();

const app = express();

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI);

// Create OAuth2 client with proper configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

// Update scopes to include email
const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
];

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://unify-erp.vercel.app'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

// Auth routes
app.get('/auth/google', (req, res) => {
  const state = crypto.randomBytes(32).toString('hex');
  req.session.state = state;

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
    state: state,
    prompt: 'consent' // Add this line to force consent screen
  });

  res.redirect(authUrl);
});

// Update the callback route to match GOOGLE_REDIRECT_URL
app.get('/auth/oauth2/callback', async (req, res) => {
  const { state, code, error } = req.query;

  if (error) {
    console.error('OAuth error:', error);
    return res.redirect('https://unify-erp.vercel.app/login?error=' + error);
  }

  if (!state || !req.session.state || state !== req.session.state) {
    console.error('State mismatch:', { 
      receivedState: state, 
      sessionState: req.session.state 
    });
    return res.redirect('https://unify-erp.vercel.app/login?error=invalid_state');
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2('v2');
    const { data } = await oauth2.userinfo.get({ auth: oauth2Client });

    // Store user info in session
    req.session.user = {
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
      tokens
    };

    res.redirect('https://unify-erp.vercel.app/dashboard');
  } catch (error) {
    console.error('OAuth error:', error);
    res.redirect('https://unify-erp.vercel.app/login?error=auth_error');
  }
});

// Check authentication status
app.get('/auth/status', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ 
      authenticated: true, 
      user: {
        name: req.session.user.name,
        email: req.session.user.email,
        picture: req.session.user.picture
      }
    });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// Logout endpoint
app.post('/auth/logout', async (req, res) => {
  if (req.session.user?.tokens?.access_token) {
    try {
      await oauth2Client.revokeToken(req.session.user.tokens.access_token);
    } catch (error) {
      console.error('Token revocation error:', error);
    }
  }
  
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
      return res.status(500).json({ success: false });
    }
    res.status(200).json({ success: true });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
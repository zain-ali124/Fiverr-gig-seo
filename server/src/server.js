const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');
const colors = require('colors');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

// Import config
const config = require('./config/config');

// Import routes
const authRoutes = require('./routes/authRoutes');

// Initialize express
const app = express();

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Prevent NoSQL injection
app.use(mongoSanitize());

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      config.CLIENT_URL,
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Request logging middleware (development only)
if (config.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`.cyan);
    next();
  });
}

// Rate limiting - apply to all API routes
const apiLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW,
  max: config.RATE_LIMIT_MAX,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 requests per hour
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting
app.use('/api', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Mount routes
app.use('/api/auth', authRoutes);

// API health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GigRanker API is running',
    environment: config.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// API version route
app.get('/api/version', (req, res) => {
  res.status(200).json({
    success: true,
    version: '1.0.0',
    name: 'GigRanker API'
  });
});

// 404 handler for undefined API routes - FIXED: removed wildcard syntax
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists. Please use another ${field}.`
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', ')
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please log in again.'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired. Please log in again.'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(config.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Catch-all 404 handler for non-API routes - FIXED: removed wildcard syntax
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// MongoDB connection function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

    // Create indexes
    if (config.NODE_ENV === 'development') {
      await mongoose.syncIndexes();
    }
  } catch (error) {
    console.error('MongoDB connection error:'.red.bold, error);
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected'.yellow);
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected'.green);
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:'.red, err);
});

// Graceful shutdown function
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Closing HTTP server and MongoDB connection...`.yellow);
  
  server.close(async () => {
    console.log('HTTP server closed.'.yellow);
    
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.'.yellow);
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:'.red, err);
      process.exit(1);
    }
  });
};

// Connect to database
connectDB();

// Start server
const server = app.listen(config.PORT, '0.0.0.0', () => {
  console.log(`
  ╔══════════════════════════════════════════════════════════╗
  ║                                                          ║
  ║   🚀 GigRanker Server                                     ║
  ║   ===============                                        ║
  ║                                                          ║
  ║   Status: 🟢 Running                                      ║
  ║   Environment: ${config.NODE_ENV.padEnd(25)} ║
  ║   Port: ${String(config.PORT).padEnd(28)} ║
  ║   URL: http://localhost:${config.PORT}                    ║
  ║   MongoDB: ${config.MONGO_URI ? '✅ Connected' : '❌ Not configured'.padEnd(18)} ║
  ║                                                          ║
  ╚══════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('❌ UNHANDLED REJECTION! 💥 Shutting down...'.red.bold);
  console.log(err.name, err.message);
  console.log(err.stack);
  
  // Gracefully close server & exit
  gracefulShutdown('Unhandled Rejection');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('❌ UNCAUGHT EXCEPTION! 💥 Shutting down...'.red.bold);
  console.log(err.name, err.message);
  console.log(err.stack);
  
  // For uncaught exceptions, we should exit immediately
  process.exit(1);
});

// Handle termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('Nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

// Export for testing
module.exports = { app, server };
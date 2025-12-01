const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById, registerEvent, deleteEvent, getEventRegistrations } = require('../controllers/eventController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

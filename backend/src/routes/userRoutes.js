const express = require('express');
const router = express.Router();
const { getMyMemberships, getMyEventRegistrations } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

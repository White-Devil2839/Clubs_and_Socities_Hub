const express = require('express');
const router = express.Router();
const { getAllClubs, getClubById, createClub, enrollInClub, deleteClub, getClubMembers } = require('../controllers/clubController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

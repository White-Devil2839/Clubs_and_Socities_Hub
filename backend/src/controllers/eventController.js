const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all approved clubs
const getAllClubs = async (req, res) => {
  try {
    const clubs = await prisma.club.findMany({ where: { approved: true } });
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get clubs', error: error.message });
  }
};

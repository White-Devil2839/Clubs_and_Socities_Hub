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

// Get single club by ID
const getClubById = async (req, res) => {
  try {
    const club = await prisma.club.findUnique({ 
      where: { id: Number(req.params.id) }, 
      include: { memberships: { include: { user: { select: { id: true, name: true, email: true } } } } } 
    });
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch club', error: error.message });
  }
};


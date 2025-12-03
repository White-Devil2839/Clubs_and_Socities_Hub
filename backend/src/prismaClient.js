const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

// Patch DATABASE_URL to limit connections
if (process.env.DATABASE_URL) {
    const separator = process.env.DATABASE_URL.includes('?') ? '&' : '?';
    if (!process.env.DATABASE_URL.includes('connection_limit')) {
        process.env.DATABASE_URL = `${process.env.DATABASE_URL}${separator}connection_limit=4`;
    }
}

const prisma = new PrismaClient();

module.exports = prisma;

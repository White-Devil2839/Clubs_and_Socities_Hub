const prisma = require('./prismaClient');

async function main() {
    try {
        console.log('Connecting to database...');
        const users = await prisma.user.findMany({ take: 5 });
        console.log('Successfully connected!');
        console.log('Users found:', users);
    } catch (error) {
        console.error('Database error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

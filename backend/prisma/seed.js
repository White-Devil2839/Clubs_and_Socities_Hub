const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Clear existing data (in reverse order of dependencies)
    console.log('🗑️  Clearing existing data...');
    await prisma.eventRegistration.deleteMany();
    await prisma.clubMembership.deleteMany();
    await prisma.event.deleteMany();
    await prisma.club.deleteMany();
    await prisma.user.deleteMany();

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminPassword = await bcrypt.hash('Vipax@Team', 10);
    const admin = await prisma.user.create({
        data: {
            email: 'Vipax@gmail.com',
            name: 'Vipax Admin',
            password: adminPassword,
            role: 'ADMIN',
        },
    });
    console.log('✅ Admin created:', admin.email);

    // Create regular users (sequentially to avoid connection limit)
    console.log('👥 Creating regular users...');
    const memberPassword = await bcrypt.hash('password123', 10);
    const users = [];

    users.push(await prisma.user.create({
        data: {
            email: 'alice@example.com',
            name: 'Alice Johnson',
            password: memberPassword,
            role: 'MEMBER',
        },
    }));

    users.push(await prisma.user.create({
        data: {
            email: 'bob@example.com',
            name: 'Bob Smith',
            password: memberPassword,
            role: 'MEMBER',
        },
    }));

    users.push(await prisma.user.create({
        data: {
            email: 'charlie@example.com',
            name: 'Charlie Brown',
            password: memberPassword,
            role: 'MEMBER',
        },
    }));

    users.push(await prisma.user.create({
        data: {
            email: 'diana@example.com',
            name: 'Diana Prince',
            password: memberPassword,
            role: 'MEMBER',
        },
    }));

    users.push(await prisma.user.create({
        data: {
            email: 'eve@example.com',
            name: 'Eve Williams',
            password: memberPassword,
            role: 'MEMBER',
        },
    }));

    console.log(`✅ Created ${users.length} regular users`);

    // Create clubs
    console.log('🏛️  Creating clubs...');
    const roboticsClub = await prisma.club.create({
        data: {
            name: 'Robotics Club',
            description: 'Building robots and exploring automation technology',
            category: 'TECH',
            approved: true,
            active: true,
        },
    });

    const webDevClub = await prisma.club.create({
        data: {
            name: 'Web Development Club',
            description: 'Learn modern web technologies and build amazing websites',
            category: 'TECH',
            approved: true,
            active: true,
        },
    });

    const debateClub = await prisma.club.create({
        data: {
            name: 'Debate Society',
            description: 'Enhance your public speaking and critical thinking skills',
            category: 'NON_TECH',
            approved: true,
            active: true,
        },
    });

    const photographyClub = await prisma.club.create({
        data: {
            name: 'Photography Club',
            description: 'Capture moments and learn the art of photography',
            category: 'EXTRACURRICULAR',
            approved: true,
            active: true,
        },
    });

    const musicClub = await prisma.club.create({
        data: {
            name: 'Music Club',
            description: 'Explore different genres and create beautiful music together',
            category: 'EXTRACURRICULAR',
            approved: true,
            active: true,
        },
    });

    const aiClub = await prisma.club.create({
        data: {
            name: 'AI & Machine Learning Club',
            description: 'Dive into artificial intelligence and machine learning',
            category: 'TECH',
            approved: true,
            active: true,
        },
    });

    const dramaClub = await prisma.club.create({
        data: {
            name: 'Drama Club',
            description: 'Express yourself through theater and performing arts',
            category: 'NON_TECH',
            approved: true,
            active: true,
        },
    });

    const sportsClub = await prisma.club.create({
        data: {
            name: 'Sports & Fitness Club',
            description: 'Stay fit and enjoy various sports activities',
            category: 'EXTRACURRICULAR',
            approved: true,
            active: true,
        },
    });

    console.log('✅ Created 8 clubs');

    // Create club memberships (sequentially to avoid connection limit)
    console.log('🤝 Creating club memberships...');
    const memberships = [];

    // Alice - approved memberships
    memberships.push(await prisma.clubMembership.create({
        data: { userId: users[0].id, clubId: roboticsClub.id, status: 'APPROVED' },
    }));
    memberships.push(await prisma.clubMembership.create({
        data: { userId: users[0].id, clubId: webDevClub.id, status: 'APPROVED' },
    }));

    // Bob - mix of approved and pending
    memberships.push(await prisma.clubMembership.create({
        data: { userId: users[1].id, clubId: debateClub.id, status: 'APPROVED' },
    }));
    memberships.push(await prisma.clubMembership.create({
        data: { userId: users[1].id, clubId: aiClub.id, status: 'PENDING' },
    }));

    // Charlie - approved memberships
    memberships.push(await prisma.clubMembership.create({
        data: { userId: users[2].id, clubId: photographyClub.id, status: 'APPROVED' },
    }));
    memberships.push(await prisma.clubMembership.create({
        data: { userId: users[2].id, clubId: musicClub.id, status: 'APPROVED' },
    }));

    // Diana - mix of statuses
    memberships.push(await prisma.clubMembership.create({
        data: { userId: users[3].id, clubId: roboticsClub.id, status: 'APPROVED' },
    }));
    memberships.push(await prisma.clubMembership.create({
        data: { userId: users[3].id, clubId: dramaClub.id, status: 'PENDING' },
    }));
    memberships.push(await prisma.clubMembership.create({
        data: { userId: users[3].id, clubId: sportsClub.id, status: 'REJECTED' },
    }));

    // Eve - approved memberships
    memberships.push(await prisma.clubMembership.create({
        data: { userId: users[4].id, clubId: webDevClub.id, status: 'APPROVED' },
    }));
    memberships.push(await prisma.clubMembership.create({
        data: { userId: users[4].id, clubId: musicClub.id, status: 'APPROVED' },
    }));

    console.log(`✅ Created ${memberships.length} club memberships`);

    // Create events
    console.log('📅 Creating events...');
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const twoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    const threeWeeks = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000);

    const event1 = await prisma.event.create({
        data: {
            title: 'Robotics Workshop: Introduction to Arduino',
            description: 'Learn the basics of Arduino programming and build your first robot',
            date: nextWeek,
            type: 'CLUB',
            clubId: roboticsClub.id,
        },
    });

    const event2 = await prisma.event.create({
        data: {
            title: 'Web Dev Hackathon 2026',
            description: 'Build an amazing web app in 24 hours and win exciting prizes!',
            date: twoWeeks,
            type: 'CLUB',
            clubId: webDevClub.id,
        },
    });

    const event3 = await prisma.event.create({
        data: {
            title: 'Inter-College Debate Competition',
            description: 'Compete with the best debaters from different colleges',
            date: threeWeeks,
            type: 'CLUB',
            clubId: debateClub.id,
        },
    });

    const event4 = await prisma.event.create({
        data: {
            title: 'Photography Exhibition',
            description: 'Showcase your best clicks and win awards',
            date: nextWeek,
            type: 'CLUB',
            clubId: photographyClub.id,
        },
    });

    const event5 = await prisma.event.create({
        data: {
            title: 'Music Night: Acoustic Session',
            description: 'An evening of live acoustic performances',
            date: tomorrow,
            type: 'CLUB',
            clubId: musicClub.id,
        },
    });

    const event6 = await prisma.event.create({
        data: {
            title: 'Annual Tech Fest 2026',
            description: 'Campus-wide technology festival with competitions and workshops',
            date: threeWeeks,
            type: 'INSTITUTE',
            clubId: null,
        },
    });

    const event7 = await prisma.event.create({
        data: {
            title: 'AI Workshop: Machine Learning Fundamentals',
            description: 'Hands-on workshop covering ML basics and practical applications',
            date: twoWeeks,
            type: 'CLUB',
            clubId: aiClub.id,
        },
    });

    const event8 = await prisma.event.create({
        data: {
            title: 'Annual Sports Day',
            description: 'Inter-department sports competition',
            date: nextWeek,
            type: 'INSTITUTE',
            clubId: null,
        },
    });

    console.log('✅ Created 8 events');

    // Create event registrations (sequentially to avoid connection limit)
    console.log('📝 Creating event registrations...');
    const registrations = [];

    registrations.push(await prisma.eventRegistration.create({
        data: { userId: users[0].id, eventId: event1.id },
    }));
    registrations.push(await prisma.eventRegistration.create({
        data: { userId: users[0].id, eventId: event2.id },
    }));
    registrations.push(await prisma.eventRegistration.create({
        data: { userId: users[1].id, eventId: event3.id },
    }));
    registrations.push(await prisma.eventRegistration.create({
        data: { userId: users[1].id, eventId: event6.id },
    }));
    registrations.push(await prisma.eventRegistration.create({
        data: { userId: users[2].id, eventId: event4.id },
    }));
    registrations.push(await prisma.eventRegistration.create({
        data: { userId: users[2].id, eventId: event5.id },
    }));
    registrations.push(await prisma.eventRegistration.create({
        data: { userId: users[3].id, eventId: event1.id },
    }));
    registrations.push(await prisma.eventRegistration.create({
        data: { userId: users[3].id, eventId: event8.id },
    }));
    registrations.push(await prisma.eventRegistration.create({
        data: { userId: users[4].id, eventId: event2.id },
    }));
    registrations.push(await prisma.eventRegistration.create({
        data: { userId: users[4].id, eventId: event5.id },
    }));

    console.log(`✅ Created ${registrations.length} event registrations`);

    console.log('\n✨ Seed completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - 1 admin user (${admin.email})`);
    console.log(`   - ${users.length} regular users`);
    console.log(`   - 8 clubs (across TECH, NON_TECH, EXTRACURRICULAR)`);
    console.log(`   - ${memberships.length} club memberships`);
    console.log(`   - 8 events (6 club events, 2 institute events)`);
    console.log(`   - ${registrations.length} event registrations`);
    console.log('\n🔑 Admin Login Credentials:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: Vipax@Team`);
    console.log('\n🔑 Test User Credentials (all use password: password123):');
    users.forEach((user) => console.log(`   - ${user.email}`));
}

main()
    .catch((e) => {
        console.error('❌ Error during seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

# ClubsHub - Campus Clubs & Events Management Platform

A modern, full-stack web application for managing campus clubs, memberships, and events with a beautiful, responsive UI. Built with React, Express, Prisma, and MySQL.

![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Express%20%7C%20Prisma%20%7C%20MySQL-blue)
![Node Version](https://img.shields.io/badge/Node-22.x-green)

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication with secure password hashing (bcryptjs)
- Role-based access control (MEMBER/ADMIN)
- Protected routes and API endpoints
- Session management with token refresh

### 👥 Club Management
- Create and browse clubs with categories (TECH, NON_TECH, EXTRACURRICULAR)
- Duplicate prevention: Cannot create clubs with same name and category
- Auto-approval for admin-created clubs
- Rich club details with descriptions
- Club member management interface

### 🎫 Membership System
- Request membership to clubs
- Admin approval/rejection workflow
- Email notifications for membership status changes
- Member removal functionality
- Cascade deletion when users are deleted

### 📅 Event Management
- Create events with future date validation
- Optional club association for events
- User registration for events
- Duplicate prevention: Events for same club must be 1+ hour apart
- Automated cleanup of expired events
- Email notifications for new events and cancellations

### 📧 Email Notifications
- Membership approved/rejected notifications
- New event announcements to club members
- Event cancellation alerts
- Club deletion notifications
- Member removal notifications
- Customizable email templates

### 🎨 Modern UI/UX
- Beautiful gradient-based design system
- Glassmorphic cards with hover effects
- Responsive layout for all screen sizes
- Smooth animations and transitions
- Empty state handling
- Table-based data display for admin panels
- Form validation with proper labels

### 🛡️ Admin Features
- User management (promote to admin, delete users)
- Club and event creation
- Membership approval system
- Event registration monitoring
- Comprehensive admin dashboard
- Bulk data viewing with tables

## ⚠️ Important: Email Notifications on Free Hosting

### Email Functionality Status

**If hosted on free Render.com or similar free hosting**:
- ❌ Email notifications will **NOT work**
- ✅ All other features work perfectly

### Why Emails Don't Work on Free Hosting

Free hosting platforms like Render.com have strict limitations:

1. **Port Restrictions**: Free tiers block outgoing SMTP ports (25, 465, 587)
2. **Security Policies**: Prevent spam by blocking email sending
3. **Resource Limits**: Email services require persistent connections

### What This Means for You

**Features that still work** (without emails):
- ✅ User registration and login
- ✅ Club creation and management
- ✅ Event creation and registration
- ✅ Membership requests and approvals
- ✅ All admin functions
- ✅ Complete UI/UX experience

**Features affected** (no email notifications):
- ❌ Membership approval/rejection emails
- ❌ New event notification emails
- ❌ Club deletion notification emails
- ❌ Event cancellation emails

> 💡 **The app works perfectly without emails!** Users just won't receive email notifications. They can still see all updates in the app itself.

### How to Enable Emails

**Option 1: Use Paid Hosting** (Recommended)
- Upgrade to Render paid plan ($7/month)
- Use VPS hosting (DigitalOcean, AWS, etc.)
- Deploy to Heroku paid tier

**Option 2: Use Email API Service**
- SendGrid (100 emails/day free)
- Mailgun (5,000 emails/month free)
- AWS SES (62,000 emails/month free)

**Option 3: Local Development**
- Emails work fine on localhost
- Use your Gmail with App Password
- Perfect for testing

### Setting Up Emails (When Available)

Only configure these if you have proper hosting:

```env
# Email Configuration (Optional - only works on paid hosting)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

> 📧 **For Gmail**: Create an [App Password](https://support.google.com/accounts/answer/185833) instead of using your regular password.

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 22.x
- **Framework**: Express.js
- **Database ORM**: Prisma 6
- **Database**: MySQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Email**: Nodemailer
- **Validation**: Built-in Express validators

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Routing**: React Router DOM 7
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Google Fonts (Outfit, Plus Jakarta Sans)
- **Animations**: CSS transitions and keyframes

## 🚀 Quick Start

### Prerequisites
- Node.js 22.x or higher
- MySQL database (local or hosted)
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone https://github.com/White-Devil2839/Clubs_and_Socities_Hub
cd Clubs_and_Socities_Hub
```

### 2. Install Dependencies

```bash

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the **Backend**:

```env
# Database Configuration (Required)
DATABASE_URL="mysql://username:password@localhost:3306/clubshub"
Hosted database url(can be used if you don't have mysql workbench)="mysql://clubs_activebag:ae2f8d42cb7deeff222c7272bf510daaf125102a@lobzor.h.filess.io:3307/clubs_activebag"

# JWT Configuration (Required)
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"


EMAIL_USER=your email
EMAIL_PASS= your app password
EMAIL_FROM="Campus Connect <yourgmail@gmail.com>"
```

**Important Notes**:
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833)
- `JWT_SECRET` should be a strong random string (32+ characters)
- `DATABASE_URL` format: `mysql://USER:PASSWORD@HOST:PORT/DATABASE`

### 4. Database Setup(only if not using hosted db url)

```bash
cd backend

# Generate Prisma Client
npx prisma generate --schema ../prisma/schema.prisma

# Push schema to database (creates tables)
npx prisma db push --schema ../prisma/schema.prisma

# Optional: Open Prisma Studio to view data
npx prisma studio --schema ../prisma/schema.prisma
```

### 5. Run the Application

#### Development Mode

**Terminal 1 - Backend**:
```bash
cd backend
npm start
# Server runs on http://localhost:5050
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

#### Production Mode

**Backend**:
```bash
cd backend
npm install --production
npx prisma generate --schema ../prisma/schema.prisma

# Using PM2 (recommended)
pm2 start src/server.js --name clubshub-backend

# Or using Node directly
node src/server.js
```

**Frontend**:
```bash
cd frontend

# Create production environment file
echo "VITE_API_URL=https://your-backend-domain.com/api" > .env.production

# Build for production
npm run build

# The dist/ folder contains your production build
# Serve it with nginx, Apache, Vercel, Netlify, etc.
```

## 🔐 Creating the First Admin User
(only if not using hosted db)
After setting up the application, you need to create an admin user:

### Method 1: Using Node.js Script

```bash
cd backend
node -e "const {PrismaClient}=require('@prisma/client');const p=new PrismaClient();(async()=>{await p.user.update({where:{email:'your-email@example.com'},data:{role:'ADMIN'}});console.log('User promoted to admin');process.exit(0)})()"
```

Replace `your-email@example.com` with the email you registered with.

### Method 2: Direct Database Query

```sql
UPDATE User SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

### Method 3: Using Prisma Studio

```bash
cd backend
npx prisma studio --schema ../prisma/schema.prisma
# Navigate to User table, find your user, change role to 'ADMIN'
```

## � Default Admin Credentials

For development and testing purposes, you can use these credentials(If using hosted db):

**Email**: `Vipax@gmail.com`  
**Password**: `Vipax@Team`

> ⚠️ **Security Warning**: These are default credentials for development/testing only. 
> 
> **For Production**:
> - Change the password immediately after first login
> - Or create a new admin user with secure credentials
> - Never commit credentials to version control
> - Use strong, unique passwords (12+ characters with mixed case, numbers, and symbols)

## �📁 Project Structure

```
Clubs_and_Socities_Hub/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── adminController.js      # Admin operations
│   │   │   ├── authController.js       # Authentication
│   │   │   ├── clubController.js       # Club management
│   │   │   ├── eventController.js      # Event management
│   │   │   └── userController.js       # User operations
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js       # JWT verification
│   │   ├── routes/
│   │   │   ├── adminRoutes.js          # Admin endpoints
│   │   │   ├── authRoutes.js           # Auth endpoints
│   │   │   ├── clubRoutes.js           # Club endpoints
│   │   │   ├── eventRoutes.js          # Event endpoints
│   │   │   └── userRoutes.js           # User endpoints
│   │   ├── utils/
│   │   │   ├── emailService.js         # Email sending
│   │   │   ├── emailTemplates.js       # Email templates
│   │   │   └── eventCleanup.js         # Automated cleanup
│   │   ├── prismaClient.js             # Prisma singleton
│   │   └── server.js                   # Express app
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── apiClient.js            # API client
│   │   ├── components/
│   │   │   ├── PageHeader.jsx          # Reusable header
│   │   │   └── Reveal.jsx              # Animation wrapper
│   │   ├── context/
│   │   │   └── AuthContext.jsx         # Auth state
│   │   ├── pages/
│   │   │   ├── AddClub.jsx             # Create club
│   │   │   ├── AdminEventRegistrations.jsx
│   │   │   ├── AdminMemberships.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── ClubDetail.jsx
│   │   │   ├── Clubs.jsx
│   │   │   ├── CreateEvent.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ManageClubMembers.jsx
│   │   │   ├── ManageEventRegistrations.jsx
│   │   │   ├── MyActivity.jsx
│   │   │   └── Register.jsx
│   │   ├── styles/
│   │   │   └── global.css              # Global styles
│   │   ├── App.jsx                     # Main app component
│   │   └── main.jsx                    # Entry point
│   └── package.json
├── prisma/
│   └── schema.prisma                   # Database schema
├── .env                                # Environment variables
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (returns JWT token)

### Clubs
- `GET /api/clubs` - List all approved clubs
- `GET /api/clubs/:id` - Get club details
- `POST /api/clubs` - Create club (ADMIN only)
- `POST /api/clubs/:id/enroll` - Request membership (AUTH)
- `DELETE /api/clubs/:id` - Delete club (ADMIN only)
- `GET /api/clubs/:id/members` - Get club members (ADMIN only)

### Events
- `GET /api/events` - List all upcoming events
- `GET /api/events/:id` - Get event details
- `POST /api/events/:id/register` - Register for event (AUTH)
- `DELETE /api/events/:id` - Delete event (ADMIN only)
- `GET /api/events/:id/registrations` - Get event registrations (ADMIN only)

### Admin
- `POST /api/admin/event` - Create event (ADMIN only)
- `GET /api/admin/users` - List all users (ADMIN only)
- `PATCH /api/admin/users/:id/promote` - Promote user to admin (ADMIN only)
- `DELETE /api/admin/users/:id` - Delete user (ADMIN only)
- `GET /api/admin/memberships` - List all memberships (ADMIN only)
- `GET /api/admin/event-registrations` - List all registrations (ADMIN only)
- `PATCH /api/admin/member/:id/approve` - Approve membership (ADMIN only)
- `PATCH /api/admin/member/:id/reject` - Reject membership (ADMIN only)
- `DELETE /api/admin/member/:id` - Remove member (ADMIN only)

### User
- `GET /api/user/me` - Get current user info (AUTH)
- `GET /api/user/activity` - Get user's clubs and events (AUTH)

## 🎯 Key Features Explained

### Duplicate Prevention

**Clubs**: Cannot create two clubs with the same name and category (case-insensitive).

**Events**: Cannot create two events for the same club within a 1-hour time window.

### Automated Event Cleanup

- Background service runs every 5 minutes (configurable)
- Automatically deletes events that have passed their date/time
- Cascades deletion to event registrations
- Runs automatically on server start

### Email Notifications

Sent automatically for:
- Membership approved/rejected
- New event created (to club members)
- Event cancelled (to registered users)
- Club deleted (to members)
- Member removed from club

### Cascade Deletion

When deleting:
- **User**: Removes all memberships and event registrations
- **Club**: Removes all memberships, events, and event registrations
- **Event**: Removes all event registrations

## 📝 Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | ✅ Yes | - | MySQL connection string |
| `JWT_SECRET` | ✅ Yes | - | Secret key for JWT tokens (32+ chars) |
| `PORT` | ❌ No | `5050` | Backend server port |
| `FRONTEND_URL` | ❌ No | `*` | Frontend URL for CORS |
| `EMAIL_HOST` | ❌ No | - | SMTP server hostname |
| `EMAIL_PORT` | ❌ No | `587` | SMTP server port |
| `EMAIL_USER` | ❌ No | - | Email address for sending |
| `EMAIL_PASS` | ❌ No | - | Email password/app password |
| `EVENT_CLEANUP_INTERVAL_MINUTES` | ❌ No | `5` | Cleanup interval in minutes |

## 🚀 Deployment Guide

### Backend Deployment (VPS/Cloud)

1. **Prepare the server**:
```bash
# Install Node.js 22.x
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2
```

2. **Deploy the application**:
```bash
# Clone repository
git clone <your-repo-url>
cd Clubs_and_Socities_Hub

# Install dependencies
cd backend
npm install --production

# Set up environment variables
nano .env  # or use your hosting provider's env var system

# Generate Prisma Client
npx prisma generate --schema ../prisma/schema.prisma

# Push database schema
npx prisma db push --schema ../prisma/schema.prisma

# Start with PM2
pm2 start src/server.js --name clubshub-backend
pm2 save
pm2 startup
```

3. **Set up reverse proxy (nginx)**:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5050;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Frontend Deployment (Static Hosting)

**Vercel**:
```bash
cd frontend
vercel --prod
```

**Netlify**:
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

**Manual (nginx)**:
```bash
cd frontend
npm run build
sudo cp -r dist/* /var/www/html/
```

### Database

Use any MySQL hosting provider:
- PlanetScale
- AWS RDS
- DigitalOcean Managed Databases
- Railway
- Aiven

## 🔒 Production Checklist

- [ ] Set strong `JWT_SECRET` (32+ characters, random)
- [ ] Use HTTPS for both frontend and backend
- [ ] Set `FRONTEND_URL` for CORS security
- [ ] Configure `VITE_API_URL` in frontend
- [ ] Set up email service (Gmail App Password or SMTP)
- [ ] Configure all environment variables
- [ ] Set up PM2 for backend process management
- [ ] Configure nginx reverse proxy
- [ ] Test database connection
- [ ] Create first admin user
- [ ] Test all API endpoints
- [ ] Verify email notifications work
- [ ] Test automated event cleanup
- [ ] Set up SSL certificates (Let's Encrypt)
- [ ] Configure firewall rules
- [ ] Set up monitoring and logging
- [ ] Create database backups

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test connection
cd backend
npx prisma db pull --schema ../prisma/schema.prisma
```

### Email Not Sending
- Verify SMTP credentials
- For Gmail, use App Password, not regular password
- Check firewall rules for port 587

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is set correctly
- Check CORS configuration in backend
- Ensure backend is running and accessible

### Node Version Issues
```bash
# Check version
node --version  # Should be 22.x

# Switch version using nvm
nvm use 22
```

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on the repository.

## 👨‍💻 Work Attribution

This project was developed collaboratively by:

- **Jatin(RIDECELL Intern)**: Frontend Pages
- **Neha**: Backend Routes
- **Tanima**: Backend Controllers
- **Divyansh**: All the remaining work

---

Built with ❤️ for the campus community.

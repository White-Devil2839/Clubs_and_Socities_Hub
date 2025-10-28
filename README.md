# Clubs_and_Socities_Hub
I think we sould use mongodb for backend and create frontend with React-Native with a Feature of create account,login,logout,admin and the authorization should be session key and in the frontend we can create the pages Home, Announcement, Events, Profile etc.
we should start with the newton logic page(where we can use the official adypu id's of students for login)

Schema Info:
Includes four main collections — Users, Clubs, Events, and Announcements.

Users: store student details, roles (student/admin), and session keys for login.

Clubs: contain club info, members, and admins.

Events: linked to clubs, store event details and participants.

Announcements: managed by admins, store title, content, and timestamps.

Users → stores student info, role (student/admin), profile, and session key for authentication.
Options: email (ADYPU only), password (hashed), profilePic, clubMemberships.

Clubs → holds club details, description, members, and admin references.
Options: name, description, logo, members[], createdBy.

Events → linked with clubs, stores event info and participants.
Options: name, date, venue, description, clubID, participants[].

Announcements → created by admins for updates.
Options: title, content, createdBy, createdAt.

const baseStyles = `
  font-family: Arial, sans-serif;
  color: #333333;
  line-height: 1.5;
`;

function wrapTemplate({ title, body }) {
  return `
    <div style="${baseStyles} padding: 16px;">
      <h2 style="color: #1e88e5;">${title}</h2>
      ${body}
      <p style="margin-top: 24px; font-size: 12px; color: #777;">
        This is an automated message from the Campus Connect Platform.
      </p>
    </div>
  `;
}

function membershipApprovedEmail(userName, clubName) {
  return wrapTemplate({
    title: 'Membership Approved',
    body: `
      <p>Hi ${userName},</p>
      <p>Great news! Your membership request for the <strong>${clubName}</strong> club has been <strong>approved</strong>.</p>
      <p>You can now participate in all club activities and receive updates.</p>
      <p>Welcome aboard!</p>
    `,
  });
}

function membershipRejectedEmail(userName, clubName) {
  return wrapTemplate({
    title: 'Membership Update',
    body: `
      <p>Hi ${userName},</p>
      <p>We wanted to let you know that your membership request for the <strong>${clubName}</strong> club was <strong>rejected</strong>.</p>
      <p>If you believe this was a mistake or would like more information, please contact the club administrators.</p>
      <p>Thank you for your interest.</p>
    `,
  });
}

function newEventNotificationEmail(userName, eventTitle, eventDate, eventDescription, clubName) {
  return wrapTemplate({
    title: `New Event: ${eventTitle}`,
    body: `
      <p>Hi ${userName},</p>
      <p>A new event has been scheduled for the <strong>${clubName}</strong> club:</p>
      <ul>
        <li><strong>Event:</strong> ${eventTitle}</li>
        <li><strong>Date:</strong> ${eventDate ? new Date(eventDate).toLocaleString() : 'TBA'}</li>
      </ul>
      <p>${eventDescription || 'Details coming soon.'}</p>
      <p>We hope to see you there!</p>
    `,
  });
}

function eventRegistrationConfirmationEmail(userName, eventTitle, eventDate) {
  return wrapTemplate({
    title: 'Event Registration Confirmed',
    body: `
      <p>Hi ${userName},</p>
      <p>Your registration for <strong>${eventTitle}</strong> has been confirmed.</p>
      <ul>
        <li><strong>Date:</strong> ${eventDate ? new Date(eventDate).toLocaleString() : 'TBA'}</li>
      </ul>
      <p>Thank you for registering. We look forward to your participation!</p>
    `,
  });
}

function clubApprovedEmail(clubName, clubDescription) {
  return wrapTemplate({
    title: 'Club Approved',
    body: `
      <p>Great news!</p>
      <p>Your club <strong>${clubName}</strong> has been approved and is now live on the Campus Connect Platform.</p>
      <p><strong>Description:</strong> ${clubDescription || 'N/A'}</p>
      <p>Students can now discover and join your club. Welcome to the community!</p>
    `,
  });
}

function eventCancelledEmail(userName, eventTitle, eventDate) {
  return wrapTemplate({
    title: 'Event Cancelled',
    body: `
      <p>Hi ${userName},</p>
      <p>We regret to inform you that the event <strong>${eventTitle}</strong> scheduled for <strong>${eventDate ? new Date(eventDate).toLocaleString() : 'TBA'}</strong> has been cancelled.</p>
      <p>We apologize for any inconvenience this may cause.</p>
      <p>Please check back for future events!</p>
    `,
  });
}

function clubDeletedEmail(userName, clubName) {
  return wrapTemplate({
    title: 'Club Removed',
    body: `
      <p>Hi ${userName},</p>
      <p>We wanted to inform you that the club <strong>${clubName}</strong> has been removed from the Campus Connect Platform.</p>
      <p>Your membership in this club has been automatically removed.</p>
      <p>Thank you for your participation, and we hope to see you in other clubs!</p>
    `,
  });
}

function membershipRemovedEmail(userName, clubName) {
  return wrapTemplate({
    title: 'Membership Removed',
    body: `
      <p>Hi ${userName},</p>
      <p>Your membership in the club <strong>${clubName}</strong> has been removed by an administrator.</p>
      <p>If you believe this was done in error, please contact the club administrators.</p>
      <p>Thank you for your understanding.</p>
    `,
  });
}

function welcomeEmail(userName) {
  return wrapTemplate({
    title: 'Welcome to Campus Connect!',
    body: `
      <p>Hi ${userName},</p>
      <p>Welcome to the <strong>Campus Connect Platform</strong>!</p>
      <p>You can now:</p>
      <ul>
        <li>Discover and join clubs that match your interests</li>
        <li>Register for exciting campus events</li>
        <li>Connect with fellow students and build your community</li>
      </ul>
      <p>We're excited to have you on board. Start exploring today!</p>
    `,
  });
}

module.exports = {
  membershipApprovedEmail,
  membershipRejectedEmail,
  newEventNotificationEmail,
  eventRegistrationConfirmationEmail,
  clubApprovedEmail,
  eventCancelledEmail,
  clubDeletedEmail,
  membershipRemovedEmail,
  welcomeEmail,
};
module.exports = {
  title: 'next-starter',
  description: 'A description',
  passport: {
    secret: process.env.PASSPORT_SECRET
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  }
};

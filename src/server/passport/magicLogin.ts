import MagicLoginStrategy from 'passport-magic-login';
import getConfig from 'next/config';
import sendEmail from '../mailer';

const { publicRuntimeConfig: config } = getConfig();

export const magicLogin = new MagicLoginStrategy({

  // Used to encrypt the authentication token. Needs to be long, unique and (duh) secret.
  secret: config.passport.secret,

  // The authentication callback URL
  callbackUrl: '/auth/callback',

  // Called with th e generated magic link so you can send it to the user
  // "destination" is what you POST-ed from the client
  // "href" is your confirmUrl with the confirmation token,
  // for example "/auth/confirm?token=<longtoken>"
  sendMagicLink: async (destination, href) => {

    await sendEmail({
      to: destination,
      from: 'mac@dmio.co',
      subject: 'login attempt',
      html: `Click this link to finish logging in: https://yourcompany.com${href}`
    })

    // eslint-disable-next-line no-console
    console.log('sendMagicLink', { destination, href });
  },

  // Once the user clicks on the magic link and verifies their login attempt,
  // you have to match their email to a user record in the database.
  // If it doesn't exist yet they are trying to sign up so you have to create a new one.
  // "payload" contains { "destination": "email" }
  // In standard passport fashion, call callback with the error as the first argument (if there was one)
  // and the user data as the second argument!
  verify: async (payload, callback) => {
    // Get or create a user with the provided email from the database
    if (payload?.destination) {
      // await getOrCreateUserWithEmail(payload.destination)
      //   .then(user => {
      //     callback(null, user)
      //   })
      //   .catch(err => {
      //     callback(err)
      //   })

      // eslint-disable-next-line no-console
      console.log({ payload });
    } else {
      callback(Error('User not found.'));
    }

    // // eslint-disable-next-line no-console
    // console.log('verify', { payload, callback })

    // callback(null, {id: 1});
  }
});

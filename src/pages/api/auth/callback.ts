import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';
import { setLoginSession } from '../../../server/passport/auth';
import { magicLogin } from '../../../server/passport/magicLogin';

const authenticate = (method, req, res): any =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

passport.use(magicLogin);

export default nextConnect()
  .use(passport.initialize())
  .get(async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const user = await authenticate('magiclogin', req, res);

      await setLoginSession(res, user);

      res.status(200).json({ done: true })
    } catch (error) {
      console.error(error)
      res.status(401).send(error.message)
    }
  });

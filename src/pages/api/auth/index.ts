import nextConnect from 'next-connect';
import { magicLogin } from '../../../server/passport/magicLogin';

export default nextConnect().post(magicLogin.send);
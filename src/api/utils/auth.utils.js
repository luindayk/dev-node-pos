import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';
import Bcrypt from 'bcrypt';
import { Boom } from '@hapi/boom';
import JWT from 'jsonwebtoken';
import Env from '../../config/environment.config';

export async function getToken(payload, options = {}) {
    return JWT.sign(payload, Env.JWT_SECRET, { expiresIn: Env.JWT_EXPIRES_IN, ...options });
}

export async function authenticate({ email, password }) {
    const model = instances.getModel('user');
    const user = await getObjectOr404(model, { where: { email }});
    const isAuthenticated = await Bcrypt.compare(password, user.password);
    
    if (!isAuthenticated) {
        throw Boom.notFound();
    }

    return user;
}
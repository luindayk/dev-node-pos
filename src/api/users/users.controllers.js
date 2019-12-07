import UsersDAO from './users.dao';
import * as AuthUtils from '../utils/auth.utils';

import { CREATED, NO_CONTENT } from 'http-status';

const usersDAO = new UsersDAO();

export async function create(request, h) {
    const { payload } = request;
    const user = await usersDAO.create(payload);

    return h.response(user).code(CREATED);
}

export async function login(request, h) {
    const { payload } = request;
    const user = await AuthUtils.authenticate(payload);
    const token = await AuthUtils.getToken({
        id: user.id,
        email: user.email
    });

    return { user, token };
}

export async function list(request, h) {
    const { params } = request;

    return await usersDAO.findAll(params);
}

export async function detail(request, h) {
    const { id } = request.params;

    return await usersDAO.findById(id);
}

export async function update(request, h) {
    const { payload, params } = request;

    return await usersDAO.update(params, payload);
}

export async function destroy(request, h) {
    const { params } = request;
    await usersDAO.destroy(params);

    return h.response().code(NO_CONTENT);
}

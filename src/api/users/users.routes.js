import * as UserController from './users.controllers';
import * as Schemas from './users.schemas';

export default [
    {
        method: 'GET',
        path: '/users',
        handler: UserController.list
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: UserController.detail
    },
    {
        method: 'POST',
        path: '/users',
        handler: UserController.create,
        config: {
            auth: false,
            validate: Schemas.create
        }
    },
    {
        method: 'POST',
        path: '/users/login',
        handler: UserController.login,
        config: {
            auth: false,
            validate: Schemas.create
        }
    },
    {
        method: 'PUT',
        path: '/users/{id}',
        handler: UserController.update
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: UserController.destroy
    }
];
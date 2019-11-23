import * as PostController from './posts.controllers';
import * as Schemas from './posts.schemas';

export default [
    {
        method: 'GET',
        path: '/posts',
        handler: PostController.list
    },
    {
        method: 'GET',
        path: '/posts/{id}',
        handler: PostController.detail,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    },
    {
        method: 'POST',
        path: '/posts',
        handler: PostController.create,
        config: {
            validate: {
                payload: Schemas.payload
            }
        }
    },
    {
        method: 'PUT',
        path: '/posts/{id}',
        handler: PostController.update,
        config: {
            validate: Schemas.update
        }
    },
    {
        method: 'DELETE',
        path: '/posts/{id}',
        handler: PostController.destroy,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    }
];
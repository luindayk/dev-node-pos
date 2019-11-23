import * as TagController from './tags.controllers';
import * as Schemas from './tags.schemas';

export default [
    {
        method: 'GET',
        path: '/posts/{postId}/tags',
        handler: TagController.list,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    },
    {
        method: 'GET',
        path: '/posts/{postId}/tags/{id}',
        handler: TagController.detail,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    },
    {
        method: 'POST',
        path: '/posts/{postId}/tags',
        handler: TagController.create,
        config: {
            validate: {
                payload: Schemas.payload
            }
        }
    },
    {
        method: 'PUT',
        path: '/posts/{postId}/tags/{id}',
        handler: TagController.update,
        config: {
            validate: Schemas.update
        }
    },
    {
        method: 'DELETE',
        path: '/posts/{postId}/tags/{id}',
        handler: TagController.destroy,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    }
];
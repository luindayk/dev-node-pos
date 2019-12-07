import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';

export default class PostsDAO {
    model = instances.getModel('post');

    findAll() {
        const params = {
            include: [
                'user',
                'tags'
            ]
        };
        return this.model.findAll(params);
    }

    create(data) {
        return this.model.create(data);
    }

    async findById(id) {
        const options = {
            where: { id },
            include: [
                'user',
                'tags'
            ]
        };

        return getObjectOr404(this.model, options);
    }

    async update(data, id) {
        const post = await this.findById(id);
        return post.update(data);
    }

    async destroy(id) {
        const post = await this.findById(id);
        return post.destroy();
    }
}
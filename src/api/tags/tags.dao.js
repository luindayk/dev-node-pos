import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';

export default class TagsDAO {
    model = instances.getModel('tag');

    findAll(where) {
        return this.model.findAll({ where });
    }

    async findById(where) {
        return getObjectOr404(this.model, { where });
    }

    create(tag) {
        return this.model.create(tag);
    }

    async update(where, payload) {
        const tag = await this.findById(where);
        return await tag.update(payload);
    }

    async destroy(where) {
        const tag = await this.findById(where);
        return tag.destroy();
    }
}
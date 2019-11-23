import { instances } from 'hapi-sequelizejs';

const Tag = instances.getModel('tag');
const Post = instances.getModel('post');

export default class TagsDAO {
    findAll(where) {
        return Tag.findAll({ where });
    }

    getById(where) {
        return Tag.findOne({ where });
    }

    create(tag) {
        return Tag.create(tag);
    }

    findById(id) {
        return Tag.findByPk(id);
    }

    async update(where, payload) {
        await Tag.update(payload, { where });
        return await this.getById(where.id);
    }

    destroy(where) {
        return Tag.destroy({ where });
    }
}
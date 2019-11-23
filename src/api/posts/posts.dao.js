import { instances } from 'hapi-sequelizejs';

const Post = instances.getModel('post');

export default class PostsDAO {
    findAll() {
        return Post.findAll();
    }

    create(data) {
        return Post.create(data);
    }

    findById(id) {
        return Post.findByPk(id);
    }

    async update(data, id) {
        await Post.update(data, { where: { id }});
        return await this.findById(id);
    }

    destroy(id) {
        return Post.destroy({ where: {id}});
    }
}
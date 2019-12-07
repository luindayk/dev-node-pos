import { instances } from 'hapi-sequelizejs';

export default class UsersDAO {
    model = instances.getModel('user');

    async create(user) {
        return await this.model.create(user);
    }

    async authenticate({ email, password }) {
        const user = await getObjectOr404(this.model, { where: { email }});
        const isAuthenticated = await Bcrypt.compare(password, user.password);
        
        if (!isAuthenticated) {
            throw Boom.notFound();
        }

        const token = JWT.sign({
            id: user.id,
            email: user.email
        }, 'stubJWT', { expiresIn: '24h' });

        return { user, token };
    }

    findAll() {
        return this.model.findAll();
    }

    async findById(id) {
        return getObjectOr404(this.model);
    }

    async update(where, payload) {
        const user = await this.findById({ where });
        return await user.update(payload);
    }

    async destroy(where) {
        const user = await this.findById({ where });
        return user.destroy({ where });
    }
}
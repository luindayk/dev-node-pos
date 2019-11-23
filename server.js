const Hapi = require('@hapi/hapi');
const { Sequelize, Model, DataTypes } = require('sequelize');
const { CREATED, NO_CONTENT } = require('http-status');

const sequelize = new Sequelize('posts', 'posts', 'posts', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3310
});

const data = [
    {
        // id: 1,
        title: "Novo Post",
        content: "Olá abigos, nosso primeiro post"
    },
    {
        // id: 2,
        title: "Outro Post",
        content: "Olá abigos,estamos à todo vapor produzindo conteúdo por aqui ;)"
    }
];

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    class Post extends Model {}
    Post.init({
        title: DataTypes.STRING,
        content: DataTypes.TEXT
    }, { sequelize, modelName: 'post' });
    
    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return 'Hello hapi';
        }        
    });    

    server.route({
        method: 'GET',
        path: '/posts',
        handler: async (request, h) => {
            return await Post.findAll();
        }
    });

    server.route({
        method: 'GET',
        path: '/posts/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            // const post = data.find(post => post.id === +id);            
            // return post || {};
            return await Post.findByPk(id);
        }
    });

    server.route({
        method: 'POST',
        path: '/posts',
        handler: async (request, h) => {
            const { payload } = request;
            const post = await Post.create(payload);
            return h.response(post).code(CREATED);
        }
    });

    server.route({
        method: 'PUT',
        path: '/posts/{id}',
        handler: async (request, h) => {
            const { params: { id }, payload } = request;
            await Post.update(payload, { where: { id }});
            return await Post.findByPk(id);
        }
    });

    server.route({
        method: 'DELETE',
        path: '/posts/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            await Post.destroy({ where: {id}});
            return h.response().code(NO_CONTENT);
        }
    });

    try {
        await sequelize.sync();
        Post.bulkCreate(data);
    } catch(error) {
        throw new Error(error);
    }
    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
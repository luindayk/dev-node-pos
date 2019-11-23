import Hapi from '@hapi/hapi';
import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('posts', 'posts', 'posts', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3310
});

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register([
        {
            plugin: require('hapi-sequelizejs'),
            options: [ 
                {
                    name: 'fitafit', 
                    models: [
                        './src/api/**/**.models.js'
                    ], 
                    sequelize,
                    sync: true
                }
            ]
        },
        {
            plugin: require('hapi-router'),
            options: {
                routes: 'src/api/**/**.routes.js'
            }
        }
    ]);
    
    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return 'Hello hapi';
        }        
    });    

    await server.start();
    console.log('\nServer running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
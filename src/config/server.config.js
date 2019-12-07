import Hapi from '@hapi/hapi';
import Env from './environment.config';
import Plugins from './plugins.config';
import Auth from './auth.config';

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {
    await server.register(Plugins());    
    Auth(server);
    
    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return 'Hello hapi';
        },
        config: {
            auth: false
        }        
    });

    await server.initialize();
    return server;
}

export const start = async () => {
    await init();
    await server.start();
    console.log('\nServer running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
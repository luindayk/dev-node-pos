import Lab from '@hapi/lab';
import { expect } from '@hapi/code';
import { init } from '../../../src/config/server.config';
import { OK, CREATED, BAD_REQUEST } from 'http-status';

const { beforeEach, afterEach, describe, it } = exports.lab = Lab.script();

describe('GET /posts', () => {
    let server;
    const authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3aWxseWFuQGNvbS5iciIsImlhdCI6MTU3NTc0NTg1NiwiZXhwIjoxNTc1ODMyMjU2fQ.6QQamzABKzjry8AKak_VHOChSQGqxwKQXx7DznvNZUs';

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('[/posts] should returns 200', async () => {
        const options = {
            method: 'GET',
            url: '/posts',
            headers: { authorization }
        };

        const res = await server.inject(options);
        
        expect(res.statusCode).to.be(OK);
    });
});

describe('POST /posts', () => {
    let server;
    const authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3aWxseWFuQGNvbS5iciIsImlhdCI6MTU3NTc0NTg1NiwiZXhwIjoxNTc1ODMyMjU2fQ.6QQamzABKzjry8AKak_VHOChSQGqxwKQXx7DznvNZUs';

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('[/posts] should returns 201', async () => {
        const options = {
            method: 'POST',
            url: '/posts',
            headers: { authorization },
            payload: JSON.stringify({
                title: "Novo post",
                content: "Conteúdo novo post"
            })
        };

        const res = await server.inject(options);
        
        expect(res.statusCode).to.be(CREATED);
    });

    it('[/posts] should returns 400', async () => {
        const options = {
            method: 'POST',
            url: '/posts',
            headers: { authorization },
            payload: JSON.stringify({
                title: "Novo post"
            })
        };

        const res = await server.inject(options);
        
        expect(res.statusCode).to.be(BAD_REQUEST);
    });
});
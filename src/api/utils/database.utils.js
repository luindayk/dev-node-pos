import Boom from '@hapi/boom';

export function getObjectOr404(model, options) {
    const instance = model.findOne(options);

    if (!instance) {
        throw Boom.notFound();
    }

    return instance;
}
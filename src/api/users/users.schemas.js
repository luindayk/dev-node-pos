import * as Joi from '@hapi/joi';

export const params = Joi.object({
    id: Joi.number().required()
});

export const payload = Joi.object({
    email: Joi.string().email().min(3).max(100).required(),
    password: Joi.string().min(6).required()
});

export const create = {
    payload
};

export const update = {
    params,
    payload
};

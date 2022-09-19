
const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const joi = BaseJoi.extend(extension)

module.exports.ValidateJob=joi.object({
    title:joi.string().required().escapeHTML(),
    images:joi.object({url:joi.string().required().escapeHTML(),filename:joi.string().required().escapeHTML()}),
    responsiblity:joi.string().required().escapeHTML(),
    skills:joi.string().required().escapeHTML(),
    experience:joi.string().required().escapeHTML(),
    location:joi.string().required().escapeHTML(),
}).required()



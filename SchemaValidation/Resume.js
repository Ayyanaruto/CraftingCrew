
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
const ResumeValidate=joi.object({

name:joi.string().required().escapeHTML(),
email:joi.string().required().escapeHTML(),
contact_number:joi.number().required(),field:joi.string().required().escapeHTML(),
school_name:joi.string().required().escapeHTML(),
school_qualification:joi.string().required().escapeHTML(),
school_completion_date:joi.string().escapeHTML(),
college_name:joi.string().required().escapeHTML(),
 degree_name:joi.string().required().escapeHTML(),
college_completion_date:joi.string().required().escapeHTML(),
skills:joi.string().escapeHTML(),
secondary_skills:joi.string().escapeHTML(),
role:joi.alternatives().conditional(
    joi.array(),{then:joi.array().items(joi.string().escapeHTML()),otherwise:joi.any()}
),
enterprise_name:joi.alternatives().conditional(
    joi.array(),{then:joi.array().items(joi.string().escapeHTML()),otherwise:joi.any()}
),
role_from_date:joi.alternatives().conditional(
    joi.array(),{then:joi.array().items(joi.string().escapeHTML()),otherwise:joi.any()}
),
role_to_date:joi.alternatives().conditional(
    joi.array(),{then:joi.array().items(joi.string().escapeHTML()),otherwise:joi.any()}
),
role_description:joi.alternatives().conditional(
    joi.array(),{then:joi.array().items(joi.string()),otherwise:joi.any()}
),


profile:joi.object({
    url:joi.string().escapeHTML(),
    filename:joi.string().escapeHTML()
}),
github:joi.string().escapeHTML(),
linkedin:joi.string().escapeHTML()

}).required()
module.exports=ResumeValidate
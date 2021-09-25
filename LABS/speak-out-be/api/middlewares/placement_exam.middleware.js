const Joi = require('@hapi/joi');

const AppError = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

const validatePlacementExamBody = catchAsync(
    async (req, res, next) => {
        
        const schema = Joi.object({
            // Required
            student_id: Joi.number().integer().required(),
            test: Joi.string().required(),
            test_date: Joi.string().required(),

            // Not Required
            level: Joi.number().integer(),
            fluency: Joi.number().integer(),
            accuracy: Joi.number().integer(),
            comprehension: Joi.number().integer(),
            writing_level: Joi.number().integer(),
            mc_correct: Joi.number().integer(),
            mc_marked: Joi.number().integer(),
            notes: Joi.string(),
        });

        await schema.validateAsync(req.body);
        next;
    }
);

module.exports = validatePlacementExamBody;
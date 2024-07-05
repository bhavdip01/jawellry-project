const Joi = require("joi");
const { deleteMeeting } = require("./meeting.controller");

const validator = require("../../middleware/validator").validator;

module.exports = {
    createMeeting: validator({
    body: Joi.object({
      userId: Joi.array().items(Joi.string()).required(),
      title: Joi.string().trim(),
      description:Joi.string().trim(),
      startDate:Joi.date().iso(),
      endDate:Joi.date().iso(),
      startTime:Joi.string().trim(),
      endTime:Joi.string().trim()
    }),
  }),
  getMeeting: validator({
    query: Joi.object({
      id: Joi.string(),
      userid: Joi.string(),
      startDate:Joi.date().iso(),
      endDate:Joi.date().iso(),
      page:Joi.string(),
      limit:Joi.string(),
    }),
  }),
  updateMeeting: validator({
    query: Joi.object({
      id: Joi.string(),
    }),
    body: Joi.object({
      title: Joi.string().trim(),
      description:Joi.string().trim(),
      startDate:Joi.date().iso(),
      endDate:Joi.date().iso(),
      startTime:Joi.string().trim(),
      endTime:Joi.string().trim()
    }),
  }),
  deleteMeeting: validator({
    query: Joi.object({
      id: Joi.string(),
    }),
  }),
  meetingStatusUpdate:validator({
    query: Joi.object({
      id: Joi.string(),
    }),
    body: Joi.object({
      status:Joi.string().trim(),
      reason:Joi.string().trim()
    })
  })
};


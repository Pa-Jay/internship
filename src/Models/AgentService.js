// const {mongoose} = require('./../config/mongoose');
const { Schema, model } = require("mongoose")
const agentServiceSchema = new Schema({
    agent:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    services:[{
        type: Schema.Types.ObjectId,
        ref:"Service",
        required:true
    }],
});

const AgentService = model('AgentService', agentServiceSchema);

module.exports = { AgentService }
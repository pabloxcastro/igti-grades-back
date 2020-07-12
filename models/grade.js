const mongoose = require("mongoose");

const gradeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  lastModified: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("grades", gradeSchema);

//const gradeModel = mongoose.model("grades", gradeSchema, "grades");

//module.exports.gradeModel = gradeModel;

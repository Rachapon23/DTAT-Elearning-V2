const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CourseeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
    },
    quiz: {
      type: ObjectId,
      ref: "quiz",
    },
    member:[],
    calendar: [],
    statuscourse: {
      type: Boolean,
    },
    room: {
      type: ObjectId,
      ref: "layout",
    },
    teacher: {
      type: ObjectId,
      ref: "users",
    },
    user: [{
      type: ObjectId,
      ref:"user"
    }],

    image: {
      type: String,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    topic: [],
  },
  { timestamps: true }
);

module.exports = Coursee = mongoose.model("coursee", CourseeSchema);

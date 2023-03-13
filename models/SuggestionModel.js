const { Schema, model } = require("mongoose");

const suggestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Planned', 'In Progress', 'Completed', 'in progress'],
      default: 'Planned'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);


const Suggestion = model("Suggestion", suggestionSchema);

module.exports = Suggestion;

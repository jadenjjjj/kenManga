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
      enum: ['planned', 'in progress', 'completed'],
      default: 'planned'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Suggestion = model("Suggestion", suggestionSchema);

module.exports = Suggestion;

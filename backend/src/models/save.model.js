const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User",
          required: true 
        },
    foodItem: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Save", saveSchema);


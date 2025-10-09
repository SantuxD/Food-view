const Comment = require("../models/comment.model");
const FoodItem = require("../models/food.models");

const addComment = async (req, res) => {
  try {
    // console.log("req.user:", req.user);      // check user
    // console.log("req.body:", req.body);      // check data received

    const { foodItemId, text } = req.body;
    const userId = req.user._id;

    const comment = await Comment.create({
      user: userId,
      foodItem: foodItemId,
      text,
    });

    await FoodItem.findByIdAndUpdate(foodItemId, { $inc: { commentCount: 1 } });

    res.status(200).json({ message: "Comment added successfully", comment });
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({ error: err.message });
  }
};


const getComments = async (req, res) => {
  try {
    const { foodItemId } = req.params;
    const comments = await Comment.find({ foodItem: foodItemId }).populate(
      "user",
      "name"
    );
    res.status(200).json({ comments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addComment, getComments };

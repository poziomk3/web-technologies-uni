import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  login: String,
});

export const User = mongoose.model("User", UserSchema);

const ToDoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  user_id: mongoose.Schema.Types.ObjectId,
});

export const ToDoItem = mongoose.model("ToDoItem", ToDoSchema);

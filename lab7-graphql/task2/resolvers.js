import { User, ToDoItem } from "./models.js";

const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
    todos: async () => await ToDoItem.find(),
    todo: async (_, { id }) => await ToDoItem.findById(id),
  },
  User: {
    todos: async (parent) => await ToDoItem.find({ user_id: parent.id }),
  },
  ToDoItem: {
    user: async (parent) => await User.findById(parent.user_id),
  },
  Mutation: {
    addUser: async (_, { name, email, login }) => {
      const newUser = new User({ name, email, login });
      return await newUser.save();
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return `User ${id} deleted.`;
    },
    updateUser: async (_, { id, name, email, login }) => {
      return await User.findByIdAndUpdate(
        id,
        { name, email, login },
        { new: true }
      );
    },
    addTodo: async (_, { title, completed, user_id }) => {
      const newTodo = new ToDoItem({ title, completed, user_id });
      return await newTodo.save();
    },
    deleteTodo: async (_, { id }) => {
      await ToDoItem.findByIdAndDelete(id);
      return `Todo ${id} deleted.`;
    },
    updateTodo: async (_, { id, title, completed }) => {
      return await ToDoItem.findByIdAndUpdate(
        id,
        { title, completed },
        { new: true }
      );
    },
  },
};

export default resolvers;

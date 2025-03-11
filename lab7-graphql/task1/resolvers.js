import { getRestUsersList, getRestTodosList } from "./dataFetch.js";

const resolvers = {
  Query: {
    users: async () => await getRestUsersList(),
    user: async (_, { id }) => {
      const users = await getRestUsersList();
      return users.find((user) => user.id == id);
    },
    todos: async () => await getRestTodosList(),
    todo: async (_, { id }) => {
      const todos = await getRestTodosList();
      return todos.find((todo) => todo.id == id);
    },
  },
  User: {
    todos: async (parent) => {
      const todos = await getRestTodosList();
      return todos.filter((todo) => todo.user_id == parent.id);
    },
  },
  ToDoItem: {
    user: async (parent) => {
      const users = await getRestUsersList();
      return users.find((user) => user.id == parent.user_id);
    },
  },
};

export default resolvers;

import axios from "axios";

export const getRestUsersList = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data.map(({ id, name, email, username }) => ({
      id,
      name,
      email,
      login: username,
    }));
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export const getRestTodosList = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return response.data.map(({ id, title, completed, userId }) => ({
      id,
      title,
      completed,
      user_id: userId,
    }));
  } catch (error) {
    throw new Error("Error fetching todos: " + error.message);
  }
};

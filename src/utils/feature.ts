export const saveLocalTodos = (todos: TodoItemType[]): void => {
  localStorage.setItem("myTodos", JSON.stringify(todos));
};

export const getAllTodos = (): TodoItemType[] => {
  const todos = localStorage.getItem("myTodos");
  return todos ? JSON.parse(todos) : [];
};

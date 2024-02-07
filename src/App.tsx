import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { getAllTodos, saveLocalTodos } from "./utils/feature";

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getAllTodos());
  const [title, setTitle] = useState<TodoItemType["title"]>("");

  // Checked Handler
  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodo: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.isCompleted = !i.isCompleted;
      return i;
    });
    setTodos(newTodo);
  };

  // Delete Handler
  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodo: TodoItemType[] = todos.filter((i) => i.id !== id);
    setTodos(newTodo);
  };

  // Update Handler
  const updateHandler = (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ): void => {
    const newTodo: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.title = newTitle;
      return i;
    });
    setTodos(newTodo);
  };

  // Submit Handler
  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  // UseEffect
  useEffect(() => {
    saveLocalTodos(todos);
  }, [todos]);

  return (
    <>
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              children="Todo App"
              textAlign={"center"}
              fontWeight={900}
            />
          </Toolbar>
        </AppBar>
        <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
          {todos.map((i) => (
            <TodoItem
              key={i.id}
              todo={i}
              completeHandler={completeHandler}
              deleteHandler={deleteHandler}
              updateHandler={updateHandler}
            />
          ))}
          <TextField
            fullWidth
            label={"Add Task"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && title !== "") {
                submitHandler();
              }
            }}
          />
          <Button
            variant="contained"
            sx={{ margin: "1rem 0" }}
            onClick={submitHandler}
            disabled={title === ""}
          >
            Add
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default App;

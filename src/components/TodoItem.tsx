import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type PropType = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
  updateHandler: (
    id: TodoItemType["id"],
    string: TodoItemType["title"]
  ) => void;
};

const TodoItem = ({
  todo,
  deleteHandler,
  completeHandler,
  updateHandler,
}: PropType) => {
  const [editActive, setEditActive] = useState<Boolean>(false);
  const [textVal, setTextVal] = useState<string>(todo.title);

  return (
    <>
      <Paper sx={{ padding: "1rem" }}>
        <Stack direction={"row"} alignItems={"center"}>
          {editActive ? (
            <TextField
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && textVal !== "") {
                  updateHandler(todo.id, textVal);
                  setEditActive(false);
                }
              }}
            />
          ) : (
            <Typography mr={"auto"}>{todo.title}</Typography>
          )}
          <Checkbox
            checked={todo.isCompleted}
            onChange={() => completeHandler(todo.id)}
          />
          <Button
            color="secondary"
            onClick={() => {
              setEditActive((prev) => !prev);
              updateHandler(todo.id, textVal);
            }}
          >
            {editActive ? "Done" : "Edit"}
          </Button>
          <Button
            sx={{ color: "red" }}
            onClick={() => {
              deleteHandler(todo.id);
            }}
          >
            🗑️
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default TodoItem;

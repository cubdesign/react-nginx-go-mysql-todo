import React from "react";
import { Todo, TodoStatusComplted, TodoStatusIncomplete } from "@/pages/index";
import { Box, Typography } from "@mui/material";

export type TodoRowProps = {
  todo: Todo;
  doneTodo: (id: number) => void;
  undoTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

const TodoRow: React.FC<TodoRowProps> = ({
  todo,
  doneTodo,
  undoTodo,
  removeTodo,
}) => {
  const onClickDoneHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    doneTodo(todo.id);
  };
  const onClickUndoHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    undoTodo(todo.id);
  };
  const onClickRemoveHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeTodo(todo.id);
  };
  return (
    <Box display="flex">
      {todo.status === TodoStatusComplted ? (
        <Typography
          variant="body1"
          sx={{ flexGrow: 1, textDecoration: "line-through" }}
        >
          {todo.text}
        </Typography>
      ) : (
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
          }}
        >
          {todo.text}
        </Typography>
      )}
      {todo.status === TodoStatusIncomplete ? (
        <button onClick={onClickDoneHandler}>done</button>
      ) : (
        <button onClick={onClickUndoHandler}>undo</button>
      )}
      <button onClick={onClickRemoveHandler}>remove</button>
    </Box>
  );
};

export default TodoRow;

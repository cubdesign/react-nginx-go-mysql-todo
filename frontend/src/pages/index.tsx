import type { NextPage } from "next";
import Head from "next/head";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddTodoForm from "@/components/AddTodoForm";
import TodoRow from "@/components/TodoRow";

export const TodoStatusIncomplete: number = 0;
export const TodoStatusComplted: number = 1;

export type Todo = {
  id: number;
  text: string;
  status: number;
};

const Todos: NextPage = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/todo");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const addTodo = async (text: string) => {
    console.log("add Todo");
    try {
      const res = await fetch("http://localhost:8080/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      });
      const json = await res.json();
      // TODO ここにエラー処理を書く
      await loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const doneTodo = async (id: number) => {
    console.log("done Todo");
    try {
      const res = await fetch(
        new URL(id.toString(), "http://localhost:8080/todo/"),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: TodoStatusComplted,
          }),
        }
      );
      const json = await res.json();
      // TODO ここにエラー処理を書く
      await loadData();
    } catch (err) {
      console.log(err);
    }
  };
  const undoTodo = async (id: number) => {
    console.log("undo Todo");
    try {
      const res = await fetch(
        new URL(id.toString(), "http://localhost:8080/todo/"),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: TodoStatusIncomplete,
          }),
        }
      );
      const json = await res.json();
      // TODO ここにエラー処理を書く
      await loadData();
    } catch (err) {
      console.log(err);
    }
  };
  const removeTodo = async (id: number) => {
    console.log("remove Todo");
    try {
      const res = await fetch(
        new URL(id.toString(), "http://localhost:8080/todo/"),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      // TODO ここにエラー処理を書く
      await loadData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Head>
        <title>TODO</title>
        <meta name="description" content="TODO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar component="header" position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODO
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          height: "100vh",
        }}
      >
        <Container
          sx={{
            p: 2,
          }}
        >
          <Typography variant="h3" component="h1">
            TODO
          </Typography>
          <Box>
            <AddTodoForm addTodo={addTodo} />
          </Box>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Stack gap={1} mt={2}>
              {data.map((todo) => {
                return (
                  <TodoRow
                    key={todo.id}
                    todo={todo}
                    doneTodo={doneTodo}
                    undoTodo={undoTodo}
                    removeTodo={removeTodo}
                  />
                );
              })}
            </Stack>
          )}
        </Container>
      </Box>

      <Box component="footer">
        <Container
          sx={{
            textAlign: "center",
          }}
        >
          Powered by{" "}
          <a
            href="https://cubdesign.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            cubdesign
          </a>
        </Container>
      </Box>
    </div>
  );
};

export default Todos;

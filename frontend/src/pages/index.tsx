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
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddTodoForm from "@/components/AddTodoForm";
import TodoRow from "@/components/TodoRow";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const TodoStatusIncomplete: number = 0;
export const TodoStatusCompleted: number = 1;

export type Todo = {
  id: number;
  text: string;
  status: number;
};

const Todos: NextPage = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:8080/todo");
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const addTodo = async (text: string) => {
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
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
      await loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const doneTodo = async (id: number) => {
    try {
      const res = await fetch(
        new URL(id.toString(), "http://localhost:8080/todo/"),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: TodoStatusCompleted,
          }),
        }
      );
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
      await loadData();
    } catch (err) {
      console.log(err);
    }
  };
  const undoTodo = async (id: number) => {
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
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
      await loadData();
    } catch (err) {
      console.log(err);
    }
  };
  const removeTodo = async (id: number) => {
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
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
      await loadData();
    } catch (err) {
      console.log(err);
    }
  };
  const updateTodo = async (id: number, text: string) => {
    try {
      const res = await fetch(
        new URL(id.toString(), "http://localhost:8080/todo/"),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
          }),
        }
      );
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
      await loadData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  return (
    <div>
      <Head>
        <title>TODO</title>
        <meta name="description" content="TODO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
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
            <Stack gap={2} mt={2} pr={8}>
              {data.map((todo) => {
                return (
                  <Card key={todo.id}>
                    <TodoRow
                      key={todo.id}
                      todo={todo}
                      doneTodo={doneTodo}
                      undoTodo={undoTodo}
                      removeTodo={removeTodo}
                      updateTodo={updateTodo}
                    />
                  </Card>
                );
              })}
            </Stack>
          )}
        </Container>
      </Box>
      <Footer />
    </div>
  );
};

export default Todos;

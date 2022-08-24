import type { NextPage } from "next";
import Head from "next/head";
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddTodoForm from "@/components/AddTodoForm";

export type Todo = {
  id: number;
  text: string;
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

  const doneTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("done Todo");
  };

  const removeTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("remove Todo");
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

      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODO
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <main>
        <Container>
          <h1>TODO</h1>
          <div>
            <AddTodoForm addTodo={addTodo} />
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {data.map((val) => {
                return (
                  <li key={val.id}>
                    <div>
                      {val.text}
                      <button onClick={doneTodo}>done</button>
                      <button onClick={removeTodo}>remove</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </main>

      <footer>
        <Container>
          Powered by{" "}
          <a
            href="https://cubdesign.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            cubdesign
          </a>
        </Container>
      </footer>
    </div>
  );
};

export default Todos;

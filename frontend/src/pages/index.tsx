import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

const Todos: NextPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
      const loadData =async () =>{
          try {
         const res  = await fetch("http://localhost:8080/todo")
         const data = await res.json()
          console.log(data)
          } catch (err) {
             console.log(err)
          }

      }
      loadData()
  }, []);
  return (
    <div>
      <Head>
        <title>TODO</title>
        <meta name="description" content="TODO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <h1>TODO</h1>
          <div>sss</div>
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

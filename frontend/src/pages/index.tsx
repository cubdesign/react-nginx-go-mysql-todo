import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

const Todos: NextPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
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

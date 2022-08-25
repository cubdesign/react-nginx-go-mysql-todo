import { NextPage } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Alert, Box, Button, Card, TextField, Typography } from "@mui/material";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import Head from "next/head";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useState } from "react";

type FormInput = {
  email: string;
  "new-password": string;
  "confirm-password": string;
};

const schema = yup.object({
  email: yup
    .string()
    .required("必須です")
    .email("正しいメールアドレスを入力してください"),
  "new-password": yup.string().required("必須です"),
  "confirm-password": yup
    .string()
    .oneOf([yup.ref("new-password"), null], "パスワードが一致しません"),
});

const Register: NextPage = () => {
  const auth = getAuth();

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const doRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const doRegister = (email: string, password: string) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    };
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          data.email.trim(),
          data["new-password"].trim()
        );
      // TODO login 処理
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
      }
      console.log(err);
    }
  };

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
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "min(90vw, 400px)",
            p: 2,
          }}
        >
          <Typography variant="h3" component="h1">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 3,
            }}
          >
            {serverError && <Alert severity="error">{serverError}</Alert>}
            <TextField
              label="email"
              placeholder="email"
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              variant="outlined"
            />

            <TextField
              label="password"
              type="password"
              placeholder="password"
              {...register("new-password")}
              error={errors["new-password"] ? true : false}
              helperText={errors["new-password"]?.message}
              variant="outlined"
            />

            <TextField
              label="confirm password"
              type="password"
              placeholder="password"
              {...register("confirm-password")}
              error={errors["confirm-password"] ? true : false}
              helperText={errors["confirm-password"]?.message}
              variant="outlined"
            />

            <Button type="submit" aria-label="register" variant="contained">
              Register
            </Button>
            <Link href="/login" passHref>
              <Button aria-label="login">Login</Button>
            </Link>
          </Box>
        </Card>
      </Box>
      <Footer />
    </div>
  );
};

export default Register;

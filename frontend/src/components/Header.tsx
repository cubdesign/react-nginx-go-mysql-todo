import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const doLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <AppBar component="header" position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TODO
        </Typography>
        <Link href="/login" passHref>
          <Button color="inherit">Login</Button>
        </Link>

        <Link href="/register" passHref>
          <Button color="inherit">Register</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
export default Header;

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthUserContext } from "@/lib/AuthUser";

const Header = () => {
  const auth = getAuth();
  const { authUser, logout } = useAuthUserContext();
  const router = useRouter();
  return (
    <AppBar component="header" position="sticky">
      <Toolbar>
        <Link href="/" passHref>
          <Typography
            variant="h6"
            component="a"
            sx={{
              color: "#FFFFFF",
              flexGrow: 1,
              textDecoration: "none",
            }}
          >
            TODO
          </Typography>
        </Link>

        <Link href="/login" passHref>
          <Button color="inherit">Login</Button>
        </Link>

        <Link href="/register" passHref>
          <Button color="inherit">Register</Button>
        </Link>
        <Button
          color="inherit"
          onClick={async () => {
            try {
              await auth.signOut();
              logout(() => {
                router.push("/login");
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          ログアウト
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default Header;

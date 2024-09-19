import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { User } from "firebase/auth";
import "../styles/globals.css";
import Navbar from "@/components/fragments/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Loading from "@/components/ui/Loading";

function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { pathname, push } = useRouter();

  const disabledNavbar = ["auth", "404"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        if (
          !pathname.startsWith("/auth/login") &&
          !pathname.startsWith("/auth/register")
        ) {
          push("/auth/login");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, pathname, push]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ChakraProvider>
      {!disabledNavbar.includes(pathname.split("/")[1]) && <Navbar />}
      <Component {...pageProps} />;
    </ChakraProvider>
  );
}

export default App;

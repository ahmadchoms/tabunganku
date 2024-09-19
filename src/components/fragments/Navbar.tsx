import { useRouter } from "next/router";
import NavLink from "../ui/NavLink";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  ClockCounterClockwise,
  House,
  List,
  SignOut,
} from "phosphor-react";
import { signOut } from "@/lib/auth";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import DrawerNavbar from "./DrawerNavbar";
import { useDisclosure } from "@chakra-ui/react";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      }
    };
    fetchUserData();
  }, []);
  return (
    <>
      <nav className="bg-white p-4 shadow-xl">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-zinc-400 rounded-full p-2 w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold text-lg uppercase">
                {username[0]}
              </span>
            </div>
            <span className="text-zinc-900 font-semibold">{username}</span>
          </div>
          <button className="md:hidden" ref={btnRef} onClick={onOpen}>
            <List size={24} />
          </button>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              href="/"
              icon={<House size={24} weight="fill" />}
              text="Home"
              active={router.pathname === "/"}
            />
            <NavLink
              href="/income"
              icon={<ArrowCircleUp size={24} weight="fill" />}
              text="Income"
              active={router.pathname === "/income"}
            />
            <NavLink
              href="/spending"
              icon={<ArrowCircleDown size={24} weight="fill" />}
              text="Spending"
              active={router.pathname === "/spending"}
            />
            <NavLink
              href="/history"
              icon={<ClockCounterClockwise size={24} weight="fill" />}
              text="History"
              active={router.pathname === "/history"}
            />
            <button
              onClick={signOut}
              className="text-zinc-900 hover:text-zinc-500 transition-colors duration-200"
            >
              <SignOut size={24} weight="fill" />
            </button>
          </div>
        </div>
      </nav>

      <DrawerNavbar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
};

export default Navbar;

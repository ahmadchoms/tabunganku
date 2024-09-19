import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
} from "@chakra-ui/react";
import NavLink from "../ui/NavLink";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  ClockCounterClockwise,
  House,
  SignOut,
} from "phosphor-react";
import { useRouter } from "next/router";
import { signOut } from "@/lib/auth";

interface DrawerNavbarProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}

export default function DrawerNavbar({
  isOpen,
  onClose,
  btnRef,
}: DrawerNavbarProps) {
  const router = useRouter();
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <main className="space-y-10 py-20">
            <NavLink
              href="/"
              icon={
                <House
                  size={36}
                  weight={router.pathname === "/" ? "fill" : "regular"}
                />
              }
              text="Home"
              active={router.pathname === "/"}
            />
            <NavLink
              href="/income"
              icon={
                <ArrowCircleUp
                  size={36}
                  weight={router.pathname === "/income" ? "fill" : "regular"}
                />
              }
              text="Income"
              active={router.pathname === "/income"}
            />
            <NavLink
              href="/spending"
              icon={
                <ArrowCircleDown
                  size={36}
                  weight={router.pathname === "/spending" ? "fill" : "regular"}
                />
              }
              text="Spending"
              active={router.pathname === "/spending"}
            />
            <NavLink
              href="/history"
              icon={
                <ClockCounterClockwise
                  size={36}
                  weight={router.pathname === "/history" ? "fill" : "regular"}
                />
              }
              text="History"
              active={router.pathname === "/history"}
            />
          </main>
        </DrawerBody>

        <DrawerFooter>
          <button
            onClick={signOut}
            className="text-zinc-50 transition-colors duration-200 flex items-center justify-center bg-red-500 w-full p-2 rounded-lg hover:bg-red-400"
          >
            <SignOut size={24} weight="fill" />
            <span className="ml-2 font-semibold">Sign Out</span>
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

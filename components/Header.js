import tw from "tailwind-styled-components";
import { useState, useContext } from "react";
import AuthContext from "../contexts/authContext";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const logout = () => {
    setIsOpen(!isOpen);
    localStorage.removeItem("profile");
    setUser(null);
    router.push("/auth");
  };

  return (
    <Wrapper>
      <Link href="/">
        <Title>Daavat</Title>
      </Link>
      <UserIcon>
        {user && (
          <Image
            src={`https://ui-avatars.com/api/?background=fcd400&color=363636&rounded=true&bold=true&length=1&size=128&name=${user?.data?.name}`}
            alt="Profile"
            height="42"
            width="42"
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer"
          />
        )}
        {isOpen && (
          <Dropdown>
            <ListItem onClick={logout}>Logout</ListItem>
          </Dropdown>
        )}
      </UserIcon>
    </Wrapper>
  );
}

const Wrapper = tw.div`
  p-4 mb-4 fixed bg-gray-100 w-full flex justify-between z-50
`;
const Title = tw.div`
  text-3xl font-medium pl-4 cursor-pointer
`;
const UserIcon = tw.div`
	pr-4
`;
const Dropdown = tw.div`
  absolute py-2 bg-white rounded-lg right-8 flex justify-center items-center shadow-md
`;
const ListItem = tw.button`
  w-full py-1 px-4 border-t-2 border-b-2 border-t-gray-200 border-b-gray-200 hover:bg-gray-200
`;

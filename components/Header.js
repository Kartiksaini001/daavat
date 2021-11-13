import tw from "tailwind-styled-components";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import Image from "next/image";

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <Wrapper>
      <Title>Daavat</Title>
      <UserIcon>
        {user && (
          <Image
            src={`https://ui-avatars.com/api/?background=fcd400&color=363636&rounded=true&bold=true&length=1&size=128&name=${user?.data?.name}`}
            alt="Profile"
            height="42"
            width="42"
          />
        )}
      </UserIcon>
    </Wrapper>
  );
}

const Wrapper = tw.div`
  p-4 mb-4 fixed bg-gray-100 w-full flex justify-between z-50
`;
const Title = tw.div`
  text-3xl font-medium pl-4
`;
const UserIcon = tw.div`
	pr-4
`;

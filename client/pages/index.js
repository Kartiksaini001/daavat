import tw from "tailwind-styled-components";

export default function Home() {
  return (
    <Wrapper>
      Hello
    </Wrapper>
  )
}

const Wrapper = tw.div`
  flex bg-black text-white h-screen items-center justify-center
`;

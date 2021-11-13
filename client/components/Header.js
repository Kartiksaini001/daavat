import tw from "tailwind-styled-components";

export default function Header() {
	return (
		<Wrapper>
			<Title>Daavat</Title>
		</Wrapper>
	);
}

const Wrapper = tw.div`
  p-4 mb-4
`;
const Title = tw.div`
  text-3xl font-medium
`;
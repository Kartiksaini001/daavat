import tw from "tailwind-styled-components";
import i1 from "../img/test1.jpg";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

const hotel = [
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
];

export default function Home() {
	return (
    <Wrapper>
      <Header />
      <Message>Hotels nearby you...</Message>
			<HotelGrid>
				{hotel.map((item, index) => {
					return (
						<Link href="/menu">
							<HotelCard>
								<Image
									height="1000"
									src={item.img}
									alt="Sunset in the mountains"
									placeholder="blur"
									priority
								/>
								<HotelBody>
									<div className="font-bold text-xl mb-2 text-center">{item.name}</div>
								</HotelBody>
							</HotelCard>
						</Link>
					);
				})}
			</HotelGrid>
		</Wrapper>
	);
}
// flex bg-white text-black h-screen items-center justify-center
const Wrapper = tw.div`
  p-4
`;
const Message = tw.div`
  text-3xl font-medium px-4 mb-2
`;
const HotelCard = tw.div`
  max-w-sm rounded overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 hover:bg-blue-200 transition m-auto my-4
`;
const HotelBody = tw.div`
px-6 py-4 h-2/5
`;

const HotelGrid = tw.div`
px-10 grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6 sm:grid-cols-1
`;

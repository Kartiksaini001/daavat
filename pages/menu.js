import { useState } from "react";
import tw from "tailwind-styled-components";
import { MenuList } from "../data/MenuList";

const Menu = () => {
	const [totalPrice, settotalPrice] = useState(0);
	return (
		<Wrapper>
			<Header>
				<HotelName>Hotel-1</HotelName>
			</Header>
			<ItemList>
				{MenuList.map((item, key) => (
					<Item
						key={key}
						onClick={() => {
							if (!item.selected) {
								settotalPrice(totalPrice + item.price);
								item.selected = true;
							} else {
								settotalPrice(totalPrice - item.price);
								item.selected = false;
							}
						}}
						className={`${
							!item.selected
								? "border-blue-400 border"
								: "border-green-400 bg-green-200 scale-95 border-4"
						}`}
					>
						<Name>{item.name}</Name>
						<Desc>{item.description}</Desc>
						<Price>&#x20B9;{item.price}</Price>
					</Item>
				))}
			</ItemList>
			<ConfirmContainer>
				<ConfirmButton
					className={`${
						totalPrice < 400 && "cursor-not-allowed bg-opacity-75"
					}`}
				>
					Confirm order
				</ConfirmButton>
				<Total>Total &#x20B9;{totalPrice}</Total>
			</ConfirmContainer>
		</Wrapper>
	);
};

export default Menu;

const Wrapper = tw.div`
  flex flex-col h-screen
`;
const Header = tw.div`
  bg-black text-white rounded-lg p-4 py-8 pl-6 m-4
`;
const HotelName = tw.div`
  text-5xl
`;
const ItemList = tw.div`
  flex flex-col mt-4 h-70 overflow-auto bg-white flex-1 mx-4
`;
const Item = tw.button`
  flex justify-between bg-white p-4 items-center my-2 mx-5 rounded-lg py-8 transform hover:bg-opacity-75 transition shadow-md active:bg-green-100 
`;
const Name = tw.div`
  font-medium
`;
const Desc = tw.div`
  text-sm mx-10 text-center flex-grow-0 w-1/2
`;
const Price = tw.div`
  font-medium
`;
const ConfirmContainer = tw.div`
  flex flex-row-reverse py-4 items-center pb-2 border border-t-2 bg-white
`;
const Total = tw.div`
  mr-8
`;
const ConfirmButton = tw.button`
  bg-black text-white mr-8 p-2 px-4 rounded-lg ring-2 ring-gray-600 text-lg
`;

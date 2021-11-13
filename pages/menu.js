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
					<ItemCard>
						{item.count > 0 && (
							<Counter>
								Count: {item.count}
								<CounterButtonContainer>
									<PlusButton onClick={() => (item.count = item.count + 1)}>
										+
									</PlusButton>
									<MinusButton>-</MinusButton>
								</CounterButtonContainer>
							</Counter>
						)}
						<Item
							key={key}
							onClick={() => {
								if (!item.count) {
									settotalPrice(totalPrice + item.price);
									item.count = 1;
								} else {
									settotalPrice(totalPrice - item.price);
									item.count = item.count - 1;
								}
							}}
							className={`${
								!item.count
									? "border-blue-400 border"
									: "border-green-400 bg-green-200 scale-95 border-4"
							}`}
						>
							<Name>{item.name}</Name>
							<Desc>{item.description}</Desc>
							<Price>&#x20B9;{item.price}</Price>
						</Item>
					</ItemCard>
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
				<ShortMessage>
					{totalPrice < 400 && "Total price must be atleast 400"}
				</ShortMessage>
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
//flex flex-col mt-4 h-70 overflow-auto bg-white flex-1 mx-4 justify-center
const ItemList = tw.div`
  flex flex-col flex-1 p-4 mt-4 mx-auto flex-1 overflow-auto
`;
//flex justify-between bg-white p-4 items-center my-2 mx-5 rounded-lg py-8 transform hover:bg-opacity-75 transition shadow-md active:bg-green-100  bg-gray-200`;
const ItemCard = tw.div`
	mx-auto mt-4
`;

const Item = tw.button`
  flex p-4 justify-between items-center py-8 rounded-lg transform hover:bg-opacity-75 transition shadow-md active:bg-green-100 bg-gray-200
`;
const Name = tw.div`
  font-medium
`;
const Desc = tw.div`
  text-sm mx-10 text-center flex-grow-0 w-1/2 text-gray-800
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
const ShortMessage = tw.div`
	text-xs mr-3 text-red-600
`;
const Counter = tw.div`
	flex items-center
`;
const CounterButtonContainer = tw.div`
`;
const PlusButton = tw.button`
	mx-2 text-2xl bg-green-500 p-1 px-2 rounded-lg
`;
const MinusButton = tw.button`
	mx-2 text-2xl bg-red-500 p-1 px-2 rounded-lg
`;

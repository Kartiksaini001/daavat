import tw from "tailwind-styled-components";
import { useState } from "react";

export default function ItemCard({ initialItem, totalPrice, settotalPrice }) {
  const [item, setItem] = useState(initialItem);
	return (
		<Wrapper>
			{item.count > 0 && (
				<Counter>
					Count: {item.count}
					<CounterButtonContainer>
						<PlusButton
							onClick={() => {
								setItem({ ...item, count: item.count + 1 });
								settotalPrice(totalPrice + item.price);
							}}
						>
							+
						</PlusButton>
						<MinusButton
							onClick={() => {
								setItem({ ...item, count: item.count - 1 });
								settotalPrice(totalPrice - item.price);
							}}
						>
							-
						</MinusButton>
					</CounterButtonContainer>
				</Counter>
			)}
			<Item
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
		</Wrapper>
	);
}

const Wrapper = tw.div`
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

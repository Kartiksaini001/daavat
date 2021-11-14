import tw from "tailwind-styled-components";
import { useState } from "react";

export default function ItemCard({ initialItem, totalPrice, settotalPrice }) {
  const [item, setItem] = useState(initialItem);
	return (
		<Wrapper>
			{item.count > 0 && (
				<Counter>
					Qty: {item.count}
					<CounterButtonContainer>
						<PlusButton
							onClick={() => {
								setItem({ ...item, count: item.count + 1 });
								settotalPrice(totalPrice + item.price);
								initialItem.count = initialItem.count + 1;
							}}
						>
							<span className={"mx-auto p-0 m-0 h-full font-bold text-xl"}>
								+
							</span>
						</PlusButton>
						<MinusButton
							onClick={() => {
								setItem({ ...item, count: item.count - 1 });
								settotalPrice(totalPrice - item.price);
								initialItem.count = initialItem.count - 1;
							}}
						>
							<span className={"mx-auto p-0 m-0 h-full font-bold text-xl"}>
								-
							</span>
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
						: "border-blue-300 bg-green-200 scale-95 border-4"
				}`}
			>
				<Name>{item.name}</Name>
				<Desc>{item.desc}</Desc>
				<Price>&#x20B9;{item.price}</Price>
			</Item>
		</Wrapper>
	);
}

const Wrapper = tw.div`
	mx-auto mt-4 w-full mx-auto flex flex-col px-4
`;
const Item = tw.button`
  flex p-4 justify-between items-center py-8 rounded-lg transform hover:bg-opacity-75 transition shadow-md active:bg-green-100 bg-gray-200 w-full md:w-1/2 mx-auto
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
const Counter = tw.div`
	flex items-center mx-auto border-t-2 w-full md:w-1/2 pt-2 px-2 rounded-lg justify-between
`;
const CounterButtonContainer = tw.div`
	flex items-center p-1
`;
const PlusButton = tw.button`
	mx-2 text-xl rounded-full h-8 w-8 flex items-center ring-2
`;
const MinusButton = tw.button`
	mx-2 text-xl text-white bg-black rounded-full h-8 w-8 flex items-center
`;

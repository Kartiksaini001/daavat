import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
// import { MenuList } from "../../data/MenuList";
import ItemCard from "../../components/ItemCard";
import { useRouter } from "next/router";
import axios from "axios";

const initialValue = [];

const Menu = () => {
  const [totalPrice, settotalPrice] = useState(0);
  const [isOpen, setOpen] = useState(false);
  //   const [MenuList, setMenu] = useState(initialValue);
  const [hotel, setHotel] = useState(null);
  const [load, setLoad] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  var newUser;
  useEffect(() => {
    newUser = JSON.parse(localStorage.getItem("profile"));
    console.log(hotel);
    const temp = newUser.data.email;
    axios.get("/api/hotel/menu", { params: { id } }).then((res) => {
      console.log(res);
      setHotel(res.data);
	  setLoad(false);
    });
  }, []);

  const toggle = (index) => {
    setOpen(!isOpen);
  };

  return (
		<Wrapper>
			{isOpen ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-4">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									<h4 className="text-3xl font-semibold">
										Are you sure to place order of &#x20B9;{totalPrice} ?
									</h4>
								</div>
								{/*footer*/}
								<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b py-3">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => setOpen(false)}
									>
										Close
									</button>
									<ConfirmButton
										type="button"
										onClick={() => {
											if (totalPrice < 400) {
												return;
											}
											let orderArray = [];
											hotel.menu.map((item) => {
												if (item.count > 0) {
													orderArray.push({
														name: item.name,
														price: item.price,
														count: item.count,
													});
												}
											});
											sessionStorage.setItem(
												"orderList",
												JSON.stringify(orderArray)
											);

											router.push("/order");
										}}
										className={`${
											totalPrice < hotel?.minOrder &&
											"cursor-not-allowed bg-opacity-75"
										}`}
									>
										Yes
									</ConfirmButton>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
			<Header>
				<HotelName>Welcome to {hotel?.name}</HotelName>
			</Header>
			{load && (
				<div
					className={
						"border-4 border-transparent h-8 w-8 rounded-full border-t-black animate-spin mt-8 mx-auto block "
					}
				></div>
			)}
			<ItemList>
				{!load &&
					hotel.menu.map((item, key) => (
						<ItemCard
							key={key}
							initialItem={item}
							totalPrice={totalPrice}
							settotalPrice={settotalPrice}
						/>
					))}
			</ItemList>
			<ConfirmContainer>
				<ConfirmButton
					onClick={() => totalPrice >= hotel?.minOrder && toggle()}
					className={`${
						totalPrice < hotel?.minOrder && "cursor-not-allowed bg-opacity-75"
					}`}
				>
					Confirm order
				</ConfirmButton>

				<Total>Total &#x20B9;{totalPrice}</Total>
				<ShortMessage>
					{totalPrice < hotel?.minOrder &&
						`Total price must be atleast ${hotel?.minOrder}`}
				</ShortMessage>
			</ConfirmContainer>
		</Wrapper>
	);
};

export default Menu;

const Wrapper = tw.div`
  flex flex-col h-screen pt-24
`;
const Header = tw.div`
  bg-green-500 text-white rounded-lg py-5 pl-6 m-4
`;
const HotelName = tw.div`
  text-2xl
`;
//flex flex-col mt-4 h-70 overflow-auto bg-white flex-1 mx-4 justify-center
const ItemList = tw.div`
  flex flex-col flex-1 p-4 mt-4 mx-auto flex-1 overflow-auto w-full
`;
//flex justify-between bg-white p-4 items-center my-2 mx-5 rounded-lg py-8 transform hover:bg-opacity-75 transition shadow-md active:bg-green-100  bg-gray-200`;

const Total = tw.div`
  mr-8
`;
const ConfirmButton = tw.button`
  bg-black text-white mr-8 p-2 px-4 rounded-lg ring-2 ring-gray-600 text-lg
`;
const ShortMessage = tw.div`
	text-xs mr-3 text-red-600
`;

const ConfirmContainer = tw.div`
  flex flex-row-reverse py-4 items-center pb-2 border border-t-2 bg-white
`;

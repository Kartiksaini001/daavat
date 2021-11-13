import { useState } from "react";
import tw from "tailwind-styled-components";
import { MenuList } from "../data/MenuList";

const AddMenu = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  return (
    <Wrapper>
      <HotelName>Hotel_Name</HotelName>
      <form className="w-full max-w-sm ml-auto mr-auto">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Dish Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"

            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Description
            </label>
          </div>
          <div className="md:w-2/3">
            <textarea
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="multi-line-text"
              type="text"
              placeholder="desc."
            />
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-red-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddMenu;

const Wrapper = tw.div`
  flex flex-col h-screen
`;
const HotelName = tw.div`
text-gray-500
  text-5xl
  flex
  ml-auto
  mr-auto
  mt-5
  mb-20
`;
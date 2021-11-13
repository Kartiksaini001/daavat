import { useState } from "react";
import tw from "tailwind-styled-components";
import { MenuList } from "../data/MenuList";

const addmenu = () => {
  const [totalPrice, settotalPrice] = useState(0);
  return (
    <Wrapper>
      <HotelName>Hotel_Name</HotelName>
      <form class="w-full max-w-sm ml-auto mr-auto">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              Dish Name
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              value="Jane Doe"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password"
            >
              Description
            </label>
          </div>
          <div class="md:w-2/3">
            <textarea
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="multi-line-text"
              type="text"
              placeholder="desc"
            />
          </div>
        </div>

        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button
              class="shadow bg-red-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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

export default addmenu;

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
const Form = tw.form``;
const FormField = tw.div`
    mb-4
`;
const Label = tw.label`
    ml-1
`;
const Input = tw.input`
    block rounded-lg bg-gray-200 w-full p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none
`;
const FormContainer = tw.div`
    max-w-sm bg-white text-black mx-auto p-5 rounded-lg
`;

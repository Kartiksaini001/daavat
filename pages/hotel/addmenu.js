import { useState,useEffect } from "react";
import tw from "tailwind-styled-components";
import axios from "axios";
import { useRouter } from 'next/router'

import { MenuList } from "../../data/MenuList";

const AddMenu = () => {
  const [title,setTitle]=useState(null);
  const [email,setEmail]=useState(null);
  const [values, setValues] = useState({
    name: '',
    desc: '',
    price: ''
});
const router=useRouter();
  useEffect(() => {
    const newUser = JSON.parse(localStorage.getItem("profile"));
    setTitle(newUser.data.name);
    setEmail(newUser.data.email)
},[]);

const handleChange = (name)=> (e) => {
  setValues({ ...values, [e.target.id]: e.target.value });
};


const handleSubmit=(e) =>{
  const newDish={
    email: email,
    name: values.name,
    desc: values.desc,
    price: values.price,
  }
  axios.patch("/api/hotel/menu",newDish)
  .then((res) => {
     console.log(res);
     router.push("/hotel/dashboard");
  })

}
  return (
    <Wrapper>
      <HotelName>{title}</HotelName>
      <form className="w-full max-w-sm ml-auto mr-auto" onSubmit={(e) => handleSubmit(e)}>
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
              id="name"
              type="text"
              value={values.name}
              onChange={handleChange()}
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
             value={values.desc}
             onChange={handleChange()}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="desc"
              type="text"
              placeholder="desc."
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Price
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
              id="price"
              
              value={values.price}
              onChange={handleChange()}
              placeholder="price"
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <input
              className="shadow bg-red-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:flex md:items-center"
              type="submit"
              value="Add"
           />
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddMenu;

const Wrapper = tw.div`
  flex flex-col h-screen p-24
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
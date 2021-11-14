import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import AuthContext from "../../contexts/authContext";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const AblyReceiveOrder = dynamic(
  () => import("../../components/AblyReceiveOrder"),
  { ssr: false }
);

const initialValue = [];

export default function Dashboard() {
  const router = useRouter;
  const { user } = useContext(AuthContext);
  const [menu, setMenu] = useState(initialValue);
  const [load, setLoad] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [gone, setGone] = useState(null);
  const [del, setDel] = useState(null);
  const [alert, setAlert] = useState(false);
  const [email, setEmail] = useState(null);
  const [values, setValues] = useState({
    lat: "",
    long: "",
    minOrder: "",
  });

  useEffect(() => {
    const newUser = JSON.parse(localStorage.getItem("profile"));
    const id = newUser.data.id;
    const temp = newUser.data.email;
    axios.get("/api/hotel/menu", { params: { id } }).then((res) => {
      setMenu(res.data.menu);
      setEmail(temp);
      setLoad(false);
    });
  }, []);

  const toggle = (index) => {
    if (index !== null) {
      setDel(index);
      const name = menu[index].name;
      setGone(name);
    }

    setOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      email: email,
      mapLocation: {
        lat: values.lat,
        lng: values.long,
      },
      minOrder: values.minOrder,
    };
    axios
      .patch("/api/hotel/updateHotel", newData)
      .then((res) => {
        console.log(res);
        router.push("/hotel/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = () => (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleDelete = async () => {
    const id = menu[del]._id;

    axios.patch(`/api/hotel/menu/${id}`, { email }).then((res) => {
      setMenu(res.data);
      setAlert(true);
      toggle(null);
    });
  };

  return (
    <Wrapper>
      <AblyReceiveOrder />
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    You want to remove {`"${gone}"`}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleDelete()}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="text-4xl mb-10 ">
        <p className="font-extrabold"> Hello,</p>
      </div>
      <HotelForm onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Longitude
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="long"
                type="text"
                placeholder="78.120"
                value={values.long}
                onChange={handleChange()}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Latitude
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="lat"
                type="text"
                placeholder="102.87"
                value={values.lat}
                onChange={handleChange()}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="min-order"
              >
                Min Order
              </label>
              <div className="relative">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="minOrder"
                  type="number"
                  placeholder="500"
                  value={values.minOrder}
                  onChange={handleChange()}
                />
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 mt-6 ">
              <input
                className="appearance-none block w-full bg-black-200 text-white-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                id="grid-city"
                type="submit"
                value="Update"
              />
            </div>
          </div>
        </div>
      </HotelForm>
      <Menu>
        <div className="grid place-items-center">
          <button className="">
            <Link href="./addmenu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 ml-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <strong className="font-bold text-lg block">Add Dish</strong>
          </button>
          {load && (
            <div
              className={
                "border-4 border-transparent h-8 w-8 rounded-full border-t-black animate-spin mt-8 block "
              }
            ></div>
          )}
        </div>
        <br />
        <br /> <br /> <br /> <br /> <br />
        {alert && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5 mb-5"
            role="alert"
          >
            <strong className="font-bold">
              Foodies want it back but sadly&nbsp; &nbsp;&nbsp;
            </strong>
            <span className="block sm:inline">
              {`"${gone}"`} is removed from your offerings
            </span>
          </div>
        )}
        <HotelGrid>
          {!load &&
            menu?.map((item, index) => {
              return (
                <div key={index}>
                  <a className="cursor-pointer" onClick={() => toggle(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <HotelCard>
                    <div className="font-bold text-xl mb-2 text-center mt-2">
                      {item.name}
                    </div>
                    <HotelBody>
                      <div className="text-md mb-2">{item.desc}</div>
                      <div className="text-lg mb-2 text-right">
                        &#x20B9;{item.price}
                      </div>
                    </HotelBody>
                  </HotelCard>
                </div>
              );
            })}
        </HotelGrid>
      </Menu>
    </Wrapper>
  );
}
// flex bg-white text-black h-screen items-center justify-center
const Wrapper = tw.div`
  p-4 flex flex-col h-screen pt-24
`;

const HotelForm = tw.form`
mb-6 w-full max-w-lg  ml-auto mr-auto
`;

const Menu = tw.div`
mt-16
`;

const HotelCard = tw.div`
  max-w-sm rounded pt-16 p-9 overflow-hidden shadow-lg  transform hover:scale-105 hover:bg-blue-200 transition m-auto my-4
`;
const HotelBody = tw.div`
 py-4 h-2/5
`;

const HotelGrid = tw.div`
px-10 grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 sm:grid-cols-1
`;

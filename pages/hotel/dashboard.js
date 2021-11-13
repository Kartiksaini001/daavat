
import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header.js";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import Map from "../../components/Map.js";
import axios from "axios";
import { useEffect,useState } from "react";


const initialValue = [];

export default function Dashboard() {
    // const { user } = useContext(AuthContext);
    const [menu, setMenu] = useState(initialValue);
    const [load,setLoad]= useState(true);
    const [isOpen, setOpen ] = useState(false);
    const [gone, setGone] = useState(null);
    const [ del, setDel] = useState(null);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        const newUser = JSON.parse(localStorage.getItem("profile"));
        const email=newUser.data.email
        console.log(email);
    axios
    .get("/api/hotel/menu",{params: {email:email}})
    .then((res) => {
       setMenu(res.data);
    })
},[]);

const toggle = (index) => {
    if(index!==null)
    {
    setDel(index);
    const name = menu[index].name;
    setGone(name)
    }

    setOpen(!isOpen);
  };

  const handleDelete = async() => {
    console.log(del);
    const id = menu[del]._id;
            setAlert(true);
            toggle(null);
  };

   
	return (
    <Wrapper>
        {isOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                   You want to delete "{gone}"
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
      ) : null
        }
        <MapContainer>
      <Map/>
      </MapContainer>
      <Menu>
          <Link href="./addmenu">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
</svg>
</Link>
{alert&&(
   <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5 mb-5" role="alert">
   <strong class="font-bold">Foodies want it back &nbsp; &nbsp;&nbsp;</strong>
   <span class="block sm:inline">"{gone}" is deleted</span>
 </div>
)
}
<HotelGrid>
        {menu&&(menu.map((item, index) => {
          return (
              <div>
            <a
            onClick={() => toggle(index)
            }   
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
</svg>
          </a>
              <HotelCard>
              <div className="font-bold text-xl mb-2 text-center mt-2">
                    {item.name}
                  </div>
                <HotelBody>
                <div className="text-md mb-2">
                    {item.desc}
                  </div>
                  <div className="text-lg mb-2 text-right">
                  &#x20B9;{item.price}
                  </div>
                </HotelBody>
              </HotelCard>
              </div>
          );
        }))}
      </HotelGrid>
      </Menu>
		</Wrapper>
	);
}
// flex bg-white text-black h-screen items-center justify-center
const Wrapper = tw.div`
  p-4 flex flex-col h-screen pt-24
`;

const MapContainer= tw.div`
mb-6
`;

const Menu= tw.div`
mt-16
`;

const HotelCard = tw.div`
  max-w-sm rounded pt-16 p-9 overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 hover:bg-blue-200 transition m-auto my-4
`;
const HotelBody = tw.div`
 py-4 h-2/5
`;

const HotelGrid = tw.div`
px-10 grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 sm:grid-cols-1
`;

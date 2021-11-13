import tw from "tailwind-styled-components";
import i1 from "../img/test1.jpg";
import Image from 'next/image'
import Link from 'next/link'


const hotel=[
  {
    img:i1,
    name:"xyz",

  },
  {
    img:i1,
    name:"xyz",

  },
  {
    img:i1,
    name:"xyz",

  },
  {
    img:i1,
    name:"xyz",

  },
  {
    img:i1,
    name:"xyz",

  },
  {
    img:i1,
    name:"xyz",

  },
]

export default function Home() {
  return (
    <Wrapper>
      <HotelGrid>
        {hotel.map((item, index) => {
          return(
            <Link href="/">
     <HotelCard>
  <Image className="h-64" height="2000" src={item.img} alt="Sunset in the mountains" placeholder="blur" priority/>
  <HotelBody>
    <div className="font-bold text-xl mb-2">{item.name}</div>
  </HotelBody>
</HotelCard>
</Link>
          )
        })
}
</HotelGrid>
    </Wrapper>
  )
}

const Wrapper = tw.div`
  flex bg-white text-black h-screen items-center justify-center
`;

const HotelCard= tw.div`
max-w-sm rounded overflow-hidden shadow-lg cursor-pointer
`;
const HotelBody= tw.div`
px-6 py-4 h-2/5
`;

const HotelGrid= tw.div`
grid grid-cols-3 gap-6
`
import Image from "next/image";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter()
  return (
    <header className="bg-white py-4 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <a href="/">
            <Image
              src="/images/pngegg.png"
              alt="Logo"
              width={200}
              height={50}
            />
          </a>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-400 rounded-md py-2 px-4"
            style={{ color: "black" }}
          />
          <button className="rounded-md ml-4 bg-[#1cb092] hover:opacity-75 text-white py-2 px-4 rounded-r-md font-bold">
            Search
          </button>
          <button className="rounded-md ml-4 bg-[#1cb092] hover:opacity-75 text-white py-2 px-4 font-bold" onClick={()=>router.push('user/login')}>
            Log In
          </button>
          <button className="rounded-md ml-4 bg-[#1cb092] hover:opacity-75 text-white py-2 px-4">
            <Image
              src="/images/cart-white.png"
              alt="Cart"
              width={24}
              height={20}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

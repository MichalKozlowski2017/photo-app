import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-black text-white flex flex-row h-16 items-center justify-between px-5 fixed w-full z-50 top-0">
      <div>
        <Link href="/" className="cursor-pointer">
          <h1 className="text-xl cursor-pointer"><span className="font-bold">Michal Kozlowski</span> Portfolio</h1>
        </Link>
      </div>
      <div className="flex">
        <div className="inline-block mx-2 cursor-pointer">
          <Link href="/bio">Bio</Link>
        </div>
        <div className="inline-block mx-2 cursor-pointer">
          <Link href="/gear">Gear</Link>
        </div>
        <div className="inline-block mx-2 cursor-pointer">
          <Link href="/contact">Contact</Link>
        </div>
        
      </div>
    </header>
  )
}

export default Header
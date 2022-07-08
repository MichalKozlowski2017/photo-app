import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-black text-white flex flex-row h-16 items-center justify-between px-5">
      <div>
        <h1 className="text-xl"><span className="font-bold">Michal Kozlowski</span> Portfolio</h1>
      </div>
      <div className="flex">
        <div className="inline-block mx-2 cursor-pointer">
          <Link href="/">Bio</Link>
        </div>
        <div className="inline-block mx-2 cursor-pointer">
          <Link href="/">Gear</Link>
        </div>
        <div className="inline-block mx-2 cursor-pointer">
          <Link href="/">Contact</Link>
        </div>
        
      </div>
    </header>
  )
}

export default Header
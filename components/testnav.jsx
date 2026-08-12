import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Sparkles } from "lucide-react"

function Navbar() {
  return (
    <header className="bg-[#F6F3FC] px-6 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link
              href="https://www.skillntell.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              aria-label="Skill & Tell official website"
            >
              <Image
                src="/darklogo.png"
                width={100}
                height={100}
                alt="Skill & Tell logo"
                className="mx-auto lg:mx-0"
              />
            </Link>

        <nav className="flex items-center gap-8">

            <Link href="/" className=" shadow-sm flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-[#2E1065] hover:bg-[#F6F3FC] bg-white ">
              Back Home
              <ArrowLeft className="h-4 w-4" />
            </Link>


        </nav>
      </div>
    </header>
  )
}

export default Navbar
import Link from "next/link"
import Image from "next/image"
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
          <a
            href="#departments"
            className="hidden text-sm font-medium text-slate-600 hover:text-[#2E1065] sm:block"
          >
            Departments
          </a>

          <Link
            href="/test"
            className="flex flex-col items-start rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-[#2E1065] shadow-sm transition hover:bg-slate-50"
          >
            Take the test
            
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
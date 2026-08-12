"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ChevronDown,
} from "lucide-react"
import { motion } from "framer-motion"

function MainSection() {
  return (
    <section className="relative overflow-hidden bg-[#F4F1FA] pb-18">
      <div className="mx-auto grid grid-cols-1 items-center gap-10 px-6 py-20 md:px-16 lg:grid-cols-2">

        {/* Left: copy */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <motion.div
            className="mb-6 flex items-center gap-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
            </span>

            <span className="text-xs font-bold tracking-widest text-slate-500">
              YOU MIGHT BE EXACTLY WHAT WE NEED
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl font-semibold leading-[1.05] text-[#2E1065] sm:text-7xl"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            Find your {" "}
            <span className="relative inline-block text-[#ff6d00]">
             place
            </span>{" "}
           in the club.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-md text-lg text-slate-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: "easeOut",
            }}
          >
          Six departments. Different skills, different personalities, one club. Take the test and discover where you belong.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.5,
              ease: "easeOut",
            }}
          >
            <Link
              href="/test"
              className="relative z-20 inline-flex items-center gap-2 rounded-xl bg-[#280840] px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-violet-900"
            >
             Discover your department
              <ArrowRight className="h-4 w-4" />
            </Link>


          </motion.div>
        </motion.div>

        {/* Right: illustration */}
        <motion.div
          className="relative z-0"
          initial={{
            opacity: 0,
            x: 50,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          <Image
            src="/main.png"
            alt="Skill & Tell team"
            width={900}
            height={900}
            className="
              w-full
              max-w-[750px]
              cursor-pointer
              object-contain
              transition-transform
              duration-500
              ease-out
              hover:scale-[1.04]
            "
          />
        </motion.div>

      </div>
    </section>
  )
}

export default MainSection
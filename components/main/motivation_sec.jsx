"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

function MotivationSection() {
  return (
    <section className="flex flex-col items-center bg-[#F6F3FC] px-6 py-16">
      <motion.div
        className="mx-auto flex min-h-[520px] max-w-6xl flex-col items-center justify-center rounded-[28px] bg-cover bg-center px-10 py-16 text-center sm:px-16"
        style={{ backgroundImage: "url('/background.webp')" }}
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.97,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <motion.h2
          className="max-w-2xl text-5xl leading-[1.1] text-white sm:text-6xl"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          Come as you are. Leave with a direction.
        </motion.h2>

        <motion.p
          className="mt-6 max-w-md text-base leading-relaxed text-violet-200 italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.35,
            ease: "easeOut",
          }}
        >
         “You don't have to know where you're going.
You just have to start somewhere.”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          <Link
            href="/test"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-[#ff6d00] px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#f1a10d]"
          >
            Find my fit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default MotivationSection
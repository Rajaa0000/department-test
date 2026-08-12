"use client"

import QUESTIONS_BY_DEPARTMENT from "@/data/questions"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import departments from "@/data/departments"

const SCALE = [
  { value: 0, label: "Not me" },
  { value: 1, label: "A little" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Often" },
  { value: 4, label: "Very me" },
]

const QUESTION_POOL = departments.flatMap((dept, deptIndex) =>
  (QUESTIONS_BY_DEPARTMENT[dept.name] ?? []).map((text) => ({
    text,
    deptIndex,
  }))
)

const TOTAL_QUESTIONS = QUESTION_POOL.length
const PAGE_SIZE = 3
const TOTAL_PAGES = Math.ceil(TOTAL_QUESTIONS / PAGE_SIZE)

const pageVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 32 : -32,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -32 : 32,
  }),
}

const stepVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// safe slug for image filenames (handles spaces / mixed case dept names)
function slug(name) {
  return name.trim().replace(/\s+/g, "-")
}
function TestFlow() {
  const [step, setStep] = useState("quiz")
  const [groupIndex, setGroupIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState(Array(TOTAL_QUESTIONS).fill(null))

  // SSR-safe: start with the unshuffled pool so server and client render
  // identical markup on first pass. The actual shuffle only ever runs
  // client-side, inside useEffect below — never during render.
  const [shuffledQuestions, setShuffledQuestions] = useState(QUESTION_POOL)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setShuffledQuestions(shuffle(QUESTION_POOL))
    setMounted(true)
  }, [])

  const pageQuestions = shuffledQuestions.slice(
    groupIndex * PAGE_SIZE,
    groupIndex * PAGE_SIZE + PAGE_SIZE
  )

  const isLastGroup = groupIndex === TOTAL_PAGES - 1

  const groupAnswered = pageQuestions.every(
    (_, i) => answers[groupIndex * PAGE_SIZE + i] !== null
  )

  const answeredCount = answers.filter((a) => a !== null).length
  const progress = Math.round((answeredCount / TOTAL_QUESTIONS) * 100)

  function setAnswer(questionIndexInGroup, value) {
    const globalIndex = groupIndex * PAGE_SIZE + questionIndexInGroup
    setAnswers((prev) => {
      const next = [...prev]
      next[globalIndex] = value
      return next
    })
  }

  function handleNext() {
    if (!groupAnswered) return

    if (isLastGroup) {
      setStep("results")
    } else {
      setDirection(1)
      setGroupIndex((g) => g + 1)
    }
  }

  function handleBack() {
    setDirection(-1)
    setGroupIndex((g) => Math.max(0, g - 1))
  }

  function handleRestart() {
    setShuffledQuestions(shuffle(QUESTION_POOL)) // client-triggered, safe here
    setAnswers(Array(TOTAL_QUESTIONS).fill(null))
    setGroupIndex(0)
    setDirection(1)
    setStep("quiz")
  }

  const results = useMemo(() => {
    const scored = departments
      .map((dept, deptIndex) => {
        const sum = shuffledQuestions.reduce((acc, q, i) => {
          if (q.deptIndex !== deptIndex) return acc
          return acc + (answers[i] ?? 0)
        }, 0)

        return { ...dept, score: sum }
      })
      .sort((a, b) => b.score - a.score)

    // guard: only one department configured → no runner-up to show
    return { best: scored[0], second: scored[1] ?? null }
  }, [answers, shuffledQuestions])

  // Avoid flashing the unshuffled question order before the client-side
  // shuffle runs. Keeps server/client markup identical during hydration.
  if (!mounted) {
    return (
      <section className="min-h-screen bg-[#F6F3FC] px-4 pt-1 pb-10">
        <div className="mx-auto max-w-4xl rounded-3xl px-4 pt-0 sm:p-12">
          <div className="mt-0 h-2 w-full overflow-hidden rounded-full bg-[#E8DDF0]" />
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[#F6F3FC] px-4 pt-1 pb-10">
      <div className="mx-auto max-w-4xl rounded-3xl px-4 pt-0 sm:p-12">
        <AnimatePresence mode="wait">
          {step === "quiz" && (
            <motion.div
              key="quiz"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* progress bar */}
              <div className="mt-0 h-2 w-full overflow-hidden rounded-full bg-[#E8DDF0]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#F58A00] to-[#6B3A82] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-10 relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={groupIndex}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-12"
                  >
                    {pageQuestions.map((question, i) => {
                      const globalIndex = groupIndex * PAGE_SIZE + i
                      const selected = answers[globalIndex]

                      return (
                        <div key={globalIndex}>
                          <h2 className="text-center font-medium text-xl leading-snug text-[#280840] sm:text-3xl">
                            {question.text}
                          </h2>

                          <div className="mt-6 flex items-center justify-between px-1 text-[11px] sm:text-xs font-medium">
                            <span className="text-[#81718D]">
                              Doesn't sound like me
                            </span>

                            <span className="text-[#6B3A82]">
                              Sounds exactly like me
                            </span>
                          </div>

                          {/* grid instead of justify-between: bounds each option to an equal
                              column so nothing overflows/clips on narrow viewports */}
                          <div className="mt-3 grid grid-cols-5 gap-1 sm:gap-2">
                            {SCALE.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => setAnswer(i, option.value)}
                                className="flex flex-col items-center gap-1.5"
                              >
                                <span
                                  className={`flex aspect-square w-8 shrink-0 sm:w-11 items-center justify-center rounded-full border-2 transition ${
                                    selected === option.value
                                      ? "border-[#280840] bg-[#280840]"
                                      : "border-[#D8C6E2] bg-white hover:border-[#9B6BB3]"
                                  }`}
                                />

                                <span className="text-center text-[10px] sm:text-xs leading-tight text-[#81718D]">
                                  {option.label}
                                </span>

                                <span className="hidden sm:block text-xs text-[#A79AAF]">
                                  {option.value}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* footer nav */}
              <div className="mt-12 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={groupIndex === 0}
                  className="flex items-center gap-2 rounded-xl border border-[#D8C6E2] px-4 sm:px-5 py-3 text-sm font-semibold text-[#2E1065] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <span className="text-sm text-[#A79AAF]">
                  {groupIndex + 1} / {TOTAL_PAGES}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!groupAnswered}
                  className="flex items-center gap-2 rounded-xl bg-[#6B3A82] px-4 sm:px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5B2A78] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isLastGroup ? "See my results" : "Next"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "results" && (
            <motion.div
              key="results"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="mt-4 md:mt-0 text-center"
            >
              <p className="text-sm font-semibold tracking-widest text-[#6B3A82]">
                YOUR BEST FIT
              </p>

              <div
                className="mx-auto mt-6 flex md:h-40 md:w-40 w-32 h-32 items-center justify-center overflow-hidden rounded-full shadow-md"
                style={{ backgroundColor: results.best.color }}
              >
                <Image
                  src={`/departments/${slug(results.best.name)}.png`}
                  alt={results.best.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>

              <h2 className="mt-5 font-serif text-3xl text-[#280840] sm:text-4xl">
                {results.best.name}
              </h2>

              <p
                className="mt-1 text-lg sm:text-xl font-semibold"
                style={{ color: results.best.color }}
              >
                {results.best.title}
              </p>

              <p className="mx-auto mt-3 max-w-sm text-[#81718D]">
                {results.best.desc}
              </p>

              {/* only render runner-up card if one exists */}
              {results.second && (
                <div className="mx-auto mt-10 flex max-w-sm items-center gap-4 rounded-2xl border border-[#E8DDF0] bg-[#F6F3FC] p-4 text-left">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full"
                    style={{ backgroundColor: results.second.color }}
                  >
                    <Image
                      src={`/departments/${slug(results.second.name)}.png`}
                      alt={results.second.name}
                      width={60}
                      height={60}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-widest text-[#A79AAF]">
                      SECOND BEST FIT
                    </p>

                    <p className="font-semibold text-[#280840]">
                      {results.second.name}
                    </p>

                    <p
                      className="text-xs font-medium"
                      style={{ color: results.second.color }}
                    >
                      {results.second.title}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="rounded-xl border border-[#D8C6E2] px-6 py-3 text-sm font-semibold text-[#2E1065] hover:bg-[#F6F3FC]"
                >
                  Take the test again
                </button>

                <Link
                  href="/"
                  className="rounded-xl bg-[#6B3A82] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5B2A78]"
                >
                  Go to home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default TestFlow

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaDiscord,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#280840]">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
        <div className="flex flex-col items-center gap-12 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          {/* Logo and description */}
          <div className="max-w-xs space-y-4">
            <Link
              href="https://www.skillntell.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              aria-label="Skill & Tell official website"
            >
              <Image
                src="/whitelogo.png"
                width={170}
                height={170}
                alt="Skill & Tell logo"
                className="mx-auto lg:mx-0"
              />
            </Link>

            <p className="text-sm leading-relaxed text-purple-200/70">
              A community of learners and innovators. Together we share
              skills, ideas, and growth.
            </p>
          </div>

          {/* Social / contact buttons */}
          <div className="flex w-full max-w-md flex-col gap-3">
            <Link
              href="https://www.instagram.com/skillntell.club?igsh=MTFzZ3dpMTY2cGV5bg=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full bg-white/95 px-5 py-3 transition hover:bg-white"
            >
              <FaInstagram className="h-5 w-5 text-[#E1306C]" />
              <span className="text-sm font-medium text-slate-500">
                Follow us for updates!
              </span>
            </Link>

            <Link
              href="#"
              className="flex items-center gap-3 rounded-full bg-white/95 px-5 py-3 transition hover:bg-white"
            >
              <FaDiscord className="h-5 w-5 text-[#5865F2]" />
              <span className="text-sm font-medium text-slate-500">
                Join our community
              </span>
            </Link>

            <Link
              href="https://www.linkedin.com/company/skill-tell-club/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full bg-white/95 px-5 py-3 transition hover:bg-white"
            >
              <FaLinkedinIn className="h-5 w-5 text-[#0A66C2]" />
              <span className="text-sm font-medium text-slate-500">
                Let's connect and collaborate
              </span>
            </Link>

            <Link
              href="mailto:skill.and.tell@ensia.edu.dz"
              className="flex items-center gap-3 rounded-full bg-white/95 px-5 py-3 transition hover:bg-white"
            >
              <FaEnvelope className="h-5 w-5 text-[#EA4335]" />
              <span className="text-sm font-medium text-slate-500">
                Reach out for collaborations!
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex items-center justify-center gap-2 text-sm text-purple-200/60">
            <span>
              &copy; Skill & Tell 2025. All rights reserved. Crafted with
            </span>
            <Heart className="h-5 w-5 text-[#F43F5E]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
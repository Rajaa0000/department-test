"use client";

import { useRef } from "react";
import Image from "next/image";
import departments from "@/data/departments";

function DeptCard({ dept }) {
  return (
    <article className="dept-card" >
      <div className="dept-card__badge">
        <Image
          className="dept-card__image"
          src={`/departments/${dept.name}.png`}
          width={320}
          height={320}
          alt={dept.name}
          sizes="(max-width: 767px) 60vw, (max-width: 1023px) 30vw, 120px"
        />
      </div>

      <div className="dept-card__text">
        <p className="dept-card__title" >{dept.title}</p>
        <h3 className="dept-card__name">{dept.name}</h3>
        
        <p className="dept-card__desc">{dept.desc}</p>
      </div>
    </article>
  );
}

export default function DepartmentsSection() {
  const scrollRef = useRef(null);

  const scrollDepartments = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "next" ? 300 : -300,
      behavior: "smooth",
    });
  };

  return (
    <section className="dept-section" id="departments">
      
      <div className="dept-frame">
        <div className="dept-mobile">
          <button
            className="dept-arrow dept-arrow--prev"
            type="button"
            onClick={() => scrollDepartments("prev")}
            aria-label="Previous departments"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="dept-mobile__scroll" ref={scrollRef}>
            {departments.map((dept) => (
              <DeptCard key={dept.name} dept={dept} />
            ))}
          </div>

          <button
            className="dept-arrow dept-arrow--next"
            type="button"
            onClick={() => scrollDepartments("next")}
            aria-label="Next departments"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="dept-tablet">
          <div className="dept-grid">
            {departments.map((dept) => (
              <DeptCard key={dept.name} dept={dept} />
            ))}
          </div>
        </div>

        <div className="dept-desktop">
          <div className="dept-grid">
            {departments.map((dept) => (
              <DeptCard key={dept.name} dept={dept} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .dept-section {
          position: relative;
          padding: 3rem 1rem;
          overflow: hidden;
          background: white;
        }

        .dept-frame {
          max-width: 1180px;
          margin: 0 auto;
        }

        /* ---------- card shape ---------- */

        .dept-card {
          --accent: #6c4fd6;
          --accent-soft: #ede8fb;
          --accent-wash: #f7f5fd;
          position: relative;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--accent-wash);
          border: 1px solid rgba(22, 20, 26, 0.06);
          padding: 2.75rem 1.5rem 2rem;
          text-align: center;
          border-radius: 18px;
          box-shadow: 0 14px 30px rgba(22, 20, 26, 0.06);
          transition: transform 0.28s ease, box-shadow 0.28s ease,
            border-color 0.28s ease;
        }

        .dept-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(22, 20, 26, 0.12);
          border-color: color-mix(in srgb, var(--accent) 30%, transparent);
        }

        /* ---------- accent colors cycle across cards ---------- */
        /* each accent pairs with a very light wash used as the card bg */

        .dept-mobile__scroll .dept-card:nth-of-type(5n + 1),
        .dept-grid .dept-card:nth-of-type(5n + 1) {
          --accent: #6c4fd6;
          --accent-soft: #ede8fb;
          --accent-wash: #f6f3fc;
        }
        .dept-mobile__scroll .dept-card:nth-of-type(5n + 2),
        .dept-grid .dept-card:nth-of-type(5n + 2) {
          --accent: #3f8f6d;
          --accent-soft: #e3f3ea;
          --accent-wash: #f2f8f5;
        }
        .dept-mobile__scroll .dept-card:nth-of-type(5n + 3),
        .dept-grid .dept-card:nth-of-type(5n + 3) {
          --accent: #c9791f;
          --accent-soft: #faecda;
          --accent-wash: #fbf4e9;
        }
        .dept-mobile__scroll .dept-card:nth-of-type(5n + 4),
        .dept-grid .dept-card:nth-of-type(5n + 4) {
          --accent: #b8527a;
          --accent-soft: #f9e6ee;
          --accent-wash: #fbf1f4;
        }
        .dept-mobile__scroll .dept-card:nth-of-type(5n + 5),
        .dept-grid .dept-card:nth-of-type(5n + 5) {
          --accent: #2f7fb0;
          --accent-soft: #e2eff7;
          --accent-wash: #f0f6fa;
        }

        /* ---------- icon badge ---------- */

        .dept-card__badge {
          position: relative;
          width: 84px;
          height: 84px;
          margin-bottom: 0.75rem;
          border-radius: 26% 74% 68% 32% / 38% 28% 72% 62%;
          background: var(--accent-soft);
          border: 1px solid rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: border-radius 0.28s ease;
        }

        .dept-card:hover .dept-card__badge {
          border-radius: 42% 58% 55% 45% / 45% 40% 60% 55%;
        }

        .dept-card__image {
          display: block;
          width: 80px;
          height: 80px;
          object-fit: contain;
          transform: scale(1);
          transition: transform 0.28s ease;
        }

        .dept-card:hover .dept-card__image {
          transform: scale(1.12);
        }

        .dept-card__text {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          margin-top: 0.9rem;
        }

        .dept-card__title {
          font-family: "Space Grotesk", "Inter", sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          line-height: 1.2;
          text-transform: uppercase;
          color: var(--accent);
          margin: 0 0 1rem;
        }

        .dept-card__name {
          font-family: "Space Grotesk", "Inter", sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.2;
          color: #17141c;
          
        }



        .dept-card__desc {
          max-width: 230px;
          font-size: 0.87rem;
          line-height: 1.6;
          color: #746f7a;
          margin-top: 0.5rem;
        }

        /* ---------- mobile carousel ---------- */

        .dept-desktop,
        .dept-tablet {
          display: none;
        }

        .dept-mobile {
          position: relative;
          display: block;
        }

        .dept-mobile__scroll {
          display: flex;
          gap: 1.1rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          padding: 1.5rem 3.25rem 1rem;
        }

        .dept-mobile__scroll::-webkit-scrollbar {
          display: none;
        }

        .dept-mobile .dept-card {
          flex: 0 0 100%;
          scroll-snap-align: center;
        }

        .dept-arrow {
          position: absolute;
          top: 50%;
          z-index: 2;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(22, 20, 26, 0.08);
          border-radius: 50%;
          background: #ffffff;
          color: #4a4552;
          box-shadow: 0 8px 20px rgba(22, 20, 26, 0.14);
          display: grid;
          place-items: center;
          cursor: pointer;
          transform: translateY(-50%);
          transition: background 0.2s ease, color 0.2s ease,
            box-shadow 0.2s ease, transform 0.2s ease;
        }

        .dept-arrow:hover {
          background: #6c4fd6;
          color: #ffffff;
          box-shadow: 0 10px 24px rgba(108, 79, 214, 0.35);
        }

        .dept-arrow:active {
          transform: translateY(-50%) scale(0.94);
        }

        .dept-arrow--prev {
          left: 0.35rem;
        }

        .dept-arrow--next {
          right: 0.35rem;
        }

        /* ---------- responsive grid (tablet + desktop) ---------- */

        .dept-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2.5rem 1.25rem;
          padding-top: 1.75rem;
        }

        @media (min-width: 768px) {
          .dept-mobile {
            display: none;
          }
          .dept-tablet {
            display: block;
          }
          .dept-card {
            padding: 3rem 1.15rem 1.85rem;
          }
          .dept-card__badge {
            width: 96px;
            height: 96px;
          }
          .dept-card__image {
            width: 58px;
            height: 58px;
          }
          .dept-card__title {
            font-size: 0.74rem;
          }
          .dept-card__name {
            font-size: 1.25rem;
          }
          .dept-card__desc {
            font-size: 0.89rem;
          }
        }

        @media (min-width: 1024px) {
          .dept-tablet {
            display: none;
          }
          .dept-desktop {
            display: block;
          }
          .dept-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 3rem 1.5rem;
          }
          .dept-card {
            padding: 3.1rem 1rem 2rem;
          }
          .dept-card__badge {
            width: 104px;
            height: 104px;
          }
          .dept-card__image {
            width: 80px;
            height: 80px;
          }
          .dept-card__title {
            font-size: 0.76rem;
          }
          .dept-card__name {
            font-size: 1.32rem;
          }
          .dept-card__desc {
            font-size: 0.9rem;
            max-width: 250px;
          }
        }
      `}</style>
    </section>
  );
}

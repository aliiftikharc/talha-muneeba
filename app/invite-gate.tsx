"use client";

import { useState } from "react";
import GateScenery from "./gate-scenery";

type GateState = "closed" | "opening" | "open";

export default function InviteGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GateState>("closed");

  if (state === "open") {
    return <>{children}</>;
  }

  return (
    <main
      className={`gate-page${state === "opening" ? " is-opening" : ""}`}
      onAnimationEnd={(event) => {
        if (event.animationName === "gate-out") {
          setState("open");
        }
      }}
    >
      <GateScenery />
      <button
        type="button"
        className="envelope"
        onClick={() => {
          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          setState(reduceMotion ? "open" : "opening");
        }}
        disabled={state === "opening"}
        aria-label="You are invited. Tap to open the invitation"
      >
        <span className="envelope-back" aria-hidden="true" />
        <span className="envelope-letter" aria-hidden="true">
          <span className="letter-ornament" />
          <span className="letter-kicker">Wedding Ceremony</span>
          <span className="letter-names">Talha &amp; Muneeba</span>
          <span className="letter-date">16 November 2026</span>
        </span>
        <span className="envelope-pocket" aria-hidden="true">
          <span className="pocket-shape" />
          <svg className="pocket-foil" viewBox="0 0 400 300" preserveAspectRatio="none">
            <path d="M12 18 L200 152 L388 18 L388 288 L12 288 Z" />
            <path className="foil-fine" d="M22 32 L200 164 L378 32 L378 278 L22 278 Z" />
            <path
              className="foil-sprig"
              d="M24 280 C38 276 48 268 54 256 M32 277 C31 270 34 266 39 263 M42 272 C44 266 48 263 54 263 M376 280 C362 276 352 268 346 256 M368 277 C369 270 366 266 361 263 M358 272 C356 266 352 263 346 263"
            />
          </svg>
          <span className="pocket-text">
            <span className="pocket-title">You are invited</span>
            <span className="pocket-names">Talha &amp; Muneeba</span>
          </span>
        </span>
        <span className="envelope-flap" aria-hidden="true">
          <span className="flap-shape">
            <svg className="flap-foil" viewBox="0 0 400 174" preserveAspectRatio="none">
              <path d="M16 8 L384 8 L200 158 Z" />
              <path className="foil-fine" d="M34 16 L366 16 L200 146 Z" />
            </svg>
          </span>
          <span className="flap-lining" />
        </span>
        <span className="envelope-seal" aria-hidden="true">
          T<span>&amp;</span>M
        </span>
      </button>
      <p className="gate-hint">Tap the envelope to open</p>
    </main>
  );
}

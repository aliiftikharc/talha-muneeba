"use client";

import { useState } from "react";

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
          <span className="letter-kicker">Walima Ceremony</span>
          <span className="letter-names">Talha &amp; Muneeba</span>
          <span className="letter-date">16 November 2026</span>
        </span>
        <span className="envelope-pocket" aria-hidden="true">
          <span className="pocket-shape" />
          <span className="pocket-text">
            <span className="pocket-title">You are invited</span>
            <span className="pocket-names">Talha &amp; Muneeba</span>
          </span>
        </span>
        <span className="envelope-flap" aria-hidden="true">
          <span className="flap-shape" />
        </span>
        <span className="envelope-seal" aria-hidden="true">
          T<span>&amp;</span>M
        </span>
      </button>
      <p className="gate-hint">Tap the envelope to open</p>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through phrases with type + delete animation.
 */
export function useTypewriter(phrases, options = {}) {
  const {
    typeSpeed = 42,
    deleteSpeed = 28,
    holdMs = 2600,
    gapMs = 380,
  } = options;

  const [text, setText] = useState("");

  useEffect(() => {
    let cancelled = false;
    let i = 0;

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      while (!cancelled) {
        const full = phrases[i % phrases.length];
        for (let c = 0; c <= full.length; c++) {
          if (cancelled) return;
          setText(full.slice(0, c));
          await sleep(typeSpeed);
        }
        await sleep(holdMs);
        for (let c = full.length; c >= 0; c--) {
          if (cancelled) return;
          setText(full.slice(0, c));
          await sleep(deleteSpeed);
        }
        await sleep(gapMs);
        i += 1;
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [phrases, typeSpeed, deleteSpeed, holdMs, gapMs]);

  return text;
}

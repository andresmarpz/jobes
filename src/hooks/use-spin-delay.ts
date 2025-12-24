import { useCallback, useRef, useState } from "react";

interface Options {
  minSpin: number;
}

export function useSpinDelay(loading: boolean, { minSpin = 200 }: Options) {
  const [showSpinner, setShowSpinner] = useState(false);
  const promiseRef = useRef<Promise<unknown> | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController>(null);

  const startTimer = useCallback(() => {
    const ac = new AbortController();
    abortRef.current = ac;

    setShowSpinner(true);

    promiseRef.current = new Promise(resolve => {
      timerRef.current = setTimeout(() => {
        setShowSpinner(false);
        resolve(null);
        promiseRef.current = null;
        timerRef.current = null;
      }, minSpin);

      ac.signal.addEventListener("abort", () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setShowSpinner(false);
        resolve(null);
      });
    });

    return promiseRef.current;
  }, [minSpin]);

  const clearTimer = useCallback(() => {
    if (promiseRef.current && timerRef.current) {
      abortRef.current?.abort();
      promiseRef.current = null;
      timerRef.current = null;
    }
  }, []);

  const wait = useCallback(() => {
    if (promiseRef.current) {
      return promiseRef.current;
    } else return startTimer();
  }, [startTimer]);

  const reset = useCallback(() => {
    clearTimer();
    startTimer();
  }, [clearTimer, startTimer]);

  return { showSpinner: showSpinner || loading, wait, reset } as const;
}

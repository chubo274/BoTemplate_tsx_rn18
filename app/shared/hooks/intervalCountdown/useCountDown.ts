import React, { useCallback, useEffect, useMemo, useState } from 'react';

export const useCountDown = (time?: number, autoRun?: boolean) => {
    const timeRemain = useMemo(() => time || 120, [time])
    const [timeRemaining, setTimeRemaining] = useState(timeRemain);
    const [isTimeRemaining, setIsTimeRemaining] = useState(Boolean(autoRun))

    const timerRef = React.useRef<number>(timeRemaining);
    const timeStep = React.useRef<number>(autoRun ? 1 : 0);
    const intervalId = React.useRef<number>(0);

    const playTimeRemaining = useCallback(() => {
        intervalId.current = setInterval(() => {
            if (timeStep.current) {
                timerRef.current = timerRef.current - timeStep.current;
                if (timerRef.current < 0) {
                    clearInterval(intervalId.current);
                    setIsTimeRemaining(false);
                } else {
                    setTimeRemaining(timerRef.current);
                }
            }
        }, 1000);
    }, [])

    const resetCount = useCallback(() => {
        if (!timeStep.current) {
            timerRef.current = (timeRemain)
            timeStep.current = 1
        }

        if (timerRef.current < 0) {
            timerRef.current = (timeRemain)
            setTimeRemaining(timeRemain)
            playTimeRemaining()
        }

        setIsTimeRemaining((prev: boolean) => true)
    }, [playTimeRemaining, timeRemain])

    const pauseCount = useCallback(() => {
        if (intervalId.current) {
            if (timeStep.current) { // stop
                timeStep.current = 0
                setIsTimeRemaining(false)
            } else {                // start
                timeStep.current = 1
                setIsTimeRemaining(true)
            }
        }
    }, [])

    useEffect(() => {
        playTimeRemaining()
        return () => {
            clearInterval(intervalId.current);
        };
    }, [playTimeRemaining]);

    return { timeRemaining, isTimeRemaining, resetCount, pauseCount }
}
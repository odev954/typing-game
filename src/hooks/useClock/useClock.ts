import React, { useState, useCallback, useEffect } from "react";

const ONE_SECOND = 1000;

export default function useClock(timeoutExceededCallback=null, seconds=60): number {
    const [remainingSeconds, updateRemainingSeconds] = useState<number>(seconds);
    const callback = useCallback(() => {
        updateRemainingSeconds((current) => current - 1)
    }, []);

    useEffect(() => {
        const intervalId = setInterval(callback, ONE_SECOND);

        setTimeout(() => {
            if(timeoutExceededCallback)
            {
                timeoutExceededCallback();
            }
            
            clearInterval(intervalId);
        }, ONE_SECOND * seconds);
    }, []);
    

    return remainingSeconds;
}
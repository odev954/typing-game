import React, { useState, useCallback, useEffect } from "react";

const ONE_SECOND = 1000;

export default function useClock(timeoutExceededCallback=null, resetTrigger=null, seconds=60): number {
    const [remainingSeconds, updateRemainingSeconds] = useState<number>(0);
    const callback = useCallback(() => {
        updateRemainingSeconds((current) => current - 1)
    }, []);

    useEffect(() => {
        let intervalId = null;
        
        if(resetTrigger)
        {
            intervalId = setInterval(callback, ONE_SECOND);

            updateRemainingSeconds(_ => seconds)
            setTimeout(() => {
                if(timeoutExceededCallback)
                {
                    timeoutExceededCallback();
                }
                
                clearInterval(intervalId);
            }, ONE_SECOND * seconds);
        }
    }, [resetTrigger]);
    

    return remainingSeconds;
}
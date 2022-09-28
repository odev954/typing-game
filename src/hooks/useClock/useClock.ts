import React, { useState } from "react";

const ONE_SECOND = 1000;

function useClock(seconds=60, timeoutExceededCallback=null): number {
    const [remainingSeconds, updateRemainingSeconds] = useState<number>(seconds);
    const intervalId = setInterval(() => updateRemainingSeconds((seconds) => seconds - 1), ONE_SECOND);
    
    setTimeout(() => {
        if(timeoutExceededCallback)
        {
            timeoutExceededCallback();
        }
        
        clearInterval(intervalId);
    }, ONE_SECOND * seconds);

    return remainingSeconds;
}
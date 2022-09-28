import { useState } from "react";

export interface TrackerStatus
{
    Words: string[];
    Position: number;
    TyposCount: number;
}

export default function useTrackerLogic(text: string) : [TrackerStatus, (word: string) => boolean] {
    const [status, updateStatus] = useState<TrackerStatus>({ 
        Words: text.split(' '), 
        Position: 0, 
        TyposCount: 0 
    });

    return [
        status,
        (word : string) : boolean => {
            let success : boolean = status.Words[status.Position] === word;  
            
            if(success)
            {
                updateStatus({ 
                    Words: status.Words, 
                    Position: status.Position + 1, 
                    TyposCount: status.TyposCount 
                })
            }
            else
            {
                updateStatus({ 
                    Words: status.Words, 
                    Position: status.Position, 
                    TyposCount: status.TyposCount + 1 
                })
            }

            return success;
        }
    ]
}
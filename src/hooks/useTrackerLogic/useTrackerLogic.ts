import { useState } from "react";
import _ from "lodash";

export interface TrackerStatus
{
    Words: string[];
    Position: number;
    TyposCount: number;
}

export default function useTrackerLogic(text: string) : [TrackerStatus, (word: string) => boolean] {
    const [status, updateStatus] = useState<TrackerStatus>({ 
        Words: _.shuffle(text.split(' ')), 
        Position: 0, 
        TyposCount: 0 
    });

    return [
        status,
        (word : string) : boolean => {
            let success : boolean = true;
            
            if(status.Position < status.Words.length)
            {
                success = status.Words[status.Position] === word;  
                
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
            }
            

            return success;
        }
    ]
}
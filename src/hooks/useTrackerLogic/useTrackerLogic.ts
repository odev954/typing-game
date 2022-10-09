import { useState } from "react";
import _ from "lodash";
import useWords from "../useWords/useWords";

export interface TrackerStatus
{
    Words: string[];
    Position: number;
    TyposCount: number;
}

export default function useTrackerLogic() : [TrackerStatus, (word: string) => boolean] {
    const text = useWords();
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
                
                updateStatus({ 
                    Words: status.Position + 1 === Math.floor(status.Words.length / 2) ? 
                           status.Words.concat(_.shuffle(text.split(' '))) : status.Words, 
                    Position: status.Position + (success ? 1 : 0), 
                    TyposCount: status.TyposCount + (!success ? 1 : 0)
                })
            }

            return success;
        }
    ]
}
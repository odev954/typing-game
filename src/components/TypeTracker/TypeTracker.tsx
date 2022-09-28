import React from "react";
import useTrackerLogic from "src/hooks/useTrackerLogic/useTrackerLogic";
import './TypeTracker.css'

interface TypeTrackerProps {
    Text: string
}

export default function TypeTracker(props: TypeTrackerProps) : JSX.Element
{
    const [status, updateStatus] = useTrackerLogic(props.Text);
    


    return (
        <div>
            { status.Words.slice(0, status.Position).map((word) => <p className='word completed'> word </p>)}
            
            <p className='word current'> { status.Words[status.Position] } </p>

            { status.Words.slice(status.Position + 1).map((word) => <p className='word uncompleted'> word </p>)}
        </div>
    )
}
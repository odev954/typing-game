import React from "react";
import useClock from "src/hooks/useClock/useClock";
import Card from 'react-bootstrap/Card';
import './Clock.css';

export default function Clock() : JSX.Element
{
    const timeoutSeconds = useClock(() => console.log('timeout!'));

    return (
        <div>
            <p>timeout: {Math.floor(timeoutSeconds / 60)}:{timeoutSeconds % 60}</p>
        </div>
    )
}
import React from "react";
import Clock from '../components/Clock/Clock';
import ScoreRecorder from "components/ScoreRecorder/ScoreRecorder";
import TypeTracker from "components/TypeTracker/TypeTracker";
import './styles.css';
import useWords from "src/hooks/useWords/useWords";

export default function App() 
{
    const text = useWords();

    return ( 
        <div className="container">
            <Clock />
            <ScoreRecorder />
            <TypeTracker/>
        </div>
    )
}
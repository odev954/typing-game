import React from "react";
import Clock from './components/Clock/Clock';
import ScoreRecorder from "components/ScoreRecorder/ScoreRecorder";
import TypeTracker from "components/TypeTracker/TypeTracker";

export default function App() 
{
    return ( 
        <>
            <Clock />
            <ScoreRecorder />
            <TypeTracker Text={'test test test'} />
        </>
    )
}
import React from "react";
import Clock from '../components/Clock/Clock';
import ScoreRecorder from "components/ScoreRecorder/ScoreRecorder";
import TypeTracker from "components/TypeTracker/TypeTracker";
import './styles.css';

export default function App() 
{
    return ( 
        <div className="container">
            <Clock />
            <ScoreRecorder />
            <TypeTracker />
        </div>
    )
}
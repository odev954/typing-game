import React, { useState, useCallback } from "react";
import Clock from '../components/Clock/Clock';
import ScoreRecorder from "components/ScoreRecorder/ScoreRecorder";
import TypeTracker from "components/TypeTracker/TypeTracker";
import useStorage from "src/hooks/useStorage/useStorage";
import useTrackerLogic from "src/hooks/useTrackerLogic/useTrackerLogic";
import useClock from "src/hooks/useClock/useClock";
import './styles.css';
import FinishScreen from "components/FinishScreen/FinishScreen";

export default function App() 
{
    const [resetClock, updateResetClock] = useState(true);
    const [finishScreenOpen, setFinishScreenOpen] = useState(false);
    const [status, updateTrackerStatus, resetTracker] = useTrackerLogic();
    const [, updateScores] = useStorage();
    const timeoutSeconds = useClock(() => {
        setFinishScreenOpen(_ => true);
        updateResetClock(_ => false);
    }, resetClock);
    const handleClose = useCallback(() => {
        setFinishScreenOpen(_ => false);
        updateScores({
            date: new Date(Date.now()),
            count: status.Position
        });
        resetTracker();
        updateResetClock(_ => true);
    }, [finishScreenOpen, status]) 

    return ( 
        <div className="container">
            <FinishScreen Open={finishScreenOpen} Score={status.Position} OnClose={handleClose}/>
            <Clock TimeoutSeconds={timeoutSeconds}/>
            <TypeTracker UpdateTrackerStatus={updateTrackerStatus} Status={status}/>
            <ScoreRecorder />
        </div>
    )
}
import React, { useCallback, useRef, useState } from "react";
import useTrackerLogic from "src/hooks/useTrackerLogic/useTrackerLogic";
import { Typography, Card, CardContent, TextField, Snackbar, Alert, Backdrop, Button } from "@mui/material";
import useClock from "src/hooks/useClock/useClock";
import _ from 'lodash';
import './TypeTracker.css';
import WordGrid from "components/WordGrid/WordGrid";

export default function TypeTracker() : JSX.Element
{
    const [alert, setAlert] = useState(false);
    const [isTypo, updateIsTypo] = useState(false);
    const [status, updateTrackerStatus] = useTrackerLogic();
    const textInputRef = useRef(null);
    
    useClock(() => setAlert(_ => true));
    const handleClose = useCallback(() => {
        setAlert(_ => false);
    }, [alert]) 
    
    const inputHandler = useCallback(() => {
        let flag = false;
        if(textInputRef.current.value[textInputRef.current.value.length - 1] === ' ')
        {
            flag = updateTrackerStatus(textInputRef.current.value.slice(0, -1));

            textInputRef.current.value = '';
            
            if(!flag)
            {
                updateIsTypo(_ => true);
            }
        }
    }, [textInputRef, status, isTypo]);
    const onErrorClose = useCallback(() => updateIsTypo(_ => false), [isTypo]);

    return (
        <Card className="tracker display-card">
            <Backdrop className="clock finish-backdrop" 
                open={alert} 
                onClick={handleClose}>
                <Card className="clock display-finish">
                    <CardContent>
                        <Typography className="clock styled-text">Timeout! Timeout! Timeout!</Typography>
                        <Typography className="clock styled-text">Your score is: {status.Position + 1} w/min</Typography>
                    </CardContent>
                </Card>
                <Button className="clock play-btn" variant="contained">play again</Button>
            </Backdrop>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={isTypo}
                autoHideDuration={2000}
                onClose={onErrorClose}
            >
                <Alert severity="error">Wrong! You had a typo error! Try again...</Alert>
            </Snackbar> 
            <CardContent className="tracker card-content">
                <WordGrid Status={status} RowLimit={3} WordLimit={5} />
                <TextField className="tracker word-input" label="Word" inputRef={textInputRef} variant="filled" onChange={inputHandler} />
            </CardContent>
        </Card>
    )
}
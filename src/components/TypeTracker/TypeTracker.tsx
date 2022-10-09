import React, { useCallback, useRef, useState } from "react";
import { Card, CardContent, TextField, Snackbar, Alert} from "@mui/material";
import _ from 'lodash';
import './TypeTracker.css';
import WordGrid from "components/WordGrid/WordGrid";
import { TrackerStatus } from "src/hooks/useTrackerLogic/useTrackerLogic";

export interface TypeTrackerProps {
    UpdateTrackerStatus: (word: string) => boolean,
    Status: TrackerStatus
}

export default function TypeTracker(props: TypeTrackerProps) : JSX.Element
{
    const [isTypo, updateIsTypo] = useState(false);
    const textInputRef = useRef(null);
    
    const inputHandler = useCallback(() => {
        let flag = false;
        if(textInputRef.current.value[textInputRef.current.value.length - 1] === ' ')
        {
            flag = props.UpdateTrackerStatus(textInputRef.current.value.slice(0, -1));

            textInputRef.current.value = '';
            
            if(!flag)
            {
                updateIsTypo(_ => true);
            }
        }
    }, [textInputRef, props.Status, isTypo]);
    const onErrorClose = useCallback(() => updateIsTypo(_ => false), [isTypo]);

    return (
        <Card className="tracker display-card">
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={isTypo}
                autoHideDuration={2000}
                onClose={onErrorClose}
            >
                <Alert severity="error">Wrong! You had a typo error! Try again...</Alert>
            </Snackbar> 
            <CardContent className="tracker card-content">
                <WordGrid Status={props.Status} RowLimit={2} WordLimit={5} />
                <TextField className="tracker word-input" label="Word" inputRef={textInputRef} variant="filled" onChange={inputHandler} />
            </CardContent>
        </Card>
    )
}
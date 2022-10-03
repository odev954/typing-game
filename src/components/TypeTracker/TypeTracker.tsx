import React, { useCallback, useRef, useState } from "react";
import useTrackerLogic from "src/hooks/useTrackerLogic/useTrackerLogic";
import Grid from '@mui/material/grid';
import { Typography, Card, CardContent, TextField, Snackbar, Alert } from "@mui/material";
import _ from 'lodash';
import './TypeTracker.css';

interface TypeTrackerProps {
    Text: string
}

export default function TypeTracker(props: TypeTrackerProps) : JSX.Element
{
    const [isTypo, updateIsTypo] = useState(false);
    const [status, updateTrackerStatus] = useTrackerLogic(props.Text);
    const textInputRef = useRef(null);
    const WORDS_PER_ROW : number = 5;
    let sections : string[][] = _.chunk(status.Words, WORDS_PER_ROW);   
    
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
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={isTypo}
                autoHideDuration={2000}
                onClose={onErrorClose}
            >
                <Alert severity="error">Wrong! You had a typo error! Try again...</Alert>
            </Snackbar> 
            <CardContent>
                {
                    sections.map((section, sectionIndex) => 
                        <Grid container spacing={2}>
                            {
                                section.map((word, index) => 
                                    <Grid item>
                                        <Typography 
                                            className={
                                                selectWordStyle(
                                                    index + sectionIndex * WORDS_PER_ROW, 
                                                    status
                                            )}>
                                                {word}
                                        </Typography>
                                    </Grid>
                                )
                            }
                        </Grid>
                    )
                }
                <TextField className="tracker word-input" label="Word" inputRef={textInputRef} variant="filled" onChange={inputHandler} />
            </CardContent>
        </Card>
    )
}

function selectWordStyle(position, status)
{
    return `tracker word ${ 
        position === status.Position ? "current" : 
        position < status.Position ? "completed" : 'regular' 
    }`                                   
}
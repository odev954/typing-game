import React, { useCallback, useEffect } from "react";
import useTrackerLogic from "src/hooks/useTrackerLogic/useTrackerLogic";
import Grid from '@mui/material/grid';
import { Typography, Card, CardContent, TextField } from "@mui/material";
import _ from 'lodash';
import './TypeTracker.css';

interface TypeTrackerProps {
    Text: string
}

export default function TypeTracker(props: TypeTrackerProps) : JSX.Element
{
    const [status, updateTrackerStatus] = useTrackerLogic(props.Text);
    const WORDS_PER_ROW = 5;
    let sections : string[][] = _.chunk(status.Words, WORDS_PER_ROW);   
    
    useEffect(() => {
        updateTrackerStatus('test');
    }, []);
    
    return (
        <Card className="tracker display-card">
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
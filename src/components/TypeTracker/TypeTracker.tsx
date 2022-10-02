import React, { useCallback, useEffect } from "react";
import useTrackerLogic from "src/hooks/useTrackerLogic/useTrackerLogic";
import Grid from '@mui/material/grid';
import { Typography, Card, CardContent } from "@mui/material";
import sliceToChuncks from "src/utilities/sliceToChuncks";
import './TypeTracker.css';

interface TypeTrackerProps {
    Text: string
}

export default function TypeTracker(props: TypeTrackerProps) : JSX.Element
{
    const [status, updateTrackerStatus] = useTrackerLogic(props.Text);
    
    let sections : string[][] = sliceToChuncks(status.Words, 5);   
    
    useEffect(() => {
        updateTrackerStatus('test');

    }, []);
    
    return (
        <Card className="tracker display-card">
            <CardContent>
                {
                    sections.map((section) => 
                        <Grid container spacing={2}>
                            {
                                section.map((word, index) => 
                                    <Grid item>
                                        <Typography 
                                            className={`tracker word ${ 
                                                index === status.Position ? "current" : 
                                                    index < status.Position ? "completed" : 'regular'
                                            }`}>
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


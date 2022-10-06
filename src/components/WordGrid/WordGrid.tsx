import React, { useCallback, useEffect, useRef, useState } from "react";
import useTrackerLogic, { TrackerStatus } from "src/hooks/useTrackerLogic/useTrackerLogic";
import Grid from '@mui/material/grid';
import { Typography } from "@mui/material";
import _ from 'lodash';
import './WordGrid.css';

export interface WordGridProps 
{
    Status: TrackerStatus,
    WordLimit : number,
    RowLimit : number
} 

export default function WordGrid(props : WordGridProps) : JSX.Element
{
    const [rowOffest, updateRowOffest] = useState<number>(0);
    let sections = _.chunk(props.Status.Words, props.WordLimit);
    
    useEffect(() => {
        if((props.Status.Position + 1) % props.WordLimit === 0 && 
           (props.Status.Position + 1) / props.WordLimit > props.RowLimit - 1) 
        {
            updateRowOffest(rowOffest + 1);
        }
    }, [props.Status.Position]);
    
    return (
        <>
            {
                sections.map((section, sectionIndex) => {
                    if(sectionIndex >= rowOffest && sectionIndex <= rowOffest + props.RowLimit - 1)
                    {

                        return (<Grid className="word-grid" container spacing={2}>
                            {
                                section.map((word, index) => 
                                    <Grid item>
                                        <Typography 
                                            className={
                                                selectWordStyle(
                                                    index + sectionIndex * props.WordLimit, 
                                                    props.Status
                                            )}>
                                                {word}
                                        </Typography>
                                    </Grid>
                                )
                            }
                        </Grid>);
                    }
                })
            }
        </>
    )
}


function selectWordStyle(position, status)
{
    return `tracker word ${ 
        position === status.Position ? "current" : 
        position < status.Position ? "completed" : 'regular' 
    }`                                   
}
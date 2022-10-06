import React, { useCallback, useEffect, useRef, useState } from "react";
import useTrackerLogic, { TrackerStatus } from "src/hooks/useTrackerLogic/useTrackerLogic";
import Grid from '@mui/material/grid';
import { Typography } from "@mui/material";
import _ from 'lodash';

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
           (props.Status.Position + 1) / props.WordLimit > props.RowLimit) 
        {
            updateRowOffest(rowOffest + 1);
        }
        console.log(sections);
    }, [props.Status.Position]);
    
    return (
        <>
            {
                sections.map((section, sectionIndex) => {
                    console.log('section index: ', sectionIndex);
                    if(sectionIndex >= rowOffest && sectionIndex <= rowOffest + props.RowLimit)
                    {

                        return (<Grid container spacing={2}>
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
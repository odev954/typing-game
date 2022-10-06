import React from "react";
import { Typography, Card, CardContent, TextField, Snackbar, Alert, Backdrop, Button } from "@mui/material";
import Grid from '@mui/material/grid';
import './ScoreRecorder.css'
import _ from 'lodash';
import useStorage from "src/hooks/useStorage/useStorage";

export default function ScoreRecorder() : JSX.Element
{
    const [getScores, ] = useStorage();
    let scores = getScores();
    console.log(scores);
    return (
        <Card className="score-board display-card">
            <CardContent className="score-board card-content">
                <Typography variant="h4">Scores</Typography>
                {
                    Object.keys(scores).length !== 0 ? _.take(Object.keys(scores), 5).map(key => {
                        return (
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Typography>{key}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>{scores[key]}</Typography>
                                </Grid>
                            </Grid>
                        )
                    }) : <Typography>no scores assigned</Typography>
                }
            </CardContent>
        </Card>
    )
}
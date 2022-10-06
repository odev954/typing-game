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
    let scoreList = []

    Object.keys(scores).forEach(key => {
        scoreList.push({date: key, count: scores[key]});
    });

    scoreList = _.sortBy(scoreList, (score) => score.count).reverse();

    return (
        <Card className="score-board display-card">
            <CardContent className="score-board card-content">
                <Typography className="score-board title" variant="h4">Scores</Typography>
                {
                    scoreList.length !== 0 ? _.take(scoreList, 5).map(score => {
                        return (
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Typography>{score.date}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>{score.count}</Typography>
                                </Grid>
                            </Grid>
                        )
                    }) : <Typography>no scores assigned</Typography>
                }
            </CardContent>
        </Card>
    )
}
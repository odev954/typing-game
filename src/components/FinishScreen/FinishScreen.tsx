import React, { useCallback, useRef, useState } from "react";
import { Typography, Card, CardContent, TextField, Snackbar, Alert, Backdrop, Button } from "@mui/material";
import Grid from '@mui/material/grid';

export interface FinishScreenProps {
    OnClose: () => void,
    Open: boolean,
    Score: number
}

export default function FinishScreen(props: FinishScreenProps) {
    return (
        <Backdrop className="clock finish-backdrop" 
            open={props.Open}>
            <Card className="clock display-finish">
                <CardContent>
                    <Typography className="clock styled-text">Timeout! Timeout! Timeout!</Typography>
                    <Typography className="clock styled-text">Your score is: {props.Score} w/min</Typography>
                </CardContent>
            </Card>
            <Button className="clock play-btn" onClick={props.OnClose} variant="contained">play again</Button>
        </Backdrop>
    )
}
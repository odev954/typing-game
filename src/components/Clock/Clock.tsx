import React, { useCallback, useState } from "react";
import useClock from "src/hooks/useClock/useClock";
import Card from '@mui/material/Card';
import { CardContent, Typography, Container } from "@mui/material";
import './Clock.css';

interface ClockProps {
    TimeoutSeconds : number
}

export default function Clock(props: ClockProps) : JSX.Element
{
    return (
        <Container className="clock display-container">
            
            <Card className="clock display-card">
                <CardContent>
                    <Typography className="clock styled-text">
                        {Math.floor(props.TimeoutSeconds / 60)}:{props.TimeoutSeconds % 60 > 9 ? props.TimeoutSeconds % 60 : '0' + props.TimeoutSeconds % 60}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    )
}
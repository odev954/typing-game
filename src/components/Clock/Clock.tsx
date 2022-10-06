import React, { useCallback, useState } from "react";
import useClock from "src/hooks/useClock/useClock";
import Card from '@mui/material/Card';
import { CardContent, Typography, Container } from "@mui/material";
import './Clock.css';

export default function Clock() : JSX.Element
{
    const timeoutSeconds = useClock();

    return (
        <Container className="clock display-container">
            
            <Card className="clock display-card">
                <CardContent>
                    <Typography className="clock styled-text">
                        {Math.floor(timeoutSeconds / 60)}:{timeoutSeconds % 60 > 9 ? timeoutSeconds % 60 : '0' + timeoutSeconds % 60}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    )
}
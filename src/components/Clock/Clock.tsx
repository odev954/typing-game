import React from "react";
import useClock from "src/hooks/useClock/useClock";
import Card from '@mui/material/Card';
import './Clock.css';
import { CardContent, Typography } from "@mui/material";

export default function Clock() : JSX.Element
{
    const timeoutSeconds = useClock(() => console.log('timeout!'));

    return (
        <Card className="clock display-card">
            <CardContent>
                <Typography className="clock styled-text">
                    {Math.floor(timeoutSeconds / 60)}:{timeoutSeconds % 60 > 9 ? timeoutSeconds % 60 : '0' + timeoutSeconds % 60}
                </Typography>
            </CardContent>
        </Card>
    )
}
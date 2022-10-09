import React, { useState } from "react";
import useClock from "src/hooks/useClock/useClock";
import Card from '@mui/material/Card';
import { Snackbar, CardContent, Typography, Container } from "@mui/material";
import './Clock.css';

export default function Clock() : JSX.Element
{
    const [alert, setAlert] = useState(false);
    const timeoutSeconds = useClock(() => setAlert(_ => true), 3);

    return (
        <Container>
            <Snackbar open={alert} message='stop!'></Snackbar>
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
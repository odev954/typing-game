import React, { useCallback, useState } from "react";
import useClock from "src/hooks/useClock/useClock";
import Card from '@mui/material/Card';
import { Backdrop, CardContent, Typography, Container, Button } from "@mui/material";
import './Clock.css';

export default function Clock() : JSX.Element
{
    const [alert, setAlert] = useState(false);
    const timeoutSeconds = useClock(() => setAlert(_ => true), 3);
    const handleClose = useCallback(() => {
        setAlert(_ => false);
    }, [alert])

    return (
        <Container className="clock display-container">
            <Backdrop className="clock finish-backdrop" 
                open={alert} 
                onClick={handleClose}>
                <Card className="clock display-finish">
                    <CardContent>
                        <Typography className="clock styled-text">Timeout! Timeout! Timeout!</Typography>
                        <Typography className="clock styled-text">Your score is: {100} w/min</Typography>
                    </CardContent>
                </Card>
                <Button className="clock play-btn" variant="contained">play again</Button>
            </Backdrop>
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
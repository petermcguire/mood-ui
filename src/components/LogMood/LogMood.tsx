import {Button, Rating } from "@mui/material";
import {FormEvent, useState} from "react";
import {AddMoodResponse, Mood} from "../../services/api/apiService.ts";
import {UseNavigateResult} from "@tanstack/react-router";

type LogMoodProps = {
    username: string;
    onMoodSubmit: (mood: Mood) => Promise<AddMoodResponse>,
    navigate: UseNavigateResult<never>,
};



const LogMood = ({ username, onMoodSubmit, navigate }: LogMoodProps) => {
    const [moodLevel, setMoodLevel] = useState<number>(0);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const mood = new Mood();
            mood.level = moodLevel;
            mood.timestamp = new Date();
            await onMoodSubmit(mood);
            // effectively refresh page to get data loader to run again
            await navigate({to: '/dashboard', replace: true});
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>{username}, log yer mood</h1>
            <Rating data-testid="mood-rating" name="mood" defaultValue={moodLevel} precision={1} onChange={
                (_e, value) => value !== null && setMoodLevel(value)
            } />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default LogMood;
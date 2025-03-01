import {Button, Rating } from "@mui/material";
import {FormEvent, useState} from "react";
import {AddMoodResponse, Mood} from "../../services/api/apiService.ts";

type LogMoodProps = {
    onMoodSubmit: (mood: Mood) => Promise<AddMoodResponse>;
};

const LogMood = ({ onMoodSubmit }: LogMoodProps) => {
    const [moodLevel, setMoodLevel] = useState<number>(0);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(moodLevel);
        try {
            const mood = new Mood();
            mood.level = moodLevel;
            mood.timestamp = new Date();
            const resp = await onMoodSubmit(mood);
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Log yer mood</h1>
            <Rating name="mood" defaultValue={5} precision={1} onChange={
                (_e, value) => value !== null && setMoodLevel(value)
            } />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default LogMood;
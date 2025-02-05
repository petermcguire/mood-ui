import {Button, Rating } from "@mui/material";

const LogMood = () => {

    return (
        <form>
            <h1>Log yer mood</h1>
            <Rating name="mood" defaultValue={2.5} precision={0.5} />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default LogMood;
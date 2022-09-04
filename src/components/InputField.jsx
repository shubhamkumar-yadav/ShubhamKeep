import { Box, Button, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PushPinIcon from '@mui/icons-material/PushPin';
import PopUp from "./PopUp";

const InputField = () => {
    const [userData, setUserData] = useState({
        title: "",
        tagline: "",
        body: ""
    });
    const [data, setData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(() => {
            return {
                ...userData, [name]: value
            }
        })
    }
    const addNotes = () => {
        if (userData.title !== "" && userData.body !== "") {
            if(!localStorage.getItem("Notes")){
                localStorage.setItem('Notes', JSON.stringify([]));
            }
            if (localStorage.getItem("Notes").length > 0) {
                var Notes = [...JSON.parse(localStorage.getItem("Notes"))];
                Notes.push(userData);
                localStorage.setItem('Notes', JSON.stringify(Notes));
                window.location.reload();
            }
            else{
                Notes = localStorage.getItem("Notes");
                Notes.push(userData);
                localStorage.setItem('Notes', JSON.stringify(Notes));
                window.location.reload();
            }
        }
    }

    useEffect(() => {
        var stored = JSON.parse(localStorage.getItem("Notes"));
        setData(stored);
        console.log(stored, "stored");
    }, [userData]);

    if (data !== null) {
        if (data.length > 0) {
            var renderData = data.slice(start, end);
        }
    }

    const prev = () => {
        if (start >= 0) {
            if (start - 5 < 0) {
                setStart(0);
                setEnd(5);
            }
            else {
                setStart(start - 5);
                setEnd(start);
            }
        }
    };
    const next = () => {
        if (end < data.length) {
            if (end + 5 > data.length) {
                setStart(end);
                setEnd(data.length);
            }
            else {
                setStart(end);
                setEnd(end + 5);
            }
        }
    };



    return (<>
        <Box style={{ backgroundColor: "#faf5f5", width: "80vw", margin: "20px auto 20px auto", height: "50vh", display: "flex", flexDirection: "column", padding: 30 }}>
            <textarea id="title" name="title" rows="4" cols="140" placeholder="Title..." style={{ outline: "none", border: "none", borderRadius: 10, padding: 10 }} onChange={(e) => handleChange(e)} />
            <textarea id="tagline" name="tagline" rows="4" cols="140" placeholder="Tagline..." style={{ outline: "none", border: "none", borderRadius: 10, padding: 10, marginTop: 60 }} onChange={(e) => handleChange(e)} />
            <textarea id="body" name="body" rows="15" cols="140" placeholder="Body..." style={{ marginTop: 60, outline: "none", border: "none", borderRadius: 10, padding: 10 }} onChange={(e) => handleChange(e)} />
            <Button style={{ background: "skyblue", color: "white", marginTop: 30, textTransform: "capitalize" }} onClick={addNotes}>Add the Notes</Button>
        </Box>
        <Grid container style={{ width: "80vw", margin: "10px auto 10px auto" }}>
            {renderData && renderData.length > 0 && renderData.map((value, index) => {
                return (
                    <Grid item xs={2} key={index} style={{ backgroundColor: "#faf5f5", margin: 10, padding: 20, position: "relative", minHeight: 200 }}>
                        <Box style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography id="titleEdit" style={{ textTransform: "capitalize", fontWeight: 600 }}>{value.title}</Typography>
                        </Box>
                        <Typography id="bodyEdit" style={{ color: "grey",fontFamily:"itallic",marginBottom:10,marginTop:10 }}>#{value.tagline}</Typography>
                        <Typography id="bodyEdit" style={{ color: "grey" }}>{value.body}</Typography>
                        <Box style={{ position: "absolute", bottom: 10, display: "flex", justifyContent: "space-between" }}>
                            <PopUp fired={index} />
                            <PushPinIcon fontSize="small" style={{ color: "grey", cursor: "pointer", marginLeft: "112px" }} />
                        </Box>
                    </Grid>
                )
            })}
        </Grid>
        <Box style={{ width: "10vw", margin: "30px auto 30px auto" }}>
            {
                renderData &&
                renderData.length > 0 &&
                <>
                    <ArrowBackIosIcon fontSize="small" style={{ cursor: "pointer", color: "grey" }} onClick={prev} />&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
                    <ArrowForwardIosIcon fontSize="small" style={{ cursor: "pointer", color: "grey" }} onClick={next} />
                </>
            }
        </Box>

    </>)
};

export { InputField };
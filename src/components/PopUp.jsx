import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


export default function PopUp(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [userData, setUserData] = useState({
        title: "",
        tagline:"",
        body: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(() => {
            return {
                ...userData, [name]: value
            }
        })
    };

    const handleUpdate = () => {
        var stored = JSON.parse(localStorage.getItem("Notes"));
        var data = stored[props.fired];
        if (userData.title !== "" && userData.body !== "") {
            data.title = userData.title;
            data.body = userData.body;
        }
        console.log("updated data",data);
        stored[props.fired] = data;
        localStorage.setItem('Notes', JSON.stringify(stored));
        setOpen(false);
        window.location.reload();
    };

    return (
        <div>
            <EditIcon fontSize="small" style={{ color: "grey", cursor: "pointer" }} onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Box style={{ backgroundColor: "#faf5f5", width: "30vw", margin: "20px auto 20px auto", height: "50vh", display: "flex", flexDirection: "column", padding: 30 }}>
                        <textarea id="title" name="title" rows="4" cols="120" placeholder="Title..." style={{ outline: "none", border: "none", borderRadius: 10, padding: 10 }} onChange={(e) => handleChange(e)} />
                        <textarea id="tagline" name="tagline" rows="4" cols="140" placeholder="Tagline..." style={{ outline: "none", border: "none", borderRadius: 10, padding: 10,marginTop: 60 }} onChange={(e) => handleChange(e)} />
                        <textarea id="body" name="body" rows="15" cols="120" placeholder="Body..." style={{ marginTop: 60, outline: "none", border: "none", borderRadius: 10, padding: 10 }} onChange={(e) => handleChange(e)} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

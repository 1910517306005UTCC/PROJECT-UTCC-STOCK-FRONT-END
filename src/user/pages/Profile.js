import React, {useState} from 'react'
import { Container, Paper} from "@material-ui/core"

    const data = {
        id: "cacd5252",
        email: "boonyarit@hotmail.com",
        name: "Roze",
        password: "1234",
        status: "Admin",
        image: "https://images.unsplash.com/photo-1615502258994-72db7460643c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=632&q=80"
    }

export default function Profile() {



    return (
        <div>
            <Container maxWidth="sm">
                <h1>โปรไฟล์</h1>
                <Paper style={{
                    padding: "10px",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    boxSizing: "border-box"}}>
                    <img style={{
                        width: "200px",
                        borderRadius: "5px"}} 
                        src={data.image} alt="jpg"/>
                    <h4>{data.name}</h4>
                    <h4 style={{margin: "0px"}}>สถานะ: {data.status}</h4>
                </Paper>
            </Container>
        </div>
    )
}

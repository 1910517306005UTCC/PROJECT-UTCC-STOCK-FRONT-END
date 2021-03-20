// import React, { useState } from 'react'
// import { Container, Paper, Button } from "@material-ui/core"
// import { useForm } from "../../shared/hooks/form-hook"
// import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../shared/util/validators"
// import Input from "../../shared/components/FormElements/Input"
// import { makeStyles } from '@material-ui/core/styles'
// import ImageUpload from '../../shared/components/FormElements/ImageUpload'



// const useStyles = makeStyles((theme) => ({
//     button: {
//         margin: "20px 0"
//     }
// }));

// const data = [{
//     id: "cacd5252",
//     email: "boonyarit@hotmail.com",
//     name: "Roze",
//     password: "1234",
//     status: "Admin",
//     image: "https://images.unsplash.com/photo-1615502258994-72db7460643c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=632&q=80"
// }]

// function EditProfile() {

//     const classes = useStyles();
//     const [file, setFile] = useState(data[0].image)

//     const [formState, inputHandler] = useForm(
//         {
//             name: {
//                 value: '',
//                 isValid: false
//             },
//             email: {
//                 value: '',
//                 isValid: false
//             },
//             password: {
//                 value: '',
//                 isValid: false
//             },
//         },
//         false
//     );

//     return (
//         <Container maxWidth="sm">
//             <h1>Edit Profile</h1>
//             <Paper>
//                 <Input
//                     id="name"
//                     element="input"
//                     type="email"
//                     label="Email *"
//                     validators={[VALIDATOR_EMAIL()]}
//                     errorText="Please enter a valid email."
//                     onInput={inputHandler}
//                     initialValue={data[0].email}
//                     initialValid={true}
//                     required
//                 />
//             </Paper>
//         </Container>
//     )
// }

// export default EditProfile

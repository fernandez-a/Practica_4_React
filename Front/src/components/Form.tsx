import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import axios, { AxiosResponse } from "axios"
type User = {
    email: string,
    name: string,
    surname: string
}
type FormProps = {
    visible: boolean;
    refresh: (arr: Array<User>) => void;
}

type Styled_Form_Type = {
    width?: string;
    height?: string;
    state: boolean;
}

const Form: FC<FormProps> = ({ visible, refresh }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    let status:number;
    return <Styled_Form state={visible}>
            <input type="text" name="name" placeholder="Enter Username" id="" onChange={(e) => setName(e.target.value)}></input>
            <input type="text" name="username" placeholder="Surname" id="" onChange={(e) => setSurname(e.target.value)}></input>
            <input type="text" name="email" placeholder="Enter Email" id="" onChange={(e) => setEmail(e.target.value)}></input>
            <button onClick={() => { 
                if(name == "" || surname == "" || email == "")alert("Missing params.")
                else{
                    axios.post(`http://localhost:3001/addUser?name=${name}&email=${email}&surname=${surname}`).then((res) => {
                        refresh(res.data);
                    }).catch((error)=> {
                        alert("User already registered");
                        console.log(error);
                    }) }

                }
            }>Register</button>
    </Styled_Form>
}

const Styled_Form = styled.div<Styled_Form_Type>`
display:flex;
flex-flow: column wrap;
justify-content:space-around;
align-items: center;
width:400px;
height:200px;
visibility:${(props) => props.state ? "visible" : "hidden"};
background: rgba(0, 0, 0, 0.15);
box-sizing: border-box;
backdrop-filter: blur(10px);
button { background: #333; border: none;border-radius: 3px; outline: none; color: #fff; width:80px; height: 30px;};
input {height: 20px; width: 60%;}


`

export default Form
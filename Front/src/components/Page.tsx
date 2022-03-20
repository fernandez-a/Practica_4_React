import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import Form from "./Form"
import List from "./List"
import axios from "axios";

type User = {
    email: string,
    name: string,
    surname: string
}
const Page: FC = () => {
    const [formVisible, setFormVisible] = useState<boolean>(true);
    const [ListVisible, setlistVisible] = useState<boolean>(false);
    const [users, setUsers] = useState<Array<User>>([]);
    useEffect(() => {
        const getUsers = async () => {
            let users: User[] = [];
            let usersAux: any = await (await axios.get("http://localhost:3001/getUsers")).data.users;
            users = usersAux.map((elem: any) => {
                let userAux: User = {
                    name: elem.name,
                    surname: elem.surname,
                    email: elem.email
                }
                return userAux;
            })
            setUsers(users);
        }
        getUsers();
    }, [])
    return <Styled_page>
        <Styled_botones>
            <button type="button" onClick={async () => { setFormVisible(true); setlistVisible(false); }}>Form</button>
            <button type="button" onClick={() => { setFormVisible(false); setlistVisible(true); }}>List</button>
        </Styled_botones>
        <Styled_Container>
            <Form visible={formVisible} refresh={setUsers}></Form>
            <List key={users.length} visible={ListVisible} listUsers={users} refresh={setUsers}></List>
        </Styled_Container>

    </Styled_page>
}

const Styled_page = styled.div`
width:100%;
height:100vh;
background-color:pink;
position:absolute;
left: 0%;
top:0%;
`

const Styled_botones = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    button { background: #333; border: none; padding: 0 1rem; margin: 0.75rem; border-radius: 3px; outline: none; color: #fff; width:100px; height: 50px }
    
`

const Styled_Container = styled.div`
    display:flex;
    justify-content:center;
    flex-flow: row wrap;
    margin-top:100px;
`




export default Page;
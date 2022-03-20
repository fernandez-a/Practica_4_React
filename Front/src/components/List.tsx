import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import axios, { AxiosResponse } from "axios"

type User = {
    email: string,
    name: string,
    surname: string
}
type ListProps = {
    visible: boolean;
    listUsers: User[];
    refresh: (arr: Array<User>) => void;
}

type Styled_List_Type = {
    width?: string;
    height?: string;
    state: boolean;
}

const List: FC<ListProps> = ({ visible, listUsers, refresh }) => {
    console.log(listUsers.length);
    return <Styled_List state={visible}>
        {listUsers.map((user: User, index: number) => {
            return <Styled_username key={index}>
                <div id="username">
                    {user.name + " " + user.surname}<br />
                    {user.email}
                </div>
                <div>
                    <button onClick={async () => {
                        await axios.post(`http://localhost:3001/deleteUser?email=${user.email}`).then((res) => { refresh(res.data) })
                    }}>
                        X
                    </button>
                </div>
            </Styled_username>
        })}
    </Styled_List >
}



const Styled_List = styled.div<Styled_List_Type>`
width:250px;
height:600px;
display:flex;
flex-flow: row wrap;
visibility:${(props) => props.state ? "visible" : "hidden"};
background: rgba(0, 0, 0, 0.15);
box-sizing: border-box;
backdrop-filter: blur(10px);
overflow: scroll;
overflow-x:hidden;
`
const Styled_username = styled.div`
display:flex;
background: rgba(0, 0, 0, 0.15);
box-sizing: border-box;
justify-content:space-between;
width: 80%;
height:50px;
margin:20px;
/* #username {margin-left:10px} */
button {margin-top:50%;margin-left:10px}
`

export default List
import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();


const initialState = {
    general: [
        { from: 'Aaron', msg: 'Hello' },
        { from: 'Aarcon', msg: 'Hello' },
        { from: 'Mojison', msg: 'Hello' },
    ],
    topic1: [
        { from: 'Aaron', msg: 'Hello' },
        { from: 'Aaron', msg: 'Hello' },
        { from: 'Aaron', msg: 'Hello' },
    ],
};


function reducer(state, action) {
    const { from, msg, topic } = action.payload;
    switch (action.type) {
        case "RECEIVE_MESSAGE":
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    { from, msg }
                ],
            }
        default:
            return state;
    }
}

let socket;

function sendChatAction(value) {
    socket.emit('chat message', value);
}

function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initialState);

    if (!socket) {
        socket = io(":3001");
        socket.on('chat message', function (msg) {
            dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
        });
    }

    const user = 'Krunal' + Math.random(100).toFixed(2);


    return (
        <CTX.Provider value={{ allChats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    );
}

export default Store;

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
};

export interface Message {
    id: string;
    sender: string;
    receiver: string;
    message: string;
    timestamp: Date;
};

export interface SendMessage {
    sender: string;
    receiver: string;
    message: string;
    timestamp: string;
}


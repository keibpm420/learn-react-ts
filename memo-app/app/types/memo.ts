export interface Memo {
    id: string;
    content: string;
    createdAt: Date;
    replies: Reply[];
}

export interface Reply {
    id: string;
    content: string;
    createdAt: Date;
}

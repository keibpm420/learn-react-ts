'use client';

import { useState } from 'react';
import Image from 'next/image';
import MemoList from './components/MemoList';
import { Memo } from './types/memo';

export default function Page() {
    const [text, setText] = useState<string>('');
    const [memos, setMemos] = useState<Memo[]>([]);

    const isInputEmpty = text.trim() === '';

    const handleAdd = () => {
        if (isInputEmpty) return;

        const newMemo: Memo = {
            id: crypto.randomUUID(),
            content: text,
            createdAt: new Date(),
            replies: [],
        };

        setMemos([...memos, newMemo]);
        setText('');
    };

    const handleDelete = (id: string) => {
        setMemos((prev) => prev.filter((memo) => memo.id !== id));
    };

    const handleUpdate = (id: string, newContent: string) => {
        setMemos((prev) =>
            prev.map((m) => (m.id === id ? { ...m, content: newContent } : m))
        );
    };

    const handleAddReply = (memoId: string, replyContent: string) => {
        setMemos((prev) =>
            prev.map((m) =>
                m.id === memoId
                    ? {
                          ...m,
                          replies: [
                              ...m.replies,
                              {
                                  id: crypto.randomUUID(),
                                  content: replyContent,
                                  createdAt: new Date(),
                              },
                          ],
                      }
                    : m
            )
        );
    };

    const handleDeleteReply = (replyId: string) => {
        setMemos((prev) =>
            prev.map((memo) => ({
                ...memo,
                replies: memo.replies.filter((reply) => reply.id !== replyId),
            }))
        );
    };

    const handleUpdateReply = (replyId: string, newContent: string) => {
        setMemos((prev) =>
            prev.map((memo) => ({
                ...memo,
                replies: memo.replies.map((r) =>
                    r.id === replyId ? { ...r, content: newContent } : r
                ),
            }))
        );
    };

    const handleKeyDownTextarea = (
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.nativeEvent.isComposing) return;
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className="container mx-auto max-w-9/12 p-16">
            <h1 className="text-3xl font-bold">Simple Memo App</h1>

            <div className="mt-4">
                <textarea
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none  min-h-20"
                    placeholder="新しいメモを入力"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    onKeyDown={handleKeyDownTextarea}
                ></textarea>
            </div>

            <button
                disabled={isInputEmpty}
                type="button"
                onClick={handleAdd}
                className={`p-3 rounded-full shadow-lg transition-all flex gap-4 mt-4
        ${
            isInputEmpty
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-800 active:scale-95'
        }`}
            >
                追加する
                <Image
                    unoptimized
                    src="/icon-add.svg"
                    width={24}
                    height={24}
                    className="invert"
                    alt=""
                />
            </button>

            <MemoList
                memos={memos}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                onAddReply={handleAddReply}
                onDeleteReply={handleDeleteReply}
                onUpdateReply={handleUpdateReply}
            />
        </div>
    );
}

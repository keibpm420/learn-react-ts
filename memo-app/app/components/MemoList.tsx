import { useState } from 'react';
import { SquarePen, Trash2, Check, X, MessageSquareMore } from 'lucide-react';
import { Memo } from '../types/memo';
import ReplyList from './ReplyList';

interface Props {
    memos: Memo[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, content: string) => void;
    onAddReply: (id: string, replyContent: string) => void;
    onDeleteReply: (id: string) => void;
    onUpdateReply: (id: string, content: string) => void;
}

export default function MemoList({
    memos,
    onDelete,
    onUpdate,
    onAddReply,
    onDeleteReply,
    onUpdateReply,
}: Props) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [replyingId, setReplyingId] = useState<string | null>(null);

    const startEdit = (memo: Memo) => {
        setEditingId(memo.id);
        setEditValue(memo.content);
    };

    const saveEdit = (id: string) => {
        onUpdate(id, editValue);
        setEditingId(null);
    };

    return (
        <ul className="space-y-12 mt-8">
            {memos.map((memo) => (
                <li
                    key={memo.id}
                    className="bg-gray-50 text-black p-4 rounded-xl"
                >
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                            {memo.createdAt.toLocaleString()}
                        </p>
                        <div className="flex gap-2">
                            {editingId === memo.id ? (
                                <>
                                    <button
                                        onClick={() => saveEdit(memo.id)}
                                        className="bg-blue-500 p-2 transition-transform active:scale-95 rounded-xl text-white"
                                    >
                                        <Check size={20} />
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-gray-400 p-2 transition-transform active:scale-95 rounded-xl text-white"
                                    >
                                        <X size={20} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => startEdit(memo)}
                                        className="bg-green-400 p-2 rounded-xl text-white transition-transform active:scale-95"
                                    >
                                        <SquarePen size={20} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(memo.id)}
                                        className="bg-red-400 p-2 rounded-xl text-white transition-transform active:scale-95"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="border-b-2 border-zinc-200 pt-2 mt-2 pb-2 mb-2">
                        {editingId === memo.id ? (
                            <textarea
                                onKeyDown={(e) => {
                                    if (
                                        e.key === 'Enter' &&
                                        (e.ctrlKey || e.metaKey)
                                    )
                                        saveEdit(memo.id);
                                    if (e.key === 'Escape') setEditingId(null);
                                }}
                                className="w-full rounded border-2 border-blue-500 outline-0 min-h-20 field-sizing-content"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                            />
                        ) : (
                            <p className="whitespace-pre-wrap">
                                {memo.content}
                            </p>
                        )}
                    </div>

                    <ReplyList
                        memoId={memo.id}
                        replies={memo.replies}
                        onAddReply={onAddReply}
                        onDeleteReply={onDeleteReply}
                        isInputVisible={replyingId === memo.id}
                        onUpdateReply={onUpdateReply}
                    />

                    {replyingId !== memo.id && (
                        <div className="flex gap-4 items-center">
                            <button
                                onClick={() => setReplyingId(memo.id)}
                                type="button"
                                className="mt-2 bg-yellow-400 p-2 rounded-xl text-white transition-transform active:scale-95"
                            >
                                <MessageSquareMore size={20} />
                            </button>
                            <span className="">
                                {memo.replies.length}件の返信
                            </span>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
}

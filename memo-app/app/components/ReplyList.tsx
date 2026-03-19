import { Check, SquarePen, Trash2, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { Reply } from '../types/memo';

interface Props {
    memoId: string;
    replies: Reply[];
    onAddReply: (memoId: string, replyContent: string) => void;
    onDeleteReply: (id: string) => void;
    isInputVisible: boolean;
    onUpdateReply: (id: string, content: string) => void;
}

export default function ReplyList({
    memoId,
    replies,
    onAddReply,
    onDeleteReply,
    onUpdateReply,
    isInputVisible,
}: Props) {
    const [replyText, setReplyText] = useState<string>('');
    const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>('');

    const handleAdd = () => {
        if (replyText.trim() === '') return;
        onAddReply(memoId, replyText);
        setReplyText('');
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

    const startEdit = (id: string, content: string) => {
        setEditingReplyId(id);
        setEditValue(content);
    };

    const saveEdit = (id: string) => {
        onUpdateReply(id, editValue);
        setEditingReplyId(null);
    };

    return (
        <div className="pl-4">
            {/* リプライ一覧：常に表示 */}
            <ul className="space-y-2 mb-3">
                {replies.map((r) => (
                    <li
                        key={r.id}
                        className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[14px] text-gray-400">
                                {r.createdAt.toLocaleString()}
                            </span>
                            <div className="flex gap-4">
                                {editingReplyId === r.id ? (
                                    <>
                                        <button
                                            onClick={() => saveEdit(r.id)}
                                            className="bg-blue-500 p-2 transition-transform active:scale-95 rounded-xl text-white"
                                        >
                                            <Check size={20} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setEditingReplyId(null)
                                            }
                                            className="bg-gray-400 p-2 transition-transform active:scale-95 rounded-xl text-white"
                                        >
                                            <X size={20} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() =>
                                                startEdit(r.id, r.content)
                                            }
                                            className="bg-green-400 p-2 rounded-xl text-white transition-transform active:scale-95"
                                        >
                                            <SquarePen size={20} />
                                        </button>
                                        <button
                                            onClick={() => onDeleteReply(r.id)}
                                            className="bg-red-400 p-2 rounded-xl text-white transition-transform active:scale-95"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        {editingReplyId === r.id ? (
                            <textarea
                                autoFocus
                                onKeyDown={(e) => {
                                    if (
                                        (e.metaKey || e.ctrlKey) &&
                                        e.key === 'Enter'
                                    )
                                        saveEdit(r.id);
                                }}
                                onChange={(e) => setEditValue(e.target.value)}
                                value={editValue}
                                className="w-full text-sm p-2 rounded-lg border border-gray-300 outline-none focus:border-blue-400 min-h-[40px] field-sizing-content"
                            />
                        ) : (
                            <p className="p-2 whitespace-pre-wrap text-sm text-gray-700">
                                {r.content}
                            </p>
                        )}
                    </li>
                ))}
            </ul>

            {/* 入力エリア */}
            {isInputVisible && (
                <>
                    <div className="flex gap-2 items-center">
                        <textarea
                            placeholder="返信を入力..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="flex-1 text-sm p-2 rounded-lg border border-gray-300 outline-none focus:border-blue-400 min-h-[40px] field-sizing-content"
                            autoFocus
                            onKeyDown={handleKeyDownTextarea}
                        />
                        <button
                            onClick={handleAdd}
                            type="button"
                            className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 transition-colors"
                        >
                            <Upload size={16} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

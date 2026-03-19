import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'todo app',
    description: 'This is todo app.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    );
}

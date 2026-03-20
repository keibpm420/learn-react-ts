'use client';

import styles from './page.module.css';
import { useState } from 'react';
import { fetchImage } from './fetch-image';

type CatImageProps = {
    url: string;
};

export function CatImage({ url }: CatImageProps) {
    const [imageUrl, setImageUrl] = useState<string>(url);

    const refreshCatImage = async () => {
        setImageUrl('');
        const image = await fetchImage();
        setImageUrl(image.url);
    };

    return (
        <div className={styles.page}>
            <button
                className={styles.button}
                type="button"
                onClick={refreshCatImage}
            >
                他のにゃんこも見る
            </button>
            <div className={styles.frame}>
                {imageUrl && (
                    <img className={styles.img} src={imageUrl} alt="" />
                )}
            </div>
        </div>
    );
}

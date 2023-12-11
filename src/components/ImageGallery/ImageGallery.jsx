import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";

export const ImageGallery = ({ items, onClick }) => {
    const usedKey = [];

    return (
        <>
            <ul className={styles.imageGallery}>
                {items.map(item => {
                    const key = item.id;

                    if (usedKey.includes(key)) {
                        return null;
                    };

                    usedKey.push(key);

                    return (
                        <ImageGalleryItem
                            item={item}
                            key={key}
                            onClick={onClick}
                        />
                    );
                })}
            </ul>
        </>
    );
};

import styles from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ onClick, item }) => {
    return (
        <>
            <li onClick={() => onClick(item)}>
                <img src={item.webformatURL} alt={item.tags} className={styles.imageGalleryItemPhoto} />
            </li>
        </>
    );
};

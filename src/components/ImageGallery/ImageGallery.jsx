import { Component } from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";

export class ImageGallery extends Component {
    render() {
        const usedKey = [];

        return (
            <>
                <ul className={styles.imageGallery}>
                    {this.props.items.map(item => {
                        const key = item.id;

                        if (usedKey.includes(key)) {
                            return null;
                        };

                        usedKey.push(key);

                        return (
                            <ImageGalleryItem
                                item={item}
                                key={key}
                                onClick={this.props.onClick}
                            />
                        );
                    })}
                </ul>
            </>
        );
    };
};

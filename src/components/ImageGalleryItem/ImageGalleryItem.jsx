import { Component } from "react";
import styles from "./ImageGalleryItem.module.css";

export class ImageGalleryItem extends Component {
    render() {
        return (
            <>
                <li onClick={() => this.props.onClick(this.props.item)}>
                    <img src={this.props.item.webformatURL} alt={this.props.item.tags} className={styles.imageGalleryItemPhoto} />
                </li>
            </>
        );
    };
};

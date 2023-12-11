import { Component } from "react";
import { createPortal } from "react-dom";
import { IconContext } from "react-icons";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
    keydownListener = event => {
        if (event.code === "Escape") {
            this.props.onClose();
        };
    };

    clickBackDrop = event => {
        if (event.target === event.currentTarget) {
            this.props.onClose();
        };
    };

    componentDidMount() {
        window.addEventListener("keydown", this.keydownListener);
    };

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keydownListener);
    };

    render() {
        return createPortal(
            <div className={styles.overlay}>
                <button type="button" onClick={this.props.onClose} className={styles.buttonClose}>
                    <IconContext.Provider value={{ size: 32 }}>
                        <AiFillCloseCircle className={styles.iconClose} />
                    </IconContext.Provider>
                </button>
                <div className={styles.modal}>
                    <img src={this.props.item.largeImageURL} alt={this.props.item.tags} />
                </div>
            </div>, modalRoot
        );
    };
};

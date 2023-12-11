import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { IconContext } from "react-icons";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export const Modal = ({ onClose, item }) => {
    const keydownListener = useCallback(e => {
        if (e.code === "Escape") {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        window.addEventListener("keydown", keydownListener);
        return () => {
            window.removeEventListener("keydown", keydownListener);
        };
    }, [keydownListener]);


    return createPortal(
        <div className={styles.overlay}>
            <button type="button" onClick={onClose} className={styles.buttonClose}>
                <IconContext.Provider value={{ size: 32 }}>
                    <AiFillCloseCircle className={styles.iconClose} />
                </IconContext.Provider>
            </button>
            
            <div className={styles.modal}>
                <img src={item.largeImageURL} alt={item.tags} />
            </div>
        </div>, modalRoot
    );
};

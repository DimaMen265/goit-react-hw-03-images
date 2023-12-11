import styles from "./Button.module.css";

export const Button = ({ onClick }) => (
    <>
        <button type="button" onClick={onClick} className={styles.button}>Load more</button>
    </>
);

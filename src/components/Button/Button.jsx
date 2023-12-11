import styles from "./Button.module.css";

export const Button = props => (
    <>
        <button type="button" onClick={props.onClick} className={styles.button}>Load more</button>
    </>
);

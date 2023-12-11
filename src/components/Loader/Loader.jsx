import { MagnifyingGlass } from "react-loader-spinner";
import styles from "./Loader.module.css";

export const Loader = () => (
    <div className={styles.loaderWrapper}>
        <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#3f51b5"
        />
    </div>
)

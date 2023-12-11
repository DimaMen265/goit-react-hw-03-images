import { AiOutlineSearch } from "react-icons/ai";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import styles from "./Searchbar.module.css";

let schema = object({
    searchString: string().required(),
});

export const Searchbar = ({ onSearch }) => {
    const handleSubmit = values => {
        onSearch(values.searchString.trim());
    };

    return (
        <header className={styles.searchbar}>
            <Formik initialValues={{ searchString: "" }} onSubmit={handleSubmit} validationSchema={schema}>
                <Form className={styles.searchForm}>
                    <button type="submit" className={styles.searchFormButton}>
                        <AiOutlineSearch className={styles.searchFormButtonLabel} />
                    </button>

                    <Field
                        name="searchString"
                        className={styles.searchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </Form>
            </Formik>
        </header>
    );
};

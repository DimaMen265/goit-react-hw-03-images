import React, { useState, useEffect, useRef } from "react";
import { getImages } from "./search-api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import styles from "./App.module.css";

import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const perPage = 12;

const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export const App = () => {
    const myApp = useRef(null);

    const [searchString, setSearchString] = useState("");
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [status, setStatus] = useState(STATUS.IDLE);

    const handleSetSearchString = searchString => {
        setSearchString(searchString);
        setItems([]);
        setItem(null);
        setPage(1);
        setTotalCount(0);
        setStatus(STATUS.IDLE);
    };

    const handleCloseModal = () => {
        setItem(null);
    };

    const handleIncreasePage = () => {
        setPage(page + 1);
    };

    const handleSetItem = item => {
        setItem(item);
    };

    useEffect(() => {
        if (searchString) {
            setStatus(STATUS.PENDING);
            
            getImages(searchString, page, perPage)
                .then(response => {
                    if (response.data.totalHits === 0) {
                        return Promise.reject(new Error("No data for this search"));
                    };

                    setItems(items => [...items, ...response.data.hits]);
                    setTotalCount(response.data.totalHits);
                    setStatus(STATUS.RESOLVED);
                })
                .catch(error => {
                    setStatus(STATUS.IDLE);
                    NotificationManager.error(error.message, "Click me!", 3000, () => { });
                });
        };
        
        if (myApp.current) {
            window.scrollTo(0, myApp.current.scrollHeight);
        };
    }, [searchString, page]);

    return (
        <div ref={myApp} className={styles.app}>
            <Searchbar onSearch={handleSetSearchString} />

            <ImageGallery items={items} onClick={handleSetItem} />

            {status === STATUS.RESOLVED &&
                totalCount > perPage &&
                page * perPage < totalCount &&
                <Button onClick={handleIncreasePage} />
            }

            {status === STATUS.PENDING && <Loader />}

            {item && status ===
                STATUS.RESOLVED && (
                    <Modal onClose={handleCloseModal} item={item} />
                )
            }

            <NotificationContainer />
        </div>
    );
};

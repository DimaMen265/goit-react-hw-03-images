import React, { Component } from "react";
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

export class App extends Component {
    constructor(props) {
        super(props);
        this.myApp = React.createRef();
    };

    state = {
        searchString: "",
        items: [],
        error: null,
        page: 1,
        totalCount: 0,
        item: null,
        status: STATUS.IDLE,
    };

    handleSetSearchString = searchString => {
        this.setState({
            searchString: searchString,
            items: [],
            error: null,
            page: 1,
            totalCount: 0,
            item: null,
            status: STATUS.IDLE,
        });
    };

    handleCloseModal = () => {
        this.setState({ item: null });
    };

    handleIncreasePage = () => {
        this.setState(prevState => {
            return { page: prevState.page + 1 };
        });
    };

    handleSetItem = item => {
        this.setState({ item });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchString !== this.state.searchString || prevState.page !== this.state.page) {
            this.setState({ status: STATUS.PENDING });

            getImages(this.state.searchString, this.state.page, perPage)
                .then(response => {
                    if (response.data.totalHits === 0) {
                        return Promise.reject(new Error("No data for this search"));
                    };

                    this.setState(prevState => {
                        return {
                            items: [...prevState.items, ...response.data.hits],
                            totalCount: response.data.totalHits,
                            status: STATUS.RESOLVED,
                        };
                    });
                })
                .catch(error => {
                    this.setState({ status: STATUS.IDLE });
                    NotificationManager.error(error.message, "Click me!", 3000, () => { });
                });
        };

        if (this.myApp.current) {
            window.scrollTo(0, this.myApp.current.scrollHeight);
        };
    };

    render() {
        return (
            <div ref={this.myApp} className={styles.app}>
                <Searchbar onSearch={this.handleSetSearchString} />

                <ImageGallery items={this.state.items} onClick={this.handleSetItem} />

                {this.state.status === STATUS.RESOLVED &&
                    this.state.totalCount > perPage &&
                    this.state.page * perPage < this.state.totalCount &&
                    <Button onClick={this.handleIncreasePage} />
                }

                {this.state.status === STATUS.PENDING && <Loader />}

                {this.state.item && this.state.status ===
                    STATUS.RESOLVED && (
                        <Modal onClose={this.handleCloseModal} item={this.state.item} />
                    )
                }

                <NotificationContainer />
            </div>
        );
    };
};

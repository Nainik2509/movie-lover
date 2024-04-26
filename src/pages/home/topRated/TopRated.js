import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import '../style.css';

const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading, error } = useFetch(`/${endpoint}/top_rated`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    if (error !== null && loading === false) {
        return (
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle">Top Rated</span>
                    <h2 className="errorMessage">Something went wrong</h2>
                </ContentWrapper>
            </div>
        )
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
};

export default TopRated;

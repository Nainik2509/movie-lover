import React, { useState } from "react";
import '../style.css';
import Carousel from '../../../components/carousel/Carousel';
import useFetch from "../../../hooks/useFetch";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

function Trending() {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading, error } = useFetch(`/trending/movie/${endpoint}`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    if (error !== null && loading === false) {
        return (
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle">Trending</span>
                    <h2 className="errorMessage">Something went wrong</h2>
                </ContentWrapper>
            </div>
        )
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Trending

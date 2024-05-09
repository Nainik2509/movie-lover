import React, { useRef } from "react";
import { Typography } from "@mui/material";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Skeleton from 'react-loading-skeleton';
import MovieCard from "../movieCard/MovieCard";
import "./style.css";

const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skeletonItem = () => (
        <div className="skeletonItem">
            <div className="posterBlock skeleton ">
                <Skeleton width={150} height={225} />
            </div>
            <div className="textBlock">
                <div className="title skeleton ">
                    <Skeleton width={100} />
                </div>
                <div className="date skeleton ">
                    <Skeleton width={80} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && (
                    <Typography variant="h6" className='carouselTitle'>
                        {title}
                    </Typography>
                )}
                {!loading ? (
                    <>
                        <button
                            className="carouselLeftNav arrow"
                            onClick={() => navigation("left")}
                        >
                            <ArrowCircleLeftOutlinedIcon />
                        </button>
                        <button
                            className="carouselRightNav arrow"
                            onClick={() => navigation("right")}
                        >
                            <ArrowCircleRightOutlinedIcon />
                        </button>
                        <div className="carouselItems" ref={carouselContainer}>
                            {data?.map((item, index) => {
                                return (
                                    <MovieCard
                                        key={index}
                                        data={item}
                                        mediaType={endpoint}
                                    />
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="loadingSkeleton">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <React.Fragment key={index}>{skeletonItem()}</React.Fragment>
                        ))}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;

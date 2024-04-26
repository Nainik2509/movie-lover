import React, { useRef } from "react";
import { Typography } from "@mui/material";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CircleRating from '../circleRating/CircleRating';
import ContentWrapper from "../contentWrapper/ContentWrapper";
import LoadImg from "../lazyLoadImage/LoadImg";
import PosterFallback from "../../assets/no-poster.png";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "./style.css";

const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();
    const { image_url } = useSelector((state) => state.home);
    const navigate = useNavigate();

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
                            {data?.map((item) => {
                                const posterUrl = item.poster_path
                                    ? image_url.poster + item.poster_path
                                    : PosterFallback;
                                return (
                                    <div
                                        key={item.id}
                                        className="carouselItem"
                                        onClick={() =>
                                            navigate(`/${item.media_type || endpoint}/${item.id}`)
                                        }
                                    >
                                        <div className="posterBlock">
                                            <LoadImg src={posterUrl} />
                                            <CircleRating
                                                rating={item.vote_average.toFixed(
                                                    1
                                                )}
                                            />
                                        </div>
                                        <div className="textBlock">
                                            <Typography variant="body1" className="title">
                                                {item.title || item.name}
                                            </Typography>
                                            <Typography variant="body2" className="date">
                                                {dayjs(
                                                    item.release_date || item.first_air_date
                                                ).format("MMM D, YYYY")}
                                            </Typography>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <SkeletonTheme duration={4}>
                        <div className="loadingSkeleton">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <React.Fragment key={index}>{skeletonItem()}</React.Fragment>
                            ))}
                        </div>
                    </SkeletonTheme>

                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;

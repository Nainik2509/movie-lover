import React, { useState } from 'react'
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/LoadImg";
import PosterFallback from "../../../assets/no-poster.png";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import './style.css'
import PlayButton from '../../../components/playButton/PlayButton';
import Genres from '../../../components/genres/Genres';
import VideoPopUp from '../../../components/videoPopUp/VideoPopUp';

function DetailsBanner({ video, crew }) {
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const { image_url } = useSelector((state) => state.home)

    const _genres = data?.genres?.map((g) => g.id);

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    }

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    return (
        <div className='detailsBanner'>
            {!loading && !!data ? (
                <ContentWrapper>
                    <div className="content">
                        <div className="left">
                            {data.poster_path ? (
                                <Img
                                    className="posterImg"
                                    src={
                                        image_url.backdrop +
                                        data.poster_path
                                    }
                                />
                            ) : (
                                <Img
                                    className="posterImg"
                                    src={PosterFallback}
                                />
                            )}
                        </div>
                        <div className="right">
                            <div className="title">
                                {`${data.name || data.title
                                    } (${dayjs(
                                        data?.release_date
                                    ).format("YYYY")})`}
                            </div>
                            <div className="subtitle">
                                {data.tagline}
                            </div>

                            <Genres data={_genres} />

                            <div className="row">
                                <CircleRating
                                    rating={data.vote_average.toFixed(
                                        1
                                    )}
                                />
                                <div
                                    className="playbtn"
                                    onClick={() => {
                                        setShow(true);
                                        setVideoId(video.key);
                                    }}
                                >
                                    <PlayButton />
                                    <span className="text">
                                        Watch Trailer
                                    </span>
                                </div>
                            </div>

                            <div className="overview">
                                <div className="heading">
                                    Overview
                                </div>
                                <div className="description">
                                    {data.overview}
                                </div>
                            </div>

                            <div className="info">
                                {data.status && (
                                    <div className="infoItem">
                                        <span className="text bold">
                                            Status:{" "}
                                        </span>
                                        <span className="text">
                                            {data.status}
                                        </span>
                                    </div>
                                )}
                                {data.release_date && (
                                    <div className="infoItem">
                                        <span className="text bold">
                                            Release Date:{" "}
                                        </span>
                                        <span className="text">
                                            {dayjs(
                                                data.release_date
                                            ).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                )}
                                {(data.runtime !== 0 && data.runtime) && (
                                    <div className="infoItem">
                                        <span className="text bold">
                                            Runtime:{" "}
                                        </span>
                                        <span className="text">
                                            {toHoursAndMinutes(
                                                data.runtime
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {director?.length > 0 && (
                                <div className="info">
                                    <span className="text bold">
                                        Director:{" "}
                                    </span>
                                    <span className="text">
                                        {director?.map((d, i) => (
                                            <span key={i}>
                                                {d.name}
                                                {director.length -
                                                    1 !==
                                                    i && ", "}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )}

                            {writer?.length > 0 && (
                                <div className="info">
                                    <span className="text bold">
                                        Writer:{" "}
                                    </span>
                                    <span className="text">
                                        {writer?.map((d, i) => (
                                            <span key={i}>
                                                {d.name}
                                                {writer.length -
                                                    1 !==
                                                    i && ", "}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )}

                            <VideoPopUp
                                show={show}
                                setShow={setShow}
                                videoId={videoId}
                                setVideoId={setVideoId}
                            />
                        </div>
                    </div>
                </ContentWrapper>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default DetailsBanner

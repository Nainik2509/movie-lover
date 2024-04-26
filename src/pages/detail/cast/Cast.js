import React from 'react'
import './style.css'
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import LoadImg from "../../../components/lazyLoadImage/LoadImg";
import avatar from "../../../assets/avatar.png";

export default function Cast({ data, loading }) {
    const { image_url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skeletonItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((item) => {
                            let imgUrl = item.profile_path
                                ? image_url.profile + item.profile_path
                                : avatar;
                            return (
                                <div key={item.id} className="listItem">
                                    <div className="profileImg">
                                        <LoadImg src={imgUrl} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <React.Fragment key={index}>{skeleton()}</React.Fragment>
                        ))}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
}

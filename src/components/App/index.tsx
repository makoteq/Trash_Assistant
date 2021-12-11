import { MutableRefObject, useContext, useEffect, useRef } from "react";
import style from "./index.module.scss";
import { videoDataCtx } from "../../constants";
import { Overlay } from "../Overlay";
import { spawnDialog } from "../AlertDialog/spawnDialog";
import { Intro } from "../Intro";

export const App = () => {
    const videoPlayer: MutableRefObject<HTMLVideoElement | null> = useRef(null);
    const videoData = useContext(videoDataCtx);

    useEffect(() => {
        if (videoPlayer.current && videoData) {
            videoPlayer.current.srcObject = videoData.stream;
            if (window.localStorage.getItem("intro") !== "true") {
                setTimeout(
                    () =>
                        spawnDialog((c) => {
                            return <Intro closeFn={c} />;
                        }),
                    500
                );
            }
        }
    }, [videoData]);

    return (
        <div className={style.appContainer}>
            <Overlay key="overlay" />
            <video id="video-feed" style={{ zIndex: 0 }} key="camera" autoPlay={true} muted={true} ref={videoPlayer} className={style.videoFeed}></video>,
        </div>
    );
};

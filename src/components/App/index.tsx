import { MutableRefObject, useContext, useEffect, useRef } from "react";
import style from "./index.module.scss";
import { videoStreamCtx } from "../../constants";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { Overlay } from "../Overlay";

function App() {
    const videoPlayer: MutableRefObject<HTMLVideoElement | null> = useRef(null);
    const videoStream = useContext(videoStreamCtx);

    useEffect(() => {
        if (videoPlayer.current && videoStream) videoPlayer.current.srcObject = videoStream;
    });

    return (
        <div className={style.appContainer}>
            {videoStream ? (
                [<Overlay key="overlay" />, <video style={{ zIndex: 0 }} key="camera" autoPlay={true} muted={true} ref={videoPlayer} className={style.videoFeed}></video>]
            ) : (
                <Box verticalAlignment="center" horizontalAlignment="center" gap={3} direction="column">
                    <Icon type={"x-circle"} color={"#ff0000"} size={120}></Icon>
                    <h1 style={{ color: "#ff0000" }}>Nie udało się uzyskać dostępu do kamery</h1>
                    <h2 style={{ color: "#ff0000" }}>Upewnij się, że przyznałeś stronie odpowiednie uprawnienia oraz że twoje urządzenie obsługuje tę funkcję</h2>
                </Box>
            )}
        </div>
    );
}

export default App;

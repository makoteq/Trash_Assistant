import { FC, useEffect, useState } from "react";
import { VideoData, videoDataCtx } from "../../constants";
import { spawnDialog } from "../AlertDialog/spawnDialog";
import { Box } from "../Box";
import { Icon } from "../Icon";

export const VideoProvider: FC<{ devices: MediaDeviceInfo[]; device: MediaDeviceInfo; stream: MediaStream }> = (props) => {
    const [videoData, setVideoData] = useState<VideoData>({ devices: props.devices, device: props.device, stream: props.stream, setter: () => null });
    useEffect(() => {
        setVideoData((videoData) => {
            return {
                ...videoData,
                setter: setVideoData,
            };
        });
        Object.freeze(videoData.setter);
    }, [props.devices, props.device, props.stream, videoData.setter]);
    useEffect(() => {
        window.localStorage.setItem("videoDeviceId", videoData.device.deviceId);
        window.navigator.mediaDevices
            .getUserMedia({ video: { deviceId: videoData.device.deviceId } })
            .then((s) =>
                setVideoData((videoData) => {
                    return { ...videoData, stream: s };
                })
            )
            .catch((e) => {
                spawnDialog((c) => {
                    return (
                        <Box direction="column" verticalAlignment="center" horizontalAlignment="center" gap={10}>
                            <Icon type="x-circle" color="#ff0000" size={90} />
                            <h3 style={{ color: "#ff0000" }}>Nie można uzyskać obrazu z wybranej kamery. Upewnij się, że kamera działa i nie jest używana przez inną aplikację.</h3>
                            <p style={{ color: "#666666" }}>{(e as Error).message}</p>
                            <button onClick={c}>Zamknij</button>
                        </Box>
                    );
                });
            });
    }, [videoData.device]);

    return <videoDataCtx.Provider value={videoData}>{props.children}</videoDataCtx.Provider>;
};

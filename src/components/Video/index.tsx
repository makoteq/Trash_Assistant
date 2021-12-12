import { FC, useEffect, useState } from "react";
import { VideoCtx, VideoData, videoDataCtx } from "../../constants";
import { spawnDialog } from "../AlertDialog/spawnDialog";
import { Box } from "../Box";
import { Icon } from "../Icon";

export const Video: { Provider: FC<{ data: VideoData }>; initialize: () => Promise<VideoData> } = {
    Provider: (props) => {
        const [videoData, setVideoData] = useState<VideoCtx>({ ...props.data, setter: () => null });
        useEffect(() => {
            setVideoData((videoData) => {
                return { ...videoData, setter: setVideoData };
            });
            Object.freeze(videoData.setter);
        }, [videoData.setter]);
        useEffect(() => {
            window.localStorage.setItem("videoDeviceId", videoData.device.deviceId);
        }, [videoData.device]);
        useEffect(() => {
            videoData.stream.getVideoTracks()[0].getSettings().deviceId !== videoData.device.deviceId &&
                window.navigator.mediaDevices
                    .getUserMedia({ video: { deviceId: videoData.device.deviceId } })
                    .then((s) => {
                        videoData.stream.getTracks().forEach((t) => t.stop());
                        setVideoData((videoData) => {
                            return { ...videoData, stream: s };
                        });
                    })
                    .catch((e) => {
                        spawnDialog((c) => {
                            return (
                                <Box direction="column" verticalAlignment="center" horizontalAlignment="center" gap={10}>
                                    <Icon type="x-circle" color="#ff0000" size={90} />
                                    <h3 style={{ color: "#ff0000" }}>
                                        Nie można uzyskać obrazu z wybranej kamery. Upewnij się, że kamera działa i nie jest używana przez inną aplikację.
                                    </h3>
                                    <p style={{ color: "#666666" }}>{(e as Error).message}</p>
                                    <button autoFocus className="btn-inverse" style={{ width: "100%" }} onClick={c}>
                                        Zamknij
                                    </button>
                                </Box>
                            );
                        });
                    });
        }, [videoData.device, videoData.stream]);

        return <videoDataCtx.Provider value={videoData}>{props.children}</videoDataCtx.Provider>;
    },
    initialize: async (): Promise<VideoData> => {
        const prefferedId = window.localStorage.getItem("videoDeviceId");
        const stream = await window.navigator.mediaDevices.getUserMedia({ video: prefferedId ? { deviceId: prefferedId } : { facingMode: "environment" } });
        const deviceId = stream?.getVideoTracks()[0].getSettings().deviceId;
        const devices = await window.navigator.mediaDevices.enumerateDevices().then((d) => d.filter((d) => d.kind === "videoinput"));
        const currentDevice = devices.find((d) => d.deviceId === deviceId) as MediaDeviceInfo;
        window.localStorage.setItem("videoDeviceId", deviceId ?? "");
        return {
            stream: stream,
            devices: devices,
            device: currentDevice,
        };
    },
};

import { FC, useEffect, useState } from "react";
import { VideoData, videoDataCtx } from "../../constants";

export const VideoProvider: FC<{ devices: MediaDeviceInfo[]; device: MediaDeviceInfo; stream: MediaStream }> = (props) => {
    const [videoData, setVideoData] = useState<VideoData>({ devices: props.devices, device: props.device, stream: props.stream, setter: () => null });
    useEffect(() => {
        setVideoData({
            devices: props.devices,
            device: props.device,
            stream: props.stream,
            setter: setVideoData,
        });
        Object.freeze(videoData.setter);
    }, [props.devices, props.device, props.stream, videoData.setter]);
    useEffect(() => {
        window.localStorage.setItem("videoDeviceId", videoData.device.deviceId);
        window.navigator.mediaDevices.getUserMedia({ video: { deviceId: videoData.device.deviceId } }).then((s) => setVideoData({ ...videoData, stream: s }));
    }, [videoData.device]);

    return <videoDataCtx.Provider value={videoData}>{props.children}</videoDataCtx.Provider>;
};

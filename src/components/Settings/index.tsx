import { FC, useCallback, useContext, useState } from "react";
import { videoDataCtx } from "../../constants";
import { Box } from "../Box";
import { Icon } from "../Icon";
import style from "./index.module.scss";

export const Settings: FC<{ cfn: (data?: any) => void }> = (props) => {
    const videoData = useContext(videoDataCtx);
    const [device, changeDevice] = useState<MediaDeviceInfo>();
    const getDevices = useCallback(() => {
        videoData?.setter({ ...videoData, devices: window.navigator.mediaDevices.enumerateDevices().then((d) => d.filter((d) => d.kind === "videoinput")) });
    }, [videoData]);

    return (
        <Box direction="column" verticalAlignment="center" horizontalAlignment="center" gap={10}>
            <h1>Ustawienia</h1>
            <Box direction="row" gap={5} verticalAlignment="center">
                <select
                    className={style.cameraSelector}
                    defaultValue={videoData?.device.deviceId}
                    onChange={(e) => {
                        e.preventDefault();
                        const d = videoData?.devices.find((d) => d.deviceId === e.target.value);
                        d && changeDevice(d);
                    }}
                >
                    {videoData?.devices.map((d) => (
                        <option key={d.deviceId} value={d.deviceId}>
                            {d.label}
                        </option>
                    ))}
                </select>
                <button onClick={getDevices}>
                    <Icon className={style.refreshBtn} type="arrow-clockwise" size={20} />
                </button>
            </Box>
            <button
                style={{ width: "100%" }}
                className={"btn-inverse"}
                onClick={() => {
                    props.cfn();
                    if (device?.deviceId && device?.deviceId !== videoData?.device.deviceId) {
                        videoData?.setter({ ...videoData, device: device });
                    }
                }}
            >
                Zamknij
            </button>
        </Box>
    );
};

import { FC, useCallback, useContext, useState } from "react";
import { videoDataCtx } from "../../constants";
import { spawnDialog } from "../AlertDialog/spawnDialog";
import { Box } from "../Box";
import { Icon } from "../Icon";
import style from "./index.module.scss";

export const Settings: FC<{ cfn: (data?: any) => void }> = (props) => {
    const videoData = useContext(videoDataCtx);
    const [device, changeDevice] = useState<MediaDeviceInfo | null>(videoData?.device ?? null);
    const getDevices = useCallback(async () => {
        const l = await window.navigator.mediaDevices.enumerateDevices().then((d) => d.filter((d) => d.kind === "videoinput"));
        videoData?.setter((videoData) => {
            return { ...videoData, devices: l };
        });
    }, [videoData]);

    return (
        <Box direction="column" verticalAlignment="center" horizontalAlignment="center" gap={10}>
            <h1>Ustawienia</h1>
            <label>
                Wybierz kamerę
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
                    <button aria-label="Odśwież listę urządzeń" onClick={getDevices}>
                        <Icon className={style.refreshBtn} type="arrow-clockwise" size={20} />
                    </button>
                </Box>
            </label>
            <button
                aria-label="Zamknij okno i zapisz ustawienia"
                autoFocus
                style={{ width: "100%" }}
                className={"btn-inverse"}
                onClick={async () => {
                    props.cfn();
                    try {
                        if (device?.deviceId && device?.deviceId !== videoData?.device.deviceId) {
                            const stream = await window.navigator.mediaDevices.getUserMedia({ video: { deviceId: device.deviceId } });
                            videoData?.stream.getTracks().forEach((t) => t.stop());
                            videoData?.setter((videoData) => {
                                return { ...videoData, stream: stream, device: device };
                            });
                        }
                    } catch (e) {
                        spawnDialog((c) => {
                            return (
                                <Box direction="column" verticalAlignment="center" horizontalAlignment="center" gap={10}>
                                    <Icon type="x-circle" color="#ff0000" size={90} />
                                    <h3 style={{ color: "#ff0000" }}>
                                        Nie można uzyskać obrazu z wybranej kamery. Upewnij się, że kamera działa i nie jest używana przez inną aplikację.
                                    </h3>
                                    <p style={{ color: "#666666" }}>{(e as Error).message}</p>
                                    <button aria-label="Zamknij okno dialogowe" autoFocus className="btn-inverse" style={{ width: "100%" }} onClick={c}>
                                        Zamknij
                                    </button>
                                </Box>
                            );
                        });
                    }
                }}
            >
                Zamknij
            </button>
        </Box>
    );
};

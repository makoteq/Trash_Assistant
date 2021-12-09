import { FC } from "react";
import { spawnDialog } from "../../AlertDialog/spawnDialog";
import { getVideoFrame } from "../../utils/getVideoFrame";
import { Icon } from "../Icon";
import style from "./index.module.scss";

export const Overlay: FC = () => {
    return (
        <div className={style.container}>
            <button
                className={style.aboutBtn}
                onClick={() =>
                    spawnDialog((close) => {
                        return <></>;
                    })
                }
            >
                <Icon type="info-circle-fill" size={30} />
            </button>
            <button
                className={style.captureBtn}
                onClick={() =>
                    spawnDialog((c) => {
                        return [<img width={500} src={getVideoFrame(document.querySelector("#video-feed") as HTMLVideoElement)} />, <button onClick={c}>close</button>];
                    })
                }
            >
                <Icon type="camera-fill" size={40} />
            </button>
        </div>
    );
};

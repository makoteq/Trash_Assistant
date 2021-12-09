import { FC, useContext } from "react";
import { spawnDialog } from "../../AlertDialog/spawnDialog";
import { modelCtx } from "../../constants";
import { getVideoFrame } from "../../utils/getVideoFrame";
import { Icon } from "../Icon";
import style from "./index.module.scss";

export const Overlay: FC = () => {
    const model = useContext(modelCtx);

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
                onClick={async () => {
                    const can = getVideoFrame(document.querySelector("#video-feed") as HTMLVideoElement);
                    const r = await model?.classify(can);
                    console.log(r);
                    spawnDialog((c) => {
                        return (
                            <>
                                <img width={500} alt={r?.[0].className} src={can.toDataURL("image/png")} />
                                <p>{r?.[0].className}</p>
                                <p>{r?.[0].probability}</p>
                                <button onClick={c}>close</button>
                            </>
                        );
                    });
                }}
            >
                <Icon type="camera-fill" size={40} />
            </button>
        </div>
    );
};

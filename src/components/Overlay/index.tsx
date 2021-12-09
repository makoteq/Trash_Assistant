import { FC } from "react";
import { spawnDialog } from "../../AlertDialog/spawnDialog";
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
            <button className={style.captureBtn}>
                <Icon type="camera-fill" size={40} />
            </button>
        </div>
    );
};

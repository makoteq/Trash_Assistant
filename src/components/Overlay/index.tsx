import { FC } from "react";
import { spawnDialog } from "../../AlertDialog/spawnDialog";
import { Icon } from "../Icon";
import style from "./index.module.scss";

export const Overlay: FC = () => {
    return (
        <div className={style.container}>
            <div className={style.tip}>Zeskanuj obiekt za pomocą aparatu...</div>
            <button
                className={style.aboutBtn}
                onClick={() =>
                    spawnDialog((close) => {
                        return <></>;
                    })
                }
            >
                <Icon type="info-circle-fill" /> Informacje
            </button>
        </div>
    );
};

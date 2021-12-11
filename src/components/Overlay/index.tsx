import { FC, useContext } from "react";
import { spawnDialog } from "../AlertDialog/spawnDialog";
import { modelCtx } from "../../constants";
import { About } from "../About";
import { Icon } from "../Icon";
import { Results } from "../Results";
import style from "./index.module.scss";

export const Overlay: FC = () => {
    const model = useContext(modelCtx);
    return (
        <div className={style.container}>
            <button className={style.aboutBtn} onClick={() => spawnDialog((c) => <About cfn={c} />)}>
                <Icon type="info-circle-fill" size={30} />
            </button>
            <button
                className={style.captureBtn}
                onClick={async () => {
                    spawnDialog(
                        (c) => {
                            return (
                                <modelCtx.Provider value={model}>
                                    <Results />
                                    <button style={{ width: "100%" }} onClick={c} className="btn-inverse">
                                        Zamknij
                                    </button>
                                </modelCtx.Provider>
                            );
                        },
                        {
                            padding: "20px",
                            minWidth: "40vw",
                            maxWidth: "80vw",
                            borderRadius: "10px",
                            color: "#000",
                            fontWeight: 700,
                            fontSize: "1.8em",
                        }
                    );
                }}
            >
                <Icon type="camera-fill" size={40} />
            </button>
        </div>
    );
};

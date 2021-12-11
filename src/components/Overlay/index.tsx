import { FC, useContext } from "react";
import { spawnDialog } from "../AlertDialog/spawnDialog";
import { accentColor, database, modelCtx, videoDataCtx } from "../../constants";
import { About } from "../About";
import { Icon } from "../Icon";
import { Results } from "../Results";
import style from "./index.module.scss";
import { getVideoFrame } from "../../utils/getVideoFrame";
import { Settings } from "../Settings";

export const Overlay: FC = () => {
    const model = useContext(modelCtx);
    const videoData = useContext(videoDataCtx);
    return (
        <div className={style.container}>
            <button
                className={style.settingsBtn}
                onClick={() =>
                    spawnDialog((c) => (
                        <videoDataCtx.Provider value={videoData}>
                            <Settings cfn={c} />
                        </videoDataCtx.Provider>
                    ))
                }
            >
                <Icon type="gear-fill" size={30} />
            </button>
            <button className={style.aboutBtn} onClick={() => spawnDialog((c) => <About cfn={c} />)}>
                <Icon type="info-circle-fill" size={30} />
            </button>
            <button
                className={style.captureBtn}
                onClick={async () => {
                    const can = getVideoFrame(document.querySelector("#video-feed") as HTMLVideoElement);
                    const modelResult = await model?.classify(can);
                    const guess = modelResult?.[0].className.split(",")[0] ?? "";
                    const result = database.find((e) => e.AIname.indexOf(guess) !== -1);
                    console.log(guess);
                    alert(guess);
                    spawnDialog(
                        (c) => {
                            return (
                                <>
                                    <Results type={result} />
                                    <button style={{ width: "100%", backgroundColor: result?.color ?? accentColor, border: "0px transparent" }} onClick={c} className="btn-inverse">
                                        Zamknij
                                    </button>
                                </>
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

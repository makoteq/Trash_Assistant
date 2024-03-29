import { FC, useContext, useEffect, useState } from "react";
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
    const [landscapeMode, changeLandscape] = useState(window.outerWidth > window.outerHeight);
    useEffect(() => {
        window.addEventListener("resize", (e) => {
            changeLandscape(window.outerWidth > window.outerHeight);
        });
    }, []);
    return (
        <div className={style.container}>
            <button
                aria-label="Ustawienia aplikacji"
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
            <button aria-label="Informacje o aplikacji" className={style.aboutBtn} onClick={() => spawnDialog((c) => <About cfn={c} />)}>
                <Icon type="info-circle-fill" size={30} />
            </button>
            <button
                aria-label="Przechwytywanie"
                autoFocus
                className={`${style.captureBtn} ${landscapeMode ? style.landscape : ""}`}
                onClick={async () => {
                    const can = getVideoFrame(document.querySelector("#video-feed") as HTMLVideoElement);
                    const modelResult = await model?.classify(can);
                    const guess = modelResult?.[0].className.split(",")[0] ?? "";
                    const result = database.find((e) => e.AIname.indexOf(guess) !== -1);
                    spawnDialog(
                        (c) => {
                            return (
                                <>
                                    <Results type={result} />
                                    <button
                                        aria-label="Zamknij okno dialogowe"
                                        autoFocus
                                        style={{ width: "100%", backgroundColor: result?.color ?? accentColor, border: "0px transparent" }}
                                        onClick={c}
                                        className="btn-inverse"
                                    >
                                        Zamknij
                                    </button>
                                </>
                            );
                        },
                        {
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

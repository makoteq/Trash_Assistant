import { FC, useContext, useEffect, useState } from "react";
import { modelCtx } from "../../constants";
import { getVideoFrame } from "../../utils/getVideoFrame";
import style from "./index.module.scss";
import loadingCircle from "../../assets/loadingCircle.png";
import { Box } from "../Box";

export const Results: FC<{}> = (_) => {
    const [el, uel] = useState(
        <Box direction="column" gap={10} verticalAlignment="center" horizontalAlignment="center">
            <img alt="loading-circle" className={style.loadingCircle} src={loadingCircle} width={100} height={100} />
            <h1 className={style.loadingLbl}>Trwa analizowanie zdjęcia...</h1>
        </Box>
    );
    const model = useContext(modelCtx);

    useEffect(() => {
        const can = getVideoFrame(document.querySelector("#video-feed") as HTMLVideoElement);
        model?.classify(can).then((r) => {
            console.log(r);
            uel(
                <>
                    <img className={style.img} alt={r?.[0].className} src={can.toDataURL("image/png")} />
                    <p>{r?.[0].className}</p>
                    <p>{r?.[0].probability}</p>
                </>
            );
        });
    }, [model]);

    return el;
};

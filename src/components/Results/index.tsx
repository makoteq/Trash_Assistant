import { FC, useContext, useEffect, useState } from "react";
import { database, modelCtx } from "../../constants";
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
    const getBestGuess = (g: string) => g.split(",")[0];

    useEffect(() => {
        const can = getVideoFrame(document.querySelector("#video-feed") as HTMLVideoElement);
        model?.classify(can).then((r) => {
            console.log(getBestGuess(r?.[0].className));
            database.every((element) => {
                console.log(element.AIname);
                if (element.AIname === getBestGuess(r?.[0].className)) {
                    console.log(element.type);
                    uel(
                      <>
                        <p className={element.type}>{element.type}</p>
                      </>
                  );
                    return false;
                }
                uel(
                  <>
                    <p >nie znaleziono</p>
                  </>
              );
                return true;
            });
       
        });
    }, [model]);

    return el;
};

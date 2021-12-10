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
<<<<<<< HEAD
    model?.classify(can).then((r) => {
      console.log(getBestGuess(r?.[0].className));
      database.every((element) => {
          console.log(element.AIname)
        if (element.AIname == getBestGuess(r?.[0].className)) {
          console.log(element.type);
          return false;
        }
        return true;
      });
      uel(
        <>
          <p></p>
        </>
      );
    });
  }, [model]);
=======
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
                    return false;
                }
                return true;
            });
            uel(
                <>
                    <img className={style.img} alt={r?.[0].className} src={can.toDataURL("image/png")} />
                    <p>{r?.[0].className}</p>
                    <p>{r?.[0].probability}</p>
                </>
            );
        });
    }, [model]);
>>>>>>> 5775834eeee313dbb026e5adefac33950ef73c81

    return el;
};

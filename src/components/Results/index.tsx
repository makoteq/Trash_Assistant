import { FC, useContext, useEffect, useState } from "react";
import { modelCtx } from "../../constants";
import { getVideoFrame } from "../../utils/getVideoFrame";
import style from "./index.module.scss";
import loadingCircle from "../../assets/loadingCircle.png";
import { Box } from "../Box";

export const Results: FC<{}> = (_) => {
    //0-papier,1-metale i tworzywa sztuczne,2-szkło,3-bio,4-resztkowe
  const database = [
    { AIname: "water bottle", type: 1 },
    { AIname: "cash machine", type: 0 },
    { AIname: "iPod", type: 0 },
    { AIname: "cash machine", type: 0 },
    { AIname: "cash machine", type: 0 },
    { AIname: "cash machine", type: 0 },
  ];

  const [el, uel] = useState(
    <Box
      direction="column"
      gap={10}
      verticalAlignment="center"
      horizontalAlignment="center"
    >
      <img
        alt="loading-circle"
        className={style.loadingCircle}
        src={loadingCircle}
        width={100}
        height={100}
      />
      <h1 className={style.loadingLbl}>Trwa analizowanie zdjęcia...</h1>
    </Box>
  );
  const model = useContext(modelCtx);
  function getBestGuess(str: string) {
    return str.split(",")[0];
  }

  useEffect(() => {
    const can = getVideoFrame(
      document.querySelector("#video-feed") as HTMLVideoElement
    );
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
          <img
            className={style.img}
            alt={r?.[0].className}
            src={can.toDataURL("image/png")}
          />
          <p>{r?.[0].className}</p>
          <p>{r?.[0].probability}</p>
        </>
      );
    });
  }, [model]);

  return el;
};

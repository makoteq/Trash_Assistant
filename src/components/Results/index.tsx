import { FC, useContext, useEffect, useState } from "react";
import { database, modelCtx } from "../../constants";
import { getVideoFrame } from "../../utils/getVideoFrame";
import style from "./index.module.scss";
import loadingCircle from "../../assets/loadingCircle.png";
import { Box } from "../Box";

export const Results: FC<{}> = (_) => {
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
  const getBestGuess = (g: string) => g.split(",")[0];
  const getDescription = (arg:string) => {
    switch(arg){
      case "_0":
        return "Tworzywa Sztuczne i Metale";
    }
  }
  const container = {
    padding: "20px",
    height: "60vh",
    minWidth: "40vw",
    maxWidth: "80vw",
    borderRadius: "10px",
    color: "#000",
    fontWeight: 700,
    fontSize: "1.8em",
  };
  useEffect(() => {
    const can = getVideoFrame(
      document.querySelector("#video-feed") as HTMLVideoElement
    );
    model?.classify(can).then((r) => {
      console.log(getBestGuess(r?.[0].className));
      database.every((element) => {
        console.log(element.AIname);
        if (element.AIname === getBestGuess(r?.[0].className)) {
          console.log(element.type);
          uel(
            <>
              <div style={container} className={element.type}>
                <p>{getDescription(element.type)}</p>
              </div>
            </>
          );
          return false;
        }
        uel(
          <>
            <p style={container}>nie znaleziono</p>
          </>
        );
        return true;
      });
    });
  }, [model]);

  return el;
};

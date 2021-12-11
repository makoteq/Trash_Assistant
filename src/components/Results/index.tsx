import { FC, useContext, useEffect, useState } from "react";
import { database, modelCtx } from "../../constants";
import { getVideoFrame } from "../../utils/getVideoFrame";
import style from "./index.module.scss";
import { Box } from "../Box";

export const Results: FC<{}> = (_) => {
    const [el, uel] = useState(
        <Box direction="column" gap={10} verticalAlignment="center" horizontalAlignment="center">
            <h1 className={style.loadingLbl}>Trwa analizowanie zdjęcia...</h1>
        </Box>
    );
    const model = useContext(modelCtx);
    const getBestGuess = (g: string) => g.split(",")[0];
    const getDescription = (arg: string) => {
        switch (arg) {
            case "_0":
                return "Papier";
            case "_1":
                return "Tworzywa Sztuczne i Metale";
            case "_2":
                return "Szkło";
            case "_3":
                return "Bio";
            case "_4":
                return "Resztkowe";
        }
    };
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
        const can = getVideoFrame(document.querySelector("#video-feed") as HTMLVideoElement);
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

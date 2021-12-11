import { FC, useContext, useEffect, useState } from "react";
import { database, modelCtx } from "../../constants";
import { getVideoFrame } from "../../utils/getVideoFrame";
import style from "./index.module.scss";
import { Box } from "../Box";
import { Icon } from "../Icon";

export const Results: FC<{}> = (_) => {
    const [el, uel] = useState(
        <Box direction="column" gap={10} verticalAlignment="center" horizontalAlignment="center">
            <h1 className={style.loadingLbl}>Trwa analizowanie zdjęcia...</h1>
        </Box>
    );
    const model = useContext(modelCtx);
    useEffect(() => {
        const can = getVideoFrame(document.querySelector("#video-feed") as HTMLVideoElement);
        model?.classify(can).then((r) => {
            const guess = r?.[0].className.split(",")[0];
            const result = database.find((e) => e.AIname.indexOf(guess) !== -1);
            console.log(guess);
            if (result) {
                uel(
                    <Box direction="column" gap={10} verticalAlignment="center" horizontalAlignment="center">
                        <h1 className={style.type} style={{ color: result.color }}>
                            {result.type}
                        </h1>
                        <p className={style.color} style={{ color: result.color }}>
                            Kolor pojemnika: <b>{result.colorName}</b>
                        </p>
                        <Box direction="column" verticalAlignment="center">
                            <Icon className={style.arrow} type="arrow-down" color={result.color} size={90} />
                            <Icon className={style.trash} type="trash" color={result.color} size={120} />
                        </Box>
                    </Box>
                );
            } else {
                uel(
                    <Box direction="column" gap={10} verticalAlignment="center" horizontalAlignment="center">
                        <Icon className={style.trash} type="x-circle" color={"#ff0000"} size={120} />
                        <h1 className={style.color} style={{ color: "#ff0000" }}>
                            Niestety nie udało się rozpoznać typu odpadu
                        </h1>
                    </Box>
                );
            }
        });
    }, [model]);

    return el;
};

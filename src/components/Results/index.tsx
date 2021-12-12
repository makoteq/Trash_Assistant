import { FC } from "react";
import { DatabaseRecord } from "../../constants";
import style from "./index.module.scss";
import { Box } from "../Box";
import { Icon } from "../Icon";

export const Results: FC<{ type?: DatabaseRecord; ai?: string }> = (props) => {
    return props.type ? (
        <Box direction="column" gap={10} verticalAlignment="center" horizontalAlignment="center">
            <h1 className={style.type} style={{ color: props.type?.color }}>
                {props.type?.type}
            </h1>
            <Box direction="column" verticalAlignment="center">
                <Icon className={style.arrow} type="arrow-down" color={props.type?.color} size={90} />
                <Icon className={style.trash} type="trash" color={props.type?.color} size={120} />
            </Box>
            <p className={style.color} style={{ color: props.type?.color }}>
                <b>{props.type?.colorName}</b>
            </p>
        </Box>
    ) : (
        <Box direction="column" gap={10} verticalAlignment="center" horizontalAlignment="center">
            <Icon className={style.trash} type="x-circle" color={"#ff0000"} size={120} />
            <h1 className={style.color} style={{ color: "#ff0000" }}>
                Niestety nie udało się rozpoznać typu odpadu
            </h1>
            {props.ai && <p style={{ color: "#666666", fontSize: "20px", fontWeight: "normal" }}>Znalezione dopasowanie: {props.ai}</p>}
        </Box>
    );
};

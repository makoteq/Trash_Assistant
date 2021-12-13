import { FC } from "react";
import { Box } from "../Box";
import style from "./index.module.scss";

export const CreditTile: FC<{ title: string; imageUrl?: string; gh?: string; delay?: number }> = (props) => {
    return (
        <a
            aria-label={props.title}
            target={"_blank"}
            style={{ animationDelay: `${props.delay ? props.delay + 300 : 300}ms` }}
            className={style.container}
            rel="noreferrer"
            href={`https://github.com/${props.gh}`}
        >
            <Box gap={5} direction="column" verticalAlignment="center" horizontalAlignment="center">
                <img className={style.img} src={props.imageUrl} alt={props.title} />
                <div className={style.title}>{props.title}</div>
            </Box>
        </a>
    );
};

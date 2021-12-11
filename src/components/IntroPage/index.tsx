import { FC, ReactNode } from "react";
import { Box } from "../Box";
import style from "./index.module.scss";

export const IntroPage: FC<{ title: string; content: ReactNode }> = (props) => {
    return (
        <Box className={style.container} gap={10} direction="column" horizontalAlignment="center" verticalAlignment="center">
            <h1 className={style.title}>{props.title}</h1>
            <div className={style.content}>{props.content}</div>
        </Box>
    );
};

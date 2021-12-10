import { FC } from "react";
import { Box } from "../Box";
import { CreditTile } from "../CreditTile";
import style from "./index.module.scss";

export const About: FC<{ cfn: (d: any) => void }> = (props) => {
    return (
        <Box direction="column" gap={10} horizontalAlignment="center" verticalAlignment="center">
            <h1>Trash helper</h1>
            <Box className={style.container} direction="row" gap={5} horizontalAlignment={"center"} verticalAlignment="center">
                <CreditTile title="GRZ4NA" imageUrl="https://avatars.githubusercontent.com/u/74425958?v=4" gh="grz4na" delay={0} />
                <CreditTile title="makoteq" imageUrl="https://avatars.githubusercontent.com/u/42750440?v=4" gh="makoteq" delay={100} />
                <CreditTile title="drgoodcat" imageUrl="https://avatars.githubusercontent.com/u/60068941?v=4" gh="drgoodcat" delay={200} />
            </Box>
            <button style={{ width: "100%" }} onClick={props.cfn} className="btn-inverse">
                Zamknij
            </button>
        </Box>
    );
};

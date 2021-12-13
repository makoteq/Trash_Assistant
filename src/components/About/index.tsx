import { FC } from "react";
import { appName } from "../../constants";
import { Box } from "../Box";
import { CreditTile } from "../CreditTile";
import { Link } from "../Link";
import style from "./index.module.scss";

export const About: FC<{ cfn: (d: any) => void }> = (props) => {
    return (
        <Box direction="column" gap={10} horizontalAlignment="center" verticalAlignment="center">
            <h1>{appName}</h1>
            <p className={style.infoLbl}>
                Projekt konkursowy{" "}
                <i>
                    <Link to="https://nowaakademia.org/mini-hackathon-edycja-ii/">Mini Hackathon Nowa Akademia (edycja II.)</Link>
                </i>
            </p>
            <p className={style.infoLbl}>
                Kod źródłowy aplikacji dostępny na{" "}
                <i>
                    <Link to="https://github.com/makoteq/trash_assistant">GitHub</Link>
                </i>
            </p>
            <Box className={style.container} direction="row" gap={5} horizontalAlignment={"center"} verticalAlignment="center">
                <CreditTile title="GRZANA" imageUrl="https://avatars.githubusercontent.com/u/74425958?v=4" gh="grz4na" delay={0} />
                <CreditTile title="makoteq" imageUrl="https://avatars.githubusercontent.com/u/42750440?v=4" gh="makoteq" delay={100} />
                <CreditTile title="drgoodcat" imageUrl="https://avatars.githubusercontent.com/u/60068941?v=4" gh="drgoodcat" delay={200} />
            </Box>
            <Box className={style.buttons} gap={5} direction="row" verticalAlignment="center">
                <button
                    aria-label="Pokaż prezentację"
                    style={{ flex: 1 }}
                    onClick={() => {
                        window.localStorage.setItem("intro", "false");
                        window.location.reload();
                    }}
                >
                    Pokaż prezentację
                </button>
                <button aria-label="Zamknij okno dialogowe" autoFocus style={{ flex: 1 }} onClick={props.cfn} className="btn-inverse">
                    Zamknij
                </button>
            </Box>
        </Box>
    );
};

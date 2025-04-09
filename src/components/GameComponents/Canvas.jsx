import { useRef, useEffect } from "react";

import { enemyPath, total_duration  } from "../GameUtility/enemyPath";
import { mapConfig } from "../GameUtility/mapConfig";

const Canvas = ({ mapName = 'newDawn', style = {} }) => {
    const canvasRef = useRef(null);

    const gameMap = new Image();
    const mapConfigs = mapConfig[mapName];
}
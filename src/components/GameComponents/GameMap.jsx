import React from "react";
import Canvas from "./Canvas.jsx";
import InteractiveGrid from "../Functions/GridTool/InteractiveGrid.jsx";
import DisallowedOverlay from "../Functions/GridTool/DisallowedOverlay.jsx";
import TowerPreview from "../UI/Tower/TowerPreview.jsx";
import TowerRangeOverlay from "../UI/Tower/TowerRangeOverlay.jsx";
import TowerOptions from "../UI/Tower/TowerOptions.jsx";
import { finalizeRelocationUpdate } from "../GameUtility/Handlers/towerInteractionHandlers.jsx";

const GameMap = ({
  canvasWidth,
  canvasHeight,
  mapName,
  sprites,
  placedTowers,
  selectedEnemy,
  onEnemyClick,
  onTowerClick,
  gridCellSize,
  selectedTower,
  previewPos,
  relocatingTower,
  relocatePos,
  handleCellClick,
  mapMouseMoveHandler,
  mapClickHandler,
  restrictedCellsArray,
  activeTower,
  onRelocate,
  onUpgrade,
  showDisallowed,
  showGrid,
  updatePreview,
  clearPreview,
  setRelocatingTower,
  setRelocatePos,
  setPlacedTowers,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: canvasWidth,
        height: canvasHeight,
        margin: "0 auto",
        pointerEvents: "auto",
      }}
      onMouseMove={(e) => {
        if (selectedTower) updatePreview(e);
        else mapMouseMoveHandler(e);
      }}
      onMouseLeave={() => {
        clearPreview();
        document.body.style.cursor = "default";
      }}
      onClick={mapClickHandler}
    >
      <Canvas
        mapName={mapName}
        sprites={sprites}
        towers={placedTowers}
        onEnemyClick={onEnemyClick}
        onTowerClick={(tower, e) => {
          if (e) e.stopPropagation();
          onTowerClick(tower);
        }}
        selectedEnemy={selectedEnemy}
        gridCellSize={gridCellSize}
        disableCanvasClick={false}
        isRelocating={Boolean(relocatingTower)}
      />
      <InteractiveGrid
        showGrid={showGrid}
        width={canvasWidth}
        height={canvasHeight}
        gridCellSize={gridCellSize}
        onCellClick={handleCellClick}
        style={{ pointerEvents: selectedTower ? "auto" : "none" }}
      />
      {showDisallowed && (
        <DisallowedOverlay restrictedCells={restrictedCellsArray} gridCellSize={gridCellSize} />
      )}
      {selectedTower && previewPos && (
        <TowerPreview
          previewPos={previewPos}
          gridCellSize={gridCellSize}
          selectedTower={selectedTower}
          restrictedCellsArray={restrictedCellsArray}
          isRelocating={false}
        />
      )}
      {relocatingTower && relocatePos && (
        <TowerPreview
          previewPos={relocatePos}
          gridCellSize={gridCellSize}
          selectedTower={relocatingTower}
          restrictedCellsArray={restrictedCellsArray}
          isRelocating={true}
        />
      )}
      {activeTower && !relocatingTower && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: canvasWidth,
              height: canvasHeight,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <TowerRangeOverlay activeTower={activeTower} gridCellSize={gridCellSize} />
          </div>
          <TowerOptions activeTower={activeTower} gridCellSize={gridCellSize} onRelocate={onRelocate} onUpgrade={onUpgrade} />
        </>
      )}
      {relocatingTower && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 0, 0, 0.2)",
            pointerEvents: "auto",
            cursor: "crosshair",
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <button
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "10px 20px",
              fontSize: "16px",
              zIndex: 3,
              color: "inherit"
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              finalizeRelocationUpdate(
                relocatingTower,
                relocatePos,
                gridCellSize,
                restrictedCellsArray,
                setPlacedTowers,
                setRelocatingTower,
                setRelocatePos
              );
            }}
          >
            Finalize Relocation
          </button>
        </div>
      )}
    </div>
  );
};

export default GameMap;
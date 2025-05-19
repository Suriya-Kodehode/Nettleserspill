import { useEffect } from "react";

const useLogPlacedTowers = (placedTowers) => {
  useEffect(() => {
    console.log("Placed Towers:", placedTowers);
  }, [placedTowers]);
};

export default useLogPlacedTowers;
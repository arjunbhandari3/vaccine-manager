import { debounce } from "lodash";
import { useCallback, useState } from "react";

import { MIN_DEBOUNCE_TIME } from "constants/date";

const useDebounceEffect = (code = "") => {
  const [debounceCode, setDebounceCode] = useState(code);

  const debounceFunction = useCallback(
    debounce((code) => {
      setDebounceCode(code);
    }, MIN_DEBOUNCE_TIME),
    []
  );

  return [debounceCode, debounceFunction];
};

export default useDebounceEffect;

import { debounce } from "lodash";
import { useEffect, useState } from "react";

import { MIN_DEBOUNCE_TIME } from "constants/date";

const useDebounceEffect = (code = "") => {
  const [debouncedCode, setDebouncedCode] = useState(code);

  useEffect(() => {
    const debouncedFunction = debounce((code) => {
      setDebouncedCode(code);
    }, MIN_DEBOUNCE_TIME);

    debouncedFunction(code);

    return () => debouncedFunction.cancel();
  }, [code]);

  return debouncedCode;
};

export default useDebounceEffect;

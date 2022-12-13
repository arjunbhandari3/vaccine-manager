import { useEffect } from "react";

import { APP_TITLE } from "constants/messages";

const useDocumentTitle = (title, defaultTitle = APP_TITLE) => {
  useEffect(() => {
    window.document.title = `${title} | ${defaultTitle}`;

    return () => {
      window.document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
};

export default useDocumentTitle;

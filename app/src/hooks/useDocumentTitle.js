import { useEffect } from "react";

const useDocumentTitle = (title, defaultTitle = "Vaccine Management") => {
  useEffect(() => {
    window.document.title = `${title} | Vaccine Management`;

    return () => {
      window.document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
};

export default useDocumentTitle;

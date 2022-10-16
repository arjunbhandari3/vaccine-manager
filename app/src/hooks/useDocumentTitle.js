import { useEffect } from "react";

const useDocumentTitle = (title, defaultTitle = "Vaccine Manager") => {
  useEffect(() => {
    window.document.title = `${title} | Vaccine Manager`;

    return () => {
      window.document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
};

export default useDocumentTitle;

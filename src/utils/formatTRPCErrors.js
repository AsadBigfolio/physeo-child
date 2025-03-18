import { safeJSONParse } from "./jsonParse";
export const formatErrors = (errorObject) => {
  return (
    safeJSONParse(errorObject?.message)?.reduce((acc, error) => {
      const pathKey = error.path[0];
      acc[pathKey] = error.message;
      return acc;
    }, {}) || {}
  );
};

export const formatQuizErrors = (errorObject) => {
  return (
    safeJSONParse(errorObject?.message)?.reduce((acc, error) => {
      const pathKey = error.path.join(".");
      acc[pathKey] = error.message;
      return acc;
    }, {}) || {}
  );
};
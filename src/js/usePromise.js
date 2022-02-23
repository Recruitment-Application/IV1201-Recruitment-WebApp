import React from "react";

/**
 * check if there is returned data from the promise, it changes the data to the new result. 
 * if the data hasn't been changed successfuly, the error will be set. 
 * @param {*} promise the passed parameter. 
 * @returns the data and error.
 */
function usePromise(promise) {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(
    function () {
      setData(null);
      setError(null);
      if (promise != null) {
        promise.then((result) => setData(result)).catch((e) => setError(e));
      }
    },
    [promise]
  );
  return [data, error];
}

export default usePromise;

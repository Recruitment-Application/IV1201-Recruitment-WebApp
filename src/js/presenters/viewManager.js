import React from "react";

/**
 * Listen to the hash if changed and Choose which page will be shown according to the hash and children
 * @param {*} param0 hash tag from the url to decide which page to show
 * @returns the new hash tag chosen by user. 
 */
function ViewManager({ hash, children }) {
  const [, setRoute] = React.useState(window.location.hash);
  React.useEffect(function () {
    function hashChangeListener() {
      setRoute({});
    }
    window.addEventListener("hashchange", hashChangeListener);

    return () =>
      window.removeEventListener("hashchange", hashChangeListener, false);
  }, []);
  return hash === window.location.hash ? children : false;
}

export default ViewManager;
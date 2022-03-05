import React from "react";

/**
 * Responsible to observe specific attributes of a class.
 * @param {Class} model The class that is desired to observe on.
 * @param {string} prop The property name tha is desired to observe on.
 * @returns {any} Get the new value after any changes.
 */
function useModelProp(model, prop) {
  const [propValue, setPropValue] = React.useState(model[prop]);
  React.useEffect(
    function () {
      const obs = () => setPropValue(model[prop]);
      model.addObserver(obs);
      return () => model.removeObserver(obs);
    },
    [model, prop]
  );
  return propValue;
}

export default useModelProp;

import React from "react";
import HomepageView from "../views/homepageView"

/**
 * The presenter of the HomepageView 
 * @returns {HomepageView} that includes information about the webapp, the purpose of using it and how to use it.
 */
function Homepage() {
    return React.createElement(
        React.Fragment,
        {},
        React.createElement(HomepageView, {})
    );
}

export default Homepage;
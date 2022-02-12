import React from "react";
import HomepageView from "../views/homepageView"

/**
 * to render the homepage
 * @returns the homepage element/view
 */
function Homepage() {
    return React.createElement(
        React.Fragment,
        {},
        React.createElement(HomepageView, {})
    );
}

export default Homepage;
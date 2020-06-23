import React from "react";
import WelcomeBanner from "./WelcomeBanner"
import Featured from "./Featured";
import Story from "./Story"
import SubscribeBanner from "./SubscribeBanner"
import Slideshow from "./Slideshow"

const HomePage = () => {
    return(
        <div>
            <WelcomeBanner/>
            <Featured/>
            <Story/>
            <Slideshow/>
            <SubscribeBanner/>
        </div>
    );
}

export default HomePage
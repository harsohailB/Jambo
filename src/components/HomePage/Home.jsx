import React from "react";
import Navbar from "../../Navbar"
import AnnouncementHeader from "../../AnnouncementHeader";
import WelcomeBanner from "./WelcomeBanner"
import Featured from "./Featured";
import Story from "./Story"
import SubscribeBanner from "./SubscribeBanner"
import Slideshow from "./Slideshow"
import Footer from "../../Footer"

const HomePage = () => {
    return(
        <div>
            <AnnouncementHeader/>
            <Navbar/>
            <WelcomeBanner/>
            <Featured/>
            <Story/>
            <Slideshow/>
            <SubscribeBanner/>
            <Footer/>
        </div>
    );
}

export default HomePage
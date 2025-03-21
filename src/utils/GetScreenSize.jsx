/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const GetScreenSize = () => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    //console.log('width ', width)

    return {
        STR_SCREEN_WIDTH: screenWidth
    }
};

export default GetScreenSize;

//<>{width}</>
// https://stackoverflow.com/questions/56737297/use-component-as-return-value-in-component-b
// return <> { returnNum } </>;

// <div>
// {" "}
// <p>Screen Is: {width}px</p>{" "}
// </div>
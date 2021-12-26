import { useEffect, useState } from "react";

const VoorstelGetocht = (props) => {
    const { text, url } = props;
    const [ activeGif, setActiveGif ] = useState("https://media.giphy.com/media/Yf93ak2fe5ems/giphy.gif");

    const gifs = [
        "https://media.giphy.com/media/Yf93ak2fe5ems/giphy.gif",
        "https://media.giphy.com/media/8cY8LQMDLhQ4Ml9fLe/giphy.gif",
        "https://media.giphy.com/media/3ohhwMfoVylB3HKL2E/giphy.gif",
        "https://media.giphy.com/media/kTlzmE6dDCDKw/giphy.gif",
        "https://media.giphy.com/media/3o85xyAKL2r2scDenK/giphy.gif",
        "https://media.giphy.com/media/IB9foBA4PVkKA/giphy.gif",
        "https://media.giphy.com/media/Sux3kje9eOx1e/giphy.gif",
        "https://media.giphy.com/media/Swx36wwSsU49HAnIhC/giphy.gif"

    ]


    useEffect(
        () => {
            console.log(gifs);
            console.log(gifs.length);
            console.log(Math.floor(Math.random() * gifs.length));
            setActiveGif(gifs[Math.floor(Math.random() * gifs.length)]);
            console.log(activeGif);
        }
    );
    
  
    // const containerStyles = {
    //   height: 20,
    //   width: '95%',
    //   backgroundColor: "#e0e0de",
    //   borderRadius: 50,
    //   margin: 50
    // }
  
    // const fillerStyles = {
    //   height: '100%',
    //   transition: 'width 0.1s ease-in-out',
    //   width: `${completed}%`,
    //   backgroundColor: bgcolor,
    //   borderRadius: 'inherit',
    //   textAlign: 'right'
    // }
  
    // const labelStyles = {
    //   padding: 5,
    //   color: 'white',
    //   fontWeight: 'bold'
    // }
  
    return (
    <div>
        <img src={activeGif}></img>
        <p>
            Voorstel is getocht! Probeer het volgend jaar opnieuw.
        </p>
    </div>
    );
  };
  
  export default VoorstelGetocht;
  
import { useEffect, useState } from "react";
import useSound from 'use-sound';

import sadTrombone from './sad_trombone.mp3';

const VoorstelGetocht = (props) => {
    const { text, url } = props;
    const [ activeGif, setActiveGif ] = useState("https://media.giphy.com/media/Yf93ak2fe5ems/giphy.gif");
    const [play] = useSound(sadTrombone);

    const gifs = [
        "https://media.giphy.com/media/Yf93ak2fe5ems/giphy.gif",
        "https://media.giphy.com/media/8cY8LQMDLhQ4Ml9fLe/giphy.gif",
        "https://media.giphy.com/media/3ohhwMfoVylB3HKL2E/giphy.gif",
        "https://media.giphy.com/media/kTlzmE6dDCDKw/giphy.gif",
        "https://media.giphy.com/media/3o85xyAKL2r2scDenK/giphy.gif",
        "https://media.giphy.com/media/IB9foBA4PVkKA/giphy.gif",
        "https://media.giphy.com/media/Sux3kje9eOx1e/giphy.gif",
        "https://media.giphy.com/media/Swx36wwSsU49HAnIhC/giphy.gif",
        "https://c.tenor.com/dIYElE0kJHQAAAAd/wee-ship.gif",
        "https://c.tenor.com/muR1wtqZbGsAAAAC/rainbow-vomit.gif",
        "https://c.tenor.com/5p3sBDEuk2gAAAAM/bugs-bug.gif",
        "https://c.tenor.com/Gttq2GShLvMAAAAM/bugs-buggingout.gif"
    ]


    useEffect(
        () => {
            setActiveGif(gifs[Math.floor(Math.random() * gifs.length)]);
            play();
        }
    );
    
    const containerStyles = {
        height: '70vh',
        margin: 'auto',
        marginTop: 50,
        marginBottom: 50,
      }

  
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
    <div style={containerStyles} onClick={play}>
        <img src={activeGif}></img>
        <p>
            Voorstel is getocht! Probeer het volgend jaar opnieuw.
        </p>
    </div>
    );
  };
  
  export default VoorstelGetocht;
  
import React, { useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import MasterMind from "./MasterMind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

export default function HeroSection() {
  const audioRef = useRef(null);
  const playSound = () => {
    audioRef.current.play();
  };
  return (
    <div className="MySection justify-content-center" id="profile">
      <div className=" heroSection  text-center">
        <div className="row align-items-center justify-content-between ">
          <div className="col-md-6 text-start">
            <span className="subTitle"> Hi, I am</span>
            <div className="pronounce">
              <div className="icon-wrapper" onClick={playSound}>
                <FontAwesomeIcon
                  className="speaker"
                  icon={faVolumeUp}
                  size="2x"
                />
                <audio ref={audioRef} src="/Recording.mp3" />
              </div>
              <h1 className="Title">Behnam Arabi</h1>
            </div>
            <h2 className="subTitleBottom">{">"} Front-end developer</h2>
            <div className="codeHero mt-5">
              <SyntaxHighlighter language="javascript" style={dracula}>
                // challenge your mind with mastermind!
              </SyntaxHighlighter>
              <SyntaxHighlighter language="javascript" style={dracula}>
                // explore more of my projects on my Github
              </SyntaxHighlighter>
              <SyntaxHighlighter
                className="mt-2"
                language="javascript"
                style={dracula}
              >
                const githubLink = "https://github.com/Benopart"
              </SyntaxHighlighter>
            </div>
            <div className="myLinks gap-3 d-flex mt-5">
              <a
                href="https://github.com/Benopart"
                className="btn solidBtn solidBig"
              >
                _gitHub <i className="bi bi-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/behnam-arabi/"
                className="btn solidBtn solidBig"
              >
                _linkedIn <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="col-md-6 text-end gameMind justify-content-center d-flex">
            <MasterMind></MasterMind>
          </div>
        </div>
      </div>
    </div>
  );
}

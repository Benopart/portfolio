import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";

export default function Header() {
  const [activeLink, setActiveLink] = useState("profile");

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="main_header">
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
          <HashLink
            to="/#profile"
            className={`navbar-brand ${
              activeLink === "profile" ? "active" : ""
            }`}
            onClick={() => handleSetActiveLink("profile")}
          >
            _behnam_arabi
          </HashLink>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="firstBar navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <HashLink
                  to="/#profile"
                  className={`nav-link ${
                    activeLink === "profile" ? "active" : ""
                  }`}
                  onClick={() => handleSetActiveLink("profile")}
                >
                  _profile
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink
                  to="/#about-me"
                  className={`nav-link ${
                    activeLink === "about_me" ? "active" : ""
                  }`}
                  onClick={() => handleSetActiveLink("about_me")}
                >
                  _about_me
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink
                  to="/#projects"
                  className={`nav-link ${
                    activeLink === "projects" ? "active" : ""
                  }`}
                  onClick={() => handleSetActiveLink("projects")}
                >
                  _projects
                </HashLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

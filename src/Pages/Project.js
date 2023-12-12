import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Accordion from "../Components/Sections/Accordion";

import { HashLink } from "react-router-hash-link";
import AOS from "aos";
import "aos/dist/aos.css";

const Project = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [categories, setCategories] = useState([]);
  const [accordionData, setAccordionData] = useState([]);
  const [activeLink, setActiveLink] = useState("profile");
  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 992);

  if (!isMobileView) {
    AOS.init({
      duration: 1500,
      once: false,
      offset: 500,
      delay: 200,
      disable: "mobile",
    });
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://behnamarabi.com/PortfolioFeed/wp-json/wp/v2/project/${projectId}?_embed`
      )
      .then((response) => {
        setProject(response.data);
        // Extracting categories from the _embedded property
        if (response.data._embedded && response.data._embedded["wp:term"]) {
          const categoryData = response.data._embedded["wp:term"][0] || [];
          setCategories(categoryData.map((cat) => cat.name));
        }
        // Setting accordion data based on ACF fields
        const acf = response.data.acf || {};

        setAccordionData([
          {
            title: "Design",
            content:
              (
                <div
                  dangerouslySetInnerHTML={{ __html: acf.design_description }}
                ></div>
              ) || "No content available",
          },
          {
            title: "Develop",
            content:
              (
                <div
                  dangerouslySetInnerHTML={{ __html: acf.develop_description }}
                ></div>
              ) || "No content available",
          },
          {
            title: "Reflection",
            content:
              (
                <div
                  dangerouslySetInnerHTML={{ __html: acf.project_reflection }}
                ></div>
              ) || "No content available",
          },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }
  AOS.refresh();
  return (
    <div className="project-container">
      <div className="project-video">
        <img src={project.featured_image_url} alt="Project Poster" />
        <section id="arrow" class="arrow-down">
          <a href="#product-info">
            <span></span>
          </a>
        </section>

        {isMobileView && (
          <div className="col-md-1 sidebarProject p-0 pt-5 justify-content-center d-flex">
            <div className="d-flex flex-column gap-4 ">
              <HashLink
                to="/#profile"
                className={`pe-cursor link-offset-2 link-underline-opacity-0 ${
                  activeLink === "profile" ? "active" : ""
                }`}
                onClick={() => handleSetActiveLink("profile")}
              >
                <i className="bi bi-house "></i>
              </HashLink>
              <HashLink
                to="/#about-me"
                className={`link-offset-2 link-underline-opacity-0 pe-cursor ${
                  activeLink === "about_me" ? "active" : ""
                }`}
                onClick={() => handleSetActiveLink("about_me")}
              >
                <i className="bi bi-file-person "></i>
              </HashLink>
              <HashLink
                to="/#projects"
                className={`link-offset-2 link-underline-opacity-0 pe-cursor ${
                  activeLink === "projects" ? "active" : ""
                }`}
                onClick={() => handleSetActiveLink("projects")}
              >
                <i className="bi bi-cast "></i>
              </HashLink>
            </div>
          </div>
        )}
        <div className="project-video-links">
          <div className="project-title">
            <h1>{project.title.rendered}</h1>
          </div>
          <div className="col-md-1 sidebarLinks p-3 pt-5 justify-content-end d-flex">
            <div className="d-flex flex-column gap-4 align-items-end hover-project-link">
              <HashLink
                smooth
                to={project.acf.project_link}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project.acf.project_link, "_blank");
                }}
                className="pe-cursor link-offset-2 link-underline-opacity-0 "
              >
                <p>
                  preview <i className="bi bi-eye "></i>
                </p>
              </HashLink>
              <HashLink
                smooth
                to={project.acf.code_link}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project.acf.code_link, "_blank");
                }}
                className="link-offset-2 link-underline-opacity-0 pe-cursor hover-project-link"
              >
                <p>
                  {" "}
                  view-code <i className="bi bi-code-slash "></i>{" "}
                </p>
              </HashLink>
              <HashLink
                to="/#projects"
                className="link-offset-2 link-underline-opacity-0 pe-cursor hover-project-link"
              >
                <p>
                  {" "}
                  More Projects <i className="bi bi-cast "></i>{" "}
                </p>
              </HashLink>
            </div>
          </div>
        </div>
      </div>

      <div data-aos="fade-up" className="project-info" id="product-info">
        <div className="project-overview">
          <h2>Overview</h2>
          <p>{project.acf.short_description}</p>
        </div>
        <div className="project-toolkit">
          <h2>Toolkit</h2>
          {project &&
          project.acf &&
          project.acf.toolkits &&
          project.acf.toolkits.length > 0 ? (
            <ul>
              {project.acf.toolkits.map((toolkitItem, index) => (
                <li key={index}>{toolkitItem.toolkit}</li>
              ))}
            </ul>
          ) : (
            <p>No toolkit items found</p>
          )}
        </div>
        <div className="project-accordion">
          <h2>Project Details</h2>
          <div className="accordion">
            {accordionData.map(({ title, content }) => (
              <Accordion title={title} content={content} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;

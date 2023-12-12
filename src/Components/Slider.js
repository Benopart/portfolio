import React, { useState, useEffect } from "react";
import axios from "axios";

const Slider = () => {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Fetch projects from WordPress backend
    axios
      .get(`https://behnamarabi.com/PortfolioFeed/wp-json/wp/v2/project`)
      .then(async (response) => {
        const projectsData = await Promise.all(
          response.data.map(async (project) => {
            return {
              imageUrl: project.featured_image_url,
              title: project.title.rendered,
              projectId: project.id,
            };
          })
        );
        setProjects(projectsData);
        setActive(0);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const max = projects.length;

  const intervalBetweenSlides = () =>
    autoplay && setActive((active) => (active === max - 1 ? 0 : active + 1));

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hovered) {
        intervalBetweenSlides();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [autoplay, max, hovered]);

  const toggleAutoPlay = () => setAutoplay(!autoplay);

  const handleMouseEnter = () => {
    setHovered(true);
    setAutoplay(false);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setAutoplay(true);
  };

  const nextOne = () => active < max - 1 && setActive(active + 1);

  const prevOne = () => active > 0 && setActive(active - 1);

  const isActive = (value) => (active === value ? "active" : "");

  const setSliderStyles = () => {
    return {
      width: `${projects.length * 90}vw`,
      transform: `translateX(${active * -90}vw)`,
    };
  };

  const renderSlides = () =>
    projects.map((project, index) => (
      <div
        className={`each-slide ${isActive(index)}`}
        key={index}
        style={{ display: "inline-block" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          style={{ width: "65%" }}
        />
        {/* Project title */}
        <h2>{project.title}</h2>
        {/* Button to navigate to project details page */}
        <a
          className="more-info-btn myLinks btn solidBtn solidBig"
          href={`/project/${project.projectId}`}
        >
          _more_info
        </a>
      </div>
    ));

  return (
    <section className="slider">
      <h2 className="projects-section-title">Featured Projects</h2>
      <div className="wrapper" style={setSliderStyles()}>
        {renderSlides()}
      </div>
      {/* Navigation arrows */}
      <button type="button" className="arrows prev" onClick={() => prevOne()}>
        <svg fill="#FFFFFF" width="50" height="50" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
      <button type="button" className="arrows next" onClick={() => nextOne()}>
        <svg fill="#FFFFFF" height="50" viewBox="0 0 24 24" width="50">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
      {/* Dots */}
      <ul className="dots-container">
        {projects.map((slide, index) => (
          <li className={`${isActive(index)} dots`} key={index}>
            <button onClick={() => setActive(index)}>
              <span>&#9679;</span>
            </button>
          </li>
        ))}
      </ul>
      {/* Autoplay button */}
      <button
        type="button"
        className="toggle-play"
        id="projects"
        onClick={toggleAutoPlay}
      >
        {autoplay ? (
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
          </svg>
        ) : (
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
        )}
      </button>
    </section>
  );
};

export default Slider;

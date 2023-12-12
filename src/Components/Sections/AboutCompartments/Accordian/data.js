const data = [
  {
    id: 1,
    title: "bio",
    content: (
      <div className="bio-text">
        <p>
          /** As a highly skilled and dedicated web developer with a year of
          experience, I am eager to take on new challenges and grow my skills.
          */
        </p>
        <p>
          /** Although I am new to ReactJS and WordPress, I have a strong
          foundation of knowledge and expertise in web development, and I am
          confident in my ability to learn quickly and adapt to new
          technologies. */
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: "toolkit",
    content: (
      <div>
        <ul className="list-group-interest list-group">
          <li>HTML5 </li>
          <li>CSS, Sass, Gulp</li>
          <li>Bootstrap</li>
          <li>JavaScript, jQuery</li>
          <li>React.js</li>
          <li>WordPress</li>
          <li>WooCommerce</li>
          <li>shopify</li>
          <li>Rest API</li>
          <li>MySql</li>
          <li>PHP</li>
          <li>GitHub</li>
          <li>Asana</li>
          <li>Adobe Photoshop</li>
          <li>Adobe illustrator</li>
          <li>Adobe XD</li>
          <li>Figma</li>
          <li>InVision</li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    title: "experience",
    content: (
      <div className="experience gap-3 d-flex row      ">
        <div className="d-flex row gap-2 bio-text">
          <h3> CNC Programmer - CCI Inc. </h3>
          <span className="small"> 05/2022 - 05/2023, Surey, BC</span>
          <h3> CNC Programmer - Creopack </h3>
          <span className="small"> 06/2019 - 05/2022, Montreal, QC</span>
          <p>
            /** interpreting technical drawings or blueprints of the part to be
            manufactured. writing and editing CNC programs using CAM software to
            translate the part design into G-code */
          </p>
        </div>
        <div className="d-flex row gap-2 bio-text">
          <h3> Digital Marketing Agent - EOS Co. </h3>
          <span className="small"> 08/2009 - 02/2019, Iran</span>
          <p>
            /** As a content creator, my main task was to produce engaging
            content for websites, social media, blogs, and emails, aimed at
            resonating with our audience and meeting marketing goals. I used
            tools like Google Analytics and Microsoft CRM for data analysis,
            which helped optimize website content and SEO. This dynamic role
            required a mix of creativity, analytical skills, and technical
            proficiency in digital marketing strategies. */
          </p>
        </div>
      </div>
    ),
  },
];

export default data;

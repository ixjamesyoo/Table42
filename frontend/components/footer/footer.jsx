import React from "react";

export default () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-blurb">
          <p>Table42 was built by James Yoo using React/Redux for the frontend and Ruby on Rails/PostgreSQL for the backend. It was inspired by the web application OpenTable.</p>
        </div>
        <ul className="site-footer-links">
          <li><a href="https://github.com/ixjamesyoo" target="_blank"><i className="fab fa-github"></i><span>Github</span></a></li>
          <li><a href="https://www.linkedin.com/in/james-yoo-2a839615b/" target="_blank"><i className="fab fa-linkedin"></i><span>LinkedIn</span></a></li>
          <li><a href="https://github.com/ixjamesyoo/Table42" target="_blank"><i className="far fa-file-alt" target="_blank"></i><span>README</span></a></li>
        </ul>
      </div>
    </footer>
  );
};

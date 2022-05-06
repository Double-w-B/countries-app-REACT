import React from 'react'

const About = () => {
  return (
    <>
      <p>
        This project was created in purpose to practice web development skills.
        Author would be very glad if you will find it interesting or even
        useful.
      </p>

      <p>
        Copyright &copy; {new Date().getFullYear()} ODYSSEY. All rights
        reserved. <br /> made by{" "}
        <a
          href="https://github.com/Double-w-B"
          target="_blank"
          rel="noopener noreferrer"
        >
          Władysław Balandin
        </a>
      </p>
    </>
  );
}

export default About
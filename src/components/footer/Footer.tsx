import React from 'react';
import './footer.scss';
import rs from '../../assets/img/rs_school_js.svg';

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer>
      <div className="container-inner">
        <div className="footer-content">
          <ul className="footer-content__contacts">
            <li>
              <a
                href="https://github.com/inspector-code"
                target="_blank"
                rel="noreferrer"
              >
                <span>@</span>inspect<span>o</span>r-c<span>o</span>de
              </a>
            </li>
            <li>
              <a
                href="https://github.com/vladimirm85"
                target="_blank"
                rel="noreferrer"
              >
                <span>@</span>vl<span>a</span>dimirm<span>8</span>5
              </a>
            </li>
            <li>
              <a
                href="https://github.com/onc157"
                target="_blank"
                rel="noreferrer"
              >
                <span>@</span>
                <span>o</span>nc15<span>7</span>
              </a>
            </li>
          </ul>
          <div className="footer-content__img">
            <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
              <img src={rs} alt="rs-school" />
            </a>
          </div>
        </div>
        <div className="footer-year">2021 Minsk, Kiev, St. Petersburg</div>
      </div>
    </footer>
  );
};

export default Footer;

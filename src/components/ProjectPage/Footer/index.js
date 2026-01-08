import React from "react";

function Footer() {
  return (
    <div className="sds-footer">
      <div className="sds-footer__title">
        <p className="sds-footer__name">aarondiggdon</p>

        <div className="sds-footer__social">
          <a
            href="https://linkedin.com/in/aarondiggdon"
            target="_blank"
            rel="noopener noreferrer"
            className="sds-footer__social-link"
            aria-label="LinkedIn"
          >
            <img
              src="/assets/linkedin-icon.svg"
              alt="LinkedIn"
              className="sds-footer__social-icon"
            />
          </a>

          <a
            href="https://aarondig.com"
            target="_blank"
            rel="noopener noreferrer"
            className="sds-footer__social-link"
            aria-label="Portfolio"
          >
            <img
              src="/assets/arrow-up-right-icon.svg"
              alt="External Link"
              className="sds-footer__social-icon"
            />
          </a>
        </div>
      </div>

      <div className="sds-footer__links">
        <div className="sds-footer__link-section">
          <div className="sds-footer__link-title">
            <p>Contact</p>
          </div>
          <div className="sds-footer__link-item">
            <a href="mailto:aarondiggdon@gmail.com">aarondiggdon@gmail.com</a>
          </div>
          <div className="sds-footer__link-item">
            <a href="https://linkedin.com/in/aarondiggdon" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/aarondiggdon
            </a>
          </div>
          <div className="sds-footer__link-item">
            <a href="https://aarondig.com" target="_blank" rel="noopener noreferrer">
              aarondig.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

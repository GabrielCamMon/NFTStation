import React from "react";

function Navigation() {
  return (
    <div className="navigation">
      <input
        type="checkbox"
        id="navi-toggle"
        className="navigation__checkbox"
      />
      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>
      <div className="navigation__background">&nbsp;</div>
      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <a
              href="#"
              className="navigation__link"
              onClick={() => console.log()}
            >
              <span>01</span>Connect Wallet
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              <span>02</span>Explore
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;

function Header() {
  return (
    <header className="header">
      <div className="header__logo-box">
        <img src="assets/logo.png" alt="logo" className="header__logo" />
      </div>
      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">
            Immerse yourself in this{" "}
          </span>
          <span className="heading-primary--sub"> Artistic NFT</span>
        </h1>
        <a href="#section-tours" className="btn btn--blue btn--animated">
          Explore
        </a>
      </div>
    </header>
  );
}

export default Header;

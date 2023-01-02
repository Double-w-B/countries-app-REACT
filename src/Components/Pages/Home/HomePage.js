import React, { useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Component from "./index";
import * as homePageSlice from "../../../redux/features/homePage/homePageSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const { isHover, isActive } = useSelector((store) => store.homePage);
  const { isGreeting } = useSelector((store) => store.navbarBtn);
  const { isLoading } = useSelector((store) => store.countries);
  const { windowWidth } = useSelector((store) => store.app);
  const countriesContainer = useRef(null);

  const [query, setQuery] = React.useState("");
  const [showHero, setShowHero] = React.useState(false);

  React.useEffect(() => {
    if (!isHover || !isActive) {
      countriesContainer.current.scrollTo(0, 0);
      setQuery("");
    }
  }, [isHover, isActive]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowHero(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const countriesContainerClassName = () => {
    if (windowWidth > 992 && isHover && isActive) {
      return "hover active";
    }
    if (windowWidth > 992 && isHover) {
      return "hover";
    }
    if (isActive) {
      return "active";
    }
  };

  const handleMouseOver = () => {
    if (!isHover) {
      dispatch(homePageSlice.addHover());
    }
  };

  return (
    <Fragment>
      <div className={isGreeting ? "greeting" : "greeting about"}>
        {isGreeting ? <Component.AboutApp /> : <Component.AboutAuthor />}
      </div>

      <div className={showHero ? "hero show" : "hero"}></div>

      <div
        className={`countries__container ${countriesContainerClassName()}`}
        onMouseOver={handleMouseOver}
      >
        <div className="countries__container-search">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="country name ..."
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "country name ...")}
              onClick={() => dispatch(homePageSlice.addActive())}
              autoComplete="off"
            />
          </form>
        </div>

        <div className="countries__all" ref={countriesContainer}>
          {isLoading ? (
            <Component.CountriesLoading />
          ) : (
            <Component.CountriesAll query={query} />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;

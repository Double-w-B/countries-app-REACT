import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ComponentsModule from "../Components"
import * as homePageFuncModule from "../features/homePageFunc/homePageFuncSlice";

const HomePage = () => {
  const [query, setQuery] = React.useState("");
  const [showHero, setShowHero] = React.useState(false);
  const dispatch = useDispatch();

  const { isGreeting } = useSelector((store) => store.navbarBtn);
  const { isHover, isActive } = useSelector((store) => store.homePageFunc);
  const { isLoading, countries } = useSelector((store) => store.countries);
  const countriesContainer = useRef(null);

  React.useEffect(() => {
    if (!isHover || !isActive) {
      countriesContainer.current.scrollTo(0, 0);
      setQuery("");
    }
  }, [isHover, isActive]);

  React.useEffect(() => {
    setTimeout(() => {
      setShowHero(true);
    }, 300);
  }, []);

  const addClass = () => {
    if (window.innerWidth > 992 && isHover && isActive) {
      return "countries__container hover active";
    }
    if (window.innerWidth > 992 && isHover) {
      return "countries__container hover";
    }
    if (isActive) {
      return "countries__container active";
    }

    return "countries__container";
  };

  return (
    <>
      <div className={isGreeting ? "greeting" : "greeting about"}>
        {isGreeting ? <ComponentsModule.Greeting /> : <ComponentsModule.About />}
      </div>

      <div className={showHero ? "hero show" : "hero"}></div>

      <div
        className={addClass()}
        onMouseOver={() =>
          !isHover ? dispatch(homePageFuncModule.addHover()) : undefined
        }
      >
        <div className="countries__container-search">
          <form>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="country name ..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "country name ...")}
              onClick={() => dispatch(homePageFuncModule.addActive())}
              autoComplete="off"
            />
          </form>
        </div>

        <div className="countries__all" ref={countriesContainer}>
          {console.log(countries, isLoading)}
          {isLoading && !countries.length ? (
            <ComponentsModule.Loading />
          ) : (
            <ComponentsModule.AllCountries query={query} />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;

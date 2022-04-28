import React, { useRef } from "react";
import Greeting from "../Components/Greeting";
import About from "../Components/About";
import Loading from "../Components/Loading";
import AllCountries from "../Components/AllCountries";
import { useDispatch, useSelector } from "react-redux";
import { addHover } from "../features/homePageFunc/homePageFuncSlice";
import { addActive } from "../features/homePageFunc/homePageFuncSlice";

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
    }, 1000);
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
        {isGreeting ? <Greeting /> : <About />}
      </div>

      <div className={showHero ? "hero show" : "hero"}></div>

      <div
        className={addClass()}
        onMouseOver={() => (!isHover ? dispatch(addHover()) : undefined)}
      >
        <div className="countries__container-search">
          <form>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="I want to visit ..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "I want to visit ...")}
              onClick={() => dispatch(addActive())}
            />
          </form>
        </div>

        <div className="countries__all" ref={countriesContainer}>
          {isLoading && !countries.length ? (
            <Loading />
          ) : (
            <AllCountries query={query} />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;

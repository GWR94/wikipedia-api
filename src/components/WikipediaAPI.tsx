import { FC, useState, useEffect } from "react";
import Article from "./Article";
import { WikiState } from "../interfaces/wikipediaAPI.i";
import { ArticleProps } from "../interfaces/article.i";
import searchImg from "../images/searchImg.png";
import { useMediaQuery } from "beautiful-react-hooks";
import "bootstrap-css-only/css/bootstrap.min.css";
import { Button } from "reactstrap";

const initialState: WikiState = {
  searchQuery: "",
  inputFocus: false,
  searchResults: null,
  pageNum: 1,
  closeNav: false,
  noArticleFound: false,
  resultsLength: 0,
  max: 10,
};

const WikipediaAPI: FC = (): JSX.Element => {
  const [state, setState] = useState(initialState);
  const desktop = useMediaQuery("(min-width: 740px)");

  useEffect(() => {
    const onEnterPress = (e: KeyboardEvent): void => {
      const wikiRandom = document.getElementById("wiki-random");
      const wikiText = document.getElementById("wiki-text");
      if (e.key === "Enter") {
        if (!desktop) {
          wikiRandom?.classList.add("animate__animated", "animate__fadeOut");
          wikiText?.classList.add("animate__animated", "animate__fadeOut");
        }
        setTimeout((): void => {
          handleSearch();
        }, 500);
      }
    };

    // eslint-disable-next-line consistent-return
    const handleSearch = async (): Promise<void> => {
      const { searchQuery } = state;
      console.log(searchQuery);
      try {
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&list=search&utf8=1&srsearch=${searchQuery}&srlimit=50&origin=*`,
          {
            method: "GET",
          }
        );
        const { query } = await res.json();
        const searchFormatted = searchQuery.replace(" ", "%20");
        console.log(query);
        if (query.searchinfo.totalhits === 0) {
          return setState({
            ...state,
            searchResults: null,
            searchQuery: "",
            noArticleFound: true,
          });
        }
        const box = document.getElementById("box-container");
        const searchContainer = document.getElementById("search-container");
        if (desktop) {
          if (box) box.className = "wiki__container-animation";
        } else {
          if (box) box.className = "wiki__container-animation--small";
          if (searchContainer) searchContainer.style.marginTop = "40px";
        }

        onCancelClick();
        const searchResults: ArticleProps[] = [];
        query.search.forEach(async (result: any): Promise<void> => {
          const { pageid } = result;
          const res = await fetch(
            `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&exsentences=4&pageids=${Number(
              pageid
            )}&origin=*`,
            {
              method: "GET",
            }
          );
          const data = await res.json();
          searchResults.push({
            pageid,
            title: data.query.pages[pageid].title,
            extract: data.query.pages[pageid].extract,
            link: `https://en.wikipedia.org/wiki/${searchFormatted}`,
          });
        });
        setTimeout((): void => {
          setState({
            ...state,
            searchQuery: "",
            searchResults,
            noArticleFound: false,
            resultsLength: query.searchinfo.totalhits,
          });
        }, 500);
      } catch (err) {
        console.error(err);
      }
    };

    const searchButton = document.getElementById("search-button");
    const cancelButton = document.getElementById("cancel-button");
    const searchInput = document.getElementById("search-input");
    searchButton?.addEventListener("click", onSearchClick);
    cancelButton?.addEventListener("click", onCancelClick);
    searchInput?.addEventListener("keydown", onEnterPress);
    return () => {
      searchButton?.removeEventListener("click", onSearchClick);
      cancelButton?.removeEventListener("click", onCancelClick);
      searchInput?.removeEventListener("keydown", onEnterPress);
    };
  }, [desktop, state]);

  const onSearchClick = (): void => {
    const searchBtn = document.getElementById("search-button");
    const cancelBtn = document.getElementById("cancel-button");
    const input = document.getElementById("search-input");

    if (searchBtn)
      searchBtn.className =
        "wiki__search-btn animate__animated animate__fadeOut";
    setTimeout((): void => {
      if (input)
        input.className =
          "wiki__search-input animate__animated animate__zoomIn";
      searchBtn?.classList.add("hidden");
    }, 400);
    setTimeout((): void => {
      if (cancelBtn)
        cancelBtn.className =
          "wiki__search-clear-btn fa fa-times-circle animate__animated animate__fadeIn";
    }, 1000);
  };

  const onCancelClick = (): void => {
    const searchBtn = document.getElementById("search-button");
    const cancelBtn = document.getElementById("cancel-button");
    const input = document.getElementById("search-input");

    cancelBtn?.classList.remove("animate__fadeIn");
    cancelBtn?.classList.add("animate__fadeOut");

    setTimeout((): void => {
      input?.classList?.remove("animate__zoomIn");
      input?.classList?.add("animate__zoomOut");
    }, 500);

    setTimeout((): void => {
      if (searchBtn)
        searchBtn.className =
          "wiki__search-btn animate__animated animate__fadeIn";
    }, 800);
  };

  const { searchQuery, searchResults, noArticleFound, max, resultsLength } =
    state;
  return (
    <div className="wiki__container">
      <div className="wiki__box-container" id="box-container">
        <div className="wiki__text" id="wiki-random">
          <a
            href="https://en.wikipedia.org/wiki/Special:Random"
            rel="noopener noreferrer"
            target="_blank"
          >
            Click <b>here</b> for a random article
          </a>
        </div>
        <div className="wiki__search-container" id="search-container">
          <input
            className="wiki__search-input hidden"
            id="search-input"
            type="search"
            value={searchQuery}
            placeholder="Search..."
            onChange={(e) =>
              setState({ ...state, searchQuery: e.target.value })
            }
          />
          <img
            alt="Search Button"
            id="search-button"
            className="wiki__search-btn"
            src={searchImg}
          />
          <i
            className="wiki__search-clear-btn fa fa-times-circle hidden"
            id="cancel-button"
          />
        </div>
        <div className="wiki__text" id="wiki-text">
          Or click the search button to search for a particular article.
          <br />
          Press &apos;Enter&apos; to begin search.
        </div>
      </div>

      {noArticleFound && (
        <Article
          pageid={0}
          title="No Results"
          extract="No search results found. Please search for another article."
        />
      )}
      {searchResults !== null && (
        <div className="wiki__search-results-container">
          {searchResults.slice(0, max).map(
            (result: ArticleProps): JSX.Element => (
              <Article key={result.pageid} {...result} />
            )
          )}
          {resultsLength > 10 && max < 50 && (
            <div className="wiki__button--container">
              <Button
                color="danger"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ margin: "5px 3px" }}
              >
                Back to Top
              </Button>
              <Button
                onClick={() => setState({ ...state, max: max + 10 })}
                color="info"
                style={{ margin: "5px 3px" }}
              >
                Load More Results
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WikipediaAPI;

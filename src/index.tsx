import React from "react";
import ReactDOM from "react-dom";
import WikipediaAPI from "./components/WikipediaAPI";
import reportWebVitals from "./reportWebVitals";
import "animate.css";
import "./scss/styles.scss";
import background from "./images/background.png";
import "normalize.css";

ReactDOM.render(
  <React.StrictMode>
    <div
      style={{
        background: `url(${background}) no-repeat center center fixed`,
        minHeight: "100vh",
        height: "100%",
        paddingTop: 1,
        marginTop: 0,
      }}
    >
      <WikipediaAPI />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

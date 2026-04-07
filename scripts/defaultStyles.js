const _scriptBase = new URL(".", document.currentScript.src).href;

const sideIndexStyle = document.createElement("link");
sideIndexStyle.rel = "stylesheet";
sideIndexStyle.href = _scriptBase + "../styles/sideIndex.css";
document.querySelector("head").appendChild(sideIndexStyle);

const defaultStyle = document.createElement("link");
defaultStyle.rel = "stylesheet";
defaultStyle.href = _scriptBase + "../styles/toggleStyles.css";
document.querySelector("head").appendChild(defaultStyle);

// Load Highlight.js CSS dynamically
const highlightCss = document.createElement("link");
highlightCss.rel = "stylesheet";
highlightCss.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css";
document.head.appendChild(highlightCss);

// Load Highlight.js script dynamically
const highlightScript = document.createElement("script");
highlightScript.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js";
highlightScript.onload = () => {
    // Initialize Highlight.js after the script is loaded
    hljs.highlightAll();
};
document.body.appendChild(highlightScript);

const commonStyle = document.createElement("link");
commonStyle.rel = "stylesheet";
commonStyle.href = _scriptBase + "../styles/common.css";
document.querySelector("head").appendChild(commonStyle);

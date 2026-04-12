const katexCSS = document.createElement("link");
katexCSS.rel = "stylesheet";
katexCSS.href = "https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css";
document.head.appendChild(katexCSS);

const katexJS = document.createElement("script");
katexJS.src = "https://cdn.jsdelivr.net/npm/katex/dist/katex.min.js";
katexJS.onload = () => {
    const autoRender = document.createElement("script");
    autoRender.src = "https://cdn.jsdelivr.net/npm/katex/dist/contrib/auto-render.min.js";
    autoRender.onload = () => {
        renderMathInElement(document.body, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$",  right: "$",  display: false }
            ]
        });
    };
    document.head.appendChild(autoRender);
};
document.head.appendChild(katexJS);

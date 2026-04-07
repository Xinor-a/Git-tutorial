// this script allows users to toggle between different styles of sakura.css by clicking a button on the page
const strArrSakuraStyles = [
    "https://cdn.jsdelivr.net/npm/sakura.css/css/sakura-dark.css",
    "https://cdn.jsdelivr.net/npm/sakura.css/css/sakura-dark-solarized.css",
    "https://cdn.jsdelivr.net/npm/sakura.css/css/sakura-earthly.css",
    "https://cdn.jsdelivr.net/npm/sakura.css/css/sakura-ink.css",
    "https://cdn.jsdelivr.net/npm/sakura.css/css/sakura-pink.css",
    "https://cdn.jsdelivr.net/npm/sakura.css/css/sakura-radical.css",
    "https://cdn.jsdelivr.net/npm/sakura.css/css/sakura-vader.css",
    "https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css",
];

const doc = document.querySelector("head");
const sakuraStyleLink = document.createElement("link");

// set initial style to sakura-dark
sakuraStyleLink.rel = "stylesheet";
sakuraStyleLink.href = strArrSakuraStyles[0];
doc.appendChild(sakuraStyleLink);

// add toggle style button to the page
const toggleStyleButton = document.createElement("button");
toggleStyleButton.id = "toggle-style-button";
toggleStyleButton.textContent = "Toggle Style (sakura-dark)";
toggleStyleButton.addEventListener("click", () => {
    const currentIndex = strArrSakuraStyles.indexOf(sakuraStyleLink.href);
    const nextIndex = (currentIndex + 1) % strArrSakuraStyles.length;
    sakuraStyleLink.href = strArrSakuraStyles[nextIndex];
    toggleStyleButton.textContent = `Toggle Style (${strArrSakuraStyles[nextIndex].split("/").pop().replace(".css", "")})`;
});
document.querySelector("aside#side-index").appendChild(toggleStyleButton);

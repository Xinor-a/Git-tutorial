// generate a right side index for the page based on the headings (h1, h2, h3, etc.)

// to prevent transition from being applied on page load, add a class to the body and remove it after the first frame
document.body.classList.add("no-transition");
requestAnimationFrame(() => {
    setTimeout(() => {
        document.body.classList.remove("no-transition");
    }, 1000);
});

// get all the headings on the page
const maxHeadingLevel = 6;

if (maxHeadingLevel < 1 || maxHeadingLevel > 6) {
    console.error("Invalid maxHeadingLevel. It should be between 1 and 6.");
    throw new Error("Invalid maxHeadingLevel. It should be between 1 and 6.");
}

let headingSelectors = "";
for (let i = 1; i <= maxHeadingLevel; i++) {
    headingSelectors += `h${i}, `;
}
headingSelectors = headingSelectors.slice(0, -2);

const headings = document.querySelectorAll(headingSelectors);

// wrap existing body content in main
const main = document.createElement("main");
while (document.body.firstChild) {
    main.appendChild(document.body.firstChild);
}
document.body.appendChild(main);

// create aside for the side index
const sideIndex = document.createElement("aside");
sideIndex.id = "side-index";
document.body.appendChild(sideIndex);

// create a scrollable wrapper for the list
const sideIndexWrapper = document.createElement("div");
sideIndexWrapper.id = "side-index-wrapper";
sideIndex.appendChild(sideIndexWrapper);

// create a list for the side index
const sideIndexList = document.createElement("ul");
sideIndexList.id = "side-index-list";
sideIndexWrapper.appendChild(sideIndexList);

// add each heading to the side index
const minHeadingLevel = Math.min(...Array.from(headings).map((h) => parseInt(h.tagName[1])));

headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]);
    const listItem = document.createElement("li");
    listItem.style.marginBottom = "5px";
    listItem.style.cursor = "pointer";
    listItem.style.paddingLeft = `${(level - 1) * 1}em`;
    listItem.textContent = heading.textContent;
    listItem.addEventListener("click", () => {
        heading.scrollIntoView({ behavior: "smooth" });
    });
    sideIndexList.appendChild(listItem);
});

// toggle the visibility of the side index when the user clicks a button
const toggleSideIndexButton = document.createElement("button");
toggleSideIndexButton.id = "toggle-side-index-button";
const toggleSideIndexButtonIcon = document.createElement("span");
toggleSideIndexButtonIcon.id = "toggle-side-index-button-icon";
toggleSideIndexButtonIcon.textContent = ">";
toggleSideIndexButton.appendChild(toggleSideIndexButtonIcon);
document.body.appendChild(toggleSideIndexButton);

let bFlgSideIndexShow = true;

toggleSideIndexButton.addEventListener("click", () => {
    bFlgSideIndexShow = !bFlgSideIndexShow;
    if (bFlgSideIndexShow) {
        sideIndex.classList.remove("closed");
        toggleSideIndexButton.classList.remove("closed");
        main.classList.remove("aside-closed");
    } else {
        sideIndex.classList.add("closed");
        toggleSideIndexButton.classList.add("closed");
        main.classList.add("aside-closed");
    }
});

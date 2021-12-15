export class tocBuilder {
  applyToc(minLevel = 1, maxLevel = 6) {
    const allLevels = [...Array(7).keys()];
    const levels = allLevels.slice(minLevel, maxLevel + 1);
    const headingLevels = levels.map(l => `h${l}`);
    const headingSelectors = headingLevels.join();

    const headings = document.querySelectorAll(headingSelectors);

    let listStarted = false;
    let toc = "<ul>";
    /** @type Element */
    let current = undefined;
    let currentLevel = minLevel;

    const getLevel = n => n[1];

    for (const heading of headings) {
      const headingLevel = getLevel(heading.tagName);

      if (current) {
        if (currentLevel === headingLevel) {
          if (listStarted) {
            toc += "</ul>\n";
            listStarted = false;
          }
        } else if (currentLevel < headingLevel) {
          if (!listStarted) {
            toc += "<ul>\n";
          }
        } else {
          for (let index = 0; index < currentLevel; index++) {
            toc += "</ul>\n";
          }
          currentLevel = headingLevel;
          toc += "<ul>";
        }
      }

      heading.id = heading.textContent.replaceAll(/[^A-Zöäü0-9]/gi, "-");

      toc += `<li><a href="#${heading.id}">${heading.textContent}</a></li>\n`;

      current = heading;
      currentLevel = headingLevel;
    }

    toc += "</ul>";

    const tocElement = document.querySelector("#toc");
    if (tocElement) {
      tocElement.innerHTML = toc;
    }
  }
}

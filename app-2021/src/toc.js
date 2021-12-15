export class tocBuilder {
  applyToc(minLevel = 1, maxLevel = 6) {
    const tocElement = document.querySelector("#toc");
    if (tocElement) {
      tocElement.innerHTML = this.createTocHTML(minLevel, maxLevel);
    }
  }

  createTocHTML(minLevel = 1, maxLevel = 6) {
    const allLevels = [...Array(7).keys()];
    const levels = allLevels.slice(minLevel, maxLevel + 1);
    const headingLevels = levels.map(l => `h${l}`);
    const headingSelectors = headingLevels.join();

    const headings = document.querySelectorAll(headingSelectors);

    let result = "<ul>";
    let currentLevel = undefined;

    for (const heading of headings) {
      const headingLevel = heading.tagName[1];

      if (currentLevel) {
        if (currentLevel < headingLevel) {
          result += "<ul>\n";
        } else if (currentLevel > headingLevel) {
          for (let index = 0; index < currentLevel; index++) {
            result += "</ul>\n";
          }
          currentLevel = headingLevel;
          result += "<ul>";
        }
      }

      heading.id = heading.textContent.replaceAll(/[^A-Zöäü0-9]/gi, "-");

      result += `<li><a href="#${heading.id}">${heading.textContent}</a></li>\n`;

      currentLevel = headingLevel;
    }

    result += "</ul>";

    return result;
  }
}

class MyElement extends HTMLElement {
  connectedCallback() {
    // Set up initial HTML for this component
  }

  static get observedAttributes() {
    return ["titles"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = `<b>${newValue}</b>`;
  }
}

customElements.define("my-element", MyElement);

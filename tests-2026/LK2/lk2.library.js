class MyElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<b>Name</b>`;
  }

  static get observedAttributes() {
    return ["titles"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = `<b>${newValue}</b>`;
  }
}

customElements.define("my-element", MyElement);

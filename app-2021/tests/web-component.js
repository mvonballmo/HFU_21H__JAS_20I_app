class MyElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<b>Title</b>";
  }

  static get observedAttributes() {
    return ["title"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = `<b>${newValue}</b>`;
  }
}

customElements.define("my-element", MyElement);

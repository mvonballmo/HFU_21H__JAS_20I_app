class MyElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<b>Title</b>";
  }

  static get observedAttributes() {
    return ["a"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = `<b>${name} = ${newValue}</b>`;
  }
}

customElements.define("my-element", MyElement);

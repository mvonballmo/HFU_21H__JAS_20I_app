class MyElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<b>Title</b>";
  }
}

customElements.define("my-element", MyElement);

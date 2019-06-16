function getSomeAsnyncValue() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("I am a nice value: " + Date.now()), 200);
    })
}

async function getSomeAsnyncValue1() {
    await setTimeout(300);
    return "I am a nice value: " + Date.now();
}

class MustacheForm extends HTMLElement {

    constructor() {

        super();

        this.loadElements();
        this.initElements();
        this.innerHTML = this.tpl;
    }

    loadElements() {

        this.tpl = tplProvider.cloneMustacheTpl();
        this.nameLabel = this.tpl.querySelector('label[for="name"]');
        this.button = this.tpl.querySelector('#btn');
        this.displayElement = this.tpl.querySelector('#display');
        this.dataId = this.dataset.id;
    }
    initElements() {

        let values = {
            btnText: "mustacheBtn",
            displayText: "mustacheText",
        }
        console.log(this.tpl.innerText);
        this.tpl = Mustache.render(this.tpl.innerHTML, values);
        
    }
}


class BaseForm extends HTMLElement {

    constructor(labelName, displayText) {

        super();

        let tpl = this.loadElements();
        this.initElements(labelName, displayText);
        this.registerComEvent();
        this.appendChild(tpl);
    }

    loadElements() {

        let tpl = tplProvider.cloneTpl();
        this.nameLabel = tpl.querySelector('label[for="name"]');
        this.button = tpl.querySelector('#btn');
        this.displayElement = tpl.querySelector('#display');
        this.dataId = this.dataset.id;

        return tpl;
    }

    fireEvent() {
        let comEvent = new CustomEvent("sayHello", {
            bubbles: true,
            capturing: true,
            composed: true,
            detail: {
                type: "com",
                init: this.dataId
            }
        });

        document.dispatchEvent(comEvent);
    }

    registerComEvent() {

        this.parentElement.addEventListener("sayHello", ev => {
            console.log("received on parent", ev, true);
        });

        this.addEventListener("sayHello", ev => {
            if (ev.detail.init != this.dataId) {
                console.log("ssss", this.dataId, ev.detail);
            } else {
                console.log("event from myself", this.dataId, ev.detail);
            }
        }, true);
    }

    initElements(labelName, displayText) {
        this.nameLabel.innerText = labelName;

        this.button.addEventListener("click", (ev) => {
            getSomeAsnyncValue1().then(v => this.displayElement.innerText = v);
            this.fireEvent();
        });

        this.displayElement.innerText = this.displayText;
        getSomeAsnyncValue().then(v => this.displayElement.innerText = v);
    }

    connectedCallback() {
        console.log("I am connected!");
    }

}

class MyForm extends BaseForm {

    constructor() {
        super("name changed", "d1")
    }
}

class AnotherForm extends BaseForm {

    constructor() {
        super("name changed2", "d2");
    }
}

class TplProvider {

    constructor() {

    }

    load() {
        let c = document.querySelector("#formcomponent")
        this.tpl = c.content.cloneNode(true);
        this.mustacheTpl = document.querySelector("#formcomponentWithMustache").cloneNode(true);
    }

    cloneTpl() {
        return this.tpl.cloneNode(true);
    }

    cloneMustacheTpl() {
        return this.mustacheTpl.cloneNode(true);
    }
}

fetch("templates.js")
    .then(response => response.text())
    .then(t => {
        let wrapper = document.createElement('div');
        wrapper.innerHTML = t;
        document.querySelector("body").appendChild(wrapper);
    })
    .then(v => {

        console.log("info");
        tplProvider.load();

        customElements.define("my-form", MyForm);
        customElements.define("another-form", AnotherForm);
        customElements.define("mustache-form", MustacheForm);

        document.addEventListener("sayHello", ev => {
            console.log("received on html", ev);
        });

        window.scrollBy(0, 0);
    });

let tplProvider = new TplProvider();
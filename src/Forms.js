import { tplProvider } from "./TemplatesProvider.js";
import { getSomeAsnyncValue } from "./DataProvider.js"
import { getSomeAsnyncValue1 } from "./DataProvider.js"

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

export class MyForm extends BaseForm {

    constructor() {
        super("name changed", "d1")
    }
}

export class AnotherForm extends BaseForm {

    constructor() {
        super("name changed2", "d2");
    }
}
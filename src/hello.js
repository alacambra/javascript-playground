import { MyForm } from "./Forms.js";
import { AnotherForm } from "./Forms.js";
import { MustacheForm } from "./MustacheForm.js";
import { tplProvider } from "./TemplatesProvider.js";

window.onload = function () {
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
};

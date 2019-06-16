export class TplProvider {

    constructor() {
        console.log("building.... " + new Date());
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

export let tplProvider = new TplProvider();
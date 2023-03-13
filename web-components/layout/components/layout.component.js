(function (module) {

    class AppLayout extends HTMLElement {

        constructor() {
            super()
        }

        async _render() {
            // const baseUrl = useLocal? './' : 'https://cdn.example.invalid/'
            const inner = await html.import(baseUrl + 'layout/components/layout-component.html')
 

            const shadow = this.attachShadow({ mode: 'open' })
            shadow.appendChild(inner)

            // const inner = await html.import('test.component.html')

            // replacing inline handler function with own component methods
            mapComponentEvents(this, eventNames)

            // get variable names
            updateVars(this)
        }

        connectedCallback() { this._render() }

        disconnectedCallback() { }

        attributeChangedCallback(name, oldValue, newValue) { }

        adoptedCallback() { }

    }

    window.customElements.define('app-layout', AppLayout)


    module.exports = AppLayout

})(module)
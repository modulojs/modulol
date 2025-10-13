/*<script src=Modulo.html></script><meta charset=utf8><script type=mdocs>---
version: v0.1.0
copyright: 2025 Michael Bethencourt - LGPLv3 - NO WARRANTEE OR IMPLIED UTILITY;
    ANY MODIFICATIONS OR DERIVATIVES OF THE MODULO FRAMEWORK MUST BE LGPLv3+
    LGPL Notice: It is acceptable to link ("bundle") and distribute the Modulo
    Framework with other code as long as the LICENSE and NOTICE remains intact.
---
// */ // md: `[ % ] v0.1.0 [ModuloHTML.org](https://modulohtml.org/)`
var Modulo = function Modulo (OPTS = { }) {
    const Lib = OPTS.globalLibrary || window.Modulo || Modulo; //md:# **ᵐ°dᵘ⁄o**
    Lib.instanceID = Lib.instanceID || 0;
    this.id = ++Lib.instanceID;
    const globals = OPTS.globalProperties || [ 'config', 'util', 'engine',
        'processor', 'part', 'core', 'templateMode', 'templateTag',
        'templateFilter', 'contentType', 'command', 'build', 'definitions',
        'stores', 'fetchQueue' ];
    for (const name of globals) {
        const stdLib = Lib[name.charAt(0).toUpperCase() + name.slice(1) + 's'];
        this[name] = stdLib ? stdLib(this) : { }; // Exe StdLib Module
    }
}
/* md: ###`[ % ]` [Create **App** »](?argv=newapp)
md:###`[ % ]` [Create **Library** »](?argv=newlib)
md:###`[ % ]` [Create **Markdown** »](?argv=newmd)
md:_**Hint:** Click starter template for preview. Click file(s) to save._
md:**About:** Modulo (or ᵐ°dᵘ⁄o) is a [single file](?argv=edit) frontend
md:framework, squeezing in numerous tools for modern HTML, CSS, and
md:JavaScript. Featuring: Web Components, CSS Scoping, Shadow DOM,
md:SSG / SSR, Bundling, Store and State Management, Templating, and more.
*/
Modulo.Parts = function ComponentParts (modulo) {// md: ## Component Parts
/* md: ### Include
md:```html=component<Include>
md:<script>document.body.innerHTML += '<h1>ᵐ°dᵘ⁄o</h1>'<-script>
md:<style>:root { --c1: #B90183; }  body { background: var(--c1); }</style>
md:</Include>``` _Include_ is for global styles, links, and scripts.
*/
class Include {
    static LoadMode(modulo, def, value) {
        const { bundleHead, newNode } = modulo.util;
        for (const elem of newNode(def.Content).children) { // md: Include loops
            bundleHead(modulo, elem); // md: across it's children adding to head,
        } // md: and pausing during load. When built, it combines into bundles.
    } // TODO: use "value" for async vs lazy
    static Server({ part, util }, def, value) {
        def.Content = (def.Content || '') + new part.Template(def.TagTemplate)
            .render({ entries: util.keyFilter(def), value });
    }
    intitializedCallback(renderObj) {
        Include.LoadMode(this.modulo, this.conf, 'lazy');
    }
}

class Props { // md: ### Props
    static factoryCallback({ elementClass }, def, modulo) {
        const isLower = key => key[0].toLowerCase() === key[0]; // skip "-prefixed"
        const keys = Array.from(Object.keys(def)).filter(isLower);
        elementClass.observedAttributes.push(...keys); // (modify elementClass)
    }
    // md:```html=component<Props quote name="Unknown"></Props>
    // md:<Template>{{ props.name }} says "{{ props.quote }}"</Template>```
    initializedCallback() { // md: Props loads attributes from the element
        this.data = { }; // md: when the component is initialized (mounted):
        Object.keys(this.attrs).forEach(attrName => this.updateProp(attrName));
        return this.data; // md: E.g. `<x-App name="Jo"></x-App>` sets _name_.
    }
    updateProp(attrName) { // md: It also rerenders if one of those is changed.
        this.data[attrName] = this.element.hasAttribute(attrName) ?
            this.element.getAttribute(attrName) : this.attrs[attrName];
    }
    attrCallback({ attrName }) {
        if (attrName in this.attrs) {
            this.updateProp(attrName);
            this.element.rerender();
        }
    }
}

//md:### Style
//md:```html=component<Template><em class="big">Stylish</em> TEXT</Template>
//md:<Style>.big { font-size: 4rem } :host { background: #82d4a4 }</Style>```
class Style {
    static AutoIsolate(modulo, def, value) { // md: _Style_ "auto-isolates" CSS.
        const { AutoIsolate } = modulo.part.Style; // (for recursion)
        const { namespace, mode, Name } = modulo.definitions[def.Parent] || {};
        if (value === true) { // md: _Style_ uses `<Component mode=....>` to
            AutoIsolate(modulo, def, mode); //md:isolate: `mode=regular` will
        } else if (value === 'regular' && !def.isolateClass) {//md:prefix your
            def.prefix = def.prefix || `${namespace}-${Name}`; //md:selectors
        } else if (value === 'vanish') { //md:with the component name, while
            def.isolateClass = def.isolateClass || def.Parent;//md:setting
        } // md:`mode=vanish` adds the class to children outside of slots.
    }
    domCallback(renderObj) {
        const { mode } = modulo.definitions[this.conf.Parent] || {};
        const { innerDOM, Parent } = renderObj.component;
        const { isolateClass, isolateSelector, shadowContent } = this.conf;
        if (isolateClass && isolateSelector && innerDOM) { // Attach classes
            const selector = isolateSelector.filter(s => s).join(',\n');
            for (const elem of innerDOM.querySelectorAll(selector)){
                elem.classList.add(isolateClass);
            }
        } // md: For `mode=shadow`, it adds a "private" sheet to the shadow DOM
        if (shadowContent && innerDOM) { //  md: root during DOM reconciliation.
            innerDOM.prepend(this.modulo.util.newNode(shadowContent, 'STYLE'));
        }
    }
    static processSelector (modulo, def, selector) {// md: It also permits
        const hostPrefix = def.prefix || ('.' + def.isolateClass);//md:use of
        if (def.isolateClass || def.prefix) {//md:the `:host` "outer" selector.
            const hostRegExp = new RegExp(/:(host|root)(\([^)]*\))?/, 'g');
            selector = selector.replace(hostRegExp, hostClause => {
                hostClause = hostClause.replace(/:(host|root)/gi, '');
                return hostPrefix + (hostClause ? `:is(${ hostClause })` : '');
            });
        }
        let selectorOnly = selector.replace(/\s*[\{,]\s*,?$/, '').trim();
        if (def.isolateClass && selectorOnly !== hostPrefix) {
            // Remove extraneous characters (and strip ',' for isolateSelector)
            let suffix = /{\s*$/.test(selector) ? ' {' : ', ';
            selectorOnly = selectorOnly.replace(/:(:?[a-z-]+)\s*$/i, (all, pseudo) => {
                if (pseudo.startsWith(':') || def.corePseudo.includes(pseudo)) {
                    suffix = ':' + pseudo + suffix; // Attach to suffix, on outside
                    return ''; // Strip pseudo from the selectorOnly variable
                }
                return all;
            });
            def.isolateSelector.push(selectorOnly); // Add to array for later
            selector = `.${ def.isolateClass }:is(${ selectorOnly })` + suffix;
        }
        if (def.prefix && !selector.startsWith(def.prefix)) {
            // A prefix was specified, so prepend it if it doesn't have it
            selector = `${ def.prefix } ${ selector }`;
        }
        return selector;
    }
    static ProcessCSS (modulo, def, value) {
        if (def.isolateClass || def.prefix) {
            if (!def.keepComments) {
                value = value.replace(/\/\*.+?(\*\/)/g, ''); // strip comments
            }
            def.isolateSelector = []; // Used to accumulate elements to select
            value = value.replace(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/gi, selector => {
                selector = selector.trim();
                if (selector.startsWith('@') || selector.startsWith('from')
                                              || selector.startsWith('to')) {
                    return selector; // Skip (e.g. is @media or @keyframes)
                }
                return this.processSelector(modulo, def, selector);
            });
        } // md: When used with `-src=`, it will rewrite relative URLs.
        if (def.urlReplace || (def.urlReplace === null && def.Source)) {
            const key = def.urlReplace === 'absolute' ? 'href' : 'pathname';
            value = value.replace(/url\(['"]?([^)]+?)['"]?\)/gi, (all, url) =>
                !url.startsWith('.') ? all : // . = relative (TODO: too simple)
                    `url("${ (new window.URL(url, def.Source))[key] }")`);
        }
        const { mode } = modulo.definitions[def.Parent] || {};
        if (mode === 'shadow') {
            def.shadowContent = (def.shadowContent || '') + value;
        } else { // md: During `build`, all non-shadow _Style_ parts get bundled.
            const { newNode, bundleHead } = modulo.util;
            bundleHead(modulo, newNode(value, 'STYLE'), modulo.bundles.modstyle);
        }
    }
}

//md:### StaticData
//md:```html=component<Template><pre>{{ staticdata|json:2 }}</pre></Template>
//md:<StaticData -data-type=md -src=Modulo.html></StaticData>```
class StaticData {// md: Use for bundling unchanging data (e.g. API, files,
    prepareCallback() { // md: config, etc) in with a component.
        return this.conf.data;
    }
}

class Script { // md:### Script
    // md:```html=component<Script>function hi(){ alert(ref.h1.outerHTML) }<-Script>
    // md:<Template><h1 on.click=script.hi script.ref>Click me</h1></Template>```
    // md: Scripts let you embed JavaScript code "inside" your component.
    static AutoExport (modulo, def, value) {
        const nameRE = /(function|class)\s+(\w+)/; // gather exports
        const matches = def.Content.match(new RegExp(nameRE, 'g')) || [];
        const isSym = sym => sym && !(sym in modulo.config.syntax.jsReserved);
        const symbols = matches.map(sym => sym.match(nameRE)[2]);
        const ifUndef = n => `"${n}":typeof ${n} !=="undefined"?${n}:undefined`;
        const expStr = symbols.filter(isSym).map(ifUndef).join(',');
        const { ChildrenNames } = modulo.definitions[def.Parent] || { };
        const sibs = (ChildrenNames || []).map(n => modulo.definitions[n].Name);
        sibs.push('component', 'element', 'parts', 'ref'); // gather locals
        const locals = sibs.filter(name => def.Content.includes(name));
        const setLoc = locals.map(name => `${ name }=o.${ name }`).join(';')
        def.Content += locals.length ? ('var ' + locals.join(',')) : '';
        def.Content += `;return{_setLocal:function(o){${ setLoc }}, ${ expStr }}`;
    }
    initializedCallback(renderObj) { // md: Upon Component initialization, it
        const func = modulo.registry.modules[this.conf.DefinitionName];//md:will
        this.exports = func.call(window, modulo);// md: run your code, gathering
        for (const method of Object.keys(this.exports)) { // md: each export.
            if (method === 'initializedCallback' || !method.endsWith('Callback')) {
                continue; // md: Named functions (e.g. `function foo`) and 
            } // md: classes get "auto-exported", for attachment to events.
            this[method] = arg => {
                const renderObj = this.element.getCurrentRenderObj();
                const script = renderObj[this.conf.Name];
                this.eventCallback(renderObj);
                Object.assign(script, this.exports[method](arg) || {}); // Run
            };
        }
        this.ref = { };
        this.eventCallback(renderObj);
        return Object.assign(this.exports, this.exports.initializedCallback ?
                this.exports.initializedCallback(renderObj) : { }); // Run init
    }
    eventCallback(renderObj) {
        this.exports._setLocal(Object.assign({ ref: this.ref,
            element: this.element, parts: this.element.cparts }, renderObj));
    }
    refMount({ el, nameSuffix, value }) { // md: The `script.ref` directive
        const refVal = value ? modulo.util.get(el, value) : el; // md: assigns
        this.ref[nameSuffix || el.tagName.toLowerCase()] = refVal; // md: DOM
    } // md: references. E.g. `<img script.ref>` is called `ref.img` in script.
    refUnmount({ el, nameSuffix }) { // md: When unmounted, the reference is
        delete this.ref[nameSuffix || el.tagName.toLowerCase()]; // md: deleted.
    }
}

// md:### State
// md:```html=component<State msg="Lorem" a:=123></State>
// md:<Template>{{ state.msg }}: <input state.bind name=msg></Template>```
class State { // _State_ declares _state variables_ to bind to forms.
    static factoryCallback(renderObj, def, modulo) {
        if (def.Store) { // md: If a -store= is specified, it's global.
            const store = modulo.util.makeStore(modulo, def);
            if (!(def.Store in modulo.stores)) { // md: The first one
                modulo.stores[def.Store] = store; // md: encountered
            } else { // md: with that name will create the "Store".
                Object.assign(modulo.stores[def.Store].data, store.data);
            } // md: Subsequent usage will share and react to that one "Store".
        } // md: Without -store=, it will be be private to each component.
    }
    initializedCallback(renderObj) {
        const store = this.conf.Store ? this.modulo.stores[this.conf.Store]
                : this.modulo.util.makeStore(this.modulo,
                Object.assign(this.conf, renderObj[this.conf.Init]));
        store.subscribers.push(Object.assign(this, store));
        this.types = { range: Number, number: Number }
        this.types.checkbox = (v, el) => el.checked;
        return store.data;
    }
    bindMount({ el, nameSuffix, value, listen }) {
        const name = value || el.getAttribute('name');
        const val = this.modulo.util.get(this.data, name, this.conf.Dot);
        this.modulo.assert(val !== undefined, `state.bind "${name}" undefined`);
        const isText = el.tagName === 'TEXTAREA' || el.type === 'text';
        const evName = nameSuffix ? nameSuffix : (isText ? 'keyup' : 'change');
        // Bind the "listen" event to propagate to all, and trigger initial vals
        listen = listen ? listen : () => this.propagate(name, el.value, el);
        el.addEventListener(evName, listen);
        this.boundElements[name] = this.boundElements[name] || [];
        this.boundElements[name].push([ el, evName, listen ]);
        this.propagate(name, val, null, [ el ]); // Trigger element assignment
    }
    bindUnmount({ el, nameSuffix, value }) {
        const name = value || el.getAttribute('name');
        const remainingBound = [];
        for (const row of this.boundElements[name]) {
            if (row[0] === el) {
                row[0].removeEventListener(row[1], row[2]);
            } else {
                remainingBound.push(row);
            }
        }
        this.boundElements[name] = remainingBound;
    }
    stateChangedCallback(name, value, el) {
        this.modulo.util.set(this.data, name, value, this.conf.Dot);
        if (!this.conf.Only || this.conf.Only.includes(name)) {
            this.element.rerender();
        }
    }
    eventCallback() {
        this._oldData = Object.assign({}, this.data);
    }
    propagate(name, val, originalEl = null, arr = null) {
        arr = arr ? arr : this.subscribers.concat(
            (this.boundElements[name] || []).map(row => row[0]));
        const typeConv = this.types[ originalEl ? originalEl.type : null ];
        val = typeConv ? typeConv(val, originalEl) : val; // Apply conversion
        for (const el of arr) {
            if (originalEl && el === originalEl) { // skip
            } else if (el.stateChangedCallback) {
                el.stateChangedCallback(name, val, originalEl, arr);
            } else if (el.type === 'checkbox') {
                el.checked = !!val;
            } else { // Normal input
                el.value = val;
            }
        }
    }
    eventCleanupCallback() {
        for (const name of Object.keys(this.data)) {
            this.modulo.assert(!this.conf.AllowNew && name in this._oldData,
                `State variable "${ name }" is undeclared (no "-allow-new")`);
            if (this.data[name] !== this._oldData[name]) {
                this.propagate(name, this.data[name], this);
            }
        }
        this._oldData = null;
    }
}

class Template { // md: ### Template
    // md: Templates run _Modulo Template Language_ to generate HTML.
    static CompileTemplate (modulo, def, value) {
        const compiled = modulo.util.instance(def, { }).compile(value);
        def.Code = `return function (CTX, G) { ${ compiled } };`;
    }
    constructedCallback() { // Flatten filters, tags, and modes
        this.stack = []; // cause err on unclosed
        const { filters, tags, modes } = this.conf;
        const { templateFilter, templateTag, templateMode } = this.modulo;
        Object.assign(this, this.modulo.config.template, this.conf);
        // md: Templates have numerous built-in _filters_, _tags_, and _modes_.
        this.filters = Object.assign({ }, templateFilter, filters);
        this.tags = Object.assign({ }, templateTag, tags);
        this.modes = Object.assign({ }, templateMode, modes);
    }
    initializedCallback() {
        return { render: this.render.bind(this) }; // Export "render" method
    }
    constructor(text, options = null) { // md:In JavaScript, it's available as:
        if (typeof text === 'string') { // md: `new Template('Hi {{ a }}')`
            window.modulo.util.instance(options || { }, null, this); // Setup object
            this.conf.DefinitionName = '_template_template' + this.id; // Unique
            const code = `return function (CTX, G) { ${ this.compile(text) } };`;
            this.modulo.processor.code(this.modulo, this.conf, code);
        }
    }
    renderCallback(renderObj) {
        if (this.conf.Name === 'template' || this.conf.active) { // If primary
            renderObj.component.innerHTML = this.render(renderObj); // Do render
        }
    }
    parseExpr(text) {
        // Output JS code that evaluates an equivalent template code expression
        const filters = text.split('|');
        let results = this.parseVal(filters.shift()); // Get left-most val
        for (const [ fName, arg ] of filters.map(s => s.trim().split(':'))) {
            const argList = arg ? ',' + this.parseVal(arg) : '';
            results = `G.filters["${fName}"](${results}${argList})`;
        }
        return results;
    }
    parseCondExpr(string) {
        // Return an Array that splits around ops in an "if"-style statement
        const regExpText = ` (${this.opTokens.split(',').join('|')}) `;
        return string.split(RegExp(regExpText));
    }
    toCamel(string) { // Takes kebab-case and converts toCamelCase
        return string.replace(/-([a-z])/g, g => g[1].toUpperCase());
    }
    parseVal(string) {
        // Parses str literals, de-escaping as needed, numbers, and context vars
        const s = string.trim();
        if (s.match(/^('.*'|".*")$/)) { // String literal
            return JSON.stringify(s.substr(1, s.length - 2));
        }
        return s.match(/^\d+$/) ? s : `CTX.${ this.toCamel(s) }`
    }
    tokenizeText(text) { // Join all modeTokens with | (OR in regex)
        const re = '(' + this.modeTokens.map(modulo.templateFilter.escapere)
                         .join('|(').replace(/ +/g, ')(.+?)');
        return text.split(RegExp(re)).filter(token => token !== undefined);
    }
    compile(text) {
        const { normalize } = this.modulo.util;
        let code = 'var OUT=[];\n'; // Variable used to accumulate code
        let mode = 'text'; // Start in text mode
        const tokens = this.tokenizeText(text);
        for (const token of tokens) {
            if (mode) { // If in a "mode" (text or token), then call mode func
                const result = this.modes[mode](token, this, this.stack);
                code += result ? (result + '\n') : '';
            } // FSM for mode: ('text' -> null) (null -> token) (* -> 'text')
            mode = (mode === 'text') ? null : (mode ? 'text' : token);
        }
        code += '\nreturn OUT.join("");'
        const unclosed = this.stack.map(({ close }) => close).join(', ');
        this.modulo.assert(!unclosed, `Unclosed tags: ${ unclosed }`);
        return code;
    }
    render(local) {
        if (!this.renderFunc) {
            const mod = this.modulo.registry.modules[this.conf.DefinitionName];
            this.renderFunc = mod.call(window, this.modulo);
        }
        return this.renderFunc(Object.assign({ local, global: this.modulo }, local), this);
    }
} // md: ---
const cparts = { State, Props, Script, Style, Template, StaticData, Include };
return modulo.util.insObject(cparts);
} // /* End of Component Parts */ /*#UNLESS#*/

Modulo.TemplateModes = modulo => ({ // md: ## Template Language
    '{%': (text, tmplt, stack) => { // md: _Modulo Template Language_ looks for
        const tTag = text.trim().split(' ')[0]; // md: syntax like `{% ... %}`.
        const tagFunc = tmplt.tags[tTag]; // md: These are "template tags".
        if (stack.length && tTag === stack[stack.length - 1].close) {
            return stack.pop().end;
        } else if (!tagFunc) {
            throw new Error(`Unexpected tag "${tTag}": ${text}`);
        }
        const result = tagFunc(text.slice(tTag.length + 1), tmplt);
        if (result.end) {  // md: Most expect an end tag: e.g. `{% if %}` has
            stack.push({ close: `end${ tTag }`, ...result });//md:`{% endif %}`.
        } // md: However, `{% include %}` and `{% debugger %}` do not.
        return result.start || result;
    }, // md: Code like `{{ state.a }}` will insert values in the generated HTML.
    '{-{': (text, tmplt) => `OUT.push('{{${ text }}}');`, // md: Escape syntax
    '{-%': (text, tmplt) => `OUT.push('{%${ text }%}');`,//md: is `{-%  %-}`.
    '{#': (text, tmplt) => false, // md: Short comments are `{# like this #}`.
    '{{': (text, tmplt) => `OUT.push(G.${ tmplt.unsafe }(${ tmplt.parseExpr(text) }));`,
    text: (text, tmplt) => text && `OUT.push(${JSON.stringify(text)});`,
}) // md: Simple example of `{% if %}`:

Modulo.TemplateTags = modulo => ({//md:```html=component<Template>{% if state.a %}
    'comment':() => ({ start: "/*", end: "*/"}),//md:<p>Y</p>{% else %}<p>N</p>
    'debugger': () => 'debugger;', // md:{% endif %}</Template>
    'else': () => '} else {', //md:<State a:=true></State>```
    'elif': (s, tmplt) => '} else ' + tmplt.tags['if'](s, tmplt).start,
    'empty': (text, {stack}) => { // Empty only runs if loop doesn't run
        const varName = 'G.FORLOOP_NOT_EMPTY' + stack.length;
        const oldEndCode = stack.pop().end; // get rid of dangling for
        const start = `${varName}=true; ${oldEndCode} if (!${varName}) {`;
        const end = `}${varName} = false;`;
        return { start, end, close: 'endfor' };
    }, // md: `{% for %}` is useful for "plural info", as it repeat its
    'for': (text, tmplt) => { // md: contents in a loop:
        const arrName = 'ARR' + tmplt.stack.length; 
        const [ varExp, arrExp ] = text.split(' in ');
        let start = `var ${arrName}=${tmplt.parseExpr(arrExp)};`;
        // TODO: Upgrade to for...of loop (after good testing)
        start += `for (var KEY in ${arrName}) {`;
        const [keyVar, valVar] = varExp.split(',').map(s => s.trim());
        if (valVar) {//md:```html=component<Template>
            start += `CTX.${keyVar}=KEY;`;//md:{% for foobar in state.d %}
        }//md:<h2>{{ foobar }}</h2>
        start += `CTX.${valVar?valVar:varExp}=${arrName}[KEY];`; //md:{% endfor %}
        return { start, end: '}'};//md:</Template><State d:='["A", "b"]'></State>```
    },
    'if': (text, tmplt) => { // Limit to 3 (L/O/R)
        const [ lHand, op, rHand ] = tmplt.parseCondExpr(text);
        const condStructure = !op ? 'X' : tmplt.opAliases[op] || `X ${op} Y`;
        const condition = condStructure.replace(/([XY])/g,
            (k, m) => tmplt.parseExpr(m === 'X' ? lHand : rHand));
        const start = `if (${condition}) {`;
        return { start, end: '}' };
    },
    'include': (text) => `OUT.push(CTX.${ text.trim() }.render(CTX));`,
    'ignoremissing': () => ({ start: 'try{\n', end: '}catch (e){}\n' }),
    'with': (text, tmplt) => {
        const [ varExp, varName ] = text.split(' as ');
        const code = `CTX.${ varName }=${ tmplt.parseExpr(varExp) };\n`;
        return { start: 'if(1){' + code, end: '}' };
    },
}) /*#ENDUNLESS#*/

Modulo.TemplateFilters = modulo => {//md:Using `|` we can apply _filters_:
//md:```html=component<Template><h2>Modulo Filters:</h2><dl>
//md:{% for fil in global.template-filter|keys|sorted %}<dt>{{fil}}</dt>
//md:<dd>"ab1-cd2"|{{fil}}&rarr; {% ignoremissing %}"{{"ab1-cd2"|apply:fil}}"
//md:{% endignoremissing %}</dd>{% endfor %}</dl></Template>```
const { get } = modulo.util;
const safe = s => Object.assign(new String(s),{ safe: true });
const escapere = s => s.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
const syntax = (s, arg = 'text') => {
    for (const [ find, sub, sArg ] of modulo.config.syntax[arg]) {
        s = find ? s.replace(find, sub) : Filters[sub](s, sArg);
    }
    return s;
};
const tagswap = (s, arg) => {
    arg = typeof arg === 'string' ? arg.split(/\s+/) : Object.entries(arg);
    for (const row of arg) {
        const [ tag, val ] = typeof row === 'string' ? row.split('=') : row;
        const swap = (a, prefix, suffix) => prefix + val + suffix;
        s = s.replace(RegExp('(</?)' + tag + '(\\s|>)', 'gi'),  swap);
    }
    return safe(s);
};
const modeRE = /(mode: *| type=)([a-z]+)(>| *;)/; // modeline
const Filters = {
    add: (s, arg) => s + arg,
    allow: (s, arg) => arg.split(',').includes(s) ? s : '',
    apply: (s, arg) => Filters[arg](s),
    camelcase: s => s.replace(/-([a-z])/g, g => g[1].toUpperCase()),
    capfirst: s => s.charAt(0).toUpperCase() + s.slice(1),
    combine: (s, arg) => s.concat ? s.concat(arg) : Object.assign({}, s, arg),
    default: (s, arg) => s || arg,
    divide: (s, arg) => (s * 1) / (arg * 1),
    divisibleby: (s, arg) => ((s * 1) % (arg * 1)) === 0,
    dividedinto: (s, arg) => Math.ceil((s * 1) / (arg * 1)),
    escapejs: s => JSON.stringify(String(s)).replace(/(^"|"$)/g, ''),
    escape: (s, arg) => s && s.safe ? s : syntax(s + '', arg || 'text'),
    first: s => Array.from(s)[0],
    join: (s, arg) => (s || []).join(typeof arg === "undefined" ? ", " : arg),
    json: (s, arg) => JSON.stringify(s, null, arg || undefined),
    guessmode: s => modeRE.test(s.split('\n')[0]) ? modeRE.exec(s)[2] : '',
    last: s => s[s.length - 1],
    length: s => s ? (s.length !== undefined ? s.length : Object.keys(s).length) : 0,
    lines: s => s.split('\n'),
    lower: s => s.toLowerCase(),
    multiply: (s, arg) => (s * 1) * (arg * 1),
    number: (s) => Number(s),
    pluralize: (s, arg) => (arg.split(',')[(s === 1) * 1]) || '',
    skipfirst: (s, arg) => Array.from(s).slice(arg || 1),
    subtract: (s, arg) => s - arg,
    sorted: (s, arg) => Array.from(s).sort(arg && ((a, b) => a[arg] > b[arg] ? 1 : -1)),
    trim: (s, arg) => s.replace(new RegExp(`^\\s*${ arg = arg ?
        escapere(arg).replace(',', '|') : '|' }\\s*$`, 'g'), ''),
    trimfile: s => s.replace(/^([^\n]+?script[^\n]+?[ \n]type=[^\n>]+?>)/is, ''),
    truncate: (s, arg) => ((s && s.length > arg*1) ? (s.substr(0, arg-1) + '…') : s),
    type: s => s === null ? 'null' : (Array.isArray(s) ? 'array' : typeof s),
    renderas: (rCtx, template) => safe(template.render(rCtx)),
    reversed: s => Array.from(s).reverse(),
    upper: s => s.toUpperCase(),
    urlencode: (s, arg) => window[`encodeURI${ arg ? 'Component' : ''}`](s)
                           .replace(/#/g, '%23'), // Ensure # gets encoded
    yesno: (s, arg) => `${ arg || 'yes,no' },,`.split(',')[s ? 0 : s === null ? 2 : 1],
};
const { values, keys, entries } = Object;
return Object.assign(Filters, Modulo.ContentTypes(modulo),
    { values, keys, entries, tagswap, get, safe, escapere, syntax });
} // md:---
/*
md: ## Configuration
md: All definitions "extend" a base configuration. See below:
md:```html=component<Template>{% for t, c in global.config %}
md:<h4>{{ t }}</h4><pre>{{ c|json:2 }}</pre>{% endfor %}</Template>```*/
Modulo.Configs = function DefaultConfiguration() {
const CONFIG = { /*#UNLESS#*/
    artifact: {
        tagAliases: { 'js': 'script', 'ht': 'html', 'he': 'head', 'bo': 'body' },
        pathTemplate: '{{ tag|default:cmd }}-{{ hash }}.{{ def.name }}',
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'DataType', 'Src', 'build|Command' ],
        CommandBuilders: [ 'FilterContent', 'Collect', 'Bundle', 'LoadElems' ],
        CommandFinalizers: [ 'Remove', 'SaveTo' ],
        Preprocess: true, // true is "toss code after"
        DefinedAs: 'name',
        SaveTo: 'BUILD', // Use "BUILD" filesystem-like store interface
        FilterContent: 'trimfile|trim|tagswap:config.artifact.tagAliases',
    },
    component: {
        tagAliases: { 'html-table': 'table', 'html-script': 'script', 'js': 'script' },
        mode: 'regular',
        rerender: 'event',
        Contains: 'part',
        CustomElement: 'window.HTMLElement', // Used to change base class
        DefinedAs: 'name',
        BuildLifecycle: 'build',
        RenderObj: 'component',
        Defer: 'wait',
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'Src', 'Defer', 'FilterContent', 'Content' ],
        DefBuilders: [ 'CustomElement', 'alias|AliasNamespace', 'Code' ],
        FilterContent: 'trimfile|trim',
        DefFinalizers: [ 'MainRequire' ],
        CommandBuilders: [ 'Prebuild|BuildLifecycle', 'BuildLifecycle' ],
        Directives: [ 'onMount', 'onUnmount' ],
        DirectivePrefix: '', // "component.on.click" -> "on.click"
    },
    configuration: {
        DefTarget: 'config',
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'Src|SrcSync', 'Content|Code',
                       'DefinitionName|MainRequire' ],
    },
    contentlist: {
        DataType: 'CSV',
        DefFinalizers: [ 'command|Command' ],
        CommandBuilders: [ 'build|BuildAll' ],
        build: 'build',
        command: '', // (default: def.commands = [])
    },
    domloader: {
        topLevelTags: [ 'modulo', 'file' ],
        genericDefTags: { def: 1, script: 1, template: 1, style: 1 },
    },
    include: {
        LoadMode: 'bundle',
        ServerTemplate: '{% for p, v in entries %}<script src="https://' +
                     '{{ server }}/{{ v }}"></' + 'script>{% endfor %}',
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'Src', 'Server', 'LoadMode' ],
    },
    library:  {
        Contains: 'core',
        DefinedAs: 'namespace',
        DefTarget: 'config.component',
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'Src', 'Content' ],
    },
    modulo: {
        build: { mainModules: [ ] },
        defaultContent: '<meta charset=utf8><modulo-Page>',
        fileSelector: "script[type='mdocs'],template[type='mdocs']," +
            "style[type='mdocs'],script[type='md'],template[type='md']," +
            "script[type='f'],template[type='f'],style[type='f']",
        scriptSelector: "script[src$='mdu.js'],script[src$='Modulo.js']," +
                        "script[src='?'],script[src$='Modulo.html']",
        version: '0.1.0',
        timeout: 5000,
        ChildPrefix: '',
        Contains: 'core',
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'Src', 'Content' ],
        defaultDef: { DefTarget: null, DefinedAs: null, DefName: null },
        defaultDefLoaders: [ 'DefTarget', 'DefinedAs', 'DataType', 'Src' ],
        defaultDefBuilders: [ 'FilterContent', 'ContentType', 'Load' ],
    },
    script: {
        Directives: [ 'refMount', 'refUnmount' ],
        DefFinalizers: [ 'AutoExport', 'Content|Code' ],
        AutoExport: '',
    },
    state: {
        Directives: [ 'bindMount', 'bindUnmount' ],
        Store: null,
    },
    style: {
        AutoIsolate: true, // true is "default behavior" (autodetect)
        urlReplace: null, // null is "default behavior" (only if -src is specified)
        isolateSelector: null, // Later has list of selectors
        isolateClass: null, // By default, it does not use class isolation
        prefix: null, // Used to specify prefix-based isolation (most common)
        corePseudo: ['before', 'after', 'first-line', 'last-line' ],
        DefBuilders: [ 'FilterContent', 'AutoIsolate', 'Content|ProcessCSS' ],
    },
    staticdata: { DataType: '?' }, // (? = use ext)
    template: {
        DefFinalizers: [ 'Content|CompileTemplate', 'Code' ],
        FilterContent: 'trimfile|trim|tagswap:config.component.tagAliases',
        unsafe: 'filters.escape',
        modeTokens: [ '{% %}', '{{ }}', '{# #}', '{-{ }-}', '{-% %-}' ],
        opTokens: '==,>,<,>=,<=,!=,not in,is not,is,in,not,gt,lt',
        opAliases: {
            '==': 'X === Y', 'is': 'X === Y',
            'is not': 'X !== Y', '!=': 'X !== Y',
            'not': '!(Y)',
            'gt': 'X > Y', 'gte': 'X >= Y',
            'lt': 'X < Y', 'lte': 'X <= Y',
            'in': '(Y).includes ? (Y).includes(X) : (X in Y)',
            'not in': '!((Y).includes ? (Y).includes(X) : (X in Y))',
        },
    },
    _dev: {
artifact: `
<Artifact name="css" -bundle="link,modstyle,style" build=build,buildvanish,buildlib>
    {% for id in def.ids %}{{ def.data|get:id|safe }}{% endfor %}
</Artifact>
<Artifact name="js" -bundle="script,modscript" -collect="?" build=build,buildlib>
    {% for id in def.ids %}{% if "collected_" not in id %}{{ def.data|get:id|safe }}
    {% else %}{{ def.data|get:id|syntax:"trimcode"|safe }}{% endif %}{% endfor %}
    modulo.definitions = { {% for name, value in definitions %}
        {% if name|first is not "_" %}{{ name }}: {{ value|json|safe }},{% endif %}
    {% endfor %} };
    {% for name in config.modulo.build.mainModules %}{% if name|first is not "_" %}
        modulo.registry.modules.{{ name }}.call(window, modulo);
    {% endif %}{% endfor %}
</Artifact>
<Artifact name=html path-template="{{ config.path-name|default:'index.html' }}"
    -remove="head iframe,modulo,script[modulo],template[modulo]"
    prefix="<!DOCTYPE html>" build=build,buildvanish>
    <ht><he>{{ doc.head.innerHTML|safe }}
    <link rel="stylesheet" href="{{ definitions._artifact_css.path }}"></link>
    {% if "vanish" not in argv|get:0 %}
    <js defer src="{{ definitions._artifact_js.path }}"></js>
    {% endif %}</he><bo>{{ doc.body.innerHTML|safe }}</bo></ht>
</Artifact>
<Artifact name=edit -collect=? -save-reqs build=edit></Artifact>
<Artifact name=vjs -remove="script" build=buildvanish></Artifact>
<script Artifact name=new_app path=App.html -collect=? -save-reqs build=newlib,newapp>
    <js src=Modulo.html></js><template type=f>\n<Template>
    \t<main>\n\t\t<h1>"My App"</h1>\n\t\t<slot></slot>\n\t</main>
    </Template>\n<Style>\n\tmain,\n\th1,\n\t:host {
    \t\tpadding: 4%;\n\t\tbackground: #ffffff88;\n\t}
    \t:host {\n\t\tbackground: linear-gradient(indigo, teal);
    \t\tdisplay: block;\n\t}\n</Style>
<\/script>
<script Artifact name=new path=index.html build=newapp>
    <js Modulo src=Modulo.html>\n\t<Component\n\t\tname=App\n\t\tmode=shadow
    \t\t-src=App.html\n\t></Component>\n</js>\n<x-App>\n\t<h1>Lorem</h1>
    \t<p>Ipsum</p>\n</x-App>
<\/script>
<script Artifact name=new path=new-lib.html d:='["Lorem","Ipsum"]' build=newlib>
    <js src=Modulo.html></js><template type=mdocs>\n<!--\nmd\:# "New Lib"
    md\:##[⬇ Get v1.0](?argv=buildlib&argv=NewLib_v1.0)\n-->
    {% for i,L in def.d %}\n<!--\nmd\:### Use {{i|number|add:1}}: {{L}}\nmd\:{{def.d|join}}:
    md\:\`\`\`html=embed\nmd\:<js Modulo src=Modulo.html -src="new-lib.html"></js>
    md\:<nl-App>{{L}}</nl-App>\nmd\:\`\`\`\n-->\n{% endfor %}\n<!-- App -->\n
    <Component\n\tname=App\n\tnamespace=nl\n\t-src="App.html"\n></Component><\/script>
<script Artifact name=new path=new-page.html build=newmd -collect=? -save-reqs>
    <js src=Modulo.html></js><js type=md>---\ndate: {{config.date}}\n---
    # Title\n### Section\nExample **content**, link: [Edit Me](?argv=edit)
<\/script>`,
component: `
<Component mode=shadow namespace=modulo name=Frame>
<Props fs file store=BUILD></Props><State -dot=| -name=build -store=BUILD></State>
<State -dot=| -name=cache -store=CACHE></State><Template>{% ignoremissing %}
{% with local|get:props.store|get:'fdata'|get:props.file|default:null as value %}
    <iframe style="{% if props.fs %}height:100%;min-height:80vh{% endif %}; 
    width:100%;border:0;border:1px dotted #111;"
    srcdoc="{% if value is null %}<h1>404/{{ props|json }}</h1>{% else %}
    {{ value }}{% endif %}" loading=lazy></iframe>{% endwith %}
{% endignoremissing %}</Template>
</Component><Component mode=shadow namespace=modulo name=TextEdit>
<Props fs store=build mode=html font=17 file readonly></Props>
<State -dot=| -name=build -store=BUILD></State>
<State -dot=| -name=cache -store=CACHE></State><Template>
{% with local|get:props.store|get:'fdata'|get:props.file|default:null as value %}
{% with value|lines|length|multiply:props.font|multiply:'1.5' as hg %}<modulo-wrap><pre style="
    font-size:{{props.font}}px"><modulo-line></modulo-line></span
    >{{value|syntax:props.mode|safe}}</pre><textarea style="top:-2px;left:50px;
    position:absolute;height:{{hg}}px; font-size:{{props.font}}px"
    {{props.readonly|yesno:"readonly,"}} spellcheck=false
    {{props.store}}.bind="fdata|{{props.file}}"></textarea></modulo-wrap>
{% endwith %}{% endwith %}</Template>
<Style>modulo-line:before{counter-increment:line;content:counter(line);
    position:absolute;left:0;color:#888;padding:0 0 0 3px}pre{padding:0 0 0 53px;}
    pre,textarea{counter-reset:line;display:block;color:black;background:transparent;
    white-space:pre;text-align:start;line-height:1.5;overflow-wrap:break-word;
    margin:0;box-sizing:content-box;border:1px dotted #111;
    font-family: monospace}modulo-wrap{display:block;position:relative;width:100%}
    textarea{resize:none;color:#00000000;caret-color:#000;width:100%;}
</Style></Component>
<Component namespace=modulo name=Editor>
<Props mode=html view edit demo value full></Props>
<State -dot=| -name=proc -store=PROC></State>
<State -dot=| -name=build -store=BUILD></State>
<State -dot=| -name=cache -store=CACHE></State>
<State fields:='{"edit":"TextEdit","view":"Frame"}' -init=props></State>
<Template -name="demo_embed">{{ props.value|safe }}</Template>
<script Template -name="demo_component"><js src=Modulo.html></js><template Modulo>
<Component name=App>\n{{ props.value|safe }}\n</Component>\n</template>
<x-App></x-App><\/script><Template><modulo-grid style="grid-template-columns: auto
    {{ state.view|yesno:'50%,1fr' }} 53px {{ state.view|yesno:'1fr,auto' }}"><div>
    {% if props.full %}<h1><a href="?argv={{ global.argv|join:'&argv='|safe }}">
    &#x27F3; {{ global.argv|join:' ' }} &nbsp;</a></h1> {% if proc.log|length %}
    <div>{% for row in proc.log %}<iframe src="{{ row|get:0 }}"></iframe>
    {% endfor %}</div>{% endif %}<pre>{% for row in proc.log %}
    {{ row|reversed|join:" \t" }}<br />{% endfor %}</pre><pre>
    {% for path, text in build.fdata %}<a download="{{ path }}"
        href="data:text/plain;charset=utf-8,{{ text|urlencode:true }}"
        >{{ path }}</a> ({{ text|length }})<br />{% endfor %}</pre>{% endif %}</div>
    {% for field, tag in state.fields %}<div>{% if props.full %}
    <label><select state.bind name="{{ field }}"><option value="">{{ field|upper }}
    </option>{% with local|get:state.store|get:'fdata' as fs %}{% for p, t in fs %}
    <option value={{p}}>&#x1F5CE; {{ p }}</option>{% endfor %}{% endwith %}
    </select></label>{% endif %}{% if state|get:field %}<modulo-{{tag}}
    fs="{{props.demo|yesno:',y'}}" file={{state|get:field}}
    readonly="{{props.demo|default:props.full|yesno:',y'}}"
    mode="{{state.mode|default:'txt'}}" store={{state.store}}></modulo-{{tag}}>
    {% endif %}</div><div></div>{% endfor %}</modulo-grid>
</Template>
<def Script>function prepareCallback(rObj) { if (!('store' in state)) {
    try { window._moduloFS = window._moduloFS || parent._moduloFS } catch { }
    state.store = 'build'; if (props.value || props.demo) {
        const edit = (props.demo || 'APP') + (++window.Modulo.instanceID) + '.html';
        const tmplt = rObj['demo_' + props.demo];
        Object.assign(state, { store: 'cache', view: tmplt ? edit : '', edit });
        cache.fdata[edit] = tmplt ? tmplt.render(rObj) : props.value;
    } } if ((state.edit + '|' + state.view) !== state.last) {
        element.textContent='';state.last=state.edit + '|' + state.view;
    } }</def><Style>select{width:100%} modulo-grid{width: 100%;
    display: grid}@media (max-width:992px){modulo-grid{display:block}}
</Style></Component>
<Component mode=vanish namespace=modulo name=Page><Template>
    {% with global.stores.CACHE.data.fdata|values|first as body %}{% if body %}
    {% with body|guessmode as mode %}{% if mode in global.config.syntax %}
    {{ body|MD:mode|get:'body'|safe }}{% endif %}{% endwith %}{% endif %}
{% endwith %}</Template><Style>p{line-height:1.6;font-size:18px}
h2[h]{margin:60px 0 0 0;font-family:sans-serif;font-weight:500;}
h2[h='#']{font-size:64px} h2[h='##']{font-size:46px;}h2[h='###']{font-size:30px}
h2[h='#'],h2[h='##']{text-align:center}code{background:#88888855}
hr{border:0.5vw solid #88888855;margin:5vw 30% 5vw 30%}</Style></Component>`
} /*#ENDUNLESS#*/ }

CONFIG.syntax = { // Simple RegExp mini langs for |syntax: filter
    jsReserved: { // Used by Script tags and JS syntax
        'break': 1, 'case': 1, 'catch': 1, 'class': 1, 'const': 1, 'continue': 1,
        'debugger': 1, 'default': 1, 'delete': 1, 'do': 1, 'else': 1,
        'enum': 1, 'export': 1, 'extends': 1, 'finally': 1, 'for': 1,
        'function': 1, 'if': 1, 'implements': 1, 'import': 1, 'in': 1,
        'instanceof': 1, 'interface': 1, 'new': 1, 'null': 1, 'package': 1,
        'private': 1, 'protected': 1, 'public': 1, 'return': 1, 'static': 1,
        'super': 1, 'switch': 1, 'throw': 1, 'try': 1, 'typeof': 1, 'var': 1,
        'let': 1, 'void': 1, 'while': 1, 'with': 1, 'await': 1, 'async': 1,
        'true': 1, 'false': 1,
    },
    html: [ //  html syntax highlights some common html / templating
        [ null, 'syntax', 'txt' ],
        [ /(\{%[^<>]+?%}|\{\{[^<>]+?\}\})/gm,
            '<tt style=background:#82d4a444>$1</tt>'],
        [ /(&lt;\/?)([a-z]+\-[A-Za-z]+)/g,
            '<tt style=color:#999>$1</tt><tt style=color:indigo>$2</tt>'],
        [ /(&lt;\/?)(script |def |template |)([A-Z][a-z][a-zA-Z]*)/g,
            '<tt style=color:#999>$1$2</tt><tt style=color:#B90183>$3</tt>'],
        [ /(&lt;\/?[a-z1-6]+|&gt;)/g, '<tt style=color:#777>$1</tt>'],
    ],
    'md': [ // md is a (very limited) Markdown implementation
        [ null, 'syntax', 'text' ],
        [ /(&lt;)-(script)(&gt;)/ig, '$1/$2$3' ], // fix <-script>
        [ /```([a-z]*)([a-z=]*)\n?(.+?)\n?```/igs,
             '<modulo-Editor mode="$1" demo$2 value="$3"></modulo-Editor>' ],
        [ /^(#+)\s*(.+)$/gm, '<h2 h="$1">$2</h2>' ],
        [ /!\[([^\]]+)\]\(([^\)]+)\)/g, '<img="$2" alt="$1" />' ],
        [ /\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>' ],
        [ /_([^_`]+)_/g, '<em>$1</em>'  ],
        [ /`([^`]+)`/g, '<code>$1</code>' ],
        [ /\*\*([^\*]+)\*\*/g, '<strong>$1</strong>' ],
        [ /\*([^\*]+)\*/g, '<em>$1</em>', ],
        [ /\n+\r?\n---+/g, '</p><hr />' ],
        [ /(\n|>)\r?\n[\n\r]*/g, '$1<p>' ],
    ],
    mdocs: [ // mdocs formats Markdown comments (marked with md\:)
        [ /^((?!.*md\:).*)$/gm, '\n' ], [ /^.*?md\:\s*/gm, '' ],
        [ null, 'syntax', 'md' ], // Delete non "md", then do markdown
    ],
    text: [ // escape text for HTML
        [ /&/g, '&amp;' ], [ /</g, '&lt;' ], [ />/g, '&gt;' ], // &<>
        [/'/g, '&#x27;'], [ /"/g, '&quot;' ], // "'
    ],
    trimcode: [ [ /^[\n \t]+/gm, '' ], // rm leading WS, comments, "UNLESS"
        [ /\/\*\#UNLESS\#[\s\S]+?\#ENDUNLESS\#(\*\/)/gm, '' ],
        [ /\/\*[^\*\!][\s\S]*?\*\/|\/\/.*$/gm, '' ],
    ],
    txt: [ //  txt forces WS
        [ null, 'syntax', 'text' ],
        [ /\n/g, '<br /><modulo-line></modulo-line>' ],
        [ /  /g, '&nbsp;&nbsp;' ],
    ],
};
CONFIG.syntax.js = Array.from(CONFIG.syntax.html)
CONFIG.syntax.js.push([ new RegExp(`(\\b${ Object.keys(
    CONFIG.syntax.jsReserved).join('\\b|\\b') }\\b)`, 'g'),
    `<strong style=color:firebrick>$1</strong>` ]);
return CONFIG
};


Modulo.ContentTypes = modulo => ({ // md: **ContentTypes**: CSV (limited),
    CSV: s => (s || '').trim().split('\n').map(r => r.trim().split(',')),
    JS: s => Function('return (' + s + ');')(), // md: JS (expression syntax),
    JSON: s => JSON.parse(s || '{ }'), // md: JSON (default),
    MD: (s, arg) => { //**MD** - Parses "Markdown Meta" (e.g. in `---` at top)
        const headerRE = /^([^\n]*---+\n.+?\n---\n)/s;
        const obj = { body: s.replace(headerRE, '') };
        if (obj.body !== s) { // Meta was specified
            let key = null; // Used for continuing / multiline keys
            const lines = s.match(headerRE)[0].split(/[\n\r]/g);
            for (const line of lines.slice(1, lines.length - 2)) { // omit ---
                if (key && (new RegExp('^[ \\t]')).test(line)) { // Multiline?
                    obj[key] += '\n' + line; // Add back \n, verbatim (no trim)
                } else if (line.trim() && (key = line.split(':')[0])) { // Key?
                    obj[key.trim()] = line.substr(key.length + 1).trim();
                }
            }
        }
        obj.body = arg ? modulo.templateFilter.syntax(obj.body, arg) : obj.body;
        return obj;
    },
    TXT: s => s, // md: TXT (plain text),
    BIN: (s, arg = 'application/octet-stream') => //md: BIN (binary types).
        `data:${ arg };charset=utf-8,${ window.encodeURIComponent(s) }`,
});


/* Utility Functions that setup Modulo */
Modulo.Utils = function UtilityFunctions (modulo) {

const Utilities = {
    escapeRegExp: s => // Escape string for regexp
        s.replace(/[.*+?^${}()|[\]\\]/g, "\\" + "\x24" + "&"),
    insObject: obj => Object.assign(obj || {}, Utilities.lowObject(obj)),
    get: (obj, key, sep='.') => (key in obj) ? // Get key path from object
         obj[key] : (key + '').split(sep).reduce((o, name) => o[name], obj),
    lowObject: obj => Object.fromEntries(Object.keys(obj || {}).map(
                        key => [ key.toLowerCase(), obj[key] ])),
    normalize: s => // Normalize space to ' ' & trim around tags
            s.replace(/\s+/g, ' ').replace(/(^|>)\s*(<|$)/g, '$1$2').trim(),
    set: (obj, keyPath, val, sep = null) => // Set key path in object
        new modulo.engine.ValueResolver(modulo, sep).set(obj, keyPath, val),
    trimFileLoader: s => // Remove first lines like "...script...file>" 
        s.replace(/^([^\n]+script[^\n]+[ \n]file[^\n>]+>(\*\/\n|---\n|\n))/is, '$2'),
};

function instance(def, extra, inst = null) {
    const registry = (def.Type in modulo.core) ? modulo.core : modulo.part;
    inst = inst || new registry[def.Type](modulo, def, extra.element || null);
    const id = ++window.Modulo.instanceID; // Unique number
    //const conf = Object.assign({}, modulo.config[name.toLowerCase()], def);
    const conf = Object.assign({}, def); // Just shallow copy "def"
    const attrs = modulo.util.keyFilter(conf);
    Object.assign(inst, { id, attrs, conf }, extra, { modulo: modulo });
    if (inst.constructedCallback) {
        inst.constructedCallback();
    }
    return inst;
}
function instanceParts(def, extra, parts = {}) {
    // Loop through all children, instancing each class with configuration
    const allNames = [ def.DefinitionName ].concat(def.ChildrenNames);
    for (const def of allNames.map(name => modulo.definitions[name])) {
        parts[def.RenderObj || def.Name] = modulo.util.instance(def, extra);
    }
    return parts;
}
function initComponentClass (modulo, def, cls) {
    // Run factoryCallback static lifecycle method to create initRenderObj
    const initRenderObj = { elementClass: cls }; // TODO: "static classCallback"
    for (const defName of def.ChildrenNames) {
        const cpartDef = modulo.definitions[defName];
        const cpartCls = modulo.part[cpartDef.Type];
        modulo.assert(cpartCls, 'Unknown Part:' + cpartDef.Type);
        if (cpartCls.factoryCallback) {
            const result = cpartCls.factoryCallback(initRenderObj, cpartDef, modulo);
            initRenderObj[cpartDef.RenderObj || cpartDef.Name] = result;
        }
    }
    cls.prototype.init = function init () {
        this.modulo = modulo;
        this.isMounted = false;
        this.isModulo = true;
        this.originalHTML = null;
        this.originalChildren = [];
        this.cparts = modulo.util.instanceParts(def, { element: this });
    };
    cls.prototype.connectedCallback = function connectedCallback () {
        modulo._connectedQueue.push(this);
        window.setTimeout(modulo._drainQueue, 0);
    };
    cls.prototype.moduloMount = function moduloMount(force = false) {
        if ((!this.isMounted && !modulo.paused) || force) {
            this.cparts.component._lifecycle([ 'initialized', 'mount' ]);
        }
    };
    cls.prototype.attributeChangedCallback = function (attrName) {
        if (this.isMounted) { // pass on info as attr callback
            this.cparts.component._lifecycle([ 'attr' ], { attrName });
        }
    };
    cls.prototype.initRenderObj = initRenderObj;
    cls.prototype.rerender = function (original = null) {
        if (!this.isMounted) { // Not mounted, do Mount which will also rerender
            return this.moduloMount();
        }
        this.cparts.component.rerender(original); // Otherwise, normal rerender
    };
    cls.prototype.getCurrentRenderObj = function () {
        return this.cparts.component.getCurrentRenderObj();
    };
    modulo.registry.elements[cls.name] = cls; // Copy class to Modulo
}
function newNode(innerHTML, tag, extra) {
    const obj = Object.assign({ innerHTML }, extra);
    return Object.assign(window.document.createElement(tag || 'div'), obj);
}
function makeStore (modulo, def) {
    const data = JSON.parse(JSON.stringify(modulo.util.keyFilter(def)));
    return { data, boundElements: {}, subscribers: [] };
}
function keyFilter (obj, func = null) {
    func = func || (key => /^[a-z]/.test(key)); // Start with lower alpha
    const keys = func.call ? Object.keys(obj).filter(func) : func;
    return Object.fromEntries(keys.map(key => [ key, obj[key] ]));
}
Object.assign(Utilities, { initComponentClass, instance, instanceParts, newNode, makeStore, keyFilter })

/*#UNLESS#*/
function loadString (text, pName) { // Loads string, possibly removing preamble
    text = text.replace(/^([^\n]+?script[^\n]+?[ \n]type=[^\n>]+?>)(.*)$/is, '$2');
    return loadFromDOM(newNode(text), pName);
}
function loadFromDOM(elem, parentName = null, quietErrors = false) {
    const loader = new modulo.engine.DOMLoader(modulo);
    return loader.loadFromDOM(elem, parentName, quietErrors);
}
function repeatProcessors(defs, field, cb) {
    const { WAIT, WAITALL } = modulo.consts;
    let changed = true; // Run at least once
    const defaults = modulo.config.modulo['default' + field] || [];
    while (changed !== false) {
        changed = false; // TODO: Make deterministic order e.g. arr
        for (const def of (defs || Object.values(modulo.definitions))) {
            const processors = def[field] || defaults;
            const result = applyNextProcessor(def, processors);
            if (result === WAIT || result === WAITALL) {
                changed = result
                break;
            }
            changed = changed || result;
        }
    } // TODO: Refactor this area
    const repeat = () => repeatProcessors(defs, field, cb);
    if (changed !== WAIT && changed !== WAITALL && Object.keys(
        modulo.fetchQueue ? modulo.fetchQueue.queue : {}).length === 0) {
        if (cb) { cb(); }
    } else {
        modulo.fetchQueue.enqueue(repeat, changed === WAITALL);
    }
}
function applyNextProcessor (def, processorNameArray) {
    const cls = modulo.part[def.Type] || modulo.core[def.Type] || {};
    for (const name of processorNameArray) {
        modulo.assert(name, `${ def.DefinitionName } - Invalid: ${ processorNameArray }"`);
        const [ attrName, aliasedName ] = name.split('|');
        if (attrName in def) {
            const funcName = aliasedName || attrName;
            const proc = modulo.processor[funcName.toLowerCase()];
            const func = funcName in cls ? cls[funcName].bind(cls) : proc;
            modulo.assert(func, `Invalid processor: "${ funcName }"`);
            const value = def[attrName]; // Pluck value & remove attribute
            delete def[attrName];
            const ret = func(modulo, def, value);
            return ret ? ret : true; // falsy -> true
        }
    }
    return false; // No processors were applied, return false
}
function configureStatic (modulo) { // Setup default content
    const { staticDir, rootDir, scriptSelector, fileSelector } = modulo.config.modulo;
    const [ cmdName, src ] = modulo.argv;
    const file = window.document.querySelector(fileSelector);
    if (file) { // Content file exists, extract data then remove
        const preamble = /^([^\n]+?script[^\n]+?[ \n]type=[^\n>]+?>).*$/is;
        const elem = document[document.body.children.length ? 'body' : 'head'];
        const s = elem.innerHTML.replace(preamble, '$1').replace(/=""/g, '');
        const text = s.replace(/="([\w_\?\.\:\/-]+)"/g, '=$1') + file.innerHTML;
        if (window.parent && parent !== window && cmdName === '_load') {
            modulo.assert(s.length < 200, `Header Too Long: ${ src }`);
            parent.postMessage(JSON.stringify({ _FL: [ text, src ] }), '*');
            modulo.util.repeatProcessors = () => {} // stop future loading
            return;
        } else if (!modulo.definitions.modulo) {
            modulo.fetchQueue.enqueue(() => { // loads default viewer
                document.body.innerHTML += modulo.config.modulo.defaultContent;
            }, true);
        }
        modulo.stores.CACHE.setItem(window.location + '', text)
        file.remove();
    }
    const dir = staticDir || 'static/'; // has src=static/mdu.js
    const mdu = window.document.querySelector(scriptSelector);
    const root = rootDir || ((mdu || {}).src || '').split(dir)[0]; // e.g. ../
    if (!modulo.definitions.modulo && mdu && root !== mdu.src && // (No Modulo)
            !(window.location + '').includes(root + dir)) { // (Not static)
        modulo.util.loadString(`<Modulo -src="${ root + dir }">`); // Load default
    }
}
function hash (str) { //  Returns base32 hash
    let h = 0; // Simple, insecure, "hashCode()" implementation
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    } //h = ((h << 5 - h) + str.charCodeAt(i)) | 0;
    const hash8 = ('---------' + (h || 0).toString(32)).slice(-8);
    return hash8.replace(/-/g, 'x'); // Pad with 'x'
}
function bundleHead(modulo, elem, bundle = null, doc = null) {
    doc = doc || window.document;
    const { newNode, hash } = modulo.util;
    const url = elem.getAttribute('src') || elem.getAttribute('href');
    const id = 'include_' + hash(elem.name || url || elem.textContent);
    bundle = bundle || modulo.bundles[elem.tagName.toLowerCase()];
    if (doc.getElementById(id) || bundle.includes(id)) {
        return; // already included in this bundle!
    }
    bundle.push(id); // Keep ordering of insertion in this list
    const newElem = newNode(elem.innerHTML, elem.tagName);
    if (elem.tagName === 'SCRIPT' && url && !elem.hasAttribute('async')) {
        modulo.fetchQueue.queue[id] = [ ] // Add a "waitable" queue
        newElem.onload = () => modulo.fetchQueue.receiveData(null, id);
    }
    for (const attr of elem.attributes || []) { // Copy all attributes from old elem
        newElem.setAttributeNode(attr.cloneNode(true)); // ...to new elem
    }
    newElem.setAttribute('id', id);
    newElem.textContent = elem.textContent; // Evaluate code
    doc.head.append(newElem); // add to document
}
function getParentDefPath(modulo, def) {
    const pDef = def.Parent ? modulo.definitions[def.Parent] : null;
    const url = String(window.location).split('?')[0]; // Remove ? info
    return pDef ? pDef.Source || getParentDefPath(modulo, pDef) : url;
}
function makeStoreFS(modulo) { // TODO: Refactor with state
    const store = modulo.util.makeStore(modulo, { fdata: { }, log: [ ] });
    return Object.assign(store, { types: {} }, {
        propagate: modulo.part.State.prototype.propagate.bind(store),
        key: i => Object.keys(store.data.fdata)[i],
        getItem: key => key in store.data.fdata ? store.data.fdata[key] : null,
        removeItem: (key, val) => store.setItem(key, null),
        setItem: (key, val) => {
            store.data.fdata[key] = val;
            store.data.log.push([ key, (new Date()).getTime() / 1000]);
            store.propagate('fdata', store.data.fdata);
        },
    });
}
function setupDevLib(modulo, subFS = null) {
    // Setup config info, sets up the "FS" stores (or parent's stores + queue)
    const { config, util, stores, fetchQueue, assert } = modulo;
    config.pathName = window.location.pathname.split('/').pop();
    config.date = (new Date()) + ''; // String version of date
    for (const name of config.modulo.fs || [ 'BUILD', 'CACHE', 'PROC' ]) {
        try { stores[name] = window.parent._moduloFS[name];
        } catch (e) { } // silence XSS or undefined
        stores[name] = stores[name] || util.makeStoreFS(modulo); // default
    }
    const { timeout, devLoad } = config.modulo;
    for (const type of devLoad || [ 'artifact', 'component' ]) {
        const str = config._dev[type].replace(/\n[ \n\r]+/gm, '\n'); // norm ws
        util.loadString(str.replace(/\t/g, '    '), `_${ type }`); // indent
    }
    modulo._loadTimeout = timeout && setTimeout(() => assert(!fetchQueue.queue.length,
            timeout, '[TIMEOUT]', ...Object.keys(fetchQueue.queue)), timeout);
    modulo.DEV = true;
}
function getCommand(modulo) {
      const cmdName = modulo.argv.length > 0 ? modulo.argv[0] : '_default';
      return () => modulo.command[cmdName](modulo);
}
Object.assign(Utilities, { applyNextProcessor, configureStatic, hash,
    loadString, bundleHead, getParentDefPath, loadFromDOM, makeStoreFS,
    setupDevLib, getCommand, repeatProcessors }) /*#ENDUNLESS#*/

return Utilities;
}; /* End of UtilityFunctions */


Modulo.Processors = function DefProcessors (modulo) { /*#UNLESS#*/
// md: ### Content Processors
function src (modulo, def, value) { // md: `-src="path..."` - Loads content
    const { getParentDefPath } = modulo.util;
    try { def.Source = (new window.URL(value, getParentDefPath(modulo, def))).href;
    } catch { }
    modulo.fetchQueue.fetch(def.Source || value).then(text => {
        //def.Content = trimFileLoader(text || '') + (def.Content || '');
        def.Content = text || '' + (def.Content || '');
    });
}
function srcSync (modulo, def, value) { // md: `-src-sync="path..."` - Like
    modulo.processor.src(modulo, def, value); // md: src, except it waits.
    return modulo.consts.WAIT;
}
function filterContent (modulo, def, value) { //md: `-filter-content=` allows
    if (def.Content && value) { // md: for a mini-template of just filters
        const miniTemplate = `{{ def.Content|${ value }|safe }}`; //md: to
        const tmplt = new modulo.part.Template(miniTemplate); //md: apply
        def.Content = tmplt.render({ def, config: modulo.config }); //md:to
    } //md: the definition's content _before_ loading it.
}
function defer (modulo, def, value) {
    if (value !== 'none') {
        return value === 'all' ? modulo.consts.WAITALL : modulo.consts.WAIT;
    }
}
function defTarget (modulo, def, value) { // saves def
    const resolverName = def.DefResolver || 'ValueResolver';
    const resolver = new modulo.engine[resolverName](modulo);
    const target = value === null ? def : resolver.get(value); // Target object
    for (const [ key, defValue ] of Object.entries(def)) { // Resolve all values
        if (key.endsWith(':') || key.includes('.')) {
            delete def[key]; // Remove & replace unresolved value
            resolver.set(/^_?[a-z]/.test(key) ? target : def, key, defValue);
        }
    }
}
function command (modulo, def, value) {
    def.commands = (value || ' ').split(/,/.test(value) ? ',' : '\n');
    for (const cmd of def.commands) { // Register dev commands
        const commandName = cmd.trim() || 'build';
        modulo.command[commandName] = function build (modulo) {
            for (const [ key, obj ] of Object.entries(modulo.definitions)) {
                if (obj.commands && !obj.commands.includes(commandName)) {
                    delete obj.CommandBuilders; // stop cmd
                    delete obj.CommandFinalizers;
                }
            }
            modulo.COMMAND = commandName; // record globally
            modulo._drainQueue(); // wait for mounts
            const { BUILD } = modulo.stores; // pass BUILD
            const fs = [ BUILD.data.fdata, modulo.fetchQueue.data ];
            window._moduloFS = { fs, BUILD }; // pass "fs stack"
            modulo.preprocessAndDefine(modulo.cmdCallback, 'Command');
        }
    }
}
function content (modulo, conf, value) {
    modulo.util.loadString(value, conf.DefinitionName);
}
function mainRequire (modulo, conf, value) {
    modulo.config.modulo.build.mainModules.push(value);
    modulo.registry.modules[value].call(window, modulo);
}
function definedAs (modulo, def, value) {
    def.Name = value ? def[value] : (def.Name || def.Type.toLowerCase());
    const parentDef = modulo.definitions[def.Parent];
    const parentPrefix = parentDef && ('ChildPrefix' in parentDef) ?
        parentDef.ChildPrefix : (def.Parent ? def.Parent + '_' : '');
    def.DefinitionName = parentPrefix + def.Name;
    // Search for the next free Name by suffixing numbers
    while (def.DefinitionName in modulo.definitions) {
        const match = /([0-9]+)$/.exec(def.Name);
        const number = match ? match[0] : '';
        def.Name = def.Name.replace(number, '') + ((number * 1) + 1);
        def.DefinitionName = parentPrefix + def.Name;
    }
    modulo.definitions[def.DefinitionName] = def; // store definition
    const parentConf = modulo.definitions[def.Parent];
    if (parentConf) {
        parentConf.ChildrenNames = parentConf.ChildrenNames || [];
        parentConf.ChildrenNames.push(def.DefinitionName);
    }
}
function dataType (modulo, def, value) {
    if (value === '?') { // '?' means determine based on extension
        const ext = def.Src && def.Src.match(/\.([a-z]+)$/i);
        value = ext ? ext[1] : 'json'; // If extension, use; else use "json"
    }
    def.ContentType = [ value.toUpperCase(), def.Hint ];
}
function code (modulo, def, value) {
    const { newNode, bundleHead } = modulo.util;
    const name = def.DefinitionName; // Defines global module with name
    modulo.assert(!(name in modulo.registry.modules), 'Duplicate module name');
    const prefix = 'modulo.registry.modules.' + name + ' = function ' + name;
    const content = prefix + ' (modulo) { ' + value + '}';
    if (document && document.head && name[0] !== '_' && !def.Preprocess) {
        bundleHead(modulo, newNode(content, 'SCRIPT'), modulo.bundles.modscript);
    } else { // Else: Do not bundle, run in Function
        Function('window', 'modulo', content)(window, modulo);
    }
}
function contentType (modulo, def, value) {
    def.data = modulo.contentType[value[0]](def.Content, value[1]);
    delete def.Content;
}
return modulo.util.insObject({ src, srcSync, defTarget, command, content,
    mainRequire, definedAs, dataType, filterContent, code, contentType, defer })
/*#ENDUNLESS#*/
} /* End of Modulo.DefProcessors */


Modulo.Engines = function Engines (modulo) {

class DOMLoader {/*#UNLESS#*/
    getAllowedChildTags(parentName) {
        let tagsLower = modulo.config.domloader.topLevelTags; // "Modulo"
        if (/^_[a-z][a-zA-Z]+$/.test(parentName)) { // _likethis, e.g. _artifact
            tagsLower = [ parentName.toLowerCase().replace('_', '') ]; // Dead code?
        } else if (parentName) { // Normal parent, e.g. Library, Component etc
            const parentDef = modulo.definitions[parentName];
            const msg = `Invalid parent: ${ parentName } (${ parentDef })`;
            modulo.assert(parentDef && parentDef.Contains, msg);
            const names = Object.keys(modulo[parentDef.Contains]);
            tagsLower = names.map(s => s.toLowerCase()); // Ignore case
        }
        return tagsLower;
    }
    loadFromDOM(elem, Parent = null, quietErrors = false) {
        const { defaultDef } = modulo.config.modulo;
        const toCamel = s => s.replace(/-([a-z])/g, g => g[1].toUpperCase());
        const tagsLower = this.getAllowedChildTags(Parent);
        const array = [];
        for (const node of elem.children || []) {
            const Type = this.getDefType(node, tagsLower, quietErrors);
            if (node._moduloLoadedBy || Type === null) {
                continue; // Already loaded, or an ignorable or silenced error
            } // Valid definition, now create the "def" object
            node._moduloLoadedBy = modulo.id; // Mark as having loaded this
            const Content = node.tagName === 'SCRIPT' ? node.textContent : node.innerHTML;
            const def = Object.assign({ Type, Parent, Content }, defaultDef);
            array.push(Object.assign(def, modulo.config[Type]));
            for (let name of node.getAttributeNames()) { // Loop through attrs
                const value = node.getAttribute(name);
                if (Type === name && !value) { // e.g. <def Script>
                    continue; // This is the "Type" attribute itself, skip
                }
                def[toCamel(name)] = value; // "-kebab-case" to "CamelCase"
            }
        }
        modulo.util.repeatProcessors(array, 'DefLoaders');
        return array;
    }
    getDefType(node, tagsLower, quiet = false) {
        const { tagName, nodeType, textContent } = node;
        if (nodeType !== 1) { // Text nodes, comment nodes, etc
            if (nodeType === 3 && textContent && textContent.trim() && !quiet) {
                console.error(`Unexpected text in definition: ${textContent}`);
            }
            return null;
        }
        let defType = tagName.toLowerCase();
        if (defType in modulo.config.domloader.genericDefTags) {
            for (const attrUnknownCase of node.getAttributeNames()) {
                const attr = attrUnknownCase.toLowerCase();
                if (!node.getAttribute(attr) && tagsLower.includes(attr)) {
                    defType = attr; // Has an empty string value, is a def
                }
                break; // Always break: We will only look at first attribute
            }
        }
        if (!(tagsLower.includes(defType))) { // Were any discovered?
            if (!quiet) { // Invalid def / cPart: This type is not allowed here
                console.error(`"${ defType }" is not one of: ${ tagsLower }`);
            }
            return null // Return null to signify not a definition
        }
        return defType; // Valid, expected definition: Return lowercase type
    }/*#ENDUNLESS#*/
}

class ValueResolver {
    constructor(contextObj = null, sep = null) {
        this.ctxObj = contextObj;
        this.sep = sep || '.';
        this.isJSON = /^(true$|false$|null$|[^a-zA-Z])/; // "If not variable"
    }
    get(key, ctxObj = null) {
        const { get } = window.modulo.util; // For drilling down "."
        const obj = ctxObj || this.ctxObj; // Use given one or in general
        return this.isJSON.test(key) ? JSON.parse(key) : get(obj, key, this.sep);
    }
    set(obj, keyPath, val, autoBind = false) {
        const index = keyPath.lastIndexOf(this.sep) + 1; // Index at 1 (0 if missing)
        const key = keyPath.slice(index).replace(/:$/, ''); // Between "." & ":"
        const prefix = keyPath.slice(0, index - 1); // Get before first "."
        const target = index ? this.get(prefix, obj) : obj; // Drill down prefix
        if (keyPath.endsWith(':')) { // If it's a dataProp style attribute
            const parentKey = val.substr(0, val.lastIndexOf(this.sep));
            val = this.get(val); // Resolve "val" from context, or JSON literal
            /*if (autoBind && !this.isJSON.test(val) && parentKey.includes(this.sep)) {
                val = val.bind(this.get(parentKey));
            }*/
        }
        target[key] = val; // Assign the value to it's parent object
    }
}

class FetchQueue {
    constructor() {
        this.queue = {}
        this.data = {}
        this.frames = {}
        this.protos = { 'file:': 1, 'about:': 1 }
        if (location.protocol in this.protos) { // check for "fs stack"
            try { this.fs = (window._moduloFS || parent._moduloFS).fs } catch { }
            const load = ({ data }) => this.receiveData(...JSON.parse(data)._FL);
            window.addEventListener('message', load, false);
        }
    }
    fetch(src) {  // "thennable" that resembling window.fetch
        src = src === '?' ? modulo.config.pathName : src; // resolve '?'
        src = src.endsWith('/') ? `${ src }index.html` : src; // auto index.html
        return { then: callback => this.request(src, callback, console.error) };
    }
    request(src, resolve, reject) { // Do fetch & do enqueue
        if (src in this.data) { // Cache
            resolve(this.data[src], src); // (sync route)
        } else if (this.fs && src in Object.assign({ }, ...this.fs)) {
            resolve(Object.assign({ }, ...this.fs)[src], src); // child route
        } else if (!(src in this.queue)) { // No cache, no queue
            this.queue[src] = [ resolve ]; // First time, create the queue Array
            if (location.protocol in this.protos) { // Use "IFRAME" transit
                this.frames[src] = window.document.createElement('IFRAME');
                this.frames[src].style = 'display: none';
                this.frames[src].src = `${ src }?argv=_load&argv=${ src }`;
                document.head.append(this.frames[src])
            } else {
                window.fetch(src, { cache: 'no-store' })
                    .then(response => response.text())
                    .then(text => this.receiveData(text, src))
                    .catch(reject);
            }
        } else { // Already requested, only enqueue function
            this.queue[src].push(resolve);
        }
    }
    receiveData(text, src) {
        if (src in this.frames) {
            this.frames[src].remove();
            delete this.frames[src];
        }
        this.data[src] = text;
        const resolveCallbacks = this.queue[src]; // "Consume" entire queue
        delete this.queue[src];
        for (const dataCallback of resolveCallbacks) {
            dataCallback(text, src);
        }
    }
    enqueue(callback, waitForAll = false) { // Wait for _current_ queue (or all)
        const allQueues = Array.from(Object.values(this.queue)); // Copy array
        const { length } = allQueues;
        if (length === 0) {
            return callback(); // Synchronous route
        } else if (waitForAll) { // Doing a wait -- setup re-enqueue loop
            return this.enqueue(() => Object.keys(this.queue).length === 0 ?
                                      callback() : this.enqueue(callback, true));
        }
        let count = 0; // Using count we only do callback() when ALL returned
        const check = () => ((++count >= length) ? callback() : 0);
        allQueues.forEach(queue => queue.push(check)); // Add to every queue
    }
}

class DOMCursor {
    constructor(parentNode, parentRival, slots) {
        this.slots = slots || {}; // Slottables keyed by name (default is '')
        this.instanceStack = []; // Used for implementing DFS non-recursively
        this._rivalQuerySelector = parentRival.querySelector.bind(parentRival);
        this._querySelector = parentNode.querySelector.bind(parentNode);
        this.initialize(parentNode, parentRival);
    }
    initialize(parentNode, parentRival) {
        this.parentNode = parentNode;
        this.nextChild = parentNode.firstChild;
        this.nextRival = parentRival.firstChild;
        this.activeExcess = null;
        this.activeSlot = null;
        if (parentRival.tagName === 'SLOT') { // Parent will "consume" a slot
            const slotName = parentRival.getAttribute('name') || '';
            this.activeSlot = this.slots[slotName] || null; // Mark active
            if (this.activeSlot) { // Children were specified for this slot!
                delete this.slots[slotName]; // (prevent "dupe slot" bug)
                this._setNextRival(null); // Move the cursor to the first elem
            }
        }
    }
    saveToStack() { // Creates an object copied with all cursor state
        this.instanceStack.push(Object.assign({ }, this)); // Copy to empty obj
    }
    loadFromStack() { // Remaining stack to "walk back" (non-recursive DFS)
        const stack = this.instanceStack;
        return stack.length > 0 && Object.assign(this, stack.pop());
    }
    loadFromSlots() { // There are "excess" slots (copied, but deeply nested)
        const name = Object.keys(this.slots).pop(); // Get next ("pop" from obj)
        if (name === '' || name) { // Is name valid? (String of 0 or more)
            const sel = name ? `slot[name="${ name }"]` : 'slot:not([name])';
            const rivalSlot = this._rivalQuerySelector(sel);
            if (!rivalSlot) { // No slot (e.g., conditionally rendered, or typo)
                delete this.slots[name]; // (Ensure "consumed", if not init'ed)
                return this.loadFromSlots(); // If no elem, try popping again
            }
            this.initialize(this._querySelector(sel) || rivalSlot, rivalSlot);
            return true; // Indicate success: Child and rival slots are ready
        }
    }
    hasNext() {
        if (this.nextChild || this.nextRival) {
            return true; // Is pointing at another node
        } else if (this.loadFromStack() || this.loadFromSlots()) { // Walk back
            return this.hasNext(); // Possibly loaded nodes nextChild, nextRival
        }
        return false; // Every load attempt is "false" (empty), end iteration
    }
    _setNextRival(rival) { // Traverse this.nextRival based on DOM or SLOT
        if (this.activeSlot !== null) { // Use activeSlot array for next instead
            if (this.activeSlot.length > 0) {
                this.nextRival = this.activeSlot.shift(); // Pop off next one
                this.nextRival._moduloIgnoreOnce = true; // Ensure no descend
            } else {
                this.nextRival = null;
            }
        } else {
            this.nextRival = rival ? rival.nextSibling : null; // Normal DOM traversal
        }
    }
    next() {
        let child = this.nextChild;
        let rival = this.nextRival;
        if (!rival && this.activeExcess && this.activeExcess.length > 0) {
            return this.activeExcess.shift(); // Return the first pair
        }
        this.nextChild = child ? child.nextSibling : null;
        this._setNextRival(rival); // Traverse initially
        return [ child, rival ];
    }
}

class DOMReconciler {
    constructor() {
        this.directives = {};
        this.patches = [];
        this.patch = this.pushPatch;
    }
    applyPatches(patches) {
        for (const patch of patches) {
            this.applyPatch(patch[0], patch[1], patch[2], patch[3]);
        }
    }
    registerDirectives(thisObj, def) {
        const prefix = 'DirectivePrefix' in def ? def.DirectivePrefix
                                 : (def.RenderObj || def.Name) + '.';
        for (const method of def.Directives || []) {
            this.directives[prefix + method] = thisObj;
        }
    }
    reconcileChildren(childParent, rivalParent, slots) {
        const cursor = new modulo.engine.DOMCursor(childParent, rivalParent, slots);
        while (cursor.hasNext()) { // "rival" is node we wish "child" to match
            const [ child, rival ] = cursor.next();
            const needReplace = child && rival && ( // If both exist...
                child.nodeType !== rival.nodeType || // And type is inequal
                child.nodeName !== rival.nodeName); // OR the tagName differs
            if ((child && !rival) || needReplace) { // we have more rival, delete child
                this.patchAndDescendants(child, 'Unmount');
                this.patch(cursor.parentNode, 'removeChild', child);
            }
            if (needReplace) { // do swap with insertBefore
                this.patch(cursor.parentNode, 'insertBefore', rival, child.nextSibling);
                this.patchAndDescendants(rival, 'Mount');
            }
            if (!child && rival) { // we have less than rival, take rival
                this.patch(cursor.parentNode, 'appendChild', rival);
                this.patchAndDescendants(rival, 'Mount');
            }
            if (child && rival && !needReplace) { // Both exist and same type
                if (child.nodeType !== 1) { // text or comment node
                    if (child.nodeValue !== rival.nodeValue) { // update
                        this.patch(child, 'node-value', rival.nodeValue);
                    }
                } else if (!child.isEqualNode(rival)) { // sync if not equal
                    this.reconcileAttributes(child, rival);
                    if (rival.hasAttribute('modulo-ignore')) { // Don't descend
                        // console.log('Skipping ignored node');
                    } else if (child.isModulo) { // is a Modulo component
                        this.patch(child, 'rerender', rival); // TODO rm!
                    } else { //} else if (!this.shouldNotDescend) {
                        cursor.saveToStack();
                        cursor.initialize(child, rival);
                    }
                }
            }
        }
    }
    pushPatch(node, method, arg, arg2 = null) {
        this.patches.push([ node, method, arg, arg2 ]);
    }
    applyPatch(node, method, arg, arg2) { // take that, rule of 3!
        if (method === 'node-value') {
            node.nodeValue = arg;
        } else if (method === 'insertBefore') {
            node.insertBefore(arg, arg2); // Needs 2 arguments
        } else {
            node[method].call(node, arg); // invoke method
        }
    }
    patchDirective(el, rawName, suffix, copyFromEl = null) {
        const split = rawName.split(/\./g);
        if (split.length < 2) { //if (!(rawName in this.directiveLiterals)) {
            return; // Fast route: not a directive
        }
        const value = (copyFromEl || el).getAttribute(rawName); // Get value
        let dName = split.shift() // Start with left of '.'
        while (split.length > 0 && !((dName + suffix) in this.directives)) {
            dName += '.' + split.shift() // Build potential directive prefix
        }
        const nameSuffix = split.join('.'); // e.g. "on.click" -> "click"
        const fullName = dName + suffix; // e.g. "state.bind" -> "state.bindMount"
        const patchName = (fullName.split('.')[1] || fullName);
        const directive = { el, value, nameSuffix, rawName }; // Obj to pass
        this.patch(this.directives[fullName], patchName, directive);
    }
    reconcileAttributes(node, rival) {
        const myAttrs = new Set(node ? node.getAttributeNames() : []);
        const rivalAttributes = new Set(rival.getAttributeNames());
        // Check for new and changed attributes
        for (const rawName of rivalAttributes) {
            const attr = rival.getAttributeNode(rawName);
            if (myAttrs.has(rawName) && node.getAttribute(rawName) === attr.value) {
                continue; // Already matches, on to next
            }
            if (myAttrs.has(rawName)) { // If exists, trigger Unmount first
                this.patchDirective(node, rawName, 'Unmount');
            }
            // Set attribute node, and then Mount based on rival value
            this.patch(node, 'setAttributeNode', attr.cloneNode(true));
            this.patchDirective(node, rawName, 'Mount', rival);
        }
        // Check for old attributes that were removed (ignoring modulo- prefixed ones)
        for (const rawName of myAttrs) {
            if (!rivalAttributes.has(rawName) && !rawName.startsWith('modulo-')) {
                this.patchDirective(node, rawName, 'Unmount');
                this.patch(node, 'removeAttribute', rawName);
            }
        }
    }
    patchAndDescendants(parentNode, actionSuffix) {
        if (parentNode.nodeType !== 1) {
            return; // (not element)
        }
        if (parentNode._moduloIgnoreOnce) { // used by slot DOMCursor
            delete parentNode._moduloIgnoreOnce;
            return;
        }
        const searchNodes = Array.from(parentNode.querySelectorAll('*'));
        for (const node of [ parentNode ].concat(searchNodes)) {
            for (const rawName of node.getAttributeNames()) {
                this.patchDirective(node, rawName, actionSuffix);
            }
        }
    }
}

return { FetchQueue, DOMLoader, ValueResolver, DOMReconciler, DOMCursor }
} /* End of Modulo.Engines */


Modulo.FetchQueues = function FetchQueues (modulo) {
    Object.assign(modulo, {
        _connectedQueue: [],
        _drainQueue: () => {
            while (modulo._connectedQueue.length > 0) {
                modulo._connectedQueue.shift().moduloMount();
            }
        },
        cmdCallback: (cmdStatus = 0, edit = null, html = null) => {
            modulo.cmdStatus = cmdStatus;
            if (edit || edit === null) { // null = most recent, false = no replace
                const { log } = modulo.stores.BUILD.data; // Edit last logged
                edit = edit || log.length ? log[log.length - 1][0] : '';
                const att = ` full=full view="${ edit }" edit="${ edit }"`;
                window.document.body.innerHTML = html || `<modulo-Editor${ att }>`;
            }
        },
        preprocessAndDefine(cb, prefix = 'Def') {
            cb = cb || (() => {});
            modulo.fetchQueue.enqueue(() => {
                modulo.util.repeatProcessors(null, prefix + 'Builders', () => {
                    modulo.util.repeatProcessors(null, prefix + 'Finalizers', cb)
                });
            }, true); // The "true" causes it to wait for all
        },
        assert: (value, ...info) => {
            if (!value) {  // md:---
                console.error('%cᵐ°dᵘ⁄o', 'background:red', modulo.id, ...info);
                throw new Error(`Assert : "${ Array.from(info).join(' ') }"`);
            }
        },
        bundles: { script: [], style: [], link: [], meta: [],
                    modscript: [], modstyle: [] },
        registry: { bundle: { }, elements: { }, modules: { } },
        consts: { WAIT: 900, WAITALL: 901 },
    });
    modulo.argv = new window.URLSearchParams(window.location.search).getAll('argv');
    Object.assign(modulo.registry, { utils: modulo.util, cparts: modulo.part,
        coreDefs: modulo.core, processors: modulo.processor }) // TODO Legacy alias
    return new modulo.engine.FetchQueue();
}

Modulo.Cores = function CoreDefinitions (modulo) { //md: ### Core Definitions
const core = { };

core.Component = class Component { //md: **Component** - Register a component _(Most used)_
    static CustomElement (modulo, def, value) {
        if (!def.ChildrenNames || def.ChildrenNames.length === 0) {
            console.warn('MODULO: Empty ChildrenNames:', def.DefinitionName);
            return;
        } else if (def.namespace === null || def.alias) { // Auto-gen
            def.namespace = def.namespace || def.DefinitionName;
        } else if (!def.namespace) { // Otherwise default to the Modulo def conf
            def.namespace = modulo.config.namespace || 'x'; // or simply 'x-'
        }
        def.name = def.name || def.DefName || def.Name;
        def.TagName = `${ def.namespace }-${ def.name }`.toLowerCase();
        def.MainRequire = def.DefinitionName;
        def.className =  def.className || `${ def.namespace }_${ def.name }`;
        def.Code = `const def = modulo.definitions['${ def.DefinitionName }'];
            class ${ def.className } extends window.HTMLElement {
                constructor(){ super(); this.init(); }
                static observedAttributes = [];
            }
            modulo.util.initComponentClass(modulo, def, ${ def.className });
            window.customElements.define(def.TagName, ${ def.className });
            return ${ def.className };`.replace(/\n\s+/g, '\n');
    }
    static BuildLifecycle (modulo, def, value) {
        for (const elem of document.querySelectorAll(def.TagName)) {
            elem.cparts.component._lifecycle([ value ]); // Run the lifecycle
        }
        return true;
    }
    static AliasNamespace (modulo, def, value) {
        const fullAlias = `${ value }-${ def.name }`; // Combine new NS and name
        modulo.config.component.tagAliases[fullAlias] = def.TagName;
    }
    rerender(original = null) {
        if (original) {
            if (this.element.originalHTML === null) {
                this.element.originalHTML = original.innerHTML;
            }
            this.element.originalChildren = Array.from(
                original.hasChildNodes() ? original.childNodes : []);
        }
        this._lifecycle([ 'prepare', 'render', 'dom', 'reconcile', 'update' ]);
    }
    getCurrentRenderObj() {
        return (this.element.eventRenderObj || this.element.renderObj ||
                this.element.initRenderObj);
    }
    _lifecycle(lifecycleNames, rObj={ }) {
        const renderObj = Object.assign({}, rObj, this.getCurrentRenderObj());
        this.element.renderObj = renderObj;
        this.runLifecycle(this.element.cparts, renderObj, lifecycleNames);
        //this.element.renderObj = null; // ?rendering is over, set to null
    }
    runLifecycle(parts, renderObj, lifecycleNames) {
        for (const lifecycleName of lifecycleNames) {
            const methodName = lifecycleName + 'Callback';
            for (const [ name, obj ] of Object.entries(parts)) {
                if (!(methodName in obj)) {
                    continue;
                }
                const result = obj[methodName].call(obj, renderObj);
                if (result !== undefined) {
                    renderObj[obj.conf.RenderObj || obj.conf.Name] = result;
                }
            }
        }
    }
    buildCallback() {
        this.element.setAttribute('modulo-mount-html', this.element.originalHTML)
        for (const elem of this.element.querySelectorAll('*')) {
            for (const name of elem.getAttributeNames()) {
                if (!(new RegExp('^[a-z0-9-]+$', 'i').exec(name))) {
                    elem.removeAttribute(name); // Not alnum or dash
                }
            }
        }
    }
    initializedCallback() {
        this.modulo.paused = true;
        const { newNode } = this.modulo.util;
        const html = this.element.getAttribute('modulo-mount-html'); // Hydrate?
        this._mountRival = html === null ? this.element : newNode(html);
        this.element.originalHTML = html === null ? this.element.innerHTML : html;
        this.resolver = new this.modulo.engine.ValueResolver(this.modulo);
        this.reconciler = new this.modulo.engine.DOMReconciler(this.modulo);
        for (const part of Object.values(this.element.cparts)) { // Setup parts
            this.reconciler.registerDirectives(part, part.conf);
        }
    }
    mountCallback() { // First "mount", trigger render & hydration
        this.rerender(this._mountRival); // render + mount childNodes
        delete this._mountRival; // Clear the temporary reference
        this.element.isMounted = true; // Mark as mounted
    }
    prepareCallback() {
        return { // Create the initial Component renderObj obj
            originalHTML: this.element.originalHTML, // HTML received at mount
            id: this.id, // Universally unique ID number
            innerHTML: null, // String to copy (default: null is "no-op")
            innerDOM: null, // Node to copy (default: null sets innerHTML)
            patches: null, // Patch array (default: reconcile vs innerDOM)
            slots: { }, // Populate with slots to be filled when reconciling
        };
    }
    domCallback({ component }) {
        let { slots, root, innerHTML, innerDOM } = component;
        if (this.attrs.mode === 'regular' || this.attrs.mode === 'vanish') {
            root = this.element; // default, use element as root
        } else if (this.attrs.mode === 'shadow') {
            if (!this.element.shadowRoot) {
                this.element.attachShadow({ mode: 'open' });
            }
            root = this.element.shadowRoot; // render into attached shadow
        } else if (!root) {
            this.modulo.assert(this.attrs.mode === 'custom-root', 'Bad mode')
        }
        if (innerHTML !== null && !innerDOM) { // Use component.innerHTML as DOM
            innerDOM = this.modulo.util.newNode(innerHTML);
        }
        if (innerDOM && this.attrs.mode !== 'shadow') {
            for (const elem of this.element.originalChildren) {
                const name = (elem.getAttribute && elem.getAttribute('slot')) || '';
                elem.remove(); // Remove from DOM so it can't self-match
                if (!(name in slots)) {
                    slots[name] = [ elem ]; // Sorting into new slot arrays
                } else {
                    slots[name].push(elem); // Or pushing into existing
                }
            }
        }
        return { root, innerHTML, innerDOM, slots };
    }
    reconcileCallback({ component }) {
        let { innerHTML, innerDOM, patches, root, slots } = component;
        if (innerDOM) {
            this.reconciler.patches = []; // Reset reconciler patches
            this.reconciler.reconcileChildren(root, innerDOM, slots);
            patches = this.reconciler.patches;
        }
        return { patches, innerHTML }; // TODO remove innerHTML from here
    }
    updateCallback({ component }) {
        this.modulo.paused = false; // Re-enable children mounting
        if (component.patches) {
            this.reconciler.applyPatches(component.patches);
        }
        if (this.attrs.mode === 'vanish') {
            this.element.replaceWith(...this.element.childNodes);
        }
    }
    handleEvent(func, payload, ev) {
        this._lifecycle([ 'event' ]);
        func(typeof payload === "undefined" ? ev : payload);
        this._lifecycle([ 'eventCleanup' ]);
        if (this.attrs.rerender !== 'manual') {
            ev.preventDefault(); // Prevent navigation from stopping rerender etc
            this.element.rerender(); // Rerender after event
        }
    }
    onMount({ el, value, nameSuffix, rawName, listen }) { // on.click=script.show
        this.modulo.assert(this.resolve(value), `Not found: ${ rawName }=${ value }`);
        const getOr = (key, key2) => key2 && el.hasAttribute(key2) ?
                             getOr(key2) : this.resolve(el.getAttribute(key));
        listen = listen ? listen : (ev) => { // Define a event func to run handleEvent
            const payload = getOr(nameSuffix + '.payload:', 'payload:')
                                     || el.getAttribute('payload');
            this.handleEvent(this.resolve(value, null, true), payload, ev);
        }
        el.moduloEvents = el.moduloEvents || {}; // Attach if not already
        el.moduloEvents[nameSuffix] = listen;
        el.addEventListener(nameSuffix, listen);
    }
    onUnmount({ el, nameSuffix }) {
        el.removeEventListener(nameSuffix, el.moduloEvents[nameSuffix]);
        delete el.moduloEvents[nameSuffix];
    }
    resolve(key, defaultVal, autoBind = false) {
        const { ValueResolver } = this.modulo.engine;
        const resolver = new ValueResolver(this.getCurrentRenderObj());
        let val = resolver.get(key, defaultVal);
        if (autoBind && typeof val === 'function' && key.includes(resolver.sep)) {
            const parentKey = key.substr(0, key.lastIndexOf(resolver.sep));
            val = val.bind(this.resolve(parentKey)); // Parent is sub-obj, bind
        }
        return val
    }
}

/*#UNLESS#*/
class Artifact { // md: **Artifact** - Registers build and scaffolding commands
    static Remove (modulo, def, value) { // Delete given excess elements
        for (const elem of window.document.querySelectorAll(value)) {
            elem.remove();
        }
    }
    static Collect (modulo, def, value) { // Gathers any extra elements
        value = value === '?' ? modulo.config.modulo.scriptSelector : value;
        def.LoadElems = def.LoadElems || []; // initialize for next processor
        for (const elem of window.document.querySelectorAll(value)) {
            elem.id = 'collected_' + (def.LoadElems.length + 1000).toString();
            def.LoadElems.push(elem);
        }
    }
    static Bundle (modulo, def, value) { // Runs first to queue up ctx
        def.LoadElems = def.LoadElems || []; // initialize for next processor
        for (const bundleName of value.split(',')) {
            for (const id of modulo.bundles[bundleName]) {
                def.LoadElems.push(window.document.getElementById(id));
            }
        }
    }
    static LoadElems (modulo, def, value) { // Actually enqueues content
        def.data = def.data || []; // initialize for template
        def.ids = def.ids || []; // initialize for template
        if ('SaveReqs' in def) {
            value.push(modulo.util.newNode('', 'SCRIPT', { src: '?' }));
        }
        for (const elem of value) {
            let url = elem.getAttribute('src') || elem.getAttribute('href') || null;
            if (url) { // Retrieve from URL
                modulo.fetchQueue.fetch(url).then(text => {
                    def.data[elem.id] = text; // Attach back to element
                    if ('SaveReqs' in def) {
                        url = url.replace(/^\?$/, modulo.config.pathName).split('/').pop();
                        modulo.stores[def.SaveReqs || 'BUILD'].setItem(url, text);
                    }
                });
            } else { // Retrieve text content
                def.data[elem.id] = elem.textContent;
            }
            def.ids.push(elem.id); // List in order
            elem.remove(); // Remove from DOM so it doesn't get doubled
        }
    }
    static SaveTo (modulo, def, value, doc = null) { // Build processor
        const [ cmd, tag ] = modulo.argv
        const ctx = Object.assign({ def, cmd, tag, doc: doc || window.document }, modulo);
        const render = s => new modulo.part.Template(s).render(ctx);
        const text = (def.prefix || '') + render(def.Content); // Execute template
        if (text) { // Never save an empty string (e.g. ' ' or '\n' is ok)
            ctx.hash = modulo.util.hash(text); // Compute hash for path
            def.path = def.path || render(def.pathTemplate); // Render path template
            modulo.stores[value].setItem(def.path, text); // Save to given FS
        }
    }
}


class Configuration { } //md:**Configuration** - Set global `modulo.config`

class ContentList { // md: **ContentList** - CMS system for pages and content.
    static Load (modulo, def, value) { // md: Specify `-load=md` to gather
        value = value.toUpperCase() || 'TXT'; // md: file list as markdown.
        const cache = { }
        for (const row of def.data) {
            modulo.fetchQueue.fetch(row[0]).then(data => {
                const body = modulo.contentType[value](data, def.LoadHint);
                cache[row[0]] = typeof body !== 'object' ? { body } : body;
                cache[row[0]].Source = row[0];
                if (Object.keys(cache).length === def.data.length) {
                    def.files = def.data.map(row => cache[row[0]]);
                }
            })
        }
        return modulo.consts.WAIT;
    }
    static BuildAll (modulo, def, value) { // md: Use `command=buildall` to
        for (const row of def.data) { // md: loop through and build each file.
            modulo.stores.PROC.setItem(row[0] + `?argv=${ value }`, '');
        }
    }
}

const Include = modulo.part.Include;//md: **Include** - Add global CSS or JS

class Library { } //md:**Library** - Like `<Modulo>`, but prefices definitions

class Modulo { } //md:**Modulo** - The outermost definition to "launch" Modulo

Object.assign(core, { Artifact, Configuration, ContentList, File, Include, Library, Modulo });

/*#ENDUNLESS#*/ return modulo.util.insObject(core);
} /* End of CoreDefinitions */

var modulo = new Modulo(); // Global Instance

/*#UNLESS#*/
if (typeof window === "undefined") { var window = { } } // non-browsers
Object.assign(window, { modulo, Modulo }) // Export

window.modulo.command._load = () => {
    console.error('%cᵐ°dᵘ⁄o FAIL; NO TYPE', 'background:orange', modulo.argv[1])
    parent.postMessage(JSON.stringify({ _FL: [ null, modulo.argv[1] ] }), '*');
}
window.modulo.command._default = function _default (modulo) { // [modu/o] menu
    const font = 'font-size: 28px; padding:0 8px 0 8px; border:2px solid #000;';
    const names = Object.keys(modulo.command).filter(s => !s.startsWith('_'));
    const gets = names.map(s => `get ${ s }(){location.href+="?argv=${ s }"}`);
    const aStr = JSON.stringify([ '%cᵐ°dᵘ⁄o', font, names.join(', ') ]);
    const suffix = window.parent !== window ? '"[CHILD THREAD] [NO OP]"'
        : `"[MAIN THREAD]",new (class {${ gets.join('\n') }})`;
    Function(`console.log(...${ aStr },${ suffix })`)();
    modulo.cmdCallback(0, false); // default behavior, do not show Editor
}
if (typeof window.document !== 'undefined' && !window.PAUSE_MODULO) { // Browser
    modulo.util.loadFromDOM(window.document.head, null, true); // Blocking head
    modulo.util.setupDevLib(modulo); // Loads default devlib
    window.document.addEventListener('DOMContentLoaded', () => {
        modulo.util.loadFromDOM(window.document.head, null, true); // Defer head
        modulo.util.loadFromDOM(window.document.body, null, true); // Defer body
        modulo.util.configureStatic(modulo); // Run any default loads
        modulo.preprocessAndDefine(modulo.util.getCommand(modulo));
    });
} else if (typeof module !== 'undefined') { // Node.js
    module.exports = { Modulo, window };
} /*#ENDUNLESS#*/

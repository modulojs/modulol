/*<script src=?></script><script File -syntax=mdocs type=md>---
version: v0.1.0pre
copyright: 2025 MichaelB - LGPLv3
    Modulo LGPLv3.0 NOTICE: Any modifications to or derivatives of the
    Modulo.js framework must be LGPL3.0-compatible. It is acceptable to
    distribute dissimilarly licensed code linked to the Modulo framework bundled
    in the same file for efficiency instead of "linking", as long as this notice
    and license remains intact with Modulo.js framework source code itself or
    direct derivitives, and/or scaffolded projects or training-derived code.
---
//md: v0.1.0pre */
if (typeof window === "undefined") { // md: # `%` Modulo
    var window = {}; // md: #### `%` **[New Markdown File »](?argv=edit&argv=new)**
}// md:  #### `%` **[Browse Modulo's Source Code »](?argv=edit)**
// md: ---
window.Modulo = function Modulo () { // md: ## Help
    //md: Read the full docs online: [**ModuloJS.org**](https://modulojs.org)
    window.Modulo.instanceID = window.Modulo.instanceID || 0;
    this.id = ++window.Modulo.instanceID; // Every instance's unique ID
    Object.assign(this, {
        _connectedQueue: [],
        _drainQueue: () => {
            while (this._connectedQueue.length > 0) {
                this._connectedQueue.shift().moduloMount();
            }
        },
        cmdCallback: (cmdStatus = 0, edit = null, html = null) => {
            this.cmdStatus = cmdStatus;
            html = html || `<devlib-Dashboard edit="${ edit || '' }">`;
            if (edit || edit === null) { // null = empty, false = no replace
                window.document.body.innerHTML = html;
            }
        },
        assert: (value, ...info) => { // Simple "assert" helper
            if (!value) {
                console.error(this.id, ...info);
                throw new Error(`Modulo Framework Assert Error: "${ Array.from(info).join(' ') }"`);
            }
        },
        build: { },
        bundles: { script: [], style: [], link: [], meta: [],
                    modscript: [], modstyle: [] },
        registry: { cparts: { }, coreDefs: { }, utils: { }, core: { },
                    engines: { }, commands: { }, bundle: { },
                    processors: { }, elements: { }, modules: { } },
        config: Modulo.CONFIG, // By default, config is a global singleton
        definitions: { }, // For specific definitions (e.g. one Component)
        stores: { }, // Global data store (by default, only used by State)
    });
};

Modulo.CONFIG = {
    artifact: {
        tagAliases: { 'js': 'script', 'ht': 'html', 'he': 'head', 'bo': 'body' },
        pathTemplate: 'modulo-build-{{ hash }}.{{ def.name }}',
        BuildCommandBuilders: [ 'FilterContent', 'Collect', 'Bundle', 'LoadElems' ],
        BuildCommandFinalizers: [ 'Remove', 'SaveTo' ],
        DefinedAs: 'name',
        SaveTo: 'BUILD', // Use "BUILD" filesystem-like store interface
        FilterContent: 'trim|tagswap:config.artifact.tagAliases',
    },
    component: {
        tagAliases: { 'html-table': 'table', 'html-script': 'script', 'js': 'script' },
        mode: 'regular',
        rerender: 'event',
        Contains: 'cparts', // Rarely changed, but instructs the type it parents
        CustomElement: 'window.HTMLElement', // Used to change base class
        DefinedAs: 'name',
        BuildLifecycle: 'build',
        RenderObj: 'component',
        // Children: 'cparts', // How we can implement Parentage: Object.keys((get('modulo.registry.' + value))// cparts))
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'Src', 'Content' ],
        DefBuilders: [ 'CustomElement', 'alias|AliasNamespace', 'CodeTemplate' ],
        DefFinalizers: [ 'MainRequire' ],
        BuildCommandBuilders: [ 'Prebuild|BuildLifecycle', 'BuildLifecycle' ],
        Directives: [ 'onMount', 'onUnmount' ],
        DirectivePrefix: '', // Makes "component.on.click" into "on.click"
        CodeTemplate: `{% if def.help %}//md\: {{ def.help }}{% endif %}
            const def = modulo.definitions['{{ def.DefinitionName }}'];
            class {{ def.className }} extends {{ def.baseClass|default:'window.HTMLElement' }} {
                constructor() { super(); this.init(); }
                static observedAttributes = [ ]; }
            modulo.registry.utils.initComponentClass(modulo, def, {{ def.className }});
            window.customElements.define(def.TagName, {{ def.className }});
            return {{ def.className }};
        `.replace(/^\s+/gm, ''),
    },
    configuration: { // Base configuration of <Configuration> itself
        DefTarget: 'config', // Why it targets .config by default
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'Src|SrcSync', 'Content|Code', 'DefinitionName|MainRequire' ],
    },
    contentlist: {
        DataType: 'CSV', // Default behavior is always use "CSV" format (no auto detect)
        RequireData: 'DefinitionName',
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'DataType', 'Src', 'commands|Register' ],
        DefBuilders: [ 'ContentCSV', 'ContentJSON', 'ContentJS', 'Code', 'RequireData', 'Load' ],
    },
    domloader: {
        topLevelTags: [ 'modulo', 'file' ],
        genericDefTags: { def: 1, script: 1, template: 1, style: 1 },
    },
    fetchqueue: {
        callbackName: 'DOCTYPE_MODULO',
        filePadding: { prefix: '!DOCTYPE_MODULO(`', suffix: '`)' },
    },
    file:  {
        DataType: 'TXT',
        Syntax: 'markdown',
        FrameLoad: '*', // Will try to load itself to parent's frame
        RequireData: 'DefinitionName',
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'type|DataType', 'Src', 'FrameLoad' ],
        DefBuilders: [ 'ContentMD', 'ContentCSV', 'ContentTXT', 'ContentJSON', 'ContentJS', 'Code', 'RequireData' ],
    },
    include: {
        LoadMode: 'bundle',
        ServerTemplate: 'https://{{ server }}/{{ path }}',
        TagTemplate: '{% if isCSS %}<link rel="stylesheet" href="{{ url }}" />' +
                     '{% else %}<script src="{{ url }}"></' + 'script>{% endif %}',
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'Src', 'Server', 'LoadMode' ],
    },
    library:  {
        Contains: 'coreDefs',
        DefTarget: 'config.component',
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'Src', 'Content' ],
    },
    modulo: {
        build: { mainModules: [ ], ordered: [ ], unordered: [ ] },
        defaultContent: '<devlib-View>',
        scriptSelector: "script[src$='mdu.js'],script[src$='/Modulo.js']," +
                        "script[src='?'],script[src$='/Modulo.html']",
        version: '0.1.0pre',
        ChildPrefix: '', // Prevents all children from getting modulo_ prefixed
        Contains: 'coreDefs',
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'Src', 'Content' ],
        defaultDef: { DefTarget: null, DefinedAs: null, DefName: null },
        defaultDefLoaders: [ 'DefTarget', 'DefinedAs', 'Src' ],
    },
    script: {
        lifecycle: null,
        DefBuilders: [ 'Content|AutoExport', 'CodeTemplate' ],
        CodeTemplate: `{% if def.locals.length %}var {{ def.locals|join:',' }};{% endif %}
        {{ def.tempContent|safe }}
        ;return {
            {% for n in def.exportNames %}
                "{{ n }}": typeof {{ n }} !== "undefined" ? {{ n }} : undefined,
            {% endfor %}
            setLocalVariables: function (o) {
                {% for n in def.locals %}{{ n }} = o.{{ n }};{% endfor %}
            }
        }`.replace(/\s\s+/g, ' ') /* + '{% if def.Source %}\n//# sourceURL={{ def.Source }}{% endif %}'*/,
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
    staticdata:  {
        DataType: '?', // Default behavior is to guess based on Src ext
        RequireData: 'DefinitionName',
        DefLoaders: [ 'DefTarget', 'DefinedAs', 'DataType', 'Src', 'FilterContent' ],
        DefBuilders: [ 'ContentCSV', 'ContentTXT', 'ContentJSON', 'ContentJS', 'Code', 'RequireData' ],
    },
    syntax: { //  `config.syntax` registers the markup languages supported by |syntax:
        jsAutoExport: /(function|class)\s+(\w+)/, // How Script tags export
        jsReserved: { // Reserved words in JavaScript (as obj for fast look-up)
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
        text: [ //  **text** escapes plaintext for HTML display (default for templates)
            [ /&/g, '&amp;' ], [ /</g, '&lt;' ], [ />/g, '&gt;' ], // &<>
            [/'/g, '&#x27;'], [ /"/g, '&quot;' ], // "'
        ],
        plaintext: [ [ null, 'syntax', 'text' ], //  **plaintext** forces WS
            [ /\n/g, '<br />' ], [ /  /g, '&nbsp;&nbsp;' ],
        ],
        mdocs: [ //  **mdocs** extracts Markdown comments with ""
            [ /^((?!.*md\:).*)$/gm, '\n' ], [ /^.*?md\:\s*/gm, '' ], // rm, strip lines
            [ null, 'syntax', 'markdown' ], // ...then apply markdown
        ],
        markdown: [ //  **markdown** is a (simple) Markdown implementation
            [ null, 'syntax', 'text' ],
            [ /```([a-z]*)([a-z=]*)\n?(.+?)\n?```/igs,
                 '<devlib-Edit mode="$1" demo$2 value="$3"></devlib-Edit>' ],
            [ /^(#+)\s*(.+)$/gm, '<h2 h="$1">$2</h2>' ],
            [ /!\[([^\]]+)\]\(([^\)]+)\)/g, '<img="$2" alt="$1" />' ],
            [ /\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>' ],
            [ /_([^_`]+)_/g, '<em>$1</em>'  ],
            [ /`([^`]+)`/g, '<code>$1</code>' ],
            [ /\*\*([^\*]+)\*\*/g, '<strong>$1</strong>' ],
            [ /\*([^\*]+)\*/g, '<em>$1</em>', ],
            [ /(\n|>)\r?\n[\n\r]*/g, '$1<p>' ],
            [ /<p>----*?/g, '</p><hr />' ],
        ],
        html: [ //  **html** syntax highlights some common html / templating
            [ null, 'syntax', 'plaintext' ],
            [ /(\{%[^<>]+?%}|\{\{[^<>]+?\}\})/gm, '<strong style=color:#B90183>$1</strong>'],
            [ /&lt;(\/|script |def |template |)([A-Z][a-z][a-zA-Z]*)/g,
                     '&lt;$1<tt style=color:#B90183>$2</tt>'],
            [ /(&lt;\/?)([a-z]+)(&gt;)?(\s?)/g, '$1<tt style=color:indigo>$2</tt>$3$4'],
        ],
    },
    template: {
        TemplatePrebuild: "y", // TODO: Refactor
        DefFinalizers: [ 'FilterContent', 'TemplatePrebuild' ],
        FilterContent: 'trim|tagswap:config.component.tagAliases',
        //unsafe: 'filters.escapehtml', // Function to check / sanitize output
        unsafe: 'filters.escape', // TODO: Check to make sure this works
        modeTokens: [ '{% %}', '{{ }}', '{# #}' ],
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
        artifact: `<Artifact name="css" -bundle="link,modstyle,style">
                {% for id in def.ids %}{{ def.data|get:id|safe }}{% endfor %}
            </Artifact>
            <Artifact name="js" -bundle="script,modscript" -collect="?">
                window.moduloBuild = true;
                {% for id in def.ids %}
                    {{ def.data|get:id|safe }};{% endfor %}
                modulo.definitions = { {% for name, value in definitions %}
                    {% if name|first is not "_" %}{{ name }}: {{ value|json|safe }},{% endif %}
                {% endfor %} };
                {% for name in config.modulo.build.mainModules %}{% if name|first is not "_" %}
                    modulo.registry.modules.{{ name }}.call(window, modulo);
                {% endif %}{% endfor %}
            </Artifact>
            <Artifact name="html" path-template="{{ config.path-name|default:'index.html' }}" prefix="<!DOCTYPE HTML>" -remove="modulo,[modulo]">
                <ht><he>{{ doc.head.innerHTML|safe }}
                    <link rel="stylesheet" href="{{ definitions._artifact_css.path }}"></link>
                    <js async src="{{ definitions._artifact_js.path }}"></js>
                </he><bo>{{ doc.body.innerHTML|safe }}</bo></ht>
            </Artifact>`,
        component: `
        <Component namespace="devlib" mode="shadow" name="Edit">
            <Props value mode demo file dash></Props>
            <Template -name="demo_embed">{{ value|safe }}</Template><Template -name="demo_component">
            <js Modulo src=Modulo.html><Component name=x>{{ value|safe }}</Component></js><x-x></Template>
        <Template>
            <article>
            {% if props.mode %}<pre style="position:absolute;height:{{ script.lc }}px; z-index: -1">
                {{ state.value|syntax:props.mode|safe }}</pre>{% endif %}
            {% if script.demo %}<textarea spellcheck=false state.bind name=value
                 style="height:{{ script.lc }}px"></textarea><div></div>
            <iframe style="height:{{ script.lc }}px;"
                 srcdoc="{{ state|renderas:script.demo|add:'' }}"
                 loading=lazy></iframe>{% endif %}</article></Template><State></State>
            <Style>pre,textarea,iframe{display:block;color:black;background:transparent;
            font-size:18px;white-space:pre;text-align:start;line-height:1;
            overflow-wrap:break-word;margin:0;padding:10px;box-sizing: content-box;
            border:1px dotted #111; font-family: monospace; }
            iframe{background:white;width:100%}
            textarea{resize:none;color:#00000000;caret-color:#000;overflow:none}
            article{display:grid;grid-template-columns: 1fr 1px 1fr; width:98%;margin:0.5%}</Style>
            <def Script>function prepareCallback() {
                if (!('value' in state)) { Object.assign(state, props); }
                if (state.file ? state.loadedFrom !== state.file : 0) {
                    state.value = modulo.stores.BUILD.getItem(state.file) || ''
                    state.loadedFrom = state.file;
                }
                return { demo: cparts['demo_' + props.demo], lc: state.value.split('\\n').length * 18 };
            }
            function updateCallback() {
                if (state.file ? state.value : 0) {
                    modulo.stores.BUILD.setItem(state.file, state.value);
                }
            }</def>
        </Component>
        <Component namespace="devlib" name="Dashboard">
            <Props edit></Props>
            <Template>
                <h1><a href="?argv={{ global.argv|join:'&argv='|safe }}">&#x27F3; {{ global.argv|join:' ' }}</a></h1>
                {% if proc.log|length %}<aside>{% for row in proc.log %}<iframe
                    src="{{ row|get:0 }}"></iframe>{% endfor %}</aside>{% endif %}
                <pre>{% for row in proc.log %}{{ row|reversed|join:" \t" }}<br />{% endfor %}</pre>
            {% if not global.stores._cache %}.{% endif %}
            <pre>{% for path, text in build.fdata %}
                <a download="{{ path }}" href="data:text/plain;charset=utf-8,{{ text|urlencode:true }}">{{ path }}</a> ({{ text|length }}){% endfor %}</pre>
            <select state.bind name="edit"><option value="">---</option>
            {% for p, t in build.fdata %}
                <option value="{{ p }}">{{ p }}</option>{% endfor %}</select>
                {% for p, t in build.fdata %}
                {% if state.edit is p %}<devlib-Edit file="{{ p }}" mode=html demo=embed></devlib-Edit>{% endif %}
                {% endfor %}
            </Template>
            <def Script>function prepareCallback() {
                if (!('edit' in state)) { Object.assign(state, props); }
            }</def><State></State>
            <State -name="build" -store="BUILD"></State>
            <State -name="proc" -store="PROC"></State>
            <Style>aside { max-width: calc(100vw - 400px); float: right; }</Style>
        </Component><Component mode="vanish" namespace="devlib" name="View"><Template>
            {{ global.definitions.file|get:'data.body'|safe }}
        </Template><Style>:root{line-height:1.5;} h2 {margin:60px 0 0 0;font-family:sans-serif;}
        h2[h='#']{font-size:56px} h2[h='##']{font-size:36px;}h2[h='###']{font-size:30px}</Style></Component>`,
    },
};

Modulo.CONFIG.syntax.html.push([ new RegExp(`(\\b${ Object.keys(
    Modulo.CONFIG.syntax.jsReserved).join('\\b|\\b') }\\b)`, 'g'),
    `<strong style=color:firebrick>$1</strong>` ]);


Modulo.prototype.register = function register (type, cls, defaults = undefined) { // TODO Mostly refactor away, along with core types, and instead be built when "load"?
    type = (`${type}s` in this.registry) ? `${type}s` : type; // pluralize
    if (type in registryCallbacks) { // TODO rm
        cls = registryCallbacks[type](this,  cls) || cls;
    }
    this.assert(type in this.registry, 'Unknown registry type: ' + type);
    this.registry[type][cls.name] = cls;
    if (cls.name[0].toUpperCase() === cls.name[0]) { // e.g. class FooBar
        const conf = this.config[cls.name.toLowerCase()] || {};
        Object.assign(conf, { Type: cls.name }, cls.defaults, defaults);
        this.config[cls.name.toLowerCase()] = conf; // e.g. config.foobar
    }
}
window.modulo = new window.Modulo(); // Create the global default Modulo instance

const registryCallbacks = { // TODO: RM
    commands(modulo, cls) {
        window.m = window.m || {}; // Avoid overwriting existing truthy m
        window.m[cls.name] = () => cls(modulo); // Attach shortcut to global "m"
    },
    tool(modulo, cls) {
        modulo.utils = modulo.utils || {} // new modulo.utils interface
        if (cls.name[0].toLowerCase()  === cls.name[0]) { // lower
            modulo.utils[cls.name] = cls.bind(modulo); // TODO: rm "bind", change to pass, collapse all into "util"
        }
    },
    processors(modulo, cls) {
        modulo.registry.processors[cls.name.toLowerCase()] = cls; // Alias lower
    },
    core(modulo, cls) { // Global / core class getting registered (RM?)
        const lowerName = cls.name[0].toLowerCase() + cls.name.slice(1);
        modulo[lowerName] = new cls(modulo);
    },
};

Modulo.prototype.instance = function instance(def, extra, inst = null) {
        const isLower = key => key[0].toLowerCase() === key[0];
        const coreDefSet = { Component: 1, Artifact: 1 }; // TODO: make compatible with any registration type
        const registry = (def.Type in coreDefSet) ? 'coreDefs' : 'cparts';
        inst = inst || new this.registry[registry][def.Type](this, def, extra.element || null); // TODO rm the element arg
        const id = ++window.Modulo.instanceID; // Unique number
        //const conf = Object.assign({}, this.config[name.toLowerCase()], def);
        const conf = Object.assign({}, def); // Just shallow copy "def"
        const attrs = this.registry.utils.keyFilter(conf, isLower);
        Object.assign(inst, { id, attrs, conf }, extra, { modulo: this });
        if (inst.constructedCallback) {
            inst.constructedCallback();
        }
        return inst;
    }

Modulo.prototype.instanceParts = function instanceParts(def, extra, parts = {}) {
        // Loop through all children, instancing each class with configuration
        const allNames = [ def.DefinitionName ].concat(def.ChildrenNames);
        for (const def of allNames.map(name => this.definitions[name])) {
            parts[def.RenderObj || def.Name] = this.instance(def, extra);
        }
        return parts;
    }

Modulo.prototype.preprocessAndDefine = function preprocessAndDefine(cb, prefix = 'Def') {
        this.fetchQueue.enqueue(() => {
            this.repeatProcessors(null, prefix + 'Builders', () => {
                this.repeatProcessors(null, prefix + 'Finalizers', cb || (() => {}));
            });
        }, true); // The "true" causes it to wait for all
    }

Modulo.prototype.loadString = function loadString(text, parentName = null) {
        return this.loadFromDOM(this.registry.utils.newNode(text), parentName);
    }

Modulo.prototype.loadFromDOM = function loadFromDOM(elem, parentName = null, quietErrors = false) {
        const loader = new this.registry.core.DOMLoader(this);
        return loader.loadFromDOM(elem, parentName, quietErrors);
    }

Modulo.prototype.repeatProcessors = function repeatProcessors(defs, field, cb) {
        let changed = true; // Run at least once
        const defaults = this.config.modulo['default' + field] || [];
        while (changed) {
            changed = false; // TODO: Is values deterministic in order? (Solution, if necessary: definitions key order arr)
            for (const def of (defs || Object.values(this.definitions))) {
                const processors = def[field] || defaults;
                //changed = changed || this.applyProcessors(def, processors);
                const result = this.applyNextProcessor(def, processors);
                if (result === 'wait') { // TODO: Refactor logic here
                    changed = null; // null always triggers an enqueue
                    break;
                }
                changed = changed || result;
            }
        }
        const repeat = () => this.repeatProcessors(defs, field, cb);
        if (changed !== null && Object.keys(this.fetchQueue ? this.fetchQueue.queue : {}).length === 0) { // TODO: Remove ?: after core object refactor
            if (cb) {
                cb(); // Synchronous path
            }
        } else {
            this.fetchQueue.enqueue(repeat);
        }
    }

Modulo.prototype.applyNextProcessor = function applyNextProcessor(def, processorNameArray) {
        const cls = this.registry.cparts[def.Type] || this.registry.coreDefs[def.Type] || {}; // TODO: Fix this
        const { processors } = this.registry;
        for (const name of processorNameArray) {
            const [ attrName, aliasedName ] = name.split('|');
            if (attrName in def) {
                const funcName = aliasedName || attrName;
                const proc = this.registry.processors[funcName.toLowerCase()];
                const func = funcName in cls ? cls[funcName].bind(cls) : proc;
                const value = def[attrName]; // Pluck value & remove attribute
                delete def[attrName]; // TODO: better refactor 'wait'
                return func(this, def, value) === true ? 'wait' : true;
            }
        }
        return false; // No processors were applied, return false
    }
window.modulo = new window.Modulo(); // Create the global default Modulo instance

modulo.register('core', class DOMLoader {
    constructor(modulo) {
        this.modulo = modulo; // TODO: need to standardize back references to prevent mismatches
    }

    getAllowedChildTags(parentName) {
        let tagsLower = this.modulo.config.domloader.topLevelTags; // "Modulo"
        if (/^_[a-z][a-zA-Z]+$/.test(parentName)) { // _likethis, e.g. _artifact
            tagsLower = [ parentName.toLowerCase().replace('_', '') ]; // Dead code?
        } else if (parentName) { // Normal parent, e.g. Library, Component etc
            const parentDef = this.modulo.definitions[parentName];
            const msg = `Invalid parent: ${ parentName } (${ parentDef })`;
            this.modulo.assert(parentDef && parentDef.Contains, msg);
            const names = Object.keys(this.modulo.registry[parentDef.Contains]);
            tagsLower = names.map(s => s.toLowerCase()); // Ignore case
        }
        return tagsLower;
    }

    loadFromDOM(elem, parentName = null, quietErrors = false) {
        const { defaultDef } = this.modulo.config.modulo;
        const toCamel = s => s.replace(/-([a-z])/g, g => g[1].toUpperCase());
        const tagsLower = this.getAllowedChildTags(parentName);
        const array = [];
        for (const node of elem.children || []) {
            const partTypeLC = this.getDefType(node, tagsLower, quietErrors);
            if (node._moduloLoadedBy || partTypeLC === null) {
                continue; // Already loaded, or an ignorable or silenced error
            }
            node._moduloLoadedBy = this.modulo.id; // Mark as having loaded this
            // Valid definition, now create the "def" object
            const def = Object.assign({ Parent: parentName }, defaultDef);
            def.Content = node.tagName === 'SCRIPT' ? node.textContent : node.innerHTML;
            array.push(Object.assign(def, this.modulo.config[partTypeLC]));
            for (let name of node.getAttributeNames()) { // Loop through attrs
                const value = node.getAttribute(name);
                if (partTypeLC === name && !value) { // e.g. <def Script>
                    continue; // This is the "Type" attribute itself, skip
                }
                def[toCamel(name)] = value; // "-kebab-case" to "CamelCase"
            }
        }
        this.modulo.repeatProcessors(array, 'DefLoaders');
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
        if (defType in this.modulo.config.domloader.genericDefTags) {
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
    }
});

modulo.register('core', class ValueResolver {
    constructor(contextObj = null) {
        this.ctxObj = contextObj;
        this.isJSON = /^(true$|false$|null$|[^a-zA-Z])/; // "If not variable"
    }

    get(key, ctxObj = null) {
        const { get } = window.modulo.registry.utils; // For drilling down "."
        const obj = ctxObj || this.ctxObj; // Use given one or in general
        return this.isJSON.test(key) ? JSON.parse(key) : get(obj, key);
    }

    set(obj, keyPath, val, autoBind = false) {
        const index = keyPath.lastIndexOf('.') + 1; // Index at 1 (0 if missing)
        const key = keyPath.slice(index).replace(/:$/, ''); // Between "." & ":"
        const prefix = keyPath.slice(0, index - 1); // Get before first "."
        const target = index ? this.get(prefix, obj) : obj; // Drill down prefix

        if (keyPath.endsWith(':')) { // If it's a dataProp style attribute
            const parentKey = val.substr(0, val.lastIndexOf('.'));
            val = this.get(val); // Resolve "val" from context, or JSON literal
            if (autoBind && !this.isJSON.test(val) && parentKey.includes('.')) {
                val = val.bind(this.get(parentKey)); // Parent is sub-obj, bind
            }
        }
        target[key] = val; // Assign the value to it's parent object
    }
});

modulo.register('core', class FetchQueue {
    constructor(modulo, queue = {}, data = {}) {
        Object.assign(this, { modulo, queue, data });
        this.wait = callback => this.enqueue(callback, true); // TODO: RM this alias
    }

    fetch(src) {  // Returns "thennable" that somewhat resembles window.fetch
        return { then: callback => this.request(src, callback, console.error) };
    }

    request(src, resolve, reject) { // Do fetch & do enqueue
        if (src in this.data) { // Cached data found
            resolve(this.data[src], src); // (sync route)
        } else if (!(src in this.queue)) { // No cache, no queue
            this.queue[src] = [ resolve ]; // First time, create the queue Array
            const { force, callbackName } = this.modulo.config.fetchqueue;
            if (force === 'frame') {
                const iframe = window.document.createElement('IFRAME');
                window.addEventListener('message', (ev) => {
                    const def = JSON.parse(ev.data);
                    iframe.remove();
                    modulo.fetchQueue.receiveData(def.Content, src);
                }, false);
                window.document.body.append(Object.assign(iframe, {
                     src: value + '?argv=_load', style: 'display:none'
                }));
            } else if ((!force && src.startsWith('file:/')) || force === 'file') {
                window[callbackName] = str => { this.__data = str };
                const elem = window.document.createElement('SCRIPT');
                elem.onload = () => this.receiveData(this.__data, src);
                elem.src = src + (src.endsWith('/') ? 'index.html' : '');
                window.document.head.append(elem); // Actually execute request
                elem.remove(); // Clean up SCRIPT tag when we are done
            } else { // Otherwise, use normal fetch transport method
                window.fetch(src, { cache: 'no-store' })
                    .then(response => response.text())
                    .then(text => this.receiveData(text, src))
                    .catch(reject);
            }
        } else { // Otherwise: Already requested, only enqueue function
            this.queue[src].push(resolve);
        }
    }

    receiveData(text, src) { // Receive data, optionally trimming padding
        const { prefix, suffix } = this.modulo.config.fetchqueue.filePadding;
        if (text && text.startsWith(prefix) && prefix && text.trim().endsWith(suffix)) {
            text = text.trim().slice(prefix.length, 0 - suffix.length); // Clean
        }
        this.data[src] = text; // Keep retrieved data cached here for sync route
        const resolveCallbacks = this.queue[src]; // Stash the queue of waiting CBs
        delete this.queue[src];
        for (const dataCallback of resolveCallbacks) { // Loop through callbacks
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
});

modulo.register('processor', function src (modulo, def, value) {
    const { getParentDefPath } = modulo.registry.utils;
    def.Source = (new window.URL(value, getParentDefPath(modulo, def))).href;
    modulo.fetchQueue.fetch(def.Source).then(text => {
        def.Content = (text || '') + (def.Content || '');
    });
});

modulo.register('processor', function srcSync (modulo, def, value) {
    modulo.registry.processors.src(modulo, def, value);
    return true; // Only difference is return "true" for "wait" (TODO: Refactor to "return def.SrcAsync ? false" then specify on Configuration)
});

modulo.register('processor', function defTarget (modulo, def, value) {
    const resolverName = def.DefResolver || 'ValueResolver'; // TODO: document
    const resolver = new modulo.registry.core[resolverName](modulo);
    const target = value === null ? def : resolver.get(value); // Target object
    for (const [ key, defValue ] of Object.entries(def)) { // Resolve all values
        if (key.endsWith(':') || key.includes('.')) {
            delete def[key]; // Remove & replace unresolved value
            //resolver.set(/[^a-z]/.test(key) ? target : def, key, defValue); // TODO: Probably should be this -- not sure how this interacts with if
            //resolver.set(/^[a-z]/.test(key) ? target : def, key, defValue);
            resolver.set(/^_?[a-z]/.test(key) ? target : def, key, defValue);
        }
    }
});

modulo.register('processor', function content (modulo, conf, value) {
    modulo.loadString(value, conf.DefinitionName);
});

modulo.register('processor', function mainRequire (modulo, conf, value) {
    modulo.config.modulo.build.mainModules.push(value);
    modulo.registry.modules[value].call(window, modulo);
});

modulo.register('processor', function definedAs (modulo, def, value) {
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
});

modulo.register('processor', function contentCSV (modulo, def, value) {
    // TODO: Rewrite into better little parser that handles quotes
    const parse = s => s.trim().split('\n').map(line => line.trim().split(','));
    def.Code = 'return ' + JSON.stringify(parse(def.Content || ''));
});

modulo.register('processor', function contentJS (modulo, def, value) {
    const tmpFunc = Function('return (' + (def.Content || 'null') + ');');
    def.Code = 'return ' + JSON.stringify(tmpFunc()) + ';'; // Evaluate
});

modulo.register('processor', function contentJSON (modulo, def, value) {
    def.Code = 'return ' + JSON.stringify(JSON.parse(def.Content || '{}')) + ';';
});

modulo.register('processor', function contentTXT (modulo, def, value) {
    def.Code = 'return ' + JSON.stringify(def.Content);
});

modulo.register('processor', function contentMD (modulo, def, value) {
    const obj = { body: def.Content || '' }; // Setup defaults
    const chunks = obj.body.split(/(type=.?md.?>---\n|^\s*---\n|\n---\n)/gi);
    const { syntax } = modulo.registry.templateFilters;
    if (chunks.length > 2) { // Meta was specified, loop through and parse
        let key = null
        for (const line of chunks[2].split(/[\n\r]/g)) {
            if (key && (new RegExp('^[ \\t]')).test(line)) { // Multiline?
                obj[key] += '\n' + line; // Add back \n, verbatim (no trim)
            } else if (line.trim() && (key = line.split(':')[0])) { // Key?
                obj[key.trim()] = line.substr(key.length + 1).trim();
            }
        }
        obj.body = chunks.slice(4, chunks.length).join('\n---\n');
    }
    obj.body = def.Syntax ? syntax(obj.body, def.Syntax) : obj.body;
    def.Code = 'return ' + JSON.stringify(obj); // Serialize again as JSON
});

modulo.register('processor', function contentModulo (modulo, def, value) {
    modulo.loadString(def.Content, 'modulo'); // Ensure gets loaded as global
    def.Code = 'return { }'; // TODO: contentModulo is not documented
    return true; // Always pause (since the above will fetch Src's)
});

modulo.register('processor', function dataType (modulo, def, value) {
    if (value === '?') { // '?' means determine based on extension
        const ext = def.Src && def.Src.match(/\.([a-z]+)$/i);
        value = ext ? ext[1] : 'json'; // If extension, use; else use "json"
    }
    def['Content' + value.toUpperCase()] = value; // Add attr for next step
});

modulo.register('processor', function filterContent (modulo, def, value) {
    if (def.Content && value) { // Check if active (needs truthy value)
        // value = value.trim().replace(/\s*\n\s*\|/gi, '|'); // Would allow multi-line
        const miniTemplate = `{{ def.Content|${ value }|safe }}`;
        const tmplt = new modulo.registry.cparts.Template(miniTemplate);
        def.Content = tmplt.render({ def, config: modulo.config });
    }
});

modulo.register('processor', function code (modulo, def, value) {
    const { newNode, bundleHead } = modulo.registry.utils;
    const name = def.DefinitionName; // Defines global module with name
    modulo.assert(!(name in modulo.registry.modules), 'Duplicate code module name');
    const prefix = 'modulo.registry.modules.' + name + ' = function ' + name;
    const content = prefix + ' (modulo) { ' + value + '}';
    if (document && document.head && name[0] !== '_') { // Browser / bundling context
        bundleHead(modulo, newNode(content, 'SCRIPT'), modulo.bundles.modscript);
    } else {
        Function('window', 'modulo', content)(window, modulo); // Non-browser / hidden
    }
});

modulo.register('processor', function codeTemplate (modulo, def, value) {
    const tmplt = new modulo.registry.cparts.Template(value); // Anon template
    modulo.registry.processors.code(modulo, def, tmplt.render({ modulo, def }));
});

modulo.register('processor', function requireData (modulo, def, value) {
    def.data = modulo.registry.modules[def[value]].call(window, modulo);
});

// Empty Core Definitions (Behavior is entirely in CONFIG)
modulo.register('coreDef', class Modulo { });
modulo.register('coreDef', class Configuration { });
modulo.register('coreDef', class Library { });
modulo.register('coreDef', class File {
    static FrameLoad (modulo, def, value) { // Register dev commands
        if (window.parent) { // If child, send data back to parent
            modulo.registry.commands._load = () => {
                window.parent.postMessage(JSON.stringify(def), value)
                modulo.cmdCallback(0, null, 'LOADING'); // Blank page
            }
        }
    }
});

// Build-Time Core Definitions
modulo.register('coreDef', class Artifact {
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
        for (const elem of value) {
            const url = elem.getAttribute('src') || elem.getAttribute('href') || null;
            if (url) { // Retrieve from URL
                modulo.fetchQueue.fetch(url).then(text => {
                    def.data[elem.id] = text; // Attach back to element
                });
            } else { // Retrieve text content
                def.data[elem.id] = elem.textContent;
            }
            def.ids.push(elem.id); // List in order
            elem.remove(); // Remove from DOM so it doesn't get doubled
        }
    }
    static SaveTo (modulo, def, value, doc = null) { // Build processor
        // TODO: This is broken since it unescapes everyhing
        const ctx = Object.assign({ def, doc: doc || window.document }, modulo);
        const render = s => new modulo.registry.cparts.Template(s).render(ctx);
        const text = (def.prefix || '') + render(def.Content); // Execute template
        ctx.hash = modulo.registry.utils.hash(text); // Compute hash for path
        def.path = def.path || render(def.pathTemplate); // Render path template
        modulo.stores[value].setItem(def.path, text); // Save to given FS
    }
});
modulo.register('coreDef', class ContentList { // Generic static-data type
    static Register (modulo, def, value) { // Register dev commands
        for (const cmd of value.split(/\s+/g)) {
            modulo.registry.commands[cmd + '_' + def.DefinitionName] = (modulo) => {
                const { BUILD, PROC } = modulo.stores;
                window._globalFS = { BUILD, _cache: modulo.fetchQueue.data };
                for (const row of def.data) { // Loop through files to run
                    PROC.setItem(row[0] + '?argv=' + cmd, row[1] || '');
                }
                modulo.cmdCallback(); // Dashboard ready, iframes will run
            };
        }
    }
    static Load (modulo, def, value) { // If specified, will recursively load list
        const extra = { Parent: def.DefinitionName, DataType: value || '?' };
        const conf = Object.assign(extra, modulo.config.staticdata);
        conf.DefList = [ 'DefinedAs', 'DataType', 'Src' ].concat(conf.DefBuilders);
        const defs = def.data.files.map(Src => Object.assign({ Src }, conf));
        modulo.repeatProcessors(defs, 'List'); // Loads each of the mini "staticdata"
        def.data.meta = Object.fromEntries(def.data.files.map(k => [ k, { } ]));
        return true; // Always pause (since the above will fetch Src's)
    }
});

modulo.register('cpart', class Include { // Used as both "CPart" and "coreDef"
    static Server(modulo, def, value) { // Loads given Include def
        const { keyFilter } = modulo.registry.utils;
        const lower = key => key[0].toLowerCase() === key[0]; // skip "-prefixed"
        const ctx = { def, modulo, server: value };
        const render = code => new modulo.registry.cparts.Template(code).render(ctx);
        def.Content = def.Content || '';
        for (const [ pkg, v ] of Object.entries(keyFilter(def, lower))) {
            ctx.path = v.contains('@') ? v : pkg + (v ? ('@' + v) : '');
            ctx.isCSS = (ctx.path.includes('/') && ctx.path.endsWith('.css'));
            ctx.url = render(def.ServerTemplate); // Render URL using ServerTemplate
            def.Content += render(def.TagTemplate); // Append tag to head Content
        }
    }
    static LoadMode(modulo, def, value) { // Loads given Include def
        const { bundleHead, newNode } = modulo.registry.utils;
        for (const elem of newNode(def.Content).children) { // Loop through combined
            // TODO: Correctly use "value" for async / lazy type loading
            bundleHead(modulo, elem);
        }
    }
    intitializedCallback(renderObj) {
        const { Include } = this.modulo.registry.cparts; // Can I use self. reliably?
        //Include.LoadMode(this.modulo, this.conf, 'lazy', { }); // Always load if ID not exist
        Include.LoadMode(this.modulo, this.conf, 'lazy'); // Always load if ID not exist
    }
});
modulo.register('coreDef', modulo.registry.cparts.Include); // Allow globally

modulo.register('coreDef', class Component {
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
        return (this.element.eventRenderObj || this.element.renderObj || this.element.initRenderObj);
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
                    continue; // Skip if obj has not registered callback
                }
                const result = obj[methodName].call(obj, renderObj);
                if (result) { // TODO: Change to (result !== undefined) and test
                    renderObj[obj.conf.RenderObj || obj.conf.Name] = result;
                }
            }
        }
    }

    buildCallback() {
        // TODO - Faster: patches.filter(p => p[1].endsWith('Mount')).map(p => p[2].rawName).map(attr => `[${ attr }]`).join(',');
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
        const { newNode } = this.modulo.registry.utils;
        const html = this.element.getAttribute('modulo-mount-html'); // Hydrate?
        this._mountRival = html === null ? this.element : newNode(html);
        this.element.originalHTML = html === null ? this.element.innerHTML : html;
        this.resolver = new this.modulo.registry.core.ValueResolver(this.modulo);
        this.reconciler = new this.modulo.registry.core.Reconciler(this.modulo);
        for (const part of Object.values(this.element.cparts)) { // Setup parts
            this.reconciler.registerDirectives(part, part.conf);
        }
    }

    mountCallback() { // First "mount", trigger render & hydration
        // this.reconciler.applyPatches(this.reconciler.patches); // From "mount"
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

    domCallback(renderObj) {
        let { slots, root, innerHTML, innerDOM } = renderObj.component;
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
            innerDOM = this.modulo.registry.utils.newNode(innerHTML);
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

    reconcileCallback(renderObj) {
        let { innerHTML, innerDOM, patches, root, slots } = renderObj.component;
        if (innerDOM) {
            this.reconciler.patches = []; // Reset reconciler patches
            this.reconciler.reconcileChildren(root, innerDOM, slots);
            patches = this.reconciler.patches;
        }
        return { patches, innerHTML }; // TODO remove innerHTML from here
    }

    updateCallback(renderObj) {
        const { patches } = renderObj.component;
        if (patches) {
            this.reconciler.applyPatches(patches); // Apply patches to DOM
        }
        if (this.attrs.mode === 'vanish') {
            this.element.replaceWith(...this.element.childNodes);
        }
    }

    handleEvent(func, payload, ev) {
        this._lifecycle([ 'event' ]);
        func(payload === undefined ? ev : payload);
        this._lifecycle([ 'eventCleanup' ]);
        if (this.attrs.rerender !== 'manual') { // TODO: Change patch('rerender') to "requestRerender" (or update the HTMLElement method)
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
            this.handleEvent(this.resolve(value), payload, ev);
        }
        el.moduloEvents = el.moduloEvents || {}; // Attach if not already
        el.moduloEvents[nameSuffix] = listen;
        el.addEventListener(nameSuffix, listen);
    }

    onUnmount({ el, nameSuffix }) {
        el.removeEventListener(nameSuffix, el.moduloEvents[nameSuffix]);
        delete el.moduloEvents[nameSuffix];
    }

    resolve(key, defaultVal) {
        const { ValueResolver } = this.modulo.registry.core;
        const resolver = new ValueResolver(this.getCurrentRenderObj());
        return resolver.get(key, defaultVal);
    }
});

modulo.register('cpart', class Props {
    static factoryCallback({ elementClass }, def, modulo) {
        const isLower = key => key[0].toLowerCase() === key[0]; // skip "-prefixed"
        const keys = Array.from(Object.keys(def)).filter(isLower);
        elementClass.observedAttributes.push(...keys);
    }
    initializedCallback() {
        this.data = { }; // Pre-populate data with the mounted attributes
        Object.keys(this.attrs).forEach(attrName => this.updateProp(attrName));
        return this.data;
    }
    updateProp(attrName) { // Loads from element
        this.data[attrName] = this.element.hasAttribute(attrName) ?
            this.element.getAttribute(attrName) : this.attrs[attrName];
    }
    attrCallback({ attrName }) {
        if (attrName in this.attrs) {
            this.updateProp(attrName);
            this.element.rerender();
        }
    }
});

modulo.register('cpart', class Style { // md:### Style
    // md:```html=component<Template><em>Stylish</em>, <big>look</big>!</Template>
    // md:<Style>em { color: tomato } big { background: salmon }</Style>```
    static AutoIsolate(modulo, def, value) { // md: Style "auto-isolates" CSS.
        const { AutoIsolate } = modulo.registry.cparts.Style; // (for recursion)
        const { namespace, mode, Name } = modulo.definitions[def.Parent] || {};
        if (value === true) { // md: By default, it uses the component's mode,
            AutoIsolate(modulo, def, mode); // to decide "regular" vs "vanish".
        } else if (value === 'regular' && !def.isolateClass) { // md: Regular
            def.prefix = def.prefix || `${namespace}-${Name}`; // md: prefixes
        } else if (value === 'vanish') { // md: each selector, while for
            def.isolateClass = def.isolateClass || def.Parent; // md: "vanish"
        } // md: it modifies the DOM and adds a class it creates to every
    } // md: direct child. For "shadow", it adds the sheet to the shadow DOM.
    static processSelector (modulo, def, selector) {
        const hostPrefix = def.prefix || ('.' + def.isolateClass);
        if (def.isolateClass || def.prefix) {
            // Upgrade the ":host" or :root pseudo-elements to be the full name
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
                value = value.replace(/\/\*.+?\*\//g, ''); // strip comments
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
        }
        if (def.urlReplace || (def.urlReplace === null && def.Source)) {
            const key = def.urlReplace === 'absolute' ? 'href' : 'pathname';
            value = value.replace(/url\(['"]?([^)]+?)['"]?\)/gi, (all, url) => {
                if (url.startsWith('.')) { // If relative, make absolute
                    return `url("${ (new window.URL(url, def.Source))[key] }")`;
                }
                return all; // Not a relative URL, return all text untampered
            });
        }
        const { mode } = modulo.definitions[def.Parent] || {};
        if (mode === 'shadow') { // Stash in the definition configuration
            def.shadowContent = (def.shadowContent || '') + value;
        } else { // Otherwise, just load as a regular modulo asset
            const { newNode, bundleHead } = modulo.registry.utils;
            bundleHead(modulo, newNode(value, 'STYLE'), modulo.bundles.modstyle);
        }
    }
    domCallback(renderObj) {
        const { mode } = modulo.definitions[this.conf.Parent] || {};
        const { innerDOM, Parent } = renderObj.component;
        const { isolateClass, isolateSelector, shadowContent } = this.conf;
        if (isolateClass && isolateSelector && innerDOM) { // Attach classes
            const selector = isolateSelector.filter(s => s).join(',\n');
            for (const elem of innerDOM.querySelectorAll(selector)){
                elem.classList.add(isolateClass); // Ensure all dom children get the class
            }
        }
        if (shadowContent && innerDOM) { // Append to element to reconcile
            const elem = this.modulo.registry.utils.newNode(shadowContent, 'STYLE');
            innerDOM.append(elem);
        }
    }
});

modulo.register('cpart', class Template {
    static TemplatePrebuild (modulo, def, value) {
        modulo.assert(def.Content, `Empty Template: ${def.DefinitionName}`);
        const template = modulo.instance(def, { });
        const compiledCode = template.compileFunc(def.Content);
        const code = `return function (CTX, G) { ${ compiledCode } };`;
        modulo.registry.processors.code(modulo, def, code);
        delete def.Content;
    }
    constructor(text, options = null) {
        if (typeof text === 'string') { // Using "new" (direct JS interface)
            window.modulo.instance(options || { }, null, this); // Setup object
            this.conf.DefinitionName = '_template_template' + this.id; // Unique
            const code = `return function (CTX, G) { ${ this.compileFunc(text) } };`;
            this.modulo.registry.processors.code(this.modulo, this.conf, code);
        }
    }

    constructedCallback() {
        // Combines conf from all sources: config, defaults, and "registered"
        this.stack = []; // Parsing tag stack, used to detect unclosed tags
        const { filters, tags, modes } = this.conf;
        const { templateFilters, templateTags, templateModes } = this.modulo.registry;
        Object.assign(this, this.modulo.config.template, this.conf);
        // Set "filters" and "tags" with combined / squashed configuration
        this.filters = Object.assign({ }, templateFilters, filters);
        this.tags = Object.assign({ }, templateTags, tags);
        this.modes = Object.assign({ }, templateModes, modes);
    }

    initializedCallback() {
        return { render: this.render.bind(this) }; // Export "render" method
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

    tokenizeText(text) {
        // Join all modeTokens with | (OR in regex)
        const { escapeRegExp } = this.modulo.registry.utils;
        const re = '(' + this.modeTokens.map(escapeRegExp).join('|(').replace(/ +/g, ')(.+?)');
        return text.split(RegExp(re)).filter(token => token !== undefined);
    }

    compileFunc(text) {
        const { normalize } = this.modulo.registry.utils;
        let code = 'var OUT=[];\n'; // Variable used to accumulate code
        let mode = 'text'; // Start in text mode
        const tokens = this.tokenizeText(text);
        for (const token of tokens) {
            if (mode) { // If in a "mode" (text or token), then call mode func
                const result = this.modes[mode](token, this, this.stack);
                if (result) { // Mode generated text output, add to code
                    const comment = !this.disableComments ? '' :
                        ' // ' + JSON.stringify(normalize(token).trim());
                    code += `  ${ result }${ comment }\n`;
                }
            }
            // FSM for mode: ('text' -> null) (null -> token) (* -> 'text')
            mode = (mode === 'text') ? null : (mode ? 'text' : token);
        }
        code += '\nreturn OUT.join("");'
        const unclosed = this.stack.map(({ close }) => close).join(', ');
        this.modulo.assert(!unclosed, `Unclosed tags: ${ unclosed }`);
        return code;
    }

    render(renderObj) {
        if (!this.renderFunc) { // Run module and get function
            this.modulo.assert(this.conf.DefinitionName in this.modulo.registry.modules, this.conf.DefinitionName + ' not found'); // TODO - Move this to require
            this.renderFunc = this.modulo.registry.modules[this.conf.DefinitionName].call(window, this.modulo);
        }
        return this.renderFunc(Object.assign({ renderObj, global: this.modulo }, renderObj), this);
    }
});

modulo.register('cpart', class StaticData { // md:### StaticData
    prepareCallback() { // md:```html=component<StaticData>{ "a": { "b": [ 1, 2, 3 ] } }</StaticData>
        // md:<Template>Easy as {{ staticdata.a.b|join:', ' }}</Template>```
        return this.conf.data; // md: StaticData returns unchanging data.
    } // md: If built, the data is "frozen" in it's given state, in the bundle.
});

modulo.register('cpart', class Script { // md:### Script
    // md:```html=component<def Script>function hi(){ alert(element) }</def>
    // md:<Template><button on.click=script.hi>See alert</button></Template>```
    static factoryCallback(renderObj, def, modulo) {// md: Scripts run JS code.
        //modulo.assert(results || !def.Parent, 'Invalid script return');
        const func = () => modulo.registry.modules[def.DefinitionName].call(window, modulo);
        if (def.lifecycle === 'initialized') { // TODO rm / change this feature
            return { initializedCallback: func }; // Attach as callback
        } // md: By default, they run in static context (e.g. on page start).
        return func();
    }

    static AutoExport (modulo, def, value) { // md: Scripts auto-export:
        const { getAutoExportNames } = modulo.registry.utils;
        if (def.lifecycle && def.lifecycle !== 'initialized') {
            value = `function ${ def.lifecycle }Callback (renderObj) {${ value }}`;
        } // md: Named functions (ie function foo, not =>) and classes are exposed
        const { ChildrenNames } = modulo.definitions[def.Parent] || { };
        const sibs = (ChildrenNames || []).map(n => modulo.definitions[n].Name);
        sibs.push('component', 'element', 'cparts');
        def.exportNames = def.exportNames || getAutoExportNames(value);
        def.locals = def.locals || sibs.filter(name => value.includes(name));
        def.Directives = def.exportNames.filter(s => s.match(/(Unmount|Mount)$/));
        def.tempContent = value; // TODO: Refactor AutoExport + CodeTemplate
    } // md: Internally, they have access to all component parts, and element.

    initializedCallback(renderObj) { // md: When the component mounts, scripts will
        // md: also register all callbacks, wrapping user functions as needed.
        const script = renderObj[this.conf.Name];
        this.eventCallback = (rObj) => { // Create eventCallback to set inner
            const vars = { element: this.element, cparts: this.element.cparts };
            const setLocal = script.setLocalVariables || (() => {});
            setLocal(Object.assign(vars, rObj)); // Set inner vars (or no-op)
        };
        if (script.initializedCallback) { // If defined, trigger inner init
            this.eventCallback(renderObj); // Prep before (used by lc=false)
            Object.assign(script, script.initializedCallback(renderObj));
            this.eventCallback(renderObj); // Prep again (used by lc=initialize)
        } // md: Specifically, it registers any functions ending with Mount,
        const isCB = /(Mount|Unmount|Callback)$/; // md: Unmount, or Callback.
        for (const cbName of Object.keys(script)) {
            if (cbName === 'initializedCallback' || !cbName.match(isCB)) {
                continue; // Skip over initialized (already handled) and non-CBs
            } // md: These become either directives, or lifecycle callbacks.
            this[cbName] = arg => { // Arg: Either renderObj or directive obj
                const renderObj = this.element.getCurrentRenderObj();
                const script = renderObj[this.conf.Name]; // Get new render obj
                this.eventCallback(renderObj); // Prep before lifecycle method
                Object.assign(script, script[cbName](arg) || {});
            };
        }
    }
});


modulo.register('cpart', class State { // md:### State
    // md:```html=component<State msg="Lorem"></State>
    // md:<Template>{{ state.msg }}: <input state.bind name=msg></Template>```

    static factoryCallback(renderObj, def, modulo) {
        if (def.Store) { // md: If a -store= is specified, it's global.
            const store = modulo.registry.utils.makeStore(modulo, def);
            if (!(def.Store in modulo.stores)) { // md: The first one
                modulo.stores[def.Store] = store; // md: encountered
            } else { // md: with that name will create the "Store".
                Object.assign(modulo.stores[def.Store].data, store.data);
            } // md: Subsequent usage will share and react to that one "Store".
        } // md: Otherwise, it will default to be newly made per-component,
    } // md: and create a private store for each component instance,
    initializedCallback(renderObj) { // md: when that component "initializes".
        const store = this.conf.Store ? this.modulo.stores[this.conf.Store]
                : this.modulo.registry.utils.makeStore(this.modulo, this.conf);
        store.subscribers.push(Object.assign(this, store));
        this.types = { range: Number, number: Number, checkbox: (val, el) => el.checked };
        return store.data; // TODO: Possibly, push ALL sibling CParts with stateChangedCallback
    }

    bindMount({ el, nameSuffix, value, listen }) {
        const name = value || el.getAttribute('name');
        const val = this.modulo.registry.utils.get(this.data, name);
        this.modulo.assert(val !== undefined, `state.bind "${name}" undefined`);
        const isText = el.tagName === 'TEXTAREA' || el.type === 'text';
        const evName = nameSuffix ? nameSuffix : (isText ? 'keyup' : 'change');
        if (!(name in this.boundElements)) {
            this.boundElements[name] = [];
        }
        // Bind the "listen" event to propagate to all, and trigger initial vals
        listen = listen ? listen : () => this.propagate(name, el.value, el);
        this.boundElements[name].push([ el, evName, listen ]);
        el.addEventListener(evName, listen);
        this.propagate(name, val, this); // trigger initial assignment(s)
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
        this.modulo.registry.utils.set(this.data, name, value);
        if (!this.conf.Only || this.conf.Only.includes(name)) {
            this.element.rerender();
        }
    }

    eventCallback() {
        this._oldData = Object.assign({}, this.data);
    }

    propagate(name, val, originalEl = null) {
        const elems = (this.boundElements[name] || []).map(row => row[0]);
        const typeConv = this.types[ originalEl ? originalEl.type : null ];
        val = typeConv ? typeConv(val, originalEl) : val; // Apply conversion
        for (const el of this.subscribers.concat(elems)) {
            if (originalEl && el === originalEl) {
                continue; // don't propagate to originalEl (avoid infinite loop)
            }
            if (el.stateChangedCallback) { // A callback was found, use instead
                el.stateChangedCallback(name, val, originalEl);
            } else if (el.type === 'checkbox') { // Check input use ".checkbox"
                el.checked = !!val;
            } else { // Normal inputs use ".value"
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
});

modulo.register('util', class DOMCursor {
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
});

modulo.register('core', class Reconciler {
    constructor(modulo) {
        this.modulo = modulo;
        this.directives = {};
        this.patches = [];
        this.patch = this.pushPatch;
    }

    registerDirectives(thisObj, def) {
        const prefix = 'DirectivePrefix' in def ? def.DirectivePrefix
                                 : (def.RenderObj || def.Name) + '.';
        for (const method of def.Directives || []) {
            this.directives[prefix + method] = thisObj;
        }
    }

    applyPatches(patches) {
        for (const patch of patches) { // Simply loop through given iterable
            this.applyPatch(patch[0], patch[1], patch[2], patch[3]);
        }
    }

    reconcileChildren(childParent, rivalParent, slots) {
        const cursor = new this.modulo.registry.utils.DOMCursor(childParent, rivalParent, slots);
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
                        this.patch(child, 'rerender', rival);
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
            return; // Skip anything that isn't a regular HTML element
        }
        if (parentNode._moduloIgnoreOnce) { // Used by slot DOMCursor
            delete parentNode._moduloIgnoreOnce; // Ensure ignore is deleted
            return; // Skip ignored elements
        }
        const searchNodes = Array.from(parentNode.querySelectorAll('*'));
        for (const node of [ parentNode ].concat(searchNodes)) {
            for (const rawName of node.getAttributeNames()) { // Do patches
                this.patchDirective(node, rawName, actionSuffix);
            }
        }
    }
});

modulo.register('util', function initComponentClass (modulo, def, cls) {
    // Run factoryCallback static lifecycle method to create initRenderObj
    const initRenderObj = { elementClass: cls }; // TODO: Refactor to "static classCallback" and pass on cls
    for (const defName of def.ChildrenNames) {
        const cpartDef = modulo.definitions[defName];
        const cpartCls = modulo.registry.cparts[cpartDef.Type];
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
        this.cparts = modulo.instanceParts(def, { element: this });
    };
    cls.prototype.connectedCallback = function connectedCallback () {
        modulo._connectedQueue.push(this);
        window.setTimeout(modulo._drainQueue, 0);
    };
    cls.prototype.moduloMount = function moduloMount(force = false) {
        if ((!this.isMounted && window.document.contains(this)) || force) {
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
    modulo.register('element', cls); // All elements get registered centrally
});

modulo.register('util', function makeStore (modulo, def) {
    const isLower = key => key[0].toLowerCase() === key[0]; // skip "-prefixed"
    let data = modulo.registry.utils.keyFilter(def, isLower); // Get defaults
    data = JSON.parse(JSON.stringify(data)); // Deep copy to ensure primitives
    return { data, boundElements: {}, subscribers: [] };
});

modulo.register('util', function configureStatic (modulo) { // Setup default content
    const { staticDir, rootDir, scriptSelector } = modulo.config.modulo;
    const dir = staticDir || 'static/'; // has src=static/mdu.js
    const mdu = window.document.head.querySelector(scriptSelector);
    const root = rootDir || ((mdu || {}).src || '').split(dir)[0]; // e.g. ../
    if (mdu && root !== mdu.src && !modulo.definitions.modulo) { // No Modulo
        modulo.loadString(`<Modulo -src="${ root + dir }">`); // Load default
    }
    if (!modulo.definitions.modulo && modulo.definitions.file) {
        modulo.fetchQueue.enqueue(() => { // If file specified, try appending HTML
            document.body.innerHTML += modulo.config.modulo.defaultContent;
        }, true);
    }
});

modulo.register('util', function keyFilter (obj, func) {
    const keys = func.call ? Object.keys(obj).filter(func) : func;
    return Object.fromEntries(keys.map(key => [ key, obj[key] ]));
});

modulo.register('util', function hash (str) { //  Returns base32 hash
    let h = 0; // Simple, insecure, "hashCode()" implementation
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(31, h) + str.charCodeAt(i) | 0; //h = ((h << 5 - h) + str.charCodeAt(i)) | 0;
    }
    const hash8 = ('---------' + (h || 0).toString(32)).slice(-8);
    return hash8.replace(/-/g, 'x'); // Pad with 'x'
});

modulo.register('util', function newNode(innerHTML, tag) {
    const obj = { innerHTML }; // Extra properties to assign
    return Object.assign(window.document.createElement(tag || 'div'), obj);
});

modulo.register('util', function bundleHead(modulo, elem, bundle = null, doc = null) {
    doc = doc || window.document;
    const { newNode, hash } = modulo.registry.utils;
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
});

modulo.register('util', function normalize(html) {
    // Normalize space to ' ' & trim around tags
    return html.replace(/\s+/g, ' ').replace(/(^|>)\s*(<|$)/g, '$1$2').trim();
});

modulo.register('util', function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\" + "\x24" + "&");
});

modulo.register('util', function get(obj, key) {
    return (key in obj) ? obj[key] : (key + '').split('.').reduce((o, name) => o[name], obj);
});

modulo.register('util', function set(obj, keyPath, val) {
    return new window.modulo.registry.core.ValueResolver(window.modulo).set(obj, keyPath, val);
});

modulo.register('util', function getParentDefPath(modulo, def) {
    const { getParentDefPath } = modulo.registry.utils; // Use to recurse
    const pDef = def.Parent ? modulo.definitions[def.Parent] : null;
    const url = String(window.location).split('?')[0]; // Remove ? info
    return pDef ? pDef.Source || getParentDefPath(modulo, pDef) : url;
});

modulo.register('util', function getAutoExportNames(text) {
    const { jsReserved, jsAutoExport } = modulo.config.syntax;
    const matches = text.match(new RegExp(jsAutoExport, 'g')) || []
    const symbols = matches.map(sym => sym.match(jsAutoExport)[2])
    return symbols.filter(sym => sym && !(sym in jsReserved));
});

modulo.register('util', function makeStoreFS(modulo) { // TODO: Refactor state into core def!
    const store = modulo.registry.utils.makeStore(modulo, { fdata: { }, log: [ ] });
    return Object.assign(store, { types: {} }, {
        propagate: modulo.registry.cparts.State.prototype.propagate.bind(store),
        key: i => Object.keys(store.data.fdata)[i],
        getItem: key => key in store.data.fdata ? store.data.fdata[key] : null,
        removeItem: (key, val) => store.setItem(key, null), // Note: Deleting leaves log, etc
        setItem: (key, val) => {
            store.data.fdata[key] = val;
            store.data.log.push([ key, (new Date()).getTime() / 1000]); // TODO: Merge with makeStore, and add this as opt
            store.propagate('fdata', store.data.fdata);
        },
    });
});

modulo.register('util', function setupDevLib(modulo, subFS = null) {
    // Setup argv / path, sets up the "FS" stores (or parent's stores + queue)
    // Then, loads / compiles "Dev Lib" (3 artifacts, 1 dashboard component)
    modulo.argv = new window.URLSearchParams(window.location.search).getAll('argv');
    modulo.config.pathName = window.location.pathname.split('/').pop();
    try { subFS = subFS || window.parent._globalFS; }
    catch (e) { } // Ignore XSS or undefined errors
    for (const fs of modulo.config.modulo.fs || [ 'BUILD', 'CACHE', 'PROC' ]) {
        modulo.stores[fs] = modulo.registry.utils.makeStoreFS(modulo);
    }
    if (subFS && subFS._cache) {
        Object.assign(modulo.stores, subFS); // Override to "parent" FS
        modulo.fetchQueue.data = subFS._cache; // TODO: replace with SRC
    }
    for (const type of modulo.config.modulo.devLoad || [ 'artifact', 'component' ]) {
        const code = modulo.config._dev[type].replace(/\n\s+/gm, '\n');
        modulo.loadString(code, '_' + type); // "_" prefix means dev-only
    }
});

modulo.register('util', function getCommand(modulo) {
      const cmdName = modulo.argv.length > 0 ? modulo.argv[0] : '_default';
      return () => modulo.registry.commands[cmdName](modulo);
});

// Modulo Templating Language: Default Filters, Modes, and Tags
modulo.registry.templateFilters = (function getDefaultFilters () {
    const { get } = modulo.registry.utils;
    const safe = s => Object.assign(new String(s), { safe: true });
    const escapeForRE = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const syntax = (s, arg = 'text') => { // General RegExp language converter
        for (const [ find, sub, sArg ] of modulo.config.syntax[arg]) {
            s = find ? s.replace(find, sub) : filters[sub](s, sArg);
        }
        return s;
    };
    const tagswap = (s, arg) => {
        arg = typeof arg === 'string' ? arg.split(/\s+/) : Object.entries(arg);
        for (const row of arg) { // Loop through each replacement pair
            const [ tag, val ] = typeof row === 'string' ? row.split('=') : row;
            const swap = (a, prefix, suffix) => prefix + val + suffix;
            s = s.replace(RegExp('(</?)' + tag + '(\\s|>)', 'gi'),  swap);
        }
        return safe(s); // Always mark as safe, since for HTML tags
    };
    const escapehtml = text => text && text.safe ? text : (text + '')
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/'/g, '&#x27;').replace(/"/g, '&quot;');
    const filters = {
        add: (s, arg) => s + arg,
        allow: (s, arg) => arg.split(',').includes(s) ? s : '',
        camelcase: s => s.replace(/-([a-z])/g, g => g[1].toUpperCase()),
        capfirst: s => s.charAt(0).toUpperCase() + s.slice(1),
        combine: (s, arg) => s.concat ? s.concat(arg) : Object.assign({}, s, arg),
        default: (s, arg) => s || arg,
        divide: (s, arg) => (s * 1) / (arg * 1), // TODO RM
        divisibleby: (s, arg) => ((s * 1) % (arg * 1)) === 0,
        dividedinto: (s, arg) => Math.ceil((s * 1) / (arg * 1)),
        escapejs: s => JSON.stringify(String(s)).replace(/(^"|"$)/g, ''),
        escape: (s, arg) => s && s.safe ? s : syntax(s + '', arg || 'text'),
        first: s => Array.from(s)[0],
        join: (s, arg) => (s || []).join(arg === undefined ? ", " : arg),
        json: (s, arg) => JSON.stringify(s, null, arg || undefined),
        last: s => s[s.length - 1],
        length: s => s.length !== undefined ? s.length : Object.keys(s).length,
        lower: s => s.toLowerCase(),
        multiply: (s, arg) => (s * 1) * (arg * 1),
        number: (s) => Number(s),
        pluralize: (s, arg) => (arg.split(',')[(s === 1) * 1]) || '',
        size: s => new Blob([ JSON.stringify(s) ]).size - 2, // the -2 is the "" wrapper // TODO RM
        skipfirst: (s, arg) => Array.from(s).slice(arg || 1),
        subtract: (s, arg) => s - arg,
        trim: (s, arg) => s.replace(new RegExp(`^\\s*${ arg = arg ?
            escapeForRE(arg).replace(',', '|') : '|' }\\s*$`, 'g'), ''),
        truncate: (s, arg) => ((s && s.length > arg*1) ? (s.substr(0, arg-1) + '…') : s),
        type: s => s === null ? 'null' : (Array.isArray(s) ? 'array' : typeof s),
        renderas: (rCtx, template) => safe(template.render(rCtx)),
        reversed: s => Array.from(s).reverse(),
        round: (s, arg) => Math.round(s * Math.pow(10, arg)) / Math.pow(10, arg), // TODO RM?
        upper: s => s.toUpperCase(),
        urlencode: (s, arg) => (window[arg ? 'encodeURIComponent' : 'encodeURI'](s)).replace(/#/g, '%23'),
        yesno: (s, arg) => `${ arg || 'yes,no' },,`.split(',')[s ? 0 : s === null ? 2 : 1],
    };
    const { values, keys, entries } = Object;
    const extra = { tagswap, get, safe, values, keys, entries, escapehtml, syntax };
    return Object.assign(filters, extra);
})();

modulo.registry.templateModes = {
    '{%': (text, tmplt, stack) => {
        const tTag = text.trim().split(' ')[0];
        const tagFunc = tmplt.tags[tTag];
        if (stack.length && tTag === stack[stack.length - 1].close) {
            return stack.pop().end; // Closing tag, return it's end code
        } else if (!tagFunc) { // Undefined template tag
            throw new Error(`Unknown template tag "${tTag}": ${text}`);
        } // Normal opening tag
        const result = tagFunc(text.slice(tTag.length + 1), tmplt);
        if (result.end) { // Not self-closing, push to stack
            stack.push({ close: `end${ tTag }`, ...result });
        }
        return result.start || result;
    },
    '{#': (text, tmplt) => false, // falsy values are ignored
    '{{': (text, tmplt) => `OUT.push(G.${ tmplt.unsafe }(${ tmplt.parseExpr(text) }));`,
    text: (text, tmplt) => text && `OUT.push(${JSON.stringify(text)});`,
};

modulo.registry.templateTags = {
    'debugger': () => 'debugger;',
    'if': (text, tmplt) => {
        // Limit to 3 (L/O/R)
        const [ lHand, op, rHand ] = tmplt.parseCondExpr(text);
        const condStructure = !op ? 'X' : tmplt.opAliases[op] || `X ${op} Y`;
        const condition = condStructure.replace(/([XY])/g,
            (k, m) => tmplt.parseExpr(m === 'X' ? lHand : rHand));
        const start = `if (${condition}) {`;
        return { start, end: '}' };
    },
    'else': () => '} else {',
    'elif': (s, tmplt) => '} else ' + tmplt.tags['if'](s, tmplt).start,
    'comment': () => ({ start: "/*", end: "*/"}),
    'include': (text) => `OUT.push(CTX.${ text.trim() }.render(CTX));`,
    'for': (text, tmplt) => {
        // Make variable name be based on nested-ness of tag stack
        const arrName = 'ARR' + tmplt.stack.length;
        const [ varExp, arrExp ] = text.split(' in ');
        let start = `var ${arrName}=${tmplt.parseExpr(arrExp)};`;
        // TODO: Upgrade to for...of loop (after good testing)
        start += `for (var KEY in ${arrName}) {`;
        const [keyVar, valVar] = varExp.split(',').map(s => s.trim());
        if (valVar) {
            start += `CTX.${keyVar}=KEY;`;
        }
        start += `CTX.${valVar ? valVar : varExp}=${arrName}[KEY];`;
        return { start, end: '}'};
    },
    'empty': (text, {stack}) => {
        // Make variable name be based on nested-ness of tag stack
        const varName = 'G.FORLOOP_NOT_EMPTY' + stack.length;
        const oldEndCode = stack.pop().end; // get rid of dangling for
        const start = `${varName}=true; ${oldEndCode} if (!${varName}) {`;
        const end = `}${varName} = false;`;
        return { start, end, close: 'endfor' };
    },
};

modulo.register('command', function build (modulo) {
    modulo._drainQueue();
    modulo.preprocessAndDefine(modulo.cmdCallback, 'BuildCommand');
});

modulo.register('command', function edit ({ argv, fetchQueue, definitions, stores }) {
    const setter = ([ p, d ]) => stores.BUILD.setItem( // Save as bare name
        (/^(\.?\?.*)$/.exec(p) ? location.pathname : p).split(/\//g).pop(), d);
    if (argv[1] === 'new') {
        fetchQueue.data['new-page.html'] = '<script src=Modulo.html></script>' +
            '<script File type=md>---\nfoo:bar\n---\n\n## Lorem Ipsum\n\n\n';
    }
    modulo.repeatProcessors(null, 'BuildCommandBuilders', () => {
        Object.entries(fetchQueue.data).forEach(setter); // Stash deps
        modulo.cmdCallback(0, stores.BUILD.data.log[0][0]); // Open first
    })
});

modulo.register('command', function _default (modulo) { // Show |%| console menu
    const font = 'font-size: 28px; padding:0 8px 0 8px; border:2px solid #000;';
    const names = Object.keys(modulo.registry.commands).filter(s => !s.startsWith('_'));
    const gets = names.map(s => `get ${ s }(){location.href+="?argv=${ s }"}`);
    const aStr = JSON.stringify([ '%c%', font, names.join(', ') ]);
    Function(`console.log(...${ aStr },new (class {${ gets.join('\n') }}))`)();
    modulo.cmdCallback(0, false); // default behavior, skip dashboard
});

if (typeof window.document !== 'undefined' && !window.moduloBuild) { // Browser
    modulo.loadFromDOM(window.document.head, null, true); // Blocking head load
    modulo.registry.utils.setupDevLib(modulo); // Loads default devlib
    window.document.addEventListener('DOMContentLoaded', () => {
        modulo.loadFromDOM(window.document.head, null, true); // Deferred head
        modulo.loadFromDOM(window.document.body, null, true); // Deferred body
        modulo.registry.utils.configureStatic(modulo); // Run any default loads
        modulo.preprocessAndDefine(modulo.registry.utils.getCommand(modulo));
    });
} else if (typeof module !== 'undefined') { // Node.js
    module.exports = { modulo, window };
}

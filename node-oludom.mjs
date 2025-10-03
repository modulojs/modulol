import { readFileSync, writeFileSync } from 'node:fs'
import { Browser, BrowserPage, WindowFrame } from '../src/window.mjs'

// Generic CLI adapter for OluDOM

// Gather files; read, note FRAMES
const READ = {}
const WRITE = {}
const FRAMES = []
let count = 0
for (let url of process.argv) {
    if (url.endsWith('node') && url === process.argv[0]
        || (url.endsWith('node-oludom.mjs') && url === process.argv[1])) {
        continue;
    }
    if (url.includes('?')) {
        FRAMES.push(url)
        url = url.replace(/\?.*$/, '') // rm ?..
    } else if (url.startsWith('_')) {
        WRITE[url] = true
        continue
    }
    try { // NOTE: Requires readFileSync to exist
        READ[url] = readFileSync(url, 'utf8')
    } catch (e) {
        console.error('Oludom Cannot Read ERROR:', url);
        console.error(e)
    }
}

// Create interceptor function
function beforeSyncRequest(opts) {
    let { url } = opts.request
    if (url.includes('?')) {
        url = url.replace(/\?.*$/, '')
    }
    if (url in READ) {
        return { body: READ[url] }
    } else {
        console.log('Oludom Failed Request ERROR:', url);
        console.log('HINT: Try with:')
        console.log('    ', ...process.argv, url)
        return { body: null };
    }
}

// Function to save data after a page ends
function syncStore(pathPrefix, data) {
    for (let [ pathSuffix, value ] of Object.entries(data)) {
        //console.log('Wants to write to:', pathPrefix + pathSuffix, value)
        pathSuffix = pathSuffix.replace('..', './.')
        writeFileSync(pathPrefix + pathSuffix, value)
    }
}

if (!FRAMES.length) {
    console.log('ERROR, no file to execute: At least one argument must have a "?"')
    console.log('HINT: Example Usage:')
    console.log('    ', ...process.argv, 'Modulo.html?')
    console.log('    ', ...process.argv, 'index.html?')
    console.log('    ', ...process.argv, 'index.html?argv=build _build/ **/*.*')
} else {
    // Start browser, open FRAMES
    const options = { interceptor: { beforeSyncRequest } }; // TODO:Change to"files"
    options.argv = process.argv; // expose process argv for helpful errors
    const browser = new Browser(options)
    for (const file of FRAMES) {
        const page = await browser.newPage(); // create new
        await page.goto(file); // navigate to arg
        await page.waitUntilComplete()

        // Now, checks for writable
        const cli = page.mainFrame.window.modulo ||
                    page.mainFrame.window.HTMLCLI;
        if (cli && cli.stores) {
            for (const [ key, store ] of Object.entries(cli.stores)) {
                if (key.toUpperCase() === key && WRITE[`_${ key.toLowerCase() }/`]) {
                    syncStore(`_${ key.toLowerCase() }/`, store.data.fdata)
                }
            }
        }
    }
}

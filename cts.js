window.CTS = (function() {
    'use strict';
    var CTS = {}
        , options = {
                show: 'always', //
                windowErrors: true,
                pos: 'bottom'
            }
        , consoleShowing = false
        , consoleEl
        , logBody
    ;

    function newEl(tag, opt) {
        tag = tag || 'div';
        var el = document.createElement(tag);
        for (var prop in opt) {
            if (prop.hasOwnProperty) {
                if (prop === 'style') {
                    for (var styleProp in opt[prop]) {
                        el[prop][styleProp] = opt[prop][styleProp];
                    }
                }
                el[prop] = opt[prop];
            }
        }
        return el;
    }

    function renderLine(args) {
        if (!consoleShowing) {
            showConsole();
        }
        var msg = '', i;
        for (i = 0; i < args.length; i++) {
         msg += args[i];
         if (i < args.length - 1) {
             msg += ' ';
         }
        }
        logBody.innerHTML += '<p> > ' + msg + '</p>';
    }

    function overrideConsoleLog() {
        var originalConsole = console.log;

        console.log = function () {
            renderLine(arguments);
            // TODO: convert objects to pretty JSON strings.
            Function.prototype.apply.call(originalConsole, console, arguments);

        };
    }

    function init(opt) {
        if (opt) { options = opt; }

        consoleEl = newEl('div', {
            id: 'console-panel',
            style: {
                'position': 'fixed',
                'display': 'none',
                'left': '0',
                'right': '0',
                'bottom': '0',
                'height': '30%',
                'padding': '10px',
                'background': '#111',
                'font-family': 'monospace',
                'font-size': '12px',
                'line-height': '14px',
                'color': '#eee',
                'overflow': 'auto',
                'box-shadow': '0px -2px 10px rgba(0, 0, 0, 0.5)',
                'z-index': '9999'
            }
        });

        overrideConsoleLog();

        consoleEl.textContent = 'I am your console. Ready when you are...';
        document.getElementsByTagName('body')[0].appendChild(consoleEl);

        logBody = newEl('div', {id: 'log'});
        consoleEl.appendChild(logBody);

        showConsole();
    }

    function showConsole() {
        consoleEl.style.display = 'block';
        consoleShowing = true;
    }

    function hideConsole() {
        consoleEl.style.display = 'none';
        consoleShowing = false;
    }

    function setOption(prop, val) {
        options[prop] = val;
    }

    function setOptions(opt) {
        for (var prop in opt) {
            if (prop.hasOwnProperty) {
                options[prop] = opt[prop];
            }
        }
    }

    // CTS.renderLine = renderLine;
    CTS.showConsole = showConsole;
    CTS.hideConsole = hideConsole;
    CTS.setOption  = setOption;
    CTS.setOptions = setOptions;
    CTS.init       = init;

    return CTS;
})();

/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react'),
    options = {
        show: 'always',
        windowErrors: true,
        pos: 'bottom'
    },
    consoleShowing = false,
    consoleEl,
    logBody,
    line = 1,
    style = {
        'position': 'fixed',
        'display': 'none',
        'left': '0',
        'right': '0',
        'bottom': '-2',
        'height': '20%',
        'padding': '10px',
        'background': '#111',
        'backfaceVisibility': 'hidden',
        'WebkitOverflowScrolling': 'touch',
        'fontFamily': 'monospace',
        'fontSize': '12px',
        'lineHeight': '14px',
        'color': '#eee',
        'overflow': 'auto',
        'boxShadow': '0px -2px 10px rgba(0, 0, 0, 0.5)',
        'zIndex': '9999'
    };

var ScreenConsole = React.createClass({

    componentDidMount: function() {
        consoleEl = this.getDOMNode();
        logBody = this.refs.logBody.getDOMNode();

        this.overrideConsoleLog();
        this.showConsole();
    },

    renderLine: function(args) {
        if (!consoleShowing) {
            this.showConsole();
        }

        var msg = '', i;

        for (i = 0; i < args.length; i++) {
            msg += args[i];

            if (i < args.length - 1) {
                msg += ' ';
            }
        }

        logBody.innerHTML += '<pre>' + line + ': ' + msg + '</pre>';
        line++;
        consoleEl.scrollTop = 999999;
    },

    overrideConsoleLog: function() {
        var originalConsole = console.log;
        var self = this;

        console.log = function () {
            self.renderLine(arguments);
            Function.prototype.apply.call(originalConsole, console, arguments);
        };
    },

    showConsole: function() {
        consoleEl.style.display = 'block';
        consoleShowing = true;
    },

    hideConsole: function() {
        consoleEl.style.display = 'none';
        consoleShowing = false;
    },

    setOption: function(prop, val) {
        options[prop] = val;
    },

    setOptions: function(opt) {
        for (var prop in opt) {
            if (prop.hasOwnProperty) {
                options[prop] = opt[prop];
            }
        }
    },

    render: function() {
        return (
            <div style={style}>
                Console ready...
                <div ref="logBody"></div>
            </div>
        );
    }

});

module.exports = ScreenConsole;

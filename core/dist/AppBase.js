"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stage_1 = require("./Stage");
const React = require("react");
const ReactDom = require("react-dom");
;
class AppBase {
    constructor() {
        this.stt = {
            cwd: './Work/test/',
            cmnH: 200,
            fld: {
                nm: '',
                aElm: [],
            },
            mnuOpen: (pic) => console.log(`mnuOpen pic:%o`, pic),
            mnuShow: (pic) => console.log(`mnuShow pic:%o`, pic),
            mnuTrash: (pic) => console.log(`mnuTrash pic:%o`, pic),
        };
        document.addEventListener('DOMContentLoaded', () => this.update(), false);
        this.load_db();
    }
    path_db() { return './db.json'; }
    nothing_db() { }
    load_db() {
        fetch(this.path_db())
            .then(res => {
            if (res.ok)
                return res.json();
            if (res.status == 404)
                this.nothing_db();
            throw new Error(`load "${this.path_db()}" err:${res.statusText}`);
        })
            .then((oDB) => {
            if (oDB) {
                Object.assign(this.stt, oDB);
                this.replace_db();
            }
            this.update();
        })
            .catch(err => {
            if (err == 'TypeError: Failed to fetch') {
                this.nothing_db();
                return;
            }
            console.error(err);
        });
    }
    replace_db() { this.stt.cwd = '/test/'; }
    update() {
        ReactDom.render(React.createElement(Stage_1.Stage, { stt: this.stt }), document.getElementById('main'));
    }
}
exports.AppBase = AppBase;
//# sourceMappingURL=AppBase.js.map
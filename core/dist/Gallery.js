"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const path = require('path');
const react_lazyload_1 = require("react-lazyload");
const GifPlayer = require('react-gif-player');
;
;
class Gallery extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.idx_rmenu = 0;
        this.initCtxmnu = () => {
            this.ctxmnu = document.getElementById('ctxmnu');
            this.cls = this.ctxmnu.classList;
            const w = window;
            this.mdlTrash = w['M'].Modal.init(document.getElementById('mdlTrash'), {
                onCloseStart: () => this.mdlTrash_Cmn()
            });
            this.initCtxmnu = () => {
                const ret = this.cls.contains('show');
                this.cls.remove('show');
                return ret;
            };
            return this.initCtxmnu();
        };
        this.mdlTrash_Cmn = () => { };
        document.body.addEventListener('click', () => this.initCtxmnu());
        document.body.addEventListener('contextmenu', () => this.initCtxmnu());
    }
    render() {
        const s = this.props.stt;
        const aElm = s.fld.aElm;
        const a = aElm.map((v, idx) => this.renderElm(s, v, idx));
        a.push(React.createElement("div", { id: "ctxmnu", key: ":ctxmnu" },
            React.createElement("ul", { className: "collection" },
                React.createElement("li", null,
                    React.createElement("a", { className: "collection-item", onClick: () => {
                            this.cls.remove('show');
                            s.mnuOpen(aElm[this.idx_rmenu]);
                        } }, "\u958B\u304F")),
                React.createElement("li", null,
                    React.createElement("a", { className: "collection-item", onClick: () => {
                            this.cls.remove('show');
                            s.mnuShow(aElm[this.idx_rmenu]);
                        } }, "Finder\u3067\u958B\u304F")),
                React.createElement("li", null,
                    React.createElement("a", { className: "collection-item", onClick: e => {
                            this.mdlTrash.open();
                            const mnuCls = e.currentTarget.classList;
                            mnuCls.add('active');
                            this.choiceImg.classList.add('card-panel');
                            this.mdlTrash_Cmn = () => {
                                this.cls.remove('show');
                                mnuCls.remove('active');
                                this.choiceImg.classList.remove('card-panel');
                            };
                        } }, "\u30B4\u30DF\u7BB1\u306B\u6368\u3066\u308B\u2026")))));
        a.push(React.createElement("div", { id: "mdlTrash", key: ":mdlTrash", className: "modal" },
            React.createElement("div", { className: "modal-content" },
                React.createElement("h4", null, "\u30B4\u30DF\u7BB1\u306B\u6368\u3066\u307E\u3059\u304B\uFF1F")),
            React.createElement("div", { className: "modal-footer" },
                React.createElement("a", { onClick: () => {
                        s.mnuTrash(aElm[this.idx_rmenu]);
                    }, className: "modal-close waves-effect waves-green btn pulse" }, "\u6368\u3066\u308B"),
                React.createElement("a", { className: "modal-close waves-effect waves-green btn-flat" }, "Cancel"))));
        return a;
    }
    renderElm(s, v, idx) {
        if ('aElm' in v) {
            const cwd = s.cwd;
            s.cwd = s.cwd + v.nm;
            const a = v.aElm.map((v2, idx2) => this.renderElm(s, v2, idx2));
            s.cwd = cwd;
            return React.createElement("span", { key: v.nm }, a);
        }
        let he;
        switch (path.extname(v.nm).slice(1)) {
            case 'mp4':
            case 'mov':
            case 'webm':
                he =
                    React.createElement("video", { src: s.cwd + v.nm, "data-idx": idx, controls: true, width: v.width / v.height * s.cmnH, height: s.cmnH, onContextMenu: e => this.evRClick(e) });
                break;
            case 'gif':
                he =
                    React.createElement(GifPlayer, { gif: s.cwd + v.nm, "data-idx": idx, width: v.width / v.height * s.cmnH, height: s.cmnH });
                break;
            default: he =
                React.createElement("img", { src: s.cwd + v.nm, "data-idx": idx, width: v.width / v.height * s.cmnH, height: s.cmnH, onClick: e => this.evClick(e), onContextMenu: e => this.evRClick(e) });
        }
        return React.createElement(react_lazyload_1.default, { key: v.nm, once: true }, he);
    }
    evClick(e) {
        if (this.initCtxmnu())
            return;
        const w = window;
        const me = e.currentTarget;
        const p = w['M'].Materialbox.init(me, { onCloseEnd: () => p.destroy() });
        p.open();
    }
    evRClick(e) {
        if (this.initCtxmnu())
            return;
        const posX = e.pageX;
        const posY = e.pageY;
        this.ctxmnu.style.left = posX + 'px';
        this.ctxmnu.style.top = posY + 'px';
        this.cls.add('show');
        this.choiceImg = e.currentTarget;
        this.idx_rmenu = Number(this.choiceImg.dataset.idx);
    }
}
exports.Gallery = Gallery;
//# sourceMappingURL=Gallery.js.map
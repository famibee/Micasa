"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppBase_1 = require("./AppBase");
const fs = require('fs');
class AppMain extends AppBase_1.AppBase {
    constructor() {
        super();
        this.cntMv = 1;
        const shell = require('electron').shell;
        this.stt.mnuOpen = (pic) => shell.openItem(this.stt.cwd + pic.nm);
        this.stt.mnuShow = (pic) => shell.showItemInFolder(this.stt.cwd + pic.nm);
        this.stt.mnuTrash = (pic) => shell.moveItemToTrash(this.stt.cwd + pic.nm);
    }
    path_db() {
        return '/Users/ugai/Documents/MacHD2/_Famibee/Micasa/db.json';
    }
    nothing_db() {
        require('electron').remote.dialog.showOpenDialog({
            title: '管理するフォルダを選択',
            message: '管理するフォルダを選択',
            defalutPath: '.',
            buttonLabel: '選択',
            properties: ['openDirectory'],
        }, (filePaths) => {
            if (filePaths)
                this.make_db(filePaths[0] + '/');
        });
    }
    make_db(path) {
        this.cntMv = 1;
        this.db = {
            cwd: path,
            cmnH: 200,
            fld: {
                nm: '',
                aElm: [],
            },
        };
        this.make_db_fld(path, this.db.fld);
        this.write_db();
    }
    write_db() {
        if (--this.cntMv > 0)
            return;
        fs.writeFileSync(this.path_db(), JSON.stringify(this.db));
        super.load_db();
    }
    ;
    make_db_fld(path, fld) {
        const m_path = require('path');
        const sizeOf = require('image-size');
        const a = fld.aElm;
        fs.readdirSync(path).map((nm) => {
            if (nm.charAt(0) == '.')
                return;
            const st = fs.statSync(path + nm);
            if (st.isDirectory()) {
                const fld1 = {
                    nm: fld.nm + nm + '/',
                    aElm: [],
                };
                const fld2 = a[a.push(fld1) - 1];
                this.make_db_fld(path + nm + '/', fld2);
                return;
            }
            switch (m_path.extname(nm).slice(1)) {
                case 'mp4':
                case 'mov':
                case 'webm':
                    ++this.cntMv;
                    const mov = { nm: nm, width: 10, height: 10 };
                    const i = a.push(mov) - 1;
                    const elm = document.createElement('video');
                    elm.onloadedmetadata = () => {
                        const mov2 = a[i];
                        mov2.width = elm.videoWidth;
                        mov2.height = elm.videoHeight;
                        this.write_db();
                    };
                    elm.src = path + nm;
                    elm.load();
                    break;
                default:
                    const d = sizeOf(path + nm);
                    const pic = { nm: nm, width: d.width, height: d.height };
                    a.push(pic);
            }
        });
    }
    replace_db() { }
}
exports.AppMain = AppMain;
//# sourceMappingURL=AppMain.js.map
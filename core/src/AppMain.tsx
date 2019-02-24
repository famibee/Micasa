/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {AppBase, dbMicasa} from './AppBase';

import {infPic, infFld} from './Gallery';

const fs = require('fs');

export class AppMain extends AppBase {
	protected	path_db() {
		return '/Users/ugai/Documents/MacHD2/_Famibee/Micasa/db.json';	// TODO: いずれ適切に
	}

	constructor() {
		super();

		const shell = require('electron').shell;
		this.stt.mnuOpen = (pic: infPic)=> shell.openItem(this.stt.cwd + pic.nm);
		this.stt.mnuShow = (pic: infPic)=> shell.showItemInFolder(this.stt.cwd + pic.nm);
		this.stt.mnuTrash = (pic: infPic)=> shell.moveItemToTrash(this.stt.cwd + pic.nm);
	}

	protected nothing_db() {
		require('electron').remote.dialog.showOpenDialog({
			title		: '管理するフォルダを選択',
			message		: '管理するフォルダを選択',
			defalutPath	: '.',	// 最初に表示するパス
			buttonLabel	: '選択',	// 選択ボタンに表示する文字列
			properties	: ['openDirectory'],	// ダイアログの機能
		}, (filePaths?: String[])=> {
			if (filePaths) this.make_db(filePaths[0] +'/');
		});
	}
	private make_db(path: string) {
		this.cntMv = 1;
		this.db = {
			cwd	: path,
			cmnH: 200,
			fld	: {
				nm		: '',
				aElm	: [],
			},
		};

		this.make_db_fld(path, this.db.fld);
		this.write_db();
	}
	private db: dbMicasa;
	private write_db() {
		if (--this.cntMv > 0) return;
		fs.writeFileSync(this.path_db(), JSON.stringify(this.db));
		super.load_db();
	};
	private cntMv = 1;
	private make_db_fld(path: string, fld: infFld) {
		const m_path = require('path');
		const sizeOf = require('image-size');
		const a = fld.aElm;
		fs.readdirSync(path).map((nm: string)=> {
			if (nm.charAt(0) == '.') return;
			const st = fs.statSync(path + nm);
			if (st.isDirectory()) {
				const fld1: infFld = {
					nm		: fld.nm + nm +'/',
					aElm	: [],
				};
				const fld2: infFld = a[a.push(fld1) -1] as infFld;
				this.make_db_fld(path + nm +'/', fld2);
				return;
			}

	//console.log(`fn:AppMain nm:${nm} ext:${m_path.extname(nm).slice(1)}`);
			switch (m_path.extname(nm).slice(1)) {
				case 'mp4':
				case 'mov':
				case 'webm':
					++this.cntMv;
					const mov: infPic = {nm: nm, width: 10, height: 10};
					const i = a.push(mov) -1;
					const elm = document.createElement('video');
					elm.onloadedmetadata = ()=> {
						const mov2: infPic = a[i] as infPic;
						mov2.width = elm.videoWidth;
						mov2.height = elm.videoHeight;
						this.write_db();
					};
					elm.src = path + nm;
					elm.load();
					break;

				default:
					const d = sizeOf(path + nm);
					const pic: infPic = {nm: nm, width: d.width, height: d.height};
					a.push(pic);
			}
		});
	}

	protected replace_db() {}
}

/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Stage, sttStage} from './Stage';
import {infPic, infFld} from './Gallery';

import * as React from "react";
import * as ReactDom from "react-dom";

export interface dbMicasa {
	cwd		: string;
	cmnH	: number;
	fld		: infFld;
};

export class AppBase {
	protected	path_db() {return './db.json';}
	protected	stt: sttStage = {
		cwd: './Work/test/',
		cmnH: 200,
		fld	: {
			nm		: '',
			aElm	: [],
		},
		mnuOpen	: (pic: infPic)=> console.log(`mnuOpen pic:%o`, pic),
		mnuShow	: (pic: infPic)=> console.log(`mnuShow pic:%o`, pic),
		mnuTrash: (pic: infPic)=> console.log(`mnuTrash pic:%o`, pic),
	};

	constructor() {
		document.addEventListener('DOMContentLoaded',()=> this.update(), false);
		this.load_db();
	}

	protected nothing_db() {}

	protected load_db() {
		fetch(this.path_db())
		.then(res=> {
			if (res.ok) return res.json();
			if (res.status == 404) this.nothing_db();
			throw new Error(`load "${this.path_db()}" err:${res.statusText}`);
		})
		.then((oDB: dbMicasa)=> {
			if (oDB) {Object.assign(this.stt, oDB); this.replace_db();}
			this.update();
		})
		.catch(err=> {
			if (err == 'TypeError: Failed to fetch') {
				this.nothing_db();
				return;
			}
			console.error(err);
		});
	}
	protected replace_db() {this.stt.cwd = '/test/';}

	private update() {
//		this.update = ()=> {};

		ReactDom.render(
			<Stage stt={this.stt} />,
			document.getElementById('main'),
		);
	}
}

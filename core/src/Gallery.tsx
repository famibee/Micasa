/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {sttStage} from './Stage';

import * as React from "react";
const path = require('path');
import LazyLoad from 'react-lazyload';
const GifPlayer = require('react-gif-player');

export interface infPic {
	nm		: string;
	width	: number;
	height	: number;
};

export interface infFld {
	nm		: string;
	aElm	: infElm[];
};

export type infElm = infPic | infFld;

export class Gallery extends React.Component<{stt: sttStage;}, {}> {
	constructor(props: any, context: any) {
		super(props, context);

		document.body.addEventListener('click', ()=> this.initCtxmnu());
		document.body.addEventListener('contextmenu', ()=> this.initCtxmnu());
	}

	render() {
		const s: sttStage = this.props.stt;
		const aElm = s.fld.aElm;
		const a = aElm.map((v, idx)=> this.renderElm(s, v, idx));

		// 右クリックメニュー
		a.push(<div id="ctxmnu" key=":ctxmnu"><ul className="collection">
			<li><a className="collection-item" onClick={()=> {
				this.cls.remove('show'); s.mnuOpen(aElm[this.idx_rmenu] as infPic);
			}}>開く</a></li>
			<li><a className="collection-item" onClick={()=> {
				this.cls.remove('show'); s.mnuShow(aElm[this.idx_rmenu] as infPic);
			}}>Finderで開く</a></li>
			<li><a className="collection-item" onClick={e=> {
				this.mdlTrash.open();
				const mnuCls = e.currentTarget.classList;
				mnuCls.add('active');
				this.choiceImg.classList.add('card-panel');
				this.mdlTrash_Cmn = ()=> {
					this.cls.remove('show');
					mnuCls.remove('active');
					this.choiceImg.classList.remove('card-panel');
				}
			}}>ゴミ箱に捨てる…</a></li>
		</ul></div>);

		// モーダルダイアログ
		a.push(<div id="mdlTrash" key=":mdlTrash" className="modal">
			<div className="modal-content"><h4>ゴミ箱に捨てますか？</h4></div>
			<div className="modal-footer">
				<a onClick={()=> {
					s.mnuTrash(aElm[this.idx_rmenu] as infPic);
				}} className="modal-close waves-effect waves-green btn pulse">捨てる</a>
				<a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
			</div>
		</div>);

		return a;
	}
	private renderElm(s: sttStage, v: infElm, idx: number): JSX.Element {
		if ('aElm' in v) {
			const cwd = s.cwd;
			s.cwd = s.cwd + v.nm;
			const a = v.aElm.map((v2, idx2)=> this.renderElm(s, v2, idx2));
			s.cwd = cwd;
			return <span key={v.nm}>{a}</span>;
		}

		let he: JSX.Element;
		switch (path.extname(v.nm).slice(1).toLowerCase()) {
			case 'mp4':
			case 'mov':
			case 'webm':	he =
				<video src={s.cwd + v.nm} data-idx={idx} controls
					width={v.width/v.height*s.cmnH} height={s.cmnH}
					onContextMenu={e=> this.evRClick(e)}/>
				break;

			case 'gif':	he =
				<GifPlayer gif={s.cwd + v.nm} data-idx={idx}
					width={v.width/v.height*s.cmnH} height={s.cmnH}
					onContextMenu={(e: any)=> this.evRClick(e)}/>;
				break;

			case 'psd':	he =	// TODO: いずれはPSDサポート
				<img src='' title={s.cwd + v.nm}/>
				break;

			case 'bmp':
			case 'jpeg':
			case 'jpg':
			case 'png':
			case 'webp':	he =
			<img src={s.cwd + v.nm} data-idx={idx}
					width={v.width/v.height*s.cmnH} height={s.cmnH}
					onClick={e=> this.evClick(e)}
					onContextMenu={e=> this.evRClick(e)}/>;
				break;

			default:	return <span>title={s.cwd + v.nm}</span>;
		}
		return <LazyLoad key={v.nm} once>{he}</LazyLoad>;
	}

	private evClick(e: any) {
		if (this.initCtxmnu()) return;

		const w: any = window;
		const me = e.currentTarget;
		const p = w['M'].Materialbox.init(me, {onCloseEnd: ()=> p.destroy()});
		p.open();
	}
	private evRClick(e: any) {
		if (this.initCtxmnu()) return;

		const posX = e.pageX -pageXOffset;
		const posY = e.pageY -pageYOffset;
		this.ctxmnu.style.left = posX +'px';
		this.ctxmnu.style.top = posY +'px';
		this.cls.add('show');

		this.choiceImg = e.currentTarget;
		this.idx_rmenu = Number(this.choiceImg.dataset.idx);
	}
	private choiceImg	: HTMLElement;
	private	idx_rmenu = 0;

	private initCtxmnu = (): Boolean=> {
		this.ctxmnu = document.getElementById('ctxmnu')!;
		this.cls = this.ctxmnu.classList;

		const w: any = window;
		this.mdlTrash = w['M'].Modal.init(document.getElementById('mdlTrash'), {
			onCloseStart: ()=> this.mdlTrash_Cmn()
		});

		this.initCtxmnu = ()=> {
			const ret = this.cls.contains('show');
			this.cls.remove('show');
			return ret;
		};
		return this.initCtxmnu();
	}
	private ctxmnu	: HTMLElement;
	private cls		: DOMTokenList;
	private mdlTrash	: any;
	private mdlTrash_Cmn = ()=> {};
}

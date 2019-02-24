/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import * as React from "react";
import {Gallery, infFld, infPic} from './Gallery';

export interface sttStage {
	cwd		: string;
	cmnH	: number;
	fld		: infFld;

	mnuOpen	: (pic: infPic)=> void;
	mnuShow	: (pic: infPic)=> void;
	mnuTrash: (pic: infPic)=> void;
};

export class Stage extends React.Component<{stt: sttStage;}, {}> {
	render() {
		return <div className="row">
			<div className="col s2">
				side bar
			</div>
			<div className="col s10">
				<Gallery stt={this.props.stt} />
			</div>
		</div>;
	}
}

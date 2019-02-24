import * as React from "react";
import { infFld, infPic } from './Gallery';
export interface sttStage {
    cwd: string;
    cmnH: number;
    fld: infFld;
    mnuOpen: (pic: infPic) => void;
    mnuShow: (pic: infPic) => void;
    mnuTrash: (pic: infPic) => void;
}
export declare class Stage extends React.Component<{
    stt: sttStage;
}, {}> {
    render(): JSX.Element;
}

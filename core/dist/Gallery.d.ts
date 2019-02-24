import { sttStage } from './Stage';
import * as React from "react";
export interface infPic {
    nm: string;
    width: number;
    height: number;
}
export interface infFld {
    nm: string;
    aElm: infElm[];
}
export declare type infElm = infPic | infFld;
export declare class Gallery extends React.Component<{
    stt: sttStage;
}, {}> {
    constructor(props: any, context: any);
    render(): JSX.Element[];
    private renderElm;
    private evClick;
    private evRClick;
    private choiceImg;
    private idx_rmenu;
    private initCtxmnu;
    private ctxmnu;
    private cls;
    private mdlTrash;
    private mdlTrash_Cmn;
}

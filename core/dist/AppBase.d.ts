import { sttStage } from './Stage';
import { infFld } from './Gallery';
export interface dbMicasa {
    cwd: string;
    cmnH: number;
    fld: infFld;
}
export declare class AppBase {
    protected path_db(): string;
    protected stt: sttStage;
    constructor();
    protected nothing_db(): void;
    protected load_db(): void;
    protected replace_db(): void;
    private update;
}

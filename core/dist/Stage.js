"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Gallery_1 = require("./Gallery");
;
class Stage extends React.Component {
    render() {
        return React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col s2" }, "side bar"),
            React.createElement("div", { className: "col s10" },
                React.createElement(Gallery_1.Gallery, { stt: this.props.stt })));
    }
}
exports.Stage = Stage;
//# sourceMappingURL=Stage.js.map
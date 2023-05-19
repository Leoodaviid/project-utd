"use strict";
exports.__esModule = true;
exports.Input = void 0;
exports.Input = function (_a) {
    var id = _a.id, label = _a.label, type = _a.type;
    return (React.createElement("div", { className: "relative" },
        React.createElement("input", { type: type, id: id, className: "block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1", placeholder: " " }),
        React.createElement("label", { htmlFor: id, className: "absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3" }, label)));
};

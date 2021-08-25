import {
    data
} from "../data.js";

export default ((e, ord) => {
    let entries = Object.entries(data.point);

    function __init__() {
        _setActiveCell();
    }

    function _createElem() {
        const e = document.createElement('span');

        e.id = 'text';
        e.style.cssText = `
            font: 600 2vmin 'Fira Sans', sans-serif;
            text-transform: uppercase;
            text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.7);
            color: #fff;
        `;
        e.textContent = entries[ord][0];

        return e;
    }

    function _setActiveCell() {
        e.currentTarget.append(_createElem());
        e.currentTarget.style.background = `${entries[ord][1]}`;
        e.currentTarget.setAttribute('empty', false);
        data.clicked.push(entries[ord][0]);
    }

    __init__();
})
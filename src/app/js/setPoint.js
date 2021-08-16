import {
    data
} from "../data.js";

export default ((e, ind) => {
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
        e.textContent = entries[ind][0];

        return e;
    }

    function _setActiveCell() {
        e.currentTarget.append(_createElem());
        e.currentTarget.style.background = `${entries[ind][1]}`;
        e.currentTarget.setAttribute('empty', false);
        data.wasClicked = entries[ind][0];
    }

    __init__();
})
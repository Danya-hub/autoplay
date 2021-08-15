
import {
    data
} from "../data.js";
import _setView from "./setView.js";
import _setObstacle from "./setObstacle.js";

export default (() => {
    data.point = {
        start: '#ff4646',
        finish: '#00e700',
    }

    let entries = Object.entries(data.point);

    function __init__() {
        _setListener();
    }

    function _createElem(ind) {
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

    function _setListener() {
        data.view = {},
            Object.keys(data.point).forEach(key => data.view[key] = {});

        let n = 0;
        data.cell.forEach((cell, ord) => cell.addEventListener('click', (e, i = ord) => {
            if (entries.length <= n) return;
            e.currentTarget.append(_createElem(n));
            e.currentTarget.style.background = `${entries[n][1]}`;
            e.currentTarget.setAttribute('empty', false);
            data.wasClicked = entries[n][0];

            _setView(i);
            _setObstacle();
            n++;
        }));
    }

    __init__();
})
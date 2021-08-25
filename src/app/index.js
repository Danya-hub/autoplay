'use strict';

import {
    data
} from "./data.js";

import _setPlatform from "./js/setPlatform.js";
import _setPoint from "./js/setPoint.js";
import _setView from "./js/setView.js";
import _findNearDir from "./js/findNearDir.js";
import _setRandPath from "./js/setRandPath.js";

_setPlatform();

let point = Object.entries(data.point);
data.view = {},
    point.forEach(e => data.view[e[0]] = {});
data.clicked = [];

let n = 0;
data.cell.forEach((cell, ord) => cell.addEventListener('click', (e, i = ord) => {
    if (point.length <= n) return;

    _setPoint(e, n);
    _setView(data.view, i);
    n++;

    if (point[point.length - 1][0] != data.clicked[data.clicked.length - 1]) return;
    _findNearDir(data);
    _setRandPath();
}));
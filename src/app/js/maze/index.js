import {
    data
} from "../data.js";

import _setPlatform from "../maze/setPlatform.js";
import _setPoint from "../maze/setPoint.js";
import _setView from "../maze/setView.js";
import _findNearDir from "../maze/findNearDir.js";
import _setRandPath from "../maze/setRandPath.js";

export default () => {
    _setPlatform();

    let point = Object.entries(data.point);

    data.clicked = [],
        data.view = {},
        point.forEach(e => data.view[e[0]] = {});

    let n = 0;
    data.cell.forEach((cell, ord) => cell.addEventListener('click', (e, i = ord) => {
        if (point.length <= n) return;

        _setPoint(e, n);
        _setView(data.view, i, data.corner.mainPoint);
        n++;

        if (point[point.length - 1][0] != data.clicked[data.clicked.length - 1]) return;
        _findNearDir(data);
        _setRandPath();
    }));
}
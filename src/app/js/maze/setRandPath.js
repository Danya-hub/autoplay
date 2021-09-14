import {
    data
} from "../data.js";
import {
    _setBoolen,
    _getElemFromArr,
} from "../common.js";
import _setView from "./setView.js";

export default (() => {
    let path = null,
        view = null;

    function __init__() {
        // _getElemFromArr(Object.values(data.axis).flat(), data.nearDir).forEach(e => _setPath(e))
        _setPath(data.nearDir);
    }

    function _getIndex(_coord) {
        return (_coord.y - 1) * 10 + (_coord.x - 1)
    }

    function _createElem(_obj) {
        let elem = data.cell[_getIndex(_obj)];
        elem.setAttribute('empty', false),
            elem.style.background = '#fff';
        path.push(_obj);
    }

    function _wasFound() {
        let bool = false;
        for (const key in data.view.finish) {
            let entries = data.view.finish[key];
            entries.length ? (!_setBoolen(entries[0].elem.getAttribute('empty')) ? bool = true : null) : null;
        }

        return bool;
    }

    function _hasElemInRange(_elem, _obj) {
        let bool = false;
        for (const key in _obj) {
            let arr = data.corner.waypoints ? _obj[key][0] : _obj[key];
            arr && !bool ? bool = arr.some(obj => obj.elem == _elem && _setBoolen(_elem.getAttribute('empty'))) && 
            arr.every(obj => !(_setBoolen(obj.elem.getAttribute('empty')) && !obj.elem.className) ? !!obj.elem.className : true) : null;
        }

        return bool;
    }

    function _isAvailableTurn(_obj, _dir) {
        let bool = true;
        _obj[_dir][1] ? _obj[_dir][1].forEach(e => !e.elem.isEqualNode(data.view.finish.center.elem) ? (bool ? bool = _setBoolen(e.elem.getAttribute('empty')) : null) : bool = true) : null;

        return bool;
    }

    function _setPath(_dir) {
        path = [],
            view = {};
        _createElem(data.corner.mainPoint ? data.view.start[_dir][0][0] : data.view.start[_dir][0]);

        let unsuitDir = [];
        let isFound = false;
        let n = 0;
        while (!isFound) {
            isFound = _wasFound() || Object.values(data.axis).flat().length == unsuitDir.length;
            if (isFound) return;

            let axis = ['x', 'y'],
                sign = ['+', '-'];
            let detachAxis = _getElemFromArr(axis, axis[Math.round(Math.random())]),
                selectSign = sign[Math.round(Math.random())];

            let coord = {
                [detachAxis[0]]: eval(`${path[n][detachAxis[0]]} ${selectSign} 1`),
                [detachAxis[1]]: path[n][detachAxis[1]],
            }
            _setView(view, _getIndex(path[path.length - 1]), data.corner.waypoints);
            let commDir = data.axis[detachAxis[0]].find(dir => selectSign == '+' ? (dir == 'right' || dir == 'bottom') : (dir == 'left' || dir == 'top'));

            unsuitDir.every(e => e != commDir) ? unsuitDir.push(commDir) : null;
            (!data.corner.waypoints && _hasElemInRange(data.cell[_getIndex(coord)], view) ||
                data.corner.waypoints && (_hasElemInRange(data.cell[_getIndex(coord)], view) && _isAvailableTurn(view, commDir))) ?
            (_createElem(coord), n++, unsuitDir = []) : null;
        }
    }

    __init__();
})
import {
    data
} from "../data.js";
import {
    _setBoolen
} from "../common.js";
import _setView from "./setView.js";

export default (() => {
    let path = null,
        view = null;

    function __init__() {
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

    function _getElemFromArr(_arr, _selectElem) {
        return _arr.concat([_arr.find((e, i) => e == _selectElem ? _arr.splice(i, 1) : null)]); //!
    }

    function _hasElemInRange(_elem, _obj) {
        let bool = false;
        for (const key in _obj) {
            _obj[key].length ? _obj[key].some(obj => _elem == obj.elem ? bool = true : null) : null;
        }

        return bool;
    }

    function _setPath(_dir) {
        path = [],
            view = {};
        _createElem(data.view.start[_dir][0]);

        let isFound = false;
        let n = 0;
        while (!isFound) {
            isFound = _wasFound();
            if (isFound) return;

            let axis = ['x', 'y'],
                sign = ['+', '-'];
            let detachAxis = _getElemFromArr(axis, axis[Math.round(Math.random())]),
                selectSign = sign[Math.round(Math.random())];

            let coord = {
                [detachAxis[0]]: path[n][detachAxis[0]],
                [detachAxis[1]]: eval(`${path[n][detachAxis[1]]} ${selectSign} 1`),
            }
            _setView(view, _getIndex(path[path.length - 1]));

            _hasElemInRange(data.cell[_getIndex(coord)], view) ? (
                _createElem(coord), n++
            ) : null;
        }
    }

    __init__();
})
import {
    data
} from "../data.js";

export default (() => {
    let path = {};

    function __init__() {
        _setPath(data.nearDir);
    }

    function _getIndex(_coord) {
        return (_coord.y - 1) * 10 + (_coord.x - 1)
    }

    function _createElem(_obj, _dir) {
        _obj.elem = data.cell[_getIndex(_obj)];
        _obj.elem.setAttribute('empty', false),
            _obj.elem.style.background = '#fff';
        path[_dir].push(_obj);
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
        return _arr.concat([_arr.find((e, i) => e == _selectElem ? _arr.splice(i, 1) : null)]);
    }

    function _setBoolen(_str) {
        return _str == 'true' ? true : false;
    }

    function _isOutsidePlatform(_obj, _sign) {
        let bool = false;
        for (const key in _obj) _obj[key] > data.row && _sign == '+' || _obj[key] < 1 && _sign == '-' ? bool = true : null;

        return bool;
    }


    function _setPath(_dir) {
        path[_dir] = [];
        _createElem(data.view.start[_dir][0], _dir);

        let isFound = false;
        let n = 0;
        while (!isFound) {
            isFound = _wasFound();
            if (isFound) return;

            let axis = ['x', 'y'],
                sign = ['+', '-'];

            let detachAxis = _getElemFromArr(axis, axis[Math.round(Math.random())]);
            let selectSign = sign[Math.round(Math.random())];
            let obj = {
                [detachAxis[0]]: path[_dir][n][detachAxis[0]],
                [detachAxis[1]]: eval(`${path[_dir][n][detachAxis[1]]} ${selectSign} 1`),
            };
            let isOutside = detachAxis[1] == 'y' ? data.cell[_getIndex(obj)] : detachAxis[1] == 'x' ? !_isOutsidePlatform(obj, selectSign) : false;

            isOutside && _setBoolen(data.cell[_getIndex(obj)].getAttribute('empty')) ? (
                _createElem(obj, _dir), n++
            ) : null;
        }
    }

    __init__();
})
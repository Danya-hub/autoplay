import {
    data
} from "../data.js";
import { _setBoolen } from "../common.js";

export default ((_obj, _index) => {
    function __init__() {
        _hasProperty(_obj, data.clicked[data.clicked.length - 1]).center = {
            elem: data.cell[_index],
            x: _findX(_index),
            y: _findY(_index),
        };

        data.direction.forEach(dir => _getElemFromRange(dir));
    }

    function _hasProperty(_obj, _prop) {
        return _obj[_prop] ? _obj[_prop] : _obj;
    }

    function _findY(_num) {
        return Math.ceil((_num + 1) / data.row);
    }

    function _findX(_num) {
        return data.row - (_findY(_num) * 10 - (_num + 1));
    }

    function _isOutsidePlatform(_num, _dir) {
        let column = _findY(_num) * 10,
            row = column - _num;

        return row == 1 && _dir == 'left' || row == data.row && _dir == 'right';
    }

    function _getElemFromRange(_dir) {
        let wasOutside = false;

        _hasProperty(_obj, data.clicked[data.clicked.length - 1])[_dir] = [];
        for (let i = 1; i <= data.range; i++) {
            let ord = _dir == 'top' ? _index - (i * data.row) : _dir == 'bottom' ? _index + (i * data.row) : _dir == 'left' && !_isOutsidePlatform(_index - i, _dir) ? (_index - i) : (_dir == 'right' && !_isOutsidePlatform(_index + i, _dir) ? (_index + i) : undefined);

            let e = data.cell[ord];
            e == undefined || !_setBoolen(e.getAttribute('empty')) ? wasOutside = true : null,
                wasOutside ? null : _hasProperty(_obj, data.clicked[data.clicked.length - 1])[_dir].push({
                    elem: e,
                    x: _findX(ord),
                    y: _findY(ord),
                });
        }!_hasProperty(_obj, data.clicked[data.clicked.length - 1])[_dir].length ? delete _hasProperty(_obj, data.clicked[data.clicked.length - 1])[_dir] : null;
    }

    __init__();
})
import {
    data
} from "../data.js";
import _setRule from "./setRule.js";

export default ((_index) => {
    function __init__() {
        data.view[data.wasClicked].center = {
            elem: data.cell[_index],
            x: _findX(_index),
            y: _findY(_index),
        };

        _getElemFromRange('top');
        _getElemFromRange('bottom');
        _getElemFromRange('left');
        _getElemFromRange('right');
    }

    function _findY(_num) {
        return Math.ceil((_num + 1) / data.row);
    }

    function _findX(_num) {
        return data.row - (_findY(_num) * 10 - (_num + 1));
    }

    function _isRangeOut(_num, _dir) {
        let column = _findY(_num) * 10,
            ord = column - _num;

        return ord == 1 && _dir == 'left' || ord == data.row && _dir == 'right';
    }

    function _getElemFromRange(_dir) {
        let wasOutside = false;

        data.view[data.wasClicked][_dir] = [];
        for (let i = 1; i <= data.range; i++) {
            let e = data.cell[_dir == 'top' ? _index - (i * data.row) : _dir == 'bottom' ? _index + (i * data.row) : _dir == 'left' && !_isRangeOut(_index - i, _dir) ? (_index - i) : (_dir == 'right' && !_isRangeOut(_index + i, _dir) ? (_index + i) : undefined)];

            e == undefined ? wasOutside = true : null,
                wasOutside ? null : data.view[data.wasClicked][_dir].push(e);
        }

        !data.view[data.wasClicked][_dir].length ? delete data.view[data.wasClicked][_dir] : null;
    }

    __init__();
})
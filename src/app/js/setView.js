import {
    data
} from "../data.js";
import {
    _setBoolen,
    _getAxisFromDir,
    _getElemFromArr,
} from "../common.js";

export default ((_obj, _index, corner) => {
    function __init__() {
        let direction = Object.values(data.axis).flat();
        _hasProperty(_obj, data.clicked[data.clicked.length - 1]).center = _setObject(data.cell[_index], _findX(_index), _findY(_index));

        direction.forEach(dir => _getElemFromRange(dir)); //! нужно совместить 
        direction.forEach(dir => _setCornerView(dir)); //! нужно совместить 
    }

    function _setObject(_elem, _x, _y) {
        return {
            elem: _elem,
            x: _x,
            y: _y,
        }
    }

    function _setCornerView(_dir) {
        let ord = 0;
        data.axis[_getElemFromArr(Object.keys(data.axis), _getAxisFromDir(_dir))[1]].forEach(cornDir => {
            ord = _setOrder(cornDir, _index, 1, _dir == 'left' ? -1 : _dir == 'right' ? 1 : _dir == 'top' ? -data.row : data.row);
            data.view[data.clicked[data.clicked.length - 1]][cornDir].push(_setObject(data.cell[ord], _findX(ord), _findY(ord)));
        });
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

    function _setOrder(_dir, _index, _numRange, _addition = 0) {
        return _dir == 'top' ? _index + _addition - (_numRange * data.row) : _dir == 'bottom' ? _index + _addition + (_numRange * data.row) : _dir == 'left' && !_isOutsidePlatform(_index - _numRange + _addition, _dir) ? (_index - _numRange + _addition) : (_dir == 'right' && !_isOutsidePlatform(_index + _numRange + _addition, _dir) ? (_index + _numRange + _addition) : undefined);
    }

    function _getElemFromRange(_dir) {
        let wasOutside = false;
        _hasProperty(_obj, data.clicked[data.clicked.length - 1])[_dir] = [];
        for (let i = 1; i <= data.range; i++) {
            let ord = _setOrder(_dir, _index, i);

            let e = data.cell[ord];
            e == undefined || !_setBoolen(e.getAttribute('empty')) ? wasOutside = true : null,
                wasOutside ? null : _hasProperty(_obj, data.clicked[data.clicked.length - 1])[_dir].push(_setObject(e, _findX(ord), _findY(ord)));
        }!_hasProperty(_obj, data.clicked[data.clicked.length - 1])[_dir].length ? delete _hasProperty(_obj, data.clicked[data.clicked.length - 1])[_dir] : null;
    }

    __init__();
})
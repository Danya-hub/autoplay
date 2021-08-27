import {
    data
} from "./data.js";

export function _setBoolen(_str) {
    return _str == 'true' ? true : false;
}

export function _getAxisFromDir(_dir) {
    let str = '';
    for (const key in data.axis) data.axis[key].forEach(e => e == _dir ? str = key : null);

    return str;
}

export function _getElemFromArr(_arr, _selectValue) {
    return [_arr.find((e, i) => e == _selectValue ? _arr.splice(i, 1) : null), ..._arr];
}
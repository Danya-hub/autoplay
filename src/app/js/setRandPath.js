import {
    data
} from "../data.js";

export default (() => {
    let arr = [];

    function __init__() {
        _setPath(data.nearDir);

        // console.log(data);
    }

    function _getIndex(_coord) {
        return (_coord.y - 1) * 10 + (_coord.x - 1)
    }

    function _createElem(_obj) {
        _obj.elem = data.cell[_getIndex(_obj)];
        _obj.elem.setAttribute('empty', false),
            _obj.elem.style.background = '#fff';
        arr.push(_obj);
    }

    function _wasFound() {
        let found = false;
        for (const key in data.view.finish) {
            let entries = data.view.finish[key];
            entries.length ? entries.forEach(obj => !_setBoolen(obj.elem.getAttribute('empty')) ? bool = true : null) : null;
        }

        return found;
    }

    function _getElemFromArr(_arr, _selectElem) {
        return [_arr.find((e, i) => e == _selectElem ? _arr.splice(i, 1) : null), _arr];
    }

    function _setBoolen(_str) {
        return _str == 'true' ? true : false;
    }

    function _setPath(_dir) {
        _createElem(data.view.start[_dir][0]);
        
        let isFound = false;
        let n = 0;
        while (!isFound) {
            isFound = _wasFound();
            if (isFound) return;

            let axis = ['x', 'y'],
                sign = ['+', '-'];
            let rand = Math.round(Math.random());

            let distrAxis = _getElemFromArr(axis, axis[rand]);
            let obj = {
                [distrAxis[0]]: eval(`${arr[n][distrAxis[0]]} ${sign[rand]} 1`),
                [distrAxis[1]]: arr[n][distrAxis[1]],
            };

            data.cell[_getIndex(obj)] && _setBoolen(data.cell[_getIndex(obj)].getAttribute('empty')) ? (_createElem(obj), n++) : null;
        }
    }

    __init__();
})
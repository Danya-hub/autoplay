import {
    data
} from "../data.js";

export default ((_index) => {
    let arr = [];
    let point = Object.entries(data.point);

    function __init__() {
        data.view[data.wasClicked].center = {
            elem: data.cell[_index],
            x: _findX(_index),
            y: _findY(_index),
        };

        data.direction.forEach(dir => _getElemFromRange(dir));
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
            let ord = _dir == 'top' ? _index - (i * data.row) : _dir == 'bottom' ? _index + (i * data.row) : _dir == 'left' && !_isRangeOut(_index - i, _dir) ? (_index - i) : (_dir == 'right' && !_isRangeOut(_index + i, _dir) ? (_index + i) : undefined);

            let e = data.cell[ord];
            e == undefined ? wasOutside = true : null,
                wasOutside ? null : data.view[data.wasClicked][_dir].push({
                    elem: e,
                    x: _findX(ord),
                    y: _findY(ord),
                });
        }!data.view[data.wasClicked][_dir].length ? delete data.view[data.wasClicked][_dir] : null;

        point[point.length - 1][0] == data.wasClicked ? _findNearDir(_dir) : null;
    }

    function _findNearDir(_dir) {
        let coordAxis = data.view.start[_dir][data.view.start[_dir].length - 1],
            coordCenter = data.view.finish.center;

        arr.push(Math.sqrt(Math.pow((coordCenter.x - coordAxis.x), 2) + Math.pow((coordCenter.y - coordAxis.y), 2)));
        arr.find((num, i) => num == Math.min(...arr) ? data.nearDir = data.direction[i] : null);
    }

    __init__();
})
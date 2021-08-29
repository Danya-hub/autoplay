import { data } from "../data.js";

export default ((_obj) => {
    let point = {};
    let center = _obj.view.finish.center;
    
    for (const key in _obj.view.start) {
        if (!_obj.view.start[key].length) continue;
        let lastPoint = (data.corner.mainPoint ? _obj.view.start[key][0] : _obj.view.start[key])[_obj.view.start[key].length - 1];
        lastPoint ? point[key] = Math.sqrt(Math.pow((center.x - lastPoint.x), 2) + Math.pow((center.y - lastPoint.y), 2)) : null;
    }

    Object.values(point).find((num, i) => num == Math.min(...Object.values(point)) ? _obj.nearDir = Object.keys(point)[i] : null);
})
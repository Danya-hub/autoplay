export default ((_obj) => {
    let point = {};
    let centerPoint = _obj.view.finish.center;
    
    for (const key in _obj.view.start) {
        if (!_obj.view.start[key].length) continue;
        let lastPoint = _obj.view.start[key][_obj.view.start[key].length - 1];
        point[key] = Math.sqrt(Math.pow((centerPoint.x - lastPoint.x), 2) + Math.pow((centerPoint.y - lastPoint.y), 2));
    }

    Object.values(point).find((num, i) => num == Math.min(...Object.values(point)) ? _obj.nearDir = Object.keys(point)[i] : null);
})
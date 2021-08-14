import {
    data
} from "../data.js";

export default (() => {
    data.cell = [];
    data.sizeOfParent = Math.min(document.body.clientWidth, document.body.clientHeight) * 0.8;
    data.sizeOfcell = data.sizeOfParent / data.row;

    function __init__() {
        data.platform = _createElem();
        _setCell(data.platform);

        document.body.append(data.platform);
    }

    function _setCell(parent) {
        for (let i = 0; i < (data.row * data.row); i++) {
            const e = document.createElement('div');
            e.setAttribute('empty', true);
            e.id = i;
            e.style.cssText = `
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0);
                width: ${data.sizeOfcell}px;
                height: ${data.sizeOfcell}px;
            `;

            parent.append(e);
            data.cell.push(e);
        }
    }

    function _createElem() {
        let e = document.createElement('div');
        e.id = 'platform';
        e.style.cssText = `
            position: absolute;
            display: flex;
            flex-wrap: wrap;
            box-shadow: inset 0px 0px 0px 2px rgba(0, 0, 0);
            width: ${data.sizeOfParent}px;
            height: ${data.sizeOfParent}px;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
            cursor: pointer;
        `;

        return e;
    }

    __init__();
})
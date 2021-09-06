import {
    data
} from "../data.js";

export default (() => {
    function __init__() {
        data.platform = _createPlatform(),
            data.cell = [];

        _createCell();
        document.body.append(data.platform);
    }

    function _createCell() {
        for (let i = 0; i < (data.row * data.row); i++) {
            const e = document.createElement('div');
            e.setAttribute('empty', true);
            e.id = i;
            e.style.cssText = `
                display: flex;
                justify-content: center;
                align-items: center;
                background: #000; 
                box-shadow: inset 0px 0px 0px 1px rgba(255, 255, 255);
                width: ${data.sizeOfCell}px;
                height: ${data.sizeOfCell}px;
            `;

            data.platform.append(e);
            data.cell.push(e);
        }
    }

    function _createPlatform() {
        let e = document.createElement('div');
        e.id = 'platform';
        e.style.cssText = `
            position: absolute;
            display: flex;
            flex-wrap: wrap;
            box-shadow: 0px 0px 0px 1px rgba(0, 0, 0);
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
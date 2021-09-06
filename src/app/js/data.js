export const data = {
    axis: {
        x: ['left', 'right'],
        y: ['top', 'bottom'],
    },
    point: {
        start: '#ff4646',
        finish: '#00e700',
    },
    corner: {
        mainPoint: false,
        waypoints: true,
    },
    row: 10,
    range: 2,
    _setCompute: function () {
        this.sizeOfParent = Math.min(document.body.clientWidth, document.body.clientHeight) * 0.8,
            this.sizeOfCell = this.sizeOfParent / this.row;
    }
}

data._setCompute();
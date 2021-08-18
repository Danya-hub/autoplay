export const data = {
    direction: ['top', 'bottom', 'left', 'right'],
    point: {
        start: '#ff4646',
        finish: '#00e700',
    },
    row: 10,
    range: 2,
}

function settings() {
    data.sizeOfParent = Math.min(document.body.clientWidth, document.body.clientHeight) * 0.8,
        data.sizeOfCell = data.sizeOfParent / data.row;
}

settings();
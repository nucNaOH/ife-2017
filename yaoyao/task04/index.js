/**
 * 常量
 */
const N = 10
const directions = [
    {x: -1, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 0, y: -1}
]
/**
 * panel对象
 */
const panel = {
    width: 0,
    dom: [],
    init: function (n) {
        this.width = n
        return this
    },
    /**
     * 生成DOM，并缓存
     */
    createDOM: function () {
        const table = document.getElementById('table')

        for (let i = 0; i < this.width + 1; i++) {
            const tr = document.createElement('tr')
            const tmp = []
            for (let j = 0; j < this.width + 1; j++) {
                const td = document.createElement('td')
                if (j === 0 && i !== 0) {
                    td.textContent = i;
                }
                if (i === 0 && j !== 0) {
                    td.textContent = j;
                }
                tr.appendChild(td)
                if (j !== 0 && i !== 0) {
                    tmp.push(td)
                }
            }
            table.appendChild(tr)
            if (i !== 0) {
                this.dom.push(tmp)
            }
        }
        return this
    }
}


/**
 * cobe对象
 */
const cube = {
    panel: null,
    head: null,
    body: null,
    pos : { x: 5, y: 5 },
    // 方向 ==> 0:up, 1:right, 2:down, 3:left
    direction: 0,
    init () {
        this.body = document.createElement('div')
        this.body.className = 'cube'
        this.head = document.createElement('div')
        this.head.className = 'head'
        this.body.appendChild(this.head)
        return this
    },
    bind (panel) {
        this.panel = panel
        return this
    },
    draw () {
        const n = Math.floor(Math.random() * N)
        this.pos = { x: n, y: n }
        this.panel.dom[this.pos.x][this.pos.y].appendChild(this.body)
    },
    turnLeft () {
        this.direction = (this.direction + 4 - 1) % 4
        this.body.style.transform = 'rotate(' + this.direction * 90 + 'deg)'
    },
    turnRight () {
        this.direction = (this.direction + 4 + 1) % 4
        this.body.style.transform = 'rotate(' + this.direction * 90 + 'deg)'
    },
    turnBack () {
        this.direction = (this.direction + 4 + 2) % 4
        this.body.style.transform = 'rotate(' + this.direction * 90 + 'deg)'
    },
    go () {
        this.panel.dom[this.pos.x][this.pos.y].removeChild(this.body)
        const x = this.pos.x + directions[this.direction].x
        const y = this.pos.y + directions[this.direction].y
        if (x < N && x >= 0 && y < N && y >= 0) {
            this.pos.x = x
            this.pos.y = y
        }
        this.panel.dom[this.pos.x][this.pos.y].appendChild(this.body)
    },
    doCommond (commond) {
        switch (commond) {
            case 'TUN LEF':
                this.turnLeft()
                break;
            case 'TUN RIG':
                this.turnRight()
                break;
            case 'TUN BAC':
                this.turnBack()
                break;
            case 'GO':
                this.go()
                break;
            default:
                break;
        }
    }
}
/**
 * 页面加载完毕
 */
window.onload = function () {
    // init
    panel.init(N).createDOM()
    cube.init().bind(panel).draw()
    // form
    const form = document.getElementById('form')
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        const input = document.getElementById('commond')
        const commond = input.value.toUpperCase()
        cube.doCommond(commond)
        input.select()
    })
    // keyup
    // window.addEventListener('keyup', function (event) {
    //     switch (event.keyCode) {
    //         case 37:
    //             cube.turnLeft()
    //             break;
    //         case 38:
    //             cube.go()
    //             break;
    //         case 39:
    //             cube.turnRight()
    //             break;
    //         case 40:
    //             cube.turnBack()
    //             break;
    //         default:
    //             break;
    //     }
    // })
}

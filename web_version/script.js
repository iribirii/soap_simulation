const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = canvas.getBoundingClientRect().width
canvas.height = canvas.getBoundingClientRect().height

class Player {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
    draw () {
        c.beginPath()
        c.arc(this.x, this.y, this.r, 0, Math.PI*2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

const player = new Player(canvas.width / 2, canvas.height / 2, 30, 'white')
player.draw()

console.log(canvas, player)


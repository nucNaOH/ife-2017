/**
 * 轮播图。 
 * 
 * defaultOption = { timeout: 2000, animation: slide }
 * 
 * @param {any} dom 
 * @param {any} option 
 */
function Carousel (dom, option) {
    const defaultOption = { duration: '2s', animation: 'slide', interal: 3000, autoSwith: true }

    this.dom = dom
    this.option = defaultOption

    this.currentItem = 0
    this.autoPalyInterval = null

    this.initDOM()
    this.start()
}

Carousel.prototype.initDOM = function () {
    this.items = this.dom.querySelectorAll('.carousel-item')
    this.flags = this.dom.querySelectorAll('.carousel-flag-item')
}

Carousel.prototype.start = function () {
    this[this.option.animation + 'Mode']()
    this.getSwitcher().bind(this)(0)
    if (this.option.autoSwith) {
        this.autoPalyInterval = setInterval(this.getSwitcher().bind(this), this.option.interal)
    }
    this.flags.forEach((d, i)=> {
        d.onclick = (e) => {
            console.log(i, this.getSwitcher().bind(this))
            this.getSwitcher().bind(this)(i)
            if (this.option.autoSwith) {
                clearInterval(this.autoPalyInterval)
                this.autoPalyInterval = setInterval(this.getSwitcher().bind(this), this.option.interal)
            }
        }
    })
}

Carousel.prototype.getSwitcher = function () {
    switch (this.option.animation) {
        case 'fade':
            // this.fadeMode()
            return this.fadeTo
            break;
        case 'slide':
            // this.slideMode()
            return this.slideTo
            break;
        default :
            return
            break;
    }
}
/**
 * slide mode
 */
Carousel.prototype.slideMode = function () {
    this.items.forEach((d, i) => {
        d.style.transform = 'translateX(-960px)'
        if (i === this.currentItem) {
            d.style.left = '960px'
        } else {
            d.style.left = '0px'
        }

        d.style.transition = `transform ${this.option.duration} linear`
        d.style.opacity = 1
    })
}

Carousel.prototype.slideTo = function (index) {
    console.log(index)
    if (index === this.currentItem) return
    
    const cur = this.currentItem
    const nxt = index || (cur + 1) % this.items.length

    this.toggleClass(this.items[cur], 'carousel-active')
    this.toggleClass(this.items[nxt], 'carousel-active')
    
    
    this.items[cur].style.transform += ' translateX(-960px)'
    
    this.items[nxt].style.left = parseInt(this.items[nxt].style.left) + 960 * 2 + 'px'
    this.items[nxt].style.transform += 'translateX(-960px)'

    this.toggleClass(this.flags[cur], 'carousel-flag-active')
    this.toggleClass(this.flags[nxt], 'carousel-flag-active')
    
    this.currentItem = nxt
}

/**
 * fade mode
 */
Carousel.prototype.fadeMode = function () {
    this.items.forEach(d => {
        d.style.transition = `opacity ${this.option.duration}`
    })
}

Carousel.prototype.fadeTo = function (index) {
    if (index === this.currentItem) return
    
    const cur = this.currentItem
    const nxt = index || (cur + 1) % this.items.length

    this.toggleClass(this.items[cur], 'carousel-active')
    this.toggleClass(this.items[nxt], 'carousel-active')

    this.toggleClass(this.flags[cur], 'carousel-flag-active')
    this.toggleClass(this.flags[nxt], 'carousel-flag-active')
    
    this.currentItem = nxt
}

Carousel.prototype.toggleClass = function (dom, name) {
    const classNames = dom.className.split(' ')
    if (classNames.indexOf(name) === -1) {
        dom.className += ' ' + name
    } else {
        dom.className = classNames.filter(d => d !== name).join(' ')
    }
}


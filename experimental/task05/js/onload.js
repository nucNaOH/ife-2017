window.onload = function () {
    window.carousel = new Carousel(document.querySelector('.carousel'), {
        duration: '1s',
        autoSwitch: true,
        animation: 'slide',
        interval: 3000
    })
}
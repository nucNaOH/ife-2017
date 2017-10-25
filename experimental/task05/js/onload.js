window.onload = function () {
    window.carousel = new Carousel(document.querySelector('.carousel'), {
        duration: '2s',
        autoSwitch: true,
        animation: 'slide',
        interval: 4000
    })
}
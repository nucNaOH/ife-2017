function modal(el, conf) {
    this.el = document.querySelector(el);
    this.conf = this.getConfig(conf)
    this.setConfig();
}

modal.prototype.getConfig = function (conf) {
    const _default_config = {
        draggable: true,
        resizeble: true,
    }
    const config = {};
    for (var c in _default_config) {
        config[c] = conf[c] ? conf[c] : _default_config[c];
    }
    return config;
}

modal.prototype.setConfig = function () {
    if (this.conf.resizeble) {
        this.el.querySelector('.modal-dialog').className += ' resizable';
    }
    if (this.conf.draggable) {
        const modalHeader = this.el.querySelector('.modal-header');
        const modalDialog = this.el.querySelector('.modal-dialog');
        modalHeader.setAttribute('draggable', true);
        modalHeader.className += ' draggable';
        let offsetX, offsetY;
        modalHeader.addEventListener('dragstart', e => {
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            e.dataTransfer.dropEffect = "none"
        })
        modalHeader.addEventListener('drag', e => {
            const rect = modalDialog.getBoundingClientRect();

            modalDialog.style.left = (e.clientX - offsetX + rect.width/2) + 'px';
            modalDialog.style.top = (e.clientY - offsetY + rect.height/2) + 'px';
        })
        this.el.addEventListener('dragover', e => {
            e.preventDefault();
        })
    }
}

/**
 * 
 * 校验规则：
 * 1.字符数为4~16位
 * 2.每个英文字母、数字、英文符号长度为1
 * 3.每个汉字，中文符号长度为2
 */
const FormValidate = function (dom) {
    this.dom = dom;
    this._input = this.dom.querySelector('input');
    this._btn = this.dom.querySelector('.validate-btn');
    this._info = this.dom.querySelector('.validate-info');
    // event
    this._btn.addEventListener('click', event => {
        this.validate();
        return false;
    }, false);
}

FormValidate.prototype.validate = function () {
    const result = this._check();
    console.log(result);
    if (result.success) {
        this._input.className = ' success';
        this._info.className = 'validate-info success';
        this._info.textContent = result.msg;
    } else {
        this._input.className = ' error';
        this._info.className = 'validate-info error';
        this._info.textContent = result.msg;
    }
}

FormValidate.prototype._check = function () {
    const len = this._getLength(this._input.value);
    if (len === 0) {
        return { success: false, msg: '名称不能为空' };
    } else if (len < 4 || len > 16) {
        return { success: false, msg: '长度必须为4-16个字符' };
    } else {
        return { success: true, msg: '名称格式正确' }
    }
}

FormValidate.prototype._getLength = function (str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        const s = str[i];
        // 中文unicode范围：\u4E00-\u9FA
        if (/[\u4E00-\u9FA5]/.test(s)) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}

const formItems = document.querySelectorAll('.form-item').forEach(item => {
    new FormValidate(item);
});

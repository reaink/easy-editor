function EasyEditor (obj) {
  this.init(obj)
}

EasyEditor.constructor = EasyEditor;

EasyEditor.prototype = {
  init (obj) {
    this.data = {};
    //存储数据到this.data
    for (let item of Object.entries(obj)) {
      this.data[item[0]] = item[1];
    }
    this.el = document.querySelector(this.data.el);
    //设置编辑区
    this.el.addEventListener('mousedown', () => {
      //创建内容区
      this.editor = this.creEl('div');
      this.editor.setAttribute('contentEditable', 'true');
      this.editor.setAttribute('class', 'es-line');
      this.el.appendChild(this.editor);
      this.editCont(this.editor);
      this.reSet(this.editor);
    })
  },
  reSet (el) {
    //离开当前内容前检测是否为空
    el.addEventListener('blur', () => {
      isNotCont = el.innerText;      
      if(!isNotCont) {
        this.removeEl(el);
      }
      
    })
  },
  editCont (el) {
    el.addEventListener('mousedown', (ev) => {
      ev = ev || event;
      ev.stopPropagation();
      console.log('a');
      
    })
  },
  removeEl (el) {
    el.parentNode.removeChild(el);
  },
  creEl (el) {
    return document.createElement(el);
  }
}
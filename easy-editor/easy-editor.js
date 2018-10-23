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
    //获取 并 设置editor
    this.editor = this.seEl(this.data.el);
    this.editor.style.display = 'none';

    //创建并插入iframe
    this.iframe = this.creEl('iframe');
    this.iframe.style.width = this.data.width;
    this.iframe.style.height = this.data.height;
    this.iframe.frameBorder = 0;
    this.editor.parentNode.insertBefore(this.iframe, this.editor);
    //插入设置
    this.createControl();
    //获取并设置iframeDocument
    this.iframeDoc = this.iframe.contentDocument;
    this.iframeDoc.designMode = 'on';
    this.iframeDoc.open();
    this.iframeDoc.write('<html><head><style type="text/css">body{ font-family:arial; font-size:14px;background:#DDF3FF }</style></head></html>');
    this.iframeDoc.close();
    
    this.keyUp(this.iframeDoc, [17, 66], () => {
      alert('a')
    })
    
  },
  createControl () {
    var mainCont = this.creEl('div');
    mainCont.style.width = this.data.width;
    mainCont.style.height = '60px';
    mainCont.style.backgroundColor = '#69f';

    this.editor.parentNode.insertBefore(mainCont, this.iframe);
  },
  keyUp (el, kCode, callback) {
    el.onkeyup = (ev) => {
      ev = ev || event;
      var result;
      if (typeof kCode === 'number' && kCode === ev.keyCode) {
        result = true;
      } else if (typeof kCode === 'object') {
        kCode.forEach(val => {
          let result = []
          if (kCode === val) {
            result.push(true)
          } else {

          }
        })
      } else {
        result = false;
      }

      if (result) {
        callback();
      }
    }
  },
  removeEl (el) {
    el.parentNode.removeChild(el);
  },
  creEl (el) {
    return document.createElement(el);
  },
  seEl (el) {
    return document.querySelector(el);
  }
}
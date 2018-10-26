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
    //获取并设置editor
    this.editor = this.seEl(this.data.el);
    this.editor.className = 'es-editor';
    this.editor.style.maxWidth = this.data.width;
    this.editor.style.minHeight = this.data.height;

    //插入设置
    this.createControl();
    //创建iframe
    this.iframe = this.creEl('iframe');
    this.iframe.style.maxWidth = this.data.width;
    this.iframe.style.height = this.editor.offsetHeight - this.seEl('.es-controls').offsetHeight + 'px';
    this.iframe.frameBorder = 0;
    //插入iframe
    this.editor.appendChild(this.iframe);
    //获取并设置iframeDocument
    this.iframeDoc = this.iframe.contentDocument;
    this.iframeDoc.designMode = 'on';
    this.iframeDoc.open();
    this.iframeDoc.write('<html><head><style type="text/css">body{ font-family:arial; font-size:14px;background:#E0E3DA }</style></head><body>青玉案·元夕宋代：辛弃疾东风夜放花千树。更吹落、星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。蛾儿雪柳黄金缕。笑语盈盈暗香去。众里寻他千百度。蓦然回首，那人却在，灯火阑珊处。</body></html>');
    this.iframeDoc.close();
    
    this.keyUp(this.iframeDoc, ['ctrlKey', 66], () => {
      this.iframeDoc.execCommand('bold', false, '');
    })
  },
  //创建功能区，添加功能按钮
  createControl () {
    //颜色按钮创建函数
    function createColorBtn (color, pos) {
      var el = _this.createBtn('', 'button', 'button', 'click', () => {
        _this.iframeDoc.execCommand(pos, false, color);
      })
      el.style.width = el.style.height = '20px';
      el.style.backgroundColor = color;
      return el;
    }
    //主控制区
    var mainCont = this.creEl('div');
    mainCont.className = 'es-controls';
    mainCont.style.width = this.editor.offsetWidth - 10 + 'px';
    mainCont.style.padding = '5px';
    mainCont.style.minHeight = '60px';
    mainCont.style.backgroundColor = '#667';

    //设计模式切换
    var designBtn = this.createBtn('查看', 'button', 'button', 'click', () => {
      if (this.iframeDoc.designMode === 'on') {
        this.iframeDoc.designMode = 'off';
        this.iframeDoc.body.style.backgroundColor = '#eee';
        designBtn.innerText = '设计';
      } else {
        this.iframeDoc.designMode = 'on'
        this.iframeDoc.body.style.backgroundColor = '#E0E3DA';
        designBtn.innerText = '查看';
      }
    })

    //粗体
    var boldBtn = this.createBtn('粗体', 'button', 'button', 'click', () => {
      this.iframeDoc.execCommand('bold', false, '');
    })

    //斜体
    var italicBtn = this.createBtn('斜体', 'button', 'button', 'click', () => {
      this.iframeDoc.execCommand('italic', false, '');
    })

    //字体面板
    var fontPlate = this.creEl('div');
    fontPlate.className = 'es-con';
    fontPlate.style.display = 'none';
    
    function setFontPlatePos (fontPlate) {
      fontPlate.style.left = '90px';
    }
    
    var sizeRange = this.createBtn('', 'input', 'range', 'change', () => {
      sizeRange.setAttribute('type', 'range');
      var size = sizeRange.value;
      this.iframeDoc.execCommand('fontSize', false, size);
    })
    sizeRange.setAttribute('class', 'es-font-change');
    sizeRange.setAttribute('value', 2);
    sizeRange.setAttribute('max', 7);
    sizeRange.setAttribute('min', 1);
    sizeRange.setAttribute('step', 1);

    fontPlate.appendChild(sizeRange);

    //字体按钮
    var fontBtn = this.createBtn('字体', 'button', 'button', 'click', () => {
      if (fontPlate.style.display === 'none') {
        fontPlate.style.display = 'block';
      } else {
        fontPlate.style.display = 'none';
      }
    })

    //颜色面板
    var colorPlate = this.creEl('div');
    colorPlate.className = 'es-con es-con-color';
    colorPlate.style.display = 'none';

    function setColorPlatePos (colorPlate) {
      colorPlate.style.left = '150px';
    }
    var _this = this;
    var blackBtn = createColorBtn('black', 'foreColor');
    var redBtn = createColorBtn('red', 'foreColor');
    var yellowBtn = createColorBtn('yellow', 'foreColor');
    var blueBtn = createColorBtn('blue', 'foreColor');
    var greenBtn = createColorBtn('green', 'foreColor');
    var pinkBtn = createColorBtn('pink', 'foreColor');
    var maroonBtn = createColorBtn('maroon', 'foreColor');
    var orangeBtn = createColorBtn('orange', 'foreColor');
    var cyanBtn = createColorBtn('cyan', 'foreColor');
    var whiteBtn = createColorBtn('white', 'foreColor');

    colorPlate.appendChild(blackBtn);
    colorPlate.appendChild(redBtn);
    colorPlate.appendChild(yellowBtn);
    colorPlate.appendChild(blueBtn);
    colorPlate.appendChild(greenBtn);
    colorPlate.appendChild(pinkBtn);
    colorPlate.appendChild(maroonBtn);
    colorPlate.appendChild(orangeBtn);
    colorPlate.appendChild(cyanBtn);
    colorPlate.appendChild(whiteBtn);

    //颜色按钮
    var colorBtn = this.createBtn('颜色', 'button', 'button', 'click', () => {
      if (colorPlate.style.display === 'none') {
        colorPlate.style.display = 'block';
      } else {
        colorPlate.style.display = 'none';
      }
    })

    //背景面板
    var bgPlate = this.creEl('div');
    bgPlate.className = 'es-con es-con-color';
    bgPlate.style.display = 'none';

    function setBackPlatePos (bgPlate) {
      bgPlate.style.left = '200px';
    }
    var _this = this;
    var blackBtn = createColorBtn('black', 'hiliteColor');
    var redBtn = createColorBtn('red', 'hiliteColor');
    var yellowBtn = createColorBtn('yellow', 'hiliteColor');
    var blueBtn = createColorBtn('blue', 'hiliteColor');
    var greenBtn = createColorBtn('green', 'hiliteColor');
    var pinkBtn = createColorBtn('pink', 'hiliteColor');
    var maroonBtn = createColorBtn('maroon', 'hiliteColor');
    var orangeBtn = createColorBtn('orange', 'hiliteColor');
    var cyanBtn = createColorBtn('cyan', 'hiliteColor');
    var whiteBtn = createColorBtn('white', 'hiliteColor');

    bgPlate.appendChild(blackBtn);
    bgPlate.appendChild(redBtn);
    bgPlate.appendChild(yellowBtn);
    bgPlate.appendChild(blueBtn);
    bgPlate.appendChild(greenBtn);
    bgPlate.appendChild(pinkBtn);
    bgPlate.appendChild(maroonBtn);
    bgPlate.appendChild(orangeBtn);
    bgPlate.appendChild(cyanBtn);
    bgPlate.appendChild(whiteBtn);

    //背景按钮
    var bgBtn = this.createBtn('背景', 'button', 'button', 'click', () => {
      if (bgPlate.style.display === 'none') {
        bgPlate.style.display = 'block';
      } else {
        bgPlate.style.display = 'none';
      }
    })


    //链接按钮
    var linkBtn = this.createBtn('链接', 'button', 'button', 'click', () => {
      var href = prompt('请输入链接地址：');
      this.iframeDoc.execCommand('createLink', false, href);
    })



    
    //本项目地址
    var originBtn = this.createBtn('项目', 'button', 'button', 'click', () => {
      window.open('https://gitee.com/nshu/EasyEditor');
    })


    mainCont.appendChild(designBtn);
    mainCont.appendChild(boldBtn);
    mainCont.appendChild(italicBtn);
    mainCont.appendChild(fontBtn);
    //添加设置字体面板、按钮
    fontBtn.parentNode.appendChild(fontPlate);
    setFontPlatePos(fontPlate);
    //添加设置颜色面板、按钮
    mainCont.appendChild(colorBtn);
    colorBtn.parentNode.appendChild(colorPlate);
    setColorPlatePos(colorPlate);
    //添加设置背景面板、按钮
    mainCont.appendChild(bgBtn);
    bgBtn.parentNode.appendChild(bgPlate);
    setBackPlatePos(bgPlate);
    mainCont.appendChild(linkBtn);
    mainCont.appendChild(originBtn);

    this.editor.appendChild(mainCont);
  },
  /**
   * 创建按钮
   * @param {string} txt 元素文本
   * @param {string} tag 元素标签名称
   * @param {string} method 按钮格式
   * @param {string} trigger 触发模式
   * @param {function} fn 按钮函数
   */
  createBtn (txt, tag, method, trigger, fn) {
    var el = this.creEl(tag);
    el.innerText = txt;
    el.className = 'es-contrl-btn';
    el.setAttribute('type', method);
    el.addEventListener(trigger, fn);
    return el;
  },
  /**
   * el 元素
   * kCode num || arr [ctrlKey/altKey/shiftKey, number]
   * callback
   */
  keyUp (el, kCode, callback) {
    if (typeof kCode === 'number' && kCode === ev.keyCode) {
      callback();
    } else if (typeof kCode === 'object') {
      el.onkeyup = ev => {
        ev = ev || event;
        ev.preventDefault();
        var ctrl = '';
        
        if (kCode[0] === 'ctrlKey') {
          ctrl = ev.ctrlKey;
        } else if (kCode[0] === 'altKey') {
          ctrl = ev.altKey;
        } else {
          ctrl = ev.shiftKey;
        }

        if (kCode[1] === ev.keyCode && ctrl) {
          callback();
        }
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
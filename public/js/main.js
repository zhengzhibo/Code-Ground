Split(["#left-container", "#right-container"], {
  gutterSize: 3,
  cursor: "col-resize"
});
Split(["#html-container", "#js-container"], {
  direction: "vertical",
  sizes: [50, 50],
  gutterSize: 3,
  cursor: "row-resize"
});
Split(["#css-container", "#preview-container"], {
  direction: "vertical",
  sizes: [50, 50],
  gutterSize: 3,
  cursor: "row-resize"
});

require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.16.2/min/vs" } });

var editor = {
  signin: function () {
    PopupCenter('/login', '', 1000, 700);
  },
  signout: function () {
    axios.get('/api/user/logout')
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  run: function () {
    document.getElementsByName('title')[0].value = document.getElementsByName('setting-title')[0].value
    document.getElementsByName('cssLinks')[0].value = document.getElementsByName('setting-cssLinks')[0].value
    document.getElementsByName('jsLinks')[0].value = document.getElementsByName('setting-jsLinks')[0].value

    document.getElementsByName('js')[0].value = editor.jsEditor.getValue();
    document.getElementsByName('css')[0].value = editor.cssEditor.getValue();
    document.getElementsByName('html')[0].value = editor.htmlEditor.getValue();
    document.getElementById('preview-form').submit();
  },
  save: function (fork) {
    var id = document.getElementsByName('id')[0].value;
    if (id && !fork) {
      axios.put('/api/code/' + id, {
        title: document.getElementsByName('setting-title')[0].value,
        cssLinks: document.getElementsByName('setting-cssLinks')[0].value,
        jsLinks: document.getElementsByName('setting-jsLinks')[0].value,
        js: editor.jsEditor.getValue(),
        css: editor.cssEditor.getValue(),
        html: editor.htmlEditor.getValue(),
      })
        .then(function (res) {
          toast('success!');
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      axios.post('/api/code/', {
        title: document.getElementsByName('setting-title')[0].value,
        cssLinks: document.getElementsByName('setting-cssLinks')[0].value,
        jsLinks: document.getElementsByName('setting-jsLinks')[0].value,
        js: editor.jsEditor.getValue(),
        css: editor.cssEditor.getValue(),
        html: editor.htmlEditor.getValue(),
      })
        .then(function (res) {
          toast('success!');
          setTimeout(function() {
            window.location.href ='/code/' + res.data.id;
          }, 1000)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  fork: function() {
    editor.save(true);
  },
  settings: function () {
    rootEl.classList.add('is-clipped');
    document.getElementById('settings-modal').classList.add('is-active')
  }
}

var rootEl = document.documentElement;
var $modals = getAll('.modal');
var $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button, .modal-close-button');

if ($modalCloses.length > 0) {
  $modalCloses.forEach(function ($el) {
    $el.addEventListener('click', function () {
      closeModals();
    });
  });
}

function closeModals() {
  rootEl.classList.remove('is-clipped');
  $modals.forEach(function ($el) {
    $el.classList.remove('is-active');
  });
}

document.addEventListener('keydown', function (event) {
  var e = event || window.event;
  if (e.keyCode === 27) {
    closeModals();
    closeDropdowns();
  }
});

function PopupCenter(url, title, w, h) {
  // Fixes dual-screen position                         Most browsers      Firefox
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
  var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var systemZoom = width / window.screen.availWidth;
  var left = (width - w) / 2 / systemZoom + dualScreenLeft
  var top = (height - h) / 2 / systemZoom + dualScreenTop
  var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);

  // Puts focus on the newWindow
  if (window.focus) newWindow.focus();
}

require(["vs/editor/editor.main"], function () {
  editor.htmlEditor = monaco.editor.create(document.getElementById("html-container"), {
    value: document.getElementsByName('html')[0].value,
    language: "html",
    theme: "vs-dark",
    minimap: { enabled: false },
    automaticLayout: true,
    contextmenu: false
  });
  editor.jsEditor = monaco.editor.create(document.getElementById("js-container"), {
    value: document.getElementsByName('js')[0].value,
    theme: "vs-dark",
    language: "javascript",
    minimap: { enabled: false },
    automaticLayout: true,
    contextmenu: false
  });
  editor.cssEditor = monaco.editor.create(document.getElementById("css-container"), {
    value: document.getElementsByName('css')[0].value,
    theme: "vs-dark",
    language: "css",
    minimap: { enabled: false },
    automaticLayout: true,
    contextmenu: false
  });
  
  if (document.getElementsByName('id')[0].value) {
    editor.run();
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = getAll('.navbar-burger');
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }

  document.getElementsByName('setting-title')[0].value = document.getElementsByName('title')[0].value
  document.getElementsByName('setting-cssLinks')[0].value = document.getElementsByName('cssLinks')[0].value
  document.getElementsByName('setting-jsLinks')[0].value = document.getElementsByName('jsLinks')[0].value

  getAll('.command')[0].addEventListener('keydown', function(event) {
    if (event.keyCode == 13 && event.target.value.trim() !== '') {
      let action = event.target.value.trim();
      if(action[0] == '>') {
        //run command
        var commandFunc = editor[action.slice(1)];
        if (typeof commandFunc == 'function') {
          commandFunc();
        }
      } else if (action[0] == '@') {
        //at user
      }
    }
  })
});

var clickables = getAll('[do]')

for (var i = 0; i < clickables.length; i++) {
  var clickable = clickables[i];
  clickable.addEventListener('click', function () {
    if (this.attributes.do.value) {
      editor[this.attributes.do.value].call(this)
    }
  })
}

// utils
function getAll(selector) {
  return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}

function toast(message, type) {
  bulmaToast.toast({
    message: message,
    type: "is-" + (type || 'info'),
    dismissible: true,
    pauseOnHover: true,
    position: 'top-center',
    animate: {
      in: 'fadeIn',
      out: 'fadeOut'
    }
  });
}

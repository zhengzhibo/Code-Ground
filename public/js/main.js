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

require.config({ paths: { vs: "monaco-editor/min/vs" } });
require.config({
  'vs/nls': {
    availableLanguages: {
      '*': 'de'
    }
  }
});

var editor = {
  signin: function () {
    PopupCenter('/user/login', '', 1000, 700);
  },
  signout: function () {
    axios.get('/user/logout')
    .then(function(res) {
      window.location.reload();
    })
    .catch(function(error) {
      console.log(error)
    })
  },
  run: function () {
    document.getElementsByName('js')[0].value = editor.jsEditor.getValue();
    document.getElementsByName('css')[0].value = editor.cssEditor.getValue();
    document.getElementsByName('html')[0].value = editor.htmlEditor.getValue();
    document.getElementById('preview-form').submit();
  },
  settings: function() {
    document.getElementById('settings-modal').classList.add('is-active')
  }
}

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
    value: "",
    language: "html",
    theme: "vs-dark",
    minimap: { enabled: false },
    contextmenu: false
  });
  editor.jsEditor = monaco.editor.create(document.getElementById("js-container"), {
    value: "",
    theme: "vs-dark",
    language: "javascript",
    minimap: { enabled: false },
    contextmenu: false
  });
  editor.cssEditor = monaco.editor.create(document.getElementById("css-container"), {
    value: "",
    theme: "vs-dark",
    language: "css",
    minimap: { enabled: false },
    contextmenu: false
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
});

var clickables = document.querySelectorAll('[do]')

for (var i = 0; i < clickables.length; i++) {
  var clickable = clickables[i];
  clickable.addEventListener('click', function () {
    if (this.attributes.do.value) {
      editor[this.attributes.do.value].call(this)
    }
  })
}
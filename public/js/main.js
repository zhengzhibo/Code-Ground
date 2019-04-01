Split(["#left-container", "#right-container"], {
  gutterSize: 2,
  cursor: "col-resize"
});
Split(["#html-container", "#js-container"], {
  direction: "vertical",
  sizes: [50, 50],
  gutterSize: 2,
  cursor: "row-resize"
});
Split(["#css-container", "#preview-container"], {
  direction: "vertical",
  sizes: [50, 50],
  gutterSize: 2,
  cursor: "row-resize"
});

require.config({ paths: { vs: "monaco-editor/min/vs" } });
require.config({
  'vs/nls' : {
    availableLanguages: {
      '*': 'de'
    }
  }
});

var editor = {
  login: function() {
    window.open('/user/login');
  },
  run: function() {
    document.getElementsByName('js')[0].value = editor.jsEditor.getValue();
    document.getElementsByName('css')[0].value = editor.cssEditor.getValue();
    document.getElementsByName('html')[0].value = editor.htmlEditor.getValue();

    document.getElementById('preview-form').submit();
  }
}

require(["vs/editor/editor.main"], function() {
  editor.htmlEditor = monaco.editor.create(document.getElementById("html-container"), {
    value: "",
    language: "html",
    theme: "vs-dark",
    minimap: {enabled : false},
    contextmenu: false
  });
  editor.jsEditor = monaco.editor.create(document.getElementById("js-container"), {
    value: "",
    theme: "vs-dark",
    language: "javascript",
    minimap: {enabled : false},
    contextmenu: false
  });
  editor.cssEditor = monaco.editor.create(document.getElementById("css-container"), {
    value: "",
    theme: "vs-dark",
    language: "css",
    minimap: {enabled : false},
    contextmenu: false
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
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
  clickable.addEventListener('click', function() {
    if (this.attributes.do.value) {
      editor[this.attributes.do.value].call(this)
    }
  })
}
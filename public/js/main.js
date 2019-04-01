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

require(["vs/editor/editor.main"], function() {
  var htmlEditor = monaco.editor.create(document.getElementById("html-container"), {
    value: "",
    language: "html",
    theme: "vs-dark",
    minimap: {enabled : false}
  });
  var jsEditor = monaco.editor.create(document.getElementById("js-container"), {
    value: "",
    theme: "vs-dark",
    language: "javascript",
    minimap: {enabled : false}
  });
  var cssEditor = monaco.editor.create(document.getElementById("css-container"), {
    value: "",
    theme: "vs-dark",
    language: "css",
    minimap: {enabled : false}
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
    var doing = this.attributes.do.value;
    if (doing = 'login') {
      window.open('/user/login');
    }
  })
}

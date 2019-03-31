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

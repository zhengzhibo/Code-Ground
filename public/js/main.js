// require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
// require(['vs/editor/editor.main'], function() {
//     var editor = monaco.editor.create(document.getElementById('container'), {
//         value: [
//             'function x() {',
//             '\tconsole.log("Hello world!");',
//             '}'
//         ].join('\n'),
//         language: 'javascript'
//     });
// });

Split(["#a", "#b"], {
  gutterSize: 8,
  cursor: "col-resize"
});
Split(["#c", "#d"], {
  direction: "vertical",
  sizes: [25, 75],
  gutterSize: 8,
  cursor: "row-resize"
});
Split(["#e", "#f"], {
  direction: "vertical",
  sizes: [25, 75],
  gutterSize: 8,
  cursor: "row-resize"
});

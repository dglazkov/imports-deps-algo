import ImportDocument from './import-document';

var a = ImportDocument.createRoot('A');
var b = a.whenNewLinkFound('B');
console.log(a);
console.log(b);
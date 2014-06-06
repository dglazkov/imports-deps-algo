import ImportDocument from './import-document';

var test = ImportDocument.createRoot('A');
console.log(test.url);
test.process('B');
var importDocuments = {};

class Edge {
  constructor(edgeState, dependent, importDocument) {
    this.state = edgeState;
    this.dependent = dependent;
    this.importDocument = importDocument;
  }
}

// FIXME: Figure out how set class variables the right way.
Edge.Reference = 'Reference';
Edge.Unknown = 'Unknown';
Edge.Child = 'Child';


class ImportDocument {
  constructor(url) {
    this.url = url;
    this.imports = [];
    this.dependents = [];
    this.settled = false;
  }

  // called when a new <link rel=import href={url}> in this document is encountered.
  // Name mimics LinkImport::process.
  process(url) {
    var importDocument = importDocuments[url];
    var edgeState = Edge.Unknown;
    if (importDocument) {
      if (importDocument.settled)
        edgeState = Edge.Reference;
    } else {
      importDocument = new ImportDocument(url);    
    }
    var edge = new Edge(edgeState, this, importDocument);
    this.addImport(edge);
    importDocument.addDependent(edge);
  }

  addImport(edge) {
    this.imports.push(edge);
  }

  addDependent(edge) {
    this.dependents.push(edge);
  }

  whenParsingCompleted() {
    return this.whenEdgeStateUpdated();
  }

  whenEdgeStateUpdated() {
    console.log(this.url, 'whenEdgeStateUpdated');
    var hasUnknownImports = this.imports.some(importDocument => importDocument.state == Edge.Unknown);
    if (hasUnknownImports)
      return;

    // FIMXE: continue here! 
  }
}

ImportDocument.create = function(url) {
  var importDocument = new ImportDocument(url);
  importDocuments[url] = importDocument;
  return importDocument;  
}

ImportDocument.createRoot = function(url) {
  return ImportDocument.create(url);
}

export default ImportDocument;

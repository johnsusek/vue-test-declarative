let fs = require('fs');
let parseString = require('xml2js').parseString;

function nameToLowerCase(name){
  return name.toLowerCase();
}

let options = {
  trim: true, 
  explicitChildren: true, 
  preserveChildrenOrder: true, 
  strict: false,
  normalizeTags: true,
  attrNameProcessors: [nameToLowerCase]
};

function parse(fileName, cb) {
  let rawFile = fs.readFileSync(fileName, 'utf8');

  // First we just take the <script> area out since we don't
  // want to deal with passing it through the xml decoder
  let matches = rawFile.match(/<script>(.*)<\/script>/s);
  let scriptData;

  // Might not have a script tag, so allow for that
  if (matches && matches.length && matches.length === 2) {
    scriptData = matches[1].trim();
    rawFile = rawFile.replace(matches[0], '')
  }

  let xmlData = rawFile.trim();
  
  // Next we want to replace our 'fake cdata' <html></html> tags
  xmlData = xmlData.replace(/<html>/g, '<![CDATA[')
  xmlData = xmlData.replace(/<\/html>/g, ']]>')

  parseString(xmlData, options, function (err, parsed) {
    if (err) {
      console.error('Invalid .vuetest file: ', err);
      process.exit(1);  
    }
    else {
      cb(parsed, scriptData);
    }
  });
}

module.exports = {
  parse
}

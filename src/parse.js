let fs = require('fs');
let parseString = require('xml2js').parseString;

// attribute processor function to normalize tag names
function nameToLowerCase(name){
  return name.toLowerCase();
}

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
  
  // <html></html> tags in .vuetest files are secretly just CDATA sections
  xmlData = xmlData.replace(/<html>/g, '<![CDATA[')
  xmlData = xmlData.replace(/<\/html>/g, ']]>')

  // https://www.npmjs.com/package/xml2js#options
  let options = {
    trim: true, 
    explicitChildren: true, 
    preserveChildrenOrder: true, 
    strict: false,
    normalizeTags: true,
    attrNameProcessors: [nameToLowerCase]
  };
    
  parseString(xmlData, options, (err, parsed) => {
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

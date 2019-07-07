let parser = require('fast-xml-parser');
let he = require('he');
let fs = require('fs');

let options = {
  //   attributeNamePrefix : "@_",
  // attrNodeName: "attr", //default is 'false'
  // textNodeName: "#text",
  ignoreAttributes: false,
  //   ignoreNameSpace : false,
  allowBooleanAttributes: true,
  //   parseNodeValue : true,
  //   parseAttributeValue : false,
  //   trimValues: true,
  //   cdataTagName: "__cdata", //default is 'false'
  //   cdataPositionChar: "\\c",
  //   localeRange: "", //To support non english character in tag/attribute values.
  //   parseTrueNumberOnly: false,
  //   attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),//default is a=>a
  //   tagValueProcessor : a => he.decode(a) //default is a=>a
};

function parse(fileName) {
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

  // If there was a validation error, object is returned { err: ... }
  // otherwise 'true' for good validation
  let validationResult = parser.validate(xmlData, options);

  if (validationResult !== true) {
    console.error('Invalid .vuetest file: ', validationResult);
    process.exit(1);
  }

  // Valid - we can safely parse
  let parsed = parser.parse(xmlData, options);

  return [parsed, scriptData]
}

module.exports = {
  parse
}

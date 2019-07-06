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
  // If this file doesn't exist, an exception will be thrown and app will quit,
  // as we want
  let xmlData = fs.readFileSync(fileName, 'utf8')

  // If there was a validation error, object is returned { err: ... }
  // otherwise 'true' for good validation
  let validationResult = parser.validate(xmlData, options);

  if (validationResult !== true) {
    console.error('Invalid .vuetest file: ', validationResult);
    process.exit(1);
  }

  // Valid - we can safely parse
  return parser.parse(xmlData, options);
}

module.exports = {
  parse
}

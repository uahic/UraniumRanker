import { FormControl } from '@angular/forms';

/**
 * @author sellistonball
 */


/**
 * Calculates a check digit for an isin
 * @param {String} code an ISIN code with country code, but without check digit
 * @return {Integer} The check digit for this code
 */
function calcISINCheck(code: string) {
  var conv = '';
  var digits = '';
  var sd = 0;
  // convert letters
  for (var i = 0; i < code.length; i++) {
    var c = code.charCodeAt(i);
    conv += (c > 57) ? (c - 55).toString() : code[i]
  }
  // group by odd and even, multiply digits from group containing rightmost character by 2
  for (var i = 0; i < conv.length; i++) {
    digits += (parseInt(conv[i]) * ((i % 2) == (conv.length % 2 != 0 ? 0 : 1) ? 2 : 1)).toString();
  }
  // sum all digits
  for (var i = 0; i < digits.length; i++) {
    sd += parseInt(digits[i]);
  }
  // subtract mod 10 of the sum from 10, return mod 10 of result
  return (10 - (sd % 10)) % 10;
}
function isValidISIN(isin: string) {
  // basic pattern
  const regex = /^(AD|AE|AF|AG|AI|AL|AM|AO|AQ|AR|AS|AT|AU|AW|AX|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BJ|BL|BM|BN|BO|BQ|BR|BS|BT|BV|BW|BY|BZ|CA|CC|CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|CR|CU|CV|CW|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EE|EG|EH|ER|ES|ET|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|GG|GH|GI|GL|GM|GN|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IM|IN|IO|IQ|IR|IS|IT|JE|JM|JO|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|ME|MF|MG|MH|MK|ML|MM|MN|MO|MP|MQ|MR|MS|MT|MU|MV|MW|MX|MY|MZ|NA|NC|NE|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PS|PT|PW|PY|QA|RE|RO|RS|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|SS|ST|SV|SX|SY|SZ|TC|TD|TF|TG|TH|TJ|TK|TL|TM|TN|TO|TR|TT|TV|TW|TZ|UA|UG|UM|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|YE|YT|ZA|ZM|ZW)([0-9A-Z]{9})([0-9])$/;
  const match = regex.exec(isin);
  if (!match || match.length != 4) return false;
  // validate the check digit
  return (match[3] == calcISINCheck(match[1].toString() + match[2].toString()).toString());
}


export function ISINValidator(c: FormControl) {
  return isValidISIN(c.value) ? null : {
    validateISIN: false
  }
}

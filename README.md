# Adxstudio JavaScript Helper
JavaScript helper library for Adxstudio v7.

Adds common functions to help with designing and enhancing Adxstudio forms and pages. Doesn't require jQuery.. for now. If I can manage it. 
Tested against Adxstudio 7.0.0024. I've tried Chrome (a lot), Firefox (some) and IE 11 (a bit). I've had a look on my iPhone 7 and iPad 4. 

Browser/device issue? Please raise as an issue.

Ideas? Requests? Please raise as issues and I will try my best to accomodate you. If you have access to earlier versions, interested on how the testing goes.

## xrt
Root namespace. Nothing to see here - move on!

## adxstudio
Hold all Adxstudio related functions. Used because I have my own other libraries under the xrt namespace.

### forms

Common helpers when building Adxstudio Web Forms. 

#### setVisible
Makes a field visible (or not). You can pass in either a single field name OR an array of field names.
example:
Single field:
xrt.adxstudio.forms.setVisible('firstname', false);

Multi fields:
xrt.adxstudio.forms.setVisible(['firstname', 'lastname'], false);

If the field is the last or only visible field in the row, will also hide to prevent lots of whitespace.

#### setDisabled
Makes a field disabled (or not). You can pass in either a single field name OR an array of field names.
example:
Single field:
xrt.adxstudio.forms.setDisabled('firstname', false);

Multi fields:
xrt.adxstudio.forms.setDisabled(['firstname', 'lastname'], false);

#### setReadOnly
Makes a field read only (or not). You can pass in either a single field name OR an array of field names.
example:
Single field:
xrt.adxstudio.forms.setReadOnly('firstname', false);

Multi fields:
xrt.adxstudio.forms.setReadOnly(['firstname', 'lastname'], false);


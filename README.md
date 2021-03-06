# Dynamics 365 Portals & Adxstudio JavaScript Helper
JavaScript helper library for Dynamics 365 portals and Adxstudio v7.

Adds common functions to help with designing and enhancing Adxstudio forms and pages. Doesn't require jQuery.. for now. If I can manage it. 
Tested against Adxstudio 7.0.0024. I've tried Chrome (a lot), Firefox (some) and IE 11 (a bit). I've had a look on my iPhone 7 and iPad 4. 

Browser/device issue? Please raise as an issue.

Ideas? Requests? Please raise as issues and I will try my best to accomodate you. If you have access to earlier versions, interested on how the testing goes.

## Using with Adxstudio
For Adxstudio, add the file and reference in one of your bundles as you would with any other JavaScript file. You can then reference the `xrt.adxstudio` namespace in your other JavaScript files.

## Using with Dynamics 365 Portals
As things stand at the moment, Dynamics 365 portals does not allow you to add custom JavaScript files. However, you could potentially add this to the masterpage via the 'Tracking Code' content snippet. Alternatively, perhaps more appropriately, use the Custom JavaScript field on the Web Page entity.

## Helpers

#### setVisible
Makes a field visible (or not). You can pass in either a single field name OR an array of field names.
example:

Single field:
```javascript
xrt.adxstudio.forms.setVisible('firstname', false);
```

Multi fields:
```javascript
xrt.adxstudio.forms.setVisible(['firstname', 'lastname'], false);
```

If the field is the last or only visible field in the row, will also hide to prevent lots of whitespace.

#### setDisabled
Makes a field disabled (or not). You can pass in either a single field name OR an array of field names.
example:

Single field:
```javascript
xrt.adxstudio.forms.setDisabled('firstname', false);
```

Multi fields:
```javascript
xrt.adxstudio.forms.setDisabled(['firstname', 'lastname'], false);
```

#### setReadOnly
Makes a field read only (or not). You can pass in either a single field name OR an array of field names.
example:

Single field:
```javascript
xrt.adxstudio.forms.setReadOnly('firstname', false);
```

Multi fields:
```javascript
xrt.adxstudio.forms.setReadOnly(['firstname', 'lastname'], false);
```

### getValue
Retrieves the current value for a field. The returned value depends on the type of the field. Lookups return an object with id, type and display name.

Single field:
```javascript
xrt.adxstudio.forms.getValue('firstname'); //returns 'Rob'
xrt.adxstudio.forms.getValue('lookupid'); //returns object { id: 'guid', name: 'Rob', logicalName: 'contact' }
```

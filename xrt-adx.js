var xrt = xrt || {};
xrt.adxstudio = (function () {
    var elems = [];
    function saveElemDisplayType(elem, altId) {
        for (var ctr = 0; ctr < elems.length; ctr++) {
            var thisElem = elems[ctr];
            if (thisElem.Id !== (elem.id === '' ? altId : elem.id)) {
                continue;
            }
            thisElem.Display = elem.style.display;
            return;
        }
        elems.push({ Id: elem.id === '' ? altId : elem.id, Display: elem.style.display });
    }
    function getPreviousDisplayValue(elem, altId) {
        for (var ctr = 0; ctr < elems.length; ctr++) {
            var thisElem = elems[ctr];
            if (thisElem.Id !== (elem.id === '' ? altId : elem.id)) {
                continue;
            }
            return thisElem.Display;
        }
    }
    function checkForLeftPadding(fieldName, hideParent, parentRow, cells) {
        if (hideParent && parentRow.style.display !== 'none') {
            saveElemDisplayType(parentRow, fieldName + '_parentrow');
            parentRow.style.display = 'none';
        } else if (cells[0].offsetWidth === 0 && cells[0].offsetHeight === 0 && cells[1] !== null) {
            cells[1].style.paddingLeft = 0;
        } else if (cells[1] !== null) {
            cells[1].style.paddingLeft = '20px';
        }
    }
    function getArrayOfFieldNames(fn) {
        var arrayOfFieldNames = fn;
        if (typeof fn === 'string') {
            arrayOfFieldNames = [];
            arrayOfFieldNames.push(fn);
        }
        return arrayOfFieldNames;
    }

    return {
        forms: {
            getValue: function (fieldName) {
                /// <summary>Retrieves the value for a field. Can only pass a single field name.</summary>
                /// <param name="fieldName" type="String">The name of the field to retrieve the value of.</param>
                //Get element and type
                var elem = document.getElementById(fieldName);
                var type = elem === null || (elem.type === null || elem.type === undefined) ? '' : elem.type;
                if (elem === null) {
                    return null;
                }

                //Check what kind of element it is
                var text = type.indexOf('text') > -1 && elem.className.indexOf('money') === -1;
                var currency = type.indexOf('text') > -1 && elem.className.indexOf('money') > -1;
                var lookupAsDropdown = elem.className.indexOf('lookup') > -1 && type.indexOf('select') > -1;
                var lookupAsLookup = document.getElementById(fieldName + '_name') !== null && document.getElementById(fieldName + '_name').className.indexOf('lookup') > -1;
                var picklist = elem.className.indexOf('picklist') > -1 && type.indexOf('select') > -1;
                var picklistAsRadioBtns = elem.className.indexOf('picklist') > -1 && type.indexOf('select') === -1;
                var booleanAsDropdown = elem.className.indexOf('boolean-dropdown') > -1 && type.indexOf('select') > -1;
                var booleanAsRadioBtns = elem.className.indexOf('boolean-radio') > -1;
                var datetime = elem.className.indexOf('datetime') > -1;
                var checkbox = type.indexOf('checkbox') > -1;

                //Check combinations of type and class name(s) to determine where the value will be found
                if (lookupAsDropdown) {
                    //This is a lookup rendered as a dropdown (select)
                    return elem.value === '' ?
                        null :
                        {
                            id: elem.options[elem.selectedIndex].value
                        };
                }
                else if (lookupAsLookup) {
                    //This is a lookup rendered as a textbox + lookup control
                    return elem.value === '' ?
                        null :
                        {
                            id: elem.value,
                            name: document.getElementById(fieldName + '_name').value,
                            logicalName: document.getElementById(fieldName + '_entityname').value
                        };
                }
                else if (picklist || booleanAsDropdown) {
                    //This is a picklist rendered as a dropdown or a picklist
                    return booleanAsDropdown ?
                        elem.options[elem.selectedIndex].value === '1' :
                        elem.options[elem.selectedIndex].value;
                }
                else if (picklistAsRadioBtns || booleanAsRadioBtns) {
                    //This is a picklist rendered as radio buttons
                    var elems = null;
                    if (typeof (document['querySelector']) === 'function' && typeof (document['querySelectorAll']) === 'function') {
                        elems = document.querySelectorAll('*[id^="' + fieldName + '_"]');
                    } else {
                        var allElems = document.getElementsByTagName('*');
                        for (var ctr = 0; ctr < allElems.length; ctr++) {
                            if (allElems[ctr].type === 'radio' && allElems[ctr].id.indexOf(fieldName)) {
                                elems.push(allElems[ctr]);
                            }
                        }
                    }
                    for (var elemCtr = 0; elemCtr < elems.length; elemCtr++) {
                        if (elems[elemCtr].type === 'radio' && elems[elemCtr].checked) {
                            return elem.className.indexOf('boolean-radio') > -1 ?
                                elems[elemCtr].value === '1' :
                                elems[elemCtr].value;
                        }
                    }
                    return null;
                }
                else if (datetime) {
                    //This is a date textbox
                    return elem.value === null || elem.value === '' ?
                        null :
                        new Date(elem.value);
                }
                else if (checkbox) {
                    //This is a checkbox
                    return elem.checked;
                }
                else if (text && !currency) {
                    //This is a text field
                    return elem.value;
                }
                else if (currency) {
                    //This is a currency field
                    return parseInt(elem.value, 10);
                }
                return null;
            },
            setVisible: function (fieldName, isVisible) {
                /// <summary>Shows or hides a field and its label. Can pass a single field name as a string OR an array of field names.</summary>
                /// <param name="fieldName" type="String">The name of the field to be shown or hidden.</param>
                /// <param name="isVisible" type="Bool">Whether to make the field visible (true) or not visible (false).</param>

                //check if array has been passed or single string and then loop through each one
                var arrayOfFieldNames = getArrayOfFieldNames(fieldName);
                for (var fieldCtr = 0; fieldCtr < arrayOfFieldNames.length; fieldCtr++) {
                    var fn = arrayOfFieldNames[fieldCtr];

                    //find field and label and show/hide the parent td
                    var elem = document.getElementById(fn);
                    var elemLabel = document.getElementById(fn + '_label');
                    if (elem === null) {
                        return;
                    }

                    //save element display type if about to hide so it can be reset later
                    if (!isVisible && elem.style.display !== 'none') {
                        saveElemDisplayType(elem);
                        saveElemDisplayType(elemLabel);
                    }

                    //show or hide
                    elem.parentElement.parentElement.style.display = isVisible ? getPreviousDisplayValue(elem) : 'none';
                    elemLabel.parentElement.parentElement.style.display = isVisible ? getPreviousDisplayValue(elem) : 'none';

                    //find parent (3rd row up, will be a tr)
                    var parentRow = document.getElementById(fn)
                        .parentElement
                        .parentElement
                        .parentElement;

                    //if not hiding, make sure parent row is visible; else check if need to hide row
                    if (isVisible) {
                        parentRow.style.display = getPreviousDisplayValue(parentRow, fieldName + '_parentrow');
                        checkForLeftPadding(fieldName, false, parentRow, parentRow.getElementsByTagName('td'));
                        continue;
                    } else {
                        //check for any other visible tds OR class zero-cell (zero cells are spacers and not required to be visible) 
                        //- if none found, hide the row to prevent whitespace
                        var hideParent = true;
                        var cells = parentRow.getElementsByTagName('td');
                        var firstCellIsPickList = cells[0].className.indexOf('picklist') > -1;
                        for (var ctr = 0; ctr < cells.length; ctr++) {
                            //zero-cells dont count
                            if (cells[ctr].className.indexOf('zero-cell') > -1) {
                                continue;
                            }

                            //use visiblity test from jQuery - thanks jQuery!
                            if (cells[ctr].offsetWidth === 0 && cells[ctr].offsetHeight === 0) {
                                continue;
                            }

                            //for picklists there is an additional cell to ignore
                            if (firstCellIsPickList && cells[ctr].className.indexOf('clearfix cell') > -1) {
                                continue;
                            }

                            hideParent = false;
                            break;
                        }
                        checkForLeftPadding(fieldName, hideParent, parentRow, cells);
                    }
                }
            },
            setDisabled: function (fieldName, isDisabled) {
                /// <summary>Disables or enables a field. Can pass a single field name as a string OR an array of field names.</summary>
                /// <param name="fieldName" type="String">The name of the field to be disabled or enabled.</param>
                /// <param name="isDisabled" type="Bool">Whether to make the field disabled (true) or enabled (false).</param>

                //check if array has been passed or single string and then loop through each one
                var arrayOfFieldNames = getArrayOfFieldNames(fieldName);
                for (var fieldCtr = 0; fieldCtr < arrayOfFieldNames.length; fieldCtr++) {
                    var fn = arrayOfFieldNames[fieldCtr];

                    //find field and label and show/hide the parent td
                    var elem = document.getElementById(fn);
                    elem.disabled = isDisabled;
                }
            },
            setReadOnly: function (fieldName, isReadOnly) {
                /// <summary>Makes a field readonly or not. Can pass a single field name as a string OR an array of field names.</summary>
                /// <param name="fieldName" type="String">The name of the field to be made readonly or not.</param>
                /// <param name="isReadOnly" type="Bool">Whether to make the field read only (true) or not (false).</param>

                //check if array has been passed or single string and then loop through each one
                var arrayOfFieldNames = getArrayOfFieldNames(fieldName);
                for (var fieldCtr = 0; fieldCtr < arrayOfFieldNames.length; fieldCtr++) {
                    var fn = arrayOfFieldNames[fieldCtr];

                    //find field and label and show/hide the parent td
                    var elem = document.getElementById(fn);
                    elem.readOnly = isReadOnly ? 'readonly' : '';
                }
            }
        }
    };
})();
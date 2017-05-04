var xrt = xrt || {};
xrt.adxstudio = (function () {
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
                    elem.parentElement.parentElement.style.display = isVisible ? 'block' : 'none';
                    elemLabel.parentElement.parentElement.style.display = isVisible ? 'block' : 'none';

                    //find parent (3rd row up, will be a tr)
                    var parentRow = document.getElementById(fn)
                        .parentElement
                        .parentElement
                        .parentElement;

                    //if not hiding, make sure parent row is visible; else check if need to hide row
                    if (isVisible) {
                        parentRow.style.display = 'block';
                        continue;
                    } else {
                        //check for any other visible tds OR class zero-cell (zero cells are spacers and not required to be visible) 
                        //- if none found, hide the row to prevent whitespace
                        var hideParent = true;
                        var cells = parentRow.getElementsByTagName('td');
                        for (var ctr = 0; ctr < cells.length; ctr++) {
                            if (cells[ctr].className.indexOf('zero-cell') > -1) {
                                continue;
                            }

                            //Use visiblity test from jQuery - thanks jQuery!
                            if (cells[ctr].offsetWidth === 0 && cells[ctr].offsetHeight === 0) {
                                continue;
                            }
                            hideParent = false;
                            break;
                        }
                        if (hideParent) {
                            parentRow.style.display = 'none';
                        }
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
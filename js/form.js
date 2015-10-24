/**
 * Created by Maxim on 16.10.2015.
 */
'use strict';

$(document).ready(function() {
    init();
});

function init() {
    $('#contactForm').submit(function(event) {
        processRegistration(this);
        event.preventDefault();
        clearErrorsParagraph();
    });
}
/*@function clear text in <p> tag with class "error message"
* to preserve hint and error message be showed together
* author Pankov A.A.
*/
function clearErrorsParagraph() {
    $('#contactForm input, #contactForm textarea').focus(function(){        
        $( this ).parent().next().text("");        
    });
};

function processRegistration(form) {
    var data = getRegistrationFormData();
    var errors = validaRegistrationData(data);

    $('.help-block', $(form)).text('');

    if (errors) {
        highlightErrors(form, errors);
    } else {
        console.log('DATA IS VALID', data);
        alert('SUCCESS');
    }
}

function getRegistrationFormData() {
    var formData = {
        name:       $('#name').val(),
        email:      $('#email').val(),
        phone:      $('#phone').val(),
        message:    $('#message').val()

    };

    return formData;
}

function validaRegistrationData(formData) {
    var validationRules = {
        name: function(value) {
            var name = /[^a-zа-яіїєґ'\s]+/gi;
            if (!value) {
                return 'Name is required';
            }

            if (name.test(value)) {
                return 'Should contain only letters latin/cyrillic';
            }
        },
        email: function(value) {
            var encorrectEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!value) {
                return 'Please enter your email address.';
            }

            else if (!encorrectEmail.test(value)) {

                return 'Incorrect Email';
            };
        },
        phone: function(value) {
            if (!value) {
                return 'Please enter your phone number.';
            }

            function extractNum(arg){
                var newArr = [];
                for (var ind in arg.split('')){
                    if (/([0-9])+/.test(arg[ind])){
                        newArr.push(arg[ind]);
                    }
                }
                return newArr.join('').length;
            }

            function isInputOk(inArr){
                var validChars = ' +-()0123456789'.split('');

                for (var i in inArr){
                    var flag = false,
                        mainFlag = true;

                    for (var j in validChars){
                        if (inArr[i].indexOf(validChars[j]) >= 0){
                            flag = true;
                        }
                    }

                    mainFlag = mainFlag && flag;

                    if (!mainFlag){
                        return mainFlag;
                    }
                }
                return true;
            }

            if (!(isInputOk(value) && (extractNum(value) <= 20)) ) {
                console.log('true');
                return 'Incorrect phone format';
            }
        },
        message: function(value) {

            var noScript = /<script[\s\S]*?>/g;
            if (!value) {
                return 'Please enter a message.';
            }

            if (noScript.test(value)) {

                return 'Error text';
            }

        }
    };

    var errors = validateData(validationRules, formData);


    return errors;
}

function highlightErrors(form, errors) {
    var $form = $(form);

    for (var field in errors) {
        var fieldError = errors[field];
        $('.help-block[data-error-for=' + field + ']', $form).text(fieldError);
    }
}

function validateData(validationRules, data) {
    var errors = {};

    for (var field in data) {
        var value = data[field];
        var fieldError = validationRules[field](value);

        if (fieldError) {
            errors[field] = fieldError;
        }
    }

    if ( Object.keys(errors).length ) {
        return errors;
    } else {
        return;
    }
}

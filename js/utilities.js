(function() {
  var phoneInput = document.getElementById('zipCode');
  var emailInput = document.getElementById('emailField');
  var media = '(min-width: 700px)';

  window.onload = placeHolderChange;
  window.onresize = placeHolderChange;

  function placeHolderChange() {
    if(window.matchMedia(media).matches) {
      phoneInput.setAttribute('placeholder', '+7 XXX XXX-XX-XX');
      emailInput.setAttribute('placeholder', 'Введите почту');
    }
    else {
      phoneInput.setAttribute('placeholder', 'Номер, пожалуйста');
      emailInput.setAttribute('placeholder', 'E-mail, пожалуйста');
    }
  };
})();


(function () {
  var phoneInput = document.getElementById('zipCode');

  phoneInput.addEventListener('keyup', function() {
    mask('zipCode', '+7(000)000-00-00', event);
  })
})();


function mask(inputName, mask, evt) {
  try {
    var inputField = document.getElementById(inputName);
    var value = inputField.value;

    // If user pressed DEL or BACK SPACE, clean the value
    try {
      var evt = (evt.which) ? evt.which : event.keyCode;
      if ( evt == 46 || evt == 8 ) {
        inputField.value = '';
        return;
      }
    } catch(evt) {}

    var literalPattern=/[0\*]/;
    var numberPattern=/[0-9]/;
    var newValue = '';

    for (var vId = 0, mId = 0 ; mId < mask.length ;) {
      if (mId >= value.length)
        break;

      // Number expected but got a different value, store only the valid portion
      if (mask[mId] == '0' && value[vId].match(numberPattern) == null) {
        break;
      }

      // Found a literal
      while (mask[mId].match(literalPattern) == null) {
        if (value[vId] == mask[mId])
          break;

        newValue += mask[mId++];
      }

      newValue += value[vId++];
      mId++;
    }

    inputField.value = newValue;
  } catch(evt) {}
};

function initForm() {
  const form = document.querySelector('#contact-form');
  const inputs = form.querySelectorAll('input[required], textarea[required]');

  form.setAttribute('novalidate', true);

  // Form validation
  const displayFieldError = function (elem) {
    const fieldContainer = elem.closest('.field-container');
    const fieldError = fieldContainer.querySelector('.field-error');

    if (fieldError === null) {
      const errorText = elem.dataset.error;
      const divError = document.createElement('div');
      divError.classList.add('field-error');
      divError.innerText = errorText;
      fieldContainer.appendChild(divError);
    }
  };

  const hideFieldError = function (elem) {
    const fieldContainer = elem.closest('.field-container');
    const fieldError = fieldContainer.querySelector('.field-error');

    if (fieldError !== null) {
      fieldError.remove();
    }
  };


  [...inputs].forEach(elem => {
    elem.addEventListener('input', function () {
      if (!this.checkValidity()) {
        this.classList.add('error');
      } else {
        this.classList.remove('error');
        hideFieldError(this);
      }
    });

    if (elem.type === 'checkbox') {
      elem.addEventListener('click', function () {
        // const fieldContainer= this.closest('.field-container');
        if (this.checked) {
          this.classList.remove('error');
          hideFieldError(this);
        } else {
          this.classList.add('error');
        }
      });
    }
  });

  const checkFieldsErrors = function (elements) {
    let fieldsAreValid = true;

    [...elements].forEach(elem => {
      if (elem.checkValidity()) {
        hideFieldError(elem);
        elem.classList.remove('error');
      } else {
        displayFieldError(elem);
        elem.classList.add('error');
        fieldsAreValid = false;
      }
    });
    return fieldsAreValid;
  };


  form.addEventListener('submit', e => {
    e.preventDefault();

    if (checkFieldsErrors(inputs)) {
      const elements = form.querySelectorAll('input:not(:disabled), textarea:not(:disabled)');

      const dataToSend = new FormData();
      [...elements].forEach(el => dataToSend.append(el.name, el.value));
      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;
      submit.classList.add('element-disabled');

      const url = form.getAttribute('action');
      const method = form.getAttribute('method');

      fetch(url, {
        method: method.toUpperCase(),
        body: dataToSend
      })
        .then(ret => ret.json())
        .then(ret => {
          submit.disabled = false;
          submit.classList.remove('element-disabled');

          if (ret.errors) {
            ret.errors.map(function (el) {
              return '[name="' + el + '"]';
            });
            checkFieldsErrors(form.querySelectorAll(ret.errors.join(',')));
          } else {
            if (ret.status === 'ok') {
              const div = document.createElement('div');
              div.classList.add('form-send-success');
              div.innerText = 'Wysłanie wiadomości się nie powiodło';

              form.parentElement.insertBefore(div, form);
              div.innerHTML = '<strong>Wiadomość została wysłana</strong><span>Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej</span>';
              form.remove();
            }
            if (ret.status === 'error') {
              if (document.querySelector('.send-error')) {
                document.querySelector('.send-error').remove();
              }
              const div = document.createElement('div');
              div.classList.add('send-error');
              div.innerText = 'Wysłanie wiadomości się nie powiodło';
              submit.parentElement.appendChild(div);
            }
          }
        }).catch(_ => {
          submit.disabled = false;
          submit.classList.remove('element-disabled');
        });
    }
  });

}
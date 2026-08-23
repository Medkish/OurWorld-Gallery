(function () {
  "use strict";

  const WHATSAPP_NUMBER = "971529313127";
  const EMAIL_ADDRESS = "luxemak07@gmail.com";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const from = (data.get('email') || '').toString().trim();
      const subject = (data.get('subject') || '').toString().trim() || 'Website Request';
      const message = (data.get('message') || '').toString().trim();
      const sendvia = (data.get('sendvia') || 'whatsapp').toString();

      const text =
        'Name: ' + name + '\n' +
        'Email: ' + from + '\n' +
        'Subject: ' + subject + '\n\n' +
        message;

      if (sendvia === 'email') {
        window.location.href =
          'mailto:' + EMAIL_ADDRESS +
          '?subject=' + encodeURIComponent(subject + ' - ' + name) +
          '&body=' + encodeURIComponent(text);
      } else {
        window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank');
      }

      form.reset();
    });
  });
})();

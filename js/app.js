/* eslint-env browser, jquery */
import 'bootstrap';
import './../styles/styles.scss';

$('#bidicode-contato').on('click', () => {
  window.open('https://www.bidicode.com', '_blank');
});

$('.quero-contratar').on('click', () => {
  $('#assunto').val('Quero contratar');
});

/* Contato */
function closeAlert() {
  $('#contato-alert').fadeOut('slow');
}

$('#contato-form').submit((e) => {
  e.preventDefault();
  const data = new FormData();
  data.append('nome', $('#nome').val());
  data.append('email', $('#email').val());
  data.append('assunto', $('#assunto').val());
  data.append('telefone', $('#telefone').val());
  data.append('mensagem', $('#mensagem').val());
  $('#contato-button').prop('disabled', true);

  $.ajax({
    type: 'POST',
    enctype: 'multipart/form-data',
    url: 'contato.php',
    data,
    processData: false,
    contentType: false,
    cache: false,
    timeout: 10000,
    success: () => {
      $('#contato-button').prop('disabled', false);
      $('#contato-alert-mensagem').html('Mensagem enviada com sucesso!');
      $('#contato-form').slideUp();
      $('#contato-alert').fadeIn('slow');

      $('#nome').val('');
      $('#email').val('');
      $('#telefone').val('');
      $('#assunto').val('');
      $('#mensagem').val('');
      $('#restore-contact').html('Nova mensagem');
    },
    error: () => {
      $('#contato-button').prop('disabled', false);
      $('#contato-alert-mensagem').html('Ops! Algo aconteceu, tente novamente.');
      $('#contato-alert').fadeIn('slow');
      $('#contato-form').slideUp();
      $('#restore-contact').html('Tentar novamente');
    }
  });
});

$('#restore-contact').on('click', () => {
  closeAlert();
  $('#contato-form').slideDown();
});

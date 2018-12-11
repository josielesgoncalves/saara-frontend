jQuery(document).ready(function () {
  var urlBase = 'http://localhost:8080'


  function submitForm() {
    var UsuarioDTO = {
      email: $('#email').val(),
      senha: $('#password').val()      
    }

    $.ajax({
      type: 'POST',
      url: urlBase + '/usuario/logar',
      data: JSON.stringify(UsuarioDTO),
      contentType: 'application/json',
      success: function (result) {
        console.log(result)
        window.location.reload()
        return true
      },
      error: function (e) {
        console.log('ERROR:', e)
        $('#email').addClass('input-error')
        return false
      }
    })
  }
})

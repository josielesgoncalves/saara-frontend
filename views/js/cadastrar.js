jQuery(document).ready(function () {

  var urlBase = 'http://localhost:8080'

  $('#cursoList').click(function () {
    if(!$('#cursoList').val()) {
      $.ajax({
		    url: urlBase + '/selectBox/getCursos',
        type: 'GET',        
        contentType: 'application/json',
        success: function (result) {
          var htmlCode
          console.log(result)
          for (var i = 0; i < result.lengh; i++) {
            htmlCode += '<option value="' + result[i].id + '">' + result[i].descricao + '</option>';
          }
          $('#cursoList').html(htmlCode)
        },
        error: function (e) {
          console.log('ERROR:', e)
        }
      });
    }
	
  })

  $("#salvar").click( function()
           {
             submitForm();
           }
        );

  function submitForm() {
    var newUsuarioDTO = {
      nome: $('#nome').val(),
      email: $('#email').val(),
      senha: $('#password').val(),
      confirmSenha: $('#confirmSenha').val()      
    }

    $.ajax({
      type: 'POST',
      url: urlBase + '/usuario/cadastrar',
      data: JSON.stringify(newUsuarioDTO),
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
});

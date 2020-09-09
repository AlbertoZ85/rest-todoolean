/* Completare l’esercizio iniziato a lezione sulla todo-list.
Utilizzare l’API di esempio http://157.230.17.132:3035/todos
e fare le 4 operazioni Create, Read, Update e Delete. */

$(document).ready(function () {
    $('#enter-input').val('').focus();

    // cRud -> Read: recupero e stampa
    getData();

    // Crud -> Create: inserimento
    $('#enter-btn').click(postData);
    $('#enter-input').keydown(function (e) {
        if (e.which == 13 || e.keyCode == 13) {
            postData();
        }
    });

    // cruD -> Delete: cancellazione
    $('.todo').on('click', '.delete', deleteData);

    // crUd -> Update: modifica
    $('.todo').on('click', '.item', updateItem);
});

// *** FUNCTIONS *** //
// Chiamata AJAX per ottenere le voci della lista
function getData() {
    $.ajax({
        url: 'http://157.230.17.132:3035/todos/',
        method: 'GET',
        success: function (obj) {
            printItems(obj);
        },
        error: function () {
            alert('Errore');
        }
    });
}

// Stampa sul DOM delle voci della lista con HB
function printItems(data) {
    var source = $('#todo-template').html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < data.length; i++) {
        var context = data[i];
        var html = template(context);
        $('.todo').append(html);
    }
}

// Inserimento di una nuova voce
function postData() {
    var newItem = $('#enter-input').val();
    $('#enter-input').val('');

    $.ajax({
        url: 'http://157.230.17.132:3035/todos/',
        method: 'POST',
        data: {
            text: newItem
        },
        success: function () {
            $('.todo').empty();
            getData();
        },
        error: function () {
            alert('Errore');
        }
    });
}

// Cancellazione di una voce
function deleteData() {
    var id = $(this).parent().data('id');
    $.ajax({
        url: 'http://157.230.17.132:3035/todos/' + id,
        method: 'DELETE',
        success: function () {
            $('.todo').empty();
            getData();
        },
        error: function () {
            alert('Errore');
        }
    });
}


// Inizializzazione dell'aggiornamento di una voce
function updateItem() {
    var itemId = $(this).data('id');
    var thisInput = $(`.update[data-id="${itemId}"]`);

    $(this).toggle();
    $(this).next().toggle().focus();

    thisInput.keydown(function (e) {
        if (e.which == 13 || e.keyCode == 13) {
            var update = thisInput.val();
            patchData(itemId, update);
        }
    });
}
// Modifica di una voce
function patchData(id, item) {
    $.ajax({
        url: 'http://157.230.17.132:3035/todos/' + id,
        method: 'PATCH',
        data: {
            text: item
        },
        success: function () {
            $('.todo').empty();
            getData();
        },
        error: function () {
            alert('Errore');
        }
    });
}
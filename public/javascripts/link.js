function deleteEvent(idEvent) {
    if(confirm("Etes-vous sûr ?")) {
        $.ajax({
            type    : 'DELETE',
            url     : '/events/delete/'+idEvent,
            success : function(response) {
                if ( response === 'error' ) {
                    alert('crap!');
                } else if (response === 'success' ) {
                    document.location.href="/events";
                }
            }
        });
    } else {
        alert('Annulé !');
    }
}

function deleteOffre(idEvent, idOffre) {
    if(confirm("Etes-vous sûr ?")) {
        $.ajax({
            type    : 'DELETE',
            url     : '/events/delete/'+idEvent+'/offre/'+idOffre,
            success : function(response) {
                if ( response === 'error' ) {
                    alert('crap!');
                } else if (response === 'success' ) {
                    document.location.href="/events/"+idEvent;
                }
            }
        });
    } else {
        alert('Annulé !');
    }
}

$(document).ready(function() {
    // Lorsque je soumets le formulaire
    $('#updateEtat').on('submit', function(e) {
        e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire

        var $this = $(this); // L'objet jQuery du formulaire

        // Je récupère les valeurs
        var etat = $('#etat').val();
        var idEvent = $('#idEvent').val();
        var idPostulation = $('#idPostulation').val();


        // Envoi de la requête HTTP
        $.ajax({
            type    : 'PUT',
            url     : '/events/'+idEvent+'/update/'+idPostulation,
            data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
            success : function(response) {
                if ( response === 'error' ) {
                    alert('crap!');
                } else if (response === 'success' ) {
                    document.location.href="/events/"+idEvent;
                }
            }
        });
    });
});
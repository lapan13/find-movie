function searchMovie() {
    
    $('movie-list').html('');
    
    $.ajax({
        type: 'get',
        url: 'http://omdbapi.com',
        dataType: 'json',
        data: {
            'apikey' : 'baecc483',
            's' : $('#search-input').val()
        },
        success: function(result) {
            if(result.Response == "True") {
                let movies = result.Search;
                $.each(movies, function(i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-3">
                        <div class="card mb-3">
                            <img src="`+ data.Poster +`" class="card-img-top">
                            <h5 class="card-title">`+ data.Title+`</h5>
                            <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                            <a href="#" class="card-link">See details</a>
                        </div>
                    </div>
                    `);
                });
    
                $('#search-input').val('');
    
            } else {
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center">`+ result.Error + `</h1>
                </div>`)
            }
        }
    });
}

$('#search-button').on('click', function() {
    searchMovie();
});

$('#search-input').on('keyup', function(e) {
    if(e.keyCode === 13) {
        searchMovie();
    }
});
function getRepos( url, repos, callback ){
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json'
  }).done( function( response, textStatus, req ){
    for( var i=0, len = response.length; i < len; i++ ){
      repos.push( response[i] );
    }
    nextUrl = req.getAllResponseHeaders().match(/<(.*)>; rel="next"/);
    if( nextUrl ){
      getRepos( nextUrl[1], repos, callback );
    } else {
      callback();
    }
  });  
}

url = 'https://api.github.com/users/jshawl/repos';
repos = [];

getRepos( url, repos, function( ){
  render( repos );
});

function render( repos ){
  var body = document.querySelector('.users');
  var input = document.querySelector('input');
  for ( repo in repos ) { 
    repo = repos[repo];
    var link = document.createElement('a'); 
    link.href = repo.contents_url;
    var text = document.createTextNode(repo.name);  
    link.appendChild(text);
    
    var description = document.createElement('span');
    var desc = document.createTextNode(repo.description);
    description.appendChild(desc);
    link.appendChild(description);  
    link.setAttribute('data-info',repo.name+' '+repo.description);
    body.appendChild(link);  
  }
  $('.loading').remove();

  // layout users with isotope
  var container = document.querySelector('.users');
  var iso = new Isotope( container, {
    itemSelector: 'a',
    layoutMode: 'fitRows'
  });
   
  // filter isotope when user types
  input.addEventListener('keyup', function(){
    var val = this.value;  
    iso.arrange({
    filter: function( ) {
	var re = new RegExp(val, 'i');
	var matchName = $(this).attr('data-info').match( re );
        if(matchName){ 
	  return matchName
	}
      }
    });
  });
}

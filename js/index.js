var body = document.querySelector('.users');
var input = document.querySelector('input');
for ( repo in repos ) { 
  repo = repos[repo];
  //console.log(repo);  
  var link = document.createElement('a'); 
  link.href = repo.contents_url;
  var text = document.createTextNode(repo.name);  
  link.appendChild(text);
  
  var description = document.createElement('span');
  var desc = document.createTextNode(repo.description);
  description.appendChild(desc);
  link.appendChild(description);  
  console.log(text);
  link.setAttribute('data-info',repo.name+' '+repo.description);
  //link.style.backgroundImage = "url("+obj.profile_image_url+")";
  body.appendChild(link);  
} 

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
  filter: function( itemElem ) {
      var re = new RegExp(val, 'i');
      var matchName = itemElem.getAttribute('data-info').match(re);   
      return matchName; 
    }
  });
});



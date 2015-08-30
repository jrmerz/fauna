FC.router = (function(){
  var registery = {
    home : {
      query : 'fa-comic[type="Fauna"]'
    },
    nuts : {
      query : 'fa-comic[type="nuts"]'
    },
    cartoons : {
      query : 'fa-gallery[type="Fauna"]'
    },
    nuts_cartoons : {
      query : 'fa-gallery[type="nuts"]'
    },
    about : {
      query : 'fa-about'
    },
    buy : {
      query : 'fa-buy'
    },
    links : {
      query : 'fa-links'
    }
  };
  var page = '';

  function update() {
    var parts = window.location.hash.replace(/#/g, '').replace(/^!/,'').split('/');

    if( parts.length === 0 ) {
      parts = ['home'];
    } else if( !registery[parts[0]] ) {
      window.location = '#home';
      return;
    }


    if( page != parts[0] ) {
      page = parts[0];

      for( var key in registery ) {
        if( key === page ) {
          registery[key].ele.style.display = 'block';
          if( registery[key].ele.onShow ) {
            registery[key].ele.onShow();
          }
        } else {
          registery[key].ele.style.display = 'none';
        }
      }
    }


    if( registery[page].ele.onUpdate !== undefined ) {
      parts.splice(0, 1);
      registery[page].ele.onUpdate(parts);
    }
  }

  function init() {
    for( var key in registery ) {
      registery[key].ele = document.querySelector(registery[key].query);
    }

    update();
  }

  $(window).on('hashchange', update);
  $(document).on('ready', init);

})();

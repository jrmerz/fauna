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
    console.log('Calling update()');
    var parts = window.location.hash.replace(/#/g, '').replace(/^!/,'').split('/');

    if( parts.length === 0 ) {
      parts = ['home'];
    }

    if( parts[0] == 'fauna' ) {
      parts[0] = 'home';
    }

    if( !registery[parts[0]] ) {
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

      registery[key].ele.addEventListener('page-ready', function(e){
        console.log('page-ready event')
        delayedLoad();
      });
    }

    update();
  }

  // if elements are slow to be ready
  var delayTimer = -1;
  function delayedLoad() {
    if( delayTimer != -1 ) clearTimeout(delayTimer);
    delayTimer = setTimeout(function(){
      delayTimer = -1;
      console.log('Updating from delay');
      update();
    }.bind(this), 50);
  }

  $(window).on('hashchange', update);
  $(document).on('ready', init);

})();

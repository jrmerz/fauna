var FC = {
  listeners : [],
  addDescriptionLoadHandler : function(callback) {
    if( this.descriptions ) {
      return callback();
    }
    this.listeners.push(callback);
  },
  onDescriptionsLoad : function() {
    for( var i = 0; i < this.listeners.length; i++ ) {
      this.listeners[i]();
    }
    this.listeners = null;
  }
};

$.get('/description.json', function(resp){
  FC.descriptions = resp;
  FC.onDescriptionsLoad();
}.bind(this));

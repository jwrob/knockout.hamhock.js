ko.hamhock = function(options) {
    var _initialState, _isInitiallyDirty, result;

    options = $.extend({
        root: {}, 
        isInitiallyDirty: false, 
        saveMethod: undefined
    }, options);

    _initialState = ko.observable(ko.toJSON(options.root));
    _isInitiallyDirty = ko.observable(options.isInitiallyDirty);
    result = function() { };

    result.isDirty = ko.computed(function(){
        return _isInitiallyDirty() || 
            (_initialState() !== ko.toJSON(options.root));
    });

    result.reset = function() {
        _initialState(ko.toJSON(options.root));
        _isInitiallyDirty(false);
    };
    
    ko.computed(function(){
        if(options.saveMethod && typeof(options.saveMethod) === "function" && result.isDirty()){
            if(options.saveMethod() !== false){
                result.reset();
            }         
        }            
    });

    options.root.hamhock = result;
};
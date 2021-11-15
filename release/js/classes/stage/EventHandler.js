class EventHandler {

    _eventDict;

    constructor() {
        this._eventDict = {};
    }

    add(event_name, callback) {
        if (!this._eventDict[event_name]) this._eventDict[event_name] = [];
        this._eventDict[event_name].push(callback)
    };

    trigger(event_name, data) {
        document.dispatchEvent(new CustomEvent(event_name, {detail: data}));
        
        if ( this._eventDict[event_name])
            this._eventDict[event_name].forEach(callback => callback(data));
    }
}
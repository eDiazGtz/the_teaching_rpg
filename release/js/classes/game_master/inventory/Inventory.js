class Inventory {
    
    eventListener = new EventHandler();

    _items = [];

    /* getter / setters */
    get weight() {
        return this._items.reduce(function(acc, item) { return acc + item.weight; }, 0);
    }

    constructor(items = []) {
        this._items = items;
    }

    addItem = (item) => {
        this._items.push(item);
        this.eventListener.trigger(GameMaster.EVENTS.INVENTORY_UPDATED);
    }

    getItem = (id) => {

        var foundItem = null;
        
        this._items.forEach(item => {
            if( item.id === id) foundItem = item;
        });

        return foundItem;
    }
    
    getItems = () => {
        return this._items;
    }

    removeItem = (id) => {
        this._items = this._items.filter(item => item.id !== id);
        this.eventListener.trigger(GameMaster.EVENTS.INVENTORY_UPDATED);
    }

    searchForItemByName = (searchItemName) => {
        return this._items.filter(item => searchItemName === item.name )[0] || null
    }
}
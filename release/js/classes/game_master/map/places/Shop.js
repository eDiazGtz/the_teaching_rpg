class Shop extends MapPlace {

    static SELL_RESULT = {
        COMPLETED: "completed",
        INVALID_ITEM: "invalid_item",
        INSUFFICIENT_FUNDS: "insufficient_funds"
    }
    
    eventListener = new EventHandler();
    imageName = "the_shop";
    location = {x: 0, y: 0};

    _inventory = new Inventory([]);

    constructor(availableItems, name, description, sortie, layout) {

        layout.floorImage = layout.floorImage || "map_item_shop_floor";

        super(name, description, sortie, layout);

        if ( availableItems.length > 0 )
            for ( let x = 0; x < Tools.generateRandomNumber(5, 10); x++ ) {
                let item = availableItems[Tools.generateRandomNumber(0, availableItems.length - 1)];
                this._inventory.addItem(item.generateNewItem());
            }
    }

    addInventoryItem = (item) => {
        this._inventory.addItem(item);
    }

    buyItem = (itemId, player) => {

        let foundItem = player.inventory.getItem(itemId);
        
        if ( foundItem !== null ) 
        {
            player.inventory.removeItem(foundItem.id);
            player.gold += foundItem.getSellPrice();

            this._inventory.addItem(foundItem);
            this.eventListener.trigger(GameMaster.EVENTS.SHOP_UPDATED);

            return Shop.SELL_RESULT.COMPLETED;
        }
        return Shop.SELL_RESULT.INVALID_ITEM;
    }

    getInventory = () => {
        return this._inventory.getItems();
    }

    getInventoryItem = (itemId) => {
        return this._inventory.getItem(itemId);
    };

    enter = (map, player) => {
        return super.enter(map, player)};

    sellItem = (itemId, player) => {

        let foundItem = this._inventory.getItem(itemId);
        
        if ( foundItem !== null ) 
        {
            if ( player.gold >= foundItem.price ) {
                player.gold -= foundItem.price;

                player.inventory.addItem(foundItem);
                this._inventory.removeItem(foundItem.id);

                if ( foundItem instanceof Food ) { // replendish food items
                    this._inventory.addItem(foundItem.generateNewItem());
                }

                this.eventListener.trigger(GameMaster.EVENTS.SHOP_UPDATED);
                return foundItem;
            } else return Shop.SELL_RESULT.INSUFFICIENT_FUNDS;
        }

        return Shop.SELL_RESULT.INVALID_ITEM;
    }
}
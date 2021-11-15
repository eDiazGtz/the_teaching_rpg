class StageMapActionsComponent extends StageComponent {

    static BUTTON_TYPES = {
        CONSUME: "consume",
        DROP: "drop",
        ENGAGE: "engage",
        EXCHANGE: "exchange",
        NONE: "none",
        PICKUP: "pickup",
        SHOP: "shop"
    }

    constructor(stage, gameMaster) {
        super(stage, gameMaster);

        document.addEventListener(GameMaster.EVENTS.MAP_UPDATED, () => this.buildComponent());

        return this;
    }

    _buildHTML = (id, image, title, description, buttonType) => {

        return `
                    <div id="${id}" class="option_selector__row option_selector_type--${buttonType} item_selector item_to_buy">
                        <div class="item_selector__inner item_selector__inner--active animate_hover">
                            <div class="option_selector__row_img">
                                <img src="images/${image}.png"/>
                            </div>
                            <div class="option_selector__row_data">
                                <div class="option_selector__row_name">${title}</div>
                                <div class="option_selector__row_stats">${description}</div>
                                <div class="option_selector__row_buttons">
                                    <div class="option_selector__button ">click to ${buttonType}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
    }

    buildComponent = () => {
        
        let mapSquare = this._gameMaster.player.mapSquare;
        let HTML = ""

        // create for item, character or shop on tile
        if ( mapSquare.item !== null ) {
            HTML += this._buildHTML(
                `${mapSquare.x}:${mapSquare.y}`, 
                mapSquare.item.imageName,
                mapSquare.item.name,
                typeof mapSquare.item.getStats !== 'undefined' ? mapSquare.item.getStats() : "",
                StageMapActionsComponent.BUTTON_TYPES.PICKUP
                )
        } else if ( mapSquare.character !== null ) {
            HTML += this._buildHTML(
                `${mapSquare.x}:${mapSquare.y}`,
                mapSquare.character.imageName,
                `${mapSquare.character.name} ${mapSquare.character.race}`,
                mapSquare.character.description || "&nbsp;",
                StageMapActionsComponent.BUTTON_TYPES.ENGAGE
            )
        } else if ( mapSquare.place !== null && mapSquare.place instanceof Shop ) {
            HTML += this._buildHTML(
                `${mapSquare.x}:${mapSquare.y}`,
                mapSquare.place.imageName,
                mapSquare.place.name,
                "&nbsp;",
                StageMapActionsComponent.BUTTON_TYPES.SHOP
            )
        }

        if ( mapSquare.gold > 0 ) {
            HTML += this._buildHTML(
                `${mapSquare.x}:${mapSquare.y}`, 
                "gold",
                "gold",
                `${mapSquare.gold} gold coins`,
                StageMapActionsComponent.BUTTON_TYPES.PICKUP
                )
        }

        let playerItems = this._gameMaster.player.inventory.getItems();

        if ( playerItems.length > 0 )
            HTML += `
                <div class="col-12 actions_divider">Your Inventory</div>
            `

        // build action for player food items
        // consolidate similar items into 1
        let foodItems = {};
        playerItems
            .filter(item => item instanceof Food)
            .forEach(foodItem => {
                if ( foodItems[foodItem.imageName] === undefined ) {
                    foodItems[foodItem.imageName] = {
                        count: 1,
                        item: foodItem
                    }
                } else {
                    foodItems[foodItem.imageName]["count"] ++;
                }
            })
        
        // build
        for ( const [key, value] of Object.entries(foodItems)) {
            HTML += this._buildHTML(
                value.item.id,
                value.item.imageName,
                value.item.name,
                `you have ${value.count}`,
                StageMapActionsComponent.BUTTON_TYPES.CONSUME
            )
        }

        // build action for player non-food items
        this._gameMaster.player.inventory.getItems()
            .filter(item => !(item instanceof Food))
            .forEach(item => {
                HTML += this._buildHTML(
                    `${mapSquare.x}:${mapSquare.y}:${item.id}`,
                    item.imageName,
                    item.name,
                    typeof item.getStats !== 'undefined' ? item.getStats() : "",
                    mapSquare.item === null ? 
                        StageMapActionsComponent.BUTTON_TYPES.DROP
                        : mapSquare.item !== null ?
                            StageMapActionsComponent.BUTTON_TYPES.EXCHANGE
                            : ""
                )
            })

        this._stage.innerHTML = HTML;

        // events
        this._attachEvent(".option_selector_type--shop", "click", () =>{
            if ( this.active ) this.eventListener.trigger(StageManager.EVENTS.GO_SHOPPING);
        })

        this._attachEvent(".option_selector_type--pickup", "click", (e) => {

            if ( !this.active ) return;

            let [x, y] = e.currentTarget.id.split(":");
            let mapSquare = this._gameMaster.map.getMap()[parseInt(y)][parseInt(x)];

            if ( mapSquare.gold > 0 ) {
                this._gameMaster.player.gold += mapSquare.gold;
                mapSquare.gold = 0;
            }

            if ( mapSquare.item !== null ) {
                if ( mapSquare.item instanceof InventoryItem ) 
                    this._gameMaster.player.inventory.addItem(mapSquare.item);
                else
                    this._gameMaster.player.collectedItems.addItem(mapSquare.item);
                
                mapSquare.item = null;
            }

            this.eventListener.trigger(GameMaster.EVENTS.PLAYER_UPDATED);

            this.buildComponent();
        })

        this._attachEvent(".option_selector_type--drop", "click", (e) => {

            if ( !this.active ) return;
            
            let [x, y, itemId] = e.currentTarget.id.split(":");
            let mapSquare = this._gameMaster.map.getMap()[parseInt(y)][parseInt(x)];

            mapSquare.item = this._gameMaster.player.inventory.getItem(itemId);
            this._gameMaster.player.inventory.removeItem(mapSquare.item.id);

            this.buildComponent();
        })

        this._attachEvent(".option_selector_type--consume", "click", (e) => {

            if ( !this.active ) return;
            
            this._gameMaster.player.consume(e.currentTarget.id);
            this.buildComponent();
        })

        this._attachEvent(".option_selector_type--engage", "click", (e) => {

            if ( !this.active ) return;
            
            this.eventListener.trigger(StageManager.EVENTS.DO_BATTLE);
        })
    

        this._attachEvent(".option_selector_type--exchange", "click", (e) => {

            if ( !this.active ) return;
            
            let [x, y, itemId] = e.currentTarget.id.split(":");
            let mapSquare = this._gameMaster.map.getMap()[parseInt(y)][parseInt(x)];
            this._gameMaster.player.inventory.addItem(mapSquare.item);

            mapSquare.item = this._gameMaster.player.inventory.getItem(itemId);
            this._gameMaster.player.inventory.removeItem(mapSquare.item.id);

            this.buildComponent();
        })

        return this;
    }

    _createx = () => {

        

        return HTML;
    }

}
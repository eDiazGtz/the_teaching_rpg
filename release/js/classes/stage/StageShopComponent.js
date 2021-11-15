class StageShopComponent extends StageComponent {

    static SCENES = {
        VIEW_ITEMS: "view_items",
        TRANSACTION: "transaction"
    }

    _itemForTransaction = null;
    _playerIsInShop = false;
    
    constructor(stage, gameMaster) { 
        super(stage, gameMaster);

        this._attachEvent("#leave_shop_btn", "click", () => {
            this._playerIsInShop = false;
            this.eventListener.trigger(StageManager.EVENTS.LEAVE_SHOP);
        });

        this._gameMaster.eventListener.add(GameMaster.EVENTS.SHOP_UPDATED, () => {
            this.buildComponent();
        })

        return this;
    }

    buildComponent = () => {

        // send out greeting
        if ( !this._playerIsInShop ) {
            this._playerIsInShop = true;
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG, 
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("Welcome to my shop!", null, "character_shop_owner.png")
                    )
            )
        }
        
        switch ( this._scene ) {
            case StageShopComponent.SCENES.VIEW_ITEMS: 
                this._viewItems(); break;
            case StageShopComponent.SCENES.TRANSACTION: this._doTransactions(); break;
        }

        return this
    }

    _doTransactions = () => {
        
        let modalHTML = `
            <div class="">
                <div class="">
        `

        // get all similar items from both the player and shop.
        this._gameMaster.player.inventory.getItems().forEach(playerItem => {
            if ( playerItem.imageName === this._itemForTransaction.imageName  ) {
                modalHTML += `
                    <div id="${playerItem.id}" class="option_selector__row item_to_sell item_selector">
                        <div class="item_selector__inner item_selector__inner item_selector__inner--active animate_hover">
                            <div class="col-3 option_selector__row_img">
                                <img src="images/${playerItem.imageName}.png"/>
                            </div>
                            <div class="option_selector__row_data">
                                <div class="option_selector__row_name">${playerItem.name}</div>
                                <div class="option_selector__row_stats">${playerItem.getStats()}</div>
                                <div class="option_selector__row_buttons">
                                    click to sell for ${Math.floor(playerItem.price * .6)} gold coins
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        this._gameMaster.player.mapSquare.place.getInventory().forEach(shopItem => {
            if ( shopItem.imageName === this._itemForTransaction.imageName ) {
                modalHTML += `
                        <div id="${shopItem.id}" class="option_selector__row item_selector item_to_buy col-12 col-md-6">
                            <div class="item_selector__inner item_selector__inner--active animate_hover row">
                                <div class="col-3 option_selector__row_img">
                                    <img src="images/${shopItem.imageName}.png"/>
                                </div>
                                <div class="option_selector__row_data col-9">
                                    <div class="option_selector__row_name">${shopItem.name}</div>
                                    <div class="option_selector__row_stats">${shopItem.getStats()}</div>
                                    <div class="option_selector__row_buttons">
                                        click to buy for ${shopItem.price} gold coins
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
            }
        })

        modalHTML += `
                </div
            </div>
        `;

        this._setElement("#transaction__items", modalHTML);

        // add events
        this._attachEvent("#finished_choosing_item_btn", "click", () => this.scene = StageShopComponent.SCENES.VIEW_ITEMS)

        this._attachEvent(".item_to_buy", "click", () => {
            let buyHTML = `
                            <div class="shopping_dialog__prompt">buy</div>
                            <div class="shopping_dialog__transaction">
                                <img class="dialog_icon" src="images/${this._itemForTransaction.imageName}.png">&nbsp;&nbsp; for&nbsp;&nbsp;    
                                <span class="dialog_icon gold_bag">${this._itemForTransaction.price}</span>
                            </div>
                        `;

            this.eventListener.trigger(StageManager.EVENTS.DISPLAY_DIALOG, new DialogObject(
                DialogObject.DIALOG_TYPES.CONFIRM,
                new ScriptLine(buyHTML, null, "character_shop_owner.png"),
                (result) => {
                    if ( result === "dialog.yes" ) {
                        let result = this._gameMaster.player.mapSquare.place.sellItem(this._itemForTransaction.id, this._gameMaster.player);
                
                        if ( result instanceof InventoryItem )
                            this.buildComponent();

                            this.eventListener.trigger(StageManager.EVENTS.DISPLAY_DIALOG, new DialogObject(
                                DialogObject.DIALOG_TYPES.ONE_OFF,
                                new ScriptLine(
                                    `bought <img src="images/${this._itemForTransaction.imageName}.png" class="dialog_icon"> for ${this._itemForTransaction.price}`,
                                    2000,
                                    "character_shop_owner.png")
                            ))
                    }
                }
            ))
        })
        

        this._attachEvent(".item_to_sell", "click", () => {
            if ( this.confirmTransaction("sell", item)) {
                let result = this._gameMaster.player.mapSquare.place.buyItem(this._itemForTransaction.id, this._gameMaster.player);
                if ( result === Shop.SELL_RESULT.COMPLETED )
                    this.buildComponent();
            }
        })
    }

    _viewItems = () => {

        this._itemForTransaction = null;

        // remove duplicates from shop inventory
        let listInventory = {};
        
        this._gameMaster.player.mapSquare.place.getInventory().forEach(item => {
            if ( listInventory[item.imageName] === undefined )
                listInventory[item.imageName] = {shopCount: 1, item: item};
            else
                listInventory[item.imageName]["shopCount"] += 1;
        });
        this._gameMaster.player.inventory.getItems().forEach(item => {
            if ( listInventory[item.imageName] === undefined )
                listInventory[item.imageName] = {shopCount: 0, item: item};
        });

        // build new HTML
        let inventoryHTML = "";

        for ( let key in listInventory) {
            let item = listInventory[key].item;
            let itemCount = this._gameMaster.player.inventory.getItems().filter(playerItem => playerItem.name === item.name).length;
            let actionPrompt;

            if ( item instanceof Food ) 
                actionPrompt = `buy for ${item.price} gold coins`;
            else if ( listInventory[key]["shopCount"] > 0 && itemCount > 0) 
                actionPrompt = 'buy or sell'
            else if ( listInventory[key]["shopCount"] > 0 )
                actionPrompt = 'shop'
            else if ( itemCount > 0 )
                actionPrompt = 'sell'

            inventoryHTML += `
                <div id="${item.id}" class="option_selector__row item_selector shopping_layer__item--active item_to_buy">
                    <div class="item_selector__inner item_selector__inner--active animate_hover">
                        <div class="option_selector__row_img">
                            <img src="images/${item.imageName}.png"/>
                        </div>
                        <div class="option_selector__row_data">
                            <div class="option_selector__row_name">${item.name}</div>
                            <div class="option_selector__row_stats">
                                <div>
                                    ${
                                        (itemCount > 0) ? "You have: " + itemCount : ""
                                    }
                                    
                                    ${
                                        (listInventory[key]["shopCount"] > 0) ? 
                                            (item instanceof Food) ?
                                                `energy: ${item.energy}` : "shop has: " + listInventory[key]["shopCount"] 
                                        : ""
                                    }
                                </div>
                            </div>
                            <div class="option_selector__row_buttons">
                                click to ${actionPrompt}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // replace on stage
        this._setElement("#shopping__items", inventoryHTML);

        // set events
        this._attachEvent(".shopping_layer__item--active", "click" ,(e) => {
            let item = this._gameMaster.player.mapSquare.place.getInventoryItem(e.currentTarget.id);

            if ( item === null ) item = this._gameMaster.player.inventory.getItem(e.currentTarget.id); // we need a sample of what to display. If the shop is out, get one from the player.

            if (item instanceof Food) {
                this._gameMaster.player.mapSquare.place.sellItem(item.id, this._gameMaster.player);
                this.buildComponent();
            } else {
                this._itemForTransaction = item;
                this.scene = StageShopComponent.SCENES.TRANSACTION;
            }
        });
    }
}

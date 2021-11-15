class ItemSelectorComponent extends StageComponent {

    _id;
    _selectedItem;

    constructor(stage, gameMaster, id, selectedItem) {
        super(stage, gameMaster);

        this._id = id;
        this._selectedItem = selectedItem;

        return this;
    }

    buildComponent = () => {

        let itemsHTML = "";
        let items = this._gameMaster.player.inventory.getItems();
        items.forEach(item => {
            if ( !(item instanceof Food) ) 
                itemsHTML += `
                    <div id="${item.id}" class="item_selector item_selector--${this._id}">
                    <div class="item_selector__inner item_selector__inner--active 
                                    ${this._selectedItem && item.id === this._selectedItem.id ? "item_selector__inner--selected" : ""}">
                        <div class="option_selector__row_img">
                            <img src="images/${item.imageName}.png"/>
                        </div>
                        <div class="option_selector__row_data">
                            <div class="option_selector__row_name">${item.name}</div>
                            <div class="option_selector__row_stats">${item.getStats()}</div>
                        </div>
                    </div>
                </div>
                `
            })

        this._stage.innerHTML = `<div class="items_selector">${itemsHTML}</div>`;

        // add events
        this._attachEvent(`.item_selector--${this._id}`, "click", (e) => {
            this.eventListener.trigger(StageManager.EVENTS.ITEM_SELECTED, e.currentTarget.id);
            this._selectedItem = items.filter(item => item.id === e.currentTarget.id)[0];
            this.buildComponent();
        })

        return this;
    }
}
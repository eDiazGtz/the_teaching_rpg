class MapItem extends InventoryItem {

    id

    _mapPoint;

    constructor(name, description, mapPoint = new Point(-1, -1)) {
        super(name, "", 0, {}, description);

        this.id = name.split(" ").join("_").toLowerCase().replace(/[^a-zA-Z0-9_]/g, ''); // ancient_magic_scroll
        this.imageName = `map_item_${this.id}`;
        this._mapPoint = mapPoint;
    }

    applyToMap = (map) => 
        map[this._mapPoint.y][this._mapPoint.x].item = this;
}
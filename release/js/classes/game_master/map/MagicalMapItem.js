class MagicalMapItem extends CollectableMapItem {

    constructor(name, description, mapPoint, canUse = false) {
        super(name, description, mapPoint);

        this.canUse = canUse;
    }

}
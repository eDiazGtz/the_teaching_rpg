class FireWall extends Barrier {

    constructor() {
        super("Fire Wall", "firewall_cannot_pass", "firewall_may_pass")
    }

    canPlayerPass = (map, player) => {
        let foundItem = player.collectedItems.searchForItemByName(new WaterStone().name);

        return {
            canPass: foundItem !== null,
            response: foundItem !== null ? this._passMessageSlug : this._denyMessageSlug
        }
    }

    clone = () => new FireWall(this._name, this._denyMessageSlug, this._passMessageSlug, this.imageName); // override
}

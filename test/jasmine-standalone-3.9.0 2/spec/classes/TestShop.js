class TestShop extends Shop {

    constructor(availableItems = [], sortie = null) {
        super(availableItems, "", "", sortie, new MapPlaceLayout(
            [], [], "floor_image"
        ))
    }
}
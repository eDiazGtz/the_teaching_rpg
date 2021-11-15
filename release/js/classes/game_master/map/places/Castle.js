class Castle extends MapPlace {

    constructor(name, description, sortie, layout) {
        super(`castle_${name}`, description, sortie, layout);
    }
}
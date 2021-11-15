class Villager extends Friend {

    constructor(strength = 10, maxStrength = 10, agility = 10, magic = 5) {
        super("villager", "human", strength, maxStrength, agility, magic, "Villager in Respite")
        this.imageName = 'villager'
    }
}
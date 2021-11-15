class ScriptLine {

    content;
    name;
    sprite;

    constructor(content, sprite = null, name = "???") {
        this.content = content;
        this.sprite = sprite;
        this.name = name;
    }
}
class Script {

    slug;
    lines;

    constructor(slug, lines) {
        this.slug = slug;
        this.lines = lines.map(line => {// we can pass either a ScriptLine object or a text object
            if ( line instanceof ScriptLine ) return line;
            return new ScriptLine(line);
        })
    }
}
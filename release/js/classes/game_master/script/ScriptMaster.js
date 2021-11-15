class ScriptMaster { 

    static scripts = [
        new Script(
            "demo",
            [
                "script lines can be simple text. User needs to click to continue",
                new ScriptLine(
                    "you can set the speaker's sprite.",
                    "character_shop_owner.png"
                ),
                `if you want to use an image, add the class 'dialog_icon' 
                    <div style="textAlign: center;">
                        <img src="images/food_ale.png" class="dialog_icon">
                    </div>
                `,
                new ScriptLine(
                    "clear the speakers sprite by sending an empty string.",
                    ""
                ),
                `<span style="color: red; fontWeight: bold;" class="add_your_own_in_css">You can use HTML markup. Refrain from using DIV, P and other print styling tags.</span>`
            ]
        )
    ];

    static addScripts = (prefix, scripts) =>{
        if ( scripts instanceof Array )
            scripts.forEach(script => {
                script.slug = `${prefix}_${script.slug}`.split(" ").join("_").toLowerCase();
                ScriptMaster.scripts.push(script);
            });
    }

    static getScript = (slug) => {
        slug = slug.replace(/[^a-zA-Z0-9_]/g, '');

        let script = this.scripts.filter(script => script.slug === slug)[0] || null;

        if ( !script ) window.alert(`invalid script slug: ${slug}`);

        return script;
    };
}
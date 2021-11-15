class GrishamsShopQuest extends Quest {
    
    constructor(sortie) {
        super("Grisham's Shop", sortie, 
            new Point(48, 48),
            [
                new Script(
                    "arriving_in_crystalia",
                    [
                        new ScriptLine(
                            "Hey, you. You’re finally awake. Name’s Codee, I’m your Fairy Guide. Oh, and don’t worry about the headache, it’ll go away after an hour or so.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Where am I?",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "This is the land of Crystalia. Various nations inhabit this land, like the Kingdom of Westfalia.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "I just had the strangest dream.",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "That sure was a crazy dream, Fate talking to you and telling you that the world is covered in darkness and you’re the only one who can stop it. Crazy.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Yeah… wait. How did you know?!",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "I'm your Fateful Guide. Duh! Look, I was flying high and low before Fate summoned me to you. It seems that some DARK FORCE has started seeking out and corrupting the Worldstones. They are the ones that bring balance to the planet. We have to dispel the corruption or the world will die.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Whoa, that’s… a lot.",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "It is. I need to impress upon you how important your job is. Look, we’re in the Kingdom of Westfalia, one of the nations in Crystalia. Westfalia is supposed to guard the WORLDSTONE OF WATER, however it seems to have been found and corrupted by the DARK FORCE. The rain has stopped.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "What do you mean it stopped?",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "It hasn’t rained in months. The rivers have turned into trickles from the mountains and there is a horrible water shortage. People are dying of dehydration, and water has become the largest commodity in a Kingdom where it flowed freely",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "My head hurts.",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "King Greymoor, King of Westfalia, is the last person to know of the stone’s whereabouts. Let’s head to the CASTLE and see if we can find the King.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Which way to the castle?",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "Uh… I don’t recall. Sorry! I was so busy trying to find the Worldstone, I didn’t pay attention to directions. I do know that there's always some type of town, shop, or inn in every nation of Crystalia. I recall staying at a very nice man’s Inn last I stayed here. Grisham was his name.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Is it safe around these lands. Those… creatures don’t look too friendly.",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "Yeah, Crystalia is full of monsters and such. I would watch my step. Oh, look, That must be his shop there.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Okay, let’s talk to Grisham and ask him if he knows where the Castle is.",
                            "{player.image}",
                            "{player.name}"
                        )
                    ]
                ),
                new Script(
                    "forest_before_grisham",
                    [
                        new ScriptLine(
                            "It’s impossible to see into this forest.",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "It will be until we find a SACRED JEWELL or MAGIC SCROLL.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Oh. Where can we get one of those?",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "I don’t know… but you know what? I think that there used to be a MAGIC SCROLL somewhere in this area. We should ask the SHOPKEEPER GRISHAM. We could buy equipment there too.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Alright, let me get out of this forest. I have a feeling we're being watched...",
                            "{player.image}",
                            "{player.name}"
                        ),
                    ],
                ),
                new Script(
                    "grishams_shop",
                    [
                        new ScriptLine(
                            "Well met traveler. You’re a sight for sore eyes.",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "Well met!",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "Well met, shopkeeper Grisham! Which way to the Castle?",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "While I live and breathe, a Fairy Guide. And you know my name! I thought you were all made up by my Old Nan.",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "Not made up, I’m real. As a matter of fact, we’ve met before.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "We have?! I-I don’t recall. I would think that I would remember such a wonderful being.",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "I would think so too, I mean It wasn’t very long ago. I would say about five or six decades.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Five or Six DECADES!? My Rains, that is almost an entire lifetime ago. I must have been this tall when we met.",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "You were the little runt? Huh, I thought you'd be taller.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Wait a moment. I do remember you! You were so kind, you told us that you were exploring the world and looking at all its wonders.",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "I was!",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Where’s your companion?",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "{player.name}, here, is my companion!",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Ah! Of course. Well, please be careful around here we’ve had a terrible case of bandits down this way. There was a dark magic that came this way, and hid all the bandits in the DARK FOREST.",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "A dark magic? Maybe that's what I sensed was disturbing the Worldstones.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "People are so scared of the DARK FOREST that they’ve stopped traveling this way, even though it’s one of the fastest to the castle.",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "And King Greymoor hasn’t sent soldiers to deal with the bandits?",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "It’s seems not, lad. What with the water shortage and all, the King must be stretched thin guarding every single water wagon moving about the land. Those are the lifeline of Westfalia right now. Everyone’s scared. If it doesn’t rain soon… I don’t know how long we may all live. These are dark times.",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "Don’t worry, Grisham boy! We will handle those bandits.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "You will?!",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "Of course! PC may not look like it, but my companion here was chosen by Fate to save the land. Bandits will be nothing to us!",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "What good tidings. May I, um, ask a favor, Master Fairy Guide? If it’s not too bold of me?",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "Codee…",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "Worry not. We will stay here for the time being and continue on to fight these bandits, my champion and I.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "I’m your champion now?",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "Well, if that’s the case… may I ask a favor? If it’s not too bold of me?",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "Not at all! We are here to provide for the people.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "We… huh? Codee, the castle…?",
                            "{player.image}",
                            "{player.name}"
                            ),
                        new ScriptLine(
                            "Shh.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Master Fairy Guide-",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "You can call me Codee, my lad.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Aye. Master Codee, these bandits did come by here before stopping the north passage. They robbed me of my valuables.",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "Are you okay?",
                            "{player.image}",
                            "{player.name}"
                        ),
                        new ScriptLine(
                            "I am. The money and the things I can do without. I have my health and my water, but there was an heirloom passed down in my family for generations. It is invaluable to me. If you find these bandits and you happen to see a pendant with a Topaz gemstone set in it, please return it to me. You can keep the TOPAZ inside it as a token of my appreciation.",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "Grisham, consider it found. We will route these bandits and get your pendant.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Thank you! Thank you! You are most generous. I, uh, recall you were a different color last time, Master Codee. You had asked me to hold onto this for you. I have been treasuring all this time. Honestly, I thought it a wild dream from my childhood.",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "Of mine?",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Yes, it is a MAGIC SCROLL. I never sold or traded it.",
                            "grisham",
                            "GRISHAM"
                        ),
                        new ScriptLine(
                            "What!? Let me take a look. Oh gosh this is… this is the LOST SCROLL OF MAGIC IMBUING! I- uh… This is splendid! I am most grateful. I will be able to teach PC about creating Magic Items with this.",
                            "codee",
                            "CODEE"
                        )
                    ]
                ),
                new Script(
                    "rejecting_learning_magic_at_grishams",
                    [
                        new ScriptLine(
                            "Alright, {player.name}, but you will probably need to learn this in order to start using the powers Fate has given you",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "Feel free to come and go as you please. You are welcome here. If you need to return to learn your magic, please return.",
                            "grisham",
                            "GRISHAM"
                        ),
                    ]
                ),
                new Script(
                    "accepting_to_learn_magic_at_grishams",
                    [
                        new ScriptLine(
                            "Okay, pay attention, PC. This is going to be fun, but challenging.",
                            "codee",
                            "CODEE"
                        ),
                        new ScriptLine(
                            "What? How?",
                            "{player.image}",
                            "{player.name}"
                        ),
                    ]
                ),
                new Script(
                    "post_magic_grisham_shop",
                    [
                        new ScriptLine(
                            "PC! Master Codee! It's always a pleasure seeing you two. Please have a look at my wares.",
                            "grisham",
                            "GRISHAM"
                        )
                        // This should lead to the Shop Menu/Act
                    ]
                ),
            ],
            [
                new AncientMagicScroll()
            ]
        );
    }

    start = (map, player) => {
        super.start(map, player);
        this.eventListener.trigger(StageManager.EVENTS.DISPLAY_STORY,
            new DialogObject(
                DialogObject.DIALOG_TYPES.SCRIPT,
                this._sortie.getScript("arriving_in_crystalia"),
                () => this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TRAVELING)
            ));
    }

    update = (map, player) => super.update(map, player);
}

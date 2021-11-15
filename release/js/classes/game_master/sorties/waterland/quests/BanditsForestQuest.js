class BanditsForestQuest extends Quest {
    
    constructor(sortie) {
        super("Bandits Forest", sortie, new Point(39, 40), 
        [
            new Script(
                "start_forest_quest",
                [
                    new ScriptLine(
                        "Well, we have rested enough for now, we should be on our way.",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "GRISHAM<br>Of course! The road is dangerous. Would you care to look at some of my wares?",
                        "grisham",
                        "GRISHAM"
                    ),
                    new ScriptLine(
                        "I don't know if wares are going to be enough.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "What do you mean?",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "How can you make such lofty promises to Grisham when we just got here?",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "Because you're the Warrior of Fate.",
                        "codee",
                        "CODEE"
                        ),
                    new ScriptLine(
                        "I can't even remember what I did yesterday, how can I help some nice old man we just met?",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "I'm right here, you know. He he.",
                        "grisham",
                        "GRISHAM"
                    ),
                    new ScriptLine(
                        "Because we must. It's our job as Warriors of Fate, to help the people and save the world. Did you not see the magic you just did?",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "I mean, yeah, but you helped me through that.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "I was just reading a scroll. You did all the hard work. Listen, PC, just believe in yourself. We'll make it happen.",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "But I have never actually fought things before I was… uh… returned. I’m just a regular person.",
                        "{player.image}",
                        "{player.name}"
                        ),
                    new ScriptLine(
                        "Not at all. You were chosen because you were a hero in past lives. In different ways, but always a hero. From helping others in learning to toppling evil rulers. Your soul keeps finding ways to save people.",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "That's the mark of a true hero.",
                        "grisham",
                        "GRISHAM"
                    ),
                    new ScriptLine(
                        "Now that you’ve been able to see Fate and touch the fabric of the world, your past selves will help you on your journey. It won’t happen consciously or overnight. However, I am sure you will find that defending others and helping them will come naturally.",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "I don't know, Codee.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "You are chosen by Fate. You have powers others can’t even fathom. Trust me, I will not lead you where you cannot win.",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "So I should just walk into the forest and ignore what lurks in there?",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "No, this doesn’t mean you can be careless, there are limits to all this. However, if you keep your head about you and fight carefully and with spirit, I have every confidence that we can win and save the world!",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "Y-you're right. I am really glad I met you, Codee.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "Aren’t you though? Hee hee.",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "I- yes. You need to work on being more humble.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "What? I am humble. The most humble!",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "Let’s keep going.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "Don't forget. The CASTLE is North of here. You have to get through the DARK FOREST to reach it.",
                        "grisham",
                        "GRISHAM"
                    ),
                    new ScriptLine(
                        "And the BANDITS we're hunting are in the DARK FOREST. We go into the forest, destroy the bandits, get GRISHAM'S HEIRLOOM!<br>To the Forest we go!",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "Okay, see you!",
                        "grisham",
                        "GRISHAM"
                    ),
                ]
            ),
            new Script(
                "bandits",
                [
                    new ScriptLine(
                        "Not so fast. These here place is our place. You’re trespassing",
                        "enemy_bandit_bandit"
                    ),
                    new ScriptLine(
                        "CODEE<br>You must be the bandit! You best clear out, we’re here to stop you. Your reign of terror stops here! That and the Kingsroad is public so it can’t belong to you.",
                        "codee"
                    ),
                    new ScriptLine(
                        "You started well with that speech, then it fell a little flat.",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "Hahaha. You’re an energetic duo aren’t' ‘cha? Well, why don’t we wear you out a little by taking everything you have on your person?",
                        "enemy_bandit_bandit"
                    ),
                    new ScriptLine(
                        "Oh no you don’t!",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "Let’s fight!",
                        "codee"
                    ),
                ]
            ),
            new Script(
                "post_bandits_fight",
                [
                    new ScriptLine(
                        "Geez, these bandits are tougher than I first thought.",
                        "codee"
                    ),
                    new ScriptLine(
                        "I think you’re overestimating my ability. I’m not much of a fighter.",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "There’s more of the bandits?! This is bad.",
                        "codee"
                    ),
                    new ScriptLine(
                        "Very bad.",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "We can’t lose here. Fate is counting on us!",
                        "codee"
                    ),
                    new ScriptLine(
                        "WOMAN<br>I’ve finally found you, bandits! FIRE!",
                        "character_princess"
                    ),
                    new ScriptLine(
                        "What was that?",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "Fire Magic. Who cast that?",
                        "codee"
                    ),
                    new ScriptLine(
                        "WOMAN<br>This is quite a dangerous place for travellers to be, although I must thank you.",
                        "character_princess"
                    ),
                    new ScriptLine(
                        "Thank us?",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "I have been tracking these bandits for some time. They’re very good at hiding, however, your wandering through here led them out and I was able to route them. One of them should have a clue as to the whereabouts of their hideout in the Dark Forest here.",
                        "character_princess"
                    ),
                    new ScriptLine(
                        "Thank you for helping us. We were in dire straits. Where did you learn magic? Only those touched by Fate can use it.",
                        "codee"
                    ),
                    new ScriptLine(
                        "You know about Magic. Most people just assume I can use magic because of my blood.",
                        "character_princess"
                    ),
                    new ScriptLine(
                        "Blood?",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "I am sorry for not introducing myself. I am Reidite, Princess of Westfalia.",
                        "character_princess"
                    ),
                    new ScriptLine(
                        "A princess!",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "You’re King Greymoor’s daughter! I was looking for the prince boy.",
                        "codee"
                    ),
                    new ScriptLine(
                        "REIDITE<br>Boy? You were looking for my brother?"
                    ),
                    new ScriptLine(
                        "No, looking for King Greymoor, the snot-nosed brat.",
                        "codee"
                    ),
                    new ScriptLine(
                        "Codee here is very old, you see. She’s a Fairy Guide.",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "REIDITE<br>A fairy guide?! A warrior of Fate?! You have come at an opportune time, our Kingdom… the world is in danger!"
                    ),
                    new ScriptLine(
                        "We are aware of the rain stopping.",
                        "codee"
                    ),
                    new ScriptLine(
                        "REIDITE<br>It’s worse than that. The Worldstone has been corrupted. We don’t know how, but this dark shade has come over the castle and poisoned the minds of… the people. The darkness caused them to behave erratically. Father went to see about the stone, but says it’s gone and it’s shattered."
                    ),
                    new ScriptLine(
                        "SHATTERED?!",
                        "codee"
                    ),
                    new ScriptLine(
                        "REIDITE<br>Yes. There are pieces scattered about, he has been going about collecting them. He must be back at the castle."
                    ),
                    new ScriptLine(
                        "That’s where we’re going. We’ve been looking for King Greymoor to let him know we’re here to help with the stone.",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "We didn’t know things were this dire, no wonder it’s not raining. The water is all drying up. Soon, without water, the world will die.",
                        "codee"
                    ),
                    new ScriptLine(
                        "REIDITE<br>This must be Fate"
                    ),
                    new ScriptLine(
                        "Well… yes. It is. We were sent by… never mind. We need to get to the castle.",
                        "codee"
                    ),
                    new ScriptLine(
                        "Codee, we promised Grisham we would get the pendant from the bandits.",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "{player.name}, things are much more dire than I first thought. If a Worldstone is tainted or weakened, the powers of its element will wane, but if one is shattered the element will disappear from the world. It cannot be recovered. Elements cannot be created, they are the last remnants of the Primordial Gods themselves. We’re talking Fate’s great-great-great-great-great-great-great-",
                        "codee"
                    ),
                    new ScriptLine(
                        "Okay, I get it.",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "Great-great grandparents.",
                        "codee"
                    ),
                    new ScriptLine(
                        "I get it!!",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "REIDITE<br>Master Codee, I understand your urgency for getting to my father, but I would be grateful if you came with me to the Bandit’s Camp. There are too many of them and I cannot peer into the fabric of the world like you Warriors of Fate can. One of our last wagons of water stolen by these bandits was carrying one of the shards of the Worldstone. It’s possible they don’t even know what it is. If we can sneak in and steal it quickly-"
                    ),
                    new ScriptLine(
                        "We can fight very few Bandits while getting all the rewards! Princess Reidite, that’s perfect!",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "REIDITE<br>Thank you. I do know that they carry everything in a bellish_pouch. You can use your fabled scrying powers to peer into their packs and see which bandit has the stone and which ones do not."
                    ),
                    new ScriptLine(
                        "You can do that?",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "No, but you can.",
                        "codee"
                    ),
                    new ScriptLine(
                        "I- what?",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "You will need to tap into the fabric of the world, get all the bandits, and find which one has the Worldstone. We can also find which Bandit has Grisham’s Pendant!",
                        "codee"
                    ),
                    new ScriptLine(
                        "I don’t know how to do that.",
                        "{player.image}"
                    ),
                    new ScriptLine(
                        "Let me teach you.",
                        "codee"
                    ),
                ]
            ),
            new Script(
                "finding_the_bandits_hideout",
                [
                    new ScriptLine(
                        "REIDITE<br>While you were training, I found this on that bandit there. It’s a small map. It will lead us right to their camp."
                    ),
                    new ScriptLine(
                        "CODEE<br>Let’s go."
                    ),
                    new ScriptLine(
                        "PC<br>Do you think the magic spell will work?"
                    ),
                    new ScriptLine(
                        "CODEE<br>Now that a Worldstone is involved, it will have to work. The life of everyone in this world depends on it."
                    ),
                    new ScriptLine(
                        "REIDITE<br>Let’s go!"
                    )
                ]
            ),
            new Script(
                "in_the_forest",
                [
                    new ScriptLine(
                        "REIDITE<br>There are too many Bandits in this camp."
                    ),
                    new ScriptLine(
                        "PC<br>I think we underestimated how many there would be."
                    ),
                    new ScriptLine(
                        "CODEE<br>I estimated fifty-eight bandits and I count fifty-seven and a quarter bandits."
                    ),
                    new ScriptLine(
                        "PC<br>What? How can there be a quarter bandit?"
                    ),
                    new ScriptLine(
                        "CODEE<br>Look at that one by the fire. He’s so tall he is an entire quarter bandit more than the others."
                    ),
                    new ScriptLine(
                        "REIDITE<br>I… don’t know that’s how quarters work."
                    ),
                    new ScriptLine(
                        "PC<br>I don’t think that’s how counting works."
                    ),
                    new ScriptLine(
                        "CODEE<br>Whatever."
                    ),
                    new ScriptLine(
                        "REIDITE<br>So, PC, you need to call the spell so we can scry through all the bandits, look into their bellish_pouch and find the Shard and the Heirloom."
                    ),
                    new ScriptLine(
                        "PC<br>Yeah, but knowing won’t solve the issue of getting the things."
                    ),
                    new ScriptLine(
                        "CODEE<br>Look at the patterns, PC. They’re all split into groups. We can take on a group or two and still have enough energy to get out without getting caught."
                    ),
                    new ScriptLine(
                        "PC<br>If we start fighting more than that…"
                    ),
                    new ScriptLine(
                        "REIDITE<br>We may not get out of the forest alive."
                    ),
                    new ScriptLine(
                        "PC<br>Okay. I will call the spell and see which groups we need to attack."
                    )]
            ),
            new Script(
                "choosing_bandit_group",
                [
                    new ScriptLine(
                        "PC<br>Let’s get that group!"
                    ),
                    new ScriptLine(
                        "REIDITE<br>Okay, let’s get them!"
                    ),
                ]
            ),
            new Script(
                "got_heirloom_first",
                [
                    new ScriptLine(
                        "PC<br>We got Grisham’s Heirloom!!"
                    ),
                    new ScriptLine(
                        "REIDITE<br>We need to get the stone and get out of here! Why are we getting that thing first?"
                    ),
                    new ScriptLine(
                        "CODEE<br>We’re here to save the whole world, not just some of it. Grisham needs us and asked us a favor."
                    ),
                    new ScriptLine(
                        "REIDITE<br>Let’s get the right bandit this time."
                    ),
                    new ScriptLine(
                        "CODEE<br>We’ve gotten their attention! We need to pick another group now. We won’t be able to hold them off for long."
                    )
                ]
            ),
            new Script(
                "got_worldstone_shard_first",
                [
                    new ScriptLine(
                        "REIDITE<br>Okay, we have the stone, let’s go."
                    ),
                    new ScriptLine(
                        "PC<br>We can’t. Grisham asked us to find his Heirloom. We need to get it from the bandits!"
                    ),
                    new ScriptLine(
                        "REIDITE<br>What?! The fate of the world depends on this shard! We need to get it to my father, fast!"
                    ),
                    new ScriptLine(
                        "CODEE<br>PC is right, Reidite. We’re here to save the whole world, not just some of it. Grisham needs us. He asked us a favor."
                    ),
                    new ScriptLine(
                        "PC<br>You're also the one who put us up to all this."
                    ),
                    new ScriptLine(
                        "REIDITE<br>…<br>Fine. Let’s get the heirloom and then we get out of here!"
                    ),
                    new ScriptLine(
                        "CODEE<br>We’ve gotten their attention! We need to pick another group now. We won’t be able to hold them off for long."
                    ),
                ]
            ),
            new Script(
                "got_no_item",
                [
                    new ScriptLine(
                        "CODEE<br>PC, where are the items?!"
                    ),
                    new ScriptLine(
                        "PC<br>I think I panicked and chose the wrong group"
                    ),
                    new ScriptLine(
                        "CODEE<br>We’ve gotten their attention! We need to pick another group now. We won’t be able to hold them off for long."
                    ),
                    new ScriptLine(
                        "REIDITE<br> Pick the right group! We need to use your magic! I don’t want to die here, PC!"
                    ),
                ]
            ),
            new Script(
                "got_all_items",
                [
                    new ScriptLine(
                        "PC<br>That’s everything. We need to run!"
                    ),
                    new ScriptLine(
                        "CODEE<br>Let’s go!"
                    ),
                    new ScriptLine(
                        "REIDITE<br>You sure are strange heroes!"
                    ),
                ]
            ),
            new Script(
                "out_of_the_forest",
                [
                    new ScriptLine(
                        "REIDITE<br>We need to go to the Castle. It’s in the [Northeast] direction. When I left, my Father did speak of shadows lurking about. Be ready for anything."
                    ),
                    new ScriptLine(
                        "CODEE<br>We could go south, he's near the center of the Kingdom, and return to Grisham’s and buy some weapons and items, if we need them. We can also return his Heirloom and thank him for teaching us how to get magic items."
                    ),
                    new ScriptLine(
                        "REIDITE<br>I am not opposed to getting well-equipped, but we must hurry to the castle. Father awaits."
                    ),
                ]
            )
        ],
        [
            new CeruleanCompass(),
            new GrishamsHeirloom(),
            new WaterstoneShard(),
        ])
    }

    start = (map, player) => {
        super.start(map, player);

        this.eventListener.trigger(
            StageManager.EVENTS.DISPLAY_DIALOG,
            new DialogObject(
                DialogObject.DIALOG_TYPES.SCRIPT,
                this._sortie.getScript("start_forest_quest")
            )
        );

        [
            new Point(33, 48),
            new Point(34, 47),
            new Point(34, 46),
            new Point(33, 45),
            new Point(33, 44),
            new Point(32, 43),
            new Point(32, 42),
            new Range(new Point(33, 37), new Point(33, 41)),
            new Range(new Point(34, 37), new Point(36, 37)),
            new Range(new Point(37, 36), new Point(41, 36)),
            new Range(new Point(42, 35), new Point(48, 35)),
        ].forEach(range => {
            if ( range instanceof Point) {
                map[range.y][range.x].character = null;
            } else {
                // add place to mapSquares
                for ( let y = range.start.y; y <= range.end.y; y ++ )
                    for ( let x = range.start.x; x <= range.end.x; x ++ )
                        map[y][x].character = null;
            }
        })

        this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TRAVELING);
    }
}
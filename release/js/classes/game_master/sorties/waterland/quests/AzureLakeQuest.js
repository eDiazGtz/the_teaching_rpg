class AzureLakeQuest extends Quest {
    
    constructor(sortie) {
        super("Azure Lake", sortie, new Point(35, 14),
        [ // Scripts
            new Script(
                "respite_town",
                [
                    
                    new ScriptLine(
                        "Father!",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "Reidite? I'm so glad you're safe! When did you get here? ",
                        'king_greymoor',
                        'KING GREYMOOR'
                    ),
                    new ScriptLine(
                        "Father, it’s terrible",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "You saw Darburite.",
                        'king_greymoor',
                        'KING GREYMOOR'
                    ),
                    new ScriptLine(
                        "You know about him in the castle? What happened?",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "Who is this?",
                        'king_greymoor',
                        'KING GREYMOOR'
                    ),
                    new ScriptLine(
                        "We are Warriors of Fate. Here to save the world. We would love to chat, but we have to get the Worldstone back in order! It’s critical.",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "Warriors of Fate?",
                        'king_greymoor',
                        'KING GREYMOOR'
                    ),
                    new ScriptLine(
                        "Codee is a Fairy Guide. I am but the hand of Fate.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "{player.name} can weave the fabric of the world, Father. It is unlike anything I have ever witnessed.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "These are trying times. Fate has brought us together, I see why you are in the company of my daughter. I’m sorry my… Darburite caused you pain.",
                        'king_greymoor',
                        'KING GREYMOOR'
                    ),
                    new ScriptLine(
                        "He’s being controlled by the darkness.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "...",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "Yes, I saw it myself. When the rain first stopped. It was strange, and strange things were happening in the castle. Deep in the keep, the water kept disappearing.",
                        'king_greymoor',
                        'KING GREYMOOR'
                    ),
                    new ScriptLine(
                        "You mentioned this happened when the Worldstone was taken from its... you don't mean Danburite took it!",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "arburite took the Wolrdstone from Azure Lake. Its color had been tainted into a dark blue. It was cursing this land, who was tasked to protect the Worldstone. My son... consumed by hatred. Greed.",
                        'king_greymoor',
                        'KING GREYMOOR'
                    ),
                    new ScriptLine(
                        "That’s not my brother. He’s kind and gentle.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "We don’t have time. I need to zap the darkness out of the shards of the Worldstone. I can only hold the darkness back for a short time. We will need magic to put it back together quickly. { player.name }, that’s your job.",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "Y- you can put the Worldstone back together?! The Warriors of Fate indeed. How can I help?",
                        'king_greymoor',
                        'KING GREYMOOR'
                    ),
                    new ScriptLine(
                        "Do you have all the shards of the Worldstone?",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "Codee, be more considerate. They’re going through a tough time.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "The world is going through a tough time! You don’t understand, if we don’t hurry and the stone isn’t put together right now, it will die. Water will die. Everyone will die!",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "Let's do it!",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "Fate, hear our call. Clear the darkness and fuse the stone!",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "By all that is holy and right. You’ve done it!",
                        'king_greymoor',
                        'KING GREYMOOR'
                    ),
                    new ScriptLine(
                        "The stone. It’s put together, and I have whisked the darkness away from it, but it’s still not glowing.",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "It probably needs to go back to its resting place. That is where it was able to connect with the land.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "Yes. We had sealed Lake Azure with the DOOR OF THE ANCIENTS. It will need a password to enter. It is set by two of my guards. Speak to them, and they will give you the two KEYS to have the password.",
                        'king_greymoor',
                        'KING GREYMOOR'
                    ),
                    new ScriptLine(
                        "Thank you, your Majesty!",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "We will speak with the guards, get the two KEYS. Then, head over to LAKE AZURE in the [Northwest]!",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "Fate guide you.",
                        'king_greymoor',
                        'KING GREYMOOR'
                    ),
                ]
            ),
            new Script(
                "at_the_lake",
                [
                    new ScriptLine(
                        "PC<br>We made it!"
                    ),
                    new ScriptLine(
                        "REIDITE<br>Quick, let’s restore the power to the land."
                    ),
                    new ScriptLine(
                        "DANBURITE<br>You think it’ll be that easy? I saw you used some of your witchcraft to weaken my forces, but I won’t be that easy to contend with."
                    ),
                    new ScriptLine(
                        "PC<br>Danburite."
                    ),
                    new ScriptLine(
                        "DANBURITE<br>KING Danburite."
                    ),
                    new ScriptLine(
                        "CODEE<br>You’re nothing but a usurper possessed by darkness"
                    ),
                    new ScriptLine(
                        "REIDITE<br>…"
                    ),
                    new ScriptLine(
                        "DANBURITE<br>I am not possessed by darkness, I control it. I called it, to take back what’s mine!"
                    ),
                    new ScriptLine(
                        "REIDITE<br>This isn’t you! You wouldn’t do this!"
                    ),
                    new ScriptLine(
                        "DANBURITE<br>I would do anything to take back what’s rightfully mine."
                    )
                ]
            ),
            new Script(
                "danburite_defeated",
                [
                    new ScriptLine(
                        "REIDITE<br>Why? Why did it have to be this way?"
                    ),
                    new ScriptLine(
                        "CODEE<br>He’s injured, but he’s still with us, Reidite. Stay with him and apply first aid. PC and I will handle the stone."
                    ),
                    new ScriptLine(
                        "PC<br>Handle the stone? I mean, we can’t just throw it in the Lake?"
                    ),
                    new ScriptLine(
                        "CODEE<br>What?! No, we can’t just *throw* it in the lake. We’re gonna need all your magic in order to put this in the lake. "
                    )
                ]
            ),
            new Script(
                "act_i_finale",
                [
                    new ScriptLine(
                        "REIDITE<br>It’s raining. IT’S RAINING!"
                    ),
                    new ScriptLine(
                        "PC<br>We did it."
                    ),
                    new ScriptLine(
                        "CODEE<br>You did it, PC. "
                    ),
                    new ScriptLine(
                        "REIDITE<br>It hasn’t rained in months. We thought this was the end. You two. You saved us all."
                    ),
                    new ScriptLine(
                        "CODEE<br>It was nothing."
                    ),
                    new ScriptLine(
                        "PC<br>It was actually quite a lot, Codee."
                    ),
                    new ScriptLine(
                        "CODEE<br>Will you just-"
                    ),
                    new ScriptLine(
                        "REIDITE<br>You are the strangest heroes I have ever met."
                    ),
                    new ScriptLine(
                        "CODEE<br>We’re the bes-"
                    ),
                    new ScriptLine(
                        "PC<br>Thank you, Princess Reidite."
                    ),
                    new ScriptLine(
                        "REIDITE<br>You must join us for a banquet at the Castle."
                    ),
                    new ScriptLine(
                        "CODEE<br>We can’t. This wasn’t the only Worldstone that was in danger. All may not be in trouble, but we must ensure all four are okay. "
                    ),
                    new ScriptLine(
                        "REIDITE<br>If I am honest, some time ago, my Fire magic became weaker. I thought it was due to the rain, but people have been mentioning the difficulty starting fires to keep warm."
                    ),
                    new ScriptLine(
                        "CODEE<br>That must be the fire worldstone."
                    ),
                    new ScriptLine(
                        "REIDITE<br>Travel [Northward] to the Ellevar Plains, there you will find the wandering Ellevar People. They worship the Gods of Fire and Light. We acknowledge those gods, but they should all be worshipped. None to be held above others."
                    ),
                    new ScriptLine(
                        "CODEE<br>Sounds like we’ve got our work cut out for us."
                    ),
                    new ScriptLine(
                        "PC<br>Can’t we just have one teensy banquet?"
                    ),
                    new ScriptLine(
                        "CODEE<br>We’ll have a banquet at the next one."
                    ),
                    new ScriptLine(
                        "REIDITE<br>No one throws a banquet quite like Westfalia."
                    ),
                    new ScriptLine(
                        "CODEE<br>Oh, alright. We deserve it"
                    ),
                    new ScriptLine(
                        "PC<br>Yes!!"
                    )
                ]
            ),
            // Be sure to add Narration Text between these two --- ** And so Westfalia Kingdom was saved and rain returned to all of Crystalia. However, there were many dangers afoot still. After a wonderful feast where our heroes enjoyed themselves and shared laughs with all, they were escorted to the edge of Westfalia Kingdom, where the Ellevar Plains await. **
            new Script(
                "entr'acte_heading_to_the_firelands",
                [
                    new ScriptLine(
                        "REIDITE<br>This is goodbye, then?"
                    ),
                    new ScriptLine(
                        "CODEE<br>We have to depart"
                    ),
                    new ScriptLine(
                        "PC<br>You should come with us. We could use a strong ally."
                    ),
                    new ScriptLine(
                        "CODEE<br>PC, we can’t bring anyone along. This is *our* journey. "
                    ),
                    new ScriptLine(
                        "PC<br>Just because it’s ours doesn’t mean we can’t bring friends along."
                    ),
                    new ScriptLine(
                        "REIDITE<br>I am flattered by your invitation, but Master Codee is right. I cannot join you. I have much to do here in Westfalia. My brother… I don’t believe the darkness poisoned his mind. "
                    ),
                    new ScriptLine(
                        "CODEE<br>The darkness doesn’t do that. It is attracted to the darkness in people’s hearts. There is light and dark in all of us, and we are each charged in keeping a balance. Too much of either is never good. "
                    ),
                    new ScriptLine(
                        "REIDITE<br>I will help my brother how I can. Father has already called forth doctors of the mind to try and talk to my brother, see what ails him. It seems that he has kept quiet about his heart for too long. "
                    ),
                    new ScriptLine(
                        "PC<br>I believe your family will recover."
                    ),
                    new ScriptLine(
                        "REIDITE<br>I don’t know about recover, but at least start anew."
                    ),
                    new ScriptLine(
                        "PC<br>We will make sure there’s a world out there so you can start anew."
                    ),
                    new ScriptLine(
                        "REIDITE<br>Thank you. I must return. Have a safe journey."
                    ),
                    new ScriptLine(
                        "PC<br>Goodbye, Princess."
                    ),
                    new ScriptLine(
                        "REIDITE<br>So long, PC. So long, Master Codee."
                    ),
                    new ScriptLine(
                        "CODEE<br>See ya! Be safe!"
                    ),
                ]
            )
        ],

        [
            new WaterRelic(),
        ])
    }

    start(map, player) {
        super.start(map, player);
        console.log('Azure Lake Start');
    
        // Adding List of VillagerEvents to ADD upon Quest Start
    let kingAndMen = [
        // King Greymoor
        new VillagerEvent(new Point (4,25), 'king_greymoor'),
        // Kingsguard
        new VillagerEvent(new Point (3,24), 'kingsguard'),
        new VillagerEvent(new Point (5,24), 'kingsguard'),
        new VillagerEvent(new Point (3,26), 'kingsguard'),
        new VillagerEvent(new Point (5,26), 'kingsguard'),
        ]
        let respiteVillage = this._sortie._places[1]
        let respiteEventArray = respiteVillage._layout.doors;

        // absolute ruler danburite

        // for each event - push VillagerEvent into 'doors' event array
        kingAndMen.forEach(event => {
            // if ( event.point.x == 3 && event.point.y == 24 || event.point.x == 5 && event.point.y == 24 || event.point.x == 3 && event.point.y == 26 || event.point.x == 3 && event.point.y == 26 ) {
            //     event.imageName = 'kingsguard';
            //     console.log('kingsguard')
            // } else if ( event.point.x == 4 && event.point.y == 25 ) {
            //     event.imageName = 'king_greymoor';
            //     console.log('greymoor')
            // }
            respiteEventArray.push(event);
            this.eventListener.trigger(GameMaster.EVENTS.MAP_UPDATED);
                })
        
        this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TRAVELING);
    }
}
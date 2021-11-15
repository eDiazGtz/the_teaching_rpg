class CastleGreymoorQuest extends Quest {
    
    constructor(sortie) {
        super("Castle Greymoor", sortie, new Point(36, 18),
        [ // Scripts
            new Script(
                "the_castle_main_door",
                [
                    new ScriptLine(
                        "Welcome to Castle Greymoor",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "We've made it.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "Reidite, you've got some scary-looking soldiers coming this way.",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "What are those? Trolls?!",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "Oh Fate! Codee, I don't think they're with the Princess.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "Get ready for battle.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "They're upon us!",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "Take that monster!",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "What?! Both of your attacks had no effect on them? Oh no, they're powered by darkness... without the power of the Worldstone we will... we need to get out of here.",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "I can't leave my father.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "There she is, everyone. The traitor we have been looking for. Reidite.",
                        'hooded_human'
                    ),
                    new ScriptLine(
                        "Danburite?",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "Guards, take her. She's the one responsible for the King's death! She's the reason it has stopped raining. Throw her and her traitor friends in the dungeon!",
                        'danburite',
                        'DANBURITE'
                    ),
                    new ScriptLine(
                        "Reidite?!",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "We can't fight them! Can we run?",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "There's nowhere to run. Take them!",
                        'danburite',
                        'DANBURITE'
                    ),
                    new ScriptLine(
                        "What nonesense are you spewing?! Where is Father, Danburite! Answer me, brother!",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "That's *King* Danburite to you, and I deny your request for an audience. Take them away!",
                        'danburite',
                        'DANBURITE'
                    ),
                ]
            ),
            new Script(
                "captured", [
                    new ScriptLine(
                        "This doesn't look like much of a dungeon.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "Father's castle doesn't have dungeons... this is a room in in the East Wing.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "Okay, Princess, what is going on? Why does your brother say you killed your father?",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "I don't know. I have been away for some time tracking the bandits and that last Worldstone shard...",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "I think this must be some misunderstanding. If we talk to the Prince.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "I fear it's worse than that. He said he was King, but I'm the heir to the throne. I... let's just get out of here. The doors all need a passcode to open.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "Okay, let's get out of here first then deal with everything. I just need to know. Did you kill King Greymoor.",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "No! I don't believe my brother did so either. Something has happened to him. Ever since he took the stone from Azure Lake.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "Your brother wrought all this chaos?",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "If that's the case, he may be possessed by the darkness, although I have never known it to... change people. What did you say about a password for the door?",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "The doors in the castle require a spoken password. However, I tried the one here already, its been changed. I did swipe this from one of the Trolls. We pass these papers when we change the spoken passwords. It's meaning is encoded though. We would need to write out the alphabet and figure out how many letters it has been shifted.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "You its encoded with a standard cipher? I know of these. We can decode a message by changing each character with another depending on how much the alphabet has shifted. If we shift by one, any letter would move forward one. A becomes B and so forth. Then, Z becomes A at the end. Do we have anything we can write with?",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "We don't.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "{player.name}, How did you know all that?",
                        "codee",
                        "CODEE"
                    ),
                    new ScriptLine(
                        "I don't know. I just did. It's like you said, my past lives are helping me, little by little. Without something to write we would have to mentally do it. It would be hard and time consuming.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "There's not time. We need to put the Worldstone back together again and remove the darkness. Else, all the water from the world will be gone.",
                        'codee',
                        'CODEE'
                    ),
                    new ScriptLine(
                        "Is there a magic we can use? Reidite what's that you're wearing? Codee seems to need special items in order to help me change the fabric of the world.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "This is my Royal Pendant. It's a gift from my father, but if this will help save the world you can have it. A pendant is a pendant.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "Okay, I like where your head's at. But even if we can make this pendant into a magic item that can decode things from a scrambled state to a regular state, we're gonna need to know what we're decoding and how much to shift the alphabet by.",
                        'codee',
                        'CODEE'
                    ),
                    new ScriptLine(
                        "Here. I picked it from the Troll that was taking our equipment. It reads: 'The new password is ehyre' and here it says '13' ",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "They've kept the password encoded. However, looks like they included the number we need to rotate by.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "Let's talk magic.",
                        'codee',
                        'CODEE'
                    ),
                    //Lesson
                ]
            ),
            new Script(
                "final_table", [
                    new ScriptLine(
                        "The door to the outside seems to have a different password than what we've been using.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "What does it say?",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "Reidite? You've gone quiet.",
                        'codee',
                        'CODEE'
                    ),
                    new ScriptLine(
                        "The note here reads: 'The latest report shows that Greymoor is alive. King Danburite demands the man's head. Reports also say that Greymoor was headed toward RESPITE TOWN. Find him and destroy him. Put all three codes together for our final password. 'Abosolute R...'' Looks like the rest is torn.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "What has happened to Danburite?",
                        'codee',
                        'CODEE'
                    ),
                    new ScriptLine(
                        "Princess Reidite, this must be terrible for you",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "The note says King Greymoor is in RESPITE TOWN. I recall that town near here",
                        'codee',
                        'CODEE'
                    ),
                    new ScriptLine(
                        "He was always so gentle. Quiet. He was the rock we leaned on when everything went awry.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "He's not himself, I sensed darkness in him.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "You could?!",
                        'codee',
                        'CODEE'
                    ),
                    new ScriptLine(
                        "Why is that surprising Codee?",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "Well, sensing darkness is something that us Fairy Guides can sense. Not humans.",
                        'codee',
                        'CODEE'
                    ),
                    new ScriptLine(
                        "Well, I felt it when I saw him. I think we all felt it.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "That wasn’t my brother. He wasn't himself",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "Darkness doesn’t chang-",
                        'codee',
                        'CODEE'
                    ),
                    new ScriptLine(
                        "It doesn’t let you be who you are. It takes hold and changes you.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "If we find father we can get the stone together. It’s power can dispel the power of darkness that takes hold of my brother. Wait, what's wrong with that shard?",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "Oh no. It’s tainted.",
                        'codee',
                        'CODEE'
                    ),
                    new ScriptLine(
                        "It’s blue glow… it’s gone.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "It’s grey. It looks dead.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "This is bad. For this one, I should be able to dispel the darkness, but if the whole Worldstone gets like that… it will be beyond anything I or Fate can do.",
                        'codee',
                        'CODEE'
                    ),
                    new ScriptLine(
                        "We have to hurry.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "RESPITE TOWN is to the [Southwest] of the castle. If we follow the outskirts of the DARK FOREST we will be able to find it. If we reach LAKE AZURE, we can travel [south] to RESPITE TOWN.",
                        'reidite',
                        'REIDITE'
                    ),
                    new ScriptLine(
                        "Let’s go. We'll follow the treeline to RESPITE TOWN. In the meantime, starting with 'ABSOLUTE R' we need to input all three codes into this Main Door to exit the castle.",
                        "{player.image}",
                        "{player.name}"
                    ),
                    new ScriptLine(
                        "There, this shard is clear of darkness. As for the rest of it... I hope we’re not too late.",
                        'codee',
                        'CODEE'
                    ),
                ]
            ),
        ],

        [
            new RoyalPendant(),
            new GrishamsHeirloom(),
            new WaterstoneShard(),
        ])
    }

    start(map, player) {
        super.start(map, player);
        
        this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TRAVELING);
    }
}
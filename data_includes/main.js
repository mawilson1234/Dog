PennController.ResetPrefix(null) // Shorten command names (keep this line here)
PennController.DebugOff()

PennController.SetCounter( "setcounter" )

var counterOverride = 0

Sequence("setcounter","intro", "consent", "recording", "instruction", randomize("trial_prac"), "warn", "instruction2", rshuffle("pretrial"), rshuffle("trial"), "feedback", SendResults(), "bye")

newTrial( "intro",

    newText("Welcome","Welcome! This experiment has two halves. Following the first half, you will see a link to the second half, which will have different instructions you will see at that time.<p>To participate in this experiment, you must meet the following requirements.<p>(1) Your computer must have a microphone (a built-in microphone is fine).<p>(2) Your browser must be either Chrome or Firefox. You CANNOT use Safari for this experiment.<p>(3) You must turn off music/video (e.g., YouTube) played on the same computer you are using to take this experiment.<p>(4) Please note that you will be asked to speak aloud during the experiment (recite simple sentences and pronounce fake words aloud). Your speech will be recorded and that's our critical data.<p>If you meet these requirements, please enter your Prolific ID below and click Next:")
        .settings.css("font-size", "2em")
        .print()
    ,
    
    newTextInput("ProlificID")
        .before(newText("ID", "Your Prolific ID:")
                .settings.css("font-size", "2em")
        )
        .settings.css("font-size", "2em")
        .settings.css('width', '50%')
        .settings.css('margin', 'auto')
        .print()
        .log()
    ,
    
    newButton("Next","Next")
        .center()
        .settings.css("font-size", "2em")
        .settings.css('margin', '40px')
        .settings.size(500, 48)
        .print()
        .wait()
)

newTrial( "consent" ,
    newText("Please click <a href='https://shotam.github.io/IRB/consent_online_recording.pdf' target='_blank'>here</a> to download the consent form for this study. If you read it and agree to participate in this study, click 'I Agree' below. If you do not agree to participate in this study, you can leave this study by closing the tab.")
        .settings.css("font-size", "2em")
        .print()
    ,
    
    newButton("Agree","I Agree")
        .center()
        .settings.css("font-size", "2em")
        .settings.css('margin', '40px')
        .settings.size(500, 48)
        .print()
        .wait()
)

InitiateRecorder("https://umassgaplab.net/experiment/PCIbex_server.php", "<div style = 'font-size: 2em; margin: 40px;'>This experiment collects audio recordings. <strong>Once you grant it access to your recording device, you will be notified of whether you are being recorded by a label at the top of the page.</strong></div>").label("recording")

newTrial("instruction",
    newText("Instr", "In this experiment, you will first read a sentence in a word-by-word fashion, then pronounce a series of fake words out loud, and then say out loud the sentence you memorized.<p>When reading the sentence, you will first see a long dash appear. Press the Space bar to show the first word when you are ready. When you are finished reading each word, you should press the Space bar to proceed, which will replace the previous word with the next one. Your task is to read the sentence silently and <b>memorize the sentence for later recall.</b></p> <p>After you see each sentence, you will see five stars, like this '*****'. When you are ready, you should press the Space bar again to proceed to the second task, which is to <b>pronounce each fake word out loud</b> as it is presented to you <b>as soon as possible</b>. If you are unsure about how to pronounce a particular fake word, just try your best. After you have pronounced the fake words, you will see the text 'Recall Sentence' appear on the screen. When you see 'Recall Sentence' appear, you should recite the sentence you memorized earlier <b>aloud</b>, as soon as possible.</p> <p><b>TIP: Many people find it helpful to try to visualize the situations described by sentences when memorizing them.</b></p>")
        .settings.css("font-size", "2em")
        .print()
    ,

    newButton("Click","Click here to begin practice trials!")
        .center()
        .settings.css("font-size", "2em")
        .settings.css("margin", "40px")
        .settings.size(500, 48)
        .print()
        .wait()
)

PennController.Template("practice.csv", variable => ["trial_prac",

        "DashedSentenceBig", {
            s: variable.Sentence, 
            display: "in place"
        },
        
        "PennController", PennController(
        
            newMediaRecorder(variable.Item, "audio")
                .record()
            ,
            
            newAudio("click_prac", "click.wav")
                .play()
                .wait()
            ,
        
            newText("word1", variable.word1)
                .settings.css("font-size", "2em")
                .center()
                .print()
            ,
            
            newTimer(variable.wait1)
                .start()
                .wait()
            ,
            
            getText("word1")
                .remove()
            ,
            
            newText("word2", variable.word2)
                .settings.css("font-size", "2em")
                .center()
                .print()
            ,
            
            newTimer(variable.wait2)
                .start()
                .wait()
            ,
            
            getText("word2")
                .remove()
            ,
            
            newText("word3", variable.word3)
                .settings.css("font-size", "2em")
                .center()
                .print()
            ,
            
            newTimer(variable.wait3)
                .start()
                .wait()
            ,
            
            getText("word3")
                .remove()
            , 
            
            newText("word4", variable.word4)
                .settings.css("font-size", "2em")
                .center()
                .print()
            ,
            
            newTimer(variable.wait4)
                .start()
                .wait()
            ,
            
            getText("word4")
                .remove()
            ,            
            
            newText("recall_prompt", "Recall Sentence")
                .settings.css("font-size", "2em")
                .color("red")
                .center()
                .print()
            ,
        
            newTimer("recall_timer",6500)
                .start()
                .wait()
            ,
            
            getText("recall_prompt")
                .remove()
            ,
            
            newButton("Next")
                .center()
                .settings.css("font-size", "2em")
                .settings.size(240, 48)
                .print()
                .wait()
                .remove()
        )
    ]
)

newTrial( "warn",
    newText("Practice done!<p><b>Please note: some participants have reported that the script froze in the middle of the experiment. If this happens to you, please don???t panic, and let us know via the message function in Prolific. We will make sure that you will be compensated for the time you spent for the experiment.</b></p>")
        .settings.css("font-size", "2em")
        .print()
    ,
    newButton("Next", "Next")
        .center()
        .settings.css("font-size", "2em")
        .settings.css('margin', '40px')
        .settings.size(500, 48)
        .print()
        .wait()
)

newTrial("instruction2",
    newText("Instr2", "Now, you are ready to start the experiment! Remember, your task is to:<p>(1) Silently read and memorize sentences presented in a word-by-word fashion.<p>(2) Read aloud each fake word presented after the sentence.<p>(3) When you see the words 'Recall Sentence,' say the sentence you memorized out loud.")
        .settings.css("font-size", "2em")
        .print()
    ,

    newButton("Click","Click here to begin the experiment")
        .center()
        .settings.css("font-size", "2em")
        .settings.css('margin', '40px')
        .settings.size(550, 48)
        .print()
        .wait()
)

PennController.Template("pretrial.csv", variable => ["pretrial",

        "DashedSentenceBig", {
            s: variable.Sentence, 
            display: "in place"
        },
        
        "PennController", PennController(
        
            newMediaRecorder(variable.Item, "audio")
                .record()
            ,
            
            newAudio("click_prac", "click.wav")
                .play()
                .wait()
            ,
        
            newText("word1", variable.word1)
                .settings.css("font-size", "2em")
                .center()
                .print()
            ,
            
            newTimer(variable.wait1)
                .start()
                .wait()
            ,
            
            getText("word1")
                .remove()
            ,
            
            newText("word2", variable.word2)
                .settings.css("font-size", "2em")
                .center()
                .print()
            ,
            
            newTimer(variable.wait2)
                .start()
                .wait()
            ,
            
            getText("word2")
                .remove()
            ,
            
            newText("word3", variable.word3)
                .settings.css("font-size", "2em")
                .center()
                .print()
            ,
            
            newTimer(variable.wait3)
                .start()
                .wait()
            ,
            
            getText("word3")
                .remove()
            , 
            
            newText("word4", variable.word4)
                .settings.css("font-size", "2em")
                .center()
                .print()
            ,
            
            newTimer(variable.wait4)
                .start()
                .wait()
            ,
            
            getText("word4")
                .remove()
            ,            
            
            newText("recall_prompt", "Recall Sentence")
                .settings.css("font-size", "2em")
                .color("red")
                .center()
                .print()
            ,
        
            newTimer("recall_timer",6500)
                .start()
                .wait()
            ,
            
            getText("recall_prompt")
                .remove()
            ,
            
            newButton("Next")
                .center()
                .settings.css("font-size", "2em")
                .settings.size(240, 48)
                .print()
                .wait()
                .remove()
        )
    ]
)

PennController.Template("stim.csv", variable => ["trial",

        "DashedSentenceBig", {
            s: variable.Sentence, 
            display: "in place"
        },
        
        "PennController", PennController(

            newMediaRecorder(variable.Item, "audio")
                .record()
            ,
            
            newAudio("click", "click.wav")
                .play()
                .wait()
            ,
        
            newText("word1", variable.word1)
                .settings.css("font-size", "2em")
                .center()
                .print()
            ,
            
            newTimer(variable.wait1)
                .start()
                .wait()
            ,
            
            getText("word1")
                .remove()
            ,
            
            newText("word2", variable.word2)
                .settings.css("font-size", "2em")
                .center()
                .print()
            ,
            
            newTimer(variable.wait2)
                .start()
                .wait()
            ,
            
            getText("word2")
                .remove()
            ,
            
            newText("word3", variable.word3)
                .settings.css("font-size", "2em")
                .center()
                .print()
            ,
            
            newTimer(variable.wait3)
                .start()
                .wait()
            ,
            
            getText("word3")
                .remove()
            , 
            
            newText("word4", variable.word4)
                .settings.css("font-size", "2em")
                .center()
                .print()
            ,
            
            newTimer(variable.wait4)
                .start()
                .wait()
            ,
            
            getText("word4")
                .remove()
            ,            
            
            newText("recall_prompt", "Recall Sentence")
                .settings.css("font-size", "2em")
                .color("red")
                .center()
                .print()
            ,
        
            newTimer("recall_timer",6500)
                .start()
                .wait()
            ,
            
            getText("recall_prompt")
                .remove()
            ,
            
           
            
            newButton("Next")
                .center()
                .settings.css("font-size", "2em")
                .settings.size(240, 48)
                .print()
                .wait()
                .remove()
        ).log("Group", variable.Group)
        .log("Item", variable.Item)
        .log('Verb', variable.Verb)
        .log("Verb.Type", variable.VerbType)
        .log("Sentence.Voice", variable.SentenceVoice)
        .log("Sentence", variable.Sentence)
        .log("word1", variable.word1)
        .log("word2", variable.word2)
        .log("word3", variable.word3)
        .log("word4", variable.word4)
        .log("wait1", variable.wait1)
        .log("wait2", variable.wait2)
        .log("wait3", variable.wait3)
        .log("wait4", variable.wait4)
    ]
)

PennController("feedback",
    newText("feedback_instruction","If you have any feedback on the first half of the experiment, please leave it here.<p>")
        .center()
        .print()
    ,

    newTextInput("feedback", "")
        .center()
        .log()
        .lines(0)
        .size(420, 200)
        .print()
    ,

    newButton("send", "Send")
        .center()
        .settings.size(500,48)
        .settings.css("font-size", "2em")
        .settings.css('margin', '40px')
        .print()
        .wait()
)

newTrial("bye" ,
    //newText("Thank you for your participation! Please go to the following web page to verify your participation: <a href='https://app.prolific.co/submissions/complete?cc=728AA2CF'> https://app.prolific.co/submissions/complete?cc=728AA2CF</a>.")
    newText("Thank you for your participation! Please go to the following web page to continue to the second half of the experiment: <a href='https://farm.pcibex.net/r/fjfApp/'>https://farm.pcibex.net/r/fjfApp/</a>.")
        .print(),
        
    newButton()
        .wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption("countsForProgressBar" , false)
// Make sure the progress bar is full upon reaching this last (non-)trial
const { select } = require("@inquirer/prompts");

const start = async () => {
    
    while(true) {

        const option = await select({
            message: "Choose an option >",
            choices: [
                {
                    name: "Track goal",
                    value: "track"
                },
                {
                    name: "List goals",
                    value: "list"
                },
                {
                    name: "Exit",
                    value: "exit"
                }
            ]
        });

        switch(option) {
            case "track":
                console.log("Let's track")
                break
            case "list":
                console.log("Let's list")
                break
            case "exit":
                console.log("See you later!")
                return
        }

    }

}

start();
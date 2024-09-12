const { select, input } = require("@inquirer/prompts");

const createGoal = async () => {

    const goal = await input(
        {
            message: "Type a goal:"
        }
    );

    if(goal.length == 0) {
        console.log("The goal cannot be empty.");
        return
    }

}

const start = async () => {
    
    while(true) {

        const option = await select({
            message: "Choose an option >",
            choices: [
                {
                    name: "Create goal",
                    value: "create"
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
            case "create":
                await createGoal()
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
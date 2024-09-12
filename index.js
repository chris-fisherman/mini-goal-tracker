const { select, input, checkbox } = require("@inquirer/prompts");

let goals = [];

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

    goals.push(
        {
            value: goal,
            checked: false
        }
    )

}

const listGoals = async () => {

    if(goals.length == 0) {
        console.log("The list is empty.");
        return
    } else {
        const answers = await checkbox(
            {
                message: "Use the arrows to move, or space to select or unselect, or enter to exit this stage.",
                choices: [...goals],
                instructions: false
            }
        )

        if(answers.length == 0) {
            console.log("No goal was selected.");

            goals.forEach((g) => {
                g.checked = false;
            })
            
            return
        }

        goals.forEach((g) => {
            g.checked = false;
        })
    
        answers.forEach((answer) => {
            const goal = goals.find((g) => {
                return g.value == answer
            })
    
            goal.checked = true;
        })

        console.log("Goal(s) successfully checked.");
    }

}

const main = async () => {
    
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
                await listGoals()
                break
            case "exit":
                console.log("See you later!")
                return
        }

    }

}

main();
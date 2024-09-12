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

        goals.forEach((g) => {
            g.checked = false;
        })

        if(answers.length == 0) {
            console.log("No goal was selected.");
            
            return
        }
    
        answers.forEach((answer) => {
            const goal = goals.find((g) => {
                return g.value == answer
            })
    
            goal.checked = true;
        })

        console.log("Goal(s) successfully checked.");
    }

}

const achievedGoals = async () => {

    const achieved = goals.filter((goal) => {
        return goal.checked
    })

    if (achieved.length == 0) {
        console.log("There aren't achieved goals :(");
        return
    }

    await select(
        {
            message: "Achieved goals:",
            choices: [...achieved]
        }
    )

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
                    name: "Achieved goals",
                    value: "achieved"
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
            case "achieved":
                await achievedGoals()
                break
            case "exit":
                console.log("See you later!")
                return
        }

    }

}

main();
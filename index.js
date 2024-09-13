const { select, input, checkbox } = require("@inquirer/prompts");
const fs = require("fs").promises;

let message = "Welcome to Mini Goal Tracker App!";

let goals;

const loadGoals = async () => {

    try {
        const data = await fs.readFile("goals.json", "utf-8");
        goals = JSON.parse(data);
    } catch (error) {
        goals = [];
    }

}

const saveGoals = async () => {

    await fs.writeFile("goals.json", JSON.stringify(goals, null, 2));

}

const createGoal = async () => {

    const goal = await input(
        {
            message: "Type a goal:"
        }
    );

    if(goal.length == 0) {
        message = "The goal cannot be empty.";
        return
    }

    goals.push(
        {
            value: goal,
            checked: false
        }
    )

    message = "Goal created successfully.";

}

const listGoals = async () => {

    if(goals.length == 0) {
        message = "The list is empty.";
        return
    }

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
        message = "No goal was selected.";
        
        return
    }

    answers.forEach((answer) => {
        const goal = goals.find((g) => {
            return g.value == answer
        })

        goal.checked = true;
    })

    message = "Goal(s) successfully checked.";

}

const achievedGoals = async () => {

    const achieved = goals.filter((goal) => {
        return goal.checked
    })

    if (achieved.length == 0) {
        message = "There aren't achieved goals :(";
        return
    }

    await select(
        {
            message: "Achieved goals:",
            choices: [...achieved]
        }
    )

}

const openGoals = async () => {

    const open = goals.filter((goal) => {
        return goal.checked != true
    })

    if (open.length == 0) {
        message = "Congrats! There aren't open goals :)";
        return
    }

    await select(
        {
            message: "Open goals:",
            choices: [...open]
        }
    )

}

const deleteGoals = async () => {

    const unselectedGoals = goals.map((goal) => {
        return {
            value: goal.value,
            checked: false
        }
    })

    if(unselectedGoals.length == 0) {
        message = "No goals to delete.";
        return
    }

    const itemsToDelete = await checkbox(
        {
            message: "Select item(s) to delete",
            choices: [...unselectedGoals],
            instructions: false
        }
    )

    if(itemsToDelete.length == 0) {
        message = "No item(s) to delete.";
        return
    }

    itemsToDelete.forEach((item) => {
        goals = goals.filter((goal) => {
            return goal.value != item
        })
    })

    message = "Item(s) successfully removed.";

}

const clearScreen = () => {
    console.clear();

    if(message != "") {
        console.log(message);
        console.log("");
        message = "";
    }
}

const main = async () => {

    await loadGoals();
    
    while(true) {

        clearScreen();

        await saveGoals();

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
                    name: "Open goals",
                    value: "open"
                },
                {
                    name: "Delete goals",
                    value: "delete"
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
            case "open":
                await openGoals()
                break
            case "delete":
                await deleteGoals()
                break
            case "exit":
                console.log("See you later!")
                return
        }

    }

}

main();
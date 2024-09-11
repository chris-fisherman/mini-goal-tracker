const start = () => {
    
    while(true) {

        const option = "Exit";

        switch(option) {
            case "Track goal":
                console.log("Let's track")
                break
            case "List goals":
                console.log("Let's list")
                break
            case "Exit":
                console.log("See you later!")
                return
        }

    }

}

start();
<script lang="ts">
    import { Utilities } from "./Utilities";
    import { goto } from "$app/navigation";
    const util = new Utilities();

    async function enterPlatform() {
        //then check if user has been registered
        util.registerNewUser()
            .then( (succes) => {
                console.log("User registered !");
            });
        goto("list");
    }
</script>

<container>
    <h1>100 људи 100 ћуди</h1>
    <button class="gradient_button" on:click={enterPlatform}>
        Хоћу и ја ✌️
    </button>
</container>


<style>
    container {
        text-align: center;
        align-self: center;
        /* height: 200pt; */
        /* background-color: #6f8ac3; */
    }

    h1 {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        color: #185a9d;
    }

    h1:hover {
        font-weight: bolder;
        color: #ffdd;
        transition: all 0.2s ease-out;
    }

    .gradient_button {
        min-width: 130px;
        height: 40px;
        color: #fff;
        font-weight: bold;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        outline: none;
        border-radius: 5px;
        border: none;
        background-size: 120% auto;
        background-image: linear-gradient(315deg, #43cea2 0%, #185a9d 75%);
    }
    .gradient_button:hover {
        background-position: right center;
        color: #fff9;
        font-weight: initial;
    }
    .gradient_button:active {
        top: 2px;
    }
</style>
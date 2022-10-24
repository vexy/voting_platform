<center-container>
    <h1>100 људи 100 ћуди</h1>
    <button class="gradient_button">
        Хоћу и ја
    </button>
    <p>Broj korisinka: 104</p>
</center-container>

<style>
    center-container {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        margin: auto;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    h1, p {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        color: #185a9d;
    }

    p:hover {
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
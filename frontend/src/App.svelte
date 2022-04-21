<script>
	let items = [
		{ id: 1, title: "Question 1", voted: false },
		{ id: 2, title: "Question 2", voted: true },
		{ id: 3, title: "Question 3", voted: false }
  	];

  let newQuestion = "";

  const addNewQuestion = () => {
	items = [
		...items,
		{
			id: Math.random(),
			title: newQuestion,
			voted: false
		}
  	];
    newQuestion = "";
  };

  const remove = item => {
    items = items.filter(i => i !== item);
  };

  const toggle = item => {
    item.voted = !item.voted;
    items = items;
  };
</script>

<main>
	<h1>Welcome to SDVS</h1>
	<p>You can find list of questions below</p>
</main>
  
<div>
	<form on:submit|preventDefault={addNewQuestion}>
		<label for="name">Post your question</label>
		<input id="name" type="text" bind:value={newQuestion} />
		<button>POST</button>
	</form>
	
	<ul>
		{#each items as item}
		<li class:done={item.voted}>
			<!-- <input type="checkbox" bind:checked={item.voted} /> -->
			<span>{item.title}</span>
			<button>VOTE</button>
			<!-- <button on:click={() => remove(item)}>&times;</button> -->
		</li>
		{/each}
	</ul>
</div>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	form {
    margin-bottom: 0.5em;
  }
	input[type="text"] {
		outline: none;
		margin: 0;
	}
	input[type="text"]:focus {
		border-color: #dc4f21;
		box-shadow: 0 0 2px #dc4f21;
	}
	input[type="checkbox"] {
		margin: 0 10px 0 0;
	}
	li button {
		float: right;
		border: none;
		background: transparent;
		padding: 0;
		margin: 0;
		color: #dc4f21;
		font-size: 18px;
		cursor: pointer;
	}
	li button:hover {
		transform: scale(2);
	}
	li button:focus {
		outline: #dc4f21;
	}
	li:last-child {
		border-bottom: none;
	}
	label {
		display: block;
		text-transform: uppercase;
		font-size: 0.8em;
		color: #777;
	}
	li {
		list-style: none;
		padding: 6px 10px;
		border-bottom: 1px solid #ddd;
	}
	ul {
		padding-left: 0;
	}
	.done span {
		opacity: 0.4;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
document.addEventListener('DOMContentLoaded', () => {
	const searchButton = document.getElementById('searchButton');
	const gameTitleInput = document.getElementById('gameTitle');
	const gameInfoSection = document.getElementById('gameInfo');

	searchButton.addEventListener('click', async () => {
		const gameTitle = gameTitleInput.value;

		// Make an API request to fetch game information (you can use fetch or another library)
		try {
			const response = await fetch(`/search/${gameTitle}`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const jsonData = await response.json();

			// Update the gameInfoSection with the retrieved game data
			gameInfoSection.innerHTML = `
			<div class="game-card">
					<h2>${jsonData.boardGameTitle}</h2>
					<img src=${jsonData.boardGameCoverImage}>
			</div>
			`;
		} catch (error) {
			console.error(error);
		}
	});
});

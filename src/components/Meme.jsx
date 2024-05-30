import { useState, useEffect } from 'react';

export default function Meme() {
	//meme State
	const [meme, setMeme] = useState({
		topText: '',
		bottomText: '',
		randomImage: 'http://i.imgflip.com/1bij.jpg',
	});

	// allMemes State
	const [allMemes, setAllMemes] = useState([]);

	// useEffect Hook to fetch memes data from API
	useEffect(() => {
		fetch('https://api.imgflip.com/get_memes')
			.then((res) => res.json())
			.then((data) => setAllMemes(data.data.memes));
	}, []);

	// Function which gets a random meme url and resets randomImage property in meme state.
	function getMemeImage() {
		const randomNumber = Math.floor(Math.random() * allMemes.length);
		const url = allMemes[randomNumber].url;
		setMeme((prevMeme) => ({
			...prevMeme,
			randomImage: url,
		}));
	}

	// Event listener function which resets topText and bottomText properties in meme state.
	function handleChange(event) {
		const { name, value } = event.target;
		setMeme((prevMeme) => ({
			...prevMeme,
			[name]: value,
		}));
	}

	// Meme component content
	return (
		<main>
			<div className="form">
				<input
					type="text"
					placeholder="Top text"
					className="form--input"
					name="topText"
					value={meme.topText}
					onChange={handleChange}
				/>
				<input
					type="text"
					placeholder="Bottom text"
					className="form--input"
					name="bottomText"
					value={meme.bottomText}
					onChange={handleChange}
				/>
				<button
					className="form--button"
					onClick={getMemeImage}
				>
					Get a new meme image 🖼
				</button>
			</div>
			<div className="meme">
				<img
					src={meme.randomImage}
					className="meme--image"
				/>
				<h2 className="meme--text top">{meme.topText}</h2>
				<h2 className="meme--text bottom">{meme.bottomText}</h2>
			</div>
		</main>
	);
}

'use strict';

function setupMixtapePlayer() {
	Connector.playerSelector = '.sidebar .audio-player';

	// Artist and track selectors swapped in NP website layout.
	Connector.artistSelector = '.sidebar .audio-player__song p';

	Connector.trackSelector = '.sidebar .audio-player__artist p';

	Connector.playButtonSelector = '.sidebar .audio-player__play .fa-play';
}

function isMixtape() {
	return $('.sidebar .audio-player').length > 0;
}

/**
 * Example URL: http://collection.noonpacific.com/gramovox/
 */
function setupCollection1Player() {
	Connector.playerSelector = '#player';

	Connector.artistTrackSelector = 'h1.h2';

	Connector.playButtonSelector = '.h2:has(.icon-play)';

	Connector.currentTimeSelector = '.h5 .left';

	Connector.durationSelector = '.h5 .right';
}

function isCollection1() {
	return $('div#content').length > 0;
}

/**
 * Example URLs:
 * - http://collection.noonpacific.com/spacejams/
 * - http://collection.noonpacific.com/midnightsnack/
 * - http://collection.noonpacific.com/coachella/
 */
function setupCollection2Player() {
	Connector.playerSelector = '#wrap';

	Connector.playButtonSelector = '.button-icon:has(.plangular-icon-play)';

	Connector.getArtistTrack = () => {
		let artist = null;
		let track = null;

		// Examples:
		// * TORN :: Seinabo Sey - Younger (TORN Remix) [Label :: Artist - Track]
		// * Figgy :: You Were Mine (Daniel. T. Remix) [Artist :: Track]
		let rawMetadata = null;
		let selectors = [
			'.current',
			'.bg-darken-3'
		];
		for (let selector of selectors) {
			let element = $(selector);
			if (element.length) {
				rawMetadata = element.contents().filter((index, item) => {
					return item.nodeType === 3;
				}).text();
				break;
			}
		}

		if (rawMetadata) {
			[artist, track] = rawMetadata.split('::');
			let artistTrack = Util.splitArtistTrack(track);
			if (!Util.isArtistTrackEmpty(artistTrack)) {
				return artistTrack;
			}
		}

		return { artist, track };
	};
}

function isCollection2() {
	return $('section#player').length > 0;
}

function setupConnector() {
	if (isMixtape()) {
		setupMixtapePlayer();
	} else if (isCollection1()) {
		setupCollection1Player();
	} else if (isCollection2()) {
		setupCollection2Player();
	} else {
		console.log('Noon Pacific connector: unknown player');
	}
}

setupConnector();

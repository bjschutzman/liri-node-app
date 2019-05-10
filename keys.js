console.log("this is loaded");

exports.spotify = {
    id: ProcessingInstruction.env.SPOTIFY_ID,
    SECRET: ProcessingInstruction.env.SPOTIFY_SECRET
};
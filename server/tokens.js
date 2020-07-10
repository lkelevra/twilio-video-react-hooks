const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const generateToken = config => {
  return new AccessToken(
    'ACdb22c212d4b4a22231c3086bff964028',
  'SKdc501c3c996efff24ccdc142ffae20c5',
  '5B3Futpfv863wwMShP9X78UhO3Vk9xq4'
  );
};

const videoToken = (identity, room, config) => {
  let videoGrant;
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken(config);
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

module.exports = { videoToken };

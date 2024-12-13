
 iceConfiguration = {

    iceServers: [
        {
          urls: "stun:stun.relay.metered.ca:80",
        },
        {
          urls: "turn:global.relay.metered.ca:80",
          username: "d28e72031fe445368ffe6685",
          credential: "PNB6If59AFCRFXIw",
        },
        {
          urls: "turn:global.relay.metered.ca:80?transport=tcp",
          username: "d28e72031fe445368ffe6685",
          credential: "PNB6If59AFCRFXIw",
        },
        {
          urls: "turn:global.relay.metered.ca:443",
          username: "d28e72031fe445368ffe6685",
          credential: "PNB6If59AFCRFXIw",
        },
        {
          urls: "turns:global.relay.metered.ca:443?transport=tcp",
          username: "d28e72031fe445368ffe6685",
          credential: "PNB6If59AFCRFXIw",
        },
    ],
  
};
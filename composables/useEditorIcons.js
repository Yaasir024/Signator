export default () => {
  const socialIcons = [
    {
      id: 1,
      name: "facebook",
      url: "https://www.facebook.com/id",
    },
    {
      id: 2,
      name: "linkedin",
      url: "https://www.linkedin.com/company/id",
    },
    {
      id: 3,
      name: "messenger",
      url: "https://www.messenger.com",
    },
    {
      id: 4,
      name: "twitter",
      url: "https://www.twitter.com/id",
    },
    {
      id: 5,
      name: "instagram",
      url: "https://www.instagram.com/id",
    },
    {
      id: 6,
      name: "whatsapp",
      url: "https://chat.whatsapp.com/id",
    },
    {
      id: 7,
      name: "line",
      url: "https://line.me/R/id",
    },
    {
      id: 8,
      name: "github",
      url: "https://github.com/id",
    },
    {
      id: 9,
      name: "stackoverflow",
      url: "https://stackoverflow.com/users/id",
    },
    {
      id: 10,
      name: "dribble",
      url: "https://dribbble.com/id",
    },
    {
      id: 11,
      name: "behance",
      url: "https://www.behance.net/id",
    },
    {
      id: 12,
      name: "pinterest",
      url: "https://www.pinterest.com/id",
    },
    {
      id: 14,
      name: "discord",
      url: "https://discord.gg/id",
    },
    {
      id: 15,
      name: "snapchat",
      url: "https://www.snapchat.com/add/id",
    },
    {
      id: 16,
      name: "tiktok",
      url: "https://www.tiktok.com/tag/mypage",
    },
    {
      id: 17,
      name: "youtube",
      url: "https://www.youtube.com/id",
    },
    {
      id: 18,
      name: "vimeo",
      url: "https://vimeo.com/id",
    },
    {
      id: 19,
      name: "google",
      url: " ttps://www.google.com",
    },
    {
      id: 20,
      name: "amazon",
      url: "https://www.amazon.com/gp/profile/id",
    },
    {
      id: 21,
      name: "apple",
      url: "https://itunes.apple.com/app/id",
    },
    {
      id: 22,
      name: "spotify",
      url: "https://open.spotify.com/user/id",
    },
    {
      id: 23,
      name: "soundcloud",
      url: "https://soundcloud.com/id",
    },
    // GAP
    // GAP
    // GAP
    {
      id: 26,
      name: "airbnb",
      url: "https://airbnb.com/@id",
    },
    {
      id: 27,
      name: "telegram",
      url: "https://telegram.me/id",
    },
    {
      id: 28,
      name: "tumblr",
      url: "https://www.tumblr.com/id",
    },
    {
      id: 29,
      name: "reddit",
      url: "https://www.reddit.com/user/id",
    },
    {
      id: 30,
      name: "quora",
      url: "https://www.quora.com/id",
    },
  ];

  const addonsSocial = [
    {
      id: 1,
      name: "facebook",
    },
    {
      id: 2,
      name: "instagram",
    },
    {
      id: 3,
      name: "linkedin",
    },
    {
      id: 4,
      name: "twitter",
    },
    {
      id: 5,
      name: "vimeo",
    },
    {
      id: 6,
      name: "youtube",
    },
  ];

  const getUrl = (social) => {
    let result = socialIcons.find((item) => item.name === social);
    return result.url;
  };

  return {
    socialIcons,
    addonsSocial,
    getUrl,
  };
};

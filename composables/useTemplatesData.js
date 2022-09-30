export default () => {
  const templates = [
    {
      id: "1",
      name: "Template by shueisha",
      slug: "template-by-shueisha",
      type: "free",
      category: "professional",
      data: {
        image: {
          imgSrc:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
          url: "",
        },
        name: "Yaasir Falana",
        position: "Frontend",
        department: "Software",
        company: "Signator",
        contactInfo: [
          {
            id: "264r99",
            field: "Email",
            value: "yope4ever@gmail.com",
          },
          {
            id: "7u4e31",
            field: "Phone",
            value: "+2349169241584",
          },
        ],
        socialInfo: [
          {
            id: "1r8dxb",
            name: "linkedin",
            url: "https://www.linkedin.com/in/yaasir-falana-a29962233/",
          },
          {
            id: "0be75d",
            name: "twitter",
            url: "https://twitter.com/YaasirFalana",
          },
          {
            id: "df4n18",
            name: "instagram",
            url: "https://www.instagram.com/yaasirfalana/",
          },
          {
            id: "e32n50",
            name: "github",
            url: "https://github.com/Yaasir024",
          },
        ],
        addons: {
          id: [],
          social: {
            isAdded: true,
            items: [
              {
                id: "b04a82",
                name: "instagram",
                url: "https://www.instagram.com/yaasirfalana/",
              },
              {
                id: "725c18",
                name: "twitter",
                url: "https://twitter.com/YaasirFalana",
              },
              {
                id: "x443d0",
                name: "linkedin",
                url: "https://www.linkedin.com/in/yaasir-falana-a29962233/",
              },
            ],
            style: {
              height: "32",
              paddingTop: "12",
            },
          },
          videoMeeting: {
            isAdded: true,
            items: {
              name: "google-meet",
              text: "Meet me on Google Meet",
              url: "https://www.instagram.com/yaasirfalana/",
            },
            style: {
              height: 22,
              paddingTop: 10,
            },
          },
          cta: {
            isAdded: false,
            item: {
              text: "",
              url: "",
            },
            style: {
              paddingTop: 10,
              textColor: "#ffffff",
              buttonColor: "#1A0E71",
            },
          },
        },
        design: {
          layout: {
            fontFamily: "cursive",
            fontSize: "17",
            textColor: "#141414",
            templateColor: "#000000",
          },
          image: {
            width: "100",
            roundness: "50",
          },
          socialIcon: {
            size: "28",
            roundness: "25",
          },
        },
      },
    },
    {
      id: "2",
      name: "Riley West",
      image: "riley-west",
      type: "free",
      category: "creative",
      data: {
        image: {
          imgSrc:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
          url: "",
        },
        name: "Riley West",
        position: "",
        department: "Photographer",
        company: "pic.co",
        contactInfo: [
          {
            id: "5d4cdu",
            field: "Email",
            value: "riley@signator.com",
          },
          {
            id: "zud0r8",
            field: "Phone",
            value: "+123456789",
          },
          {
            id: "zxx4bb",
            field: "Website",
            value: "riley.co",
          },
        ],
        socialInfo: [
          {
            id: "18cbfe",
            name: "facebook",
            url: "https://signator.com/",
          },
          {
            id: "8ern69",
            name: "linkedin",
            url: "https://signator.com/",
          },
          {
            id: "dg4n18",
            name: "instagram",
            url: "https://signator.com/",
          },
          {
            id: "e32n52",
            name: "pinterest",
            url: "https://signator.com/",
          },
        ],
        addons: {
          social: {
            isAdded: true,
            items: [
              {
                id: "b04d82",
                name: "youtube",
                url: "https://signator.com/",
              },
              {
                id: "723c18",
                name: "vimeo",
                url: "https://signator.com/",
              },
            ],
            style: {
              height: "37",
              paddingTop: "12",
            },
          },
          videoMeeting: {
            isAdded: false,
            items: {
              name: "google-meet",
              text: "Meet me on Google Meet",
              url: "",
            },
            style: {
              height: 22,
              paddingTop: 10,
            },
          },
          cta: {
            isAdded: false,
            item: {
              text: "",
              url: "",
            },
            style: {
              paddingTop: 10,
              textColor: "#ffffff",
              buttonColor: "#1A0E71",
            },
          },
        },
        design: {
          layout: {
            fontFamily: "Sans Serif",
            fontSize: "18",
            textColor: "#000000",
            templateColor: "#226ebf",
            theme: 'Layout03'
          },
          image: {
            width: "143",
            roundness: "0",
          },
          socialIcon: {
            size: "28",
            roundness: "50",
          },
        },
      },
    },
    {
      id: "3",
      name: "Template 03",
      slug: "template-03",
      type: "free",
      category: "professional",
    },
    {
      id: "4",
      name: "Template four",
      slug: "template-four",
      type: "pro",
      category: "creative",
    },
    {
      id: "5",
      name: "Template by raik",
      slug: "template-by-raik",
      type: "pro",
      category: "professional",
    },
    {
      id: "6",
      name: "Yashiro",
      slug: "yashiro",
      type: "pro",
      category: "creative",
    },
    {
      id: "7",
      name: "Vue Template",
      slug: "vue-template",
      type: "pro",
      category: "professional",
    },
    {
      id: "8",
      name: "Template 8",
      slug: "template-8",
      type: "pro",
      category: "creative",
    },
    {
      id: "9",
      name: "Strawberry",
      slug: "strawberry",
      type: "pro",
      category: "professional",
    },
    {
      id: "10",
      name: "Elegant Inside",
      slug: "elegant-inside",
      type: "pro",
      category: "creative",
    },
    {
      id: "11",
      name: "channin",
      slug: "channin",
      type: "pro",
      category: "professional",
    },
    {
      id: "12",
      name: "Template by wiki",
      slug: "template-by-wiki",
      type: "pro",
      category: "creative",
    },
  ];

  return {
    templates,
  };
};

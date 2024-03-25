const links = [
  {
    label: 'Home',
    href: '/#home'
  },
  {
    label: 'Skills',
    href: '/#skills'
  },
  {
    label: 'Portfolio',
    href: '/#portfolio'
  },
  {
    label: 'Testimonials',
    href: '/#testimonials'
  },
]

const projects = [
  {
    name: "Terminal Website",
    description: "A terminal styled website, built with react and deployed to github pages.",
    thumbnail: "https://cdn.thedannicraft.de/Terminal.png",
    link: "https://github.com/TheDanniCraft/TerminalWebsite",
    tags: ["website"]
  },
  {
    name: "GamerForge System",
    description: "My first discord bot, and the first project ever released. Written in discord.js and frequently updated. It is the main bot on my server GamerForge.",
    thumbnail: "https://cdn.thedannicraft.de/Bot.png",
    link: "https://discord.gg/deutsch",
    tags: ["bot"]
  },
  {
    name: "MonsterBattle Cards",
    description: "My first time participating in a game jam. The game was made in 4 days using C# with Unity. - Choose your cards wisely and conquer your foes in Monster Battle Cards!",
    thumbnail: "https://img.itch.zone/aW1nLzExNzAzMjU2LnBuZw==/315x250%23c/cVQ5wZ.png",
    link: "https://thedannicraft.itch.io/monsterbattle-cards",
    tags: ["game-jam", "made in 4 days", "game"]
  },
  {
    name: "Time Kills You",
    description: "My second time participating in a game jam, this time with a friend. - Race Against Time, Solve Puzzles Divine; In 'Time Kills You,' Survival is the Line!",
    thumbnail: "https://img.itch.zone/aW1nLzEzMDEyNzkyLnBuZw==/315x250%23c/OxC7G9.png",
    link: "https://thedannicraft.itch.io/time-kills-you",
    tags: ["game-jam", "made in 4 days", "game"]
  },
  {
    name: "GlobalDiscord",
    description: "Global Discord is a bot that allows you to chat with users on other servers and make new friends. The chat is moderated around the clock by moderators to prevent spam, advertising and scamming.",
    thumbnail: "https://cdn.discordapp.com/avatars/832303489027276800/9d7703ea614eb749bb6261c0718c0d93.png",
    tags: ["bot"]
  }
]

const skills = [
  {
    "name": "HTML",
    "color": "red",
    "percentage": 100
  },
  {
    "name": "CSS",
    "color": "var(--mantine-color-indigo-7)",
    "percentage": 90
  },
  {
    "name": "Javascript",
    "color": "yellow",
    "percentage": 100
  },
  {
    "name": "Node.js",
    "color": "green",
    "percentage": 100
  },
  {
    "name": "React",
    "color": "cyan",
    "percentage": 80
  },
  {
    "name": "Java",
    "color": "orange",
    "percentage": 70
  },
  {
    "name": "C# (with Unity)",
    "color": "grape",
    "percentage": 75
  },
  {
    "name": "C++",
    "color": "blue",
    "percentage": 50
  },
  {
    "name": "Python",
    "color": "var(--mantine-color-yellow-4)",
    "percentage": 30
  },
  {
    "name": "Markdown",
    "color": "var(--mantine-color-dark-9)",
    "percentage": 95
  },
]

const reviews = [
  {
    name: "vertraxumtes",
    review: "TheDanniCraft ist ein sehr guter Verkäufer. Freundlichkeit ist nicht zu übertreffen. Schnelle Lieferung. Gute Ware zu einem guten Preis. Weiter so.",
    stars: 5,
    country: "DE",
    date: "13. Nov",
    product: "Discord Bot",
    source: "Fiverr"
  },
  {
    name: "vertraxumtes",
    review: "Gut wie immer",
    stars: 5,
    country: "DE",
    date: "15. Nov",
    product: "Discord Bot",
    source: "Fiverr"
  },
  {
    name: "luk322",
    review: "Sehr gute Preis Leistung. Wenn ich das nächste mal in der richtung was brauche, ist dieser Verkäufer der erste, der in Frage kommt.",
    stars: 5,
    country: "AT",
    date: "29. Nov",
    product: "Discord Bot",
    source: "Fiverr"
  },
  {
    name: "innovaqua",
    review: "I recommend him guys. he is very professional",
    stars: 5,
    country: "CY",
    date: "14. Dez",
    product: "Discord Bot",
    source: "Fiverr"
  },
]

export { links, projects, skills, reviews };
const { animate } = anime; //modo1

animate(".apresentacao__destaque_titulo span", {
  // Property keyframes
  y: [
    {
      to: "-2.75rem",
      ease: "outExpo", //ease function
      duration: 600,
    },
    {
      to: 0,
      ease: "outBounce", //ease function
      duration: 800,
      delay: 100,
    },
  ],
  // Property specific parameters
  rotate: {
    from: "-1turn",
    delay: 0,
  },
  delay: (_, i) => i * 50, // Function based value
  ease: "inOutCirc", //ease function
  loopDelay: 1000,
  loop: true,
});

//animação da seta do botão candidatar-se
animate("#seta", {
  x: [0, 5],
  y: [0, -5],
  duration: 1000,
  direction: "alternate",
  easing: "ease",
  loop: true,
});

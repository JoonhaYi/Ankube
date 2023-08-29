// declaring functions
function reverseAlg(algorithm) {
  algorithm = algorithm.trim().split(" ");
  var reversedAlg = [];
  var element;

  for (i = 0; i < algorithm.length; i++) {
    element = algorithm[i];
    element = element.trim();
    if (element.at(-1) == "'") {
      // removing ' symbol if exists
      element = element.replace("'", "");
    } else if (/[A-Za-z]/.test(element.at(-1))) {
      // adding ' symbol if not present already
      element += "'";
    }

    reversedAlg.push(element);
  }

  // reversing the alg and joining it into a string
  reversedAlg = reversedAlg.reverse().join(" ");
  return reversedAlg;
}

function cancelMoves(algorithm) {
  // reducing two equal moves
  var prev = [{ move: "" }];
  var move;
  var amount;
  algorithm = algorithm.split(" ");

  for (i = 0; i < algorithm.length; i++) {
    // reading the move letter of the element
    move = algorithm[i].match(/[A-Za-z]+?/)[0];

    // reading the move amount of the element
    if (/[0-9']+?/.test(algorithm[i])) {
      amount = parseInt(algorithm[i].match(/[0-9']+?/)[0].replace("'", "-1"));
    } else {
      amount = 1;
    }

    // canceling moves out if the move letters matches
    if (move == prev[i].move) {
      amount += prev[i].amount;
      amount = (amount + 4) % 4;

      if (amount == 0) {
        algorithm.splice(i, 1);
        prev.splice(i, 1);
      } else if (amount == 1) {
        algorithm[i] = move;
      } else if (amount == 2) {
        algorithm[i] = move + "2";
      } else if (amount == 3) {
        algorithm[i] = move + "'";
      }

      algorithm.splice(i - 1, 1);
      prev.splice(i, 1);
      i -= 1;
    }

    // adding the current element to prev
    prev.push({ move: move, amount: amount });
  }

  return algorithm.join(" ");
}

function parseCommutator(algorithm) {
  // converting commutator notations to regular notations
  var commutatorNotation = algorithm.match(/\[([^\[]*?)\]/)[1].trim();
  var commutator = commutatorNotation.split(",");
  var commutatorAlg;

  // parsing commutator algorithm
  commutatorAlg = [
    commutator[0].trim(),
    commutator[1].trim(),
    reverseAlg(commutator[0].trim()),
    reverseAlg(commutator[1].trim()),
  ];

  // parsing setup moves
  if (/(.+):/.test(algorithm)) {
    var setupMoves = algorithm.match(/([A-Za-z0-9'\s]+?):/)[1].trim();
    commutatorAlg.unshift(setupMoves);
    commutatorAlg.push(reverseAlg(setupMoves));
  }
  commutatorAlg = commutatorAlg.join(" ");
  commutatorAlg = cancelMoves(commutatorAlg);

  return commutatorAlg;
}

function getOppositeShade(color) {
  // reading rgb numbers
  var rgb = [...color.matchAll(/[0-9]+/g)];
  var rgbSum = 0;

  // adding rgb values
  rgb.forEach((element) => {
    rgbSum += parseInt(element);
  });

  // returning either black or white according to the shade
  if (rgbSum < 382) {
    return "white";
  } else {
    return "black";
  }
}

function loadVisualizer(config) {
  // creating roofpig div
  var container = document.getElementById("container");

  visualizer = document.createElement("div");
  visualizer.classList.add("roofpig");
  visualizer.style.color = "green";

  // setting data-config attribute of roofpig to config
  visualizer.setAttribute("data-config", config);
  container.appendChild(visualizer);
}

// reading the query string field of the url
const params = new URLSearchParams(document.location.search);
var config = params.get("config");
var bgcolor = params.get("bgcolor");

// setting background color
console.log("Ankube: Setting background color to: " + bgcolor);
document.querySelector("body").style.backgroundColor = bgcolor;

// setting font color according to the background shade
if (/rgb\([0-9]+, [0-9]+, [0-9]+\)/.test(bgcolor)) {
  var style = document.createElement("style");
  style.innerHTML =
    ".roofpig-count, .roofpig-help-button {color: " +
    getOppositeShade(bgcolor) +
    " !important;}";
  document.head.appendChild(style);
}

// parsing commutator notations
if (/(?:alg|setupmoves)=[^\|]*[\[\]]/.test(config)) {
  var commutator = config.match(/(?:alg|setupmoves)=([^\|]*)/)[1];

  if (/\[.*\]/.test(commutator)) {
    parsedCommutator = parseCommutator(commutator);
  } else {
    // reversing back the alorithm if it's reversed
    parsedCommutator = parseCommutator(reverseAlg(commutator));

    // reversing again to setup to the case
    parsedCommutator = reverseAlg(parsedCommutator);
  }

  console.log("Ankube: Commutator notation detected: " + commutator);
  console.log("Ankube: Parsed notation: " + parsedCommutator);

  // replacing commutator notations with parsed algorithm
  if (/alg=[^\|]*[\[\]]/.test(config)) {
    config = config.replaceAll("alg=" + commutator, "alg=" + parsedCommutator);
  } else if (/setupmoves=[^\|]*[\[\]]/.test(config)) {
    config = config.replaceAll(
      "setupmoves=" + commutator,
      "setupmoves=" + parsedCommutator
    );
  }
}

// loading roofpig
console.log("Ankube: Loading roofpig, config: " + config);
loadVisualizer(config);

// playing the algorithm automatically
setTimeout(function () {
  var playButton = document.getElementById("play-1");

  if (playButton != null) {
    console.log("Ankube: Playing algorithm");
    document.getElementById("play-1").click();
  }
}, 1000);

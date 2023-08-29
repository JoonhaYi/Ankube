# Ankube
Ankube is an Anki card template made to help Cubers learn algorithms faster. Note that I’m not the creator of Roofpig, aka the algorithm visualizer; The credit goes to Larspetrus. For more info on customization and the inner workings of the library, please visit the original GitHub page: https://github.com/larspetrus/Roofpig 

![alt text](https://github.com/JoonhaYi/Ankube/blob/main/images/ankube.png?raw=true)

# How to use
To import the card type, please download the demo deck either from GitHub or from https://ankiweb.net/shared/mine](https://ankiweb.net/shared/info/2105155613?cb=1693334141457 and open the apkg file to import it;
You can delete the demo deck afterward.

![alt text](https://github.com/JoonhaYi/Ankube/blob/main/images/importing.png?raw=true)

Select the Ankube type when adding new cards:

![alt text](https://github.com/JoonhaYi/Ankube/blob/main/images/changingCardType1.png?raw=true)
![alt text](https://github.com/JoonhaYi/Ankube/blob/main/images/changingCardType2.png?raw=true)

# Ankube for 3-style
Ankube can read any standard commutator notation; we have a particular card type made to handle the 3-style algorithm included in the demo deck.

# how to customize
For customization, go to Tools > Manage Note Types > Ankube, and click the cards button:

![alt text](https://github.com/JoonhaYi/Ankube/blob/main/images/customization1.png?raw=true)
![alt text](https://github.com/JoonhaYi/Ankube/blob/main/images/customization2.png?raw=true)

From there, you can edit the source code to add functionality or edit the config part to change the color scheme, speed, size, etc (Visit the Roofpig GitHub repository for every configuration possible.)

![alt text](https://github.com/JoonhaYi/Ankube/blob/main/images/editing.png?raw=true)

To edit data-config, scroll to the bottom of the code to this part:
```
  iframe.src =
    // edit the URL below to customize the cube
    // add configurations after "?config=” to customize the visualizer
    // example "https://ankube-40718.web.app/?config=colors=U:w L:o F:g R:r B:b D:y|setupmoves="
    //                                              / 	         added text         \
    // note that you have to add | symbol between each settings
    // see https://github.com/larspetrus/Roofpig for every setting available

    "https://ankube-40718.web.app/?config=setupmoves=" +"
    setupMoves +
    "&bgcolor=" +
    backgroundColor;

  iframe.style.width = "300px";
  iframe.style.height = "300px";
  iframe.scrolling = "no";
  iframe.frameBorder = 0;
  container.appendChild(iframe);
```
 Note that You have to edit both the front and the back side of the template.

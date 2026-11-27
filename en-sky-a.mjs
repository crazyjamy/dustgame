import { monthlyStories } from './monthly-story-data.mjs';

// Each entry opens with the constellation, motif, title and letter. The five
// lines that follow contain the episode title, story and observing note.
const stories = `
Lyr|Lyra|A little ring between two strings|Between the Strings of the Lyre|I went to see Vega and found a ring between the strings. I left the thread you tied for me right where I found it.
The first note|The little star strung the lyre in the night sky and picked out the first note at its brightest point.|Vega is the brightest star in Lyra. In Korea, it’s also known as the Weaver Girl’s star.
A tilted frame|The star looped a short thread around the four points beside Vega. The frame sat at a slant like a music stand.|The little parallelogram beside Vega is a handy guide to Lyra.
A ring between the strings|Pointing the telescope between two stars, the little star spotted a faint ring where all had seemed empty.|The Ring Nebula, M57, lies in the direction between Beta and Gamma Lyrae.
Whose ring?|In a photograph taken with a big telescope, a tiny light showed at the center of the ring.|M57 is a planetary nebula. Gas shed by an aging star glows around the star’s hot remnant.
Where the last note goes|The little star left the frame bare and made a tiny mark in the gap between the two stars.|Vega and the Ring Nebula appear in the same lyre, but they lie at different distances from us.

Cnc|Cancer|Little dots coming into focus in the mist|The Smudge That Was a Beehive|I ran out of paper dotting in all the stars of the Beehive. Will you fill in the rest?
Mist on the crab’s back|Drawing a crab, the little star fetched a cloth. It looked as though paint had spilled right in the middle of its back.|Praesepe sits near the middle of Cancer. To the unaided eye, it looks like a little patch of mist.
Where the smudge stayed|When the star came back with the cloth, the smudge was still there between the same stars.|On a clear, dark night, you can pick out the spot even before raising your binoculars.
Dots in the mist|The star peered through binoculars and put the cloth down. The single smudge had broken up into tiny points.|A star cluster is a group of stars. Praesepe is also called the Beehive Cluster or M44.
One cell for each bee|The star set aside a drawing of a huge honeycomb and made one dot for each star in sight.|This is an open cluster. Its stars form a loose group in one part of the sky.
The smudge on the postcard|Held at arm’s length, the postcard showed mist. Draw it close and there were the dots.|A wide field of view lets you compare the whole cluster with the surrounding stars at a glance.

Cet|Cetus|Two dots of different shades in the same place|The Night Mira Came Back|An empty circle counts as a record, too. How else would I know the night it came back?
The sea monster’s place|Reading Andromeda’s story, the little star followed a shadow by the water down to the bottom of the map.|The sea monster Cetus in Greek mythology gives the constellation its name.
A name and an empty space|The chart gave Mira a name, yet there was a blank in the observing sketch.|Mira’s brightness varies so much that it’s sometimes visible to the unaided eye and sometimes hard to see.
The circle that stayed|In the blank the star wrote, “Couldn’t find it by eye tonight.”|Recording your equipment and sky conditions lets you compare even the nights when you saw nothing.
A red point returns|An observation from another month showed a red point inside the circle.|Mira is a red giant that repeatedly expands and contracts. The changes unfold over many months.
Opening the calendar|The star lined up sketches from different months and looked from the empty circle to the red point and back.|A collection of observations across several months makes long changes in brightness easier to see.

Pup|Puppis|A white wake behind a ship|The Starry Trail Astern|I’m sending the ripples left by the ship. With everyone looking ahead, the view from the stern felt rather special.
The star at the stern|Sitting at the back of a paper boat, the little star drew the ripples in its wake.|Puppis is the stern, the back of a ship.
When the ship was whole|In the atlas illustration of the Argo, today’s Puppis fitted into the rear of the hull.|The old constellation Argo Navis is now divided into Puppis, Carina and Vela.
Three pieces in place|When a friend put the sail underwater, the star moved the pictures of sail and keel back where they belonged.|The keel runs along the bottom of a boat and the sail catches the wind. Their names live on in the sky.
Beyond the aft deck|The star pinned a wide-field photograph behind the boat. So many stars crowded the view toward Puppis.|Puppis contains several open clusters. M46 and M47 appear close together on the sky map.
A stamp for the stern|At the very back of the boat, the little star stuck a tiny stamp to mark the place where it had sat.|Puppis is abbreviated Pup. The other two parts of the old ship are marked Car and Vel.

Ant|Antlia|A raised pump handle|A Laboratory in the Star Chart|I drew the handle on your side of the postcard. Give it a pull when you turn the page.
A handle with no name|A handle stuck out of the southern star chart. The little star tilted its head. Had someone drawn a drawer?|Antlia means air pump. A piece of laboratory equipment gave this southern constellation its name.
A tiny laboratory|The star set down a picture of an old pump. Its cylinder and handle matched the ones on the chart.|An air pump moves air or removes it from a container.
A signature beside the pump|The star read Lacaille’s name at the edge of the picture and slipped in a tiny bookmark.|Lacaille included several scientific instruments when he mapped the southern sky.
Lifting the lines|The star traced the pump onto transparent paper and lifted it away. Only faint dots were left underneath.|Laying a constellation drawing over the actual star positions reveals the lines people added.
The sky comes back to the desk|At the end of the night, the little star stuck a handle-shaped star chart on the laboratory drawer.|Look for Hydra to the north and Vela to the south to find Antlia again.

Pav|Pavo|A half-folded peacock fan|The Half-Open Peacock Fan|I thought a fan had to be wide open to be beautiful. Halfway closed, it framed a star I’d never seen.
A folded fan|The little star opened a fan from the south halfway. Starry dots peeked out among its eyespots.|Pavo means peacock. It’s one of the bird constellations in the southern sky.
The first eyespot|The star found Alpha Pavonis on the chart and painted a shining dot on the fan’s first panel.|Alpha Pavonis has the proper name Peacock. Compare its name with the constellation’s.
Moving the feathers|In another drawing the tail spread much wider. The star pinned only the dots the pictures shared.|Old charts draw different wings and tails, but the positions of the guide stars can still be compared.
Birds of the same sky|Spotting the names of other birds beyond the fan, the star unfolded more of the southern chart.|Apus and Tucana can also be found near Pavo.
A half-open letter|The star creased the fan so that opening one panel revealed Peacock, and spreading them all revealed the tail.|Pav is short for Pavo. Write it on the first panel and you can find your way back.

Sgr|Sagittarius|The Milky Way rising from a spout|The Teapot That Poured the Milky Way|Just where I meant to pour the tea, the Milky Way rose in a curl. I wanted to send it to you before it cooled.
The teapot handle|Looking for the archer, the little star first spotted a teapot, complete with pot and handle.|Several bright stars in Sagittarius can be joined to make the familiar Teapot.
Where the steam rises|White steam seemed to rise above the spout. The star tipped the paper teapot a little.|Under a dark summer sky, the dense star fields of the Milky Way seem to rise near the spout.
Toward the heart of home|A friend opened a bird’s-eye drawing of our galaxy and stretched a thread inward from the Sun.|When we look toward Sagittarius, we’re looking toward the center of the Milky Way.
A ring arrived in 2022|The star imagined the view behind the teapot. An image made by radio telescopes working together showed light around a dark center.|In 2022 the Event Horizon Telescope team released the first image of Sagittarius A*, our galaxy’s central black hole. The ring of light comes from hot gas around it.
A cup of the Milky Way|On the postcard, that first wisp of steam trailed from the spout clear to the edge of the night sky.|Sagittarius is a region of the sky. The galactic center is a real place far away in that direction.

Ret|Reticulum|A star in one square of a fine grid|The Little Net in the Telescope|I put the star in the top right square, just where you said. This little net caught nothing. It simply showed the way.
A net without fish|Seeing a net on a southern chart, the little star looked for the sea. A telescope stood in the background.|The net in Reticulum is the fine grid of an observing instrument.
Crosshairs in a round window|Through the telescope the star saw fine lines across the round window.|Reference lines or a grid in an eyepiece help us compare the positions of objects in its field.
One square higher|“Over there” had the star searching in vain. “Top right square” led straight to the dot.|Reference lines help two observers describe the same spot.
An upside-down square|When the grid turned upside down, the same words pointed to a different dot. The star marked the top.|Different telescopes and optics can change an image’s orientation. Note the directions in your observing log.
Starlight slips through|The star put a single dot in the mesh of the first drawing, then wrote to tell a friend which square held it.|Ret is short for Reticulum. Look for the name and grid together on a southern star chart.

Aps|Apus|Two wing drawings laid together|Room for One More Feather|I left the wingtip empty. Will you draw a feather just as you imagine it?
A bird from the south|When the little star spread out the southern chart, a long feather seemed to reach past the paper.|Apus lies toward the south celestial pole. Look for it on a southern sky map.
Where did the body go?|Covering the bird left just a handful of stars. Where should the tail go?|Much of the picture that joins the stars comes from people’s imaginations.
Two kinds of wings|The star and a friend laid tracing paper over the same points and drew different wings.|Line up the guide stars and you can tell it’s the same sky, however different the pictures look.
Turning the chart|The friend’s drawing looked unfamiliar until the star gave it half a turn. Then the birds’ backs lined up.|Match the north and south markings before overlaying two star charts.
Room for a feather|The little star chose a favorite feather from each picture and gave them to the same bird.|Write down Apus and its abbreviation Aps, and you’ll be able to find the bird on another chart.

Cam|Camelopardalis|A long neck in faint pencil|A Giraffe Fills the Blank|I drew an empty neck at first, but by the time I came home it was full of stars. I’m sending the pale pencil, too.
What looked like a blank|A finger paused between Ursa Major and Cassiopeia. The little star left that part of the northern chart blank.|Camelopardalis lies nearby. With few bright stars, it’s easy to overlook at first.
Dimming the lamp|The star shaded the desk lamp and waited. Faint points made their way onto the paper, one by one.|Give your eyes time to adjust in the dark and faint stars become easier to find.
The first link in a long neck|The star drew a short line between two dots. Now there was room to reach for the next one.|Remembering both relative brightness and spacing helps you navigate a faint star field.
Northern neighbors|The giraffe kept sliding sideways in the drawing. A friend clipped little markers to the constellations around it.|Try using Ursa Major, Ursa Minor and Cassiopeia as guides.
A giraffe in the margin|A tall, slender giraffe stood where the little star had left a blank on the first night.|Look for Cam and compare the same region on an old illustration and a modern star chart.

Crv|Corvus|Footprints on a crooked square of paper|The Crow’s Envelope|Even a lopsided square can make an envelope. A crow held down one side with its foot.
A crooked envelope|The little star joined four dots on the spring chart and folded an envelope. One corner stuck out at an angle.|The four conspicuous stars of Corvus form a tilted quadrilateral.
A visitor|The star stamped two footprints on the corner, then opened an old chart. There sat a bird.|Corvus means crow. Star charts show the bird perched on the back of Hydra, the water snake.
A cup next door|A strange cup stood beside the crow. The star lined up the papers so the drawings would meet.|The Crow and the Cup are neighboring constellations beside long, winding Hydra.
A bird loses its bearings|However the star turned the envelope, the spaces between the four points stayed the same. The longest edge became a landmark.|On a rotated chart, compare the lengths of the sides as well as the stars’ brightness.
A crooked postmark|Leaving the envelope crooked, the little star stamped a crow postmark that fitted the shape perfectly.|Remember Crv for Corvus to tell it apart from Crt for Crater, the Cup.

Pyx|Pyxis|A compass turned on deck|Two Arrows Point North|I wrote down both the way the needle pointed and the north you found. Out at sea, even the difference matters.
A round box in the cabin|The little star studied a mariner’s compass and gave the paper boat a little direction marker.|Pyxis is a southern constellation named for a ship’s compass.
The wavering needle|However the star turned the box, the needle swung back in much the same direction. The star marked that side of the railing.|A magnetic needle responds to Earth’s magnetic field. Its direction can differ from geographic north on a map.
North in the night sky|A friend pointed to Polaris in a northern observer’s sketch. The star added a second arrow beside the mark on the ground.|Polaris appears close to the north celestial pole. It can help you find your bearings by the sky.
Two drawers of tools|Side by side lay a compass for drawing circles and a round compass for sailing. Different parts moved.|Pyx is the mariner’s compass, Pyxis. Cir is Circinus, the drawing compass.
Sending a course|The star labeled both arrows and drew the cabin compass on the postcard.|Think of a ship at sea. Pyxis lies near Puppis, the Stern, and Vela, the Sails.

Vol|Volans|A fin briefly lifted above a wave|The Flying Fish and the Paper Wave|I hope the paper fish sails over the wave into your hand. Those two outstretched wings are actually fins.
Leaping out of the water|Looking at a southern sky picture, the little star thought it saw a bird flying over the water.|Volans is the Flying Fish. Imagine a flying fish spreading its pectoral fins.
From wings to fins|A friend erased the feathers and drew broad fins instead. The same points now looked like a fish.|The animals people draw into constellations reflect their names and traditions. The star positions remain underneath.
A pair of fish|The southern chart also showed Dorado. The star colored the long snout and the broad fins in different colors.|Volans and Dorado occupy separate southern sky regions. Both names appear on the same map.
A southern voyage|Looking at the birds and fish on an old southern chart, the star drew a little sailboat in the margin.|Bayer’s southern star chart of 1603 included southern constellations introduced during the European age of exploration.
Over the wave|A mountain fold sent the flying fish gliding over the crest of a paper wave to the other side.|Vol is short for Volans and Dor for Dorado. Write them together and use the pictures to tell them apart.

Cru|Crux|A dotted line extending the long arm|Finding South at the Harbor|I wrote “south” at the bottom of your postcard. It’s the direction you traced from the tip of the long arm.
A mark from a southern harbor|A picture from a Southern Hemisphere harbor showed four stars. The little star laid a short stick across a longer one.|Crux is well known for its cross shape in the southern sky.
The end of the long arm|Unsure which axis to extend, the star first measured the distance between each pair of ends.|Follow the long axis from Gacrux toward Acrux to extend it southward.
A point in empty sky|The star extended the axis, then stopped the pencil. No great lamplike star shone at the tip.|Extending the long axis of the Southern Cross points roughly toward the south celestial pole.
A thread toward the ground|Dropping a thread from that point to the horizon, the star marked south on the harbor map.|Drop straight down from the south celestial pole to the horizon to find due south on the ground.
Sending south to Seoul|The little star put the harbor’s location on the postcard, too. Even on the same night, different places see different skies.|The whole familiar cross is hard to see from Seoul. Try the view from a Southern Hemisphere observing site.

PsA|Piscis Austrinus|A fish holding a drop of water|A Dust Belt in the Fish’s Mouth|I drew a little ring inside the drop in the fish’s mouth. It’s how I’ll remember the dust belt in the telescope image.
A light low in the autumn south|Low in the autumn sky, the little star saw a light shining bright and seemingly alone.|Fomalhaut is the brightest star as seen from Earth in Piscis Austrinus, the Southern Fish.
A mouth catches the water|In the old picture, the fish opened its mouth toward water streaming from a jar.|Fomalhaut’s name refers to the fish’s mouth. Look at it beside the traditional picture of Aquarius.
A band in the telescope|An observing image showed a broad belt around the star. The little star traced its ellipse onto clear paper.|Astronomers have observed a belt of dust and debris from small bodies around Fomalhaut.
Why block the light?|The center of the photo was hidden. At first the star thought the printer had made a mistake.|Some observing techniques block bright starlight to reveal much fainter material nearby.
A little ring in the mouth|On the wide sky chart the star drew the fish. In a folded corner went the belt the telescope had seen.|The fish’s mouth marks a place in an old drawing. The dust belt is a structure observed around Fomalhaut itself.

TrA|Triangulum Australe|Two paper triangles laid together|A Triangle with a Southern Postmark|I’m glad my paper triangle didn’t quite fit yours. Now I can tell the two skies apart even with my fingertips.
Three dots with a southern postmark|The new paper carried three dots. At first the little star thought the northern triangle had come back.|Triangulum Australe means Southern Triangle. Its international abbreviation is TrA.
Different corners|Laid over the other picture, one corner stuck out. The star looked again to see whether the drawings matched.|The northern Triangulum and the Southern Triangle each use a different set of three guide stars.
Matching the scales|Even after the star copied both at the same scale, the sides of the two paper triangles opened at different angles.|To compare both shape and size, the maps must show equal angles as equal lengths.
Signed by southern neighbors|Beside the southern paper were the names of the Compasses, the Altar and the Carpenter’s Square.|The neighboring constellations help distinguish the Southern Triangle from the northern one.
Two stamps side by side|The star pasted the triangles side by side like stamps and sent them without trying to make them overlap.|Tri and TrA end differently. When two shapes look alike, their addresses help.

CrA|Corona Australis|Two different little crowns|A Crown from the South|I nearly wore the southern crown and gave the northern one to you. In the end I drew them side by side and sent you both.
A crown to pick up|A little curve of stars nestled on the southern chart. The little star cut out a paper crown.|Look for Corona Australis south of Sagittarius.
A familiar name|In a drawer was another drawing marked simply “Crown.”|Corona Borealis and Corona Australis are two different sky regions.
Paper at the same scale|The star matched the scales of the maps and fitted each into a frame of the same size.|To compare the area they cover on the sky, use maps that show equal angles as equal lengths.
An open ring|Tracing the outlines one at a time, the star found small differences in the gaps and the curve.|Even constellations named for similar objects have different arrangements of stars.
Drawers for two crowns|The star labeled one drawer South and the other North, then drew both crowns together.|CrA is the Southern Crown and CrB is the Northern Crown. Look at the final letter.

Lac|Lacerta|A zigzag in a crack in the rock|A Zigzag beside the Swan|I hid a tiny zigzag behind my back. Find the big W first and you’ll spot my lizard, too.
A tail in the wall|In a gap beside the swan, the little star spotted a line bent like a little tail.|Lacerta lies in the northern sky between Cygnus and Andromeda.
A cousin of the big W|The star cut out Cassiopeia’s W to try it against the chart, then noticed the different size and spacing.|To tell similar zigzags apart, check their orientation, size and bright neighboring stars.
A faint pencil mark|One faint point was missing from the first sketch. Looking again in the dark, the star corrected the line.|Less light pollution and time for your eyes to adjust make faint stars easier to find.
A name that came later|A friend brought out two old atlases. The star tucked a bookmark into the one that named the lizard.|Lacerta is one of the constellations introduced by Hevelius.
Hide-and-seek with a tail|Only a tail peeked out at the corner of the postcard. Starting from the swan, the friend soon found the body.|Lac marks today’s destination. Remember the path from its bright neighbor to the little zigzag.

Aql|Aquila|Two lamps on opposite banks|A Lantern across the Milky Way|I wrote your name beside the lamp I found first. On a summer night, let’s look for the light on the far bank, too.
A light across the river|The little star painted the Milky Way as a river and hung a tiny lantern on one bank.|Bright Altair in Aquila is also known in Korean tradition as the Cowherd Star.
The middle of three|The star added two faint dots beside the lantern. Now the middle light was easy to find again.|Remember the stars that appear close to Altair on either side. They make handy guides.
A window opposite|The star had left the far bank empty. A friend added a blue dot and sent the drawing back.|In the story of the Cowherd and the Weaver Girl, the Weaver Girl’s star is Vega in Lyra.
The third corner|The two lanterns were joined by a thread. Another thread reached out from the swan.|Together with Deneb in Cygnus, Altair and Vega form the Summer Triangle.
A river through a letter|The star joined the three corners and left the river running through the triangle.|The pale band of the Milky Way comes from countless stars seen together within our galaxy.

Del|Delphinus|A splash behind a diamond|The Dolphin That Leapt from a Diamond|It was you who added that last stroke for a tail. Thanks to you, the diamond leapt right out of the water.
A diamond on the water|The little star reflected four points in a still tank and drew a shape like a tiny kite.|Four stars form a small diamond in Delphinus.
One dot off to the side|Just when the star thought the shape was finished, a solitary point caught its eye.|Join the star outside the diamond and it’s easier to picture the dolphin’s tail.
Drawing the head first|A friend drew a kite and the star drew a dolphin. When they laid the papers together, the stars in the body lined up.|Even if you imagine a different animal, matching the spaces between the stars helps you find the constellation.
Beside a great wing|On the wide chart the little dolphin slipped from sight. The star started over with the eagle.|Look near Aquila, the home of Altair, for little Delphinus.
The last splash|The friend dotted a drop at the tip of the tail. Now the star could almost see the dolphin break the surface.|Del is short for Delphinus. Trace the four stars of the diamond first and the tail star last.

Vel|Vela|A sail revealed by unfolding the paper|A Starlight Sail for a Paper Boat|Fold the paper and it’s a boat. Open it and it’s a sail. Give it a puff of wind to finish the last scene.
Cloth that caught the wind|A friend unfurled a sail at a southern harbor. The little star looked for the same name in the sky.|Vela means the sails of a ship.
Pieces of one ship|The star laid the sail picture atop the drawer holding the keel and stern. A ship in three pieces took shape.|These three constellations were major parts of the old constellation Argo Navis.
A familiar-looking cross|Four points on the southern chart looked like a cross. For a moment the star almost stepped off the ship.|Some stars in Vela and Carina form the False Cross. Look carefully to tell it apart from Crux, the Southern Cross.
Checking the buoys|A friend held out a wider chart showing the stars around them. The two similar shapes sat some distance apart.|When one shape looks familiar, check its orientation and the bright stars nearby.
A postcard for a sail|The star fitted the first day’s paper boat with a sail painted with the southern sky and pushed it into the breeze.|Vel marks the sails, Car the keel and Pup the stern. Look for these neighboring traces of the old ship.

Gru|Grus|One footprint beneath a long, folded neck|A Bird by the Southern Shore|The crane’s on one leg because I left room for you to draw the other. Will you finish it?
Southern marshes|Looking at the Southern Hemisphere’s night sky, the little star pictured a long-necked bird beside the water.|Grus is the Crane. Several constellations in the southern sky bear birds’ names.
Neck or legs?|Where the star drew a long neck, the friend drew long legs through the very same dots. They looked at each other.|The dots alone don’t tell you which part is neck or leg. Compare them with the bird on an old chart.
Two dots to remember|Even after folding the picture away, the star remembered two particularly bright points.|Alpha and Beta Gruis are bright stars that help you find the Crane.
Mail for a neighboring bird|Finding the phoenix and toucan on the southern chart made the route to the crane a little shorter.|Grus, Phoenix and Tucana are close neighbors in the southern sky.
One foot at the shore|The star drew even the bird’s reflection in the water, then left one foot blank for a friend.|On an old illustrated map, pick out two guide stars first. Then you can find your place even if the paper turns.

Aur|Auriga|A little goat peeking from a sleeve|In the Charioteer’s Arms|I sent the charioteer a piece of soft cloth. I hope the goat in his arms stays warm.
A light leads the winter road|The little star hung a yellow light above a drawing of a cart and unfolded the winter chart.|Capella is the brightest-looking star in Auriga.
A hand on the reins|The charioteer in the old drawing held one hand tightly closed. The star looked at his other hand.|Old star charts show the charioteer with both reins and a goat.
A nose peeks out|A goat’s face emerged from what looked like a sleeve. The star drew little horns on the name tag.|The name Capella means little she-goat.
A neighbor’s nameplate|Tracing a pentagon, the star came upon a picture of a bull at one corner.|Elnath, often used to draw Auriga’s pentagon, belongs to Taurus.
A bell on the reins|On the way home the star needed only Capella to find the charioteer and his goat.|Capella is also part of the Winter Hexagon of bright stars.

Tel|Telescopium|A long telescope tube reaching to the edge of the page|A Long Tube in the Southern Sky|I drew a long tube and left the end where your eye goes empty. You’re the next observer.
A paper telescope|At the southern observatory, the little star used a long paper tube to imitate the telescope in the chart.|Telescopium is one of the southern constellations Lacaille named for scientific instruments.
A narrower window|Through the tube the whole room vanished, leaving just a little piece of the window.|Field of view means the area of sky you can see at once. A wide field makes a good start when looking for an object.
An opening for light|Realizing the paper tube had no lens, the star examined the front of a real telescope.|A telescope’s lens or mirror gathers light to make an image. A larger opening can gather more light.
The opposite drawer|A friend found a microscope on the southern chart, too. “What do you look at with this one?”|Tel marks Telescopium and Mic marks Microscopium. Think of distant things for one and tiny things up close for the other.
Room for the next observer|The star drew a long telescope on the postcard, leaving an empty space at the eyepiece.|Look south of Corona Australis for Tel. That’s the instrument’s address in the sky.

Com|Coma Berenices|A few stars freed from a ribbon|The Stars Beneath the Ribbon|When I untied the ribbon, each strand was lovely on its own. Undo the knot on your postcard yourself.
A loose ribbon|The little star imagined a ribbon tied around a faint gathering of light in the spring sky.|Coma Berenices is associated with a legend about Queen Berenice’s hair.
The queen’s promise|After reading how the queen offered her hair, the star took out a skein of golden thread.|The tale says the queen’s hair was lifted into the sky. It’s a story passed down through the ages.
A wider view|The telescope cut off both ends of the skein. Through binoculars, the star could see the scattered group.|The Coma star cluster spreads over a broad area of sky. A wide field shows the whole cluster well.
Counting the strands|The star put down the brush that painted the cluster as a single patch and dotted in stars with a fine pen.|This cluster’s loosely scattered stars look different from the tightly packed stars in a globular cluster.
Untie the ribbon|When the friend untied the postcard ribbon, tiny stars spilled from between two sheets of paper.|Com is short for Coma Berenices. Write down both the cluster and the constellation region it sits in.

Boo|Boötes|An orange point at the end of a curve|The Curving Spring Road|If a straight path takes you astray, bend the paper a little. The way I went was a curve.
A bent handle|The little star put a ruler along the Big Dipper’s handle, then stopped the pencil.|First notice which way the last three stars in the handle curve.
Setting down the ruler|The star set a thread in place of the straight ruler and gently extended the handle’s curve.|Follow the arc to Arcturus, a guide star of spring.
An orange signpost|At the place where the thread arrived, a friend handed over an apricot-colored pencil.|Arcturus is a bright orange giant in Boötes.
The next stop|There was a little thread to spare. The star carried it past the herdsman and added another star farther down.|The great spring arc runs through Arcturus and continues toward Spica in Virgo.
Packing a curved road|The star folded the paper diagonally so the curve would stay unbroken inside the postcard.|The spring arc crosses several constellations. Mark the spot where you arrive in Boötes.

Psc|Pisces|A knot joining the two ends of the paper|The Knot Where Two Fish Meet|Both fish made it into the same letter without losing the ends of their cord. Thank you for tying the knot so well.
A letter from two fish|Two drawings arrived with fish facing different ways. The little star spent a while wondering which went first.|Pisces is pictured as two fish joined by a cord.
Finding the little ring|Near the autumn square, the star found a small ring of stars and attached the first fish’s name tag.|One end of Pisces can be found by the little circlet near the Great Square of Pegasus.
A loose cord|The cord leading to the other fish was so long that the star unwound another skein.|The long line joining the fish is part of the chart illustration. The stars along it lie at different distances.
The star at the knot|Following both strands with its hands, the star brought them together at the name Alrescha.|Alrescha is Alpha Piscium. In traditional illustrations it marks the knot in the cords.
One envelope|The star folded away the envelopes meant for separate fish and put a single stamp over the knot.|Pisces shows two fish in a single official region. The Southern Fish is a separate constellation.

Hyi|Hydrus|Different names beside two snakes|One Letter in the Address|One little letter nearly sent my mail to the wrong snake. Take a look at the last letter on the envelope.
Mail in the wrong box|A letter marked Hya and a letter marked Hyi landed in the same box.|Hydrus is the southern water snake. Hydra is the long water serpent.
The southern post office|The little star unfolded the southern chart and found a separate box for Hyi.|Hydrus lies toward the south celestial pole. It’s easiest to look for it on a Southern Hemisphere chart.
Two lengths of snake|Side by side at the same scale, the two snakes took up quite different amounts of room.|Their official boundaries and areas differ. Trace the boundary lines beyond each drawing.
A sign beside a white cloud|A friend pointed toward Hydrus on a wide photograph showing the Small Magellanic Cloud.|Hydrus lies beside Tucana. Look for the southern sky landmarks together.
The final letter|The star circled the last letter on each envelope and delivered both to their proper owners.|International constellation abbreviations have three letters. Even one letter matters in Hya and Hyi.

Aqr|Aquarius|A stream flowing to the edge of the paper|Where the Stream Goes|The stream I drew reached the edge of the postcard. I hope a fish catches it on your side.
A tilted jar|The little star turned the chart to stand the water jar upright. Now the person holding it leaned sideways.|Aquarius depicts a person pouring water.
Where the water began|There was no stream on a chart of dots alone. The star laid a thread where the stream began in the old picture.|The stream on old charts is part of the illustration woven around the stars, so its lines vary a little between maps.
A path beyond the paper|When the thread ran off the page, the star opened the next sheet and fitted the edges together.|Constellation boundaries divide the sky. The stories in old drawings can cross those lines.
A waiting mouth|On the next sheet a fish waited open-mouthed for the end of the thread.|In old charts the Southern Fish catches the water from Aquarius. Fomalhaut is the bright star near its mouth.
A postcard pours water|The star folded the drawing across the stream. When the postcard opened, the water reached the fish again.|Pisces and Piscis Austrinus are separate regions. Today’s stream ends in Piscis Austrinus, the Southern Fish.

Hya|Hydra|A long paper snake folded many times|The Snake That Took Three Folds|Open the postcard three times to read all the way to the tail. Don’t be surprised to find a cup halfway along.
Only the head in the frame|The little star fitted the serpent’s head in the frame. Finding the tail took a long journey sideways.|Hydra has the largest area of all 88 constellations.
A second sheet to fold|Drawing the long body behind the head, the star had to join on another sheet of paper.|The head of Hydra can be found near Cancer.
Where someone left a cup|“Someone left a cup on the serpent’s back. Let’s stop for a rest,” the star said along the way.|Old charts show Crater, the Cup, on the serpent’s back.
A bird on its back|The next fold revealed a crow, and even then the body kept going.|Corvus also lies beside Hydra. Follow the smaller neighbors in turn to trace the long body.
Tagging the tail|On the last sheet the star wrote “End of Hya.” Folded up, the head and tail finally met.|Its name is similar to Hydrus in the southern sky. Hydra’s abbreviation is Hya.
`;

const byId = new Map(monthlyStories.map(story => [story.id, story]));
export default stories.trim().split('\n\n').flatMap(block => {
  const [header, ...episodes] = block.split('\n').map(line => line.split('|'));
  const [id, ...metadata] = header;
  const story = byId.get(id);
  const source = [story.name, story.motif, story.title, story.letter, ...story.episodes.flat()];
  const translated = [...metadata, ...episodes.flat()];
  if (translated.length !== source.length) throw new Error('English story field count mismatch: ' + id);
  return source.map((text, index) => [text, translated[index]]);
});

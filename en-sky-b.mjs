import {monthlyStories} from './monthly-story-data.mjs';

// Each first line gives the name, motif, title and postcard; each following line is one episode.
const stories = {
Sct: `Scutum|A cluster of tiny star dots beside a shield|A Flock on the Shield|I tried to draw a flock of ducks beside the little shield and ended up with a page full of stars. I'll let you decide what shape they make.
The Rim of the Shield|Following the Milky Way, the little star found a drawing of a shield covered with dots like scratches.|Scutum lies in the summer Milky Way, in a direction rich in background stars.
A Crowd Among the Crowd|Sweeping binoculars across the star field, a friend pointed out one especially crowded patch.|M11 is an open cluster packed with stars in the direction of Scutum.
Why Ducks?|The star brought a drawing of wild ducks. There wasn't a single duck in the telescope photograph.|The Wild Duck Cluster got its nickname because someone thought its stars looked like a flock of ducks.
A Friend's Formation|In the same picture the friend found a fan, and the star saw a V-shaped flock. The dots hadn't moved at all.|A nickname captures a first impression. Write down M11 too, and you can find the same cluster even if you see different shapes.
What the Scratches Were|With the brush meant for touching up the shield, the star painted the tiny dots of the cluster one by one.|Scutum is a constellation. M11 is a star cluster we see in that direction.`,
Cyg: `Cygnus|A cross drawn over a pair of wings|The Swan's Other Name|I folded the wings away and the cross stayed. Call it whatever shape you spotted first.
Wings Over the River|Seeing a bird flying along the Milky Way, the star laid paper wings on its long body.|Cygnus can be seen along the Milky Way in northern summer skies.
A Lantern at the Tail|The star was about to place the brightest dot at the head, then took another look at the old drawing.|Bright Deneb marks the swan's tail.
The Northern Cross|When the star covered the bird drawing, a friend spotted where the long and short lines crossed.|The Northern Cross is a familiar pattern within Cygnus. The Southern Cross lies in another part of the sky.
Two Lights at the Beak|Looking through the telescope at the tip of the beak, the star put two colored pencils in the same square.|Through a telescope, Albireo shows two stars of different colors.
A Picture With Two Names|The star made a postcard that showed a bird held one way and a cross when the wings were covered.|Deneb is also a corner of the Summer Triangle. One dot can belong to several patterns.`,
Ser: `Serpens|A snake that joins up when two sheets overlap|One Snake on Two Sheets|Two envelopes, one letter. Start at the head and read all the way to the tail.
A Map With Only a Head|The star copied the snake's head carefully. However far the paper unfolded, there was no tail.|Serpens is the only modern constellation divided into two separate regions.
I Thought Someone Cut It|On the next page, the tail appeared on the far side of the snake bearer. There wasn't a tear anywhere.|Ophiuchus sits between the head and tail of Serpens.
Two Name Tags|The star wrote Caput on the head, Cauda on the tail, and Ser on both sheets.|Caput means head and Cauda means tail. Together they count as one official constellation.
An Eagle by the Tail|Studying the tail map, a friend found a nebula with a bird's name.|The Eagle Nebula, M16, is in the tail of Serpens. Its name might suggest an eagle, but its constellation is Serpens.
One Long Letter|The star tied both pages with ribbon and slipped them into one envelope. In the gap in the middle, the star drew the snake bearer.|The abbreviation Ser will find records for both regions. Add which part you mean for a more precise address.`,
Oph: `Ophiuchus|A long cord stretched across two hands|Both Hands Full of Snake|When I drew the hands separately, the snake slipped right off the page. Unfold the letter and it'll be back in my hands.
Two Empty Hands|A figure on the map held both arms wide. The animal in its hands was hiding in the fold of the book.|Ophiuchus is drawn as a person holding a snake.
A Head on the Left|The star found the snake's head on one sheet and laid it across the first open palm.|Serpens Caput means the head of Serpens.
A Tail on the Right|The opposite sheet unfolded to reveal the tail beside the figure's other hand.|Serpens Cauda is the tail of that same constellation.
The Figure Between the Lines|The star tucked a drawing of the snake bearer between the sheets. One snake appeared in two separate regions of the map.|On modern charts, Ophiuchus occupies the space between the two parts of Serpens.
A Letter With Open Hands|Fold the postcard down the middle to see the person alone. Open it again and the snake appears too.|Oph stands for the snake bearer and Ser for the snake. The two parts of the snake count as one constellation.`,
Phe: `Phoenix|A red feather resting on ashes|Wings Folded on the Ashes|After coloring in the flames I left a little patch of ash. I wanted to remember where the bird took flight.
A Feather in the Ash|Beside the hearth, the star laid a red paper feather on the ash and listened to a tale of a southern bird.|Phoenix is a southern constellation named for the immortal bird of Western tradition.
Two Birds Under One Name|The star laid one picture of a phoenix over another and added a note explaining that they came from different stories.|In Korean, Phoenix is also called Bonghwang. The Western phoenix and the East Asian bonghwang belong to different traditions.
Wings Rise Again|When the star lifted the wings from the drawing of ash, a friend said it looked as though the phoenix were being born again.|Death and rebirth often appear in phoenix stories. Long ago, people drew pictures of the bird coming back to life.
A Place in a Photograph|The star laid a paper feather on a photograph of the Southern Hemisphere sky. Real stars shone where the old picture had flames.|Phoenix borders Grus, the Crane. See if you can trace the mythical bird's flight on a southern star chart.
The Night of Folded Feathers|The star folded the paper bird's wings into the postcard. Whoever unfolded it could send the bird flying again.|A drawing from the legend beside the abbreviation Phe can help you remember both the old story and where to look.`,
CrB: `Corona Borealis|A single jewel on a semicircle|A Greeting in an Open Crown|I left a little gap in the crown. That's what made it look like the one you saw in the night sky.
Half a Ring|The star picked up a few beads on a spring sky map. On their string they curved around, open at one end.|Corona Borealis is easy to recognize by its semicircle of bright stars.
One Clear Bead|Turning the string of beads, a friend slid the brightest one to the middle.|Alphecca is the brightest star in this semicircle.
Who Wore the Crown?|The star opened an old storybook and wrote the name Ariadne on a ribbon.|One Greek story tells of Ariadne's crown being placed in the sky.
The Missing Bead|The star was about to close the ring, then checked the real chart and snipped off the spare thread.|Even the gaps between stars can help you remember a pattern.
A Letter in the Margin|The star wrote a little greeting in the open side of the crown. Every bead still shone in full view.|Look for the open semicircle between Boötes and Hercules.`,
Col: `Columba|Wings folded at the bottom of a star chart|A Letter for the Dove|I found the bird that flew down carrying a letter. This time I tucked my letter gently into its beak too.
Lost Mail|Looking only at the top of a winter sky chart, the star wandered around with an envelope addressed to the dove.|Columba lies farther south than Orion.
First, a Hare|The star found the hare at Orion's feet and unfolded another handspan of the map.|Look south of Lepus to find Columba.
Above a Low Roof|The star changed observing spots. Beyond the roof that had blocked the southern view, the stars from the map came into sight.|Buildings can easily hide the low southern sky. Mark the horizon in your observing notes.
Which Way the Beak Points|Folding away the drawing of the dove, the star retraced the route using dots alone and wrote “Col” on the envelope.|Columba means dove. Its abbreviation, Col, tells you where to deliver the letter.
Delivered|At last the star put down the envelope and drew in the way home, from the dove past the hare to Orion.|Following your route in reverse can help you remember where you found a star.`,
CVn: `Canes Venatici|A spiral beside a hound's paw print|A Whirlpool at the End of the Trail|I followed the hounds' tracks and found a swirling galaxy. For a moment I thought I'd lost my way!
The Herdsman's Two Friends|Beside the herdsman, the star found two leashes, each with a dog at the other end.|Canes Venatici lies between Boötes and Ursa Major.
To the Tip of the Handle|The star folded away the Great Bear, leaving just the tip of the Big Dipper's handle.|Start from Alkaid at the handle's tip to find the direction of the Whirlpool Galaxy.
Two Little Marks|In the telescope photo were two marks like ink stamped twice, once large and once small.|M51 is the Whirlpool Galaxy, seen paired with a neighboring galaxy.
A Winding Trail|Starting at the edge of the larger mark, the star followed the curling lines all the way to the center.|Spiral arms are patterns of stars, gas and dust. Long-exposure photographs reveal them in detail.
A Whirlpool by the Tracks|A friend stamped a paw print while the star pressed in a spiral. Together they finished the postcard.|The stars of a constellation and a distant galaxy seen in that direction lie at very different distances from us.`,
Leo: `Leo|A little star hanging below a mane|A Spring Night's Question Mark|The dot you put under the question mark turned out to be the lion's heart. I left the question just as it was.
A Backward Question Mark|Looking up on a spring night, the star thought someone had written a punctuation mark the wrong way round.|Leo's head and mane are often found by looking for a sickle or a backward question mark.
A Star at the Handle|The star spotted a bright light below the curved blade and stamped it like the dot under a question mark.|Bright Regulus sits here, traditionally drawn as the lion's heart.
All the Way to the Tail|A friend lifted the paper mane. At the tip of the triangle behind it, the tail star was waiting.|Denebola is the bright star that marks the lion's tail.
A Crouching Lion|The star marked just the head and tail, then sketched a little reclining lion in the space between them.|Finding Regulus and Denebola first makes it easier to picture which way Leo's body lies.
Spring Punctuation|On the finished postcard, a lion lay like a question without a single letter on the page.|The Sickle is part of Leo. Check the map to see the full constellation region around it.`,
Lyn: `Lynx|A trail of soft pencil marks|As Your Eyes Get Used to the Dark|I left the dot I missed at first very faint. Let's darken it together on the next clear night.
Tracks That Appeared Late|A while after the observatory lights went out, the star began to spot faint marks through the window.|Lynx has few bright stars. A dark sky and enough time for your eyes to adjust help you see it.
A Long Body|Trying to go straight from the first dot to the last, the star got lost and broke the route into shorter stretches.|Open a chart of the sky between Ursa Major and Auriga. Use the brighter dots as guides.
Only What I Saw|A friend's sketch had one extra star. The star put a small question mark in that spot on its own drawing.|Conditions affect how many stars you can see in the same patch of sky. Record what you saw separately from what you guessed.
The Lynx's Eyes|An old chart showed a sharp-eyed animal. The star saw how the scattered clues fit inside it.|Hevelius named Lynx. Its name is often linked to the keen eyesight needed to see faint stars.
A Night With a Question Mark|On the next clear night, the star found a thin speck at the question mark and joined up the trail of tracks.|Save the address Lyn and the observing date so you can compare the same patch of sky next time.`,
Tri: `Triangulum|A faint swirl beyond three dots|A Distant Spiral by the Triangle|Once you've joined all three dots, the pale smudge that's left is my gift. Give your eyes a rest as you look for it.
A House With Three Dots|The star joined three dots into the simplest possible roof and wrote Tri in tiny letters below it.|Triangulum is in the northern sky. Its name sounds like Triangulum Australe, the Southern Triangle.
A Stamp Outside the Roof|A friend stuck an M33 stamp outside the three stars. The star checked the boundary and nodded.|M33, the Triangulum Galaxy, lies in this constellation's direction. It needn't be inside the lines that join the three stars.
Light Spread Thin|The star could barely find the center in an observing sketch. Its wide wash of light easily disappeared into bright city skies.|Even with the same total brightness, an object can be harder to see when its light is spread across a larger area.
Spinning Paper|In a larger photograph the spiral arms opened out. The star copied them onto a paper pinwheel.|M33 is a spiral galaxy in the Local Group, which also includes our Milky Way and the Andromeda Galaxy.
A Spiral by Three Dots|The star titled the picture “Triangle” and drew a little spiral in place of the final period.|The constellation and galaxy have similar names. One is a region of sky, and the other is an object we see in that direction.`,
Cep: `Cepheus|A roof traced with a rising and falling line|A Light in the King's House|A line climbs and dips along the edge of my letter. Meet me at the next peak.
The King's Roof|Beneath a house-shaped group of stars the star drew a little door. On its nameplate was the name of a king.|In Greek mythology, Cepheus is Cassiopeia's husband.
Tonight's Light|Shading a star by the door, the star recorded two nearby points of light as well.|Delta Cephei is a variable star whose brightness changes regularly.
Back to the Same Window|A few days later the star drew the same roof. This time one dot needed heavier shading.|Compare a variable star's brightness with nearby comparison stars and write down the date.
A Trail of Rises and Falls|The star set the dates side by side and joined the brightness measurements. Little hills repeated across the page.|A graph of brightness measured over time is a light curve. The spacing between repeats gives the period.
A Rhythm Written in Light|A friend tapped the dots with a finger. The star kept time by pointing to the next peak.|The relationship between a Cepheid's period and its intrinsic brightness helps astronomers measure distances.`,
Cen: `Centaurus|An address written to a nearby neighbor|To My Nearest Neighbor|I almost missed our nearest friend by looking only at the name on the front door. Let's write down the little name too.
An Address From the South|To write a letter to a nearby neighbor, the star picked a bright dot on a southern sky chart.|Alpha Centauri appears as a bright light in the southern sky.
Two Names on the Door|In a telescope sketch the star found two names under one nameplate.|Alpha Centauri A and B are two stars orbiting each other.
A Chair Farther Away|In the same family's portrait the star noticed a little third chair sitting off to one side.|Proxima Centauri belongs to the same system and lies much farther from A and B than they do from each other.
A Faint Neighbor|The friend invisible to the unaided eye turned up in a photograph. The star wrote the name on the envelope in tiny letters.|After the Sun, Proxima is the closest star to Earth. As a dim red dwarf, it's hard to see with the naked eye.
Three Names on One Mailbox|The star wrote one address and three names on the envelope and sent a greeting to the nearest neighbor.|Apparent brightness alone can't tell you a star's distance. Stars vary in their own brightness too.`,
Hor: `Horologium|Two sketches with their times written in|A Time Beneath the Sky|I filled the blank below yesterday's picture. Just writing “nine o'clock” let me match the two skies again.
A Clock That Stopped|On a southern chart, the star found a clock whose hands never moved.|Horologium is one of the constellations Lacaille introduced while charting the southern sky.
An Undated Hour|Two drawings made through the same window didn't line up. Only the dates were written underneath.|To compare apparent positions in the sky, record the place, date and time.
One Swing and Back|Watching the pendulum swing, a friend wrote down the time their observation began.|A pendulum clock measures time using the regular back-and-forth swing of a weight.
A Star That Moved|An hour later they plotted the dots using the same roof as a guide. The star had clearly shifted.|Earth's rotation makes the stars appear to move across the sky over the course of a night.
A Line Below the Picture|This time the two friends' separate drawings showed the same hour. Even the window frames and stars lined up.|Hor is the abbreviation for Horologium. Try writing the observing time beside the constellation name.`,
Gem: `Gemini|Two buttons in slightly different colors|Two Buttons, Two Colors|I went looking for matching buttons and chose two different ones. It takes both to make the twins we saw.
Two Matching Hats|The star put matching hats on a drawing of the twins. Looking up, one of the twins seemed a different color.|Castor and Pollux are the stars that mark the twins' heads.
An Amber Button|A friend pulled out an orange button. It suited one star especially well.|Pollux is an orange giant. Compare its color with Castor beside it.
A White Button|The star sewed a white button to the other hat and read the names back in reverse order.|Castor looks white to the eye. Telescope observations revealed that it is a multiple-star system.
The Path Below the Shoulders|From the two heads alone on the page, the star drew lines of stars downward. Two figures walked side by side.|Starting at the two bright head stars, follow fainter stars along each twin's body.
A Pair With a Difference|A friend swapped the two buttons. One look at their colors and the star put them right back.|Even stars that appear side by side can lie at different distances from Earth.`,
And: `Andromeda|An oval like a fingertip smudge|Where the Eraser Stopped|I almost rubbed out the smudge at first. Thanks for stopping me. You saved a whole galaxy.
A Princess in a Fold|Beside the queen's chair was a fold in the paper. When the star opened it, her daughter's name appeared.|In Greek mythology, Andromeda is Cassiopeia's daughter.
Following the Name Tag|Starting under the princess's name, the star reached toward the great square in the autumn sky.|Alpheratz, one corner of the Great Square, belongs to Andromeda.
A Hand Stays Still|Between the stars was a mark like a pencil smudge. The star put down the eraser.|Under dark skies, the bright center of the Andromeda Galaxy appears as a faint patch even to the naked eye.
“VAR!” on a Photograph|On an old photographic plate the star spotted a handwritten “VAR!” pointing to a dot inside that first smudge.|In 1923 Edwin Hubble found a star in Andromeda whose brightness varied periodically. Measuring its distance provided evidence that Andromeda lies outside our Milky Way.
An Address for an Oval|The star wrote “M31” beside the smudge that had almost been erased and folded the map again.|M31 is the catalog number of the Andromeda Galaxy, beyond our Milky Way.`,
Ari: `Aries|A golden horn curling off the page|A Horn Wound in Golden Yarn|If the end of the yarn comes loose, curl it back up for me, like the horn we found on the map.
At the Tip of the Horn|The star laid a curl of yarn on an autumn chart. A ram's face appeared at the end of the thread.|Hamal is a bright guide star in Aries. Look for its name on the chart first.
Glittering Wool|A golden thread trailed out of a little box. The star wrapped it once around the ram's back.|The Greek myth of the Golden Fleece is linked to this constellation.
A Traveler on Its Back|Reading the old tale, the star gave a tiny paper traveler a seat on the ram's back.|One part of the story tells of Phrixus crossing the sea on the golden ram.
The Ram Without Its Picture|With the yarn and the traveler put aside, a short bent line of stars appeared where the ram had been.|Finding Hamal and Sheratan together helps you locate the ram's head on a chart.
A Horn on the Envelope|The star tied the first thread at the opening of the envelope and drew Hamal beneath it.|Ari is short for Aries. Write it on the envelope and you can find the constellation on charts in other languages.`,
Eri: `Eridanus|A river across folded paper|A River Across Two Skies|Unfold the postcard all the way to see my greeting. This river was too long to fold up halfway.
The First Bend|Near Orion's foot, the star found a blue line just right for launching a paper boat.|Eridanus is drawn as a long river flowing across the sky.
A Map That Keeps Going|The star unfolded the paper along the river, only to find another bend. A single sheet wasn't enough.|The constellation spans a wide range of declinations from its northern reaches to its southern end.
A Night the River Disappeared|When the star drew Seoul's southern horizon, the lower reaches of the river sank beneath the page.|Your observing latitude determines how much of the southern sky is visible.
A Lantern on the Far Bank|Joining on a drawing from the Southern Hemisphere, the star found a bright dot waiting at the river's end.|Bright Achernar marks the southern end of Eridanus.
A River Joined Together|The star laid the two drawings out as one long waterway and nudged the paper boat to the last lantern.|When joining charts from two observing sites, use overlapping stars to match their scales and directions first.`,
Vul: `Vulpecula|A small dumbbell beside a fox's paw|An Apple Core by the Fox|I went looking for a fox and picked up a light shaped like an apple core. You called it a dumbbell, remember? I drew both.
A Little Fox in the Milky Way|Searching below Cygnus, the star tried sketching a fox's face among the faint stars.|Vulpecula lies near the Milky Way in northern summer skies.
Starting at the Arrowhead|When the fox vanished from the chart, a friend showed a path leading up from Sagitta.|Finding the tiny Arrow, Sagitta, first can help you locate nearby Vulpecula.
An Odd Piece of Fruit|The fuzzy light in the telescope reminded the star of an apple core, wide at both ends.|M27 is a planetary nebula nicknamed the Dumbbell Nebula. Its outline varies with the instrument you use.
A Pulse on Paper|Looking for the fox again, the star unrolled a long radio recording in place of a photograph. Little wiggles returned at regular intervals.|The first pulsar, discovered by Jocelyn Bell Burnell in 1967, lies in the direction of Vulpecula. Signals from a rotating neutron star reach Earth like a steady pulse.
A Postcard With Two Names|The star drew the apple core and dumbbell side by side and wrote M27 in tiny letters under the fox's paw.|People can think of different nicknames. The same catalog number points to the same object.`,
Cap: `Capricornus|A tail folded into the waves|Between Horn and Tail|I trimmed the tip of the tail into a wave. Even if you only see half, you'll know this goat has been to sea, won't you?
A Map Showing Only Horns|Two horns poked up from a folded chart. The star got ready to draw a goat's hooves.|Capricornus is traditionally drawn as a sea goat with a goat's front half.
The Folded Half|The lower part unfolded. Where the star had meant to draw hooves, there were scales.|The back half of the sea goat has a fishlike tail.
Two Drawing Tools|For the horns the star used a dry brown pencil, for the tail a wet blue brush.|Look at a constellation's name beside its old drawing to find details the short name leaves out.
A Sharp-Edged Triangle|With the animal picture lifted away, a friend traced a broad outline through the stars.|The lines on a star chart offer one way to recognize a picture. The constellation's boundary takes in a wider area.
A Wave-Patterned Envelope|Folded again, the paper showed horns and tail side by side. No one took it for an ordinary goat now.|Follow the abbreviation Cap to find other drawings of the same constellation.`,
Ori: `Orion|Silver paint spreading beneath a belt|A Little Mist Below Three Buttons|I followed the belt and found a little mist hanging from the sword. Next time you spot those three stars, you'll find it too.
Buttons in a Row|Sewing buttons on a winter coat, the star spotted three stars in a row outside the window.|The three stars of Orion's Belt are a good starting point for finding shapes in the winter sky.
Different Lights on Either Side|Above one side of the belt glowed a red light. Below the other side was a blue one.|Betelgeuse and Rigel are bright stars of different temperatures, which gives them different colors.
Mist in the Scabbard|Following the sword hanging below the belt, the star found that its middle wasn't as sharp as a single star.|In that direction, the Orion Nebula, M42, appears as a hazy light under dark skies.
A Room Where Stars Are Born|Enlarging a photograph, the star found glowing gas and little stars inside it.|The Orion Nebula is a region where stars form amid gas and dust.
A Window Below the Buttons|The star stitched a tiny pocket onto the first day's drawing of a coat and tucked the nebula photograph inside.|Look at the whole scene with binoculars, then at the center in a telescope photo to see how the two pictures fit together.`,
Mon: `Monoceros|A cluster of stars at the heart of a flower|A Rose in the Winter Triangle|I found a little garden between winter's three lanterns. Instead of a rose, I'm sending you the stars in its center.
Inside Three Lanterns|After finding the corners of the Winter Triangle, the star noticed all the sky left inside.|Monoceros lies in the winter sky between Orion, Canis Major and Canis Minor.
A Hidden Horn|Only after finding a single horn in an old drawing could the star put a name to the quiet patch of sky.|Monoceros has few bright guide stars. Start with nearby Sirius and Procyon.
A Photograph of a Flower|A photo from the observatory showed layers of gas like rose petals wrapped around stars.|The Rosette Nebula is a region of gas and dust in the direction of Monoceros.
A Center Without Petals|The star was about to draw a flower's center, then copied the tiny cluster of stars one by one instead.|Near the center of the Rosette Nebula lies the young open cluster NGC 2244. Its hot stars influence the gas around them.
A Winter Garden|Into the middle of that first map, with its three lanterns, the star slipped a little drawing of a rose.|The broad nebula shown in photos looks different to the naked eye. Record how you observed it.`,
Car: `Carina|A long line down the bottom of a ship|The Star That Holds Up a Ship|From the deck I couldn't see the timber holding up the whole boat. This time I wrote my letter to that timber.
A Sound Beneath the Ship|Lying on the shipyard floor, the star saw a thick timber running overhead from end to end.|A keel is the backbone running down the center of a ship's bottom. That's where the name Carina comes from.
One Ship in Three Drawers|In the observatory's drawers, a single ship had been divided into three parts.|Three major parts of the old Argo Navis survive in the constellations Carina, Puppis and Vela.
A Southern Harbor Light|A photograph from a southern observatory showed one bright dot particularly clearly.|Canopus is a bright star in Carina. How high it rises above the southern horizon depends on your latitude.
A Second Light in the 1840s|The star opened an old observing log from the harbor. In a different spot from Canopus, another star had once shone remarkably brightly.|Eta Carinae brightened dramatically in its 19th-century Great Eruption and survived. Later telescope photos show enormous lobes of ejected material on either side of the star.
A Name Carved Underneath|Turning the finished boat over, the star found a signature visible only from below and stamped Canopus beside it.|Car is short for Carina. Try recording the name of a navigation star alongside its constellation.`,
Dra: `Draco|Northern markers for today and long ago|When Thuban Marked North|A traveler long ago would have put my north mark just a little to the side. I'm sending you both dots.
A Tail Between the Bears|Crossing from the Great Bear to the Little Bear, the star tripped over a long and winding tail.|Draco's body winds between the two bears in the northern sky.
An Old Mark for North|In a reconstruction of the northern sky long ago, the star found the center marked in an unfamiliar place.|The north celestial pole is the direction in which Earth's north rotation axis points.
Thuban's Turn|The star found Thuban in the dragon's body and placed it beside the old center mark.|Thousands of years ago Thuban in Draco lay closer to the north celestial pole than today's North Star did.
A Slowly Turning Top|The axis of a friend's spinning top slowly traced a circle. The star drew a faint arc between the two north marks.|The slow change in the direction of Earth's spin axis over long periods is called precession.
A Compass for Two Ages|The star labeled the maps with their different eras. Nobody had drawn the same night sky wrong, after all.|Today the star we use as a northern guide is Polaris in Ursa Minor.`,
Sex: `Sextans|A graduated arc drawn between two stars|A Measure Between Two Stars|I couldn't carry the two stars home in my hands, but I brought the angle between them home on paper.
A Shining Scale|Looking at a curved scale, the star thought of measuring the stars suspended in the sky.|A sextant measures angles. Its name comes from an arc spanning one sixth of a circle.
The Gap Between Two|Measuring two plotted stars with a ruler, the star got a different answer depending on the paper's size.|The separation between two directions in the sky can be given as an angle.
A Navigator's Way|A drawing of a ship's sextant showed one line pointing to a star and one to the horizon.|Navigators use a sextant to measure altitude, the angle between a celestial object and the horizon.
An Observatory Memory|An old chart told of an observing instrument used by Hevelius, who named the constellation. It too was a sextant.|Sextans commemorates the astronomical sextant Hevelius used for observations.
A Gift of One Measure|Instead of two drawings, the star gave a friend two dots and a small arc marked with the angle between them.|Sex abbreviates Sextans. Compare it with Oct, the southern constellation Octans.`,
Lup: `Lupus|Different silhouettes stamped on two sheets|A Wolf on Tracing Paper|I didn't recognize your drawing from the outline alone. Then I saw the paw prints in the same places.
Whose Shadow?|On a southern chart the star found an animal stretching its body. Its shadow alone didn't give away its name.|Lupus, the Wolf, is the constellation's international name. Look near Centaurus in the southern sky.
Who's Holding It?|Unfolding a little more of the map revealed an arm reaching toward the animal from the picture next door.|Traditional star charts often show Centaurus and Lupus in a shared scene.
Two Artists' Paws|On another old chart the animal's paws were tucked in. In the first drawing they stretched farther out.|Each artist can give the animal a different pose. Match guide stars to check that you're looking at the same region.
Dots That Stay Put|The star erased the animal's outline on a transparent sheet. The brightest dots stayed where they were.|The area covered by a constellation picture can differ from the region enclosed by its modern official boundary.
Two Layers of Tracks|The star drew a wolf stretching on the front and crouching on the back, piercing the paper at the same stars.|The abbreviation Lup will identify the constellation even when its drawing changes.`,
Ind: `Indus|The year of a chart copied into its margin|The Maker of the Map|In the margin I wrote the mapmaker's name in place of a name for the person pictured. I wanted to remember whose eyes we were looking through.
Who Chose the Name?|The figure on the southern chart had a label, but the star could find no words from the person pictured.|Indus is a figure depicted in old European star charts. Look at the era in which the name was chosen.
Back to the Cover|About to invent a description beside the figure, the star turned to the title page. It named the maker of the atlas.|The artist and the person in the picture are different people. Record whose account you're reading.
The Printed Year|A friend read out the year and the star pasted a little paper strip below the figure.|Bayer's 1603 atlas includes several southern constellations then being introduced to Europe.
An Empty Speech Bubble|The star put down the pencil before adding words the book didn't contain and copied only the observed positions of the stars.|A single European name on an old chart can't tell us another culture's stories about the sky.
Two Spaces on the Page|The star folded a postcard with two separate notes, “What the map says” and “What I'd like to learn.”|Today Ind is the international abbreviation for this constellation. You can use it to match the region when you encounter a historical name.`,
CMi: `Canis Minor|A triangular letter with one corner folded|The Third Corner|In our picture of three friends, the smallest piece of paper is my place. You need that one sheet to close the triangle.
A Sign With Two Stars|Getting ready to draw the little dog, the star saw two bright points and set the pencil down.|Procyon and Gomeisa are the two conspicuous stars in Canis Minor.
The First Name Called|A friend pointed first to the brighter dot. The star tied a ribbon labeled Procyon there.|Procyon is one of our neighboring stars that shines brightly in the winter sky.
A Thread for the Great Dog|The star unwound a thread from Procyon and tied it to Sirius in Canis Major, drawing the two ends taut.|The Little Dog and Great Dog are separate constellations. Each bright star belongs to its own constellation.
The Last Chair|With an empty chair placed on Orion's shoulder, the three friends seemed to be sitting at one table.|Join the line to Betelgeuse to complete the Winter Triangle.
The Corner of the Paper Triangle|The star folded the three corners together and pulled the little dog's ribbon to the outside.|Try starting at Orion's reddish shoulder and drawing a route back to Procyon.`,
UMi: `Ursa Minor|A single dot left at the tip of a handle|The Lantern at the Little Dipper's Tip|I drew a tiny circle around the lantern at the end of the handle. It's the northern sky's handwriting.
The Little Dipper's Handle|Crossing over from the Big Dipper, the star met a bright point at the tip of the Little Dipper's handle.|Polaris belongs to Ursa Minor. The Big Dipper is part of Ursa Major.
Watch All Night|The star set a chair by the window and sketched the sky twice. The other stars shifted, but the end star stayed in much the same place.|Polaris is close to the north celestial pole, so we use it to find north.
One Tiny Circle|A closer look at a long exposure showed that even Polaris wasn't a dot at the exact center.|Polaris and the north celestial pole aren't in exactly the same place. Polaris appears to trace a little circle too.
The Missing Bowl|In town only the tip of the handle showed. The bowl's faint stars were hidden, so the star laid a dark-sky sketch beside it.|The stars in Ursa Minor vary in brightness. Start with Polaris and work your way to the fainter ones.
A Light to Come Home To|Even with the dipper drawn very small on the postcard, the star kept the tip of its handle clear.|Write UMi on the chart beside UMa for Ursa Major, and the names of the two dippers will be easier to remember.`,
};

const entries = [];
for (const source of monthlyStories) {
  const translation = stories[source.id];
  if (!translation) continue;
  const original = [source.name, source.motif, source.title, source.letter, ...source.episodes.flat()];
  const lines = translation.split('\n').flatMap(line => line.split('|'));
  entries.push(...original.map((text, i) => [text, lines[i]]));
}
export default entries;

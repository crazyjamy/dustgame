// English text follows the same five-episode sequence as the Korean manuscripts.
import { monthlyStories } from './monthly-story-data.mjs';

const manuscripts = {
LMi: `Leo Minor|A little paw resting on a great mane|A Little Paw on a Big Paw|Unfold the letter for the big lion. See the tiny paw print at the top? That's my spot.
A second paw print|The star stamped a little paw above the lion and read the name beside it for the first time.|Leo Minor lies north of Leo, toward Ursa Major.
When the page was blank|The star laid charts from different ages on top of each other. Only one had a little lion in that patch of sky.|Stars can be far older than the names people give their constellations.
A name for the cub|The star pinned a Little Lion name tag to the newer chart and looked up its maker.|Leo Minor is one of the constellations Hevelius introduced in the 17th century.
Two lions' manes|Once the star found the big lion's bright Sickle, the faint dots beside it were easier to copy.|Leo Minor has few bright guide stars. Start with a nearby constellation you can pick out.
An address for a little paw|The star put the letters in separate envelopes and stamped a single paw pad on the small one.|Leo is the big lion and LMi the little one. Each has its own region of sky.`,
Sco: `Scorpius|A tail curling below a red dot|From the Red Heart to the Tail|I set off from the red heart and followed the tail to its tip. On the way back, the bend made the path easier to find.
A red button|In the southern summer sky the star found a glowing red button and fastened it over its heart.|Antares is a red supergiant in Scorpius. Charts place it at the scorpion's heart.
A winding path|A line beside the button ran a long way down, then curled up like a fishhook.|Several bright stars trace the curve from the scorpion's body to its tail.
The hidden tip|The garden wall cut the tail short. The star found a clearer view south and picked up the line again.|From Korea, Scorpius sits low in the southern sky. When and where you look matters.
The vanishing hunter|A friend tried to draw the scorpion and Orion on one evening chart, then unfolded two maps from different seasons.|Greek tradition tells a story about the scorpion and Orion. In Korea's evening sky they guide us in different seasons.
Heart to tail|The star drew a red dot and a curved line across both sides of the postcard to remember the way.|Follow the tail from Antares. Once you know the route, try tracing it back to the heart.`,
Ara: `Ara|A flame drawn in red pencil|An Ember on the Altar|I left just a pencil mark so you can draw the flame leaning whichever way you like.
Where the fire went out|A little stand sat on the sheet of paper that held the southern sky.|Ara means altar. Old charts show a place where offerings were made.
Following the smoke|The star followed the smoke in the picture and realized the chart was upside down.|Check the direction marks when you unfold a chart to see which way the picture faces.
A handful of glowing ash|The star sprinkled dots like ash over a pale patch behind the stand.|Ara lies in the southern Milky Way. Wide-field photos show many stars in the background.
A paper fire|A friend cut out a piece of red paper and set it on the stand.|The painted flame gets its color from the artist. Look at observations to see the stars' own colors.
The last ember|The star lifted the red paper. All the points marking the altar were still there, so it circled the first one it had found.|Look south of Scorpius for Ara to find your way back to today's star field.`,
Scl: `Sculptor|A slender silver shaving on a workbench|A Galaxy Seen at a Tilt|When I tilted a round plate, I began to see why the galaxy you drew was so long and thin.
An empty workbench|On the southern chart the star pictured a sculptor's bench and set a round plate on the wheel.|Lacaille's southern chart represented Sculptor with the tools of a sculptor's trade.
A silver streak|In a photo of NGC 253, marked on the chart, the star saw what looked like a long silver shaving on the bench.|NGC 253 is a spiral galaxy in the direction of Sculptor. It's also called the Sculptor Galaxy.
Tilting the plate|The plate looked round face-on. When the star tilted it, its outline grew long like the one in the photo.|A disk looks elongated when we see it at a steep angle.
Dust across the disk|The star reached to wipe a dark mark off the photo, then saw it ran right across the galaxy's disk.|Dust lanes in the Sculptor Galaxy's disk block some of the starlight.
A letter to tilt|The star tucked a little disk into a slit in the postcard so the reader could tilt it too.|The constellation's nearby-looking stars and the galaxy beyond are at different distances. Try writing the NGC number on the photo.`,
Cae: `Caelum|A carved line beside its print|A Name Carved Backward|We laughed when the lettering came out backward. On the second sheet your name came out just right.
A fine cut|The star ran a fingertip along a narrow groove in a block of wood.|Caelum takes its name from an engraving tool and lies in the southern sky.
One engraved star|The star carved a single star in the block and pressed paper against it. A mark appeared on the smooth sheet.|Some old star maps were printed in batches from engraved metal plates or woodblocks.
A name in reverse|When the star peeled the sheet away, the name beside the star was backward.|Face a printing block and its print toward you and you'll see how left and right are reversed.
The second block|This time the star copied the lettering backward in advance and added a direction mark in the corner.|When comparing charts, check which way east and west run on each.
A groove caught on paper|On this sheet the name read the right way. The star tucked the first attempt behind it too.|Caelum is abbreviated Cae. Three little letters make an address for a whole constellation.`,
Equ: `Equuleus|A little muzzle beside a great horse|A Little Horse Beside Great Wings|When I folded back the big horse's wing, a little face peeked out. Let's unfold the little picture first sometimes.
A nose behind the wing|The star lifted the picture of Pegasus. A little horse's nose poked up from the paper below.|Equuleus is a small constellation close to Pegasus.
A painter who drew only a face|The star was about to add a body, then noticed that the old picture showed only the upper part of the horse.|Equuleus means little horse. Traditional charts usually show its head.
Windows the same size|The star cut out the two horses to the same scale. One window had plenty of space to spare.|Constellations cover different areas. Equuleus is among the smallest.
A dot as big as a donkey|One heavy pencil dot swallowed the other points on the little face. The star switched to a finer pen.|Dot sizes on star charts usually indicate differences in apparent brightness.
A nose to say hello|The star kept the big picture in the envelope too and closed it with just the pony's nose sticking out.|Find Delphinus and Pegasus on an autumn chart. Look near the space between them for Equ.`,
Nor: `Norma|A set square against the corner of a page|The Corner of the Sky Chart|When we lined up the corners, our sheets fit perfectly. I joined your line to the edge of my star chart.
A workshop corner|The star took a set square from a drawer and first checked how square the desk corner was.|Norma is the constellation named for a set square.
A southern blueprint|The star found a carpenter's tool on the southern chart and set the real tool beside it on the desk.|Lacaille named several southern constellations for instruments used in observation and crafts.
Two different tools|Beside a pair of compasses the difference was plain. One tool made square corners, the other circles.|Norma and Circinus are separate neighboring regions in the southern sky.
A slanting Milky Way|A pale band slanted behind the straight tool. The star left that line just as it was.|Norma lies toward a rich field of Milky Way stars. Look for the square's straight lines and the stars behind them.
A night that fit|A friend's cut paper fit at a perfect right angle. The stars still shone at their own slant on the page.|Nor is the international abbreviation for Norma. Label the angle and the constellation separately in your notes.`,
Vir: `Virgo|A star at the tip of an ear of wheat|A Star at the Tip of the Wheat|I put a star where one grain of wheat should be. Follow the springtime path and you'll see which field I'm standing in.
A seed at the tip|On the spring chart the star met someone holding wheat. The star at their fingertips shone brighter than the other grains.|The name Spica, a star in Virgo, refers to an ear of grain.
A winding spring path|A friend extended the curve of the Big Dipper's handle out to Arcturus in Boötes.|Continue the curve to Spica and you've traced the great spring arc.
A broad field|The star started by coloring just around Spica, then saw Virgo's boundary ran far beyond it.|Virgo is the second largest official constellation by area. Hydra is the largest.
A ring at a galaxy's heart|After finding the elliptical galaxy M87 in a telescope image, the star opened a smaller window. It showed a bright ring with a dark middle.|The Event Horizon Telescope's first black hole image, released in 2019, shows M87* at the center of this galaxy. M87 belongs to the Virgo Cluster.
A single guiding grain|The star folded the big chart so the tip of wheat holding Spica would still show.|Starting from an apparently bright guide star can help you locate faint galaxies in the same direction.`,
Lib: `Libra|A little claw resting on one pan|The Claw on the Scales|I hung up the scales and an old claw was still there on one pan. Perhaps the same stars remember two stories.
Two empty pans|The star put a star dot on each pan and pulled the thread until the scales balanced.|Libra is the zodiac constellation that represents a pair of weighing scales.
A curious name|Reading the stars' names on the observing sheet, a friend asked where the claws were.|Zubenelgenubi and Zubeneschamali preserve old names for claws.
The scorpion next door|The star slid the scorpion on the next page a little closer. Its open claws pointed toward the scales.|People once saw the stars of Libra as the scorpion's claws.
Two sheets together|The star drew claws on one clear sheet and scales on another. The same two dots lined up.|Comparing drawings from different ages can reveal old shapes that survive in star names.
What the scales remembered|The star attached two pans to the back of the postcard and engraved a tiny claw on one.|Today Libra and Scorpius each have their own official boundaries.`,
Cha: `Chamaeleon|Small footprints across two colors|The Chameleon Beneath the Stars|It was the leaves I colored. The stars are right where you first saw them.
A delivery of leaves|A chameleon hid in a green envelope from the south. The star spotted its eye first.|Chamaeleon lies near the south celestial pole.
A brown background|Against a sheet of brown paper the animal's outline disappeared. The star dots still showed.|Changing a chart's background color leaves the stars in the same relative positions.
Stars of other colors|The star was going to paint all the dots green, then picked out white and red lights in an observation photo.|A star's color is related to its surface temperature. An animal's coloring is another matter.
A little southern neighbor|The name “Fly” peeked out of a chart corner hidden by a pretty leaf.|Chamaeleon and Musca, the Fly, are neighbors in the southern sky.
Hidden footprints|The star laid green and brown leaves together and left just the footprints visible on both.|To recognize the same stars in different pictures, look at their positions and spacing.`,
Cas: `Cassiopeia|A sketch copied from an old chart showing Wang Liang and the guest star. The star who shared the chart signed the corner.|Where the Guest Star Visited|I copied the two characters you found. Next time we unfold this chart, we'll both be able to point to where that star was.
A W in the northern sky|The star made five dots on paper. Joined in a single line, they looked like a W creased into a freshly unfolded sheet.|Connect five bright stars in the northern sky. On autumn and winter evenings that crooked line helps you find Cassiopeia.
A queen upside down|When the star turned the sheet, the queen's chair tipped. The star held up one side of the drawing to keep her crown from falling.|Cassiopeia seems to circle Polaris. In a Greek myth the queen hangs upside down. Can you find the same five stars on charts for different hours?
The queen's neighbors|Another name tag lay beside the queen. The star unfolded a little more of the chart, bringing her daughter Andromeda and Perseus onto the same page.|In Greek myth, Cepheus is the queen's husband and Perseus rescues Andromeda from a sea monster. See if you can locate each of them in the sky.
A star visible by day|The star set an ordinary chart beside the sky of 1572. With the W lined up, a bright point appeared on only one chart.|In November 1572 Tycho Brahe saw a bright star here. Light from the exploding star could be seen by day for about two weeks. Mark the five stars of the W and the newcomer separately.
A guest who stayed on the map|The star unfolded a Joseon-era chart. Beside Wang Liang were the two characters for “guest star.” The star copied them beside the other map.|Korea's National Palace Museum identifies this guest star on the Singubeop Cheonmundo chart as the 1572 supernova. Now you can point to the same light on two maps.`,
Cir: `Circinus|A circle with a tiny pinprick|A Circle Walked on One Point|I'm sending little holes marked with the same span. Will they make the same circle on your paper?
A missing needle|The star shook the instrument, expecting a compass needle. Two pointed legs swung apart.|Circinus is a pair of drawing compasses. The mariner's compass has a different constellation, Pyxis.
One foot in place|With one foot planted, the other walked a full circle across the paper.|Join points at a fixed distance from a center to make a circle.
Walking between stars|Keeping the span unchanged, the star copied the gap between two stars onto another sheet.|On flat charts at the same scale, you can compare separations this way.
Skies of different sizes|On a smaller print the same span overshot the star.|Match the scales first if your maps differ in size. Separations on the sky are measured in angles.
One little hole|The star left the hole in the middle of the postcard. Every circle had started there.|Look for Cir on a southern chart. It's one of the tools Lacaille drew into the sky.`,
Crt: `Crater|A little cup full of stars|A Cup of Stars Instead of Water|I scooped up a cup of stars instead of water today. I'm sending this card flat so they won't spill.
An empty cup|Seeing a cup with a handle, the star guessed the name of the object on the chart.|Crater is the Cup. The context will tell you when “crater” means a hollow on the Moon instead.
The secret of the stand|What looked like a long tablecloth under the drawing turned out to be a serpent's back.|Old sky pictures set the cup on the back of the long water snake, Hydra.
Taking off the handle|The star lifted away the thin paper handle and counted the star dots underneath.|Objects drawn on old charts don't give an official outline connecting all the stars on modern charts.
A sip away|The star walked its fingers from point to point toward the crow drawn next door.|Stars seen in the same direction can lie at very different distances.
A night in a cup|Inside the cup the star marked the dots it had found and hung a little greeting from the handle.|To find Crater again, remember the crow, Corvus, and the water snake, Hydra.`,
CMa: `Canis Major|A fine white dot beside a great lantern|Sirius's Little Friend|That little white dot beside the great light isn't a scrap of paper. It's the star of my postcard.
A lantern on the winter road|Drawing a snowy path, the star wrote Sirius beside its brightest light.|Sirius in Canis Major looks brighter to us than any other star in the night sky.
Where three stars point|The star followed the three dots of Orion's Belt downward, and the lantern appeared again.|Extend the line of the Belt in one direction to help find Sirius.
A picture with one dot|The star painted Sirius as a single big dot. After looking at an observation photo, a friend handed over another sheet.|Sirius is a binary system made up of Sirius A and Sirius B.
A friend beside the light|Enlarging the photo, the star found a faint trace beside the dazzling point.|Sirius B is a white dwarf. Bright A appears so close beside it that separating them is tricky.
Room for a white dot|Beside the first big dot, the star added a speck of light with a needle tip.|The two stars orbit their common center of mass. Compare observations from the same time.`,
UMa: `Ursa Major|Four paws reaching below the Dipper|Bear Tracks Beyond the Dipper|I meant to send just the Dipper, then put the bear's feet in too. That's why the postcard has such roomy corners.
Finding the Dipper|The star drew the seven familiar dots of the northern Dipper and thought the Great Bear was finished.|The Big Dipper is a well-known star pattern within Ursa Major.
Beyond the handle|A friend pulled out the folded edge of the map. Beyond the Dipper were points marking the bear's paws.|The Dipper is only part of Ursa Major. The full region is far larger than those seven stars.
A friend in the handle|At the bend of the handle the star spotted a faint neighbor and added another dot.|Alcor appears close to Mizar. In good skies, keen eyes can distinguish them without a telescope.
The Dipper points north|The star joined the two outer stars of the bowl and followed the line to the tip of another dipper's handle.|Extend a line from Merak through Dubhe to help find Polaris in Ursa Minor.
A sheet for the whole bear|The star chose a larger postcard for the Dipper, the paws and a dotted line leading north.|Keep a familiar pattern beside the whole constellation to practice both finding your way and reading the boundaries.`,
Tuc: `Tucana|A hazy cloud caught on a bill|The Bird Who Brought a Cloud|What I thought was a droplet on the bird's bill turned out to be a galaxy. Even my finest brush couldn't paint it all.
A southern bird's great bill|Of all the birds on the southern chart, the star picked out the one with the enormous bill first.|Tuc is the international abbreviation for Tucana. Look for it on a southern hemisphere chart.
A cloud on the bill|The star set a bit of cotton beside the bird, just like the southern night in a photograph.|The Small Magellanic Cloud is a neighboring galaxy seen in the direction of Tucana.
Two patches side by side|The star thought the little round glow beside the cotton was part of the same galaxy, then read the distances on the observing sheet.|47 Tucanae is a globular cluster in the Milky Way. It appears near the Small Magellanic Cloud but is much closer to us.
Depth in a photograph|The star stuck the cluster on the front of a clear sheet and put the galaxy behind, spreading out the two distances by hand.|A single sky photo shows directions. Measuring actual distances takes other observations.
The bird who brought a cloud|On the postcard the bird carried a little cloud and a round dot together. The star wrote their names on the back.|Compare a close-up of the cluster with a wide view of the southern sky to see where it lies.`,
Men: `Mensa|A flat mountain ridge beneath a cloud|The Day a Mountain Rose into the Sky|I gave the flat mountain a name. I think a letter addressed either to Earth or to the sky would reach it.
A flat summit|On a landscape picture from South Africa, the star noted a mountain shaped like a table.|Mensa commemorates the real Table Mountain in Cape Town.
The observer who looked up|The star opened Lacaille's chart of the southern sky and found the mountain up there too.|Lacaille observed from South Africa and gave the mountain's name to a southern constellation.
A cloud on the ridge|The star held a drawing of the mountain beside a southern sky photo. Both showed something like a cloud.|The wide, pale Large Magellanic Cloud in the sky photo stretches across the directions of Mensa and Dorado.
A mountain of dots|A friend expecting a bright peak spent a long time peering at a few faint stars.|Mensa has few bright, conspicuous stars. Look for it together with its neighbors on the chart.
Two addresses|The star folded the sky picture above the ridge and wrote the same name in both places.|Mensa is abbreviated Men. Remember the place on Earth along with its place in the sky.`,
Lep: `Lepus|Two ears peeking out beneath a boot|Beneath Orion's Boots|When you've finished drawing Orion, look down by his feet. Two hare ears are waiting for your hello.
A great big boot|About to trim the paper around Orion on the winter chart, the star noticed points below his boot.|Lepus lies just south of Orion.
Pricking up two ears|The star traced the low stars by eye and drew two hare ears over them on a clear sheet.|The animal's outline varies from chart to chart. Start by marking the actual star positions.
A hare caught on the roof|At the very same hour, a tall wall hid the hare. The star moved somewhere with a clear view.|An open view south helps you spot the low stars beneath Orion.
The way to the dove|Looking farther down at the dove, the star left a little carrot along the hare's path.|Read this part of the chart from north to south as Orion, Lepus, then Columba.
The corner left uncut|Once the postcard was folded, two ears peeked out of the paper the star had saved beneath the boot.|The three-letter abbreviation for Lepus is Lep. Even a little picture can have an address.`,
Mus: `Musca|Two transparent wings below the Cross|Little Wings Below the Southern Cross|My drawing of the wings is tiny. Find the big cross, then come just a handspan farther down.
A pair of wings|Looking at an insect drawn on a southern chart, the star discovered that even a fly lived in the sky.|Musca means the fly, the insect.
Below the Southern Cross|The star found the cross on a southern hemisphere chart and moved farther south to a little group of stars.|Look for Musca just south of Crux, the Southern Cross.
Wings gone missing|Transparent wings disappeared against white paper. The star slipped a black sheet behind them.|Under dark skies, stars lost against a bright background become easier to see.
Two little creatures|The neighboring chameleon seemed to be watching the fly. The star measured the gap by hand.|Chamaeleon and Musca share a border. You can check it on a chart.
A winged stamp|The star drew the fly in a space the size of a postage stamp. With the Southern Cross beside it, it was easier to find.|To show someone a small region, put a wide chart and a close-up side by side.`,
Oct: `Octans|A pinhole in the middle of concentric circles|The Center Left Empty|I left the middle of the picture blank. That center, where I hadn't drawn a single star, was what I was looking for today.
The center of an empty circle|In an all-night photograph from a southern observatory, circular trails nested together. The star touched their center.|Long exposures facing south can show stars tracing arcs around the south celestial pole.
An invisible nail|The star looked for a bright star holding the sky in place like a nail. There was no obvious lantern.|The south celestial pole lies in Octans. There's no bright guide as conspicuous as Polaris there.
A tool for measuring angles|Below the photo, the edge of a fan-shaped instrument was marked with fine divisions.|An octant measures angles and has an arc spanning one eighth of a circle.
Short trails and long trails|In the same time, stars near the center left short marks while those farther away left long ones.|For the same angle of rotation, a circle with a larger radius has a longer arc.
A bookmark without a dot|The star laid a paper disk with a hole in its center over the photo. The empty hole pointed south.|Oct is short for Octans. When recording an observation, include which hemisphere you were in.`,
Peg: `Pegasus|A different-colored stamp on one corner|The Corner Shared with Next Door|One of the square's four keys belonged to the house next door. The door still took all four keys to open.
Four autumn windows|On the broad autumn chart the star found a square window frame and put a tack in each corner.|The Great Square of Pegasus is an autumn guide formed by four bright stars.
Fitting a horse to its wings|When the star turned the old drawing, the body of a winged horse lay across the square.|In Greek myth Pegasus is a winged horse. Star charts show part of its body.
A nameplate in another color|Tying address tags to the four tacks, the star noticed the last tag was a different color.|Alpheratz marks one corner of the Square but officially belongs to Andromeda.
A door to the princess|Walking outward from the odd-colored corner, the star found a way into the princess's chain of stars.|The other three corners belong to Pegasus. A single guiding pattern can draw on more than one constellation.
A shared window frame|The star kept all four corners and stuck a tiny postage stamp on the princess's corner.|Once you've found all of the Square, you can set out from that corner to explore Andromeda.`,
Per: `Perseus|Two little piles of stardust side by side|Two Clusters in One View|I put the two star clusters that looked like bags of sweets into one envelope. You get to open whichever you like first.
A hero's footsteps|Unfolding a corner of the Cassiopeia chart, the star came upon the figure of Perseus next door.|In Greek myth, Perseus is the hero who rescued Andromeda.
A path beside the sword|Once the splendid hero drawing was covered, the first thing the star saw was a faint smudge between Cassiopeia and Perseus.|Between them, in the direction of Perseus, lies the Double Cluster.
A cloud splits in two|Through binoculars, one little cloud resolved into two heaps of stardust.|The Double Cluster is a pair of open clusters seen side by side.
Two names on envelopes|On two matching envelopes the star wrote NGC 869 and NGC 884, one on each so they wouldn't get mixed up.|Those numbers are the clusters' catalog entries. A wide field of view can fit both.
A gift in a single view|The star put both little envelopes inside a bigger one, spaced just as the clusters had first appeared.|Look at each cluster in a narrow field, then lower the magnification to see how the pair sits together.`,
Her: `Hercules|A tuft of cotton tucked into a square|Stars Beyond a Square Door|I tried to draw a tuft of cotton and made far too many dots. This time, they tell me, that made the picture just right.
A square door|The star found four stars in Hercules's body and built a little doorframe.|A four-sided star pattern helps you pick out the torso of Hercules.
A smudge on the doorpost|At one edge of the door a faint wisp looked like a bit of cotton caught in the frame.|The globular cluster M13 lies near one side of that shape.
A larger glass|The round patch in binoculars broke into individual points around the edges in a large telescope's photo.|Higher resolving power lets a telescope distinguish stars that otherwise seem to merge.
A crowded middle|As the star drew the dots, there was scarcely a scrap of paper left bare at the center.|A globular cluster holds many stars in a roughly spherical group. They appear most densely packed toward its center.
Beyond the little door|A friend folded the door shut. Only the round cluster peeked through a little window.|M13 is a cluster within the Milky Way. Write “globular cluster” beside its name to distinguish it from a separate galaxy.`,
Mic: `Microscopium|Paper fibers through a round lens|Inside and Outside the Lens|On the way home I fit the huge sky and tiny paper fibers on a single sheet. A lens showed me each one.
A tiny world on the desk|The star slid a scrap from the desk under a microscope. Threadlike fibers tangled together.|A microscope magnifies small objects placed close to it.
A lens on the map|On a southern chart, the star spotted an instrument with the same upright tube.|Microscopium is one of the southern constellations Lacaille named for scientific instruments.
Trying to see far away|When a friend asked if the tube was for looking at stars, the star put a picture of a telescope beside it.|Microscopium and Telescopium have different names and occupy different parts of the sky.
Two windows|One window showed a broad southern chart. The other enlarged only the fibers of the chart paper.|Note the instrument and magnification along with what you saw so you can tell the two pictures apart.
A signature under the lens|In one corner the star signed a name so small it looked like a dot. A friend picked up a magnifier and smiled.|Mic is short for Microscopium. That same abbreviation helps you find it on charts in other languages.`,
Pic: `Pictor|The southern sky on a little easel|An Easel for the Southern Sky|I've left a sheet on the easel. If there's a color I missed, will you paint it in?
A blank canvas|The star looked for an artist's face in Pictor, then stopped in front of the easel on an old chart.|Pictor means painter. Lacaille's southern chart shows a painter's tools.
A southern model|A friend set a southern star chart on the easel. The model for their canvas was the sky itself.|Bright Canopus in nearby Carina can help you get your bearings around Pictor.
A dot that moved|The star copied two observations of the region around Beta Pictoris onto clear sheets. Once the backgrounds lined up, one dot sat in a different place.|European Southern Observatory observations in 2003 and 2009 caught the planet Beta Pictoris b on different sides of its star.
The path between pictures|The star stretched a thread between the two dots, then let it go. The pictures showed only where the planet was on each date.|Positions measured at different times can help estimate an orbit. The straight line between two photos doesn't trace the planet's actual path.
Giving back the canvas|The star tucked that day's sky into the drawing of the easel, turning the little picture into another star chart.|Pic is short for Pictor. Add the observing site and direction so someone else can pick up where you left off.`,
For: `Fornax|Galaxies filling a black window|A Dark Window Full of Galaxies|Open the little black window. I started where the fire burns and went all the way to the galaxies.
A furnace in the workshop|The star found a little furnace on the southern chart and cut a paper window for it.|Fornax is one of the southern constellations Lacaille named for scientific equipment.
An empty window|Hardly anything in that patch of sky stood out to the naked eye. The star painted the window black and waited.|Even a dark-looking patch can hold distant objects too faint for our eyes.
The window that opened in 2004|The star fitted a Hubble image released in 2004 into the little window. Galaxies filled the space it had painted black.|The Hubble Ultra Deep Field combines light gathered over many exposures from a tiny patch of sky in Fornax.
Faces in tiny specks|The star color-coded the marks, some round, some long and some twisted.|Most of the objects crowding a deep-space image like this are galaxies, each containing many stars.
A window that stayed lit|The star kept the first day's black window as a flap. Lift it and there was the photograph full of galaxies.|Though they share a picture, the galaxies lie at different distances. Light from the more distant ones has traveled longer.`,
Sge: `Sagitta|A bow and arrow drawn separately on a chart|The Arrow Looking for an Archer|I'm sending you a little arrow. It flew in from a different night's sky than the postcard with the bow.
An arrow with no owner|The star picked up the drawing of a short arrow. There was no archer standing anywhere nearby.|Sagitta, the Arrow, is a small constellation of its own. Sagittarius is the Archer.
The feathered end|One end forked and the other stretched out in a line. The star laid a fine thread along the shaft.|To remember the narrow shape, look for the stars that suggest an arrow's shaft and feathers.
Passing over the eagle|A friend scanning from the eagle toward the swan spotted the arrow first.|Trace the Summer Triangle, then look just north of Aquila for the Sagitta label.
A distant bow|The star pulled out thread to connect the arrow to the archer, then saw how far apart their regions lay on the chart.|The bow in Sagittarius and the arrow Sagitta belong to separate constellations.
A name for the arrow|The star wrote “Sge” on the postcard. Now the arrow could even point out where to deliver it.|Sagittarius is abbreviated Sgr. Marking both names on one map helps keep them straight.`,
Dor: `Dorado|A cloud across the fish's back|The Cloud That Wouldn't Clear|At first I waited for the cloud to clear. Funny to think I kept a whole galaxy waiting!
A long snout|A pointed fish swam out of the southern chart. The star traced its snout first.|Dorado is a southern constellation. Its international abbreviation is Dor.
A cloud on the fish's back|In a photograph of the southern sky the star wanted to sweep away the big cloud hiding the fish.|The Large Magellanic Cloud is a neighboring galaxy that looks like a hazy cloud from the southern hemisphere.
A glow across the border|When the star laid transparent constellation borders over the photo, the cloud stretched across both sides of a line.|The Large Magellanic Cloud extends across the directions of Dorado and Mensa.
A dot in 1987|Laying two photos of the Large Magellanic Cloud together, the star circled a conspicuous point that appeared in only one.|In February 1987 light from the explosion of a massive star in the Large Magellanic Cloud reached Earth. Astronomers call the supernova SN 1987A.
When the wait was over|The star turned around the chair where it had waited for the cloud to clear. Now it could sit and watch the cloud itself.|A naked-eye sketch and a close-up photo show different scales. Mark the bit you observed with a little box.`,
Tau: `Taurus|Little blue dots beside a V|Stars in Front of and Behind the Bull's Eye|The red dot on the bull's forehead looked like part of the group, but it was closer. I drew the side view for you too.
A face beginning with a V|The star picked out a V in the winter sky and drew in two horns.|The Hyades cluster spreads across the face of the bull.
A red eye|The star paused just before tying the reddish dot of one eye into a bundle with the others.|Aldebaran appears in front of the Hyades. It lies in the same direction but isn't a member of the cluster.
Buttons at different distances|The star fixed the red dot to the front of a shallow box, put the cluster on paper at the back and looked straight in.|Stars can look like neighbors in our sky without being grouped together in space.
A little group at the shoulder|Next to the face, a friend found another little knot of bluish stars.|The Pleiades, M45, is another open cluster in Taurus, separate from the Hyades.
The horns come last|With the face and shoulder drawn, the star slipped an old observing record near the tip of a horn. Long ago someone had seen a new star there.|The guest star recorded in China in 1054 was a supernova. Today its remnant, the Crab Nebula M1, can be seen in the direction of Taurus.`
};

export default monthlyStories.filter(story => Object.hasOwn(manuscripts, story.id)).flatMap(story => {
  const original = [story.name, story.motif, story.title, story.letter, ...story.episodes.flat()];
  const translated = manuscripts[story.id].split(/[|\n]/);
  return original.map((korean, index) => [korean, translated[index]]);
});

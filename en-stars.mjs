// Each row follows its star's question, ending, then five title/body pairs.
import {STAR_JOURNEYS} from './star-journeys.mjs';
import {SKY_STORIES} from './sky-stories.mjs';
import {SOLA_CHAPTERS} from './sola-chapters.mjs';
import {firstGreeting, CHARACTERS, petReaction} from './dust-character.mjs';

const arcs = {
soot:`Could my shadow be a place for someone to rest?|I’ll save you a spot in my shade.
Shade beneath the window|Umbra rolled under the observation window. As Sola passed, a long shadow fell across the floor. “Oh, it’s cool here.”
Half a cushion|Umbra put an empty cushion in the shade. When the others went into the sunshine, Umbra folded it in half. “Maybe I’m the only one who likes it here.”
The wandering shadow|Umbra dragged the cushion after Sola. When Sola turned, the shadow slipped sideways. Only one corner of the cushion was in it now.
Half a step|“I like it about here.” Sola sat at the edge of the shade. Umbra unfolded the cushion and laid it between them.
Room beside me|When the shade moves, Umbra inches the cushion along. When Sola comes, Umbra rolls once and pats the empty spot. “Here today.”`,
pink:`I want to say hello first. Where do I find the courage?|Today I’ll be the first to say hello.
Behind the photograph|Rosetta peeked out from behind the recorder. Lumi handed over a picture of the Rosette Nebula. Rosetta hid behind it, listening to the others laugh.
A tiny hello|On the back Rosetta wrote “Hello.” The thought of handing it over brought a blush. Underneath, in even smaller letters, Rosetta wrote, “Can I look with you?”
Where do I start?|Rosetta arranged the letters along the stars in the middle of the picture. They made a lovely pattern, but even Rosetta couldn’t tell where to start reading.
From the first line|Nebula peeked around the other side of the recorder. When Rosetta stumbled, Nebula held the edge of the photograph and waited. Rosetta read the whole first line.
The picture can sit here|Now Rosetta clears a place beside each new photograph. Those cheeks turned pink again today, but the picture stayed on the table. “Hi. Want to look together?”`,
puff:`Could I dance along to a beat I’ve never heard?|May I add my dance to your beat?
Under the detector|Nebula stretched wide as the detector chimed. When it fell silent, Nebula peered at Lumi’s nebula picture. “I wonder what’s moving inside that cloud.”
One space left|Nebula drew a beat chart to invite a friend to dance. The second-to-last box stayed empty. “You tap this one.”
A beat behind|At their first practice, Io moved one note after Nebula. Nebula hopped faster, and Io stopped altogether. “Wait. I’m still on the first box.”
Io’s turn|While Lumi unfolded a photo of a growing star, Io tapped the empty box. This time Nebula waited a beat before stepping. They stretched out together.
Today’s dance|When a new friend arrives, Nebula slides the chart across. “You tap first today.” The friend taps twice and Nebula follows with one spin.`,
violet:`What kind of night could I give a friend who can’t sleep?|Even if sleep won’t come, I’ll stay with you.
Sola’s eyes opened|Lyra stretched beneath the beacon. Beside Lyra, Sola closed both eyes and opened them again. “Still awake?”
Find Vega first|Lyra unfolded a map to find a quiet star where Sola might drift off. Lyra marked Vega in one corner and dimmed the beacon.
Pretending to sleep|Lyra sang softly. Under the blanket Sola squeezed both eyes shut. “I’m still awake. I was pretending.” Lyra stopped singing.
Joining three stars|They found Vega, Deneb and Altair and drew lines between them. Sola started talking about the day. Lyra yawned once. “And then what happened?”
Shall we leave it on?|Lyra keeps a blank sheet beside the night map. When a sleepless friend comes, Lyra turns up the beacon a little and offers a pencil. “You draw the first star tonight.”`,
star:`Can I guide a friend even if I’m not the brightest?|We can find your way together, even with a little light.
A crown on the map|Sirion drew a crown on the brightest dot and always showed it first to anyone asking the way. Looking closer, Sirion noticed a tiny dot beside it.
Beside my name|Sirion pulled the lamp closer, wrote a name and drew a crown next to it. Then out came the eraser. “Do I have to shine that brightly to show the way?”
The lamp came too close|Sirion held the lamp right up to the map. The paper shone so brightly the little dot disappeared. Selene squinted. “Which way do I go?”
The little dot appears|Selene pushed the lamp back. Both the big dot and the little one showed. Sirion pointed out the next dots on the route, one by one.
Turn here|On Sirion’s map an arrow stands where the crown was rubbed out. When someone asks the way, Sirion turns the map toward them. “Here’s where you’re standing.”`,
milk:`Can someone as slow as me help on an adventure?|I’ll show you the path I found by walking slowly.
Out of the blanket|Io woke late beside the warm module. The others had already gathered at the window. Slowly following, Io felt the floor tremble underfoot.
The last space|One space remained on the expedition list. Io signed at the bottom and packed an empty envelope. “I’ll pick up anything that drops on the way.”
An open envelope|Io ran to catch up and the samples spilled out. A plume rose in the distance, but there was no time to note it. Io sat down for a breath.
It trembled here|Umbra came back and helped pick up the samples. Io pointed to the spot where the floor had trembled. Together they marked the little traces beneath the plume.
Dividers for my envelope|Io now sets out with dividers in the envelope. Last to return, Io takes the samples out one at a time. “I found this where everyone had already passed.”`,
toast:`Must every hello be loud and brave?|Even on quiet mornings, I’ll tell you I’m glad to see you.
The first hello|Vega opened the north window and called each friend by name. Greetings came back from every window. For every answer Vega dotted the map.
A voice that wouldn’t come|One morning the words barely came out. Vega opened the window, then closed it and wrote in the margin the names of friends still waiting for a hello.
A very loud morning|Vega reopened the window and called all the names at once. Startled out of a doze, Io curled up tight. Vega shut the window and reached for an eraser.
Paper under the door|Lyra slid a sky map under the door. A line linked Vega to a neighboring star. Vega wrote “Good morning” at the edge and slid it back.
A window ajar|Each morning Vega opens the window a hand’s width. On quiet days a note rests on the sill. When Io waves back, Vega adds another dot.`,
sprout:`Will anyone notice if I grow just a little?|Let’s record the little bit we grew today.
Blue pencil|Azure Star found a blue pencil beside the greenhouse. After coloring the starlight, the pencil was shorter, but Azure Star looked just like yesterday.
Just as tall as yesterday|Azure Star taped a height chart to the greenhouse wall. After several days of marks at the same height, Azure Star turned it over.
Tracing a bigger star|Azure Star drew a higher mark to match a big star in a photograph. Heavy layers of color soaked the paper. “I can’t tell how tall I am from this.”
Another column|Mira brought yesterday’s picture. “This is the first time you’ve used that blue.” Beside the height marks, Azure Star made space to record newly discovered colors.
A well-used pencil|Today the height mark stayed where it was. Azure Star colored the next box a new blue and laid the shortened pencil underneath. “What color will I find tomorrow?”`,
moss:`Can I see my friends on days when my light is faint?|Even on dim days, I’ll be here waiting.
Bright days and dim days|Mira drew the same star for days. Sometimes the dot shone brightly, sometimes faintly. Mira took a long time choosing which drawing to show a friend.
An invitation put away|Feeling faint today, Mira tucked the invitation in a drawer. “I’ll ask them to come when I shine a little brighter.”
Missing dates|Keeping only the bright drawings left gaps of several days. Mira lowered the picture meant for the wall back onto the table.
A visitor on a dim day|Azure Star came and sat beside the gaps. “Can I see today’s color too?” Mira offered the faint drawing, and Azure Star brought out today’s color.
See you on Saturday|Mira dates the bold drawings and the pale ones alike. On the invitation goes next Saturday’s date. “Let’s find out what color it is together.”`,
cloud:`If I give everyone a seat, where will I sit?|I’ll leave myself a place to rest too.
A ring of cushions|Globular Cluster laid cushions in a circle inside the pod. As friends came in, even the last cushion was pushed toward the door.
The last seat|“Where’s mine?” After looking around, Globular Cluster crouched beside the door and said everything was fine whenever a friend looked back.
Bumping feet|Squeezing one more cushion into the circle made it too tight. Whenever someone stretched a leg, their foot bumped the friend opposite.
A little closer to the wall|One by one, the friends pushed their cushions back. The circle came out a little crooked, but now Globular Cluster had room to stretch too.
My cushion goes here|When a new friend came, Globular Cluster laid a cushion beside their own. “Sit here. Let’s keep the middle clear for our feet.”`,
peach:`How much of what I love can I share?|I’ve packed a share for you and one for me.
The red map|Rose Star cut the prettiest red patch from a photograph of the stars and made a tiny map. When a friend admired it, Rose Star handed it over.
An empty drawer|After giving away so many pictures, nothing remained in the drawer. Rose Star tried to remember how yesterday’s red map had looked.
Keeping one piece|Halfway through cutting a new picture, Rose Star paused. “I’d like to keep this side.” The little piece went into the drawer.
Pasting a sheet together|The friends laid their pages side by side and joined the maps. The scraps were too lovely to throw away, so they made two bookmarks.
One for me, one for you|Rose Star gives one bookmark away and slips the other into a book. “Bring a sheet in your favorite color next time.”`,
mint:`If I look different every day, am I still me?|Today I’ll greet you as the me I am today.
Half-moon calendar|Each time the Moon changed shape, Luna drew a face on the calendar too. On the half-moon day even the little face looked half folded.
Which one to hang?|Luna hesitated over showing the calendar. Right beside a great big grin was a day with a terrible frown.
Making every face smile|Luna drew smiling mouths over all the faces. Looking again, it was hard to tell which day was which.
Put that day back too|A friend picked up the drawing that had come loose. Luna pasted the unsmiling face in the middle. “Oh, that was the day it rained and I couldn’t go out.”
Tomorrow stays blank|Luna draws today’s face and hangs up the calendar. Asked what tomorrow’s face will look like, Luna puts down the pencil and smiles. “Come back tomorrow.”`,
coral:`Will I miss what my friends say if I speak too loudly?|When my story ends, I’ll listen to yours.
Laughter that lingered|Red Giant unfolded a picture of a red star and told the others what had happened earlier. When they laughed, out came the first page again for a much longer telling.
I’m not finished yet|A friend opened their mouth, but Red Giant raised a hand. “Wait, the funniest part is still coming.”
Paper all over the table|Red Giant kept joining pictures until they covered the table edge. No space remained for the drawing Lyra had brought.
Fold the paper|Lyra folded one end and made a little space, then started talking about last night’s dream. Red Giant’s hand paused on the next page.
Your page next|Red Giant now brings out one sheet at a time. When everyone finishes looking, the sheet slides aside. “What were you going to say earlier?”`,
clover:`Can it be a good day even without a lucky find?|Let’s look together for today’s little good things.
A map of sparkles|Capella circled every sparkling find on the map and promised a friend the sparkliest thing of all.
Empty pockets|After a long search the pocket was still empty. Capella walked past the window where a friend waited and went farther.
Losing the way back|Seeing a new marker in the distance, Capella ran. Looking back, the way here was gone. Capella clutched the empty pocket and stopped.
Back at that spot|A friend followed the early circles and found Capella. They laughed for ages about going round and round looking for the observation window.
Four leaves in an ordinary square|On the way home Capella marked the spot where they laughed with four leaves. Asked what was there, Capella beckoned. “Come see where I got lost.”`,
snow:`Is it okay if I change a little when I get closer?|I’ll sit beside you even if I change a little.
Outside the ring|Snowfield Star made a ring of ice chips and sat outside it. A friend waved and got a wave back, but Snowfield Star couldn’t bring themself to step inside.
Should I come closer?|Snowfield Star stood, then sat again. Worried a friend might dislike the cold, Snowfield Star only nudged the ring with a toe.
A ring without gaps|Snowfield Star filled the gaps with more ice. The ring was strong now, but when a friend reached out, there was no way through to take their hand.
Let’s take one out|The friend pointed to the end of the ring. Snowfield Star lifted one chip, and a face appeared through the opening. They sat a handspan closer.
One chip wide|Now Snowfield Star leaves one chip to the side when building a ring. When a friend comes, Snowfield Star points to the gap. “Come through here today.”`,
dew:`Can I find a new view away from the light?|I’ll tell you what I found in the shade too.
Through a droplet|Selene rolled along the droplets on the window. Through them, light and dark patches showed on the Moon.
At the edge of the shade|Selene marked places to visit. The pencil stopped at a dark square. “I can’t see what’s in here.”
Turning up the brightness|Brightening the Moon picture only made the light places whiter. Selene squinted and stepped back from the screen.
Another angle|A friend unfolded a different observation beside the photograph. One by one Selene added ice symbols in shadows that had hidden everything before.
A stop down low|Showing the map, Selene points to a low spot beside the bright path. “Let’s stop here too. It’s easy to miss when you walk past.”`,
tangerine:`Can I stay by a friend even when I can’t make them laugh?|Today I’ll offer a warm cup instead of a joke.
Inside the Sun|Looking at the outside of a Sun diagram, Solar Core wondered what was inside. “I hide snacks inside me too!” came the joke. The friend stayed quiet.
Words rubbed out|Solar Core wrote “Something wrong?” on a note, worried it sounded too serious, and erased it. Only a smiling face remained.
Two more jokes|Just as the friend started to speak, Solar Core told another joke. No answer, so out came one more. The friend just looked into the cup.
A cup pushed closer|This time Solar Core slid a warm cup across. After a while the friend told the story of the day. Solar Core folded the waiting joke behind the note.
A day to listen|Solar Core sets out two warm cups each morning. Sometimes there’s a joke when a friend comes, and sometimes just a question. “What happened today?”`,
night:`Can I tell how a faraway friend feels?|However far away you are, I’ll wait for news.
The farthest window|Neptune sat at the window at the end of the hall looking at pictures. A friend came close, then turned away, thinking Neptune wanted to be alone.
An invitation on paper|“Want to look together?” Neptune wrote. Out in the hall came the thought that the friend might be busy. The paper was folded up again.
A quiet photograph|The planet Neptune looked peaceful in the photo. Lumi unfolded a diagram thick with lines showing the winds. Neptune took the folded paper out again.
Leaving it on the sill|Neptune left the note on the friend’s window. No answer came right away. Back at the far window, Neptune made two places and waited.
The little signal light|The friend arrived with the paper. “I missed it earlier.” Neptune lit a little lamp. “Next time you see this on, come in.”`,
opal:`Can I still be myself if I shine less brightly than before?|Even this smaller light can shine today.
A photo in a box|White Dwarf took out an old photograph of a star blazing brightly. Today’s tiny drawing sat beside it for a moment, then went back into the box.
A frame too big|Today’s picture leaned to one side in the old photograph’s frame. Empty space stretched away on every side.
Adding more paper|White Dwarf filled the margins with paper until the frame was full. Now the little drawing was harder than ever to find.
Just the right size|A friend brought a small frame. White Dwarf peeled away the extra paper and slipped in the drawing. There was plenty of room beside the old photograph.
Today’s picture first|White Dwarf hangs both frames side by side. When a friend comes, a finger goes to the little one first. “I drew this a bit better than yesterday’s.”`,
linen:`Can I find somewhere comfortable outside my familiar blanket?|I’ve made a resting place somewhere new.
A blanket like a map|Titan traced the folds of the blanket with a finger. They looked like unfamiliar roads, so Titan copied them onto paper.
What will I see outside?|Titan took one step beyond the blanket. What if the path went somewhere off the map? In went a question mark.
A hazy path|Fog blurred the ground. Titan kept looking at the map and tripped over a stone.
We rested here|A friend sat down first and beckoned. Only after sitting did Titan see the ground beneath the fog. On the map went a mark for “where we rested.”
Easy to find in the fold|Titan folds the map into a pocket. Opened again, the resting place lies right beside the crease. “Good. Let’s start here.”`,
cookie:`Can I tell a friend about the storm inside me?|On stormy days, I’ll tell you first.
Stripes and a swirl|Jupiter cut up a photograph of stripes and put the pieces in a box. The swirling piece went at the very bottom.
Keeping the lid closed|When a friend asked about the picture, Jupiter held down the lid. “Just stripes.” The pieces rattled inside.
The mark that stayed|Alone, Jupiter rubbed the swirl. The stripes smudged, but the swirl stayed just as it was.
May I open it?|The friend asked first. Jupiter opened the box and together they lifted out the swirl and drew the wind’s direction beside it.
Before I close the lid|Jupiter pauses before closing the box. “Wait. There’s something I haven’t shown you.” Today the swirl came out first.`,
puddle:`Could all our little meetings make a path?|I’ll join the places we met into a path.
Dots of light in water|Milky Way dotted the map with the lights reflected in each droplet, then wrote the names of friends who would walk home together.
A break in the line|A splash blurred two dots. Milky Way stopped drawing there. “How do I join them now?”
A path too straight|Lining up the dots with a ruler meant crossing straight through the friends’ names. Milky Way put the ruler down.
Where we paused|A friend pointed beside a name. “I rested here.” They curved the line around to reach that very spot.
Let’s go back this way|The way home winds across the new map. Milky Way stops beside a friend’s name. “Here, wasn’t it? Let’s rest a little again.”`,
breeze:`Will my friend feel my encouragement if they can’t see it?|Even unseen, I’ll cheer you on as you set out.
A pocket of wind|Solar Wind held a pocket open to pack some wind for a departing friend. It puffed up, then quickly went flat.
What can I say?|The friend’s shoes were already tied. Solar Wind still couldn’t pick the right words. A hand rose, then slipped back into a pocket.
The runaway map|When all the cheers rushed out at once, the wind whisked the map away. Both friends ran to catch its corners.
Holding the map steady|Solar Wind held one end while the friend folded the map. “Have a good trip. I’ll be waiting here.” The friend wrote the words inside the fold.
Before you leave|Now Solar Wind waits for a traveler to finish tying both shoes, then always says one thing. “Tell me what you saw when you get back.”`,
honey:`Will you wait if it takes me time to show how I feel?|I’ll share my feelings, however slowly they come.
Honey-colored paper|Golden Star saw the light of two stars overlap and painted a sheet the color of honey. Asked what color it was, Golden Star paused to find the words.
A folded answer|Golden Star wrote the answer that wouldn’t come out aloud. Too shy to show it all, Golden Star folded it twice.
An answer in a hurry|Asked again, Golden Star named the first color that came to mind. After turning away, the folded paper was still there in hand.
One fold at a time|The friend set the paper down without opening it. Golden Star opened it one fold and read the first line aloud.
A note left open|Golden Star spreads a finished note on the table. When an answer takes time, a finger points to it. “Wait a little. I’ve gotten this far.”`,
ash:`Do I have to hide my strength because I’m small?|I’ll put my little bit of strength where it helps.
Short, heavy pencil|Neutron Star picked up a stubby pencil. Heavy for its size, it took a second grip. The pencil case held several more like it.
Should I lift it?|As a friend reached for a box, Neutron Star raised a hand and lowered it. Surely the friend would take one look and say they had it covered.
Everything at once|This time Neutron Star took the box first. The pencil case slid onto the floor. Even standing still, Neutron Star didn’t have a hand free.
Give me the heavy part?|The friend took the box. Neutron Star picked up the fallen pencil case and hugged it tight. Side by side they walked at the friend’s pace.
Which one shall I take?|Now Neutron Star opens the box first. “I’ll carry the pencil case. Will you take the box?”`,
bubble:`Can we keep a joy that disappears so quickly?|I remember how we laughed before it vanished.
Round mist in a photo|Seeing haze around a comet in a picture, Coma blew a soap bubble. A friend’s face looked round through it.
An empty bottle|Coma wanted to save the biggest bubble in a bottle. Reaching to close the lid made the bubble pop.
Two cupped hands|This time Coma caught a bubble in both hands. Only soapy water remained when they opened. A friend laughed, and Coma started laughing too.
Making circles|Coma drew a circle on paper with a wet finger. The friend added a smaller one. “The one in front of you was about this big.”
Paper beside the bottle|Beside the empty bottle the circle drawings pile up. Another bubble pops and Coma pulls the paper closer. “You remember how big that one was, right?”`,
petal:`Will the season we shared stay with us when we’re apart?|In another season, I’ll still remember your place.
A flower pressed in a book|Rosette Nebula laid a dried flower beside a nebula photograph to compare colors. The pressed petals were a little paler.
Before handing it over|Just before giving a flower bookmark away, Rosette Nebula noticed a curled leaf tip and slipped it back into the book.
Back to its first color|Perhaps a little longer pressed flat would bring the first color back. When the book opened again, the petals only crinkled more.
A flower in another light|A friend brought a photograph of the same nebula in another kind of light. Rosette Nebula left the flower as it was, painted its color today and tucked the painting in a letter.
Which season was that?|Rosette Nebula now dates the backs of flower bookmarks. When a friend opens the last letter, a finger points with a smile. “That’s the day the leaf first curled.”`,
sesame:`Can my small place have a name too?|I’ll write my name beside my little place.
At the map’s edge|Dwarf Planet found a dot at the far edge of the map. Pointing to it hid it completely.
A seat without a label|As friends brought their name cards, Dwarf Planet sat in an empty seat, thinking there was nowhere to put another name.
Letters too tiny|Dwarf Planet squeezed a name into the gap beside the dot. Even with a face pressed close, the friend couldn’t read it.
Put the name beside it|A friend attached a sheet to the side of the map. Dwarf Planet wrote a big name there and drew a line back to the dot.
This is my spot|When anyone looks at the map, Dwarf Planet points to the label first. “There’s my name. Follow the line and you’ll find where I sit.”`,
cocoa:`How can I share slowly what I haven’t said?|I’ll take my time telling the story beneath the ice.
Fine lines in the ice|Europa traced the long lines in an ice photograph. When a friend offered tea, Europa covered up the words written on the photo.
A covered teacup|Just about to speak, Europa covered the cup with a saucer. “In a little while,” came the thought, and the photograph folded shut.
An afternoon unfolded|Europa lifted the cover and spread out every page written so far. Unsure where to begin, Europa gathered them up again.
Just the first line|Lyra waited, holding a cup. Europa read the line at the top. Lyra answered that one without asking for the next.
One line at a time|Each morning Europa puts one line of what needs saying beside the cup, sipping tea until the friend finishes reading and looks up.`,
lemon:`Will anyone notice the work that’s easy to overlook?|I’ll look for the quiet work you’ve done too.
A thin rim of light|Cleaning the bright part of the window, Helia noticed a thin line of light along the edge. Outside was clearer from just there.
One last cloth|After the gathering Helia picked up the last cloth. About to clean up alone again, Helia looked toward the others.
In the middle of the table|Helia left the cloth where everyone could see it. As friends left one by one, Helia picked it up again and went to the window.
I’ll take the other side|Vega came back. “You take that side. I’ll do this one.” Together they polished the window until even the far edges shone.
Two cloths next time|Before every gathering Helia lays out two cloths. When Vega arrives, one goes across. “You pick your favorite side first today.”`,
lavender:`Do I have to choose just one color for how I feel?|I’ll tell you all of today’s colors.
Colors in a row|Stella painted the bands that appeared when light split. Beside them went colors chosen to remember today’s fragrances.
One space for a label|Asked which color was most like Stella, Stella set the label beside one, then moved it to another.
Mixing them all|Unable to choose, Stella painted every color into one square. When it dried, the first colors were hard to see.
A space for each|Stella painted each color in its own row. A friend pointed to the first and heard a morning story. The next color brought the afternoon’s news.
Three colors today|Stella draws several boxes when writing to a friend. “I picked this one this morning. This one changed after you came.”`,
seafoam:`Can we go different ways and still meet again?|Let’s meet here again after our separate laps.
Arrows pointing opposite ways|Watching the path around Neptune, Triton drew an arrow pointing the opposite way from the friend’s.
Apart from the start|They started walking at the same place, watching each other’s backs grow smaller. Halfway around, Triton stopped and looked back.
Trying the same direction|Triton made one lap in the friend’s direction. A favorite pattern slipped by unnoticed.
Meet me here again|They marked a meeting point one lap ahead and set out separately. When they returned, Triton’s map held a pattern the friend had missed.
Two postcards|Triton leaves a postcard at the finish. The friend brings a drawing from the other direction. “We went around the same place, but look how different our pictures are.”`,
chestnut:`Can something as bumpy as me roll along with everyone?|I’ll roll slowly, in my own shape.
A sample that wasn’t round|Asteroid put a jagged stone on the observation stand. On the ramp, one corner caught.
Stopped halfway|The friend’s stone reached the bottom first. Asteroid pushed the stuck stone, then marked where it had stopped.
Wrapping the corners|Asteroid wrapped cloth around the corners to round them off. Now it was hard to see what caught, and the stone moved even more slowly.
Here’s where ours caught|The friend unwrapped the stone and pointed out where each had stopped. Each corner had left a different mark. They drew those marks on the map too.
A different path for every stone|When a new stone arrives, Asteroid sets it on the ramp. “Call me if it catches. Let’s see where yours stops.”`,
lily:`Can a quiet voice show someone the way back?|I’ll leave a mark you can find even when I call softly.
An upside-down pattern|From the other side of the table, the star pattern looked upside down. Aria turned the map, making the friend opposite tilt their head.
A small mark|Aria dotted a corner of the map for something there was to tell a friend. A mouth opened, then closed again.
Only visible from here|Aria explained from one side of the map, but from the friend’s seat a hand covered the dot. Even leaning closer didn’t help.
Turn it toward a friend|With both hands Aria turned the map and waited for the friend to come closer. Then the hands moved away and Aria softly called the friend’s name.
Turn and say hello|Aria looks around before unfolding a map. When a friend sits close, Aria slides it over. “Hello. Here’s a dot I found.”`,
butterfly:`Can I unfold something new even with an old crease?|I’ll unfold new wings along the old crease.
One side of the ribbon|Butterfly Nebula folded a ribbon to look like the wings in a photograph. When it was done, one side alone bore a straight crease.
Hiding the crease|Before showing a friend, Butterfly Nebula tucked the ribbon under the fold. As soon as the fingers let go, the crease appeared again.
Pressed flat|Butterfly Nebula pressed the ribbon flat for a long time. The crease stayed, and now the other side was wrinkled too.
Fold each end separately|The friend took one end and Butterfly Nebula folded the other. Unfolded, the wings looked different from both the picture and the first ribbon.
Unfolding the crease too|Butterfly Nebula hands the ribbon to a friend. “That line is my very first fold. How did you fold your side?”`,
sugar:`How do I show the kindness under my icy surface?|Even on cold days I’ll leave a warm hello.
A dot beside an icy crack|Ice Moon spotted a tiny dot between sheets of ice in a photo. About to show a friend, Ice Moon heard a greeting and clutched the photo instead.
Just a little “yeah”|When the friend said hello, all that came out was “Yeah.” Ice Moon had more to say, but only fiddled with the photograph’s edge.
Trying on a smile|Next time Ice Moon tried a great broad smile. Holding it so long only made the words come later.
A note slipped in|Ice Moon wrote “I was glad you came” and slipped it beside the photo. Later the friend pulled the note from a pocket to show it had been kept.
A note on the corner|On days when a greeting comes out short, Ice Moon leaves a note at the table corner. The friend picked it up. “I’ll come again too.”`,
mushroom:`Can I share a sound even when I can’t hear it?|I’ll share what I heard from the sky in another way.
A giant dish|Radio Star drew a giant antenna. On the back, dots stood for sounds to listen to together.
An unheard invitation|Radio Star called a friend’s name toward the dish. Nobody on the other side heard. Radio Star called once more.
The dish tilts|Tilting the dish alone, Radio Star covered the dots with a hand and forgot which way it was supposed to point.
Seeing sound|A friend held one side. Radio Star tapped out the sound while the friend followed the visible dots.
Listening with fingertips|Radio Star spreads the paper across the table. “Start by tapping these three dots. That’s the beat I heard.”`,
aurora:`May I greet my friend in a different light each time?|I’ll welcome you in today’s colors.
In front of the curtain|Every night Aurora chose a curtain to match the colors in the window. Green came first tonight, then pink appeared behind it.
No name for the color|Aurora made a curtain label. Unsure which color to write down, Aurora hung it up blank.
Painted just one color|Once the whole curtain was green, the pink behind it disappeared. Aurora shut the window completely, then opened it again.
Above and below|Aurora cut little windows in the curtain. A friend found pink through the top window and green through the lower one.
This side first today|Aurora opens the curtain just a little and calls a friend. “What do you see first from your spot today?” Aurora moves closer to look too.`,
comet:`Can I keep a journey even if its ending didn’t come home?|I’ll tell you the parts of the path I brought back.
A map as long as a tail|ISON traced a comet’s tail to draw a travel map. At its tip went a mark for a place dearly worth reaching.
Nothing at the end|The tip of the map tore on the way home. With nowhere to mark how far the journey went, ISON rolled it up.
Fold the tear inward|The torn side was the first thing a friend would see. ISON folded the map inward once more.
What did you see midway?|The friend pointed to the middle. ISON drew the view from there. Together they unfolded the torn end too and dated the journey.
Start with the way home|Back from a trip, ISON now marks a dot in the middle before checking the finish. “I stopped here on the way. Can I tell you that part first?”`,
lullaby:`Can we rest together even if our beats are different?|I’ll wait a beat for your breath.
Dots on the score|Pulsar dotted the page in time with a steady signal. When the line was full, Pulsar hummed along to its beat.
A friend takes a breath|Singing along, the friend drew a long breath. Pulsar had already started the next note.
Adding more dots|Pulsar filled the break in the beat with extra dots. The song grew crowded, leaving the friend no room to breathe.
One empty space|Pulsar waited for the friend to breathe out before softly singing the next note. This time their first notes sounded together.
Marking the rests|Pulsar leaves space between the dots. When a friend asks where to start singing, Pulsar points to the gap. “Take a breath here first.”`,
ripple:`Will anyone notice even the tiniest tremor?|I’ll listen for the smallest tremble too.
Circles in a cup|A cup trembled and circles spread across the water. Gravitational Wave ran to fetch a friend.
Water already still|By the time the friend leaned over, the water was calm. Gravitational Wave drew the widening circles in the air.
Too much this time|Trying to show the ripples again, Gravitational Wave shook the cup hard. Water spilled over the notes on the table.
Watching together|They put the cup between them and waited. At a tiny tremble, both leaned in. Gravitational Wave noted the time the ripple appeared.
Here again next time|Gravitational Wave leaves dry paper beside the cup. “Call me if you see it first.” The friend left the cup right where it was.`,
flame:`Can the pieces of something finished make something new?|I’ll use the pieces left behind for our next beginning.
What appears as it cools|After the gathering, Supernova watched a little lamp cool down. One photograph still showed it shining.
The last page|Once all the pictures were in the box, the next page stayed blank. Supernova took out the lamp and studied its shape.
Trying to make it the same|Supernova made a new lamp just like the one in the picture. Lit up, it cast a different shadow on the paper.
There were two shadows|A friend turned the new lamp. On the wall the shadows of two stars swayed. Supernova drew a new picture of them.
A box for next time|Supernova sets the old photo beside today’s drawing. Before the friend can close the lid, another sheet goes in. “Let’s use this one next time.”`,
pearl:`Can I rest too when I’m guiding someone?|I’ll mark the places we can rest together.
A long curve|Spica mapped a path joining the stars. As a friend followed, Spica walked ahead, tracing the curve with a hand.
Almost there|The friend called for a rest. “We’re nearly there,” said Spica, covering one more stretch.
That fork back there|Looking back, Spica couldn’t see the friend. In the hurry, Spica realized a direction marker had slipped by too.
A pencil on the bench|Reunited, they sat on a bench. Right beside it was the fork they’d been looking for. The friend marked it in pencil.
Resting places too|Spica added another bench to the map. Today the friend saw the map first. “Shall we stop here along the way?”`,
dandelion:`Will we still be friends if we land somewhere different?|I’ll send you the sky I see from my new place.
A packet of seeds|Open Cluster shared one packet among several pots. The first leaves stood in a line along the window.
Which window?|A friend suggested moving a pot to another window. Worried about breaking the row, Open Cluster picked it up, then set it down.
Lined up just the same|At each window Open Cluster spaced the pots alike. But at some windows light fell from only one side.
Different windows, different skies|A friend drew a star from another window. Open Cluster found the same star and continued the drawing on the back.
Greetings from another window|Open Cluster tucks a drawing of the view into each pot. The friend came carrying a pot. “What could you see from your window today?”`,
mist:`Can I show a friend a feeling that isn’t clear yet?|Let’s take our time looking at cloudy feelings too.
Misted glass|Dark Nebula looked through the hazy observation window. Asked what shape was there, Dark Nebula hardly knew where to begin.
A blank page|While everyone recorded observations, Dark Nebula just held a pencil, waiting for the view to grow clearer.
Lost in the wiping|Dark Nebula hurried to wipe the glass. The hazy pattern that had appeared for an instant was nowhere to be found.
Light from the side|A friend shone a lamp from one side. A different outline appeared. Dark Nebula drew only the part that showed and wrote a word beside it.
Room for tomorrow|Dark Nebula leaves one side of the drawing blank. At the part still unseen, the pencil rests. “Shall we start here tomorrow?”`,
ribbon:`Can we stay connected without tying a tight knot?|Even a loose knot can carry a hello.
A leftover piece of string|Interstellar Cloud wound the string left from tying their shared notebook around a finger. A friend picked up the book to move to another seat.
What if it comes loose?|Worried they might lose their chance to read together again, Interstellar Cloud tied the remaining string tight too.
The notebook won’t open|The friend came back to read, but the knot wouldn’t budge. Interstellar Cloud pulled both ends, making it tighter.
Undoing the knot|At last they eased it loose and tucked the string into the last page they’d read. Even at another seat, the friend could find the right place.
Words at the string’s end|Interstellar Cloud leaves a note with the string. “When you’re done, move it to the next page. I’ll pick up from there.”`,
acorn:`Could my old marks make a map of my own?|I’ll tell you the journeys my marks remember.
Dots beneath a cap|Callisto saw pits in a photograph and took off a cap. It too had dents from traveling.
A crease to smooth away|Callisto smoothed an old line by hand. As soon as the hand lifted, the fold came back.
Covered in fresh paper|Callisto wrapped the cap in clean paper. The dents vanished, but now it was hard to tell the front from the back.
Remember this one?|A friend lifted a corner. “This one came the day we ducked under that low door.” They removed the paper and named the marks they recognized.
A map inside the cap|Callisto draws each destination inside the cap. Seeing a fresh dent, Callisto takes it off and passes it over. “Guess where I got this one today.”`,
echo:`Can I still answer a hello sent long ago?|I’ll answer even a greeting that arrives late.
A postcard sent long ago|Cosmic Radio checked the date on a postcard and set it beside the receiver. A long time lay between sending and reading.
Putting off the reply|Perhaps the friend had forgotten that day already. Cosmic Radio dated the page, then folded it with nothing else written.
Drawing the window back then|Cosmic Radio tried to draw the exact view on the postcard. Outside the window, the stars had moved.
The window as it is now|Cosmic Radio drew the stars outside today. On the back went the words “I read it today. I was glad to hear from you.”
Paper beside the receiver|Cosmic Radio keeps a fresh sheet ready. When a late postcard comes, the window opens. “Here’s what I can see on my side today.”`,
rainbow:`Can we draw together without losing either color?|Let’s put your color beside mine.
Passing light through|Prism Star shone a light and a row of colors fell across the table. A friend drew another band beside it.
Trying to choose just one|Joining their drawings, Prism Star wanted a single color in the middle. The pencils in their hands were different colors.
Overlapping in the middle|Both colors went in the same spot. Looking again, neither of their first colors showed anymore.
One line between|The friend moved a color to the next square. Prism Star filled the first square again. With one empty line between them, both colors showed clearly.
A space in the band|When a friend comes, Prism Star lays another sheet beside the first. “I painted this side yesterday. Where would you like to put today’s color?”`,
};

const notes = {
soot:'The Moon’s umbra|The umbra is the darkest part of a shadow, where the light is blocked.|In the penumbra, only part of the light source is hidden.|A solar eclipse happens when the Moon passes between Earth and the Sun.|A total solar eclipse is visible along the path of the Moon’s umbra.|While the bright disk is completely covered, we can see the corona around it.',
pink:'Rosette Nebula|The petal-like shapes in the Rosette Nebula are gas and dust.|A cluster of young stars lies at its center.|Radiation and stellar winds from young stars shape the surrounding gas.|Hydrogen lit by young stars can glow red.|The nebula owes its red glow to hydrogen energized by stars, rather than to flower petals.',
puff:'Orion Nebula|Stars are being born in the Orion Nebula.|Gravity pulls parts of cold gas and dust clouds together.|A protostar grows as material gathers at its center.|Infrared observations reveal starbirth hidden from visible light.|When hydrogen fusion begins at its center, a star shines by its own power.',
violet:'Lyra and the Summer Triangle|Lyra has long been pictured as a stringed instrument.|Vega is a bright star in Lyra.|Vega, Deneb and Altair each belong to a different constellation.|Together they trace the large star pattern called the Summer Triangle.|A constellation is a region of sky. The Summer Triangle is a pattern crossing several constellations. The International Astronomical Union divides the sky into 88 constellation regions.',
star:'Canis Major and Sirius|Sirius appears brighter than any other star in Earth’s night sky.|Its relative closeness to Earth helps it look so bright.|Earth’s atmosphere can make bright stars near the horizon twinkle especially strongly.|Sirius is a binary system containing Sirius A and the white dwarf Sirius B.|Apparent brightness tells us how bright a star looks from Earth. A brighter-looking star need not give off more light.',
milk:'Io, a moon of Jupiter|Io orbits Jupiter and has very active volcanoes.|The gravity of Jupiter and other moons flexes Io again and again, heating its interior.|Io’s volcanoes throw gas and other material high above the surface.|Sulfur-bearing materials give Io its varied colors.|Even a small moon’s interior can change under its neighbors’ gravity.',
toast:'Vega and the northern sky|Vega is a bright star in Lyra at one corner of the Summer Triangle.|Trace from Vega to Deneb and Altair to find the Summer Triangle.|As Earth orbits the Sun, we face different parts of the night sky in different seasons.|The direction of Earth’s rotation axis changes over very long spans of time.|Remember one bright star and the shapes its neighbors make to find the next star in the sky.',
sprout:'Blue stars|A star’s blue color points to a hot surface.|Red stars generally have cooler surfaces than blue stars.|Surface temperature and size tell us different things about a star.|Massive stars shine brightly and use their fuel quickly.|Starlight color gives a clue to surface temperature. That is a different measurement from a star’s size.',
moss:'Mira in Cetus|Mira in Cetus is a variable star whose brightness changes.|Its pulsations, expanding and contracting, affect its brightness.|It can be visible to the naked eye when bright and hard to find when faint.|Changes stand out better across many days of pictures than in a single photo.|Set brightness records from several days side by side to see a variable star change.',
cloud:'Globular Cluster|A globular cluster is a rounded group of stars bound by gravity.|Stars look especially crowded near its center in photographs.|Omega Centauri is a well-known example.|Many globular clusters are home to very old stars.|Gravity holds a globular cluster together. Even dots that overlap in pictures are individual stars.',
peach:'Betelgeuse in Orion|The red star Betelgeuse shines near Orion’s shoulder.|It is a red supergiant far larger than the Sun.|Its brightness changes over time.|A star’s color can help us estimate its surface temperature.|Betelgeuse is a red supergiant of varying brightness. Record both color and brightness to reveal clues either one alone would miss.',
mint:'Phases of the Moon|The Moon shines by reflected sunlight.|As the Moon orbits, the shape of the sunlit portion we see from Earth changes.|From crescent to full Moon, the visible sunlit part grows.|After the full Moon, that bright portion shrinks again.|We see the Moon by reflected sunlight. As it orbits Earth, the shape of the bright area we see changes.',
coral:'Red Giant|When a Sun-like star uses up the hydrogen in its core, its structure changes.|It can swell enormously and look red as its surface cools.|Our Sun will enter a red giant phase in the distant future.|A Sun-like star can shed its outer layers into space.|Stars change structure over time. Even stars like our Sun eventually pass through a red giant phase.',
clover:'Auriga and Capella|Capella shines brightly in Auriga.|This bright point makes a good place to start on a star map.|Stars in a constellation need not all lie the same distance from us.|A star pattern can change shape when viewed from a different direction.|Stars that look close together in the same constellation may be at very different distances from Earth.',
snow:'Saturn’s rings|Saturn’s rings consist of bits of ice and rock.|Each piece orbits Saturn independently.|The rings show bands of different widths, with gaps between them.|Some moons shape ring edges and gaps through their gravity.|Saturn’s rings consist of countless pieces orbiting separately, rather than a single solid sheet.',
dew:'Ice at the Moon’s poles|Some craters near the lunar poles receive hardly any sunlight.|Permanently shadowed crater floors can be much colder than their surroundings.|Water ice has been found in such places.|Spacecraft use several observing methods to map water on the Moon.|Polar craters where sunlight rarely reaches are important places to look for lunar water ice.',
tangerine:'Fusion in the Sun|The Sun’s core is intensely hot and under high pressure.|Fusion of hydrogen into helium releases energy there.|Energy from the core travels outward through several layers.|Sunlight reaches Earth and warms the land and atmosphere.|The Sun’s energy originates in fusion at the core and travels outward through layers.',
night:'Neptune|Neptune is the farthest planet from the Sun.|It is classed as an ice giant.|Methane contributes to its blue appearance.|Strong winds blow even on distant, cold Neptune.|Although Neptune is a distant, cold ice giant, powerful winds race through its atmosphere.',
opal:'White Dwarf|A Sun-like star can leave behind a white dwarf at the end of its life.|Once the outer layers have been shed, a hot, dense core remains.|A white dwarf can be about the size of Earth.|A white dwarf gives off its remaining heat and cools very slowly.|A white dwarf is the hot, dense core left by a star. It slowly cools as it releases stored heat.',
linen:'Titan, a moon of Saturn|Titan is Saturn’s largest moon.|Its thick atmosphere is mostly nitrogen.|Lakes and seas of liquid methane and ethane lie on its surface.|The Huygens probe landed on Titan and sent back data.|Titan’s lakes contain liquid methane and ethane where lakes on Earth hold water.',
cookie:'Jupiter and the Great Red Spot|Jupiter is the largest planet in the Solar System.|Its stripes show bands of clouds flowing in different directions.|The Great Red Spot is a vast, long-lived storm in its atmosphere.|Jupiter has rings too, but they are fainter than Saturn’s.|Jupiter’s stripes and Great Red Spot trace movements in its atmosphere rather than patterns on solid ground.',
puddle:'Milky Way|The Milky Way’s band is our galaxy seen from within.|Toward dense fields of stars, faint light blends into a continuous glow.|Some dark patches across the band are dust clouds blocking starlight.|Our Solar System belongs to the Milky Way and orbits its center.|We see the Milky Way from inside it. Dark lanes include dust clouds that block light from behind.',
breeze:'Solar Wind|The Sun continuously sends charged particles into space.|This stream is called the solar wind.|Earth’s magnetic field interacts with the solar wind.|Particles energized in this process can meet the atmosphere and produce auroras.|The solar wind is a flow of charged particles. Interactions with Earth’s magnetic field and atmosphere help produce auroras.',
honey:'Pollux in Gemini|Castor and Pollux are two landmarks in Gemini.|Pollux appears orange.|Stars that seem close together may lie at different distances from Earth.|Constellation pictures help us remember directions in the sky as seen from Earth.|Constellations help us remember directions in the sky. A pattern alone cannot tell us the true distances of its stars.',
ash:'Neutron Star|A massive star can leave a neutron star after exploding.|A neutron star packs a great mass into a very small space.|Signals from a rapidly spinning neutron star can be seen as pulses.|Two merging neutron stars can produce gravitational waves.|A neutron star is small but contains a huge amount of mass in very little space.',
bubble:'A comet’s coma|A comet’s nucleus contains ice and dust.|Near the Sun, ice releases gas and dust spreads out with it.|This cloud of gas and dust around the nucleus is called a coma.|A comet’s tail tends to point away from the Sun.|Observers distinguish the rounded coma from the long tail. Both contain material from the nucleus.',
petal:'Rosette Nebula and its young cluster|A bright cluster of stars appears at the center of the Rosette Nebula.|Young central stars energize the surrounding hydrogen gas and make it glow.|Winds from the stars push away gas, hollowing out a wide central space.|The same nebula may look different in pictures taken at different wavelengths.|The colors in a nebula picture depend partly on the wavelengths recorded. Check what kind of light the image shows.',
sesame:'Ceres, a dwarf planet|Ceres lies in the asteroid belt between Mars and Jupiter.|Its own gravity has drawn it nearly round. Ceres is a dwarf planet.|One distinguishing criterion is that it has not cleared the neighborhood of its orbit.|The Dawn spacecraft approached Ceres and studied bright areas on its surface.|Ceres is a dwarf planet in the asteroid belt. Even small bodies have terrain for spacecraft to explore.',
cocoa:'Beneath Europa’s ice|Europa is an icy moon orbiting Jupiter.|Lines and cracks cross the icy surface.|Evidence points to a possible liquid ocean under the ice.|Understanding Europa’s interior also means studying its gravitational interaction with Jupiter.|Ice covers Europa and there is evidence that an ocean may lie beneath it.',
lemon:'The Sun’s atmosphere|The Sun’s bright visible surface is called the photosphere.|Above it lie the chromosphere and corona.|The corona is much hotter than the photosphere.|Instruments can block the bright solar disk to study the outer atmosphere.|Beyond the bright photosphere lie the chromosphere and corona. Even features hidden by the brilliant disk can be studied.',
lavender:'Starlight color and temperature|The color of starlight carries information about surface temperature.|Splitting starlight reveals light at many wavelengths.|Dark lines imprinted by matter may appear in a star’s spectrum.|Astronomers use those lines to identify the star’s elements.|Lines in the spectrum of starlight give clues to the elements that make up a star.',
seafoam:'Triton, a moon of Neptune|Triton is Neptune’s largest moon.|Unlike most large moons, it orbits opposite to its planet’s rotation.|This orbit suggests that Neptune’s gravity may have captured Triton.|Voyager 2 observed Triton’s surface as it flew past.|Triton orbits opposite to Neptune’s spin. An unusual orbit can offer clues to a world’s past.',
chestnut:'Asteroid belt|Many asteroids lie between Mars and Jupiter.|Asteroids preserve material left from the Solar System’s formation.|Small asteroids may have irregular shapes.|Bodies in the asteroid belt are far apart.|The asteroid belt’s objects are far apart, and a small asteroid can be lumpy rather than spherical.',
lily:'Cassiopeia|The bright stars of Cassiopeia resemble a W.|This pattern helps you find your way around the northern sky.|As the sky turns, the W may tilt or look like an M.|The constellation’s region extends beyond its five striking stars.|Cassiopeia can look like a W or an M depending on its orientation. Its region extends beyond those five stars.',
butterfly:'Butterfly Nebula|Two lobes of the Butterfly Nebula form wing-like shapes.|The wings trace gas that spread out from the central star.|Light from the center makes the surrounding gas glow.|This kind of object is called a planetary nebula. It forms during stellar evolution.|The Butterfly Nebula is a planetary nebula, a structure of gas formed as a star evolved.',
sugar:'Icy moons and Enceladus|Enceladus is an icy moon of Saturn.|Water vapor and ice grains erupt from fractures near its south pole.|Cassini studied the plume on close passes.|These observations add evidence for an ocean under the ice.|Observations of Enceladus’s plume help us learn about the ocean beneath its ice.',
mushroom:'Radio telescope|Radio waves, like visible light, are electromagnetic waves.|Antennas receive radio waves our eyes cannot see.|A large dish gathers the waves and directs them to a receiver.|Combining signals from several antennas can reveal fine detail in the sky.|A radio telescope receives invisible electromagnetic waves. What it collects is different from sound.',
aurora:'Earth’s auroras|Auroras are displays of light high in Earth’s atmosphere.|Energized particles collide with atmospheric gases, producing light.|The gas and its altitude affect the colors, including green and red.|Earth’s magnetic field guides particles, so auroras often appear near the poles.|The colors of an aurora depend in part on the atmospheric gases and the heights where they shine.',
comet:'Comet ISON|ISON was a comet that passed close to the Sun.|As it approached, gas and dust spread widely around it.|The Sun’s heat and gravity can break a comet’s nucleus apart.|ISON’s nucleus did not survive its very close solar passage in 2013.|Even the final observations of ISON help us study what happens to comets passing near the Sun.',
lullaby:'A pulsar’s rhythm|A pulsar is a spinning neutron star that emits beams.|A signal arrives when a beam sweeps toward Earth.|As rotation brings the beam around again, the signal repeats.|Recording a pulsar’s period can reveal tiny changes.|A pulsar’s signal repeats as a rotating beam sweeps past Earth, rather than the whole star flashing with a sound.',
ripple:'Gravitational Wave|Gravitational waves are ripples traveling through spacetime.|Merging black holes or neutron stars can make detectable waves.|Detectors measure extremely small changes in length as a wave passes.|Observing both light and gravitational waves gives different views of one event.|Gravitational waves and light provide different kinds of observations. Using both gives us more clues about the same event.',
flame:'Supernovae and stellar remnants|Some massive stars end their lives in supernova explosions.|An explosion scatters elements made inside the star through space.|The expanding material can be observed as a supernova remnant.|This material can later become part of new stars or planets.|A supernova remnant holds traces of material spread by the explosion. The end of one star can supply ingredients for others and their planets.',
pearl:'Spica in Virgo|Spica appears brighter than any other star in Virgo.|Follow the curve of the Big Dipper’s handle through Arcturus and onward to find Spica.|Spica shines with a bluish light.|Constellation names help people share the position of a sky observation.|Bright stars are useful guides, and so are the curves and shapes that neighboring stars make.',
dandelion:'Open clusters and the Pleiades|The Pleiades are an open cluster in the direction of Taurus.|To the unaided eye, a few bright stars seem gathered together.|A telescope reveals many more stars in that direction.|The stars of an open cluster usually formed around the same time from one gas cloud.|The Pleiades form an open cluster toward Taurus. A telescope reveals more members than we can see by eye.',
mist:'Dark Nebula|A dark nebula looks dark because it blocks light from behind.|Dust and gas are among the materials blocking the light.|The Horsehead Nebula appears as a dark silhouette against a bright background.|Infrared observations help reveal structures hidden in visible light.|A dark nebula is full of dust and gas that obscure the light behind it.',
ribbon:'Matter between the stars|Thin gas and dust fill the space between stars.|In some places this material gathers in long, narrow filaments.|Cold, dense gas can clump together further under gravity.|When a star forms inside, it changes the surrounding cloud.|Even between stars there is matter. New stars can form where gas and dust gather in cold, dense regions.',
acorn:'Callisto, a moon of Jupiter|Callisto has the outermost orbit of Jupiter’s four large moons.|Craters large and small from ancient impacts cover its surface.|Ice and rocky material both occur at the surface.|Counting and studying craters gives clues to the history of an old surface.|The distribution of craters helps trace the history of impacts on Callisto’s ancient surface.',
echo:'Cosmic microwave background|A faint microwave signal reaches us from every direction in the sky.|It is light left from the time light first traveled freely through the young universe.|As the universe expanded, this light stretched to longer wavelengths.|Tiny differences in the signal reveal clues about the early universe.|The cosmic microwave background records ancient light whose wavelengths have stretched as the universe expanded.',
rainbow:'Spectra and elements|A prism can separate mixed light into colors.|Light spread out by wavelength forms a spectrum.|Each substance emits or absorbs light at particular wavelengths.|Elements such as hydrogen can be identified in a star’s spectrum.|Bands and lines in a spectrum help identify the material that emitted or absorbed the light.',
};

const sola = [
  ['A letter sent','Sola drew a sun on the letter and stood it by the window. “Lumi, do you think it’s there yet?” “Even sunlight takes about eight minutes to reach Earth. Let’s give it a little time.” Sola pulled the clock closer and drew another ray on the sun.','Sunlight takes about eight minutes to reach Earth.'],
  ['The dark spot can stay','When no reply came, Sola tried to erase a dark spot on the drawing. Lumi held out a picture of the Sun. “Oh! The real one has spots too.” Sola put the eraser down.','Sunspots appear dark because they’re cooler than the surrounding surface.'],
  ['Umbra comes to visit','The letter lay face down when Umbra brought a picture of an eclipse. “The Moon covers the middle, but look how bright it is around the edge.” Sola pulled it closer and stood the letter up again. “I’m waiting for a reply. Would you sit with me?”','When the Moon covers the Sun’s bright disk during a total solar eclipse, the outer atmosphere, the corona, comes into view.'],
  ['One more line','Nebula and Sola wrote down separate arrival times for sunlight and the solar wind. “Then maybe my reply is still on its way?” “I couldn’t say. But I saw something good today.” Nebula drew on the back of the letter. Beneath it Sola wrote, “A friend came to visit today.”','The solar wind is a stream of charged particles flowing from the Sun into space. It travels at a different speed from sunlight.'],
  ['A place for you too','After finding the Sun on Lumi’s galactic map, Sola drew a galaxy too. No reply at the window yet. Sola lit the lamp by the planet ring and put a cushion in an empty spot. When Umbra and Nebula arrived, Sola unfolded the map. “Look, I drew your places too.”','The Sun is a star in our Milky Way, near a spiral arm away from its center.'],
];

const greetings = {
crumb:'Hi, I’m Sola. Can I sit next to you?',
soot:'Hi! Just a moment. Let me roll around one more time.',
pink:'Hello… I’m waving from back here.',
puff:'Hi! Wait, did you hear that? Try dancing to it.',
violet:'Hello. You can sit here. I’m still a little sleepy.',
star:'Looking for the way? I have a map. Want to look together?',
milk:'You’re here? I’m waving from under the blanket.',
toast:'Good morning! Oh, good. I got to say hello first today.',
sprout:'Hi! I just found a new shade of blue. Want a look?',
moss:'There you are. Take your time. I’m right here.',
cloud:'You came! Here’s a cushion. Sit a while.',
peach:'How do you like this red? Here, take a sheet too.',
mint:'How’s my face today? A little rounder than yesterday?',
coral:'You’re here! Can I tell you what I saw earlier?',
clover:'Come with me. I bet we’ll find something sparkly.',
snow:'Hi. Come closer if you like. It’s less chilly on this side.',
dew:'Hello! I rolled all the way here. Give me a moment to catch my breath.',
tangerine:'Hi! Tell me one thing that happened today. I have something too.',
night:'Hello. If you want some quiet, you can just sit beside me.',
opal:'Hi! Want to see my old photo first, or the picture I drew today?',
linen:'May I fold the map? I want to take it along in my pocket.',
cookie:'Have you seen a little piece of a picture? I think it fell out of my box.',
puddle:'Oops, into the water I went. There! I’m floating again.',
breeze:'You’re here? All packed? I’ll wait right here.',
honey:'Hello. My answer might take a moment. I’m thinking about it.',
ash:'Hi! Anything to carry? Give me the heavy one.',
bubble:'Shall I blow a bubble? I think this one’s going to be big.',
petal:'Look at this flower bookmark. I tucked it here to show you when you came.',
sesame:'Hello! My name’s at the edge of the map too. You can see it up close.',
cocoa:'Hi. Would you like some tea? We can talk in a little while.',
lemon:'Hello! Come over here to look out the window. I just polished it.',
lavender:'What color do I look like today? I’ve picked three already.',
seafoam:'Hi! I’ll go around this way. Meet you over there?',
chestnut:'Hello. I have a few corners on this side. Beside me is fine.',
lily:'Hi. Could you come a little closer? I’ll tell you from here.',
butterfly:'I folded this ribbon. Can you see how the two ends look a little different?',
sugar:'There you are. Here’s a warm spot. I kept it for you.',
mushroom:'Hi! If your ears can’t hear it, we can follow it with our fingers too.',
aurora:'Hello! What color shall I open the curtain to today? You can choose.',
comet:'Hi! The end of my map’s a little crumpled, isn’t it? This is how far I went.',
lullaby:'Hi. Tap, tap… can you hear my beat? You try.',
ripple:'Did you see the water tremble just then? Let’s watch together next time.',
flame:'Hello. I lit this lamp. It’s little, but you can see really well from here.',
pearl:'Need a guide? I know this area well. We can stop for a rest along the way.',
dandelion:'Hi! Want a seed? You can plant it by your window.',
mist:'Hello. I’m over here even if you can’t quite see me. I’ll wave.',
ribbon:'Hi! Paused in the middle of your notebook? Slip this string in.',
acorn:'Have you seen my cap? That dent came from my last trip.',
echo:'Hello. I saw the words you left. It’s a little late, but may I answer now?',
rainbow:'Want to shine it through here? Let’s see what colors your light splits into.',
};

const profiles = {
crumb:['Sways from side to side and squishes down softly.','It’s all soft and shaped like me here.','A soft little press · crescent eyes'],
soot:['Spots the cushion, rolls over and grins.','One more roll! The very last, really.','Rolls over · winks'],
pink:['Shrinks back a little, then peeks around the bookshelf.','Could I… read the next page with you too?','Peeks out · blushes'],
puff:['Opens and closes like a flower, dancing to the chime.','Ding-dong! The wind and I are playing a duet.','Unfolding dance · smiling eyes'],
violet:['Stretches out in the moonlight, then curls up and drifts off.','Just a little light… so my dreams don’t run away.','Slow breaths · sleepy eyes'],
};

const pairs = [
  ['별명을 확인해주세요.', 'Please check the nickname.'],
  ['별명은 12자 이내로, 꺾쇠나 줄바꿈 없이 적어주세요.', 'Use up to 12 characters, without angle brackets or line breaks.'],
  ['솔라의 빛과 편지', 'Sola’s light and letter'],
  [petReaction('pink').record, 'Rosetta peeked out, following your touch.'],
  [petReaction('milk').record, 'Io opened one eye halfway, then fell asleep again.'],
  [petReaction('toast').record, 'Vega greeted you first, as if waiting just for you.'],
];
function addStrings(source, translated) {
  if (source.length !== translated.length) throw new Error('Unequal star localization fields');
  source.forEach((text, i) => pairs.push([text, translated[i]]));
}
for (const [id, star] of Object.entries(STAR_JOURNEYS)) {
  addStrings([star.question, star.ending, ...star.chapters.flatMap(c => [c.title,c.body])],
    arcs[id].split(/[|\n]/));
  const chapters = SKY_STORIES[id];
  addStrings([chapters[0].topic, ...chapters.map(c => c.observation)], notes[id].split('|'));
}
SOLA_CHAPTERS.forEach((c,i) => addStrings([c.title,c.body,c.observation],sola[i]));
for (const [id, text] of Object.entries(greetings)) pairs.push([firstGreeting({id}),text]);
for (const [id, c] of Object.entries(CHARACTERS)) addStrings([c.action,c.words,c.cue],profiles[id]);
export default pairs;

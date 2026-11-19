const sky = {
  birth: ['별이 깨어나는 구름', '루미가 첫 장을 펼쳤어요. 검은 종이 한가운데, 네뷸라가 새 별을 기다리고 있었어요.', '차갑고 밀도 높은 가스와 먼지 구름의 일부가 중력으로 뭉치면서 새 별이 자라기 시작해요.', 'https://science.nasa.gov/mission/webb/star-lifecycle/'],
  story: ['나란히 켜진 두 불빛', '솔라는 빈 책갈피 옆에 두 친구의 자리를 그렸어요. “둘이 자란 이야기는 여기에 꽂자.”', '산개성단의 별들은 대개 같은 가스 구름에서 비슷한 시기에 태어나요.', 'https://science.nasa.gov/universe/stars/star-clusters-inside-the-universes-stellar-collections/'],
  furniture: ['고리에서 주운 조각', '루미가 망원경을 빌려줬어요. 고리를 다 보고 나면 우리 은하계에도 작은 모형을 놓기로 했어요.', '토성의 고리는 크기가 제각각인 얼음과 암석 조각으로 이루어져 있어요.', 'https://science.nasa.gov/saturn/facts/'],
  adventure: ['태양에서 불어오는 길', '루미는 항로의 끝을 점선으로 남겼어요. 돌아오는 친구가 그 자리에 자기 엽서를 끼울 거예요.', '태양풍은 태양에서 흘러나오는 전하를 띤 입자의 흐름이에요. 지구 근처에서 오로라를 일으키는 데 관여해요.', 'https://science.nasa.gov/sun/facts/'],
  fairy: ['늦게 도착한 인사', '모아가 저마다 다른 때 도착한 빛을 받아 한 장의 편지에 담았어요.', '태양에서 나온 빛이 지구에 닿기까지 약 8분이 걸려요.', 'https://science.nasa.gov/sun/facts/'],
  room: ['지도 밖에 남긴 자리', '한 장으로 모자란 지도를 펼치자 솔라가 다음 친구가 앉을 자리를 그렸어요.', '우리가 밤하늘에서 보는 은하수는 우리 은하를 그 안에서 바라본 모습이에요.', 'https://science.nasa.gov/universe/galaxies/'],
  collection: ['사진 속의 오래된 빛', '별들은 아직 이름을 읽지 못한 빛을 위해 책 뒤에 한 장을 비워 두었어요.', '먼 천체의 빛이 우리에게 오는 데에는 시간이 걸려요. 그래서 멀리 볼수록 더 먼 과거를 볼 수 있어요.', 'https://science.nasa.gov/universe/galaxies/'],
  eclipse: ['관측창에 나타난 왕관', '루미가 관측창에 검은 원을 오렸어요. 그 가장자리에 흰 실을 붙이자 솔라가 속삭였어요. “우리 창에도 왕관이 생겼네.”', '개기일식 동안 달이 태양의 밝은 원반을 가리면 태양의 바깥 대기인 코로나를 볼 수 있어요.', 'https://science.nasa.gov/sun/facts/'],
  ice: ['얼음 아래의 바다', '루미는 손님이 앉을 의자 옆에 얼음으로 된 작은 달을 그렸어요. 솔라는 그림 뒤쪽에 파란 물결을 보탰어요.', '카시니 탐사선은 엔셀라두스의 남극 부근에서 뿜어져 나오는 물과 얼음 입자를 관측했어요. 얼음 아래에는 바다가 있어요.', 'https://science.nasa.gov/saturn/moons/enceladus/'],
  moon: ['달 뒤편의 아침', '지구에서 보는 달의 얼굴을 다 그리고도 루미는 종이를 덮지 않았어요. 종이를 뒤집어 반대편의 아침을 그렸어요.', '달의 자전과 공전 주기가 같아 지구에서는 대체로 같은 면이 보여요. 달의 뒷면에도 햇빛이 비쳐요.', 'https://science.nasa.gov/moon/facts/'],
  radio: ['우체국에 온 파동', '솔라는 소리 없는 편지를 받았어요. 루미가 안테나를 펼치자 먼 곳에서 온 작은 점들이 한 장의 그림이 됐어요.', '탐사선은 관측 자료를 전파에 실어 보내고 지구의 안테나는 그 신호를 받아요.', 'https://www.nasa.gov/directorates/somd/space-communications-navigation-program/deep-space-network/'],
  triangle: ['세 방향에서 온 빛', '리라가 서로 다른 지도에서 점을 하나씩 오려 왔어요. 루미가 세 점을 이으니 전망대 천장에서 큰 삼각형이 되었어요.', '여름철 대삼각형의 베가, 데네브, 알타이르는 각각 거문고자리, 백조자리, 독수리자리에 속해요.', 'https://www.iau.org/IAU/Astronomy-FAQs/Constellations.aspx'],
  nova: ['마지막 장에 뿌린 씨앗', '솔라는 불꽃이 흩어진 자리에 먼지로 작은 원을 그렸어요. 루미는 그다음 장에 태어날 이름을 위해 종이를 비워 두었어요.', '초신성은 별이 만든 원소를 우주 공간으로 흩뿌려요. 이렇게 돌아온 물질은 훗날 다른 별과 행성의 재료가 될 수 있어요.', 'https://science.nasa.gov/mission/webb/star-lifecycle/'],

};
const roomTopics = {10:'eclipse',20:'adventure',30:'ice',40:'birth',50:'triangle',60:'collection',70:'moon',80:'radio',90:'room',100:'nova'};
export const questPage = goal => goal.id==='room-memory' ? roomPage(goal.chapter) : sky[goal.id];
export const roomPage = level => sky[roomTopics[level]];
export const memoryPage = index => [sky.room, sky.story, sky.furniture, sky.triangle, sky.triangle][index];

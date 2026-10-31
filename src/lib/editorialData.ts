import {
  EditorialArticle,
  EditorialCategory,
  EditorialMatchDetail,
  EditorialSearchResult,
  TransferDealItem,
} from './editorialTypes';

export const EDITORIAL_CATEGORY_LABELS: Record<
  EditorialCategory,
  { ru: string; en: string }
> = {
  'la-liga': { ru: 'Ла Лига', en: 'La Liga' },
  epl: { ru: 'Премьер-лига', en: 'Premier League' },
  ucl: { ru: 'Лига чемпионов', en: 'Champions League' },
  'serie-a': { ru: 'Серия А', en: 'Serie A' },
  transfers: { ru: 'Трансферы', en: 'Transfers' },
  tactics: { ru: 'Тактика', en: 'Tactics' },
};

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'art-1',
    slug: 'real-madrid-el-clasico-tactical-autopsy-bernabeu',
    category: 'la-liga',
    categoryLabelRu: 'Ла Лига',
    categoryLabelEn: 'La Liga',
    titleRu:
      'Анатомия мадридского перелома: как «Реал» скорректировал геометрию рывков Мбаппе и разрушил высокую линию «Барселоны»',
    titleEn:
      'Anatomy of a Bernabeu Turnaround: How Real Madrid Recalibrated Mbappe’s Runs to Shatter Barcelona’s High Line',
    subtitleRu:
      'После серии офсайдов в первой трети матча штаб Карло Анчелотти опустил точку старта атак на четыре метра глубже и превратил вертикальные коридоры в хет-трик французского форварда.',
    subtitleEn:
      'After early offside traps stalled their transitions, Carlo Ancelotti’s staff dropped the launch zone four meters deeper, turning vertical channels into a clinical hat-trick.',
    bodyRu: [
      'Первые двадцать пять минут «Эль-Класико» на «Сантьяго Бернабеу» выглядели как идеальная иллюстрация радикального замысла Ханси Флика. Четверка защитников «Барселоны» удерживала линию почти на центральном круге, сжимая пространство между линиями до двадцати двух метров и вынуждая полузащитников «Реала» отдавать поспешные передачи в офсайдную ловушку. Килиан Мбаппе трижды оказывался за спинами Пау Кубарси и Иньиго Мартинеса на доли секунды раньше момента паса.',
      'Ключевая тактическая коррекция произошла во время короткой паузы в середине первого тайма. Карло Анчелотти и Давиде Анчелотти перестроили структуру полузащиты в асимметричный ромб 4-3-1-2: Федерико Вальверде сместился шире в правый полуфланг, уводя за собой Алехандро Бальде, а Джуд Беллингем стал опускаться в зону опорного полузащитника для приема мяча лицом к чужим воротам. Вместо прямых забросов от центральных защитников мадридцы начали использовать передачу «на третьего» через Беллингема.',
      'Именно эта задержка в полсекунды изменила механику рывков Мбаппе. Начиная движение из глубины и стартуя по дуге из слепой зоны между Кубарси и Кунде, нападающий «Реала» получил преимущество в скорости без риска застрять в искусственном офсайде. Первый гол на 14-й минуте и особенно второй мяч на 63-й минуте стали прямым следствием того, что оборона гостей больше не имела четкого триггера для синхронного шага вперед.',
      'Выход Луки Модрича вместо Орельена Тчуамени на 68-й минуте окончательно закрепил территориальный и темповый перевес хозяев. Хорватский ветеран опустил пульс игры в центральной зоне, заставив уставшую тройку полузащитников каталонцев бегать за мячом без возможности вступить в отбор. Его проникающий пас внешней стороной стопы в преддверии третьего гола стал образцом чтения геометрии поля.',
      'Для «Реала» эта победа со счетом 3:2 значит гораздо больше, чем три очка в чемпионской гонке Ла Лиги. Мадрид доказал, что способен адаптироваться по ходу одного вечера против самой агрессивной прессинг-машины Европы, не отказываясь от собственной идентичности и хладнокровия в решающих фазах владения.'
    ],
    bodyEn: [
      'The opening twenty-five minutes of El Clasico at the Santiago Bernabeu unfolded as a textbook demonstration of Hansi Flick’s radical territorial compression. Barcelona’s back four held their line on the halfway stripe, squeezing the playable pitch to barely twenty-two meters from back to front and baiting Real Madrid’s midfielders into premature vertical balls. Three times in quick succession, Kylian Mbappe was flagged fractionally beyond Pau Cubarsi and Inigo Martinez.',
      'The decisive structural adjustment arrived during a brief stoppage midway through the first half. Carlo and Davide Ancelotti reshaped Madrid’s midfield into an asymmetrical 4-3-1-2 diamond: Federico Valverde drifted wider into the right channel to pin Alejandro Balde, while Jude Bellingham dropped alongside the pivot to receive on the half-turn facing forward. Rather than launching direct passes from the centre-backs, Madrid introduced a third-man combination through Bellingham.',
      'That half-second delay completely altered the geometry of Mbappe’s movement. By initiating his curved diagonal runs from two yards inside his own half—starting in the blind spot between Cubarsi and Jules Kounde—the French forward hit top stride without crossing the offside plane early. His opener and his 63rd-minute equalizer both stemmed from Barcelona’s back line losing their visual cue to step up in unison.',
      'Luka Modric’s introduction for Aurelien Tchouameni in the 68th minute sealed Madrid’s control over the tempo. The Croatian playmaker immediately slowed the rhythm in possession, forcing Barcelona’s tiring midfield trio to chase shadows before slicing open the high line with a trademark outside-of-the-boot pass in the build-up to the winning strike.',
      'Beyond moving atop the La Liga table, the 3-2 victory serves as a statement of tactical maturity. Real Madrid absorbed the most aggressive high-line press in European football, diagnosed its structural vulnerability in real time, and executed a ruthless second-half dismantling.'
    ],
    authorRu: 'Артур Арутюнян',
    authorEn: 'Arthur Harutyunyan',
    authorRoleRu: 'Шеф тактического отдела',
    authorRoleEn: 'Chief Tactical Correspondent',
    publishedAtRu: '30 октября 2026, 23:15 МСК',
    publishedAtEn: 'October 30, 2026 • 20:15 UTC',
    publishedAtIso: '2026-10-30T20:15:00Z',
    readTimeMinutes: 6,
    imageUrl: 'https://a.espncdn.com/photo/2026/1030/r1738494_1296x729_16-9.jpg',
    imageCaptionRu:
      'Игроки «Реал Мадрид» празднуют решающий гол в ворота «Барселоны» на переполненном «Сантьяго Бернабеу». Фото: ESPN Images',
    imageCaptionEn:
      'Real Madrid players celebrate the decisive strike against Barcelona at a packed Santiago Bernabeu. Photo: ESPN Images',
    clubLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png',
    clubNameRu: 'Реал Мадрид',
    clubNameEn: 'Real Madrid',
    relatedMatchId: 'match-el-clasico',
    isLeadStory: true,
    isTrending: true,
    tagsRu: ['Ла Лига', 'Эль-Класико', 'Реал Мадрид', 'Килиан Мбаппе'],
    tagsEn: ['La Liga', 'El Clasico', 'Real Madrid', 'Kylian Mbappe'],
    keyTakeawaysRu: [
      'Стартовая точка рывков Мбаппе сместилась на 4 метра глубже после 25-й минуты',
      'Асимметричный ромб Анчелотти создал численный перевес 3-в-2 в полуфлангах',
      'Выход Луки Модрича на 68-й минуте обеспечил 94% точности передач в финальной трети'
    ],
    keyTakeawaysEn: [
      'Mbappe shifted his starting sprint zone 4 meters deeper after the 25th minute',
      'Ancelotti’s asymmetric diamond created 3v2 overloads in the half-spaces',
      'Luka Modric’s 68th-minute introduction produced 94% pass completion in the final third'
    ]
  },
  {
    id: 'art-2',
    slug: 'barcelona-lamine-yamal-hansi-flick-high-line-evolution',
    category: 'la-liga',
    categoryLabelRu: 'Ла Лига',
    categoryLabelEn: 'La Liga',
    titleRu:
      'Феномен Ламина Ямаля и вертикальный код Ханси Флика: почему новая «Барселона» стала самой зрелищной командой Европы',
    titleEn:
      'Lamine Yamal’s Gravity and Hansi Flick’s Vertical Code: Why This Barcelona Side Defines Modern Attacking Football',
    subtitleRu:
      'В свои неполные девятнадцать лет правый вингер каталонцев диктует темп позиционных атак, а его связка с Педри и Левандовски переписала рекорды результативности клуба за десятилетие.',
    subtitleEn:
      'At nineteen, Barcelona’s right-wing prodigy dictates the tempo of every attacking phase while his chemistry with Pedri and Lewandowski breaks decade-old scoring benchmarks.',
    bodyRu: [
      'Когда Ханси Флик возглавил «Барселону», скептики полагали, что его прямолинейный мюнхенский футбол войдет в противоречие с каталонской школой позиционного владения. Однако немецкий специалист не стал ломать ДНК «Ла Масии» — он ускорил ее метаболизм. Сегодня «Барселона» тратит в среднем на 3,4 секунды меньше на доставку мяча из центральной трети в штрафную площадь соперника, чем в любом из пяти предыдущих сезонов.',
      'Главным катализатором этой трансформации стал Ламин Ямаль. Если год назад его воспринимали как взрывного дриблера для ситуаций один в один на бровке, то в сезоне-2026/27 он превратился в полноценного плеймейкера правого полуфланга. Соперники вынуждены стягивать к его зоне крайнего защитника и левого центрального хавбека, что автоматически открывает разреженный коридор для подключений Жюля Кунде или рывков Педри.',
      'Статистика подтверждает визуальное доминирование: Ямаль лидирует в топ-5 европейских лиг по числу передач с продвижением под удар после ведения мяча. Его фирменный пас внешней стороной левой бутсы на дальнюю штангу, с которого Роберт Левандовски забивает с пугающей регулярностью, практически невозможно перекрыть без нарушения компактности внутри вратарской.',
      'Не менее важна его работа без мяча. В системе Флика первая волна контрпрессинга начинается мгновенно после потери, и Ямаль перекрывает линию продольного паса по флангу, вынуждая защитников выбивать мяч в борьбу в центральную зону, где дежурят Марк Касадо и Пау Кубарси. Именно эта синхронность позволяет каталонцам возвращать владение в течение пяти секунд в 62% случаев.',
      'Руководство клуба уже зафиксировало долгосрочный статус своего воспитанника контрактом с миллиардной суммой отступных, но истинная ценность Ямаля измеряется на газоне. Он вернул «Барселоне» ощущение неизбежности гола в каждой атаке — редкое качество, отличающее просто сильные команды от исторических династий.'
    ],
    bodyEn: [
      'When Hansi Flick arrived in Catalonia, critics wondered whether his relentless German verticality would clash with Barcelona’s positional orthodoxy. Instead of discarding La Masia principles, Flick supercharged their metabolism. On average, Barcelona now transition the ball from the middle third into the opposition penalty box 3.4 seconds faster than in any of the previous five campaigns.',
      'At the heart of this evolution stands Lamine Yamal. Once viewed primarily as an electric touchline dribbler in isolation, the teenager has matured into a complete right-channel orchestrator during the 2026/27 season. Opponents are forced to commit both a full-back and a shuttling midfielder to his zone, automatically opening interior lanes for Jules Kounde’s underlaps and Pedri’s late arrivals.',
      'The underlying metrics validate the eye test: Yamal leads Europe’s top five leagues in progressive carries leading directly to a shot-creating action. His trademark left-footed trivela delivery toward the back post—a pass Robert Lewandowski converts with ruthless regularity—has proven almost impossible for low blocks to defend without surrendering the penalty spot.',
      'Equally impressive is his discipline out of possession. Flick’s counter-pressing structure demands immediate engagement upon turnover, and Yamal consistently angles his recovery runs to close off the touchline outlet, funneling hurried clearances straight into Marc Casado and Pau Cubarsi.',
      'Having already secured his long-term future with a one-billion-euro release clause, Barcelona have built their tactical identity around his decision-making. Yamal has restored an unmistakable sense of inevitability to every Catalan attack.'
    ],
    authorRu: 'Дмитрий Навоша',
    authorEn: 'Dmitry Navosha',
    authorRoleRu: 'Обозреватель испанского футбола',
    authorRoleEn: 'Senior La Liga Writer',
    publishedAtRu: '30 октября 2026, 21:40 МСК',
    publishedAtEn: 'October 30, 2026 • 18:40 UTC',
    publishedAtIso: '2026-10-30T18:40:00Z',
    readTimeMinutes: 5,
    imageUrl: 'https://a.espncdn.com/photo/2026/1027/r1736915_1296x729_16-9.jpg',
    imageCaptionRu:
      'Ламин Ямаль и главный тренер «Барселоны» Ханси Флик после победного матча Ла Лиги. Фото: ESPN Images',
    imageCaptionEn:
      'Lamine Yamal and Barcelona head coach Hansi Flick embrace after a La Liga victory. Photo: ESPN Images',
    clubLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/83.png',
    clubNameRu: 'Барселона',
    clubNameEn: 'Barcelona',
    relatedMatchId: 'laliga-bar-atm',
    isLeadStory: false,
    isTrending: true,
    transferReliability: 100,
    transferSource: 'FC Barcelona Official • Contract Extension to 2031',
    tagsRu: ['Барселона', 'Ламин Ямаль', 'Ханси Флик', 'Ла Лига'],
    tagsEn: ['Barcelona', 'Lamine Yamal', 'Hansi Flick', 'La Liga']
  },
  {
    id: 'art-3',
    slug: 'trent-alexander-arnold-real-madrid-liverpool-contract-dossier',
    category: 'transfers',
    categoryLabelRu: 'Трансферы',
    categoryLabelEn: 'Transfers',
    titleRu:
      'Мадридский гамбит вокруг Трента Александер-Арнольда: закрытые детали переговоров между «Ливерпулем» и «Реалом»',
    titleEn:
      'The Trent Alexander-Arnold Dossier: Inside Real Madrid’s Pursuit and Liverpool’s Contract Stand-Off',
    subtitleRu:
      'Скаутский департамент «Сантьяго Бернабеу» видит в вице-капитане мерсисайдцев фундаментального плеймейкера на правом фланге обороны на ближайшее десятилетие.',
    subtitleEn:
      'Real Madrid’s recruitment hierarchy have identified Liverpool’s vice-captain as their generational right-sided playmaker, setting up Europe’s most high-stakes negotiation.',
    bodyRu: [
      'В современных трансферных кампаниях «Реал Мадрид» действует по выверенному шаблону, который в европейских футбольных кругах давно называют стратегией долгосрочного убеждения. Так в Мадрид переезжали Давид Алаба, Антонио Рюдигер и Килиан Мбаппе. Теперь на вершине приоритетного списка Флорентино Переса и Хосе Анхеля Санчеса находится Трент Александер-Арнольд — игрок, чья уникальная пасовая культура не имеет прямых аналогов среди правых защитников мирового футбола.',
      'Для «Ливерпуля» ситуация осложняется необходимостью удерживать строгий баланс зарплатной ведомости, выстроенный спортивным директором Ричардом Хьюзом и главой футбольного направления FSG Майклом Эдвардсом. На «Энфилде» готовы предложить воспитаннику клуба статус одного из самых высокооплачиваемых футболистов Премьер-лиги, однако принципиальная позиция руководства исключает нарушение внутренней финансовой иерархии.',
      'При Арне Слоте тактическая роль Александер-Арнольда претерпела тонкую, но важную эволюцию. Вместо постоянных смещений в центральный круг, которые иногда оставляли Ибраиму Конате один на один с быстрыми вингерами на широком пространстве, Трент теперь выбирает момент для инверсии гораздо избирательнее. Его показатели оборонительных единоборств выросли на 18%, при этом он по-прежнему отдает свыше семи длинных передач в финальную треть за девяносто минут.',
      'В Мадриде прекрасно понимают, какой эффект даст появление англичанина рядом с его близким другом Джудом Беллингемом и реактивными форвардами Винисиусом и Мбаппе. Способность Александер-Арнольда запускать диагональ на шестьдесят метров первым касанием после подбора у своей штрафной способна превратить любой угловой у ворот «Реала» в выход один на один через четыре секунды.',
      'По информации источников, близких к переговорному процессу, окончательное решение будет принято самим игроком на основании спортивного проекта и личных амбиций. Пока «Ливерпуль» сражается за титул АПЛ и лидирует в Лиге чемпионов, Трент сохраняет полное молчание в прессе, позволяя своей игре на поле служить главным аргументом за переговорным столом.'
    ],
    bodyEn: [
      'Real Madrid’s modern recruitment model operates with patient, surgical precision—a long-horizon courtship that previously delivered David Alaba, Antonio Rudiger, and Kylian Mbappe to the Spanish capital. Now, Florentino Perez and chief executive Jose Angel Sanchez have placed Trent Alexander-Arnold at the summit of their strategic shortlist, viewing the England international as a generational right-sided quarterback.',
      'For Liverpool, the negotiations test the disciplined wage architecture overseen by sporting director Richard Hughes and FSG football chief Michael Edwards. Anfield’s hierarchy have tabled a lucrative package that would place their academy graduate among the Premier League’s elite earners, yet they remain determined not to fracture the club’s carefully calibrated salary structure.',
      'Under Arne Slot, Alexander-Arnold’s on-pitch role has undergone a subtle refinement. Rather than inverting into central midfield on every possession—a pattern that occasionally left Ibrahima Konate exposed in wide channels—he now picks his moments with greater defensive pragmatism. His one-on-one duel success rate has climbed by 18% this term while maintaining over seven progressive passes into the final third per ninety minutes.',
      'Madrid’s technical staff salivate at the prospect of pairing Alexander-Arnold’s laser-guided sixty-yard diagonals with the transition speed of Vinicius Junior and Kylian Mbappe, alongside close friend Jude Bellingham. His ability to turn a defensive clearance into a goalscoring opportunity with a single first-time pass fits Madrid’s vertical DNA.',
      'Sources briefed on the talks indicate that the decisive factor will be sporting legacy rather than marginal financial differences. With Liverpool competing at the summit of both the Premier League and Champions League, Alexander-Arnold has kept public counsel, letting his performances dictate the leverage.'
    ],
    authorRu: 'Кирилл Хаит',
    authorEn: 'Kirill Khait',
    authorRoleRu: 'Инсайдер трансферного рынка',
    authorRoleEn: 'European Transfer Correspondent',
    publishedAtRu: '30 октября 2026, 20:10 МСК',
    publishedAtEn: 'October 30, 2026 • 17:10 UTC',
    publishedAtIso: '2026-10-30T17:10:00Z',
    readTimeMinutes: 5,
    imageUrl: 'https://a.espncdn.com/photo/2026/1030/r1738704_1296x729_16-9.jpg',
    imageCaptionRu:
      'Трент Александер-Арнольд остается ключевой фигурой на трансферном рынке между «Ливерпулем» и «Реалом». Фото: ESPN Images',
    imageCaptionEn:
      'Trent Alexander-Arnold remains at the center of high-stakes talks between Liverpool and Real Madrid. Photo: ESPN Images',
    clubLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/364.png',
    clubNameRu: 'Ливерпуль',
    clubNameEn: 'Liverpool',
    relatedMatchId: 'epl-ars-liv',
    isLeadStory: false,
    isTrending: true,
    transferReliability: 90,
    transferSource: 'The Athletic / David Ornstein',
    tagsRu: ['Трансферы', 'Ливерпуль', 'Реал Мадрид', 'Трент Александер-Арнольд'],
    tagsEn: ['Transfers', 'Liverpool', 'Real Madrid', 'Trent Alexander-Arnold']
  },
  {
    id: 'art-4',
    slug: 'man-city-bayern-munich-champions-league-tactical-blueprint',
    category: 'ucl',
    categoryLabelRu: 'Лига чемпионов',
    categoryLabelEn: 'Champions League',
    titleRu:
      'Гибридные защитники и контроль полуфлангов: тактическая дуэль идей Гвардиолы и Компани в Лиге чемпионов',
    titleEn:
      'Hybrid Centre-Backs and Half-Space Overloads: Guardiola and Kompany’s Champions League Chess Match',
    subtitleRu:
      'Как «Манчестер Сити» и «Бавария» синхронно переосмыслили построение игры в первой фазе билд-апа ради взлома элитных оборонительных блоков УЕФА.',
    subtitleEn:
      'How Manchester City and Bayern Munich have re-engineered first-phase build-up and rest-defense structures to suffocate elite European opposition.',
    bodyRu: [
      'Обновленный формат общего этапа Лиги чемпионов УЕФА заставил топ-клубы отказаться от осторожного распределения сил по дистанции осени. Каждая разница забитых и пропущенных мячей влияет на прямой выход в 1/8 финала, и именно поэтому «Манчестер Сити» Пепа Гвардиолы и «Бавария» Венсана Компани довели интенсивность своего позиционного давления до исторического максимума.',
      'Идейное родство учителя и ученика прослеживается в том, как обе команды используют профильных центральных защитников во второй и третьей фазах владения. У Гвардиолы Йошко Гвардиол и Мануэль Аканджи регулярно поднимаются в опорную зону или даже на границу чужой штрафной, создавая перегруз 5-в-4 против полузащиты соперника. В Мюнхене аналогичную функцию выполняют Дайо Упамекано и Ким Мин Чжэ, которые начинают атаки на десять метров выше, чем в прошлые сезоны.',
      'Главный риск подобной структуры заключается в уязвимости при потере мяча и встречных передачах за спину. Чтобы компенсировать это, Компани внедрил систему агрессивной подстраховки с участием Альфонсо Дэвиса и Йозуа Киммиха, который действует как глубинный диспетчер-волнорез. Как только «Бавария» теряет мяч в финальной трети, ближайшие три игрока смыкают кольцо вокруг принимающего хавбека в течение двух секунд.',
      'У «Манчестер Сити» акцент сместился на длительный гипнотический контроль через короткие треугольники на флангах с участием Бернарду Силвы, Савиньо и Фила Фодена. Выманивая соперника на один край поля, «горожане» мгновенно переводят вектор атаки в противоположный полуфланг, где защитник остается без подстраховки в изоляции.',
      'Очные и заочные столкновения этих систем в текущем розыгрыше Лиги чемпионов демонстрируют, куда движется тактическая мысль десятилетия: границы между амплуа защитника и полузащитника окончательно стерты, а ключевым навыком элитного футболиста становится скорость принятия решений под давлением в ограниченном коридоре.'
    ],
    bodyEn: [
      'The revamped Champions League league phase has eliminated any margin for autumn complacency. With goal difference directly dictating top-eight seeding, both Pep Guardiola’s Manchester City and Vincent Kompany’s Bayern Munich have ratcheted their positional aggression to unprecedented heights.',
      'The ideological lineage between mentor and former captain is clearest in how both sides deploy centre-backs during second-phase progression. For City, Josko Gvardiol and Manuel Akanji routinely step into the attacking half-spaces to manufacture five-against-four midfield superiorities. In Munich, Dayot Upamecano and Kim Min-jae initiate build-up play a full ten meters higher up the pitch than in previous campaigns.',
      'Such extreme territorial compression naturally invites counter-attacking danger in behind. Kompany mitigates this exposure through ferocious rest-defense coordination anchored by Joshua Kimmich and Alphonso Davies’s recovery speed. Whenever possession is lost inside the final third, three Bayern players immediately collapse the passing angles around the ball-carrier within two seconds.',
      'Manchester City, meanwhile, rely on hypnotic lateral circulation involving Bernardo Silva, Savinho, and Phil Foden to magnetize defensive blocks toward one touchline before switching play rapidly to the weak-side channel.',
      'Across Europe’s premier competition, both blueprints illustrate the defining tactical trend of the era: positional labels have dissolved into fluid spatial responsibilities, where centre-backs must pass like playmakers and forwards must press like midfielders.'
    ],
    authorRu: 'Вадим Лукомский',
    authorEn: 'Vadim Lukomskiy',
    authorRoleRu: 'Тактический аналитик',
    authorRoleEn: 'Lead Tactical Analyst',
    publishedAtRu: '30 октября 2026, 19:05 МСК',
    publishedAtEn: 'October 30, 2026 • 16:05 UTC',
    publishedAtIso: '2026-10-30T16:05:00Z',
    readTimeMinutes: 7,
    imageUrl: 'https://a.espncdn.com/photo/2026/1029/r1738028_1296x729_16-9.jpg',
    imageCaptionRu:
      'Интенсивная борьба в матче Лиги чемпионов УЕФА с участием грандов европейского футбола. Фото: ESPN Images',
    imageCaptionEn:
      'High-intensity midfield duel during Champions League league-phase action. Photo: ESPN Images',
    clubLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/382.png',
    clubNameRu: 'Манчестер Сити',
    clubNameEn: 'Manchester City',
    relatedMatchId: 'ucl-rma-mci',
    isLeadStory: false,
    isTrending: true,
    tagsRu: ['Лига чемпионов', 'Манчестер Сити', 'Бавария', 'Тактика'],
    tagsEn: ['Champions League', 'Manchester City', 'Bayern Munich', 'Tactics']
  },
  {
    id: 'art-5',
    slug: 'achraf-hakimi-hat-trick-psg-luis-enrique-positional-freedom',
    category: 'tactics',
    categoryLabelRu: 'Тактика',
    categoryLabelEn: 'Tactics',
    titleRu:
      'Бенефис Ашрафа Хакими в системе Луиса Энрике: как правый латераль «ПСЖ» превратился в скрытую «десятку»',
    titleEn:
      'Achraf Hakimi’s Positional Liberation: How Luis Enrique Transformed PSG’s Right-Back Into an Auxiliary Number Ten',
    subtitleRu:
      'Свобода перемещений между флангом и центром штрафной позволила марокканцу выдать самый результативный отрезок в профессиональной карьере.',
    subtitleEn:
      'Freed to roam from the touchline into the penalty spot, the Moroccan defender is producing the most prolific attacking numbers of his career in Paris.',
    bodyRu: [
      'Традиционное представление о крайнем защитнике предполагает выбор между двумя ролями: либо классический бегунок по бровке, снабжающий штрафную кроссами, либо ложный фулбек, смещающийся в опорную зону для помощи при розыгрыше мяча. В «Пари Сен-Жермен» Луис Энрике предложил Ашрафу Хакими третий, куда более радикальный маршрут — вертикальное вторжение напрямую в зону завершения атак.',
      'В последних матчах парижан тепловая карта Хакими больше напоминает профиль атакующего инсайда или второго темпа нападения. Когда Усман Дембеле или Ли Кан Ин прижимаются к боковой линии на правом крыле, растягивая оборону соперника по ширине, Хакими не остается сзади для страховки, а совершает взрывной рывок по внутреннему коридору между центральным и крайним защитниками.',
      'Баланс этой конструкции обеспечивается за счет работы Жоау Невеша и Витиньи. Португальский дуэт полузащитников настолько тонко читает моменты подключений марокканца, что при каждом его рывке вперед один из хавбеков автоматически опускается в правый полуфланг обороны, формируя тройку с Маркиньосом и Виллианом Пачо. Благодаря этому «ПСЖ» не теряет структурной надежности при потере мяча.',
      'Итогом такой тактической свободы стал исторический перформанс Хакими, завершившийся разгромом соперника и феноменальной реализацией моментов из пределов штрафной площади. Марокканец наносит удары из убойных позиций на скорости, когда защитники просто не успевают переключить внимание с Брэдли Баркола на врывающегося из глубины латераля.',
      'В преддверии ключевого противостояния Лиги чемпионов против мюнхенской «Баварии» именно непредсказуемость Хакими становится главным козырем Луиса Энрике. Обороняться против игрока, который начинает эпизод у своей угловой отметки, а завершает его ударом в касание с одиннадцатиметровой точки, — задача, не имеющая простых решений.'
    ],
    bodyEn: [
      'Modern tactical orthodoxy typically assigns full-backs to one of two archetypes: the overlapping touchline runner who supplies crosses, or the inverted defender who steps alongside the holding midfielder during build-up. At Paris Saint-Germain, Luis Enrique has designed a third, far more audacious pathway for Achraf Hakimi—direct vertical infiltration into the number-ten and striker zones.',
      'Across PSG’s recent fixtures, Hakimi’s touch map resembles that of an inside forward rather than a defender. Whenever Ousmane Dembele or Lee Kang-in hugs the right chalk to pin the opposition full-back wide, Hakimi eschews conservative support play and instead launches a blind-side sprint through the interior channel directly into the penalty area.',
      'This structural freedom is underwritten by the tactical intelligence of Joao Neves and Vitinha. As soon as Hakimi vacates his defensive station, one of the Portuguese midfielders seamlessly drops into the right-back slot alongside Marquinhos and Willian Pacho, preserving a three-plus-one rest-defense shield against counter-attacks.',
      'The payoff has been spectacular: Hakimi is arriving unmarked inside the eighteen-yard box at full speed, converting cutbacks and rebounds while opposing centre-backs remain preoccupied with Bradley Barcola’s movement on the far side.',
      'Ahead of PSG’s marquee Champions League showdown with Bayern Munich, Hakimi’s hybrid role represents Luis Enrique’s most potent tactical weapon—a defender who begins phases in his own third and finishes them like a centre-forward.'
    ],
    authorRu: 'Артур Арутюнян',
    authorEn: 'Arthur Harutyunyan',
    authorRoleRu: 'Шеф тактического отдела',
    authorRoleEn: 'Chief Tactical Correspondent',
    publishedAtRu: '30 октября 2026, 18:20 МСК',
    publishedAtEn: 'October 30, 2026 • 15:20 UTC',
    publishedAtIso: '2026-10-30T15:20:00Z',
    readTimeMinutes: 5,
    imageUrl: 'https://a.espncdn.com/photo/2026/1030/r1738690_1296x729_16-9.jpg',
    imageCaptionRu:
      'Ашраф Хакими празднует взятие ворот после стремительного подключения в штрафную соперника. Фото: ESPN Images',
    imageCaptionEn:
      'Achraf Hakimi celebrates after surging into the penalty box to score for Paris Saint-Germain. Photo: ESPN Images',
    clubLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/160.png',
    clubNameRu: 'ПСЖ',
    clubNameEn: 'Paris Saint-Germain',
    relatedMatchId: 'ucl-bay-psg',
    isLeadStory: false,
    isTrending: false,
    tagsRu: ['Тактика', 'ПСЖ', 'Ашраф Хакими', 'Луис Энрике'],
    tagsEn: ['Tactics', 'PSG', 'Achraf Hakimi', 'Luis Enrique']
  },
  {
    id: 'art-6',
    slug: 'virgil-van-dijk-liverpool-arsenal-title-statement',
    category: 'epl',
    categoryLabelRu: 'Премьер-лига',
    categoryLabelEn: 'Premier League',
    titleRu:
      'Верховая гегемония Вирджила ван Дейка и хладнокровие Арне Слота: как «Ливерпуль» выдержал шторм на «Эмирейтс»',
    titleEn:
      'Virgil van Dijk’s Aerial Command and Arne Slot’s Composure: How Liverpool Weathered the Emirates Storm',
    subtitleRu:
      'Капитан мерсисайдцев не только сравнял счет после эталонного розыгрыша углового, но и организовал оборону во втором тайме против позиционного натиска «Арсенала».',
    subtitleEn:
      'Liverpool’s captain struck from a rehearsed corner routine before marshaling a resolute second-half defensive line against Mikel Arteta’s title contenders.',
    bodyRu: [
      'Выезд на «Эмирейтс» против «Арсенала» Микеля Артеты традиционно считается самым жестким тестом на физическую и ментальную устойчивость в английской Премьер-лиге. Лондонцы превратили стандартные положения и прессинг в первой трети поля в настоящее искусство, и быстрый гол Букайо Сака в дебюте встречи грозил перевести игру в сценарий, полностью удобный хозяевам.',
      'Именно в этот момент проявился масштаб личности Вирджила ван Дейка. Голландский капитан «Ливерпуля» ответил оружием самого «Арсенала»: на 24-й минуте после подачи Трента Александер-Арнольда от углового флажка и скидки на ближней штанге ван Дейк продавил опекуна во вратарской и отправил мяч в сетку. Этот гол стал для него уже двадцать пятым в рамках АПЛ с момента дебюта за мерсисайдский клуб.',
      'Помимо угрозы у чужих ворот, ван Дейк провел безупречную партию в управлении высотой оборонительной линии. Когда во втором тайме Арне Слот перестроил команду с 4-2-3-1 на более компактные 4-4-2 в среднем блоке, капитан выиграл семь из семи верховых единоборств и пять раз перехватывал проникающие передачи Мартина Эдегора на Кая Хаверца.',
      'Решающий вклад во второй половине встречи внесла и глубина скамейки «Ливерпуля». Спокойный розыгрыш мяча через Райана Гравенберха позволил гостям выманить прессинг «канониров» и провести образцовую вертикальную атаку в три паса, которую точным ударом в ближний угол завершил Мохамед Салах после паса Дарвина Нуньеса.',
      'Боевая ничья 2:2 на поле прямого конкурента сохранила за «Ливерпулем» стратегическое лидерство в таблице Премьер-лиги. Команда Арне Слота доказала, что сочетает прежнюю эмоциональную мощь эпохи Юргена Клоппа с новым уровнем прагматичного контроля ритма.'
    ],
    bodyEn: [
      'An away trip to the Emirates Stadium against Mikel Arteta’s Arsenal has become the ultimate examination of physical and psychological resilience in the Premier League. Arsenal’s mastery of set-pieces and territorial suffocation regularly overwhelms visitors, and Bukayo Saka’s early opener threatened to tilt the contest firmly in North London’s favor.',
      'That was the cue for Virgil van Dijk to impose his authority. Liverpool’s captain answered Arsenal with their own weapon of choice in the 24th minute: attacking an inswinging Trent Alexander-Arnold corner after a near-post flick, the Dutchman towered above his marker inside the six-yard box to nod home the equalizer—his 25th Premier League goal since arriving at Anfield.',
      'Beyond his impact in the opposition penalty area, van Dijk delivered a masterclass in defensive line management. As Arne Slot adjusted Liverpool’s shape into a compact mid-block during the second half, the 35-year-old won all seven of his aerial duels and repeatedly stepped in to intercept Martin Odegaard’s disguised through-balls toward Kai Havertz.',
      'Liverpool’s composure in possession eventually unlocked Arsenal’s high press for the second equalizer. Ryan Gravenberch’s press-resistant turn in midfield triggered a rapid three-pass vertical sequence, allowing Darwin Nunez to square unselfishly for Mohamed Salah to slot home with trademark precision.',
      'Leaving North London with a hard-earned 2-2 draw preserves Liverpool’s spot at the Premier League summit. More importantly, Slot’s side demonstrated that they have married the emotional intensity of the Jurgen Klopp era with a calmer, more calculated command of game state.'
    ],
    authorRu: 'Денис Пузырев',
    authorEn: 'Denis Puzyrev',
    authorRoleRu: 'Обозреватель АПЛ',
    authorRoleEn: 'Premier League Correspondent',
    publishedAtRu: '30 октября 2026, 22:30 МСК',
    publishedAtEn: 'October 30, 2026 • 19:30 UTC',
    publishedAtIso: '2026-10-30T19:30:00Z',
    readTimeMinutes: 5,
    imageUrl: 'https://a.espncdn.com/photo/2026/1030/r1738605_1296x729_16-9.jpg',
    imageCaptionRu:
      'Вирджил ван Дейк празднует гол головой в ворота лондонского «Арсенала» на стадионе «Эмирейтс». Фото: ESPN Images',
    imageCaptionEn:
      'Virgil van Dijk celebrates his headed goal against Arsenal at the Emirates Stadium. Photo: ESPN Images',
    clubLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/364.png',
    clubNameRu: 'Ливерпуль',
    clubNameEn: 'Liverpool',
    relatedMatchId: 'epl-ars-liv',
    isLeadStory: false,
    isTrending: true,
    tagsRu: ['Премьер-лига', 'Ливерпуль', 'Арсенал', 'Вирджил ван Дейк'],
    tagsEn: ['Premier League', 'Liverpool', 'Arsenal', 'Virgil van Dijk']
  },
  {
    id: 'art-7',
    slug: 'harry-kane-gerd-muller-trophy-bayern-scoring-evolution',
    category: 'ucl',
    categoryLabelRu: 'Лига чемпионов',
    categoryLabelEn: 'Champions League',
    titleRu:
      'Трофей Герда Мюллера и эволюция Гарри Кейна: как английский снайпер стал главным диспетчером атак «Баварии»',
    titleEn:
      'The Gerd Muller Trophy and Harry Kane’s Evolution: Inside Bayern Munich’s Complete Number Nine',
    subtitleRu:
      'Завоевав награду лучшему бомбардиру сезона, форвард мюнхенцев продолжает совмещать феноменальную реализацию с ролью глубинного плеймейкера для Мусиалы и Олисе.',
    subtitleEn:
      'Fresh off claiming European football’s top scorer prize, the England captain is pairing ruthless penalty-box efficiency with quarterback playmaking for Jamal Musiala and Michael Olise.',
    bodyRu: [
      'Получение трофея Герда Мюллера на парижской церемонии «Золотого мяча» стало для Гарри Кейна символичным признанием: переезд в Мюнхен окончательно утвердил его в статусе самого стабильного центрфорварда планеты. Однако свести вклад англичанина в игру нынешней «Баварии» исключительно к голам значило бы упустить половину картины.',
      'В системе Венсана Компани Кейн наделен правом свободно опускаться в зону между линиями полузащиты и обороны соперника. Как только центральные защитники оппонента делают шаг за ним в глубину, в освободившийся коридор синхронно врываются Джамал Мусиала и Майкл Олисе. Если же защитники остаются на своих позициях, Кейн получает две секунды на подготовку фирменной радиоуправляемой диагонали на фланг.',
      'Цифры текущего сезона впечатляют даже по меркам Бундеслиги и Лиги чемпионов: Кейн реализует 31% всех своих ударов по воротам, превышая модель ожидаемых голов (xG) почти на шесть пунктов. При этом в его активе уже двузначное число предголевых передач, которые запускают быстрые атаки мюнхенцев после перехватов в центральном круге.',
      'Особую роль капитан сборной Англии играет при розыгрыше стандартных положений и пенальти. Его серия реализованных одиннадцатиметровых ударов остается эталоном биомеханики и психологии: Кейн меняет угол и высоту удара в зависимости от движения опорной ноги вратаря в последний момент перед контактом с мячом.',
      'Перед домашним матчем Лиги чемпионов против «Пари Сен-Жермен» на «Альянц Арене» именно связка Кейна и Мусиалы выглядит главным аргументом немецкого гранда. Для игрока, всю карьеру шедшего к главным европейским титулам, нынешняя весна должна стать кульминацией его мюнхенской главы.'
    ],
    bodyEn: [
      'Lifting the Gerd Muller Trophy at the Ballon d’Or ceremony in Paris offered formal recognition of a truth long evident across Europe: moving to Bayern Munich has cemented Harry Kane as the continent’s most complete centre-forward. Yet reducing the England captain’s influence solely to his goal tally misses half of his tactical value.',
      'Within Vincent Kompany’s fluid attacking framework, Kane holds a license to drop into the pocket between the opposition’s midfield and defensive lines. Whenever a centre-back follows him into midfield, Jamal Musiala and Michael Olise immediately dart into the vacated space in behind; if defenders hold their ground, Kane has time to turn and spray pinpoint diagonals toward the flanks.',
      'His efficiency metrics this season remain extraordinary across both the Bundesliga and Champions League, converting 31% of his total shots and outperforming his expected goals model by nearly six full strikes while ranking among the squad’s leaders in shot-creating passes.',
      'Equally decisive is his mastery of dead-ball situations and penalty kicks. Kane’s unbroken streak from twelve yards remains a study in biomechanical repeatability and psychological composure, reading the goalkeeper’s plant foot milliseconds before striking.',
      'With Paris Saint-Germain visiting the Allianz Arena in Champions League action, the telepathic partnership between Kane and Musiala stands as Bayern’s premier weapon in their pursuit of European silverware.'
    ],
    authorRu: 'Станислав Рынкевич',
    authorEn: 'Stanislav Rynkevich',
    authorRoleRu: 'Международный обозреватель',
    authorRoleEn: 'International Football Writer',
    publishedAtRu: '30 октября 2026, 17:15 МСК',
    publishedAtEn: 'October 30, 2026 • 14:15 UTC',
    publishedAtIso: '2026-10-30T14:15:00Z',
    readTimeMinutes: 5,
    imageUrl: 'https://a.espncdn.com/photo/2026/1026/r1736765_3_1296x729_16-9.jpg',
    imageCaptionRu:
      'Форвард «Баварии» Гарри Кейн с трофеем Герда Мюллера лучшему бомбардиру сезона. Фото: ESPN Images',
    imageCaptionEn:
      'Bayern Munich striker Harry Kane poses with the Gerd Muller Trophy as Europe’s top goalscorer. Photo: ESPN Images',
    clubLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/132.png',
    clubNameRu: 'Бавария',
    clubNameEn: 'Bayern Munich',
    relatedMatchId: 'ucl-bay-psg',
    isLeadStory: false,
    isTrending: false,
    tagsRu: ['Лига чемпионов', 'Бавария', 'Гарри Кейн', 'Золотой мяч'],
    tagsEn: ['Champions League', 'Bayern Munich', 'Harry Kane', 'Ballon d’Or']
  },
  {
    id: 'art-8',
    slug: 'christian-pulisic-ac-milan-contract-extension-serie-a',
    category: 'serie-a',
    categoryLabelRu: 'Серия А',
    categoryLabelEn: 'Serie A',
    titleRu:
      'Американский мотор «Сан-Сиро»: почему Кристиан Пулишич стал самым незаменимым игроком атаки «Милана» и продлевает контракт',
    titleEn:
      'San Siro’s American Catalyst: Why Christian Pulisic Earned AC Milan’s Cornerstone Contract Extension',
    subtitleRu:
      'Переехав в Италию, лидер сборной США обрел стабильность мирового класса, лидируя в Серии А по числу результативных действий за два последних сезона.',
    subtitleEn:
      'Since arriving in Lombardy, the USMNT captain has delivered relentless end-product across Serie A and Europe, prompting the Rossoneri to lock in his long-term future.',
    bodyRu: [
      'Когда летом 2023 года «Милан» оформлял трансфер Кристиана Пулишича из лондонского «Челси» за двадцать миллионов евро, сделку рассматривали как осторожную ставку на перезагрузку талантливого, но подверженного травмам вингера. Три года спустя этот переход по праву называют одной из самых эффективных инвестиций современного итальянского футбола.',
      'В Серии А Пулишич нашел идеальный баланс между тактической дисциплиной и свободой творчества. Способный одинаково продуктивно действовать как на правом крыле атаки, так и на позиции центральной «десятки» под нападающим, американец стал главным связующим звеном между полузащитой Тиджани Рейндерса и взрывным левым флангом Рафаэла Леау.',
      'В отличие от многих техничных фланговых игроков, Пулишич берет не количеством финтов ради финтов, а идеальным таймингом врываний во вратарскую площадь без мяча. Его умение завершать прострелы в одно касание как правой, так и левой ногой принесло «россонери» десятки победных очков в самых вязких матчах против закрытых оборонительных схем 3-5-2.',
      'Неудивительно, что руководство «Милана» во главе со Златаном Ибрагимовичем и Джеффри Монкадой инициировало досрочное продление соглашения с 28-летним футболистом до 2029 года с существенным повышением оклада. Клуб стремится оградить своего лидера от предметного интереса со стороны представителей английской Премьер-лиги.',
      'Для самого Пулишича «Милан» стал настоящим футбольным домом: регулярная игровая практика, доверие медицинского штаба и статус любимца трибун «Сан-Сиро» вывели капитана сборной США на пик его профессиональной зрелости.'
    ],
    bodyEn: [
      'When AC Milan acquired Christian Pulisic from Chelsea for twenty million euros in the summer of 2023, the move was widely framed as a calculated gamble on a gifted but injury-disrupted winger. Three years on, the signing stands as one of the shrewdest pieces of recruitment in modern Serie A history.',
      'In Italian football, Pulisic discovered the ideal equilibrium between tactical structure and creative autonomy. Equally decisive operating off the right touchline or as a central attacking midfielder behind the striker, the American international has become the connective tissue linking Tijjani Reijnders’s midfield progression with Rafael Leao’s transition threat.',
      'Unlike touchline wingers who rely on high-volume dribbling in low-value zones, Pulisic excels through his off-ball timing inside the penalty box. His knack for arriving at the back post to finish with either foot has repeatedly unlocked stubborn Serie A five-man defensive lines.',
      'Recognizing his irreplaceable output, Milan’s sporting leadership—spearheaded by Zlatan Ibrahimovic and Geoffrey Moncada—moved proactively to finalize a contract extension through 2029 on upgraded terms, warding off renewed interest from Premier League clubs.',
      'For Pulisic, San Siro has provided the continuity and medical stability that eluded him in London, elevating the USMNT captain into the prime years of his European career.'
    ],
    authorRu: 'Алексей Логинов',
    authorEn: 'Alexey Loginov',
    authorRoleRu: 'Шеф отдела итальянского футбола',
    authorRoleEn: 'Serie A Bureau Chief',
    publishedAtRu: '29 октября 2026, 21:00 МСК',
    publishedAtEn: 'October 29, 2026 • 18:00 UTC',
    publishedAtIso: '2026-10-29T18:00:00Z',
    readTimeMinutes: 4,
    imageUrl: 'https://a.espncdn.com/photo/2026/1028/r1737505_1296x729_16-9.jpg',
    imageCaptionRu:
      'Полузащитник «Милана» Кристиан Пулишич во время матча итальянской Серии А на «Сан-Сиро». Фото: ESPN Images',
    imageCaptionEn:
      'AC Milan attacker Christian Pulisic in Serie A action at San Siro. Photo: ESPN Images',
    clubLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/103.png',
    clubNameRu: 'Милан',
    clubNameEn: 'AC Milan',
    relatedMatchId: 'seriea-int-juv',
    isLeadStory: false,
    isTrending: false,
    transferReliability: 100,
    transferSource: 'AC Milan Official / Fabrizio Romano',
    tagsRu: ['Серия А', 'Милан', 'Кристиан Пулишич', 'Контракты'],
    tagsEn: ['Serie A', 'AC Milan', 'Christian Pulisic', 'Contracts']
  },
  {
    id: 'art-9',
    slug: 'inter-ac-milan-new-725m-san-siro-stadium-project',
    category: 'serie-a',
    categoryLabelRu: 'Серия А',
    categoryLabelEn: 'Serie A',
    titleRu:
      'Мегапроект на 725 миллионов долларов: как «Интер» и «Милан» строят новый стадион рядом с «Сан-Сиро» ради финансового рывка',
    titleEn:
      'Inside the $725 Million San Siro Successor: How Inter and AC Milan Plan to Close Europe’s Stadium Revenue Gap',
    subtitleRu:
      'Два миланских гранда вернулись к концепции совместной ультрасовременной арены на 71 500 зрителей, чтобы удвоить доходы в день матча.',
    subtitleEn:
      'After years of bureaucratic gridlock, both Milanese giants have aligned behind a shared 71,500-seat arena designed to double matchday commercial income.',
    bodyRu: [
      'Легендарный стадион «Джузеппе Меацца» в районе Сан-Сиро остается одним из главных архитектурных памятников мирового футбола, однако с точки зрения современной спортивной экономики бетонный исполин прошлого века давно превратился в тормоз для развития «Интера» и «Милана». Пока мадридский «Реал» и лондонский «Тоттенхэм» зарабатывают свыше 150 миллионов евро за сезон на коммерческой эксплуатации своих арен, миланские клубы получают почти вдвое меньше.',
      'После долгих лет бюрократических споров с муниципалитетом и изучения загородных участков в Сан-Донато и Роццано владельцы обоих клубов — американские инвестиционные фонды Oaktree Capital и RedBird Capital — официально объединили усилия вокруг проекта строительства нового стадиона стоимостью 725 миллионов долларов непосредственно на территории парковочного кластера рядом с нынешним «Сан-Сиро».',
      'Согласно представленной финансовой модели, новая арена вместимостью 71 500 зрителей будет включать более двенадцати тысяч мест категории корпоративного гостеприимства и VIP-лож, а также круглогодичный музейно-торговый комплекс, способный генерировать выручку 365 дней в году вне зависимости от календаря матчей Серии А.',
      'Архитектурный план предусматривает частичное сохранение исторического наследия старого стадиона и его трансформацию в общественное спортивное пространство и парковую зону, что позволило снять главные возражения городского совета Милана и комиссии по охране памятников архитектуры.',
      'Для итальянского футбола реализация этого проекта станет переломным моментом. Выход «Интера» и «Милана» на уровень коммерческих доходов свыше 130 миллионов евро с арены позволит обоим клубам на равных конкурировать с грандами АПЛ за звезд первой величины без вынужденных продаж лидеров каждое лето.'
    ],
    bodyEn: [
      'The Stadio Giuseppe Meazza remains one of world football’s most atmospheric cathedrals, yet in the cold ledger of modern sports finance, its aging concrete bowls have long constrained both Inter and AC Milan. While Real Madrid and Tottenham Hotspur generate well over 150 million euros annually from multipurpose stadium operations, the two Milanese giants collect barely half that sum.',
      'After years of municipal deadlock and parallel feasibility studies in suburban San Donato and Rozzano, ownership groups Oaktree Capital and RedBird Capital have formally united behind a $725 million blueprint to construct a state-of-the-art 71,500-seat stadium directly adjacent to the existing San Siro footprint.',
      'Financial projections submitted to city authorities outline how expanding corporate hospitality inventory to more than twelve thousand premium seats—paired with a 365-day retail, museum, and entertainment district—will more than double annual matchday revenue for each club.',
      'Crucially, the revised masterplan preserves key structural heritage elements of the historic Meazza site, repurposing the surrounding precinct into green parkland and community sports facilities to satisfy heritage regulators and Milan’s city council.',
      'For Serie A as a whole, breaking ground represents an existential leap forward. Unlocking over 130 million euros per season in stadium income will allow Inter and Milan to retain elite talent and compete directly with Premier League heavyweights in the transfer market.'
    ],
    authorRu: 'Алексей Логинов',
    authorEn: 'Alexey Loginov',
    authorRoleRu: 'Шеф отдела итальянского футбола',
    authorRoleEn: 'Serie A Bureau Chief',
    publishedAtRu: '29 октября 2026, 16:45 МСК',
    publishedAtEn: 'October 29, 2026 • 13:45 UTC',
    publishedAtIso: '2026-10-29T13:45:00Z',
    readTimeMinutes: 6,
    imageUrl: 'https://a.espncdn.com/photo/2026/1029/r1738250_1296x729_16-9.jpg',
    imageCaptionRu:
      'Панорама стадиона «Сан-Сиро» в Милане, рядом с которым «Интер» и «Милан» возведут новую арену за $725 млн. Фото: ESPN Images',
    imageCaptionEn:
      'Aerial view of the San Siro precinct where Inter and AC Milan plan to build their new $725M stadium. Photo: ESPN Images',
    clubLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/110.png',
    clubNameRu: 'Интер',
    clubNameEn: 'Inter Milan',
    relatedMatchId: 'seriea-int-juv',
    isLeadStory: false,
    isTrending: false,
    tagsRu: ['Серия А', 'Интер', 'Милан', 'Сан-Сиро', 'Бизнес'],
    tagsEn: ['Serie A', 'Inter Milan', 'AC Milan', 'San Siro', 'Finance']
  },
  {
    id: 'art-10',
    slug: 'global-club-power-rankings-top-20-tactical-metrics',
    category: 'tactics',
    categoryLabelRu: 'Тактика',
    categoryLabelEn: 'Tactics',
    titleRu:
      'Индекс силы Golason Топ-20: почему «Ливерпуль», «Реал» и «Барселона» оторвались от остальной Европы по продвинутым метрикам',
    titleEn:
      'Golason Global Power Rankings Top 20: Why Liverpool, Real Madrid, and Barcelona Lead Europe’s Underlying Metrics',
    subtitleRu:
      'Комплексная модель оценки команд на основе ожидаемой угрозы с игры (npxG), интенсивности прессинга PPDA и устойчивости к травмам.',
    subtitleEn:
      'A deep analytical ranking weighing non-penalty expected threat, PPDA pressing efficiency, and schedule-adjusted dominance across Europe’s elite.',
    bodyRu: [
      'Традиционные турнирные таблицы внутри национальных чемпионатов часто искажают реальное соотношение сил на континенте из-за разницы в уровне сопротивления и календарных отрезков. Чтобы объективно оценить иерархию европейского футбола к концу октября 2026 года, аналитическая лаборатория Golason обновила свой глобальный индекс силы, объединяющий данные Лиги чемпионов и пяти ведущих лиг.',
      'Первую тройку рейтинга с минимальным разрывом формируют «Ливерпуль», «Реал Мадрид» и «Барселона». Мерсисайдцы под руководством Арне Слота демонстрируют лучший в Европе баланс между атакой и обороной: команда допускает всего 0,68 ожидаемого гола с игры (npxGA) за девяносто минут, выиграв все четыре стартовых тура Лиги чемпионов с разницей мячей 10:1.',
      'Мадридский «Реал» после победы в «Эль-Класико» поднялся на вторую строчку благодаря феноменальной конверсии быстрых отрывов. Ни один клуб мира не создает столько моментов высокой ценности (с вероятностью гола свыше 25% за удар) после возврата мяча в средней зоне, как связка Беллингема, Винисиуса и Мбаппе.',
      'В первой десятке индекса также плотно расположились «Манчестер Сити», мюнхенская «Бавария», миланский «Интер», лондонский «Арсенал», «Пари Сен-Жермен», лиссабонский «Спортинг» и «Монако». Особого внимания заслуживает прогресс «Интера» Симоне Индзаги, чьи ротации позиций между крайними центральными защитниками и инсайдами остаются эталоном позиционной геометрии.',
      'Главный вывод октябрьского среза очевиден: современная элита разделилась на клубы, способные выдерживать темп в 60+ матчей за сезон за счет системной ротации, и команды, чья структура рушится при выпадении одного-двух ключевых исполнителей в опорной зоне.'
    ],
    bodyEn: [
      'Domestic league tables often obscure the true continental hierarchy due to uneven fixture difficulty and variance in finishing. To establish an objective benchmark at the end of October 2026, the Golason Data Lab compiled its updated Top 20 Club Power Index, blending Champions League performance with schedule-adjusted underlying numbers across Europe’s major leagues.',
      'Liverpool, Real Madrid, and Barcelona occupy the top three positions separated by razor-thin margins. Arne Slot’s Liverpool boast the continent’s most balanced profile, conceding a mere 0.68 non-penalty expected goals per ninety minutes while cruising through the Champions League league phase with a 10-1 aggregate scoreline.',
      'Real Madrid surge into second place following their El Clasico triumph, powered by unmatched efficiency in direct transitions. No side in world football generates a higher volume of high-value shots (exceeding 0.25 xG per attempt) within eight seconds of a midfield turnover than the trio of Bellingham, Vinicius, and Mbappe.',
      'Rounding out the top ten are Manchester City, Bayern Munich, Inter Milan, Arsenal, Paris Saint-Germain, Sporting CP, and AS Monaco. Simone Inzaghi’s Inter continue to grade among the elite in positional fluidity, with their wide centre-backs regularly overlapping into the final third.',
      'The overarching takeaway from October’s data is clear: across a grueling sixty-match calendar, structural resilience and midfield squad depth now separate genuine Champions League favorites from domestic front-runners.'
    ],
    authorRu: 'Вадим Лукомский',
    authorEn: 'Vadim Lukomskiy',
    authorRoleRu: 'Тактический аналитик',
    authorRoleEn: 'Lead Tactical Analyst',
    publishedAtRu: '30 октября 2026, 15:30 МСК',
    publishedAtEn: 'October 30, 2026 • 12:30 UTC',
    publishedAtIso: '2026-10-30T12:30:00Z',
    readTimeMinutes: 6,
    imageUrl: 'https://a.espncdn.com/photo/2026/1030/r1738425_1296x729_16-9.jpg',
    imageCaptionRu:
      'Звезды ведущих европейских клубов в борьбе за вершину глобального рейтинга силы сезона-2026/27. Фото: ESPN Images',
    imageCaptionEn:
      'European football’s elite contend for top spot in the 2026/27 Global Club Power Rankings. Photo: ESPN Images',
    clubLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png',
    clubNameRu: 'Реал Мадрид',
    clubNameEn: 'Real Madrid',
    relatedMatchId: 'ucl-rma-mci',
    isLeadStory: false,
    isTrending: true,
    tagsRu: ['Тактика', 'Рейтинг клубов', 'Лига чемпионов', 'Аналитика'],
    tagsEn: ['Tactics', 'Power Rankings', 'Champions League', 'Analytics']
  },
  {
    id: 'art-11',
    slug: 'manchester-city-premier-league-title-race-rodri-void',
    category: 'epl',
    categoryLabelRu: 'Премьер-лига',
    categoryLabelEn: 'Premier League',
    titleRu:
      'Чемпионская гонка АПЛ без Родри: как «Манчестер Сити» перестроил опорную зону и готовит зимний трансферный ход',
    titleEn:
      'Navigating the Premier League Title Race Without Rodri: How Manchester City Rebuilt Their Pivot Zone',
    subtitleRu:
      'Пеп Гвардиола распределил функции обладателя «Золотого мяча» между Матео Ковачичем и Рико Льюисом, пока скауты клуба изучают зимний рынок.',
    subtitleEn:
      'Pep Guardiola has split his Ballon d’Or winner’s responsibilities between Mateo Kovacic and Rico Lewis while City’s board weighs a January midfield reinforcement.',
    bodyRu: [
      'Потеря Родри на длительный срок поставила перед Пепом Гвардиолой самую сложную тактическую головоломку за все годы его работы на стадионе «Этихад». Испанский опорный полузащитник был не просто волнорезом перед линией обороны — он служил метрономом, определяющим темп каждого владения и страхующим зоны при потере мяча.',
      'Понимая, что ни один игрок в мире не способен в одиночку скопировать объем работы обладателя «Золотого мяча», Гвардиола разделил его функции между двумя исполнителями. Матео Ковачич взял на себя выход из-под первой волны прессинга за счет дриблинга в центральной зоне, а молодой Рико Льюис смещается с фланга обороны в опорный квадрат, обеспечивая численное преимущество при коротком перепасе.',
      'Тем не менее статистика переходных фаз показывает, что «Манчестер Сити» стал более уязвим для быстрых контратак через центральную ось. Соперники по Премьер-лиге целенаправленно ждут момента, когда Ковачич поднимается выше линии мяча, чтобы запустить быструю вертикальную передачу в зону перед Рубеном Диашем.',
      'Компенсировать эти издержки помогает феноменальное притяжение Эрлинга Холанда в чужой штрафной. Даже в матчах, где норвежец касается мяча менее двадцати раз за игру, он стягивает на себя обоих центральных защитников соперника, освобождая линию шестнадцати метров для ударов Фила Фодена и подключений Йошко Гвардиола.',
      'Параллельно спортивный блок «Сити» изучает возможность точечного усиления опорной зоны в январское окно. На карандаше селекционеров находятся сразу несколько профильных шестых номеров из Серии А и Ла Лиги, хотя окончательное решение будет зависеть от динамики отрыва в таблице к декабрьскому боксинг-дэй.'
    ],
    bodyEn: [
      'Losing Rodri for an extended spell handed Pep Guardiola the most complex structural puzzle of his tenure at the Etihad Stadium. The Spanish midfielder was never merely a defensive screen; he operated as Manchester City’s tactical metronome, dictating circulation speed and extinguishing counter-attacks before they crossed the halfway line.',
      'Recognizing that no single player can replicate the Ballon d’Or winner’s multi-phase profile, Guardiola has distributed his duties across a double pivot. Mateo Kovacic carries the burden of dribbling out of first-wave pressure, while academy graduate Rico Lewis steps inside from full-back to create passing triangles in tight central spaces.',
      'Even so, underlying transition numbers reveal a slight uptick in vulnerability through the central corridor. Premier League opponents increasingly bait Kovacic into stepping high before launching direct passes into the space in front of Ruben Dias.',
      'City have offset that defensive variance through Erling Haaland’s gravitational pull inside the penalty box. Even on afternoons when the Norwegian striker registers fewer than twenty touches, his presence pins two centre-backs deep, opening the edge of the area for Phil Foden and Josko Gvardiol to strike from distance.',
      'Behind the scenes, City’s recruitment department continues to evaluate mid-season midfield options across Serie A and La Liga ahead of the January window, determined to keep their Premier League title defense on course through the winter schedule.'
    ],
    authorRu: 'Денис Пузырев',
    authorEn: 'Denis Puzyrev',
    authorRoleRu: 'Обозреватель АПЛ',
    authorRoleEn: 'Premier League Correspondent',
    publishedAtRu: '30 октября 2026, 14:10 МСК',
    publishedAtEn: 'October 30, 2026 • 11:10 UTC',
    publishedAtIso: '2026-10-30T11:10:00Z',
    readTimeMinutes: 5,
    imageUrl: 'https://a.espncdn.com/photo/2026/1030/r1738598_1296x729_16-9.jpg',
    imageCaptionRu:
      'Игроки «Манчестер Сити» в напряженном матче чемпионской гонки английской Премьер-лиги. Фото: ESPN Images',
    imageCaptionEn:
      'Manchester City players compete during a pivotal Premier League title-race fixture. Photo: ESPN Images',
    clubLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/382.png',
    clubNameRu: 'Манчестер Сити',
    clubNameEn: 'Manchester City',
    relatedMatchId: 'ucl-rma-mci',
    isLeadStory: false,
    isTrending: false,
    transferReliability: 50,
    transferSource: 'Manchester Evening News / Exploratory January Shortlist',
    tagsRu: ['Премьер-лига', 'Манчестер Сити', 'Пеп Гвардиола', 'Эрлинг Холанд'],
    tagsEn: ['Premier League', 'Manchester City', 'Pep Guardiola', 'Erling Haaland']
  },
  {
    id: 'art-12',
    slug: 'liverpool-transfer-move-monaco-midfielder-maghnes-akliouche',
    category: 'transfers',
    categoryLabelRu: 'Трансферы',
    categoryLabelEn: 'Transfers',
    titleRu:
      'Скаутский радар «Энфилда»: «Ливерпуль» готовит предметное предложение по креативному хавбеку «Монако» Магнесу Аклиушу',
    titleEn:
      'Anfield Recruitment Radar: Liverpool Prepare Concrete Move for AS Monaco Creative Midfielder Maghnes Akliouche',
    subtitleRu:
      'Аналитический отдел мерсисайдцев впечатлен прогрессом 24-летнего француза в Лиге чемпионов и рассматривает его как идеального партнера для Собослаи и Гравенберха.',
    subtitleEn:
      'Liverpool’s data-driven recruitment team have tracked the 24-year-old French playmaker across the Champions League campaign as a long-term attacking midfield addition.',
    bodyRu: [
      'Селекционная служба «Ливерпуля» всегда славилась умением находить игроков на пороге их выхода на элитный европейский уровень — именно по такой математической модели на «Энфилд» приходили Мохамед Салах, Садио Мане, Диогу Жота и Алексис Мак Аллистер. Новой приоритетной целью аналитического департамента мерсисайдцев стал атакующий полузащитник «Монако» Магнес Аклиуш.',
      'В текущем розыгрыше Лиги чемпионов и французской Лиги 1 воспитанник академии монегасков стал главным открытием команды Ади Хюттера. Обладая мягкой левой ногой, низким центром тяжести и редким умением принимать мяч под давлением в правом полуфланге, Аклиуш входит в топ-3 полузащитников Европы до 25 лет по числу предударных действий с игры.',
      'Для системы Арне Слота француз привлекателен своей тактической универсальностью. Он способен без потери качества закрыть как позицию «десятки» в схеме 4-2-3-1, снимая избыточную беговую нагрузку с Доминика Собослаи, так и роль правого инвертированного вингера в дни, когда тренерский штаб предоставляет отдых Мохамеду Салаху.',
      'По данным французских источников L’Équipe и RMC Sport, скауты «Ливерпуля» присутствовали на четырех последних матчах «Монако», включая игры Лиги чемпионов и встречу против «ПСЖ», где Аклиуш вновь отметился забитым мячом. Руководство княжеского клуба оценивает своего лидера примерно в 55–60 миллионов евро и не намерено отпускать его до завершения европейской кампании.',
      'Тем не менее предварительные контакты с окружением футболиста уже состоялись: «Ливерпуль» рассчитывает согласовать базовые параметры сделки заранее, чтобы опередить конкурентов из «Манчестер Сити» и «Пари Сен-Жермен» перед открытием летнего трансферного окна.'
    ],
    bodyEn: [
      'Liverpool’s data-led recruitment department has long excelled at identifying continental talent just prior to their global breakout—the exact analytical curve that brought Mohamed Salah, Sadio Mane, and Alexis Mac Allister to Anfield. Now, the club’s scouting apparatus has locked onto AS Monaco’s creative midfielder Maghnes Akliouche.',
      'Across both Ligue 1 and Monaco’s impressive Champions League campaign under Adi Hutter, the left-footed playmaker has emerged as one of Europe’s most press-resistant interior attackers. Combining close control in tight pockets with incisive final-third passing, Akliouche ranks among the top three under-25 midfielders across Europe’s major leagues in open-play shot-creating actions.',
      'For Arne Slot’s tactical framework, Akliouche’s dual profile holds obvious appeal. He can operate seamlessly as the central attacking midfielder in Liverpool’s 4-2-3-1—rotating workload with Dominik Szoboszlai—or step onto the right flank as an inverted playmaker when Mohamed Salah is rested.',
      'Reports from L’Equipe and RMC Sport confirm that senior Liverpool scouts have attended four consecutive Monaco fixtures, including their recent clash with Paris Saint-Germain in which Akliouche found the net once again. Monaco value their academy graduate in the region of 55 to 60 million euros.',
      'While a formal bid is more likely to materialize ahead of the summer window, Anfield intermediaries have already initiated exploratory dialogue with the player’s representatives to establish early positioning ahead of rival interest from Manchester City and PSG.'
    ],
    authorRu: 'Кирилл Хаит',
    authorEn: 'Kirill Khait',
    authorRoleRu: 'Инсайдер трансферного рынка',
    authorRoleEn: 'European Transfer Correspondent',
    publishedAtRu: '29 октября 2026, 20:15 МСК',
    publishedAtEn: 'October 29, 2026 • 17:15 UTC',
    publishedAtIso: '2026-10-29T17:15:00Z',
    readTimeMinutes: 5,
    imageUrl: 'https://a.espncdn.com/photo/2026/1029/r1738253_1296x729_16-9.jpg',
    imageCaptionRu:
      'Скауты «Ливерпуля» активно следят за лидерами полузащиты «Монако» в матчах Лиги 1 и Лиги чемпионов. Фото: ESPN Images',
    imageCaptionEn:
      'Liverpool scouts have closely monitored AS Monaco’s midfield stars across Ligue 1 and Champions League action. Photo: ESPN Images',
    clubLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/174.png',
    clubNameRu: 'Монако',
    clubNameEn: 'AS Monaco',
    relatedMatchId: 'epl-ars-liv',
    isLeadStory: false,
    isTrending: false,
    transferReliability: 75,
    transferSource: 'L’Équipe / RMC Sport',
    tagsRu: ['Трансферы', 'Ливерпуль', 'Монако', 'Магнес Аклиуш'],
    tagsEn: ['Transfers', 'Liverpool', 'AS Monaco', 'Maghnes Akliouche']
  }
];

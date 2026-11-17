// Jifunze Kenya 課程資料：18 個單元，由淺入深。
// 每個單元：p = 句子 [史瓦希利語, 中文]，v = 單字，g = 文法重點。
const UNITS = [
 {icon:"👋",sw:"Hujambo?",zh:"問候與自我介紹",goal:"打招呼、說出名字與來自哪裡、向長輩問安",
  p:[["Hujambo?","你好嗎？"],["Sijambo.","我很好。"],["Habari za asubuhi?","早安，一切好嗎？"],["Jina lako ni nani?","你叫什麼名字？"],["Jina langu ni Pan.","我的名字是 Pan。"],["Ninatoka Taiwan.","我來自台灣。"],["Nafurahi kukutana nawe.","很高興認識你。"],["Shikamoo.","您好（對長輩的敬語，對方回答 Marahaba）。"]],
  v:[["asante","謝謝"],["karibu","歡迎；不客氣"],["ndiyo","是"],["hapana","不是"],["tafadhali","請"],["samahani","對不起；不好意思"],["kwaheri","再見"],["rafiki","朋友"],["mwalimu","老師"],["mgeni","客人"]],
  g:{t:"動詞的基本結構：主詞＋時態＋動詞",x:"史瓦希利語把「誰」和「什麼時候」都黏在動詞前面。ni- 是我、u- 是你、a- 是他／她；-na- 表示現在。否定時主詞改成 si-（我不）、hu-（你不）、ha-（他不）。",
   e:[["Ni-na-toka Taiwan.","我來自台灣。"],["U-na-toka wapi?","你來自哪裡？"],["A-na-toka Kenya.","他來自肯亞。"]]}},

 {icon:"📮",sw:"Kwenda Posta",zh:"問路、數字與郵局",goal:"問某個地方在哪裡、聽懂簡單指路、數到十",
  p:[["Posta iko wapi?","郵局在哪裡？"],["Nenda moja kwa moja.","直走。"],["Pinda kulia.","右轉。"],["Pinda kushoto.","左轉。"],["Iko karibu na benki.","在銀行附近。"],["Ni mbali? Hapana, si mbali.","遠嗎？不，不遠。"],["Ninataka stempu tatu.","我要三張郵票。"]],
  v:[["moja","一"],["mbili","二"],["tatu","三"],["nne","四"],["tano","五"],["sita","六"],["saba","七"],["nane","八"],["tisa","九"],["kumi","十"],["barabara","道路"],["wapi","哪裡"]],
  g:{t:"「在哪裡」：-ko wapi?",x:"問位置用「主詞前綴＋ko wapi」。人用 yuko，多數單數物品與地點用 iko，複數常用 ziko。回答時可接 hapa（這裡）、pale（那裡）、karibu na…（在…附近）。",
   e:[["Benki iko wapi?","銀行在哪裡？"],["Juma yuko wapi?","Juma 在哪裡？"],["Iko pale.","在那裡。"]]}},

 {icon:"🏨",sw:"Hotelini",zh:"在飯店",goal:"詢問房間、表達喜歡與不喜歡、道歉、序數",
  p:[["Mna chumba kwa mtu mmoja?","你們有單人房嗎？"],["Chumba ni shilingi ngapi kwa usiku mmoja?","房間一晚多少先令？"],["Nitakaa siku mbili.","我會住兩天。"],["Chumba changu kiko ghorofa ya pili.","我的房間在二樓。"],["Ninapenda chai.","我喜歡茶。"],["Sipendi kahawa.","我不喜歡咖啡。"],["Samahani, nimechelewa.","抱歉，我來晚了。"]],
  v:[["hoteli","飯店；小餐館"],["chumba","房間"],["ufunguo","鑰匙"],["kitanda","床"],["maji moto","熱水"],["chakula","食物"],["wali","米飯"],["nyama","肉"],["samaki","魚"],["kuku","雞"]],
  g:{t:"現在式的否定與序數",x:"否定現在式：主詞換成否定前綴、拿掉 -na-，動詞字尾 -a 改成 -i。序數用「ya／wa＋數字」，第一是 kwanza、第二是 pili，第三以後直接用數字。",
   e:[["Ninapenda → Sipendi","我喜歡 → 我不喜歡"],["Unapenda → Hupendi","你喜歡 → 你不喜歡"],["siku ya kwanza, siku ya tatu","第一天、第三天"]]}},

 {icon:"🍊",sw:"Sokoni",zh:"在市場",goal:"問價錢、簡單殺價、點飲料、替別人做事",
  p:[["Machungwa ni bei gani?","橘子怎麼賣？"],["Ni ghali sana!","太貴了！"],["Punguza bei, tafadhali.","請算便宜一點。"],["Nipe ndizi tano.","給我五根香蕉。"],["Nitalipa shilingi mia mbili.","我付兩百先令。"],["Naomba chai na mandazi.","麻煩給我茶和 mandazi（東非炸麵包）。"],["Ninamnunulia mama matunda.","我買水果給媽媽。"]],
  v:[["soko","市場"],["tunda / matunda","水果（單／複數）"],["chungwa / machungwa","橘子（單／複數）"],["ndizi","香蕉"],["nyanya","番茄"],["kitunguu / vitunguu","洋蔥（單／複數）"],["embe / maembe","芒果（單／複數）"],["bei","價格"],["ghali","貴"],["rahisi","便宜；容易"],["pesa","錢"]],
  g:{t:"名詞有「類別」，複數換字首",x:"史瓦希利語的名詞分成幾個類別，單複數靠字首變化：m-/wa-（人）、ki-/vi-（物品）、（無）/ma-（許多水果）。另外，動詞加上 -ia 或 -ea 表示「為某人做」。",
   e:[["mtu → watu","人 → 人們"],["kitunguu → vitunguu","一顆洋蔥 → 多顆洋蔥"],["kununua → kununulia","買 → 買給（某人）"]]}},

 {icon:"🧺",sw:"Kwenye Duka la Sanaa",zh:"工藝品店購物",goal:"描述想買的東西、顏色與大小、付款",
  p:[["Ninatafuta zawadi.","我在找禮物。"],["Kikapu hiki ni kizuri sana.","這個籃子很漂亮。"],["Una kikapu kikubwa zaidi?","有更大的籃子嗎？"],["Ninapenda rangi nyekundu.","我喜歡紅色。"],["Nitachukua hivi viwili.","我要這兩個。"],["Naweza kulipa kwa M-Pesa?","可以用 M-Pesa 付款嗎？"]],
  v:[["duka","商店"],["zawadi","禮物"],["kikapu","籃子"],["kinyago","木雕"],["kanga","肯加布（彩色印花布）"],["shanga","珠飾"],["rangi","顏色"],["nyekundu","紅色"],["nyeusi","黑色"],["nyeupe","白色"],["-kubwa","大的"],["-dogo","小的"]],
  g:{t:"形容詞要跟著名詞變",x:"形容詞放在名詞後面，而且要戴上跟名詞同類別的字首。「這個」也一樣：ki- 類用 hiki／hivi，人用 huyu／hawa。",
   e:[["kikapu kizuri","漂亮的籃子"],["vikapu vizuri","漂亮的籃子（複數）"],["mtu mzuri","好人"]]}},

 {icon:"🌇",sw:"Matembezi Jioni",zh:"時間與日常作息",goal:"問時間、說昨天做了什麼、明天要做什麼",
  p:[["Sasa ni saa ngapi?","現在幾點？"],["Ni saa moja jioni.","現在是晚上七點。"],["Twende kutembea.","我們去散步吧。"],["Jana nilifanya kazi.","昨天我工作了。"],["Kesho nitapumzika.","明天我會休息。"],["Tutaonana kesho asubuhi.","明天早上見。"]],
  v:[["saa","小時；鐘錶"],["asubuhi","早上"],["mchana","白天；下午"],["jioni","傍晚"],["usiku","晚上"],["leo","今天"],["jana","昨天"],["kesho","明天"],["sasa","現在"],["baadaye","待會；之後"]],
  g:{t:"史瓦希利時間與過去、未來式",x:"史瓦希利語從日出（早上六點）開始算，所以鐘面要加或減六小時：saa moja（一點）是早上七點或晚上七點。時態只要換中間那一格：-li- 過去、-na- 現在、-ta- 未來。",
   e:[["saa tatu asubuhi","早上九點"],["Nilifanya kazi.","我工作了。"],["Nitafanya kazi.","我將會工作。"]]}},

 {icon:"🍲",sw:"Kupika",zh:"一起做飯",goal:"主動幫忙、問對方在做什麼、禮貌地請人別做某事",
  p:[["Nikusaidie?","需要我幫你嗎？"],["Unafanya nini?","你在做什麼？"],["Ninapika ugali.","我在煮 ugali（玉米糕）。"],["Kata vitunguu kwanza.","先切洋蔥。"],["Usiweke chumvi nyingi.","不要放太多鹽。"],["Chakula kiko tayari.","飯做好了。"]],
  v:[["kupika","煮"],["kukata","切"],["kuosha","洗"],["chumvi","鹽"],["sukari","糖"],["mafuta","油"],["sufuria","鍋子"],["kisu","刀"],["moto","火；熱"],["sukuma wiki","羽衣甘藍（肯亞家常菜）"]],
  g:{t:"命令、請求與「不要…」",x:"直接用動詞原形就是命令：Kata!（切！）。把字尾 -a 改成 -e 語氣比較委婉，也用來提議：Nikusaidie?（讓我幫你？）。「不要」則是 usi-＋動詞字尾 -e。",
   e:[["Weka chumvi.","放鹽。"],["Usiweke chumvi.","不要放鹽。"],["Tusaidiane.","我們互相幫忙吧。"]]}},

 {icon:"🚆",sw:"Kusafiri",zh:"出門旅行",goal:"買票、問出發時間、說已經到了或還沒做",
  p:[["Ninataka kwenda Mombasa.","我想去蒙巴薩。"],["Tiketi ni shilingi ngapi?","車票多少先令？"],["Treni inaondoka saa ngapi?","火車幾點出發？"],["Nimefika Nairobi.","我已經到奈洛比了。"],["Bado sijanunua tiketi.","我還沒買票。"],["Nitasafiri kwa ndege.","我會搭飛機去。"]],
  v:[["safari","旅程"],["tiketi","票"],["treni","火車"],["ndege","飛機；鳥"],["uwanja wa ndege","機場"],["stesheni","車站"],["mzigo / mizigo","行李（單／複數）"],["kufika","到達"],["kuondoka","出發；離開"],["kusafiri","旅行"]],
  g:{t:"「已經」-me- 與「還沒」-ja-",x:"-me- 表示動作已完成、結果還在：Nimefika（我到了）。否定用否定主詞＋-ja-，常和 bado（還）一起出現。交通工具前面用 kwa。",
   e:[["Nimenunua tiketi.","我已經買票了。"],["Sijanunua tiketi.","我還沒買票。"],["kwa basi, kwa treni","搭巴士、搭火車"]]}},

 {icon:"🚌",sw:"Safari ya Basi",zh:"搭巴士與 matatu",goal:"問車往哪裡、問車資、請司機讓你下車",
  p:[["Basi hili linakwenda wapi?","這班巴士開往哪裡？"],["Kuna nafasi?","還有位子嗎？"],["Nauli ni shilingi ngapi?","車資多少先令？"],["Nishushe hapa, tafadhali.","請讓我在這裡下車。"],["Sina chenji.","我沒有零錢。"],["Tutafika saa ngapi?","我們幾點會到？"]],
  v:[["matatu","小巴（肯亞常見的共乘車）"],["dereva","司機"],["kondakta","車掌"],["abiria","乘客"],["nauli","車資"],["kituo","站牌；車站"],["kiti","座位；椅子"],["dirisha","窗戶"],["kupanda","上車；爬"],["kushuka","下車"]],
  g:{t:"「有」與「沒有」",x:"「擁有」是主詞＋na：nina（我有）、una（你有）、ana（他有）；否定是 sina、huna、hana。說某處「有／沒有」東西則用 kuna 和 hakuna。",
   e:[["Nina tiketi.","我有票。"],["Sina pesa.","我沒有錢。"],["Hakuna nafasi.","沒有位子。"]]}},

 {icon:"🛏️",sw:"Chumba Kizuri!",zh:"房間與家具",goal:"說東西在房間的哪裡、表達覺得冷或熱",
  p:[["Chumba hiki ni kizuri!","這個房間真好！"],["Kitabu kiko juu ya meza.","書在桌子上。"],["Viatu viko chini ya kitanda.","鞋子在床底下。"],["Nguo ziko ndani ya kabati.","衣服在櫃子裡。"],["Ninasikia baridi.","我覺得冷。"],["Fungua dirisha, kuna joto.","開窗吧，很熱。"]],
  v:[["meza","桌子"],["kabati","櫃子"],["mlango","門"],["taa","燈"],["godoro","床墊"],["shuka","床單"],["mto","枕頭；河流"],["joto","熱"],["baridi","冷"],["nyumba","房子"]],
  g:{t:"位置詞與 -ni",x:"位置詞後面接 ya：juu ya（在…上面）、chini ya（在…下面）、ndani ya（在…裡面）、nje ya（在…外面）。名詞加上 -ni 也能表示「在…」。",
   e:[["juu ya kitanda","在床上"],["nyumbani","在家"],["mezani","在桌上"]]}},

 {icon:"💌",sw:"Mialiko",zh:"邀請與星期",goal:"邀請別人、接受或婉拒、星期的說法",
  p:[["Karibu nyumbani kwetu Jumamosi.","歡迎星期六來我們家。"],["Utakuja kwenye sherehe?","你會來參加聚會嗎？"],["Asante, nitakuja.","謝謝，我會去。"],["Samahani, sitaweza kuja.","抱歉，我沒辦法去。"],["Nilete nini?","我該帶什麼去？"],["Karibu tena!","歡迎再來！"]],
  v:[["Jumatatu","星期一"],["Jumanne","星期二"],["Jumatano","星期三"],["Alhamisi","星期四"],["Ijumaa","星期五"],["Jumamosi","星期六"],["Jumapili","星期日"],["sherehe","慶祝；聚會"],["harusi","婚禮"],["mwaliko","邀請"]],
  g:{t:"未來式的否定與「能夠」",x:"未來式否定只要把主詞換成否定前綴，-ta- 保留：nitakuja → sitakuja。「能夠」用 kuweza 加上動詞原形。",
   e:[["Nitakuja.","我會來。"],["Sitakuja.","我不會來。"],["Ninaweza kuja kesho.","我明天可以來。"]]}},

 {icon:"🚗",sw:"Hairuhusiwi Kuegesha!",zh:"車子出狀況",goal:"說自己遇到麻煩、車子壞了、談「如果…就…」",
  p:[["Nina shida.","我遇到麻煩了。"],["Gari langu limeharibika.","我的車壞了。"],["Gari haliwaki.","車子發不動。"],["Hairuhusiwi kuegesha hapa.","這裡禁止停車。"],["Fundi yuko wapi?","修車師傅在哪裡？"],["Ukipita njia hii, utafika haraka.","如果走這條路，你會比較快到。"]],
  v:[["gari","車子"],["fundi","技師；師傅"],["petroli","汽油"],["tairi","輪胎"],["njia","路；方法"],["kuegesha","停車"],["kuendesha","駕駛"],["kusimama","停下；站立"],["haraka","快"],["polepole","慢慢地"]],
  g:{t:"「如果」-ki- 與被動 -wa",x:"把 -ki- 放在時態的位置表示「如果／當…」。動詞字尾加 -w- 變成被動，告示牌常見：Hairuhusiwi…（不被允許…）。",
   e:[["Ukienda sasa, utamwona.","如果你現在去，就會見到他。"],["kuruhusu → kuruhusiwa","允許 → 被允許"],["Mlango umefungwa.","門被關上了。"]]}},

 {icon:"🗣️",sw:"Kujifunza Lugha",zh:"學語言",goal:"說自己會多少、請對方說慢一點或再說一次",
  p:[["Ninajifunza Kiswahili.","我在學史瓦希利語。"],["Ninasema Kiswahili kidogo tu.","我只會說一點史瓦希利語。"],["Sielewi.","我聽不懂。"],["Sema polepole, tafadhali.","請說慢一點。"],["Tafadhali rudia.","請再說一次。"],["Neno hili lina maana gani?","這個字是什麼意思？"],["Unasemaje hivi kwa Kiswahili?","這個用史瓦希利語怎麼說？"]],
  v:[["lugha","語言"],["neno / maneno","字詞（單／複數）"],["maana","意思"],["swali","問題"],["jibu","答案"],["kusoma","讀；念書"],["kuandika","寫"],["kusikiliza","聽"],["kuelewa","理解"],["Kiingereza","英語"],["Kichina","中文"]],
  g:{t:"語言名稱與反身 -ji-",x:"語言名稱都以 Ki- 開頭：Kiswahili、Kiingereza、Kichina。動詞裡的 -ji- 表示「自己」：kufunza 是教，kujifunza 就是「教自己」，也就是學習。",
   e:[["Ninasema Kichina.","我說中文。"],["Unajifunza nini?","你在學什麼？"],["kwa Kiswahili","用史瓦希利語"]]}},

 {icon:"😵",sw:"Siku ya Taabu",zh:"倒楣的一天",goal:"說東西不見了、遲到、請人幫忙、安慰別人",
  p:[["Nimepoteza simu yangu.","我的手機不見了。"],["Pochi yangu imeibiwa.","我的錢包被偷了。"],["Nimechelewa kazini.","我上班遲到了。"],["Sikulala vizuri jana usiku.","我昨晚沒睡好。"],["Naomba msaada.","請幫幫我。"],["Pole sana!","辛苦了；請保重！"],["Usijali, hakuna shida.","別擔心，沒問題。"]],
  v:[["taabu","麻煩；困難"],["simu","手機；電話"],["pochi","錢包"],["polisi","警察"],["msaada","幫助"],["kupoteza","弄丟"],["kuiba","偷"],["kuchelewa","遲到"],["kusahau","忘記"],["bahati mbaya","運氣不好"]],
  g:{t:"過去式的否定 -ku-",x:"過去式否定：否定主詞＋-ku-＋動詞，字尾不變。Pole 是東非很重要的一句話，別人遇到任何不順都可以說，表示同情與關心。",
   e:[["Nililala.","我睡了。"],["Sikulala.","我沒睡。"],["Hakuja jana.","他昨天沒來。"]]}},

 {icon:"🦁",sw:"Mbuga ya Wanyama",zh:"野生動物保護區",goal:"認識動物、做比較、問名字與住哪裡",
  p:[["Tunaona simba wawili.","我們看到兩隻獅子。"],["Yule ni mnyama gani?","那是什麼動物？"],["Tembo ni mkubwa kuliko kifaru.","大象比犀牛大。"],["Twiga ni mrefu sana.","長頸鹿非常高。"],["Punda milia ana mistari myeusi na myeupe.","斑馬有黑白條紋。"],["Unaishi wapi? Ninaishi Nairobi.","你住哪裡？我住奈洛比。"]],
  v:[["mnyama / wanyama","動物（單／複數）"],["simba","獅子"],["tembo","大象"],["twiga","長頸鹿"],["kifaru","犀牛"],["chui","豹"],["punda milia","斑馬"],["kiboko","河馬"],["nyati","水牛"],["mbuga","草原；保護區"]],
  g:{t:"比較：kuliko",x:"比較很簡單：形容詞不變，後面加 kuliko（比）。要說「最…」就用 kuliko wote（比全部都…）。動物名詞雖然字首各異，搭配的形容詞一律用人的字首 m-/wa-。",
   e:[["Simba ni mkali kuliko chui.","獅子比豹兇猛。"],["Tembo ni mkubwa kuliko wote.","大象最大。"],["simba wakubwa","大獅子們"]]}},

 {icon:"🩺",sw:"Kuna Nini?",zh:"身體不舒服",goal:"問怎麼了、描述症狀、說年齡、提醒別人不要做某事",
  p:[["Kuna nini?","怎麼了？"],["Kichwa kinaniuma.","我頭痛。"],["Ninaumwa na tumbo.","我肚子痛。"],["Nina homa.","我發燒了。"],["Ninahitaji kumwona daktari.","我需要看醫生。"],["Una miaka mingapi?","你幾歲？"],["Nina miaka thelathini.","我三十歲。"],["Usinywe maji haya.","不要喝這個水。"]],
  v:[["kichwa","頭"],["tumbo","肚子"],["jino / meno","牙齒（單／複數）"],["mguu","腳；腿"],["mkono","手；手臂"],["daktari","醫生"],["dawa","藥"],["hospitali","醫院"],["homa","發燒"],["mgonjwa","病人"]],
  g:{t:"「…在痛我」與年齡",x:"身體部位當主詞，動詞 -uma（痛）前面放受詞 -ni-（我）：Kichwa kinaniuma，字面是「頭在痛我」。年齡用「有幾年」：Nina miaka…。",
   e:[["Jino linaniuma.","我牙痛。"],["Mguu unamuuma.","他腳痛。"],["Ana miaka kumi.","他十歲。"]]}},

 {icon:"⚽",sw:"Michezo na Ngoma",zh:"運動與舞蹈",goal:"聊喜歡的運動、說習慣做的事、約人看比賽",
  p:[["Unapenda mchezo gani?","你喜歡什麼運動？"],["Ninapenda mpira wa miguu.","我喜歡足球。"],["Yeye hucheza kila Jumamosi.","他每個星期六都踢球。"],["Timu yetu imeshinda!","我們的隊贏了！"],["Wanacheza ngoma vizuri sana.","他們舞跳得非常好。"],["Twende tukaangalie mechi.","我們去看比賽吧。"]],
  v:[["mchezo / michezo","運動；遊戲（單／複數）"],["mpira","球"],["mchezaji","球員；舞者"],["timu","隊伍"],["ngoma","鼓；傳統舞蹈"],["muziki","音樂"],["kuimba","唱歌"],["kucheza","玩；跳舞；比賽"],["kushinda","贏"],["kushindwa","輸"]],
  g:{t:"習慣動作：hu-",x:"動詞前加 hu- 表示「通常、總是」這樣做，所有人稱都一樣，所以要另外說出主詞。常和 kila（每）搭配。",
   e:[["Mimi hunywa chai asubuhi.","我早上通常喝茶。"],["Wao huimba kila siku.","他們每天唱歌。"],["kila wiki","每週"]]}},

 {icon:"🎉",sw:"Barua na Salamu",zh:"祝賀與寫信",goal:"恭喜別人、節日祝福、寫簡單的信或訊息",
  p:[["Hongera!","恭喜！"],["Heri ya Mwaka Mpya!","新年快樂！"],["Heri ya siku ya kuzaliwa!","生日快樂！"],["Mpendwa rafiki yangu,","親愛的朋友："],["Nimepokea barua pepe yako.","我收到你的電子郵件了。"],["Wasalimie familia yako.","代我向你的家人問好。"]],
  v:[["barua","信"],["barua pepe","電子郵件"],["salamu","問候"],["ujumbe","訊息"],["habari","消息；新聞"],["kutuma","寄；傳送"],["kupokea","收到"],["kujibu","回覆"],["sikukuu","節日"],["mwaka","年"]],
  g:{t:"「我的、你的」也跟著名詞變",x:"所有格的字根是 -angu（我的）、-ako（你的）、-ake（他的）、-etu（我們的），前面的字母隨名詞類別改變。這是整套課程一直出現的規則：名詞決定周圍字的字首。",
   e:[["rafiki yangu","我的朋友"],["jina langu","我的名字"],["chumba changu","我的房間"]]}}
];

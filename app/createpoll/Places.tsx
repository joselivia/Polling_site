export const Presidential_category=[
  "President",
  "Deputy President",
  "Cabinet Secretary",
  "Principal Secretary",
]

export const CATEGORY_OPTIONS = [
  "Governorship",
  "Senatorial",
  "Parliamentary",
  "Women Representative",
];

export const regionCountyMap: Record<string, string[]> = {
  Coast: ["Mombasa", "Kwale", "Kilifi", "Tana_River", "Lamu", "Taita_Taveta"],
  Nairobi: ["Nairobi"],
  Central: ["Nyandarua", "Nyeri", "Kirinyaga", "Murang’a", "Kiambu"],
  Eastern: [
    "Embu",
    "Kitui",
    "Machakos",
    "Makueni",
    "Isiolo",
    "Meru",
    "Tharaka_Nithi",
  ],
  North_Eastern: ["Garissa", "Wajir", "Mandera"],
  Rift_Valley: [
    "Turkana",
    "West_Pokot",
    "Samburu",
    "Trans_Nzoia",
    "Uasin_Gishu",
    "Elgeyo_Marakwet",
    "Nandi",
    "Baringo",
    "Laikipia",
    "Nakuru",
    "Narok",
    "Kajiado",
    "Kericho",
    "Bomet"
  ],
  Western: ["Kakamega", "Vihiga", "Bungoma", "Busia"],
  Nyanza: ["Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira"],
};
export const countyConstituencyMap: Record<string, string[]> = {
  Mombasa: ['Changamwe', 'Jomvu', 'Kisauni', 'Nyali', 'Likoni', 'Mvita'],
  Kwale: ['Msambweni', 'Lunga_Lunga', 'Matuga', 'Kinango'],
  Kilifi: ['Kilifi_North', 'Kilifi_South', 'Kaloleni', 'Rabai', 'Ganze', 'Malindi', 'Magarini'],
  Tana_River: ['Garsen', 'Galole', 'Bura'],
  Lamu: ['Lamu_East', 'Lamu_West'],
  Taita_Taveta: ['Taveta', 'Wundanyi', 'Mwatate', 'Voi'],
  Garissa: ['Garissa_Township', 'Balambala', 'Lagdera', 'Dadaab', 'Fafi'],
  Wajir: ['Wajir_East', 'Tarbaj', 'Wajir_West', 'Eldas', 'Wajir_South'],
  Mandera: ['Mandera_West', 'Mandera_North', 'Mandera_South', 'Mandera_East', 'Lafey'],
  Isiolo: ['Isiolo_North', 'Isiolo_South'],
  Marsabit: ['North_Horr', 'Laisamis', 'Saku', 'Moyale'],
  Meru: ['Tigania_East', 'Tigania_West', 'Igembe_South', 'Igembe_Central', 'Igembe_North', 'Buuri', 'Imenti_North', 'Imenti_South', 'Imenti_Central'],
  Tharaka_Nithi: ['Chuka/Igambang’ombe', 'Maara', 'Tharaka'],
  Embu: ['Manyatta', 'Mbeere_North', 'Runyenjes', 'Mbeere_South'],
  Kitui: ['Kitui_Central', 'Kitui_West', 'Kitui_East', 'Kitui_Rural', 'Mwingi_North', 'Mwingi_Central', 'Mwingi_West'],
  Machakos: ['Mavoko', 'Yatta', 'Kangundo', 'Masinga', 'Matungulu', 'Kathiani', 'Machakos_Town', 'Mwala'],
  Makueni: ['Makueni', 'Kibwezi_East', 'Kibwezi_West', 'Mbooni', 'Kilome', 'Kaiti'],
  Kiambu: ['Gatundu_North', 'Gatundu_South', 'Githunguri', 'Juja', 'Kabete', 'Kiambaa', 'Kiambu', 'Kikuyu', 'Lari', 'Limuru', 'Ruiru', 'Thika_Town'],
  Nyandarua: ['kinangop', 'Ol_Kalou', 'Ndaragwa', 'Kipipiri','Ol_Jorok'],
  Nyeri: ['Tetu', 'Kieni', 'Mathira', 'Othaya', 'Nyeri_Town', 'Mukurweini'],
  Kirinyaga: ['Mwea', 'Ndia', 'Gichugu', 'Kirinyaga_Central'],
  Muranga: ['Kandara', 'Kangema', 'Mathioya', 'Kiharu', 'Maragua', 'Kigumo'],
  Turkana: ['Loima', 'Turkana_North', 'Turkana_East', 'Turkana_Central', 'Turkana_ South'],
  West_Pokot: ['Kapenguria', 'Kacheliba', 'Sigor', 'Pokot_South'],
  Samburu: ['Samburu_East', 'Samburu_North', 'Samburu_West'],
  Trans_Nzoia: ['Saboti', 'Kwanza', 'Endebess', 'Kiminini'],
  Uasin_Gishu: ['Kapseret', 'Moiben', 'Turbo', 'Soy', 'Kesses', 'Ainabkoi'],
  Elgeyo_Marakwet: ['Keiyo_North', 'Keiyo_South', 'Marakwet_East', 'Marakwet_West'],
  Nandi: ['Emgwen', 'Aldai', 'Mosop', 'Chesumei', 'Tinderet', 'Nandi Hills'],
  Baringo: ['Mogotio', 'Baringo_North', 'Baringo_Central', 'Baringo_South', 'Eldama_Ravine'],
  Laikipia: ['Laikipia_East', 'Laikipia_West', 'Laikipia_North'],
  Nakuru: ['Nakuru_Town_East', 'Nakuru_Town_West', 'Subukia', 'Njoro', 'Gilgil', 'Molo', 'Rongai', 'Naivasha', 'Kuresoi_South', 'Kuresoi_North', 'Bahati'],
  Narok: ['Narok_North', 'Narok_South', 'Emurua_Dikirr', 'Kilgoris', 'Narok_East'],
  Kajiado: ['Kajiado_East', 'Kajiado_North', 'Kajiado_West', 'Kajiado_Central', 'Kajiado_South'],
  Kericho: ['Ainamoi', 'Bureti', 'Belgut', 'Sigowet/Soin', 'kipkelion_West', 'Kipkelion_East'],
  Bomet: ['sotik', 'Bomet_East', 'Bomet_Central', 'Konoin', 'Chepalungu'],
  Kakamega: ['Mumias_East', 'Mumias_West', 'Butere', 'Lugari', 'Matungu', 'Khwisero', 'Shinyalu', 'Ikolomani', 'Malava', 'likuyani', 'Lurambi'],
  Vihiga: ['Vihiga', 'Hamisi', 'Sabatia', 'Luanda', 'Emuhaya'],
  Bungoma: ['Mt_Elgon', 'Sirisia', 'Bumula', 'Webuye_West', 'Webuye_East', 'Kimilili', 'Kanduyi', 'Tongaren', 'kabuchia'],
  Busia: ['Teso_North', 'Teso_South', 'Nambale', 'Matayos', 'Butula', 'Funyula', "Budalang'i"],
  Siaya: ['Ugenya', 'Rarieda', 'Gem', 'Uguja', 'Bondo', 'Alego Usonga'],
  Kisumu: ['Kisumu_East', 'Kisumu_West', 'Kisumu_Central', 'Seme', 'Muhoroni', 'Nyakach'],
  Homa_Bay: ['Kasipul', 'Karachuonyo', 'Homa_Bay_Town', 'Suba_South', 'Rangwe', 'Ndhiwa', 'Kabondo_Kasipul'],
  Migori: ['Rongo', 'Awendo', 'Uriri', 'Nyatike', 'Suna_East', 'Suna_West', 'Kuria_West', 'Kuria_East'],
  Kisii: ['Bonchari', 'Bobasi', 'Bomachoge_Borabu', 'Bomachoge_Chache', 'Nyaribari_Masaba', 'Nyaribari_Chache', 'South_Mugirango', 'Kitutu_Chache_North', 'Kitutu_Chache_South'],
  Nyamira: ['Kitutu_Masaba', 'West_Mugirango', 'North_Mugirango', 'Borabu'],
  Nairobi: ['Dagoretti_North', 'Dagoretti_South', 'Langata', 'Kibra', 'Kasarani', 'Roysambu', 'Ruaraka', 'Embakasi_Central', 'Embakasi_East', 'Embakasi_North', 'Embakasi_South', 'Embakasi_West', 'Kamukunji', 'Makadara', 'Mathare', 'Starehe', 'Westlands']
};


export const countyAssemblyWardMap: Record<string, string[]> = {
Westlands:['Kitisuru','Parklands/Highridge','Karura','Kangemi','Mountain View'],
Langata:['Karen','Nairobi West','Nyayo Highrise','Mugumo-ini','South C'],
Dagoretti_North: ['Kilimani', 'Kawangware', 'Gatina', 'Kileleshwa', 'Kabiro'],
Dagoretti_South: ['Mutu-ini', 'Ngando', 'Riruta', 'Uthiru/Ruthimitu', 'Waithaka'],
  Roysambu: ['Githurai', 'Kahawa', 'Kahawa West', 'Zimmerman', 'Roysambu'],
  Kasarani: ['Clay City', 'Mwiki', 'Kasarani', 'Njiru', 'Ruai'],
  Ruaraka: ['Baba Dogo', 'Utalii', 'Mathare North', 'Lucky Summer', 'Korogocho'],
  Embakasi_South: ['Imara Daima', 'Kwa Njenga', 'Kwa Reuben', 'Pipeline', 'Kware'],
  Embakasi_North: ['Dandora Area I', 'Dandora Area II', 'Dandora Area III', 'Dandora Area IV', 'Kariobangi North'],
  Embakasi_Central: ['Kayole North', 'Kayole South', 'Komarock', 'Matopeni/Spring Valley', 'Chokaa'],
  Embakasi_East: ['Upper Savanna', 'Lower Savanna', 'Embakasi', 'Utawala', 'Mihango'],
  Embakasi_West: ['Umoja I', 'Umoja II', 'Mowlem', 'Kariobangi South'],
  Makadara: ['Maringo/Hamza', 'Viwandani', 'Harambee', 'Makongeni', 'Mbotela'],
  Kamukunji: ['Pumwani', 'Eastleigh North', 'Eastleigh South', 'Airbase', 'California'],
  Starehe: ['Nairobi Central', 'Ngara', 'Pangani', 'Ziwani/Kariokor', 'Landimawe', 'Nairobi South'],
  Mathare: ['Hospital', 'Mabatini', 'Huruma', 'Ngei', 'Mlango Kubwa', 'Kiamaiko'],
  Kibra: ['Laini Saba', 'Lindi', 'Makina', 'Woodley/Kenyatta Golf Course', 'Sarangombe'],

    // Mombasa County constituencies
  Changamwe: ['Port Reitz', 'Kipevu', 'Airport', 'Miritini', 'Chaani'],
  Jomvu: ['Jomvu Kuu', 'Magongo', 'Mikindani'],
  Kisauni: ['Mjambere', 'Junda', 'Bamburi', 'Mwakirunge', 'Mtopanga', 'Magogoni', 'Shanzu'],
  Nyali: ['Frere Town', 'Ziwa La Ng’ombe', 'Mkomani', 'Kongowea', 'Kadzandani'],
  Likoni: ['Mtongwe', 'Shika Adabu', 'Bofu', 'Likoni', 'Timbwani'],
  Mvita: ['Mji Wa Kale/Makadara', 'Tudor', 'Tononoka', 'Shimanzi/Ganjoni', 'Majengo'],
  // Kwale County (4 constituencies, 20 wards)
  Msambweni: ['Ukunda', 'Kinondo', 'Gombato Bongwe', 'Ramisi'],
  Lungalunga: ['Pongwe/Kikoneni', 'Dzombo', 'Mwereni', 'Vanga'],
  Matuga: ['Tsimba Golini', 'Waa', 'Tiwi', 'Kubo South', 'Mkongani'],
  Kinango: ['Ndavaya', 'Puma', 'Kinango', 'Mackinnon Road', 'Chengoni/Samburu', 'Mwavumbo', 'Kasemeni'],
  
  // Kilifi County (7 constituencies, 35 wards)
  Kilifi_North: ['Tezo', 'Sokoni', 'Kibarani', 'Dabaso', 'Matsangoni', 'Watamu', 'Mnarani'],
  Kilifi_South: ['Junju', 'Mwarakaya', 'Shimo la Tewa', 'Chasimba', 'Mtepeni'],
  Kaloleni: ['Mariakani', 'Kayafungo', 'Kaloleni', 'Mwana Mwinga'],
  Rabai: ['Mwawesa', 'Ruruma', 'Kambe/Ribe', 'Rabai/Kisurutini'],
  Ganze: ['Ganze', 'Bamba', 'Jaribuni', 'Sokoke'],
  Malindi: ['Jilore', 'Kakuyuni', 'Ganda', 'Malindi Town', 'Shella'],
  Magarini: ['Marafa', 'Magarini', 'Gongoni', 'Adu', 'Garashi', 'Sabaki'],
  
  // Tana River County (3 constituencies, 15 wards)
  Garsen: ['Kipini East', 'Garsen South', 'Garsen Central', 'Garsen West', 'Garsen North', 'Kipini West'],
  Galole: ['Wayu', 'Chewani', 'Kinakomba', 'Mikinduni'],
  Bura: ['Chewele', 'Hiriman', 'Bangale', 'Sala', 'Madogo'],
  
  // Lamu County (2 constituencies, 10 wards)
  Lamu_East: ['Faza', 'Kiunga', 'Basuba'],
  Lamu_West: ['Shella', 'Mkomani', 'Hindi', 'Mkunumbi', 'Hongwe', 'Witu', 'Bahari'],
  
  // Taita Taveta County (4 constituencies, 20 wards)
  Taveta: ['Chala', 'Mahoo', 'Bomani', 'Mboghoni', 'Mata'],
  Wundanyi: ['Wundanyi/Mbale', 'Werugha', 'Wumingu/Kishushe', 'Mwanda/Mghange'],
  Mwatate: ['Ronge', 'Mwatate', 'Bura', 'Chawia', 'Wusi/Kishamba'],
  Voi: ['Mbololo', 'Sagalla', 'Kaloleni', 'Marungu', 'Kasigau', 'Ngolia'],

     // Kiambu County constituencies
  Gatundu_South: ['Kiamwangi', 'Kiganjo', 'Ndarugu', 'Ngenda'],
  Gatundu_North: ['Gituamba', 'Githobokoni', 'Chania', 'Mang’u'],
  Juja: ['Murera', 'Theta', 'Juja', 'Witeithie', 'Kalimoni'],
  Thika_Town: ['Township', 'Kamenu', 'Hospital', 'Gatuanyaga', 'Ngoliba'],
  Ruiru: ['Gitothua', 'Biashara', 'Gatongora', 'Kahawa Sukari', 'Kahawa Wendani', 'Kiuu', 'Mwiki', 'Mwihoko'],
  Githunguri: ['Githunguri', 'Githiga', 'Ikinu', 'Ngewa', 'Komothai'],
  Kiambu: ['Tinganga', 'Ndumberi', 'Riabai', 'Township'],
  Kiambaa: ['Cianda', 'Karuri', 'Ndenderu', 'Muchatha', 'Kihara'],
  Kabete: ['Gitaru', 'Muguga', 'Nyathuna', 'Kabete', 'Uthiru'],
  Kikuyu: ['Karai', 'Nachu', 'Sigona', 'Kikuyu', 'Kinoo'],
  Limuru: ['Bibirioni', 'Limuru Central', 'Ndeiya', 'Limuru East', 'Ngecha Tigoni'],
  Lari: ['Kinale', 'Kijabe', 'Nyanduma', 'Kamburu', 'Lari/Kirenga'],

 // Nyandarua County (7 constituencies, 35 wards)
  Kinangop: ['Engineer', 'Gathaara', 'North Kinangop', 'Murungaru', 'Njabini/Kiburu', 'Nyakio', 'Githabai', 'Magumu'],
  Kipipiri: ['Wanjohi', 'Kipipiri', 'Geta', 'Githioro'],
  Ol_Kalou: ['Karau', 'Kanjuiri Ridge', 'Mirangine', 'Kaimbaga', 'Rurii'],
  Ol_Jorok: ['Gathanji', 'Central', 'Shamata', 'Leshao/Pondo', 'Weru'],
  Ndaragwa: ['Charagita', 'Kiriita', 'Kariamu', 'Ndogino', 'Munyaka'],
  Geta: ['Muringari', 'Kanyiriri', 'Gatimu', 'Mukui', 'Kiburu'],
  Mirangine: ['Tumaini', 'Ol Kalou Central', 'Ol Joro Orok'],

  // Nyeri County (6 constituencies, 30 wards)
  Tetu: ['Dedan Kimathi', 'Wamagana', 'Aguthi-Gaaki'],
  Kieni: ['Mweiga', 'Naromoru Kiamathaga', 'Mwiyogo/Endarasha', 'Mugunda', 'Gatarakwa', 'Thegu River', 'Kabaru', 'Gakawa'],
  Mathira: ['Ruguru', 'Magutu', 'Iriaini', 'Konyu', 'Kirimukuyu', 'Karatina Town'],
  Othaya: ['Mahiga', 'Iria-Ini', 'Chinga', 'Karima'],
  Mukurweini: ['Gikondi', 'Rugi', 'Mukurwe-Ini West', 'Mukurwe-Ini East'],
  Nyeri_Town: ['Khamis', 'Rware', 'Gatitu/Muruguru', 'Ruringu', 'Kamkunji/Kiganjo'],

  // Kirinyaga County (4 constituencies, 20 wards)
  Mwea: ['Mutithi', 'Kangai', 'Wamumu', 'Nyangati', 'Murinduko', 'Gathigiriri', 'Tebere'],
  Gichugu: ['Kabare', 'Baragwi', 'Njukiini', 'Ngariama', 'Karumandi'],
  Ndia: ['Mukure', 'Kiine', 'Kariti'],
  Kirinyaga_Central: ['Mutira', 'Kanyekini', 'Kerugoya', 'Inoi', 'Nyangeni'],

  // Murang’a County (7 constituencies, 35 wards)
  Kangema: ['Kanyenya-Ini', 'Muguru', 'Rwathia'],
  Mathioya: ['Gitugi', 'Kiru', 'Kamacharia'],
  Kiharu: ['Wangu', 'Mugoiri', 'Mbari Ya Ngai', 'Township', 'Muruka', 'Kagundu-Ini'],
  Kigumo: ['Kahumbu', 'Kinyona', 'Kigumo', 'Kangari'],
  Maragwa: ['Kimorori/Wempa', 'Makuyu', 'Nginda', 'Ng’araria', 'Ichagaki', 'Nginda'],
  Kandara: ['Ngararia', 'Muruka', 'Kagundu-Ini', 'Gaichanjiru', 'Ithiru', 'Ruchu'],
  Gatanga: ['Ithanga', 'Kakuzi/Mitubiri', 'Mugumo-Ini', 'Kihumbuini', 'Gatanga', 'Kariara'],

    // Nakuru County constituencies
  Molo: ['Mariashoni', 'Elburgon', 'Turi', 'Molo'],
  Njoro: ['Mau Narok', 'Mauche', 'Kihingo', 'Nesuit', 'Lare', 'Njoro'],
  Naivasha: ['Biashara', 'Hells Gate', 'Lake View', 'Maiella', 'Maai Mahiu', 'Naivasha East', 'Olkaria', 'Viwandani'],
  Gilgil: ['Gilgil', 'Elementaita', 'Mbaruk/Eburu', 'Malewa West', 'Murindati'],
  Kuresoi_South: ['Amalo', 'Keringet', 'Kiptagich', 'Kiptororo'],
  Kuresoi_North: ['Kiptororo', 'Nyota', 'Sirikwa', 'Kamara'],
  Subukia: ['Subukia', 'Waseges', 'Kabazi'],
  Rongai: ['Menengai West', 'Soin', 'Visoi', 'Mosop', 'Solai'],
  Bahati: ['Dundori', 'Kabatini', 'Kiamaina', 'Lanet/Umoja', 'Biashara'],
  Nakuru_Town_West: ['Barut', 'London', 'Kaptembwo', 'Kapkures', 'Rhoda', 'Shaabab'],
  Nakuru_Town_East: ['Biashara', 'Kivumbini', 'Flamingo', 'Menengai', 'Nakuru East'],

  // Embu County constituencies
  Manyatta: ['Ruguru/Ngandori', 'Kithimu', 'Nginda', 'Mbeti North', 'Kirimari'],
  Runyenjes: ['Gaturi South', 'Kagaari North', 'Kagaari South', 'Central Ward', 'Kyeni North', 'Kyeni South'],
  Mbeere_South: ['Mwea', 'Makima', 'Mbeti South', 'Mavuria', 'Kiambere'],
  Mbeere_North: ['Nthawa', 'Muminji', 'Evurore'],
//kitui County constituencies
 Mwingi_North: ['Ngomeni', 'Kyuso', 'Mumoni', 'Tseikuru', 'Tharaka'],
  Mwingi_West: ['Kyome/Thaana', 'Nguutani', 'Migwani', 'Kiomo/Kyethani'],
  Mwingi_Central: ['Central', 'Kivou', 'Nguni', 'Nu', 'Mui', 'Waita'],
  Kitui_West: ['Mutonguni', 'Kauwi', 'Matinyani', 'Kwa Mutonga/Kithumula'],
  Kitui_Rural: ['Kisasi', 'Mbitini', 'Kwavonza/Yatta', 'Kanyangi'],
  Kitui_Central: ['Miambani', 'Township', 'Kyangwithya West', 'Kyangwithya East', 'Mulango'],
  Kitui_East: ['Zombe/Mwitika', 'Nzambani', 'Chrulani', 'Voo/Kyamatu', 'Endau/Malalani', 'Mutitu/Kaliku'],
  Kitui_South: ['Ikanga/Kyatune', 'Mutomo', 'Mutha', 'Ikutha', 'Kanziko', 'Athi'],

  // Machakos County constituencies
    Masinga: ['Kivaa', 'Masinga Central', 'Ekalakala', 'Muthesya', 'Ndithini'],
  Yatta: ['Ndalani', 'Matuu', 'Kithimani', 'Ikombe', 'Katangi'],
  Kangundo: ['Kangundo North', 'Kangundo Central', 'Kangundo East', 'Kangundo West'],
  Matungulu: ['Tala', 'Matungulu North', 'Matungulu East', 'Matungulu West', 'Kyeleni'],
  Kathiani: ['Mitaboni', 'Kathiani Central', 'Upper Kaewa/Kaani', 'Lower Kaewa/Kaani'],
  Mavoko: ['Athi River', 'Kinanie', 'Muthwani', 'Syokimau/Mulolongo'],
  Machakos_Town: ['Kalama', 'Mua', 'Mutituni', 'Machakos Central', 'Mumbuni North', 'Muvuti/Kiima-Kimwe'],
  Mwala: ['Mbiuni', 'Makutano/Mwala', 'Masii', 'Muthetheni', 'Wamunyu', 'Kibauni'],

  // Makueni County constituencies
    Mbooni: ['Tulimani', 'Mbooni', 'Kithungo/Kitundu', 'Kiteta/Kisau', 'Waia/Kako', 'Kalawa'],
  Kilome: ['Kasikeu', 'Mukaa', 'Kiima Kiu/Kalanzoni'],
  Kaiti: ['Ukia', 'Kee', 'Kilungu', 'Ilima'],
  Makueni: ['Wote', 'Muvau/Kikumini', 'Mavindini', 'Kitise/Kithuki', 'Nzaui/Kalamba', 'Mbitini'],
  Kibwezi_West: ['Makindu', 'Nguumo', 'Kikumbulyu North', 'Kikumbulyu South', 'Nguu/Masumba', 'Emali/Mulala'],
  Kibwezi_East: ['Masongaleni', 'Mtito Andei', 'Thange', 'Ivingoni/Nzambani'],

  //Isiolo County constituencies
    Isiolo_North: ['Wabera', 'Bulla Pesa', 'Chari', 'Cherab', 'Ngare Mara'],
  Isiolo_South: ['Garbatulla', 'Kinna', 'Sericho'],

  //meru County constituencies
  Igembe_South: ['Mauro', 'Kiegoi/Antubochiu', 'Athiru Gaiti', 'Akachiu', 'Kanuni'],
  Igembe_Central: ['Igembe East', 'Njia', 'Kangeta', 'Akirang’ondu', 'Athiru Ruujine'],
  Igembe_North: ['Amwathi', 'Antuambui', 'Naathu', 'Antubetwe Kiongo', 'Ntunene'],
  Tigania_West: ['Athwana', 'Akithi', 'Kianjai', 'Nkomo', 'Mbeu'],
  Tigania_East: ['Thangatha', 'Mikinduri', 'Kiguchwa', 'Muthara', 'Karama'],
  North_Imenti: ['Municipality', 'Ntima East', 'Ntima West', 'Nyaki West', 'Nyaki East'],
  Buuri: ['Timau', 'Kisima', 'Kiirua/Naari', 'Ruiri/Rwarera'],
  Central_Imenti: ['Mwanganthia', 'Abothuguchi Central', 'Abothuguchi West', 'Kiagu', 'Abothuguchi East'],
  South_Imenti: ['Mitunguu', 'Igoji East', 'Igoji West', 'Abogeta East', 'Abogeta West', 'Nkuene'],


}
// gebruikers coordinaten alvast definieren.
let userLat;
let userLng;

document.addEventListener("DOMContentLoaded", async (event) => {
    // Laden
    const loadingElement = document.getElementById("loading");
    if (loadingElement){
        loadingElement.style.display = "block";
    }

    // Probeer locatie op te halen, en laad de verhalen.
    try {
        await getLocation();
        loadVerhalen();

    // Als geen locatie kan worden verkegen, door of rejection of timeout probeer dan nog 1 keer om toch de verhalen op te halen.
    } catch (error) {
        console.error("Error bij krijgen locatie", error);
        setTimeout(async () => {
            try {
                await getLocation();
                loadVerhalen()
            }
            catch (error) {
                loadVerhalen();
            }
        }, 1000);
    } finally {
        if (loadingElement){
            loadingElement.style.display = "none"
        }
    }
});

function getLocation() {
    return new Promise((resolve, reject) => {
        const timeout = 6000;
        // Zet 6 sec timer om maximaal de user zijn locatie op te halen, anders reject de promise.
        const timer = setTimeout(() => {
            reject(new Error("Locatie ophalen duurde te lang."));
        }, timeout);

        const geoOptions = {
            enableHighAccuracy: true,
            timeout: timeout,
            maximumAge: 0
        };

        // Vraag locatie op van de gebruiker
        navigator.geolocation.getCurrentPosition((pos) => {
            clearTimeout(timer);
            userLat = pos.coords.latitude;
            console.log("userLat",userLat);
            userLng = pos.coords.longitude;
            console.log("userLng", userLng);
            
            resolve();
        }, (err) => {
            clearTimeout(timer);
            reject(err);
        },           
        geoOptions
        );
    })
}



function loadVerhalen(){
    // Haal het verhaal op uit URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("verhaal");

    // const met alle verhalen
    const verhalen = [
        // Openbare Begraafplaats
        {
            id: 1,
            titel: "Oorlog - Jan Hidding",
            tekst: "Geen partij kiezen, afzijdig houden, dat was de politieke strategie die de Nederlandse regering koos in aanloop naar de tweede wereldoorlog. De neutraliteit had ons land immers de gruwelijkheden en destructie van de Eerste Wereldoorlog bespaard. Na de Duitse inval in Polen in 1939 werden er door de Nederlandse regering toch voorbereidingen getroffen voor een eventuele oorlogssituatie. In 1939  werden daarom 250.000 mannen gemobiliseerd om het Nederlandse leger te versterken. Deze mannen zijn veelal gewone Nederlandse burgers die werkloos zijn geworden door de economische crisis uit de jaren 1931 - 1939. Dit geldt ook voor Onstwedder Jan Hidding. Jan is een jonge man van 22, geboren in Onstwedde. Ook hij moet in 1939, vlak voor de Tweede Wereldoorlog, in militaire dienst. Jan wordt vlak bij Wassenaar gestationeerd, bij het vliegveld Valkenburg, dicht bij de kust. Hij is onderdeel van eenheid 1R.I . Zijn taak is om samen met zijn kameraden de duinen rondom het vliegveld Valkenburg bij Wassenaar te verdedigen in het geval van oorlog.  Op 10 mei 1940 gebeurt dan toch wat de Nederlanders al maanden voor vrezen, het is oorlog. Het Duitse leger valt Nederland op verschillende plekken binnen en het Nederlandse leger, enigszins verrast, doet haar best het land te verdedigen. In de ochtend van 10 mei vallen de Duitsers vliegveld Valkenburg aan met bommen en parachutisten. Jan en zijn medesoldaten proberen de Duitsers tegen te houden, maar de strijd om Jan en zijn kameraden heen is heel erg chaotisch. Er is veel verwarring en sommige soldaten weten niet goed wat ze moesten doen. De Duitsers weten het vliegveld te veroveren, maar als de eerste Duitse vliegtuigen proberen te landen verzakken deze in de zachte ondergrond. Het vliegveld blijkt onbruikbaar en wordt later die dag al terug veroverd door de Nederlandse soldaten. Om het vliegveld heen wordt in de nacht van 11 mei veel gevochten. Jan en zijn medesoldaten proberen in de duinen, vlak bij Wassenaar, de Duitsers tegen te houden zodat ze niet naar het regeringscentrum in Den Haag door kunnen stoten. Met man en macht verzetten de Nederlandse soldaten zich tegen de Duitse agressor en weten ze de opmars te vertragen. Tijdens deze gevechten verloor Jan Hidding uit Onstwedde zijn leven. Hoe, wat of wanneer zal voor altijd onbekend blijven. Wat we wel altijd zullen blijven herinneren is hoe Jan Hidding uit Onstwedde ons land met zijn leven heeft verdedigd. Zijn vrienden en dorpsgenoten uit Onstwedde hebben later een gedenksteen voor hem geplaatst als eerbetoon. Deze is terug te vinden op de openbare begraafplaats. Ook wordt Jan, met zijn gevallen medesoldaten, herdacht bij het monument in Wassenaar Het Nederlandse leger verzette zich hevig tegen de Duitse invasie en de bij de Slag om Den Haag werd de Duitse opmars succesvol afgestopt. Na een vier dagen durende strijd werd Rotterdam op 14 mei verwoest door bombardementen van de Duitse luchtmacht. De dreiging ook andere grote steden te vernietigen dwong het Nederlandse leger op 15 mei tot capitulatie. Net als in de rest van Nederland brak in Onstwedde een onzekere tijd aan van bezetting aan. Hoewel de start van de Tweede Wereldoorlog in Onstwedde relatief rustig verliep, zouden de gevolgen van een nieuw Duits regime ook in Onstwedde voelbaar zijn. ",
            afbeelding: "verhaal1.png",
            locatie: { lat: 53.086139817746876 , lng: 6.976357432866958 }
        },
        // Dorpstraat 66
        {
            id: 2,
            titel: "Arbeitseinsatz - Jochie Tipker",
            tekst: "Tijdens de bezettingsjaren van Nederland voerde de Duitse bezetter steeds strengere maatregelen in om de oorlogsinspanningen te ondersteunen. Het Duitse leger werd vanaf 1943 in het oosten langzamerhand teruggedrongen in de oorlog met de Sovjet-Unie. Ook de geallieerden drongen de Duitsers en Italiaanse bondgenoten vanaf 1943 terug in Italië en starten in 1944 een offensief in Normandië Frankrijk. Veel Duitse mannen vochten aan het front en er was een groot tekort aan arbeidskracht in Duitsland. Een van de maatregelen was die Arbeitseinsatz, een gedwongen arbeidsdienst waarin Nederlandse mannen werden verplicht om in Duitsland te werken. In september 1944 werd ook Onstwedde geconfronteerd met deze harde realiteit. Dit geldt ook voor Johannes Tipker, in het dorp bekend als 'Jochie', woonde aan de Dorpstraat 66. Jochie was vader van Geert en zijn vrouw Diene was hoogzwanger.  Jochie is een van de mannen die in de nacht van 29 op 30 september 1944 van zijn bed werd gelicht door de Landwacht en de Sicherheitsdienst (SD). Samen met andere mannen uit Onstwedde en omliggende dorpen werd hij gearresteerd. De reden? Het vermoeden van anti-Duitse gevoelens, hoewel de exacte aanklacht nooit duidelijk zou worden. Misschien had het te maken met een ruzie een paar maanden eerder met een NSB’er die Jochie een klap zou hebben gegeven? Deze invallen waren niet ongewoon; de Duitsers hadden een groeiende behoefte aan arbeidskrachten, en een beschuldiging van verzet of zelfs verdenking was genoeg om mannen naar Duitsland te deporteren. Jochie werd via Winschoten naar Delfzijl getransporteerd. Vanaf hier vertrekt de boot naar  Helgoland, een eiland waar de Duitse kustverdediging, de Atlantikwall, werd gebouwd. De mannen worden naar een Arbeitslager gestuurd, waar hij samen met andere dwangarbeiders in een houten barak werd ondergebracht. Het leven in het kamp was hard: nauwelijks voedsel, zware arbeid en een schrijnend gebrek aan hygiëne. Dag na dag werkte hij onder barre omstandigheden, met als enige rantsoen een paar sneetjes brood, boter en wat soep. Zijn overlevingskracht werd op de proef gesteld en Jochie had alsmaar honger. Jochie en zijn lotgenoten konden gelukkig op veel steun rekenen van de Onstwedder gemeenschap, zij bleven voedselpakketten sturen die aankwamen op Helgoland door de hulp van Okko Frikken en broer Theo Tipker. Toen de oorlog in april 1945 haar einde naderde, werd Jochie samen met de andere Helgolanders overgeplaatst naar een kamp in Stade. De spanning onder de Duitsers is voelbaar bij het naderen van de geallieerden. Jochie besluit samen met Wubbe Nobbe het kamp te ontvluchten en terug naar Nederland te lopen. Een tocht niet zonder gevaar, maar Jochie kan niet langer wachten om zijn gezin weer te zien. Diezelfde nacht word Jochie bevrijd door het oprukkende Engelse leger en keerde hij met een Jeep terug naar Nederland. De ontberingen hadden hun tol geëist, sterk vermagerd komen Jochie en de andere Helgolanders op 10 mei aan in Onstwedde. Jochie is weer herrenigt met Diene, Geert en de pas geboren Derk. Eenmaal thuis sterkt Jochie maar niet aan en wordt ernstig ziek. Hij wordt opgenomen in het ziekenhuis in Groningen waar Diene hem regelmatig bezoekt. Op 19 februari 1946 overlijd Jochie Tipker, slechts enkele maanden na zijn terugkeer, aan de gevolgen van tuberculose en uitputting. Zijn verhaal is een herinnering aan de duizenden Nederlanders die werden weggevoerd voor de Arbeitseinsatz en de offers die zij hebben gebracht. Velen werden opgeroepen voor Arbeitseinsatz en moesten in Duitsland aan het werk. Veel Onstwedder mannen kregen een oproep om in Duitsland te gaan werken, de meesten gaven hier gehoor aan en kwamen als bakker of boer te werken. Anderen weigerden en doken onder.  ",
            afbeelding: "verhaal2.png",
            locatie: { lat: 53.039145 , lng: 7.0436952 }
        },
        //Luringstraat 22
        {
            id: 3,
            titel: "Onderduiken - Jan Wever",
            tekst: "In de jaren na de Duitse bezetting van Nederland in mei 1940 werden de gevolgen van het nieuwe bewind ook in Onstwedde steeds zichtbaarder en voelbaar. De vrijheid van de Nederlandse bevolking werd stap voor stap ingeperkt.  Onderdrukking, uitsluiting en vervolging werden de dagelijkse realiteit, en voor velen kwam de angstige beslissing om onder te duiken om te ontsnappen aan deportatie. Dit bracht een zware verantwoordelijkheid voor mensen in de dorpen en steden, die moesten beslissen of zij hun levens en die van hun gezinnen op het spel wilden zetten om anderen te helpen. Dit geldt ook voor de Onstwedder Jan Wever. Jan Wever stond bekend om zijn goede humor en samen met zijn vrouw Jacoba runde hij een textielwinkel in de Luringstraat. In de zomer van 1943 kwam Jan ter ore dat de joodse familie Meijer, die ondergedoken zat bij Jacob Korsse, daar niet langer veilig zat. Jan en Jacoba aarzelden niet en zij boden onderdak aan de Joodse familie Meijer. Het was een gevaarlijke beslissing, maar voor Jan en Jacoba voelde het als iets wat ze gewoon moesten doen. De familie Meijer dook onder op de zolder boven hun winkel, waar zij dag en nacht stil moesten zijn om niet ontdekt te worden. Overdag moesten de 'gasten' zo stil mogelijk zijn; ze mochten geen geluid maken dat klanten beneden kon horen. ’s Avonds, wanneer het dorp in rust was, mochten ze even naar buiten om frisse lucht te halen. Het leven werd echter steeds moeilijker. Er waren voedseltekorten, en alles wat gekocht moest worden, was op de bon. Jan wist op verschillende manieren aan extra distributiebonnen te komen om zowel zijn eigen gezin als de onderduikers te voeden. Helaas bleef dit niet onopgemerkt in het dorp. Er waren altijd mensen die wantrouwig waren, en Jan wist dat er risico's waren. En toen, in de nacht van 14 op 15 juni 1944, ging het mis. De Landwacht, en een groepje fanatieke NSB’ers, deed een inval bij Jan Wever. Ze zochten naar bewijzen van zwarthandel en vonden een grote hoeveelheid bonnen, ook de familie Meijer werd bij deze inval ontdekt . Jan werd gearresteerd. Hij werd beschuldigd van het helpen van Joden en het verzamelen van distributiebonnen. Hij werd gedeporteerd naar kamp Mauthausen, een berucht kamp in Oostenrijk. Daar moest hij zwaar werk verrichten, onder erbarmelijke omstandigheden en met nauwelijks voedsel. Toch overleefde Jan de barre winter en de honger in het kamp, tot de Russen het kamp in 1945 bereikten. Jan overleefde ook de dodenloop die hier op volgde, maar eenmaal aangekomen in het ziekhuis van Groningen was Jan er slecht aan toe, uitgehongerd en ziek, en woog nog geen 80 pond.. Op 26 juni 1945 stierf Jan Wever aan de gevolgen van de ontberingen, hij was slechts 31 jaar oud. Tijdens de Tweede Wereldoorlog doken naar schatting zo’n 350.000 mensen onder voor de Duitse bezetter. Ook in Onstwedde waren er veel gezinnen die onderduikers in huis namen, sommigen voor enkele nachten, anderen voor langere tijd. Het faciliteren van onderduikadressen, voedsel, transport of wat voor hulp dan ook werd door de Duitsers gezien als daad van verzet met zware straffen tot gevolg. De bereidheid van Nederlanders zoals Jan om hun eigen veiligheid op te offeren voor het welzijn van anderen, zelfs in de donkerste tijden, zijn een voorbeeld van menselijkheid en ongekende moed. Het verhaal van Jan Wever staat dan ook symbool voor de talloze anderen die net als Jan niet kozen om weg te kijken, maar om hun mede mens te hulp te schieten in tijden van nood. Het daarom belangrijk dat het verhaal van Jan zijn heldendaden voort leeft, als herinnering aan de gevaren en opofferingen die het onderduiken met zich meebracht in de tijd van de Duitse bezetting.",
            afbeelding: "verhaal3.png",
            locatie: { lat: 53.039016 , lng: 7.040799 }
        },
        // Dorpsstraat 49
        {
            id: 4,
            titel: "Verzet/Meistaking - Harm Wessels",
            tekst: "In de jaren van de Duitse bezetting werd Nederland stap voor stap onderworpen aan het totalitaire regime van Nazi-Duitsland. Vrijheid werd ingeperkt, verzet werd zwaar bestraft en angst werd een dagelijks gegeven. Toch groeide langzaam het verzet. De Februaristaking van 1941, een protest tegen de Jodenvervolging, was het eerste massale verzet tegen de Duitse bezetter in Nederland. Twee jaar later, in april en mei 1943, leidde de Duitse aankondiging dat tienduizenden Nederlandse oud-militairen zich moesten melden voor dwangarbeid tot een nieuwe opstand: de Meistaking. Op 1 mei 1943 brak ook in Onstwedde de staking uit. Wat begon als een protest in de fabrieken en werkplaatsen verspreidde zich als een lopend vuurtje door het hele land, tot in de kleinste dorpen. In Onstwedde kwamen jonge mannen samen op het pleintje voor café Meijer aan de Dorpsstraat. Zij besloten de weg te blokkeren op de kruizing tussen de Luringstraat en de Dorpsweg. Om een signaal te geven dat Onstwedde niet zonder verzet zou buigen voor de bezetter. Tegelijkertijd trokken boeren en landarbeiders de velden niet in; de melk bleef in de bussen zitten. Abel van der Laan en zijn vrienden keken toe hoe de sfeer steeds grimmiger werd. Terwijl de staking zich uitbreidde, kwam Harm Wessels vanuit de Holte aanfietsen. Hij had gewerkt in Wessinghuizen en was op weg naar huis. Maar eerst wilde hij nog even een pakje tabak halen bij het winkeltje van Moed aan de Dorpsstraat. Toen Harm bij de blokkade arriveerde had hij de pech dat op dat moment de situatie escaleerde. Over de Luringstraat kwamen plotseling Duitse soldaten en SS’ers aanstormen. De stakende mannen beseften direct het gevaar en sloegen op de vlucht. Sommigen renden de huizen en schuren in, anderen probeerden via het achterpad te ontsnappen. Harm begreep de ernst van de situatie, gooide zijn fiets op de grond en zette het op een lopen richting de Wessinghuizerweg. Maar het was te laat. Harm werd tijdens zijn vlucht geraakt door Duitse kogels en overleefde dit niet. De repressie was streng. De Duitsers lieten zien dat verzet niet ongestraft bleef. Meerdere stakers uit de regio werden opgepakt en op transport gesteld naar concentratiekampen of gefusilleerd als afschrikwekkend voorbeeld. De dagelijkse aanwezigheid van de Duitse bezetter bracht risico’s met zich mee. De familie Van der Laan, een hardwerkend boerengezin, merkte hoe de oorlog langzaam hun leven binnensloop. Duitsers kwamen regelmatig paarden vorderen, waaronder vader Jan zijn geliefde paard. Abel en zijn broer zagen hoe hun vader probeerde de soldaten tevreden te houden zonder zelf in gevaar te komen. Dit was niet alleen materieel verlies, maar ook een confrontatie met de machteloosheid die zoveel Nederlanders voelden onder de bezetting. De sfeer in het dorp veranderde. Mensen werden voorzichtiger in wat ze zeiden, want NSB’ers en informanten waren overal. De Onstwedders wisten dat een verkeerde opmerking of een ongepaste blik genoeg kon zijn om in de problemen te raken. Duitsers waarschuwden kinderen zelfs om niet te zingen, omdat Duitse oren alles konden horen. De Meistaking in Onstwedde was een klein onderdeel van een grotere beweging, maar symboliseert de moed en het lijden van gewone Nederlanders onder de bezetting. Ook laat het zien dat verzetsacties vaak onbedoelde slachtoffers eiste zoals Harm Wessels. Hoewel verzet gevaarlijk was, weigerden velen zich neer te leggen bij onderdrukking. Dit verhaal herinnert ons eraan dat vrijheid niet vanzelfsprekend is en dat de keuze om op te staan tegen onrecht, zelfs onder de zwaarste omstandigheden, een daad van moed is.",
            afbeelding: "verhaal4.png",
            locatie: { lat: 53.03782653808594 , lng: 7.043193340301514 }
        },
        // Dorpsstraat 27
        {
            id: 5,
            titel: "Jodenvervolging - Familie Meijer",
            tekst: "In Europa werden joden al eeuwen gediscrimineerd op basis van hun geloof. Na de eerste wereldoorlog leefde de Jodenhaat op onder een klein gedeelte van de bevolking. Zij geloofden ten onrechte dat de joden verantwoordelijk waren voor de Duitse overgave tijdens Eerste Wereldoorlog. “De Dolkstootlegende”, zoals deze theorie later zou komen te staan, werd door Adolf Hitler en zijn partij de NSDAP(Nazi’s) om de joden als zondebok aan te wijzen. Toen Adolf Hitler en de Nazipartij de macht grepen in Duitsland in 1933, werd dit antisemitisme omgezet in staatsbeleid. De ideologie van de nazi’s, gebaseerd op de rassenleer, beschouwde de Joodse gemeenschap als een bedreiging voor de zogenaamde Arische superioriteit. In 1935 werden de Neurenberger wetten aangenomen, die Joden hun burgerschapsrechten ontnamen en hen uitsloten van het openbare leven. Na de Duitse inval en bezetting van Nederland in 1940, werden ook hier steeds meer wetten ingevoerd die de rechten van Joden inperkten. Het beleid om Nederland jodenvrij te maken, zou uiteindelijk leiden tot deportaties van grote groepen joden naar vernietigingskampen. In Onstwedde woonden twee joodse families, de familie Meijerl en de familie Menkel. Hun verhalen laten zien hoe dat het gedachtegoed van de Adolf Hitler en zijn Nazi partij voelbaar waren de kleinste dorpen van Nederland en diepe littekens achterliet in de gemeenschap. De familie Meijer woonden al jaren in Onstwedde en waren bekend in heel het dorp. Salomon Meijer runde samen met zijn vrouw Carolina Jacobson een slagerij aan de Dorpsstraat 38. Hier woonden ze samen met hun kinderen Saartje, Simon en Mozes.  Ze waren een hardwerkend en gastvrij gezin dat ondanks enkele vooroordelen een plek had gevonden in de hechte dorpsgemeenschap. De slagerij floreerde, en de familie stond bekend om hun behulpzaamheid en betrokkenheid. Even verderop woont de vader van Simon aan de Dorpsstraat 27. De vader van Salomon, Samuel Simon, woonde hier zijn broers Jakob en Abraham en hun zus Schoontje. Het huis aan de Dorpsstraat 27 werd door de Onstwedders ook wel het Jeud’nhoes genoemd. Met de Duitse bezetting van Nederland in mei 1940 veranderde alles voor de familie Meijer. De maatregelen tegen de Joodse gemeenschap namen snel toe. Het begon met kleine beperkingen: reisverboden en verplichte registratie. In 1942 volgden drastischer maatregelen: de verplichte ster op de kleding en het verbod om publieke plaatsen te bezoeken Salomon besloot dat het niet langer veilig was en hij vond samen met Carolina en zijn zoons Simon en Mozes een schuilplaats bij Jacob Korsse, een kennis in het dorp. Tijdens deze periode bereikt de familie het trieste bericht dat Saartje, de enige dochter van Salomon en Carolina, in Apeldoorn is komen te overlijden. Door de gevaarlijke maatregelen kan het gezin de begrafenis niet bijwonen. Na enige tijd werd de schuilplaats bij Jacob Korse te gevaarlijk. Via contacten binnen de gemeenschap kwam de familie terecht op de zolder van de textielwinkel van Jan en Jacoba Wever aan de Luringstraat. Hier leefden Schoontje, Samuel en Jacob Meijer in angst en stilte, dag in dag uit. Vader Samuel Simon, Jakob en Schoontje weten geen onderduikadres te vinden en zij worden in 1943 in de nacht van 8 op 9 maart gearresteerd in hun woning, het Jeud’nhoes aan de Dorpsstraat 27. In de nacht van 14 op 15 juni in 1943 gaat het ook mis voor het gezin ondergedoken aan de Luringstraat. De Landwacht, samen met enkele fanatieke NSB’ers, vielen het huis van Jan Wever en Jacoba binnen. De Meijers werden ontdekt en gearresteerd. Alle gearresteerde Meijers ondergingen hetzelfde lot, afgevoerd naar kamp Westerbork en vervolgens gedeporteerd naar concentratiekampen in het oosten. Simon Samuel, Jakob en Schoontje vinden de gruwelijke dood in de gaskamers van vernietigingskamp Sobibor. Salomon en Carolina worden eveneens vermoord in de gaskamers van vernietigingskamp Auschwitz. Mozes en Simon worden niet meteen vermoord, maar worden geselecteerd om te werken voor de Duitsers. Mozes werd uiteindelijke op 15 maart 1945 in midden Europa vermoord, Simon kwam enkele dagen voor de bevrijding op 30 april 1945 om in Duitsland.  Alleen Abraham Meijer, die ondergedoken zat op de Barlage bij Job Veldhuis, overleefde de oorlog. De familie Menkel verhuisde in 1933 vanuit Duitsland naar Nederland, op de vlucht voor de nazi’s. Karl Menkel, zijn vrouw Carolina van den Berg, en hun kinderen Herbert en Margot verhuisden uiteindelijk naar Onstwedde en gingen wonen aan de Luringstraat 15. Ze hoopten in Onstwedde een veilig thuis te vinden en een nieuw bestaan op te bouwen. Vader vond een baan in de werkverschaffing in Jipsinghuizen en Margot krijgt al snel vriendinnen in het dorp die haar Marga gaan noemen. Als de Duitsers in 1940 Nederland bezetten veranderd er veel voor de familie.  Als Joodse familie waren ze al snel het doelwit van de Duitse bezetter en de dreiging die na hun vlucht uit Duitsland verleden tijd leek was aan de orde van de dag. Naarmate meer anti-joodse maatregelen volgden door de bezetter, probeerde vader Karl, zonder succes, een onderduikadres te vinden. Op 13 november 1942 werd de familie Menkel in de nacht gearresteerd door de Landwacht en op transport gesteld naar Westerbork. Karl Menkel werd later gedeporteerd naar vernietigingskamp Auschwitz, waar hij op 30 oktober 1944 werd vermoord. Carolina en Herbert ondergingen eenzelfde lot in Auschwitz en concentratie kamp Friedland. Margot, de jongste van de familie, overleefde ternauwernood de concentratiekampen in Theresienstadt, Auschwitz, Dresden en nogmaals Theresienstadt. Na de oorlog keerde Margot terug naar Onstwedde, getekend door de verschrikkingen die zij had doorstaan. De verhalen van de families Menkel en Meijer tonen de impact van de Holocaust op de Joodse gemeenschap en zijn een tragische voorbeeld een periode van systematische vervolging en massamoord. De Jodenvervolging heeft niet alleen de families Menkel en Meijer vernietigd, maar grote impact gehad op de Onstwedder gemeenschap. Het verlies van deze families herinnert ons eraan hoe kwetsbaar vrijheid is en hoe belangrijk het is om te blijven herdenken en leren. Het is dus ontzettend belangrijke hun verhalen levend te houden om zo toekomstige generaties te waarschuwen voor de gevolgen van haat en intolerantie.",
            afbeelding: "verhaal5.png",
            locatie: { lat: 53.03559112548828 , lng: 7.042584419250488 }
        },
        // Havenstraat 5 – Bakkerij Ten Have
        {
            id: 6,
            titel: "Geertje Hooiveld-ten Haver",
            tekst: "De Duitse bezetting tussen 1940 en 1945 veranderde het dagelijks leven van de Nederlandse bevolking ingrijpend. Wat begon met kleine aanpassingen in regelgeving, zoals verduisteringsmaatregelen en censuur, groeide al snel uit tot een complete onderdrukking van de Nederlandse samenleving. De oorlogsinspanningen van de Duitsers zorgden er voor dat veel producten en materialen werden gevorderd voor het Duitse leger. Onder de Nederlandse bevolking leidde dit tot een periode met schaarste en distributiesystemen. Hoewel het gebrek aan voedsel in Onstwedde minder impact had dan in het westen van het land, waren ook hier veel producten en materialen niet of nauwelijks beschikbaar. De maatregelen van de Duitse bezetters waren ook voelbaar bij Bakkerij Ten Have, gelegen aan de Havenstraat 5 in Onstwedde. Roelf Ten Have woont hier met zijn gezin, vrouw Harmina Hten Have-Hilgenga, dochter Geertje, dochter Tiny en zoon Klaas, werkten hard om het dorp van brood te voorzien. Grootmoeder Geertje Hilgenga-Buist, die naast de bakkerij woonde, hielp met kleine klusjes zoals het opstoken van de kachel. Ondanks de moeilijke tijden bleef de familie hun werk voortzetten, zelfs toen de Duitse bezetter steeds strengere regels invoerde. De distributiewetten maakten het steeds lastiger om voldoende grondstoffen te krijgen. Ook het verzetten van de klok,  die met één uur en veertig minuten vooruitging, was een van de vele Duitse aanpassingen. Ondanks de uitdagingen bleef Bakkerij Ten Have functioneren. Maar de echte moeilijkheden kwamen met de schaarste aan voedsel en vlees. Vader Roelf hield varkens in de schuur en vergat bewust af en toe een pas geboren biggetje op te geven voor registratie. Hierdoor ontving hij meer distributiebonnen en kon het gezin genieten van een stukje varkensvlees als het varken vet genoeg was voor de slacht. Een illegale praktijk die in het hele land gangbaar was, maar niet zonder gevaar. Op een regenachtige dag verscheen onverwacht een controleur bij de bakkerij, net toen het pas geslachte varkensvlees gepekeld werd. De familie moest snel handelen om illegaal geslacht vlees te verbergen. Moeder Harmina houdt controleur net lang genoeg op zodat dochter Geertje snel met een stempelmachine het vlees kon voorzien van officiële markeringen. Een opluchting, want hiermee wist de familie een grote straf te vermijden. Roelf stuurde ook geregeld zijn bakkersknechten Roelf en Hendrik van der heide op pad om diep in de nacht rogge op te halen bij boeren in pekel. Een gevaarlijke onderneming, want boeren zijn verplicht de volledige graanoogst af te staan aan de Duitse bezetter. Bakkers mogen hun meel alleen op de bon inkopen. De jongens slagen er in om onopgemerkt de rogge van Mussel naar de Bakkerij te vervoeren en slaan deze op achter in de schuur. Wederom komt er een onverwacht een controleur langs en ditmaal heeft de bakker minder geluk, de Rogge wordt ontdekt en meegenomen naar Winschoten. Hij weigert de boeren te verraden en komt na enkele dagen vrij met een flinke boete van 500 gulden. Je zou zeggen dat Roelf hier wel van geleerd zou hebben, maar de bakker blijft de regels omzeilen om zijn vak te kunnen beoefenen. Zo blijft hij bijvoorbeeld de roggemalerij illegaal gebruiken, wat tot nog een boete leidt… Ook maakt Ten Have er geen probleem van als hij een verdacht grote bestelling broden binnen krijgt die later voor de 17 onderduikers in het Stadskanaalster Achterhuis blijken te zijn. Iets lekkers voor bij de koffie is ook geen vanzelfsprekendheid, ook suiker is op de bon en er is bijna alleen nog maar surrogaat(namaak) koffie verkrijgbaar. Zelfs het rondbrengen van de broden op de fiets door dochter Geertje is lastig, door heel het land werden goede fietsen gevorderd en fietsen met mankementen waren lastig te repareren door een gebrek aan materialen. Ondanks deze tegenvallers bleef de bakkerij brood leveren aan het dorp tot het einde van de oorlog. Het verhaal van Bakkerij Ten Have is een weerspiegeling van de bredere uitdagingen waarmee Nederlanders tijdens de bezetting werden geconfronteerd. De oorlog bracht schaarste en onderdrukking met zich mee, maar het dwong ook tot creativiteit en samenwerking. Families zoals de Ten Haves zorgden ervoor dat gemeenschappen bleven draaien, ondanks de moeilijkheden. Het leven op de bon beïnvloedde elke Nederlander in hun dagelijkse manier van leven en maakte de gevolgen van de bezetting voor iedereen voelbaar. Verhalen zoals dat van de familie Ten Have zijn slechts een van vele, maar blijven ons herinneren aan de menselijke kant van de oorlog en het belang van solidariteit in moeilijke tijden.",
            afbeelding: "verhaal6.png",
            locatie: { lat: 53.0331046 , lng: 7.0427122 }
        },
        // Kerklaan 18
        {
            id: 7,
            titel: "Jaap Bestebreurtje",
            tekst: "De winter van 1944-1945 staat bekend als de Hongerwinter. In het westen van Nederland leden honderdduizenden mensen honger door de strenge winter, de tekorten aan voedsel en brandstof, en de afsluiting van bevoorradingsroutes door de Duitsers. Steden als Rotterdam en Amsterdam waren het zwaarst getroffen. Brood, melk en aardappelen waren nauwelijks te krijgen, en veel mensen moesten hun laatste bezittingen ruilen voor voedsel. Om te voorkomen dat kinderen zouden sterven door ondervoeding, werden duizenden stadskinderen naar het platteland gestuurd, waar boeren en dorpsbewoners hen opvingen en van voedsel voorzagen.Zo kwam ook Jaap Bestebeurtje, een 7-jarige jongen uit Rotterdam, in Onstwedde terecht. Zijn eerste reis naar het noorden begon in augustus 1942, nog voor de Hongerwinter. Hij stapte op in Rotterdam, een stad die al zwaar gebombardeerd was, en begon aan een lange reis naar het noorden. De trein reed via Zwolle, waar de kinderen overstapten op een boemeltrein die hen door de Drentse heide bracht. Zijn eindbestemming was Onstwedde, een dorp waar hij zou verblijven bij Wiepko en Albertje Boels-Kok aan de Kerklaan 18. Dit echtpaar had geen kinderen, maar ze ontvingen Jaap met open armen. Het huis rook vreemd voor Jaap – niet naar de rook en uitlaatgassen van de stad, maar naar hooi, aardappelloof en versgebakken brood. Ook het eten was anders: roggebrood in plaats van witbrood, melk direct van de koe en aardappelen met spek in plaats van de magere soep die hij thuis gewend was. In het begin was het wennen. Hij begreep het Groningse dialect nauwelijks en miste zijn familie in Rotterdam. Maar langzaam begon hij zich aan te passen. Na aangesterkt te zijn keerde Jaap datzelfde jaar terug naar Rotterdam. De situatie in Rotterdam werd in 1944 alleen maar erger. Voedsel was er nauwelijks, de mensen vielen kilo’s af en kinderen stierven aan ondervoeding. In augustus 1944 mocht Jaap opnieuw naar Onstwedde, deze keer samen met zijn zus Martha en broer Bernard. Dit keer werden ze niet alleen opgevangen bij de familie Boels, maar ook bij boer Huls in de Höfte en boer Halmigh. Op de boerderij leerde Jaap over het harde leven op het platteland. Hij hielp met het binnenhalen van hooi, het rapen van aardappelen en het voeren van de koeien. Voor een stadskind was dit een compleet andere wereld. Maar het allerbelangrijkste: hij kreeg weer voldoende te eten. Tijdens deze winter werden voedselpakketten en melk vanaf het platteland naar het westen gestuurd, maar vaak kwam het niet aan door plunderingen van de Duitsers. Daarom werden kinderen zoals Jaap naar het noorden gehaald – een directe manier om levens te redden. De Hongerwinter was een van de meest ingrijpende periodes in de Nederlandse geschiedenis. Terwijl in het westen van Nederland duizenden mensen stierven door honger, hielp de bevolking op het platteland zoveel als ze konden. Het verhaal van Jaap en de gastvrijheid van Onstwedde laat zien dat, ondanks oorlog en tekorten, menselijkheid en solidariteit bleven bestaan. Boeren en dorpsbewoners deelden hun voedsel met kinderen die anders geen overlevingskans hadden gehad.",
            afbeelding: "verhaal7.png",
            locatie: { lat: 53.0319457 , lng: 7.0430776 }
        },
    ];

    const verhaal = verhalen.find(v => v.id === parseInt(id))

    // Zet verhaal in de html
    if (verhaal) {
        document.getElementById("titel").textContent = verhaal.titel;
        document.getElementById("tekst").textContent = verhaal.tekst;
        document.getElementById("nummer").textContent = "Verhaal " + verhaal.id;
        document.getElementById("afbeelding").src = "img/" + verhaal.afbeelding;

        let audio = null;

        function voorlezen(){
            // Maak een nieuw audio object aan wanneer de audio null is || gepauzeerd.
            if (!audio || audio.paused) {
                audio = new Audio(`sounds/verhaal${id}.mp3`);
            }

            // Wanneer niet gepauzeerd, pauzeer hem en zet de tijd op 0
            if (!audio.paused){
                audio.pause();
                audio.currentTime = 0;
            }
                                
            // Speel geluid af van desbetrefende verhaal
            audio.play()
        }

        // Creeer button net voor het element met id tekst, die onclick="Voorlezen()"
        const button = document.createElement("button");
            button.className = "btn btn-dark mb-4 mt-2";
            button.innerHTML = '<i class="bi bi-volume-up"></i>';
            button.addEventListener("click", voorlezen);

            const tekstID = document.getElementById("tekst");
            tekstID.parentNode.insertBefore(button, tekstID);
    } else {
        // Foreach de verhalen op de homepagina
        const container = document.getElementById("verhalenContainer");

        verhalen.forEach(verhaal => {
            // Check of de locatie is gezet, wanneer niet zetten we &origin niet in de link.
            const isUserLocationSet = userLat !== undefined && userLng !== undefined && !isNaN(userLat) && !isNaN(userLng);
            const route = `https://www.google.com/maps/dir/?api=1${isUserLocationSet ? `&origin=${userLat},${userLng}` : ''}&destination=${verhaal.locatie.lat},${verhaal.locatie.lng}`
            container.innerHTML += 
            `
            <p>LAT ${userLat} LNG ${userLng}</p>
            <div class="card shadow m-3">
                <div class="text-center">    

                <div class="card-body" id="myInput">
                    <h5 class="card-title">Verhaal ${verhaal.id}</h5>

                    <h6 class="card-subtitle mb-2 text-muted">        
                        <p>${verhaal.titel}</p>
                    </h6>
                    
                        <div class="post-image-container mb-4">
                            <img src="img/${verhaal.afbeelding}" alt="Verhaal afbeelding" class="img-fluid rounded mx-auto d-block shadow-2-strong" style="width:300px">
                        </div>    
                        <a href="oorlogsverhaal.html?verhaal=${verhaal.id}" data-lat="${verhaal.locatie.lat}" data-lng="${verhaal.locatie.lng}" class="card-link btn btn-dark shadow text-center verhaal-link">Bekijk verhaal</a>

                        <a href="${route}" data-lat="${verhaal.locatie.lat}" data-lng="${verhaal.locatie.lng}" class="card-link btn btn-dark shadow text-center route-link">Bekijk route</a>
                    </div>
                </div>
            </div>
            `
        });

        
    const threshold = 0.1;

    // Verhaal link
    document.querySelectorAll('.verhaal-link').forEach(link => {
        const verhaalLat = parseFloat(link.getAttribute('data-lat'));
        const verhaalLng = parseFloat(link.getAttribute('data-lng'));
        const distance = getDistanceFromLatLonInKm(userLat, userLng, verhaalLat, verhaalLng);

        if (distance > threshold){
            // Disable de knop wanneer gebruiker uit de radius is
            // link.classList.add('disabled');
            // link.style.pointerEvents = 'none';
            link.textContent = "Bekijk verhaal";
            const message = document.createElement('p');
            message.textContent = "Je bent buiten het bereik van dit verhaal! (Knop wel tijdelijk bruikbaar gemaakt)";
            message.classList.add('alert', 'alert-danger', 'mt-4');
            link.parentElement.appendChild(message);
        }
    });

    document.querySelectorAll('.route-link').forEach(link => {
        const verhaalLat = parseFloat(link.getAttribute('data-lat'));
        const verhaalLng = parseFloat(link.getAttribute('data-lng'));
        const route = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${verhaalLat},${verhaalLng}`

        link.setAttribute('href', route);
        link.setAttribute('target', '_blank');   
    })
    }
}

// LOCATIE CODE

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Aarde straal in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Afstand in km
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

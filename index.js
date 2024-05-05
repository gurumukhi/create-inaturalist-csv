// Inputs
TaxonList=["Eudynamys scolopaceus","Accipiter badius","Milvus migrans","Psilopogon haemacephalus","Psittacula krameri","Oriolus kundoo","Dicrurus macrocercus","Corvus splendens","Orthotomus sutorius","Pycnonotus cafer","Zosterops palpebrosus","Copsychus fulicatus","Copsychus saularis","Cyornis tickelliae","Dicaeum erythrorhynchos","Leptocoma zeylonica","Cinnyris asiaticus","Passer domesticus","Motacilla maderaspatensis"]
FullNameList=["कबूतर (Columba livia (Feral Pigeon))","कोयल (Eudynamys scolopaceus)","शिकरा (Accipiter badius)","चील (Milvus migrans)","ठठेरा बसंता (Psilopogon haemacephalus)","तोता (Psittacula krameri)","Indian Golden Oriole (Oriolus kundoo)","भुजंगा (Dicrurus macrocercus)","कौआ (Corvus splendens)","दर्जिन (Orthotomus sutorius)","गुलदुम बुलबुल (Pycnonotus cafer)","बबूना (Zosterops palpebrosus)","कलचुरी (Copsychus fulicatus)","दयाल (Copsychus saularis)","Tickell's Blue Flycatcher (Cyornis tickelliae)","Pale-billed Flowerpecker (Dicaeum erythrorhynchos)","Purple-rumped Sunbird (Leptocoma zeylonica)","बैंगनी शक्करखोरा (Cinnyris asiaticus)","घरेलू गौरैया (Passer domesticus)","सफ़ेद भौंह खंजन (Motacilla maderaspatensis)"]
Date1="2024-04-26"
Time="6:45am"
Latitude="17.455667"
Longitude="78.441746"
Place=""
Tags=""
Geoprivacy=""

// Output
header="Taxon name,Date observed,Description,Place name,Latitude / y coord / northing,Longitude / x coord / easting,Tags,Geoprivacy"

str=`${header}
`;

for(i=0;i<TaxonList.length;i++){
    Taxon=TaxonList[i];
    Description=FullNameList[i];
    str+=`${Taxon},${Date1} ${Time},${Description},${Place},${Latitude},${Longitude},${Tags},${Geoprivacy}
`;
}

console.log(str)

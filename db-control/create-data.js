/**
  This is only for testing purposes. Inserts ad and user collections to the db.
**/

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var fs = require('fs');
var async = require('async');
mongoose.Promise = require('bluebird');
/*
mongoose.connect('mongodb://localhost/fv', function(err, db) {
if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established');
  }
});
*/
mongoose.connect('mongodb://heroku_n8tthvx3:gg52807ergarga789k8f20jmp1@ds033285.mongolab.com:33285/heroku_n8tthvx3');

//load all files in models dir
fs.readdirSync('../models/').forEach(function(filename){
  if(~filename.indexOf('.js')) {
    require('../models/' + filename)
  }
})


var Team = mongoose.model('team');
var Group = mongoose.model('group');
var Match = mongoose.model('match');
var Player = mongoose.model('player');

//Delete previous data
Team.remove('team', function(err, result) {
  if (err) return handleError(err);
});

Group.remove('group', function(err, result) {
  if (err) return handleError(err);
});

Match.remove('match', function(err, result) {
  if (err) return handleError(err);
});

Match.remove('player', function(err, result) {
  if (err) return handleError(err);
});


var players = {
  fra: ["Hugo Lloris", "Christophe Jallet", "Patrice Evra", "Adil Rami", "N'Golo Kanté", "Yohan Cabaye", "Antoine Griezmann", "Dimitri Payet", "Olivier Giroud", "André-Pierre Gignac", "Anthony Martial", "Morgan Schneiderlin", "Eliaquim Mangala", "Blaise Matuidi", "Paul Pogba", "Steve Mandanda", "Lucas Digne", "Moussa Sissoko", "Bacary Sagna", "Kingsley Coman", "Laurent Koscielny", "Samuel Umtiti", "Benoît Costil"],
  rou: ["Ciprian Tătărușanu", "Costel Pantilimon", "Silviu Lung Jr.", "Răzvan Raț", "Vlad Chiricheș", "Dragoș Grigore", "Alexandru Mățel", "Valerică Găman", "Cristian Săpunaru", "Cosmin Moți", "Steliano Filip", "Gabriel Torje", "Mihai Pintilii", "Alexandru Chipciu", "Ovidiu Hoban", "Lucian Sânmărtean", "Adrian Popa", "Andrei Prepeliță", "Nicolae Stanciu", "Bogdan Stancu", "Claudiu Keșerü", "Florin Andone", "Denis Alibec"],
  alb: ["Etrit Berisha", "Andi Lila", "Ermir Lenjani", "Elseid Hysaj", "Lorik Cana", "Frederik Veseli", "Ansi Agolli", "Migjen Basha", "Ledian Memushaj", "Armando Sadiku", "Shkëlzen Gashi", "Orges Shehi", "Burim Kukeli", "Taulant Xhaka", "Mërgim Mavraj", "Sokol Cikalleshi", "Naser Aliji", "Arlind Ajeti", "Bekim Balaj", "Ergys Kaçe", "Odise Roshi", "Amir Abrashi", "Alban Hoxha"],
  sui: ["Yann Sommer", "Stephan Lichtsteiner", "François Moubandje", "Nico Elvedi", "Steve von Bergen", "Michael Lang", "Breel Embolo", "Fabian Frei", "Haris Seferović", "Granit Xhaka", "Valon Behrami", "Marwin Hitz", "Ricardo Rodríguez", "Denis Zakaria", "Blerim Džemaili", "Gélson Fernandes", "Shani Tarashaj", "Admir Mehmedi", "Eren Derdiyok", "Johan Djourou", "Roman Bürki", "Fabian Schär", "Xherdan Shaqiri"],
  eng: ["Joe Hart", "Kyle Walker", "Danny Rose", "James Milner", "Gary Cahill", "Chris Smalling", "Raheem Sterling", "Adam Lallana", "Harry Kane", "Wayne Rooney", "Jamie Vardy", "Nathaniel Clyne", "Fraser Forster", "Jordan Henderson", "Daniel Sturridge", "John Stones", "Eric Dier", "Jack Wilshere", "Ross Barkley", "Dele Alli", "Ryan Bertrand", "Marcus Rashford", "Tom Heaton"],
  rus: ["Igor Akinfeev", "Roman Shishkin", "Igor Smolnikov", "Sergei Ignashevich", "Roman Neustädter", "Aleksei Berezutski", "Igor Denisov", "Denis Glushakov", "Aleksandr Kokorin", "Fyodor Smolov", "Pavel Mamayev", "Yuri Lodygin", "Aleksandr Golovin", "Vasili Berezutski", "Roman Shirokov", "Guilherme Marinato", "Oleg Shatov", "Oleg Ivanov", "Aleksandr Samedov", "Dmitri Torbinski", "Georgi Shchennikov", "Artyom Dzyuba", "Dmitri Kombarov"],
  wal: ["Wayne Hennessey", "Owain Fôn Williams", "Danny Ward", "Chris Gunter", "Ashley Williams", "James Collins", "Neil Taylor", "Ben Davies", "James Chester", "Jazz Richards", "Joe Ledley", "David Vaughan", "Aaron Ramsey", "Andy King", "David Edwards", "Joe Allen", "David Cotterill", "Jonathan Williams", "Gareth Bale", "Sam Vokes", "Simon Church", "Hal Robson-Kanu", "George Williams"],
  svk: ["Ján Mucha", "Matúš Kozáčik", "Ján Novota", "Martin Škrtel", "Ján Ďurica", "Peter Pekarík", "Tomáš Hubočan", "Kornel Saláta", "Dušan Švento", "Norbert Gyömbér", "Milan Škriniar", "Marek Hamšík", "Stanislav Šesták", "Miroslav Stoch", "Vladimír Weiss", "Juraj Kucka", "Viktor Pečovský", "Róbert Mak", "Ondrej Duda", "Patrik Hrošovský", "Ján Greguš", "Michal Ďuriš", "Adam Nemec"],
  ger: ["Manuel Neuer", "Shkodran Mustafi", "Jonas Hector", "Benedikt Höwedes", "Mats Hummels", "Sami Khedira", "Bastian Schweinsteiger", "Mesut Özil", "André Schürrle", "Lukas Podolski", "Julian Draxler", "Bernd Leno", "Thomas Müller", "Emre Can", "Julian Weigl", "Antonio Rüdiger", "Jérôme Boateng", "Toni Kroos", "Mario Götze", "Leroy Sané", "Joshua Kimmich", "Marc-André ter Stegen", "Mario Gómez"],
  ukr: ["Andriy Pyatov", "Denys Boyko", "Mykyta Shevchenko", "Vyacheslav Shevchuk", "Oleksandr Kucher", "Artem Fedetskyi", "Yevhen Khacheridi", "Yaroslav Rakitskiy", "Bohdan Butko", "Anatoliy Tymoshchuk", "Ruslan Rotan", "Andriy Yarmolenko", "Yevhen Konoplyanka", "Taras Stepanenko", "Denys Harmash", "Serhiy Sydorchuk", "Serhiy Rybalka", "Oleksandr Karavayev", "Oleksandr Zinchenko", "Viktor Kovalenko", "Yevhen Seleznyov", "Roman Zozulya", "Pylyp Budkivskyi"],
  pol: ["Wojciech Szczęsny", "Michał Pazdan", "Artur Jędrzejczyk", "Thiago Cionek", "Krzysztof Mączyński", "Tomasz Jodłowiec", "Arkadiusz Milik", "Karol Linetty", "Robert Lewandowski", "Grzegorz Krychowiak", "Kamil Grosicki", "Artur Boruc", "Mariusz Stępiński", "Jakub Wawrzyniak", "Kamil Glik", "Jakub Błaszczykowski", "Sławomir Peszko", "Bartosz Salamon", "Piotr Zieliński", "Łukasz Piszczek", "Bartosz Kapustka", "Łukasz Fabiański", "Filip Starzyński"],
  nir: ["Roy Carroll", "Michael McGovern", "Alan Mannus", "Aaron Hughes", "Chris Baird", "Gareth McAuley", "Jonny Evans", "Craig Cathcart", "Conor McLaughlin", "Lee Hodson", "Paddy McNair", "Luke McCullough", "Steven Davis", "Niall McGinn", "Corry Evans", "Oliver Norwood", "Shane Ferguson", "Stuart Dallas", "Kyle Lafferty", "Jamie Ward", "Josh Magennis", "Will Grigg", "Conor Washington"],
  esp: ["Iker Casillas", "David de Gea", "Sergio Rico", "Sergio Ramos", "Gerard Piqué", "Jordi Alba", "Juanfran", "César Azpilicueta", "Marc Bartra", "Mikel San José", "Héctor Bellerín", "Andrés Iniesta", "Cesc Fàbregas", "David Silva", "Sergio Busquets", "Koke", "Thiago", "Bruno Soriano", "Lucas Vázquez", "Pedro", "Álvaro Morata", "Nolito", "Aritz Aduriz"],
  cze: ["Petr Čech", "Tomáš Vaclík", "Tomáš Koubek", "Michal Kadlec", "Tomáš Sivok", "David Limberský", "Theodor Gebre Selassie", "Daniel Pudil", "Marek Suchý", "Roman Hubník", "Pavel Kadeřábek", "Tomáš Rosický", "Jaroslav Plašil", "Vladimír Darida", "Daniel Kolář", "Bořek Dočkal", "Ladislav Krejčí", "Josef Šural", "Jiří Skalák", "David Pavelka", "David Lafata", "Tomáš Necid", "Milan Škoda"],
  tur: ["Volkan Babacan", "Onur Recep Kıvrak", "Harun Tekin", "Mehmet Topal", "Gökhan Gönül", "Caner Erkin", "Hakan Kadir Balta", "Semih Kaya", "İsmail Köybaşı", "Şener Özbayraklı", "Ahmet Yılmaz Çalık", "Arda Turan", "Selçuk İnan", "Nuri Şahin", "Olcay Şahan", "Ozan Tufan", "Hakan Çalhanoğlu", "Oğuzhan Özyakup", "Volkan Şen", "Emre Mor", "Burak Yılmaz", "Cenk Tosun", "Yunus Mallı"],
  cro: ["Danijel Subašić", "Lovre Kalinić", "Ivan Vargić", "Darijo Srna", "Vedran Ćorluka", "Domagoj Vida", "Ivan Strinić", "Gordon Schildenfeld", "Šime Vrsaljko", "Tin Jedvaj", "Luka Modrić", "Ivan Rakitić", "Ivan Perišić", "Mateo Kovačić", "Milan Badelj", "Marcelo Brozović", "Marko Rog", "Ante Ćorić", "Mario Mandžukić", "Nikola Kalinić", "Andrej Kramarić", "Marko Pjaca", "Duje Čop"],
  bel: ["Thibaut Courtois", "Toby Alderweireld", "Thomas Vermaelen", "Radja Nainggolan", "Jan Vertonghen", "Axel Witsel", "Kevin De Bruyne", "Marouane Fellaini", "Romelu Lukaku", "Eden Hazard", "Yannick Ferreira Carrasco", "Simon Mignolet", "Jean-François Gillet", "Dries Mertens", "Jason Denayer", "Thomas Meunier", "Divock Origi", "Christian Kabasele", "Mousa Dembélé", "Christian Benteke", "Jordan Lukaku", "Michy Batshuayi", "Laurent Ciman"],
  ita: ["Gianluigi Buffon", "Mattia De Sciglio", "Giorgio Chiellini", "Matteo Darmian", "Angelo Ogbonna", "Antonio Candreva", "Simone Zaza", "Alessandro Florenzi", "Graziano Pellè", "Thiago Motta", "Ciro Immobile", "Salvatore Sirigu", "Federico Marchetti", "Stefano Sturaro", "Andrea Barzagli", "Daniele De Rossi", "Éder", "Marco Parolo", "Leonardo Bonucci", "Lorenzo Insigne", "Federico Bernardeschi", "Stephan El Shaarawy", "Emanuele Giaccherini"],
  irl: ["Keiren Westwood", "Séamus Coleman", "Ciaran Clark", "John O'Shea", "Richard Keogh", "Glenn Whelan", "Aiden McGeady", "James McCarthy", "Shane Long", "Robbie Keane", "James McClean", "Shane Duffy", "Jeff Hendrick", "Jonathan Walters", "Cyrus Christie", "Shay Given", "Stephen Ward", "David Meyler", "Robbie Brady", "Wes Hoolahan", "Daryl Murphy", "Stephen Quinn", "Darren Randolph"],
  swe: ["Andreas Isaksson", "Mikael Lustig", "Erik Johansson", "Andreas Granqvist", "Martin Olsson", "Emil Forsberg", "Sebastian Larsson", "Albin Ekdal", "Kim Källström", "Zlatan Ibrahimović", "Marcus Berg", "Robin Olsen", "Pontus Jansson", "Victor Lindelöf", "Oscar Hiljemark", "Pontus Wernbloom", "Ludwig Augustinsson", "Oscar Lewicki", "Emir Kujović", "John Guidetti", "Jimmy Durmaz", "Erkan Zengin", "Patrik Carlgren"],
  por: ["Rui Patrício", "Bruno Alves", "Pepe", "José Fonte", "Raphaël Guerreiro", "Ricardo Carvalho", "Cristiano Ronaldo", "João Moutinho", "Éder", "João Mário", "Vieirinha", "Anthony Lopes", "Danilo", "William Carvalho", "André Gomes", "Renato Sanches", "Nani", "Rafa Silva", "Eliseu", "Ricardo Quaresma", "Cédric Soares", "Eduardo", "Adrien Silva"],
  isl: ["Hannes Þór Halldórsson", "Birkir Már Sævarsson", "Haukur Heiðar Hauksson", "Hjörtur Hermannsson", "Sverrir Ingi Ingason", "Ragnar Sigurðsson", "Jóhann Berg Guðmundsson", "Birkir Bjarnason", "Kolbeinn Sigþórsson", "Gylfi Þór Sigurðsson", "Alfreð Finnbogason", "Ögmundur Kristinsson", "Ingvar Jónsson", "Kári Árnason", "Jón Daði Böðvarsson", "Rúnar Már Sigurjónsson", "Aron Gunnarsson", "Theódór Elmar Bjarnason", "Hörður Björgvin Magnússon", "Emil Hallfreðsson", "Arnór Ingvi Traustason", "Eiður Guðjohnsen", "Ari Freyr Skúlason"],
  aut: ["Robert Almer", "Heinz Lindner", "Ramazan Özcan", "Christian Fuchs", "Sebastian Prödl", "Aleksandar Dragović", "György Garics", "Florian Klein", "Markus Suttner", "Martin Hinteregger", "Kevin Wimmer", "Martin Harnik", "Marko Arnautović", "Zlatko Junuzović", "David Alaba", "Julian Baumgartlinger", "Jakob Jantscher", "Marcel Sabitzer", "Stefan Ilsanker", "Alessandro Schöpf", "Marc Janko", "Rubin Okotie", "Lukas Hinterseer"],
  hun: ["Gábor Király", "Dénes Dibusz", "Péter Gulácsi", "Barnabás Bese", "Attila Fiola", "Richárd Guzmics", "Roland Juhász", "Tamás Kádár", "Mihály Korhut", "Ádám Lang", "Ákos Elek", "Zoltán Gera", "László Kleinheisler", "Gergő Lovrencsics", "Ádám Nagy", "Ádám Pintér", "Zoltán Stieber", "Dániel Böde", "Balázs Dzsudzsák ", "Krisztián Németh", "Nemanja Nikolić", "Tamás Priskin", "Ádám Szalai"]
};


fraPlayers = [];
for (var i=0; i<players.fra.length; i++) {
  fraPlayers.push(new Player({name: players.fra[i]}));
}
rouPlayers = [];
for (var i=0; i<players.rou.length; i++) {
  rouPlayers.push(new Player({name: players.rou[i]}));
}
albPlayers = [];
for (var i=0; i<players.alb.length; i++) {
  albPlayers.push(new Player({name: players.alb[i]}));
}
suiPlayers = [];
for (var i=0; i<players.sui.length; i++) {
  suiPlayers.push(new Player({name: players.sui[i]}));
}
engPlayers = [];
for (var i=0; i<players.eng.length; i++) {
  engPlayers.push(new Player({name: players.eng[i]}));
}
rusPlayers = [];
for (var i=0; i<players.rus.length; i++) {
  rusPlayers.push(new Player({name: players.rus[i]}));
}
walPlayers = [];
for (var i=0; i<players.wal.length; i++) {
  walPlayers.push(new Player({name: players.wal[i]}));
}
svkPlayers = [];
for (var i=0; i<players.svk.length; i++) {
  svkPlayers.push(new Player({name: players.svk[i]}));
}
gerPlayers = [];
for (var i=0; i<players.ger.length; i++) {
  gerPlayers.push(new Player({name: players.ger[i]}));
}
ukrPlayers = [];
for (var i=0; i<players.ukr.length; i++) {
  ukrPlayers.push(new Player({name: players.ukr[i]}));
}
polPlayers = [];
for (var i=0; i<players.pol.length; i++) {
  polPlayers.push(new Player({name: players.pol[i]}));
}
nirPlayers = [];
for (var i=0; i<players.nir.length; i++) {
  nirPlayers.push(new Player({name: players.nir[i]}));
}
espPlayers = [];
for (var i=0; i<players.esp.length; i++) {
  espPlayers.push(new Player({name: players.esp[i]}));
}
czePlayers = [];
for (var i=0; i<players.cze.length; i++) {
  czePlayers.push(new Player({name: players.cze[i]}));
}
turPlayers = [];
for (var i=0; i<players.tur.length; i++) {
  turPlayers.push(new Player({name: players.tur[i]}));
}
croPlayers = [];
for (var i=0; i<players.cro.length; i++) {
  croPlayers.push(new Player({name: players.cro[i]}));
}
belPlayers = [];
for (var i=0; i<players.bel.length; i++) {
  belPlayers.push(new Player({name: players.bel[i]}));
}
itaPlayers = [];
for (var i=0; i<players.ita.length; i++) {
  itaPlayers.push(new Player({name: players.ita[i]}));
}
irlPlayers = [];
for (var i=0; i<players.irl.length; i++) {
  irlPlayers.push(new Player({name: players.irl[i]}));
}
swePlayers = [];
for (var i=0; i<players.swe.length; i++) {
  swePlayers.push(new Player({name: players.swe[i]}));
}
porPlayers = [];
for (var i=0; i<players.por.length; i++) {
  porPlayers.push(new Player({name: players.por[i]}));
}
islPlayers = [];
for (var i=0; i<players.isl.length; i++) {
  islPlayers.push(new Player({name: players.isl[i]}));
}
autPlayers = [];
for (var i=0; i<players.aut.length; i++) {
  autPlayers.push(new Player({name: players.aut[i]}));
}
hunPlayers = [];
for (var i=0; i<players.hun.length; i++) {
  hunPlayers.push(new Player({name: players.hun[i]}));
}

var allPlayers = fraPlayers.concat(rouPlayers, albPlayers, suiPlayers, engPlayers, rusPlayers, walPlayers, svkPlayers, gerPlayers, ukrPlayers, polPlayers, nirPlayers, espPlayers, czePlayers, turPlayers, croPlayers, belPlayers, itaPlayers, irlPlayers, swePlayers, porPlayers, islPlayers, autPlayers, hunPlayers);


var fra = new Team({name: 'France', short_name: 'FRA', flag: '', players: fraPlayers});
var eng = new Team({name: 'England', short_name: 'ENG', flag: '', players: engPlayers});
var cze = new Team({name: 'Czech Republic', short_name: 'CZE', flag: '', players: czePlayers});
var isl = new Team({name: 'Iceland', short_name: 'ISL', flag: '', players: islPlayers});
var aut = new Team({name: 'Austria', short_name: 'AUT', flag: '', players: autPlayers});
var nir = new Team({name: 'Northern Ireland', short_name: 'NIR', flag: '', players: nirPlayers});
var por = new Team({name: 'Portugal', short_name: 'POR', flag: '', players: porPlayers});
var esp = new Team({name: 'Spain', short_name: 'ESP', flag: '', players: espPlayers});
var sui = new Team({name: 'Switzerland', short_name: 'SUI', flag: '', players: suiPlayers});
var ita = new Team({name: 'Italy', short_name: 'ITA', flag: '', players: itaPlayers});
var bel = new Team({name: 'Belgium', short_name: 'BEL', flag: '', players: belPlayers});
var wal = new Team({name: 'Wales', short_name: 'WAL', flag: '', players: walPlayers});
var rou = new Team({name: 'Romania', short_name: 'ROU', flag: '', players: rouPlayers});
var alb = new Team({name: 'Albania', short_name: 'ALB', flag: '', players: albPlayers});
var ger = new Team({name: 'Germany', short_name: 'GER', flag: '', players: gerPlayers});
var pol = new Team({name: 'Poland', short_name: 'POL', flag: '', players: polPlayers});
var rus = new Team({name: 'Russia', short_name: 'RUS', flag: '', players: rusPlayers});
var svk = new Team({name: 'Slovakia', short_name: 'SVK', flag: '', players: svkPlayers});
var cro = new Team({name: 'Croatia', short_name: 'CRO', flag: '', players: croPlayers});
var tur = new Team({name: 'Turkey', short_name: 'TUR', flag: '', players: turPlayers});
var hun = new Team({name: 'Hungary', short_name: 'HUN', flag: '', players: hunPlayers});
var irl = new Team({name: 'Republic of Ireland', short_name: 'IRL', flag: '', players: irlPlayers});
var swe = new Team({name: 'Sweden', short_name: 'SWE', flag: '', players: swePlayers});
var ukr = new Team({name: 'Ukraine', short_name: 'UKR', flag: '', players: ukrPlayers});

var teams = [fra, eng, cze, isl, aut, nir, por, esp, sui, ita, bel, wal, rou, alb, ger, pol, rus, svk, cro, tur, hun, irl, swe, ukr];


var group_a = new Group({name: 'A', teams: [alb, fra, rou, sui]});
var group_b = new Group({name: 'B', teams: [eng, rus, svk, wal]});
var group_c = new Group({name: 'C', teams: [ger, nir, pol, ukr]});
var group_d = new Group({name: 'D', teams: [cro, cze, esp, tur]});
var group_e = new Group({name: 'E', teams: [bel, ita, irl, swe]});
var group_f = new Group({name: 'F', teams: [aut, hun, isl, por]});

var groups = [group_a, group_b, group_c, group_d, group_e, group_f];

//Update teams with groups
for (var i in teams) {
  for (var j in groups) {
    for (var k in groups[j].teams) {
      if (groups[j].teams[k] === teams[i]._id) {
        teams[i].group = groups[j];
      }
    }
  }
}

var m1 = new Match({match_number: 1, home_team: fra, away_team: rou, time: '2016-06-10T20:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m2 = new Match({match_number: 2, home_team: alb, away_team: sui, time: '2016-06-11T14:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m3 = new Match({match_number: 3, home_team: wal, away_team: svk, time: '2016-06-11T17:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m4 = new Match({match_number: 4, home_team: eng, away_team: rus, time: '2016-06-11T20:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m5 = new Match({match_number: 5, home_team: tur, away_team: cro, time: '2016-06-12T14:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m6 = new Match({match_number: 6, home_team: pol, away_team: nir, time: '2016-06-12T17:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m7 = new Match({match_number: 7, home_team: ger, away_team: ukr, time: '2016-06-12T20:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m8 = new Match({match_number: 8, home_team: esp, away_team: cze, time: '2016-06-13T14:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m9 = new Match({match_number: 9, home_team: irl, away_team: swe, time: '2016-06-13T17:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m10 = new Match({match_number: 10, home_team: bel, away_team: ita, time: '2016-06-13T20:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m11 = new Match({match_number: 11, home_team: aut, away_team: hun, time: '2016-06-14T14:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m12 = new Match({match_number: 12, home_team: por, away_team: isl, time: '2016-06-14T17:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m13 = new Match({match_number: 13, home_team: rus, away_team: svk, time: '2016-06-15T14:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m14 = new Match({match_number: 14, home_team: rou, away_team: sui, time: '2016-06-15T17:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m15 = new Match({match_number: 15, home_team: fra, away_team: alb, time: '2016-06-15T20:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m16 = new Match({match_number: 16, home_team: eng, away_team: wal, time: '2016-06-16T14:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m17 = new Match({match_number: 17, home_team: ukr, away_team: nir, time: '2016-06-16T17:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m18 = new Match({match_number: 18, home_team: ger, away_team: pol, time: '2016-06-16T20:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m19 = new Match({match_number: 19, home_team: ita, away_team: swe, time: '2016-06-17T14:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m20 = new Match({match_number: 20, home_team: cze, away_team: cro, time: '2016-06-17T17:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m21 = new Match({match_number: 21, home_team: esp, away_team: tur, time: '2016-06-17T20:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m22 = new Match({match_number: 22, home_team: bel, away_team: irl, time: '2016-06-18T14:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m23 = new Match({match_number: 23, home_team: isl, away_team: hun, time: '2016-06-18T17:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m24 = new Match({match_number: 24, home_team: por, away_team: aut, time: '2016-06-18T20:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m25 = new Match({match_number: 25, home_team: rou, away_team: alb, time: '2016-06-19T20:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m26 = new Match({match_number: 26, home_team: sui, away_team: fra, time: '2016-06-19T20:00:00.000Z', group: group_a, score: {home: null, away: null}, mark: null});
var m27 = new Match({match_number: 27, home_team: rus, away_team: wal, time: '2016-06-20T20:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m28 = new Match({match_number: 28, home_team: svk, away_team: eng, time: '2016-06-20T20:00:00.000Z', group: group_b, score: {home: null, away: null}, mark: null});
var m29 = new Match({match_number: 29, home_team: ukr, away_team: pol, time: '2016-06-21T17:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m30 = new Match({match_number: 30, home_team: nir, away_team: ger, time: '2016-06-21T17:00:00.000Z', group: group_c, score: {home: null, away: null}, mark: null});
var m31 = new Match({match_number: 31, home_team: cze, away_team: tur, time: '2016-06-21T20:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m32 = new Match({match_number: 32, home_team: cro, away_team: esp, time: '2016-06-21T20:00:00.000Z', group: group_d, score: {home: null, away: null}, mark: null});
var m33 = new Match({match_number: 33, home_team: isl, away_team: aut, time: '2016-06-22T17:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m34 = new Match({match_number: 34, home_team: hun, away_team: por, time: '2016-06-22T17:00:00.000Z', group: group_e, score: {home: null, away: null}, mark: null});
var m35 = new Match({match_number: 35, home_team: ita, away_team: irl, time: '2016-06-22T20:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});
var m36 = new Match({match_number: 36, home_team: swe, away_team: bel, time: '2016-06-22T20:00:00.000Z', group: group_f, score: {home: null, away: null}, mark: null});

var matches = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18, m19, m20, m21, m22, m23, m24, m25, m26, m27, m28, m29, m30, m31, m32, m33, m34, m35, m36];

//Update teams with matches
for (var i in teams) {
  for (var j in matches) {
    if (teams[i]._id === matches[j].home_team) {
      teams[i].matches.push(matches[j]);
    }
    else if (teams[i]._id === matches[j].away_team) {
      teams[i].matches.push(matches[j]);
    }
  }
}

//Create data
var promise = Player.create(allPlayers);
promise.then(function () {
  var promise1 = Team.create(teams);
  promise1.then(function () {
    var promise2 = Group.create(groups);
    promise2.then(function () {
        Match.create(matches);
        console.log('data created2');
    })
  })
})

console.log('data created');

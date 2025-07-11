---REFERENCE

INSERT INTO champions_difficulties (difficulty) VALUES ('Easy');
INSERT INTO champions_difficulties (difficulty) VALUES ('Medium');
INSERT INTO champions_difficulties (difficulty) VALUES ('Hard');

INSERT INTO champions_styles (style) VALUES ('Fighter');
INSERT INTO champions_styles (style) VALUES ('Marksman');
INSERT INTO champions_styles (style) VALUES ('Mage');
INSERT INTO champions_styles (style) VALUES ('Assassin');
INSERT INTO champions_styles (style) VALUES ('Tank');
INSERT INTO champions_styles (style) VALUES ('Support');

INSERT INTO maps (map) VALUES ('Summoners Rift');
INSERT INTO maps (map) VALUES ('ARAM - Howling Abyss');

INSERT INTO champions_tier_prices
(rp_cost, blue_essence_cost,disenchant_blue_essence)
VALUES
(260, 450,90),
(450, 1350,270),
(585, 3150,630),
(790, 4800,960),
(880, 6300,1260),
(975, 7800,1560);

--PROFILE ICONS (50)
--
--
--
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Ocean Week Nautilus',
'https://static.wikia.nocookie.net/leagueoflegends/images/9/9f/Ocean_Week_Nautilus_profileicon.png/revision/latest?cb=20170504230042',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Ocean Week Fizz',
'https://static.wikia.nocookie.net/leagueoflegends/images/5/54/Ocean_Week_Fizz_profileicon.png/revision/latest?cb=20170504215037',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Nightblade',
'https://static.wikia.nocookie.net/leagueoflegends/images/e/e1/Nightblade_profileicon.png/revision/latest?cb=20170601013122',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Mark of the Betrayer',
'https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Mark_of_the_Betrayer_profileicon.png/revision/latest?cb=20170504222602',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Little Devil Teemo',
'https://static.wikia.nocookie.net/leagueoflegends/images/3/39/Little_Devil_Teemo_profileicon.png/revision/latest?cb=20170505004408',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Lifebead',
'https://static.wikia.nocookie.net/leagueoflegends/images/0/05/Lifebead_profileicon.png/revision/latest?cb=20180911214252',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Super Galaxy Wolf',
'https://static.wikia.nocookie.net/leagueoflegends/images/6/62/Super_Galaxy_Wolf_profileicon.png/revision/latest?cb=20170505003837',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('El Macho',
'https://static.wikia.nocookie.net/leagueoflegends/images/8/88/El_Macho_profileicon.png/revision/latest?cb=20170504223921',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Oblivion',
'https://static.wikia.nocookie.net/leagueoflegends/images/1/12/Oblivion_profileicon.png/revision/latest?cb=20170505004431',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Blood Moon Rising',
'https://static.wikia.nocookie.net/leagueoflegends/images/8/89/Blood_Moon_Rising_profileicon.png/revision/latest?cb=20170505013323',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Seeing Hat',
'https://static.wikia.nocookie.net/leagueoflegends/images/8/87/Seeing_Hat_profileicon.png/revision/latest?cb=20170505020507',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('God Fist',
'https://static.wikia.nocookie.net/leagueoflegends/images/8/87/Seeing_Hat_profileicon.png/revision/latest?cb=20170505020507',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Pentakill Karthus',
'https://static.wikia.nocookie.net/leagueoflegends/images/3/38/Pentakill_Karthus_profileicon.png/revision/latest?cb=20170728190547',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Battle Boss Ziggs',
'https://static.wikia.nocookie.net/leagueoflegends/images/d/d6/Battle_Boss_Ziggs_profileicon.png/revision/latest?cb=20170726002151',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Pentakill Olaf',
'https://static.wikia.nocookie.net/leagueoflegends/images/9/93/Pentakill_Olaf_profileicon.png/revision/latest?cb=20170728190551',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Pentakill II',
'https://static.wikia.nocookie.net/leagueoflegends/images/e/ea/Pentakill_II_profileicon.png/revision/latest?cb=20170801201912',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Pentakill Yorick',
'https://static.wikia.nocookie.net/leagueoflegends/images/3/36/Pentakill_Yorick_profileicon.png/revision/latest?cb=20170728190553',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Super Galaxy Elise',
'https://static.wikia.nocookie.net/leagueoflegends/images/6/69/Super_Galaxy_Elise_profileicon.png/revision/latest?cb=20171003201423',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Transcendent',
'https://static.wikia.nocookie.net/leagueoflegends/images/9/9d/Transcendent_profileicon.png/revision/latest?cb=20170915210019',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Resist',
'https://static.wikia.nocookie.net/leagueoflegends/images/5/57/Resist_profileicon.png/revision/latest?cb=20180617163451',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Birdio',
'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Birdio_profileicon.png/revision/latest?cb=20180617163629',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Dark Waters Diana',
'https://static.wikia.nocookie.net/leagueoflegends/images/8/88/Dark_Waters_Diana_profileicon.png/revision/latest?cb=20180617163849',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Dark Waters Vladimir',
'https://static.wikia.nocookie.net/leagueoflegends/images/6/60/Dark_Waters_Vladimir_profileicon.png/revision/latest?cb=20180617163403',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Wolf Banner',
'https://static.wikia.nocookie.net/leagueoflegends/images/6/6c/Wolf_Banner_profileicon.png/revision/latest?cb=20180618200635',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Turret Jr',
'https://static.wikia.nocookie.net/leagueoflegends/images/b/b1/Turret_Jr._profileicon.png/revision/latest?cb=20180926020420',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('KDA Ahri',
'https://static.wikia.nocookie.net/leagueoflegends/images/b/b6/KDA_Ahri_profileicon.jpg/revision/latest?cb=20230201133527',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Blood Moon Aatrox',
'https://static.wikia.nocookie.net/leagueoflegends/images/5/55/Blood_Moon_Aatrox_profileicon.png/revision/latest?cb=20190109010935',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Blood Moon Pyke',
'https://static.wikia.nocookie.net/leagueoflegends/images/7/7d/Blood_Moon_Pyke_profileicon.png/revision/latest?cb=20190109011240',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Battlecast Poro',
'https://static.wikia.nocookie.net/leagueoflegends/images/2/29/Battlecast_Poro_profileicon.png/revision/latest?cb=20170504221354',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Icy Minion',
'https://static.wikia.nocookie.net/leagueoflegends/images/e/e4/Icy_Minion_profileicon.png/revision/latest?cb=20170504221633',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Bundled Minion',
'https://static.wikia.nocookie.net/leagueoflegends/images/2/23/Bundled_Minion_profileicon.png/revision/latest?cb=20170504221648',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Lovely',
'https://static.wikia.nocookie.net/leagueoflegends/images/f/f8/Lovely_profileicon.png/revision/latest?cb=20170504223425',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Snowblower',
'https://static.wikia.nocookie.net/leagueoflegends/images/9/9d/Snowblower_profileicon.png/revision/latest?cb=20170505024651',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Jade Demon',
'https://static.wikia.nocookie.net/leagueoflegends/images/d/db/Jade_Demon_profileicon.png/revision/latest?cb=20170504194433',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Original Tibbers',
'https://static.wikia.nocookie.net/leagueoflegends/images/f/fb/Original_Tibbers_profileicon.png/revision/latest?cb=20180617164412',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Ashes, Ashes',
'https://static.wikia.nocookie.net/leagueoflegends/images/6/6a/Ashes%2C_Ashes_profileicon.png/revision/latest?cb=20180617164340',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Space Day Nautilus',
'https://static.wikia.nocookie.net/leagueoflegends/images/a/a5/Space_Day_Nautilus_profileicon.png/revision/latest?cb=20180617163911',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('LEC 2021 Spring',
'https://static.wikia.nocookie.net/leagueoflegends/images/f/fe/LEC_2021_Spring_profileicon.jpg/revision/latest?cb=20230102034704',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Rift Scuttler',
'https://static.wikia.nocookie.net/leagueoflegends/images/9/91/Rift_Scuttler_profileicon.png/revision/latest?cb=20170504213258',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Ancient Krug',
'https://static.wikia.nocookie.net/leagueoflegends/images/c/c4/Ancient_Krug_profileicon.png/revision/latest?cb=20170504205357',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Battlecast',
'https://static.wikia.nocookie.net/leagueoflegends/images/f/f9/Battlecast_profileicon.png/revision/latest?cb=20170504223843',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Act 2 Taking a Dive',
'https://static.wikia.nocookie.net/leagueoflegends/images/5/5a/Act_2_Taking_a_Dive_profileicon.png/revision/latest?cb=20170504235303',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Runeterra Map',
'https://static.wikia.nocookie.net/leagueoflegends/images/2/2a/Runeterra_Map_profileicon.png/revision/latest?cb=20180706201411',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Odyssey Veteran',
'https://static.wikia.nocookie.net/leagueoflegends/images/7/7b/Odyssey_Veteran_profileicon.png/revision/latest?cb=20180911222121',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('BAWK BAWK',
'https://static.wikia.nocookie.net/leagueoflegends/images/0/02/BAWK_BAWK_profileicon.png/revision/latest?cb=20180617163557',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Champie Twitch',
'https://static.wikia.nocookie.net/leagueoflegends/images/f/fe/Champie_Twitch_profileicon.png/revision/latest?cb=20180617163536',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Champie Urgot',
'https://static.wikia.nocookie.net/leagueoflegends/images/a/a9/Champie_Urgot_profileicon.png/revision/latest?cb=20191105212440',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Doomed Minion',
'https://static.wikia.nocookie.net/leagueoflegends/images/6/61/Doomed_Minion_profileicon.png/revision/latest?cb=20170505013534',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Gingerbread Man',
'https://static.wikia.nocookie.net/leagueoflegends/images/5/51/Gingerbread_Man_profileicon.png/revision/latest?cb=20170505021416',1);
INSERT INTO profile_icons (icon, image,price_id) VALUES ('Odyssey Zenith',
'https://static.wikia.nocookie.net/leagueoflegends/images/d/df/Odyssey_Zenith_profileicon.png/revision/latest?cb=20180911221127',1);


INSERT INTO rank_tiers (rank) VALUES
('Bronze'),
('Silver'),
('Gold'),
('Platinum'),
('Emerald'),
('Diamond'),
('Master'),
('Grandmaster'),
('Challenger');

INSERT INTO roles (role) VALUES
('TOP'),
('JUNGLE'),
('MID'),
('ADC'),
('SUPPORT');

INSERT INTO server_regions (server) VALUES
('North America (NA)'),
('Latin America North (LAN)'),
('Latin America South (LAS)'),
('Brazil (BR)');


INSERT INTO skin_tiers
(tier, rp_cost, orange_essence_cost,disenchant_orange_essence)
VALUES
('Budget', 520, 220,104),
('Standard', 750, 450,150),
('Deluxe', 975, 675,195),
('Epic', 1350, 1050,270),
('Legendary', 1820, 1520,364),
('Mythic', 3250, 2950,650);


INSERT INTO teams (team_color) VALUES
('Blue'),
('Red');




--DOMAIN


INSERT INTO champions (name, price_id, release_date, winrate, image, role_id, difficulty_id, style_id, role2_id , style2_id)
VALUES
('Lucian', 4, '2013-08-27', 50.5, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FLucian_0.jpg&w=1200&q=75', 4, 2, 2,3,null),
('Draven', 4, '2012-06-06', 51.3, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FDraven_0.jpg&w=1200&q=75', 4, 3, 2,3,null),
('Zed', 5, '2012-11-13', 49.7, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FZed_0.jpg&w=1200&q=75', 3, 3, 4,2,null),
('Zac', 5, '2013-03-29', 52.1, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FZac_0.jpg&w=1200&q=75', 2, 2, 5,1,3),
('Zilean', 2, '2009-04-18', 51.0, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FZilean_0.jpg&w=1200&q=75', 5, 2, 6,3,3),
('Jinx', 5, '2013-10-10', 50.8, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FJinx_0.jpg&w=1200&q=75', 4, 2, 2,null,null),
('Graves', 4, '2011-10-13', 51.5, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FGraves_0.jpg&w=1200&q=75', 2, 2, 1,1,null),
('Karma', 3, '2011-02-01', 49.8, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FKarma_0.jpg&w=1200&q=75', 5, 2, 6,3,3),
('Twitch', 3, '2009-05-01', 50.0, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FTwitch_0.jpg&w=1200&q=75', 4, 2, 2,2,3),
('Twisted Fate', 2, '2009-02-21', 48.7, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FTwistedFate_0.jpg&w=1200&q=75', 3, 2, 3,1,2),
('Xerath', 3, '2011-01-07', 49.0, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FXerath_0.jpg&w=1200&q=75', 3, 2, 3,5,null),
('Katarina', 3, '2010-06-11', 51.2, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FKatarina_0.jpg&w=1200&q=75', 3, 2, 4,null,5),
('Kha´Zix', 4, '2012-09-27', 52.3, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FKhazix_0.jpg&w=1200&q=75', 2, 3, 4,null,null),
('Fizz', 4, '2011-11-15', 50.8, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FFizz_0.jpg&w=1200&q=75', 3, 2, 4,null,null),
('Rengar', 4, '2012-08-21', 51.5, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FRengar_0.jpg&w=1200&q=75', 2, 3, 4,null,null),
('Fiora', 4, '2012-02-29', 50.9, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FFiora_0.jpg&w=1200&q=75', 1, 3, 1,null,null),
('Hecarim', 4, '2012-04-18', 52.1, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FHecarim_0.jpg&w=1200&q=75', 2, 2, 1,null,5), -- Jungle, Medium, Fighter
('Vladimir', 3, '2010-02-27', 50.3, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FVladimir_0.jpg&w=1200&q=75', 3, 2, 3,1,null), -- Mid, Hard, Mage
('Aurelion Sol', 5, '2016-03-24', 49.8, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FAurelionSol_0.jpg&w=1200&q=75', 3, 3, 3,null,null), -- Mid, Hard, Mage
('Kai´Sa', 5, '2018-03-07', 50.7, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FKaisa_0.jpg&w=1200&q=75', 4, 2, 2,null,3), -- ADC, Medium, Marksman
('Urgot', 3, '2010-08-24', 49.5, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FUrgot_0.jpg&w=1200&q=75', 1, 1, 1,null,null), -- Top, Hard, Fighter
('Renekton', 4, '2011-01-18', 50.4, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FRenekton_0.jpg&w=1200&q=75', 1, 2, 1,null,null), -- Top, Medium, Fighter
('Zeri', 5, '2022-01-20', 48.9, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FZeri_0.jpg&w=1200&q=75', 4, 2, 2,null,null),-- ADC, Medium, Marksman
('Singed', 2, '2009-04-18', 51.3, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FSinged_0.jpg&w=1200&q=75', 1, 2, 5,3,3), -- Top, Medium, Tank
('Rek´Sai', 4, '2014-12-11', 49.7, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FRekSai_0.jpg&w=1200&q=75', 2, 2, 1,null,null), -- Jungle, Medium, Fighter
('Trundle', 4, '2010-05-01', 51.0, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FTrundle_0.jpg&w=1200&q=75', 1, 2, 1,null,null), -- Top, Medium, Fighter
('Aatrox', 5, '2013-06-13', 47.8, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FAatrox_0.jpg&w=1200&q=75', 1, 2, 1,null,null), -- Top, Medium, Fighter
('Alistar', 2, '2009-02-21', 50.2, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FAlistar_0.jpg&w=1200&q=75', 5, 1, 5,null,null), -- Support, Easy, Tank
('Akali', 3, '2010-05-11', 48.7, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FAkali_0.jpg&w=1200&q=75', 3, 3, 4,1,null), -- Mid, Hard, Assassin
('Ornn', 4, '2017-08-23', 51.0, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FOrnn_0.jpg&w=1200&q=75', 1, 2, 5,null,null), -- Top, Medium, Tank
('Galio', 3, '2010-08-10', 50.9, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FGalio_0.jpg&w=1200&q=75', 3, 2, 5,5,3), -- Mid, Medium, Tank
('Jarvan IV', 4, '2011-03-01', 49.8, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FJarvanIV_0.jpg&w=1200&q=75', 2, 2, 1,null,4), -- Jungle, Medium, Fighter
('Milio', 5, '2023-03-22', 52.1, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FMilio_0.jpg&w=1200&q=75', 5, 1, 6,null,3), -- Support, Easy, Support
('Renata', 5, '2022-02-17', 49.3, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FRenata_0.jpg&w=1200&q=75', 5, 2, 6,null,null), -- Support, Hard, Support
('Shen', 3, '2010-03-24', 51.5, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FShen_0.jpg&w=1200&q=75', 1, 2, 5,5,null), -- Top, Medium, Tank
('Skarner', 4, '2011-08-09', 47.6, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FSkarner_0.jpg&w=1200&q=75', 2, 2, 5,1,null), -- Jungle, Medium, Tank
('Warwick', 2, '2009-06-11', 51.8, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FWarwick_0.jpg&w=1200&q=75', 2, 1, 1,1,null), -- Jungle, Easy, Fighter
('Caitlyn', 4, '2011-01-04', 51.1, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FCaitlyn_0.jpg&w=1200&q=75', 4, 2, 2,null,null); -- ADC, Medium, Marksman

INSERT INTO champions (name, price_id, release_date, winrate, image, role_id, difficulty_id, style_id, style2_id,role2_id)
VALUES
('Cho´Gath', 2, '2009-06-26', 50.2, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FChogath_0.jpg&w=1200&q=75', 1, 1, 5, 3,3),
('Malphite', 2, '2009-11-02', 51.0, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FMalphite_0.jpg&w=1200&q=75', 1, 1, 5, 3,3),
('Gragas', 3, '2010-02-02', 49.7, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FGragas_0.jpg&w=1200&q=75', 2, 2, 3, 5,1),
('Vi', 4, '2012-12-19', 51.4, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FVi_0.jpg&w=1200&q=75', 2, 2, 1, 4,null), -- Jungle, Medium, Fighter
('Braum', 2, '2014-05-14', 50.5, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FBraum_0.jpg&w=1200&q=75', 5, 1, 5, null,null),
('Mordekaiser', 3, '2010-02-24', 50.2,'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FMordekaiser_0.jpg&w=1200&q=75',1, 2, 5, 3,null), -- Top, Medium, Tank
('Bardo', 5, '2015-03-12', 50.1, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FBard_0.jpg&w=1200&q=75', 5, 3, 6, 5,null), -- Support, Hard, Support
('Senna', 5, '2019-11-10', 49.0, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FSenna_0.jpg&w=1200&q=75', 4, 3, 2, 6,5), -- ADC, Hard, Support
('Dr. Mundo', 1, '2009-09-02', 49.8, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FDrMundo_0.jpg&w=1200&q=75', 1, 1, 5, NULL, 2),
('Tryndamere', 2, '2009-05-01', 48.9, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FTryndamere_0.jpg&w=1200&q=75', 1, 1, 2, 1, NULL),
('Ivern', 4, '2016-10-05', 49.9, 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FIvern_0.jpg&w=1200&q=75', 2, 3, 6, 3, 5);


--ITEMS

INSERT INTO items (
    name, attack_damage, critical_strike_chance, attack_speed, ability_power,
    health, health_regeneration,mana, mana_regeneration, armor, tenacity, magic_resistance, cool_down_reduction, movement_speed,
    life_steal, armor_penetration, magic_penetration, lethality,
    healing_and_shield_power, image, effect, cost,item_type,item_type2
)
VALUES (
    'Infinity Edge',
    70,     -- Attack damage
    '25%',  -- Critical strike chance as a string
    '0%',   -- Attack speed as a string
    0,      -- Ability Power
    0,      -- Health
    '0%',    -- Health Regeneration / Base health regeneration
    0,      -- Mana
    '0%',    -- Mana regeneration
    0,      -- Armor
    '0%',    -- Tenacity
    0,      -- Magic resistance
    0,      -- Cool Down Reduction / Ability haste
    '0%',   -- Movement speed as a string (no effect in this case)
    '0%',   -- Life steal as a string (no effect in this case)
    '0%',   -- Armor penetration as a string (no effect in this case)
    '0%',   -- Magic penetration as a string (no effect in this case)
    0,     -- Letality (no effect in this case)
    '0%',   -- Healing and shield power as a string (no effect in this case)
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3031.png', -- Image URL
    'Increases critical damage and basic attack damage. Grants bonus critical strike chance.', --Effect
    3600, --Cost
    2,null-- Marksman id from the item_types table
),
(
    'Trinity Force',
    36,
    '0%',
    '30%',
    0,
    333,
    '0%',    -- Health Regeneration / Base health regeneration
    0,
    '0%',
    0,
    '0%',
    0,
    15,
    '0%',
    '0%',
    '0%',
    '0%',
    0,
    '0%',
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3078.png',
    'Enchanted Sword: \nAfter using an ability, your next attack deals bonus physical damage on impact. \nHasten: \nAttacking grants you 20 Movement Speed for 2 seconds.',
    3333,
    2,1
),
(
    'Zhonya´s Hourglass',
    0,
    '0%',
    '0%',
    105,
    0,
    '0%',    -- Health Regeneration / Base health regeneration
    0,
    '0%',
    50,
    '0%',
    0,
    0,
    '0%',
    '0%',
    '0%',
    '0%',
    0,
    '0%',
    'https://u.gg/lol/items/zhonyas-hourglass',
    'Active: \nBecomes invulnerable and untargetable for 2.5 seconds, but cannot move or act during this time.',
    3250,
    3,null
),
(
    'Zeke´s Convergence',
    0,
    '0%',
    '0%',
    0,
    300,
    '0%',    -- Health Regeneration / Base health regeneration
    0,
    '0%',
    25,
    '0%',
    25,
    10,
    '0%',
    '0%',
    '0%',
    '0%',
    0,
    '0%',
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3050.png',
    'Active:\n Join an allied champion. When your ally damages an enemy champion, both you and your ally deal additional magic damage for 3 seconds.',
    2200,
    5,6
),
(
    'Yun Tal Wildarrows',
    50,
    '0%',
    '25%',
    0,
    0,
    '0%',    -- Health Regeneration / Base health regeneration
    0,
    '0%',
    0,
    '0%',
    0,
    0,
    '0%',
    '0%',
    '0%',
    '0%',
    0,
    '0%',
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3032.png',
    'More Practice, More Lethality:\n On attack, you gain 20% Critical Strike Chance permanently, up to a maximum of 25%.\n Burst:\n Attacking an enemy champion grants you 30% Attack Speed for 4 seconds (40 second cooldown). Attacks reduce this cooldown by 1 second, which increases to 2 seconds if you land a critical strike.',
    3000,
    2,null
),
(
    'Youmuu´s Ghostblade',
    55,
    '0%',
    '0%',
    0,
    0,
    '0%',    -- Health Regeneration / Base health regeneration
    0,
    '0%',
    0,
    '0%',
    0,
    0,
    '4%',
    '0%',
    '0%',
    '0%',
    0,
    '0%',
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3142.png',
    'Pursuit: \nYou gain 20 Movement Speed when out of combat.\n Spectral Step:\n You gain movement speed and become Ghosted for 6 seconds.',
    2800,
    4,null
),
(
    'Wit´s End',
    0,
    '0%',
    '50%',
    0,
    0,
    '0%',   -- Health Regeneration / Base health regeneration
    0,
    '0%',
    0,
    '20%',
    45,
    0,
    '0%',
    '0%',
    '0%',
    '0%',
    0,
    '0%',
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3091.png',
    'Attacks deal bonus magic damage on impact.',
    2800,
    2,1
),
(
    'Winter´s Approach',
    0,
    '0%',
    '0%',
    0,
    550,
    '0%',   -- Health Regeneration / Base health regeneration
    500,
    '0%',
    0,
    '0%',
    0,
    15,
    '0%',
    '0%',
    '0%',
    '0%',
    0,
    '0%',
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3119.png',
    'Wonder:\n Gain health. Mana Flow (8s, max 4 stacks): Attacks and abilities grant 3 maximum Mana (doubles against champions). Transforms into Nordic Winter upon reaching 360 maximum Mana.',
    2400,
    5,null
),
(
    'Warmog´s Armor',
    0,
    '0%',
    '0%',
    0,
    1000,
    '100%',    -- Health Regeneration / Base health regeneration
    0,
    '0%',
    0,
    '0%',
    0,
    0,
    '4%',
    '0%',
    '0%',
    '0%',
    0,
    '0%',
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3083.png',
    'Warmog´s Heart:\n If you have 1500 additional Health and haven´t taken damage in the last 6 seconds, you regenerate health per second and gain 4% Movement Speed.',
    3300,
    5,null
),
(
    'Voltaic Cyclosword',
    55,
    '0%',
    '0%',
    0,
    0,
    '0%',    -- Health Regeneration / Base health regeneration
    0,
    '0%',
    0,
    '0%',
    0,
    10,
    '0%',
    '0%',
    '0%',
    '0%',
    18,
    '0%',
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6699.png',
    'Galvanize: \nMoving and Stealth increase Energized by 75% faster.\n Firmament: \nYour energized attack deals additional physical damage and slows for 0.75 seconds.',
    3000,
    4,null
),
(
    'Void Staff',
    0,
    '0%',
    '0%',
    95,
    0,
    '0%',    -- Health Regeneration / Base health regeneration
    0,
    '0%',
    0,
    '0%',
    0,
    0,
    '0%',
    '0%',
    '0%',
    '40%',
    0,
    '0%',
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3135.png',
    '',
    3000,
    3,null
),
(
    'Unending Despair',
    0,      -- Attack damage
    '0%',   -- Critical strike chance as a string
    '0%',   -- Attack speed as a string
    0,      -- Ability Power
    350,    -- Health
    '0%',    -- Health Regeneration / Base health regeneration
    0,      -- Mana
    '0%',
    60,     -- Armor
    '0%',
    0,      -- Magic resistance
    10,     -- Cool Down Reduction / Ability haste
    '0%',   -- Movement speed as a string
    '0%',   -- Life steal as a string
    '0%',   -- Armor penetration as a string
    '0%',   -- Magic penetration as a string
    0,      -- Letality
    '0%',   -- Healing and shield power as a string
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/2502.png', -- Image URL
    'Deals magic damage to nearby enemies every 5 seconds in combat against champions and heals you for 250% of the damage dealt.', -- Effect
    2800,   -- Cost
    5,null     -- Marksman id from the item_types table
),
(
    'Umbral Glaive',
    50,     -- Attack damage
    '0%',    -- Critical strike chance
    '0%',    -- Attack speed
    0,      -- Ability Power
    0,      -- Health
    '0%',    -- Health Regeneration / Base health regeneration
    0,      -- Mana
    '0%',
    0,      -- Armor
    '0%',
    0,      -- Magic resistance
    10,     -- Cool Down Reduction / Ability haste
    '0%',   -- Movement speed
    '0%',   -- Life steal
    '0%',   -- Armor penetration
    '0%',   -- Magic penetration
    15,     -- Letality
    '0%',   -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3179.png', -- Image URL
    'Blackout:\n When you are near enemy Stealth Wards and traps, reveal them for 8 seconds. \nExtinguish:\n Attacks do bonus damage to Wards.', -- Effect
    2600,   -- Cost
    4,null    -- item_type_id (assuming it's the correct ID for the item type)
),
(
    'Titanic Hydra',
    40,     -- Attack damage
    '0%',    -- Critical strike chance
    '0%',    -- Attack speed
    0,      -- Ability Power
    600,    -- Health
    '0%',   -- Health Regeneration / Base health regeneration
    0,      -- Mana
    '0%',
    0,      -- Armor
    '0%',   -- Tenacity
    0,      -- Magic resistance
    0,      -- Cool Down Reduction / Ability haste
    '0%',   -- Movement speed
    '0%',   -- Life steal
    '0%',   -- Armor penetration
    '0%',   -- Magic penetration
    0,      -- Letality
    '0%',   -- Healing and shield power
    'https://u.gg/lol/items/titanic-hydra', -- Image URL
    'Cleave:\n Attacks deal physical damage on-hit and to enemies behind the target. \nTitanic Crescent:\n Empower your next Cleave to deal bonus physical damage On-Hit and deal bonus physical damage to enemies behind the target.', -- Effect
    3300,   -- Cost
    5,null      -- item_type_id (assuming it's the correct ID for the item type)
),
(
    'Thornmail',
    0,      -- Attack damage
    '0%',    -- Critical strike chance
    '0%',    -- Attack speed
    0,      -- Ability Power
    150,    -- Health
    '0%',    -- Health Regeneration / Base health regeneration
    0,      -- Mana
    '0%',
    75,     -- Armor
    '0%',
    0,      -- Magic resistance
    0,      -- Cool Down Reduction / Ability haste
    '0%',   -- Movement speed
    '0%',   -- Life steal
    '0%',   -- Armor penetration
    '0%',   -- Magic penetration
    0,      -- Letality
    '0%',   -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3075.png', -- Image URL
    'Thorns:\n When struck by an Attack, deal magic damage to the attacker and apply 40% Wounds for 3 seconds if they are a champion.', -- Effect
    2450,   -- Cost
    5,null       -- item_type_id (assuming it's the correct ID for the item type)
),
(
    'The Collector',
    50,     -- Attack damage
    '25%',  -- Critical strike chance
    '0%',   -- Attack speed
    0,      -- Ability Power
    0,      -- Health
    '0%',    -- Health Regeneration / Base health regeneration
    0,      -- Mana
    '0%',
    0,      -- Armor
    '0%',
    0,      -- Magic resistance
    0,      -- Cool Down Reduction / Ability haste
    '0%',   -- Movement speed
    '0%',   -- Life steal
    '0%',   -- Armor penetration
    '0%',   -- Magic penetration
    10,     -- Letality
    '0%',   -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6676.png', -- Image URL
    'Death: \nYour damage executes champions that are below 5% Health. \nTaxes:\n Champion kills grant 25 bonus gold.', -- Effect
    2950,   -- Cost
    4,2       -- item_type_id (assuming it's the correct ID for the item type)
),
(
    'Sunfire Aegis',
    0,      -- Attack damage
    '0%',   -- Critical strike chance
    '0%',   -- Attack speed
    0,      -- Ability Power
    350,    -- Health
    '0%',   -- Health Regeneration / Base health regeneration
    0,      -- Mana
    '0%',
    50,     -- Armor
    '0%',
    0,      -- Magic resistance
    10,     -- Cool Down Reduction / Ability haste
    '0%',   -- Movement speed
    '0%',   -- Life steal
    '0%',   -- Armor penetration
    '0%',   -- Magic penetration
    0,      -- Letality
    '0%',   -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3068.png', -- Image URL
    'Immolate:\n After taking or dealing damage, deal magic damage per second to nearby enemies for 3 seconds.', -- Effect
    2700,   -- Cost
    5,null      -- item_type_id (assuming it's the correct ID for the item type)
),
(
    'Sundered Sky',
    40,     -- Attack damage
    '0%',    -- Critical strike chance
    '0%',    -- Attack speed
    0,      -- Ability Power
    400,    -- Health
    '0%',    -- Health Regeneration / Base health regeneration
    0,      -- Mana
    '0%',
    0,      -- Armor
    '0%',
    0,      -- Magic resistance
    10,     -- Cool Down Reduction / Ability haste
    '0%',   -- Movement speed
    '0%',   -- Life steal
    '0%',   -- Armor penetration
    '0%',   -- Magic penetration
    0,      -- Letality
    '0%',   -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6610.png', -- Image URL
    'Lightshield Strike:\n Your first Attack against a champion Critically Strikes and restores Health.', -- Effect
    3100,   -- Cost
    1,null      -- item_type_id (assuming it's the correct ID for the item type)
),
(
    'Stridebreaker',
    40,     -- Attack damage
    '0%',   -- Critical strike chance
    '25%',  -- Attack speed
    0,      -- Ability Power
    450,    -- Health
    '0%',    -- Health Regeneration / Base health regeneration
    0,      -- Mana
    '0%',
    0,      -- Armor
    '0%',
    0,      -- Magic resistance
    0,      -- Cool Down Reduction / Ability haste
    '0%',   -- Movement speed
    '0%',   -- Life steal
    '0%',   -- Armor penetration
    '0%',   -- Magic penetration
    0,      -- Letality
    '0%',   -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6631.png', -- Image URL
    'Cleave:\n Attacks deal physical damage to nearby enemies. \nBreaking Shockwave:\n Deal physical damage and Slow nearby enemies by 35%. Gain 35% decaying Move Speed per champion hit for 3 seconds.', -- Effect
    3300,   -- Cost
    1,null      -- item_type_id (assuming it's the correct ID for the item type)
),
(
    'Stormsurge',
    0,      -- Attack damage
    '0%',   -- Critical strike chance
    '0%',   -- Attack speed
    90,     -- Ability Power
    0,      -- Health
    '0%',    -- Health Regeneration / Base health regeneration
    0,      -- Mana
    '0%',
    0,      -- Armor
    '0%',
    0,      -- Magic resistance
    0,      -- Cool Down Reduction / Ability haste
    '4%',   -- Movement speed
    '0%',   -- Life steal
    '0%',   -- Armor penetration
    '15%',  -- Magic penetration
    0,      -- Letality
    '0%',   -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/4646.png', -- Image URL
    'Stormraider:\n Dealing 25% of a champion´s maximum Health within 2.5s applies Squall to them and grants 25% Move Speed for 1.5 seconds.\n Squall:\n After 2 seconds, deal magic damage. If the target dies before Squall triggers, it damages nearby enemies and grants 30 gold.', -- Effect
    2900,   -- Cost
    3,null      -- item_type_id (assuming it's the correct ID for the item type)
),
(
    'Sterak´s Gage',
    0,       -- Attack damage
    '0%',    -- Critical strike chance
    '0%',    -- Attack speed
    0,       -- Ability Power
    400,     -- Health
    '0%',    -- Health Regeneration / Base health regeneration
    0,       -- Mana
    '0%',
    0,       -- Armor
    '20%',   -- Tenacity
    0,       -- Magic resistance
    0,       -- Cool Down Reduction / Ability haste
    '0%',    -- Movement speed
    '0%',    -- Life steal
    '0%',    -- Armor penetration
    '0%',    -- Magic penetration
    0,       -- Letality
    '0%',    -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3053.png', -- Image URL
    'The Claws that Catch:\n Gain bonus Attack Damage. \nLifeline:\n Taking damage that would reduce your Health below 30% grants a decaying Shield for 4.5 seconds.', -- Effect
    3200,    -- Cost
    1, 5       -- item_type_id (assuming it’s the correct ID for this item type)
),
(
    'Statikk Shiv',
    45,       -- Attack damage
    '0%',     -- Critical strike chance
    '30%',    -- Attack speed
    0,        -- Ability Power
    0,        -- Health
    '0%',     -- Health Regeneration / Base health regeneration
    0,        -- Mana
    '0%',     -- Mana Regeneration
    0,        -- Armor
    '0%',     -- Tenacity
    0,        -- Magic resistance
    0,        -- Cool Down Reduction / Ability haste
    '4%',     -- Movement speed
    '0%',     -- Life steal
    '0%',     -- Armor penetration
    '0%',     -- Magic penetration
    0,        -- Letality
    '0%',     -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3087.png', -- Image URL
    'Electrospark: \nAttacks trigger chain lightning On-Hit, dealing magic damage with a cooldown. \nElectroshock:\n Takedowns within 3 seconds of damaging the target reset Electrospark´s cooldown.', -- Effect
    2700,     -- Cost
    2,null         -- item_type_id (asumiendo que es el ID correcto para este tipo de ítem)
),
(
    'Staff of Flowing Water',    -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    35,                          -- Ability Power
    0,                           -- Health
    '0%',                        -- Health Regeneration / Base health regeneration
    0,                           -- Mana
    '125%',                      -- Mana Regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    15,                          -- Cool Down Reduction / Ability haste
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Letality
    '10%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6616.png', -- Image URL
    'Rapids:\n Healing or Shielding an ally grants you both 45 Ability Power for 4 seconds.', -- Effect
    2250,                        -- Cost
    6,null                            -- item_type_id
),
(
    'Spirit Visage',            -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    400,                         -- Health
    '100%',                      -- Health Regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana Regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    50,                          -- Magic resistance
    10,                          -- Cool Down Reduction / Ability haste
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Letality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3065.png', -- Image URL
    'Boundless Vitality:\n Heals and Shields on you are increased by 25%.', -- Effect
    2700,                        -- Cost
    5,null                           -- item_type_id
),
(
    'Spear of Shojin',          -- Item name
    45,                         -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    450,                        -- Health
    '0%',                       -- Health Regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana Regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    0,                          -- Cool Down Reduction / Ability haste
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Letality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3161.png', -- Image URL
    'Dragonforce:\n Gain 25 Basic Ability Haste. \nFocused Will: \nDealing damage with Abilities increases your Champion´s Ability and Passive damage by 3% for 6 seconds. (stacks 4 times).', -- Effect
    3100,                       -- Cost
    1,null                           -- item_type_id
),
(
    'Shurelya´s Battlesong',   -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    50,                         -- Ability Power
    0,                          -- Health
    '0%',                       -- Health Regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana Regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    15,                         -- Cool Down Reduction / Ability haste
    '4%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Letality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/2065.png', -- Image URL
    'Inspiring Speech:\n Grant nearby allies 30% Move Speed for 4 seconds.', -- Effect
    2200,                       -- Cost
    6,null                           -- item_type_id
),
(
    'Shadowflame',              -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    110,                        -- Ability Power
    0,                          -- Health
    '0%',                       -- Health Regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana Regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    0,                          -- Cool Down Reduction / Ability haste
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '15%',                      -- Magic penetration
    0,                          -- Letality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/4645.png', -- Image URL
    'Cinderbloom:\n Magic and true damage Critically Strikes enemies below 40% Health, dealing 20% increased damage.', -- Effect
    3200,                       -- Cost
    3 ,null                          -- item_type_id
),
(
    'Serylda´s Grudge',         -- Item name
    45,                          -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    0,                           -- Health
    '0%',                        -- Health Regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana Regeneration
    0,                           -- Armor
    '0%',                       -- Tenacity
    0,                           -- Magic resistance
    20,                          -- Cool Down Reduction / Ability haste
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '30%',                       -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Letality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6694.png', -- Image URL
    'Bitter Cold:\n Damaging Abilities Slow enemies below 50% Health by 30% for 1 second.', -- Effect
    3000,                        -- Cost
    4,null                        -- item_type_id
),
(
    'Serpent´s Fang',           -- Item name
    55,                          -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    0,                           -- Health
    '0%',                        -- Health Regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana Regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    0,                          -- Magic resistance
    0,                           -- Cool Down Reduction / Ability haste
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    15,                          -- Letality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6695.png', -- Image URL
    'Shield Reaver:\n Damaging an enemy champion reduces Shields they gain by % for 3 seconds. If they were not already affected by Shield Reaver, reduce Shields on them by %.', -- Effect
    2500,                        -- Cost
    4,null            -- item_type_id
),
(
    'Archangel´s Staff',         -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    70,                          -- Ability Power
    0,                           -- Health
    '0%',                        -- Health Regeneration / Base health regeneration
    600,                         -- Mana
    '0%',                        -- Mana Regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    25,                          -- Cool Down Reduction / Ability haste
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Letality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3003.png', -- Image URL
    'Awe: \n Gain Ability Power equal to 1% bonus Mana. Manaflow (8s, max 5 charges): Landing Abilities grant 5 max Mana (doubled vs. champions). Transforms into Seraph´s Embrace at 360 max Mana.', -- Effect
    2900,                        -- Cost
    3,null                          -- item_type_id
),
(
    'Rylai´s Crystal Scepter',   -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    65,                          -- Ability Power
    400,                         -- Health
    '0%',                        -- Health Regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana Regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    0,                           -- Cool Down Reduction / Ability haste
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Letality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3116.png', -- Image URL
    'Rimefrost:\n Damaging Abilities Slow enemies by 30% for 1 second.', -- Effect
    2600,                        -- Cost
    3 , null                           -- item_type_id
),
(
    'Runaan´s Hurricane',      -- Item name
    0,                          -- Attack damage
    '25%',                      -- Critical strike chance
    '40%',                      -- Attack speed
    0,                          -- Ability Power
    0,                          -- Health
    '0%',                       -- Health Regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana Regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    0,                          -- Cool Down Reduction / Ability haste
    '4%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Letality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3085.png', -- Image URL
    'Wind´s Fury:\n Attacks fire bolts at 2 additional enemies near the target. Each bolt deals physical damage and applies On-Hit effects.', -- Effect
    2650,                       -- Cost
    2 ,null                          -- item_type_id
),
(
    'Rod of Ages',              -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    50,                         -- Ability Power
    400,                        -- Health
    '0%',                       -- Health Regeneration / Base health regeneration
    400,                        -- Mana
    '0%',                       -- Mana Regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    0,                          -- Cool Down Reduction / Ability haste
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Letality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6657.png', -- Image URL
    'Timeless:\n This item gains 10 Health, 20 Mana, and 3 Ability Power every 60 seconds up to 10 times.Upon reaching max stacks, gain a level. \nEternity:\n Taking damage from champions restores 7% of the damage as Mana. Casting an ability heals for 25% of Mana spent.', -- Effect
    2600,                       -- Cost
    3,null                          -- item_type_id
),
(
    'Riftmaker',                -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    70,                         -- Ability Power
    350,                        -- Health
    '0%',                       -- Health Regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana Regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    15,                         -- Cool Down Reduction / Ability haste
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Letality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/4633.png', -- Image URL
    'Void Corruption: \nFor each second in combat with enemy champions, deal 2% bonus damage, up to 8%. At maximum strength, gain Omnivamp. \nVoid Infusion:\n Gain 2% of your bonus Health as Ability Power.', -- Effect
    3100,                       -- Cost
    3  , null                         -- item_type_id
),
(
    'Redemption',               -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    200,                        -- Health
    '0%',                       -- Health Regeneration / Base health regeneration
    0,                          -- Mana
    '100%',                     -- Mana Regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    15,                         -- Cool Down Reduction / Ability haste
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Letality
    '10%',                      -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3107.png', -- Image URL
    'Intervention:\n Restore 200 - 400 Health to allied champions and deal 10% max Health true damage to enemy champions after 2.5 seconds.', -- Effect
    2300,                       -- Cost
    6    ,null                       -- item_type_id
),
(
    'Ravenous Hydra',           -- Item name
    65,                         -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    0,                          -- Health
    '0%',                       -- Health Regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana Regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    15,                         -- Cool Down Reduction / Ability haste
    '0%',                       -- Movement speed
    '12%',                      -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Letality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3074.png', -- Image URL
    'Cleave:\n Attacks deal physical damage to nearby enemies. \nRavenous Crescent:\n Deal physical damage to enemies around you. Your Life Steal applies to this damage.', -- Effect
    3300,                       -- Cost
    1 ,null                          -- item_type_id
),
(
    'Rapid Firecannon',         -- Item name
    0,                          -- Attack damage
    '25%',                      -- Critical strike chance
    '35%',                      -- Attack speed
    0,                          -- Ability Power
    0,                          -- Health
    '0%',                       -- Health Regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana Regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    0,                          -- Cool Down Reduction / Ability haste
    '4%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Letality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3094.png', -- Image URL
    'Sharpshooter:\n Your Energized Attack deals 40 bonus magic damage and gains 35% bonus Attack Range.', -- Effect
    2650,                       -- Cost
    2  ,null                         -- item_type_id
),
(
    'Randuin´s Omen',         -- Item name
    0,                         -- Attack damage
    '0%',                      -- Critical strike chance
    '0%',                      -- Attack speed
    0,                         -- Ability Power
    0,                         -- Health
    '0%',                      -- Health Regeneration / Base health regeneration
    0,                         -- Mana
    '0%',                      -- Mana Regeneration
    75,                        -- Armor
    '0%',                      -- Tenacity
    0,                         -- Magic resistance
    0,                         -- Cool Down Reduction / Ability haste
    '0%',                      -- Movement speed
    '0%',                      -- Life steal
    '0%',                      -- Armor penetration
    '0%',                      -- Magic penetration
    0,                         -- Letality
    '0%',                      -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3143.png', -- Image URL
    'Resilience:\n Receive 30% less damage from Critical Strikes. \nHumility:\n Slow nearby enemies by 70% for 2 seconds.', -- Effect
    2700,                      -- Cost
    5    , null                      -- item_type_id
),
(
    'Rabadon´s Deathcap',     -- Item name
    0,                         -- Attack damage
    '0%',                      -- Critical strike chance
    '0%',                      -- Attack speed
    130,                       -- Ability Power
    0,                         -- Health
    '0%',                      -- Health Regeneration / Base health regeneration
    0,                         -- Mana
    '0%',                      -- Mana Regeneration
    0,                         -- Armor
    '0%',                      -- Tenacity
    0,                         -- Magic resistance
    0,                         -- Cool Down Reduction / Ability haste
    '0%',                      -- Movement speed
    '0%',                      -- Life steal
    '0%',                      -- Armor penetration
    '0%',                      -- Magic penetration
    0,                         -- Lethality
    '0%',                      -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3089.png', -- Image URL
    'Magical Opus:\n Increases your total Ability Power by 30%.', -- Effect
    3600,                      -- Cost
    3     ,null                     -- item_type_id
),
(
    'Profane Hydra',          -- Item name
    60,                       -- Attack damage
    '0%',                     -- Critical strike chance
    '0%',                     -- Attack speed
    0,                        -- Ability Power
    0,                        -- Health
    '0%',                     -- Health Regeneration / Base health regeneration
    0,                        -- Mana
    '0%',                     -- Mana Regeneration
    0,                        -- Armor
    '0%',                     -- Tenacity
    0,                        -- Magic resistance
    10,                       -- Cool Down Reduction / Ability haste
    '0%',                     -- Movement speed
    '0%',                     -- Life steal
    '0%',                     -- Armor penetration
    '0%',                     -- Magic penetration
    18,                       -- Letality
    '0%',                     -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6698.png', -- Image URL
    'Cleave: \nAttacks deal physical damage to nearby enemies. \nHeretical Cleave:\n Deal physical damage around you.', -- Effect
    3200,                     -- Cost
    4,null                       -- item_type_id
),
(
    'Phantom Dancer',         -- Item name
    0,                        -- Attack damage
    '25%',                    -- Critical strike chance
    '60%',                    -- Attack speed
    0,                        -- Ability Power
    0,                        -- Health
    '0%',                     -- Health Regeneration / Base health regeneration
    0,                        -- Mana
    '0%',                     -- Mana Regeneration
    0,                        -- Armor
    '0%',                     -- Tenacity
    0,                        -- Magic resistance
    0,                        -- Cool Down Reduction / Ability haste
    '8%',                     -- Movement speed
    '0%',                     -- Life steal
    '0%',                     -- Armor penetration
    '0%',                     -- Magic penetration
    0,                        -- Letality
    '0%',                     -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3046.png', -- Image URL
    'Spectral Waltz:\n Become Ghosted.', -- Effect
    2650,                     -- Cost
    2 , null                        -- item_type_id
),
(
    'Overlord´s Bloodmail',  -- Item name
    30,                       -- Attack damage
    '0%',                     -- Critical strike chance
    '0%',                     -- Attack speed
    0,                        -- Ability Power
    550,                      -- Health
    '0%',                     -- Health Regeneration / Base health regeneration
    0,                        -- Mana
    '0%',                     -- Mana Regeneration
    0,                        -- Armor
    '0%',                     -- Tenacity
    0,                        -- Magic resistance
    0,                        -- Cool Down Reduction / Ability haste
    '0%',                     -- Movement speed
    '0%',                     -- Life steal
    '0%',                     -- Armor penetration
    '0%',                     -- Magic penetration
    0,                        -- Lethality
    '0%',                     -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/2501.png', -- Image URL
    'Tyranny:\n Gain 2% of your bonus Health as Attack Damage. \nRetribution\n Gain up to 10% increased Attack Damage based on your percent missing Health.', -- Effect
    3300,                     -- Cost
    5,null                         -- item_type_id
),
(
    'Opportunity',            -- Item name
    55,                       -- Attack damage
    '0%',                     -- Critical strike chance
    '0%',                     -- Attack speed
    0,                        -- Ability Power
    0,                        -- Health
    '0%',                     -- Health Regeneration / Base health regeneration
    0,                        -- Mana
    '0%',                     -- Mana Regeneration
    0,                        -- Armor
    '0%',                     -- Tenacity
    0,                        -- Magic resistance
    0,                        -- Cool Down Reduction / Ability haste
    '0%',                     -- Movement speed
    '0%',                     -- Life steal
    '0%',                     -- Armor penetration
    '0%',                     -- Magic penetration
    15,                       -- Lethality
    '0%',                     -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6701.png', -- Image URL
    'Preparation\n After being out of combat with Champions for 8 seconds gain Lethality. This Lethality lasts for 3 seconds after dealing damage to champions. Extraction\n When a champion that you damaged within 3 seconds dies, gain 200 decaying Move Speed for 1.5 seconds.', -- Effect
    2700,                     -- Cost
    4  , null                       -- item_type_id
),
(
    'Mortal Reminder',         -- Item name
    35,                        -- Attack damage
    '25%',                     -- Critical strike chance
    '0%',                      -- Attack speed
    0,                         -- Ability Power
    0,                         -- Health
    '0%',                      -- Health Regeneration / Base health regeneration
    0,                         -- Mana
    '0%',                      -- Mana Regeneration
    0,                         -- Armor
    '0%',                      -- Tenacity
    0,                         -- Magic resistance
    0,                         -- Cool Down Reduction / Ability haste
    '0%',                      -- Movement speed
    '0%',                      -- Life steal
    '30%',                     -- Armor penetration
    '0%',                      -- Magic penetration
    0,                         -- Lethality
    '0%',                      -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3033.png', -- Image URL
    'Grievous Wounds\n Dealing physical damage applies 40% Wounds to enemy champions for 3 seconds.', -- Effect
    3200,                      -- Cost
    2,1                          -- item_type_id
),
(
    'Morellonomicon',          -- Item name
    0,                         -- Attack damage
    '0%',                      -- Critical strike chance
    '0%',                      -- Attack speed
    75,                        -- Ability Power
    350,                       -- Health
    '0%',                      -- Health Regeneration / Base health regeneration
    0,                         -- Mana
    '0%',                      -- Mana Regeneration
    0,                         -- Armor
    '0%',                      -- Tenacity
    0,                         -- Magic resistance
    15,                        -- Cool Down Reduction / Ability haste
    '0%',                      -- Movement speed
    '0%',                      -- Life steal
    '0%',                      -- Armor penetration
    '0%',                      -- Magic penetration
    0,                         -- Lethality
    '0%',                      -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3165.png', -- Image URL
    'Grievous Wounds\n Dealing magic damage to champions applies 40% Wounds for 3 seconds.', -- Effect
    2950,                      -- Cost
    3      , null                    -- item_type_id
),
(
    'Moonstone Renewer',       -- Item name
    0,                         -- Attack damage
    '0%',                      -- Critical strike chance
    '0%',                      -- Attack speed
    25,                        -- Ability Power
    200,                       -- Health
    '0%',                      -- Health Regeneration / Base health regeneration
    0,                         -- Mana
    '125%',                    -- Mana Regeneration
    0,                         -- Armor
    '0%',                      -- Tenacity
    0,                         -- Magic resistance
    20,                        -- Cool Down Reduction / Ability haste
    '0%',                      -- Movement speed
    '0%',                      -- Life steal
    '0%',                      -- Armor penetration
    '0%',                      -- Magic penetration
    0,                         -- Lethality
    '0%',                      -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6617.png', -- Image URL
    'Starlit Grace\n Healing or shielding an ally chains the effect to another ally (excluding yourself), healing 30% or shielding 35% of the original amount.', -- Effect
    2200,                      -- Cost
    6,null                          -- item_type_id
),
(
    'Mikael´s Blessing',      -- Item name
    0,                         -- Attack damage
    '0%',                      -- Critical strike chance
    '0%',                      -- Attack speed
    0,                         -- Ability Power
    250,                       -- Health
    '0%',                      -- Health Regeneration / Base health regeneration
    0,                         -- Mana
    '100%',                    -- Mana Regeneration
    0,                         -- Armor
    '0%',                      -- Tenacity
    0,                         -- Magic resistance
    15,                        -- Cool Down Reduction / Ability haste
    '0%',                      -- Movement speed
    '0%',                      -- Life steal
    '0%',                      -- Armor penetration
    '0%',                      -- Magic penetration
    0,                         -- Lethality
    '12%',                     -- Healing and shield power
    'https://u.gg/lol/items/mikaels-blessing', -- Image URL
    'Purify\n Remove all crowd control debuffs (excluding Airborne and Suppression) from an ally champion and restore 100 - 250 Health.', -- Effect
    2300,                      -- Cost
    6 , null                         -- item_type_id
),
(
    'Maw of Malmortius',       -- Item name
    60,                        -- Attack damage
    '0%',                      -- Critical strike chance
    '0%',                      -- Attack speed
    0,                         -- Ability Power
    0,                         -- Health
    '0%',                      -- Health Regeneration / Base health regeneration
    0,                         -- Mana
    '0%',                      -- Mana Regeneration
    0,                         -- Armor
    '0%',                      -- Tenacity
    40,                        -- Magic resistance
    15,                        -- Cool Down Reduction / Ability haste
    '0%',                      -- Movement speed
    '0%',                      -- Life steal
    '0%',                      -- Armor penetration
    '0%',                      -- Magic penetration
    0,                         -- Lethality
    '0%',                      -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3156.png', -- Image URL
    'Lifeline\n Taking magic damage that would reduce your Health below 30% grants a magic damage Shield for 3 seconds and 10% Omnivamp until end of combat.', -- Effect
    3100,                      -- Cost
    1 , 4                         -- item_type_id
),
(
    'Malignance',              -- Item name
    0,                         -- Attack damage
    '0%',                      -- Critical strike chance
    '0%',                      -- Attack speed
    85,                        -- Ability Power
    0,                         -- Health
    '0%',                      -- Health Regeneration / Base health regeneration
    600,                       -- Mana
    '0%',                      -- Mana Regeneration
    0,                         -- Armor
    '0%',                      -- Tenacity
    0,                         -- Magic resistance
    15,                        -- Cool Down Reduction / Ability haste
    '0%',                      -- Movement speed
    '0%',                      -- Life steal
    '0%',                      -- Armor penetration
    '0%',                      -- Magic penetration
    0,                         -- Lethality
    '0%',                      -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3118.png', -- Image URL
    'Scorn\n Gain 20 Ultimate Ability Haste. Hatefog\n Damaging a champion with your Ultimate burns the ground beneath them for 3s, dealing magic damage per second and reducing their Magic Resist.', -- Effect
    2700,                      -- Cost
    3  , null                        -- item_type_id
),
(
    'Luden´s Companion',       -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    100,                        -- Ability Power
    0,                          -- Health
    '0%',                       -- Health Regeneration / Base health regeneration
    600,                        -- Mana
    '0%',                       -- Mana Regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    10,                         -- Cool Down Reduction / Ability haste
    '0%',                          -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6655.png', -- Image URL
    'Fire\n Damaging Abilities fire 6 Shots that deal bonus magic damage to the target and nearby enemies. Remaining Shots fire on the primary target, dealing 20% damage.', -- Effect
    2850,                       -- Cost
    3 ,null                          -- item_type_id
),
(
    'Lord Dominik´s Regards',  -- Item name
    35,                         -- Attack damage
    '25%',                       -- Critical strike chance
    '0%',                        -- Attack speed
    0,                         -- Ability Power
    0,                         -- Health
    '0%',                        -- Health Regeneration / Base health regeneration
    0,                         -- Mana
    '0%',                        -- Mana Regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    0,                        -- Cool Down Reduction / Ability haste
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '35%',                       -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3036.png', -- Image URL
    '',                       -- Effect (no specific effect listed)
    3000,                        -- Cost
    2  ,null                          -- item_type_id
),
(
    'Locket of the Iron Solari',  -- Item name
    0,                           -- Attack damage
    '0%',                         -- Critical strike chance
    '0%',                         -- Attack speed
    0,                          -- Ability Power
    200,                          -- Health
    '0%',                         -- Health regeneration / Base health regeneration
     0,                          -- Mana
    '0%',                         -- Mana regeneration
    25,                           -- Armor
    '0%',                         -- Tenacity
    25,                           -- Magic resistance
    10,                            -- Cool Down Reduction / Ability haste
    '0%',                         -- Movement speed
    '0%',                         -- Life steal
    '0%',                         -- Armor penetration
    '0%',                         -- Magic penetration
    0,                            -- Lethality
    '0%',                         -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3190.png',  -- Image URL
    'Devotion\n Grant nearby allies a 200 - 360 Shield that decays over 2.5 seconds.',  -- Effect
    2200,                         -- Cost
    6 ,null                            -- item_type_id
),
(
    'Lich Bane',                 -- Item name
    0,                           -- Attack damage
    '0%',                         -- Critical strike chance
    '0%',                         -- Attack speed
    115,                          -- Ability Power
    0,                            -- Health
    '0%',                         -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                         -- Mana regeneration
    0,                            -- Armor
    '0%',                         -- Tenacity
    0,                            -- Magic resistance
    10,                            -- Cool Down Reduction / Ability haste
    '4%',                         -- Movement speed
    '0%',                         -- Life steal
    '0%',                         -- Armor penetration
    '0%',                         -- Magic penetration
    0,                            -- Lethality
    '0%',                         -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3100.png',  -- Image URL
    'Spellblade\n After using an Ability, your next Attack deals bonus magic damage On-Hit.',  -- Effect
    3200,                         -- Cost
    3     , null                        -- item_type_id
),
(
    'Liandry´s Torment',         -- Item name
    0,                            -- Attack damage
    '0%',                         -- Critical strike chance
    '0%',                         -- Attack speed
    70,                           -- Ability Power
    300,                          -- Health
    '0%',                         -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                         -- Mana regeneration
    0,                            -- Armor
    '0%',                         -- Tenacity
    0,                            -- Magic resistance
    0,                            -- Ability Haste (Cooldown reduction as an integer)
    '0%',                         -- Movement speed
    '0%',                         -- Life steal
    '0%',                         -- Armor penetration
    '0%',                         -- Magic penetration
    0,                            -- Lethality
    '0%',                         -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6653.png', -- Image URL
    'Torment\n Damaging Abilities burn enemies for 2% max Health magic damage per second for 3 seconds. Suffering\n For each second in combat with enemy champions, deal 2% bonus damage, up to 6%.',  -- Effects
    3000,                         -- Cost
    3    ,null                         -- item_type_id
),
(
    'Kraken Slayer',             -- Item name
    45,                          -- Attack damage
    '0%',                         -- Critical strike chance
    '40%',                        -- Attack speed
    0,                          -- Ability power
    0,                          -- Health
    '0%',                         -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                         -- Mana regeneration
    0,                            -- Armor
    '0%',                         -- Tenacity
    0,                            -- Magic resistance
    0,                            -- Ability Haste (Cooldown reduction as an integer)
    '4%',                         -- Movement speed
    '0%',                         -- Life steal
    '0%',                         -- Armor penetration
    '0%',                         -- Magic penetration
    0,                            -- Lethality
    '0%',                         -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6672.png', -- Image URL
    'Bring It Down\n Every third Attack deals bonus physical damage On-Hit, increased based on their missing Health.',  -- Effects
    3100,                         -- Cost
    2 ,null                            -- item_type_id
),
(
    'Knight´s Vow',             -- Item name
    0,                            -- Attack damage
    '0%',                         -- Critical strike chance
    '0%',                         -- Attack speed
    0,                          -- Ability Power
    200,                          -- Health
    '0%',                         -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                         -- Mana regeneration
    40,                           -- Armor
    '0%',                         -- Tenacity
    0,                            -- Magic resistance
    10,                           -- Ability Haste (Cooldown reduction as an integer)
    '0%',                         -- Movement speed
    '0%',                         -- Life steal
    '0%',                         -- Armor penetration
    '0%',                         -- Magic penetration
    0,                            -- Lethality
    '0%',                         -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3109.png',  -- Image URL
    'Sacrifice\n While near your Worthy ally, take 12% of the damage they receive and heal for 10% of the damage they deal to champions. \nPledge\n: Designate an ally as Worthy.',  -- Effects
    2300,                         -- Cost
    6   ,null                          -- item_type_id
),
(
    'Kaenic Rookern',            -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    400,                         -- Health
    '100%',                      -- Health regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana regeneration
    80,                          -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    0,                           -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/2504.png',  -- Image URL
    'Magebane\nAfter not taking magic damage for 15 seconds, gain a magic shield.',  -- Effects
    2900,                        -- Cost
    5  ,null                          -- item_type_id (Mage corresponds to ID 3)
),
(
    'Jak´Sho, The Protean',     -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    350,                         -- Health
    '0%',                        -- Health regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana regeneration
    45,                          -- Armor
    '0%',                        -- Tenacity
    45,                          -- Magic resistance
    0,                           -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6665.png',  -- Image URL
    'Voidborn Resilience\nAfter 5 seconds of champion combat, increase your bonus Armor and Magic Resist by 30% until end of combat.',  -- Effects
    3200,                        -- Cost
    5       ,null                     -- item_type_id (Mage corresponds to ID 5)
),
(
    'Imperial Mandate',          -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    40,                          -- Ability Power
    200,                         -- Health
    '0%',                        -- Health regeneration / Base health regeneration
    0,                           -- Mana
    '100%',                      -- Mana regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    20,                          -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/4005.png',  -- Image URL
    'Coordinated Fire (30s per target)\nSlowing or Immobilizing an enemy champion marks them for 5 seconds. Ally champion damage detonates the mark, dealing magic damage equal to 10% of current health.',  -- Effects
    2250,                        -- Cost
    6  ,null                          -- item_type_id (Support corresponds to ID 6)
),
(
    'Immortal Shieldbow',        -- Item name
    55,                          -- Attack damage
    '25%',                       -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    0,                           -- Health
    '0%',                        -- Health regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    0,                           -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6673.png',  -- Image URL
    'Lifeline\nTaking damage that would reduce your Health below 30% grants a Shield for 3 seconds.',  -- Effects
    3000,                        -- Cost
    6,null                            -- item_type_id (Support corresponds to ID 6)
),
(
    'Iceborn Gauntlet',          -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    300,                         -- Health
    '0%',                        -- Health regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana regeneration
    50,                          -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    15,                          -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6662.png',  -- Image URL
    'Spellblade\nAfter using an Ability, your next Attack deals bonus physical damage On-Hit and creates a frost field for 2s that Slows.',  -- Effects
    2900,                        -- Cost
    5,1                            -- item_type_id (Tank corresponds to ID 5)
),
(
    'Hubris',                    -- Item name
    60,                           -- Attack damage
    '0%',                         -- Critical strike chance
    '0%',                         -- Attack speed
    0,                            -- Ability Power
    0,                            -- Health
    '0%',                         -- Health regeneration / Base health regeneration
    0,                            -- Mana
    '0%',                         -- Mana regeneration
    0,                            -- Armor
    '0%',                         -- Tenacity
    0,                            -- Magic resistance
    10,                           -- Ability Haste (Cooldown reduction as an integer)
    '0%',                         -- Movement speed
    '0%',                         -- Life steal
    '0%',                         -- Armor penetration
    '0%',                         -- Magic penetration
    18,                           -- Lethality
    '0%',                         -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6697.png',  -- Image URL
    'Eminence\nWhen a champion that you damaged within 3 seconds dies, gain 15 Attack Damage plus 2 per champion killed for 90 seconds.',  -- Effects
    3000,                         -- Cost
    4, 2                            -- item_type_id (Assassin corresponds to ID 4)
),
(
    'Horizon Focus',             -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    75,                          -- Ability Power
    0,                           -- Health
    '0%',                        -- Health regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    25,                          -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/4628.png',  -- Image URL
    'Hypershot\nDealing Ability damage to champions at 600 range or greater Reveals them for 6 seconds.\nDeal 10% increased damage to enemies Revealed by this item.\nFocus\nWhen Hypershot is triggered, Reveal all other enemy champions within 1400 range of them for 3 seconds.',  -- Effects
    2700,                        -- Cost
    3  ,null                           -- item_type_id (Mage corresponds to ID 3)
),
(
    'Hollow Radiance',           -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    400,                         -- Health
    '0%',                        -- Health regeneration / Base health regeneration
    0,                           -- Mana
    '100%',                       -- Mana regeneration
    40,                          -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    10,                          -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/6664.png',  -- Image URL
    'Immolate\nAfter taking or dealing damage, deal magic damage per second to nearby enemies for 3 seconds.\nDesolate\nKilling an enemy deals magic damage around them.',  -- Effects
    2800,                        -- Cost
    5,null                             -- item_type_id (Tank corresponds to ID 5)
),
(
    'Heartsteel',                -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    900,                         -- Health
    '100%',                      -- Health regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    0,                           -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3084.png',  -- Image URL
    'Colossal Consumption\nIf an enemy champion is nearby for a few seconds, your next Attack against them deals 80 plus of 12% of your Item Health as bonus physical damage and grants 12% of the damage as max Health.\nGoliath\nFor each 1000 max Health, gain 3% increased size, up to 30%.',  -- Effects
    3000,                        -- Cost
    5,null                             -- item_type_id (Tank corresponds to ID 5)
),
(
    'Guinsoo´s Rageblade',       -- Item name
    30,                          -- Attack damage
    '0%',                        -- Critical strike chance
    '25%',                       -- Attack speed
    30,                          -- Ability Power
    0,                           -- Health
    '0%',                        -- Health regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    0,                           -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3124.png',  -- Image URL
    'Wrath\nAttacks deal 30 bonus magic damage On-Hit.\nSeething Strike\nAttacks grant 8% Attack Speed for 3 seconds. (stacks 4 times).\nWhile fully stacked, every third Attack applies On-Hit effects twice.',  -- Effects
    3000,                        -- Cost
    2  ,null                           -- item_type_id (Marksman corresponds to ID 2)
),
(
    'Guardian Angel',            -- Item name
    55,                          -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    0,                           -- Health
    '0%',                        -- Health regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana regeneration
    45,                          -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    0,                           -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3026.png',  -- Image URL
    'Rebirth\nUpon taking lethal damage, restores 50% base Health and 100% max Mana after 4 seconds of Stasis.',  -- Effects
    3200,                        -- Cost
    2 ,1                            -- item_type_id (Marksman corresponds to ID 2)
),
(
    'Frozen Heart',              -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    0,                           -- Health
    '0%',                        -- Health regeneration / Base health regeneration
    400,                         -- Mana
    '0%',                        -- Mana regeneration
    75,                          -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    20,                          -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3110.png',  -- Image URL
    'Winter´s Caress\nReduce the Attack Speed of nearby champions by 20%.',  -- Effects
    2500,                        -- Cost
    5,null                             -- item_type_id (Tank corresponds to ID 5)
),
(
    'Force of Nature',          -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    400,                         -- Health
    '0%',                        -- Health regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana regeneration
    55,                          -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    0,                           -- Ability Haste (Cooldown reduction as an integer)
    '4%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/4401.png',  -- Image URL
    'Steadfast\nGain 70 Magic Resist and 6% bonus Move Speed after taking magic damage from Champions 8 times.',  -- Effects
    2800,                        -- Cost
    5 , null                            -- item_type_id (Tank corresponds to ID 5)
),
(
    'Fimbulwinter',             -- Item name
    0,                           -- Attack damage
    '0%',                        -- Critical strike chance
    '0%',                        -- Attack speed
    0,                           -- Ability Power
    550,                         -- Health
    '0%',                        -- Health regeneration / Base health regeneration
    860,                         -- Mana
    '0%',                        -- Mana regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    15,                          -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3121.png',  -- Image URL
    'Everlasting (Os)\nImmobilizing or Slowing (Melee only) an enemy champion grants a Shield for 3 seconds.\nThe Shield is increased by 80% if more than one enemy is nearby.',  -- Effects
    2400,                        -- Cost
    5 ,null                            -- item_type_id (Tank corresponds to ID 5)
),
(
    'Experimental Hexplate',    -- Item name
    40,                          -- Attack damage
    '0%',                        -- Critical strike chance
    '20%',                       -- Attack speed
    0,                           -- Ability Power
    450,                         -- Health
    '0%',                        -- Health regeneration / Base health regeneration
    0,                           -- Mana
    '0%',                        -- Mana regeneration
    0,                           -- Armor
    '0%',                        -- Tenacity
    0,                           -- Magic resistance
    0,                           -- Ability Haste (Cooldown reduction as an integer)
    '0%',                        -- Movement speed
    '0%',                        -- Life steal
    '0%',                        -- Armor penetration
    '0%',                        -- Magic penetration
    0,                           -- Lethality
    '0%',                        -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.22.1/img/item/3073.png',  -- Image URL
    'Hexcharged\nGain 30 Ultimate Ability Haste to your definitive\nOverdrive\nAfter casting your Ultimate, gain 30% Attack Speed and 15% Move Speed for 8 seconds.',  -- Effects
    3000,                        -- Cost
    1 , null                           -- item_type_id (Fighter corresponds to ID 2)
),
(
    'Essence Reaver',           -- Item name
    60,                         -- Attack damage
    '25%',                      -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    0,                          -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    15,                         -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/3508.png',  -- Image URL
    'Essence Drain\nAttacks grant Mana On-Hit.',  -- Effects
    2900,                       -- Cost
    2,1                           -- item_type_id (Fighter corresponds to ID 2)
),
(
    'Edge of Night',            -- Item name
    50,                         -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    250,                        -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    0,                          -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    15,                         -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/3814.png',  -- Image URL
    'Annul\nGrants a Spell Shield that blocks the next enemy Ability.',  -- Effects
    3000,                       -- Cost
    4,null                           -- item_type_id (Assassin corresponds to ID 4)
),
(
    'Eclipse',                  -- Item name
    60,                         -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    0,                          -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    15,                         -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/6692.png',  -- Image URL
    'Ever Rising Moon\nHitting a champion with 2 separate Attacks or Abilities within 2 seconds grants you a Shield for 2 seconds.',  -- Effects
    2900,                       -- Cost
    1 , 4                          -- item_type_id (Fighter corresponds to ID 1)
),
(
    'Echoes of Helia',          -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    35,                         -- Ability Power
    200,                        -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '125%',                     -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    20,                         -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/6620.png',  -- Image URL
    'Soul Siphon\nDamaging a champion grants a Soul Shard, up to 2.\nHealing or Shielding an ally consumes all Soul Shards to restore Health and deal magic damage to the nearest enemy champion per Shard.',  -- Effects
    2200,                       -- Cost
    6  , null                         -- item_type_id (Support corresponds to ID 6)
),
(
    'Deathfire Grasp',          -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    120,                        -- Ability Power
    0,                          -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    10,                         -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/3128.png',  -- Image URL
    'Active - The Silence: Deal magic damage equal to 15% of the Target´s Max Health, and then amplify damage they take by 15% for 4 seconds (90(0s)).',  -- Effects
    2900,                       -- Cost
    3 , null                          -- item_type_id (Mage corresponds to ID 3)
),
(
    'Death´s Dance',           -- Item name
    60,                         -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    0,                          -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    50,                         -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    15,                         -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/6333.png',  -- Image URL
    'Ignore Pain\nA percentage of damage taken is dealt to you over 3 seconds instead.\nDefy\nWhen a champion that you damaged within 3 seconds dies, cleanse Ignore Pain´s remaining damage and restore Health over 2 seconds.',  -- Effects
    3300,                       -- Cost
    1, null                          -- item_type_id (Fighter corresponds to ID 1)
),
(
    'Dead Man´s Plate',        -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    350,                        -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    55,                         -- Armor
    '25%',                      -- Tenacity
    0,                          -- Magic resistance
    0,                          -- Ability Haste (Cooldown reduction as an integer)
    '4%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/3742.png',  -- Image URL
    'Shipwrecker\nWhile moving, build up to 20 bonus Move Speed. Your next Attack discharges built up Move Speed to deal bonus physical damage.\nUnsinkable\nReduce the effectiveness of Slows by 25%.',  -- Effects
    2900,                       -- Cost
    5 , 1                          -- item_type_id (Tank corresponds to ID 5)
),
(
    'Dawncore',                 -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    45,                         -- Ability Power
    0,                          -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '100%',                     -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    0,                          -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '16%',                      -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/6621.png',  -- Image URL
    'First Light\nGain 2% Heal and Shield Power and 10 Ability Power per 100% Base Mana Regen.',  -- Effects
    2500,                       -- Cost
    6, null                           -- item_type_id (Support corresponds to ID 6)
),
(
    'Cryptbloom',               -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    60,                         -- Ability Power
    0,                          -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    15,                         -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '30%',                      -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/3137.png',  -- Image URL
    'Life from Death\nWhen a champion that you damaged within 3 seconds dies, a nova spreads from their corpse that heals.',  -- Effects
    2850,                       -- Cost
    3 , null                          -- item_type_id (Mage corresponds to ID 3)
),
(
    'Cosmic Drive',             -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    70,                         -- Ability Power
    350,                        -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    25,                         -- Ability Haste (Cooldown reduction as an integer)
    '4%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/4629.png',  -- Image URL
    'Spelldance\nDealing magic or true damage to champions grants Move Speed for 4 seconds.',  -- Effects
    3000,                       -- Cost
    3 , null                          -- item_type_id (Mage corresponds to ID 3)
),
(
    'Chempunk Chainsword',      -- Item name
    45,                         -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    450,                        -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    15,                         -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/6609.png',  -- Image URL
    'Hackshorn\nDealing physical damage applies 40% Wounds to enemy champions for 3 seconds.',  -- Effects
    3100,                       -- Cost
    1,4                           -- item_type_id (Fighter corresponds to ID 2)
),
(
    'Bloodthirster',            -- Item name
    80,                         -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    0,                          -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    0,                          -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '15%',                      -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/3072.png',  -- Image URL
    'Ichorshield\nConvert excess healing from your Lifesteal to a Shield.',  -- Effects
    3400,                       -- Cost
    2, null                           -- item_type_id (Marksman corresponds to ID 1)
),
(
    'Blade of The Ruined King',  -- Item name
    40,                         -- Attack damage
    '0%',                       -- Critical strike chance
    '25%',                      -- Attack speed
    0,                       -- Ability Power
    0,                          -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    0,                          -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '10%',                      -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/3153.png',  -- Image URL
    'Mist´s Edge\nAttacks deal a percentage of enemy´s current Health as bonus physical damage On-Hit.\nClawing Shadows\nAttacking a champion 3 times Slows them by 30% for 1 second.',  -- Effects
    3200,                       -- Cost
    2  ,1                          -- item_type_id (Fighter corresponds to ID 2)
),
(
    'Blackfire Torch',          -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    80,                         -- Ability Power
    0,                        -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    600,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    20,                         -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/2503.png',  -- Image URL
    'Baleful Blaze\nDamaging Abilities deals bonus magic damage for 3 seconds.\nBlackfire\nFor each enemy champion, epic and large monster affected by your Baleful Blaze, gain 4% Ability Power.',  -- Effects
    2800,                       -- Cost
    3  , null                         -- item_type_id (Mage corresponds to ID 3)
),
(
    'Black Cleaver',            -- Item name
    40,                         -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    400,                        -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    20,                         -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/3071.png',  -- Image URL
    'Carve: Dealing physical damage to champions reduces their Armor by 6% for 6 seconds. (stacks 5 times).\nFervor: Dealing physical damage grants 20 Move Speed for 2 seconds.',  -- Effects
    3000,                       -- Cost
    1   , null                        -- item_type_id (Fighter corresponds to ID 1)
),
(
    'Banshee´s Veil',          -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    105,                        -- Ability Power
    0,                          -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    40,                         -- Magic resistance
    0,                          -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/3102.png',  -- Image URL
    'Annul: Grants a Spell Shield that blocks the next enemy Ability.',  -- Effects
    3000,                       -- Cost
    3  , null                         -- item_type_id (Mage corresponds to ID 3)
),
(
    'Axiom Arc',                -- Item name
    55,                         -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    0,                          -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    20,                         -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    18,                         -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/6696.png',  -- Image URL
    'Flux: When a champion that you damaged within 3 seconds dies, refund some of your Ultimate Ability´s total cooldown.',  -- Effects
    3000,                       -- Cost
    4 , null                        -- item_type_id (Assassin corresponds to ID 4)
),
(
    'Ardent Censer',            -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '25%',                      -- Attack speed
    45,                         -- Ability Power
    0,                          -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '125%',                     -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    0,                          -- Ability Haste (Cooldown reduction as an integer)
    '4%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '10%',                      -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/3504.png',  -- Image URL
    'Sanctify: Healing or Shielding an ally enhances you both for 6 seconds, granting 25% Attack Speed and 20 magic damage On-Hit.',  -- Effects
    2200,                       -- Cost
    6 , null                          -- item_type_id (Support corresponds to ID 6)
),
(
    'Anathema´s Chains',       -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    650,                        -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    0,                          -- Magic resistance
    20,                         -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/8001.png',  -- Image URL
    'Vendetta: You gain Vendetta stacks over time. Each stack of Vendetta grants you 1% reduced damage from your Nemesis.\nVengeance: At maximum stacks, your Nemesis has reduced Tenacity while near you.\nACTIVE (0s): Vow: Choose a Nemesis.',  -- Effects
    2500,                       -- Cost
    5,null                           -- item_type_id (Tank corresponds to ID 5)
),
(
    'Abyssal Mask',             -- Item name
    0,                          -- Attack damage
    '0%',                       -- Critical strike chance
    '0%',                       -- Attack speed
    0,                          -- Ability Power
    300,                        -- Health
    '0%',                       -- Health regeneration / Base health regeneration
    0,                          -- Mana
    '0%',                       -- Mana regeneration
    0,                          -- Armor
    '0%',                       -- Tenacity
    45,                         -- Magic resistance
    15,                         -- Ability Haste (Cooldown reduction as an integer)
    '0%',                       -- Movement speed
    '0%',                       -- Life steal
    '0%',                       -- Armor penetration
    '0%',                       -- Magic penetration
    0,                          -- Lethality
    '0%',                       -- Healing and shield power
    'https://static.bigbrain.gg/assets/lol/riot_static/14.23.1/img/item/8020.png',  -- Image URL
    'Unmake: Reduce nearby enemy champions Magic Resist by 30%.',  -- Effects
    2650,                       -- Cost
    5 ,null                          -- item_type_id (Tank corresponds to ID 5)
);
INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('High Noon Lucian',
 '2018-08-30',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FLucian_8.jpg&w=1200&q=75',
 5,
 1),
 ('PROJECT Lucian',
  '2015-09-08',
  'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FLucian_6.jpg&w=1200&q=75',
  4,
  1);
  INSERT INTO skins (name, release_date, image, tier_id, champion_id)
  VALUES
  ('Soul Reaver Draven',
   '2012-06-06',
   'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FDraven_1.jpg&w=1200&q=75',
   4,  -- tier Epic corresponde al 1350, que es el 4to tier
   2),
('Primetime Draven',
 '2014-06-21',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FDraven_3.jpg&w=1200&q=75',
 3,
 2);
  INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Shockblade Zed',
 '2012-11-13',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FZed_1.jpg&w=1200&q=75',
 3,
 3),

('Empyrean Zed',
 '2024-05-01',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FZed_38.jpg&w=1200&q=75',
 4,
 3);
 INSERT INTO skins (name, release_date, image, tier_id, champion_id)
 VALUES
 ('Empyrean Zac',
  '2022-11-03',
  'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FZac_14.jpg&w=1200&q=75',
  4,
  4),

 ('Special Weapon Zac',
  '2013-03-29',
  'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FZac_1.jpg&w=1200&q=75',
  3,
  4);
INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Time Machine Zilean',
 '2011-04-12',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FZilean_4.jpg&w=1200&q=75',
 1,
 5),

('Sugar Rush Zilean',
 '2019-12-17',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FZilean_6.jpg&w=1200&q=75',
 4,
 5);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Odyssey Jinx',
 '2018-09-12',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FJinx_13.jpg&w=1200&q=75',
 4,
 6),

('Battle Cat Jinx',
 '2022-03-31',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FJinx_38.jpg&w=1200&q=75',
 4,
 6);

 INSERT INTO skins (name, release_date, image, tier_id, champion_id)
 VALUES
 ('Riot Graves',
  '2012-08-16',
  'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FGraves_4.jpg&w=1200&q=75',
  3,
  7),

 ('Pool Party Graves',
  '2013-09-11',
  'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FGraves_5.jpg&w=1200&q=75',
  4,
  7);

  INSERT INTO skins (name, release_date, image, tier_id, champion_id)
  VALUES
  ('Traditional Karma',
   '2013-03-29',
   'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FKarma_3.jpg&w=1200&q=75',
   3,
   8),

  ('Tranquility Dragon Karma',
   '2021-10-20',
   'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FKarma_44.jpg&w=1200&q=75',
   4,
   8);

  INSERT INTO skins (name, release_date, image, tier_id, champion_id)
   VALUES
   ('Crime City Twitch',
    '2010-10-13',
    'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FTwitch_4.jpg&w=1200&q=75',
    3,
    9),
    ('Dragonslayer Twitch',
     '2021-04-15',
     'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FTwitch_36.jpg&w=1200&q=75',
     4,
     9);

     INSERT INTO skins (name, release_date, image, tier_id, champion_id)
     VALUES
     ('The Magnificent Twisted Fate',
      '2010-05-18',
      'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/TwistedFate_3.jpg',
      5,
      10),
     ('Underworld Twisted Fate',
      '2012-10-26',
      'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/TwistedFate_7.jpg',
      3,
      10);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Scorched Earth Xerath',
 '2012-07-13',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Xerath_3.jpg',
 4,
 11),
('Arcana Xerath',
 '2021-05-12',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Xerath_12.jpg',
 4,
 11);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Slay Belle Katarina',
 '2012-12-14',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Katarina_7.jpg',
 3,
 12),
('Kitty Cat Katarina',
 '2010-10-18',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Katarina_4.jpg',
 3,
 12);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Mecha Kha´Zix',
 '2012-09-27',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Khazix_1.jpg',
 3,
 13),
('Dark Star Kha´Zix',
 '2017-02-05',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Khazix_4.jpg',
 3,
 13);

 INSERT INTO skins (name, release_date, image, tier_id, champion_id)
 VALUES
 ('Fisherman Fizz',
  '2012-04-01',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fizz_3.jpg',
  3,
  14),
 ('Tundra Fizz',
  '2011-11-15',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fizz_2.jpg',
  2,
  14);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Headhunter Rengar',
 '2012-08-21',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rengar_1.jpg',
 3,
 15),
('Night Hunter Rengar',
 '2014-05-20',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rengar_2.jpg',
 3,
 15);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Headmistress Fiora',
 '2012-10-25',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiora_3.jpg',
 3,
 16),
('Soaring Sword Fiora',
 '2017-09-28',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiora_22.jpg',
 4,
 16);

 INSERT INTO skins (name, release_date, image, tier_id, champion_id)
 VALUES
 ('Arcade Hecarim',
  '2013-08-22',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Hecarim_4.jpg',
  4,
  17),
 ('Elderwood Hecarim',
  '2015-11-25',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Hecarim_5.jpg',
  4,
  17);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Blood Lord Vladimir',
 '2011-11-21',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vladimir_5.jpg',
 5,
 18),
('Soulstealer Vladimir',
 '2014-07-10',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vladimir_6.jpg',
 4,
 18);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Ashen Lord Aurelion Sol',
 '2016-03-24',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/AurelionSol_1.jpg',
 4,
 19),
('Mecha Aurelion Sol',
 '2018-08-15',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/AurelionSol_2.jpg',
 4,
 19);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Arcade Kai´Sa',
 '2019-06-28',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_17.jpg',
 4,
 20),
('Heavenscale Kai´Sa',
 '2024-02-07',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_59.jpg',
 4,
 20);

 INSERT INTO skins (name, release_date, image, tier_id, champion_id)
 VALUES
 ('Giant Enemy Crabgot',
  '2010-08-24',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Urgot_1.jpg',
  2,
  21),
 ('Battlecast Urgot',
  '2012-03-05',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Urgot_3.jpg',
  4,
  21);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Outback Renekton',
 '2011-01-18',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Renekton_2.jpg',
 2,
 22),
('Pool Party Renekton',
 '2013-09-09',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Renekton_6.jpg',
 3,
 22);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Withered Rose Zeri',
 '2022-01-20',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zeri_1.jpg',
 3,
 23),
('Ocean Song Zeri',
 '2022-06-09',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zeri_10.jpg',
 3,
 23);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Surfer Singed',
 '2010-12-06',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Singed_3.jpg',
 3,
 24),
('Augmented Singed',
 '2012-07-09',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Singed_5.jpg',
 3,
 24);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Eternum Rek´Sai',
 '2014-12-11',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/RekSai_1.jpg',
 4,
 25),
('Blackfrost Rek´Sai',
 '2020-03-05',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/RekSai_1.jpg',
 4,
 25);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Traditional Trundle',
 '2013-04-30',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Trundle_3.jpg',
 3,
 26),
('Constable Trundle',
 '2014-11-28',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Trundle_4.jpg',
 2,
 26);

 INSERT INTO skins (name, release_date, image, tier_id, champion_id)
 VALUES
 ('Mecha Aatrox',
  '2014-07-24',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_2.jpg',
  4,
  27),
 ('Blood Moon Aatrox',
  '2019-01-10',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_7.jpg',
  4,
  27);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Longhorn Alistar',
 '2011-02-16',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Alistar_4.jpg',
 1,
 28),
('Moo Cow Alistar',
 '2017-03-30',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Alistar_10.jpg',
 3,
 28);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Stinger Akali',
 '2010-05-10',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_1.jpg',
 1,
 29),
('Nurse Akali',
 '2011-01-04',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_4.jpg',
 3,
 29);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Elderwood Ornn',
 '2020-12-10',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ornn_2.jpg',
 4,
 30),
('Choo-Choo Ornn',
 '2024-03-31',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ornn_20.jpg',
 4,
 30);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Commando Galio',
 '2011-01-18',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Galio_3.jpg',
 1,
 31),
('Gatekeeper Galio',
 '2012-04-23',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Galio_4.jpg',
 5,
 31);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Darkforge Jarvan IV',
 '2011-07-26',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/JarvanIV_3.jpg',
 3,
 32),
('Warring Kingdoms Jarvan IV',
 '2013-02-08',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/JarvanIV_5.jpg',
 4,
 32),
('Faerie Court Milio',
 '2023-03-23',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Milio_1.jpg',
 4,
 33),
('Rain Shepherd Milio',
 '2024-06-26',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Milio_11.jpg',
 4,
 33);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Admiral Glasc',
 '2022-02-17',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Renata_1.jpg',
 4,
 34),
('Prestige La Ilusión Renata Glasc',
 '2023-09-26',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Renata_21.jpg',
 5,
 34);

 INSERT INTO skins (name, release_date, image, tier_id, champion_id)
 VALUES
 ('Yellow Jacket Shen',
  '2010-03-24',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Shen_2.jpg',
  1,
  35),
 ('Warlord Shen',
  '2012-04-17',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Shen_5.jpg',
  3,
  35);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Sandscourge Skarner',
 '2011-08-09',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Skarner_1.jpg',
 3,
 36),
('Battlecast Alpha Skarner',
 '2014-11-25',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Skarner_3.jpg',
 4,
 36);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Hyena Warwick',
 '2011-12-05',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Warwick_7.jpg',
 3,
 37),
('Tundra Hunter Warwick',
 '2010-08-16',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Warwick_4.jpg',
 2,
 37);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Arcane Caitlyn',
 '2021-11-22',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Caitlyn_28.jpg',
 4,
 38),
('Sheriff Caitlyn',
 '2011-01-04',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Caitlyn_2.jpg',
 1,
 38);

 INSERT INTO skins (name, release_date, image, tier_id, champion_id)
 VALUES
 ('Gentleman Cho´Gath',
  '2010-05-11',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Chogath_2.jpg',
  5,
  39),
 ('Jurassic Cho´Gath',
  '2011-11-01',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Chogath_4.jpg',
  1,
  39);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Coral Reef Malphite',
 '2010-11-08',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Malphite_2.jpg',
 2,
 40),
('Glacial Malphite',
 '2012-07-11',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Malphite_5.jpg',
 3,
 40);

 INSERT INTO skins (name, release_date, image, tier_id, champion_id)
 VALUES
 ('Hillbilly Gragas',
  '2010-08-02',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gragas_2.jpg',
  2,
  41),
 ('Gragas, Esq.',
  '2011-04-12',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gragas_4.jpg',
  3,
  41);

  INSERT INTO skins (name, release_date, image, tier_id, champion_id)
  VALUES
  ('Neon Strike Vi',
   '2012-12-19',
   'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vi_1.jpg',
   2,
   42),
  ('PROJECT: Vi',
   '2017-11-22',
   'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vi_11.jpg',
   3,
   42);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Dragonslayer Braum',
 '2014-05-12',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Braum_1.jpg',
 2,
 43),
('Santa Braum',
 '2016-12-14',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Braum_10.jpg',
 3,
 43);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Lord Mordekaiser',
 '2011-05-10',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Mordekaiser_4.jpg',
 2,
 44),
('PROJECT: Mordekaiser',
 '2021-05-27',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Mordekaiser_13.jpg',
 5,
 44);
 INSERT INTO skins (name, release_date, image, tier_id, champion_id)
 VALUES
 ('Snow Day Bard',
  '2015-12-10',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Bard_5.jpg',
  3,
  45),
 ('Astronaut Bard',
  '2020-05-28',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Bard_8.jpg',
  3,
  45);
INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Prestige True Damage Senna',
 '2020-02-06',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Senna_9.jpg',
 5,
 46),
('High Noon Senna',
 '2020-06-18',
 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Senna_10.jpg',
 5,
 46);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Corporate Mundo',
 '2010-09-13',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FDrMundo_3.jpg&w=1200&q=75',
 5,
 47),
('Pool Party Mundo',
 '2015-06-26',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FDrMundo_8.jpg&w=1200&q=75',
 4,
 47);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Demonblade Tryndamere',
 '2011-08-02',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FTryndamere_4.jpg&w=1200&q=75',
 5,
 48),
('Warring Kingdoms Tryndamere',
 '2014-01-28',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FTryndamere_6.jpg&w=1200&q=75',
 3,
 48);

INSERT INTO skins (name, release_date, image, tier_id, champion_id)
VALUES
('Candy King Ivern',
 '2016-10-05',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FIvern_1.jpg&w=1200&q=75',
 4,
 49),
('Dunkmaster Ivern',
 '2019-04-04',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FIvern_2.jpg&w=1200&q=75',
 4,
 49),
('Astronaut Ivern',
 '2023-02-24',
 'https://www.lolvvv.com/_next/image?url=https%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2Fimg%2Fchampion%2Fsplash%2FIvern_20.jpg&w=1200&q=75',
 4,
 49);

--LAS
-- LAS Bronze (rank_id = 1, server_id = 3)
INSERT INTO users (
    username, password, email, nickname, registration_date, blue_essence, riot_points, rank_id, server_id
) VALUES
('matias.romero', 'pw_matias1', 'matias.romero@gmail.com', 'Matix', '2021-05-10 13:22:00', 2800, 520, 1, 3),
('luciano.soto', 'pw_luciano2', 'luciano.soto@yahoo.com', 'Lucs', '2022-07-08 15:45:20', 1500, 0, 1, 3),
('diego.salinas', 'pw_diego3', 'diego.sal@gmail.com', 'Diegorl', '2023-03-17 10:05:45', 3200, 750, 1, 3),
('alejandro.mendez', 'pw_ale4', 'ale.mendez@hotmail.com', 'AleMdz', '2020-11-21 22:10:30', 1900, 400, 1, 3),
('facundo.torres', 'pw_facundo5', 'fatorres@outlook.com', 'FakTor', '2021-09-03 18:50:12', 2100, 1350, 1, 3),
('nicolas.ibarra', 'pw_nico6', 'nico.ibarra@gmail.com', 'NikoBeast', '2022-04-27 09:30:00', 1100, 0, 1, 3),
('camila.vargas', 'pw_camila7', 'cami.vargas@gmail.com', 'Camilucha', '2020-12-01 11:15:44', 2450, 975, 1, 3),
('valentina.miranda', 'pw_valen8', 'valen.miranda@gmail.com', 'ValeGG', '2021-08-25 16:40:20', 3000, 1820, 1, 3),
('sofia.luna', 'pw_sofi9', 'sofi.luna@gmail.com', 'Lunatica', '2023-01-10 08:12:34', 1300, 0, 1, 3),
('julieta.rios', 'pw_juli10', 'julieta.rios@gmail.com', 'Julzz', '2022-06-13 20:30:15', 1600, 400, 1, 3);

-- LAS Silver (rank_id = 2, server_id = 3)
INSERT INTO users (
    username, password, email, nickname, registration_date, blue_essence, riot_points, rank_id, server_id
) VALUES
('sebastian.vera', 'pw_seba1', 'sebastian.vera@gmail.com', 'SebasXD', '2021-03-05 12:05:00', 3700, 1350, 2, 3),
('franco.molina', 'pw_franco2', 'franco.molina@gmail.com', 'Franquito', '2020-10-10 14:25:18', 2100, 975, 2, 3),
('gonzalo.ayala', 'pw_gonza3', 'g.ayala@gmail.com', 'Zalo', '2023-02-18 11:40:00', 4200, 520, 2, 3),
('agustin.rojas', 'pw_agus4', 'agus.rojas@gmail.com', 'ElTino', '2022-05-15 19:10:55', 1800, 0, 2, 3),
('marcos.espinoza', 'pw_marcos5', 'marcos.esp@gmail.com', 'Marquinhos', '2021-12-01 13:55:00', 2600, 400, 2, 3),
('lucas.alvarez', 'pw_lucas6', 'lucasalv@gmail.com', 'Lukix', '2023-06-30 17:00:00', 3400, 1820, 2, 3),
('pamela.fuentes', 'pw_pamela7', 'pamfuentes@gmail.com', 'PameGG', '2022-09-07 15:45:33', 3000, 975, 2, 3),
('micaela.silva', 'pw_mica8', 'mica.silva@gmail.com', 'Micaa', '2021-07-12 09:05:12', 1900, 520, 2, 3),
('carla.duran', 'pw_carla9', 'carla.duran@gmail.com', 'Carlitax', '2020-11-17 08:00:00', 2200, 0, 2, 3),
('florencia.reyes', 'pw_flor10', 'flor.reyes@gmail.com', 'FlorFPS', '2021-10-03 21:20:00', 2700, 750, 2, 3);

-- LAS Gold (rank_id = 3, server_id = 3)
INSERT INTO users (
    username, password, email, nickname, registration_date, blue_essence, riot_points, rank_id, server_id
) VALUES
('martin.carrizo', 'pw_martin1', 'martin.carrizo@gmail.com', 'Martox', '2022-03-18 12:00:00', 4500, 1350, 3, 3),
('rodrigo.farias', 'pw_rodrigo2', 'rodrigo.f@gmail.com', 'Rodra', '2023-01-10 14:30:00', 3800, 975, 3, 3),
('santiago.acosta', 'pw_santi3', 'santi.acosta@gmail.com', 'Santix', '2022-06-09 10:45:20', 3400, 1820, 3, 3),
('joaquin.martinez', 'pw_joaquin4', 'joaquin.martinez@gmail.com', 'Joaqo', '2021-08-14 19:20:10', 3100, 520, 3, 3),
('emanuel.lopez', 'pw_emanuel5', 'ema.lopez@gmail.com', 'EmanGo', '2022-12-03 16:10:00', 4100, 750, 3, 3),
('ivan.rios', 'pw_ivan6', 'ivan.rios@gmail.com', 'Rivax', '2023-02-21 11:15:30', 3600, 0, 3, 3),
('cristian.fernandez', 'pw_cris7', 'cristian.fer@gmail.com', 'Crizz', '2021-05-29 18:50:00', 2800, 400, 3, 3),
('milagros.perez', 'pw_mili8', 'milagros.perez@gmail.com', 'Milix', '2022-07-11 17:25:00', 2300, 1350, 3, 3),
('carolina.vazquez', 'pw_caro9', 'caro.vazquez@gmail.com', 'Caroz', '2020-09-18 13:00:00', 3000, 975, 3, 3),
('jazmin.lopez', 'pw_jaz10', 'jazmin.lopez@gmail.com', 'JazStyle', '2023-03-15 08:40:10', 2600, 520, 3, 3);

-- LAS Platinum (rank_id = 4, server_id = 3)
INSERT INTO users (
    username, password, email, nickname, registration_date, blue_essence, riot_points, rank_id, server_id
) VALUES
('federico.gomez', 'pw_fede1', 'fede.gomez@gmail.com', 'Fedekun', '2021-04-10 12:35:00', 4800, 1820, 4, 3),
('german.roldan', 'pw_german2', 'german.roldan@gmail.com', 'Gerox', '2022-06-22 16:00:00', 3900, 750, 4, 3),
('leo.mansilla', 'pw_leo3', 'leo.mansilla@gmail.com', 'Leobas', '2023-05-13 10:30:00', 4300, 400, 4, 3),
('daniel.quiroga', 'pw_dani4', 'daniel.q@gmail.com', 'DaniKDA', '2022-01-19 09:10:00', 3700, 1350, 4, 3),
('julian.rey', 'pw_julian5', 'julianrey@gmail.com', 'Julvyn', '2020-10-07 20:00:00', 2900, 520, 4, 3),
('bruno.espinoza', 'pw_bruno6', 'bruno.espinoza@gmail.com', 'Brunex', '2021-11-28 17:45:00', 3200, 975, 4, 3),
('mauricio.diaz', 'pw_mau7', 'mauricio.diaz@gmail.com', 'Mauuu', '2023-03-02 19:55:10', 4100, 0, 4, 3),
('florencia.moya', 'pw_flor8', 'flor.moya@gmail.com', 'FlorMoba', '2021-07-15 12:25:30', 3500, 1350, 4, 3),
('agustina.sosa', 'pw_agus9', 'agus.sosa@gmail.com', 'AgusBot', '2022-04-08 14:20:00', 2800, 750, 4, 3),
('luciana.vallejos', 'pw_luci10', 'luciana.v@gmail.com', 'Lucixx', '2023-01-22 11:05:20', 3000, 400, 4, 3);

-- LAS Emerald (rank_id = 5, server_id = 3)
INSERT INTO users (
    username, password, email, nickname, registration_date, blue_essence, riot_points, rank_id, server_id
) VALUES
('facundo.torres', 'pw_facu1', 'facu.torres@gmail.com', 'FakuZ', '2022-01-12 13:00:00', 5400, 975, 5, 3),
('matias.salinas', 'pw_mati2', 'matias.salinas@gmail.com', 'Matinex', '2023-02-03 09:25:00', 5100, 1350, 5, 3),
('lucas.rojas', 'pw_lucas3', 'lucas.rojas@gmail.com', 'LRojas', '2021-07-22 17:45:10', 4600, 520, 5, 3),
('alejandro.cortez', 'pw_ale4', 'ale.cortez@gmail.com', 'AleCore', '2022-10-19 08:40:00', 4900, 1820, 5, 3),
('pablo.mendez', 'pw_pablo5', 'pablo.mendez@gmail.com', 'Pablitox', '2023-03-10 20:00:00', 4200, 750, 5, 3),
('gaston.vazquez', 'pw_gaston6', 'gaston.vazquez@gmail.com', 'G4ston', '2020-11-14 11:10:00', 5800, 1350, 5, 3),
('franco.dominguez', 'pw_franco7', 'franco.d@gmail.com', 'FraDo', '2021-05-18 12:15:30', 4000, 400, 5, 3),
('sebastian.luna', 'pw_seba8', 'sebastian.luna@gmail.com', 'SebLuz', '2022-08-30 15:20:00', 4500, 975, 5, 3),
('valeria.bustos', 'pw_vale9', 'valeria.bustos@gmail.com', 'ValeGG', '2021-03-07 10:00:00', 3600, 520, 5, 3),
('camila.olivera', 'pw_camila10', 'camila.olivera@gmail.com', 'Camix', '2023-06-12 18:30:00', 3700, 750, 5, 3);

-- LAS Diamond (rank_id = 6, server_id = 3)
INSERT INTO users (
    username, password, email, nickname, registration_date, blue_essence, riot_points, rank_id, server_id
) VALUES
('andres.lopez', 'pw_andres1', 'andres.lopez@gmail.com', 'AndyLoL', '2022-04-11 14:20:00', 6100, 1820, 6, 3),
('julio.ramirez', 'pw_julio2', 'julio.ramirez@gmail.com', 'JRam', '2021-10-27 19:10:00', 5900, 750, 6, 3),
('ezequiel.garcia', 'pw_eze3', 'eze.garcia@gmail.com', 'EzeMain', '2022-05-30 12:00:00', 5300, 1350, 6, 3),
('luis.ortega', 'pw_luis4', 'luis.ortega@gmail.com', 'LuixZ', '2023-03-05 16:10:00', 5600, 975, 6, 3),
('fernando.gil', 'pw_fer5', 'fer.gil@gmail.com', 'FGil', '2020-08-19 09:30:00', 5200, 400, 6, 3),
('agustin.villar', 'pw_agus6', 'agus.villar@gmail.com', 'Agux', '2021-12-15 13:45:00', 5800, 1350, 6, 3),
('nahuel.sanchez', 'pw_nahu7', 'nahuel.sanchez@gmail.com', 'N4wuel', '2022-09-21 11:05:00', 5000, 520, 6, 3),
('ramiro.flores', 'pw_rami8', 'ramiro.flores@gmail.com', 'RamFlo', '2023-01-28 15:25:00', 5700, 1820, 6, 3),
('noelia.morales', 'pw_noe9', 'noelia.morales@gmail.com', 'NoeGG', '2021-06-18 17:50:00', 4000, 750, 6, 3),
('melina.rodriguez', 'pw_meli10', 'melina.rodriguez@gmail.com', 'MelxD', '2022-02-13 08:15:00', 4300, 975, 6, 3);

-- LAS Master (rank_id = 7, server_id = 3)
INSERT INTO users (
    username, password, email, nickname, registration_date, blue_essence, riot_points, rank_id, server_id
) VALUES
('benjamin.martinez', 'pw_benja1', 'benja.martinez@gmail.com', 'BenjaLoL', '2022-07-10 10:00:00', 6400, 1820, 7, 3),
('tomas.moreno', 'pw_tomi2', 'tomas.moreno@gmail.com', 'Tomoreno', '2023-02-01 13:15:00', 6000, 1350, 7, 3),
('diego.sosa', 'pw_diego3', 'diego.sosa@gmail.com', 'DSosa', '2021-11-05 09:20:00', 5800, 975, 7, 3),
('javier.pereyra', 'pw_javi4', 'javier.pereyra@gmail.com', 'Javix', '2023-04-17 14:30:00', 6200, 520, 7, 3),
('ignacio.rios', 'pw_ignacio5', 'ignacio.rios@gmail.com', 'Nacho', '2022-12-22 18:40:00', 6100, 750, 7, 3),
('rodrigo.bustos', 'pw_rodri6', 'rodrigo.bustos@gmail.com', 'Rodrixx', '2021-06-28 20:00:00', 5900, 400, 7, 3),
('federico.gomez', 'pw_fede7', 'fede.gomez@gmail.com', 'F3de', '2022-03-19 11:10:00', 6300, 1820, 7, 3),
('maximiliano.vera', 'pw_maxi8', 'maxi.vera@gmail.com', 'MaxV', '2021-09-13 08:50:00', 6200, 750, 7, 3),
('cristian.araya', 'pw_cris9', 'cristian.araya@gmail.com', 'CrisA', '2020-10-03 12:30:00', 6100, 1350, 7, 3),
('agostina.lopez', 'pw_ago10', 'agostina.lopez@gmail.com', 'Agos', '2022-01-07 17:45:00', 5800, 975, 7, 3);

-- LAS Grandmaster (rank_id = 8, server_id = 3)
INSERT INTO users (
    username, password, email, nickname, registration_date, blue_essence, riot_points, rank_id, server_id
) VALUES
('manuel.castro', 'pw_manu1', 'manuel.castro@gmail.com', 'Manucas', '2023-03-01 16:20:00', 6700, 1820, 8, 3),
('joaquin.luna', 'pw_joaquin2', 'joaquin.luna@gmail.com', 'Joax', '2022-04-12 19:00:00', 6400, 975, 8, 3),
('luciano.torrez', 'pw_lucho3', 'luciano.torrez@gmail.com', 'LuchoGod', '2021-08-22 13:10:00', 6200, 1350, 8, 3),
('leandro.alvarez', 'pw_leo4', 'leandro.alvarez@gmail.com', 'Leandrix', '2020-11-30 09:00:00', 6500, 520, 8, 3),
('daniel.molina', 'pw_dani5', 'daniel.molina@gmail.com', 'D4nix', '2023-06-10 10:15:00', 6600, 750, 8, 3),
('facundo.rios', 'pw_facu6', 'facundo.rios@gmail.com', 'FacuLOL', '2021-05-27 20:10:00', 6800, 400, 8, 3),
('santiago.mendez', 'pw_santi7', 'santiago.mendez@gmail.com', 'Santix', '2022-09-16 14:40:00', 6900, 1350, 8, 3),
('dario.peralta', 'pw_dario8', 'dario.peralta@gmail.com', 'DPer4', '2020-12-11 11:30:00', 6600, 520, 8, 3),
('nicolas.fernandez', 'pw_nico9', 'nicolas.fernandez@gmail.com', 'NicoXD', '2023-01-19 17:20:00', 6300, 1820, 8, 3),
('valentina.quiroga', 'pw_valen10', 'valentina.quiroga@gmail.com', 'Valek', '2021-07-06 08:45:00', 6000, 750, 8, 3);

-- LAS Challenger (rank_id = 9, server_id = 3)
INSERT INTO users (
    username, password, email, nickname, registration_date, blue_essence, riot_points, rank_id, server_id
) VALUES
('sebastian.morales', 'pw_seba1', 'sebastian.morales@gmail.com', 'SebaKing', '2022-08-12 10:20:00', 7000, 1820, 9, 3),
('martin.galvez', 'pw_martin2', 'martin.galvez@gmail.com', 'Martox', '2023-02-08 14:00:00', 6800, 975, 9, 3),
('matias.espinoza', 'pw_mati3', 'matias.espinoza@gmail.com', 'MatEzz', '2021-06-18 16:30:00', 7200, 1350, 9, 3),
('julian.santana', 'pw_juli4', 'julian.santana@gmail.com', 'Julikz', '2020-09-25 19:10:00', 7400, 520, 9, 3),
('alejandro.reyes', 'pw_ale5', 'alejandro.reyes@gmail.com', 'AlePro', '2023-05-14 11:45:00', 7100, 750, 9, 3),
('franco.mendez', 'pw_franco6', 'franco.mendez@gmail.com', 'Fr4nc0', '2022-10-30 09:25:00', 6950, 400, 9, 3),
('gonzalo.lopez', 'pw_gonza7', 'gonzalo.lopez@gmail.com', 'GonzaLOL', '2021-01-09 08:15:00', 7050, 1350, 9, 3),
('axel.ortiz', 'pw_axel8', 'axel.ortiz@gmail.com', 'AxelOnTop', '2020-11-13 13:40:00', 7150, 520, 9, 3),
('damian.cabrera', 'pw_dami9', 'damian.cabrera@gmail.com', 'DamiCore', '2023-03-28 15:00:00', 7300, 1820, 9, 3),
('lucas.villalba', 'pw_lucas10', 'lucas.villalba@gmail.com', 'LukasChall', '2021-07-21 17:35:00', 7250, 750, 9, 3);


-- USER MATCHES
INSERT INTO user_matches (
    user_id,
    normal_games_played, normal_wins,
    rankeds_played, ranked_wins,
    arams_played, aram_wins
) VALUES
(1, 140, 67, 178, 85, 63, 30),
(2, 140, 67, 159, 77, 84, 42),
(3, 103, 53, 204, 95, 112, 57),
(4, 105, 50, 145, 76, 50, 24),
(5, 126, 60, 210, 111, 104, 53),
(6, 89, 44, 209, 100, 54, 25),
(7, 109, 52, 186, 89, 55, 26),
(8, 122, 58, 219, 105, 69, 35),
(9, 92, 48, 192, 99, 53, 25),
(10, 101, 48, 174, 90, 70, 36),
(11, 98, 50, 165, 85, 108, 51),
(12, 94, 44, 191, 99, 92, 45),
(13, 135, 63, 191, 99, 118, 57),
(14, 103, 50, 144, 74, 63, 31),
(15, 135, 64, 154, 72, 99, 49),
(16, 136, 72, 243, 123, 118, 56),
(17, 125, 63, 148, 71, 92, 47),
(18, 134, 68, 179, 89, 102, 48),
(19, 118, 57, 226, 113, 72, 33),
(20, 106, 54, 166, 81, 105, 52),
(21, 97, 51, 205, 104, 110, 56),
(22, 106, 73, 205, 96, 92, 45),
(23, 95, 66, 158, 91, 53, 33),
(24, 128, 62, 193, 94, 74, 35),
(25, 70, 33, 236, 122, 63, 32),
(26, 129, 61, 146, 70, 81, 40),
(27, 137, 71, 211, 107, 90, 45),
(28, 134, 64, 194, 100, 120, 60),
(29, 101, 50, 247, 125, 85, 41),
(30, 79, 38, 231, 120, 86, 40),
(31, 89, 45, 169, 79, 99, 48),
(32, 139, 90, 199, 103, 103, 64),
(33, 72, 38, 249, 122, 98, 48),
(34, 123, 63, 208, 104, 119, 58),
(35, 132, 67, 143, 70, 99, 47),
(36, 129, 67, 156, 88, 118, 48),
(37, 124, 60, 157, 76, 109, 54),
(38, 113, 59, 237, 118, 98, 50),
(39, 130, 89, 142, 66, 119, 49),
(40, 75, 36, 236, 110, 53, 25),
(41, 86, 41, 200, 102, 64, 33),
(42, 91, 43, 217, 106, 64, 32),
(43, 109, 55, 213, 100, 98, 49),
(44, 101, 51, 153, 73, 88, 46),
(45, 75, 36, 184, 92, 118, 57),
(46, 123, 65, 245, 124, 112, 58),
(47, 89, 47, 195, 95, 72, 37),
(48, 138, 71, 239, 121, 111, 54),
(49, 101, 50, 246, 127, 61, 30),
(50, 118, 57, 183, 91, 53, 25),
(51, 103, 52, 183, 89, 85, 39),
(52, 94, 47, 150, 78, 80, 40),
(53, 132, 62, 197, 120, 52, 25),
(54, 117, 58, 200, 102, 120, 58),
(55, 128, 61, 174, 83, 89, 42),
(56, 138, 70, 237, 116, 73, 37),
(57, 137, 71, 216, 105, 86, 42),
(58, 108, 50, 141, 66, 118, 57),
(59, 86, 40, 221, 108, 112, 56),
(60, 113, 58, 163, 78, 56, 26),
(61, 132, 68, 149, 78, 56, 26),
(62, 101, 52, 155, 74, 103, 51),
(63, 127, 67, 196, 96, 88, 44),
(64, 82, 40, 237, 111, 76, 36),
(65, 140, 75, 149, 86, 70, 34),
(66, 99, 49, 176, 89, 86, 45),
(67, 95, 48, 194, 100, 64, 33),
(68, 79, 40, 147, 76, 71, 37),
(69, 126, 64, 155, 82, 109, 54),
(70, 133, 69, 196, 99, 60, 30),
(71, 73, 37, 151, 75, 79, 41),
(72, 104, 49, 213, 106, 55, 27),
(73, 105, 52, 163, 78, 105, 51),
(74, 112, 54, 181, 92, 63, 30),
(75, 121, 52, 244, 117, 120, 51),
(76, 121, 56, 250, 130, 115, 57),
(77, 76, 39, 164, 83, 116, 60),
(78, 96, 47, 174, 90, 120, 60),
(79, 73, 35, 220, 103, 80, 39),
(80, 98, 47, 247, 128, 64, 32),
(81, 107, 53, 205, 102, 84, 42),
(82, 88, 44, 189, 98, 74, 38),
(83, 105, 54, 238, 116, 103, 48),
(84, 108, 54, 247, 123, 112, 54),
(85, 139, 72, 188, 99, 108, 51),
(86, 119, 73, 169, 103, 102, 65),
(87, 119, 55, 224, 112, 69, 35),
(88, 82, 54, 248, 99, 106, 46),
(89, 89, 43, 149, 75, 110, 53),
(90, 80, 41, 249, 122, 92, 45);



--USER X CHAMPIONS

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (1, 1, 2, '2025-05-01 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (1, 2, 3, '2025-05-02 00:00:00');
-- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (1, 22, 1, '2025-05-03 00:00:00');

-- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (1, 36, 1, '2025-05-03 00:00:00');

-- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (1, 14, 1, '2025-05-03 00:00:00');

-- SUPPORT
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (1, 34, 1, '2025-05-03 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (2, 3, 4, '2025-05-01 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (2, 4, 5, '2025-05-02 00:00:00');

-- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (2, 27, 1, '2025-05-03 00:00:00');

-- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (2, 20, 1, '2025-05-03 00:00:00');

-- SUPPORT
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (2, 43, 1, '2025-05-03 00:00:00');


INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (3, 5, 1, '2025-05-01 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (3, 6, 2, '2025-05-02 00:00:00');

-- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (3, 24, 1, '2025-05-03 00:00:00');

-- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (3, 41, 1, '2025-05-03 00:00:00');

-- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (3, 11, 1, '2025-05-03 00:00:00');


INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (4, 7, 3, '2025-05-01 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (4, 8, 4, '2025-05-02 00:00:00');

-- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (4, 40, 1, '2025-05-03 00:00:00');

-- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (4, 18, 1, '2025-05-03 00:00:00');

-- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (4, 38, 1, '2025-05-03 00:00:00');


INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (5, 9, 5, '2025-05-01 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (5, 10, 1, '2025-05-02 00:00:00');

-- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (5, 16, 1, '2025-05-03 00:00:00');

-- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (5, 25, 1, '2025-05-03 00:00:00');

-- SUPPORT
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (5, 28, 1, '2025-05-03 00:00:00');


INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (6, 11, 2, '2025-05-01 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (6, 12, 3, '2025-05-02 00:00:00');

-- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (6, 30, 1, '2025-05-03 00:00:00');

-- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (6, 13, 1, '2025-05-03 00:00:00');

-- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (6, 46, 1, '2025-05-03 00:00:00');

-- SUPPORT
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (6, 45, 1, '2025-05-03 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (7, 13, 4, '2025-05-01 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (7, 14, 5, '2025-05-02 00:00:00');

-- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (7, 39, 1, '2025-05-03 00:00:00');

-- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (7, 23, 1, '2025-05-03 00:00:00');

-- SUPPORT
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (7, 33, 1, '2025-05-03 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (8, 15, 1, '2025-05-01 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (8, 16, 2, '2025-05-02 00:00:00');

-- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (8, 19, 1, '2025-05-03 00:00:00');

-- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (8, 1, 1, '2025-05-03 00:00:00');

-- SUPPORT
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (8, 5, 1, '2025-05-03 00:00:00');


INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (9, 17, 3, '2025-05-01 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (9, 18, 4, '2025-05-02 00:00:00');

-- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (9, 21, 1, '2025-05-03 00:00:00');

-- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (9, 6, 1, '2025-05-03 00:00:00');

-- SUPPORT
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (9, 8, 1, '2025-05-03 00:00:00');


INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (10, 19, 5, '2025-05-01 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (10, 20, 1, '2025-05-02 00:00:00');

-- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (10, 48, 1, '2025-05-03 00:00:00');

-- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (10, 37, 1, '2025-05-03 00:00:00');

-- SUPPORT
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date)
VALUES (10, 43, 1, '2025-05-03 00:00:00');

-- Usuario 11
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (11, 16, 1, '2025-05-03 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (11, 7, 1, '2025-05-03 00:00:00');  -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (11, 3, 1, '2025-05-03 00:00:00');  -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (11, 1, 1, '2025-05-03 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (11, 5, 1, '2025-05-03 00:00:00');  -- SUPPORT

-- Usuario 12
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (12, 21, 1, '2025-05-03 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (12, 32, 1, '2025-05-03 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (12, 10, 1, '2025-05-03 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (12, 2, 1, '2025-05-03 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (12, 8, 1, '2025-05-03 00:00:00');  -- SUPPORT

-- Usuario 13
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (13, 22, 1, '2025-05-03 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (13, 41, 1, '2025-05-03 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (13, 11, 1, '2025-05-03 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (13, 6, 1, '2025-05-03 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (13, 28, 1, '2025-05-03 00:00:00'); -- SUPPORT

-- Usuario 14
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (14, 24, 1, '2025-05-03 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (14, 37, 1, '2025-05-03 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (14, 12, 1, '2025-05-03 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (14, 9, 1, '2025-05-03 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (14, 33, 1, '2025-05-03 00:00:00'); -- SUPPORT

-- Usuario 15
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (15, 26, 1, '2025-05-03 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (15, 42, 1, '2025-05-03 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (15, 14, 1, '2025-05-03 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (15, 23, 1, '2025-05-03 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (15, 34, 1, '2025-05-03 00:00:00'); -- SUPPORT

-- Usuario 16
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (16, 27, 1, '2025-05-03 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (16, 25, 1, '2025-05-03 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (16, 18, 1, '2025-05-03 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (16, 38, 1, '2025-05-03 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (16, 43, 1, '2025-05-03 00:00:00'); -- SUPPORT

-- Usuario 17
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (17, 30, 1, '2025-05-03 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (17, 36, 1, '2025-05-03 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (17, 29, 1, '2025-05-03 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (17, 46, 1, '2025-05-03 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (17, 45, 1, '2025-05-03 00:00:00'); -- SUPPORT

-- Usuario 18
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (18, 35, 1, '2025-05-03 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (18, 32, 1, '2025-05-03 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (18, 31, 1, '2025-05-03 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (18, 38, 1, '2025-05-03 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (18, 34, 1, '2025-05-03 00:00:00'); -- SUPPORT

-- Usuario 19
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (19, 39, 1, '2025-05-03 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (19, 49, 1, '2025-05-03 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (19, 12, 1, '2025-05-03 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (19, 23, 1, '2025-05-03 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (19, 33, 1, '2025-05-03 00:00:00'); -- SUPPORT

-- Usuario 20
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (20, 44, 1, '2025-05-03 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (20, 42, 1, '2025-05-03 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (20, 29, 1, '2025-05-03 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (20, 1, 1, '2025-05-03 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (20, 43, 1, '2025-05-03 00:00:00'); -- SUPPORT

-- Usuario 21
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (21, 21, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (21, 4, 1, '2025-05-04 00:00:00');  -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (21, 31, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (21, 2, 1, '2025-05-04 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (21, 45, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 22
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (22, 22, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (22, 7, 1, '2025-05-04 00:00:00');  -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (22, 14, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (22, 6, 1, '2025-05-04 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (22, 8, 1, '2025-05-04 00:00:00');  -- SUPPORT

-- Usuario 23
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (23, 24, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (23, 25, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (23, 18, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (23, 9, 1, '2025-05-04 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (23, 33, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 24
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (24, 26, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (24, 32, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (24, 29, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (24, 23, 1, '2025-05-04 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (24, 34, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 25
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (25, 27, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (25, 36, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (25, 12, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (25, 1, 1, '2025-05-04 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (25, 5, 1, '2025-05-04 00:00:00');  -- SUPPORT

-- Usuario 26
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (26, 30, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (26, 37, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (26, 19, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (26, 20, 1, '2025-05-04 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (26, 43, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 27
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (27, 35, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (27, 41, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (27, 31, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (27, 38, 1, '2025-05-04 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (27, 43, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 28
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (28, 39, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (28, 49, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (28, 12, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (28, 1, 1, '2025-05-04 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (28, 28, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 29
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (29, 40, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (29, 42, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (29, 19, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (29, 23, 1, '2025-05-04 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (29, 43, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 30
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (30, 44, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (30, 36, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (30, 29, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (30, 6, 1, '2025-05-04 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (30, 43, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 31
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (31, 48, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (31, 4, 1, '2025-05-04 00:00:00');  -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (31, 3, 1, '2025-05-04 00:00:00');  -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (31, 1, 1, '2025-05-04 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (31, 5, 1, '2025-05-04 00:00:00');  -- SUPPORT

-- Usuario 32
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (32, 16, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (32, 7, 1, '2025-05-04 00:00:00');  -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (32, 10, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (32, 6, 1, '2025-05-04 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (32, 8, 1, '2025-05-04 00:00:00');  -- SUPPORT

-- Usuario 33
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (33, 27, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (33, 13, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (33, 18, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (33, 9, 1, '2025-05-04 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (33, 34, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 34
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (34, 39, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (34, 15, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (34, 12, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (34, 20, 1, '2025-05-04 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (34, 45, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 35
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (35, 47, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (35, 41, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (35, 29, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (35, 23, 1, '2025-05-04 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (35, 28, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 36
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (36, 44, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (36, 25, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (36, 19, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (36, 38, 1, '2025-05-04 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (36, 34, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 37
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (37, 47, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (37, 42, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (37, 29, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (37, 46, 1, '2025-05-04 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (37, 33, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 38
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (38, 48, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (38, 36, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (38, 14, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (38, 20, 1, '2025-05-04 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (38, 28, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 39
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (39, 35, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (39, 25, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (39, 18, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (39, 2, 1, '2025-05-04 00:00:00');  -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (39, 43, 1, '2025-05-04 00:00:00'); -- SUPPORT

-- Usuario 40
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (40, 26, 1, '2025-05-04 00:00:00'); -- TOP
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (40, 49, 1, '2025-05-04 00:00:00'); -- JG
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (40, 29, 1, '2025-05-04 00:00:00'); -- MID
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (40, 38, 1, '2025-05-04 00:00:00'); -- ADC
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (40, 5, 1, '2025-05-04 00:00:00');  -- SUPPORT

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (41, 21, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (41, 7, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (41, 10, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (41, 2, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (41, 8, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (42, 22, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (42, 13, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (42, 11, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (42, 6, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (42, 28, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (43, 24, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (43, 15, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (43, 12, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (43, 9, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (43, 33, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (44, 26, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (44, 17, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (44, 14, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (44, 20, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (44, 34, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (45, 27, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (45, 25, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (45, 18, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (45, 23, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (45, 43, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (46, 30, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (46, 32, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (46, 19, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (46, 38, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (46, 45, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (47, 35, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (47, 36, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (47, 29, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (47, 46, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (47, 5, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (48, 39, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (48, 37, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (48, 31, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (48, 1, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (48, 8, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (49, 40, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (49, 41, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (49, 3, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (49, 2, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (49, 28, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (50, 44, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (50, 42, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (50, 10, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (50, 6, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (50, 33, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (51, 47, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (51, 49, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (51, 11, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (51, 9, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (51, 34, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (52, 48, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (52, 4, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (52, 12, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (52, 20, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (52, 43, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (53, 16, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (53, 7, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (53, 14, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (53, 23, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (53, 45, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (54, 21, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (54, 13, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (54, 18, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (54, 38, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (54, 5, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (55, 22, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (55, 15, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (55, 19, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (55, 46, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (55, 8, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (56, 24, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (56, 17, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (56, 29, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (56, 1, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (56, 28, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (57, 26, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (57, 25, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (57, 31, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (57, 2, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (57, 33, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (58, 27, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (58, 32, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (58, 3, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (58, 6, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (58, 34, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (59, 30, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (59, 36, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (59, 10, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (59, 9, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (59, 43, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (60, 35, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (60, 37, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (60, 11, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (60, 20, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (60, 45, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (61, 39, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (61, 41, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (61, 12, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (61, 23, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (61, 5, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (62, 40, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (62, 42, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (62, 14, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (62, 38, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (62, 8, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (63, 44, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (63, 49, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (63, 18, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (63, 46, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (63, 28, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (64, 47, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (64, 4, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (64, 19, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (64, 1, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (64, 33, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (65, 48, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (65, 7, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (65, 29, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (65, 2, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (65, 34, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (66, 16, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (66, 13, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (66, 31, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (66, 6, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (66, 43, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (67, 21, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (67, 15, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (67, 3, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (67, 9, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (67, 45, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (68, 22, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (68, 17, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (68, 10, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (68, 20, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (68, 5, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (69, 24, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (69, 25, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (69, 11, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (69, 23, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (69, 8, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (70, 26, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (70, 32, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (70, 12, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (70, 38, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (70, 28, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (71, 27, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (71, 36, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (71, 14, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (71, 46, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (71, 33, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (72, 30, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (72, 37, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (72, 18, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (72, 1, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (72, 34, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (73, 35, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (73, 41, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (73, 19, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (73, 2, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (73, 43, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (74, 39, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (74, 42, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (74, 29, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (74, 6, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (74, 45, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (75, 40, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (75, 49, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (75, 31, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (75, 9, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (75, 5, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (76, 44, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (76, 4, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (76, 3, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (76, 20, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (76, 8, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (77, 47, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (77, 7, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (77, 10, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (77, 23, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (77, 28, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (78, 48, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (78, 13, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (78, 11, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (78, 38, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (78, 33, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (79, 16, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (79, 15, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (79, 12, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (79, 46, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (79, 34, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (80, 21, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (80, 17, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (80, 14, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (80, 1, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (80, 43, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (81, 22, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (81, 25, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (81, 18, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (81, 2, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (81, 45, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (82, 24, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (82, 32, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (82, 19, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (82, 6, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (82, 5, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (83, 26, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (83, 36, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (83, 29, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (83, 9, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (83, 8, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (84, 27, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (84, 37, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (84, 31, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (84, 20, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (84, 28, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (85, 30, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (85, 41, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (85, 3, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (85, 23, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (85, 33, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (86, 35, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (86, 42, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (86, 10, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (86, 38, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (86, 34, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (87, 39, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (87, 49, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (87, 11, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (87, 46, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (87, 43, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (88, 40, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (88, 4, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (88, 12, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (88, 1, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (88, 45, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (89, 44, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (89, 7, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (89, 14, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (89, 2, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (89, 5, 1, '2025-05-04 00:00:00');

INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (90, 47, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (90, 13, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (90, 18, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (90, 6, 1, '2025-05-04 00:00:00');
INSERT INTO users_x_champions (user_id, champion_id, mastery_level, adquisition_date) VALUES (90, 8, 1, '2025-05-04 00:00:00');


--USER X SKINS

INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (1, 1, '2025-05-01 00:00:00');
INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (1, 3, '2025-05-01 00:00:00');

INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (2, 5, '2025-05-01 00:00:00');
INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (2, 7, '2025-05-01 00:00:00');

INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (3, 9, '2025-05-01 00:00:00');
INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (3, 11, '2025-05-01 00:00:00');

INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (4, 13, '2025-05-01 00:00:00');
INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (4, 15, '2025-05-01 00:00:00');

INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (5, 17, '2025-05-01 00:00:00');
INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (5, 19, '2025-05-01 00:00:00');

INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (6, 21, '2025-05-01 00:00:00');
INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (6, 23, '2025-05-01 00:00:00');

INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (7, 25, '2025-05-01 00:00:00');
INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (7, 27, '2025-05-01 00:00:00');

INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (8, 29, '2025-05-01 00:00:00');
INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (8, 31, '2025-05-01 00:00:00');

INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (9, 33, '2025-05-01 00:00:00');
INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (9, 35, '2025-05-01 00:00:00');

INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (10, 37, '2025-05-01 00:00:00');
INSERT INTO users_x_skins (user_id, skin_id, adquisition_date) VALUES (10, 39, '2025-05-01 00:00:00');

-- USERS X ICONS

INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (1, 1, '2025-05-01 00:00:00');
INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (1, 2, '2025-05-01 00:00:00');

INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (2, 3, '2025-05-01 00:00:00');
INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (2, 4, '2025-05-01 00:00:00');

INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (3, 5, '2025-05-01 00:00:00');
INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (3, 6, '2025-05-01 00:00:00');

INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (4, 7, '2025-05-01 00:00:00');
INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (4, 8, '2025-05-01 00:00:00');

INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (5, 9, '2025-05-01 00:00:00');
INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (5, 10, '2025-05-01 00:00:00');

INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (6, 11, '2025-05-01 00:00:00');
INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (6, 12, '2025-05-01 00:00:00');

INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (7, 13, '2025-05-01 00:00:00');
INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (7, 14, '2025-05-01 00:00:00');

INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (8, 15, '2025-05-01 00:00:00');
INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (8, 16, '2025-05-01 00:00:00');

INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (9, 17, '2025-05-01 00:00:00');
INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (9, 18, '2025-05-01 00:00:00');

INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (10, 19, '2025-05-01 00:00:00');
INSERT INTO users_x_icons (user_id, icon_id, adquisition_date) VALUES (10, 20, '2025-05-01 00:00:00');


-- USER LOOTS
INSERT INTO user_loots (user_id, chests, master_chests, keys, key_fragments, orange_essence) VALUES (1, 2, 1, 1, 2, 1500);
INSERT INTO user_loots (user_id, chests, master_chests, keys, key_fragments, orange_essence) VALUES (2, 3, 0, 2, 1, 2000);
INSERT INTO user_loots (user_id, chests, master_chests, keys, key_fragments, orange_essence) VALUES (3, 1, 2, 0, 3, 1000);
INSERT INTO user_loots (user_id, chests, master_chests, keys, key_fragments, orange_essence) VALUES (4, 0, 1, 1, 1, 500);
INSERT INTO user_loots (user_id, chests, master_chests, keys, key_fragments, orange_essence) VALUES (5, 5, 0, 3, 0, 3000);
INSERT INTO user_loots (user_id, chests, master_chests, keys, key_fragments, orange_essence) VALUES (6, 2, 1, 2, 2, 1800);
INSERT INTO user_loots (user_id, chests, master_chests, keys, key_fragments, orange_essence) VALUES (7, 1, 1, 1, 1, 120);
INSERT INTO user_loots (user_id, chests, master_chests, keys, key_fragments, orange_essence) VALUES (8, 4, 0, 2, 1, 250);
INSERT INTO user_loots (user_id, chests, master_chests, keys, key_fragments, orange_essence) VALUES (9, 3, 2, 1, 3, 2200);
INSERT INTO user_loots (user_id, chests, master_chests, keys, key_fragments, orange_essence) VALUES (10, 0, 0, 0, 0, 0);

--LOOT CHAMPIONS

INSERT INTO loot_inventory_champions (loot_id, is_active, acquisition_date, removal_date, champion_id)
VALUES (1, true, '2025-05-01 10:00:00', null, 5);

INSERT INTO loot_inventory_champions (loot_id, is_active, acquisition_date, removal_date, champion_id)
VALUES (2, true, '2025-05-01 10:05:00', null, 12);

INSERT INTO loot_inventory_champions (loot_id, is_active, acquisition_date, removal_date, champion_id)
VALUES (3, true, '2025-05-01 10:10:00', null, 20);

INSERT INTO loot_inventory_champions (loot_id, is_active, acquisition_date, removal_date, champion_id)
VALUES (4, true, '2025-05-01 10:15:00', null, 7);

INSERT INTO loot_inventory_champions (loot_id, is_active, acquisition_date, removal_date, champion_id)
VALUES (5, true, '2025-05-01 10:20:00', null, 33);

INSERT INTO loot_inventory_champions (loot_id, is_active, acquisition_date, removal_date, champion_id)
VALUES (6, true, '2025-05-01 10:25:00', null, 18);

--LOOT SKINS

INSERT INTO loot_inventory_skins (loot_id, is_active, acquisition_date, removal_date, skin_id)
VALUES (1, true, '2025-05-01 11:00:00', null, 4);

INSERT INTO loot_inventory_skins (loot_id, is_active, acquisition_date, removal_date, skin_id)
VALUES (2, true, '2025-05-01 11:05:00', null, 17);

INSERT INTO loot_inventory_skins (loot_id, is_active, acquisition_date, removal_date, skin_id)
VALUES (3, true, '2025-05-01 11:10:00', null, 29);

INSERT INTO loot_inventory_skins (loot_id, is_active, acquisition_date, removal_date, skin_id)
VALUES (5, true, '2025-05-01 11:15:00', null, 7);

INSERT INTO loot_inventory_skins (loot_id, is_active, acquisition_date, removal_date, skin_id)
VALUES (6, true, '2025-05-01 11:20:00', null, 45);

INSERT INTO loot_inventory_skins (loot_id, is_active, acquisition_date, removal_date, skin_id)
VALUES (7, true, '2025-05-01 11:25:00', null, 10);

INSERT INTO loot_inventory_skins (loot_id, is_active, acquisition_date, removal_date, skin_id)
VALUES (8, true, '2025-05-01 11:30:00', null, 36);

INSERT INTO loot_inventory_skins (loot_id, is_active, acquisition_date, removal_date, skin_id)
VALUES (9, true, '2025-05-01 11:35:00', null, 22);

-- LOOT ICONS
INSERT INTO loot_inventory_icons (loot_id, is_active, acquisition_date, removal_date, icon_id) VALUES (1, true, '2025-05-01 12:00:00', null, 10);
INSERT INTO loot_inventory_icons (loot_id, is_active, acquisition_date, removal_date, icon_id) VALUES (2, true, '2025-05-01 12:00:00', null, 3);
INSERT INTO loot_inventory_icons (loot_id, is_active, acquisition_date, removal_date, icon_id) VALUES (3, true, '2025-05-01 12:00:00', null, 7);
INSERT INTO loot_inventory_icons (loot_id, is_active, acquisition_date, removal_date, icon_id) VALUES (4, true, '2025-05-01 12:00:00', null, 22);
INSERT INTO loot_inventory_icons (loot_id, is_active, acquisition_date, removal_date, icon_id) VALUES (5, true, '2025-05-01 12:00:00', null, 15);
INSERT INTO loot_inventory_icons (loot_id, is_active, acquisition_date, removal_date, icon_id) VALUES (6, true, '2025-05-01 12:00:00', null, 40);
INSERT INTO loot_inventory_icons (loot_id, is_active, acquisition_date, removal_date, icon_id) VALUES (7, true, '2025-05-01 12:00:00', null, 1);
INSERT INTO loot_inventory_icons (loot_id, is_active, acquisition_date, removal_date, icon_id) VALUES (8, true, '2025-05-01 12:00:00', null, 18);
INSERT INTO loot_inventory_icons (loot_id, is_active, acquisition_date, removal_date, icon_id) VALUES (9, true, '2025-05-01 12:00:00', null, 25);
INSERT INTO loot_inventory_icons (loot_id, is_active, acquisition_date, removal_date, icon_id) VALUES (10, true, '2025-05-01 12:00:00', null, 33);






























































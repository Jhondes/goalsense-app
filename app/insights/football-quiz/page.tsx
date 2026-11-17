"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Home,
  Sparkles,
  Target,
} from "lucide-react";

const questionBank = [
  {
    id: "rules-001",
    category: "FOOTBALL RULES",
    difficulty: "Beginner",
    question: "How many players from one team are normally on the pitch at the start of a football match?",
    options: ["9", "10", "11", "12"],
    answer: 2,
    explanation:
      "A standard football team starts a match with 11 players, including the goalkeeper.",
  },
  {
    id: "rules-002",
    category: "FOOTBALL RULES",
    difficulty: "Beginner",
    question: "How long is a standard football match, excluding added time?",
    options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"],
    answer: 1,
    explanation:
      "A standard match has two 45-minute halves, making 90 minutes in total.",
  },
  {
    id: "history-001",
    category: "FOOTBALL HISTORY",
    difficulty: "Intermediate",
    question: "Which country hosted and won the first FIFA World Cup in 1930?",
    options: ["Brazil", "Italy", "Argentina", "Uruguay"],
    answer: 3,
    explanation:
      "Uruguay hosted the inaugural FIFA World Cup in 1930 and defeated Argentina in the final.",
  },
  {
    id: "rules-003",
    category: "FOOTBALL RULES",
    difficulty: "Intermediate",
    question: "How many points does a team receive for winning a league match under the standard points system?",
    options: ["1 point", "2 points", "3 points", "4 points"],
    answer: 2,
    explanation:
      "The standard league points system awards three points for a win, one for a draw and zero for a defeat.",
  },
  {
    id: "stats-001",
    category: "FOOTBALL STATISTICS",
    difficulty: "Intermediate",
    question: "What does xG stand for in football statistics?",
    options: [
      "Expected Goals",
      "Extra Goals",
      "External Goals",
      "Exact Goals",
    ],
    answer: 0,
    explanation:
      "Expected Goals (xG) estimates the likelihood that a particular shot will result in a goal.",
  },
  {
    id: "competition-001",
    category: "FOOTBALL COMPETITIONS",
    difficulty: "Beginner",
    question: "How often is the FIFA Men's World Cup normally held?",
    options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
    answer: 2,
    explanation:
      "The FIFA Men's World Cup is normally held every four years.",
  },
  {
    id: "tactics-001",
    category: "FOOTBALL TACTICS",
    difficulty: "Intermediate",
    question: "In a 4-3-3 formation, how many defenders are normally included?",
    options: ["3", "4", "5", "6"],
    answer: 1,
    explanation:
      "The first number in 4-3-3 represents four defenders, followed by three midfielders and three forwards.",
  },
  {
    id: "rules-004",
    category: "FOOTBALL RULES",
    difficulty: "Expert",
    question: "Which official is primarily responsible for deciding whether a player is offside?",
    options: [
      "The fourth official",
      "The assistant referee",
      "The team captain",
      "The match commissioner",
    ],
    answer: 1,
    explanation:
      "Assistant referees monitor offside positions and signal potential offences to the referee.",
  },
  {
    id: "history-002",
    category: "FOOTBALL HISTORY",
    difficulty: "Intermediate",
    question: "Which country won the 2022 FIFA Men's World Cup?",
    options: ["France", "Croatia", "Argentina", "Brazil"],
    answer: 2,
    explanation:
      "Argentina won the 2022 World Cup after defeating France in the final on penalties.",
  },
  {
    id: "stats-002",
    category: "FOOTBALL STATISTICS",
    difficulty: "Expert",
    question: "What does a clean sheet mean for a football team?",
    options: [
      "Scoring in both halves",
      "Not conceding a goal",
      "Winning without substitutions",
      "Having more possession",
    ],
    answer: 1,
    explanation:
      "A clean sheet means a team finishes the match without conceding a goal.",
  },
  {
    id: "competition-002",
    category: "FOOTBALL COMPETITIONS",
    difficulty: "Beginner",
    question: "Which trophy is awarded to the winner of the UEFA Champions League?",
    options: [
      "The FA Cup",
      "The European Champion Clubs' Cup",
      "The Copa América",
      "The Community Shield",
    ],
    answer: 1,
    explanation:
      "The UEFA Champions League winner receives the European Champion Clubs' Cup, commonly called the Champions League trophy.",
  },
  {
    id: "tactics-002",
    category: "FOOTBALL TACTICS",
    difficulty: "Expert",
    question: "What is a counterattack in football?",
    options: [
      "A defensive substitution",
      "A quick attacking move after regaining possession",
      "A long period of possession",
      "A short corner routine",
    ],
    answer: 1,
    explanation:
      "A counterattack is a quick attacking move launched after a team wins the ball, often while the opposition is out of defensive position.",
  },
  {
    id: "rules-005",
    category: "FOOTBALL RULES",
    difficulty: "Intermediate",
    question: "What is the maximum number of substitutions normally permitted in a standard match under current IFAB competition rules?",
    options: ["3", "4", "5", "7"],
    answer: 2,
    explanation:
      "Current IFAB rules allow competitions to permit up to five substitutions. Competition regulations determine the actual allowance.",
  },
  {
    id: "history-003",
    category: "FOOTBALL HISTORY",
    difficulty: "Beginner",
    question: "Which country is credited with developing modern association football?",
    options: ["Brazil", "England", "Germany", "Spain"],
    answer: 1,
    explanation:
      "Modern association football was codified in England during the nineteenth century.",
  },
  {
    id: "stats-003",
    category: "FOOTBALL STATISTICS",
    difficulty: "Expert",
    question: "If a team has 60% possession, what does that measurement describe?",
    options: [
      "Its share of recorded ball possession",
      "Its percentage of shots on target",
      "Its percentage of successful tackles",
      "Its share of total goals",
    ],
    answer: 0,
    explanation:
      "Possession percentage represents the share of the match during which a team controls the ball, according to the data provider's measurement method.",
  },

  {
    id: "premier-001",
    category: "PREMIER LEAGUE",
    difficulty: "Beginner",
    question: "Which club won the first Premier League title in the 1992/93 season?",
    options: ["Liverpool", "Arsenal", "Manchester United", "Blackburn Rovers"],
    answer: 2,
    explanation: "Manchester United became the inaugural Premier League champions in 1992/93."
  },
  {
    id: "premier-002",
    category: "PREMIER LEAGUE",
    difficulty: "Intermediate",
    question: "Who scored the first-ever Premier League goal?",
    options: ["Alan Shearer", "Brian Deane", "Eric Cantona", "Teddy Sheringham"],
    answer: 1,
    explanation: "Brian Deane scored the first Premier League goal for Sheffield United against Manchester United on 15 August 1992."
  },
  {
    id: "premier-003",
    category: "PREMIER LEAGUE",
    difficulty: "Beginner",
    question: "Which club famously won the 2015/16 Premier League title?",
    options: ["Tottenham Hotspur", "Chelsea", "Leicester City", "Manchester City"],
    answer: 2,
    explanation: "Leicester City completed one of football's most remarkable title-winning campaigns in 2015/16."
  },
  {
    id: "premier-004",
    category: "PREMIER LEAGUE",
    difficulty: "Expert",
    question: "How many Premier League goals has the competition's all-time leading scorer Alan Shearer scored?",
    options: ["187", "228", "260", "281"],
    answer: 2,
    explanation: "Alan Shearer holds the Premier League all-time scoring record with 260 goals."
  },
  {
    id: "ucl-001",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Beginner",
    question: "Who won the first European Cup in 1955/56?",
    options: ["AC Milan", "Real Madrid", "Benfica", "Liverpool"],
    answer: 1,
    explanation: "Real Madrid defeated Stade de Reims 4-3 in the inaugural European Cup final."
  },
  {
    id: "ucl-002",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Intermediate",
    question: "Which club did Real Madrid defeat in the first European Cup final?",
    options: ["Barcelona", "AC Milan", "Stade de Reims", "Eintracht Frankfurt"],
    answer: 2,
    explanation: "Real Madrid defeated French club Stade de Reims 4-3 in Paris in June 1956."
  },
  {
    id: "ucl-003",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Expert",
    question: "How many consecutive European Cup titles did Real Madrid win between 1956 and 1960?",
    options: ["3", "4", "5", "6"],
    answer: 2,
    explanation: "Real Madrid won the first five editions of the European Cup, from 1956 through 1960."
  },
  {
    id: "ucl-004",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Intermediate",
    question: "In which season was the European Cup relaunched as the UEFA Champions League?",
    options: ["1989/90", "1990/91", "1992/93", "1995/96"],
    answer: 2,
    explanation: "The competition was relaunched under the UEFA Champions League name in the 1992/93 season."
  },
  {
    id: "worldcup-001",
    category: "WORLD CUP",
    difficulty: "Beginner",
    question: "Which legendary Brazilian player is the only man to have won three FIFA World Cup titles?",
    options: ["Ronaldo Nazário", "Ronaldinho", "Pelé", "Zico"],
    answer: 2,
    explanation: "Pelé won World Cup titles with Brazil in 1958, 1962 and 1970."
  },
  
{
  id: "worldcup-002",
  category: "WORLD CUP",
  difficulty: "Expert",
  question: "Who held the record for the most FIFA Men's World Cup goals before the 2026 tournament?",
  options: ["Ronaldo Nazário", "Miroslav Klose", "Gerd Müller", "Lionel Messi"],
  answer: 1,
  explanation: "Miroslav Klose held the record with 16 goals before the 2026 tournament, when Kylian Mbappé surpassed it."
},

  {
    id: "worldcup-003",
    category: "WORLD CUP",
    difficulty: "Intermediate",
    question: "In which year did Brazil win its first FIFA Men's World Cup?",
    options: ["1950", "1954", "1958", "1962"],
    answer: 2,
    explanation: "Brazil won its first World Cup in Sweden in 1958, defeating the hosts in the final."
  },
  {
    id: "worldcup-004",
    category: "WORLD CUP",
    difficulty: "Expert",
    question: "Which country became the first to win two consecutive FIFA Men's World Cup titles?",
    options: ["Brazil", "Germany", "Argentina", "Italy"],
    answer: 3,
    explanation: "Italy won consecutive World Cups in 1934 and 1938, becoming the first nation to retain the trophy."
  },
  {
    id: "afcon-001",
    category: "AFRICAN FOOTBALL",
    difficulty: "Beginner",
    question: "Which country has won the most Africa Cup of Nations titles?",
    options: ["Nigeria", "Cameroon", "Ghana", "Egypt"],
    answer: 3,
    explanation: "Egypt holds the AFCON record with seven titles."
  },
  {
    id: "afcon-002",
    category: "AFRICAN FOOTBALL",
    difficulty: "Intermediate",
    question: "In which year was the first Africa Cup of Nations tournament held?",
    options: ["1954", "1957", "1960", "1963"],
    answer: 1,
    explanation: "The inaugural AFCON tournament took place in 1957, with Egypt, Sudan and Ethiopia participating."
  },
  {
    id: "afcon-003",
    category: "AFRICAN FOOTBALL",
    difficulty: "Intermediate",
    question: "How many Africa Cup of Nations titles has Ghana won?",
    options: ["2", "3", "4", "5"],
    answer: 2,
    explanation: "Ghana has won four AFCON titles, with its most recent triumph coming in 1982."
  },
  {
    id: "afcon-004",
    category: "AFRICAN FOOTBALL",
    difficulty: "Expert",
    question: "How many Africa Cup of Nations titles has Nigeria won?",
    options: ["2", "3", "4", "5"],
    answer: 1,
    explanation: "Nigeria has won three AFCON titles: 1980, 1994 and 2013."
  },
  {
    id: "records-001",
    category: "FOOTBALL RECORDS",
    difficulty: "Intermediate",
    question: "Which manager has won the most Premier League titles?",
    options: ["José Mourinho", "Pep Guardiola", "Arsène Wenger", "Sir Alex Ferguson"],
    answer: 3,
    explanation: "Sir Alex Ferguson won 13 Premier League titles with Manchester United."
  },
  {
    id: "records-002",
    category: "FOOTBALL RECORDS",
    difficulty: "Expert",
    question: "Which club holds the record for the longest unbeaten run in Premier League history?",
    options: ["Liverpool", "Chelsea", "Arsenal", "Manchester United"],
    answer: 2,
    explanation: "Arsenal recorded a 49-match unbeaten Premier League run between May 2003 and October 2004."
  },
  {
    id: "records-003",
    category: "FOOTBALL RECORDS",
    difficulty: "Intermediate",
    question: "Which club became the first to win four consecutive Premier League titles?",
    options: ["Manchester United", "Chelsea", "Manchester City", "Arsenal"],
    answer: 2,
    explanation: "Manchester City won four consecutive Premier League titles from 2020/21 through 2023/24."
  },
  {
    id: "records-004",
    category: "FOOTBALL RECORDS",
    difficulty: "Intermediate",
    question: "Which club did Alan Shearer join after leaving Blackburn Rovers in 1996?",
    options: ["Liverpool", "Newcastle United", "Manchester United", "Chelsea"],
    answer: 1,
    explanation: "Alan Shearer joined his hometown club Newcastle United from Blackburn Rovers in 1996."
  },
  
  {
    id: "players-001",
    category: "FOOTBALL PLAYERS",
    difficulty: "Intermediate",
    question: "Who was the first African player to win the Ballon d'Or?",
    options: ["Samuel Eto'o", "George Weah", "Didier Drogba", "Abedi Pele"],
    answer: 1,
    explanation: "George Weah of Liberia won the Ballon d'Or in 1995."
  },
  {
    id: "players-002",
    category: "FOOTBALL PLAYERS",
    difficulty: "Intermediate",
    question: "Which player scored the famous 'Hand of God' goal?",
    options: ["Pelé", "Diego Maradona", "Johan Cruyff", "Zinedine Zidane"],
    answer: 1,
    explanation: "Diego Maradona scored the famous goal against England at the 1986 World Cup."
  },
  {
    id: "players-003",
    category: "FOOTBALL PLAYERS",
    difficulty: "Expert",
    question: "How many goals did Zinedine Zidane score in the 1998 World Cup final?",
    options: ["One", "Two", "Three", "Four"],
    answer: 1,
    explanation: "Zidane scored twice with headers as France defeated Brazil 3–0."
  },
  {
    id: "players-004",
    category: "FOOTBALL PLAYERS",
    difficulty: "Beginner",
    question: "Which Brazilian striker was famously known as R9?",
    options: ["Ronaldinho", "Rivaldo", "Ronaldo Nazário", "Romário"],
    answer: 2,
    explanation: "Ronaldo Nazário was widely known as R9, distinguishing him from other Brazilian stars."
  },
  {
    id: "international-001",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Intermediate",
    question: "Which country won UEFA Euro 2004?",
    options: ["Portugal", "Greece", "Italy", "Czech Republic"],
    answer: 1,
    explanation: "Greece stunned the football world by defeating Portugal in the Euro 2004 final."
  },
  {
    id: "international-002",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Beginner",
    question: "Which country won the 2010 FIFA World Cup?",
    options: ["Germany", "Brazil", "Spain", "Netherlands"],
    answer: 2,
    explanation: "Spain won its first men's FIFA World Cup in 2010, defeating the Netherlands in the final."
  },
  {
    id: "international-003",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Intermediate",
    question: "Which country defeated Argentina in the 2014 World Cup final?",
    options: ["Brazil", "Germany", "France", "Italy"],
    answer: 1,
    explanation: "Germany defeated Argentina 1–0 after extra time in the 2014 final."
  },
  {
    id: "international-004",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Beginner",
    question: "Which country won the 2018 FIFA World Cup?",
    options: ["Croatia", "Belgium", "France", "England"],
    answer: 2,
    explanation: "France defeated Croatia 4–2 in the 2018 World Cup final."
  },
  {
    id: "international-005",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Expert",
    question: "Who scored 13 goals at the 1958 FIFA World Cup, a record for one tournament?",
    options: ["Pelé", "Just Fontaine", "Gerd Müller", "Sándor Kocsis"],
    answer: 1,
    explanation: "France's Just Fontaine scored 13 goals at the 1958 World Cup, a single-tournament record."
  },
  {
    id: "international-006",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Expert",
    question: "As of the end of the 2026 men's World Cup, who holds the all-time World Cup goalscoring record?",
    options: ["Miroslav Klose", "Lionel Messi", "Kylian Mbappé", "Ronaldo Nazário"],
    answer: 2,
    explanation: "FIFA's 2026 tournament review identifies Kylian Mbappé as the men's World Cup all-time leading scorer."
  },
  {
    id: "african-001",
    category: "AFRICAN FOOTBALL",
    difficulty: "Beginner",
    question: "Roger Milla represented which country?",
    options: ["Nigeria", "Ghana", "Cameroon", "Senegal"],
    answer: 2,
    explanation: "Roger Milla is a legendary Cameroon international, famous for his performances at the 1990 World Cup."
  },
  {
    id: "african-002",
    category: "AFRICAN FOOTBALL",
    difficulty: "Beginner",
    question: "Didier Drogba represented which national team?",
    options: ["Ghana", "Ivory Coast", "Cameroon", "Mali"],
    answer: 1,
    explanation: "Didier Drogba was the captain and one of the greatest players in Ivory Coast's football history."
  },
  {
    id: "african-003",
    category: "AFRICAN FOOTBALL",
    difficulty: "Intermediate",
    question: "Which Nigerian football legend was famous for his exceptional dribbling and ball control?",
    options: ["Sunday Oliseh", "Jay-Jay Okocha", "Nwankwo Kanu", "Rashidi Yekini"],
    answer: 1,
    explanation: "Jay-Jay Okocha became famous for his creativity, close control and entertaining style."
  },
  {
    id: "african-004",
    category: "AFRICAN FOOTBALL",
    difficulty: "Intermediate",
    question: "Abedi Pele is a legendary footballer from which country?",
    options: ["Ghana", "Nigeria", "Senegal", "Egypt"],
    answer: 0,
    explanation: "Abedi Pele is one of Ghana's most celebrated footballers and a former African Footballer of the Year."
  },
  {
    id: "tactics-003",
    category: "FOOTBALL TACTICS",
    difficulty: "Intermediate",
    question: "What is a false nine in football?",
    options: [
      "A defender who plays as a striker",
      "A forward who drops into midfield",
      "A goalkeeper who takes penalties",
      "A winger who stays near the touchline"
    ],
    answer: 1,
    explanation: "A false nine is a forward who drops deeper into midfield, often creating space and confusion for defenders."
  },
  {
    id: "tactics-004",
    category: "FOOTBALL TACTICS",
    difficulty: "Intermediate",
    question: "What does a low block mean in football?",
    options: [
      "Playing with a high defensive line",
      "Defending deep with a compact team shape",
      "Using only three defenders",
      "Pressing the goalkeeper constantly"
    ],
    answer: 1,
    explanation: "A low block involves defending deeper in the team's own half while keeping players compact."
  },
  {
    id: "tactics-005",
    category: "FOOTBALL TACTICS",
    difficulty: "Expert",
    question: "What is gegenpressing?",
    options: [
      "Keeping possession in your own half",
      "Pressing immediately after losing possession",
      "Defending with five players",
      "Attacking only through the wings"
    ],
    answer: 1,
    explanation: "Gegenpressing is the tactic of immediately trying to win the ball back after losing it."
  },
  {
    id: "rules-006",
    category: "FOOTBALL RULES",
    difficulty: "Expert",
    question: "Can a player be penalised for offside directly from an opponent's throw-in?",
    options: ["Yes, always", "No", "Only inside the penalty area", "Only during extra time"],
    answer: 1,
    explanation: "Under IFAB Law 11, there is no offside offence when a player receives the ball directly from a throw-in."
  },
  {
    id: "rules-007",
    category: "FOOTBALL RULES",
    difficulty: "Beginner",
    question: "How far is the penalty spot from the goal line?",
    options: ["9 metres", "10 metres", "11 metres", "12 metres"],
    answer: 2,
    explanation: "The penalty spot is 11 metres (12 yards) from the midpoint between the goalposts."
  },
  {
    id: "stats-004",
    category: "FOOTBALL STATISTICS",
    difficulty: "Expert",
    question: "Who holds the Premier League record for the most career assists?",
    options: ["Kevin De Bruyne", "Cesc Fàbregas", "Ryan Giggs", "Wayne Rooney"],
    answer: 2,
    explanation: "Ryan Giggs holds the Premier League record with 162 assists."
  },
  {
    id: "stats-005",
    category: "FOOTBALL STATISTICS",
    difficulty: "Expert",
    question: "Who is the all-time leading goalscorer in the UEFA Champions League?",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Robert Lewandowski", "Karim Benzema"],
    answer: 1,
    explanation: "Cristiano Ronaldo holds the Champions League goalscoring record."
  },


  {
    id: "club-001",
    category: "CLUB HISTORY",
    difficulty: "Intermediate",
    question: "How many consecutive European Cup titles did Nottingham Forest win?",
    options: ["One", "Two", "Three", "Four"],
    answer: 1,
    explanation: "Nottingham Forest won back-to-back European Cups in 1979 and 1980 under Brian Clough."
  },
  {
    id: "club-002",
    category: "CLUB HISTORY",
    difficulty: "Intermediate",
    question: "Which club won three consecutive European Cups from 1971 to 1973?",
    options: ["Bayern Munich", "Ajax", "Liverpool", "AC Milan"],
    answer: 1,
    explanation: "Ajax dominated European football by winning the European Cup in 1971, 1972 and 1973."
  },
  {
    id: "club-003",
    category: "CLUB HISTORY",
    difficulty: "Expert",
    question: "Which club won three consecutive European Cups from 1974 to 1976?",
    options: ["Real Madrid", "Ajax", "Bayern Munich", "Juventus"],
    answer: 2,
    explanation: "Bayern Munich won three consecutive European Cups between 1974 and 1976."
  },
  {
    id: "club-004",
    category: "CLUB HISTORY",
    difficulty: "Intermediate",
    question: "Which club did Inter Milan defeat in the 2010 Champions League final?",
    options: ["Barcelona", "Manchester United", "Bayern Munich", "Chelsea"],
    answer: 2,
    explanation: "Inter defeated Bayern Munich 2–0 in the 2010 Champions League final, completing a historic treble."
  },
  {
    id: "managers-001",
    category: "FOOTBALL MANAGERS",
    difficulty: "Beginner",
    question: "Which manager guided Porto to Champions League glory in 2004?",
    options: ["Rafael Benítez", "José Mourinho", "Carlo Ancelotti", "Arsène Wenger"],
    answer: 1,
    explanation: "José Mourinho led Porto to the Champions League title in 2004."
  },
  {
    id: "managers-002",
    category: "FOOTBALL MANAGERS",
    difficulty: "Intermediate",
    question: "Who was Barcelona's manager when they won the Champions League in 2009?",
    options: ["Frank Rijkaard", "Luis Enrique", "Pep Guardiola", "Johan Cruyff"],
    answer: 2,
    explanation: "Pep Guardiola guided Barcelona to the Champions League title in his first season as the club's senior-team manager."
  },
  {
    id: "managers-003",
    category: "FOOTBALL MANAGERS",
    difficulty: "Expert",
    question: "Which manager led Liverpool to their famous Champions League comeback in Istanbul in 2005?",
    options: ["Gerard Houllier", "Rafael Benítez", "Kenny Dalglish", "Jürgen Klopp"],
    answer: 1,
    explanation: "Rafael Benítez was Liverpool's manager when they came back from 3–0 down to beat AC Milan on penalties in 2005."
  },
  {
    id: "african-005",
    category: "AFRICAN FOOTBALL",
    difficulty: "Beginner",
    question: "Which African country became the first to win Olympic men's football gold?",
    options: ["Cameroon", "Ghana", "Nigeria", "Senegal"],
    answer: 2,
    explanation: "Nigeria made history by winning Olympic men's football gold at Atlanta 1996."
  },
  {
    id: "african-006",
    category: "AFRICAN FOOTBALL",
    difficulty: "Intermediate",
    question: "Which African country became the first to reach the FIFA World Cup quarter-finals?",
    options: ["Nigeria", "Ghana", "Cameroon", "Senegal"],
    answer: 2,
    explanation: "Cameroon achieved this historic milestone at the 1990 World Cup in Italy."
  },
  {
    id: "african-007",
    category: "AFRICAN FOOTBALL",
    difficulty: "Expert",
    question: "Who is the oldest player to score a goal at a FIFA Men's World Cup?",
    options: ["Essam El Hadary", "Roger Milla", "Faryd Mondragón", "Gianluigi Buffon"],
    answer: 1,
    explanation: "Cameroon's Roger Milla scored against Russia at the 1994 World Cup aged 42 years and 39 days."
  },
  {
    id: "african-008",
    category: "AFRICAN FOOTBALL",
    difficulty: "Intermediate",
    question: "Which African country hosted the first FIFA Men's World Cup held on the continent?",
    options: ["Egypt", "Morocco", "South Africa", "Nigeria"],
    answer: 2,
    explanation: "South Africa hosted the 2010 FIFA Men's World Cup, the first edition held in Africa."
  },
  {
    id: "international-007",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Intermediate",
    question: "Which country surprisingly won UEFA Euro 1992?",
    options: ["Germany", "Denmark", "Netherlands", "Sweden"],
    answer: 1,
    explanation: "Denmark won Euro 1992 after being included in the tournament shortly before it began."
  },
  {
    id: "international-008",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Beginner",
    question: "Which country won the 1966 FIFA Men's World Cup?",
    options: ["West Germany", "Brazil", "England", "Argentina"],
    answer: 2,
    explanation: "England won its first and so far only men's World Cup in 1966, defeating West Germany in the final."
  },
  {
    id: "international-009",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Intermediate",
    question: "Which country defeated Brazil 7–1 in the 2014 World Cup semi-final?",
    options: ["Argentina", "Germany", "Netherlands", "Spain"],
    answer: 1,
    explanation: "Germany defeated host nation Brazil 7–1 in one of the most memorable World Cup semi-finals."
  },
  {
    id: "international-010",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Intermediate",
    question: "Who scored Spain's winning goal in the 2010 World Cup final?",
    options: ["David Villa", "Xavi", "Fernando Torres", "Andrés Iniesta"],
    answer: 3,
    explanation: "Andrés Iniesta scored the decisive goal in extra time as Spain defeated the Netherlands 1–0."
  },
  {
    id: "players-005",
    category: "FOOTBALL PLAYERS",
    difficulty: "Expert",
    question: "Who holds the record for the fastest hat-trick in Premier League history?",
    options: ["Robbie Fowler", "Sadio Mané", "Sergio Agüero", "Erling Haaland"],
    answer: 1,
    explanation: "Sadio Mané scored three goals in just 2 minutes and 56 seconds for Southampton against Aston Villa in 2015."
  },
  {
    id: "players-006",
    category: "FOOTBALL PLAYERS",
    difficulty: "Intermediate",
    question: "Which Brazilian player won the Golden Boot at the 2002 FIFA World Cup?",
    options: ["Rivaldo", "Ronaldinho", "Ronaldo Nazário", "Roberto Carlos"],
    answer: 2,
    explanation: "Ronaldo Nazário scored eight goals and finished as the top scorer at the 2002 World Cup."
  },
  {
    id: "rules-008",
    category: "FOOTBALL RULES",
    difficulty: "Intermediate",
    question: "Can a player be offside directly from an opponent's goal kick?",
    options: ["Yes", "No", "Only inside the penalty area", "Only in extra time"],
    answer: 1,
    explanation: "Under IFAB Law 11, a player cannot be penalised for offside when receiving the ball directly from a goal kick."
  },
  {
    id: "rules-009",
    category: "FOOTBALL RULES",
    difficulty: "Intermediate",
    question: "Can a player be offside directly from a corner kick?",
    options: ["Yes", "No", "Only if the goalkeeper leaves the goal", "Only during a penalty shootout"],
    answer: 1,
    explanation: "A player cannot be penalised for offside when receiving the ball directly from a corner kick."
  },
  {
    id: "rules-010",
    category: "FOOTBALL RULES",
    difficulty: "Beginner",
    question: "What does the referee mean by playing advantage?",
    options: [
      "Giving a team an extra substitution",
      "Allowing play to continue after a foul because the fouled team benefits",
      "Awarding an automatic penalty",
      "Adding extra time to the match"
    ],
    answer: 1,
    explanation: "The referee can allow play to continue after an offence when stopping the game would disadvantage the team that was fouled."
  },

  {
    id: "premier-005",
    category: "PREMIER LEAGUE",
    difficulty: "Intermediate",
    question: "Who scored the first-ever Premier League hat-trick?",
    options: ["Alan Shearer", "Eric Cantona", "Andy Cole", "Ian Wright"],
    answer: 1,
    explanation: "Eric Cantona scored the first Premier League hat-trick for Leeds United against Tottenham Hotspur in August 1992."
  },
  {
    id: "premier-006",
    category: "PREMIER LEAGUE",
    difficulty: "Expert",
    question: "Who holds the record for the most Premier League hat-tricks?",
    options: ["Alan Shearer", "Thierry Henry", "Sergio Agüero", "Wayne Rooney"],
    answer: 2,
    explanation: "Sergio Agüero holds the Premier League record with 12 hat-tricks."
  },
  {
    id: "premier-007",
    category: "PREMIER LEAGUE",
    difficulty: "Intermediate",
    question: "Who scored the fastest goal in Premier League history?",
    options: ["Mohamed Salah", "Shane Long", "Sadio Mané", "Jamie Vardy"],
    answer: 1,
    explanation: "Shane Long scored after just 7.69 seconds for Southampton against Watford in April 2019."
  },
  {
    id: "premier-008",
    category: "PREMIER LEAGUE",
    difficulty: "Expert",
    question: "Which player scored five goals in a single Premier League match for Manchester United against Ipswich Town in 1995?",
    options: ["Ryan Giggs", "Andy Cole", "Eric Cantona", "Ole Gunnar Solskjær"],
    answer: 1,
    explanation: "Andy Cole scored five goals as Manchester United defeated Ipswich Town 9–0 in March 1995."
  },
  {
    id: "ucl-005",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Expert",
    question: "Who is the oldest player to appear in a European Cup or Champions League final?",
    options: ["Paolo Maldini", "Dino Zoff", "Jens Lehmann", "Edwin van der Sar"],
    answer: 1,
    explanation: "Dino Zoff appeared in the 1983 European Cup final aged 41 years and 86 days."
  },
  {
    id: "ucl-006",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Intermediate",
    question: "Who scored the winning goal in the 1995 Champions League final for Ajax?",
    options: ["Patrick Kluivert", "Edgar Davids", "Jari Litmanen", "Clarence Seedorf"],
    answer: 0,
    explanation: "Patrick Kluivert scored the only goal against AC Milan in the 1995 final."
  },
  {
    id: "ucl-007",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Expert",
    question: "Which two clubs contested the 2005 Champions League final in Istanbul?",
    options: ["Barcelona and Arsenal", "Liverpool and AC Milan", "Chelsea and Bayern Munich", "Real Madrid and Juventus"],
    answer: 1,
    explanation: "Liverpool and AC Milan met in Istanbul in 2005. Liverpool came back from 3–0 down to win on penalties."
  },
  {
    id: "ucl-008",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Intermediate",
    question: "Which club became the first French team to win the European Cup?",
    options: ["Paris Saint-Germain", "Marseille", "Monaco", "Lyon"],
    answer: 1,
    explanation: "Marseille defeated AC Milan in the 1993 final to become the first French European Cup winners."
  },
  {
    id: "worldcup-005",
    category: "WORLD CUP",
    difficulty: "Beginner",
    question: "Which country hosted the 2002 FIFA Men's World Cup?",
    options: ["Japan and South Korea", "Germany and France", "Brazil and Argentina", "Spain and Portugal"],
    answer: 0,
    explanation: "Japan and South Korea jointly hosted the 2002 FIFA Men's World Cup."
  },
  {
    id: "worldcup-006",
    category: "WORLD CUP",
    difficulty: "Intermediate",
    question: "Which country did Brazil defeat in the 2002 World Cup final?",
    options: ["Germany", "Turkey", "England", "South Korea"],
    answer: 0,
    explanation: "Brazil defeated Germany 2–0 in the 2002 final, with Ronaldo scoring both goals."
  },
  {
    id: "worldcup-007",
    category: "WORLD CUP",
    difficulty: "Expert",
    question: "Who scored the winning goal in the 2014 World Cup final?",
    options: ["Thomas Müller", "Mario Götze", "Miroslav Klose", "Mesut Özil"],
    answer: 1,
    explanation: "Mario Götze scored in extra time to give Germany a 1–0 victory over Argentina."
  },
  {
    id: "worldcup-008",
    category: "WORLD CUP",
    difficulty: "Intermediate",
    question: "Which country finished third at the 1998 FIFA Men's World Cup?",
    options: ["Croatia", "Netherlands", "Brazil", "Italy"],
    answer: 0,
    explanation: "Croatia defeated the Netherlands 2–1 in the third-place match at the 1998 World Cup."
  },
  {
    id: "african-009",
    category: "AFRICAN FOOTBALL",
    difficulty: "Intermediate",
    question: "Which country did Zambia defeat to win the 2012 Africa Cup of Nations?",
    options: ["Ghana", "Ivory Coast", "Mali", "Nigeria"],
    answer: 1,
    explanation: "Zambia defeated Ivory Coast in a penalty shootout after a goalless final."
  },
  {
    id: "african-010",
    category: "AFRICAN FOOTBALL",
    difficulty: "Expert",
    question: "Who scored Nigeria's winning goal in the 1994 AFCON final?",
    options: ["Daniel Amokachi", "Rashidi Yekini", "Emmanuel Amunike", "Jay-Jay Okocha"],
    answer: 2,
    explanation: "Emmanuel Amunike scored both goals as Nigeria defeated Zambia 2–1 in the 1994 final."
  },
  {
    id: "african-011",
    category: "AFRICAN FOOTBALL",
    difficulty: "Beginner",
    question: "Which country won the 2019 Africa Cup of Nations?",
    options: ["Senegal", "Nigeria", "Algeria", "Tunisia"],
    answer: 2,
    explanation: "Algeria defeated Senegal 1–0 in the 2019 AFCON final."
  },
  {
    id: "african-012",
    category: "AFRICAN FOOTBALL",
    difficulty: "Intermediate",
    question: "Which country hosted the 1996 Africa Cup of Nations?",
    options: ["Nigeria", "South Africa", "Ghana", "Egypt"],
    answer: 1,
    explanation: "South Africa hosted and won the 1996 Africa Cup of Nations."
  },
  {
    id: "rules-011",
    category: "FOOTBALL RULES",
    difficulty: "Intermediate",
    question: "Can a goal be scored directly from a throw-in?",
    options: ["Yes, against either team", "Yes, but only against the opponents", "No", "Only in extra time"],
    answer: 2,
    explanation: "A goal cannot be scored directly from a throw-in. If the ball enters the opponents' goal, a goal kick is awarded."
  },
  {
    id: "rules-012",
    category: "FOOTBALL RULES",
    difficulty: "Expert",
    question: "What happens if a player scores directly against their own team from a goal kick?",
    options: ["The goal counts", "A penalty is awarded", "A corner kick is awarded to the opponents", "The goal kick is retaken"],
    answer: 2,
    explanation: "Under IFAB Law 16, if a goal kick goes directly into the kicker's own goal, a corner kick is awarded to the opponents."
  },
  {
    id: "tactics-006",
    category: "FOOTBALL TACTICS",
    difficulty: "Intermediate",
    question: "What does a high defensive line mean?",
    options: [
      "Defenders position themselves close to the halfway line",
      "Defenders stay inside their penalty area",
      "The goalkeeper plays as a striker",
      "The team uses no central defenders"
    ],
    answer: 0,
    explanation: "A high defensive line means defenders position themselves further up the pitch, often to compress space and support pressing."
  },
  {
    id: "stats-006",
    category: "FOOTBALL STATISTICS",
    difficulty: "Beginner",
    question: "What is a hat-trick in football?",
    options: [
      "Scoring two goals in a match",
      "Scoring three goals in a match",
      "Making three assists",
      "Keeping three clean sheets"
    ],
    answer: 1,
    explanation: "A hat-trick is when a player scores three goals in a single match."
  },

  {
    id: "premier-009",
    category: "PREMIER LEAGUE",
    difficulty: "Intermediate",
    question: "Which club completed the first unbeaten Premier League season?",
    options: ["Chelsea", "Arsenal", "Manchester United", "Liverpool"],
    answer: 1,
    explanation: "Arsenal completed the 2003/04 Premier League season without losing a match and became known as The Invincibles."
  },
  
{
  id: "premier-010",
  category: "PREMIER LEAGUE",
  difficulty: "Expert",
  question: "Who holds the record for the most Premier League appearances?",
  options: ["Ryan Giggs", "Frank Lampard", "James Milner", "Gareth Barry"],
  answer: 2,
  explanation: "James Milner holds the Premier League appearance record with 658 appearances, according to the current official records."
},

  {
    id: "premier-011",
    category: "PREMIER LEAGUE",
    difficulty: "Beginner",
    question: "Which club plays its home matches at Anfield?",
    options: ["Everton", "Liverpool", "Manchester City", "Newcastle United"],
    answer: 1,
    explanation: "Anfield has been Liverpool's home ground since the club was founded in 1892."
  },
  {
    id: "ucl-009",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Beginner",
    question: "Which English club became the first to win the European Cup?",
    options: ["Liverpool", "Manchester United", "Nottingham Forest", "Aston Villa"],
    answer: 1,
    explanation: "Manchester United became the first English club to win the European Cup in 1968."
  },
  {
    id: "ucl-010",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Intermediate",
    question: "Which club won the 2006 UEFA Champions League final?",
    options: ["Arsenal", "Barcelona", "AC Milan", "Chelsea"],
    answer: 1,
    explanation: "Barcelona defeated Arsenal 2–1 in the 2006 final in Paris."
  },
  {
    id: "ucl-011",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Expert",
    question: "Which club did Chelsea defeat in the 2021 Champions League final?",
    options: ["Paris Saint-Germain", "Real Madrid", "Manchester City", "Bayern Munich"],
    answer: 2,
    explanation: "Chelsea defeated Manchester City 1–0 in the 2021 Champions League final."
  },
  {
    id: "worldcup-009",
    category: "WORLD CUP",
    difficulty: "Beginner",
    question: "Which country won the 1982 FIFA Men's World Cup?",
    options: ["West Germany", "Italy", "Brazil", "Argentina"],
    answer: 1,
    explanation: "Italy won the 1982 World Cup after defeating West Germany 3–1 in the final."
  },
  {
    id: "worldcup-010",
    category: "WORLD CUP",
    difficulty: "Intermediate",
    question: "Which country won the 1994 FIFA Men's World Cup?",
    options: ["Italy", "Brazil", "Germany", "Argentina"],
    answer: 1,
    explanation: "Brazil defeated Italy on penalties after a goalless final in Pasadena."
  },
  {
    id: "worldcup-011",
    category: "WORLD CUP",
    difficulty: "Expert",
    question: "Which country finished third at the 2002 FIFA Men's World Cup?",
    options: ["Turkey", "South Korea", "Germany", "Spain"],
    answer: 0,
    explanation: "Turkey defeated co-hosts South Korea 3–2 in the third-place match."
  },
  {
    id: "worldcup-012",
    category: "WORLD CUP",
    difficulty: "Intermediate",
    question: "Who won the Golden Ball award at the 2018 FIFA Men's World Cup?",
    options: ["Antoine Griezmann", "Kylian Mbappé", "Luka Modrić", "Eden Hazard"],
    answer: 2,
    explanation: "Croatia captain Luka Modrić received the Golden Ball as the tournament's best player."
  },
  {
    id: "african-013",
    category: "AFRICAN FOOTBALL",
    difficulty: "Beginner",
    question: "Which country won the 2004 Africa Cup of Nations?",
    options: ["Morocco", "Nigeria", "Tunisia", "Cameroon"],
    answer: 2,
    explanation: "Tunisia won the 2004 AFCON on home soil, defeating Morocco 2–1 in the final."
  },
  {
    id: "african-014",
    category: "AFRICAN FOOTBALL",
    difficulty: "Intermediate",
    question: "Which country won the 2006 Africa Cup of Nations?",
    options: ["Ivory Coast", "Egypt", "Senegal", "Ghana"],
    answer: 1,
    explanation: "Egypt won the 2006 AFCON after defeating Ivory Coast in a penalty shootout."
  },
  {
    id: "african-015",
    category: "AFRICAN FOOTBALL",
    difficulty: "Intermediate",
    question: "Which country won the 2015 Africa Cup of Nations?",
    options: ["Ghana", "Ivory Coast", "Algeria", "Cameroon"],
    answer: 1,
    explanation: "Ivory Coast defeated Ghana on penalties to win the 2015 AFCON."
  },
  {
    id: "african-016",
    category: "AFRICAN FOOTBALL",
    difficulty: "Beginner",
    question: "Which country won the Africa Cup of Nations tournament played in 2022?",
    options: ["Egypt", "Senegal", "Cameroon", "Morocco"],
    answer: 1,
    explanation: "Senegal won the 2021 AFCON, which was played in early 2022, defeating Egypt on penalties in the final."
  },
  {
    id: "players-007",
    category: "FOOTBALL PLAYERS",
    difficulty: "Intermediate",
    question: "Which goalkeeper won the 2014 FIFA World Cup Golden Glove award?",
    options: ["Manuel Neuer", "Thibaut Courtois", "Keylor Navas", "Sergio Romero"],
    answer: 0,
    explanation: "Germany's Manuel Neuer received the Golden Glove award at the 2014 World Cup."
  },
  {
    id: "players-008",
    category: "FOOTBALL PLAYERS",
    difficulty: "Expert",
    question: "Which player scored the winning goal in the 2000 UEFA European Championship final?",
    options: ["Zinedine Zidane", "David Trezeguet", "Thierry Henry", "Sylvain Wiltord"],
    answer: 1,
    explanation: "David Trezeguet scored the golden goal in extra time as France defeated Italy 2–1."
  },
  {
    id: "rules-013",
    category: "FOOTBALL RULES",
    difficulty: "Beginner",
    question: "What does a red card mean in football?",
    options: [
      "The player receives a warning",
      "The player must leave the field of play",
      "The team receives a penalty",
      "The match automatically ends"
    ],
    answer: 1,
    explanation: "A player shown a red card is sent off and cannot take any further part in the match."
  },
  {
    id: "rules-014",
    category: "FOOTBALL RULES",
    difficulty: "Intermediate",
    question: "What is awarded when the whole ball crosses the goal line without a goal being scored, having last touched a defending player?",
    options: ["A goal kick", "A corner kick", "A penalty", "A throw-in"],
    answer: 1,
    explanation: "A corner kick is awarded when the ball crosses the defending team's goal line after last touching a defending player, provided no goal is scored."
  },
  {
    id: "tactics-007",
    category: "FOOTBALL TACTICS",
    difficulty: "Intermediate",
    question: "What is an overlapping run in football?",
    options: [
      "A defender moving forward beyond a teammate to offer a passing option",
      "A striker moving backwards to defend",
      "A goalkeeper leaving the penalty area",
      "Two players switching teams"
    ],
    answer: 0,
    explanation: "An overlapping run happens when a player moves around and beyond a teammate, often creating an attacking option on the outside."
  },
  {
    id: "stats-007",
    category: "FOOTBALL STATISTICS",
    difficulty: "Intermediate",
    question: "What does xA mean in football statistics?",
    options: [
      "Expected Assists",
      "Extra Attempts",
      "Exact Accuracy",
      "Expected Attendance"
    ],
    answer: 0,
    explanation: "Expected Assists (xA) estimates the likelihood that a pass will become an assist, based on the quality of the chance it creates."
  },

  {
    id: "premier-012",
    category: "PREMIER LEAGUE",
    difficulty: "Expert",
    question: "Which player holds the record for the most Premier League goals scored for a single club?",
    options: ["Wayne Rooney", "Harry Kane", "Sergio Agüero", "Thierry Henry"],
    answer: 1,
    explanation: "Harry Kane scored 213 Premier League goals for Tottenham Hotspur."
  },
  {
    id: "premier-013",
    category: "PREMIER LEAGUE",
    difficulty: "Intermediate",
    question: "Who holds the record for scoring in the most consecutive Premier League matches?",
    options: ["Mohamed Salah", "Jamie Vardy", "Erling Haaland", "Ruud van Nistelrooy"],
    answer: 1,
    explanation: "Jamie Vardy scored in 11 consecutive Premier League matches for Leicester City in 2015."
  },
  {
    id: "ucl-012",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Beginner",
    question: "Who scored Manchester United's winning goal in the 1999 Champions League final?",
    options: ["David Beckham", "Teddy Sheringham", "Ole Gunnar Solskjær", "Ryan Giggs"],
    answer: 2,
    explanation: "Ole Gunnar Solskjær scored the decisive goal in stoppage time as Manchester United beat Bayern Munich 2–1."
  },
  {
    id: "ucl-013",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Intermediate",
    question: "Which club did Chelsea defeat in the 2012 Champions League final?",
    options: ["Barcelona", "Bayern Munich", "Real Madrid", "Borussia Dortmund"],
    answer: 1,
    explanation: "Chelsea defeated Bayern Munich on penalties after a 1–1 draw in Munich."
  },
  {
    id: "ucl-014",
    category: "CHAMPIONS LEAGUE",
    difficulty: "Intermediate",
    question: "Which club did Real Madrid defeat to win their tenth European Cup in 2014?",
    options: ["Barcelona", "Atlético Madrid", "Bayern Munich", "Juventus"],
    answer: 1,
    explanation: "Real Madrid defeated city rivals Atlético Madrid 4–1 after extra time in the 2014 final."
  },
  {
    id: "worldcup-013",
    category: "WORLD CUP",
    difficulty: "Beginner",
    question: "Which country won the 2006 FIFA Men's World Cup?",
    options: ["France", "Germany", "Italy", "Brazil"],
    answer: 2,
    explanation: "Italy defeated France on penalties in the 2006 World Cup final."
  },
  {
    id: "worldcup-014",
    category: "WORLD CUP",
    difficulty: "Beginner",
    question: "Which country won the 1986 FIFA Men's World Cup?",
    options: ["West Germany", "Argentina", "Brazil", "France"],
    answer: 1,
    explanation: "Argentina defeated West Germany 3–2 in the 1986 World Cup final."
  },
  {
    id: "worldcup-015",
    category: "WORLD CUP",
    difficulty: "Intermediate",
    question: "Which country won the 1990 FIFA Men's World Cup?",
    options: ["Argentina", "Italy", "Brazil", "West Germany"],
    answer: 3,
    explanation: "West Germany defeated Argentina 1–0 in the 1990 World Cup final."
  },
  {
    id: "worldcup-016",
    category: "WORLD CUP",
    difficulty: "Expert",
    question: "Which country became the first to win three FIFA Men's World Cup titles?",
    options: ["Italy", "Germany", "Brazil", "Argentina"],
    answer: 2,
    explanation: "Brazil became the first three-time men's World Cup champion after winning the 1970 tournament."
  },
  {
    id: "african-017",
    category: "AFRICAN FOOTBALL",
    difficulty: "Beginner",
    question: "Which country won the 2017 Africa Cup of Nations?",
    options: ["Egypt", "Ghana", "Cameroon", "Burkina Faso"],
    answer: 2,
    explanation: "Cameroon defeated Egypt 2–1 in the 2017 AFCON final."
  },
  {
    id: "african-018",
    category: "AFRICAN FOOTBALL",
    difficulty: "Intermediate",
    question: "Which country won the 2008 Africa Cup of Nations?",
    options: ["Cameroon", "Egypt", "Ghana", "Nigeria"],
    answer: 1,
    explanation: "Egypt won the 2008 AFCON after defeating Cameroon 1–0 in the final."
  },
  {
    id: "african-019",
    category: "AFRICAN FOOTBALL",
    difficulty: "Intermediate",
    question: "Which country won the 2023 Africa Cup of Nations?",
    options: ["Nigeria", "Senegal", "Morocco", "Ivory Coast"],
    answer: 3,
    explanation: "Ivory Coast won the 2023 AFCON on home soil, defeating Nigeria 2–1 in the final."
  },
  {
    id: "managers-004",
    category: "FOOTBALL MANAGERS",
    difficulty: "Expert",
    question: "Who managed Greece when they won UEFA Euro 2004?",
    options: ["Otto Rehhagel", "Fernando Santos", "Guus Hiddink", "José Mourinho"],
    answer: 0,
    explanation: "German manager Otto Rehhagel guided Greece to their historic Euro 2004 triumph."
  },
  {
    id: "managers-005",
    category: "FOOTBALL MANAGERS",
    difficulty: "Intermediate",
    question: "Who managed Leicester City during their famous 2015/16 Premier League title-winning season?",
    options: ["Brendan Rodgers", "Claudio Ranieri", "Nigel Pearson", "Craig Shakespeare"],
    answer: 1,
    explanation: "Claudio Ranieri guided Leicester City to one of the most remarkable title wins in English football history."
  },
  {
    id: "players-009",
    category: "FOOTBALL PLAYERS",
    difficulty: "Intermediate",
    question: "Which Italian defender won the 2006 Ballon d'Or?",
    options: ["Paolo Maldini", "Fabio Cannavaro", "Alessandro Nesta", "Gianluca Zambrotta"],
    answer: 1,
    explanation: "Fabio Cannavaro won the 2006 Ballon d'Or after captaining Italy to World Cup glory."
  },
  {
    id: "players-010",
    category: "FOOTBALL PLAYERS",
    difficulty: "Beginner",
    question: "Which Brazilian midfielder won the 2007 Ballon d'Or?",
    options: ["Kaká", "Ronaldinho", "Rivaldo", "Juninho"],
    answer: 0,
    explanation: "Kaká won the 2007 Ballon d'Or after an outstanding season with AC Milan."
  },
  {
    id: "players-011",
    category: "FOOTBALL PLAYERS",
    difficulty: "Expert",
    question: "Who remains the only goalkeeper to have won the men's Ballon d'Or?",
    options: ["Gianluigi Buffon", "Manuel Neuer", "Lev Yashin", "Dino Zoff"],
    answer: 2,
    explanation: "Lev Yashin, the legendary Soviet goalkeeper, won the Ballon d'Or in 1963."
  },
  {
    id: "rules-015",
    category: "FOOTBALL RULES",
    difficulty: "Expert",
    question: "What is awarded if an indirect free kick goes directly into the opponents' goal without touching another player?",
    options: ["A goal", "A penalty", "A goal kick", "A corner kick"],
    answer: 2,
    explanation: "Under IFAB Law 13, a goal kick is awarded when an indirect free kick enters the opponents' goal directly."
  },
  {
    id: "rules-016",
    category: "FOOTBALL RULES",
    difficulty: "Intermediate",
    question: "Under the current IFAB rules, how long may a goalkeeper control the ball with their hands before a corner kick is awarded?",
    options: ["5 seconds", "6 seconds", "8 seconds", "10 seconds"],
    answer: 2,
    explanation: "Under the 2025/26 Laws of the Game, holding the ball for more than eight seconds results in a corner kick to the opponents."
  },
  {
    id: "tactics-008",
    category: "FOOTBALL TACTICS",
    difficulty: "Intermediate",
    question: "What is an inverted winger?",
    options: [
      "A winger who moves inside onto their stronger foot",
      "A defender who plays as a striker",
      "A goalkeeper who acts as a midfielder",
      "A winger who never crosses the halfway line"
    ],
    answer: 0,
    explanation: "An inverted winger usually starts on the opposite side to their stronger foot and cuts inside to shoot or create chances."
  },

  {
    id: "international-011",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Beginner",
    question: "Which country won the first UEFA European Championship in 1960?",
    options: ["Spain", "Soviet Union", "Italy", "Yugoslavia"],
    answer: 1,
    explanation: "The Soviet Union won the inaugural European Championship in 1960, defeating Yugoslavia in the final."
  },
  {
    id: "international-012",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Beginner",
    question: "Which country won UEFA Euro 2016?",
    options: ["France", "Germany", "Portugal", "Spain"],
    answer: 2,
    explanation: "Portugal defeated hosts France 1–0 after extra time in the Euro 2016 final."
  },
  {
    id: "international-013",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Intermediate",
    question: "Which country won UEFA Euro 2024?",
    options: ["England", "Spain", "France", "Germany"],
    answer: 1,
    explanation: "Spain defeated England 2–1 in the Euro 2024 final to win their fourth European Championship."
  },
  {
    id: "international-014",
    category: "INTERNATIONAL FOOTBALL",
    difficulty: "Intermediate",
    question: "Which country won the 2015 Copa América?",
    options: ["Argentina", "Brazil", "Chile", "Uruguay"],
    answer: 2,
    explanation: "Chile won the 2015 Copa América on home soil, defeating Argentina in a penalty shootout."
  },
  {
    id: "worldcup-017",
    category: "WORLD CUP",
    difficulty: "Intermediate",
    question: "Which country won the 1950 FIFA Men's World Cup?",
    options: ["Brazil", "Uruguay", "Italy", "West Germany"],
    answer: 1,
    explanation: "Uruguay won the 1950 World Cup after defeating Brazil in the decisive final-round match at the Maracanã."
  },
  {
    id: "worldcup-018",
    category: "WORLD CUP",
    difficulty: "Intermediate",
    question: "Which country won the 1974 FIFA Men's World Cup?",
    options: ["Netherlands", "Brazil", "West Germany", "Argentina"],
    answer: 2,
    explanation: "West Germany defeated the Netherlands 2–1 in the 1974 World Cup final."
  },
  {
    id: "worldcup-019",
    category: "WORLD CUP",
    difficulty: "Beginner",
    question: "Which country won the 1978 FIFA Men's World Cup?",
    options: ["Brazil", "Italy", "Argentina", "Netherlands"],
    answer: 2,
    explanation: "Argentina won its first men's World Cup in 1978, defeating the Netherlands in the final."
  },
  {
    id: "worldcup-020",
    category: "WORLD CUP",
    difficulty: "Expert",
    question: "Who won the Golden Boot at the 1982 FIFA Men's World Cup?",
    options: ["Zico", "Paolo Rossi", "Karl-Heinz Rummenigge", "Diego Maradona"],
    answer: 1,
    explanation: "Italy's Paolo Rossi scored six goals and finished as the tournament's leading scorer in 1982."
  },
  {
    id: "players-012",
    category: "FOOTBALL PLAYERS",
    difficulty: "Beginner",
    question: "Which Brazilian player won the 2005 Ballon d'Or?",
    options: ["Ronaldo Nazário", "Kaká", "Ronaldinho", "Rivaldo"],
    answer: 2,
    explanation: "Ronaldinho won the 2005 Ballon d'Or after outstanding performances for Barcelona."
  },
  {
    id: "players-013",
    category: "FOOTBALL PLAYERS",
    difficulty: "Intermediate",
    question: "Which goalkeeper captained Spain to victory at the 2010 FIFA Men's World Cup?",
    options: ["David de Gea", "Pepe Reina", "Iker Casillas", "Víctor Valdés"],
    answer: 2,
    explanation: "Iker Casillas captained Spain during their historic 2010 World Cup triumph."
  },
  {
    id: "players-014",
    category: "FOOTBALL PLAYERS",
    difficulty: "Expert",
    question: "Who scored both of France's goals in the 1998 FIFA World Cup final?",
    options: ["Thierry Henry", "David Trezeguet", "Zinedine Zidane", "Emmanuel Petit"],
    answer: 2,
    explanation: "Zinedine Zidane scored twice with headers as France defeated Brazil 3–0 in the 1998 final."
  },
  {
    id: "managers-006",
    category: "FOOTBALL MANAGERS",
    difficulty: "Intermediate",
    question: "Which manager led Manchester United to Champions League titles in 1999 and 2008?",
    options: ["José Mourinho", "Sir Alex Ferguson", "Louis van Gaal", "David Moyes"],
    answer: 1,
    explanation: "Sir Alex Ferguson guided Manchester United to European glory in 1999 and again in 2008."
  },
  {
    id: "tactics-009",
    category: "FOOTBALL TACTICS",
    difficulty: "Intermediate",
    question: "What is commonly meant by tiki-taka football?",
    options: [
      "Long balls and direct attacking",
      "Short passing, movement and possession-based play",
      "Defending with all players near the goal",
      "Attacking only through crosses"
    ],
    answer: 1,
    explanation: "Tiki-taka is associated with short passing, intelligent movement and maintaining possession."
  },
  {
    id: "rules-017",
    category: "FOOTBALL RULES",
    difficulty: "Expert",
    question: "According to IFAB Law 3, what is the minimum number of players a team must have for a match to continue?",
    options: ["5", "6", "7", "8"],
    answer: 2,
    explanation: "A match may not continue if either team has fewer than seven players."
  },




];

const QUESTIONS_PER_ROUND = 10;

const QUIZ_HISTORY_KEY = "goalsense-quiz-recent-questions";
const RECENT_HISTORY_LIMIT = 30;

type QuizQuestion = (typeof questionBank)[number];

function getRecentQuestionIds(): string[] {
  try {
    const saved = localStorage.getItem(QUIZ_HISTORY_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

function selectBalancedQuestions(pool: QuizQuestion[]) {
  const selected: QuizQuestion[] = [];

  const addQuestions = (amount: number, difficulty?: string) => {
    for (let i = 0; i < amount; i++) {
      const candidates = pool.filter(
        (q) =>
          !selected.some((item) => item.id === q.id) &&
          (!difficulty || q.difficulty === difficulty)
      );

      if (candidates.length === 0) break;

      // Prefer categories that have appeared less often.
      const categoryCounts = candidates.map((q) => ({
        category: q.category,
        count: selected.filter(
          (item) => item.category === q.category
        ).length,
      }));

      const minimum = Math.min(
        ...categoryCounts.map((item) => item.count)
      );

      const availableCategories = [
        ...new Set(
          categoryCounts
            .filter((item) => item.count === minimum)
            .map((item) => item.category)
        ),
      ];

      const category =
        availableCategories[
          Math.floor(Math.random() * availableCategories.length)
        ];

      const categoryQuestions = candidates.filter(
        (q) => q.category === category
      );

      selected.push(
        categoryQuestions[
          Math.floor(Math.random() * categoryQuestions.length)
        ]
      );
    }
  };

  // Target difficulty distribution.
  addQuestions(2, "Beginner");
  addQuestions(5, "Intermediate");
  addQuestions(3, "Expert");

  // Fill any remaining spaces if a difficulty has too few questions.
  addQuestions(QUESTIONS_PER_ROUND - selected.length);

  return shuffle(selected);
}


function shuffle<T,>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export default function FootballQuizPage() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<typeof questionBank>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  const percentage = useMemo(
    () => Math.round((score / QUESTIONS_PER_ROUND) * 100),
    [score]
  );

  
const startQuiz = () => {
  const recentIds = getRecentQuestionIds();

  // Find questions that have not appeared recently.
  const unseenQuestions = questionBank.filter(
    (question) => !recentIds.includes(question.id)
  );

  // If fewer than 10 unseen questions remain,
  // allow older questions back into the selection pool.
  const pool =
    unseenQuestions.length >= QUESTIONS_PER_ROUND
      ? unseenQuestions
      : [
          ...shuffle(unseenQuestions),
          ...shuffle(
            questionBank.filter(
              (question) => recentIds.includes(question.id)
            )
          ),
        ];

  const selectedQuestions = selectBalancedQuestions(pool);

  // Save recently selected question IDs.
  const updatedHistory = [
    ...recentIds,
    ...selectedQuestions.map((question) => question.id),
  ].slice(-RECENT_HISTORY_LIMIT);

  try {
    localStorage.setItem(
      QUIZ_HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );
  } catch {
    // Quiz can still run if browser storage is unavailable.
  }

  setQuestions(selectedQuestions);
  setCurrent(0);
  setSelected(null);
  setScore(0);
  setFinished(false);
  setStarted(true);
};


  const selectAnswer = (index: number) => {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      setScore((previous) => previous + 1);
    }
  };

  const nextQuestion = () => {
    if (current + 1 === QUESTIONS_PER_ROUND) {
      setFinished(true);
      return;
    }

    setCurrent((previous) => previous + 1);
    setSelected(null);
  };

  const shareResult = async () => {
    const message = `I scored ${score}/10 (${percentage}%) on the GoalSense Football Knowledge Quiz! Can you beat my score? https://goalsense.live/insights/football-quiz`;

    if (navigator.share) {
      await navigator.share({
        title: "GoalSense Football Quiz",
        text: message,
      });
    } else {
      await navigator.clipboard.writeText(message);
      alert("Your result has been copied!");
    }
  };

  const rating =
    percentage >= 90
      ? "Football Genius"
      : percentage >= 70
        ? "Football Expert"
        : percentage >= 50
          ? "Rising Football Mind"
          : "Keep Learning";

  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] px-5 py-10 text-white sm:py-16">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.13),transparent_55%)]" />

      <div className="relative mx-auto max-w-3xl">

        {/* HEADER */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to Insights
        </Link>

        <div className="mt-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
            <Brain size={32} />
          </div>

          <p className="mt-6 text-xs font-bold tracking-[0.25em] text-emerald-400">
            GOALSENSE KNOWLEDGE CHALLENGE
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Football Knowledge Quiz
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
            How well do you really know football? Challenge yourself,
            discover interesting facts and test your knowledge.
          </p>
        </div>

        {/* START SCREEN */}
        {!started && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-[#0b110e] p-7 shadow-2xl sm:p-10">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white/[0.04] p-4">
                <Target className="mx-auto text-emerald-400" size={23} />
                <p className="mt-3 text-xl font-black">10</p>
                <p className="mt-1 text-[10px] text-gray-500">QUESTIONS</p>
              </div>

              <div className="rounded-xl bg-white/[0.04] p-4">
                <Brain className="mx-auto text-emerald-400" size={23} />
                <p className="mt-3 text-xl font-black">Mixed</p>
                <p className="mt-1 text-[10px] text-gray-500">DIFFICULTY</p>
              </div>

              <div className="rounded-xl bg-white/[0.04] p-4">
                <Trophy className="mx-auto text-emerald-400" size={23} />
                <p className="mt-3 text-xl font-black">100%</p>
                <p className="mt-1 text-[10px] text-gray-500">YOUR TARGET</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                "10 randomly selected football questions",
                "Four answer options per question",
                "Instant explanations after every answer",
                "Your final score and performance rating",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-emerald-400"
                  />
                  {item}
                </div>
              ))}
            </div>

            <button
              onClick={startQuiz}
              className="mt-9 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 font-black text-black transition hover:bg-emerald-400"
            >
              Start Football Quiz
              <ArrowRight size={19} />
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              Free to play. No account required.
            </p>
          </div>
        )}

        {/* QUESTION SCREEN */}
        {started && !finished && question && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-[#0b110e] p-6 shadow-2xl sm:p-9">

            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold tracking-widest text-emerald-400">
                QUESTION {current + 1} OF {QUESTIONS_PER_ROUND}
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-400">
                {question.difficulty}
              </span>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                style={{
                  width: `${((current + 1) / QUESTIONS_PER_ROUND) * 100}%`,
                }}
              />
            </div>

            <p className="mt-9 text-[10px] font-bold tracking-[0.2em] text-emerald-400">
              {question.category}
            </p>

            <h2 className="mt-4 text-xl font-extrabold leading-8 sm:text-2xl">
              {question.question}
            </h2>

            <div className="mt-8 space-y-3">
              {question.options.map((option, index) => {
                const isCorrect = index === question.answer;
                const isSelected = selected === index;

                let style =
                  "border-white/10 bg-white/[0.025] hover:border-emerald-400/40 hover:bg-emerald-400/5";

                if (selected !== null && isCorrect) {
                  style =
                    "border-emerald-400 bg-emerald-400/10 text-emerald-300";
                } else if (isSelected && !isCorrect) {
                  style =
                    "border-red-400/60 bg-red-400/10 text-red-300";
                }

                return (
                  <button
                    key={option}
                    disabled={selected !== null}
                    onClick={() => selectAnswer(index)}
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${style}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="flex-1 text-sm font-semibold">
                      {option}
                    </span>

                    {selected !== null && isCorrect && (
                      <CheckCircle2 size={19} />
                    )}

                    {isSelected && !isCorrect && (
                      <XCircle size={19} />
                    )}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="flex items-center gap-2">
                  {selected === question.answer ? (
                    <>
                      <CheckCircle2
                        size={20}
                        className="text-emerald-400"
                      />
                      <span className="font-bold text-emerald-400">
                        Excellent! Correct answer.
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={20} className="text-red-400" />
                      <span className="font-bold text-red-400">
                        Not quite. Keep learning!
                      </span>
                    </>
                  )}
                </div>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {question.explanation}
                </p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Score: <strong className="text-white">{score}</strong>
              </span>

              <button
                onClick={nextQuestion}
                disabled={selected === null}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {current === QUESTIONS_PER_ROUND - 1
                  ? "View Results"
                  : "Next Question"}
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}

        {/* RESULTS SCREEN */}
        {finished && (
          <div className="mt-12 rounded-3xl border border-emerald-400/20 bg-[#0b110e] p-7 text-center shadow-2xl sm:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <Trophy size={39} />
            </div>

            <p className="mt-7 text-xs font-bold tracking-[0.25em] text-emerald-400">
              CHALLENGE COMPLETED
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              {rating}
            </h2>

            <p className="mt-3 text-gray-400">
              You have completed the GoalSense Football Knowledge Quiz.
            </p>

            <div className="mt-9 rounded-2xl border border-white/10 bg-black/30 p-7">
              <p className="text-xs font-bold tracking-widest text-gray-500">
                YOUR FINAL SCORE
              </p>

              <p className="mt-3 text-6xl font-black text-emerald-400">
                {score}<span className="text-3xl text-gray-500">/10</span>
              </p>

              <p className="mt-3 text-lg font-bold">{percentage}%</p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <p className="mt-7 text-sm leading-7 text-gray-400">
              {percentage >= 90
                ? "Outstanding! You have an excellent understanding of football."
                : percentage >= 70
                  ? "Great performance! You clearly know your football."
                  : percentage >= 50
                    ? "Good effort! Keep exploring and expanding your football knowledge."
                    : "Every expert starts somewhere. Keep learning and try again!"}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={startQuiz}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-4 font-bold text-black transition hover:bg-emerald-400"
              >
                <RotateCcw size={18} />
                Play Again
              </button>

              <button
                onClick={shareResult}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-4 font-bold transition hover:border-emerald-400/50 hover:text-emerald-400"
              >
                <Sparkles size={18} />
                Share My Score
              </button>
            </div>

            <Link
              href="/insights"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-emerald-400"
            >
              <Home size={16} />
              Return to Insights
            </Link>
          </div>
        )}

        <p className="mt-10 text-center text-xs tracking-wider text-gray-600">
          GOALSENSE INSIGHTS · KNOWLEDGE · FOOTBALL
        </p>
      </div>
    </main>
  );
}

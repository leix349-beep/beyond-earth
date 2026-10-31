export type FilmChapter={at:number;title:string;description:string;kind:string};
export type Film={id:string;title:string;subtitle:string;duration:number;file:string;poster:string;source:string;credit:string;chapters:FilmChapter[]};
export const films:Film[]=[
{id:'journey',title:'Leaving Earth',subtitle:'One mission. From launch pad to home.',duration:132,file:'/media/mission-journey.mp4',poster:'/media/mission-journey-poster.jpg',source:'https://images.nasa.gov/details/KSC-20200811-VP-MWC01-001-DEMO2-RECAP-3255900',credit:'NASA / Kennedy Space Center · Demo-2, 2020',chapters:[
{at:0,title:'Before the countdown',description:'A crewed mission begins long before ignition: training, suit checks and a spacecraft ready to support its passengers.',kind:'Archive footage'},
{at:26,title:'Leaving the ground',description:'Falcon 9 lifts Crew Dragon from Kennedy Space Center. The mission must gain orbital speed, not just altitude.',kind:'Archive footage'},
{at:55,title:'Finding an orbital home',description:'Rendezvous brings two moving spacecraft together. Matching the station’s orbit matters as much as reaching its altitude.',kind:'NASA visualization & archive'},
{at:72,title:'Life and work in orbit',description:'The mission becomes more than transportation. The crew joins a working laboratory with experiments, maintenance and spacewalks.',kind:'Archive footage'},
{at:106,title:'The journey home',description:'Undocking, atmospheric entry, parachutes and recovery complete the mission. A launch is a beginning, not the whole story.',kind:'Archive footage'}]},
{id:'station',title:'Inside the station',subtitle:'Step through humanity’s orbital laboratory.',duration:126,file:'/media/inside-iss.mp4',poster:'/media/inside-iss-poster.jpg',source:'https://images.nasa.gov/details/jsc2025m000041_Tour_the_International_Space_Station-25_Years_of_Humans_in_Space',credit:'NASA / Johnson Space Center · Nicole Mann & Kjell Lindgren',chapters:[
{at:0,title:'Meet your guides',description:'NASA astronauts Nicole Mann and Kjell Lindgren introduce the station as a place where people live, work and move in microgravity.',kind:'Astronaut-guided tour'},
{at:25,title:'Built piece by piece',description:'The station’s rooms arrived on separate launches. Docking and assembly turned individual components into a connected workplace.',kind:'NASA tour & visualization'},
{at:51,title:'A laboratory without a floor',description:'In continuous free fall, experiments can study behavior that gravity normally masks. Crew members orient themselves using handrails and visual cues.',kind:'Interior footage'},
{at:88,title:'Across an international laboratory',description:'Different modules provide equipment, storage and research space. In orbit, the engineering that keeps the crew alive is always part of the work.',kind:'Interior footage'}]},
{id:'return',title:'Back to Earth',subtitle:'The last few minutes are a mission of their own.',duration:116,file:'/media/return-to-earth.mp4',poster:'/media/return-to-earth-poster.jpg',source:'https://images.nasa.gov/details/KSC-20200802-MH-MTD01-0001-SpaceX_Demo-2_Splashdown_4K-3255694',credit:'NASA / Kennedy Space Center · Demo-2 splashdown, 2020',chapters:[
{at:0,title:'Under the parachutes',description:'Crew Dragon descends beneath its main parachutes. They slow a capsule that has already shed most of its speed during atmospheric entry.',kind:'Recovery footage'},
{at:47,title:'Approaching the water',description:'The final descent needs a clear recovery zone and teams ready to locate and secure the capsule.',kind:'Recovery footage'},
{at:73,title:'Splashdown',description:'The crew is back on Earth, but recovery crews still have to secure the spacecraft and bring its occupants aboard the waiting vessel.',kind:'Recovery footage'}]},
{id:'apollo',title:'Apollo 11: the original record',subtitle:'Launch, lunar descent, moonwalk and recovery.',duration:160,file:'/media/apollo-archive.mp4',poster:'/media/apollo-archive-poster.jpg',source:'https://images.nasa.gov/details/KSC-19690716-MH-NAS01-0001-The_Flight_of_Apollo_11_The_Eagle_Has_Landed_HS_from_Film_JSC-DVC_1928',credit:'NASA / The Flight of Apollo 11 · 1969 archival film excerpts',chapters:[
{at:0,title:'The lunar expedition begins',description:'Saturn V carries the crew and the spacecraft needed for a lunar landing. The command and lunar modules serve different parts of the journey.',kind:'1969 archival film'},
{at:40,title:'Descending to another world',description:'Armstrong and Aldrin take Eagle toward the surface while Collins remains in lunar orbit. Television, cameras and radio connect the separate parts of the mission.',kind:'1969 archival film'},
{at:85,title:'On the Moon',description:'The surface exploration is a working visit: photographs, samples and experiments turn a landing into scientific evidence.',kind:'1969 archival film'},
{at:130,title:'Home to the Pacific',description:'Only the command module returns the crew through Earth’s atmosphere. Recovery crews complete the last stage of the expedition.',kind:'1969 archival film'}]}

];
export function filmFor(id:string){return films.find(f=>f.id===id)||films[0]}

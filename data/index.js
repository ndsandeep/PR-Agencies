// All photography is hotlinked from Unsplash (free licence). Swap any ID here if an image 404s.
const u = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`
export const IMG = {
  hero: u('photo-1478737270239-2f02b77fc618', 2000), team: u('photo-1522202176988-66273c2fd55f'),
  office: u('photo-1557804506-669a67965ba0'), analytics: u('photo-1460925895917-afdab827c52f'),
  film: u('photo-1598899134739-24c46f58b8c0'), cinema: u('photo-1485846234645-a62644f84728'),
  news: u('photo-1504711434969-e33886168f5c'), digital: u('photo-1611162617213-7d7a39e9b1d7'),
  dash: u('photo-1551288049-bebda4e38f71'), mic: u('photo-1478737270239-2f02b77fc618'),
}
export const NAV = [['Home','/'],['About','/about'],['Services','/services'],['Contact','/contact']]
export const SERVICES = [
  { id:'360', n:'01', title:'360° Advertising', short:'One idea, every touchpoint.', img:IMG.film, layout:'hero',
    text:'From the first concept to the final broadcast, we build campaigns that work as one connected story.',
    points:['Advertisement creation','Personal promotion','Company promotion','Integrated brand promotion'] },
  { id:'electronic', n:'02', title:'Electronic Media', short:'Television & broadcast.', img:IMG.cinema, layout:'left',
    text:'Prime-time reach with spots planned for the audience that matters.', points:['Television advertisements','Broadcast promotions'] },
  { id:'print', n:'03', title:'Print Media', short:'Newspapers & print campaigns.', img:IMG.news, layout:'right',
    text:'Credibility you can hold. Strategic placements across the press.', points:['Newspaper advertisements','Print campaigns'] },
  { id:'digital', n:'04', title:'Digital Media', short:'Online brand promotion.', img:IMG.digital, layout:'full',
    text:'Targeted, measurable visibility across the platforms where your audience spends time.', points:['Digital advertising','Online brand promotions'] },
  { id:'fm', n:'05', title:'FM Advertising', short:'Radio & audio promotion.', img:IMG.mic, layout:'left',
    text:'Voices that stay with people on their daily commute.', points:['Radio advertisements','Audio promotions'] },
]
export const WHY = [['Strategic thinking','Every campaign starts with an audience, a goal and a plan.'],['Creative execution','Ideas that are crafted, not just produced.'],['Media expertise','Deep knowledge across TV, print, digital and FM.'],['Brand visibility','Presence that builds trust and credibility.']]
export const STEPS = [['Discover','We learn your brand, market and audience.'],['Strategize','We shape the message and the media mix.'],['Create','We produce the work with craft.'],['Execute','We launch, place and optimise.']]

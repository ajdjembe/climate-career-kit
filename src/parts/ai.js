/* ---------- AI lab: everything opens in the visitor's own Claude or ChatGPT ---------- */
const WHO = EDITION==="ie"
  ? "I'm a student on IE University's Master in Sustainability and Business Transformation (MSBT) in Madrid."
  : "I'm moving into a climate or sustainability career.";
const METHOD = "Use this method from my career advisor: map sectors with Project Drawdown from broad bucket to subsector, niche and value-chain role (e.g. energy > solar > rooftop solar > financing), ending with 5-7 subsectors; list 15-20 target companies per subsector; use job descriptions to find skill gaps; network through climate communities (Terra.do, Work on Climate, inClimate) and meetups like Climate Coffee; graduate and UN programmes open Oct-Dec; expect ~100 applications and favour referrals over Easy Apply.";
const RULES = "Plain language, direct, no hype. Never invent facts about specific companies; tell me what to verify.";
const MAXQ = 1900;

const PARTNERS=[
 {g:"Explore",t:"Career path coach",d:"Questions you until your direction is clearer.",
  p:`${WHO} Be my career path coach. ${METHOD}

Coach me Socratically: ask ONE question at a time, keep replies short, and don't give long lists until you understand my background, strengths, interests, target countries and constraints (visa, money, timing). Challenge vague answers. Every few turns, summarise what you've learned and suggest one concrete next step. ${RULES}

Start by asking what I did before and what I enjoyed most about it.`},
 {g:"Explore",t:"Sector drill-down",d:"Takes one broad interest all the way down to companies.",
  p:`${WHO} Help me drill one broad climate interest down to a specific niche. ${METHOD}

Work level by level: offer 3-5 subsectors and let me choose, then 3-5 niches, then the parts of the value chain (e.g. rooftop solar: design, sales, installation/EPC, maintenance, financing, software). At each level ask which fits and why. At the end, suggest example companies in my target countries and remind me to verify each. ${RULES}

Start by asking for my broad interest and target countries.`},
 {g:"Apply",t:"CV and job match",d:"Gap check between your CV and a job description.",
  p:`${WHO} Compare my CV with a job description I'm targeting. ${METHOD}

Once you have both: (1) list the 6-8 requirements that matter most; (2) mark each match / partial / missing with evidence from my CV; (3) list keywords from the job description missing from my CV; (4) rewrite 3 CV bullets using only facts I gave you, asking me for numbers rather than inventing them; (5) one line on whether to apply now or close gaps first. ${RULES}

Start by asking me to paste the job description, then my CV.`},
 {g:"Apply",t:"Story coach",d:"Builds your 'why climate, why me' narrative.",
  p:`${WHO} Help me build a credible career-change story: a 60-second "tell me about yourself", plus short answers to "why climate?" and "why this company?". ${METHOD}

Ask ONE question at a time to find a concrete turning point, my transferable skills and evidence of commitment (courses, projects, communities). After 4-6 exchanges, draft the 60-second version in a natural spoken voice, then ask what feels off and revise. Push back on clichés like "I've always been passionate about the planet". ${RULES}

Start by asking what I did before and what first made me want to work on climate.`},
 {g:"Apply",t:"Outreach coach",d:"Drafts and sharpens networking messages.",
  p:`${WHO} Help me write networking messages for my climate job search: LinkedIn notes (under 300 characters), community intro posts, messages to people who posted a job, follow-ups and thank-yous. ${METHOD}

First find out who I'm writing to and the one thing I want from them. Keep drafts short, specific and human, with one small ask (usually a 15-minute call). If I paste my own draft, critique it briefly and offer a tighter version. ${RULES}

Start by asking who I want to reach and why.`},
 {g:"Interview and decide",t:"Mock interviewer",d:"Practise for a specific role, with feedback.",
  p:`${WHO} Run a mock interview with me as the hiring manager for a climate or sustainability role. ${METHOD}

Ask ONE question at a time, mixing motivation, competency (STAR) and at least one question on the subsector's current market challenges. After each answer give brief feedback (what worked, what to add, a stronger outline), then the next question. After 6 questions give an overall assessment and my top three improvements. Realistic but encouraging. ${RULES}

Start by asking for the job description (or company and role) and a few lines about my background.`},
 {g:"Interview and decide",t:"Decision coach",d:"Weighs offers, internships or next steps.",
  p:`${WHO} Help me think through a career decision (competing offers, internship versus full-time, which country to target). ${METHOD}

First ask what matters most to me now and my hard constraints (visa, money, timing, family). Then compare the options on: what I'd learn, who I'd work with, where each leads in 18-24 months, money and visa implications, and risk. Suggest how to buy time politely if offers clash, and the questions to ask each employer. Don't decide for me; end with what would tip the balance. ${RULES}

Start by asking me to describe the options and any deadline.`}
];

const PROMPTS=[
 {w:"Step 1 · Map",t:"Build a company long-list",d:"15-20 companies per niche to start tracking.",
  p:`${WHO} Help me build a long-list of 15-20 companies in one climate niche in my target countries. Mix large corporates, scale-ups (Series A or later) and smaller specialists. For each: name, country, what they do in one line, approximate size or funding stage, and whether they run a graduate programme if you know. Mark anything you're unsure about; I'll verify every company. ${RULES}

Start by asking for the niche and the countries.`},
 {w:"Step 2 · Learn",t:"Find my skill gaps",d:"Compares several job descriptions with your CV.",
  p:`${WHO} Help me find my skill gaps. I'll paste 3-5 job descriptions I'm targeting, then my CV. Then: (1) list the skills, tools and certifications that appear in at least two job descriptions; (2) make a table: requirement | have it / partly / missing | evidence from my CV; (3) for each gap, suggest how to close it in the next 6-9 months (a course, project, volunteering or side work). ${RULES}

Start by asking me to paste the job descriptions.`},
 {w:"Step 3 · Connect",t:"Write my community intro",d:"Background, target role, one specific ask.",
  p:`${WHO} Write a short introduction post for a climate Slack or WhatsApp community (under 90 words): who I am and my background, the role and subsector I'm exploring, and one specific ask. Friendly and direct, no buzzwords, no exclamation marks. Give me two versions.

Start by asking about my background, what I'm exploring, and my ask.`},
 {w:"Step 3 · Connect",t:"Message someone who posted a job",d:"Before you apply, not after.",
  p:`${WHO} Someone in a climate community posted a job I want. Draft a short direct message to them (under 120 words): why I fit, in two concrete points from my background, and a request for a 15-minute call before I apply. Don't oversell.

Start by asking me to paste the post or job description and a summary of my background.`},
 {w:"Step 3 · Connect",t:"Prepare an informational interview",d:"Research brief plus good questions.",
  p:`${WHO} I have a 20-minute informational call coming up. Give me: (1) a 5-line brief on the person's company and subsector (mark what I should verify); (2) 8 thoughtful questions, starting broad and ending with "Who else should I speak to?"; (3) a two-sentence way to introduce myself.

Start by asking who I'm meeting (name, role, company) and what I know about them.`},
 {w:"Step 4 · Apply",t:"Tailor my CV to a job",d:"Better keywords and bullets, no invented experience.",
  p:`${WHO} Rewrite my most relevant CV bullets to match a job description and pass applicant tracking systems. Don't invent experience or numbers; ask me for figures where a bullet would be stronger. Lead each bullet with an action and end with a result.

Start by asking me to paste the job description, then my CV.`},
 {w:"Step 4 · Apply",t:"Critique my cover letter",d:"Shorter, more specific, more convincing.",
  p:`${WHO} Critique my cover letter as a tough hiring manager in the relevant subsector. Point out long sentences, vague claims and generic phrases. Then suggest edits that use specific examples with measurable outcomes, keep paragraphs short, and present what I say about the company as my own research-based view rather than as fact.

Start by asking me to paste the cover letter and the job description.`},
 {w:"Step 4 · Apply",t:"Compare two offers",d:"Where does each role lead in 18-24 months?",
  p:`${WHO} Help me compare two job offers. First ask what matters most to me right now. Then compare: what I'd learn, who I'd work with, where each could realistically lead in 18-24 months, salary and visa implications, and risk. End with the questions I should ask each employer before deciding.

Start by asking me to describe both offers.`}
];

function withCtx(p,ctx){ctx=(ctx||"").trim();return ctx?p+"\n\nContext from me: "+ctx:p}
function links(text){
  const q=encodeURIComponent(text);
  return {claude:"https://claude.ai/new?q="+q,gpt:"https://chatgpt.com/?q="+q,tooLong:text.length>MAXQ};
}
async function copyText(text,btn,fallbackEl){
  try{await navigator.clipboard.writeText(text);btn.textContent="Copied"}
  catch(e){if(fallbackEl){fallbackEl.closest("details")&&(fallbackEl.closest("details").open=true);const r=document.createRange();r.selectNodeContents(fallbackEl);const s=getSelection();s.removeAllRanges();s.addRange(r)}btn.textContent="Selected: press Ctrl+C"}
  setTimeout(()=>btn.textContent="Copy",2200);
}
function aiCard(x,{label,ctx}){
  const pre=h("pre",{},x.p);
  const det=h("details",{},h("summary",{},"See the full prompt"),pre);
  const ta=ctx?h("textarea",{rows:"2","aria-label":"Optional context for "+x.t,placeholder:"Optional: e.g. targeting ESG analyst roles in the Netherlands"}):null;
  const aC=h("a",{class:"btn sm",target:"_blank",rel:"noopener",href:"#"},"Open in Claude");
  const aG=h("a",{class:"btn sm ghost",target:"_blank",rel:"noopener",href:"#"},"Open in ChatGPT");
  const cp=h("button",{class:"btn sm ghost",type:"button"},"Copy");
  const note=h("p",{hidden:true,style:"font-size:.8rem"},"Your context makes this too long for a link. Use Copy and paste it into a new chat.");
  const refresh=()=>{const text=withCtx(x.p,ta&&ta.value),l=links(text);aC.href=l.claude;aG.href=l.gpt;note.hidden=!l.tooLong;[aC,aG].forEach(a=>a.style.display=l.tooLong?"none":"")};
  if(ta)ta.addEventListener("input",refresh);
  cp.addEventListener("click",()=>copyText(withCtx(x.p,ta&&ta.value),cp,pre));
  refresh();
  return h("div",{class:"pcard"},label?h("span",{class:"when"},label):null,h("h3",{},x.t),h("p",{},x.d),ta,det,note,h("div",{class:"row"},aC,aG,cp));
}
const pBox=$("#partners");let lastG="",grid=null;
PARTNERS.forEach(x=>{if(x.g!==lastG){pBox.append(h("div",{class:"grp-h"},x.g));grid=h("div",{class:"prompts"});pBox.append(grid);lastG=x.g}grid.append(aiCard(x,{ctx:true}))});
const qBox=$("#prompts");PROMPTS.forEach(x=>qBox.append(aiCard(x,{label:x.w})));

/* ---------- tabs ---------- */
$$(".tabs button").forEach(b=>b.addEventListener("click",()=>{
  $$(".tabs button").forEach(x=>x.setAttribute("aria-selected",x===b?"true":"false"));
  $$("[data-panel]").forEach(p=>p.hidden=p.dataset.panel!==b.dataset.tab);
}));

/* ---------- suggestion form (Netlify Forms, emailed to Arjun) ---------- */
$("#sg").addEventListener("submit",async e=>{
  e.preventDefault();
  const f=e.target,err=$("#sgerr");err.hidden=true;$("#sgok").hidden=true;$("#sg-btn").disabled=true;
  try{
    const res=await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(new FormData(f)).toString()});
    if(!res.ok)throw new Error(res.status);
    $("#sgok").hidden=false;f.reset();
  }catch(x){err.textContent="That didn't go through. Please try again in a minute.";err.hidden=false}
  finally{$("#sg-btn").disabled=false}
});
})();
</script>

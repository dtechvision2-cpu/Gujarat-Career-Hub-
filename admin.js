document.addEventListener("DOMContentLoaded",()=>{
 // DEMO-ONLY credentials: change these two values before testing.
 // Frontend-only credentials are visible in source code and are NOT secure for a public website.
 const ADMIN_ID = "admin";
 const ADMIN_PASSWORD = "Gch@2026";
 const loginShell = document.getElementById("adminLogin");
 const workspace = document.getElementById("adminWorkspace");
 const loginForm = document.getElementById("adminLoginForm");
 const loginError = document.getElementById("loginError");
 const logoutBtn = document.getElementById("adminLogout");
 const showWorkspace = () => {
   if (loginShell) loginShell.classList.add("hidden");
   if (workspace) workspace.classList.remove("hidden");
   if (logoutBtn) logoutBtn.classList.remove("hidden");
 };
 const showLogin = () => {
   if (loginShell) loginShell.classList.remove("hidden");
   if (workspace) workspace.classList.add("hidden");
   if (logoutBtn) logoutBtn.classList.add("hidden");
 };
 // Keep this demo login only for the current tab; it is not server-side authentication.
 if (sessionStorage.getItem("gch_admin_logged_in") === "yes") showWorkspace();
 else showLogin();
 loginForm?.addEventListener("submit", (e) => {
   e.preventDefault();
   const form = new FormData(loginForm);
   const enteredId = String(form.get("adminId") || "");
   const enteredPassword = String(form.get("adminPassword") || "");
   if (enteredId === ADMIN_ID && enteredPassword === ADMIN_PASSWORD) {
     sessionStorage.setItem("gch_admin_logged_in", "yes");
     loginError?.classList.add("hidden");
     showWorkspace();
   } else {
     loginError?.classList.remove("hidden");
   }
 });
 logoutBtn?.addEventListener("click", () => {
   sessionStorage.removeItem("gch_admin_logged_in");
   showLogin();
   loginForm?.reset();
 });
 const KEY={jobs:"gch_jobs_v1",quiz:"gch_quiz_v1",materials:"gch_materials_v1"};
 const SAMPLE={jobs:[{id:"j1",title:"Junior Clerk — Sample Listing",department:"Example Department",category:"Clerk",qualification:"Graduate (sample)",lastDate:"",url:"https://ojas.gujarat.gov.in/",description:"DEMO CONTENT: Replace this sample with a verified official recruitment notification."},{id:"j2",title:"Police Recruitment — Sample Listing",department:"Example Police Department",category:"Police",qualification:"As per official notice",lastDate:"",url:"https://ojas.gujarat.gov.in/",description:"DEMO CONTENT: Check the official notification for eligibility, dates and application steps."},{id:"j3",title:"Teaching Vacancy — Sample Listing",department:"Example Education Department",category:"Teaching",qualification:"As per official notice",lastDate:"",url:"https://ojas.gujarat.gov.in/",description:"DEMO CONTENT: This is a placeholder, not a live vacancy announcement."}],quiz:[{id:"q1",question:"Which is the capital of Gujarat?",topic:"Gujarat GK",options:["Surat","Ahmedabad","Gandhinagar","Rajkot"],answer:2,explanation:"Gandhinagar is the capital of Gujarat."},{id:"q2",question:"What does HTML stand for?",topic:"Computer Knowledge",options:["HyperText Markup Language","HighText Machine Language","Hyper Transfer Main Link","Home Tool Markup Language"],answer:0,explanation:"HTML stands for HyperText Markup Language."},{id:"q3",question:"Which body conducts the Civil Services Examination in India?",topic:"General Knowledge",options:["SSC","UPSC","RBI","NTA"],answer:1,explanation:"The Union Public Service Commission conducts the Civil Services Examination."}],materials:[{id:"m1",title:"Gujarat GK — Sample Resource",category:"General",type:"Practice Paper",description:"Demo resource card. Replace this with your own verified PDF link.",url:"https://ojas.gujarat.gov.in/"},{id:"m2",title:"Competitive Exam Practice — Sample",category:"GPSC",type:"Mock Test",description:"Add a PDF link or a trusted online resource in Admin Panel.",url:"https://gpsc.gujarat.gov.in/"},{id:"m3",title:"Clerk Exam Preparation — Sample",category:"Junior Clerk",type:"PDF Notes",description:"Placeholder only; no downloadable file is included.",url:"https://ojas.gujarat.gov.in/"}]};
 const get=(type)=>{try{const x=localStorage.getItem(KEY[type]);return x?JSON.parse(x):SAMPLE[type].map(v=>({...v}));}catch(e){return SAMPLE[type].map(v=>({...v}));}};
 const save=(type,data)=>localStorage.setItem(KEY[type],JSON.stringify(data));
 const id=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
 const msg=(s)=>{const el=document.getElementById("adminMessage");if(el)el.textContent=s;};
 document.querySelectorAll(".tab-btn").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".tab-btn").forEach(b=>b.classList.toggle("active",b===btn));document.querySelectorAll(".admin-panel").forEach(p=>p.classList.toggle("hidden",p.id!==btn.dataset.tab));if(btn.dataset.tab==="manageTab")renderManage();}));
 document.getElementById("jobForm")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);const data=get("jobs");data.unshift({id:id(),title:f.get("title").trim(),department:f.get("department").trim(),category:f.get("category"),qualification:f.get("qualification").trim(),lastDate:f.get("lastDate"),url:f.get("url").trim(),description:f.get("description").trim()});save("jobs",data);e.currentTarget.reset();msg("Job added in this browser. Open Job Updates to check it.");});
 document.getElementById("quizForm")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);const data=get("quiz");data.push({id:id(),question:f.get("question").trim(),topic:f.get("topic").trim()||"General",options:[f.get("a").trim(),f.get("b").trim(),f.get("c").trim(),f.get("d").trim()],answer:Number(f.get("answer")),explanation:f.get("explanation").trim()});save("quiz",data);e.currentTarget.reset();msg("Quiz question added in this browser. Open Daily Quiz to test it.");});
 document.getElementById("materialForm")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);const data=get("materials");data.unshift({id:id(),title:f.get("title").trim(),category:f.get("category"),type:f.get("type"),description:f.get("description").trim(),url:f.get("url").trim()});save("materials",data);e.currentTarget.reset();msg("Study material added in this browser. Open Study Materials to check it.");});
 window.removeItem=(type,itemId)=>{save(type,get(type).filter(x=>x.id!==itemId));renderManage();msg("Item removed from this browser.");};
 function renderManage(){const el=document.getElementById("manageContent");if(!el)return;const labels={jobs:"Jobs",quiz:"Quiz questions",materials:"Study materials"};el.innerHTML=Object.keys(KEY).map(type=>`<h3>${labels[type]}</h3>`+get(type).map(item=>`<div class="manage-row"><span>${esc(item.title||item.question||"Quiz question")}</span><button class="delete-btn" type="button" onclick="removeItem('${type}','${item.id}')">Delete</button></div>`).join("")||"<p>No content yet.</p>").join("");}
 document.getElementById("resetData")?.addEventListener("click",()=>{if(!confirm("Reset jobs, quiz and materials to the original sample content in this browser?"))return;Object.keys(KEY).forEach(t=>localStorage.removeItem(KEY[t]));renderManage();msg("Local content reset to sample data.");});
 function esc(v=""){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
});
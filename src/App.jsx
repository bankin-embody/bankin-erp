import React, { useState, useEffect, useRef, useCallback } from "react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{
      --bl:#007AFF;--bld:#0055CC;--gr:#34C759;--re:#FF3B30;--or:#FF9500;--pu:#AF52DE;
      --bg:#F2F2F7;--bg2:#fff;--grp:#EFEFF4;
      --lb:#000;--lb2:rgba(60,60,67,.6);--lb3:rgba(60,60,67,.3);
      --sep:rgba(60,60,67,.12);--fi:rgba(120,120,128,.12);--fi2:rgba(120,120,128,.08);
      --r:18px;--sh:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.04);
      --sh2:0 4px 16px rgba(0,0,0,.10);
      --tr:.2s cubic-bezier(.4,0,.2,1);
      --f:'Noto Sans JP',-apple-system,BlinkMacSystemFont,sans-serif;
    }
    html,body{height:100%;background:var(--bg);font-family:var(--f);color:var(--lb);-webkit-font-smoothing:antialiased;}
    #root{height:100%;}
    ::-webkit-scrollbar{width:5px;height:5px;}
    ::-webkit-scrollbar-thumb{background:var(--lb3);border-radius:3px;}
    @keyframes fU{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fI{from{opacity:0}to{opacity:1}}
    @keyframes sI{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
    .fu{animation:fU .35s var(--tr) both;} .si{animation:sI .28s var(--tr) both;}
    .card{background:var(--bg2);border-radius:var(--r);box-shadow:var(--sh);padding:18px;transition:box-shadow var(--tr);}
    .card:hover{box-shadow:var(--sh2);}
    .lst{background:var(--bg2);border-radius:var(--r);overflow:hidden;}
    .li{padding:12px 15px;display:flex;align-items:center;gap:11px;border-bottom:1px solid var(--sep);cursor:pointer;transition:background var(--tr);}
    .li:last-child{border-bottom:none;} .li:hover{background:var(--fi2);}
    .btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:9px 17px;border-radius:11px;font-size:14px;font-weight:600;cursor:pointer;border:none;transition:all var(--tr);white-space:nowrap;font-family:var(--f);}
    .btn:active{transform:scale(.97);}
    .bp{background:var(--bl);color:#fff;} .bp:hover{background:var(--bld);}
    .bs{background:var(--fi);color:var(--bl);}
    .bd{background:rgba(255,59,48,.12);color:var(--re);}
    .bg{background:rgba(52,199,89,.12);color:#1a8f3a;}
    .bo{background:rgba(255,149,0,.12);color:var(--or);}
    .bsm{padding:5px 12px;font-size:12px;border-radius:8px;}
    .bdg{display:inline-flex;align-items:center;padding:2px 8px;border-radius:16px;font-size:11px;font-weight:700;white-space:nowrap;}
    .dbl{background:rgba(0,122,255,.12);color:var(--bl);}
    .dgr{background:rgba(52,199,89,.14);color:#1a8f3a;}
    .drd{background:rgba(255,59,48,.12);color:var(--re);}
    .dor{background:rgba(255,149,0,.14);color:#b36500;}
    .dgy{background:var(--fi);color:var(--lb2);}
    .inp{width:100%;padding:11px 13px;border-radius:10px;border:1.5px solid var(--sep);background:var(--bg2);font-size:15px;font-family:var(--f);color:var(--lb);outline:none;transition:border-color var(--tr),box-shadow var(--tr);}
    .inp:focus{border-color:var(--bl);box-shadow:0 0 0 3px rgba(0,122,255,.13);}
    .sel{width:100%;padding:11px 13px;border-radius:10px;border:1.5px solid var(--sep);background:var(--bg2);font-size:15px;font-family:var(--f);color:var(--lb);outline:none;appearance:none;cursor:pointer;}
    .sel:focus{border-color:var(--bl);box-shadow:0 0 0 3px rgba(0,122,255,.13);}
    .fl{font-size:12px;font-weight:700;color:var(--lb2);margin-bottom:5px;}
    .mbg{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);z-index:1000;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;animation:fI .18s ease both;}
    @media(min-width:600px){.mbg{justify-content:center;}}
    .mbg.tall{align-items:stretch!important;}
    .msh{background:var(--bg2);width:100%;max-width:660px;border-radius:22px 22px 0 0;display:flex;flex-direction:column;animation:sI .28s var(--tr) both;max-height:94vh;overflow:hidden;}
    @media(min-width:600px){.msh{border-radius:22px;max-height:90vh;}}
    .msh.print-wide{max-width:820px!important;}
    .msh.tall{flex:1!important;max-height:none!important;}
    .mhd{width:36px;height:5px;background:var(--lb3);border-radius:3px;margin:10px auto 0;flex-shrink:0;}
    .mttl{font-size:15px;font-weight:700;padding:10px 12px;border-bottom:1px solid var(--sep);flex-shrink:0;display:flex;align-items:center;justify-content:flex-end;gap:6px;}
    .mttl .btn{padding:6px 14px;font-size:13px;border-radius:10px;font-weight:700;white-space:nowrap;}
    .mbdy{padding:16px 16px 20px;overflow-y:scroll;overflow-x:hidden;flex:1;min-height:0;-webkit-overflow-scrolling:touch;}
    .mft{display:none;}
    .seg{display:flex;background:var(--fi);border-radius:9px;padding:2px;gap:2px;}
    .st{flex:1;padding:6px 8px;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;text-align:center;transition:all var(--tr);border:none;background:transparent;color:var(--lb2);font-family:var(--f);}
    .st.on{background:var(--bg2);color:var(--lb);box-shadow:var(--sh);}
    .sb{width:252px;min-width:252px;background:var(--bg2);border-right:1px solid var(--sep);display:flex;flex-direction:column;height:100vh;position:sticky;top:0;}
    .sbl{padding:20px 17px 13px;border-bottom:1px solid var(--sep);}
    .sbl h1{font-size:18px;font-weight:800;color:var(--bl);}
    .sbl p{font-size:11px;color:var(--lb2);margin-top:2px;}
    .ns{font-size:10px;font-weight:700;color:var(--lb3);letter-spacing:.8px;text-transform:uppercase;padding:13px 17px 5px;}
    .ni{display:flex;align-items:center;gap:10px;padding:9px 13px;margin:1px 6px;border-radius:10px;cursor:pointer;transition:all var(--tr);color:var(--lb);font-size:13px;font-weight:500;}
    .ni:hover{background:var(--fi2);} .ni.on{background:rgba(0,122,255,.11);color:var(--bl);font-weight:700;}
    .nic{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
    .nb{margin-left:auto;background:var(--re);color:#fff;font-size:10px;font-weight:700;border-radius:9px;padding:1px 6px;}
    .bn{position:fixed;bottom:0;left:0;right:0;background:rgba(255,255,255,.92);backdrop-filter:blur(20px) saturate(180%);border-top:1px solid var(--sep);display:flex;padding:5px 0 env(safe-area-inset-bottom,10px);z-index:90;}
    .bi{display:flex;flex-direction:column;align-items:center;gap:2px;padding:3px 5px;cursor:pointer;flex:1;color:var(--lb3);transition:color var(--tr);}
    .bi.on{color:var(--bl);}
    .sc{border-radius:var(--r);padding:15px 17px;color:#fff;position:relative;overflow:hidden;}
    .sc::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.15),transparent 60%);}
    .app{display:flex;height:100vh;overflow:hidden;}
    .mn{flex:1;overflow-y:auto;padding-bottom:75px;}
    @media(min-width:768px){.mn{padding-bottom:14px;}.bn{display:none;}}
    @media(max-width:767px){.sb{display:none;}}
    .pw{padding:16px 13px;max-width:1100px;margin:0 auto;}
    @media(min-width:768px){.pw{padding:24px 24px;}}
    .th{display:flex;align-items:center;justify-content:space-between;padding:13px;background:rgba(255,255,255,.92);backdrop-filter:blur(20px) saturate(180%);border-bottom:1px solid var(--sep);position:sticky;top:0;z-index:50;}
    @media(min-width:768px){.th{display:none;}}
    .g2{display:grid;grid-template-columns:1fr 1fr;gap:11px;}
    .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:11px;}
    .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:11px;}
    @media(max-width:700px){.g4{grid-template-columns:1fr 1fr;}.g3{grid-template-columns:1fr 1fr;}}
    @media(max-width:480px){.g2{grid-template-columns:1fr;}}
    .stk{display:flex;flex-direction:column;gap:12px;}
    .row{display:flex;align-items:center;gap:8px;}
    .rb{display:flex;align-items:center;justify-content:space-between;}
    .mt4{margin-top:4px;}.mt8{margin-top:8px;}.mt12{margin-top:12px;}
    .mb4{margin-bottom:4px;}.mb8{margin-bottom:8px;}.mb12{margin-bottom:12px;}
    .sm{font-size:13px;}.xs{font-size:11px;}.lg{font-size:17px;}
    .b7{font-weight:700;}.b6{font-weight:600;}
    .cbl{color:var(--bl);}.cgr{color:var(--gr);}.cre{color:var(--re);}.cmu{color:var(--lb2);}
    .trn{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .fr{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--sep);}
    .fr:last-child{border-bottom:none;}
    .tbl{width:100%;border-collapse:collapse;}
    .tbl th{font-size:11px;font-weight:700;color:var(--lb2);padding:8px 11px;text-align:left;background:var(--grp);border-bottom:1px solid var(--sep);}
    .tbl td{padding:10px 11px;font-size:13px;border-bottom:1px solid var(--sep);}
    .tbl tr:last-child td{border-bottom:none;}
    .tbl tr:hover td{background:var(--fi2);}
    @media print{
      @page{margin:10mm;size:A4;}
      @page{margin-top:10mm;margin-bottom:10mm;}
      html,body{margin:0;padding:0;}
      @page{size:A4 portrait;margin:15mm 12mm;}
      *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
      .np{display:none!important;}
      body{background:#fff!important;}
      .card,.lst{box-shadow:none!important;}
      .mbg{position:static!important;background:none!important;backdrop-filter:none!important;display:block!important;padding:0!important;}
      .msh{max-height:none!important;height:auto!important;overflow:visible!important;border-radius:0!important;animation:none!important;width:100%!important;max-width:100%!important;box-shadow:none!important;}
      .mhd,.mttl{display:none!important;}
      .mbdy{overflow:visible!important;padding:0!important;flex:none!important;}
      #print-area{display:block!important;}
      .tbl,table{page-break-inside:auto;border-collapse:collapse;width:100%;}
      .tbl tr,tr{page-break-inside:avoid;}
    }
  `}</style>
);

// ── Constants ─────────────────────────────────────────────
// 自賠責保険料（令和5年4月1日以降）月数→金額
const JIBAISEKI={
  "自家用乗用（普通・小型）": {12:11500,13:12010,24:17650,25:18160,36:23690,37:24190},
  "軽自動車（検査対象）":     {12:11440,13:11950,24:17540,25:18040,36:23520,37:24010},
  "普通貨物・自家用2t超":    {12:18230,13:19290,24:30980,25:32030},
  "普通貨物・自家用2t以下":  {12:16900,13:17860,24:28370,25:29300},
  "普通貨物・営業用2t超":    {12:24100,13:25640,24:42610,25:44130},
  "普通貨物・営業用2t以下":  {12:17790,13:18810,24:30110,25:31120},
  "小型貨物・自家用":         {12:12850,13:13480,24:20340,25:20950},
  "小型貨物・営業用":         {12:15830,13:16700,24:26240,25:27090},
  "小型二輪250cc超":          {12:7010, 13:7150, 24:8760, 25:8910, 36:10490,37:10630},
};
// 車両区分グループ（UI用）
const CAR_TYPE_GROUPS=[
  {label:"乗用車",types:["自家用乗用（普通・小型）","軽自動車（検査対象）"]},
  {label:"普通貨物",types:["普通貨物・自家用2t超","普通貨物・自家用2t以下","普通貨物・営業用2t超","普通貨物・営業用2t以下"]},
  {label:"小型貨物",types:["小型貨物・自家用","小型貨物・営業用"]},
  {label:"二輪",types:["小型二輪250cc超"]},
];
const CAR_TYPES=Object.keys(JIBAISEKI);
const JURYOZEI={0.5:8200,1.0:16400,1.5:24600,2.0:32800,2.5:41000,3.0:49200,3.5:57400,4.0:65600};
const WEIGHTS=[0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0];
const EXP_CAT=[
  // 売上原価・材料
  "材料費","塗料・塗装材料費","部品・パーツ代","外注費・下請費",
  // 労務・人件費
  "給与・賃金","法定福利費","福利厚生費",
  // 経費
  "消耗品費","工具・器具費","修繕費","車両費","ガソリン代","駐車場代",
  "地代家賃","水道光熱費","通信費","広告宣伝費","接待交際費",
  "旅費交通費","新聞図書費","保険料","租税公課","減価償却費","雑費"
];
const KAMOKU={"材料費":"売上原価（仕入）","消耗品費":"消耗品費","光熱費":"水道光熱費","工具費":"工具・器具・備品","外注費":"外注工賃","交通費":"旅費交通費","広告費":"広告宣伝費","通信費":"通信費","その他":"雑費"};

const calcJibaiseki=(t,m=24)=>{const tbl=JIBAISEKI[t]||JIBAISEKI["自家用乗用（普通・小型）"];return tbl[m]||tbl[24]||17650;};
const calcJuryozei=w=>JURYOZEI[Math.ceil(Number(w)/0.5)*0.5]||16400;
const calcGovFees=s=>(s.jibaiseki||0)+(s.juryozei||0)+(s.kensaShomei||1450)+(s.gijutsuKanri||400);
const calcDaiko=(d,t)=>Math.floor((d||0)*(1+(t||0.1)));
const calcItems=(items,tax)=>{const sub=items.reduce((s,i)=>s+(i.qty*(i.unit||0))+(i.gijutsu||0),0);return{sub,taxAmt:Math.floor(sub*tax),total:Math.floor(sub*(1+tax))};};
const invTotal=(inv,st)=>{
  const{total}=calcItems(inv.items,inv.tax);
  if(inv.type!=="shakken")return total;
  return total+calcGovFees(inv.shakken||{})+calcDaiko(inv.shakken?.daiko??st.daiko,inv.shakken?.daikoTax??st.daikoTax);
};
const fmt=n=>`¥${Number(n||0).toLocaleString()}`;
const today=()=>new Date().toISOString().split("T")[0];
const nextId=arr=>{const ns=arr.map(x=>parseInt(String(x.id||0).replace(/\D/g,""))||0);return ns.length?Math.max(...ns)+1:1;};
const fullName=c=>c?`${c.lastName||""}${c.firstName?" "+c.firstName:""}`.trim()||"—":"—";
const yr=d=>new Date(d).getFullYear();
const mo=d=>new Date(d).getMonth()+1;

// ── Default Settings ───────────────────────────────────────
const DEF_UNIT_LIST=["式","個","本","枚","セット","台","ヶ所","回","時間","m","L"];
const DEF_SETTINGS={
  shopName:"鈴木鈑金塗装",shopAddress:"〒000-0000 東京都○○区○○1-2-3",
  shopTel:"03-0000-0000",shopFax:"",shopEmail:"info@suzuki-bankin.co.jp",
  invoiceNo:"T1234567890123",
  bankName:"○○銀行",bankBranch:"○○支店",bankType:"普通",bankNo:"1234567",bankHolder:"スズキバンキントソウ",
  kensaShomei:1450,gijutsuKanri:400,daiko:10000,daikoTax:0.1,gaiChuDaiko:7000,gaiChuDaikoTax:0.1,
  unitList:DEF_UNIT_LIST,
  workMaster:[
    {id:1,desc:"バンパー修理・塗装",unit:"式",partsCost:0,gijutsu:0},
    {id:2,desc:"フェンダー修理・塗装",unit:"式",partsCost:0,gijutsu:0},
    {id:3,desc:"ドア修理・塗装",unit:"式",partsCost:0,gijutsu:0},
    {id:4,desc:"塗装一式",unit:"式",partsCost:0,gijutsu:0},
    {id:5,desc:"板金修理一式",unit:"式",partsCost:0,gijutsu:0},
  ],
};

// ── Initial Data ───────────────────────────────────────────
const IC=[
  {id:1,lastName:"田中",firstName:"太郎",phone:"090-1234-5678",email:"tanaka@example.com",address:"東京都渋谷区1-2-3",note:"常連客",
   vehicles:[{id:1,carName:"プリウス",plateNo:"品川300あ1234",chassisNo:"ZVW5012345",firstReg:"2019-04",carType:"乗用",weight:1.5}]},
  {id:2,lastName:"佐藤",firstName:"花子",phone:"080-9876-5432",email:"",address:"",note:"",
   vehicles:[{id:1,carName:"フィット",plateNo:"横浜500い5678",chassisNo:"GK5H23456",firstReg:"2021-08",carType:"乗用",weight:1.0}]},
  {id:3,lastName:"鈴木",firstName:"一郎",phone:"090-1111-2222",email:"suzuki@example.com",address:"埼玉県さいたま市7-8-9",note:"法人",
   vehicles:[{id:1,carName:"ハイエース",plateNo:"大宮100う9999",chassisNo:"TRH200K789",firstReg:"2018-03",carType:"貨物",weight:2.0}]},
];
const IQ=[{id:"1",customerId:1,date:"2026-05-15",items:[{desc:"フロントバンパー修理",qty:1,unit:45000},{desc:"塗装（パール）",qty:1,unit:28000}],tax:0.1,status:"承認済",note:""}];
const II=[
  {id:"1",type:"repair",customerId:1,vehicleId:1,date:"2026-05-01",dueDate:"2026-05-31",items:[{desc:"フェンダー修理一式",qty:1,unit:68000}],tax:0.1,status:"入金済",note:""},
  {id:"2",type:"shakken",customerId:2,vehicleId:1,date:"2026-05-08",dueDate:"2026-05-31",items:[{desc:"車検整備一式",qty:1,unit:45000}],tax:0.1,status:"未入金",note:"",
   shakken:{jibaiseki:17650,juryozei:16400,kensaShomei:1450,gijutsuKanri:400,daiko:10000,daikoTax:0.1}},
];
const IE=[
  {id:1,date:"2026-05-02",category:"材料費",desc:"鈑金塗料",amount:18000,receipt:true},
  {id:2,date:"2026-05-05",category:"消耗品費",desc:"研磨剤・ペーパー",amount:5400,receipt:true},
  {id:3,date:"2026-05-10",category:"光熱費",desc:"電気代",amount:22000,receipt:false},
];

const IW=[
  {id:1,customerId:1,vehicleId:1,date:"2026-05-01",title:"フェンダー修理",memo:"右フロントフェンダー凹み修理。パテ成形後塗装仕上げ。色合わせOK。",photos:[],tags:["鈑金","塗装"],status:"完了"},
  {id:2,customerId:2,vehicleId:1,date:"2026-05-08",title:"車検整備",memo:"タイヤ交換・ブレーキパッド交換・オイル交換実施。次回車検2028年5月。",photos:[],tags:["車検","整備"],status:"完了"},
];

// ── Storage (localStorage) ─────────────────────────────────
const DK="bankin_v4";
const loadDB=init=>{try{const r=localStorage.getItem(DK);if(r)return{...init,...JSON.parse(r)};}catch{}return init;};
const saveDB=db=>{try{localStorage.setItem(DK,JSON.stringify({...db,meta:{...db.meta,savedAt:new Date().toISOString()}}));}catch{}};
const doExport=db=>{
  const b=new Blob([JSON.stringify({...db,meta:{...db.meta,ex:new Date().toISOString()}},null,2)],{type:"application/json"});
  const u=URL.createObjectURL(b);const a=document.createElement("a");
  a.href=u;a.download=`bankin_${new Date().toISOString().slice(0,10).replace(/-/g,"")}.json`;a.click();URL.revokeObjectURL(u);
};
const doImport=f=>new Promise((res,rej)=>{const r=new FileReader();r.onload=e=>{try{res(JSON.parse(e.target.result))}catch{rej(new Error("JSON解析失敗"))}};r.onerror=()=>rej(new Error("読み込みエラー"));r.readAsText(f);});

// ── Supabase Sync Layer ────────────────────────────────────
const SB_KEY="bankin_supabase";
const getSbConf=()=>{try{const s=JSON.parse(localStorage.getItem(SB_KEY)||"{}");return{url:s.url||"https://txosxdjdicgalxhmwzqz.supabase.co",anonKey:s.anonKey||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4b3N4ZGpkaWNnYWx4aG13enF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MjQ0MzUsImV4cCI6MjA5NTQwMDQzNX0.Gp2YE-7_tmzqLsS-yP5ioGGu3jZ3vpwkiUJhbEFdVT8"};}catch{return{url:"https://txosxdjdicgalxhmwzqz.supabase.co",anonKey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4b3N4ZGpkaWNnYWx4aG13enF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MjQ0MzUsImV4cCI6MjA5NTQwMDQzNX0.Gp2YE-7_tmzqLsS-yP5ioGGu3jZ3vpwkiUJhbEFdVT8"};}};
const setSbConf=c=>localStorage.setItem(SB_KEY,JSON.stringify(c));

// Supabase REST helpers — no SDK, pure fetch
const sbFetch=async(conf,method,path,body)=>{
  const{url,anonKey}=conf;
  if(!url||!anonKey)throw new Error("Supabase未設定");
  const res=await fetch(`${url}/rest/v1/${path}`,{
    method,
    headers:{"Content-Type":"application/json","apikey":anonKey,"Authorization":`Bearer ${anonKey}`,"Prefer":"return=representation"},
    body:(body!=null&&method!=="GET")?JSON.stringify(body):undefined,
  });
  if(!res.ok){const t=await res.text();throw new Error(`${res.status}: ${t}`);}
  return res.status===204?null:res.json();
};

// テーブル名: bankin_data (row: id=1固定, data=jsonb)
const sbLoad=async conf=>{
  const rows=await sbFetch(conf,"GET","bankin_data?id=eq.1&select=data",null);
  return rows?.[0]?.data||null;
};
const sbSave=async(conf,db)=>{
  const payload={id:1,data:{...db,meta:{...db.meta,syncedAt:new Date().toISOString()}},updated_at:new Date().toISOString()};
  // try update first, then insert
  try{
    await sbFetch(conf,"PATCH","bankin_data?id=eq.1",{data:payload.data,updated_at:payload.updated_at});
  }catch{
    await sbFetch(conf,"POST","bankin_data",payload);
  }
};

// Supabase Realtime (websocket) — minimal implementation
let sbChannel=null;
const sbSubscribe=(conf,onUpdate)=>{
  if(!conf.url||!conf.anonKey)return ()=>{};
  // Supabase Realtime v2 websocket URL
  const wsUrl=conf.url.replace("https://","wss://").replace("http://","ws://")+"/realtime/v1/websocket?apikey="+conf.anonKey+"&vsn=1.0.0";
  let ws;let hb;
  const connect=()=>{
    try{
      ws=new WebSocket(wsUrl);
      ws.onopen=()=>{
        ws.send(JSON.stringify({topic:"realtime:public:bankin_data",event:"phx_join",payload:{},ref:"1"}));
        hb=setInterval(()=>ws.readyState===1&&ws.send(JSON.stringify({topic:"phoenix",event:"heartbeat",payload:{},ref:"hb"})),25000);
      };
      ws.onmessage=e=>{
        try{
          const msg=JSON.parse(e.data);
          if(msg.event==="postgres_changes"||msg.event==="*")onUpdate();
        }catch{}
      };
      ws.onclose=()=>{clearInterval(hb);setTimeout(connect,5000);}; // 再接続
      ws.onerror=()=>{ws.close();};
    }catch{}
  };
  connect();
  return()=>{clearInterval(hb);try{ws?.close();}catch{}};
};

// useSbSync hook — Appで使う
function useSbSync(db,setDb){
  const[syncState,setSyncState]=useState("idle"); // idle | ok | error | syncing
  const[syncMsg,setSyncMsg]=useState("");
  const conf=getSbConf();
  const enabled=!!(conf.url&&conf.anonKey);

  // 初回ロード
  useEffect(()=>{
    if(!enabled)return;
    setSyncState("syncing");
    sbLoad(conf).then(remote=>{
      if(remote){
        setDb(local=>({...local,...remote,meta:{...remote.meta,savedAt:new Date().toISOString()}}));
        setSyncState("ok");setSyncMsg("Supabaseから読み込み完了");
      }else{
        // 初回: localをpush
        sbSave(conf,db).then(()=>{setSyncState("ok");setSyncMsg("初回アップロード完了");}).catch(err=>{setSyncState("error");setSyncMsg(err.message);});
      }
    }).catch(err=>{setSyncState("error");setSyncMsg(err.message);});
  },[enabled]);

  // db変更時にsave (debounce 2s)
  const dbRef=useRef(db);
  useEffect(()=>{dbRef.current=db;},[db]);
  const timerRef=useRef(null);
  useEffect(()=>{
    if(!enabled)return;
    clearTimeout(timerRef.current);
    timerRef.current=setTimeout(()=>{
      setSyncState("syncing");
      sbSave(conf,dbRef.current).then(()=>{setSyncState("ok");setSyncMsg(new Date().toLocaleTimeString("ja-JP"));}).catch(err=>{setSyncState("error");setSyncMsg(err.message);});
    },2000);
    return()=>clearTimeout(timerRef.current);
  },[db,enabled]);

  // Realtime購読（一度だけ）
  useEffect(()=>{
    if(!enabled)return;
    const unsub=sbSubscribe(conf,()=>{
      sbLoad(conf).then(remote=>{
        if(remote)setDb(local=>({...local,...remote,meta:{...remote.meta,savedAt:new Date().toISOString()}}));
      }).catch(()=>{});
    });
    return unsub;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[enabled]);

  const manualSync=async()=>{
    if(!enabled)return;
    setSyncState("syncing");
    try{
      const remote=await sbLoad(conf);
      if(remote)setDb(local=>({...local,...remote}));
      await sbSave(conf,db);
      setSyncState("ok");setSyncMsg("同期完了 "+new Date().toLocaleTimeString("ja-JP"));
    }catch(err){setSyncState("error");setSyncMsg(err.message);}
  };

  return{syncState,syncMsg,enabled,manualSync};
}

// SQL for Supabase setup
const SETUP_SQL=`-- Supabase SQL Editorで実行してください
create table if not exists bankin_data (
  id integer primary key,
  data jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- Realtimeを有効化
alter publication supabase_realtime add table bankin_data;

-- RLS（Row Level Security）を無効化（社内利用のため）
alter table bankin_data disable row level security;`;

// ── Atoms ──────────────────────────────────────────────────
const Ico=({e,sz=17,bg})=><span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:sz+13,height:sz+13,borderRadius:(sz+13)*.28,background:bg,fontSize:sz,lineHeight:1,flexShrink:0}}>{e}</span>;
const Fld=({label,children,opt=false})=><div><div className="fl">{label}{opt&&<span style={{fontWeight:400,color:"var(--lb3)",marginLeft:3}}>任意</span>}</div>{children}</div>;
function Modal({title,children,footer,onClose,wide=false,tall=false}){
  useEffect(()=>{
    const h=e=>{if(e.key==="Escape")onClose();};
    document.addEventListener("keydown",h);
    const prev=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{
      document.removeEventListener("keydown",h);
      document.body.style.overflow=prev;
    };
  },[onClose]);
  return(
    <div className={`mbg${tall?" tall":""}`} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>      
      <div className={`msh si${tall?" tall":""}${wide?" print-wide":""}`} style={wide?{maxWidth:820}:{}}>
        <div className="mhd"/>
        <div className="mttl">
          <span style={{flex:1,fontSize:15,fontWeight:700}}>{title}</span>
          {footer&&<div style={{display:"flex",gap:6,flexShrink:0}}>{footer}</div>}
        </div>
        <div className="mbdy">{children}</div>
      </div>
    </div>
  );
}

// ── Print Document ─────────────────────────────────────────
// 書類種別ごとのカラーテーマ
const DOC_THEME={
  quote:    {accent:"#FF9500", light:"#FFF8EE", border:"rgba(255,149,0,.35)",   label:"見積書",    emoji:"📋"},
  invoice:  {accent:"#34C759", light:"#F0FFF4", border:"rgba(52,199,89,.35)",   label:"請求書",    emoji:"📄"},  // 車検・整備共通（車検=緑）
  repair:   {accent:"#007AFF", light:"#EFF6FF", border:"rgba(0,122,255,.35)",   label:"請求書",    emoji:"📄"},  // 整備=青
  delivery: {accent:"#5AC8FA", light:"#EFF9FF", border:"rgba(90,200,250,.35)",  label:"納品書",    emoji:"📦"},
  combined: {accent:"#FFD60A", light:"#FFFBE6", border:"rgba(255,214,10,.45)",  label:"合計請求書",emoji:"📑"},
};
function getDocTheme(type,doc){
  if(type==="invoice"&&doc?.type==="repair") return DOC_THEME.repair;
  return DOC_THEME[type]||DOC_THEME.invoice;
}

function PrintDoc({type,doc,customer,vehicle,settings,onClose}){
  const isS=doc.type==="shakken";
  const{sub,taxAmt,total:wT}=calcItems(doc.items||[],doc.tax||0.1);
  const gov=isS?calcGovFees(doc.shakken||{}):0;
  const daikoRaw=isS?(doc.shakken?.daiko??settings.daiko):0;
  const daikoTx=isS?(doc.shakken?.daikoTax??settings.daikoTax):0;
  const daikoWT=calcDaiko(daikoRaw,daikoTx);
  const grand=type==="combined"?(doc.combinedTotal||0):(wT+gov+daikoWT);
  const theme=getDocTheme(type,doc);
  const ttl=theme.label;
  const doPrint=()=>{
    const el=document.getElementById("print-area");
    if(!el)return;
    const w=window.open("","_blank","width=820,height=1100");
    if(!w)return;
    const fonts=`<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;
    const style=`<style>
*{box-sizing:border-box;margin:0;padding:0;}
@page{size:A4 portrait;margin:8mm 10mm;}
html,body{margin:0;padding:0;}
body{font-family:'Noto Sans JP',-apple-system,sans-serif;font-size:11px;color:#000;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.page{width:100%;page-break-after:always;position:relative;}
.page:last-child{page-break-after:auto;}
#print-area{border-radius:0!important;border:none!important;box-shadow:none!important;}
.detail-wrap{display:flex;flex-direction:column;}
.detail-table{width:100%;border-collapse:collapse;table-layout:fixed;}
.detail-table thead{display:table-header-group;}
.detail-table tbody tr{page-break-inside:avoid;}
.detail-table td,.detail-table th{padding:5px 7px;font-size:10px;border-bottom:1px solid #e0e0e0;text-align:left;overflow:hidden;}
.detail-spacer{border-left:1px solid #e0e0e0;border-right:1px solid #e0e0e0;}
.summary-block{page-break-inside:avoid;break-inside:avoid;page-break-before:avoid;break-before:avoid;}
.rb{display:flex;align-items:center;justify-content:space-between;}
.copy-label{position:absolute;top:6mm;right:10mm;font-size:13px;font-weight:800;color:#444;border:2px solid #444;padding:2px 10px;border-radius:4px;letter-spacing:2px;}
.mono *{color:#000!important;background:#fff!important;border-color:#999!important;}
</style>`;
    const colorPage=`<div class="page">${el.innerHTML}</div>`;
    const monoPage=`<div class="page mono">${el.innerHTML}<div class="copy-label">【控え】</div></div>`;
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8">${fonts}${style}</head><body>${colorPage}${monoPage}</body></html>`);
    w.document.close();
    w.onload=()=>{w.focus();w.print();};
  };
  return(
    <div className="stk fu">
      <div className="rb np">
        <div style={{fontSize:17,fontWeight:800}}>{theme.emoji} {ttl} 印刷プレビュー</div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          <button className="btn bp" onClick={doPrint}>🖨️ 印刷する（お客様用＋控え）</button>
          <button className="btn bs" onClick={onClose}>← 戻る</button>
        </div>
      </div>

      {/* 書類プレビュー本体 */}
      <div id="print-area" style={{background:"#fff",borderRadius:14,border:`2px solid ${theme.border}`,fontFamily:"var(--f)",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,.08)",fontSize:13,color:"#000"}}>

        {/* ━━ ヘッダー：タイトルバー ━━ */}
        <div style={{background:theme.accent,padding:"6px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{color:"#fff",fontSize:18,fontWeight:800,letterSpacing:2}}>{ttl}</div>
          <div style={{color:"rgba(255,255,255,.85)",fontSize:11,display:"flex",gap:18}}>
            <span>{doc.date||today()}</span>
            {doc.id&&<span>No. {String(doc.id).replace(/\D/g,"")}</span>}
          </div>
        </div>

        {/* ━━ 上段：左＝顧客情報、右＝会社情報 ━━ */}
        <div style={{display:"flex",gap:0,padding:"6px 16px 0",borderBottom:`1px solid ${theme.border}`}}>

          {/* 左：顧客名・車両・文面 */}
          <div style={{flex:1,paddingRight:16}}>
            <div style={{fontSize:18,fontWeight:800,marginBottom:6}}>{fullName(customer)} <span style={{fontSize:13,fontWeight:400}}>様</span></div>
            {vehicle&&<div style={{fontSize:11,color:"#555",marginBottom:4}}>
              車両番号: {vehicle.plateNo}　　車台番号: {vehicle.chassisNo}
            </div>}
            {/* 文面ボックス */}
            <div style={{border:"1px solid #ccc",borderRadius:5,padding:"5px 12px",marginTop:4,marginBottom:8,fontSize:11,lineHeight:1.6,background:"#fafafa",minHeight:60}}>
              <div>毎度お引き立てありがとうございます。</div>
              <div>下記の通りご請求申し上げます。</div>
              <div style={{marginTop:6}}>※恐れ入りますが振込手数料はお客様のご負担でお願いいたします。</div>
            </div>
          </div>

          {/* 右：会社情報＋ハンコ */}
          <div style={{width:240,textAlign:"right",paddingLeft:16,borderLeft:`1px solid ${theme.border}`}}>
            <div style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-start",gap:10,marginBottom:8}}>
              <div>
                <div style={{fontSize:15,fontWeight:800}}>{settings.shopName}</div>
                <div style={{fontSize:10,color:"#555",marginTop:3,lineHeight:1.7}}>
                  {settings.shopAddress&&<div>{settings.shopAddress.startsWith("〒")?settings.shopAddress:`〒${settings.shopAddress}`}</div>}
                  <div>TEL: {settings.shopTel}</div>
                  {settings.shopFax&&<div>FAX: {settings.shopFax}</div>}
                  {settings.invoiceNo&&<div>登録番号：{settings.invoiceNo}</div>}
                </div>
              </div>
              {/* 角印枠 */}
              <div style={{width:64,height:64,border:`2px solid ${theme.accent}`,borderRadius:3,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",opacity:.5}}>
                <span style={{fontSize:10,color:theme.accent}}>印</span>
              </div>
            </div>
            {/* 振込先（請求書のみ） */}
            {(type==="invoice"||type==="combined")&&settings.bankName&&(
              <div style={{fontSize:10,color:"#555",borderTop:"1px solid #ddd",paddingTop:8,textAlign:"right",lineHeight:1.7}}>
                <div style={{fontWeight:700,marginBottom:2}}>お振込先</div>
                <div>{settings.bankName} {settings.bankBranch} {settings.bankType}口座</div>
                <div>{settings.bankHolder}　{settings.bankNo}</div>
              </div>
            )}
          </div>
        </div>

        {/* ━━ 中段：請求額バー ━━ */}
        <div style={{display:"flex",alignItems:"stretch",borderBottom:`2px solid ${theme.accent}`,background:theme.light}}>
          <div style={{flex:1,padding:"12px 20px",borderRight:`1px solid ${theme.border}`}}>
            <div style={{fontSize:10,color:"#888",marginBottom:3}}>ご請求額</div>
            <div style={{fontSize:26,fontWeight:800,color:theme.accent}}>¥{(grand).toLocaleString()}—</div>
          </div>
          <div style={{width:160,padding:"12px 16px",borderRight:`1px solid ${theme.border}`}}>
            <div style={{fontSize:10,color:"#888",marginBottom:3}}>消費税等</div>
            <div style={{fontSize:18,fontWeight:700}}>¥{(type==="combined"?(doc.combinedTax||0):taxAmt).toLocaleString()}—</div>
          </div>
          {doc.dueDate&&(
            <div style={{width:160,padding:"12px 16px",background:theme.accent}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,.8)",marginBottom:3}}>お支払期限</div>
              <div style={{fontSize:14,fontWeight:800,color:"#fff"}}>{doc.dueDate}</div>
            </div>
          )}
        </div>

        {/* ━━ 件名 ━━ */}
        {doc.subject&&<div style={{padding:"7px 20px",fontSize:12,borderBottom:`1px solid ${theme.border}`}}>件名：{doc.subject}</div>}

        {/* ━━ 明細テーブル ━━ */}
        <div className="detail-wrap" style={{padding:"0"}}>
          {type==="combined"&&(()=>{
            const allRows=[];
            (doc.allItems||[]).forEach(ci=>{
              if(ci.items&&ci.items.length>0){
                ci.items.forEach((it,idx)=>{
                  const lineAmt=it.qty*(it.unit||0)+(it.gijutsu||0);
                  allRows.push({id:idx===0?String(ci.id).replace(/\D/g,""):"",date:idx===0?ci.date:"",desc:it.desc,qty:it.qty,unit:it.unitLabel||"",partsCost:it.unit||0,gijutsu:it.gijutsu||0,lineAmt:lineAmt,subtotal:idx===0?ci.subtotal:null});
                });
              }else{
                allRows.push({id:String(ci.id).replace(/\D/g,""),date:ci.date,desc:ci.desc,qty:"",unit:"",partsCost:0,gijutsu:0,lineAmt:0,subtotal:ci.subtotal||ci.total});
              }
            });
            const blankCount=Math.max(0,10-allRows.length);
            const totalTax=doc.combinedTax||0;
            return(
              <table className="detail-table" style={{width:"100%",borderCollapse:"collapse",tableLayout:"fixed"}}>
                <colgroup>
                  <col style={{width:40}}/>
                  <col style={{width:68}}/>
                  <col style={{width:"auto"}}/>
                  <col style={{width:40}}/>
                  <col style={{width:38}}/>
                  <col style={{width:78}}/>
                  <col style={{width:78}}/>
                  <col style={{width:88}}/>
                </colgroup>
                <thead>
                  <tr style={{background:theme.accent}}>
                    {["No.","日付","品名","数量","単位","部品代","技術料","金額(税抜)"].map((h,i)=>(
                      <th key={h} style={{padding:"6px 6px",fontSize:10,fontWeight:700,color:"#fff",textAlign:i>=5?"right":"left",borderRight:"1px solid rgba(255,255,255,.2)"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allRows.map((row,i)=>(
                    <tr key={i} style={{borderBottom:`1px solid ${theme.border}`,background:i%2===0?"#fff":theme.light,pageBreakInside:"avoid"}}>
                      <td style={{padding:"6px 6px",fontSize:11}}>{row.id}</td>
                      <td style={{padding:"6px 6px",fontSize:10}}>{row.date}</td>
                      <td style={{padding:"6px 6px",fontSize:11,wordBreak:"break-all"}}>{row.desc}</td>
                      <td style={{padding:"6px 6px",fontSize:11,textAlign:"center"}}>{row.qty||""}</td>
                      <td style={{padding:"6px 6px",fontSize:11,textAlign:"center"}}>{row.unit}</td>
                      <td style={{padding:"6px 6px",fontSize:11,textAlign:"right"}}>{row.partsCost>0?fmt(row.partsCost):"-"}</td>
                      <td style={{padding:"6px 6px",fontSize:11,textAlign:"right"}}>{row.gijutsu>0?fmt(row.gijutsu):"-"}</td>
                      <td style={{padding:"6px 6px",fontSize:11,textAlign:"right",fontWeight:600}}>{row.lineAmt>0?fmt(row.lineAmt):""}</td>
                    </tr>
                  ))}
                  {Array.from({length:blankCount},(_,i)=>(
                    <tr key={`b${i}`} style={{borderBottom:`1px solid ${theme.border}`,background:(allRows.length+i)%2===0?"#fff":theme.light}}>
                      <td style={{padding:"6px 6px",height:28}}/><td/><td/><td/><td/><td/><td/><td/>
                    </tr>
                  ))}
                  <tr style={{background:"#f5f5f5"}}>
                    <td colSpan={7} style={{padding:"6px 10px",fontSize:11,textAlign:"right",color:"#555"}}>消費税合計</td>
                    <td style={{padding:"6px 10px",fontSize:11,textAlign:"right",fontWeight:600}}>{fmt(totalTax)}</td>
                  </tr>
                  <tr style={{background:theme.accent}}>
                    <td colSpan={7} style={{padding:"8px 10px",fontSize:12,fontWeight:800,color:"#fff",textAlign:"right"}}>合計請求額（税込）</td>
                    <td style={{padding:"8px 10px",fontSize:13,fontWeight:800,color:"#fff",textAlign:"right"}}>{fmt(grand)}</td>
                  </tr>
                </tbody>
              </table>
            );
          })()}
          {type!=="combined"&&(()=>{
            // 固定費は合計欄に移動するので明細には含めない
            const allRows=[...(doc.items||[])];
            const maxRows=type==="shakken"?3:type==="combined"?12:14;
            const blankCount=Math.max(0, Math.min(maxRows, maxRows-allRows.length+1));
            let rowIdx=0;
            return(
              <table className="detail-table" style={{width:"100%",borderCollapse:"collapse",tableLayout:"fixed"}}>
                <colgroup>
                  <col style={{width:"auto"}}/>
                  <col style={{width:44}}/>
                  <col style={{width:44}}/>
                  <col style={{width:72}}/>
                  <col style={{width:72}}/>
                  <col style={{width:80}}/>
                  <col style={{width:72}}/>
                </colgroup>
                <thead>
                  <tr style={{background:theme.accent}}>
                    {["品名","数量","単位","部品代","技術料","金額","備考"].map(h=>(
                      <th key={h} style={{padding:"7px 10px",fontSize:11,fontWeight:700,color:"#fff",
                        textAlign:["金額","部品代","技術料"].includes(h)?"right":"left",
                        borderRight:"1px solid rgba(255,255,255,.2)"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* ユーザー入力の明細行 */}
                  {(doc.items||[]).map((it,i)=>{
                    const amt=it.qty*(it.unit||0)+(it.gijutsu||0);
                    return(
                      <tr key={i} style={{borderBottom:`1px solid ${theme.border}`,background:i%2===0?"#fff":theme.light,pageBreakInside:"avoid",breakInside:"avoid"}}>
                        <td style={{padding:"8px 10px",fontSize:12,wordBreak:"break-all"}}>{it.desc}</td>
                        <td style={{padding:"8px 10px",fontSize:12,textAlign:"center"}}>{it.qty===0||it.qty===undefined?"-":it.qty}</td>
                        <td style={{padding:"8px 10px",fontSize:12,textAlign:"center"}}>{it.unitLabel||"-"}</td>
                        <td style={{padding:"8px 10px",fontSize:12,textAlign:"right"}}>{it.unit?fmt(it.unit):"-"}</td>
                        <td style={{padding:"8px 10px",fontSize:12,textAlign:"right"}}>{it.gijutsu?fmt(it.gijutsu):"-"}</td>
                        <td style={{padding:"8px 10px",fontSize:12,textAlign:"right",fontWeight:600}}>{amt?fmt(amt):"-"}</td>
                        <td style={{padding:"8px 10px",fontSize:11,color:"#888"}}>{it.note||""}</td>
                      </tr>
                    );
                  })}
                  {/* 空白記入欄 */}
                  {Array.from({length:blankCount},(_,i)=>{
                    const bgIdx=(doc.items||[]).length+i;
                    return(
                      <tr key={`blank-${i}`} style={{borderBottom:`1px solid ${theme.border}`,background:bgIdx%2===0?"#fff":theme.light}}>
                        <td style={{padding:"8px 10px",height:32}}/>
                        <td style={{borderLeft:`1px solid ${theme.border}`}}/>
                        <td style={{borderLeft:`1px solid ${theme.border}`}}/>
                        <td style={{borderLeft:`1px solid ${theme.border}`}}/>
                        <td style={{borderLeft:`1px solid ${theme.border}`}}/>
                        <td style={{borderLeft:`1px solid ${theme.border}`}}/>
                        <td style={{borderLeft:`1px solid ${theme.border}`}}/>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })()}
        </div>

        {/* ━━ 合計欄 ━━ */}
        {type!=="combined"&&(
          <div className="summary-block" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",padding:"8px 16px",pageBreakInside:"avoid",pageBreakBefore:"avoid",breakBefore:"avoid",breakInside:"avoid",gap:12}}>
            {isS?(
              <>
                <div style={{flex:1,border:`1px solid ${theme.border}`,borderRadius:6,overflow:"hidden",fontSize:10}}>
                  <div style={{background:theme.accent,color:"#fff",padding:"4px 10px",fontWeight:700,fontSize:10}}>法定費用・諸費用</div>
                  {[
                    [(doc.shakken?.jibaisekiMochikomi?"自賠責保険（持ち込み）":"自賠責保険"), doc.shakken?.jibaisekiMochikomi?"持ち込み":fmt(doc.shakken?.jibaiseki||0)],
                    ["重量税", fmt(doc.shakken?.juryozei||0)],
                    ["検査登録・証紙代", fmt(doc.shakken?.kensaShomei||settings.kensaShomei||0)],
                    ["技術情報管理料", fmt(doc.shakken?.gijutsuKanri||settings.gijutsuKanri||0)],
                    ["車検代行手数料", fmt(daikoRaw)],
                    [`　消費税（${Math.round(daikoTx*100)}%）`, fmt(daikoWT-daikoRaw)],
                  ].map(([l,v])=>(
                    <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"4px 10px",borderBottom:`1px solid ${theme.border}`,background:"#fafafa"}}>
                      <span style={{color:"#555"}}>{l}</span><span style={{fontWeight:600}}>{v}</span>
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"space-between",padding:"4px 10px",background:theme.light,fontWeight:700}}>
                    <span>法定費用合計</span><span>{fmt(gov+daikoWT)}</span>
                  </div>
                </div>
                <div style={{width:220,border:`1px solid ${theme.border}`,borderRadius:6,overflow:"hidden"}}>
                  {[
                    ["整備費（税抜）", fmt(sub)],
                    [`消費税（${Math.round((doc.tax||0.1)*100)}%）`, fmt(taxAmt)],
                    ["整備費合計（税込）", fmt(wT)],
                  ].map(([l,v])=>(
                    <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"4px 12px",borderBottom:`1px solid ${theme.border}`,fontSize:10,background:"#fafafa"}}>
                      <span style={{color:"#666"}}>{l}</span><span style={{fontWeight:600}}>{v}</span>
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:theme.accent}}>
                    <span style={{fontSize:12,fontWeight:800,color:"#fff"}}>お支払い合計</span>
                    <span style={{fontSize:16,fontWeight:800,color:"#fff"}}>{fmt(grand)}</span>
                  </div>
                </div>
              </>
            ):(
              <div style={{marginLeft:"auto",width:280,border:`1px solid ${theme.border}`,borderRadius:8,overflow:"hidden"}}>
                {[[`小計（税抜）`,fmt(sub)],[`消費税（${Math.round((doc.tax||0.1)*100)}%）`,fmt(taxAmt)],[`整備費合計（税込）`,fmt(wT)]].map(([l,v])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"6px 14px",borderBottom:`1px solid ${theme.border}`,fontSize:12,background:"#fafafa"}}>
                    <span style={{color:"#666"}}>{l}</span><span style={{fontWeight:600}}>{v}</span>
                  </div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",background:theme.accent}}>
                  <span style={{fontSize:14,fontWeight:800,color:"#fff"}}>お支払い合計</span>
                  <span style={{fontSize:20,fontWeight:800,color:"#fff"}}>{fmt(grand)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {doc.note&&<div style={{margin:"0 20px 16px",padding:"9px 12px",background:theme.light,borderRadius:7,fontSize:11,border:`1px solid ${theme.border}`}}><b>備考:</b> {doc.note}</div>}
      </div>

      {/* 下部にも印刷ボタン */}
      <div className="np" style={{display:"flex",gap:9,justifyContent:"center",paddingBottom:8}}>
        <button className="btn bp" style={{padding:"12px 32px",fontSize:15}} onClick={doPrint}>🖨️ 印刷する（お客様用＋控え）</button>
        <button className="btn bs" onClick={onClose}>← 戻る</button>
      </div>
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────
function Dashboard({customers,invoices,quotes,expenses,settings}){
  const now=new Date();const m=now.getMonth()+1;const y=now.getFullYear();
  const gt=inv=>invTotal(inv,settings);
  const mInv=invoices.filter(i=>mo(i.date)===m&&yr(i.date)===y);
  const mS=mInv.reduce((s,i)=>s+gt(i),0);
  const uAmt=invoices.filter(i=>i.status==="未入金").reduce((s,i)=>s+gt(i),0);
  const uCnt=invoices.filter(i=>i.status==="未入金").length;
  const yS=invoices.filter(i=>yr(i.date)===y).reduce((s,i)=>s+gt(i),0);
  const mE=expenses.filter(e=>mo(e.date)===m&&yr(e.date)===y).reduce((s,e)=>s+e.amount,0);
  const monthly=Array.from({length:6},(_,i)=>{
    const d=new Date(y,m-1-(5-i),1);const mm=d.getMonth()+1;const yy=d.getFullYear();
    const s=invoices.filter(inv=>mo(inv.date)===mm&&yr(inv.date)===yy).reduce((s,i)=>s+gt(i),0);
    const e=expenses.filter(e=>mo(e.date)===mm&&yr(e.date)===yy).reduce((s,e)=>s+e.amount,0);
    return{label:`${mm}月`,s,e};
  });
  const mx=Math.max(...monthly.map(d=>Math.max(d.s,d.e)),1);
  const rec=[...invoices].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
  return(
    <div className="stk fu">
      <div><div className="cmu sm">{y}年{m}月 · {settings.shopName}</div><div style={{fontSize:23,fontWeight:800,letterSpacing:-.5}}>おはようございます 👋</div></div>
      <div className="g4" style={{gap:9}}>
        {[{label:"今月の売上",value:fmt(mS),sub:`経費 ${fmt(mE)}`,c:"#007AFF"},{label:"未収金",value:fmt(uAmt),sub:`${uCnt}件未入金`,c:"#FF3B30"},{label:"今月の件数",value:`${mInv.length}件`,sub:`車検${mInv.filter(i=>i.type==="shakken").length} 修理${mInv.filter(i=>i.type==="repair").length}`,c:"#34C759"},{label:"今年度累計",value:fmt(yS),sub:`${y}年1〜${m}月`,c:"#AF52DE"}].map((k,i)=>(
          <div key={i} className="sc" style={{background:k.c}}>
            <div style={{fontSize:11,fontWeight:600,opacity:.85}}>{k.label}</div>
            <div style={{fontSize:k.value.length>10?17:23,fontWeight:800,letterSpacing:-.5,margin:"3px 0 2px"}}>{k.value}</div>
            <div style={{fontSize:11,opacity:.75}}>{k.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}} className="dg">
        <style>{`@media(max-width:700px){.dg{grid-template-columns:1fr!important;}}`}</style>
        <div className="card">
          <div className="rb mb12">
            <div><div style={{fontSize:14,fontWeight:700}}>売上・経費推移</div><div className="cmu xs mt4">過去6ヶ月</div></div>
            <div className="row" style={{gap:9}}>{[["#007AFF","売上"],["#FF9500","経費"]].map(([c,l])=><div key={l} className="row" style={{gap:3}}><span style={{width:8,height:8,borderRadius:2,background:c,display:"inline-block"}}/><span className="xs cmu">{l}</span></div>)}</div>
          </div>
          <div style={{display:"flex",alignItems:"flex-end",gap:5,height:110}}>
            {monthly.map((d,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,height:"100%"}}>
                <div style={{flex:1,display:"flex",alignItems:"flex-end",gap:2,width:"100%"}}>
                  {[[d.s,"linear-gradient(180deg,#34AAFF,#007AFF)","rgba(0,122,255,.1)"],[d.e,"linear-gradient(180deg,#FFB74D,#FF9500)","rgba(255,149,0,.1)"]].map(([v,g,bg],j)=>(
                    <div key={j} style={{flex:1,background:bg,borderRadius:"4px 4px 0 0",position:"relative",minHeight:3}}>
                      <div style={{position:"absolute",bottom:0,left:0,right:0,background:g,borderRadius:"4px 4px 0 0",height:`${Math.round(v/mx*100)}%`,transition:"height .8s ease"}}/>
                    </div>
                  ))}
                </div>
                <div className="xs cmu">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div style={{fontSize:14,fontWeight:700}} className="mb12">最近の請求</div>
          <div className="stk" style={{gap:8}}>
            {rec.map(inv=>{const c=customers.find(c=>c.id===inv.customerId);return(
              <div key={inv.id} className="rb" style={{borderBottom:"1px solid var(--sep)",paddingBottom:8}}>
                <div><div className="b6 sm">{fullName(c)}</div><div className="cmu xs">{inv.id} · {inv.date}</div></div>
                <div style={{textAlign:"right"}}><div className="b7 sm">{fmt(gt(inv))}</div><span className={`bdg ${inv.status==="入金済"?"dgr":"drd"}`}>{inv.status}</span></div>
              </div>
            );})}
            {!rec.length&&<div className="cmu sm">請求書がありません</div>}
          </div>
        </div>
      </div>
      {uCnt>0&&<div className="card" style={{background:"linear-gradient(135deg,#FFF3F3,#FFF 60%)",border:"1px solid rgba(255,59,48,.15)"}}>
        <div className="rb"><div className="row" style={{gap:9}}><Ico e="⚠️" bg="rgba(255,59,48,.12)"/><div><div className="b7">未収金アラート</div><div className="cmu sm">{uCnt}件の未入金請求があります</div></div></div><div className="cre b7 lg">{fmt(uAmt)}</div></div>
      </div>}
    </div>
  );
}

// 車種区分セレクト（グループ化）
function CarTypeSelect({value,onChange}){
  return(
    <select className="sel" value={value} onChange={onChange}>
      {CAR_TYPE_GROUPS.map(g=>(
        <optgroup key={g.label} label={g.label}>
          {g.types.map(t=><option key={t} value={t}>{t}</option>)}
        </optgroup>
      ))}
    </select>
  );
}

// 車検証OCRモーダル
function ShakkenShoOCR({onResult,onClose}){
  const[loading,setLoading]=useState(false);
  const[err,setErr]=useState("");
  const fileRef=React.useRef();
  const run=async(file)=>{
    setLoading(true);setErr("");
    try{
      const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(file);});
      const resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:800,
        messages:[{role:"user",content:[
          {type:"image",source:{type:"base64",media_type:file.type&&file.type.startsWith("image/")?file.type:"image/jpeg",data:b64}},
          {type:"text",text:`この車検証の画像から以下の情報をJSONで抽出してください。必ずJSONのみ返してください（マークダウン不要）。
{
  "carName": "車名＋型式（例: トヨタ プリウス ZVW50）",
  "plateNo": "ナンバープレート（例: 宮城483い1920）",
  "chassisNo": "車台番号",
  "firstReg": "初度登録年月 YYYY-MM形式",
  "weight": 車両重量トン数（数値のみ、例: 1.5）,
  "carType": 以下から最も近いものを1つ選択: "自家用乗用（普通・小型）","軽自動車（検査対象）","普通貨物・自家用2t超","普通貨物・自家用2t以下","普通貨物・営業用2t超","普通貨物・営業用2t以下","小型貨物・自家用","小型貨物・営業用","小型二輪250cc超"
}`}
        ]}]
      })});
      if(!resp.ok){const t=await resp.text();throw new Error(`API Error ${resp.status}: ${t.slice(0,200)}`);}
      const d=await resp.json();
      if(d.error)throw new Error(d.error.message||JSON.stringify(d.error));
      const txt=(d.content||[]).map(c=>c.text||"").join("");
      const clean=txt.replace(/```json|```/g,"").trim();
      const parsed=JSON.parse(clean);
      onResult(parsed);
    }catch(e){setErr(`読み取り失敗: ${e.message}`);console.error(e);}
    setLoading(false);
  };
  return(
    <Modal title="🚗 車検証から自動入力" onClose={onClose}>
      <div className="stk" style={{alignItems:"center",textAlign:"center",padding:"8px 0"}}>
        {loading?(
          <div style={{padding:"32px 0"}}>
            <div style={{fontSize:32,marginBottom:12}}>🔍</div>
            <div className="b6">車検証を読み取り中...</div>
            <div className="cmu sm mt4">AIが自動解析しています</div>
          </div>
        ):(
          <>
            <div style={{fontSize:48,marginBottom:8}}>📄</div>
            <div className="b7">車検証の写真を選択</div>
            <div className="cmu sm" style={{marginBottom:16}}>車名・ナンバー・車台番号などを自動入力します</div>
            <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>e.target.files[0]&&run(e.target.files[0])}/>
            <button className="btn bp" style={{width:"100%",padding:"14px"}} onClick={()=>fileRef.current.click()}>📷 カメラで撮影 / 写真を選択</button>
            {err&&<div style={{color:"var(--rd)",fontSize:12,marginTop:8}}>{err}</div>}
            <button className="btn bs" style={{marginTop:6}} onClick={onClose}>キャンセル</button>
          </>
        )}
      </div>
    </Modal>
  );
}

// ── VehicleModal ───────────────────────────────────────────
function VehicleModal({v,onSave,onClose,onDel}){
  const[f,setF]=useState({carName:v?.carName||"",plateNo:v?.plateNo||"",chassisNo:v?.chassisNo||"",firstReg:v?.firstReg||"",carType:v?.carType||"自家用乗用（普通・小型）",weight:v?.weight||1.5});
  const[showOCR,setShowOCR]=useState(false);
  const handleOCR=(parsed)=>{
    setF(p=>({...p,...parsed,weight:Number(parsed.weight)||p.weight}));
    setShowOCR(false);
  };
  return(
    <>
    <Modal title={v?"車両編集":"車両追加"} onClose={onClose}
      footer={<>{v&&<button className="btn bd bsm" onClick={onDel}>削除</button>}<button className="btn bs" onClick={onClose}>キャンセル</button><button className="btn bp" onClick={()=>onSave(f)}>保存</button></>}>
      <div className="stk">
        {/* 車検証OCRボタン */}
        <button className="btn" style={{background:"linear-gradient(135deg,rgba(0,122,255,.12),rgba(52,199,89,.08))",border:"1.5px dashed rgba(0,122,255,.4)",borderRadius:12,padding:"12px",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:9,color:"var(--bl)",fontWeight:700,fontSize:14}}
          onClick={()=>setShowOCR(true)}>
          📷 車検証を撮影して自動入力
          <span style={{fontSize:11,fontWeight:400,opacity:.7}}>AIが情報を読み取ります</span>
        </button>
        <div className="g2" style={{gap:9}}>
          <Fld label="車種名"><input className="inp" placeholder="プリウス" value={f.carName} onChange={e=>setF(p=>({...p,carName:e.target.value}))}/></Fld>
          <Fld label="ナンバー"><input className="inp" placeholder="品川300あ1234" value={f.plateNo} onChange={e=>setF(p=>({...p,plateNo:e.target.value}))}/></Fld>
          <Fld label="車台番号"><input className="inp" placeholder="ZVW5012345" value={f.chassisNo} onChange={e=>setF(p=>({...p,chassisNo:e.target.value}))}/></Fld>
          <Fld label="初度登録年月"><input type="month" className="inp" value={f.firstReg} onChange={e=>setF(p=>({...p,firstReg:e.target.value}))}/></Fld>
          <Fld label="車種区分（自賠責に影響）" style={{gridColumn:"1/-1"}}>
            <CarTypeSelect value={f.carType} onChange={e=>setF(p=>({...p,carType:e.target.value}))}/>
          </Fld>
          <Fld label="車両重量（t）">
            <input type="number" className="inp" step="0.1" min="0" placeholder="例: 1.5" value={f.weight} onChange={e=>setF(p=>({...p,weight:Number(e.target.value)}))}/>
          </Fld>
        </div>
        <div className="card" style={{background:"rgba(0,122,255,.04)",border:"1px solid rgba(0,122,255,.15)"}}>
          <div style={{fontSize:11,fontWeight:700,color:"var(--bl)",marginBottom:7}}>📊 車検時 自動計算プレビュー</div>
          <div className="g2" style={{gap:7}}>
            {[["自賠責（24ヶ月）",fmt(calcJibaiseki(f.carType,24))],["重量税（2年）",fmt(calcJuryozei(f.weight))]].map(([l,val])=>(
              <div key={l} style={{background:"var(--bg2)",borderRadius:8,padding:"8px 11px"}}><div className="xs cmu">{l}</div><div className="b7 cbl">{val}</div></div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
    {showOCR&&<ShakkenShoOCR onResult={handleOCR} onClose={()=>setShowOCR(false)}/>}
    </>
  );
}

function Customers({customers,setCustomers,worklogs=[],onGoWorklog}){
  const[modal,setModal]=useState(null);const[vModal,setVModal]=useState(null);
  const[search,setSearch]=useState("");const[expId,setExpId]=useState(null);
  const E={lastName:"",firstName:"",phone:"",email:"",address:"",note:"",vehicles:[]};
  const[form,setForm]=useState(E);
  const filtered=customers.filter(c=>fullName(c).includes(search)||c.phone?.includes(search));
  const save=()=>{
    if(!form.lastName)return;
    // 車両のidが未設定のものに採番
    const vehicles=(form.vehicles||[])
      .filter(v=>v.carName||v.plateNo||v.chassisNo)
      .map((v,i)=>v.id?v:{...v,id:Date.now()+i});
    const data={...form,vehicles};
    if(modal==="add")setCustomers(p=>[...p,{...data,id:nextId(p)}]);
    else setCustomers(p=>p.map(c=>c.id===modal.id?{...data,id:c.id}:c));
    setModal(null);
  };
  const saveV=(cid,vid,vd)=>{
    setCustomers(p=>p.map(c=>{if(c.id!==cid)return c;const vs=c.vehicles||[];
      if(vid)return{...c,vehicles:vs.map(v=>v.id===vid?{...vd,id:v.id}:v)};
      return{...c,vehicles:[...vs,{...vd,id:nextId(vs)}]};
    }));setVModal(null);
  };
  if(modal) return(
    <>
    {form._ocrTarget!=null&&<ShakkenShoOCR
      onResult={parsed=>{setForm(f=>({...f,_ocrTarget:null,vehicles:f.vehicles.map((v,i)=>i===f._ocrTarget?{...v,...parsed,weight:Number(parsed.weight)||v.weight}:v)}));}}
      onClose={()=>setForm(f=>({...f,_ocrTarget:null}))}/>}
    <div className="stk fu">
      <div className="rb">
        <div style={{fontSize:18,fontWeight:800}}>{modal==="add"?"新規顧客登録":"顧客編集"}</div>
        <div style={{display:"flex",gap:6}}>
          {modal!=="add"&&<button className="btn bd bsm" onClick={()=>{if(confirm("削除？")){setCustomers(p=>p.filter(c=>c.id!==modal.id));setModal(null);}}}>削除</button>}
          <button className="btn bs bsm" onClick={()=>setModal(null)}>キャンセル</button>
          <button className="btn bp bsm" onClick={save}>👥 {modal==="add"?"登録":"保存"}</button>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:18}}>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"var(--lb2)",marginBottom:6}}>顧客名・会社名 <span style={{color:"var(--re)"}}>*</span></div>
          <input className="inp" placeholder="例：山田太郎 / 株式会社〇〇" value={form.lastName} onChange={e=>setForm(f=>({...f,lastName:e.target.value}))} style={{fontSize:16,padding:"14px 16px"}}/>
        </div>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"var(--lb2)",marginBottom:6}}>読み仮名 <span style={{fontWeight:400,color:"var(--lb3)"}}>任意</span></div>
          <input className="inp" placeholder="例：ヤマダタロウ" value={form.firstName} onChange={e=>setForm(f=>({...f,firstName:e.target.value}))} style={{fontSize:16,padding:"14px 16px"}}/>
        </div>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"var(--lb2)",marginBottom:6}}>住所 <span style={{color:"var(--re)"}}>*</span></div>
          <input className="inp" placeholder="例：東京都足立区1-2-3" value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} style={{fontSize:16,padding:"14px 16px"}}/>
        </div>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"var(--lb2)",marginBottom:6}}>電話番号 <span style={{color:"var(--re)"}}>*</span></div>
          <input className="inp" placeholder="例：03-1234-5678" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} style={{fontSize:16,padding:"14px 16px"}}/>
        </div>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"var(--lb2)",marginBottom:6}}>メールアドレス <span style={{fontWeight:400,color:"var(--lb3)"}}>任意</span></div>
          <input className="inp" placeholder="任意" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} style={{fontSize:16,padding:"14px 16px"}}/>
        </div>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"var(--lb2)",marginBottom:6}}>備考 <span style={{fontWeight:400,color:"var(--lb3)"}}>任意</span></div>
          <input className="inp" placeholder="任意" value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} style={{fontSize:16,padding:"14px 16px"}}/>
        </div>
        <div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <div style={{fontSize:13,fontWeight:700,color:"var(--lb2)"}}>🚗 車両情報 <span style={{fontWeight:400,color:"var(--lb3)"}}>任意・複数台登録可</span></div>
            <button className="btn bg bsm" onClick={()=>setForm(f=>({...f,vehicles:[...(f.vehicles||[]),{id:Date.now(),carName:"",plateNo:"",chassisNo:"",firstReg:"",carType:"自家用乗用（普通・小型）",weight:1.5}]}))}>＋ 車両追加</button>
          </div>
          {(form.vehicles||[]).length===0&&(
            <div style={{textAlign:"center",padding:"14px",background:"var(--grp)",borderRadius:11,color:"var(--lb2)",fontSize:13}}>車両未登録 — 「＋ 車両追加」で追加</div>
          )}
          {(form.vehicles||[]).map((v,vi)=>(
            <div key={v.id||vi} style={{border:"1px solid rgba(52,199,89,.3)",borderRadius:12,padding:"14px",marginBottom:10,background:"rgba(52,199,89,.03)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{fontSize:13,fontWeight:700,color:"#1a8f3a"}}>🚗 車両 {vi+1}{v.carName?` — ${v.carName}`:""}</div>
                <button className="btn bd bsm" onClick={()=>setForm(f=>({...f,vehicles:f.vehicles.filter((_,i)=>i!==vi)}))}>削除</button>
              </div>
              {/* 車検証OCRボタン */}
              <button style={{width:"100%",marginBottom:11,padding:"10px",background:"linear-gradient(135deg,rgba(0,122,255,.1),rgba(52,199,89,.07))",border:"1.5px dashed rgba(0,122,255,.4)",borderRadius:10,color:"var(--bl)",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}
                onClick={()=>setForm(f=>({...f,_ocrTarget:vi}))}>
                📷 車検証を撮影して自動入力
              </button>
              <div style={{display:"flex",flexDirection:"column",gap:11}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div><div style={{fontSize:12,fontWeight:700,color:"var(--lb2)",marginBottom:5}}>車種名</div><input className="inp" placeholder="プリウス" value={v.carName||""} onChange={e=>setForm(f=>({...f,vehicles:f.vehicles.map((x,i)=>i===vi?{...x,carName:e.target.value}:x)}))}/></div>
                  <div><div style={{fontSize:12,fontWeight:700,color:"var(--lb2)",marginBottom:5}}>ナンバー</div><input className="inp" placeholder="品川300あ1234" value={v.plateNo||""} onChange={e=>setForm(f=>({...f,vehicles:f.vehicles.map((x,i)=>i===vi?{...x,plateNo:e.target.value}:x)}))}/></div>
                </div>
                <div><div style={{fontSize:12,fontWeight:700,color:"var(--lb2)",marginBottom:5}}>車台番号</div><input className="inp" placeholder="ZVW5012345" value={v.chassisNo||""} onChange={e=>setForm(f=>({...f,vehicles:f.vehicles.map((x,i)=>i===vi?{...x,chassisNo:e.target.value}:x)}))}/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div><div style={{fontSize:12,fontWeight:700,color:"var(--lb2)",marginBottom:5}}>初度登録年月</div><input type="month" className="inp" value={v.firstReg||""} onChange={e=>setForm(f=>({...f,vehicles:f.vehicles.map((x,i)=>i===vi?{...x,firstReg:e.target.value}:x)}))}/></div>
                  <div><div style={{fontSize:12,fontWeight:700,color:"var(--lb2)",marginBottom:5}}>車種区分</div><CarTypeSelect value={v.carType||"自家用乗用（普通・小型）"} onChange={e=>setForm(f=>({...f,vehicles:f.vehicles.map((x,i)=>i===vi?{...x,carType:e.target.value}:x)}))}/></div>
                </div>
                <div><div style={{fontSize:12,fontWeight:700,color:"var(--lb2)",marginBottom:5}}>車両重量（t）</div><input type="number" className="inp" step="0.1" min="0" placeholder="例: 1.5" value={v.weight||""} onChange={e=>setForm(f=>({...f,vehicles:f.vehicles.map((x,i)=>i===vi?{...x,weight:Number(e.target.value)}:x)}))}/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[["自賠責（24ヶ月）",fmt(calcJibaiseki(v.carType||"乗用",24))],["重量税（2年）",fmt(calcJuryozei(v.weight||1.5))]].map(([l,val])=>(
                    <div key={l} style={{background:"var(--bg2)",borderRadius:9,padding:"8px 11px",border:"1px solid var(--sep)"}}>
                      <div style={{fontSize:11,color:"var(--lb2)"}}>{l}</div>
                      <div style={{fontWeight:700,color:"var(--bl)",fontSize:14}}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
  return(
    <div className="stk fu">
      <div className="rb"><div style={{fontSize:20,fontWeight:800}}>顧客管理</div><button className="btn bp bsm" onClick={()=>{setForm(E);setModal("add");}}>＋ 顧客追加</button></div>
      <input className="inp" placeholder="🔍  名前・電話番号で検索" value={search} onChange={e=>setSearch(e.target.value)}/>
      <div className="lst">
        {filtered.map(c=>(
          <div key={c.id}>
            <div className="li" onClick={()=>setExpId(expId===c.id?null:c.id)}>
              <div style={{width:36,height:36,borderRadius:18,background:"var(--bl)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,flexShrink:0}}>{(c.lastName||"?")[0]}</div>
              <div style={{flex:1,minWidth:0}}><div className="b6 trn">{fullName(c)}</div><div className="cmu sm trn">{c.phone}{c.email?` · ${c.email}`:""}</div></div>
              {c.note&&<span className="bdg dbl">{c.note}</span>}
              <span className="cmu" style={{fontSize:15,transition:"transform .2s",transform:expId===c.id?"rotate(90deg)":"none"}}>›</span>
            </div>
            {expId===c.id&&(
              <div style={{background:"var(--grp)",padding:"9px 13px",borderBottom:"1px solid var(--sep)"}}>
                <div className="rb mb8">
                  <div className="sm b6">🚗 登録車両</div>
                  <div className="row" style={{gap:6}}>
                    <button className="btn bs bsm" onClick={()=>{setForm({...c,vehicles:c.vehicles||[]});setModal(c);}}>✏️ 顧客・車両編集</button>
                    <button className="btn bp bsm" onClick={()=>setVModal({cid:c.id,v:null})}>＋ 車両</button>
                  </div>
                </div>
                {(()=>{const wc=(worklogs||[]).filter(w=>w.customerId===c.id).length;return wc>0&&(<button className="btn bsm" style={{width:"100%",marginBottom:8,background:"rgba(88,86,214,.1)",color:"#5856D6",fontWeight:700}} onClick={()=>onGoWorklog&&onGoWorklog(c.id)}>📸 作業記録を見る（{wc}件）</button>);})()}
                {(c.vehicles||[]).length===0&&<div className="cmu sm">車両未登録</div>}
                {(c.vehicles||[]).map(v=>(
                  <div key={v.id} onClick={()=>setVModal({cid:c.id,v})} style={{background:"var(--bg2)",borderRadius:10,padding:"9px 11px",marginBottom:6,cursor:"pointer",boxShadow:"var(--sh)"}}>
                    <div className="rb"><div><div className="b6">{v.carName} <span className="cmu sm">{v.plateNo}</span></div><div className="cmu xs mt4">車台: {v.chassisNo} · {v.firstReg} · {v.carType} {v.weight}t</div></div>
                    <div style={{textAlign:"right"}}><div className="xs cmu">自賠責</div><div className="b7 sm cbl">{fmt(calcJibaiseki(v.carType,24))}</div><div className="xs cmu">重量税 {fmt(calcJuryozei(v.weight))}</div></div></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {!filtered.length&&<div className="li cmu" style={{justifyContent:"center"}}>顧客が見つかりません</div>}
      </div>
      {vModal&&<VehicleModal v={vModal.v} onSave={vd=>saveV(vModal.cid,vModal.v?.id,vd)} onClose={()=>setVModal(null)} onDel={()=>{if(confirm("削除？")){setCustomers(p=>p.map(c=>c.id===vModal.cid?{...c,vehicles:(c.vehicles||[]).filter(v=>v.id!==vModal.v.id)}:c));setVModal(null);}}}/>}
    </div>
  );
}

// ── Quote ──────────────────────────────────────────────────
function QuoteFormModal({doc,customers,onSave,onClose,onToInv,settings}){
  const unitList=settings?.unitList||DEF_UNIT_LIST;
  const[form,setForm]=useState({customerId:doc?.customerId||(customers[0]?.id||""),date:doc?.date||today(),items:doc?.items||[{desc:"",qty:1,unit:0,unitLabel:"式",gijutsu:0}],tax:doc?.tax??0.1,status:doc?.status||"見積中",note:doc?.note||""});
  const addI=()=>setForm(f=>({...f,items:[...f.items,{desc:"",qty:1,unit:0,unitLabel:"式",gijutsu:0}]}));
  const remI=i=>setForm(f=>({...f,items:f.items.filter((_,idx)=>idx!==i)}));
  const setI=(i,k,v)=>setForm(f=>({...f,items:f.items.map((it,idx)=>idx===i?{...it,[k]:v}:it)}));
  const{sub,taxAmt,total}=calcItems(form.items,form.tax);
  return(
    <div className="stk fu">
      <div className="rb">
        <div style={{fontSize:18,fontWeight:800}}>見積書</div>
        <div style={{display:"flex",gap:6}}>
          {doc&&onToInv&&<button className="btn bg bsm" onClick={()=>onToInv(form)}>→ 請求書に変換</button>}
          <button className="btn bs bsm" onClick={onClose}>キャンセル</button>
          <button className="btn bp bsm" onClick={()=>onSave(form)}>保存</button>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        <Fld label="顧客"><select className="sel" value={form.customerId} onChange={e=>setForm(f=>({...f,customerId:Number(e.target.value)}))}>{customers.map(c=><option key={c.id} value={c.id}>{fullName(c)}</option>)}</select></Fld>
        <Fld label="ステータス"><select className="sel" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{["見積中","承認済","却下"].map(s=><option key={s}>{s}</option>)}</select></Fld>
        <Fld label="日付"><input type="date" className="inp" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></Fld>
        <Fld label="消費税"><select className="sel" value={form.tax} onChange={e=>setForm(f=>({...f,tax:Number(e.target.value)}))}><option value={0.1}>10%</option><option value={0.08}>8%</option><option value={0}>非課税</option></select></Fld>
      </div>
      <div><div className="fl">明細</div>
        <div className="lst">{form.items.map((it,i)=>(
          <div key={i} style={{padding:"9px 13px",borderBottom:"1px solid var(--sep)"}}>
            <div className="mb8" style={{display:"flex",gap:8,alignItems:"flex-start"}}>
              <ItemSuggest value={it.desc} onChange={v=>setI(i,"desc",v)} onSelect={w=>{setI(i,"desc",w.desc);if(w.unit)setI(i,"unitLabel",w.unit);if(w.partsCost)setI(i,"unit",w.partsCost);if(w.gijutsu)setI(i,"gijutsu",w.gijutsu);}} workMaster={settings?.workMaster||[]}/>
            </div>
            <div className="g3" style={{gap:7}}>
              <Fld label="数量"><input type="text" inputMode="numeric" className="inp" style={{padding:"11px 13px",fontSize:15,imeMode:"inactive"}} value={it.qty} onChange={e=>{if(/^\d*$/.test(e.target.value))setI(i,"qty",Number(e.target.value))}}/></Fld>
              <Fld label="単位">
                <select className="sel" value={it.unitLabel||"式"} onChange={e=>setI(i,"unitLabel",e.target.value)}>
                  {unitList.map(u=><option key={u} value={u}>{u}</option>)}
                </select>
              </Fld>
              <Fld label="部品代（税抜）"><input type="text" inputMode="numeric" className="inp" style={{padding:"11px 13px",fontSize:15,imeMode:"inactive"}} value={it.unit} onChange={e=>{if(/^\d*$/.test(e.target.value))setI(i,"unit",Number(e.target.value))}}/></Fld>
              <Fld label="技術料（税抜）"><input type="text" inputMode="numeric" className="inp" style={{padding:"11px 13px",fontSize:15,imeMode:"inactive"}} value={it.gijutsu||0} onChange={e=>{if(/^\d*$/.test(e.target.value))setI(i,"gijutsu",Number(e.target.value))}}/></Fld>
            </div>
            <div className="rb mt8"><span className="cmu sm">小計: {fmt(it.qty*(it.unit||0)+(it.gijutsu||0))}</span>{form.items.length>1&&<button className="btn bd bsm" onClick={()=>remI(i)}>削除</button>}</div>
          </div>
        ))}</div>
        <button className="btn bs bsm mt8" onClick={addI}>＋ 明細追加</button>
      </div>
      <div className="card" style={{background:"var(--grp)"}}>
        {[["小計",fmt(sub)],["消費税",fmt(taxAmt)],["合計",fmt(total)]].map(([l,v])=>(
          <div key={l} className="rb" style={{padding:"4px 0",borderBottom:l==="消費税"?"1px solid var(--sep)":"none"}}><span className={`sm ${l==="合計"?"b7":"cmu"}`}>{l}</span><span className={l==="合計"?"b7 cbl":"sm"}>{v}</span></div>
        ))}
      </div>
      <Fld label="備考" opt><textarea className="inp" rows={2} value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))}/></Fld>
    </div>
  );
}

function Quotes({quotes,setQuotes,customers,invoices,setInvoices,settings}){
  const[modal,setModal]=useState(null);const[print,setPrint]=useState(null);
  const mkQId=arr=>String(nextId(arr.map(q=>({id:q.id.replace(/\D/g,"")}))));
  const save=form=>{
    if(modal==="add")setQuotes(p=>[...p,{...form,id:mkQId(p)}]);
    else setQuotes(p=>p.map(q=>q.id===modal.id?{...form,id:q.id}:q));
    setModal(null);
  };
  const toInv=form=>{
    const nid=String(nextId(invoices.map(i=>({id:String(i.id).replace(/\D/g,"")}))));
    setInvoices(p=>[...p,{...form,id:nid,type:"repair",vehicleId:"",dueDate:"",status:"未入金"}]);
    setModal(null);alert(`請求書 No.${nid} に変換しました`);
  };
  if(modal) return <QuoteFormModal doc={modal==="add"?null:modal} customers={customers} onSave={save} onClose={()=>setModal(null)} onToInv={modal!=="add"?toInv:null} settings={settings}/>;
  if(print) return <PrintDoc type="quote" doc={print} customer={customers.find(c=>c.id===print.customerId)} settings={settings} onClose={()=>setPrint(null)}/>;
  return(
    <div className="stk fu">
      <div className="rb"><div style={{fontSize:20,fontWeight:800}}>見積書</div><button className="btn bp bsm" onClick={()=>setModal("add")}>＋ 作成</button></div>
      <div className="lst">
        {quotes.map(q=>{const c=customers.find(c=>c.id===q.customerId);const{total}=calcItems(q.items,q.tax);return(
          <div key={q.id} className="li" onClick={()=>setModal(q)}>
            <Ico e="📋" bg="rgba(0,122,255,.1)"/>
            <div style={{flex:1,minWidth:0}}><div className="b6 trn">{fullName(c)}</div><div className="cmu sm">{q.id} · {q.date}</div></div>
            <div style={{textAlign:"right",marginRight:7}}><div className="b7 sm">{fmt(total)}</div><span className={`bdg ${q.status==="承認済"?"dgr":q.status==="見積中"?"dbl":"dgy"}`}>{q.status}</span></div>
            <button className="btn bsm" style={{background:"rgba(255,149,0,.15)",color:"#b36500",fontWeight:700}} onClick={e=>{e.stopPropagation();setPrint(q);}}>🖨️ 印刷</button>
            <button className="btn bd bsm" onClick={e=>{e.stopPropagation();if(confirm("削除？"))setQuotes(p=>p.filter(x=>x.id!==q.id));}}>削除</button>
          </div>
        );})}
        {!quotes.length&&<div className="li cmu" style={{justifyContent:"center"}}>見積書がありません</div>}
      </div>
    </div>
  );
}

// ── Repair Invoice Form ────────────────────────────────────
function RepairForm({doc,customers,onSave,onClose,settings}){
  const unitList=settings?.unitList||DEF_UNIT_LIST;
  const[form,setForm]=useState({customerId:doc?.customerId||(customers[0]?.id||""),vehicleId:doc?.vehicleId||"",date:doc?.date||today(),dueDate:doc?.dueDate||"",items:doc?.items||[{desc:"",qty:1,unit:0,unitLabel:"式",gijutsu:0}],tax:doc?.tax??0.1,status:doc?.status||"未入金",note:doc?.note||""});
  const cust=customers.find(c=>c.id===Number(form.customerId));
  const addI=()=>setForm(f=>({...f,items:[...f.items,{desc:"",qty:1,unit:0,unitLabel:"式",gijutsu:0}]}));
  const remI=i=>setForm(f=>({...f,items:f.items.filter((_,idx)=>idx!==i)}));
  const setI=(i,k,v)=>setForm(f=>({...f,items:f.items.map((it,idx)=>idx===i?{...it,[k]:v}:it)}));
  const{sub,taxAmt,total}=calcItems(form.items,form.tax);
  return(
    <div className="stk fu">
      <div className="rb">
        <div style={{fontSize:18,fontWeight:800}}>🔧 鈑金修理 請求書</div>
        <div style={{display:"flex",gap:6}}>
          <button className="btn bs bsm" onClick={onClose}>キャンセル</button>
          <button className="btn bp bsm" onClick={()=>onSave({...form,type:"repair"})}>保存</button>
        </div>
      </div>
      <div className="stk">
        <div style={{background:"rgba(255,149,0,.08)",border:"1px solid rgba(255,149,0,.25)",borderRadius:9,padding:"8px 12px"}}><span className="b6 sm" style={{color:"var(--or)"}}>🔧 鈑金修理用請求書</span></div>
        <div className="g2" style={{gap:9}}>
          <Fld label="顧客"><select className="sel" value={form.customerId} onChange={e=>setForm(f=>({...f,customerId:Number(e.target.value),vehicleId:""}))}>{customers.map(c=><option key={c.id} value={c.id}>{fullName(c)}</option>)}</select></Fld>
          <Fld label="車両"><select className="sel" value={form.vehicleId} onChange={e=>setForm(f=>({...f,vehicleId:e.target.value===""?"":Number(e.target.value)}))}>
            <option value="">選択してください</option>{(cust?.vehicles||[]).map(v=><option key={v.id} value={v.id}>{v.carName} {v.plateNo}</option>)}
          </select></Fld>
          <Fld label="請求日"><input type="date" className="inp" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></Fld>
          <Fld label="支払期限" opt><input type="date" className="inp" value={form.dueDate} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))}/></Fld>
          <Fld label="ステータス"><select className="sel" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}><option>未入金</option><option>入金済</option></select></Fld>
          <Fld label="消費税"><select className="sel" value={form.tax} onChange={e=>setForm(f=>({...f,tax:Number(e.target.value)}))}><option value={0.1}>10%</option><option value={0.08}>8%</option><option value={0}>非課税</option></select></Fld>
        </div>
        <div><div className="fl">修理明細</div>
          <div className="lst">{form.items.map((it,i)=>(
            <div key={i} style={{padding:"9px 13px",borderBottom:"1px solid var(--sep)"}}>
              <div className="mb8" style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                <ItemSuggest value={it.desc} onChange={v=>setI(i,"desc",v)} onSelect={w=>{setI(i,"desc",w.desc);if(w.partsCost)setI(i,"unit",w.partsCost);if(w.gijutsu)setI(i,"gijutsu",w.gijutsu);}} workMaster={settings?.workMaster||[]}/>
              </div>
              <div className="g3" style={{gap:7}}>
                <Fld label="数量"><input type="text" inputMode="numeric" className="inp" style={{imeMode:"inactive"}} value={it.qty} onChange={e=>{if(/^\d*$/.test(e.target.value))setI(i,"qty",Number(e.target.value))}}/></Fld>
                <Fld label="単位">
                  <select className="sel" value={it.unitLabel||"式"} onChange={e=>setI(i,"unitLabel",e.target.value)}>
                    {unitList.map(u=><option key={u} value={u}>{u}</option>)}
                  </select>
                </Fld>
                <Fld label="部品代（税抜）"><input type="text" inputMode="numeric" className="inp" style={{imeMode:"inactive"}} value={it.unit} onChange={e=>{if(/^\d*$/.test(e.target.value))setI(i,"unit",Number(e.target.value))}}/></Fld>
                <Fld label="技術料（税抜）"><input type="text" inputMode="numeric" className="inp" style={{imeMode:"inactive"}} value={it.gijutsu||0} onChange={e=>{if(/^\d*$/.test(e.target.value))setI(i,"gijutsu",Number(e.target.value))}}/></Fld>
              </div>
              <div className="rb mt8"><span className="cmu sm">小計: {fmt(it.qty*(it.unit||0)+(it.gijutsu||0))}</span>{form.items.length>1&&<button className="btn bd bsm" onClick={()=>remI(i)}>削除</button>}</div>
            </div>
          ))}</div>
          <button className="btn bs bsm mt8" onClick={addI}>＋ 明細追加</button>
        </div>
        <div className="card" style={{background:"var(--grp)"}}>
          {[["小計（税抜）",fmt(sub)],["消費税",fmt(taxAmt)],["合計（税込）",fmt(total)]].map(([l,v])=>(
            <div key={l} className="rb" style={{padding:"5px 0",borderBottom:l==="消費税"?"1px solid var(--sep)":"none"}}><span className={`sm ${l.includes("合計")?"b7":"cmu"}`}>{l}</span><span className={l.includes("合計")?"b7 cbl lg":"sm"}>{v}</span></div>
          ))}
        </div>
        <Fld label="備考" opt><textarea className="inp" rows={2} value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))}/></Fld>
      </div>
    </div>
  );
}

// ── Shakken Invoice Form ───────────────────────────────────
const DEF_SHAKKEN_ITEMS=[
  {desc:"2年24ヶ月定期点検基本作業",qty:1,unit:0,gijutsu:0,inspType:"24"},
  {desc:"保安確認検査",qty:1,unit:0,gijutsu:0},
  {desc:"OBD診断",qty:1,unit:0,gijutsu:0},
];
function ShakkenForm({doc,customers,onSave,onClose,settings}){
  const unitList=settings?.unitList||DEF_UNIT_LIST;
  const defS={jibaiseki:0,juryozei:0,kensaShomei:settings.kensaShomei,gijutsuKanri:settings.gijutsuKanri,daiko:settings.daiko,daikoTax:settings.daikoTax,gaiChuDaiko:settings.gaiChuDaiko||0,gaiChuDaikoTax:settings.gaiChuDaikoTax??0.1,_fromSettings:true};
  const[form,setForm]=useState({customerId:doc?.customerId||(customers[0]?.id||""),vehicleId:doc?.vehicleId||"",date:doc?.date||today(),dueDate:doc?.dueDate||"",items:doc?.items||DEF_SHAKKEN_ITEMS.map(i=>({...i})),tax:doc?.tax??0.1,status:doc?.status||"未入金",note:doc?.note||"",shakken:{...defS,...(doc?.shakken||{})}});
  const[auto,setAuto]=useState(true);
  const cust=customers.find(c=>c.id===Number(form.customerId));
  const vehicle=(cust?.vehicles||[]).find(v=>v.id===Number(form.vehicleId));
  useEffect(()=>{if(auto&&vehicle)setForm(f=>({...f,shakken:{...f.shakken,jibaiseki:calcJibaiseki(vehicle.carType,24),juryozei:calcJuryozei(vehicle.weight)}}));},[form.vehicleId,auto]);
  const setS=(k,v)=>setForm(f=>({...f,shakken:{...f.shakken,[k]:Number(v)}}));
  const addI=()=>setForm(f=>({...f,items:[...f.items,{desc:"",qty:1,unit:0,unitLabel:"式",gijutsu:0}]}));
  const remI=i=>setForm(f=>({...f,items:f.items.filter((_,idx)=>idx!==i)}));
  const setI=(i,k,v)=>setForm(f=>({...f,items:f.items.map((it,idx)=>idx===i?{...it,[k]:v}:it)}));
  const{sub,taxAmt,total:wT}=calcItems(form.items,form.tax);
  const gov=calcGovFees(form.shakken);
  const dWT=calcDaiko(form.shakken.daiko,form.shakken.daikoTax);
  const grand=wT+gov+dWT;
  return(
    <div className="stk fu">
      <div className="rb">
        <div style={{fontSize:18,fontWeight:800}}>🚗 車検 請求書</div>
        <div style={{display:"flex",gap:6}}>
          <button className="btn bs bsm" onClick={onClose}>キャンセル</button>
          <button className="btn bp bsm" onClick={()=>onSave({...form,type:"shakken"})}>保存</button>
        </div>
      </div>
      <div className="stk">
        <div style={{background:"rgba(0,122,255,.06)",border:"1px solid rgba(0,122,255,.2)",borderRadius:9,padding:"8px 12px"}}><span className="b6 sm" style={{color:"var(--bl)"}}>🚗 車検用請求書 — 法定費用は非課税・代行料のみ課税</span></div>
        <div className="g2" style={{gap:9}}>
          <Fld label="顧客"><select className="sel" value={form.customerId} onChange={e=>setForm(f=>({...f,customerId:Number(e.target.value),vehicleId:""}))}>{customers.map(c=><option key={c.id} value={c.id}>{fullName(c)}</option>)}</select></Fld>
          <Fld label="車両"><select className="sel" value={form.vehicleId} onChange={e=>setForm(f=>({...f,vehicleId:e.target.value===""?"":Number(e.target.value)}))}>
            <option value="">選択してください</option>{(cust?.vehicles||[]).map(v=><option key={v.id} value={v.id}>{v.carName} {v.plateNo}</option>)}
          </select></Fld>
          <Fld label="請求日"><input type="date" className="inp" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></Fld>
          <Fld label="支払期限" opt><input type="date" className="inp" value={form.dueDate} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))}/></Fld>
          <Fld label="ステータス"><select className="sel" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}><option>未入金</option><option>入金済</option></select></Fld>
          <Fld label="整備費消費税"><select className="sel" value={form.tax} onChange={e=>setForm(f=>({...f,tax:Number(e.target.value)}))}><option value={0.1}>10%</option><option value={0.08}>8%</option><option value={0}>非課税</option></select></Fld>
        </div>

        {/* 法定諸費用（上に移動） */}
        <div>
          <div className="rb mb8">
            <div className="fl" style={{margin:0}}>法定諸費用（非課税）</div>
            <div className="row" style={{gap:6}}>
              {vehicle&&<span className="xs cmu">{vehicle.carName}/{vehicle.carType} {vehicle.weight}t</span>}
              <button className="btn bsm" style={{background:auto?"rgba(0,122,255,.12)":"var(--fi)",color:auto?"var(--bl)":"var(--lb2)",fontSize:11}} onClick={()=>setAuto(a=>!a)}>🔄 {auto?"自動ON":"自動OFF"}</button>
            </div>
          </div>
          <div className="lst">
            {[{key:"jibaiseki",label:"自賠責保険（24ヶ月）",hint:vehicle?`自動: ${fmt(calcJibaiseki(vehicle.carType,24))}`:"車両選択で自動入力"},{key:"juryozei",label:"重量税（2年）",hint:vehicle?`自動: ${fmt(calcJuryozei(vehicle.weight))}`:"車両選択で自動入力"},{key:"kensaShomei",label:"検査登録証紙代",hint:"固定 ¥1,450",fixed:true},{key:"gijutsuKanri",label:"技術管理料",hint:"固定 ¥400",fixed:true}].map(({key,label,hint,fixed})=>(
              <div key={key} className="fr">
                <div style={{flex:1,minWidth:0}}>
                  <div className="sm b6">{label}</div>
                  <div className="xs cmu">{hint}</div>
                  {key==="jibaiseki"&&(
                    <div className="row" style={{gap:5,marginTop:4}}>
                      <input type="checkbox" id="mochikomi" checked={form.shakken.jibaisekiMochikomi||false}
                        onChange={e=>setForm(f=>({...f,shakken:{...f.shakken,jibaisekiMochikomi:e.target.checked,jibaiseki:e.target.checked?0:f.shakken.jibaiseki}}))}
                        style={{width:15,height:15,accentColor:"var(--bl)"}}/>
                      <label htmlFor="mochikomi" style={{fontSize:12,color:"var(--lb2)",cursor:"pointer"}}>持ち込み（0円）</label>
                    </div>
                  )}
                </div>
                <div className="row" style={{gap:6}}>{fixed&&<span className="bdg dgy">固定</span>}<input type="number" className="inp" style={{width:115,padding:"6px 10px",fontSize:14}} disabled={key==="jibaiseki"&&form.shakken.jibaisekiMochikomi} value={key==="jibaiseki"&&form.shakken.jibaisekiMochikomi?0:form.shakken[key]||0} onChange={e=>setS(key,e.target.value)}/></div>
              </div>
            ))}
            <div className="fr">
              <div style={{flex:1,minWidth:0}}><div className="sm b6">車検代行料 <span className="bdg dor" style={{marginLeft:4}}>課税</span></div><div className="xs cmu">お客様への請求額（税抜）</div></div>
              <div className="row" style={{gap:6}}>
                <input type="number" className="inp" style={{width:100,padding:"6px 10px",fontSize:14}} value={form.shakken.daiko||0} onChange={e=>setS("daiko",e.target.value)}/>
                <select className="sel" style={{width:75,padding:"6px 9px",fontSize:12}} value={form.shakken.daikoTax??settings.daikoTax} onChange={e=>setS("daikoTax",e.target.value)}><option value={0.1}>10%</option><option value={0.08}>8%</option></select>
              </div>
            </div>
            <div className="fr" style={{background:"rgba(255,149,0,.06)",borderRadius:8,margin:"4px 0"}}>
              <div style={{flex:1,minWidth:0}}>
                <div className="sm b6">🔧 外注先への代行料 <span className="bdg dgy" style={{marginLeft:4}}>外注費</span></div>
                <div className="xs cmu">設定のデフォルト値を反映 — 保存時に経費へ自動登録</div>
                {(form.shakken.daiko||0)>(form.shakken.gaiChuDaiko||0)&&(form.shakken.gaiChuDaiko||0)>0&&(
                  <div className="xs" style={{color:"#34C759",fontWeight:700,marginTop:2}}>粗利: {fmt(calcDaiko(form.shakken.daiko,form.shakken.daikoTax??settings.daikoTax)-calcDaiko(form.shakken.gaiChuDaiko,form.shakken.gaiChuDaikoTax??0.1))}</div>
                )}
              </div>
              <div className="row" style={{gap:6}}>
                <input type="number" className="inp" style={{width:100,padding:"6px 10px",fontSize:14}} value={form.shakken.gaiChuDaiko||0} onChange={e=>setS("gaiChuDaiko",e.target.value)}/>
                <select className="sel" style={{width:75,padding:"6px 9px",fontSize:12}} value={form.shakken.gaiChuDaikoTax??0.1} onChange={e=>setS("gaiChuDaikoTax",e.target.value)}><option value={0.1}>10%</option><option value={0.08}>8%</option></select>
              </div>
            </div>
          </div>
        </div>

        {/* 整備明細（下に移動） */}
        <div><div className="fl">整備明細（課税）</div>
          <div className="lst">{form.items.map((it,i)=>(
            <div key={i} style={{padding:"9px 13px",borderBottom:"1px solid var(--sep)"}}>
              <div className="rb mb8" style={{gap:8}}>
                <ItemSuggest value={it.desc} onChange={v=>setI(i,"desc",v)} onSelect={w=>{setI(i,"desc",w.desc);if(w.partsCost)setI(i,"unit",w.partsCost);if(w.gijutsu)setI(i,"gijutsu",w.gijutsu);}} workMaster={settings?.workMaster||[]}/>
                {it.inspType!==undefined&&(
                  <select className="sel" style={{width:110,flexShrink:0,fontSize:12}} value={it.inspType} onChange={e=>{
                    const t=e.target.value;
                    setI(i,"inspType",t);
                    setI(i,"desc",t==="24"?"2年24ヶ月定期点検基本作業":"1年12ヶ月定期点検基本作業");
                  }}>
                    <option value="24">24ヶ月点検</option>
                    <option value="12">12ヶ月点検</option>
                  </select>
                )}
              </div>
              <div className="g3" style={{gap:7}}>
                <Fld label="数量"><input type="text" inputMode="numeric" className="inp" style={{imeMode:"inactive"}} value={it.qty} onChange={e=>{if(/^\d*$/.test(e.target.value))setI(i,"qty",Number(e.target.value))}}/></Fld>
                <Fld label="単位">
                  <select className="sel" value={it.unitLabel||"式"} onChange={e=>setI(i,"unitLabel",e.target.value)}>
                    {unitList.map(u=><option key={u} value={u}>{u}</option>)}
                  </select>
                </Fld>
                <Fld label="部品代（税抜）"><input type="text" inputMode="numeric" className="inp" style={{imeMode:"inactive"}} value={it.unit} onChange={e=>{if(/^\d*$/.test(e.target.value))setI(i,"unit",Number(e.target.value))}}/></Fld>
                <Fld label="技術料（税抜）"><input type="text" inputMode="numeric" className="inp" style={{imeMode:"inactive"}} value={it.gijutsu||0} onChange={e=>{if(/^\d*$/.test(e.target.value))setI(i,"gijutsu",Number(e.target.value))}}/></Fld>
              </div>
              <div className="rb mt8"><span className="cmu sm">小計: {fmt(it.qty*(it.unit||0)+(it.gijutsu||0))}</span>{form.items.length>1&&<button className="btn bd bsm" onClick={()=>remI(i)}>削除</button>}</div>
            </div>
          ))}</div>
          <button className="btn bs bsm mt8" onClick={addI}>＋ 整備明細追加</button>
        </div>

        <div className="card" style={{background:"var(--grp)"}}>
          <div className="xs cmu" style={{fontWeight:700,marginBottom:7}}>金額内訳</div>
          {(()=>{
            const gaichu=form.shakken.gaiChuDaiko||0;
            const gaichuTax=form.shakken.gaiChuDaikoTax??0.1;
            const gaichuTotal=gaichu>0?Math.floor(gaichu*(1+gaichuTax)):0;
            const profit=dWT-gaichuTotal;
            return[[`整備費（税抜）`,fmt(sub)],[`消費税（${Math.round(form.tax*100)}%）`,fmt(taxAmt)],[`整備費合計（税込）`,fmt(wT)],null,[form.shakken.jibaisekiMochikomi?"自賠責保険（持ち込み）":"自賠責保険",form.shakken.jibaisekiMochikomi?"持ち込み":fmt(form.shakken.jibaiseki||0)],["重量税",fmt(form.shakken.juryozei||0)],["検査登録証紙代",fmt(form.shakken.kensaShomei||settings.kensaShomei)],["技術管理料",fmt(form.shakken.gijutsuKanri||settings.gijutsuKanri)],["法定費用合計（非課税）",fmt(gov)],null,["車検代行手数料（税抜）",fmt(form.shakken.daiko||0)],[`　消費税（${Math.round((form.shakken.daikoTax??settings.daikoTax)*100)}%）`,fmt(dWT-(form.shakken.daiko||0))],gaichu>0?null:undefined,gaichu>0?["🔧 外注先支払い（税込）",`-${fmt(gaichuTotal)}`]:undefined,gaichu>0?["　代行料粗利",fmt(profit)]:undefined].filter(r=>r!==undefined);
          })().map((row,i)=>
            row===null?<div key={i} style={{borderTop:"1px solid var(--sep)",margin:"4px 0"}}/>:
            <div key={i} className="rb" style={{padding:"3px 0"}}><span className="xs cmu">{row[0]}</span><span className="sm">{row[1]}</span></div>
          )}
          <div style={{borderTop:"2px solid var(--bl)",marginTop:7,paddingTop:8}} className="rb">
            <span className="b7">お支払い合計</span>
            <span className="b7 cbl" style={{fontSize:20}}>{fmt(grand)}</span>
          </div>
        </div>
        <Fld label="備考" opt><textarea className="inp" rows={2} value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))}/></Fld>
      </div>
    </div>
  );
}

// ── Invoices Page ──────────────────────────────────────────
// ── 入金管理 ───────────────────────────────────────────────
function PaymentModal({inv,total,onSave,onClose}){
  const payments=inv.payments||[];
  const paid=payments.reduce((s,p)=>s+p.amount,0);
  const remaining=total-paid;
  const[date,setDate]=useState(today());
  const[amount,setAmount]=useState(remaining>0?remaining:0);
  const[memo,setMemo]=useState("");

  const add=()=>{
    if(!amount||amount<=0)return;
    const newPayments=[...payments,{id:Date.now(),date,amount:Number(amount),memo}];
    const newPaid=newPayments.reduce((s,p)=>s+p.amount,0);
    const newStatus=newPaid>=total?"入金済":"未入金";
    onSave({...inv,payments:newPayments,status:newStatus});
    setAmount(Math.max(0,total-newPaid));
    setMemo("");
  };
  const del=id=>{
    const newPayments=payments.filter(p=>p.id!==id);
    const newPaid=newPayments.reduce((s,p)=>s+p.amount,0);
    const newStatus=newPaid>=total?"入金済":"未入金";
    onSave({...inv,payments:newPayments,status:newStatus});
  };

  return(
    <Modal title="💰 入金管理" onClose={onClose}
      footer={<><button className="btn bs" onClick={onClose}>閉じる</button></>}>
      <div className="stk">
        <div style={{background:"var(--grp)",borderRadius:12,padding:"13px 15px"}}>
          <div className="g3" style={{gap:8}}>
            {[["請求合計",fmt(total),"var(--lb)"],[`入金済`,fmt(paid),"#1a8f3a"],[`残金`,fmt(remaining),remaining>0?"var(--re)":"#1a8f3a"]].map(([l,v,c])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontSize:11,color:"var(--lb3)",marginBottom:3}}>{l}</div>
                <div style={{fontSize:16,fontWeight:800,color:c}}>{v}</div>
              </div>
            ))}
          </div>
          {remaining<=0&&<div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:700,color:"#1a8f3a"}}>✅ 入金完了</div>}
        </div>
        <div>
          <div className="fl">入金履歴</div>
          {payments.length===0&&<div className="cmu sm" style={{textAlign:"center",padding:12}}>入金記録なし</div>}
          <div className="lst">
            {payments.map(p=>(
              <div key={p.id} className="fr">
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:700,color:"#1a8f3a"}}>{fmt(p.amount)}</div>
                  <div style={{fontSize:12,color:"var(--lb2)"}}>{p.date}{p.memo?` · ${p.memo}`:""}</div>
                </div>
                <button className="btn bd bsm" onClick={()=>del(p.id)}>削除</button>
              </div>
            ))}
          </div>
        </div>
        {remaining>0&&(
          <div style={{background:"rgba(52,199,89,.06)",border:"1px solid rgba(52,199,89,.25)",borderRadius:12,padding:"13px 15px"}}>
            <div className="fl" style={{color:"#1a8f3a"}}>入金を記録する</div>
            <div className="stk" style={{gap:9}}>
              <div className="g2" style={{gap:9}}>
                <Fld label="入金日"><input type="date" className="inp" value={date} onChange={e=>setDate(e.target.value)}/></Fld>
                <Fld label="入金額（円）"><input type="number" className="inp" inputMode="numeric" value={amount} onChange={e=>setAmount(e.target.value)}/></Fld>
              </div>
              <Fld label="メモ" opt={true}><input className="inp" placeholder="経費分・残金など" value={memo} onChange={e=>setMemo(e.target.value)}/></Fld>
              <button className="btn bp" style={{width:"100%"}} onClick={add}>＋ 入金を記録</button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

function Invoices({invoices,setInvoices,expenses,setExpenses,customers,settings}){
  const[modal,setModal]=useState(null);const[print,setPrint]=useState(null);const[printType,setPType]=useState("invoice");
  const[tab,setTab]=useState("all");const[tTab,setTTab]=useState("all");
  const[showTpl,setShowTpl]=useState(false);
  const[payModal,setPayModal]=useState(null);
  const gt=inv=>invTotal(inv,settings);
  const filtered=invoices.filter(i=>{
    if(tab==="paid"&&i.status!=="入金済")return false;
    if(tab==="unpaid"&&i.status!=="未入金")return false;
    if(tTab==="repair"&&i.type!=="repair")return false;
    if(tTab==="shakken"&&i.type!=="shakken")return false;
    return true;
  });
  const save=form=>{
    if(modal.doc===null)setInvoices(p=>[...p,{...form,id:String(nextId(p.map(i=>({id:String(i.id).replace(/\D/g,"")}))))}]);
    else setInvoices(p=>p.map(i=>i.id===modal.doc.id?{...form,id:i.id}:i));
    // 車検の場合、外注先代行料を経費に自動登録
    if(form.type==="shakken"&&form.shakken?.gaiChuDaiko>0){
      const gaichu=form.shakken.gaiChuDaiko;
      const gaichuTax=form.shakken.gaiChuDaikoTax??0.1;
      const gaichuTotal=Math.floor(gaichu*(1+gaichuTax));
      const c=customers.find(c=>c.id===form.customerId);
      const desc=`車検外注代行料（${c?fullName(c):""}）`;
      // 既存の同一請求書IDの外注費があれば上書き、なければ追加
      const invId=modal.doc===null?null:modal.doc.id;
      setExpenses(p=>{
        const filtered=invId?p.filter(e=>e._invId!==invId):p;
        return [...filtered,{id:nextId(filtered),date:form.date,category:"外注費",desc,amount:gaichuTotal,receipt:false,_invId:form.id}];
      });
    }
    setModal(null);
  };
  if(modal?.mode==="repair") return <div className="stk fu"><RepairForm doc={modal.doc} customers={customers} onSave={save} onClose={()=>setModal(null)} settings={settings}/></div>;
  if(modal?.mode==="shakken") return <div className="stk fu"><ShakkenForm doc={modal.doc} customers={customers} onSave={save} onClose={()=>setModal(null)} settings={settings}/></div>;
  if(print){const c=customers.find(c=>c.id===print.customerId);const v=(c?.vehicles||[]).find(v=>v.id===print.vehicleId);return <PrintDoc type={printType} doc={print} customer={c} vehicle={v} settings={settings} onClose={()=>setPrint(null)}/>;}
  if(showTpl) return(
    <div className="stk fu">
      <div className="rb">
        <div style={{fontSize:18,fontWeight:800}}>テンプレートを選択</div>
        <button className="btn bs bsm" onClick={()=>setShowTpl(false)}>キャンセル</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14,paddingTop:4}}>
        {[
          {mode:"repair",icon:"🔧",iconBg:"rgba(0,122,255,.12)",title:"鈑金塗装・整備用",desc:"通常の修理・整備向け。部品代・技術料明細、課税合計、インボイス対応。",color:"var(--bl)"},
          {mode:"shakken",icon:"🔍",iconBg:"rgba(255,149,0,.15)",title:"車検用",desc:"車検専用。法定費用エリア（重量税・自賠責等）を自動計算。課税・非課税を分離表示。",color:"var(--or)"},
        ].map(t=>(
          <div key={t.mode} onClick={()=>{setShowTpl(false);setModal({mode:t.mode,doc:null});}}
            style={{background:"var(--bg2)",borderRadius:16,padding:"20px",boxShadow:"var(--sh)",cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
              <div style={{width:52,height:52,borderRadius:14,background:t.iconBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{t.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:800,marginBottom:6}}>{t.title}</div>
                <div style={{fontSize:13,color:"var(--lb2)",lineHeight:1.6,marginBottom:10}}>{t.desc}</div>
                <div style={{fontSize:13,fontWeight:700,color:t.color}}>選択する →</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  return(
    <div className="stk fu">
      <div className="rb">
        <div style={{fontSize:20,fontWeight:800}}>請求書</div>
        <button className="btn bp bsm" onClick={()=>setShowTpl(true)}>＋ 請求書作成</button>
      </div>

      <div className="seg">{[["all","すべて"],["unpaid","未入金"],["paid","入金済"]].map(([k,l])=><button key={k} className={`st ${tab===k?"on":""}`} onClick={()=>setTab(k)}>{l}</button>)}</div>
      <div className="seg">{[["all","全種別"],["repair","🔧 鈑金"],["shakken","🚗 車検"]].map(([k,l])=><button key={k} className={`st ${tTab===k?"on":""}`} onClick={()=>setTTab(k)}>{l}</button>)}</div>
      <div className="stk" style={{gap:9}}>
        {filtered.map(inv=>{
          const c=customers.find(c=>c.id===inv.customerId);
          const v=(c?.vehicles||[]).find(v=>v.id===inv.vehicleId);
          const isS=inv.type==="shakken";
          return(
            <div key={inv.id} onClick={()=>setModal({mode:isS?"shakken":"repair",doc:inv})}
              style={{background:"var(--bg2)",borderRadius:14,boxShadow:"var(--sh)",overflow:"hidden",cursor:"pointer",transition:"box-shadow var(--tr)"}}>
              {/* カラーバー */}
              <div style={{height:4,background:isS?"var(--bl)":"var(--or)"}}/>
              <div style={{padding:"13px 15px"}}>
                {/* 1行目: 種別バッジ + 顧客名 + 金額 */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span className={`bdg ${isS?"dbl":"dor"}`}>{isS?"🚗 車検":"🔧 鈑金修理"}</span>
                    <span style={{fontSize:16,fontWeight:700}}>{fullName(c)}</span>
                  </div>
                  <span style={{fontSize:18,fontWeight:800,color:isS?"var(--bl)":"var(--or)"}}>{fmt(gt(inv))}</span>
                </div>
                {/* 2行目: 車両 + 書類番号 + 日付 */}
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,fontSize:12,color:"var(--lb2)"}}>
                  {v&&<span>🚗 {v.carName} {v.plateNo}</span>}
                  {v&&<span>·</span>}
                  <span>{inv.id}</span>
                  <span>·</span>
                  <span>{inv.date}</span>
                  {inv.dueDate&&<><span>·</span><span>期限 {inv.dueDate}</span></>}
                </div>
                {/* 3行目: ステータス + ボタン */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span className={`bdg ${inv.status==="入金済"?"dgr":"drd"}`} style={{fontSize:12,padding:"3px 10px"}}>{inv.status}</span>
                    {(inv.payments||[]).length>0&&inv.status!=="入金済"&&(
                      <span style={{fontSize:11,color:"var(--re)",fontWeight:700}}>
                        残金 {fmt(gt(inv)-(inv.payments||[]).reduce((s,p)=>s+p.amount,0))}
                      </span>
                    )}
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}} onClick={e=>e.stopPropagation()}>
                    <button className="btn bsm" style={{background:"rgba(52,199,89,.12)",color:"#1a8f3a",fontWeight:700}} onClick={e=>{e.stopPropagation();setPayModal(inv);}}>💰 入金</button>
                    <button className="btn bsm" style={{background:"rgba(52,199,89,.12)",color:"#1a8f3a",fontWeight:700}} onClick={e=>{e.stopPropagation();setPrint(inv);setPType("invoice");}}>📄 請求書</button>
                    <button className="btn bsm" style={{background:"rgba(90,200,250,.15)",color:"#0077a8",fontWeight:700}} onClick={e=>{e.stopPropagation();setPrint(inv);setPType("delivery");}}>📦 納品書</button>
                    <button className="btn bd bsm" onClick={e=>{e.stopPropagation();if(confirm("削除？"))setInvoices(p=>p.filter(i=>i.id!==inv.id));}}>削除</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {!filtered.length&&<div className="lst"><div className="li cmu" style={{justifyContent:"center"}}>データがありません</div></div>}
      </div>
      {payModal&&<PaymentModal inv={payModal} total={gt(payModal)} onSave={updated=>{setInvoices(p=>p.map(i=>i.id===updated.id?updated:i));setPayModal(updated);}} onClose={()=>setPayModal(null)}/>}
    </div>
  );
}

// ── Combined Invoice ───────────────────────────────────────
function CombinedInvoice({invoices,customers,settings}){
  const[cid,setCid]=useState(customers[0]?.id||"");
  const[from,setFrom]=useState("");const[to,setTo]=useState("");const[print,setPrint]=useState(false);
  const gt=inv=>invTotal(inv,settings);
  const filtered=invoices.filter(i=>{if(Number(cid)&&i.customerId!==Number(cid))return false;if(from&&i.date<from)return false;if(to&&i.date>to)return false;return true;});
  const grand=filtered.reduce((s,i)=>s+gt(i),0);
  const c=customers.find(c=>c.id===Number(cid));
  const cd={date:today(),allItems:filtered.map(inv=>({id:inv.id,date:inv.date,items:inv.items,desc:inv.items.map(i=>i.desc).join("、"),subtotal:calcItems(inv.items,inv.tax||0.1).sub,taxAmt:calcItems(inv.items,inv.tax||0.1).taxAmt,total:gt(inv)})),combinedTotal:grand,combinedTax:filtered.reduce((s,inv)=>s+calcItems(inv.items,inv.tax||0.1).taxAmt,0)};
  if(print) return <PrintDoc type="combined" doc={cd} customer={c} settings={settings} onClose={()=>setPrint(false)}/>;
  return(
    <div className="stk fu">
      <div className="rb"><div style={{fontSize:20,fontWeight:800}}>合計請求書</div>{filtered.length>0&&<button className="btn bp bsm" onClick={()=>setPrint(true)}>🖨️ 印刷</button>}</div>
      <div className="card">
        <div className="g2" style={{gap:9}}>
          <Fld label="顧客"><select className="sel" value={cid} onChange={e=>setCid(e.target.value)}><option value="">全顧客</option>{customers.map(c=><option key={c.id} value={c.id}>{fullName(c)}</option>)}</select></Fld><div/>
          <Fld label="開始日"><input type="date" className="inp" value={from} onChange={e=>setFrom(e.target.value)}/></Fld>
          <Fld label="終了日"><input type="date" className="inp" value={to} onChange={e=>setTo(e.target.value)}/></Fld>
        </div>
      </div>
      {c&&<div className="card" style={{background:"rgba(0,122,255,.04)",border:"1px solid rgba(0,122,255,.15)"}}><div className="xs cmu mb4">請求先</div><div className="b7 lg">{fullName(c)}</div>{c.address&&<div className="cmu sm mt4">{c.address}</div>}</div>}
      <div className="lst">
        {filtered.map(inv=>(
          <div key={inv.id} className="li" style={{cursor:"default"}}>
            <Ico e={inv.type==="shakken"?"🚗":"🔧"} bg="rgba(0,122,255,.08)"/>
            <div style={{flex:1,minWidth:0}}><div className="b6 sm trn">{inv.items.map(i=>i.desc).join("、")}</div><div className="cmu xs">{inv.id} · {inv.date}</div></div>
            <div style={{textAlign:"right"}}><div className="b7 sm">{fmt(gt(inv))}</div><span className={`bdg ${inv.status==="入金済"?"dgr":"drd"}`}>{inv.status}</span></div>
          </div>
        ))}
        {!filtered.length&&<div className="li cmu" style={{justifyContent:"center"}}>対象データがありません</div>}
      </div>
      {filtered.length>0&&<div className="card" style={{background:"linear-gradient(135deg,#007AFF,#0055CC)",color:"#fff"}}><div className="rb"><div><div style={{fontSize:12,opacity:.8}}>{filtered.length}件の請求書</div><div style={{fontSize:23,fontWeight:800,letterSpacing:-1}}>{fmt(grand)}</div></div><div style={{fontSize:42,opacity:.3}}>Σ</div></div></div>}
    </div>
  );
}

// ── Expenses ───────────────────────────────────────────────
function Expenses({expenses,setExpenses}){
  const[modal,setModal]=useState(null);const[tab,setTab]=useState("list");
  const[form,setForm]=useState({date:today(),category:"材料費",desc:"",amount:0,receipt:false});
  const save=()=>{if(!form.desc||!form.amount)return;if(modal==="add")setExpenses(p=>[...p,{...form,id:nextId(p),amount:Number(form.amount)}]);else setExpenses(p=>p.map(e=>e.id===modal.id?{...form,id:e.id,amount:Number(form.amount)}:e));setModal(null);};
  const byCat={};expenses.forEach(e=>{byCat[e.category]=(byCat[e.category]||0)+e.amount;});
  const catE=Object.entries(byCat).sort((a,b)=>b[1]-a[1]);const mx=Math.max(...catE.map(e=>e[1]),1);
  const byM={};expenses.forEach(e=>{const m=e.date.slice(0,7);byM[m]=(byM[m]||0)+e.amount;});
  if(modal) return(
    <div className="stk fu">
      <div className="rb">
        <div style={{fontSize:18,fontWeight:800}}>{modal==="add"?"経費入力":"経費編集"}</div>
        <div style={{display:"flex",gap:6}}>
          {modal!=="add"&&<button className="btn bd bsm" onClick={()=>{if(confirm("削除？")){setExpenses(p=>p.filter(e=>e.id!==modal.id));setModal(null);}}}>削除</button>}
          <button className="btn bs bsm" onClick={()=>setModal(null)}>キャンセル</button>
          <button className="btn bp bsm" onClick={save}>保存</button>
        </div>
      </div>
      <div className="stk">
        <Fld label="日付"><input type="date" className="inp" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></Fld>
        <Fld label="内容・摘要">
          <div className="row" style={{gap:6}}>
            <input className="inp" style={{flex:1}} value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder="例: ガソリン代、塗料購入"/>
            <button className="btn bsm" style={{background:"rgba(88,86,214,.1)",color:"#5856D6",fontWeight:700,whiteSpace:"nowrap",flexShrink:0}} onClick={async()=>{
              if(!form.desc)return;
              setForm(f=>({...f,aiLoading:true}));
              try{
                const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:50,messages:[{role:"user",content:`鈑金塗装店の経費を以下のカテゴリから1つだけ選んでください。カテゴリ名のみ回答してください。\nカテゴリ: ${EXP_CAT.join("、")}\n摘要: ${form.desc}`}]})});
                const d=await res.json();
                console.log("AI仕分けレスポンス:",JSON.stringify(d));
                const cat=(d.content?.[0]?.text||"").trim();
                console.log("取得カテゴリ:",cat);
                const matched=EXP_CAT.find(c=>cat===c)||EXP_CAT.find(c=>cat.includes(c))||EXP_CAT.find(c=>c.includes(cat));
                console.log("マッチ結果:",matched);
                if(matched)setForm(f=>({...f,category:matched,aiLoading:false}));
                else setForm(f=>({...f,category:EXP_CAT[0],aiLoading:false}));
              }catch(e){console.error("AI仕分けエラー:",e);setForm(f=>({...f,aiLoading:false}));}
            }}>{form.aiLoading?"…":"🤖 AI仕分け"}</button>
          </div>
        </Fld>
        <Fld label="勘定科目（カテゴリ）">
          <select className="sel" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
            {EXP_CAT.map(c=><option key={c}>{c}</option>)}
          </select>
        </Fld>
        <Fld label="金額（円）"><input type="number" className="inp" inputMode="numeric" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))}/></Fld>
        <div className="row" style={{gap:9}}><input type="checkbox" id="rc" checked={form.receipt} onChange={e=>setForm(f=>({...f,receipt:e.target.checked}))} style={{width:16,height:16,accentColor:"var(--bl)"}}/><label htmlFor="rc" className="b6 sm" style={{cursor:"pointer"}}>領収書あり</label></div>
      </div>
    </div>
  );
  return(
    <div className="stk fu">
      <div className="rb"><div style={{fontSize:20,fontWeight:800}}>経費管理</div><button className="btn bp bsm" onClick={()=>{setForm({date:today(),category:"材料費",desc:"",amount:0,receipt:false});setModal("add");}}>＋ 入力</button></div>
      <div className="seg">{[["list","一覧"],["chart","集計"]].map(([k,l])=><button key={k} className={`st ${tab===k?"on":""}`} onClick={()=>setTab(k)}>{l}</button>)}</div>
      {tab==="list"?(
        <div className="lst">{[...expenses].sort((a,b)=>b.date.localeCompare(a.date)).map(e=>(
          <div key={e.id} className="li" onClick={()=>{setForm({...e});setModal(e);}}>
            <Ico e={e.receipt?"🧾":"📝"} bg="rgba(255,149,0,.1)"/>
            <div style={{flex:1,minWidth:0}}><div className="b6 trn">{e.desc}</div><div className="cmu sm">{e.date} · <span className="bdg dor" style={{fontSize:10}}>{e.category}</span></div></div>
            <div className="b7 sm">{fmt(e.amount)}</div>
          </div>
        ))}{!expenses.length&&<div className="li cmu" style={{justifyContent:"center"}}>経費データがありません</div>}</div>
      ):(
        <div className="stk">
          <div className="card"><div style={{fontSize:14,fontWeight:700}} className="mb12">カテゴリ別</div>
            <div className="stk" style={{gap:8}}>{catE.map(([cat,amt])=>(
              <div key={cat}><div className="rb mb4"><span className="sm b6">{cat}</span><span className="sm cmu">{fmt(amt)}</span></div>
                <div style={{height:6,background:"var(--fi)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${amt/mx*100}%`,background:"linear-gradient(90deg,#FF9500,#FF6B00)",borderRadius:3,transition:"width .8s ease"}}/></div>
              </div>
            ))}</div>
          </div>
          <div className="card"><div style={{fontSize:14,fontWeight:700}} className="mb12">月別合計</div>
            {Object.entries(byM).sort((a,b)=>b[0].localeCompare(a[0])).map(([m,amt])=>(
              <div key={m} className="rb" style={{padding:"6px 0",borderBottom:"1px solid var(--sep)"}}><span className="sm">{m}</span><span className="b7">{fmt(amt)}</span></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── CashBook ───────────────────────────────────────────────
function CashBook({invoices,expenses,settings}){
  const[year,setYear]=useState(new Date().getFullYear());
  const[month,setMonth]=useState(new Date().getMonth()+1);
  const gt=inv=>invTotal(inv,settings);
  const entries=[];
  invoices.filter(i=>yr(i.date)===year&&mo(i.date)===month).forEach(inv=>{
    if(inv.type==="shakken"){
      // 車検は外注のため、代行料のみ収入計上
      const daikoRaw=inv.shakken?.daiko??settings.daiko??0;
      const daikoTx=inv.shakken?.daikoTax??settings.daikoTax??0.1;
      const daikoAmt=calcDaiko(daikoRaw,daikoTx);
      // 整備費（自社作業分）も収入に加える
      const{total:seibiFee}=calcItems(inv.items||[],inv.tax||0.1);
      entries.push({date:inv.date,type:"収入",cat:"車検代行料",desc:"車検代行料"+(seibiFee>0?"・整備費":""),amount:daikoAmt+seibiFee,status:inv.status});
      // 法定費用は外注費として支出計上（預り金扱い）
      const govAmt=calcGovFees(inv.shakken||{});
      if(govAmt>0)entries.push({date:inv.date,type:"支出",cat:"外注費",desc:"車検法定費用（自賠責・重量税等）",amount:govAmt,status:"確定"});
    } else {
      entries.push({date:inv.date,type:"収入",cat:"鈑金修理",desc:inv.items.map(i=>i.desc).join("、"),amount:gt(inv),status:inv.status});
    }
  });
  expenses.filter(e=>yr(e.date)===year&&mo(e.date)===month).forEach(exp=>{entries.push({date:exp.date,type:"支出",cat:exp.category,desc:exp.desc,amount:exp.amount,status:"確定"});});
  entries.sort((a,b)=>a.date.localeCompare(b.date));
  let bal=0;const rows=entries.map(e=>{if(e.type==="収入")bal+=e.amount;else bal-=e.amount;return{...e,bal};});
  const tIn=entries.filter(e=>e.type==="収入").reduce((s,e)=>s+e.amount,0);
  const tOut=entries.filter(e=>e.type==="支出").reduce((s,e)=>s+e.amount,0);
  return(
    <div className="stk fu">
      <div className="rb">
        <div style={{fontSize:20,fontWeight:800}}>金銭出納帳</div>
        <div className="row" style={{gap:6}}>
          <button className="btn bs bsm" onClick={()=>setYear(y=>y-1)}>‹</button>
          <span className="b7">{year}年</span>
          <button className="btn bs bsm" onClick={()=>setYear(y=>y+1)}>›</button>
          <select className="sel" style={{width:75,padding:"5px 9px",fontSize:12}} value={month} onChange={e=>setMonth(Number(e.target.value))}>
            {Array.from({length:12},(_,i)=><option key={i+1} value={i+1}>{i+1}月</option>)}
          </select>
        </div>
      </div>
      <div className="g3" style={{gap:9}}>
        {[["収入合計",tIn,"#007AFF"],["支出合計",tOut,"#FF9500"],["差引",tIn-tOut,(tIn-tOut)>=0?"#34C759":"#FF3B30"]].map(([l,v,c])=>(
          <div key={l} className="card" style={{borderTop:`3px solid ${c}`}}><div className="cmu sm">{l}</div><div style={{fontSize:19,fontWeight:800,color:c,marginTop:3}}>{fmt(v)}</div></div>
        ))}
      </div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table className="tbl" style={{minWidth:620}}>
            <thead><tr><th>日付</th><th>種別</th><th>カテゴリ</th><th>内容</th><th style={{textAlign:"right"}}>収入</th><th style={{textAlign:"right"}}>支出</th><th style={{textAlign:"right"}}>残高</th><th>状態</th></tr></thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i}>
                  <td className="sm">{r.date}</td>
                  <td><span className={`bdg ${r.type==="収入"?"dgr":"dor"}`}>{r.type}</span></td>
                  <td className="sm">{r.cat}</td>
                  <td className="sm" style={{maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.desc}</td>
                  <td style={{textAlign:"right",color:"var(--gr)",fontWeight:600,fontSize:13}}>{r.type==="収入"?fmt(r.amount):"—"}</td>
                  <td style={{textAlign:"right",color:"var(--or)",fontSize:13}}>{r.type==="支出"?fmt(r.amount):"—"}</td>
                  <td style={{textAlign:"right",fontWeight:700,fontSize:13,color:r.bal>=0?"var(--lb)":"var(--re)"}}>{fmt(r.bal)}</td>
                  <td><span className={`bdg ${r.status==="入金済"||r.status==="確定"?"dgr":"drd"}`}>{r.status}</span></td>
                </tr>
              ))}
              {!rows.length&&<tr><td colSpan={8} style={{textAlign:"center",color:"var(--lb2)",padding:18}}>この月の取引はありません</td></tr>}
            </tbody>
            {rows.length>0&&<tfoot><tr style={{background:"var(--grp)",fontWeight:700}}><td colSpan={4} className="sm">月計</td><td style={{textAlign:"right",color:"var(--gr)",fontSize:13}}>{fmt(tIn)}</td><td style={{textAlign:"right",color:"var(--or)",fontSize:13}}>{fmt(tOut)}</td><td style={{textAlign:"right",fontSize:13,color:(tIn-tOut)>=0?"var(--lb)":"var(--re)"}}>{fmt(tIn-tOut)}</td><td/></tr></tfoot>}
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Sales Report ───────────────────────────────────────────
function SalesReport({invoices,expenses,settings}){
  const[year,setYear]=useState(new Date().getFullYear());
  const gt=inv=>invTotal(inv,settings);
  const data=Array.from({length:12},(_,i)=>{const m=i+1;const s=invoices.filter(inv=>yr(inv.date)===year&&mo(inv.date)===m).reduce((sum,i)=>sum+gt(i),0);const e=expenses.filter(e=>yr(e.date)===year&&mo(e.date)===m).reduce((sum,e)=>sum+e.amount,0);return{m,s,e,p:s-e};});
  const tots=data.reduce((t,d)=>({s:t.s+d.s,e:t.e+d.e,p:t.p+d.p}),{s:0,e:0,p:0});
  const mx=Math.max(...data.map(d=>d.s),1);
  return(
    <div className="stk fu">
      <div className="rb"><div style={{fontSize:20,fontWeight:800}}>売上・集計</div><div className="row" style={{gap:6}}><button className="btn bs bsm" onClick={()=>setYear(y=>y-1)}>‹</button><span className="b7">{year}年</span><button className="btn bs bsm" onClick={()=>setYear(y=>y+1)}>›</button></div></div>
      <div className="g3" style={{gap:9}}>{[["売上合計",tots.s,"#007AFF"],["経費合計",tots.e,"#FF9500"],["利益",tots.p,tots.p>=0?"#34C759":"#FF3B30"]].map(([l,v,c])=>(
        <div key={l} className="card" style={{borderTop:`3px solid ${c}`}}><div className="cmu sm">{l}</div><div style={{fontSize:20,fontWeight:800,color:c,marginTop:3}}>{fmt(v)}</div></div>
      ))}</div>
      <div className="card">
        <div style={{fontSize:14,fontWeight:700}} className="mb12">月別売上グラフ</div>
        <div style={{display:"flex",alignItems:"flex-end",gap:3,height:145}}>
          {data.map(d=>(
            <div key={d.m} style={{flex:"1 0 26px",display:"flex",flexDirection:"column",alignItems:"center",gap:3,height:"100%"}}>
              <div style={{flex:1,display:"flex",alignItems:"flex-end",width:"100%"}}>
                <div style={{width:"100%",background:"rgba(0,122,255,.1)",borderRadius:"4px 4px 0 0",position:"relative",minHeight:3}}>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,background:d.s?"linear-gradient(180deg,#34AAFF,#007AFF)":"transparent",borderRadius:"4px 4px 0 0",height:`${Math.round(d.s/mx*100)}%`,transition:"height .8s ease"}}/>
                </div>
              </div>
              <div className="xs cmu">{d.m}月</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{padding:0,overflow:"hidden"}}><div style={{overflowX:"auto"}}>
        <table className="tbl" style={{minWidth:480}}>
          <thead><tr>{["月","売上","経費","利益","利益率"].map(h=><th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {data.map(d=><tr key={d.m}><td className="b6">{d.m}月</td><td className="cbl b6">{d.s?fmt(d.s):"—"}</td><td style={{color:"var(--or)"}}>{d.e?fmt(d.e):"—"}</td><td className={d.p>=0?"cgr b6":"cre b6"}>{d.s||d.e?fmt(d.p):"—"}</td><td className="cmu">{d.s?`${Math.round(d.p/d.s*100)}%`:"—"}</td></tr>)}
            <tr style={{background:"var(--grp)",fontWeight:700}}><td>合計</td><td className="cbl">{fmt(tots.s)}</td><td style={{color:"var(--or)"}}>{fmt(tots.e)}</td><td className={tots.p>=0?"cgr":"cre"}>{fmt(tots.p)}</td><td className="cmu">{tots.s?`${Math.round(tots.p/tots.s*100)}%`:"—"}</td></tr>
          </tbody>
        </table>
      </div></div>
    </div>
  );
}

// ── White Declaration ──────────────────────────────────────
function WhiteDeclaration({invoices,expenses,settings}){
  const[year,setYear]=useState(new Date().getFullYear()-1);
  const[showPrint,setShowPrint]=useState(false);
  // 基本集計
  const gt=inv=>invTotal(inv,settings);
  const yInv=invoices.filter(i=>yr(i.date)===year&&i.status!=="見積中");
  const yExp=expenses.filter(e=>yr(e.date)===year);
  const tS=yInv.reduce((s,i)=>s+gt(i),0);
  const tE=yExp.reduce((s,e)=>s+e.amount,0);
  const prof=tS-tE;
  // 経費科目別
  const kGroup={};yExp.forEach(e=>{const k=KAMOKU[e.category]||"雑費";kGroup[k]=(kGroup[k]||0)+e.amount;});
  // 月別
  const monthly=Array.from({length:12},(_,i)=>{
    const m=i+1;
    const s=yInv.filter(inv=>mo(inv.date)===m).reduce((sum,inv)=>sum+gt(inv),0);
    const e=yExp.filter(ex=>mo(ex.date)===m).reduce((sum,ex)=>sum+ex.amount,0);
    return{m,s,e,p:s-e};
  });
  const q4=Array.from({length:4},(_,q)=>({q:q+1,s:monthly.slice(q*3,q*3+3).reduce((sum,d)=>sum+d.s,0)}));
  // 経費カテゴリ一覧（収支内訳書の科目順）
  const EXP_ROWS=[
    {label:"売上原価（材料費等）",key:"売上原価（仕入）"},
    {label:"給料賃金",key:"給料賃金"},
    {label:"外注工賃",key:"外注工賃"},
    {label:"減価償却費",key:"減価償却費"},
    {label:"貸倒金",key:"貸倒金"},
    {label:"地代家賃",key:"地代家賃"},
    {label:"利子割引料",key:"利子割引料"},
    {label:"租税公課",key:"租税公課"},
    {label:"水道光熱費",key:"水道光熱費"},
    {label:"旅費交通費",key:"旅費交通費"},
    {label:"通信費",key:"通信費"},
    {label:"広告宣伝費",key:"広告宣伝費"},
    {label:"損害保険料",key:"損害保険料"},
    {label:"修繕費",key:"修繕費"},
    {label:"消耗品費",key:"消耗品費"},
    {label:"工具・器具・備品",key:"工具・器具・備品"},
    {label:"雑費",key:"雑費"},
  ];

  // 印刷処理
  const handlePrint=()=>{
    const w=window.open("","_blank","width=900,height=1200");
    if(!w)return;
    const fmtN=n=>n?Number(n).toLocaleString():"";
    const fmtR=n=>n?`¥${Number(n).toLocaleString()}`:"";
    const shopName=settings.shopName||"";
    const shopAddr=settings.shopAddress||"";
    const shopTel=settings.shopTel||"";
    const invNo=settings.invoiceNo||"";

    const expRows=EXP_ROWS.map(r=>({...r,v:kGroup[r.key]||0}));
    const expOther=tE-expRows.reduce((s,r)=>s+r.v,0);

    w.document.write(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
<title>収支内訳書 ${year}年分</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
@page{size:A4 portrait;margin:8mm 10mm;}
body{font-family:'MS Mincho','游明朝',serif;font-size:9px;color:#000;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.page{width:100%;page-break-after:always;}
.page:last-child{page-break-after:auto;}
h1{font-size:15px;font-weight:bold;text-align:center;padding:7px 0 4px;border-bottom:2px solid #000;margin-bottom:5px;}
h2{font-size:11px;font-weight:bold;border-bottom:1px solid #000;padding:3px 0;margin:8px 0 4px;}
table{width:100%;border-collapse:collapse;}
td,th{border:1px solid #666;padding:3px 5px;font-size:9px;vertical-align:top;}
th{background:#f0f0f0;font-weight:bold;text-align:center;white-space:nowrap;}
.num{text-align:right;font-family:'Courier New',monospace;}
.center{text-align:center;}
.total-row td{background:#e8e8e8;font-weight:bold;}
.highlight td{background:#fff8e1;}
.section{border:1.5px solid #333;margin-bottom:8px;padding:6px 8px;}
.row2{display:flex;gap:8px;}
.half{flex:1;}
.info-grid{display:grid;grid-template-columns:90px 1fr;gap:2px 6px;font-size:9px;margin-bottom:4px;}
.info-label{color:#555;white-space:nowrap;}
.big-num{font-size:18px;font-weight:bold;font-family:'Courier New',monospace;color:#000;}
.monthly-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;}
.mcard{border:1px solid #ccc;padding:3px 5px;font-size:8px;}
.mcard .mhd{font-weight:bold;border-bottom:1px solid #eee;margin-bottom:2px;}
.sign-box{border:1.5px solid #333;height:60px;display:flex;align-items:flex-end;padding:4px 6px;font-size:8px;color:#888;margin-top:4px;}
.note{font-size:8px;color:#555;margin-top:3px;line-height:1.5;}
.caution{border:1px solid #e68a00;background:#fffbf0;padding:5px 8px;font-size:8px;margin-bottom:6px;line-height:1.6;}
.blank-line{border-bottom:1px solid #aaa;min-height:18px;margin-bottom:2px;}
.field-row{display:flex;align-items:flex-end;gap:4px;margin-bottom:5px;font-size:9px;}
.field-row label{white-space:nowrap;color:#555;}
.underline{flex:1;border-bottom:1px solid #333;min-height:16px;}
.receipt-table td{font-size:8px;padding:2px 4px;}
</style></head><body>

<!-- ページ1: 収支内訳書 第1面 -->
<div class="page">
  <h1>収支内訳書（一般用）　${year}年分　白色申告用</h1>
  <div class="caution">
    ⚠️ この書類はシステムのデータから自動生成した下書きです。実際の申告前に数字を確認し、税務署または税理士に相談してください。
    マイナンバー・控除額等は手書きで記入してください。提出前に確定申告書（第一表・第二表）も別途作成が必要です。
  </div>

  <!-- 事業者情報 -->
  <div class="section">
    <div class="row2">
      <div class="half">
        <table>
          <tr><th style="width:90px">屋号・事業名</th><td>${shopName}</td></tr>
          <tr><th>住所</th><td>${shopAddr}</td></tr>
          <tr><th>電話番号</th><td>${shopTel}</td></tr>
          <tr><th>業種</th><td>自動車鈑金塗装業</td></tr>
          <tr><th>インボイス登録番号</th><td>${invNo}</td></tr>
          <tr><th>氏名（署名）</th><td><div class="blank-line" style="width:160px"></div></td></tr>
          <tr><th>マイナンバー</th><td><div class="blank-line" style="width:160px"></div><div class="note">※提出時に記入してください</div></td></tr>
        </table>
      </div>
      <div class="half">
        <table>
          <tr><th>税務署名</th><td><div class="blank-line"></div></td></tr>
          <tr><th>申告期限</th><td>${year+1}年3月17日（月）</td></tr>
          <tr><th>帳簿種類</th><td>現金主義・簡易帳簿</td></tr>
          <tr><th>消費税区分</th><td>簡易課税 / 本則課税 / 免税（○をつける）</td></tr>
        </table>
        <div class="note" style="margin-top:5px">
          ※ 収支内訳書は確定申告書（第一表）に添付して提出してください<br>
          ※ 電子申告（e-Tax）の場合は添付不要です
        </div>
      </div>
    </div>
  </div>

  <!-- 売上・所得 -->
  <div class="section">
    <h2>① 売上（収入）金額・仕入金額・経費</h2>
    <table>
      <tr>
        <th style="width:30%">区分</th>
        <th style="width:20%">第1期（1〜3月）</th>
        <th style="width:20%">第2期（4〜6月）</th>
        <th style="width:20%">第3期（7〜9月）</th>
        <th style="width:20%">第4期（10〜12月）</th>
      </tr>
      <tr>
        <td>売上金額（税込）</td>
        ${q4.map(q=>`<td class="num">${fmtN(q.s)}</td>`).join("")}
      </tr>
      <tr class="total-row">
        <td>年間売上合計</td>
        <td class="num" colspan="4" style="font-size:14px;text-align:right">${fmtR(tS)}</td>
      </tr>
    </table>
    <div class="note">※ 上記は請求書データから自動集計。入金ベースで確認・修正してください。消費税が含まれる場合は税抜きに修正が必要です。</div>
  </div>

  <!-- 経費内訳 -->
  <div class="section">
    <h2>② 必要経費の内訳</h2>
    <table>
      <tr><th style="width:50%">経費科目</th><th style="width:25%">金額</th><th style="width:25%">備考</th></tr>
      ${expRows.map(r=>`<tr ${r.v?'class="highlight"':''}>
        <td>${r.label}</td>
        <td class="num">${r.v?fmtN(r.v):""}</td>
        <td></td>
      </tr>`).join("")}
      ${expOther>0?`<tr class="highlight"><td>その他（未分類）</td><td class="num">${fmtN(expOther)}</td><td></td></tr>`:""}
      <tr class="total-row"><td><strong>必要経費　合計</strong></td><td class="num">${fmtR(tE)}</td><td></td></tr>
    </table>
  </div>

  <!-- 所得金額 -->
  <div class="section" style="border:2px solid #333">
    <table>
      <tr>
        <th style="width:33%">① 売上金額</th>
        <th style="width:5%;border:none;background:none;font-size:14px">－</th>
        <th style="width:33%">② 必要経費合計</th>
        <th style="width:5%;border:none;background:none;font-size:14px">＝</th>
        <th style="width:33%">③ 所得金額（概算）</th>
      </tr>
      <tr>
        <td class="num big-num">${fmtR(tS)}</td>
        <td style="border:none;background:none"></td>
        <td class="num big-num">${fmtR(tE)}</td>
        <td style="border:none;background:none"></td>
        <td class="num big-num" style="color:${prof>=0?"#000":"#cc0000"}">${fmtR(prof)}</td>
      </tr>
    </table>
    <div class="note" style="margin-top:4px">
      ※ 所得金額から各種控除（基礎控除48万円・社会保険料控除等）を差し引いた「課税所得金額」に税率をかけて税額を計算します。<br>
      ※ 「基礎控除申告書兼配偶者控除等申告書」も忘れずに作成してください。
    </div>
  </div>
</div>

<!-- ページ2: 月別売上明細 + 経費明細 -->
<div class="page">
  <h1>収支内訳書　付表　${year}年分　月別・経費明細</h1>

  <h2>月別 売上・経費・利益 一覧</h2>
  <table>
    <thead>
      <tr>
        <th>月</th>
        <th>売上金額</th>
        <th>必要経費</th>
        <th>差引利益</th>
        <th>利益率</th>
        <th>件数</th>
        <th>備考</th>
      </tr>
    </thead>
    <tbody>
      ${monthly.map(d=>`<tr ${d.s||d.e?'class="highlight"':''}>
        <td class="center">${d.m}月</td>
        <td class="num">${d.s?fmtN(d.s):""}</td>
        <td class="num">${d.e?fmtN(d.e):""}</td>
        <td class="num" style="${d.p<0?"color:#cc0000":""}">${d.s||d.e?fmtN(d.p):""}</td>
        <td class="center">${d.s?Math.round(d.p/d.s*100)+"%":""}</td>
        <td class="center">${yInv.filter(i=>mo(i.date)===d.m).length||""}</td>
        <td></td>
      </tr>`).join("")}
      <tr class="total-row">
        <td class="center">合計</td>
        <td class="num">${fmtN(tS)}</td>
        <td class="num">${fmtN(tE)}</td>
        <td class="num">${fmtN(prof)}</td>
        <td class="center">${tS?Math.round(prof/tS*100)+"%":""}</td>
        <td class="center">${yInv.length}</td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <h2 style="margin-top:12px">経費　領収書一覧</h2>
  <table class="receipt-table">
    <thead>
      <tr>
        <th style="width:12%">日付</th>
        <th style="width:20%">科目</th>
        <th style="width:40%">内容・摘要</th>
        <th style="width:18%">金額</th>
        <th style="width:10%">領収書</th>
      </tr>
    </thead>
    <tbody>
      ${yExp.length===0?`<tr><td colspan="5" class="center">経費データなし</td></tr>`
        :yExp.sort((a,b)=>a.date>b.date?1:-1).map(e=>`<tr>
        <td class="center">${e.date}</td>
        <td>${e.category}</td>
        <td>${e.desc||""}</td>
        <td class="num">${fmtN(e.amount)}</td>
        <td class="center">${e.receipt?"✓":""}</td>
      </tr>`).join("")}
      <tr class="total-row">
        <td colspan="3">経費合計</td>
        <td class="num">${fmtN(tE)}</td>
        <td class="center">${yExp.filter(e=>e.receipt).length}/${yExp.length}件</td>
      </tr>
    </tbody>
  </table>
  <div class="note">※ 領収書のない経費は税務調査で否認されることがあります。領収書は7年間保存してください。</div>
</div>

<!-- ページ3: 売上明細 -->
<div class="page">
  <h1>売上明細　${year}年分（請求書データ）</h1>
  <div class="note" style="margin-bottom:6px">※ この一覧は請求書データから自動生成しています。実際の入金日・金額と照合してください。</div>
  <table>
    <thead>
      <tr>
        <th style="width:5%">No.</th>
        <th style="width:12%">請求日</th>
        <th style="width:12%">種別</th>
        <th style="width:30%">顧客</th>
        <th style="width:15%">ステータス</th>
        <th style="width:16%">請求金額</th>
        <th style="width:10%">備考</th>
      </tr>
    </thead>
    <tbody>
      ${yInv.length===0?`<tr><td colspan="7" class="center">請求書データなし</td></tr>`
        :yInv.sort((a,b)=>a.date>b.date?1:-1).map((inv,idx)=>{
          const c=invoices&&inv.customerId?"":"";
          const typeLabel=inv.type==="shakken"?"車検":inv.type==="repair"?"鈑金修理":"見積";
          return`<tr>
          <td class="center">${idx+1}</td>
          <td class="center">${inv.date}</td>
          <td class="center">${typeLabel}</td>
          <td>${inv.note||""}</td>
          <td class="center">${inv.status||""}</td>
          <td class="num">${fmtN(gt(inv))}</td>
          <td></td>
        </tr>`;}).join("")}
      <tr class="total-row">
        <td colspan="5">合計 ${yInv.length}件</td>
        <td class="num">${fmtN(tS)}</td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <h2 style="margin-top:14px">確定申告　提出書類チェックリスト</h2>
  <table>
    <tr><th style="width:5%">✓</th><th>書類名</th><th>入手方法</th><th>備考</th></tr>
    ${[
      ["確定申告書 B（第一表・第二表）","国税庁サイトまたは税務署","所得・控除を記入して提出"],
      ["収支内訳書（本書）","本システムから印刷","売上・経費の内訳"],
      ["マイナンバーカードまたは通知カード","お手元に準備","本人確認書類として必要"],
      ["社会保険料（国民健康保険・国民年金）控除証明書","各機関から郵送","年間支払額を申告書に記入"],
      ["生命保険料控除証明書","保険会社から郵送","加入している場合"],
      ["医療費控除の明細書","自分で作成","10万円超の場合"],
      ["青色申告承認申請書（翌年から青色の場合）","国税庁サイト","3月15日までに提出"],
      ["源泉徴収票（給与所得がある場合）","勤務先から受け取り","兼業の場合"],
    ].map(([name,how,note])=>`<tr><td class="center"><div class="blank-line" style="width:14px;height:14px;border:1px solid #333;display:inline-block"></div></td><td>${name}</td><td style="font-size:8px">${how}</td><td style="font-size:8px">${note}</td></tr>`).join("")}
  </table>

  <div class="section" style="margin-top:14px">
    <h2 style="margin:0 0 6px">手書き記入欄（控除等）</h2>
    ${[
      ["基礎控除額","480,000円（所得2,400万円以下の場合）"],
      ["社会保険料控除","国民健康保険＋国民年金の合計：　　　　　　円"],
      ["生命保険料控除","　　　　　　　　　　　　　　　　　　　　　円"],
      ["医療費控除","（総額）　　　　　　　円 ー10万円 ＝ 　　　　　　円"],
      ["配偶者控除","　　　　　　　　　　　　　　　　　　　　　円"],
      ["扶養控除","扶養人数　　　人 × 38万円 ＝ 　　　　　　円"],
      ["課税所得金額","所得金額 ー 各種控除合計 ＝ 　　　　　　　　円"],
      ["税額（所得税）","課税所得 × 税率 ー 控除額 ＝ 　　　　　　　円"],
    ].map(([l,v])=>`<div class="field-row"><label style="width:130px">${l}</label><div class="underline" style="font-size:8px;color:#888;padding-bottom:1px">${v}</div></div>`).join("")}
  </div>

  <div class="note" style="margin-top:8px;padding:5px 8px;border:1px solid #ccc;">
    <strong>所得税の税率表（参考）</strong><br>
    195万円以下：5%　195〜330万円：10%（控除9.75万円）　330〜695万円：20%（控除42.75万円）<br>
    695〜900万円：23%（控除63.6万円）　900〜1,800万円：33%（控除153.6万円）　1,800万円超：40%以上
  </div>
</div>

</body></html>`);
    w.document.close();
    setTimeout(()=>w.print(),600);
  };

  return(
    <div className="stk fu">
      <div className="rb">
        <div>
          <div style={{fontSize:20,fontWeight:800}}>確定申告（白色）</div>
          <div className="cmu sm mt4">{year}年分 収支内訳書</div>
        </div>
        <div className="row" style={{gap:6}}>
          <button className="btn bs bsm" onClick={()=>setYear(y=>y-1)}>‹</button>
          <span className="b7">{year}年分</span>
          <button className="btn bs bsm" onClick={()=>setYear(y=>y+1)}>›</button>
          <button className="btn bp bsm" onClick={handlePrint} style={{marginLeft:4}}>🖨️ 申告書類を印刷</button>
        </div>
      </div>

      {/* サマリーカード */}
      <div className="g3" style={{gap:9}}>
        {[["売上金額",tS,"#007AFF"],["必要経費",tE,"#FF9500"],["所得金額（概算）",prof,prof>=0?"#34C759":"#FF3B30"]].map(([l,v,c])=>(
          <div key={l} className="card" style={{borderTop:`3px solid ${c}`}}>
            <div className="cmu sm">{l}</div>
            <div style={{fontSize:20,fontWeight:800,color:c,marginTop:3}}>{fmt(v)}</div>
          </div>
        ))}
      </div>

      {/* 申告書印刷案内 */}
      <div className="card" style={{background:"linear-gradient(135deg,rgba(0,122,255,.06),rgba(52,199,89,.06))",border:"1.5px solid rgba(0,122,255,.25)"}}>
        <div className="row mb8" style={{gap:8}}><span style={{fontSize:20}}>📋</span><span style={{fontWeight:700,fontSize:14}}>印刷すると3ページ出力されます</span></div>
        <div className="stk" style={{gap:4}}>
          {[
            ["第1ページ","収支内訳書（第1面） — 売上・経費・所得金額"],
            ["第2ページ","付表 — 月別集計・経費領収書一覧"],
            ["第3ページ","売上明細・提出チェックリスト・控除記入欄"],
          ].map(([p,d])=>(
            <div key={p} className="row" style={{gap:8,padding:"4px 0",borderBottom:"1px solid var(--sep)"}}>
              <span className="bdg dbl" style={{flexShrink:0,width:70,justifyContent:"center"}}>{p}</span>
              <span className="sm">{d}</span>
            </div>
          ))}
        </div>
        <button className="btn bp mt12" style={{width:"100%",fontSize:15,padding:"12px"}} onClick={handlePrint}>
          🖨️　{year}年分 申告書類を印刷する
        </button>
        <div className="xs cmu mt8">※ 印刷後、マイナンバー・各種控除額を手書きで記入してください</div>
      </div>

      {/* 収支内訳書プレビュー */}
      <div className="card">
        <div style={{fontSize:14,fontWeight:700,marginBottom:11}}>📊 収支内訳書　プレビュー（{year}年分）</div>
        {/* 売上 */}
        <div style={{marginBottom:12}}>
          <div className="fl" style={{marginBottom:6}}>① 売上金額（四半期別）</div>
          <div className="g4" style={{gap:6}}>
            {q4.map(q=>(
              <div key={q.q} style={{background:"rgba(0,122,255,.06)",borderRadius:8,padding:"7px 10px",border:"1px solid rgba(0,122,255,.15)"}}>
                <div className="xs cmu">第{q.q}期</div>
                <div className="b6 sm cbl">{fmt(q.s)}</div>
              </div>
            ))}
          </div>
          <div className="rb mt8" style={{padding:"6px 10px",background:"rgba(0,122,255,.06)",borderRadius:8}}>
            <span className="b6">年間売上合計</span><span className="b7 cbl" style={{fontSize:16}}>{fmt(tS)}</span>
          </div>
        </div>
        {/* 経費 */}
        <div style={{marginBottom:12}}>
          <div className="fl" style={{marginBottom:6}}>② 必要経費の内訳</div>
          <div className="lst">
            {EXP_ROWS.filter(r=>kGroup[r.key]).map(r=>(
              <div key={r.key} className="rb li" style={{padding:"7px 12px"}}>
                <span className="sm">{r.label}</span>
                <span className="sm b6">{fmt(kGroup[r.key])}</span>
              </div>
            ))}
            {Object.keys(kGroup).filter(k=>!EXP_ROWS.find(r=>r.key===k)).map(k=>(
              <div key={k} className="rb li" style={{padding:"7px 12px"}}>
                <span className="sm">{k}</span><span className="sm b6">{fmt(kGroup[k])}</span>
              </div>
            ))}
            {!Object.keys(kGroup).length&&<div className="li cmu" style={{justifyContent:"center"}}>経費データなし</div>}
          </div>
          <div className="rb mt6" style={{padding:"6px 10px",background:"rgba(255,149,0,.08)",borderRadius:8}}>
            <span className="b6">必要経費合計</span><span className="b7" style={{fontSize:16,color:"var(--or)"}}>{fmt(tE)}</span>
          </div>
        </div>
        {/* 所得 */}
        <div style={{padding:"10px 14px",background:prof>=0?"rgba(52,199,89,.08)":"rgba(255,59,48,.06)",borderRadius:10,border:`2px solid ${prof>=0?"rgba(52,199,89,.3)":"rgba(255,59,48,.3)"}`}}>
          <div className="rb">
            <span style={{fontWeight:700}}>③ 所得金額（概算）</span>
            <span style={{fontSize:22,fontWeight:800,color:prof>=0?"var(--gr)":"var(--re)"}}>{fmt(prof)}</span>
          </div>
          <div className="xs cmu mt4">売上 {fmt(tS)} ー 経費 {fmt(tE)}</div>
          <div className="xs cmu mt4">※ 各種控除を差し引いた後の課税所得に税率をかけて税額が決まります</div>
        </div>
      </div>

      {/* 月別テーブル */}
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"10px 14px 8px",fontWeight:700,fontSize:13,borderBottom:"1px solid var(--sep)"}}>月別 売上・経費・利益</div>
        <div style={{overflowX:"auto"}}>
          <table className="tbl" style={{minWidth:420}}>
            <thead><tr>{["月","売上","経費","利益","利益率"].map(h=><th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {monthly.map(d=>(
                <tr key={d.m}>
                  <td className="b6">{d.m}月</td>
                  <td style={{textAlign:"right",color:"var(--bl)",fontWeight:600,fontSize:13}}>{d.s?fmt(d.s):"—"}</td>
                  <td style={{textAlign:"right",color:"var(--or)",fontSize:13}}>{d.e?fmt(d.e):"—"}</td>
                  <td style={{textAlign:"right",fontWeight:700,fontSize:13,color:d.p<0?"var(--re)":"var(--lb)"}}>{d.s||d.e?fmt(d.p):"—"}</td>
                  <td style={{textAlign:"right",fontSize:11,color:"var(--lb2)"}}>{d.s?`${Math.round(d.p/d.s*100)}%`:"—"}</td>
                </tr>
              ))}
              <tr style={{background:"var(--grp)",fontWeight:700}}>
                <td>合計</td>
                <td style={{textAlign:"right",color:"var(--bl)",fontSize:13}}>{fmt(tS)}</td>
                <td style={{textAlign:"right",color:"var(--or)",fontSize:13}}>{fmt(tE)}</td>
                <td style={{textAlign:"right",fontSize:13,color:prof>=0?"var(--lb)":"var(--re)"}}>{fmt(prof)}</td>
                <td style={{textAlign:"right",fontSize:11}}>{tS?`${Math.round(prof/tS*100)}%`:"—"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 注意書き */}
      <div className="card" style={{background:"rgba(255,149,0,.06)",border:"1px solid rgba(255,149,0,.25)"}}>
        <div className="row mb6" style={{gap:6}}><Ico e="⚠️" bg="rgba(255,149,0,.12)" sz={13}/><span className="b6 sm">申告にあたっての注意事項</span></div>
        <div className="stk xs cmu" style={{gap:4,lineHeight:1.7}}>
          <div>・売上金額は「税抜き」で記入するのが原則です（消費税課税事業者の場合）</div>
          <div>・領収書のない経費は否認されることがあります（7年間保存）</div>
          <div>・所得金額から基礎控除48万円・社会保険料控除等を引いた「課税所得」に税率を適用します</div>
          <div>・申告期限：{year+1}年3月17日（月）　納付期限：同日</div>
          <div>・青色申告に切り替えると最大65万円の特別控除が受けられます（前年3月15日までに申請必要）</div>
        </div>
      </div>
    </div>
  );
}

// ── Settings ───────────────────────────────────────────────
// ── 作業マスター サジェスト入力 ───────────────────────────
function ItemSuggest({value,onChange,onSelect,workMaster=[],placeholder="作業内容・品名"}){
  const[show,setShow]=useState(false);
  const[focused,setFocused]=useState(false);
  const filtered=(workMaster||[]).filter(w=>w.desc.includes(value)&&value.length>0);
  return(
    <div style={{position:"relative",flex:1}}>
      <input className="inp" placeholder={placeholder} value={value}
        onChange={e=>{onChange(e.target.value);setShow(true);}}
        onFocus={()=>{setFocused(true);setShow(true);}}
        onBlur={()=>{setTimeout(()=>setShow(false),200);}}
      />
      {show&&focused&&filtered.length>0&&(
        <div style={{position:"absolute",top:"100%",left:0,right:0,background:"var(--bg2)",border:"1px solid var(--sep)",borderRadius:10,boxShadow:"var(--sh)",zIndex:500,maxHeight:200,overflowY:"auto"}}>
          {filtered.map(w=>(
            <div key={w.id} onMouseDown={()=>{onSelect(w);setShow(false);}}
              style={{padding:"10px 14px",cursor:"pointer",borderBottom:"1px solid var(--sep)",fontSize:13}}
              onMouseEnter={e=>e.currentTarget.style.background="var(--fi)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{fontWeight:600}}>{w.desc}</div>
              <div style={{fontSize:11,color:"var(--lb3)"}}>
                {w.unit&&`単位: ${w.unit}`}
                {w.partsCost>0&&` / 部品代: ¥${w.partsCost.toLocaleString()}`}
                {w.gijutsu>0&&` / 技術料: ¥${w.gijutsu.toLocaleString()}`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── 作業マスター管理（設定内） ─────────────────────────────
function WorkMasterSettings({workMaster=[],onChange}){
  const[editId,setEditId]=useState(null);
  const[form,setForm]=useState({desc:"",unit:"式",partsCost:0,gijutsu:0});
  const startEdit=w=>{setEditId(w.id);setForm({desc:w.desc,unit:w.unit,partsCost:w.partsCost,gijutsu:w.gijutsu});};
  const startAdd=()=>{setEditId("new");setForm({desc:"",unit:"式",partsCost:0,gijutsu:0});};
  const save=()=>{
    if(!form.desc)return;
    if(editId==="new")onChange([...workMaster,{...form,id:Date.now(),partsCost:Number(form.partsCost),gijutsu:Number(form.gijutsu)}]);
    else onChange(workMaster.map(w=>w.id===editId?{...w,...form,partsCost:Number(form.partsCost),gijutsu:Number(form.gijutsu)}:w));
    setEditId(null);
  };
  const del=id=>onChange(workMaster.filter(w=>w.id!==id));
  return(
    <div className="card">
      <div className="rb mb12">
        <div style={{fontSize:14,fontWeight:800}}>🔧 作業マスター</div>
        <button className="btn bp bsm" onClick={startAdd}>＋ 追加</button>
      </div>
      {editId&&(
        <div style={{background:"var(--fi2)",borderRadius:10,padding:"12px",marginBottom:12}}>
          <div className="stk" style={{gap:8}}>
            <Fld label="作業内容・品名"><input className="inp" value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder="例: バンパー修理・塗装"/></Fld>
            <div className="g3" style={{gap:8}}>
              <Fld label="単位"><input className="inp" value={form.unit} onChange={e=>setForm(f=>({...f,unit:e.target.value}))} placeholder="式"/></Fld>
              <Fld label="部品代（税抜）"><input type="number" className="inp" value={form.partsCost} onChange={e=>setForm(f=>({...f,partsCost:e.target.value}))}/></Fld>
              <Fld label="技術料（税抜）"><input type="number" className="inp" value={form.gijutsu} onChange={e=>setForm(f=>({...f,gijutsu:e.target.value}))}/></Fld>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button className="btn bs bsm" onClick={()=>setEditId(null)}>キャンセル</button>
              <button className="btn bp bsm" onClick={save}>保存</button>
            </div>
          </div>
        </div>
      )}
      <div className="lst">
        {workMaster.length===0&&<div className="li cmu" style={{justifyContent:"center"}}>マスター未登録</div>}
        {workMaster.map(w=>(
          <div key={w.id} className="fr">
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:700}}>{w.desc}</div>
              <div style={{fontSize:11,color:"var(--lb3)"}}>
                {w.unit&&`${w.unit}`}
                {w.partsCost>0&&` / 部品代 ¥${Number(w.partsCost).toLocaleString()}`}
                {w.gijutsu>0&&` / 技術料 ¥${Number(w.gijutsu).toLocaleString()}`}
              </div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button className="btn bs bsm" onClick={()=>startEdit(w)}>編集</button>
              <button className="btn bd bsm" onClick={()=>del(w.id)}>削除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const SettingsField=React.memo(function SettingsField({label,value,onChange,placeholder,type="text",opt=false}){
  return(
    <Fld label={label} opt={opt}>
      <input type={type} className="inp" placeholder={placeholder} value={value||""} onChange={onChange}/>
    </Fld>
  );
});

function Settings({settings,setSettings,syncState,syncMsg,onManualSync,enabled:sbEnabled}){
  const[form,setForm]=useState({...settings});
  const[saved,setSaved]=useState(false);
  const[sbForm,setSbForm]=useState(()=>getSbConf());
  const[sbSaved,setSbSaved]=useState(false);
  const[showSql,setShowSql]=useState(false);
  const[copied,setCopied]=useState(false);

  const save=useCallback(()=>{setSettings(form);setSaved(true);setTimeout(()=>setSaved(false),2000);},[form,setSettings]);
  const saveSb=useCallback(()=>{setSbConf(sbForm);setSbSaved(true);setTimeout(()=>{setSbSaved(false);window.location.reload();},1200);},[sbForm]);
  const copySql=useCallback(()=>{navigator.clipboard.writeText(SETUP_SQL).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});},[]);
  const upd=useCallback(k=>e=>setForm(f=>({...f,[k]:e.target.value})),[]);
  const updN=useCallback(k=>e=>setForm(f=>({...f,[k]:Number(e.target.value)})),[]);
  const syncColor={ok:"rgba(52,199,89,.12)",error:"rgba(255,59,48,.1)",syncing:"rgba(0,122,255,.08)",idle:"var(--fi)"}[syncState]||"var(--fi)";
  const syncIcon={ok:"🟢",error:"🔴",syncing:"🔄",idle:"⚪"}[syncState]||"⚪";
  const syncLabel={ok:"同期中",error:"エラー",syncing:"同期中…",idle:"未接続"}[syncState]||"未接続";

  return(
    <div className="stk fu">
      <div className="rb"><div style={{fontSize:20,fontWeight:800}}>設定</div><button className="btn bp bsm" onClick={save}>{saved?"✅ 保存済":"保存"}</button></div>

      {/* Supabase 同期 */}
      <div className="card" style={{border:"1.5px solid rgba(62,207,142,.35)",background:"rgba(62,207,142,.04)"}}>
        <div className="rb mb12">
          <div className="row" style={{gap:8}}>
            <span style={{fontSize:20}}>☁️</span>
            <div><div style={{fontSize:14,fontWeight:800}}>Supabase クラウド同期</div><div className="xs cmu">PC・iPhone でリアルタイム共有</div></div>
          </div>
          <div className="row" style={{gap:6}}>
            {sbEnabled&&<button className="btn bsm" style={{background:"rgba(0,122,255,.1)",color:"var(--bl)"}} onClick={onManualSync}>🔄 今すぐ同期</button>}
            <div style={{padding:"4px 10px",borderRadius:8,background:syncColor,fontSize:12,fontWeight:700}}>{syncIcon} {syncLabel}</div>
          </div>
        </div>
        {syncMsg&&<div className="xs cmu mb12" style={{marginLeft:2}}>{syncState==="error"?"❌ "+syncMsg:"最終同期: "+syncMsg}</div>}

        <div className="stk" style={{gap:9}}>
          <Fld label="Project URL">
            <input className="inp" placeholder="https://xxxxxxxxxx.supabase.co" value={sbForm.url||""} onChange={e=>setSbForm(f=>({...f,url:e.target.value}))} autoComplete="url"/>
          </Fld>
          <Fld label="anon public key">
            <input className="inp" type="text" inputMode="text" placeholder="eyJhbGciOi..." value={sbForm.anonKey||""} onChange={e=>setSbForm(f=>({...f,anonKey:e.target.value}))} autoComplete="off"/>
          </Fld>
          <button className="btn bp" style={{width:"100%"}} onClick={saveSb}>{sbSaved?"✅ 保存して再読み込み中…":"☁️ 保存してSupabaseに接続"}</button>
          {sbEnabled&&<button className="btn bd bsm" style={{width:"100%"}} onClick={()=>{if(confirm("Supabase接続設定を削除しますか？")){setSbConf({});setSbForm({});window.location.reload();}}}>接続を解除</button>}
        </div>

        <div style={{borderTop:"1px solid rgba(62,207,142,.25)",marginTop:14,paddingTop:12}}>
          <div className="rb" style={{marginBottom:8}}>
            <div className="b6 sm">📋 初回セットアップSQL</div>
            <div className="row" style={{gap:6}}>
              <button className="btn bsm" style={{background:"rgba(0,122,255,.1)",color:"var(--bl)"}} onClick={copySql}>{copied?"✅ コピー済":"コピー"}</button>
              <button className="btn bsm" style={{background:"var(--fi)",color:"var(--lb2)"}} onClick={()=>setShowSql(s=>!s)}>{showSql?"隠す":"表示"}</button>
            </div>
          </div>
          <div className="xs cmu mb8">Supabase → SQL Editor に貼り付けて実行してください（初回のみ）</div>
          {showSql&&<pre style={{background:"#1a1a2e",color:"#a8dadc",padding:"12px 14px",borderRadius:10,fontSize:11,overflowX:"auto",lineHeight:1.6,whiteSpace:"pre-wrap"}}>{SETUP_SQL}</pre>}
        </div>
      </div>
      <div className="card">
        <div style={{fontSize:14,fontWeight:700,marginBottom:11}}>🏢 自社情報</div>
        <div className="stk">
          <SettingsField label="会社名・屋号" placeholder="鈴木鈑金塗装" value={form.shopName} onChange={upd("shopName")}/>
          <SettingsField label="住所" placeholder="〒000-0000 東京都○○区" value={form.shopAddress} onChange={upd("shopAddress")}/>
          <SettingsField label="電話番号" placeholder="03-0000-0000" value={form.shopTel} onChange={upd("shopTel")}/>
          <SettingsField label="FAX番号" placeholder="03-0000-0001" value={form.shopFax} onChange={upd("shopFax")} opt/>
          <SettingsField label="メールアドレス" placeholder="info@example.com" value={form.shopEmail} onChange={upd("shopEmail")} opt/>
          <Fld label="インボイス登録番号（Tから始まる13桁）">
            <input className="inp" placeholder="T1234567890123" value={form.invoiceNo||""} onChange={upd("invoiceNo")}/>
          </Fld>
        </div>
      </div>
      <div className="card">
        <div style={{fontSize:14,fontWeight:700,marginBottom:11}}>🏦 振込先</div>
        <div className="stk">
          <div className="g2" style={{gap:9}}>
            <SettingsField label="銀行名" placeholder="○○銀行" value={form.bankName} onChange={upd("bankName")}/>
            <SettingsField label="支店名" placeholder="○○支店" value={form.bankBranch} onChange={upd("bankBranch")}/>
            <Fld label="口座種別"><select className="sel" value={form.bankType||"普通"} onChange={e=>setForm(f=>({...f,bankType:e.target.value}))}><option>普通</option><option>当座</option></select></Fld>
            <SettingsField label="口座番号" placeholder="1234567" value={form.bankNo} onChange={upd("bankNo")}/>
          </div>
          <SettingsField label="口座名義（カタカナ）" placeholder="スズキバンキントソウ" value={form.bankHolder} onChange={upd("bankHolder")}/>
        </div>
      </div>
      <div className="card">
        <div style={{fontSize:14,fontWeight:700,marginBottom:11}}>🚗 車検 固定費デフォルト値</div>
        <div className="stk">
          <div className="g2" style={{gap:9}}>
            <SettingsField label="検査登録証紙代（円）" placeholder="1450" type="number" value={form.kensaShomei} onChange={updN("kensaShomei")}/>
            <SettingsField label="技術管理料（円）" placeholder="400" type="number" value={form.gijutsuKanri} onChange={updN("gijutsuKanri")}/>
          </div>
          <div className="g2" style={{gap:9}}>
            <SettingsField label="車検代行料（税抜・円）" placeholder="10000" type="number" value={form.daiko} onChange={updN("daiko")}/>
            <Fld label="代行料 消費税率">
              <select className="sel" value={form.daikoTax??0.1} onChange={e=>setForm(f=>({...f,daikoTax:Number(e.target.value)}))}>
                <option value={0.1}>10%</option><option value={0.08}>8%</option>
              </select>
            </Fld>
          </div>
          <div className="card" style={{background:"rgba(0,122,255,.04)",border:"1px solid rgba(0,122,255,.15)"}}>
            <div className="xs cmu mb4">代行料 税込プレビュー</div>
            <div className="b7 cbl">{fmt(calcDaiko(form.daiko||10000,form.daikoTax??0.1))}</div>
          </div>
          <div style={{borderTop:"1px solid var(--sep)",paddingTop:12,marginTop:4}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:8}}>🔧 外注先への代行料（デフォルト）</div>
            <div className="g2" style={{gap:9}}>
              <SettingsField label="外注先代行料（税抜・円）" placeholder="7000" type="number" value={form.gaiChuDaiko||0} onChange={updN("gaiChuDaiko")}/>
              <Fld label="外注先 消費税率">
                <select className="sel" value={form.gaiChuDaikoTax??0.1} onChange={e=>setForm(f=>({...f,gaiChuDaikoTax:Number(e.target.value)}))}>
                  <option value={0.1}>10%</option><option value={0.08}>8%</option>
                </select>
              </Fld>
            </div>
            <div className="card" style={{background:"rgba(255,149,0,.06)",border:"1px solid rgba(255,149,0,.2)"}}>
              <div className="xs cmu mb4">粗利プレビュー（代行料 − 外注費）</div>
              <div className="b7" style={{color:"#FF9500"}}>{fmt(calcDaiko(form.daiko||10000,form.daikoTax??0.1)-Math.floor((form.gaiChuDaiko||0)*(1+(form.gaiChuDaikoTax??0.1))))}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 単位管理 */}
      <div className="card">
        <div style={{fontSize:14,fontWeight:700,marginBottom:11}}>📏 単位マスタ管理</div>
        <div className="xs cmu" style={{marginBottom:11}}>見積・請求書の明細で使用できる単位を登録・削除できます。</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:12}}>
          {(form.unitList||DEF_UNIT_LIST).map((u,i)=>(
            <div key={i} style={{display:"inline-flex",alignItems:"center",gap:5,background:"var(--grp)",borderRadius:8,padding:"4px 10px",fontSize:13,fontWeight:600}}>
              <span>{u}</span>
              <button onClick={()=>setForm(f=>({...f,unitList:(f.unitList||DEF_UNIT_LIST).filter((_,idx)=>idx!==i)}))}
                style={{background:"none",border:"none",cursor:"pointer",color:"var(--re)",fontSize:14,lineHeight:1,padding:"0 2px",fontWeight:700}}>×</button>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:8}}>
          {(()=>{
            const[newUnit,setNewUnit]=React.useState("");
            return(
              <>
                <input className="inp" style={{flex:1}} placeholder="新しい単位を入力（例：箱）" value={newUnit}
                  onChange={e=>setNewUnit(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"&&newUnit.trim()){setForm(f=>({...f,unitList:[...(f.unitList||DEF_UNIT_LIST),newUnit.trim()]}));setNewUnit("");}}}/>
                <button className="btn bp bsm" onClick={()=>{if(newUnit.trim()){setForm(f=>({...f,unitList:[...(f.unitList||DEF_UNIT_LIST),newUnit.trim()]}));setNewUnit("");}}} style={{flexShrink:0}}>追加</button>
              </>
            );
          })()}
        </div>
      </div>
      <WorkMasterSettings workMaster={form.workMaster||[]} onChange={wm=>setForm(f=>({...f,workMaster:wm}))}/>
    </div>
  );
}
function DataManager({db,onImport,onExport}){
  const[msg,setMsg]=useState(null);const fr=useRef();
  const handle=async e=>{
    const f=e.target.files?.[0];if(!f)return;
    try{const d=await doImport(f);if(!d.customers||!d.invoices)throw new Error("形式エラー");onImport(d);setMsg({ok:true,text:`✅ 完了！顧客${d.customers.length}件 / 請求${d.invoices.length}件`});}
    catch(err){setMsg({ok:false,text:`❌ ${err.message}`});}
    e.target.value="";
  };
  const saved=db.meta?.savedAt?new Date(db.meta.savedAt).toLocaleString("ja-JP"):"未保存";
  return(
    <div className="stk fu">
      <div style={{fontSize:20,fontWeight:800}}>データ管理</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:9}}>
        {[["👥 顧客",db.customers.length,"#007AFF"],["📋 見積書",db.quotes.length,"#5856D6"],["📄 請求書",db.invoices.length,"#34C759"],["📸 作業記録",(db.worklogs||[]).length,"#AF52DE"],["💳 経費",db.expenses.length,"#FF9500"]].map(([l,v,c])=>(
          <div key={l} className="card" style={{textAlign:"center",borderTop:`3px solid ${c}`}}><div style={{fontSize:24,fontWeight:800,color:c}}>{v}</div><div className="cmu sm">{l}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="row mb12" style={{gap:11}}><Ico e="📤" bg="rgba(0,122,255,.1)" sz={19}/><div><div style={{fontWeight:700,fontSize:14}}>JSONファイルに保存</div><div className="cmu sm">最終保存: {saved}</div></div></div>
        <button className="btn bp" style={{width:"100%"}} onClick={onExport}>💾　JSONファイルをダウンロード</button>
      </div>
      <div className="card">
        <div className="row mb12" style={{gap:11}}><Ico e="📥" bg="rgba(52,199,89,.12)" sz={19}/><div><div style={{fontWeight:700,fontSize:14}}>JSONファイルから読み込み</div><div className="cmu sm">バックアップから復元</div></div></div>
        <div className="card" style={{background:"rgba(255,59,48,.04)",border:"1px solid rgba(255,59,48,.15)",marginBottom:11}}><div className="sm" style={{color:"var(--re)"}}>⚠️ インポートすると現在のデータが上書きされます</div></div>
        <input ref={fr} type="file" accept=".json" style={{display:"none"}} onChange={handle}/>
        <button className="btn bg" style={{width:"100%"}} onClick={()=>fr.current?.click()}>📂　JSONファイルを選択</button>
      </div>
      {msg&&<div className="card" style={{background:msg.ok?"rgba(52,199,89,.08)":"rgba(255,59,48,.08)",border:`1px solid ${msg.ok?"rgba(52,199,89,.25)":"rgba(255,59,48,.25)"}`}}>
        <div className="rb"><span className="sm b6">{msg.text}</span><button className="btn bs bsm" onClick={()=>setMsg(null)}>閉じる</button></div>
      </div>}
      <div className="card" style={{background:"var(--grp)"}}>
        <div style={{fontWeight:700,marginBottom:9}}>📖 iPhone ↔ PC 同期方法</div>
        {[["iPhone → PC","JSONダウンロード → iCloudやLINEでPCへ転送 → インポート"],["PC → iPhone","JSONダウンロード → iPhoneに転送 → インポート"],["自動保存","変更のたびにブラウザ（localStorage）に自動保存"]].map(([t,d])=>(
          <div key={t} style={{marginBottom:8}}><div className="b6 sm">{t}</div><div className="cmu xs">{d}</div></div>
        ))}
      </div>
    </div>
  );
}

// ── WorkLog ────────────────────────────────────────────────
const WL_TAGS=["鈑金","塗装","車検","整備","鈑金塗装","外装","内装","エンジン","電装","タイヤ","ガラス","その他"];
const WL_STATUS=["作業中","完了","保留"];

function PhotoGrid({photos,onAdd,onDel,readOnly=false}){
  const ref=useRef();
  const add=e=>{
    const files=Array.from(e.target.files||[]);
    files.forEach(f=>{
      const r=new FileReader();
      r.onload=ev=>onAdd({id:Date.now()+Math.random(),url:ev.target.result,name:f.name});
      r.readAsDataURL(f);
    });
    e.target.value="";
  };
  return(
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(90px,1fr))",gap:8}}>
      {photos.map(p=>(
        <div key={p.id} style={{position:"relative",aspectRatio:"1",borderRadius:10,overflow:"hidden",background:"var(--grp)"}}>
          <img src={p.url} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          {!readOnly&&<button onClick={()=>onDel(p.id)} style={{position:"absolute",top:3,right:3,background:"rgba(0,0,0,.55)",color:"#fff",border:"none",borderRadius:6,width:20,height:20,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>✕</button>}
        </div>
      ))}
      {!readOnly&&(
        <div onClick={()=>ref.current?.click()} style={{aspectRatio:"1",borderRadius:10,border:"2px dashed var(--lb3)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",gap:4,background:"var(--fi2)",transition:"background var(--tr)"}}>
          <span style={{fontSize:22,opacity:.5}}>📷</span>
          <span style={{fontSize:10,color:"var(--lb3)"}}>追加</span>
          <input ref={ref} type="file" accept="image/*" multiple style={{display:"none"}} onChange={add}/>
        </div>
      )}
    </div>
  );
}

function WorkLogModal({log,customers,onSave,onClose}){
  const[form,setForm]=useState({
    customerId:log?.customerId||(customers[0]?.id||""),
    vehicleId:log?.vehicleId||"",
    date:log?.date||today(),
    title:log?.title||"",
    memo:log?.memo||"",
    photos:log?.photos||[],
    tags:log?.tags||[],
    status:log?.status||"完了",
  });
  const cust=customers.find(c=>c.id===Number(form.customerId));
  const toggleTag=t=>setForm(f=>({...f,tags:f.tags.includes(t)?f.tags.filter(x=>x!==t):[...f.tags,t]}));
  return(
    <div className="stk fu">
      <div className="rb">
        <div style={{fontSize:18,fontWeight:800}}>{log?"作業記録を編集":"作業記録を追加"}</div>
        <div style={{display:"flex",gap:6}}>
          <button className="btn bs bsm" onClick={onClose}>キャンセル</button>
          <button className="btn bp bsm" onClick={()=>onSave(form)}>💾 保存</button>
        </div>
      </div>
      <div className="stk">
        <div className="g2" style={{gap:9}}>
          <Fld label="顧客"><select className="sel" value={form.customerId} onChange={e=>setForm(f=>({...f,customerId:Number(e.target.value),vehicleId:""}))}>{customers.map(c=><option key={c.id} value={c.id}>{fullName(c)}</option>)}</select></Fld>
          <Fld label="車両"><select className="sel" value={form.vehicleId} onChange={e=>setForm(f=>({...f,vehicleId:e.target.value===""?"":Number(e.target.value)}))}><option value="">未選択</option>{(cust?.vehicles||[]).map(v=><option key={v.id} value={v.id}>{v.carName} {v.plateNo}</option>)}</select></Fld>
          <Fld label="作業日"><input type="date" className="inp" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></Fld>
          <Fld label="ステータス"><select className="sel" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{WL_STATUS.map(s=><option key={s}>{s}</option>)}</select></Fld>
        </div>
        <Fld label="作業タイトル"><input className="inp" placeholder="例: フロントバンパー修理・塗装" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/></Fld>
        <div>
          <div className="fl">タグ</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {WL_TAGS.map(t=>(
              <button key={t} onClick={()=>toggleTag(t)} className="btn bsm" style={{background:form.tags.includes(t)?"var(--bl)":"var(--fi)",color:form.tags.includes(t)?"#fff":"var(--lb2)",borderRadius:20,padding:"4px 12px",fontSize:12}}>{t}</button>
            ))}
          </div>
        </div>
        <Fld label="作業メモ"><textarea className="inp" rows={4} placeholder="作業内容・使用部品・注意事項など..." value={form.memo} onChange={e=>setForm(f=>({...f,memo:e.target.value}))}/></Fld>
        <div>
          <div className="fl">写真（{form.photos.length}枚）</div>
          <PhotoGrid photos={form.photos} onAdd={p=>setForm(f=>({...f,photos:[...f.photos,p]}))} onDel={id=>setForm(f=>({...f,photos:f.photos.filter(p=>p.id!==id)}))}/>
        </div>
      </div>
    </div>
  );
}

function WorkLogDetail({log,customer,vehicle,onClose,onEdit}){
  const[photo,setPhoto]=useState(null);
  const sColor={完了:"dgr",作業中:"dbl",保留:"dor"}[log.status]||"dgy";
  return(
    <div className="stk fu">
      <div className="rb">
        <div style={{fontSize:18,fontWeight:800}}>作業記録</div>
        <div style={{display:"flex",gap:6}}>
          <button className="btn bs bsm" onClick={onClose}>閉じる</button>
          <button className="btn bp bsm" onClick={onEdit}>✏️ 編集</button>
        </div>
      </div>
      <div className="stk">
        <div style={{background:"var(--grp)",borderRadius:12,padding:"13px 15px"}}>
          <div className="rb mb8">
            <div style={{fontSize:17,fontWeight:800}}>{log.title||"（無題）"}</div>
            <span className={`bdg ${sColor}`}>{log.status}</span>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
            {(log.tags||[]).map(t=><span key={t} className="bdg dbl" style={{fontSize:11}}>{t}</span>)}
          </div>
          <div className="cmu sm">📅 {log.date}</div>
          {customer&&<div className="cmu sm">👤 {fullName(customer)}</div>}
          {vehicle&&<div className="cmu sm">🚗 {vehicle.carName} {vehicle.plateNo}</div>}
        </div>
        {log.memo&&(
          <div>
            <div className="fl">作業メモ</div>
            <div style={{background:"var(--bg2)",borderRadius:10,padding:"12px 14px",fontSize:14,lineHeight:1.7,whiteSpace:"pre-wrap",border:"1px solid var(--sep)"}}>{log.memo}</div>
          </div>
        )}
        {log.photos?.length>0&&(
          <div>
            <div className="fl">写真（{log.photos.length}枚）</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(90px,1fr))",gap:8}}>
              {log.photos.map(p=>(
                <div key={p.id} onClick={()=>setPhoto(p)} style={{aspectRatio:"1",borderRadius:10,overflow:"hidden",cursor:"pointer",background:"var(--grp)"}}>
                  <img src={p.url} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
              ))}
            </div>
          </div>
        )}
        {!log.memo&&!log.photos?.length&&<div className="cmu sm" style={{textAlign:"center",padding:16}}>メモ・写真なし</div>}
      </div>
      {photo&&(
        <div onClick={()=>setPhoto(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <img src={photo.url} alt={photo.name} style={{maxWidth:"100%",maxHeight:"90vh",borderRadius:12,objectFit:"contain"}}/>
          <button onClick={()=>setPhoto(null)} style={{position:"absolute",top:18,right:18,background:"rgba(255,255,255,.18)",color:"#fff",border:"none",borderRadius:10,padding:"7px 14px",cursor:"pointer",fontSize:14,fontWeight:700}}>✕ 閉じる</button>
        </div>
      )}
    </div>
  );
}

function WorkLog({worklogs,setWorklogs,customers}){
  const[modal,setModal]=useState(null);// null | "add" | log object
  const[detail,setDetail]=useState(null);
  const[search,setSearch]=useState("");
  const[filterTag,setFilterTag]=useState("");
  const[filterStatus,setFilterStatus]=useState("");
  const[filterCid,setFilterCid]=useState("");

  const save=form=>{
    if(!form.title&&!form.memo)return;
    if(modal==="add")setWorklogs(p=>[...p,{...form,id:nextId(p)}]);
    else setWorklogs(p=>p.map(w=>w.id===modal.id?{...form,id:w.id}:w));
    setModal(null);setDetail(null);
  };
  const del=id=>{if(confirm("削除しますか？")){setWorklogs(p=>p.filter(w=>w.id!==id));setDetail(null);}};

  const filtered=[...worklogs].filter(w=>{
    if(filterCid&&w.customerId!==Number(filterCid))return false;
    if(filterStatus&&w.status!==filterStatus)return false;
    if(filterTag&&!w.tags?.includes(filterTag))return false;
    if(search){
      const c=customers.find(c=>c.id===w.customerId);
      const text=`${w.title} ${w.memo} ${fullName(c)}`.toLowerCase();
      if(!text.includes(search.toLowerCase()))return false;
    }
    return true;
  }).sort((a,b)=>b.date.localeCompare(a.date));

  const allTags=[...new Set(worklogs.flatMap(w=>w.tags||[]))];

  if(modal) return <WorkLogModal log={modal==="add"?null:modal} customers={customers} onSave={save} onClose={()=>setModal(null)}/>;
  if(detail) return(()=>{const c=customers.find(c=>c.id===detail.customerId);const v=(c?.vehicles||[]).find(v=>v.id===detail.vehicleId);return <WorkLogDetail log={detail} customer={c} vehicle={v} onClose={()=>setDetail(null)} onEdit={()=>{setModal(detail);setDetail(null);}}/>;})();
  return(
    <div className="stk fu">
      <div className="rb">
        <div style={{fontSize:20,fontWeight:800}}>📸 作業記録</div>
        <button className="btn bp bsm" onClick={()=>setModal("add")}>＋ 記録追加</button>
      </div>

      {/* フィルター */}
      <input className="inp" placeholder="🔍  タイトル・メモ・顧客名で検索" value={search} onChange={e=>setSearch(e.target.value)}/>
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        <select className="sel" style={{flex:1,minWidth:120,padding:"7px 10px",fontSize:13}} value={filterCid} onChange={e=>setFilterCid(e.target.value)}>
          <option value="">全顧客</option>
          {customers.map(c=><option key={c.id} value={c.id}>{fullName(c)}</option>)}
        </select>
        <select className="sel" style={{flex:1,minWidth:100,padding:"7px 10px",fontSize:13}} value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
          <option value="">全ステータス</option>
          {WL_STATUS.map(s=><option key={s}>{s}</option>)}
        </select>
        <select className="sel" style={{flex:1,minWidth:100,padding:"7px 10px",fontSize:13}} value={filterTag} onChange={e=>setFilterTag(e.target.value)}>
          <option value="">全タグ</option>
          {allTags.map(t=><option key={t}>{t}</option>)}
        </select>
      </div>

      {/* サマリーカード */}
      <div className="g3" style={{gap:9}}>
        {[
          ["全記録",worklogs.length,"#5856D6"],
          ["完了",worklogs.filter(w=>w.status==="完了").length,"#34C759"],
          ["作業中",worklogs.filter(w=>w.status==="作業中").length,"#FF9500"],
        ].map(([l,v,c])=>(
          <div key={l} className="card" style={{textAlign:"center",borderTop:`3px solid ${c}`,padding:"12px 8px"}}>
            <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div>
            <div className="cmu xs">{l}</div>
          </div>
        ))}
      </div>

      {/* 一覧 */}
      <div className="stk" style={{gap:9}}>
        {filtered.map(w=>{
          const c=customers.find(c=>c.id===w.customerId);
          const v=(c?.vehicles||[]).find(v=>v.id===w.vehicleId);
          const sColor={完了:"dgr",作業中:"dbl",保留:"dor"}[w.status]||"dgy";
          return(
            <div key={w.id} onClick={()=>setDetail(w)} style={{background:"var(--bg2)",borderRadius:14,boxShadow:"var(--sh)",overflow:"hidden",cursor:"pointer",transition:"box-shadow var(--tr)"}}>
              <div style={{height:3,background:w.status==="完了"?"var(--gr)":w.status==="作業中"?"var(--bl)":"var(--or)"}}/>
              <div style={{padding:"13px 15px"}}>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:7}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:15,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{w.title||"（無題）"}</div>
                    <div style={{fontSize:12,color:"var(--lb2)",marginTop:3}}>
                      {fullName(c)}{v?` · 🚗 ${v.carName} ${v.plateNo}`:""} · {w.date}
                    </div>
                  </div>
                  <span className={`bdg ${sColor}`}>{w.status}</span>
                </div>
                {(w.tags||[]).length>0&&(
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:7}}>
                    {w.tags.map(t=><span key={t} style={{fontSize:10,background:"rgba(0,122,255,.1)",color:"var(--bl)",padding:"2px 8px",borderRadius:10,fontWeight:600}}>{t}</span>)}
                  </div>
                )}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",gap:9,color:"var(--lb3)",fontSize:12}}>
                    {w.photos?.length>0&&<span>📷 {w.photos.length}枚</span>}
                    {w.memo&&<span>📝 メモあり</span>}
                  </div>
                  <button className="btn bd bsm" style={{fontSize:11}} onClick={e=>{e.stopPropagation();del(w.id);}}>削除</button>
                </div>
              </div>
            </div>
          );
        })}
        {!filtered.length&&<div className="lst"><div className="li cmu" style={{justifyContent:"center"}}>作業記録がありません</div></div>}
      </div>


    </div>
  );
}

// ── Navigation & App ───────────────────────────────────────
const PAGES=[
  {id:"dashboard",label:"ダッシュボード",icon:"🏠"},
  {id:"customers",label:"顧客管理",icon:"👥"},
  {id:"quotes",label:"見積書",icon:"📋"},
  {id:"invoices",label:"請求書",icon:"📄"},
  {id:"combined",label:"合計請求書",icon:"📑"},
  {id:"worklog",label:"作業記録",icon:"📸"},
  {id:"expenses",label:"経費管理",icon:"💳"},
  {id:"cashbook",label:"金銭出納帳",icon:"📒"},
  {id:"sales",label:"売上・集計",icon:"📊"},
  {id:"declaration",label:"確定申告",icon:"📝"},
  {id:"settings",label:"設定",icon:"⚙️"},
  {id:"data",label:"データ管理",icon:"🗄️"},
];
const BNAV_IDS=["dashboard","customers","worklog","expenses","invoices","quotes","cashbook","settings"];
const BNAV_LABELS={"dashboard":"ホーム","customers":"顧客","worklog":"作業記録","expenses":"経費","quotes":"見積書","invoices":"請求書","cashbook":"出納帳","settings":"設定"};

export default function App(){
  const[page,setPage]=useState("dashboard");
  const[db,setDb]=useState(()=>loadDB({
    customers:IC,quotes:IQ,invoices:II,expenses:IE,worklogs:IW,
    settings:DEF_SETTINGS,meta:{savedAt:null},
  }));
  useEffect(()=>saveDB(db),[db]);
  const set=k=>fn=>setDb(d=>({...d,[k]:typeof fn==="function"?fn(d[k]):fn}));
  const{customers,quotes,invoices,expenses,worklogs,settings}=db;
  const{syncState,syncMsg,enabled:sbEnabled,manualSync}=useSbSync(db,setDb);
  const unpaid=invoices.filter(i=>i.status==="未入金").length;
  const cur=PAGES.find(p=>p.id===page);

  const syncDot={ok:"#34C759",error:"#FF3B30",syncing:"#FF9500",idle:"var(--lb3)"}[syncState]||"var(--lb3)";

  const render=()=>{
    switch(page){
      case"dashboard":   return <Dashboard customers={customers} invoices={invoices} quotes={quotes} expenses={expenses} settings={settings}/>;
      case"customers":   return <Customers customers={customers} setCustomers={set("customers")} worklogs={worklogs} onGoWorklog={()=>setPage("worklog")}/>;
      case"quotes":      return <Quotes quotes={quotes} setQuotes={set("quotes")} customers={customers} invoices={invoices} setInvoices={set("invoices")} settings={settings}/>;
      case"invoices":    return <Invoices invoices={invoices} setInvoices={set("invoices")} expenses={expenses} setExpenses={set("expenses")} customers={customers} settings={settings}/>;
      case"combined":    return <CombinedInvoice invoices={invoices} customers={customers} settings={settings}/>;
      case"worklog":      return <WorkLog worklogs={worklogs} setWorklogs={set("worklogs")} customers={customers}/>;
      case"expenses":    return <Expenses expenses={expenses} setExpenses={set("expenses")}/>;
      case"cashbook":    return <CashBook invoices={invoices} expenses={expenses} settings={settings}/>;
      case"sales":       return <SalesReport invoices={invoices} expenses={expenses} settings={settings}/>;
      case"declaration": return <WhiteDeclaration invoices={invoices} expenses={expenses} settings={settings}/>;
      case"settings":    return <Settings settings={settings} setSettings={set("settings")} syncState={syncState} syncMsg={syncMsg} onManualSync={manualSync} enabled={sbEnabled}/>;
      case"data":        return <DataManager db={db} onImport={d=>setDb(p=>({...p,...d}))} onExport={()=>doExport(db)}/>;
      default: return null;
    }
  };

  return(
    <>
      <G/>
      <div className="app">
        <nav className="sb np">
          <div className="sbl"><h1>🔧 鈑金会計</h1><p>AutoRepair ERP · {settings.shopName}</p></div>
          <div style={{flex:1,overflow:"auto",padding:"5px 0"}}>
            <div className="ns">メニュー</div>
            {PAGES.map(p=>(
              <div key={p.id} className={`ni ${page===p.id?"on":""}`} onClick={()=>setPage(p.id)}>
                <div className="nic" style={{background:page===p.id?"rgba(0,122,255,.11)":"var(--fi2)"}}>{p.icon}</div>
                {p.label}
                {p.id==="invoices"&&unpaid>0&&<span className="nb">{unpaid}</span>}
              </div>
            ))}
          </div>
          <div style={{padding:"9px 9px 17px",borderTop:"1px solid var(--sep)"}}>
            {sbEnabled&&(
              <div onClick={()=>setPage("settings")} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 8px",borderRadius:9,background:syncState==="error"?"rgba(255,59,48,.08)":syncState==="ok"?"rgba(52,199,89,.07)":"var(--fi2)",marginBottom:8,cursor:"pointer"}}>
                <span style={{width:8,height:8,borderRadius:4,background:syncDot,display:"inline-block",flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:11,fontWeight:700,color:syncState==="error"?"var(--re)":syncState==="ok"?"#1a8f3a":"var(--lb2)"}}>{syncState==="syncing"?"同期中…":syncState==="ok"?"クラウド同期中":syncState==="error"?"同期エラー":"Supabase未接続"}</div>
                  {syncMsg&&<div style={{fontSize:10,color:"var(--lb3)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{syncMsg}</div>}
                </div>
              </div>
            )}
            <div className="cmu xs mb8" style={{paddingLeft:3}}>{db.meta?.savedAt?`保存: ${new Date(db.meta.savedAt).toLocaleString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"})}`:"自動保存中"}</div>
            <button className="btn bp bsm" style={{width:"100%",marginBottom:5}} onClick={()=>doExport(db)}>💾 JSONを保存</button>
            <button className="btn bs bsm" style={{width:"100%"}} onClick={()=>setPage("data")}>📂 データ管理</button>
          </div>
        </nav>
        <div className="mn">
          <div className="th np">
            <div className="b7" style={{fontSize:15}}>{cur?.icon} {cur?.label}</div>
            <div className="row" style={{gap:6}}>
              {unpaid>0&&<span className="bdg drd">{unpaid}件未収</span>}
              <button className="btn bp bsm" onClick={()=>doExport(db)} style={{padding:"4px 10px",fontSize:11}}>💾保存</button>
            </div>
          </div>
          <div className="pw">{render()}</div>
        </div>
        <div className="bn np" style={{overflowX:"auto",overflowY:"hidden",justifyContent:"flex-start",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}}>
          <div style={{display:"flex",minWidth:"max-content",padding:"0 4px"}}>
          {BNAV_IDS.map(id=>{
            const p=PAGES.find(p=>p.id===id);
            return(
              <div key={id} className={`bi ${page===id?"on":""}`} onClick={()=>setPage(id)} style={{minWidth:64,flex:"none"}}>
                <span style={{fontSize:20}}>{p.icon}</span>
                <span style={{fontSize:9,fontWeight:600}}>{BNAV_LABELS[id]||p.label}</span>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </>
  );
}

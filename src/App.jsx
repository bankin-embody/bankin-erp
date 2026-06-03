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
const JIBAISEKI={"乗用":{24:17650,25:18440},"軽乗用":{24:17540,25:18300},"貨物":{24:22680,25:23690},"軽貨物":{24:17540,25:18300}};
const JURYOZEI={0.5:8200,1.0:16400,1.5:24600,2.0:32800,2.5:41000,3.0:49200,3.5:57400,4.0:65600};
const CAR_TYPES=["乗用","軽乗用","貨物","軽貨物"];
const WEIGHTS=[0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0];
const EXP_CAT=["材料費","消耗品費","光熱費","工具費","外注費","交通費","広告費","通信費","その他"];
const KAMOKU={"材料費":"売上原価（仕入）","消耗品費":"消耗品費","光熱費":"水道光熱費","工具費":"工具・器具・備品","外注費":"外注工賃","交通費":"旅費交通費","広告費":"広告宣伝費","通信費":"通信費","その他":"雑費"};

const calcJibaiseki=(t,m=24)=>(JIBAISEKI[t]||JIBAISEKI["乗用"])[m]||17650;
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
const DEF_SETTINGS={
  shopName:"鈴木板金塗装",shopAddress:"〒000-0000 東京都○○区○○1-2-3",
  shopTel:"03-0000-0000",shopFax:"",shopEmail:"info@suzuki-bankin.co.jp",
  invoiceNo:"T1234567890123",
  bankName:"○○銀行",bankBranch:"○○支店",bankType:"普通",bankNo:"1234567",bankHolder:"スズキバンキントソウ",
  kensaShomei:1450,gijutsuKanri:400,daiko:10000,daikoTax:0.1,
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
const IQ=[{id:"Q-2026-001",customerId:1,date:"2026-05-15",items:[{desc:"フロントバンパー修理",qty:1,unit:45000},{desc:"塗装（パール）",qty:1,unit:28000}],tax:0.1,status:"承認済",note:""}];
const II=[
  {id:"INV-2026-001",type:"repair",customerId:1,vehicleId:1,date:"2026-05-01",dueDate:"2026-05-31",items:[{desc:"フェンダー修理一式",qty:1,unit:68000}],tax:0.1,status:"入金済",note:""},
  {id:"INV-2026-002",type:"shakken",customerId:2,vehicleId:1,date:"2026-05-08",dueDate:"2026-05-31",items:[{desc:"車検整備一式",qty:1,unit:45000}],tax:0.1,status:"未入金",note:"",
   shakken:{jibaiseki:17650,juryozei:16400,kensaShomei:1450,gijutsuKanri:400,daiko:10000,daikoTax:0.1}},
];
const IE=[
  {id:1,date:"2026-05-02",category:"材料費",desc:"板金塗料",amount:18000,receipt:true},
  {id:2,date:"2026-05-05",category:"消耗品費",desc:"研磨剤・ペーパー",amount:5400,receipt:true},
  {id:3,date:"2026-05-10",category:"光熱費",desc:"電気代",amount:22000,receipt:false},
];

const IW=[
  {id:1,customerId:1,vehicleId:1,date:"2026-05-01",title:"フェンダー修理",memo:"右フロントフェンダー凹み修理。パテ成形後塗装仕上げ。色合わせOK。",photos:[],tags:["板金","塗装"],status:"完了"},
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
  const grand=wT+gov+daikoWT;
  const theme=getDocTheme(type,doc);
  const ttl=theme.label;
  const doPrint=()=>{
    const el=document.getElementById("print-area");
    if(!el)return;
    const w=window.open("","_blank","width=820,height=1100");
    if(!w)return;
    const fonts=`<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;
    const style=`<style>*{box-sizing:border-box;margin:0;padding:0;}@page{size:A4 portrait;margin:15mm 12mm;}body{font-family:'Noto Sans JP',-apple-system,sans-serif;font-size:13px;color:#000;-webkit-print-color-adjust:exact;print-color-adjust:exact;}table{border-collapse:collapse;width:100%;}th,td{padding:8px 10px;font-size:12px;border-bottom:1px solid #e0e0e0;text-align:left;}th{background:${theme.light};font-weight:700;color:#555;}.rb{display:flex;align-items:center;justify-content:space-between;}</style>`;
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8">${fonts}${style}</head><body>${el.innerHTML}</body></html>`);
    w.document.close();
    w.onload=()=>{w.focus();w.print();};
  };
  // フォームと同じ全画面スクロール方式
  return(
    <div className="stk fu">
      {/* 固定ヘッダーバー（印刷時は非表示） */}
      <div className="rb np">
        <div style={{fontSize:17,fontWeight:800}}>{theme.emoji} {ttl} 印刷プレビュー</div>
        <div style={{display:"flex",gap:7}}>
          <button className="btn bp" onClick={doPrint}>🖨️ 印刷する</button>
          <button className="btn bs" onClick={onClose}>← 戻る</button>
        </div>
      </div>

      {/* 書類プレビュー本体 */}
      <div id="print-area" style={{background:"#fff",borderRadius:14,border:`2px solid ${theme.border}`,fontFamily:"var(--f)",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,.08)"}}>
        {/* カラーヘッダーバー */}
        <div style={{background:theme.accent,padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{color:"#fff"}}>
            <div style={{fontSize:26,fontWeight:800,letterSpacing:.5}}>{theme.emoji} {ttl}</div>
            {doc.id&&<div style={{fontSize:12,opacity:.85,marginTop:3}}>書類番号: {doc.id}</div>}
            {settings.invoiceNo&&type==="invoice"&&<div style={{fontSize:12,opacity:.85}}>適格請求書発行事業者: {settings.invoiceNo}</div>}
          </div>
          <div style={{textAlign:"right",color:"#fff"}}>
            <div style={{fontSize:16,fontWeight:800}}>{settings.shopName}</div>
            <div style={{fontSize:12,opacity:.85,marginTop:3}}>{settings.shopAddress}</div>
            <div style={{fontSize:12,opacity:.85}}>TEL: {settings.shopTel}{settings.shopFax?` / FAX: ${settings.shopFax}`:""}</div>
          </div>
        </div>

        <div style={{padding:"24px 28px"}}>
          {/* 宛先・日付 */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",borderBottom:`2px solid ${theme.accent}`,paddingBottom:12,marginBottom:16}}>
            <div>
              <div style={{fontSize:20,fontWeight:800}}>{fullName(customer)} <span style={{fontSize:14,fontWeight:400}}>様</span></div>
              {vehicle&&<div style={{fontSize:12,color:"var(--lb2)",marginTop:4}}>🚗 {vehicle.carName} {vehicle.plateNo} / 車台番号: {vehicle.chassisNo}</div>}
            </div>
            <div style={{textAlign:"right",fontSize:13,color:"var(--lb2)"}}>
              <div>発行日: <b style={{color:"#000"}}>{doc.date||today()}</b></div>
              {doc.dueDate&&<div style={{marginTop:3}}>支払期限: <b style={{color:"#000"}}>{doc.dueDate}</b></div>}
            </div>
          </div>

          {type==="combined"?(
            <>
              {/* お支払い合計を上に */}
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:14}}>
                <div style={{background:theme.accent,borderRadius:10,padding:"10px 20px",display:"flex",alignItems:"center",gap:16}}>
                  <span style={{fontSize:14,fontWeight:800,color:"#fff"}}>お支払い合計</span>
                  <span style={{fontSize:24,fontWeight:800,color:"#fff"}}>{fmt(doc.combinedTotal||0)}</span>
                </div>
              </div>
              <table className="tbl" style={{marginBottom:12}}>
                <thead><tr style={{background:theme.light}}><th>書類番号</th><th>日付</th><th>内容</th><th style={{textAlign:"right"}}>金額</th></tr></thead>
                <tbody>{(doc.allItems||[]).map((ci,i)=><tr key={i}><td>{ci.id}</td><td>{ci.date}</td><td>{ci.desc}</td><td style={{textAlign:"right"}}>{fmt(ci.total)}</td></tr>)}</tbody>
              </table>
            </>
          ):(
            <>
              {/* お支払い合計を明細の上に表示 */}
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:14}}>
                <div style={{background:theme.accent,borderRadius:10,padding:"10px 20px",display:"flex",alignItems:"center",gap:16}}>
                  <span style={{fontSize:14,fontWeight:800,color:"#fff"}}>お支払い合計</span>
                  <span style={{fontSize:24,fontWeight:800,color:"#fff"}}>{fmt(grand)}</span>
                </div>
              </div>
              <table className="tbl" style={{marginBottom:14}}>
                <thead><tr style={{background:theme.light}}>
                  <th>品目・作業内容</th>
                  <th style={{width:44}}>数量</th>
                  <th style={{textAlign:"right",width:100}}>部品代</th>
                  <th style={{textAlign:"right",width:100}}>技術料</th>
                  <th style={{textAlign:"right",width:100}}>金額</th>
                </tr></thead>
                <tbody>{(doc.items||[]).map((it,i)=>(
                  <tr key={i}>
                    <td>{it.desc}</td>
                    <td>{it.qty===0||it.qty===undefined?"-":it.qty}</td>
                    <td style={{textAlign:"right"}}>{it.unit?fmt(it.qty*(it.unit||0)):"-"}</td>
                    <td style={{textAlign:"right"}}>{it.gijutsu?fmt(it.gijutsu):"-"}</td>
                    <td style={{textAlign:"right",fontWeight:600}}>{fmt(it.qty*(it.unit||0)+(it.gijutsu||0))}</td>
                  </tr>
                ))}</tbody>
              </table>
              <div style={{display:"flex",justifyContent:"flex-end"}}>
                <div style={{width:310,background:theme.light,borderRadius:10,padding:"14px 16px",border:`1px solid ${theme.border}`}}>
                  {[[`小計（税抜）`,fmt(sub)],[`消費税（${Math.round((doc.tax||0.1)*100)}%）`,fmt(taxAmt)],[`整備費合計（税込）`,fmt(wT)]].map(([l,v])=>(
                    <div key={l} className="rb" style={{padding:"4px 0",fontSize:13}}><span style={{color:"var(--lb2)"}}>{l}</span><span style={{fontWeight:600}}>{v}</span></div>
                  ))}
                  {isS&&<>
                    <div style={{borderTop:"1px solid rgba(0,0,0,.1)",margin:"7px 0"}}/>
                    {[[doc.shakken?.jibaisekiMochikomi?"自賠責保険（持込）":"自賠責保険",doc.shakken?.jibaisekiMochikomi?"持ち込み":fmt(doc.shakken?.jibaiseki||0)],["重量税",fmt(doc.shakken?.juryozei||0)],["検査登録証紙代",fmt(doc.shakken?.kensaShomei||settings.kensaShomei)],["技術管理料",fmt(doc.shakken?.gijutsuKanri||settings.gijutsuKanri)]].map(([l,v])=>(
                      <div key={l} className="rb" style={{padding:"3px 0",fontSize:12}}><span style={{color:"var(--lb2)"}}>{l}</span><span>{v}</span></div>
                    ))}
                    <div className="rb" style={{padding:"3px 0",fontSize:12}}><span style={{color:"var(--lb2)"}}>車検代行料（税込{Math.round(daikoTx*100)}%）</span><span>{fmt(daikoWT)}</span></div>
                    <div style={{borderTop:"1px dashed rgba(0,0,0,.15)",margin:"6px 0"}}/>
                  </>}
                  <div className="rb" style={{padding:"9px 0",borderTop:`2px solid ${theme.accent}`,marginTop:3}}>
                    <span style={{fontSize:15,fontWeight:800}}>お支払い合計</span>
                    <span style={{fontSize:22,fontWeight:800,color:theme.accent}}>{fmt(grand)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
          {doc.note&&<div style={{marginTop:16,padding:"10px 14px",background:theme.light,borderRadius:8,fontSize:12,border:`1px solid ${theme.border}`}}><b>備考:</b> {doc.note}</div>}
          {type==="invoice"&&(
            <div style={{marginTop:18,padding:"13px 16px",border:`1px solid ${theme.border}`,borderRadius:9,fontSize:13,background:theme.light}}>
              <div style={{fontWeight:700,marginBottom:6,color:theme.accent}}>💳 振込先</div>
              <div>{settings.bankName} {settings.bankBranch} {settings.bankType}口座 {settings.bankNo}</div>
              <div>口座名義: {settings.bankHolder}</div>
            </div>
          )}
        </div>
      </div>

      {/* 下部にも印刷ボタン */}
      <div className="np" style={{display:"flex",gap:9,justifyContent:"center",paddingBottom:8}}>
        <button className="btn bp" style={{padding:"12px 32px",fontSize:15}} onClick={doPrint}>🖨️ 印刷する</button>
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

// ── Customers ──────────────────────────────────────────────
function VehicleModal({v,onSave,onClose,onDel}){
  const[f,setF]=useState({carName:v?.carName||"",plateNo:v?.plateNo||"",chassisNo:v?.chassisNo||"",firstReg:v?.firstReg||"",carType:v?.carType||"乗用",weight:v?.weight||1.5});
  return(
    <Modal title={v?"車両編集":"車両追加"} onClose={onClose}
      footer={<>{v&&<button className="btn bd bsm" onClick={onDel}>削除</button>}<button className="btn bs" onClick={onClose}>キャンセル</button><button className="btn bp" onClick={()=>onSave(f)}>保存</button></>}>
      <div className="stk">
        <div className="g2" style={{gap:9}}>
          <Fld label="車種名"><input className="inp" placeholder="プリウス" value={f.carName} onChange={e=>setF(p=>({...p,carName:e.target.value}))}/></Fld>
          <Fld label="ナンバー"><input className="inp" placeholder="品川300あ1234" value={f.plateNo} onChange={e=>setF(p=>({...p,plateNo:e.target.value}))}/></Fld>
          <Fld label="車台番号"><input className="inp" placeholder="ZVW5012345" value={f.chassisNo} onChange={e=>setF(p=>({...p,chassisNo:e.target.value}))}/></Fld>
          <Fld label="初度登録年月"><input type="month" className="inp" value={f.firstReg} onChange={e=>setF(p=>({...p,firstReg:e.target.value}))}/></Fld>
          <Fld label="車種区分"><select className="sel" value={f.carType} onChange={e=>setF(p=>({...p,carType:e.target.value}))}>{CAR_TYPES.map(t=><option key={t}>{t}</option>)}</select></Fld>
          <Fld label="車両重量"><select className="sel" value={f.weight} onChange={e=>setF(p=>({...p,weight:Number(e.target.value)}))}>{WEIGHTS.map(w=><option key={w} value={w}>{w}t</option>)}</select></Fld>
        </div>
        <div className="card" style={{background:"rgba(0,122,255,.04)",border:"1px solid rgba(0,122,255,.15)"}}>
          <div style={{fontSize:11,fontWeight:700,color:"var(--bl)",marginBottom:7}}>📊 車検時 自動計算プレビュー</div>
          <div className="g2" style={{gap:7}}>
            {[["自賠責（24ヶ月）",fmt(calcJibaiseki(f.carType,24))],["重量税（2年）",fmt(calcJuryozei(f.weight))]].map(([l,v])=>(
              <div key={l} style={{background:"var(--bg2)",borderRadius:8,padding:"8px 11px"}}><div className="xs cmu">{l}</div><div className="b7 cbl">{v}</div></div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
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
          <div style={{fontSize:13,fontWeight:700,color:"var(--lb2)",marginBottom:6}}>姓（会社名） <span style={{color:"var(--re)"}}>*</span></div>
          <input className="inp" placeholder="例：山田" value={form.lastName} onChange={e=>setForm(f=>({...f,lastName:e.target.value}))} style={{fontSize:16,padding:"14px 16px"}}/>
        </div>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"var(--lb2)",marginBottom:6}}>名（ふりがな） <span style={{fontWeight:400,color:"var(--lb3)"}}>任意</span></div>
          <input className="inp" placeholder="例：太郎" value={form.firstName} onChange={e=>setForm(f=>({...f,firstName:e.target.value}))} style={{fontSize:16,padding:"14px 16px"}}/>
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
            <button className="btn bg bsm" onClick={()=>setForm(f=>({...f,vehicles:[...(f.vehicles||[]),{id:Date.now(),carName:"",plateNo:"",chassisNo:"",firstReg:"",carType:"乗用",weight:1.5}]}))}>＋ 車両追加</button>
          </div>
          {(form.vehicles||[]).length===0&&(
            <div style={{textAlign:"center",padding:"14px",background:"var(--grp)",borderRadius:11,color:"var(--lb2)",fontSize:13}}>車両未登録 — 「＋ 車両追加」で追加</div>
          )}
          {(form.vehicles||[]).map((v,vi)=>(
            <div key={v.id||vi} style={{border:"1px solid rgba(52,199,89,.3)",borderRadius:12,padding:"14px",marginBottom:10,background:"rgba(52,199,89,.03)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <div style={{fontSize:13,fontWeight:700,color:"#1a8f3a"}}>🚗 車両 {vi+1}{v.carName?` — ${v.carName}`:""}</div>
                <button className="btn bd bsm" onClick={()=>setForm(f=>({...f,vehicles:f.vehicles.filter((_,i)=>i!==vi)}))}>削除</button>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:11}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div><div style={{fontSize:12,fontWeight:700,color:"var(--lb2)",marginBottom:5}}>車種名</div><input className="inp" placeholder="プリウス" value={v.carName||""} onChange={e=>setForm(f=>({...f,vehicles:f.vehicles.map((x,i)=>i===vi?{...x,carName:e.target.value}:x)}))}/></div>
                  <div><div style={{fontSize:12,fontWeight:700,color:"var(--lb2)",marginBottom:5}}>ナンバー</div><input className="inp" placeholder="品川300あ1234" value={v.plateNo||""} onChange={e=>setForm(f=>({...f,vehicles:f.vehicles.map((x,i)=>i===vi?{...x,plateNo:e.target.value}:x)}))}/></div>
                </div>
                <div><div style={{fontSize:12,fontWeight:700,color:"var(--lb2)",marginBottom:5}}>車台番号</div><input className="inp" placeholder="ZVW5012345" value={v.chassisNo||""} onChange={e=>setForm(f=>({...f,vehicles:f.vehicles.map((x,i)=>i===vi?{...x,chassisNo:e.target.value}:x)}))}/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div><div style={{fontSize:12,fontWeight:700,color:"var(--lb2)",marginBottom:5}}>初度登録年月</div><input type="month" className="inp" value={v.firstReg||""} onChange={e=>setForm(f=>({...f,vehicles:f.vehicles.map((x,i)=>i===vi?{...x,firstReg:e.target.value}:x)}))}/></div>
                  <div><div style={{fontSize:12,fontWeight:700,color:"var(--lb2)",marginBottom:5}}>車種区分</div><select className="sel" value={v.carType||"乗用"} onChange={e=>setForm(f=>({...f,vehicles:f.vehicles.map((x,i)=>i===vi?{...x,carType:e.target.value}:x)}))}>{CAR_TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
                </div>
                <div><div style={{fontSize:12,fontWeight:700,color:"var(--lb2)",marginBottom:5}}>車両重量</div><select className="sel" value={v.weight||1.5} onChange={e=>setForm(f=>({...f,vehicles:f.vehicles.map((x,i)=>i===vi?{...x,weight:Number(e.target.value)}:x)}))}>{WEIGHTS.map(w=><option key={w} value={w}>{w}t</option>)}</select></div>
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
function QuoteFormModal({doc,customers,onSave,onClose,onToInv}){
  const[form,setForm]=useState({customerId:doc?.customerId||(customers[0]?.id||""),date:doc?.date||today(),items:doc?.items||[{desc:"",qty:1,unit:0,gijutsu:0}],tax:doc?.tax??0.1,status:doc?.status||"見積中",note:doc?.note||""});
  const addI=()=>setForm(f=>({...f,items:[...f.items,{desc:"",qty:1,unit:0,gijutsu:0}]}));
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
            <input className="inp mb8" placeholder="作業内容・品名" value={it.desc} onChange={e=>setI(i,"desc",e.target.value)}/>
            <div className="g3" style={{gap:7}}>
              <Fld label="数量"><input type="number" className="inp" style={{padding:"11px 13px",fontSize:15}} value={it.qty} onChange={e=>setI(i,"qty",Number(e.target.value))}/></Fld>
              <Fld label="部品代（税抜）"><input type="number" className="inp" style={{padding:"11px 13px",fontSize:15}} value={it.unit} onChange={e=>setI(i,"unit",Number(e.target.value))}/></Fld>
              <Fld label="技術料（税抜）"><input type="number" className="inp" style={{padding:"11px 13px",fontSize:15}} value={it.gijutsu||0} onChange={e=>setI(i,"gijutsu",Number(e.target.value))}/></Fld>
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
  const mkQId=arr=>`Q-${new Date().getFullYear()}-${String(nextId(arr.map(q=>({id:q.id.replace(/\D/g,"")})))).padStart(3,"0")}`;
  const save=form=>{
    if(modal==="add")setQuotes(p=>[...p,{...form,id:mkQId(p)}]);
    else setQuotes(p=>p.map(q=>q.id===modal.id?{...form,id:q.id}:q));
    setModal(null);
  };
  const toInv=form=>{
    const nid=`INV-${new Date().getFullYear()}-${String(nextId(invoices.map(i=>({id:i.id.replace(/\D/g,"")})))).padStart(3,"0")}`;
    setInvoices(p=>[...p,{...form,id:nid,type:"repair",vehicleId:"",dueDate:"",status:"未入金"}]);
    setModal(null);alert(`請求書 ${nid} に変換しました`);
  };
  if(modal) return <QuoteFormModal doc={modal==="add"?null:modal} customers={customers} onSave={save} onClose={()=>setModal(null)} onToInv={modal!=="add"?toInv:null}/>;
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
function RepairForm({doc,customers,onSave,onClose}){
  const[form,setForm]=useState({customerId:doc?.customerId||(customers[0]?.id||""),vehicleId:doc?.vehicleId||"",date:doc?.date||today(),dueDate:doc?.dueDate||"",items:doc?.items||[{desc:"",qty:1,unit:0,gijutsu:0}],tax:doc?.tax??0.1,status:doc?.status||"未入金",note:doc?.note||""});
  const cust=customers.find(c=>c.id===Number(form.customerId));
  const addI=()=>setForm(f=>({...f,items:[...f.items,{desc:"",qty:1,unit:0,gijutsu:0}]}));
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
              <input className="inp mb8" placeholder="バンパー修理・塗装など" value={it.desc} onChange={e=>setI(i,"desc",e.target.value)}/>
              <div className="g3" style={{gap:7}}>
                <Fld label="数量"><input type="number" className="inp" value={it.qty} onChange={e=>setI(i,"qty",Number(e.target.value))}/></Fld>
                <Fld label="部品代（税抜）"><input type="number" className="inp" value={it.unit} onChange={e=>setI(i,"unit",Number(e.target.value))}/></Fld>
                <Fld label="技術料（税抜）"><input type="number" className="inp" value={it.gijutsu||0} onChange={e=>setI(i,"gijutsu",Number(e.target.value))}/></Fld>
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
  const defS={jibaiseki:0,juryozei:0,kensaShomei:settings.kensaShomei,gijutsuKanri:settings.gijutsuKanri,daiko:settings.daiko,daikoTax:settings.daikoTax};
  const[form,setForm]=useState({customerId:doc?.customerId||(customers[0]?.id||""),vehicleId:doc?.vehicleId||"",date:doc?.date||today(),dueDate:doc?.dueDate||"",items:doc?.items||DEF_SHAKKEN_ITEMS.map(i=>({...i})),tax:doc?.tax??0.1,status:doc?.status||"未入金",note:doc?.note||"",shakken:{...defS,...(doc?.shakken||{})}});
  const[auto,setAuto]=useState(true);
  const cust=customers.find(c=>c.id===Number(form.customerId));
  const vehicle=(cust?.vehicles||[]).find(v=>v.id===Number(form.vehicleId));
  useEffect(()=>{if(auto&&vehicle)setForm(f=>({...f,shakken:{...f.shakken,jibaiseki:calcJibaiseki(vehicle.carType,24),juryozei:calcJuryozei(vehicle.weight)}}));},[form.vehicleId,auto]);
  const setS=(k,v)=>setForm(f=>({...f,shakken:{...f.shakken,[k]:Number(v)}}));
  const addI=()=>setForm(f=>({...f,items:[...f.items,{desc:"",qty:1,unit:0,gijutsu:0}]}));
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
              <div style={{flex:1,minWidth:0}}><div className="sm b6">車検代行料 <span className="bdg dor" style={{marginLeft:4}}>課税</span></div><div className="xs cmu">消費税が加算されます</div></div>
              <div className="row" style={{gap:6}}>
                <input type="number" className="inp" style={{width:100,padding:"6px 10px",fontSize:14}} value={form.shakken.daiko||0} onChange={e=>setS("daiko",e.target.value)}/>
                <select className="sel" style={{width:75,padding:"6px 9px",fontSize:12}} value={form.shakken.daikoTax??settings.daikoTax} onChange={e=>setS("daikoTax",e.target.value)}><option value={0.1}>10%</option><option value={0.08}>8%</option></select>
              </div>
            </div>
          </div>
        </div>

        {/* 整備明細（下に移動） */}
        <div><div className="fl">整備明細（課税）</div>
          <div className="lst">{form.items.map((it,i)=>(
            <div key={i} style={{padding:"9px 13px",borderBottom:"1px solid var(--sep)"}}>
              <div className="rb mb8" style={{gap:8}}>
                <input className="inp" style={{flex:1}} placeholder="作業内容・品名" value={it.desc} onChange={e=>setI(i,"desc",e.target.value)}/>
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
                <Fld label="数量"><input type="number" className="inp" value={it.qty} onChange={e=>setI(i,"qty",Number(e.target.value))}/></Fld>
                <Fld label="部品代（税抜）"><input type="number" className="inp" value={it.unit} onChange={e=>setI(i,"unit",Number(e.target.value))}/></Fld>
                <Fld label="技術料（税抜）"><input type="number" className="inp" value={it.gijutsu||0} onChange={e=>setI(i,"gijutsu",Number(e.target.value))}/></Fld>
              </div>
              <div className="rb mt8"><span className="cmu sm">小計: {fmt(it.qty*(it.unit||0)+(it.gijutsu||0))}</span>{form.items.length>1&&<button className="btn bd bsm" onClick={()=>remI(i)}>削除</button>}</div>
            </div>
          ))}</div>
          <button className="btn bs bsm mt8" onClick={addI}>＋ 整備明細追加</button>
        </div>

        <div className="card" style={{background:"var(--grp)"}}>
          <div className="xs cmu" style={{fontWeight:700,marginBottom:7}}>金額内訳</div>
          {[[`整備費（税抜）`,fmt(sub)],[`消費税（${Math.round(form.tax*100)}%）`,fmt(taxAmt)],[`整備費合計（税込）`,fmt(wT)],null,[form.shakken.jibaisekiMochikomi?"自賠責保険（持ち込み）":"自賠責保険",form.shakken.jibaisekiMochikomi?"持ち込み":fmt(form.shakken.jibaiseki||0)],["重量税",fmt(form.shakken.juryozei||0)],["検査登録証紙代",fmt(form.shakken.kensaShomei||settings.kensaShomei)],["技術管理料",fmt(form.shakken.gijutsuKanri||settings.gijutsuKanri)],["法定費用合計（非課税）",fmt(gov)],null,[`車検代行料（税込${Math.round((form.shakken.daikoTax??settings.daikoTax)*100)}%）`,fmt(dWT)]].map((row,i)=>
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
function Invoices({invoices,setInvoices,customers,settings}){
  const[modal,setModal]=useState(null);const[print,setPrint]=useState(null);const[printType,setPType]=useState("invoice");
  const[tab,setTab]=useState("all");const[tTab,setTTab]=useState("all");
  const[showTpl,setShowTpl]=useState(false);
  const gt=inv=>invTotal(inv,settings);
  const filtered=invoices.filter(i=>{
    if(tab==="paid"&&i.status!=="入金済")return false;
    if(tab==="unpaid"&&i.status!=="未入金")return false;
    if(tTab==="repair"&&i.type!=="repair")return false;
    if(tTab==="shakken"&&i.type!=="shakken")return false;
    return true;
  });
  const save=form=>{
    const ib=invoices.map(i=>({id:i.id.replace(/\D/g,"")}));
    if(modal.doc===null)setInvoices(p=>[...p,{...form,id:`INV-${new Date().getFullYear()}-${String(nextId(ib)).padStart(3,"0")}`}]);
    else setInvoices(p=>p.map(i=>i.id===modal.doc.id?{...form,id:i.id}:i));
    setModal(null);
  };
  if(modal?.mode==="repair") return <div className="stk fu"><RepairForm doc={modal.doc} customers={customers} onSave={save} onClose={()=>setModal(null)}/></div>;
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
          {mode:"repair",icon:"🔧",iconBg:"rgba(0,122,255,.12)",title:"板金塗装・整備用",desc:"通常の修理・整備向け。部品代・技術料明細、課税合計、インボイス対応。",color:"var(--bl)"},
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
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span className={`bdg ${inv.status==="入金済"?"dgr":"drd"}`} style={{fontSize:12,padding:"3px 10px"}}>{inv.status}</span>
                  <div style={{display:"flex",gap:6}} onClick={e=>e.stopPropagation()}>
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
  const cd={date:today(),allItems:filtered.map(inv=>({id:inv.id,date:inv.date,desc:inv.items.map(i=>i.desc).join("、"),total:gt(inv)})),combinedTotal:grand};
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
                const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:100,messages:[{role:"user",content:`板金塗装店の経費を以下のカテゴリから1つだけ選んでください。カテゴリ名のみ回答。
カテゴリ: ${EXP_CAT.join("、")}
摘要: ${form.desc}`}]})});
                const d=await res.json();
                const cat=d.content?.[0]?.text?.trim();
                if(EXP_CAT.includes(cat))setForm(f=>({...f,category:cat,aiLoading:false}));
                else setForm(f=>({...f,aiLoading:false}));
              }catch{setForm(f=>({...f,aiLoading:false}));}
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
  invoices.filter(i=>yr(i.date)===year&&mo(i.date)===month).forEach(inv=>{entries.push({date:inv.date,type:"収入",cat:inv.type==="shakken"?"車検":"鈑金修理",desc:inv.items.map(i=>i.desc).join("、"),amount:gt(inv),status:inv.status});});
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
  const gt=inv=>invTotal(inv,settings);
  const yInv=invoices.filter(i=>yr(i.date)===year);
  const yExp=expenses.filter(e=>yr(e.date)===year);
  const tS=yInv.reduce((s,i)=>s+gt(i),0);
  const tE=yExp.reduce((s,e)=>s+e.amount,0);
  const prof=tS-tE;
  const kGroup={};yExp.forEach(e=>{const k=KAMOKU[e.category]||"雑費";kGroup[k]=(kGroup[k]||0)+e.amount;});
  const q4=Array.from({length:4},(_,q)=>({q:q+1,s:yInv.filter(i=>Math.floor((mo(i.date)-1)/3)===q).reduce((s,i)=>s+gt(i),0)}));
  return(
    <div className="stk fu">
      <div className="rb">
        <div><div style={{fontSize:20,fontWeight:800}}>確定申告（白色）</div><div className="cmu sm mt4">申告データ参考資料</div></div>
        <div className="row" style={{gap:6}}><button className="btn bs bsm" onClick={()=>setYear(y=>y-1)}>‹</button><span className="b7">{year}年分</span><button className="btn bs bsm" onClick={()=>setYear(y=>y+1)}>›</button></div>
      </div>
      <div className="g3" style={{gap:9}}>{[["売上金額",tS,"#007AFF"],["必要経費",tE,"#FF9500"],["所得金額（概算）",prof,prof>=0?"#34C759":"#FF3B30"]].map(([l,v,c])=>(
        <div key={l} className="card" style={{borderTop:`3px solid ${c}`}}><div className="cmu sm">{l}</div><div style={{fontSize:20,fontWeight:800,color:c,marginTop:3}}>{fmt(v)}</div></div>
      ))}</div>
      <div className="card" style={{background:"rgba(255,149,0,.06)",border:"1px solid rgba(255,149,0,.25)"}}>
        <div className="row mb8" style={{gap:7}}><Ico e="⚠️" bg="rgba(255,149,0,.12)" sz={14}/><span className="b6 sm">ご注意</span></div>
        <div className="xs cmu">このデータは申告の参考資料です。実際の申告は税理士または税務署に確認してください。青色申告への切り替えで最大65万円の特別控除が受けられます。</div>
      </div>
      <div className="card">
        <div style={{fontSize:14,fontWeight:700,marginBottom:11}}>📋 収支内訳書イメージ（{year}年分）</div>
        <div style={{borderBottom:"2px solid var(--bl)",paddingBottom:8,marginBottom:11}}>
          <div className="rb"><span className="b6">① 売上金額（収入金額）</span><span className="b7 cbl" style={{fontSize:16}}>{fmt(tS)}</span></div>
          <div className="xs cmu mt4">請求 {yInv.length}件 / 車検 {yInv.filter(i=>i.type==="shakken").length}件 / 鈑金 {yInv.filter(i=>i.type==="repair").length}件</div>
        </div>
        <div className="g4" style={{gap:7,marginBottom:11}}>
          {q4.map(q=><div key={q.q} style={{background:"var(--grp)",borderRadius:8,padding:"7px 9px"}}><div className="xs cmu">第{q.q}四半期</div><div className="b6 sm">{fmt(q.s)}</div></div>)}
        </div>
        <div style={{borderBottom:"2px solid var(--or)",paddingBottom:8,marginBottom:11}}>
          <div className="rb"><span className="b6">② 必要経費合計</span><span className="b7" style={{fontSize:16,color:"var(--or)"}}>{fmt(tE)}</span></div>
        </div>
        <div className="stk" style={{gap:6}}>
          {Object.entries(kGroup).map(([k,v])=>(
            <div key={k} className="rb" style={{padding:"4px 0",borderBottom:"1px solid var(--sep)"}}><span className="sm">{k}</span><span className="sm b6">{fmt(v)}</span></div>
          ))}
        </div>
        <div style={{borderTop:"2px solid var(--gr)",marginTop:11,paddingTop:9}} className="rb">
          <span className="b7">③ 所得金額（①－②）</span>
          <span className="b7" style={{fontSize:17,color:prof>=0?"var(--gr)":"var(--re)"}}>{fmt(prof)}</span>
        </div>
      </div>
      <div className="card">
        <div style={{fontSize:14,fontWeight:700,marginBottom:11}}>月別売上内訳</div>
        <table className="tbl">
          <thead><tr><th>月</th><th style={{textAlign:"right"}}>売上</th><th style={{textAlign:"right"}}>経費</th><th style={{textAlign:"right"}}>差引</th></tr></thead>
          <tbody>
            {Array.from({length:12},(_,i)=>{const m=i+1;const s=yInv.filter(i=>mo(i.date)===m).reduce((sum,i)=>sum+gt(i),0);const e=yExp.filter(e=>mo(e.date)===m).reduce((sum,e)=>sum+e.amount,0);
              return <tr key={m}><td className="b6">{m}月</td><td style={{textAlign:"right",color:"var(--bl)",fontWeight:600,fontSize:13}}>{s?fmt(s):"—"}</td><td style={{textAlign:"right",color:"var(--or)",fontSize:13}}>{e?fmt(e):"—"}</td><td style={{textAlign:"right",fontWeight:700,fontSize:13,color:(s-e)>=0?"var(--lb)":"var(--re)"}}>{s||e?fmt(s-e):"—"}</td></tr>;
            })}
            <tr style={{background:"var(--grp)",fontWeight:700}}><td>合計</td><td style={{textAlign:"right",color:"var(--bl)",fontSize:13}}>{fmt(tS)}</td><td style={{textAlign:"right",color:"var(--or)",fontSize:13}}>{fmt(tE)}</td><td style={{textAlign:"right",fontSize:13,color:prof>=0?"var(--lb)":"var(--re)"}}>{fmt(prof)}</td></tr>
          </tbody>
        </table>
      </div>
      <div className="card" style={{background:"linear-gradient(135deg,rgba(0,122,255,.05),rgba(88,86,214,.05))",border:"1px solid rgba(0,122,255,.18)"}}>
        <div className="row mb8" style={{gap:8}}><Ico e="💡" bg="rgba(0,122,255,.1)" sz={15}/><span className="b7 sm">青色申告に切り替えると？</span></div>
        <div className="stk" style={{gap:4}}>
          {["65万円特別控除（電子申告の場合）","赤字の3年間繰り越し","家族への給与を必要経費に（青色専従者）","30万円未満の資産を一括経費計上可能"].map(t=>(
            <div key={t} className="row" style={{gap:5}}><span className="cbl xs">✓</span><span className="xs">{t}</span></div>
          ))}
        </div>
        <div className="xs cmu mt8">※ 開始年の3月15日までに「青色申告承認申請書」を税務署に提出が必要</div>
      </div>
    </div>
  );
}

// ── Settings ───────────────────────────────────────────────
// Settings用入力フィールド（React.memoでiPhoneキーボード対策）
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
          <SettingsField label="会社名・屋号" placeholder="鈴木板金塗装" value={form.shopName} onChange={upd("shopName")}/>
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
        </div>
      </div>
    </div>
  );
}

// ── Data Manager ───────────────────────────────────────────
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
const WL_TAGS=["板金","塗装","車検","整備","板金塗装","外装","内装","エンジン","電装","タイヤ","ガラス","その他"];
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
      case"invoices":    return <Invoices invoices={invoices} setInvoices={set("invoices")} customers={customers} settings={settings}/>;
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
          <div className="sbl"><h1>🔧 板金会計</h1><p>AutoRepair ERP · {settings.shopName}</p></div>
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

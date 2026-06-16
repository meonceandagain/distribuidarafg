import { getStore } from "@netlify/blobs";
export default async function handler(req, context) {
  const headers = {
    "Content-Type":"application/json","Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"POST, OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type, Authorization"
  };
  if(req.method==="OPTIONS") return new Response("",{status:204,headers});
  if(req.method!=="POST") return new Response(JSON.stringify({error:"Method not allowed"}),{status:405,headers});
  const token=(req.headers.get("Authorization")||"").replace("Bearer ","").trim();
  const adminPwd=process.env.ADMIN_PASSWORD||"fg-dist-2024";
  if(token!==adminPwd) return new Response(JSON.stringify({error:"No autorizado"}),{status:401,headers});
  try {
    const body=await req.json();
    if(body._ping) return new Response(JSON.stringify({ok:true}),{status:200,headers});
    const {data}=body;
    const store=getStore({name:"fg-dist",consistency:"strong"});
    await store.setJSON("config",data);
    return new Response(JSON.stringify({ok:true}),{status:200,headers});
  } catch(e) {
    return new Response(JSON.stringify({error:e.message}),{status:500,headers});
  }
}
export const config = { path:"/api/save-data" };

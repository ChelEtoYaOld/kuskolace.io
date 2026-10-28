const fs=require('fs'),vm=require('vm'),assert=require('assert'),esbuild=require('esbuild');
const root=require('path').resolve(__dirname,'..')+'/';
(async()=>{
for(const generated of [false,true]){
 let writes=0;
 const config={id:'existing',accountHandle:'@kuskolace',syncStatus:'AUTORIZOVANO',autoSync:true,feedMode:'API',lastSyncAt:'fake-success',createdAt:new Date(),updatedAt:new Date()};
 const prisma={instagramConfig:{findFirst:async()=>config,create:async()=>{writes++;throw Error('unexpected create')},update:async()=>{writes++;throw Error('unexpected update')}},instagramPost:{findMany:async()=>[],create:async()=>{writes++;throw Error('unexpected insert')}}};
 const auth={withResult:fn=>fn};
 function load(name){const file=root+(generated?'server-action-generated/src.backend.actions.'+name+'.js':'src/backend/actions/'+name+'.ts');let code=fs.readFileSync(file,'utf8');if(!generated)code=esbuild.transformSync(code,{loader:'ts',format:'cjs'}).code;const sandbox={exports:{},module:{exports:{}},require:n=>{if(n==='./_common')return {prisma,backendAuth:auth};if(n==='@/tools/prisma')return {default:prisma,__esModule:true};if(n==='@/backend/action_utils')return auth;throw Error('unexpected dependency '+n)},console,Date};vm.runInNewContext(code,sandbox);return sandbox.module.exports;}
 const home=load('AdminHome'),ig=load('AdminInstagramIntegration');
 for(const task of [()=>home.manualSyncInstagram(),()=>ig.triggerInstagramSync(),()=>home.toggleInstagramAutoSync(),()=>home.toggleInstagramFeedMode('API'),()=>ig.updateInstagramConfig({feedMode:'API',autoSync:true,syncStatus:'AUTORIZOVANO'})])await assert.rejects(task,/Instagram API/);
 assert.equal(writes,0);
 const result=await ig.getInstagramIntegrationData();assert.equal(result.config.syncStatus,'NEPROPOJENO');assert.equal(result.config.autoSync,false);assert.equal(result.config.lastSyncAt,null);assert.equal(result.config.feedMode,'FALLBACK');
 console.log((generated?'Bundled JS':'Source TS')+': 5 unavailable operations rejected without DB writes; stale success state corrected.');
}
})();

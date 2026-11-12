import{InjectionToken as n}from"@angular/core";var a=new n("LOAD_REMOTE"),s=(o,e)=>async(r,t)=>{if(customElements.get(t))return;await(await e.loadRemoteModule(r,t)).bootstrap(o,e)};export{a,s as b};

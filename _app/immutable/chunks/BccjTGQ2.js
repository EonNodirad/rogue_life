var hr=Object.defineProperty;var qr=(i,o,s)=>o in i?hr(i,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[o]=s;var ie=(i,o,s)=>qr(i,typeof o!="symbol"?o+"":o,s);import{h as bn}from"./D1X6kN33.js";const _n=[...` 	
\r\f \v\uFEFF`];function gr(i,o,s){var d=i==null?"":""+i;if(o&&(d=d?d+" "+o:o),s){for(var b of Object.keys(s))if(s[b])d=d?d+" "+b:b;else if(d.length)for(var T=b.length,L=0;(L=d.indexOf(b,L))>=0;){var N=L+T;(L===0||_n.includes(d[L-1]))&&(N===d.length||_n.includes(d[N]))?d=(L===0?"":d.substring(0,L))+d.substring(N+1):L=N}}return d===""?null:d}function va(i,o){return i==null?null:String(i)}function Na(i,o,s,d,b,T){var L=i.__className;if(bn||L!==s||L===void 0){var N=gr(s,d,T);(!bn||N!==i.getAttribute("class"))&&(N==null?i.removeAttribute("class"):i.className=N),i.__className=s}else if(T&&b!==T)for(var g in T){var l=!!T[g];(b==null||l!==!!b[g])&&i.classList.toggle(g,l)}return T}function Tr(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var bt={exports:{}},hn;function Rr(){return hn||(hn=1,(function(i,o){var s=void 0,d=function(b){return s||(s=new Promise(function(T,L){var an,un;var N=typeof b<"u"?b:{},g=N.onAbort;N.onAbort=function(e){L(new Error(e)),g&&g(e)},N.postRun=N.postRun||[],N.postRun.push(function(){T(N)}),i=void 0;var l;l||(l=typeof N<"u"?N:{});var j=!!globalThis.window,$=!!globalThis.WorkerGlobalScope;l.onRuntimeInitialized=function(){function e(u,p){switch(typeof p){case"boolean":br(u,p?1:0);break;case"number":pr(u,p);break;case"string":fr(u,p,-1,-1);break;case"object":if(p===null)dn(u);else if(p.length!=null){var h=We(p.length);G.set(p,h),Er(u,h,p.length,-1),Le(h)}else Ve(u,"Wrong API use : tried to return a value of an unknown type ("+p+").",-1);break;default:dn(u)}}function t(u,p){for(var h=[],q=0;q<u;q+=1){var y=ee(p+4*q,"i32"),U=sr(y);if(U===1||U===2)y=dr(y);else if(U===3)y=lr(y);else if(U===4){U=y,y=cr(U),U=mr(U);for(var z=new Uint8Array(y),k=0;k<y;k+=1)z[k]=G[U+k];y=z}else y=null;h.push(y)}return h}function n(u,p){this.Qa=u,this.db=p,this.Oa=1,this.yb=[]}function r(u,p){if(this.db=p,this.ob=xe(u),this.ob===null)throw Error("Unable to allocate memory for the SQL string");this.ub=this.ob,this.gb=this.Fb=null}function a(u){if(this.filename="dbfile_"+(4294967295*Math.random()>>>0),u!=null){var p=this.filename,h="/",q=p;if(h&&(h=typeof h=="string"?h:nt(h),q=p?Ze(h+"/"+p):h),p=Ct(!0,!0),q=Gn(q,p),u){if(typeof u=="string"){h=Array(u.length);for(var y=0,U=u.length;y<U;++y)h[y]=u.charCodeAt(y);u=h}De(q,p|146),h=be(q,577),Kt(h,u,0,u.length,0),st(h),De(q,p)}}this.handleError(R(this.filename,c)),this.db=ee(c,"i32"),fn(this.db),this.pb={},this.Sa={}}var c=me(4),m=l.cwrap,R=m("sqlite3_open","number",["string","number"]),O=m("sqlite3_close_v2","number",["number"]),S=m("sqlite3_exec","number",["number","string","number","number","number"]),F=m("sqlite3_changes","number",["number"]),P=m("sqlite3_prepare_v2","number",["number","string","number","number","number"]),on=m("sqlite3_sql","string",["number"]),Vn=m("sqlite3_normalized_sql","string",["number"]),sn=m("sqlite3_prepare_v2","number",["number","number","number","number","number"]),kn=m("sqlite3_bind_text","number",["number","number","number","number","number"]),cn=m("sqlite3_bind_blob","number",["number","number","number","number","number"]),Yn=m("sqlite3_bind_double","number",["number","number","number"]),Xn=m("sqlite3_bind_int","number",["number","number","number"]),zn=m("sqlite3_bind_parameter_index","number",["number","string"]),Kn=m("sqlite3_step","number",["number"]),Qn=m("sqlite3_errmsg","string",["number"]),Jn=m("sqlite3_column_count","number",["number"]),Zn=m("sqlite3_data_count","number",["number"]),er=m("sqlite3_column_double","number",["number","number"]),ln=m("sqlite3_column_text","string",["number","number"]),tr=m("sqlite3_column_blob","number",["number","number"]),nr=m("sqlite3_column_bytes","number",["number","number"]),rr=m("sqlite3_column_type","number",["number","number"]),ar=m("sqlite3_column_name","string",["number","number"]),ir=m("sqlite3_reset","number",["number"]),ur=m("sqlite3_clear_bindings","number",["number"]),or=m("sqlite3_finalize","number",["number"]),mn=m("sqlite3_create_function_v2","number","number string number number number number number number number".split(" ")),sr=m("sqlite3_value_type","number",["number"]),cr=m("sqlite3_value_bytes","number",["number"]),lr=m("sqlite3_value_text","string",["number"]),mr=m("sqlite3_value_blob","number",["number"]),dr=m("sqlite3_value_double","number",["number"]),pr=m("sqlite3_result_double","",["number","number"]),dn=m("sqlite3_result_null","",["number"]),fr=m("sqlite3_result_text","",["number","string","number","number"]),Er=m("sqlite3_result_blob","",["number","number","number","number"]),br=m("sqlite3_result_int","",["number","number"]),Ve=m("sqlite3_result_error","",["number","string","number"]),pn=m("sqlite3_aggregate_context","number",["number","number"]),fn=m("RegisterExtensionFunctions","number",["number"]),En=m("sqlite3_update_hook","number",["number","number","number"]);n.prototype.bind=function(u){if(!this.Qa)throw"Statement closed";return this.reset(),Array.isArray(u)?this.Wb(u):u!=null&&typeof u=="object"?this.Xb(u):!0},n.prototype.step=function(){if(!this.Qa)throw"Statement closed";this.Oa=1;var u=Kn(this.Qa);switch(u){case 100:return!0;case 101:return!1;default:throw this.db.handleError(u)}},n.prototype.Pb=function(u){return u==null&&(u=this.Oa,this.Oa+=1),er(this.Qa,u)},n.prototype.hc=function(u){if(u==null&&(u=this.Oa,this.Oa+=1),u=ln(this.Qa,u),typeof BigInt!="function")throw Error("BigInt is not supported");return BigInt(u)},n.prototype.mc=function(u){return u==null&&(u=this.Oa,this.Oa+=1),ln(this.Qa,u)},n.prototype.getBlob=function(u){u==null&&(u=this.Oa,this.Oa+=1);var p=nr(this.Qa,u);u=tr(this.Qa,u);for(var h=new Uint8Array(p),q=0;q<p;q+=1)h[q]=G[u+q];return h},n.prototype.get=function(u,p){p=p||{},u!=null&&this.bind(u)&&this.step(),u=[];for(var h=Zn(this.Qa),q=0;q<h;q+=1)switch(rr(this.Qa,q)){case 1:var y=p.useBigInt?this.hc(q):this.Pb(q);u.push(y);break;case 2:u.push(this.Pb(q));break;case 3:u.push(this.mc(q));break;case 4:u.push(this.getBlob(q));break;default:u.push(null)}return u},n.prototype.Db=function(){for(var u=[],p=Jn(this.Qa),h=0;h<p;h+=1)u.push(ar(this.Qa,h));return u},n.prototype.Ob=function(u,p){u=this.get(u,p),p=this.Db();for(var h={},q=0;q<p.length;q+=1)h[p[q]]=u[q];return h},n.prototype.lc=function(){return on(this.Qa)},n.prototype.ic=function(){return Vn(this.Qa)},n.prototype.Jb=function(u){return u!=null&&this.bind(u),this.step(),this.reset()},n.prototype.Lb=function(u,p){p==null&&(p=this.Oa,this.Oa+=1),u=xe(u),this.yb.push(u),this.db.handleError(kn(this.Qa,p,u,-1,0))},n.prototype.Vb=function(u,p){p==null&&(p=this.Oa,this.Oa+=1);var h=We(u.length);G.set(u,h),this.yb.push(h),this.db.handleError(cn(this.Qa,p,h,u.length,0))},n.prototype.Kb=function(u,p){p==null&&(p=this.Oa,this.Oa+=1),this.db.handleError((u===(u|0)?Xn:Yn)(this.Qa,p,u))},n.prototype.Yb=function(u){u==null&&(u=this.Oa,this.Oa+=1),cn(this.Qa,u,0,0,0)},n.prototype.Mb=function(u,p){switch(p==null&&(p=this.Oa,this.Oa+=1),typeof u){case"string":this.Lb(u,p);return;case"number":this.Kb(u,p);return;case"bigint":this.Lb(u.toString(),p);return;case"boolean":this.Kb(u+0,p);return;case"object":if(u===null){this.Yb(p);return}if(u.length!=null){this.Vb(u,p);return}}throw"Wrong API use : tried to bind a value of an unknown type ("+u+")."},n.prototype.Xb=function(u){var p=this;return Object.keys(u).forEach(function(h){var q=zn(p.Qa,h);q!==0&&p.Mb(u[h],q)}),!0},n.prototype.Wb=function(u){for(var p=0;p<u.length;p+=1)this.Mb(u[p],p+1);return!0},n.prototype.reset=function(){return this.Cb(),ur(this.Qa)===0&&ir(this.Qa)===0},n.prototype.Cb=function(){for(var u;(u=this.yb.pop())!==void 0;)Le(u)},n.prototype.cb=function(){this.Cb();var u=or(this.Qa)===0;return delete this.db.pb[this.Qa],this.Qa=0,u},r.prototype.next=function(){if(this.ob===null)return{done:!0};if(this.gb!==null&&(this.gb.cb(),this.gb=null),!this.db.db)throw this.Ab(),Error("Database closed");var u=He(),p=me(4);Te(c),Te(p);try{this.db.handleError(sn(this.db.db,this.ub,-1,c,p)),this.ub=ee(p,"i32");var h=ee(c,"i32");return h===0?(this.Ab(),{done:!0}):(this.gb=new n(h,this.db),this.db.pb[h]=this.gb,{value:this.gb,done:!1})}catch(q){throw this.Fb=D(this.ub),this.Ab(),q}finally{Be(u)}},r.prototype.Ab=function(){Le(this.ob),this.ob=null},r.prototype.jc=function(){return this.Fb!==null?this.Fb:D(this.ub)},typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"&&(r.prototype[Symbol.iterator]=function(){return this}),a.prototype.Jb=function(u,p){if(!this.db)throw"Database closed";if(p){u=this.Gb(u,p);try{u.step()}finally{u.cb()}}else this.handleError(S(this.db,u,0,0,c));return this},a.prototype.exec=function(u,p,h){if(!this.db)throw"Database closed";var q=null,y=null,U=null;try{U=y=xe(u);var z=me(4);for(u=[];ee(U,"i8")!==0;){Te(c),Te(z),this.handleError(sn(this.db,U,-1,c,z));var k=ee(c,"i32");if(U=ee(z,"i32"),k!==0){var H=null;for(q=new n(k,this),p!=null&&q.bind(p);q.step();)H===null&&(H={columns:q.Db(),values:[]},u.push(H)),H.values.push(q.get(null,h));q.cb()}}return u}catch(K){throw q&&q.cb(),K}finally{y&&Le(y)}},a.prototype.ec=function(u,p,h,q,y){typeof p=="function"&&(q=h,h=p,p=void 0),u=this.Gb(u,p);try{for(;u.step();)h(u.Ob(null,y))}finally{u.cb()}if(typeof q=="function")return q()},a.prototype.Gb=function(u,p){if(Te(c),this.handleError(P(this.db,u,-1,c,0)),u=ee(c,"i32"),u===0)throw"Nothing to prepare";var h=new n(u,this);return p!=null&&h.bind(p),this.pb[u]=h},a.prototype.pc=function(u){return new r(u,this)},a.prototype.fc=function(){Object.values(this.pb).forEach(function(p){p.cb()}),Object.values(this.Sa).forEach(re),this.Sa={},this.handleError(O(this.db));var u=Pn(this.filename);return this.handleError(R(this.filename,c)),this.db=ee(c,"i32"),fn(this.db),u},a.prototype.close=function(){this.db!==null&&(Object.values(this.pb).forEach(function(u){u.cb()}),Object.values(this.Sa).forEach(re),this.Sa={},this.fb&&(re(this.fb),this.fb=void 0),this.handleError(O(this.db)),Vt("/"+this.filename),this.db=null)},a.prototype.handleError=function(u){if(u===0)return null;throw u=Qn(this.db),Error(u)},a.prototype.kc=function(){return F(this.db)},a.prototype.bc=function(u,p){Object.prototype.hasOwnProperty.call(this.Sa,u)&&(re(this.Sa[u]),delete this.Sa[u]);var h=Ne(function(q,y,U){y=t(y,U);try{var z=p.apply(null,y)}catch(k){Ve(q,k,-1);return}e(q,z)},"viii");return this.Sa[u]=h,this.handleError(mn(this.db,u,p.length,1,0,h,0,0,0)),this},a.prototype.ac=function(u,p){var h=p.init||function(){return null},q=p.finalize||function(H){return H},y=p.step;if(!y)throw"An aggregate function must have a step function in "+u;var U={};Object.hasOwnProperty.call(this.Sa,u)&&(re(this.Sa[u]),delete this.Sa[u]),p=u+"__finalize",Object.hasOwnProperty.call(this.Sa,p)&&(re(this.Sa[p]),delete this.Sa[p]);var z=Ne(function(H,K,Et){var de=pn(H,1);Object.hasOwnProperty.call(U,de)||(U[de]=h()),K=t(K,Et),K=[U[de]].concat(K);try{U[de]=y.apply(null,K)}catch(_r){delete U[de],Ve(H,_r,-1)}},"viii"),k=Ne(function(H){var K=pn(H,1);try{var Et=q(U[K])}catch(de){delete U[K],Ve(H,de,-1);return}e(H,Et),delete U[K]},"vi");return this.Sa[u]=z,this.Sa[p]=k,this.handleError(mn(this.db,u,y.length-1,1,0,0,z,k,0)),this},a.prototype.vc=function(u){return this.fb&&(En(this.db,0,0),re(this.fb),this.fb=void 0),u?(this.fb=Ne(function(p,h,q,y,U){switch(h){case 18:p="insert";break;case 23:p="update";break;case 9:p="delete";break;default:throw"unknown operationCode in updateHook callback: "+h}if(q=D(q),y=D(y),U>Number.MAX_SAFE_INTEGER)throw"rowId too big to fit inside a Number";u(p,q,y,Number(U))},"viiiij"),En(this.db,this.fb,0),this):this},n.prototype.bind=n.prototype.bind,n.prototype.step=n.prototype.step,n.prototype.get=n.prototype.get,n.prototype.getColumnNames=n.prototype.Db,n.prototype.getAsObject=n.prototype.Ob,n.prototype.getSQL=n.prototype.lc,n.prototype.getNormalizedSQL=n.prototype.ic,n.prototype.run=n.prototype.Jb,n.prototype.reset=n.prototype.reset,n.prototype.freemem=n.prototype.Cb,n.prototype.free=n.prototype.cb,r.prototype.next=r.prototype.next,r.prototype.getRemainingSQL=r.prototype.jc,a.prototype.run=a.prototype.Jb,a.prototype.exec=a.prototype.exec,a.prototype.each=a.prototype.ec,a.prototype.prepare=a.prototype.Gb,a.prototype.iterateStatements=a.prototype.pc,a.prototype.export=a.prototype.fc,a.prototype.close=a.prototype.close,a.prototype.handleError=a.prototype.handleError,a.prototype.getRowsModified=a.prototype.kc,a.prototype.create_function=a.prototype.bc,a.prototype.create_aggregate=a.prototype.ac,a.prototype.updateHook=a.prototype.vc,l.Database=a};var gt="./this.program",Tt=(un=(an=globalThis.document)==null?void 0:an.currentScript)==null?void 0:un.src;$&&(Tt=self.location.href);var ke="",Rt,Ye;if(j||$){try{ke=new URL(".",Tt).href}catch{}$&&(Ye=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),Rt=async e=>{if(e=await fetch(e,{credentials:"same-origin"}),e.ok)return e.arrayBuffer();throw Error(e.status+" : "+e.url)}}var Xe=console.log.bind(console),ue=console.error.bind(console),_e,Ie=!1,ze,G,x,he,C,A,Ke,Qe,X;function vt(){var e=je.buffer;G=new Int8Array(e),he=new Int16Array(e),x=new Uint8Array(e),C=new Int32Array(e),A=new Uint32Array(e),Ke=new Float32Array(e),Qe=new Float64Array(e),X=new BigInt64Array(e),new BigUint64Array(e)}function qe(e){var t;throw(t=l.onAbort)==null||t.call(l,e),e="Aborted("+e+")",ue(e),Ie=!0,new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info.")}var Je;async function vn(e){if(!_e)try{var t=await Rt(e);return new Uint8Array(t)}catch{}if(e==Je&&_e)e=new Uint8Array(_e);else if(Ye)e=Ye(e);else throw"both async and sync fetching of the wasm failed";return e}async function Nn(e,t){try{var n=await vn(e);return await WebAssembly.instantiate(n,t)}catch(r){ue(`failed to asynchronously prepare wasm: ${r}`),qe(r)}}async function Ln(e){var t=Je;if(!_e)try{var n=fetch(t,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(n,e)}catch(r){ue(`wasm streaming compile failed: ${r}`),ue("falling back to ArrayBuffer instantiation")}return Nn(t,e)}class Nt{constructor(t){ie(this,"name","ExitStatus");this.message=`Program terminated with exit(${t})`,this.status=t}}var Lt=e=>{for(;0<e.length;)e.shift()(l)},wt=[],St=[],wn=()=>{var e=l.preRun.shift();St.push(e)},oe=0,ge=null;function ee(e,t="i8"){switch(t.endsWith("*")&&(t="*"),t){case"i1":return G[e];case"i8":return G[e];case"i16":return he[e>>1];case"i32":return C[e>>2];case"i64":return X[e>>3];case"float":return Ke[e>>2];case"double":return Qe[e>>3];case"*":return A[e>>2];default:qe(`invalid type for getValue: ${t}`)}}var Ue=!0;function Te(e){var t="i32";switch(t.endsWith("*")&&(t="*"),t){case"i1":G[e]=0;break;case"i8":G[e]=0;break;case"i16":he[e>>1]=0;break;case"i32":C[e>>2]=0;break;case"i64":X[e>>3]=BigInt(0);break;case"float":Ke[e>>2]=0;break;case"double":Qe[e>>3]=0;break;case"*":A[e>>2]=0;break;default:qe(`invalid type for setValue: ${t}`)}}var yt=new TextDecoder,It=(e,t,n,r)=>{if(n=t+n,r)return n;for(;e[t]&&!(t>=n);)++t;return t},D=(e,t,n)=>e?yt.decode(x.subarray(e,It(x,e,t,n))):"",Ut=(e,t)=>{for(var n=0,r=e.length-1;0<=r;r--){var a=e[r];a==="."?e.splice(r,1):a===".."?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n;n--)e.unshift("..");return e},Ze=e=>{var t=e.charAt(0)==="/",n=e.slice(-1)==="/";return(e=Ut(e.split("/").filter(r=>!!r),!t).join("/"))||t||(e="."),e&&n&&(e+="/"),(t?"/":"")+e},Ot=e=>{var t=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);return e=t[0],t=t[1],!e&&!t?".":(t&&(t=t.slice(0,-1)),e+t)},Oe=e=>e&&e.match(/([^\/]+|\/)\/*$/)[1],Sn=()=>e=>crypto.getRandomValues(e),At=e=>{(At=Sn())(e)},yn=(...e)=>{for(var t="",n=!1,r=e.length-1;-1<=r&&!n;r--){if(n=0<=r?e[r]:"/",typeof n!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!n)return"";t=n+"/"+t,n=n.charAt(0)==="/"}return t=Ut(t.split("/").filter(a=>!!a),!n).join("/"),(n?"/":"")+t||"."},Ae=e=>{var t=It(e,0);return yt.decode(e.buffer?e.subarray(0,t):new Uint8Array(e.slice(0,t)))},et=[],pe=e=>{for(var t=0,n=0;n<e.length;++n){var r=e.charCodeAt(n);127>=r?t++:2047>=r?t+=2:55296<=r&&57343>=r?(t+=4,++n):t+=3}return t},Q=(e,t,n,r)=>{if(!(0<r))return 0;var a=n;r=n+r-1;for(var c=0;c<e.length;++c){var m=e.codePointAt(c);if(127>=m){if(n>=r)break;t[n++]=m}else if(2047>=m){if(n+1>=r)break;t[n++]=192|m>>6,t[n++]=128|m&63}else if(65535>=m){if(n+2>=r)break;t[n++]=224|m>>12,t[n++]=128|m>>6&63,t[n++]=128|m&63}else{if(n+3>=r)break;t[n++]=240|m>>18,t[n++]=128|m>>12&63,t[n++]=128|m>>6&63,t[n++]=128|m&63,c++}}return t[n]=0,n-a},Mt=[];function Ft(e,t){Mt[e]={input:[],output:[],kb:t},ut(e,In)}var In={open(e){var t=Mt[e.node.nb];if(!t)throw new f(43);e.Va=t,e.seekable=!1},close(e){e.Va.kb.lb(e.Va)},lb(e){e.Va.kb.lb(e.Va)},read(e,t,n,r){if(!e.Va||!e.Va.kb.Qb)throw new f(60);for(var a=0,c=0;c<r;c++){try{var m=e.Va.kb.Qb(e.Va)}catch{throw new f(29)}if(m===void 0&&a===0)throw new f(6);if(m==null)break;a++,t[n+c]=m}return a&&(e.node.$a=Date.now()),a},write(e,t,n,r){if(!e.Va||!e.Va.kb.Hb)throw new f(60);try{for(var a=0;a<r;a++)e.Va.kb.Hb(e.Va,t[n+a])}catch{throw new f(29)}return r&&(e.node.Ua=e.node.Ta=Date.now()),a}},Un={Qb(){var n;e:{if(!et.length){var e=null;if((n=globalThis.window)!=null&&n.prompt&&(e=window.prompt("Input: "),e!==null&&(e+=`
`)),!e){var t=null;break e}t=Array(pe(e)+1),e=Q(e,t,0,t.length),t.length=e,et=t}t=et.shift()}return t},Hb(e,t){t===null||t===10?(Xe(Ae(e.output)),e.output=[]):t!=0&&e.output.push(t)},lb(e){var t;0<((t=e.output)==null?void 0:t.length)&&(Xe(Ae(e.output)),e.output=[])},Dc(){return{yc:25856,Ac:5,xc:191,zc:35387,wc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Ec(){return 0},Fc(){return[24,80]}},On={Hb(e,t){t===null||t===10?(ue(Ae(e.output)),e.output=[]):t!=0&&e.output.push(t)},lb(e){var t;0<((t=e.output)==null?void 0:t.length)&&(ue(Ae(e.output)),e.output=[])}},w={Za:null,ab(){return w.createNode(null,"/",16895,0)},createNode(e,t,n,r){if((n&61440)===24576||(n&61440)===4096)throw new f(63);return w.Za||(w.Za={dir:{node:{Wa:w.La.Wa,Xa:w.La.Xa,mb:w.La.mb,rb:w.La.rb,Tb:w.La.Tb,xb:w.La.xb,vb:w.La.vb,Ib:w.La.Ib,wb:w.La.wb},stream:{Ya:w.Ma.Ya}},file:{node:{Wa:w.La.Wa,Xa:w.La.Xa},stream:{Ya:w.Ma.Ya,read:w.Ma.read,write:w.Ma.write,sb:w.Ma.sb,tb:w.Ma.tb}},link:{node:{Wa:w.La.Wa,Xa:w.La.Xa,eb:w.La.eb},stream:{}},Nb:{node:{Wa:w.La.Wa,Xa:w.La.Xa},stream:Dn}}),n=$t(e,t,n,r),B(n.mode)?(n.La=w.Za.dir.node,n.Ma=w.Za.dir.stream,n.Na={}):(n.mode&61440)===32768?(n.La=w.Za.file.node,n.Ma=w.Za.file.stream,n.Ra=0,n.Na=null):(n.mode&61440)===40960?(n.La=w.Za.link.node,n.Ma=w.Za.link.stream):(n.mode&61440)===8192&&(n.La=w.Za.Nb.node,n.Ma=w.Za.Nb.stream),n.$a=n.Ua=n.Ta=Date.now(),e&&(e.Na[t]=n,e.$a=e.Ua=e.Ta=n.$a),n},Cc(e){return e.Na?e.Na.subarray?e.Na.subarray(0,e.Ra):new Uint8Array(e.Na):new Uint8Array(0)},La:{Wa(e){var t={};return t.cc=(e.mode&61440)===8192?e.id:1,t.oc=e.id,t.mode=e.mode,t.rc=1,t.uid=0,t.nc=0,t.nb=e.nb,B(e.mode)?t.size=4096:(e.mode&61440)===32768?t.size=e.Ra:(e.mode&61440)===40960?t.size=e.link.length:t.size=0,t.$a=new Date(e.$a),t.Ua=new Date(e.Ua),t.Ta=new Date(e.Ta),t.Zb=4096,t.$b=Math.ceil(t.size/t.Zb),t},Xa(e,t){for(var n of["mode","atime","mtime","ctime"])t[n]!=null&&(e[n]=t[n]);t.size!==void 0&&(t=t.size,e.Ra!=t&&(t==0?(e.Na=null,e.Ra=0):(n=e.Na,e.Na=new Uint8Array(t),n&&e.Na.set(n.subarray(0,Math.min(t,e.Ra))),e.Ra=t)))},mb(){throw w.zb||(w.zb=new f(44),w.zb.stack="<generic error, no stack>"),w.zb},rb(e,t,n,r){return w.createNode(e,t,n,r)},Tb(e,t,n){try{var r=se(t,n)}catch{}if(r){if(B(e.mode))for(var a in r.Na)throw new f(55);at(r)}delete e.parent.Na[e.name],t.Na[n]=e,e.name=n,t.Ta=t.Ua=e.parent.Ta=e.parent.Ua=Date.now()},xb(e,t){delete e.Na[t],e.Ta=e.Ua=Date.now()},vb(e,t){var n=se(e,t),r;for(r in n.Na)throw new f(55);delete e.Na[t],e.Ta=e.Ua=Date.now()},Ib(e){return[".","..",...Object.keys(e.Na)]},wb(e,t,n){return e=w.createNode(e,t,41471,0),e.link=n,e},eb(e){if((e.mode&61440)!==40960)throw new f(28);return e.link}},Ma:{read(e,t,n,r,a){var c=e.node.Na;if(a>=e.node.Ra)return 0;if(e=Math.min(e.node.Ra-a,r),8<e&&c.subarray)t.set(c.subarray(a,a+e),n);else for(r=0;r<e;r++)t[n+r]=c[a+r];return e},write(e,t,n,r,a,c){if(t.buffer===G.buffer&&(c=!1),!r)return 0;if(e=e.node,e.Ua=e.Ta=Date.now(),t.subarray&&(!e.Na||e.Na.subarray)){if(c)return e.Na=t.subarray(n,n+r),e.Ra=r;if(e.Ra===0&&a===0)return e.Na=t.slice(n,n+r),e.Ra=r;if(a+r<=e.Ra)return e.Na.set(t.subarray(n,n+r),a),r}c=a+r;var m=e.Na?e.Na.length:0;if(m>=c||(c=Math.max(c,m*(1048576>m?2:1.125)>>>0),m!=0&&(c=Math.max(c,256)),m=e.Na,e.Na=new Uint8Array(c),0<e.Ra&&e.Na.set(m.subarray(0,e.Ra),0)),e.Na.subarray&&t.subarray)e.Na.set(t.subarray(n,n+r),a);else for(c=0;c<r;c++)e.Na[a+c]=t[n+c];return e.Ra=Math.max(e.Ra,a+r),r},Ya(e,t,n){if(n===1?t+=e.position:n===2&&(e.node.mode&61440)===32768&&(t+=e.node.Ra),0>t)throw new f(28);return t},sb(e,t,n,r,a){if((e.node.mode&61440)!==32768)throw new f(43);if(e=e.node.Na,a&2||!e||e.buffer!==G.buffer){a=!0,r=65536*Math.ceil(t/65536);var c=nn(65536,r);if(c&&x.fill(0,c,c+r),r=c,!r)throw new f(48);e&&((0<n||n+t<e.length)&&(e.subarray?e=e.subarray(n,n+t):e=Array.prototype.slice.call(e,n,n+t)),G.set(e,r))}else a=!1,r=e.byteOffset;return{tc:r,Ub:a}},tb(e,t,n,r){return w.Ma.write(e,t,0,r,n,!1),0}}},Ct=(e,t)=>{var n=0;return e&&(n|=365),t&&(n|=146),n},tt=null,Dt={},fe=[],An=1,te=null,Gt=!1,Pt=!0,f=class{constructor(e){ie(this,"name","ErrnoError");this.Pa=e}},Mn=class{constructor(){ie(this,"qb",{});ie(this,"node",null)}get flags(){return this.qb.flags}set flags(e){this.qb.flags=e}get position(){return this.qb.position}set position(e){this.qb.position=e}},Fn=class{constructor(e,t,n,r){ie(this,"La",{});ie(this,"Ma",{});ie(this,"ib",null);e||(e=this),this.parent=e,this.ab=e.ab,this.id=An++,this.name=t,this.mode=n,this.nb=r,this.$a=this.Ua=this.Ta=Date.now()}get read(){return(this.mode&365)===365}set read(e){e?this.mode|=365:this.mode&=-366}get write(){return(this.mode&146)===146}set write(e){e?this.mode|=146:this.mode&=-147}};function V(e,t={}){if(!e)throw new f(44);t.Bb??(t.Bb=!0),e.charAt(0)==="/"||(e="//"+e);var n=0;e:for(;40>n;n++){e=e.split("/").filter(R=>!!R);for(var r=tt,a="/",c=0;c<e.length;c++){var m=c===e.length-1;if(m&&t.parent)break;if(e[c]!==".")if(e[c]==="..")if(a=Ot(a),r===r.parent){e=a+"/"+e.slice(c+1).join("/"),n--;continue e}else r=r.parent;else{a=Ze(a+"/"+e[c]);try{r=se(r,e[c])}catch(R){if((R==null?void 0:R.Pa)===44&&m&&t.sc)return{path:a};throw R}if(!r.ib||m&&!t.Bb||(r=r.ib.root),(r.mode&61440)===40960&&(!m||t.hb)){if(!r.La.eb)throw new f(52);r=r.La.eb(r),r.charAt(0)==="/"||(r=Ot(a)+"/"+r),e=r+"/"+e.slice(c+1).join("/");continue e}}}return{path:a,node:r}}throw new f(32)}function nt(e){for(var t;;){if(e===e.parent)return e=e.ab.Sb,t?e[e.length-1]!=="/"?`${e}/${t}`:e+t:e;t=t?`${e.name}/${t}`:e.name,e=e.parent}}function rt(e,t){for(var n=0,r=0;r<t.length;r++)n=(n<<5)-n+t.charCodeAt(r)|0;return(e+n>>>0)%te.length}function at(e){var t=rt(e.parent.id,e.name);if(te[t]===e)te[t]=e.jb;else for(t=te[t];t;){if(t.jb===e){t.jb=e.jb;break}t=t.jb}}function se(e,t){var n=B(e.mode)?(n=Ee(e,"x"))?n:e.La.mb?0:2:54;if(n)throw new f(n);for(n=te[rt(e.id,t)];n;n=n.jb){var r=n.name;if(n.parent.id===e.id&&r===t)return n}return e.La.mb(e,t)}function $t(e,t,n,r){return e=new Fn(e,t,n,r),t=rt(e.parent.id,e.name),e.jb=te[t],te[t]=e}function B(e){return(e&61440)===16384}function Ee(e,t){return Pt?0:t.includes("r")&&!(e.mode&292)||t.includes("w")&&!(e.mode&146)||t.includes("x")&&!(e.mode&73)?2:0}function xt(e,t){if(!B(e.mode))return 54;try{return se(e,t),20}catch{}return Ee(e,"wx")}function Wt(e,t,n){try{var r=se(e,t)}catch(a){return a.Pa}if(e=Ee(e,"wx"))return e;if(n){if(!B(r.mode))return 54;if(r===r.parent||nt(r)==="/")return 10}else if(B(r.mode))return 31;return 0}function Me(e){if(!e)throw new f(63);return e}function W(e){if(e=fe[e],!e)throw new f(8);return e}function Bt(e,t=-1){if(e=Object.assign(new Mn,e),t==-1)e:{for(t=0;4096>=t;t++)if(!fe[t])break e;throw new f(33)}return e.bb=t,fe[t]=e}function Cn(e,t=-1){var n,r;return e=Bt(e,t),(r=(n=e.Ma)==null?void 0:n.Bc)==null||r.call(n,e),e}function it(e,t,n){var r=e==null?void 0:e.Ma.Xa;e=r?e:t,r??(r=t.La.Xa),Me(r),r(e,n)}var Dn={open(e){var t,n;e.Ma=Dt[e.node.nb].Ma,(n=(t=e.Ma).open)==null||n.call(t,e)},Ya(){throw new f(70)}};function ut(e,t){Dt[e]={Ma:t}}function Ht(e,t){var n=t==="/";if(n&&tt)throw new f(10);if(!n&&t){var r=V(t,{Bb:!1});if(t=r.path,r=r.node,r.ib)throw new f(10);if(!B(r.mode))throw new f(54)}t={type:e,Gc:{},Sb:t,qc:[]},e=e.ab(t),e.ab=t,t.root=e,n?tt=e:r&&(r.ib=t,r.ab&&r.ab.qc.push(t))}function Fe(e,t,n){var r=V(e,{parent:!0}).node;if(e=Oe(e),!e)throw new f(28);if(e==="."||e==="..")throw new f(20);var a=xt(r,e);if(a)throw new f(a);if(!r.La.rb)throw new f(63);return r.La.rb(r,e,t,n)}function Gn(e,t=438){return Fe(e,t&4095|32768,0)}function J(e,t=511){return Fe(e,t&1023|16384,0)}function Ce(e,t,n){typeof n>"u"&&(n=t,t=438),Fe(e,t|8192,n)}function ot(e,t){if(!yn(e))throw new f(44);var n=V(t,{parent:!0}).node;if(!n)throw new f(44);t=Oe(t);var r=xt(n,t);if(r)throw new f(r);if(!n.La.wb)throw new f(63);n.La.wb(n,t,e)}function jt(e){var t=V(e,{parent:!0}).node;e=Oe(e);var n=se(t,e),r=Wt(t,e,!0);if(r)throw new f(r);if(!t.La.vb)throw new f(63);if(n.ib)throw new f(10);t.La.vb(t,e),at(n)}function Vt(e){var t=V(e,{parent:!0}).node;if(!t)throw new f(44);e=Oe(e);var n=se(t,e),r=Wt(t,e,!1);if(r)throw new f(r);if(!t.La.xb)throw new f(63);if(n.ib)throw new f(10);t.La.xb(t,e),at(n)}function Re(e,t){return e=V(e,{hb:!t}).node,Me(e.La.Wa)(e)}function kt(e,t,n,r){it(e,t,{mode:n&4095|t.mode&-4096,Ta:Date.now(),dc:r})}function De(e,t){e=typeof e=="string"?V(e,{hb:!0}).node:e,kt(null,e,t)}function Yt(e,t,n){if(B(t.mode))throw new f(31);if((t.mode&61440)!==32768)throw new f(28);var r=Ee(t,"w");if(r)throw new f(r);it(e,t,{size:n,timestamp:Date.now()})}function be(e,t,n=438){if(e==="")throw new f(44);if(typeof t=="string"){var r={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[t];if(typeof r>"u")throw Error(`Unknown file open mode: ${t}`);t=r}if(n=t&64?n&4095|32768:0,typeof e=="object")r=e;else{var a=e.endsWith("/"),c=V(e,{hb:!(t&131072),sc:!0});r=c.node,e=c.path}if(c=!1,t&64)if(r){if(t&128)throw new f(20)}else{if(a)throw new f(31);r=Fe(e,n|511,0),c=!0}if(!r)throw new f(44);if((r.mode&61440)===8192&&(t&=-513),t&65536&&!B(r.mode))throw new f(54);if(!c&&(r?(r.mode&61440)===40960?a=32:(a=["r","w","rw"][t&3],t&512&&(a+="w"),a=B(r.mode)&&(a!=="r"||t&576)?31:Ee(r,a)):a=44,a))throw new f(a);return t&512&&!c&&(a=r,a=typeof a=="string"?V(a,{hb:!0}).node:a,Yt(null,a,0)),t=Bt({node:r,path:nt(r),flags:t&-131713,seekable:!0,position:0,Ma:r.Ma,uc:[],error:!1}),t.Ma.open&&t.Ma.open(t),c&&De(r,n&511),t}function st(e){if(e.bb===null)throw new f(8);e.Eb&&(e.Eb=null);try{e.Ma.close&&e.Ma.close(e)}catch(t){throw t}finally{fe[e.bb]=null}e.bb=null}function Xt(e,t,n){if(e.bb===null)throw new f(8);if(!e.seekable||!e.Ma.Ya)throw new f(70);if(n!=0&&n!=1&&n!=2)throw new f(28);e.position=e.Ma.Ya(e,t,n),e.uc=[]}function zt(e,t,n,r,a){if(0>r||0>a)throw new f(28);if(e.bb===null)throw new f(8);if((e.flags&2097155)===1)throw new f(8);if(B(e.node.mode))throw new f(31);if(!e.Ma.read)throw new f(28);var c=typeof a<"u";if(!c)a=e.position;else if(!e.seekable)throw new f(70);return t=e.Ma.read(e,t,n,r,a),c||(e.position+=t),t}function Kt(e,t,n,r,a){if(0>r||0>a)throw new f(28);if(e.bb===null)throw new f(8);if((e.flags&2097155)===0)throw new f(8);if(B(e.node.mode))throw new f(31);if(!e.Ma.write)throw new f(28);e.seekable&&e.flags&1024&&Xt(e,0,2);var c=typeof a<"u";if(!c)a=e.position;else if(!e.seekable)throw new f(70);return t=e.Ma.write(e,t,n,r,a,void 0),c||(e.position+=t),t}function Pn(e){var t=t||0;t=be(e,t),e=Re(e).size;var n=new Uint8Array(e);return zt(t,n,0,e,0),st(t),n}function ne(e,t,n){e=Ze("/dev/"+e);var r=Ct(!!t,!!n);ne.Rb??(ne.Rb=64);var a=ne.Rb++<<8|0;ut(a,{open(c){c.seekable=!1},close(){var c;(c=n==null?void 0:n.buffer)!=null&&c.length&&n(10)},read(c,m,R,O){for(var S=0,F=0;F<O;F++){try{var P=t()}catch{throw new f(29)}if(P===void 0&&S===0)throw new f(6);if(P==null)break;S++,m[R+F]=P}return S&&(c.node.$a=Date.now()),S},write(c,m,R,O){for(var S=0;S<O;S++)try{n(m[R+S])}catch{throw new f(29)}return O&&(c.node.Ua=c.node.Ta=Date.now()),S}}),Ce(e,r,a)}var M={};function ce(e,t,n){if(t.charAt(0)==="/")return t;if(e=e===-100?"/":W(e).path,t.length==0){if(!n)throw new f(44);return e}return e+"/"+t}function Ge(e,t){A[e>>2]=t.cc,A[e+4>>2]=t.mode,A[e+8>>2]=t.rc,A[e+12>>2]=t.uid,A[e+16>>2]=t.nc,A[e+20>>2]=t.nb,X[e+24>>3]=BigInt(t.size),C[e+32>>2]=4096,C[e+36>>2]=t.$b;var n=t.$a.getTime(),r=t.Ua.getTime(),a=t.Ta.getTime();return X[e+40>>3]=BigInt(Math.floor(n/1e3)),A[e+48>>2]=n%1e3*1e6,X[e+56>>3]=BigInt(Math.floor(r/1e3)),A[e+64>>2]=r%1e3*1e6,X[e+72>>3]=BigInt(Math.floor(a/1e3)),A[e+80>>2]=a%1e3*1e6,X[e+88>>3]=BigInt(t.oc),0}var Pe=void 0,$e=()=>{var e=C[+Pe>>2];return Pe+=4,e},ct=0,$n=[0,31,60,91,121,152,182,213,244,274,305,335],xn=[0,31,59,90,120,151,181,212,243,273,304,334],ve={},Qt=e=>{if(!(e instanceof Nt||e=="unwind"))throw e},Jt=e=>{var t;throw ze=e,Ue||0<ct||((t=l.onExit)==null||t.call(l,e),Ie=!0),new Nt(e)},Wn=e=>{if(!Ie)try{e()}catch(t){Qt(t)}finally{if(!(Ue||0<ct))try{ze=e=ze,Jt(e)}catch(t){Qt(t)}}},lt={},Zt=()=>{var r;if(!mt){var e={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((r=globalThis.navigator)==null?void 0:r.language)??"C").replace("-","_")+".UTF-8",_:gt||"./this.program"},t;for(t in lt)lt[t]===void 0?delete e[t]:e[t]=lt[t];var n=[];for(t in e)n.push(`${t}=${e[t]}`);mt=n}return mt},mt,Bn=(e,t,n,r)=>{var a={string:S=>{var F=0;if(S!=null&&S!==0){F=pe(S)+1;var P=me(F);Q(S,x,P,F),F=P}return F},array:S=>{var F=me(S.length);return G.set(S,F),F}};e=l["_"+e];var c=[],m=0;if(r)for(var R=0;R<r.length;R++){var O=a[n[R]];O?(m===0&&(m=He()),c[R]=O(r[R])):c[R]=r[R]}return n=e(...c),n=(function(S){return m!==0&&Be(m),t==="string"?D(S):t==="boolean"?!!S:S})(n)},xe=e=>{var t=pe(e)+1,n=We(t);return n&&Q(e,x,n,t),n},le,dt=[],re=e=>{le.delete(ae.get(e)),ae.set(e,null),dt.push(e)},en=e=>{const t=e.length;return[t%128|128,t>>7,...e]},Hn={i:127,p:127,j:126,f:125,d:124,e:111},tn=e=>en(Array.from(e,t=>Hn[t])),Ne=(e,t)=>{if(!le){le=new WeakMap;var n=ae.length;if(le)for(var r=0;r<0+n;r++){var a=ae.get(r);a&&le.set(a,r)}}if(n=le.get(e)||0)return n;n=dt.length?dt.pop():ae.grow(1);try{ae.set(n,e)}catch(c){if(!(c instanceof TypeError))throw c;t=Uint8Array.of(0,97,115,109,1,0,0,0,1,...en([1,96,...tn(t.slice(1)),...tn(t[0]==="v"?"":t[0])]),2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),t=new WebAssembly.Module(t),t=new WebAssembly.Instance(t,{e:{f:e}}).exports.f,ae.set(n,t)}return le.set(e,n),n};if(te=Array(4096),Ht(w,"/"),J("/tmp"),J("/home"),J("/home/web_user"),(function(){J("/dev"),ut(259,{read:()=>0,write:(r,a,c,m)=>m,Ya:()=>0}),Ce("/dev/null",259),Ft(1280,Un),Ft(1536,On),Ce("/dev/tty",1280),Ce("/dev/tty1",1536);var e=new Uint8Array(1024),t=0,n=()=>(t===0&&(At(e),t=e.byteLength),e[--t]);ne("random",n),ne("urandom",n),J("/dev/shm"),J("/dev/shm/tmp")})(),(function(){J("/proc");var e=J("/proc/self");J("/proc/self/fd"),Ht({ab(){var t=$t(e,"fd",16895,73);return t.Ma={Ya:w.Ma.Ya},t.La={mb(n,r){n=+r;var a=W(n);return n={parent:null,ab:{Sb:"fake"},La:{eb:()=>a.path},id:n+1},n.parent=n},Ib(){return Array.from(fe.entries()).filter(([,n])=>n).map(([n])=>n.toString())}},t}},"/proc/self/fd")})(),l.noExitRuntime&&(Ue=l.noExitRuntime),l.print&&(Xe=l.print),l.printErr&&(ue=l.printErr),l.wasmBinary&&(_e=l.wasmBinary),l.thisProgram&&(gt=l.thisProgram),l.preInit)for(typeof l.preInit=="function"&&(l.preInit=[l.preInit]);0<l.preInit.length;)l.preInit.shift()();l.stackSave=()=>He(),l.stackRestore=e=>Be(e),l.stackAlloc=e=>me(e),l.cwrap=(e,t,n,r)=>{var a=!n||n.every(c=>c==="number"||c==="boolean");return t!=="string"&&a&&!r?l["_"+e]:(...c)=>Bn(e,t,n,c)},l.addFunction=Ne,l.removeFunction=re,l.UTF8ToString=D,l.stringToNewUTF8=xe,l.writeArrayToMemory=(e,t)=>{G.set(e,t)};var We,Le,nn,rn,Be,me,He,je,ae,jn={a:(e,t,n,r)=>qe(`Assertion failed: ${D(e)}, at: `+[t?D(t):"unknown filename",n,r?D(r):"unknown function"]),i:function(e,t){try{return e=D(e),De(e,t),0}catch(n){if(typeof M>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},L:function(e,t,n){try{if(t=D(t),t=ce(e,t),n&-8)return-28;var r=V(t,{hb:!0}).node;return r?(e="",n&4&&(e+="r"),n&2&&(e+="w"),n&1&&(e+="x"),e&&Ee(r,e)?-2:0):-44}catch(a){if(typeof M>"u"||a.name!=="ErrnoError")throw a;return-a.Pa}},j:function(e,t){try{var n=W(e);return kt(n,n.node,t,!1),0}catch(r){if(typeof M>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},h:function(e){try{var t=W(e);return it(t,t.node,{timestamp:Date.now(),dc:!1}),0}catch(n){if(typeof M>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},b:function(e,t,n){Pe=n;try{var r=W(e);switch(t){case 0:var a=$e();if(0>a)break;for(;fe[a];)a++;return Cn(r,a).bb;case 1:case 2:return 0;case 3:return r.flags;case 4:return a=$e(),r.flags|=a,0;case 12:return a=$e(),he[a+0>>1]=2,0;case 13:case 14:return 0}return-28}catch(c){if(typeof M>"u"||c.name!=="ErrnoError")throw c;return-c.Pa}},g:function(e,t){try{var n=W(e),r=n.node,a=n.Ma.Wa;e=a?n:r,a??(a=r.La.Wa),Me(a);var c=a(e);return Ge(t,c)}catch(m){if(typeof M>"u"||m.name!=="ErrnoError")throw m;return-m.Pa}},H:function(e,t){t=-9007199254740992>t||9007199254740992<t?NaN:Number(t);try{if(isNaN(t))return-61;var n=W(e);if(0>t||(n.flags&2097155)===0)throw new f(28);return Yt(n,n.node,t),0}catch(r){if(typeof M>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},G:function(e,t){try{if(t===0)return-28;var n=pe("/")+1;return t<n?-68:(Q("/",x,e,t),n)}catch(r){if(typeof M>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},K:function(e,t){try{return e=D(e),Ge(t,Re(e,!0))}catch(n){if(typeof M>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},C:function(e,t,n){try{return t=D(t),t=ce(e,t),J(t,n),0}catch(r){if(typeof M>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},J:function(e,t,n,r){try{t=D(t);var a=r&256;return t=ce(e,t,r&4096),Ge(n,a?Re(t,!0):Re(t))}catch(c){if(typeof M>"u"||c.name!=="ErrnoError")throw c;return-c.Pa}},x:function(e,t,n,r){Pe=r;try{t=D(t),t=ce(e,t);var a=r?$e():0;return be(t,n,a).bb}catch(c){if(typeof M>"u"||c.name!=="ErrnoError")throw c;return-c.Pa}},v:function(e,t,n,r){try{if(t=D(t),t=ce(e,t),0>=r)return-28;var a=V(t).node;if(!a)throw new f(44);if(!a.La.eb)throw new f(28);var c=a.La.eb(a),m=Math.min(r,pe(c)),R=G[n+m];return Q(c,x,n,r+1),G[n+m]=R,m}catch(O){if(typeof M>"u"||O.name!=="ErrnoError")throw O;return-O.Pa}},u:function(e){try{return e=D(e),jt(e),0}catch(t){if(typeof M>"u"||t.name!=="ErrnoError")throw t;return-t.Pa}},f:function(e,t){try{return e=D(e),Ge(t,Re(e))}catch(n){if(typeof M>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},r:function(e,t,n){try{if(t=D(t),t=ce(e,t),n)if(n===512)jt(t);else return-28;else Vt(t);return 0}catch(r){if(typeof M>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},q:function(e,t,n){try{t=D(t),t=ce(e,t,!0);var r=Date.now(),a,c;if(n){var m=A[n>>2]+4294967296*C[n+4>>2],R=C[n+8>>2];R==1073741823?a=r:R==1073741822?a=null:a=1e3*m+R/1e6,n+=16,m=A[n>>2]+4294967296*C[n+4>>2],R=C[n+8>>2],R==1073741823?c=r:R==1073741822?c=null:c=1e3*m+R/1e6}else c=a=r;if((c??a)!==null){e=a;var O=V(t,{hb:!0}).node;Me(O.La.Xa)(O,{$a:e,Ua:c})}return 0}catch(S){if(typeof M>"u"||S.name!=="ErrnoError")throw S;return-S.Pa}},m:()=>qe(""),l:()=>{Ue=!1,ct=0},A:function(e,t){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e),e=new Date(1e3*e),C[t>>2]=e.getSeconds(),C[t+4>>2]=e.getMinutes(),C[t+8>>2]=e.getHours(),C[t+12>>2]=e.getDate(),C[t+16>>2]=e.getMonth(),C[t+20>>2]=e.getFullYear()-1900,C[t+24>>2]=e.getDay();var n=e.getFullYear();C[t+28>>2]=(n%4!==0||n%100===0&&n%400!==0?xn:$n)[e.getMonth()]+e.getDate()-1|0,C[t+36>>2]=-(60*e.getTimezoneOffset()),n=new Date(e.getFullYear(),6,1).getTimezoneOffset();var r=new Date(e.getFullYear(),0,1).getTimezoneOffset();C[t+32>>2]=(n!=r&&e.getTimezoneOffset()==Math.min(r,n))|0},y:function(e,t,n,r,a,c,m){a=-9007199254740992>a||9007199254740992<a?NaN:Number(a);try{var R=W(r);if((t&2)!==0&&(n&2)===0&&(R.flags&2097155)!==2)throw new f(2);if((R.flags&2097155)===1)throw new f(2);if(!R.Ma.sb)throw new f(43);if(!e)throw new f(28);var O=R.Ma.sb(R,e,a,t,n),S=O.tc;return C[c>>2]=O.Ub,A[m>>2]=S,0}catch(F){if(typeof M>"u"||F.name!=="ErrnoError")throw F;return-F.Pa}},z:function(e,t,n,r,a,c){c=-9007199254740992>c||9007199254740992<c?NaN:Number(c);try{var m=W(a);if(n&2){if((m.node.mode&61440)!==32768)throw new f(43);r&2||m.Ma.tb&&m.Ma.tb(m,x.slice(e,e+t),c,t,r)}}catch(R){if(typeof M>"u"||R.name!=="ErrnoError")throw R;return-R.Pa}},n:(e,t)=>{if(ve[e]&&(clearTimeout(ve[e].id),delete ve[e]),!t)return 0;var n=setTimeout(()=>{delete ve[e],Wn(()=>rn(e,performance.now()))},t);return ve[e]={id:n,Hc:t},0},B:(e,t,n,r)=>{var a=new Date().getFullYear(),c=new Date(a,0,1).getTimezoneOffset();a=new Date(a,6,1).getTimezoneOffset(),A[e>>2]=60*Math.max(c,a),C[t>>2]=+(c!=a),t=m=>{var R=Math.abs(m);return`UTC${0<=m?"-":"+"}${String(Math.floor(R/60)).padStart(2,"0")}${String(R%60).padStart(2,"0")}`},e=t(c),t=t(a),a<c?(Q(e,x,n,17),Q(t,x,r,17)):(Q(e,x,r,17),Q(t,x,n,17))},d:()=>Date.now(),s:()=>2147483648,c:()=>performance.now(),o:e=>{var t=x.length;if(e>>>=0,2147483648<e)return!1;for(var n=1;4>=n;n*=2){var r=t*(1+.2/n);r=Math.min(r,e+100663296);e:{r=(Math.min(2147483648,65536*Math.ceil(Math.max(e,r)/65536))-je.buffer.byteLength+65535)/65536|0;try{je.grow(r),vt();var a=1;break e}catch{}a=void 0}if(a)return!0}return!1},E:(e,t)=>{var n=0,r=0,a;for(a of Zt()){var c=t+n;A[e+r>>2]=c,n+=Q(a,x,c,1/0)+1,r+=4}return 0},F:(e,t)=>{var n=Zt();A[e>>2]=n.length,e=0;for(var r of n)e+=pe(r)+1;return A[t>>2]=e,0},e:function(e){try{var t=W(e);return st(t),0}catch(n){if(typeof M>"u"||n.name!=="ErrnoError")throw n;return n.Pa}},p:function(e,t){try{var n=W(e);return G[t]=n.Va?2:B(n.mode)?3:(n.mode&61440)===40960?7:4,he[t+2>>1]=0,X[t+8>>3]=BigInt(0),X[t+16>>3]=BigInt(0),0}catch(r){if(typeof M>"u"||r.name!=="ErrnoError")throw r;return r.Pa}},w:function(e,t,n,r){try{e:{var a=W(e);e=t;for(var c,m=t=0;m<n;m++){var R=A[e>>2],O=A[e+4>>2];e+=8;var S=zt(a,G,R,O,c);if(0>S){var F=-1;break e}if(t+=S,S<O)break;typeof c<"u"&&(c+=S)}F=t}return A[r>>2]=F,0}catch(P){if(typeof M>"u"||P.name!=="ErrnoError")throw P;return P.Pa}},D:function(e,t,n,r){t=-9007199254740992>t||9007199254740992<t?NaN:Number(t);try{if(isNaN(t))return 61;var a=W(e);return Xt(a,t,n),X[r>>3]=BigInt(a.position),a.Eb&&t===0&&n===0&&(a.Eb=null),0}catch(c){if(typeof M>"u"||c.name!=="ErrnoError")throw c;return c.Pa}},I:function(e){var n,r;try{var t=W(e);return(r=(n=t.Ma)==null?void 0:n.lb)==null?void 0:r.call(n,t)}catch(a){if(typeof M>"u"||a.name!=="ErrnoError")throw a;return a.Pa}},t:function(e,t,n,r){try{e:{var a=W(e);e=t;for(var c,m=t=0;m<n;m++){var R=A[e>>2],O=A[e+4>>2];e+=8;var S=Kt(a,G,R,O,c);if(0>S){var F=-1;break e}if(t+=S,S<O)break;typeof c<"u"&&(c+=S)}F=t}return A[r>>2]=F,0}catch(P){if(typeof M>"u"||P.name!=="ErrnoError")throw P;return P.Pa}},k:Jt};function pt(){function e(){var a;if(l.calledRun=!0,!Ie){if(!l.noFSInit&&!Gt){var t,n;Gt=!0,t??(t=l.stdin),n??(n=l.stdout),r??(r=l.stderr),t?ne("stdin",t):ot("/dev/tty","/dev/stdin"),n?ne("stdout",null,n):ot("/dev/tty","/dev/stdout"),r?ne("stderr",null,r):ot("/dev/tty1","/dev/stderr"),be("/dev/stdin",0),be("/dev/stdout",1),be("/dev/stderr",1)}if(ft.N(),Pt=!1,(a=l.onRuntimeInitialized)==null||a.call(l),l.postRun)for(typeof l.postRun=="function"&&(l.postRun=[l.postRun]);l.postRun.length;){var r=l.postRun.shift();wt.push(r)}Lt(wt)}}if(0<oe)ge=pt;else{if(l.preRun)for(typeof l.preRun=="function"&&(l.preRun=[l.preRun]);l.preRun.length;)wn();Lt(St),0<oe?ge=pt:l.setStatus?(l.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>l.setStatus(""),1),e()},1)):e()}}var ft;return(async function(){var n;function e(r){var a;return r=ft=r.exports,l._sqlite3_free=r.P,l._sqlite3_value_text=r.Q,l._sqlite3_prepare_v2=r.R,l._sqlite3_step=r.S,l._sqlite3_reset=r.T,l._sqlite3_exec=r.U,l._sqlite3_finalize=r.V,l._sqlite3_column_name=r.W,l._sqlite3_column_text=r.X,l._sqlite3_column_type=r.Y,l._sqlite3_errmsg=r.Z,l._sqlite3_clear_bindings=r._,l._sqlite3_value_blob=r.$,l._sqlite3_value_bytes=r.aa,l._sqlite3_value_double=r.ba,l._sqlite3_value_int=r.ca,l._sqlite3_value_type=r.da,l._sqlite3_result_blob=r.ea,l._sqlite3_result_double=r.fa,l._sqlite3_result_error=r.ga,l._sqlite3_result_int=r.ha,l._sqlite3_result_int64=r.ia,l._sqlite3_result_null=r.ja,l._sqlite3_result_text=r.ka,l._sqlite3_aggregate_context=r.la,l._sqlite3_column_count=r.ma,l._sqlite3_data_count=r.na,l._sqlite3_column_blob=r.oa,l._sqlite3_column_bytes=r.pa,l._sqlite3_column_double=r.qa,l._sqlite3_bind_blob=r.ra,l._sqlite3_bind_double=r.sa,l._sqlite3_bind_int=r.ta,l._sqlite3_bind_text=r.ua,l._sqlite3_bind_parameter_index=r.va,l._sqlite3_sql=r.wa,l._sqlite3_normalized_sql=r.xa,l._sqlite3_changes=r.ya,l._sqlite3_close_v2=r.za,l._sqlite3_create_function_v2=r.Aa,l._sqlite3_update_hook=r.Ba,l._sqlite3_open=r.Ca,We=l._malloc=r.Da,Le=l._free=r.Ea,l._RegisterExtensionFunctions=r.Fa,nn=r.Ga,rn=r.Ha,Be=r.Ia,me=r.Ja,He=r.Ka,je=r.M,ae=r.O,vt(),oe--,(a=l.monitorRunDependencies)==null||a.call(l,oe),oe==0&&ge&&(r=ge,ge=null,r()),ft}oe++,(n=l.monitorRunDependencies)==null||n.call(l,oe);var t={a:jn};return l.instantiateWasm?new Promise(r=>{l.instantiateWasm(t,(a,c)=>{r(e(a))})}):(Je??(Je=l.locateFile?l.locateFile("sql-wasm-browser.wasm",ke):ke+"sql-wasm-browser.wasm"),e((await Ln(t)).instance))})(),pt(),N}),s)};i.exports=d,i.exports.default=d})(bt)),bt.exports}var vr=Rr();const Nr=Tr(vr),Lr=`-- ============================================================
-- SCHÉMA COMPLET (fusion migrations 0001→0014)
-- ============================================================

CREATE TABLE IF NOT EXISTS caracteristique (
  id INTEGER PRIMARY KEY,
  pv_vie_max INTEGER,
  pv_vie_actuels INTEGER,
  pv_combat_max INTEGER,
  pv_combat_actuels INTEGER,
  attq INTEGER,
  attq_spe INTEGER,
  def INTEGER,
  def_spe INTEGER,
  vitesse INTEGER,
  mana_max INTEGER DEFAULT 150,
  mana_actuels INTEGER DEFAULT 150
);

CREATE TABLE IF NOT EXISTS level (
  id INTEGER PRIMARY KEY,
  exp_max_requise INTEGER
);

CREATE TABLE IF NOT EXISTS classe (
  id INTEGER PRIMARY KEY,
  nom TEXT NOT NULL,
  arbre TEXT NOT NULL,
  palier INTEGER NOT NULL,
  parent_id INTEGER REFERENCES classe(id),
  bonus_attq INTEGER DEFAULT 0,
  bonus_def INTEGER DEFAULT 0,
  bonus_attq_spe INTEGER DEFAULT 0,
  bonus_def_spe INTEGER DEFAULT 0,
  bonus_vit INTEGER DEFAULT 0,
  bonus_pv_max INTEGER DEFAULT 0,
  bonus_aff_elem REAL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS titre (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  bonus_stat TEXT
);

CREATE TABLE IF NOT EXISTS personnage (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  experience_actuelle INTEGER DEFAULT 0,
  gold_actuel INTEGER DEFAULT 0,
  classe_id INTEGER,
  titre_id INTEGER,
  level_id INTEGER,
  caracteristique_id INTEGER,
  dernier_check TEXT DEFAULT '',
  jokers_disponibles INTEGER DEFAULT 0,
  points_stat_disponibles INTEGER DEFAULT 0,
  compteur_routines INTEGER DEFAULT 0,
  compteur_loot_donjon INTEGER DEFAULT 0,
  mode TEXT DEFAULT 'normal',
  mode_debut TEXT,
  dernier_coffre_hebdo TEXT,
  dernier_coffre_mensuel TEXT,
  FOREIGN KEY (classe_id) REFERENCES classe(id),
  FOREIGN KEY (titre_id) REFERENCES titre(id),
  FOREIGN KEY (level_id) REFERENCES level(id),
  FOREIGN KEY (caracteristique_id) REFERENCES caracteristique(id)
);

CREATE TABLE IF NOT EXISTS monstre (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  caracteristique_id INTEGER,
  exp_recompense INTEGER,
  gold_recompense INTEGER,
  FOREIGN KEY (caracteristique_id) REFERENCES caracteristique(id)
);

CREATE TABLE IF NOT EXISTS donjon (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  niveau_recommande INTEGER
);

CREATE TABLE IF NOT EXISTS donjon_monstre (
  donjon_id INTEGER,
  monstre_id INTEGER,
  taux_apparition INTEGER,
  PRIMARY KEY (donjon_id, monstre_id),
  FOREIGN KEY (donjon_id) REFERENCES donjon(id),
  FOREIGN KEY (monstre_id) REFERENCES monstre(id)
);

CREATE TABLE IF NOT EXISTS historique_poids (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER,
  date_mesure TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  valeur_poids REAL,
  FOREIGN KEY (personnage_id) REFERENCES personnage(id)
);

CREATE TABLE IF NOT EXISTS stuff (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  bonus_attq INTEGER DEFAULT 0,
  bonus_attq_spe INTEGER DEFAULT 0,
  bonus_def INTEGER DEFAULT 0,
  bonus_def_spe INTEGER DEFAULT 0,
  bonus_vitesse INTEGER DEFAULT 0,
  bonus_pv_combat INTEGER DEFAULT 0,
  prix_base INTEGER,
  categorie TEXT DEFAULT 'arme',
  slot TEXT DEFAULT 'arme_1main',
  soin_pv INTEGER DEFAULT 0,
  rarete TEXT DEFAULT 'commun',
  bonus_aff_elem REAL DEFAULT 0,
  element TEXT DEFAULT 'neutre'
);

CREATE TABLE IF NOT EXISTS inventaire (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER,
  stuff_id INTEGER,
  quantite INTEGER DEFAULT 1,
  est_equipe INTEGER DEFAULT 0,
  FOREIGN KEY (personnage_id) REFERENCES personnage(id),
  FOREIGN KEY (stuff_id) REFERENCES stuff(id)
);

CREATE TABLE IF NOT EXISTS magasin (
  id INTEGER PRIMARY KEY,
  nom TEXT
);

CREATE TABLE IF NOT EXISTS magasin_inventaire (
  magasin_id INTEGER,
  stuff_id INTEGER,
  prix_vente_local INTEGER,
  PRIMARY KEY (magasin_id, stuff_id),
  FOREIGN KEY (magasin_id) REFERENCES magasin(id),
  FOREIGN KEY (stuff_id) REFERENCES stuff(id)
);

CREATE TABLE IF NOT EXISTS tache (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT,
  type_activite TEXT,
  difficulte INTEGER,
  exp_recompense INTEGER,
  gold_recompense INTEGER,
  pv_vie_penalite INTEGER,
  type TEXT DEFAULT 'ponctuelle',
  duree_jours INTEGER,
  date_creation TEXT,
  date_limite TEXT
);

CREATE TABLE IF NOT EXISTS historique_activite (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER,
  tache_id INTEGER,
  date_action TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  statut TEXT,
  nom_tache TEXT DEFAULT '',
  FOREIGN KEY (personnage_id) REFERENCES personnage(id),
  FOREIGN KEY (tache_id) REFERENCES tache(id)
);

CREATE TABLE IF NOT EXISTS competence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  effet_type TEXT NOT NULL,
  puissance INTEGER DEFAULT 0,
  effet_secondaire TEXT DEFAULT NULL,
  valeur INTEGER DEFAULT 0,
  duree_tours INTEGER DEFAULT 0,
  rarete TEXT DEFAULT 'commun',
  prix_boutique INTEGER DEFAULT 50,
  element TEXT DEFAULT 'neutre',
  source TEXT DEFAULT 'boutique',
  cout_mana INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS personnage_competence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER REFERENCES personnage(id),
  competence_id INTEGER REFERENCES competence(id),
  est_equipee INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS personnage_affinite (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER REFERENCES personnage(id),
  element TEXT NOT NULL,
  bonus_pct INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS personnage_classe_debloquee (
  personnage_id INTEGER NOT NULL REFERENCES personnage(id),
  classe_id INTEGER NOT NULL REFERENCES classe(id),
  PRIMARY KEY (personnage_id, classe_id)
);

-- ============================================================
-- DONNÉES INITIALES
-- ============================================================

-- Niveaux
INSERT OR IGNORE INTO level (id, exp_max_requise) VALUES
  (1, 100),(2, 250),(3, 500),(4, 900),(5, 1500),
  (6, 2300),(7, 3300),(8, 4600),(9, 6200),(10, 9999);

-- Classes (30 classes sur 3 arbres, 3 paliers)
INSERT OR IGNORE INTO classe VALUES (1,'Guerrier','guerrier',1,NULL,3,0,0,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (2,'Vagabond','vagabond',1,NULL,0,0,0,0,3,0,0.0);
INSERT OR IGNORE INTO classe VALUES (3,'Sorcier','sorcier',1,NULL,0,0,3,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (4,'Paladin','guerrier',4,1,0,0,3,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (5,'Tank','guerrier',4,1,0,3,0,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (6,'Barbare','guerrier',4,1,3,0,0,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (7,'Archer','vagabond',4,2,0,0,3,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (8,'Moine','vagabond',4,2,0,0,0,0,3,0,0.0);
INSERT OR IGNORE INTO classe VALUES (9,'Assassin','vagabond',4,2,3,0,0,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (10,'Mage','sorcier',4,3,0,0,3,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (11,'Occultiste','sorcier',4,3,0,0,0,3,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (12,'Sorceleur','sorcier',4,3,3,0,0,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (13,'Guerrier elem','guerrier',7,4,0,0,0,0,0,0,5.0);
INSERT OR IGNORE INTO classe VALUES (14,'Guerrier runique','guerrier',7,4,0,0,3,3,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (15,'Tank absolu','guerrier',7,5,0,3,0,3,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (16,'Antimage','guerrier',7,5,0,0,0,6,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (17,'Geant barbare','guerrier',7,6,0,3,0,0,0,15,0.0);
INSERT OR IGNORE INTO classe VALUES (18,'Berserk','guerrier',7,6,6,0,0,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (19,'Ranger','vagabond',7,7,0,0,3,0,3,0,0.0);
INSERT OR IGNORE INTO classe VALUES (20,'Archer lourd','vagabond',7,7,0,0,6,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (21,'Moine itinerant','vagabond',7,8,0,0,0,0,6,0,0.0);
INSERT OR IGNORE INTO classe VALUES (22,'Moine elem','vagabond',7,8,0,0,0,0,0,0,5.0);
INSERT OR IGNORE INTO classe VALUES (23,'Assassin de ombre','vagabond',7,9,0,0,6,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (24,'Assassin degourdit','vagabond',7,9,3,0,0,0,3,0,0.0);
INSERT OR IGNORE INTO classe VALUES (25,'Archimage','sorcier',7,10,0,0,6,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (26,'Elementaliste','sorcier',7,10,0,0,0,0,0,0,5.0);
INSERT OR IGNORE INTO classe VALUES (27,'Incanteur','sorcier',7,11,0,0,0,3,0,15,0.0);
INSERT OR IGNORE INTO classe VALUES (28,'Mage runique','sorcier',7,11,0,3,0,3,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (29,'Chasseur de monstre','sorcier',7,12,3,0,0,0,3,0,0.0);
INSERT OR IGNORE INTO classe VALUES (30,'Guerrier mage','sorcier',7,12,3,0,3,0,0,0,0.0);

-- Titres
INSERT OR IGNORE INTO titre (id, nom, bonus_stat) VALUES
  (1, 'Novice',                        'aucun'),
  (2, 'Aventurier',                    'attq+2'),
  (3, 'Héros',                         'attq+5,def+3'),
  -- Maîtrise élémentaire tier 1 (5 comps)
  (4,  'Étincelle Vive',               'feu:5'),
  (5,  'Enfant des Marées',            'eau:5'),
  (6,  'Esprit de Roche',              'terre:5'),
  (7,  'Souffle Léger',                'air:5'),
  (8,  'Apprenti Mécanicien',          'technologie:5'),
  (9,  'Éveillé',                      'surnaturel:5'),
  (10, 'Ombre Errante',                'mort:5'),
  (11, 'Main Verte',                   'vie:5'),
  (12, 'Porteur d''Aube',              'lumiere:5'),
  (13, 'Voile de Nuit',                'tenebres:5'),
  -- Maîtrise élémentaire tier 2 (10 comps)
  (14, 'Seigneur du Brasier',          'feu:10'),
  (15, 'Souverain des Abysses',        'eau:10'),
  (16, 'Pilier de la Création',        'terre:10'),
  (17, 'Tempête Incarnée',             'air:10'),
  (18, 'Grand Architecte du Progrès',  'technologie:10'),
  (19, 'Maître des Arcanes Interdites','surnaturel:10'),
  (20, 'Faucheur Éternel',             'mort:10'),
  (21, 'Gardien de l''Arbre-Monde',   'vie:10'),
  (22, 'Éclat Céleste',               'lumiere:10'),
  (23, 'Prince du Néant',              'tenebres:10'),
  -- Persistance / streak
  (24, 'Disciple Discipliné',          'streak:7'),
  (25, 'Habitué du Royaume',           'streak:14'),
  (26, 'Inflexible',                   'streak:30'),
  (27, 'Ancien de la Cité',            'streak:180'),
  (28, 'Divinité de la Constance',     'streak:365'),
  -- Fortune
  (29, 'Crésus du Donjon',             'gold:5000'),
  -- Chance
  (30, 'Élu du Destin',               'legendaire:3');

-- Caractéristiques (id=1 : joueur ; ids 2-4 : monstres)
INSERT OR IGNORE INTO caracteristique (id, pv_vie_max, pv_vie_actuels, pv_combat_max, pv_combat_actuels, attq, attq_spe, def, def_spe, vitesse, mana_max, mana_actuels) VALUES
  (1, 100, 100, 100, 100, 10, 10, 8, 8, 12, 150, 150),
  (2,  30,  30,  30,  30,  6,  0, 3, 0,  8,  40,  40),
  (3,  60,  60,  60,  60, 12,  0, 6, 0, 10,  80,  80),
  (4, 120, 120, 120, 120, 20,  5,12, 5, 14, 150, 150);

-- Personnage par défaut
INSERT OR IGNORE INTO personnage (id, nom, experience_actuelle, gold_actuel, classe_id, titre_id, level_id, caracteristique_id) VALUES
  (1, 'Heros', 0, 50, 1, 1, 1, 1);

-- Monstres
INSERT OR IGNORE INTO monstre (id, nom, caracteristique_id, exp_recompense, gold_recompense) VALUES
  (1, 'Slime',   2, 20,  5),
  (2, 'Gobelin', 3, 45, 15),
  (3, 'Troll',   4,100, 40);

-- Donjons
INSERT OR IGNORE INTO donjon (id, nom, niveau_recommande) VALUES
  (1, 'Grotte des Debutants', 1),
  (2, 'Foret Maudite',        3),
  (3, 'Tour du Chaos',        6);

INSERT OR IGNORE INTO donjon_monstre (donjon_id, monstre_id, taux_apparition) VALUES
  (1,1,80),(1,2,20),(2,2,60),(2,3,40),(3,3,100);

-- Équipements (état final après toutes les migrations)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
  (1, 'Epee en bois',       3, 0, 0, 0, 0,  0,  30, 'arme',       'arme_1main',    0, 'commun',    0, 'neutre'),
  (2, 'Bouclier en bois',   0, 0, 3, 0, 0,  0,  25, 'arme',       'bouclier_1main',0, 'commun',    0, 'neutre'),
  (3, 'Dague rouillee',     5, 1, 0, 0, 2,  0,  50, 'arme',       'arme_1main',    0, 'peu_commun',0, 'neutre'),
  (4, 'Armure de cuir',     0, 0, 6, 2, 0, 10,  80, 'armure',     'plastron',      0, 'rare',      0, 'neutre'),
  (5, 'Epee de fer',       10, 3, 0, 0, 0,  0, 150, 'arme',       'arme_1main',    0, 'epique',    0, 'neutre'),
  (6, 'Petite potion',      0, 0, 0, 0, 0,  0, 200, 'utilitaire', 'consommable',  20, 'commun',    0, 'neutre'),
  (7, 'Grande potion',      0, 0, 0, 0, 0,  0,  40, 'utilitaire', 'consommable',  50, 'commun',    0, 'neutre'),
  (8, 'Joker de routine',   0, 0, 0, 0, 0,  0, 200, 'utilitaire', 'joker',         0, 'commun',    0, 'neutre');

-- Armes et boucliers (ids 9-78)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
-- Communes 1 main
  ( 9,'Dague de Recrue',       0,0,0,0, 3,0, 30,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (10,'Lame Rouillée',         1,0,0,0, 1,0, 30,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (11,'Épée de Bois Lestée',   2,0,0,0, 1,0, 35,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (12,'Gourdin Noueux',        2,0,0,0, 0,0, 32,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (13,'Bouclier de Paille',    0,0,2,1, 0,0, 30,'arme','bouclier_1main',0,'commun',    0,'neutre'),
  (14,'Targe en Bois',         0,0,2,0, 0,0, 33,'arme','bouclier_1main',0,'commun',    0,'neutre'),
  (15,'Masse de Fer',          3,0,0,0, 0,0, 40,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (16,'Hachette de Bûcheron',  3,0,0,0,-1,0, 38,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (17,'Baguette d''Apprenti',  0,2,0,0, 1,0, 35,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (18,'Orbe Fissuré',          0,3,0,0, 0,0, 38,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (19,'Grimoire Déchiré',      0,2,0,1, 0,0, 40,'arme','arme_1main',    0,'commun',    0,'neutre'),
-- Communes 2 mains
  (20,'Bâton de Marche',       0,3,0,0, 0,0, 40,'arme','arme_2mains',   0,'commun',    0,'neutre'),
  (21,'Fronde Basique',        2,0,0,0, 1,0, 35,'arme','arme_2mains',   0,'commun',    0,'neutre'),
  (22,'Pavois de Fortune',     0,0,3,0, 0,0, 45,'arme','bouclier_2mains',0,'commun',   0,'neutre'),
-- Peu communes 1 main
  (23,'Glaive de Garde',       4,0,0,0, 2,0, 90,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
  (24,'Broquel en Bronze',     0,0,3,0, 2,0, 80,'arme','bouclier_1main',0,'peu_commun',0,'neutre'),
  (25,'Bouclier à Pointes',    3,0,3,0, 0,0, 85,'arme','bouclier_1main',0,'peu_commun',0,'neutre'),
  (26,'Gantelet Renforcé',     3,0,0,2, 0,0, 95,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
  (27,'Dague de Voleur',       0,0,0,0, 6,0, 95,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
  (28,'Morgenstern',           5,0,1,0, 0,0,115,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
  (29,'Marteau de Forge',      6,0,0,0, 0,0,120,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
  (30,'Livre de Sorts Mineur', 0,4,0,2, 0,0, 95,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
  (31,'Sceptre de Cristal',    0,5,0,0, 1,0,105,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
-- Peu communes 2 mains
  (32,'Arc de Chasse Simple',  5,0,0,0, 1,0,100,'arme','arme_2mains',   0,'peu_commun',0,'neutre'),
  (33,'Lance de Milicien',     4,0,0,0, 2,0,105,'arme','arme_2mains',   0,'peu_commun',0,'neutre'),
  (34,'Grand Bouclier d''Acier',0,0,4,2,0,0,110,'arme','bouclier_2mains',0,'peu_commun',0,'neutre'),
  (35,'Épée Bâtarde',          5,0,1,0, 0,0,115,'arme','arme_2mains',   0,'peu_commun',0,'neutre'),
  (36,'Bâton d''Initié',       0,6,0,0, 0,0,110,'arme','arme_2mains',   0,'peu_commun',0,'neutre'),
-- Rares 1 main
  (37,'Épée Longue d''Acier',  6,0,0,0, 3,0,170,'arme','arme_1main',    0,'rare',      0,'neutre'),
  (38,'Cimeterre Courbe',      0,0,0,0, 9,0,175,'arme','arme_1main',    0,'rare',      0,'neutre'),
  (39,'Bouclier Runique',      0,0,4,5, 0,0,180,'arme','bouclier_1main',0,'rare',      0,'neutre'),
  (40,'Rondache Miroir',       0,0,4,4, 0,0,180,'arme','bouclier_1main',0,'rare',      0,'neutre'),
  (41,'Catalyseur de Mana',    0,9,0,0, 0,0,200,'arme','arme_1main',    0,'rare',      0,'neutre'),
  (42,'Flasque Alchimique',    0,5,0,0, 4,0,185,'arme','arme_1main',    0,'rare',      0,'neutre'),
  (43,'Grimoire d''Occultisme',0,7,0,2, 0,0,195,'arme','arme_1main',    0,'rare',      0,'neutre'),
  (44,'Sceptre d''Argent',     0,6,0,3, 0,0,205,'arme','arme_1main',    0,'rare',      0,'neutre'),
-- Rares 2 mains
  (45,'Aegis de Plomb',        0,0,6,3, 0,0,185,'arme','bouclier_2mains',0,'rare',     0,'neutre'),
  (46,'Hache de Bataille',    10,0,0,0,-1,0,190,'arme','arme_2mains',   0,'rare',      0,'neutre'),
  (47,'Pique de Cavalerie',    7,0,0,0, 2,0,190,'arme','arme_2mains',   0,'rare',      0,'neutre'),
  (48,'Dagues Jumelles',       4,0,0,0, 5,0,195,'arme','arme_2mains',   0,'rare',      0,'neutre'),
  (49,'Arbalète Lourde',       9,0,0,0, 0,0,210,'arme','arme_2mains',   0,'rare',      0,'neutre'),
  (50,'Marteau de Guerre',    11,0,0,0,-2,0,210,'arme','arme_2mains',   0,'rare',      0,'neutre'),
-- Épiques 1 main
  (51,'Lame de Givre',         4,0,0,0, 3,0,240,'arme','arme_1main',    0,'epique',   10,'eau'),
  (52,'Dague d''Assassin',     0,0,0,0, 7,0,240,'arme','arme_1main',    0,'epique',   10,'mort'),
  (53,'Bouclier de Magma',     0,0,4,3, 0,0,245,'arme','bouclier_1main',0,'epique',   10,'feu'),
  (54,'Lanterne des Âmes',     0,5,0,2, 0,0,265,'arme','arme_1main',    0,'epique',   10,'mort'),
  (55,'Griffe de l''Ombre',    5,0,0,0, 2,0,265,'arme','arme_1main',    0,'epique',   10,'tenebres'),
  (56,'Égide Océanique',       0,0,5,2, 0,0,270,'arme','bouclier_1main',0,'epique',   10,'eau'),
  (57,'Gantelet Surchauffé',   0,7,0,0, 0,0,270,'arme','arme_1main',    0,'epique',   10,'feu'),
  (58,'Sceptre des Tempêtes',  0,4,0,0, 3,0,275,'arme','arme_1main',    0,'epique',   10,'air'),
  (59,'Orbe de Sagesse',       0,5,0,2, 0,0,280,'arme','arme_1main',    0,'epique',   10,'surnaturel'),
-- Épiques 2 mains
  (60,'Bâton des Sylves',      0,7,0,0, 0,0,245,'arme','arme_2mains',   0,'epique',   10,'vie'),
  (61,'Arc de Foudre',         5,0,0,0, 2,0,250,'arme','arme_2mains',   0,'epique',   10,'technologie'),
  (62,'Hache du Berserker',    8,0,-1,0,0,0,250,'arme','arme_2mains',   0,'epique',   10,'feu'),
  (63,'Pavois de Justice',     0,0,7,0, 0,0,255,'arme','bouclier_2mains',0,'epique',  10,'lumiere'),
  (64,'Espadon de Gaïa',       7,0,0,0, 0,0,260,'arme','arme_2mains',   0,'epique',   10,'terre'),
-- Légendaires 1 main
  (65,'Bouclier d''Yggdrasil', 0,0,5,4, 0,0,450,'arme','bouclier_1main',0,'legendaire',15,'vie'),
  (66,'Excalibur',             6,0,0,0, 3,0,480,'arme','arme_1main',    0,'legendaire',15,'lumiere'),
  (67,'Lame du Vide',          6,3,0,0, 0,0,520,'arme','arme_1main',    0,'legendaire',15,'tenebres'),
  (68,'Œil de l''Océan',       0,8,0,1, 0,0,520,'arme','arme_1main',    0,'legendaire',15,'eau'),
  (69,'Gantelet de l''Aube',   4,4,0,0, 0,0,525,'arme','arme_1main',    0,'legendaire',15,'lumiere'),
  (70,'Codex de l''Infini',    0,8,0,1, 0,0,550,'arme','arme_1main',    0,'legendaire',15,'surnaturel'),
-- Légendaires 2 mains
  (71,'Rempart des Tempêtes',  0,0,0,0, 9,0,490,'arme','bouclier_2mains',0,'legendaire',15,'air'),
  (72,'Épées Dansantes',       4,0,0,0, 5,0,495,'arme','arme_2mains',   0,'legendaire',15,'air'),
  (73,'Faux de la Faucheuse',  9,0,0,0, 0,0,500,'arme','arme_2mains',   0,'legendaire',15,'mort'),
  (74,'Trident des Abysses',   5,4,0,0, 0,0,510,'arme','arme_2mains',   0,'legendaire',15,'eau'),
  (75,'Météore Forgé',        11,0,0,0,-2,0,530,'arme','arme_2mains',   0,'legendaire',15,'feu'),
  (76,'Bâton du Créateur',     0,10,0,0,-1,0,540,'arme','arme_2mains',  0,'legendaire',15,'lumiere'),
  (77,'Cœur de la Montagne',   0,0,7,2, 0,0,540,'arme','bouclier_2mains',0,'legendaire',15,'terre'),
  (78,'Canon à Plasma',        0,9,0,0, 0,0,550,'arme','arme_2mains',   0,'legendaire',15,'technologie');

-- Casques (ids 79-103)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
-- Communs
  (79,'Bandana Usé',           0,0,0,0, 2,0, 30,'armure','tete',0,'commun',    0,'neutre'),
  (80,'Capuche en Toile',      0,0,1,1, 0,0, 32,'armure','tete',0,'commun',    0,'neutre'),
  (81,'Chapeau de Paille',     0,0,0,1, 1,0, 35,'armure','tete',0,'commun',    0,'neutre'),
  (82,'Casque en Cuir',        0,0,2,0, 0,0, 38,'armure','tete',0,'commun',    0,'neutre'),
  (83,'Heaume Rouillé',        0,0,3,0,-1,0, 40,'armure','tete',0,'commun',    0,'neutre'),
-- Peu communs
  (84,'Masque de Voleur',      0,0,1,0, 4,0, 85,'armure','tete',0,'peu_commun',0,'neutre'),
  (85,'Chapeau d''Apprenti',   0,3,0,2, 0,0, 90,'armure','tete',0,'peu_commun',0,'neutre'),
  (86,'Casque de Fantassin',   0,0,4,0, 1,0, 95,'armure','tete',0,'peu_commun',0,'neutre'),
  (87,'Capeline Renforcée',    0,0,3,2, 0,0,100,'armure','tete',0,'peu_commun',0,'neutre'),
  (88,'Diadème Mental',        0,5,0,0, 0,0,115,'armure','tete',0,'peu_commun',0,'neutre'),
-- Rares
  (89,'Heaume de Chevalier',   0,0,6,2, 0,0,170,'armure','tete',0,'rare',      0,'neutre'),
  (90,'Masque d''Assassin',    2,0,0,0, 6,0,175,'armure','tete',0,'rare',      0,'neutre'),
  (91,'Couronne d''Érudit',    0,6,0,3, 0,0,185,'armure','tete',0,'rare',      0,'neutre'),
  (92,'Casque Tactique',       0,0,4,0, 4,0,190,'armure','tete',0,'rare',      0,'neutre'),
  (93,'Cagoule d''Ombre',      0,0,0,3, 5,0,195,'armure','tete',0,'rare',      0,'neutre'),
-- Épiques
  (94,'Halo Lumineux',         0,2,0,5, 0,0,240,'armure','tete',0,'epique',   10,'lumiere'),
  (95,'Masque Démoniaque',     5,0,0,0, 2,0,245,'armure','tete',0,'epique',   10,'mort'),
  (96,'Couronne Sylvestre',    0,0,4,3, 0,0,250,'armure','tete',0,'epique',   10,'vie'),
  (97,'Heaume de Forge',       1,0,6,0, 0,0,255,'armure','tete',0,'epique',   10,'feu'),
  (98,'Visière Technologique', 0,5,0,0, 2,0,260,'armure','tete',0,'epique',   10,'technologie'),
-- Légendaires
  (99,'Couronne du Liche',     6,0,0,3, 0,0,480,'armure','tete',0,'legendaire',15,'mort'),
  (100,'Heaume d''Aube',       0,0,5,4, 0,0,490,'armure','tete',0,'legendaire',15,'lumiere'),
  (101,'Tiare de l''Océan',    0,6,0,3, 0,0,500,'armure','tete',0,'legendaire',15,'eau'),
  (102,'Casque Météore',       2,0,7,0, 0,0,510,'armure','tete',0,'legendaire',15,'feu'),
  (103,'Masque du Vide',       0,3,0,0, 6,0,520,'armure','tete',0,'legendaire',15,'tenebres');

-- Plastrons (ids 104-128)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
-- Communs
  (104,'Tunique en Lin',            0,0,0,0, 2,0, 30,'armure','plastron',0,'commun',    0,'neutre'),
  (105,'Plastron en Cuir',          0,0,2,0, 0,0, 35,'armure','plastron',0,'commun',    0,'neutre'),
  (106,'Cotte de Mailles Trouée',   0,0,3,0,-1,0, 40,'armure','plastron',0,'commun',    0,'neutre'),
  (107,'Robe Mitée',                0,0,0,2, 0,0, 35,'armure','plastron',0,'commun',    0,'neutre'),
  (108,'Harnais Usé',               1,0,1,0, 0,0, 38,'armure','plastron',0,'commun',    0,'neutre'),
-- Peu communs
  (109,'Plastron de Garde',         0,0,5,0, 0,0, 95,'armure','plastron',0,'peu_commun',0,'neutre'),
  (110,'Robe d''Adepte',            0,1,0,4, 0,0, 90,'armure','plastron',0,'peu_commun',0,'neutre'),
  (111,'Manteau de Rôdeur',         0,0,2,0, 3,0,100,'armure','plastron',0,'peu_commun',0,'neutre'),
  (112,'Cuirasse Cloutée',          1,0,4,0, 0,0,105,'armure','plastron',0,'peu_commun',0,'neutre'),
  (113,'Gilet de Duel',             0,0,2,0, 3,0,110,'armure','plastron',0,'peu_commun',0,'neutre'),
-- Rares
  (114,'Armure de Plates',          0,0,8,0,-1,0,170,'armure','plastron',0,'rare',      0,'neutre'),
  (115,'Robe de Mage',              0,2,0,6, 0,0,175,'armure','plastron',0,'rare',      0,'neutre'),
  (116,'Manteau d''Assassin',       0,0,3,0, 5,0,185,'armure','plastron',0,'rare',      0,'neutre'),
  (117,'Cuirasse Lourde',           0,0,7,1, 0,0,190,'armure','plastron',0,'rare',      0,'neutre'),
  (118,'Plastron de Gladiateur',    3,0,5,0, 0,0,195,'armure','plastron',0,'rare',      0,'neutre'),
-- Épiques
  (119,'Manteau des Tempêtes',      0,0,2,0, 5,0,245,'armure','plastron',0,'epique',   10,'air'),
  (120,'Robe de l''Arbre-Monde',    0,0,4,3, 0,0,250,'armure','plastron',0,'epique',   10,'vie'),
  (121,'Armure Magmatique',         1,0,6,0, 0,0,255,'armure','plastron',0,'epique',   10,'feu'),
  (122,'Cuirasse Sismique',         0,0,7,0, 0,0,260,'armure','plastron',0,'epique',   10,'terre'),
  (123,'Gilet d''Infiltration',     2,0,0,0, 5,0,265,'armure','plastron',0,'epique',   10,'tenebres'),
-- Légendaires
  (124,'Armure d''Excalibur',       0,0,6,3, 0,0,490,'armure','plastron',0,'legendaire',15,'lumiere'),
  (125,'Robe du Néant',             0,4,0,5, 0,0,500,'armure','plastron',0,'legendaire',15,'tenebres'),
  (126,'Exosquelette Torso',        4,0,5,0, 0,0,510,'armure','plastron',0,'legendaire',15,'technologie'),
  (127,'Carapace de Gaïa',          0,0,9,0,-2,0,520,'armure','plastron',0,'legendaire',15,'terre'),
  (128,'Cuirasse Léviathan',        0,0,6,3, 0,0,530,'armure','plastron',0,'legendaire',15,'eau');

-- Jambières (ids 129-153)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
-- Communs
  (129,'Pantalon en Toile',         0,0,0,0, 2,0, 30,'armure','jambiere',0,'commun',    0,'neutre'),
  (130,'Bottes Usées',              0,0,1,0, 1,0, 32,'armure','jambiere',0,'commun',    0,'neutre'),
  (131,'Jambières en Cuir',         0,0,2,0, 0,0, 35,'armure','jambiere',0,'commun',    0,'neutre'),
  (132,'Sandales Légères',          0,0,-1,0,3,0, 38,'armure','jambiere',0,'commun',    0,'neutre'),
  (133,'Grèves Rouillées',          0,0,3,0,-1,0, 40,'armure','jambiere',0,'commun',    0,'neutre'),
-- Peu communs
  (134,'Bottes de Cuir Léger',      0,0,1,0, 4,0, 85,'armure','jambiere',0,'peu_commun',0,'neutre'),
  (135,'Pantalon de Rôdeur',        0,0,2,0, 3,0, 90,'armure','jambiere',0,'peu_commun',0,'neutre'),
  (136,'Grèves de Garde',           0,0,4,0, 1,0, 95,'armure','jambiere',0,'peu_commun',0,'neutre'),
  (137,'Chaussures d''Adepte',      0,0,0,3, 2,0,100,'armure','jambiere',0,'peu_commun',0,'neutre'),
  (138,'Bottes de Marche',          0,0,2,1, 2,0,110,'armure','jambiere',0,'peu_commun',0,'neutre'),
-- Rares
  (139,'Bottes d''Assassin',        0,0,1,0, 7,0,170,'armure','jambiere',0,'rare',      0,'neutre'),
  (140,'Grèves de Chevalier',       0,0,6,2, 0,0,175,'armure','jambiere',0,'rare',      0,'neutre'),
  (141,'Bottes de Célérité',        0,0,-1,0,9,0,185,'armure','jambiere',0,'rare',      0,'neutre'),
  (142,'Pantalon Brodé',            0,0,0,5, 3,0,190,'armure','jambiere',0,'rare',      0,'neutre'),
  (143,'Bottes Tactiques',          0,0,4,0, 4,0,195,'armure','jambiere',0,'rare',      0,'neutre'),
-- Épiques
  (144,'Pas du Vent',               0,0,1,0, 6,0,240,'armure','jambiere',0,'epique',   10,'air'),
  (145,'Grèves Sismiques',          0,0,6,0, 1,0,245,'armure','jambiere',0,'epique',   10,'terre'),
  (146,'Bottes Infernales',         3,0,0,0, 4,0,250,'armure','jambiere',0,'epique',   10,'feu'),
  (147,'Traces de l''Océan',        0,0,0,2, 5,0,255,'armure','jambiere',0,'epique',   10,'eau'),
  (148,'Bottes Magnétiques',        0,0,4,0, 3,0,260,'armure','jambiere',0,'epique',   10,'technologie'),
-- Légendaires
  (149,'Bottes d''Hermès',          0,0,0,0, 9,0,480,'armure','jambiere',0,'legendaire',15,'air'),
  (150,'Grèves du Titan',           0,0,7,2, 0,0,490,'armure','jambiere',0,'legendaire',15,'terre'),
  (151,'Pas de l''Ombre',           3,0,0,0, 6,0,500,'armure','jambiere',0,'legendaire',15,'tenebres'),
  (152,'Racines d''Yggdrasil',      0,0,5,4, 0,0,510,'armure','jambiere',0,'legendaire',15,'vie'),
  (153,'Sabots de Lumière',         0,4,0,0, 5,0,520,'armure','jambiere',0,'legendaire',15,'lumiere');

-- Gantelets (ids 154-178)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
-- Communs
  (154,'Mitaines en Laine',         0,1,0,0, 1,0, 30,'armure','gants',0,'commun',    0,'neutre'),
  (155,'Gants en Cuir',             0,0,2,0, 0,0, 32,'armure','gants',0,'commun',    0,'neutre'),
  (156,'Gantelets Rouillés',        2,0,1,0,-1,0, 35,'armure','gants',0,'commun',    0,'neutre'),
  (157,'Bandelettes',               0,0,0,0, 2,0, 38,'armure','gants',0,'commun',    0,'neutre'),
  (158,'Gants de Travail',          2,0,0,0, 0,0, 40,'armure','gants',0,'commun',    0,'neutre'),
-- Peu communs
  (159,'Gants de Voleur',           2,0,0,0, 3,0, 85,'armure','gants',0,'peu_commun',0,'neutre'),
  (160,'Gantelets de Garde',        2,0,3,0, 0,0, 90,'armure','gants',0,'peu_commun',0,'neutre'),
  (161,'Mitaines d''Apprenti',      0,4,0,1, 0,0, 95,'armure','gants',0,'peu_commun',0,'neutre'),
  (162,'Gants de Duel',             3,0,0,0, 2,0,100,'armure','gants',0,'peu_commun',0,'neutre'),
  (163,'Gantelets Renforcés',       1,0,4,0, 0,0,110,'armure','gants',0,'peu_commun',0,'neutre'),
-- Rares
  (164,'Gantelets Chevalier',       3,0,5,0, 0,0,170,'armure','gants',0,'rare',      0,'neutre'),
  (165,'Gants d''Assassin',         3,0,0,0, 5,0,175,'armure','gants',0,'rare',      0,'neutre'),
  (166,'Mitaines de Mage',          0,6,0,2, 0,0,185,'armure','gants',0,'rare',      0,'neutre'),
  (167,'Gantelets Berserk',         7,0,-1,0,0,0,190,'armure','gants',0,'rare',      0,'neutre'),
  (168,'Gants de Précision',        4,0,0,0, 4,0,195,'armure','gants',0,'rare',      0,'neutre'),
-- Épiques
  (169,'Poings de Magma',           5,0,2,0, 0,0,240,'armure','gants',0,'epique',   10,'feu'),
  (170,'Mitaines du Givre',         0,4,0,0, 3,0,245,'armure','gants',0,'epique',   10,'eau'),
  (171,'Gantelets de Pierre',       1,0,6,0, 0,0,250,'armure','gants',0,'epique',   10,'terre'),
  (172,'Gants Conducteurs',         4,3,0,0, 0,0,255,'armure','gants',0,'epique',   10,'technologie'),
  (173,'Griffes Sylvestres',        5,0,0,2, 0,0,260,'armure','gants',0,'epique',   10,'vie'),
-- Légendaires
  (174,'Poings Météores',           7,0,2,0, 0,0,480,'armure','gants',0,'legendaire',15,'feu'),
  (175,'Mitaines du Vide',          0,6,0,0, 3,0,490,'armure','gants',0,'legendaire',15,'tenebres'),
  (176,'Gantelets de Gaïa',         2,0,7,0, 0,0,500,'armure','gants',0,'legendaire',15,'terre'),
  (177,'Gants de l''Aube',          5,4,0,0, 0,0,510,'armure','gants',0,'legendaire',15,'lumiere'),
  (178,'Poignes de l''Ouragan',     3,0,0,0, 6,0,520,'armure','gants',0,'legendaire',15,'air');

-- Boutique
INSERT OR IGNORE INTO magasin (id, nom) VALUES (1, 'Boutique du Village');
INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,1,35),(1,2,30),(1,3,60),(1,4,90),(1,5,170),(1,6,200),(1,8,200);
INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,9,30),(1,10,30),(1,11,35),(1,12,32),(1,13,30),(1,14,33),(1,15,40),(1,16,38),(1,17,35),(1,18,38),(1,19,40),
  (1,20,40),(1,21,35),(1,22,45),
  (1,23,90),(1,24,80),(1,25,85),(1,26,95),(1,27,95),(1,28,115),(1,29,120),(1,30,95),(1,31,105),
  (1,32,100),(1,33,105),(1,34,110),(1,35,115),(1,36,110),
  (1,37,170),(1,38,175),(1,39,180),(1,40,180),(1,41,200),(1,42,185),(1,43,195),(1,44,205),
  (1,45,185),(1,46,190),(1,47,190),(1,48,195),(1,49,210),(1,50,210),
  (1,51,240),(1,52,240),(1,53,245),(1,54,265),(1,55,265),(1,56,270),(1,57,270),(1,58,275),(1,59,280),
  (1,60,245),(1,61,250),(1,62,250),(1,63,255),(1,64,260),
  (1,65,450),(1,66,480),(1,67,520),(1,68,520),(1,69,525),(1,70,550),
  (1,71,490),(1,72,495),(1,73,500),(1,74,510),(1,75,530),(1,76,540),(1,77,540),(1,78,550);
INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,79,30),(1,80,32),(1,81,35),(1,82,38),(1,83,40),
  (1,84,85),(1,85,90),(1,86,95),(1,87,100),(1,88,115),
  (1,89,170),(1,90,175),(1,91,185),(1,92,190),(1,93,195),
  (1,94,240),(1,95,245),(1,96,250),(1,97,255),(1,98,260),
  (1,99,480),(1,100,490),(1,101,500),(1,102,510),(1,103,520);
INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,104,30),(1,105,35),(1,106,40),(1,107,35),(1,108,38),
  (1,109,95),(1,110,90),(1,111,100),(1,112,105),(1,113,110),
  (1,114,170),(1,115,175),(1,116,185),(1,117,190),(1,118,195),
  (1,119,245),(1,120,250),(1,121,255),(1,122,260),(1,123,265),
  (1,124,490),(1,125,500),(1,126,510),(1,127,520),(1,128,530);
INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,129,30),(1,130,32),(1,131,35),(1,132,38),(1,133,40),
  (1,134,85),(1,135,90),(1,136,95),(1,137,100),(1,138,110),
  (1,139,170),(1,140,175),(1,141,185),(1,142,190),(1,143,195),
  (1,144,240),(1,145,245),(1,146,250),(1,147,255),(1,148,260),
  (1,149,480),(1,150,490),(1,151,500),(1,152,510),(1,153,520);
INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,154,30),(1,155,32),(1,156,35),(1,157,38),(1,158,40),
  (1,159,85),(1,160,90),(1,161,95),(1,162,100),(1,163,110),
  (1,164,170),(1,165,175),(1,166,185),(1,167,190),(1,168,195),
  (1,169,240),(1,170,245),(1,171,250),(1,172,255),(1,173,260),
  (1,174,480),(1,175,490),(1,176,500),(1,177,510),(1,178,520);

-- Bottes (ids 179-208)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
-- Communes
  (179,'Sandales de Voyage',     0,0,0,0, 2,0, 30,'armure','bottes',0,'commun',    0,'neutre'),
  (180,'Bottes de Terre',        0,0,1,0, 1,0, 32,'armure','bottes',0,'commun',    0,'neutre'),
  (181,'Chaussons Rembourrés',   0,0,0,0, 3,0, 35,'armure','bottes',0,'commun',    0,'neutre'),
  (182,'Mocassins Usés',         0,0,0,1, 2,0, 37,'armure','bottes',0,'commun',    0,'neutre'),
  (183,'Sabots de Bois',         0,0,2,0, 1,0, 40,'armure','bottes',0,'commun',    0,'neutre'),
-- Peu communes
  (184,'Bottes de Pisteur',      0,0,1,0, 5,0, 85,'armure','bottes',0,'peu_commun',0,'neutre'),
  (185,'Sandales d''Acrobate',   0,0,0,2, 4,0, 90,'armure','bottes',0,'peu_commun',0,'neutre'),
  (186,'Chaussures de Mage',     0,2,0,0, 3,0, 95,'armure','bottes',0,'peu_commun',0,'neutre'),
  (187,'Bottes Renforcées',      0,0,3,0, 2,0,100,'armure','bottes',0,'peu_commun',0,'neutre'),
  (188,'Chaussures de Coureur',  0,0,0,0, 6,0,110,'armure','bottes',0,'peu_commun',0,'neutre'),
-- Rares
  (189,'Bottes de Sang',         1,0,0,0, 8,0,170,'armure','bottes',0,'rare',      0,'neutre'),
  (190,'Sandales Runiques',      0,0,0,4, 3,0,175,'armure','bottes',0,'rare',      0,'neutre'),
  (191,'Bottes du Marcheur',     0,0,-1,0,9,0,185,'armure','bottes',0,'rare',      0,'neutre'),
  (192,'Chaussures Bénites',     0,0,3,3, 0,0,190,'armure','bottes',0,'rare',      0,'neutre'),
  (193,'Bottes de Vif-Argent',   0,2,0,0, 7,0,200,'armure','bottes',0,'rare',      0,'neutre'),
-- Épiques
  (194,'Bottes du Feu Ardent',   2,0,0,0, 6,0,240,'armure','bottes',0,'epique',   10,'feu'),
  (195,'Bottes des Glaces',      0,0,2,0, 5,0,245,'armure','bottes',0,'epique',   10,'eau'),
  (196,'Semelles Sismiques',     0,0,5,0, 2,0,245,'armure','bottes',0,'epique',   10,'terre'),
  (197,'Ailes du Zéphyr',        0,0,0,0, 8,0,250,'armure','bottes',0,'epique',   10,'air'),
  (198,'Chaussures Biomécas',    0,2,0,0, 5,0,250,'armure','bottes',0,'epique',   10,'technologie'),
  (199,'Pas du Nécromant',       0,3,0,0, 4,0,255,'armure','bottes',0,'epique',   10,'mort'),
  (200,'Semelles Verdoyantes',   0,0,0,3, 4,0,255,'armure','bottes',0,'epique',   10,'vie'),
  (201,'Bottes des Ombres',      2,0,0,0, 6,0,260,'armure','bottes',0,'epique',   10,'tenebres'),
  (202,'Sandales Saintes',       0,0,0,4, 4,0,265,'armure','bottes',0,'epique',   10,'lumiere'),
  (203,'Sabots Mystiques',       0,3,0,0, 5,0,270,'armure','bottes',0,'epique',   10,'surnaturel'),
-- Légendaires
  (204,'Bottes du Phoenix',      2,0,0,0,10,0,480,'armure','bottes',0,'legendaire',15,'feu'),
  (205,'Pas du Léviathan',       0,0,3,0, 8,0,490,'armure','bottes',0,'legendaire',15,'eau'),
  (206,'Semelles de Titan',      0,0,4,0, 7,0,500,'armure','bottes',0,'legendaire',15,'terre'),
  (207,'Chaussures du Vide',     0,3,0,0, 9,0,510,'armure','bottes',0,'legendaire',15,'tenebres'),
  (208,'Bottes Solaires',        0,4,0,0, 8,0,520,'armure','bottes',0,'legendaire',15,'lumiere');

INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,179,30),(1,180,32),(1,181,35),(1,182,37),(1,183,40),
  (1,184,85),(1,185,90),(1,186,95),(1,187,100),(1,188,110),
  (1,189,170),(1,190,175),(1,191,185),(1,192,190),(1,193,200),
  (1,194,240),(1,195,245),(1,196,245),(1,197,250),(1,198,250),
  (1,199,255),(1,200,255),(1,201,260),(1,202,265),(1,203,270),
  (1,204,480),(1,205,490),(1,206,500),(1,207,510),(1,208,520);

-- ============================================================
-- COMPÉTENCES (194 compétences sur 11 éléments)
-- Colonnes : nom, description, type, effet_type, puissance, effet_secondaire, valeur, duree_tours, rarete, prix_boutique, element, source, cout_mana
-- ============================================================
INSERT OR IGNORE INTO competence (nom, description, type, effet_type, puissance, effet_secondaire, valeur, duree_tours, rarete, prix_boutique, element, source, cout_mana) VALUES
-- === FEU ===
('Coup Chauffé','Frappe avec la base de l''arme brûlante.','attaque','physique',40,NULL,0,0,'commun',35,'feu','boutique',10),
('Souffle de Braise','Recrache des cendres incandescentes.','attaque','magique',35,'brulure',5,3,'commun',45,'feu','boutique',15),
('Étincelle Persistante','Un projectile qui s''accroche et roussit la cible.','attaque','magique',40,'brulure',5,3,'commun',50,'feu','boutique',18),
('Dague Cendrée','Plante une lame qui réagit à la chaleur.','attaque','physique',50,NULL,0,0,'commun',60,'feu','boutique',20),
('Fièvre Guerrière','Fait monter sa température pour taper fort.','buff','buff_attq',0,NULL,6,3,'peu_commun',75,'feu','boutique',25),
('Poudre Étincelante','Un tir de mousquet chargé de poudre vive.','attaque','magique',60,NULL,0,0,'peu_commun',95,'feu','boutique',30),
('Uppercut Enflammé','Un puissant coup de poing remontant en feu.','attaque','physique',60,'brulure',10,2,'peu_commun',110,'feu','boutique',35),
('Jet de Poivre Brûlant','Jette un mélange d''épices qui irrite les yeux.','attaque','magique',50,'debuff_precision',15,3,'peu_commun',120,'feu','boutique',40),
('Lame de Foyer','Un coup de taille avec une épée rougeoyante.','attaque','ignore_def',70,NULL,20,0,'rare',140,'feu','boutique',45),
('Bombe Fumigène Ignée','Libère une fumée suffocante et brûlante.','statut','brulure',0,NULL,15,3,'rare',190,'feu','boutique',50),
('Manteau de Flammes','Un bouclier de feu punissant le contact direct.','statut','reduction_degats',0,NULL,15,3,'rare',200,'feu','boutique',55),
('Frappe du Forgeron','Un coup lourd imitant le marteau sur l''enclume.','attaque','physique',85,NULL,0,0,'rare',220,'feu','boutique',60),
('Tir de Poudre Noire','Un tir surchargé qui explose à l''impact.','attaque','magique',95,NULL,0,0,'rare',240,'feu','boutique',70),
('Cautérisation Cruelle','Une douleur magique figeant la cible.','attaque','magique',80,NULL,0,0,'epique',310,'feu','boutique',75),
('Onde de Choc Thermique','Souffle une bourrasque brûlante.','attaque','magique',75,'brulure',15,3,'epique',350,'feu','boutique',85),
('Rugissement Brasier','Pousse un cri de guerre crachant du feu.','statut','debuff_attq',0,NULL,10,3,'epique',380,'feu','boutique',60),
('Fente du Dragon','Attaque perçante, la lame en fusion.','attaque','physique',115,NULL,0,0,'epique',420,'feu','boutique',100),
('Pluie de Feu','Une volée de flèches enflammées.','attaque','magique',110,'brulure',20,3,'epique',460,'feu','boutique',110),
('Plongeon Météorique','Saute et s''écrase comme une météorite.','attaque','physique',130,NULL,0,0,'legendaire',600,'feu','boutique',130),
('Incinération Totale','Recrée l''éclat du soleil.','attaque','magique',150,'brulure_incurable',30,99,'legendaire',700,'feu','boutique',150),
-- === EAU ===
('Crachat Froid','Recrache une eau glacée et piquante.','attaque','magique',40,'froid',1,0,'commun',35,'eau','boutique',10),
('Coup de Gourde','Frappe avec sa flasque d''eau lourde.','attaque','physique',45,NULL,0,0,'commun',40,'eau','boutique',12),
('Lame Glissante','Un coup d''arme rendu imprévisible.','attaque','physique',50,NULL,0,0,'commun',45,'eau','boutique',15),
('Ondelette','Fait léviter de l''eau pour la jeter.','attaque','magique',50,NULL,0,0,'commun',55,'eau','boutique',18),
('Pas Glissant','Enduit ses semelles d''eau pour patiner.','buff','buff_esquive',0,NULL,20,3,'commun',60,'eau','boutique',25),
('Fléchette de Glace','Un projectile gelé tiré avec précision.','attaque','magique',45,'froid',1,0,'peu_commun',90,'eau','boutique',25),
('Orbe de Givre','Lance une sphère d''eau extrêmement froide.','attaque','magique',60,'froid',1,0,'peu_commun',100,'eau','boutique',35),
('Coup Bas Vaseux','Frappe les jambes en projetant de la boue.','attaque','physique',55,'debuff_vitesse',5,3,'peu_commun',110,'eau','boutique',35),
('Taillade Aqueuse','Coupe l''air d''un jet d''eau tranchant.','attaque','physique',70,NULL,0,0,'peu_commun',120,'eau','boutique',40),
('Brume Épaisse','Invoque un brouillard faisant hésiter l''ennemi.','statut','debuff_precision',0,NULL,15,3,'rare',170,'eau','boutique',50),
('Bulle Prison','Enferme la tête de l''adversaire dans l''eau.','attaque','magique',50,'stun',0,1,'rare',200,'eau','boutique',60),
('Garde de Givre','Fige l''air autour de soi pour durcir l''armure.','statut','reduction_degats',0,NULL,20,2,'rare',210,'eau','boutique',55),
('Frappe du Torrent','Un coup inarrêtable avec l''élan d''une cascade.','attaque','physique',85,NULL,0,0,'rare',230,'eau','boutique',60),
('Pression Écrasante','L''eau alourdit drastiquement les équipements.','statut','debuff_vitesse',0,NULL,10,3,'epique',320,'eau','boutique',70),
('Pluie Verglaçante','Une averse qui gèle les articulations.','attaque','magique',90,'froid',2,0,'epique',400,'eau','boutique',95),
('Geyser Sous-Jacent','Fait éclater une colonne d''eau sous la cible.','attaque','magique',110,'debuff_vitesse',15,3,'epique',450,'eau','boutique',110),
('Fauchage Glaçant','Balaye les appuis, gelant les chevilles.','attaque','physique',95,'stun',0,2,'epique',480,'eau','boutique',115),
('Exécution des Abysses','Empale sa cible avec la force de la haute mer.','attaque','physique',135,NULL,0,0,'legendaire',650,'eau','boutique',135),
('Déferlante Morte','Projette un mur d''eau glaciale.','attaque','magique',120,'froid',3,0,'legendaire',680,'eau','boutique',145),
('Zéro Absolu','Libère un blizzard figeant le temps lui-même.','attaque','magique',140,'stun',0,2,'legendaire',750,'eau','boutique',160),
-- === TERRE ===
('Coup de Pierre','Jette une pierre lourde avec précision.','attaque','physique',40,NULL,0,0,'commun',35,'terre','boutique',10),
('Garde Sédimentaire','Recouvre sa peau de roche protectrice.','buff','buff_def',0,NULL,5,3,'commun',45,'terre','boutique',15),
('Coup d''Argile','Un coup de pied lourd et boueux.','attaque','def_based',45,NULL,0,0,'commun',50,'terre','boutique',18),
('Frappe du Manche','Un coup brutal avec la base de l''arme.','attaque','physique',50,NULL,0,0,'commun',50,'terre','boutique',18),
('Posture Montagne','S''ancre au sol pour encaisser et renvoyer.','statut','riposte',0,NULL,20,3,'commun',65,'terre','boutique',25),
('Tir de Boue','Un amas de terre humide tiré à grande vitesse.','attaque','magique',55,'debuff_precision',15,3,'peu_commun',95,'terre','boutique',30),
('Taillade Rocheuse','Une attaque tranchante qui frotte le sol.','attaque','def_based',65,NULL,0,0,'peu_commun',110,'terre','boutique',35),
('Accumulation','Absorbe l''énergie du sol.','statut','charge_sismique',0,NULL,1,0,'peu_commun',120,'terre','boutique',40),
('Estoc Terrestre','Un coup puissant avec l''inertie du corps.','attaque','physique',75,NULL,0,0,'peu_commun',130,'terre','boutique',45),
('Aura d''Enlisement','Le sol devient instable et collant.','statut','debuff_esquive',0,NULL,50,3,'rare',180,'terre','boutique',50),
('Blindage Minéral','Se recouvre d''une épaisse couche de roche.','buff','buff_def',0,NULL,10,3,'rare',200,'terre','boutique',55),
('Coup de Genou Dense','Un coup au corps-à-corps ultra-dense.','attaque','def_based',85,NULL,0,0,'rare',210,'terre','boutique',60),
('Projectile de Silex','Un éclat de roche extrêmement dur.','attaque','ignore_def',95,NULL,100,0,'rare',220,'terre','boutique',70),
('Absorption Tellurique','Utilise la douleur pour recharger sa magie.','statut','reduction_degats',0,NULL,25,3,'rare',250,'terre','boutique',40),
('Frappe Sismique','Frappe le sol, libérant l''énergie stockée.','attaque','physique_sismique',70,NULL,10,0,'epique',350,'terre','boutique',85),
('Mur de Granit','Un mur quasi-indestructible devant soi.','statut','riposte',0,NULL,50,3,'epique',380,'terre','boutique',70),
('Marteau de Gaia','Un coup de marteau fait de croûte terrestre.','attaque','def_based',115,NULL,0,0,'epique',420,'terre','boutique',100),
('Éboulement Dirigé','Fait pleuvoir des rochers pointus.','attaque','magique',120,'debuff_def',15,3,'epique',460,'terre','boutique',110),
('Assaut Tectonique','Charge vengeresse qui fend l''air.','attaque','physique',130,NULL,0,0,'legendaire',600,'terre','boutique',130),
('Faille Absolue','Ouvre la terre, engloutissant la cible.','attaque','def_spe_based',150,NULL,0,0,'legendaire',720,'terre','boutique',150),
-- === AIR ===
('Poing Fuyant','Une frappe rapide comme le vent.','attaque','multi_frappe',35,NULL,2,0,'commun',40,'air','boutique',15),
('Souffle Tranchant','Un sifflement projetant une lame d''air.','attaque','magique',40,NULL,0,0,'commun',35,'air','boutique',12),
('Fléchette de Vent','Un projectile aérodynamique.','attaque','ignore_def',45,NULL,10,0,'commun',45,'air','boutique',15),
('Estocade Légère','Un coup de pointe souple et vif.','attaque','physique',50,NULL,0,0,'commun',50,'air','boutique',18),
('Pas de Plume','Allège ses pas pour éviter les coups.','buff','buff_esquive',0,NULL,20,3,'commun',65,'air','boutique',25),
('Coup de Vent Vif','Une bourrasque soudaine.','attaque','vitesse_based',60,NULL,0,0,'peu_commun',95,'air','boutique',30),
('Fauchage Aérien','Un coup d''arme circulaire rapide.','attaque','multi_frappe',50,NULL,2,0,'peu_commun',110,'air','boutique',40),
('Sphère d''Air','Une bulle d''air comprimé.','attaque','magique',65,NULL,0,0,'peu_commun',100,'air','boutique',35),
('Taillade Invisible','Le mouvement est si rapide qu''il est invisible.','attaque','physique',75,NULL,0,0,'peu_commun',130,'air','boutique',45),
('Nuage Aveuglant','Soulève de la poussière dans les yeux.','statut','debuff_precision',0,NULL,20,3,'rare',180,'air','boutique',50),
('Courant Ascendant','Le vent vous porte, doublant vos actions.','buff','buff_vitesse',0,NULL,15,3,'rare',220,'air','boutique',75),
('Balayette Rapide','Un coup de pied bas accéléré par le vent.','attaque','vitesse_based',85,NULL,0,0,'rare',210,'air','boutique',60),
('Tir Perçant','Un tir enveloppé d''une spirale de vent.','attaque','ignore_def',90,NULL,100,0,'rare',230,'air','boutique',65),
('Esquive Parfaite','Anticipe le mouvement grâce aux courants.','buff','buff_esquive',0,NULL,100,1,'rare',250,'air','boutique',80),
('Bourrasque','Un vent violent qui fait reculer l''ennemi.','attaque','magique',95,'debuff_vitesse',10,3,'epique',350,'air','boutique',85),
('Vitesse Sonique','Dépasse les limites du corps.','buff','buff_vitesse',0,NULL,12,3,'epique',390,'air','boutique',70),
('Rafale des Mille Lames','Une série de frappes rotatives frénétiques.','attaque','multi_frappe',45,NULL,3,0,'epique',450,'air','boutique',110),
('Tornade Ciblée','Invoque un petit cyclone.','attaque','magique',120,NULL,0,0,'epique',420,'air','boutique',100),
('Percée de l''Ouragan','Une charge terrifiante portée par la tempête.','attaque','physique',135,NULL,0,0,'legendaire',620,'air','boutique',135),
('Tempête Ultime','Crée un vent apocalyptique protecteur.','attaque','magique',150,NULL,0,0,'legendaire',750,'air','boutique',160),
-- === VIE ===
('Coup de Rameau','Un coup sec avec du bois vert.','attaque','physique',40,NULL,0,0,'commun',35,'vie','boutique',10),
('Sève Apaisante','Boit une fiole de sève curative.','statut','soin',0,NULL,10,0,'commun',50,'vie','boutique',25),
('Graine Sangsue','Implante une graine qui pompe l''énergie.','attaque','vol_vie',30,NULL,50,0,'commun',55,'vie','boutique',20),
('Fouet Épineux','Une attaque cinglante avec une liane.','attaque','vol_vie',45,NULL,50,0,'commun',60,'vie','boutique',25),
('Photosynthèse','Absorbe la lumière pour guérir.','statut','regen_pv',0,NULL,5,3,'peu_commun',85,'vie','boutique',35),
('Pollen Irritant','Fait pleurer et affaiblit la cible.','attaque','magique',50,'debuff_attq',5,3,'peu_commun',90,'vie','boutique',30),
('Lame de Feuille','Frappe avec une arme aux rebords dentelés.','attaque','physique',65,NULL,0,0,'peu_commun',100,'vie','boutique',35),
('Drain Végétal','Des racines absorbent la force adverse.','attaque','vol_vie',60,NULL,50,0,'peu_commun',130,'vie','boutique',50),
('Estoc Enraciné','Pousse l''arme avec la force d''une racine.','attaque','physique',75,NULL,0,0,'peu_commun',140,'vie','boutique',45),
('Écorce Curative','Protège tout en refermant les plaies.','statut','soin',0,NULL,20,0,'rare',200,'vie','boutique',60),
('Spores de Sommeil','Endort l''adversaire avec un gaz lourd.','statut','stun',0,NULL,0,2,'rare',220,'vie','boutique',70),
('Explosion Florale','Fait détoner une fleur magique.','attaque','magique',85,NULL,0,0,'rare',210,'vie','boutique',60),
('Coup de Liane Vampirique','Un coup de fouet qui ramène du sang.','attaque','vol_vie',80,NULL,50,0,'rare',250,'vie','boutique',70),
('Racine Sismique','Une grosse racine percute l''adversaire.','attaque','magique',95,'debuff_vitesse',8,3,'epique',340,'vie','boutique',85),
('Bénédiction Sylvestre','Un soin massif d''urgence.','statut','soin',0,NULL,50,0,'epique',400,'vie','boutique',120),
('Écrasement du Tronc','Maniée avec la force d''un arbre qui s''abat.','attaque','physique',115,NULL,0,0,'epique',420,'vie','boutique',100),
('Roseraie Sanglante','Un parterre de ronces qui vide la cible.','attaque','vol_vie',100,NULL,50,0,'epique',480,'vie','boutique',115),
('Empalement Sylvestre','Cloue l''adversaire avec un pieu de bois.','attaque','vol_vie',130,NULL,50,0,'legendaire',620,'vie','boutique',135),
('Éveil de l''Arbre-Vie','L''ultime miracle de la nature.','statut','soin',0,NULL,70,0,'legendaire',750,'vie','boutique',200),
-- === MORT ===
('Coup d''Os','Frappe avec une arme taillée dans un os.','attaque','physique',40,NULL,0,0,'commun',35,'mort','boutique',10),
('Souffle Tombal','Expiration de poussière de cimetière.','attaque','magique',40,'debuff_attq',3,5,'commun',45,'mort','boutique',15),
('Orbe Fantôme','Projectile d''énergie pâle.','attaque','magique',45,'debuff_def_spe',3,5,'commun',50,'mort','boutique',18),
('Dague Macabre','Lame enduite de crasse mortuaire.','attaque','physique',50,'debuff_vitesse',3,5,'commun',55,'mort','boutique',20),
('Regard d''Effroi','Terrifie la cible, la rendant molle.','statut','debuff_attq_spe',0,NULL,6,5,'peu_commun',80,'mort','boutique',30),
('Faux d''Ombre','Balayage évoquant une faux mortelle.','attaque','physique',65,NULL,0,0,'peu_commun',100,'mort','boutique',35),
('Bris d''Armure','Énergie qui ronge le métal et le cuir.','attaque','magique',55,'debuff_def',8,3,'peu_commun',120,'mort','boutique',45),
('Fente Fatale','Frappe perçante sur point vital exposé.','attaque','physique',75,NULL,0,0,'peu_commun',140,'mort','boutique',50),
('Aura de Putréfaction','Miasme qui détruit la vitalité ennemie.','statut','debuff_attq',0,NULL,8,3,'rare',190,'mort','boutique',65),
('Manteau d''Os','Arrache la résistance ennemie pour soi.','statut','debuff_def',0,NULL,5,3,'rare',210,'mort','boutique',60),
('Écho des Limbes','Murmure projeté dans l''esprit.','attaque','magique',85,'debuff_attq_spe',6,5,'rare',220,'mort','boutique',65),
('Froid Cadavérique','Rend impossible le soin pour la cible.','attaque','magique',80,'anti_heal',0,3,'rare',240,'mort','boutique',70),
('Sangsue de Force','Coupe un muscle et absorbe sa force.','attaque','physique',90,'debuff_attq',3,3,'epique',340,'mort','boutique',85),
('Hurlement Spectral','Cri déchirant qui brise la volonté.','statut','debuff_def_spe',0,NULL,15,3,'epique',390,'mort','boutique',90),
('Taillade Nécrotique','Frappe qui pourrit la chair au contact.','attaque','physique',110,'debuff_attq',6,3,'epique',420,'mort','boutique',100),
('Nuage de Peste','Corrode l''essence même de la cible.','attaque','magique',115,NULL,0,0,'epique',480,'mort','boutique',115),
('Jugement d''Anubis','La balance de la mort s''abat.','attaque','magique',130,NULL,0,0,'legendaire',620,'mort','boutique',130),
('Moisson d''Âme','Arrache l''esprit de l''adversaire.','attaque','physique',150,'debuff_attq',8,3,'legendaire',750,'mort','boutique',160),
-- === LUMIÈRE ===
('Pointe Étincelante','Coup d''estoc rapide reflétant le soleil.','attaque','physique',45,NULL,0,0,'commun',40,'lumiere','boutique',15),
('Tir de Prisme','Concentre un fin rayon de lumière.','attaque','magique',50,NULL,0,0,'commun',50,'lumiere','boutique',20),
('Frappe Juste','Attaque portée avec droiture.','attaque','ignore_def',55,NULL,10,0,'commun',60,'lumiere','boutique',25),
('Éblouissement','Rend la cible incapable d''esquiver.','statut','debuff_esquive',0,NULL,50,2,'commun',70,'lumiere','boutique',30),
('Coupe-Ombre','Fauchage net avec une lame de l''aube.','attaque','ignore_def',70,NULL,100,0,'peu_commun',120,'lumiere','boutique',50),
('Rayon Ardent','Faisceau de lumière concentrée.','attaque','ignore_def',80,NULL,30,0,'peu_commun',130,'lumiere','boutique',55),
('Coup Bouclier Radieux','Bourrade avec énergie lumineuse.','attaque','physique',75,NULL,0,0,'peu_commun',110,'lumiere','boutique',45),
('Lumière Concentrée','Le personnage accumule des photons.','statut','prochain_attq_mult',0,NULL,200,0,'peu_commun',140,'lumiere','boutique',60),
('Lance Stellaire','Projette un javelot d''énergie lumineuse.','attaque','magique',100,NULL,0,0,'rare',230,'lumiere','boutique',85),
('Châtiment Céleste','Un pilier de lumière s''abat.','attaque','ignore_def_spe',90,NULL,20,0,'rare',250,'lumiere','boutique',95),
('Plongeon de l''Ange','S''abat sur la cible depuis les cieux.','attaque','ignore_def',105,NULL,20,0,'rare',260,'lumiere','boutique',100),
('Aura de Vérité','La lumière révèle toute chose.','statut','dissipe_buff',0,NULL,0,0,'rare',200,'lumiere','boutique',65),
('Lame de l''Aurore','Coup d''arme blanche dévastateur.','attaque','ignore_def',125,NULL,30,0,'epique',420,'lumiere','boutique',130),
('Purification Radicale','Rayon qui fond littéralement la cible.','attaque','ignore_def_spe',115,NULL,40,0,'epique',460,'lumiere','boutique',140),
('Jugement Solaire','La justice pure s''abat, sans filtre.','attaque','ignore_def',140,NULL,70,0,'legendaire',680,'lumiere','boutique',180),
('Supernova','Explosion d''une étoile, burst ultime.','attaque','magique',200,NULL,0,0,'legendaire',800,'lumiere','boutique',-1),
-- === SURNATUREL ===
('Paume Éthérée','Onde de choc magique instable. Dégâts imprévisibles entre 20 et 60.','attaque','aleatoire',60,NULL,20,0,'commun',35,'surnaturel','boutique',10),
('Orbe Arcanique','Projectile d''énergie violette.','attaque','magique',45,NULL,0,0,'commun',40,'surnaturel','boutique',15),
('Murmure Dissonant','Rend l''ennemi susceptible de se frapper.','buff','buff_esquive',0,NULL,15,3,'commun',60,'surnaturel','boutique',25),
('Estoc Immatériel','Arme traversant partiellement la matière.','attaque','ignore_def',50,NULL,30,0,'commun',55,'surnaturel','boutique',20),
('Distorsion','La force devient faiblesse.','statut','dissipe_buff',0,NULL,0,0,'peu_commun',110,'surnaturel','boutique',45),
('Frappe Magique','Coup imprégné de mana brut.','attaque','magique',65,NULL,0,0,'peu_commun',100,'surnaturel','boutique',35),
('Choc Temporel','Ralentit localement le temps.','attaque','magique',60,'debuff_vitesse',5,3,'peu_commun',120,'surnaturel','boutique',45),
('Regard Fou','Regard figeant le cerveau reptilien.','statut','stun',0,NULL,0,2,'peu_commun',130,'surnaturel','boutique',50),
('Onde Mentale','Choc psychique direct dans la tête.','attaque','magique',85,'stun',0,1,'rare',210,'surnaturel','boutique',65),
('Sceaux Explosifs','Glyphes instables explosant au contact. Dégâts imprévisibles entre 50 et 130.','attaque','aleatoire',130,NULL,50,0,'rare',220,'surnaturel','boutique',70),
('Vol de Pensée','Vous jouez à la place de l''ennemi.','statut','stun',0,NULL,0,1,'rare',260,'surnaturel','boutique',85),
('Fente de Dimension','Disparaît pour réapparaître en frappant.','attaque','ignore_def',95,NULL,100,0,'rare',240,'surnaturel','boutique',75),
('Chaos Mental','Attaque bloquant le système nerveux.','attaque','magique',80,'stun',0,2,'epique',360,'surnaturel','boutique',90),
('Roulette Arcanique','Laisse le mana décider du sort du combat.','attaque','magique',110,NULL,0,0,'epique',400,'surnaturel','boutique',100),
('Miroir aux Illusions','Crée un double parfait de la cible.','statut','stun',0,NULL,0,1,'epique',450,'surnaturel','boutique',120),
('Désintégration','Incantation interdite de suppression pure.','attaque','magique',80,NULL,0,0,'legendaire',700,'surnaturel','boutique',160),
-- === TECHNOLOGIE ===
('Coup de Piston','Un coup mécanique lourd qui fait chauffer le bras.','attaque','surchauffe_add',45,NULL,1,0,'commun',35,'technologie','boutique',10),
('Tir d''Échauffement','Un tir rapide qui commence à faire rougir le canon.','attaque','surchauffe_add_mag',40,NULL,1,0,'commun',40,'technologie','boutique',15),
('Soupape de Sécurité','Purge toutes les charges de surchauffe. Restaure 5 mana par charge retirée.','statut','surchauffe_reset_mana',0,NULL,5,0,'commun',60,'technologie','boutique',5),
('Lame Scie-Circulaire','Fait tourner une lame à plein régime.','attaque','surchauffe_add',50,NULL,1,0,'commun',50,'technologie','boutique',18),
('Jet de Vapeur','Souffle la vapeur brûlante de l''armure au visage ennemi.','attaque','surchauffe_purge',45,'debuff_precision',15,3,'peu_commun',95,'technologie','boutique',30),
('Overclock Mineur','Désactive les sécurités pour accélérer les mouvements.','buff','buff_vitesse',0,NULL,8,3,'peu_commun',110,'technologie','boutique',25),
('Frappe Cylindrique','Un impact brutal avec un bras pneumatique.','attaque','surchauffe_add',70,NULL,2,0,'peu_commun',120,'technologie','boutique',40),
('Décharge d''Urgence','Éjecte toute l''énergie thermique accumulée dans un tir.','attaque','surchauffe_purge',60,NULL,15,0,'peu_commun',130,'technologie','boutique',45),
('Tir Plasma Brut','Un faisceau surchauffé très coûteux pour le matériel.','attaque','surchauffe_add_mag',80,NULL,2,0,'rare',210,'technologie','boutique',65),
('Garde Thermique','Refroidit le système en solidifiant les plaques externes.','statut','reduction_degats',0,NULL,20,2,'rare',200,'technologie','boutique',50),
('Coup de Clé Rouge','Frappe avec un outil chauffé à blanc.','attaque','surchauffe_add',65,'brulure',10,3,'rare',190,'technologie','boutique',55),
('Épée Tronçonneuse','Découpe l''ennemi dans un hurlement de moteur.','attaque','surchauffe_add',85,NULL,2,0,'rare',230,'technologie','boutique',70),
('Souffle Cryogénique','Refroidissement brutal créant un choc thermique chez l''ennemi.','attaque','surchauffe_purge',75,'stun',0,1,'epique',380,'technologie','boutique',85),
('Surcharge Volontaire','Pousse sciemment la machine à son point de rupture.','statut','prochain_attq_mult',0,NULL,200,0,'epique',400,'technologie','boutique',70),
('Marteau Pilon','Une attaque fracassante, extrêmement dangereuse pour vous.','attaque','surchauffe_add',115,NULL,3,0,'epique',420,'technologie','boutique',100),
('Rayon Dissipateur','Utilise la chaleur pour faire fondre les protections ennemies.','attaque','surchauffe_purge',95,'debuff_def_spe',8,3,'epique',460,'technologie','boutique',115),
('Canon Électromagnétique','Un tir d''une puissance colossale qui enflamme les circuits.','attaque','surchauffe_add_mag',130,NULL,3,0,'legendaire',620,'technologie','boutique',130),
('Noyau en Fusion','L''attaque suicide parfaite pour terminer un boss.','attaque','surchauffe_add',145,NULL,4,0,'legendaire',680,'technologie','boutique',140),
('Purge Nucléaire','Le bouton d''évacuation d''urgence de votre réacteur.','attaque','surchauffe_purge',150,NULL,20,0,'legendaire',750,'technologie','boutique',160),
-- === TÉNÈBRES ===
('Coup Bas Furtif','Frappe vicieuse dans l''angle mort.','attaque','physique',40,NULL,0,0,'commun',35,'tenebres','boutique',10),
('Orbe de Suie','Boule d''énergie sale aspirant la magie.','attaque','vol_mana',40,NULL,10,0,'commun',45,'tenebres','boutique',15),
('Entaille Sinueuse','Tranche l''ennemi pour siphonner son flux.','attaque','physique',50,'vol_mana',10,0,'commun',50,'tenebres','boutique',20),
('Sceau Maudit','Pose une malédiction à retardement.','statut','marque',0,NULL,70,2,'commun',65,'tenebres','boutique',25),
('Voile d''Opacité','Plonge la cible dans un brouillard corrompu.','statut','anti_heal',0,NULL,0,2,'peu_commun',95,'tenebres','boutique',35),
('Terreur Rampante','Fige de peur, retardant l''action adverse.','attaque','magique',55,'debuff_vitesse',5,3,'peu_commun',110,'tenebres','boutique',40),
('Frappe Éclipse','Coup lourd punissant les cibles vidées.','attaque','physique',75,NULL,0,0,'peu_commun',130,'tenebres','boutique',50),
('Corruption d''Aura','Vole la force magique de l''adversaire.','statut','dissipe_buff',0,NULL,0,0,'peu_commun',140,'tenebres','boutique',55),
('Ombre Étouffante','Filaments sombres serrant la gorge.','attaque','vol_mana',65,NULL,25,0,'rare',190,'tenebres','boutique',60),
('Marque du Destin','Une bombe magique collée sur la cible.','statut','marque',0,NULL,120,3,'rare',230,'tenebres','boutique',75),
('Brise-Nuque Obscur','Coup sec à la base du crâne.','attaque','physique',85,'stun',0,3,'rare',210,'tenebres','boutique',65),
('Poids du Néant','La gravité pèse sur la magie adverse.','statut','debuff_attq_spe',0,NULL,5,3,'rare',200,'tenebres','boutique',60),
('Cauchemar Éveillé','Attaque psychique noire.','attaque','vol_mana',95,NULL,50,0,'epique',380,'tenebres','boutique',90),
('Exécution Différée','Frappe résonnant avec les malédictions.','attaque','physique',115,NULL,0,0,'epique',420,'tenebres','boutique',110),
('Gouffre Dévorant','Faisceau rongeant le corps et l''esprit.','attaque','vol_mana',100,NULL,50,0,'epique',450,'tenebres','boutique',115),
('Abysse Absolu','Fait détoner toutes les malédictions instantanément.','attaque','magique',80,NULL,0,0,'legendaire',750,'tenebres','boutique',170),
-- === NEUTRE (sans mana) ===
('Garde de Fer','Le personnage lève son arme pour encaisser le prochain coup.','statut','reduction_degats',0,NULL,50,1,'commun',20,'neutre','boutique',0),
('Coup de Pommeau','Un coup sec et contondant au visage pour désorienter.','attaque','physique',25,'debuff_vitesse',5,2,'commun',25,'neutre','boutique',0),
('Feinte','Fait semblant de frapper pour ouvrir la garde de l''adversaire.','statut','prochain_attq_mult',0,NULL,150,0,'commun',30,'neutre','boutique',0),
('Fente Rapide','Une attaque vive suivie d''un pas de retrait immédiat.','attaque','physique',35,NULL,0,0,'peu_commun',45,'neutre','boutique',0),
('Frappe Lourde','Un grand coup très puissant mais prévisible.','attaque','physique',60,NULL,0,0,'peu_commun',50,'neutre','boutique',0),
('Brise-Garde','Un coup de pied frontal conçu pour briser la posture ennemie.','attaque','physique',30,'debuff_def',3,3,'peu_commun',60,'neutre','boutique',0),
('Respiration Martiale','Le personnage prend une grande inspiration pour recharger.','statut','soin_restore_mana',0,NULL,15,0,'rare',75,'neutre','boutique',0),
('Balayage Tactique','Un fauchage visant les appuis pour déstabiliser l''adversaire.','attaque','physique',35,NULL,0,0,'rare',90,'neutre','boutique',0),
('Riposte Parfaite','Une posture d''attente redoutable.','statut','riposte',0,NULL,100,1,'epique',120,'neutre','boutique',0),
('Coup de Grâce','La technique d''exécution pour achever un combat.','attaque','physique',40,NULL,0,0,'epique',150,'neutre','boutique',0);
`,wr="rogue_life",we="db",qn="save";function gn(){return new Promise((i,o)=>{const s=indexedDB.open(wr,1);s.onupgradeneeded=()=>s.result.createObjectStore(we),s.onsuccess=()=>i(s.result),s.onerror=()=>o(s.error)})}async function Sr(){const i=await gn();return new Promise((o,s)=>{const b=i.transaction(we,"readonly").objectStore(we).get(qn);b.onsuccess=()=>o(b.result??null),b.onerror=()=>s(b.error)})}async function yr(i){const o=await gn();return new Promise((s,d)=>{const b=o.transaction(we,"readwrite");b.objectStore(we).put(i,qn),b.oncomplete=()=>s(),b.onerror=()=>d(b.error)})}let Z=null;async function v(){var s;if(Z)return Z;(s=navigator.storage)!=null&&s.persist&&await navigator.storage.persist();const i=await Nr({locateFile:()=>"/sql-wasm.wasm"}),o=await Sr();return o?Z=new i.Database(o):(Z=new i.Database,Z.run(Lr),await I()),Z}async function I(){Z&&await yr(Z.export())}function Tn(i){return i.replace(/\$\d+/g,"?")}function _(i,o=[]){const s=Z.prepare(Tn(i)),d=[];for(s.bind(o);s.step();)d.push(s.getAsObject());return s.free(),d}function E(i,o=[]){Z.run(Tn(i),o)}const Se={1:{xp:15,gold:8,pv:5},2:{xp:30,gold:15,pv:10},3:{xp:50,gold:25,pv:20}};function ht(i){return i==="cauchemar"?2:i==="hard"?1.5:1}const Rn={pv_combat_max:100,attq:50,attq_spe:50,def:50,def_spe:50,vitesse:50,mana_max:100};async function Ir(i){return await v(),_("SELECT * FROM personnage WHERE id = $1",[i])[0]??null}async function Ur(i){return await v(),_("SELECT * FROM caracteristique WHERE id = $1",[i])[0]??null}async function Or(){return await v(),_("SELECT * FROM level ORDER BY id")}async function Ar(){return await v(),_("SELECT * FROM titre")}async function Mr(i,o){await v(),E("UPDATE personnage SET titre_id = $1 WHERE id = $2",[o,i]),await I()}async function Fr(){return await v(),_("SELECT * FROM stuff")}async function Cr(i){return await v(),_("SELECT * FROM inventaire WHERE personnage_id = $1",[i])}const Dr=["arme_1main","arme_2mains","bouclier_1main","bouclier_2mains"],_t=i=>i.includes("2mains")?2:1;async function Gr(i,o){var b;await v();const d=(b=_("SELECT s.slot FROM inventaire i JOIN stuff s ON s.id = i.stuff_id WHERE i.id = $1",[o])[0])==null?void 0:b.slot;if(d){if(Dr.includes(d)){const T=_t(d),L=_(`SELECT i.id, s.slot FROM inventaire i
             JOIN stuff s ON s.id = i.stuff_id
             WHERE i.personnage_id = $1 AND i.est_equipe = 1 AND s.slot IN ('arme_1main','arme_2mains','bouclier_1main','bouclier_2mains')`,[i]);let N=L.reduce((g,l)=>g+_t(l.slot),0);for(const g of L){if(N+T<=2)break;E("UPDATE inventaire SET est_equipe = 0 WHERE id = $1",[g.id]),N-=_t(g.slot)}}else E(`UPDATE inventaire SET est_equipe = 0
             WHERE personnage_id = $1 AND est_equipe = 1
             AND stuff_id IN (SELECT id FROM stuff WHERE slot = $2)`,[i,d]);E("UPDATE inventaire SET est_equipe = 1 WHERE id = $1",[o]),await I()}}async function Pr(i,o){await v();const d=_("SELECT s.slot, s.soin_pv, i.stuff_id FROM inventaire i JOIN stuff s ON s.id = i.stuff_id WHERE i.id = $1",[o])[0];if(!d)return;const b=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!b)return;const T=b.mode??"normal";if(T==="hard"||T==="cauchemar")throw new Error("Utilitaires interdits en mode Hard / Cauchemar");d.slot==="consommable"&&d.soin_pv>0?E("UPDATE caracteristique SET pv_vie_actuels = MIN(pv_vie_max, pv_vie_actuels + $1) WHERE id = $2",[d.soin_pv,b.caracteristique_id]):d.slot==="joker"&&E("UPDATE personnage SET jokers_disponibles = jokers_disponibles + 1 WHERE id = $1",[i]),E("UPDATE inventaire SET quantite = quantite - 1 WHERE id = $1",[o]),E("DELETE FROM inventaire WHERE id = $1 AND quantite <= 0",[o]),await I()}async function $r(i){await v(),E("UPDATE inventaire SET est_equipe = 0 WHERE id = $1",[i]),await I()}async function xr(i,o,s){var N;await v();const d=_("SELECT prix_vente_local FROM magasin_inventaire WHERE magasin_id = $1 AND stuff_id = $2",[o,s]);if(!d[0])throw new Error("Item introuvable dans ce magasin");const b=d[0].prix_vente_local,T=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!T)throw new Error("Personnage introuvable");if(T.gold_actuel<b)throw new Error("Or insuffisant");if(((N=_("SELECT slot FROM stuff WHERE id = $1",[s])[0])==null?void 0:N.slot)==="joker"){const g=T.mode??"normal";if(g==="hard"||g==="cauchemar")throw new Error("Jokers interdits en mode Hard / Cauchemar")}E("UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2",[b,i]),E("INSERT OR IGNORE INTO inventaire (personnage_id, stuff_id, quantite, est_equipe) VALUES ($1, $2, 0, 0)",[i,s]),E("UPDATE inventaire SET quantite = quantite + 1 WHERE personnage_id = $1 AND stuff_id = $2",[i,s]),await I()}async function Wr(i,o){var b;await v();const s=_("SELECT stuff_id, quantite FROM inventaire WHERE id = $1 AND personnage_id = $2",[o,i])[0];if(!s)throw new Error("Item introuvable");const d=Math.floor((((b=_("SELECT prix_base FROM stuff WHERE id = $1",[s.stuff_id])[0])==null?void 0:b.prix_base)??0)/4);return E("UPDATE personnage SET gold_actuel = gold_actuel + $1 WHERE id = $2",[d,i]),s.quantite<=1?E("DELETE FROM inventaire WHERE id = $1",[o]):E("UPDATE inventaire SET quantite = quantite - 1 WHERE id = $1",[o]),await I(),d}async function Br(i){return await v(),_("SELECT * FROM magasin_inventaire WHERE magasin_id = $1",[i])}async function Hr(){return await v(),_("SELECT * FROM tache")}async function jr(i){await v();const o=new Date().toISOString();E(`INSERT INTO tache (nom, type_activite, type, difficulte, exp_recompense, gold_recompense, pv_vie_penalite, duree_jours, date_creation, date_limite)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,[i.nom,i.type_activite,i.type??"ponctuelle",i.difficulte,i.exp_recompense,i.gold_recompense,i.pv_vie_penalite,i.duree_jours??null,o,i.date_limite??null]),await I()}async function Vr(i){await v();const o=_("SELECT * FROM tache WHERE id = $1",[i])[0];if(o){if(o.date_creation){const s=(Date.now()-new Date(o.date_creation).getTime())/864e5;if(s<7)throw new Error(`Routine créée il y a ${Math.floor(s)}j — suppression possible après 7 jours`)}E("DELETE FROM tache WHERE id = $1",[i]),await I()}}async function kr(i,o){await v();const s=_("SELECT * FROM tache WHERE id = $1",[o])[0];if(!s)return;const d=Se[s.difficulte]??Se[1],b=_("SELECT * FROM personnage WHERE id = $1",[i])[0],T=ht((b==null?void 0:b.mode)??"normal");E("UPDATE personnage SET experience_actuelle = experience_actuelle + $1, gold_actuel = gold_actuel + $2 WHERE id = $3",[Math.round(d.xp*T),Math.round(d.gold*T),i]),E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)",[i,o,"succes",s.nom]),await I()}async function ye(i){await v();const o=_("SELECT * FROM personnage WHERE id = $1",[i])[0];o&&(E("UPDATE personnage SET level_id=1, experience_actuelle=0, gold_actuel=50, points_stat_disponibles=0 WHERE id=$1",[i]),E(`UPDATE caracteristique SET
            pv_vie_max=100, pv_vie_actuels=100,
            pv_combat_max=100, pv_combat_actuels=100,
            attq=10, attq_spe=10, def=8, def_spe=8, vitesse=12,
            mana_max=150, mana_actuels=150
         WHERE id=$1`,[o.caracteristique_id]),E("UPDATE personnage SET mode='normal', mode_debut=NULL, dernier_coffre_hebdo=NULL, dernier_coffre_mensuel=NULL WHERE id=$1",[i]),E("DELETE FROM personnage_competence WHERE personnage_id = $1",[i]),E("DELETE FROM competence WHERE source = 'donjon'"),E("DELETE FROM inventaire WHERE personnage_id = $1",[i]),await I())}async function Yr(i,o){await v();const s=Rn[o]??300,d=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!d)throw new Error("Personnage introuvable");if(d.gold_actuel<s)throw new Error("Or insuffisant");E("UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2",[s,i]),o==="pv_combat_max"?E("UPDATE caracteristique SET pv_combat_max = pv_combat_max + 5, pv_combat_actuels = pv_combat_actuels + 5 WHERE id = $1",[d.caracteristique_id]):o==="mana_max"?E("UPDATE caracteristique SET mana_max = mana_max + 15, mana_actuels = mana_actuels + 15 WHERE id = $1",[d.caracteristique_id]):E(`UPDATE caracteristique SET ${o} = ${o} + 1 WHERE id = $1`,[d.caracteristique_id]),await I()}async function Xr(i,o){await v();const s=_("SELECT * FROM personnage WHERE id = $1",[i])[0];s&&(E("UPDATE caracteristique SET mana_actuels = MAX(0, MIN(mana_max, $1)) WHERE id = $2",[o,s.caracteristique_id]),await I())}async function zr(i,o){await v();const s=_("SELECT * FROM personnage WHERE id = $1",[i])[0];s&&(E("UPDATE caracteristique SET mana_actuels = MIN(mana_max, mana_actuels + $1) WHERE id = $2",[o,s.caracteristique_id]),await I())}async function Kr(i){var N;await v();const o=new Date().toISOString().split("T")[0],s=new Date(Date.now()-864e5).toISOString().split("T")[0],d=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!d)return{gameOver:!1};if(d.dernier_check===o)return{gameOver:!1};const b=_("SELECT * FROM tache WHERE type = 'routine' AND (date_creation IS NULL OR date(date_creation) <= $1)",[s]);for(const g of b)if(_("SELECT id FROM historique_activite WHERE personnage_id = $1 AND tache_id = $2 AND statut IN ('succes', 'penalite') AND date(date_action) = $3",[i,g.id,s]).length===0){const j=d.mode??"normal";if(j==="cauchemar")return E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'penalite', $3)",[i,g.id,g.nom]),E("UPDATE personnage SET dernier_check = $1 WHERE id = $2",[o,i]),await I(),await ye(i),{gameOver:!0};if(j==="hard"||d.jokers_disponibles<=0){const $=(Se[g.difficulte]??Se[1]).pv;E("UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2",[$,d.caracteristique_id]),E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'penalite', $3)",[i,g.id,g.nom])}else E("UPDATE personnage SET jokers_disponibles = jokers_disponibles - 1 WHERE id = $1",[i]),d.jokers_disponibles--,E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'joker', $3)",[i,g.id,g.nom])}const T=_("SELECT * FROM tache WHERE type = 'ponctuelle'");for(const g of T){let l=null;if(g.date_limite)l=g.date_limite;else if(g.date_creation&&g.duree_jours){const $=new Date(g.date_creation);$.setDate($.getDate()+g.duree_jours),l=$.toISOString().split("T")[0]}if(!l||l>=o)continue;_("SELECT id FROM historique_activite WHERE personnage_id = $1 AND tache_id = $2 AND statut IN ('succes', 'expire')",[i,g.id]).length===0&&(E("UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2",[g.pv_vie_penalite,d.caracteristique_id]),E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'expire', $3)",[i,g.id,g.nom]))}return E("UPDATE personnage SET dernier_check = $1 WHERE id = $2",[o,i]),(((N=_("SELECT pv_vie_actuels FROM caracteristique WHERE id = $1",[d.caracteristique_id])[0])==null?void 0:N.pv_vie_actuels)??1)<=0?(await I(),await ye(i),{gameOver:!0}):(await I(),{gameOver:!1})}async function Qr(i,o){await v();const s=_("SELECT * FROM tache WHERE id = $1",[o])[0];if(!s)return;const d=_("SELECT * FROM personnage WHERE id = $1",[i])[0],b=ht((d==null?void 0:d.mode)??"normal");E("UPDATE personnage SET experience_actuelle = experience_actuelle + $1, gold_actuel = gold_actuel + $2 WHERE id = $3",[Math.round(s.exp_recompense*b),Math.round(s.gold_recompense*b),i]),E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)",[i,o,"complete",s.nom]),E("UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1",[o]),E("DELETE FROM tache WHERE id = $1",[o]),await I()}async function Jr(i,o){var T;await v();const s=_("SELECT * FROM tache WHERE id = $1",[o])[0];if(!s)return{gameOver:!1};const d=_("SELECT * FROM personnage WHERE id = $1",[i])[0];return d?(d.mode??"normal")==="cauchemar"?(E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)",[i,o,"echec",s.nom]),E("UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1",[o]),E("DELETE FROM tache WHERE id = $1",[o]),await I(),await ye(i),{gameOver:!0}):(E("UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2",[s.pv_vie_penalite,d.caracteristique_id]),E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)",[i,o,"echec",s.nom]),E("UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1",[o]),E("DELETE FROM tache WHERE id = $1",[o]),(((T=_("SELECT pv_vie_actuels FROM caracteristique WHERE id = $1",[d.caracteristique_id])[0])==null?void 0:T.pv_vie_actuels)??1)<=0?(await I(),await ye(i),{gameOver:!0}):(await I(),{gameOver:!1})):{gameOver:!1}}async function qt(i){await v();const o=_(`SELECT DISTINCT date(h.date_action) as jour
         FROM historique_activite h
         WHERE h.personnage_id = $1 AND h.statut = 'succes'
         AND date(h.date_action) NOT IN (
             SELECT DISTINCT date(date_action)
             FROM historique_activite
             WHERE personnage_id = $1 AND statut = 'penalite'
         )
         ORDER BY jour DESC`,[i]);if(o.length===0)return{actuel:0,record:0};const s=o.map(l=>l.jour),d=new Date().toISOString().split("T")[0],b=new Date(Date.now()-864e5).toISOString().split("T")[0];let T=0,L=s[0]===d||s[0]===b?s[0]:null;if(L){T=1;for(let l=1;l<s.length;l++){const j=new Date(new Date(L).getTime()-864e5).toISOString().split("T")[0];if(s[l]===j)T++,L=s[l];else break}}let N=0,g=1;for(let l=1;l<s.length;l++){const j=new Date(new Date(s[l-1]).getTime()-864e5).toISOString().split("T")[0];s[l]===j?g++:(N=Math.max(N,g),g=1)}return N=Math.max(N,g,T),{actuel:T,record:N}}async function Zr(i){return await v(),_("SELECT * FROM historique_activite WHERE personnage_id = $1 ORDER BY date_action DESC",[i])}async function ea(){return await v(),_("SELECT * FROM competence WHERE source != 'donjon' OR source IS NULL ORDER BY prix_boutique ASC")}async function ta(){return await v(),_("SELECT * FROM competence WHERE source = 'donjon' ORDER BY rarete ASC")}async function na(i){return await v(),_(`SELECT pc.id, pc.personnage_id, pc.competence_id, pc.est_equipee,
                c.id as comp_id, c.nom, c.description, c.type, c.effet_type,
                c.puissance, c.effet_secondaire,
                c.valeur, c.duree_tours, c.rarete, c.prix_boutique,
                c.element, c.source, c.cout_mana
         FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1`,[i]).map(s=>({id:s.id,personnage_id:s.personnage_id,competence_id:s.competence_id,est_equipee:!!s.est_equipee,competence:{id:s.comp_id,nom:s.nom,description:s.description,type:s.type,effet_type:s.effet_type,puissance:s.puissance??0,effet_secondaire:s.effet_secondaire??null,valeur:s.valeur,duree_tours:s.duree_tours,rarete:s.rarete,prix_boutique:s.prix_boutique,element:s.element??"neutre",source:s.source??"boutique",cout_mana:s.cout_mana??0}}))}async function ra(i,o){await v();const s=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!s)throw new Error("Personnage introuvable");const d=_("SELECT * FROM competence WHERE id = $1",[o])[0];if(!d)throw new Error("Compétence introuvable");if(s.gold_actuel<d.prix_boutique)throw new Error("Or insuffisant");if(_("SELECT * FROM personnage_competence WHERE personnage_id = $1 AND competence_id = $2",[i,o]).length>0)throw new Error("Compétence déjà possédée");E("UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2",[d.prix_boutique,i]),E("INSERT INTO personnage_competence (personnage_id, competence_id, est_equipee) VALUES ($1, $2, 0)",[i,o]),await I()}async function aa(i,o){if(await v(),_("SELECT COUNT(*) as cnt FROM personnage_competence WHERE personnage_id = $1 AND est_equipee = 1",[i])[0].cnt>=6)throw new Error("Maximum 6 compétences équipées");E("UPDATE personnage_competence SET est_equipee = 1 WHERE id = $1",[o]),await I()}async function ia(i){await v(),E("UPDATE personnage_competence SET est_equipee = 0 WHERE id = $1",[i]),await I()}async function ua(i,o,s){await v(),o==="stuff"?(E("INSERT OR IGNORE INTO inventaire (personnage_id, stuff_id, quantite, est_equipe) VALUES ($1, $2, 0, 0)",[i,s]),E("UPDATE inventaire SET quantite = quantite + 1 WHERE personnage_id = $1 AND stuff_id = $2",[i,s])):_("SELECT * FROM personnage_competence WHERE personnage_id = $1 AND competence_id = $2",[i,s]).length===0&&E("INSERT INTO personnage_competence (personnage_id, competence_id, est_equipee) VALUES ($1, $2, 0)",[i,s]),await I()}async function oa(i){await v();const o=_("SELECT * FROM personnage WHERE id = $1",[i])[0];o&&(E("UPDATE caracteristique SET pv_combat_actuels = pv_combat_max, mana_actuels = mana_max WHERE id = $1",[o.caracteristique_id]),await I())}async function sa(i,o){await v();const s=_("SELECT * FROM personnage WHERE id = $1",[i])[0];s&&(E("UPDATE caracteristique SET pv_combat_actuels = MAX(0, $1) WHERE id = $2",[o,s.caracteristique_id]),await I())}async function ca(i){await v();let o=0,s=0;for(;;){const d=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!d)break;const b=_("SELECT * FROM level WHERE id = $1",[d.level_id])[0];if(!b||d.experience_actuelle<b.exp_max_requise||d.level_id>=10)break;E("UPDATE personnage SET level_id = $1, points_stat_disponibles = points_stat_disponibles + 5 WHERE id = $2",[d.level_id+1,i]),o++,s+=5}return o>0&&await I(),{levels_gagnes:o,points_gagnes:s}}async function la(i,o){await v();const s=_("SELECT * FROM personnage WHERE id = $1",[i])[0];!s||(s.points_stat_disponibles??0)<=0||(E("UPDATE personnage SET points_stat_disponibles = points_stat_disponibles - 1 WHERE id = $1",[i]),o==="pv_combat_max"?E("UPDATE caracteristique SET pv_combat_max = pv_combat_max + 5, pv_combat_actuels = pv_combat_actuels + 5 WHERE id = $1",[s.caracteristique_id]):o==="mana_max"?E("UPDATE caracteristique SET mana_max = mana_max + 15, mana_actuels = mana_actuels + 15 WHERE id = $1",[s.caracteristique_id]):E(`UPDATE caracteristique SET ${o} = ${o} + 1 WHERE id = $1`,[s.caracteristique_id]),await I())}async function ma(i){var d;await v(),E("UPDATE personnage SET compteur_loot_donjon = COALESCE(compteur_loot_donjon, 0) + 1 WHERE id = $1",[i]);const o=((d=_("SELECT compteur_loot_donjon FROM personnage WHERE id = $1",[i])[0])==null?void 0:d.compteur_loot_donjon)??1;if(await I(),o%50===0)return"legendaire";const s=Math.floor((o-1)/3)%3;return["peu_commun","rare","epique"][s]}async function da(i){await v();try{return _("SELECT * FROM personnage_affinite WHERE personnage_id = $1",[i])}catch{return[]}}async function pa(i,o){await v();const s=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!s)return;const d=s.mode??"normal",b={normal:0,hard:1,cauchemar:2};if(b[o]<b[d]&&s.mode_debut){const N=(Date.now()-new Date(s.mode_debut).getTime())/864e5;if(N<3)throw new Error(`Mode actif depuis ${Math.floor(N)}j — retour possible après 3 jours`)}const T=new Date().toISOString().split("T")[0],L=o!=="normal"?d!=="normal"?s.mode_debut:T:null;E("UPDATE personnage SET mode = $1, mode_debut = $2 WHERE id = $3",[o,L,i]),await I()}async function fa(i){await v();const o=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!o||(o.mode??"normal")==="normal")return{hebdo:null,mensuel:null};const s=o.mode,d=Date.now(),b=o.mode_debut?new Date(o.mode_debut).getTime():d,T=new Date().toISOString().split("T")[0];let L=null,N=null;const g=o.dernier_coffre_mensuel?new Date(o.dernier_coffre_mensuel).getTime():b;d-g>=30*864e5&&(N=s==="cauchemar"?"legendaire":"epique",E("UPDATE personnage SET dernier_coffre_mensuel = $1 WHERE id = $2",[T,i]));const l=o.dernier_coffre_hebdo?new Date(o.dernier_coffre_hebdo).getTime():b;return d-l>=7*864e5&&(L=s==="cauchemar"?"epique":"rare",E("UPDATE personnage SET dernier_coffre_hebdo = $1 WHERE id = $2",[T,i])),(L||N)&&await I(),{hebdo:L,mensuel:N}}async function Ea(i,o){await v(),E("UPDATE personnage SET nom = $1 WHERE id = $2",[o.trim(),i]),await I()}async function ba(i){await v();const o=_(`SELECT h.statut, t.type as type_tache, COUNT(*) as cnt
         FROM historique_activite h
         LEFT JOIN tache t ON t.id = h.tache_id
         WHERE h.personnage_id = $1
         GROUP BY h.statut, t.type`,[i]);let s=0,d=0,b=0,T=0;for(const L of o)L.statut==="succes"&&L.type_tache==="routine"?b+=L.cnt:L.statut==="succes"?s+=L.cnt:L.statut==="echec"?d+=L.cnt:L.statut==="penalite"&&(T+=L.cnt);return{taches_succes:s,taches_echec:d,routines_faites:b,penalites:T}}async function _a(i){var N;await v();const o=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!o)return;if((((N=_(`SELECT COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 AND c.rarete = 'legendaire'`,[i])[0])==null?void 0:N.cnt)??0)>=3){await Y(o,30);return}if(o.gold_actuel>=5e3){await Y(o,29);return}const{actuel:d}=await qt(i);if(d>=365){await Y(o,28);return}if(d>=180){await Y(o,27);return}if(d>=30){await Y(o,26);return}if(d>=14){await Y(o,25);return}if(d>=7){await Y(o,24);return}const b=_(`SELECT c.element, COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 GROUP BY c.element`,[i]),T={feu:14,eau:15,terre:16,air:17,technologie:18,surnaturel:19,mort:20,vie:21,lumiere:22,tenebres:23},L={feu:4,eau:5,terre:6,air:7,technologie:8,surnaturel:9,mort:10,vie:11,lumiere:12,tenebres:13};for(const g of b)if((g.cnt??0)>=10&&T[g.element]){await Y(o,T[g.element]);return}for(const g of b)if((g.cnt??0)>=5&&L[g.element]){await Y(o,L[g.element]);return}if(o.level_id>=5){await Y(o,3);return}if(o.level_id>=3){await Y(o,2);return}await Y(o,1)}async function ha(i){var j;await v();const o=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!o)return[1];const s=[1];o.level_id>=3&&s.push(2),o.level_id>=5&&s.push(3),o.gold_actuel>=5e3&&s.push(29);const{actuel:d,record:b}=await qt(i),T=Math.max(d,b);T>=7&&s.push(24),T>=14&&s.push(25),T>=30&&s.push(26),T>=180&&s.push(27),T>=365&&s.push(28);const L=_(`SELECT c.element, COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 GROUP BY c.element`,[i]),N={feu:4,eau:5,terre:6,air:7,technologie:8,surnaturel:9,mort:10,vie:11,lumiere:12,tenebres:13},g={feu:14,eau:15,terre:16,air:17,technologie:18,surnaturel:19,mort:20,vie:21,lumiere:22,tenebres:23};for(const $ of L)($.cnt??0)>=5&&N[$.element]&&s.push(N[$.element]),($.cnt??0)>=10&&g[$.element]&&s.push(g[$.element]);return(((j=_(`SELECT COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 AND c.rarete = 'legendaire'`,[i])[0])==null?void 0:j.cnt)??0)>=3&&s.push(30),s}async function Y(i,o){i.titre_id!==o&&(E("UPDATE personnage SET titre_id = $1 WHERE id = $2",[o,i.id]),await I())}async function qa(i,o=[]){return await v(),_(i,o)}async function ga(i,o=[]){await v(),E(i,o),await I()}const La=Object.freeze(Object.defineProperty({__proto__:null,ROUTINE_STATS:Se,STAT_SHOP_PRIX:Rn,_classesRun:ga,_classesSelect:qa,acheterCompetence:ra,acheterItem:xr,acheterStat:Yr,ajouterRecompenseDonjon:ua,allouerStat:la,calculerEtAttribuerTitre:_a,calculerStreak:qt,calculerTitresDebloques:ha,changerMode:pa,changerTitre:Mr,checkDailyPenalties:Kr,checkLevelUp:ca,checkModeCoffres:fa,completerRoutine:kr,completerTache:Qr,createTache:jr,desequiperCompetence:ia,desequiperItem:$r,echouerTache:Jr,equiperCompetence:aa,equiperItem:Gr,gameOver:ye,getCaracteristique:Ur,getCompetences:ea,getCompetencesDonjon:ta,getHistoriqueActivite:Zr,getInventaire:Cr,getLevels:Or,getMagasinInventaire:Br,getModeMultiplier:ht,getPersonnage:Ir,getPersonnageAffinites:da,getPersonnageCompetences:na,getStatsResume:ba,getStuffs:Fr,getTaches:Hr,getTitres:Ar,incrementerLootDonjon:ma,regenMana:zr,renommerPersonnage:Ea,resetPvCombat:oa,supprimerRoutine:Vr,updateManaActuels:Xr,updatePvCombat:sa,utiliserConsommable:Pr,vendreItem:Wr},Symbol.toStringTag,{value:"Module"}));export{Br as A,ea as B,ra as C,xr as D,ba as E,Zr as F,fa as G,Hr as H,ta as I,Qr as J,ca as K,Jr as L,Vr as M,kr as N,ua as O,jr as P,ma as Q,Se as R,Rn as S,sa as T,Xr as U,zr as V,oa as W,Kr as X,La as Y,qa as _,ga as a,Ar as b,_a as c,ha as d,qt as e,Ur as f,Ir as g,Or as h,Cr as i,Fr as j,da as k,Mr as l,Yr as m,pa as n,ye as o,la as p,na as q,Ea as r,Na as s,va as t,Pr as u,$r as v,Gr as w,Wr as x,ia as y,aa as z};

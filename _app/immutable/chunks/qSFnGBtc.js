var hr=Object.defineProperty;var qr=(i,o,c)=>o in i?hr(i,o,{enumerable:!0,configurable:!0,writable:!0,value:c}):i[o]=c;var oe=(i,o,c)=>qr(i,typeof o!="symbol"?o+"":o,c);import{h as bn}from"./NHTZnP7p.js";import{b as gr}from"./CE8uuNwB.js";const _n=[...` 	
\r\f \v\uFEFF`];function Tr(i,o,c){var d=i==null?"":""+i;if(o&&(d=d?d+" "+o:o),c){for(var b of Object.keys(c))if(c[b])d=d?d+" "+b:b;else if(d.length)for(var v=b.length,N=0;(N=d.indexOf(b,N))>=0;){var L=N+v;(N===0||_n.includes(d[N-1]))&&(L===d.length||_n.includes(d[L]))?d=(N===0?"":d.substring(0,N))+d.substring(L+1):N=L}}return d===""?null:d}function La(i,o){return i==null?null:String(i)}function wa(i,o,c,d,b,v){var N=i.__className;if(bn||N!==c||N===void 0){var L=Tr(c,d,v);(!bn||L!==i.getAttribute("class"))&&(L==null?i.removeAttribute("class"):i.className=L),i.__className=c}else if(v&&b!==v)for(var g in v){var l=!!v[g];(b==null||l!==!!b[g])&&i.classList.toggle(g,l)}return v}function Rr(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var qt={exports:{}},hn;function vr(){return hn||(hn=1,(function(i,o){var c=void 0,d=function(b){return c||(c=new Promise(function(v,N){var an,un;var L=typeof b<"u"?b:{},g=L.onAbort;L.onAbort=function(e){N(new Error(e)),g&&g(e)},L.postRun=L.postRun||[],L.postRun.push(function(){v(L)}),i=void 0;var l;l||(l=typeof L<"u"?L:{});var V=!!globalThis.window,U=!!globalThis.WorkerGlobalScope;l.onRuntimeInitialized=function(){function e(u,p){switch(typeof p){case"boolean":br(u,p?1:0);break;case"number":pr(u,p);break;case"string":Er(u,p,-1,-1);break;case"object":if(p===null)dn(u);else if(p.length!=null){var h=Ve(p.length);P.set(p,h),fr(u,h,p.length,-1),Ie(h)}else ze(u,"Wrong API use : tried to return a value of an unknown type ("+p+").",-1);break;default:dn(u)}}function t(u,p){for(var h=[],q=0;q<u;q+=1){var y=ne(p+4*q,"i32"),O=sr(y);if(O===1||O===2)y=dr(y);else if(O===3)y=lr(y);else if(O===4){O=y,y=cr(O),O=mr(O);for(var K=new Uint8Array(y),Y=0;Y<y;Y+=1)K[Y]=P[O+Y];y=K}else y=null;h.push(y)}return h}function n(u,p){this.Qa=u,this.db=p,this.Oa=1,this.yb=[]}function r(u,p){if(this.db=p,this.ob=je(u),this.ob===null)throw Error("Unable to allocate memory for the SQL string");this.ub=this.ob,this.gb=this.Fb=null}function a(u){if(this.filename="dbfile_"+(4294967295*Math.random()>>>0),u!=null){var p=this.filename,h="/",q=p;if(h&&(h=typeof h=="string"?h:it(h),q=p?nt(h+"/"+p):h),p=Ft(!0,!0),q=Gn(q,p),u){if(typeof u=="string"){h=Array(u.length);for(var y=0,O=u.length;y<O;++y)h[y]=u.charCodeAt(y);u=h}xe(q,p|146),h=qe(q,577),Kt(h,u,0,u.length,0),mt(h),xe(q,p)}}this.handleError(T(this.filename,s)),this.db=ne(s,"i32"),En(this.db),this.pb={},this.Sa={}}var s=pe(4),m=l.cwrap,T=m("sqlite3_open","number",["string","number"]),A=m("sqlite3_close_v2","number",["number"]),S=m("sqlite3_exec","number",["number","string","number","number","number"]),F=m("sqlite3_changes","number",["number"]),$=m("sqlite3_prepare_v2","number",["number","string","number","number","number"]),on=m("sqlite3_sql","string",["number"]),Vn=m("sqlite3_normalized_sql","string",["number"]),sn=m("sqlite3_prepare_v2","number",["number","number","number","number","number"]),kn=m("sqlite3_bind_text","number",["number","number","number","number","number"]),cn=m("sqlite3_bind_blob","number",["number","number","number","number","number"]),Yn=m("sqlite3_bind_double","number",["number","number","number"]),Xn=m("sqlite3_bind_int","number",["number","number","number"]),zn=m("sqlite3_bind_parameter_index","number",["number","string"]),Kn=m("sqlite3_step","number",["number"]),Qn=m("sqlite3_errmsg","string",["number"]),Jn=m("sqlite3_column_count","number",["number"]),Zn=m("sqlite3_data_count","number",["number"]),er=m("sqlite3_column_double","number",["number","number"]),ln=m("sqlite3_column_text","string",["number","number"]),tr=m("sqlite3_column_blob","number",["number","number"]),nr=m("sqlite3_column_bytes","number",["number","number"]),rr=m("sqlite3_column_type","number",["number","number"]),ar=m("sqlite3_column_name","string",["number","number"]),ir=m("sqlite3_reset","number",["number"]),ur=m("sqlite3_clear_bindings","number",["number"]),or=m("sqlite3_finalize","number",["number"]),mn=m("sqlite3_create_function_v2","number","number string number number number number number number number".split(" ")),sr=m("sqlite3_value_type","number",["number"]),cr=m("sqlite3_value_bytes","number",["number"]),lr=m("sqlite3_value_text","string",["number"]),mr=m("sqlite3_value_blob","number",["number"]),dr=m("sqlite3_value_double","number",["number"]),pr=m("sqlite3_result_double","",["number","number"]),dn=m("sqlite3_result_null","",["number"]),Er=m("sqlite3_result_text","",["number","string","number","number"]),fr=m("sqlite3_result_blob","",["number","number","number","number"]),br=m("sqlite3_result_int","",["number","number"]),ze=m("sqlite3_result_error","",["number","string","number"]),pn=m("sqlite3_aggregate_context","number",["number","number"]),En=m("RegisterExtensionFunctions","number",["number"]),fn=m("sqlite3_update_hook","number",["number","number","number"]);n.prototype.bind=function(u){if(!this.Qa)throw"Statement closed";return this.reset(),Array.isArray(u)?this.Wb(u):u!=null&&typeof u=="object"?this.Xb(u):!0},n.prototype.step=function(){if(!this.Qa)throw"Statement closed";this.Oa=1;var u=Kn(this.Qa);switch(u){case 100:return!0;case 101:return!1;default:throw this.db.handleError(u)}},n.prototype.Pb=function(u){return u==null&&(u=this.Oa,this.Oa+=1),er(this.Qa,u)},n.prototype.hc=function(u){if(u==null&&(u=this.Oa,this.Oa+=1),u=ln(this.Qa,u),typeof BigInt!="function")throw Error("BigInt is not supported");return BigInt(u)},n.prototype.mc=function(u){return u==null&&(u=this.Oa,this.Oa+=1),ln(this.Qa,u)},n.prototype.getBlob=function(u){u==null&&(u=this.Oa,this.Oa+=1);var p=nr(this.Qa,u);u=tr(this.Qa,u);for(var h=new Uint8Array(p),q=0;q<p;q+=1)h[q]=P[u+q];return h},n.prototype.get=function(u,p){p=p||{},u!=null&&this.bind(u)&&this.step(),u=[];for(var h=Zn(this.Qa),q=0;q<h;q+=1)switch(rr(this.Qa,q)){case 1:var y=p.useBigInt?this.hc(q):this.Pb(q);u.push(y);break;case 2:u.push(this.Pb(q));break;case 3:u.push(this.mc(q));break;case 4:u.push(this.getBlob(q));break;default:u.push(null)}return u},n.prototype.Db=function(){for(var u=[],p=Jn(this.Qa),h=0;h<p;h+=1)u.push(ar(this.Qa,h));return u},n.prototype.Ob=function(u,p){u=this.get(u,p),p=this.Db();for(var h={},q=0;q<p.length;q+=1)h[p[q]]=u[q];return h},n.prototype.lc=function(){return on(this.Qa)},n.prototype.ic=function(){return Vn(this.Qa)},n.prototype.Jb=function(u){return u!=null&&this.bind(u),this.step(),this.reset()},n.prototype.Lb=function(u,p){p==null&&(p=this.Oa,this.Oa+=1),u=je(u),this.yb.push(u),this.db.handleError(kn(this.Qa,p,u,-1,0))},n.prototype.Vb=function(u,p){p==null&&(p=this.Oa,this.Oa+=1);var h=Ve(u.length);P.set(u,h),this.yb.push(h),this.db.handleError(cn(this.Qa,p,h,u.length,0))},n.prototype.Kb=function(u,p){p==null&&(p=this.Oa,this.Oa+=1),this.db.handleError((u===(u|0)?Xn:Yn)(this.Qa,p,u))},n.prototype.Yb=function(u){u==null&&(u=this.Oa,this.Oa+=1),cn(this.Qa,u,0,0,0)},n.prototype.Mb=function(u,p){switch(p==null&&(p=this.Oa,this.Oa+=1),typeof u){case"string":this.Lb(u,p);return;case"number":this.Kb(u,p);return;case"bigint":this.Lb(u.toString(),p);return;case"boolean":this.Kb(u+0,p);return;case"object":if(u===null){this.Yb(p);return}if(u.length!=null){this.Vb(u,p);return}}throw"Wrong API use : tried to bind a value of an unknown type ("+u+")."},n.prototype.Xb=function(u){var p=this;return Object.keys(u).forEach(function(h){var q=zn(p.Qa,h);q!==0&&p.Mb(u[h],q)}),!0},n.prototype.Wb=function(u){for(var p=0;p<u.length;p+=1)this.Mb(u[p],p+1);return!0},n.prototype.reset=function(){return this.Cb(),ur(this.Qa)===0&&ir(this.Qa)===0},n.prototype.Cb=function(){for(var u;(u=this.yb.pop())!==void 0;)Ie(u)},n.prototype.cb=function(){this.Cb();var u=or(this.Qa)===0;return delete this.db.pb[this.Qa],this.Qa=0,u},r.prototype.next=function(){if(this.ob===null)return{done:!0};if(this.gb!==null&&(this.gb.cb(),this.gb=null),!this.db.db)throw this.Ab(),Error("Database closed");var u=Ye(),p=pe(4);Le(s),Le(p);try{this.db.handleError(sn(this.db.db,this.ub,-1,s,p)),this.ub=ne(p,"i32");var h=ne(s,"i32");return h===0?(this.Ab(),{done:!0}):(this.gb=new n(h,this.db),this.db.pb[h]=this.gb,{value:this.gb,done:!1})}catch(q){throw this.Fb=G(this.ub),this.Ab(),q}finally{ke(u)}},r.prototype.Ab=function(){Ie(this.ob),this.ob=null},r.prototype.jc=function(){return this.Fb!==null?this.Fb:G(this.ub)},typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"&&(r.prototype[Symbol.iterator]=function(){return this}),a.prototype.Jb=function(u,p){if(!this.db)throw"Database closed";if(p){u=this.Gb(u,p);try{u.step()}finally{u.cb()}}else this.handleError(S(this.db,u,0,0,s));return this},a.prototype.exec=function(u,p,h){if(!this.db)throw"Database closed";var q=null,y=null,O=null;try{O=y=je(u);var K=pe(4);for(u=[];ne(O,"i8")!==0;){Le(s),Le(K),this.handleError(sn(this.db,O,-1,s,K));var Y=ne(s,"i32");if(O=ne(K,"i32"),Y!==0){var j=null;for(q=new n(Y,this),p!=null&&q.bind(p);q.step();)j===null&&(j={columns:q.Db(),values:[]},u.push(j)),j.values.push(q.get(null,h));q.cb()}}return u}catch(Q){throw q&&q.cb(),Q}finally{y&&Ie(y)}},a.prototype.ec=function(u,p,h,q,y){typeof p=="function"&&(q=h,h=p,p=void 0),u=this.Gb(u,p);try{for(;u.step();)h(u.Ob(null,y))}finally{u.cb()}if(typeof q=="function")return q()},a.prototype.Gb=function(u,p){if(Le(s),this.handleError($(this.db,u,-1,s,0)),u=ne(s,"i32"),u===0)throw"Nothing to prepare";var h=new n(u,this);return p!=null&&h.bind(p),this.pb[u]=h},a.prototype.pc=function(u){return new r(u,this)},a.prototype.fc=function(){Object.values(this.pb).forEach(function(p){p.cb()}),Object.values(this.Sa).forEach(ie),this.Sa={},this.handleError(A(this.db));var u=Pn(this.filename);return this.handleError(T(this.filename,s)),this.db=ne(s,"i32"),En(this.db),u},a.prototype.close=function(){this.db!==null&&(Object.values(this.pb).forEach(function(u){u.cb()}),Object.values(this.Sa).forEach(ie),this.Sa={},this.fb&&(ie(this.fb),this.fb=void 0),this.handleError(A(this.db)),Vt("/"+this.filename),this.db=null)},a.prototype.handleError=function(u){if(u===0)return null;throw u=Qn(this.db),Error(u)},a.prototype.kc=function(){return F(this.db)},a.prototype.bc=function(u,p){Object.prototype.hasOwnProperty.call(this.Sa,u)&&(ie(this.Sa[u]),delete this.Sa[u]);var h=ye(function(q,y,O){y=t(y,O);try{var K=p.apply(null,y)}catch(Y){ze(q,Y,-1);return}e(q,K)},"viii");return this.Sa[u]=h,this.handleError(mn(this.db,u,p.length,1,0,h,0,0,0)),this},a.prototype.ac=function(u,p){var h=p.init||function(){return null},q=p.finalize||function(j){return j},y=p.step;if(!y)throw"An aggregate function must have a step function in "+u;var O={};Object.hasOwnProperty.call(this.Sa,u)&&(ie(this.Sa[u]),delete this.Sa[u]),p=u+"__finalize",Object.hasOwnProperty.call(this.Sa,p)&&(ie(this.Sa[p]),delete this.Sa[p]);var K=ye(function(j,Q,ht){var Ee=pn(j,1);Object.hasOwnProperty.call(O,Ee)||(O[Ee]=h()),Q=t(Q,ht),Q=[O[Ee]].concat(Q);try{O[Ee]=y.apply(null,Q)}catch(_r){delete O[Ee],ze(j,_r,-1)}},"viii"),Y=ye(function(j){var Q=pn(j,1);try{var ht=q(O[Q])}catch(Ee){delete O[Q],ze(j,Ee,-1);return}e(j,ht),delete O[Q]},"vi");return this.Sa[u]=K,this.Sa[p]=Y,this.handleError(mn(this.db,u,y.length-1,1,0,0,K,Y,0)),this},a.prototype.vc=function(u){return this.fb&&(fn(this.db,0,0),ie(this.fb),this.fb=void 0),u?(this.fb=ye(function(p,h,q,y,O){switch(h){case 18:p="insert";break;case 23:p="update";break;case 9:p="delete";break;default:throw"unknown operationCode in updateHook callback: "+h}if(q=G(q),y=G(y),O>Number.MAX_SAFE_INTEGER)throw"rowId too big to fit inside a Number";u(p,q,y,Number(O))},"viiiij"),fn(this.db,this.fb,0),this):this},n.prototype.bind=n.prototype.bind,n.prototype.step=n.prototype.step,n.prototype.get=n.prototype.get,n.prototype.getColumnNames=n.prototype.Db,n.prototype.getAsObject=n.prototype.Ob,n.prototype.getSQL=n.prototype.lc,n.prototype.getNormalizedSQL=n.prototype.ic,n.prototype.run=n.prototype.Jb,n.prototype.reset=n.prototype.reset,n.prototype.freemem=n.prototype.Cb,n.prototype.free=n.prototype.cb,r.prototype.next=r.prototype.next,r.prototype.getRemainingSQL=r.prototype.jc,a.prototype.run=a.prototype.Jb,a.prototype.exec=a.prototype.exec,a.prototype.each=a.prototype.ec,a.prototype.prepare=a.prototype.Gb,a.prototype.iterateStatements=a.prototype.pc,a.prototype.export=a.prototype.fc,a.prototype.close=a.prototype.close,a.prototype.handleError=a.prototype.handleError,a.prototype.getRowsModified=a.prototype.kc,a.prototype.create_function=a.prototype.bc,a.prototype.create_aggregate=a.prototype.ac,a.prototype.updateHook=a.prototype.vc,l.Database=a};var H="./this.program",fe=(un=(an=globalThis.document)==null?void 0:an.currentScript)==null?void 0:un.src;U&&(fe=self.location.href);var ge="",te,Ke;if(V||U){try{ge=new URL(".",fe).href}catch{}U&&(Ke=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),te=async e=>{if(e=await fetch(e,{credentials:"same-origin"}),e.ok)return e.arrayBuffer();throw Error(e.status+" : "+e.url)}}var Qe=console.log.bind(console),se=console.error.bind(console),Te,Me=!1,Je,P,x,Re,D,M,Ze,et,z;function vt(){var e=Xe.buffer;P=new Int8Array(e),Re=new Int16Array(e),x=new Uint8Array(e),D=new Int32Array(e),M=new Uint32Array(e),Ze=new Float32Array(e),et=new Float64Array(e),z=new BigInt64Array(e),new BigUint64Array(e)}function ve(e){var t;throw(t=l.onAbort)==null||t.call(l,e),e="Aborted("+e+")",se(e),Me=!0,new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info.")}var tt;async function vn(e){if(!Te)try{var t=await te(e);return new Uint8Array(t)}catch{}if(e==tt&&Te)e=new Uint8Array(Te);else if(Ke)e=Ke(e);else throw"both async and sync fetching of the wasm failed";return e}async function Nn(e,t){try{var n=await vn(e);return await WebAssembly.instantiate(n,t)}catch(r){se(`failed to asynchronously prepare wasm: ${r}`),ve(r)}}async function Ln(e){var t=tt;if(!Te)try{var n=fetch(t,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(n,e)}catch(r){se(`wasm streaming compile failed: ${r}`),se("falling back to ArrayBuffer instantiation")}return Nn(t,e)}class Nt{constructor(t){oe(this,"name","ExitStatus");this.message=`Program terminated with exit(${t})`,this.status=t}}var Lt=e=>{for(;0<e.length;)e.shift()(l)},wt=[],St=[],wn=()=>{var e=l.preRun.shift();St.push(e)},ce=0,Ne=null;function ne(e,t="i8"){switch(t.endsWith("*")&&(t="*"),t){case"i1":return P[e];case"i8":return P[e];case"i16":return Re[e>>1];case"i32":return D[e>>2];case"i64":return z[e>>3];case"float":return Ze[e>>2];case"double":return et[e>>3];case"*":return M[e>>2];default:ve(`invalid type for getValue: ${t}`)}}var Ce=!0;function Le(e){var t="i32";switch(t.endsWith("*")&&(t="*"),t){case"i1":P[e]=0;break;case"i8":P[e]=0;break;case"i16":Re[e>>1]=0;break;case"i32":D[e>>2]=0;break;case"i64":z[e>>3]=BigInt(0);break;case"float":Ze[e>>2]=0;break;case"double":et[e>>3]=0;break;case"*":M[e>>2]=0;break;default:ve(`invalid type for setValue: ${t}`)}}var yt=new TextDecoder,It=(e,t,n,r)=>{if(n=t+n,r)return n;for(;e[t]&&!(t>=n);)++t;return t},G=(e,t,n)=>e?yt.decode(x.subarray(e,It(x,e,t,n))):"",Ut=(e,t)=>{for(var n=0,r=e.length-1;0<=r;r--){var a=e[r];a==="."?e.splice(r,1):a===".."?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n;n--)e.unshift("..");return e},nt=e=>{var t=e.charAt(0)==="/",n=e.slice(-1)==="/";return(e=Ut(e.split("/").filter(r=>!!r),!t).join("/"))||t||(e="."),e&&n&&(e+="/"),(t?"/":"")+e},Ot=e=>{var t=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);return e=t[0],t=t[1],!e&&!t?".":(t&&(t=t.slice(0,-1)),e+t)},Fe=e=>e&&e.match(/([^\/]+|\/)\/*$/)[1],Sn=()=>e=>crypto.getRandomValues(e),At=e=>{(At=Sn())(e)},yn=(...e)=>{for(var t="",n=!1,r=e.length-1;-1<=r&&!n;r--){if(n=0<=r?e[r]:"/",typeof n!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!n)return"";t=n+"/"+t,n=n.charAt(0)==="/"}return t=Ut(t.split("/").filter(a=>!!a),!n).join("/"),(n?"/":"")+t||"."},De=e=>{var t=It(e,0);return yt.decode(e.buffer?e.subarray(0,t):new Uint8Array(e.slice(0,t)))},rt=[],be=e=>{for(var t=0,n=0;n<e.length;++n){var r=e.charCodeAt(n);127>=r?t++:2047>=r?t+=2:55296<=r&&57343>=r?(t+=4,++n):t+=3}return t},J=(e,t,n,r)=>{if(!(0<r))return 0;var a=n;r=n+r-1;for(var s=0;s<e.length;++s){var m=e.codePointAt(s);if(127>=m){if(n>=r)break;t[n++]=m}else if(2047>=m){if(n+1>=r)break;t[n++]=192|m>>6,t[n++]=128|m&63}else if(65535>=m){if(n+2>=r)break;t[n++]=224|m>>12,t[n++]=128|m>>6&63,t[n++]=128|m&63}else{if(n+3>=r)break;t[n++]=240|m>>18,t[n++]=128|m>>12&63,t[n++]=128|m>>6&63,t[n++]=128|m&63,s++}}return t[n]=0,n-a},Mt=[];function Ct(e,t){Mt[e]={input:[],output:[],kb:t},ct(e,In)}var In={open(e){var t=Mt[e.node.nb];if(!t)throw new E(43);e.Va=t,e.seekable=!1},close(e){e.Va.kb.lb(e.Va)},lb(e){e.Va.kb.lb(e.Va)},read(e,t,n,r){if(!e.Va||!e.Va.kb.Qb)throw new E(60);for(var a=0,s=0;s<r;s++){try{var m=e.Va.kb.Qb(e.Va)}catch{throw new E(29)}if(m===void 0&&a===0)throw new E(6);if(m==null)break;a++,t[n+s]=m}return a&&(e.node.$a=Date.now()),a},write(e,t,n,r){if(!e.Va||!e.Va.kb.Hb)throw new E(60);try{for(var a=0;a<r;a++)e.Va.kb.Hb(e.Va,t[n+a])}catch{throw new E(29)}return r&&(e.node.Ua=e.node.Ta=Date.now()),a}},Un={Qb(){var n;e:{if(!rt.length){var e=null;if((n=globalThis.window)!=null&&n.prompt&&(e=window.prompt("Input: "),e!==null&&(e+=`
`)),!e){var t=null;break e}t=Array(be(e)+1),e=J(e,t,0,t.length),t.length=e,rt=t}t=rt.shift()}return t},Hb(e,t){t===null||t===10?(Qe(De(e.output)),e.output=[]):t!=0&&e.output.push(t)},lb(e){var t;0<((t=e.output)==null?void 0:t.length)&&(Qe(De(e.output)),e.output=[])},Dc(){return{yc:25856,Ac:5,xc:191,zc:35387,wc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Ec(){return 0},Fc(){return[24,80]}},On={Hb(e,t){t===null||t===10?(se(De(e.output)),e.output=[]):t!=0&&e.output.push(t)},lb(e){var t;0<((t=e.output)==null?void 0:t.length)&&(se(De(e.output)),e.output=[])}},w={Za:null,ab(){return w.createNode(null,"/",16895,0)},createNode(e,t,n,r){if((n&61440)===24576||(n&61440)===4096)throw new E(63);return w.Za||(w.Za={dir:{node:{Wa:w.La.Wa,Xa:w.La.Xa,mb:w.La.mb,rb:w.La.rb,Tb:w.La.Tb,xb:w.La.xb,vb:w.La.vb,Ib:w.La.Ib,wb:w.La.wb},stream:{Ya:w.Ma.Ya}},file:{node:{Wa:w.La.Wa,Xa:w.La.Xa},stream:{Ya:w.Ma.Ya,read:w.Ma.read,write:w.Ma.write,sb:w.Ma.sb,tb:w.Ma.tb}},link:{node:{Wa:w.La.Wa,Xa:w.La.Xa,eb:w.La.eb},stream:{}},Nb:{node:{Wa:w.La.Wa,Xa:w.La.Xa},stream:Dn}}),n=$t(e,t,n,r),B(n.mode)?(n.La=w.Za.dir.node,n.Ma=w.Za.dir.stream,n.Na={}):(n.mode&61440)===32768?(n.La=w.Za.file.node,n.Ma=w.Za.file.stream,n.Ra=0,n.Na=null):(n.mode&61440)===40960?(n.La=w.Za.link.node,n.Ma=w.Za.link.stream):(n.mode&61440)===8192&&(n.La=w.Za.Nb.node,n.Ma=w.Za.Nb.stream),n.$a=n.Ua=n.Ta=Date.now(),e&&(e.Na[t]=n,e.$a=e.Ua=e.Ta=n.$a),n},Cc(e){return e.Na?e.Na.subarray?e.Na.subarray(0,e.Ra):new Uint8Array(e.Na):new Uint8Array(0)},La:{Wa(e){var t={};return t.cc=(e.mode&61440)===8192?e.id:1,t.oc=e.id,t.mode=e.mode,t.rc=1,t.uid=0,t.nc=0,t.nb=e.nb,B(e.mode)?t.size=4096:(e.mode&61440)===32768?t.size=e.Ra:(e.mode&61440)===40960?t.size=e.link.length:t.size=0,t.$a=new Date(e.$a),t.Ua=new Date(e.Ua),t.Ta=new Date(e.Ta),t.Zb=4096,t.$b=Math.ceil(t.size/t.Zb),t},Xa(e,t){for(var n of["mode","atime","mtime","ctime"])t[n]!=null&&(e[n]=t[n]);t.size!==void 0&&(t=t.size,e.Ra!=t&&(t==0?(e.Na=null,e.Ra=0):(n=e.Na,e.Na=new Uint8Array(t),n&&e.Na.set(n.subarray(0,Math.min(t,e.Ra))),e.Ra=t)))},mb(){throw w.zb||(w.zb=new E(44),w.zb.stack="<generic error, no stack>"),w.zb},rb(e,t,n,r){return w.createNode(e,t,n,r)},Tb(e,t,n){try{var r=le(t,n)}catch{}if(r){if(B(e.mode))for(var a in r.Na)throw new E(55);ot(r)}delete e.parent.Na[e.name],t.Na[n]=e,e.name=n,t.Ta=t.Ua=e.parent.Ta=e.parent.Ua=Date.now()},xb(e,t){delete e.Na[t],e.Ta=e.Ua=Date.now()},vb(e,t){var n=le(e,t),r;for(r in n.Na)throw new E(55);delete e.Na[t],e.Ta=e.Ua=Date.now()},Ib(e){return[".","..",...Object.keys(e.Na)]},wb(e,t,n){return e=w.createNode(e,t,41471,0),e.link=n,e},eb(e){if((e.mode&61440)!==40960)throw new E(28);return e.link}},Ma:{read(e,t,n,r,a){var s=e.node.Na;if(a>=e.node.Ra)return 0;if(e=Math.min(e.node.Ra-a,r),8<e&&s.subarray)t.set(s.subarray(a,a+e),n);else for(r=0;r<e;r++)t[n+r]=s[a+r];return e},write(e,t,n,r,a,s){if(t.buffer===P.buffer&&(s=!1),!r)return 0;if(e=e.node,e.Ua=e.Ta=Date.now(),t.subarray&&(!e.Na||e.Na.subarray)){if(s)return e.Na=t.subarray(n,n+r),e.Ra=r;if(e.Ra===0&&a===0)return e.Na=t.slice(n,n+r),e.Ra=r;if(a+r<=e.Ra)return e.Na.set(t.subarray(n,n+r),a),r}s=a+r;var m=e.Na?e.Na.length:0;if(m>=s||(s=Math.max(s,m*(1048576>m?2:1.125)>>>0),m!=0&&(s=Math.max(s,256)),m=e.Na,e.Na=new Uint8Array(s),0<e.Ra&&e.Na.set(m.subarray(0,e.Ra),0)),e.Na.subarray&&t.subarray)e.Na.set(t.subarray(n,n+r),a);else for(s=0;s<r;s++)e.Na[a+s]=t[n+s];return e.Ra=Math.max(e.Ra,a+r),r},Ya(e,t,n){if(n===1?t+=e.position:n===2&&(e.node.mode&61440)===32768&&(t+=e.node.Ra),0>t)throw new E(28);return t},sb(e,t,n,r,a){if((e.node.mode&61440)!==32768)throw new E(43);if(e=e.node.Na,a&2||!e||e.buffer!==P.buffer){a=!0,r=65536*Math.ceil(t/65536);var s=nn(65536,r);if(s&&x.fill(0,s,s+r),r=s,!r)throw new E(48);e&&((0<n||n+t<e.length)&&(e.subarray?e=e.subarray(n,n+t):e=Array.prototype.slice.call(e,n,n+t)),P.set(e,r))}else a=!1,r=e.byteOffset;return{tc:r,Ub:a}},tb(e,t,n,r){return w.Ma.write(e,t,0,r,n,!1),0}}},Ft=(e,t)=>{var n=0;return e&&(n|=365),t&&(n|=146),n},at=null,Dt={},_e=[],An=1,re=null,Gt=!1,Pt=!0,E=class{constructor(e){oe(this,"name","ErrnoError");this.Pa=e}},Mn=class{constructor(){oe(this,"qb",{});oe(this,"node",null)}get flags(){return this.qb.flags}set flags(e){this.qb.flags=e}get position(){return this.qb.position}set position(e){this.qb.position=e}},Cn=class{constructor(e,t,n,r){oe(this,"La",{});oe(this,"Ma",{});oe(this,"ib",null);e||(e=this),this.parent=e,this.ab=e.ab,this.id=An++,this.name=t,this.mode=n,this.nb=r,this.$a=this.Ua=this.Ta=Date.now()}get read(){return(this.mode&365)===365}set read(e){e?this.mode|=365:this.mode&=-366}get write(){return(this.mode&146)===146}set write(e){e?this.mode|=146:this.mode&=-147}};function k(e,t={}){if(!e)throw new E(44);t.Bb??(t.Bb=!0),e.charAt(0)==="/"||(e="//"+e);var n=0;e:for(;40>n;n++){e=e.split("/").filter(T=>!!T);for(var r=at,a="/",s=0;s<e.length;s++){var m=s===e.length-1;if(m&&t.parent)break;if(e[s]!==".")if(e[s]==="..")if(a=Ot(a),r===r.parent){e=a+"/"+e.slice(s+1).join("/"),n--;continue e}else r=r.parent;else{a=nt(a+"/"+e[s]);try{r=le(r,e[s])}catch(T){if((T==null?void 0:T.Pa)===44&&m&&t.sc)return{path:a};throw T}if(!r.ib||m&&!t.Bb||(r=r.ib.root),(r.mode&61440)===40960&&(!m||t.hb)){if(!r.La.eb)throw new E(52);r=r.La.eb(r),r.charAt(0)==="/"||(r=Ot(a)+"/"+r),e=r+"/"+e.slice(s+1).join("/");continue e}}}return{path:a,node:r}}throw new E(32)}function it(e){for(var t;;){if(e===e.parent)return e=e.ab.Sb,t?e[e.length-1]!=="/"?`${e}/${t}`:e+t:e;t=t?`${e.name}/${t}`:e.name,e=e.parent}}function ut(e,t){for(var n=0,r=0;r<t.length;r++)n=(n<<5)-n+t.charCodeAt(r)|0;return(e+n>>>0)%re.length}function ot(e){var t=ut(e.parent.id,e.name);if(re[t]===e)re[t]=e.jb;else for(t=re[t];t;){if(t.jb===e){t.jb=e.jb;break}t=t.jb}}function le(e,t){var n=B(e.mode)?(n=he(e,"x"))?n:e.La.mb?0:2:54;if(n)throw new E(n);for(n=re[ut(e.id,t)];n;n=n.jb){var r=n.name;if(n.parent.id===e.id&&r===t)return n}return e.La.mb(e,t)}function $t(e,t,n,r){return e=new Cn(e,t,n,r),t=ut(e.parent.id,e.name),e.jb=re[t],re[t]=e}function B(e){return(e&61440)===16384}function he(e,t){return Pt?0:t.includes("r")&&!(e.mode&292)||t.includes("w")&&!(e.mode&146)||t.includes("x")&&!(e.mode&73)?2:0}function xt(e,t){if(!B(e.mode))return 54;try{return le(e,t),20}catch{}return he(e,"wx")}function Wt(e,t,n){try{var r=le(e,t)}catch(a){return a.Pa}if(e=he(e,"wx"))return e;if(n){if(!B(r.mode))return 54;if(r===r.parent||it(r)==="/")return 10}else if(B(r.mode))return 31;return 0}function Ge(e){if(!e)throw new E(63);return e}function W(e){if(e=_e[e],!e)throw new E(8);return e}function Ht(e,t=-1){if(e=Object.assign(new Mn,e),t==-1)e:{for(t=0;4096>=t;t++)if(!_e[t])break e;throw new E(33)}return e.bb=t,_e[t]=e}function Fn(e,t=-1){var n,r;return e=Ht(e,t),(r=(n=e.Ma)==null?void 0:n.Bc)==null||r.call(n,e),e}function st(e,t,n){var r=e==null?void 0:e.Ma.Xa;e=r?e:t,r??(r=t.La.Xa),Ge(r),r(e,n)}var Dn={open(e){var t,n;e.Ma=Dt[e.node.nb].Ma,(n=(t=e.Ma).open)==null||n.call(t,e)},Ya(){throw new E(70)}};function ct(e,t){Dt[e]={Ma:t}}function Bt(e,t){var n=t==="/";if(n&&at)throw new E(10);if(!n&&t){var r=k(t,{Bb:!1});if(t=r.path,r=r.node,r.ib)throw new E(10);if(!B(r.mode))throw new E(54)}t={type:e,Gc:{},Sb:t,qc:[]},e=e.ab(t),e.ab=t,t.root=e,n?at=e:r&&(r.ib=t,r.ab&&r.ab.qc.push(t))}function Pe(e,t,n){var r=k(e,{parent:!0}).node;if(e=Fe(e),!e)throw new E(28);if(e==="."||e==="..")throw new E(20);var a=xt(r,e);if(a)throw new E(a);if(!r.La.rb)throw new E(63);return r.La.rb(r,e,t,n)}function Gn(e,t=438){return Pe(e,t&4095|32768,0)}function Z(e,t=511){return Pe(e,t&1023|16384,0)}function $e(e,t,n){typeof n>"u"&&(n=t,t=438),Pe(e,t|8192,n)}function lt(e,t){if(!yn(e))throw new E(44);var n=k(t,{parent:!0}).node;if(!n)throw new E(44);t=Fe(t);var r=xt(n,t);if(r)throw new E(r);if(!n.La.wb)throw new E(63);n.La.wb(n,t,e)}function jt(e){var t=k(e,{parent:!0}).node;e=Fe(e);var n=le(t,e),r=Wt(t,e,!0);if(r)throw new E(r);if(!t.La.vb)throw new E(63);if(n.ib)throw new E(10);t.La.vb(t,e),ot(n)}function Vt(e){var t=k(e,{parent:!0}).node;if(!t)throw new E(44);e=Fe(e);var n=le(t,e),r=Wt(t,e,!1);if(r)throw new E(r);if(!t.La.xb)throw new E(63);if(n.ib)throw new E(10);t.La.xb(t,e),ot(n)}function we(e,t){return e=k(e,{hb:!t}).node,Ge(e.La.Wa)(e)}function kt(e,t,n,r){st(e,t,{mode:n&4095|t.mode&-4096,Ta:Date.now(),dc:r})}function xe(e,t){e=typeof e=="string"?k(e,{hb:!0}).node:e,kt(null,e,t)}function Yt(e,t,n){if(B(t.mode))throw new E(31);if((t.mode&61440)!==32768)throw new E(28);var r=he(t,"w");if(r)throw new E(r);st(e,t,{size:n,timestamp:Date.now()})}function qe(e,t,n=438){if(e==="")throw new E(44);if(typeof t=="string"){var r={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[t];if(typeof r>"u")throw Error(`Unknown file open mode: ${t}`);t=r}if(n=t&64?n&4095|32768:0,typeof e=="object")r=e;else{var a=e.endsWith("/"),s=k(e,{hb:!(t&131072),sc:!0});r=s.node,e=s.path}if(s=!1,t&64)if(r){if(t&128)throw new E(20)}else{if(a)throw new E(31);r=Pe(e,n|511,0),s=!0}if(!r)throw new E(44);if((r.mode&61440)===8192&&(t&=-513),t&65536&&!B(r.mode))throw new E(54);if(!s&&(r?(r.mode&61440)===40960?a=32:(a=["r","w","rw"][t&3],t&512&&(a+="w"),a=B(r.mode)&&(a!=="r"||t&576)?31:he(r,a)):a=44,a))throw new E(a);return t&512&&!s&&(a=r,a=typeof a=="string"?k(a,{hb:!0}).node:a,Yt(null,a,0)),t=Ht({node:r,path:it(r),flags:t&-131713,seekable:!0,position:0,Ma:r.Ma,uc:[],error:!1}),t.Ma.open&&t.Ma.open(t),s&&xe(r,n&511),t}function mt(e){if(e.bb===null)throw new E(8);e.Eb&&(e.Eb=null);try{e.Ma.close&&e.Ma.close(e)}catch(t){throw t}finally{_e[e.bb]=null}e.bb=null}function Xt(e,t,n){if(e.bb===null)throw new E(8);if(!e.seekable||!e.Ma.Ya)throw new E(70);if(n!=0&&n!=1&&n!=2)throw new E(28);e.position=e.Ma.Ya(e,t,n),e.uc=[]}function zt(e,t,n,r,a){if(0>r||0>a)throw new E(28);if(e.bb===null)throw new E(8);if((e.flags&2097155)===1)throw new E(8);if(B(e.node.mode))throw new E(31);if(!e.Ma.read)throw new E(28);var s=typeof a<"u";if(!s)a=e.position;else if(!e.seekable)throw new E(70);return t=e.Ma.read(e,t,n,r,a),s||(e.position+=t),t}function Kt(e,t,n,r,a){if(0>r||0>a)throw new E(28);if(e.bb===null)throw new E(8);if((e.flags&2097155)===0)throw new E(8);if(B(e.node.mode))throw new E(31);if(!e.Ma.write)throw new E(28);e.seekable&&e.flags&1024&&Xt(e,0,2);var s=typeof a<"u";if(!s)a=e.position;else if(!e.seekable)throw new E(70);return t=e.Ma.write(e,t,n,r,a,void 0),s||(e.position+=t),t}function Pn(e){var t=t||0;t=qe(e,t),e=we(e).size;var n=new Uint8Array(e);return zt(t,n,0,e,0),mt(t),n}function ae(e,t,n){e=nt("/dev/"+e);var r=Ft(!!t,!!n);ae.Rb??(ae.Rb=64);var a=ae.Rb++<<8|0;ct(a,{open(s){s.seekable=!1},close(){var s;(s=n==null?void 0:n.buffer)!=null&&s.length&&n(10)},read(s,m,T,A){for(var S=0,F=0;F<A;F++){try{var $=t()}catch{throw new E(29)}if($===void 0&&S===0)throw new E(6);if($==null)break;S++,m[T+F]=$}return S&&(s.node.$a=Date.now()),S},write(s,m,T,A){for(var S=0;S<A;S++)try{n(m[T+S])}catch{throw new E(29)}return A&&(s.node.Ua=s.node.Ta=Date.now()),S}}),$e(e,r,a)}var C={};function me(e,t,n){if(t.charAt(0)==="/")return t;if(e=e===-100?"/":W(e).path,t.length==0){if(!n)throw new E(44);return e}return e+"/"+t}function We(e,t){M[e>>2]=t.cc,M[e+4>>2]=t.mode,M[e+8>>2]=t.rc,M[e+12>>2]=t.uid,M[e+16>>2]=t.nc,M[e+20>>2]=t.nb,z[e+24>>3]=BigInt(t.size),D[e+32>>2]=4096,D[e+36>>2]=t.$b;var n=t.$a.getTime(),r=t.Ua.getTime(),a=t.Ta.getTime();return z[e+40>>3]=BigInt(Math.floor(n/1e3)),M[e+48>>2]=n%1e3*1e6,z[e+56>>3]=BigInt(Math.floor(r/1e3)),M[e+64>>2]=r%1e3*1e6,z[e+72>>3]=BigInt(Math.floor(a/1e3)),M[e+80>>2]=a%1e3*1e6,z[e+88>>3]=BigInt(t.oc),0}var He=void 0,Be=()=>{var e=D[+He>>2];return He+=4,e},dt=0,$n=[0,31,60,91,121,152,182,213,244,274,305,335],xn=[0,31,59,90,120,151,181,212,243,273,304,334],Se={},Qt=e=>{if(!(e instanceof Nt||e=="unwind"))throw e},Jt=e=>{var t;throw Je=e,Ce||0<dt||((t=l.onExit)==null||t.call(l,e),Me=!0),new Nt(e)},Wn=e=>{if(!Me)try{e()}catch(t){Qt(t)}finally{if(!(Ce||0<dt))try{Je=e=Je,Jt(e)}catch(t){Qt(t)}}},pt={},Zt=()=>{var r;if(!Et){var e={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((r=globalThis.navigator)==null?void 0:r.language)??"C").replace("-","_")+".UTF-8",_:H||"./this.program"},t;for(t in pt)pt[t]===void 0?delete e[t]:e[t]=pt[t];var n=[];for(t in e)n.push(`${t}=${e[t]}`);Et=n}return Et},Et,Hn=(e,t,n,r)=>{var a={string:S=>{var F=0;if(S!=null&&S!==0){F=be(S)+1;var $=pe(F);J(S,x,$,F),F=$}return F},array:S=>{var F=pe(S.length);return P.set(S,F),F}};e=l["_"+e];var s=[],m=0;if(r)for(var T=0;T<r.length;T++){var A=a[n[T]];A?(m===0&&(m=Ye()),s[T]=A(r[T])):s[T]=r[T]}return n=e(...s),n=(function(S){return m!==0&&ke(m),t==="string"?G(S):t==="boolean"?!!S:S})(n)},je=e=>{var t=be(e)+1,n=Ve(t);return n&&J(e,x,n,t),n},de,ft=[],ie=e=>{de.delete(ue.get(e)),ue.set(e,null),ft.push(e)},en=e=>{const t=e.length;return[t%128|128,t>>7,...e]},Bn={i:127,p:127,j:126,f:125,d:124,e:111},tn=e=>en(Array.from(e,t=>Bn[t])),ye=(e,t)=>{if(!de){de=new WeakMap;var n=ue.length;if(de)for(var r=0;r<0+n;r++){var a=ue.get(r);a&&de.set(a,r)}}if(n=de.get(e)||0)return n;n=ft.length?ft.pop():ue.grow(1);try{ue.set(n,e)}catch(s){if(!(s instanceof TypeError))throw s;t=Uint8Array.of(0,97,115,109,1,0,0,0,1,...en([1,96,...tn(t.slice(1)),...tn(t[0]==="v"?"":t[0])]),2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),t=new WebAssembly.Module(t),t=new WebAssembly.Instance(t,{e:{f:e}}).exports.f,ue.set(n,t)}return de.set(e,n),n};if(re=Array(4096),Bt(w,"/"),Z("/tmp"),Z("/home"),Z("/home/web_user"),(function(){Z("/dev"),ct(259,{read:()=>0,write:(r,a,s,m)=>m,Ya:()=>0}),$e("/dev/null",259),Ct(1280,Un),Ct(1536,On),$e("/dev/tty",1280),$e("/dev/tty1",1536);var e=new Uint8Array(1024),t=0,n=()=>(t===0&&(At(e),t=e.byteLength),e[--t]);ae("random",n),ae("urandom",n),Z("/dev/shm"),Z("/dev/shm/tmp")})(),(function(){Z("/proc");var e=Z("/proc/self");Z("/proc/self/fd"),Bt({ab(){var t=$t(e,"fd",16895,73);return t.Ma={Ya:w.Ma.Ya},t.La={mb(n,r){n=+r;var a=W(n);return n={parent:null,ab:{Sb:"fake"},La:{eb:()=>a.path},id:n+1},n.parent=n},Ib(){return Array.from(_e.entries()).filter(([,n])=>n).map(([n])=>n.toString())}},t}},"/proc/self/fd")})(),l.noExitRuntime&&(Ce=l.noExitRuntime),l.print&&(Qe=l.print),l.printErr&&(se=l.printErr),l.wasmBinary&&(Te=l.wasmBinary),l.thisProgram&&(H=l.thisProgram),l.preInit)for(typeof l.preInit=="function"&&(l.preInit=[l.preInit]);0<l.preInit.length;)l.preInit.shift()();l.stackSave=()=>Ye(),l.stackRestore=e=>ke(e),l.stackAlloc=e=>pe(e),l.cwrap=(e,t,n,r)=>{var a=!n||n.every(s=>s==="number"||s==="boolean");return t!=="string"&&a&&!r?l["_"+e]:(...s)=>Hn(e,t,n,s)},l.addFunction=ye,l.removeFunction=ie,l.UTF8ToString=G,l.stringToNewUTF8=je,l.writeArrayToMemory=(e,t)=>{P.set(e,t)};var Ve,Ie,nn,rn,ke,pe,Ye,Xe,ue,jn={a:(e,t,n,r)=>ve(`Assertion failed: ${G(e)}, at: `+[t?G(t):"unknown filename",n,r?G(r):"unknown function"]),i:function(e,t){try{return e=G(e),xe(e,t),0}catch(n){if(typeof C>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},L:function(e,t,n){try{if(t=G(t),t=me(e,t),n&-8)return-28;var r=k(t,{hb:!0}).node;return r?(e="",n&4&&(e+="r"),n&2&&(e+="w"),n&1&&(e+="x"),e&&he(r,e)?-2:0):-44}catch(a){if(typeof C>"u"||a.name!=="ErrnoError")throw a;return-a.Pa}},j:function(e,t){try{var n=W(e);return kt(n,n.node,t,!1),0}catch(r){if(typeof C>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},h:function(e){try{var t=W(e);return st(t,t.node,{timestamp:Date.now(),dc:!1}),0}catch(n){if(typeof C>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},b:function(e,t,n){He=n;try{var r=W(e);switch(t){case 0:var a=Be();if(0>a)break;for(;_e[a];)a++;return Fn(r,a).bb;case 1:case 2:return 0;case 3:return r.flags;case 4:return a=Be(),r.flags|=a,0;case 12:return a=Be(),Re[a+0>>1]=2,0;case 13:case 14:return 0}return-28}catch(s){if(typeof C>"u"||s.name!=="ErrnoError")throw s;return-s.Pa}},g:function(e,t){try{var n=W(e),r=n.node,a=n.Ma.Wa;e=a?n:r,a??(a=r.La.Wa),Ge(a);var s=a(e);return We(t,s)}catch(m){if(typeof C>"u"||m.name!=="ErrnoError")throw m;return-m.Pa}},H:function(e,t){t=-9007199254740992>t||9007199254740992<t?NaN:Number(t);try{if(isNaN(t))return-61;var n=W(e);if(0>t||(n.flags&2097155)===0)throw new E(28);return Yt(n,n.node,t),0}catch(r){if(typeof C>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},G:function(e,t){try{if(t===0)return-28;var n=be("/")+1;return t<n?-68:(J("/",x,e,t),n)}catch(r){if(typeof C>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},K:function(e,t){try{return e=G(e),We(t,we(e,!0))}catch(n){if(typeof C>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},C:function(e,t,n){try{return t=G(t),t=me(e,t),Z(t,n),0}catch(r){if(typeof C>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},J:function(e,t,n,r){try{t=G(t);var a=r&256;return t=me(e,t,r&4096),We(n,a?we(t,!0):we(t))}catch(s){if(typeof C>"u"||s.name!=="ErrnoError")throw s;return-s.Pa}},x:function(e,t,n,r){He=r;try{t=G(t),t=me(e,t);var a=r?Be():0;return qe(t,n,a).bb}catch(s){if(typeof C>"u"||s.name!=="ErrnoError")throw s;return-s.Pa}},v:function(e,t,n,r){try{if(t=G(t),t=me(e,t),0>=r)return-28;var a=k(t).node;if(!a)throw new E(44);if(!a.La.eb)throw new E(28);var s=a.La.eb(a),m=Math.min(r,be(s)),T=P[n+m];return J(s,x,n,r+1),P[n+m]=T,m}catch(A){if(typeof C>"u"||A.name!=="ErrnoError")throw A;return-A.Pa}},u:function(e){try{return e=G(e),jt(e),0}catch(t){if(typeof C>"u"||t.name!=="ErrnoError")throw t;return-t.Pa}},f:function(e,t){try{return e=G(e),We(t,we(e))}catch(n){if(typeof C>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},r:function(e,t,n){try{if(t=G(t),t=me(e,t),n)if(n===512)jt(t);else return-28;else Vt(t);return 0}catch(r){if(typeof C>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},q:function(e,t,n){try{t=G(t),t=me(e,t,!0);var r=Date.now(),a,s;if(n){var m=M[n>>2]+4294967296*D[n+4>>2],T=D[n+8>>2];T==1073741823?a=r:T==1073741822?a=null:a=1e3*m+T/1e6,n+=16,m=M[n>>2]+4294967296*D[n+4>>2],T=D[n+8>>2],T==1073741823?s=r:T==1073741822?s=null:s=1e3*m+T/1e6}else s=a=r;if((s??a)!==null){e=a;var A=k(t,{hb:!0}).node;Ge(A.La.Xa)(A,{$a:e,Ua:s})}return 0}catch(S){if(typeof C>"u"||S.name!=="ErrnoError")throw S;return-S.Pa}},m:()=>ve(""),l:()=>{Ce=!1,dt=0},A:function(e,t){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e),e=new Date(1e3*e),D[t>>2]=e.getSeconds(),D[t+4>>2]=e.getMinutes(),D[t+8>>2]=e.getHours(),D[t+12>>2]=e.getDate(),D[t+16>>2]=e.getMonth(),D[t+20>>2]=e.getFullYear()-1900,D[t+24>>2]=e.getDay();var n=e.getFullYear();D[t+28>>2]=(n%4!==0||n%100===0&&n%400!==0?xn:$n)[e.getMonth()]+e.getDate()-1|0,D[t+36>>2]=-(60*e.getTimezoneOffset()),n=new Date(e.getFullYear(),6,1).getTimezoneOffset();var r=new Date(e.getFullYear(),0,1).getTimezoneOffset();D[t+32>>2]=(n!=r&&e.getTimezoneOffset()==Math.min(r,n))|0},y:function(e,t,n,r,a,s,m){a=-9007199254740992>a||9007199254740992<a?NaN:Number(a);try{var T=W(r);if((t&2)!==0&&(n&2)===0&&(T.flags&2097155)!==2)throw new E(2);if((T.flags&2097155)===1)throw new E(2);if(!T.Ma.sb)throw new E(43);if(!e)throw new E(28);var A=T.Ma.sb(T,e,a,t,n),S=A.tc;return D[s>>2]=A.Ub,M[m>>2]=S,0}catch(F){if(typeof C>"u"||F.name!=="ErrnoError")throw F;return-F.Pa}},z:function(e,t,n,r,a,s){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s);try{var m=W(a);if(n&2){if((m.node.mode&61440)!==32768)throw new E(43);r&2||m.Ma.tb&&m.Ma.tb(m,x.slice(e,e+t),s,t,r)}}catch(T){if(typeof C>"u"||T.name!=="ErrnoError")throw T;return-T.Pa}},n:(e,t)=>{if(Se[e]&&(clearTimeout(Se[e].id),delete Se[e]),!t)return 0;var n=setTimeout(()=>{delete Se[e],Wn(()=>rn(e,performance.now()))},t);return Se[e]={id:n,Hc:t},0},B:(e,t,n,r)=>{var a=new Date().getFullYear(),s=new Date(a,0,1).getTimezoneOffset();a=new Date(a,6,1).getTimezoneOffset(),M[e>>2]=60*Math.max(s,a),D[t>>2]=+(s!=a),t=m=>{var T=Math.abs(m);return`UTC${0<=m?"-":"+"}${String(Math.floor(T/60)).padStart(2,"0")}${String(T%60).padStart(2,"0")}`},e=t(s),t=t(a),a<s?(J(e,x,n,17),J(t,x,r,17)):(J(e,x,r,17),J(t,x,n,17))},d:()=>Date.now(),s:()=>2147483648,c:()=>performance.now(),o:e=>{var t=x.length;if(e>>>=0,2147483648<e)return!1;for(var n=1;4>=n;n*=2){var r=t*(1+.2/n);r=Math.min(r,e+100663296);e:{r=(Math.min(2147483648,65536*Math.ceil(Math.max(e,r)/65536))-Xe.buffer.byteLength+65535)/65536|0;try{Xe.grow(r),vt();var a=1;break e}catch{}a=void 0}if(a)return!0}return!1},E:(e,t)=>{var n=0,r=0,a;for(a of Zt()){var s=t+n;M[e+r>>2]=s,n+=J(a,x,s,1/0)+1,r+=4}return 0},F:(e,t)=>{var n=Zt();M[e>>2]=n.length,e=0;for(var r of n)e+=be(r)+1;return M[t>>2]=e,0},e:function(e){try{var t=W(e);return mt(t),0}catch(n){if(typeof C>"u"||n.name!=="ErrnoError")throw n;return n.Pa}},p:function(e,t){try{var n=W(e);return P[t]=n.Va?2:B(n.mode)?3:(n.mode&61440)===40960?7:4,Re[t+2>>1]=0,z[t+8>>3]=BigInt(0),z[t+16>>3]=BigInt(0),0}catch(r){if(typeof C>"u"||r.name!=="ErrnoError")throw r;return r.Pa}},w:function(e,t,n,r){try{e:{var a=W(e);e=t;for(var s,m=t=0;m<n;m++){var T=M[e>>2],A=M[e+4>>2];e+=8;var S=zt(a,P,T,A,s);if(0>S){var F=-1;break e}if(t+=S,S<A)break;typeof s<"u"&&(s+=S)}F=t}return M[r>>2]=F,0}catch($){if(typeof C>"u"||$.name!=="ErrnoError")throw $;return $.Pa}},D:function(e,t,n,r){t=-9007199254740992>t||9007199254740992<t?NaN:Number(t);try{if(isNaN(t))return 61;var a=W(e);return Xt(a,t,n),z[r>>3]=BigInt(a.position),a.Eb&&t===0&&n===0&&(a.Eb=null),0}catch(s){if(typeof C>"u"||s.name!=="ErrnoError")throw s;return s.Pa}},I:function(e){var n,r;try{var t=W(e);return(r=(n=t.Ma)==null?void 0:n.lb)==null?void 0:r.call(n,t)}catch(a){if(typeof C>"u"||a.name!=="ErrnoError")throw a;return a.Pa}},t:function(e,t,n,r){try{e:{var a=W(e);e=t;for(var s,m=t=0;m<n;m++){var T=M[e>>2],A=M[e+4>>2];e+=8;var S=Kt(a,P,T,A,s);if(0>S){var F=-1;break e}if(t+=S,S<A)break;typeof s<"u"&&(s+=S)}F=t}return M[r>>2]=F,0}catch($){if(typeof C>"u"||$.name!=="ErrnoError")throw $;return $.Pa}},k:Jt};function bt(){function e(){var a;if(l.calledRun=!0,!Me){if(!l.noFSInit&&!Gt){var t,n;Gt=!0,t??(t=l.stdin),n??(n=l.stdout),r??(r=l.stderr),t?ae("stdin",t):lt("/dev/tty","/dev/stdin"),n?ae("stdout",null,n):lt("/dev/tty","/dev/stdout"),r?ae("stderr",null,r):lt("/dev/tty1","/dev/stderr"),qe("/dev/stdin",0),qe("/dev/stdout",1),qe("/dev/stderr",1)}if(_t.N(),Pt=!1,(a=l.onRuntimeInitialized)==null||a.call(l),l.postRun)for(typeof l.postRun=="function"&&(l.postRun=[l.postRun]);l.postRun.length;){var r=l.postRun.shift();wt.push(r)}Lt(wt)}}if(0<ce)Ne=bt;else{if(l.preRun)for(typeof l.preRun=="function"&&(l.preRun=[l.preRun]);l.preRun.length;)wn();Lt(St),0<ce?Ne=bt:l.setStatus?(l.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>l.setStatus(""),1),e()},1)):e()}}var _t;return(async function(){var n;function e(r){var a;return r=_t=r.exports,l._sqlite3_free=r.P,l._sqlite3_value_text=r.Q,l._sqlite3_prepare_v2=r.R,l._sqlite3_step=r.S,l._sqlite3_reset=r.T,l._sqlite3_exec=r.U,l._sqlite3_finalize=r.V,l._sqlite3_column_name=r.W,l._sqlite3_column_text=r.X,l._sqlite3_column_type=r.Y,l._sqlite3_errmsg=r.Z,l._sqlite3_clear_bindings=r._,l._sqlite3_value_blob=r.$,l._sqlite3_value_bytes=r.aa,l._sqlite3_value_double=r.ba,l._sqlite3_value_int=r.ca,l._sqlite3_value_type=r.da,l._sqlite3_result_blob=r.ea,l._sqlite3_result_double=r.fa,l._sqlite3_result_error=r.ga,l._sqlite3_result_int=r.ha,l._sqlite3_result_int64=r.ia,l._sqlite3_result_null=r.ja,l._sqlite3_result_text=r.ka,l._sqlite3_aggregate_context=r.la,l._sqlite3_column_count=r.ma,l._sqlite3_data_count=r.na,l._sqlite3_column_blob=r.oa,l._sqlite3_column_bytes=r.pa,l._sqlite3_column_double=r.qa,l._sqlite3_bind_blob=r.ra,l._sqlite3_bind_double=r.sa,l._sqlite3_bind_int=r.ta,l._sqlite3_bind_text=r.ua,l._sqlite3_bind_parameter_index=r.va,l._sqlite3_sql=r.wa,l._sqlite3_normalized_sql=r.xa,l._sqlite3_changes=r.ya,l._sqlite3_close_v2=r.za,l._sqlite3_create_function_v2=r.Aa,l._sqlite3_update_hook=r.Ba,l._sqlite3_open=r.Ca,Ve=l._malloc=r.Da,Ie=l._free=r.Ea,l._RegisterExtensionFunctions=r.Fa,nn=r.Ga,rn=r.Ha,ke=r.Ia,pe=r.Ja,Ye=r.Ka,Xe=r.M,ue=r.O,vt(),ce--,(a=l.monitorRunDependencies)==null||a.call(l,ce),ce==0&&Ne&&(r=Ne,Ne=null,r()),_t}ce++,(n=l.monitorRunDependencies)==null||n.call(l,ce);var t={a:jn};return l.instantiateWasm?new Promise(r=>{l.instantiateWasm(t,(a,s)=>{r(e(a))})}):(tt??(tt=l.locateFile?l.locateFile("sql-wasm-browser.wasm",ge):ge+"sql-wasm-browser.wasm"),e((await Ln(t)).instance))})(),bt(),L}),c)};i.exports=d,i.exports.default=d})(qt)),qt.exports}var Nr=vr();const Lr=Rr(Nr),wr=`-- ============================================================
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
`,Sr="rogue_life",Ue="db",qn="save";function gn(){return new Promise((i,o)=>{const c=indexedDB.open(Sr,1);c.onupgradeneeded=()=>c.result.createObjectStore(Ue),c.onsuccess=()=>i(c.result),c.onerror=()=>o(c.error)})}async function yr(){const i=await gn();return new Promise((o,c)=>{const b=i.transaction(Ue,"readonly").objectStore(Ue).get(qn);b.onsuccess=()=>o(b.result??null),b.onerror=()=>c(b.error)})}async function Ir(i){const o=await gn();return new Promise((c,d)=>{const b=o.transaction(Ue,"readwrite");b.objectStore(Ue).put(i,qn),b.oncomplete=()=>c(),b.onerror=()=>d(b.error)})}let ee=null;async function R(){var c;if(ee)return ee;(c=navigator.storage)!=null&&c.persist&&await navigator.storage.persist();const i=await Lr({locateFile:()=>`${gr}/sql-wasm.wasm`}),o=await yr();return o?ee=new i.Database(o):(ee=new i.Database,ee.run(wr),await I()),ee}async function I(){ee&&await Ir(ee.export())}function Tn(i){return i.replace(/\$\d+/g,"?")}function _(i,o=[]){const c=ee.prepare(Tn(i)),d=[];for(c.bind(o);c.step();)d.push(c.getAsObject());return c.free(),d}function f(i,o=[]){ee.run(Tn(i),o)}const Oe={1:{xp:15,gold:8,pv:5},2:{xp:30,gold:15,pv:10},3:{xp:50,gold:25,pv:20}};function Tt(i){return i==="cauchemar"?2:i==="hard"?1.5:1}const Rn={pv_combat_max:100,attq:50,attq_spe:50,def:50,def_spe:50,vitesse:50,mana_max:100};async function Ur(i){return await R(),_("SELECT * FROM personnage WHERE id = $1",[i])[0]??null}async function Or(i){return await R(),_("SELECT * FROM caracteristique WHERE id = $1",[i])[0]??null}async function Ar(){return await R(),_("SELECT * FROM level ORDER BY id")}async function Mr(){return await R(),_("SELECT * FROM titre")}async function Cr(i,o){await R(),f("UPDATE personnage SET titre_id = $1 WHERE id = $2",[o,i]),await I()}async function Fr(){return await R(),_("SELECT * FROM stuff")}async function Dr(i){return await R(),_("SELECT * FROM inventaire WHERE personnage_id = $1",[i])}const Gr=["arme_1main","arme_2mains","bouclier_1main","bouclier_2mains"],gt=i=>i.includes("2mains")?2:1;async function Pr(i,o){var b;await R();const d=(b=_("SELECT s.slot FROM inventaire i JOIN stuff s ON s.id = i.stuff_id WHERE i.id = $1",[o])[0])==null?void 0:b.slot;if(d){if(Gr.includes(d)){const v=gt(d),N=_(`SELECT i.id, s.slot FROM inventaire i
             JOIN stuff s ON s.id = i.stuff_id
             WHERE i.personnage_id = $1 AND i.est_equipe = 1 AND s.slot IN ('arme_1main','arme_2mains','bouclier_1main','bouclier_2mains')`,[i]);let L=N.reduce((g,l)=>g+gt(l.slot),0);for(const g of N){if(L+v<=2)break;f("UPDATE inventaire SET est_equipe = 0 WHERE id = $1",[g.id]),L-=gt(g.slot)}}else f(`UPDATE inventaire SET est_equipe = 0
             WHERE personnage_id = $1 AND est_equipe = 1
             AND stuff_id IN (SELECT id FROM stuff WHERE slot = $2)`,[i,d]);f("UPDATE inventaire SET est_equipe = 1 WHERE id = $1",[o]),await I()}}async function $r(i,o){await R();const d=_("SELECT s.slot, s.soin_pv, i.stuff_id FROM inventaire i JOIN stuff s ON s.id = i.stuff_id WHERE i.id = $1",[o])[0];if(!d)return;const b=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!b)return;const v=b.mode??"normal";if(v==="hard"||v==="cauchemar")throw new Error("Utilitaires interdits en mode Hard / Cauchemar");d.slot==="consommable"&&d.soin_pv>0?f("UPDATE caracteristique SET pv_vie_actuels = MIN(pv_vie_max, pv_vie_actuels + $1) WHERE id = $2",[d.soin_pv,b.caracteristique_id]):d.slot==="joker"&&f("UPDATE personnage SET jokers_disponibles = jokers_disponibles + 1 WHERE id = $1",[i]),f("UPDATE inventaire SET quantite = quantite - 1 WHERE id = $1",[o]),f("DELETE FROM inventaire WHERE id = $1 AND quantite <= 0",[o]),await I()}async function xr(i){await R(),f("UPDATE inventaire SET est_equipe = 0 WHERE id = $1",[i]),await I()}async function Wr(i,o,c){var L;await R();const d=_("SELECT prix_vente_local FROM magasin_inventaire WHERE magasin_id = $1 AND stuff_id = $2",[o,c]);if(!d[0])throw new Error("Item introuvable dans ce magasin");const b=d[0].prix_vente_local,v=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!v)throw new Error("Personnage introuvable");if(v.gold_actuel<b)throw new Error("Or insuffisant");if(((L=_("SELECT slot FROM stuff WHERE id = $1",[c])[0])==null?void 0:L.slot)==="joker"){const g=v.mode??"normal";if(g==="hard"||g==="cauchemar")throw new Error("Jokers interdits en mode Hard / Cauchemar")}f("UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2",[b,i]),f("INSERT OR IGNORE INTO inventaire (personnage_id, stuff_id, quantite, est_equipe) VALUES ($1, $2, 0, 0)",[i,c]),f("UPDATE inventaire SET quantite = quantite + 1 WHERE personnage_id = $1 AND stuff_id = $2",[i,c]),await I()}async function Hr(i,o){var b;await R();const c=_("SELECT stuff_id, quantite FROM inventaire WHERE id = $1 AND personnage_id = $2",[o,i])[0];if(!c)throw new Error("Item introuvable");const d=Math.floor((((b=_("SELECT prix_base FROM stuff WHERE id = $1",[c.stuff_id])[0])==null?void 0:b.prix_base)??0)/4);return f("UPDATE personnage SET gold_actuel = gold_actuel + $1 WHERE id = $2",[d,i]),c.quantite<=1?f("DELETE FROM inventaire WHERE id = $1",[o]):f("UPDATE inventaire SET quantite = quantite - 1 WHERE id = $1",[o]),await I(),d}async function Br(i){return await R(),_("SELECT * FROM magasin_inventaire WHERE magasin_id = $1",[i])}async function jr(){return await R(),_("SELECT * FROM tache")}async function Vr(i){await R();const o=new Date().toISOString();f(`INSERT INTO tache (nom, type_activite, type, difficulte, exp_recompense, gold_recompense, pv_vie_penalite, duree_jours, date_creation, date_limite)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,[i.nom,i.type_activite,i.type??"ponctuelle",i.difficulte,i.exp_recompense,i.gold_recompense,i.pv_vie_penalite,i.duree_jours??null,o,i.date_limite??null]),await I()}async function kr(i){await R();const o=_("SELECT * FROM tache WHERE id = $1",[i])[0];if(o){if(o.date_creation){const c=(Date.now()-new Date(o.date_creation).getTime())/864e5;if(c<7)throw new Error(`Routine créée il y a ${Math.floor(c)}j — suppression possible après 7 jours`)}f("DELETE FROM tache WHERE id = $1",[i]),await I()}}async function Yr(i,o){await R();const c=_("SELECT * FROM tache WHERE id = $1",[o])[0];if(!c)return;const d=Oe[c.difficulte]??Oe[1],b=_("SELECT * FROM personnage WHERE id = $1",[i])[0],v=Tt((b==null?void 0:b.mode)??"normal");f("UPDATE personnage SET experience_actuelle = experience_actuelle + $1, gold_actuel = gold_actuel + $2 WHERE id = $3",[Math.round(d.xp*v),Math.round(d.gold*v),i]),f("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)",[i,o,"succes",c.nom]),await I()}async function Ae(i){await R();const o=_("SELECT * FROM personnage WHERE id = $1",[i])[0];o&&(f("UPDATE personnage SET level_id=1, experience_actuelle=0, gold_actuel=50, points_stat_disponibles=0 WHERE id=$1",[i]),f(`UPDATE caracteristique SET
            pv_vie_max=100, pv_vie_actuels=100,
            pv_combat_max=100, pv_combat_actuels=100,
            attq=10, attq_spe=10, def=8, def_spe=8, vitesse=12,
            mana_max=150, mana_actuels=150
         WHERE id=$1`,[o.caracteristique_id]),f("UPDATE personnage SET mode='normal', mode_debut=NULL, dernier_coffre_hebdo=NULL, dernier_coffre_mensuel=NULL WHERE id=$1",[i]),f("DELETE FROM personnage_competence WHERE personnage_id = $1",[i]),f("DELETE FROM competence WHERE source = 'donjon'"),f("DELETE FROM inventaire WHERE personnage_id = $1",[i]),await I())}async function Xr(i,o){await R();const c=Rn[o]??300,d=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!d)throw new Error("Personnage introuvable");if(d.gold_actuel<c)throw new Error("Or insuffisant");f("UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2",[c,i]),o==="pv_combat_max"?f("UPDATE caracteristique SET pv_combat_max = pv_combat_max + 5, pv_combat_actuels = pv_combat_actuels + 5 WHERE id = $1",[d.caracteristique_id]):o==="mana_max"?f("UPDATE caracteristique SET mana_max = mana_max + 15, mana_actuels = mana_actuels + 15 WHERE id = $1",[d.caracteristique_id]):f(`UPDATE caracteristique SET ${o} = ${o} + 1 WHERE id = $1`,[d.caracteristique_id]),await I()}async function zr(i,o){await R();const c=_("SELECT * FROM personnage WHERE id = $1",[i])[0];c&&(f("UPDATE caracteristique SET mana_actuels = MAX(0, MIN(mana_max, $1)) WHERE id = $2",[o,c.caracteristique_id]),await I())}async function Kr(i,o){await R();const c=_("SELECT * FROM personnage WHERE id = $1",[i])[0];c&&(f("UPDATE caracteristique SET mana_actuels = MIN(mana_max, mana_actuels + $1) WHERE id = $2",[o,c.caracteristique_id]),await I())}async function Qr(i){var L;await R();const o=new Date().toISOString().split("T")[0],c=new Date(Date.now()-864e5).toISOString().split("T")[0],d=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!d)return{gameOver:!1};if(d.dernier_check===o)return{gameOver:!1};const b=_("SELECT * FROM tache WHERE type = 'routine' AND (date_creation IS NULL OR date(date_creation) <= $1)",[c]);for(const g of b)if(_("SELECT id FROM historique_activite WHERE personnage_id = $1 AND tache_id = $2 AND statut IN ('succes', 'penalite') AND date(date_action) = $3",[i,g.id,c]).length===0){const V=d.mode??"normal";if(V==="cauchemar")return f("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'penalite', $3)",[i,g.id,g.nom]),f("UPDATE personnage SET dernier_check = $1 WHERE id = $2",[o,i]),await I(),await Ae(i),{gameOver:!0};if(V==="hard"||d.jokers_disponibles<=0){const U=(Oe[g.difficulte]??Oe[1]).pv;f("UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2",[U,d.caracteristique_id]),f("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'penalite', $3)",[i,g.id,g.nom])}else f("UPDATE personnage SET jokers_disponibles = jokers_disponibles - 1 WHERE id = $1",[i]),d.jokers_disponibles--,f("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'joker', $3)",[i,g.id,g.nom])}const v=_("SELECT * FROM tache WHERE type = 'ponctuelle'");for(const g of v){let l=null;if(g.date_limite)l=g.date_limite;else if(g.date_creation&&g.duree_jours){const U=new Date(g.date_creation);U.setDate(U.getDate()+g.duree_jours),l=U.toISOString().split("T")[0]}if(!l||l>=o)continue;_("SELECT id FROM historique_activite WHERE personnage_id = $1 AND tache_id = $2 AND statut IN ('succes', 'expire')",[i,g.id]).length===0&&(f("UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2",[g.pv_vie_penalite,d.caracteristique_id]),f("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'expire', $3)",[i,g.id,g.nom]))}return f("UPDATE personnage SET dernier_check = $1 WHERE id = $2",[o,i]),(((L=_("SELECT pv_vie_actuels FROM caracteristique WHERE id = $1",[d.caracteristique_id])[0])==null?void 0:L.pv_vie_actuels)??1)<=0?(await I(),await Ae(i),{gameOver:!0}):(await I(),{gameOver:!1})}async function Jr(i,o){await R();const c=_("SELECT * FROM tache WHERE id = $1",[o])[0];if(!c)return;const d=_("SELECT * FROM personnage WHERE id = $1",[i])[0],b=Tt((d==null?void 0:d.mode)??"normal");f("UPDATE personnage SET experience_actuelle = experience_actuelle + $1, gold_actuel = gold_actuel + $2 WHERE id = $3",[Math.round(c.exp_recompense*b),Math.round(c.gold_recompense*b),i]),f("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)",[i,o,"complete",c.nom]),f("UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1",[o]),f("DELETE FROM tache WHERE id = $1",[o]),await I()}async function Zr(i,o){var v;await R();const c=_("SELECT * FROM tache WHERE id = $1",[o])[0];if(!c)return{gameOver:!1};const d=_("SELECT * FROM personnage WHERE id = $1",[i])[0];return d?(d.mode??"normal")==="cauchemar"?(f("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)",[i,o,"echec",c.nom]),f("UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1",[o]),f("DELETE FROM tache WHERE id = $1",[o]),await I(),await Ae(i),{gameOver:!0}):(f("UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2",[c.pv_vie_penalite,d.caracteristique_id]),f("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)",[i,o,"echec",c.nom]),f("UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1",[o]),f("DELETE FROM tache WHERE id = $1",[o]),(((v=_("SELECT pv_vie_actuels FROM caracteristique WHERE id = $1",[d.caracteristique_id])[0])==null?void 0:v.pv_vie_actuels)??1)<=0?(await I(),await Ae(i),{gameOver:!0}):(await I(),{gameOver:!1})):{gameOver:!1}}async function Rt(i){await R();const o=_("SELECT id, date_creation FROM tache WHERE type = 'routine'",[]);if(o.length===0)return{actuel:0,record:0};const c=_(`SELECT DISTINCT date(h.date_action) as jour
         FROM historique_activite h
         WHERE h.personnage_id = $1 AND h.statut = 'succes'
         AND date(h.date_action) NOT IN (
             SELECT DISTINCT date(date_action)
             FROM historique_activite
             WHERE personnage_id = $1 AND statut = 'penalite'
         )
         ORDER BY jour DESC`,[i]),d=[];for(const{jour:U}of c){const H=o.filter(te=>!te.date_creation||te.date_creation.slice(0,10)<=U);if(H.length===0)continue;const fe=_(`SELECT tache_id FROM historique_activite
             WHERE personnage_id = $1 AND statut = 'succes' AND date(date_action) = $2
             AND tache_id IN (SELECT id FROM tache WHERE type = 'routine')`,[i,U]),ge=new Set(fe.map(te=>te.tache_id));H.every(te=>ge.has(te.id))&&d.push(U)}if(d.length===0)return{actuel:0,record:0};const b=new Date().toISOString().split("T")[0],v=new Date(Date.now()-864e5).toISOString().split("T")[0],N=[...d].sort((U,H)=>H.localeCompare(U));let L=0;if(N[0]===b||N[0]===v){let U=N[0];L=1;for(let H=1;H<N.length;H++){const fe=new Date(new Date(U).getTime()-864e5).toISOString().split("T")[0];if(N[H]===fe)L++,U=N[H];else break}}let g=0,l=1;const V=[...d].sort();for(let U=1;U<V.length;U++){const H=new Date(new Date(V[U-1]).getTime()+864e5).toISOString().split("T")[0];V[U]===H?(l++,g=Math.max(g,l)):l=1}return g=Math.max(g,l,L),{actuel:L,record:g}}async function ea(i){return await R(),_("SELECT * FROM historique_activite WHERE personnage_id = $1 ORDER BY date_action DESC",[i])}async function ta(){return await R(),_("SELECT * FROM competence WHERE source != 'donjon' OR source IS NULL ORDER BY prix_boutique ASC")}async function na(){return await R(),_("SELECT * FROM competence WHERE source = 'donjon' ORDER BY rarete ASC")}async function ra(i){return await R(),_(`SELECT pc.id, pc.personnage_id, pc.competence_id, pc.est_equipee,
                c.id as comp_id, c.nom, c.description, c.type, c.effet_type,
                c.puissance, c.effet_secondaire,
                c.valeur, c.duree_tours, c.rarete, c.prix_boutique,
                c.element, c.source, c.cout_mana
         FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1`,[i]).map(c=>({id:c.id,personnage_id:c.personnage_id,competence_id:c.competence_id,est_equipee:!!c.est_equipee,competence:{id:c.comp_id,nom:c.nom,description:c.description,type:c.type,effet_type:c.effet_type,puissance:c.puissance??0,effet_secondaire:c.effet_secondaire??null,valeur:c.valeur,duree_tours:c.duree_tours,rarete:c.rarete,prix_boutique:c.prix_boutique,element:c.element??"neutre",source:c.source??"boutique",cout_mana:c.cout_mana??0}}))}async function aa(i,o){await R();const c=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!c)throw new Error("Personnage introuvable");const d=_("SELECT * FROM competence WHERE id = $1",[o])[0];if(!d)throw new Error("Compétence introuvable");if(c.gold_actuel<d.prix_boutique)throw new Error("Or insuffisant");if(_("SELECT * FROM personnage_competence WHERE personnage_id = $1 AND competence_id = $2",[i,o]).length>0)throw new Error("Compétence déjà possédée");f("UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2",[d.prix_boutique,i]),f("INSERT INTO personnage_competence (personnage_id, competence_id, est_equipee) VALUES ($1, $2, 0)",[i,o]),await I()}async function ia(i,o){if(await R(),_("SELECT COUNT(*) as cnt FROM personnage_competence WHERE personnage_id = $1 AND est_equipee = 1",[i])[0].cnt>=6)throw new Error("Maximum 6 compétences équipées");f("UPDATE personnage_competence SET est_equipee = 1 WHERE id = $1",[o]),await I()}async function ua(i){await R(),f("UPDATE personnage_competence SET est_equipee = 0 WHERE id = $1",[i]),await I()}async function oa(i,o,c){await R(),o==="stuff"?(f("INSERT OR IGNORE INTO inventaire (personnage_id, stuff_id, quantite, est_equipe) VALUES ($1, $2, 0, 0)",[i,c]),f("UPDATE inventaire SET quantite = quantite + 1 WHERE personnage_id = $1 AND stuff_id = $2",[i,c])):_("SELECT * FROM personnage_competence WHERE personnage_id = $1 AND competence_id = $2",[i,c]).length===0&&f("INSERT INTO personnage_competence (personnage_id, competence_id, est_equipee) VALUES ($1, $2, 0)",[i,c]),await I()}async function sa(i){await R();const o=_("SELECT * FROM personnage WHERE id = $1",[i])[0];o&&(f("UPDATE caracteristique SET pv_combat_actuels = pv_combat_max, mana_actuels = mana_max WHERE id = $1",[o.caracteristique_id]),await I())}async function ca(i,o){await R();const c=_("SELECT * FROM personnage WHERE id = $1",[i])[0];c&&(f("UPDATE caracteristique SET pv_combat_actuels = MAX(0, $1) WHERE id = $2",[o,c.caracteristique_id]),await I())}async function la(i){await R();let o=0,c=0;for(;;){const d=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!d)break;const b=_("SELECT * FROM level WHERE id = $1",[d.level_id])[0];if(!b||d.experience_actuelle<b.exp_max_requise||d.level_id>=10)break;f("UPDATE personnage SET level_id = $1, points_stat_disponibles = points_stat_disponibles + 5 WHERE id = $2",[d.level_id+1,i]),o++,c+=5}return o>0&&await I(),{levels_gagnes:o,points_gagnes:c}}async function ma(i,o){await R();const c=_("SELECT * FROM personnage WHERE id = $1",[i])[0];!c||(c.points_stat_disponibles??0)<=0||(f("UPDATE personnage SET points_stat_disponibles = points_stat_disponibles - 1 WHERE id = $1",[i]),o==="pv_combat_max"?f("UPDATE caracteristique SET pv_combat_max = pv_combat_max + 5, pv_combat_actuels = pv_combat_actuels + 5 WHERE id = $1",[c.caracteristique_id]):o==="mana_max"?f("UPDATE caracteristique SET mana_max = mana_max + 15, mana_actuels = mana_actuels + 15 WHERE id = $1",[c.caracteristique_id]):f(`UPDATE caracteristique SET ${o} = ${o} + 1 WHERE id = $1`,[c.caracteristique_id]),await I())}async function da(i){var d;await R(),f("UPDATE personnage SET compteur_loot_donjon = COALESCE(compteur_loot_donjon, 0) + 1 WHERE id = $1",[i]);const o=((d=_("SELECT compteur_loot_donjon FROM personnage WHERE id = $1",[i])[0])==null?void 0:d.compteur_loot_donjon)??1;if(await I(),o%50===0)return"legendaire";const c=Math.floor((o-1)/3)%3;return["peu_commun","rare","epique"][c]}async function pa(i){await R();try{return _("SELECT * FROM personnage_affinite WHERE personnage_id = $1",[i])}catch{return[]}}async function Ea(i,o){await R();const c=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!c)return;const d=c.mode??"normal",b={normal:0,hard:1,cauchemar:2};if(b[o]<b[d]&&c.mode_debut){const L=(Date.now()-new Date(c.mode_debut).getTime())/864e5;if(L<3)throw new Error(`Mode actif depuis ${Math.floor(L)}j — retour possible après 3 jours`)}const v=new Date().toISOString().split("T")[0],N=o!=="normal"?d!=="normal"?c.mode_debut:v:null;f("UPDATE personnage SET mode = $1, mode_debut = $2 WHERE id = $3",[o,N,i]),await I()}async function fa(i){await R();const o=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!o||(o.mode??"normal")==="normal")return{hebdo:null,mensuel:null};const c=o.mode,d=Date.now(),b=o.mode_debut?new Date(o.mode_debut).getTime():d,v=new Date().toISOString().split("T")[0];let N=null,L=null;const g=o.dernier_coffre_mensuel?new Date(o.dernier_coffre_mensuel).getTime():b;d-g>=30*864e5&&(L=c==="cauchemar"?"legendaire":"epique",f("UPDATE personnage SET dernier_coffre_mensuel = $1 WHERE id = $2",[v,i]));const l=o.dernier_coffre_hebdo?new Date(o.dernier_coffre_hebdo).getTime():b;return d-l>=7*864e5&&(N=c==="cauchemar"?"epique":"rare",f("UPDATE personnage SET dernier_coffre_hebdo = $1 WHERE id = $2",[v,i])),(N||L)&&await I(),{hebdo:N,mensuel:L}}async function ba(i,o){await R(),f("UPDATE personnage SET nom = $1 WHERE id = $2",[o.trim(),i]),await I()}async function _a(i){await R();const o=_(`SELECT h.statut, t.type as type_tache, COUNT(*) as cnt
         FROM historique_activite h
         LEFT JOIN tache t ON t.id = h.tache_id
         WHERE h.personnage_id = $1
         GROUP BY h.statut, t.type`,[i]);let c=0,d=0,b=0,v=0;for(const N of o)N.statut==="succes"&&N.type_tache==="routine"?b+=N.cnt:N.statut==="succes"?c+=N.cnt:N.statut==="echec"?d+=N.cnt:N.statut==="penalite"&&(v+=N.cnt);return{taches_succes:c,taches_echec:d,routines_faites:b,penalites:v}}async function ha(i){var L;await R();const o=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!o)return;if((((L=_(`SELECT COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 AND c.rarete = 'legendaire'`,[i])[0])==null?void 0:L.cnt)??0)>=3){await X(o,30);return}if(o.gold_actuel>=5e3){await X(o,29);return}const{actuel:d}=await Rt(i);if(d>=365){await X(o,28);return}if(d>=180){await X(o,27);return}if(d>=30){await X(o,26);return}if(d>=14){await X(o,25);return}if(d>=7){await X(o,24);return}const b=_(`SELECT c.element, COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 GROUP BY c.element`,[i]),v={feu:14,eau:15,terre:16,air:17,technologie:18,surnaturel:19,mort:20,vie:21,lumiere:22,tenebres:23},N={feu:4,eau:5,terre:6,air:7,technologie:8,surnaturel:9,mort:10,vie:11,lumiere:12,tenebres:13};for(const g of b)if((g.cnt??0)>=10&&v[g.element]){await X(o,v[g.element]);return}for(const g of b)if((g.cnt??0)>=5&&N[g.element]){await X(o,N[g.element]);return}if(o.level_id>=5){await X(o,3);return}if(o.level_id>=3){await X(o,2);return}await X(o,1)}async function qa(i){var V;await R();const o=_("SELECT * FROM personnage WHERE id = $1",[i])[0];if(!o)return[1];const c=[1];o.level_id>=3&&c.push(2),o.level_id>=5&&c.push(3),o.gold_actuel>=5e3&&c.push(29);const{actuel:d,record:b}=await Rt(i),v=Math.max(d,b);v>=7&&c.push(24),v>=14&&c.push(25),v>=30&&c.push(26),v>=180&&c.push(27),v>=365&&c.push(28);const N=_(`SELECT c.element, COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 GROUP BY c.element`,[i]),L={feu:4,eau:5,terre:6,air:7,technologie:8,surnaturel:9,mort:10,vie:11,lumiere:12,tenebres:13},g={feu:14,eau:15,terre:16,air:17,technologie:18,surnaturel:19,mort:20,vie:21,lumiere:22,tenebres:23};for(const U of N)(U.cnt??0)>=5&&L[U.element]&&c.push(L[U.element]),(U.cnt??0)>=10&&g[U.element]&&c.push(g[U.element]);return(((V=_(`SELECT COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 AND c.rarete = 'legendaire'`,[i])[0])==null?void 0:V.cnt)??0)>=3&&c.push(30),c}async function X(i,o){i.titre_id!==o&&(f("UPDATE personnage SET titre_id = $1 WHERE id = $2",[o,i.id]),await I())}async function ga(i,o=[]){return await R(),_(i,o)}async function Ta(i,o=[]){await R(),f(i,o),await I()}const Sa=Object.freeze(Object.defineProperty({__proto__:null,ROUTINE_STATS:Oe,STAT_SHOP_PRIX:Rn,_classesRun:Ta,_classesSelect:ga,acheterCompetence:aa,acheterItem:Wr,acheterStat:Xr,ajouterRecompenseDonjon:oa,allouerStat:ma,calculerEtAttribuerTitre:ha,calculerStreak:Rt,calculerTitresDebloques:qa,changerMode:Ea,changerTitre:Cr,checkDailyPenalties:Qr,checkLevelUp:la,checkModeCoffres:fa,completerRoutine:Yr,completerTache:Jr,createTache:Vr,desequiperCompetence:ua,desequiperItem:xr,echouerTache:Zr,equiperCompetence:ia,equiperItem:Pr,gameOver:Ae,getCaracteristique:Or,getCompetences:ta,getCompetencesDonjon:na,getHistoriqueActivite:ea,getInventaire:Dr,getLevels:Ar,getMagasinInventaire:Br,getModeMultiplier:Tt,getPersonnage:Ur,getPersonnageAffinites:pa,getPersonnageCompetences:ra,getStatsResume:_a,getStuffs:Fr,getTaches:jr,getTitres:Mr,incrementerLootDonjon:da,regenMana:Kr,renommerPersonnage:ba,resetPvCombat:sa,supprimerRoutine:kr,updateManaActuels:zr,updatePvCombat:ca,utiliserConsommable:$r,vendreItem:Hr},Symbol.toStringTag,{value:"Module"}));export{Br as A,ta as B,aa as C,Wr as D,_a as E,ea as F,fa as G,jr as H,na as I,Jr as J,la as K,Zr as L,kr as M,Yr as N,oa as O,Vr as P,da as Q,Oe as R,Rn as S,ca as T,zr as U,Kr as V,sa as W,Qr as X,Sa as Y,ga as _,Ta as a,Mr as b,ha as c,qa as d,Rt as e,Or as f,Ur as g,Ar as h,Dr as i,Fr as j,pa as k,Cr as l,Xr as m,Ea as n,Ae as o,ma as p,ra as q,ba as r,wa as s,La as t,$r as u,xr as v,Pr as w,Hr as x,ua as y,ia as z};

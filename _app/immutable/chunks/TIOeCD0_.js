var hr=Object.defineProperty;var qr=(a,u,s)=>u in a?hr(a,u,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[u]=s;var oe=(a,u,s)=>qr(a,typeof u!="symbol"?u+"":u,s);import{h as _n}from"./CI5YxWnA.js";import{b as Tr}from"./ffZws32t.js";const bn=[...` 	
\r\f \v\uFEFF`];function gr(a,u,s){var m=a==null?"":""+a;if(u&&(m=m?m+" "+u:u),s){for(var _ of Object.keys(s))if(s[_])m=m?m+" "+_:_;else if(m.length)for(var T=_.length,N=0;(N=m.indexOf(_,N))>=0;){var v=N+T;(N===0||bn.includes(m[N-1]))&&(v===m.length||bn.includes(m[v]))?m=(N===0?"":m.substring(0,N))+m.substring(v+1):N=v}}return m===""?null:m}function Da(a,u){return a==null?null:String(a)}function Ga(a,u,s,m,_,T){var N=a.__className;if(_n||N!==s||N===void 0){var v=gr(s,m,T);(!_n||v!==a.getAttribute("class"))&&(v==null?a.removeAttribute("class"):a.className=v),a.__className=s}else if(T&&_!==T)for(var R in T){var l=!!T[R];(_==null||l!==!!_[R])&&a.classList.toggle(R,l)}return T}function Rr(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var qt={exports:{}},hn;function Nr(){return hn||(hn=1,(function(a,u){var s=void 0,m=function(_){return s||(s=new Promise(function(T,N){var an,un;var v=typeof _<"u"?_:{},R=v.onAbort;v.onAbort=function(e){N(new Error(e)),R&&R(e)},v.postRun=v.postRun||[],v.postRun.push(function(){T(v)}),a=void 0;var l;l||(l=typeof v<"u"?v:{});var K=!!globalThis.window,A=!!globalThis.WorkerGlobalScope;l.onRuntimeInitialized=function(){function e(o,p){switch(typeof p){case"boolean":_r(o,p?1:0);break;case"number":pr(o,p);break;case"string":Er(o,p,-1,-1);break;case"object":if(p===null)dn(o);else if(p.length!=null){var h=Ve(p.length);P.set(p,h),fr(o,h,p.length,-1),Ue(h)}else Ke(o,"Wrong API use : tried to return a value of an unknown type ("+p+").",-1);break;default:dn(o)}}function t(o,p){for(var h=[],q=0;q<o;q+=1){var U=ne(p+4*q,"i32"),y=sr(U);if(y===1||y===2)U=dr(U);else if(y===3)U=lr(U);else if(y===4){y=U,U=cr(y),y=mr(y);for(var Q=new Uint8Array(U),Y=0;Y<U;Y+=1)Q[Y]=P[y+Y];U=Q}else U=null;h.push(U)}return h}function n(o,p){this.Qa=o,this.db=p,this.Oa=1,this.yb=[]}function r(o,p){if(this.db=p,this.ob=je(o),this.ob===null)throw Error("Unable to allocate memory for the SQL string");this.ub=this.ob,this.gb=this.Fb=null}function i(o){if(this.filename="dbfile_"+(4294967295*Math.random()>>>0),o!=null){var p=this.filename,h="/",q=p;if(h&&(h=typeof h=="string"?h:it(h),q=p?nt(h+"/"+p):h),p=Ft(!0,!0),q=Gn(q,p),o){if(typeof o=="string"){h=Array(o.length);for(var U=0,y=o.length;U<y;++U)h[U]=o.charCodeAt(U);o=h}xe(q,p|146),h=qe(q,577),zt(h,o,0,o.length,0),mt(h),xe(q,p)}}this.handleError(L(this.filename,c)),this.db=ne(c,"i32"),En(this.db),this.pb={},this.Sa={}}var c=pe(4),d=l.cwrap,L=d("sqlite3_open","number",["string","number"]),O=d("sqlite3_close_v2","number",["number"]),I=d("sqlite3_exec","number",["number","string","number","number","number"]),F=d("sqlite3_changes","number",["number"]),x=d("sqlite3_prepare_v2","number",["number","string","number","number","number"]),on=d("sqlite3_sql","string",["number"]),Vn=d("sqlite3_normalized_sql","string",["number"]),sn=d("sqlite3_prepare_v2","number",["number","number","number","number","number"]),kn=d("sqlite3_bind_text","number",["number","number","number","number","number"]),cn=d("sqlite3_bind_blob","number",["number","number","number","number","number"]),Yn=d("sqlite3_bind_double","number",["number","number","number"]),Xn=d("sqlite3_bind_int","number",["number","number","number"]),Kn=d("sqlite3_bind_parameter_index","number",["number","string"]),zn=d("sqlite3_step","number",["number"]),Qn=d("sqlite3_errmsg","string",["number"]),Jn=d("sqlite3_column_count","number",["number"]),Zn=d("sqlite3_data_count","number",["number"]),er=d("sqlite3_column_double","number",["number","number"]),ln=d("sqlite3_column_text","string",["number","number"]),tr=d("sqlite3_column_blob","number",["number","number"]),nr=d("sqlite3_column_bytes","number",["number","number"]),rr=d("sqlite3_column_type","number",["number","number"]),ar=d("sqlite3_column_name","string",["number","number"]),ir=d("sqlite3_reset","number",["number"]),ur=d("sqlite3_clear_bindings","number",["number"]),or=d("sqlite3_finalize","number",["number"]),mn=d("sqlite3_create_function_v2","number","number string number number number number number number number".split(" ")),sr=d("sqlite3_value_type","number",["number"]),cr=d("sqlite3_value_bytes","number",["number"]),lr=d("sqlite3_value_text","string",["number"]),mr=d("sqlite3_value_blob","number",["number"]),dr=d("sqlite3_value_double","number",["number"]),pr=d("sqlite3_result_double","",["number","number"]),dn=d("sqlite3_result_null","",["number"]),Er=d("sqlite3_result_text","",["number","string","number","number"]),fr=d("sqlite3_result_blob","",["number","number","number","number"]),_r=d("sqlite3_result_int","",["number","number"]),Ke=d("sqlite3_result_error","",["number","string","number"]),pn=d("sqlite3_aggregate_context","number",["number","number"]),En=d("RegisterExtensionFunctions","number",["number"]),fn=d("sqlite3_update_hook","number",["number","number","number"]);n.prototype.bind=function(o){if(!this.Qa)throw"Statement closed";return this.reset(),Array.isArray(o)?this.Wb(o):o!=null&&typeof o=="object"?this.Xb(o):!0},n.prototype.step=function(){if(!this.Qa)throw"Statement closed";this.Oa=1;var o=zn(this.Qa);switch(o){case 100:return!0;case 101:return!1;default:throw this.db.handleError(o)}},n.prototype.Pb=function(o){return o==null&&(o=this.Oa,this.Oa+=1),er(this.Qa,o)},n.prototype.hc=function(o){if(o==null&&(o=this.Oa,this.Oa+=1),o=ln(this.Qa,o),typeof BigInt!="function")throw Error("BigInt is not supported");return BigInt(o)},n.prototype.mc=function(o){return o==null&&(o=this.Oa,this.Oa+=1),ln(this.Qa,o)},n.prototype.getBlob=function(o){o==null&&(o=this.Oa,this.Oa+=1);var p=nr(this.Qa,o);o=tr(this.Qa,o);for(var h=new Uint8Array(p),q=0;q<p;q+=1)h[q]=P[o+q];return h},n.prototype.get=function(o,p){p=p||{},o!=null&&this.bind(o)&&this.step(),o=[];for(var h=Zn(this.Qa),q=0;q<h;q+=1)switch(rr(this.Qa,q)){case 1:var U=p.useBigInt?this.hc(q):this.Pb(q);o.push(U);break;case 2:o.push(this.Pb(q));break;case 3:o.push(this.mc(q));break;case 4:o.push(this.getBlob(q));break;default:o.push(null)}return o},n.prototype.Db=function(){for(var o=[],p=Jn(this.Qa),h=0;h<p;h+=1)o.push(ar(this.Qa,h));return o},n.prototype.Ob=function(o,p){o=this.get(o,p),p=this.Db();for(var h={},q=0;q<p.length;q+=1)h[p[q]]=o[q];return h},n.prototype.lc=function(){return on(this.Qa)},n.prototype.ic=function(){return Vn(this.Qa)},n.prototype.Jb=function(o){return o!=null&&this.bind(o),this.step(),this.reset()},n.prototype.Lb=function(o,p){p==null&&(p=this.Oa,this.Oa+=1),o=je(o),this.yb.push(o),this.db.handleError(kn(this.Qa,p,o,-1,0))},n.prototype.Vb=function(o,p){p==null&&(p=this.Oa,this.Oa+=1);var h=Ve(o.length);P.set(o,h),this.yb.push(h),this.db.handleError(cn(this.Qa,p,h,o.length,0))},n.prototype.Kb=function(o,p){p==null&&(p=this.Oa,this.Oa+=1),this.db.handleError((o===(o|0)?Xn:Yn)(this.Qa,p,o))},n.prototype.Yb=function(o){o==null&&(o=this.Oa,this.Oa+=1),cn(this.Qa,o,0,0,0)},n.prototype.Mb=function(o,p){switch(p==null&&(p=this.Oa,this.Oa+=1),typeof o){case"string":this.Lb(o,p);return;case"number":this.Kb(o,p);return;case"bigint":this.Lb(o.toString(),p);return;case"boolean":this.Kb(o+0,p);return;case"object":if(o===null){this.Yb(p);return}if(o.length!=null){this.Vb(o,p);return}}throw"Wrong API use : tried to bind a value of an unknown type ("+o+")."},n.prototype.Xb=function(o){var p=this;return Object.keys(o).forEach(function(h){var q=Kn(p.Qa,h);q!==0&&p.Mb(o[h],q)}),!0},n.prototype.Wb=function(o){for(var p=0;p<o.length;p+=1)this.Mb(o[p],p+1);return!0},n.prototype.reset=function(){return this.Cb(),ur(this.Qa)===0&&ir(this.Qa)===0},n.prototype.Cb=function(){for(var o;(o=this.yb.pop())!==void 0;)Ue(o)},n.prototype.cb=function(){this.Cb();var o=or(this.Qa)===0;return delete this.db.pb[this.Qa],this.Qa=0,o},r.prototype.next=function(){if(this.ob===null)return{done:!0};if(this.gb!==null&&(this.gb.cb(),this.gb=null),!this.db.db)throw this.Ab(),Error("Database closed");var o=Ye(),p=pe(4);ve(c),ve(p);try{this.db.handleError(sn(this.db.db,this.ub,-1,c,p)),this.ub=ne(p,"i32");var h=ne(c,"i32");return h===0?(this.Ab(),{done:!0}):(this.gb=new n(h,this.db),this.db.pb[h]=this.gb,{value:this.gb,done:!1})}catch(q){throw this.Fb=$(this.ub),this.Ab(),q}finally{ke(o)}},r.prototype.Ab=function(){Ue(this.ob),this.ob=null},r.prototype.jc=function(){return this.Fb!==null?this.Fb:$(this.ub)},typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"&&(r.prototype[Symbol.iterator]=function(){return this}),i.prototype.Jb=function(o,p){if(!this.db)throw"Database closed";if(p){o=this.Gb(o,p);try{o.step()}finally{o.cb()}}else this.handleError(I(this.db,o,0,0,c));return this},i.prototype.exec=function(o,p,h){if(!this.db)throw"Database closed";var q=null,U=null,y=null;try{y=U=je(o);var Q=pe(4);for(o=[];ne(y,"i8")!==0;){ve(c),ve(Q),this.handleError(sn(this.db,y,-1,c,Q));var Y=ne(c,"i32");if(y=ne(Q,"i32"),Y!==0){var V=null;for(q=new n(Y,this),p!=null&&q.bind(p);q.step();)V===null&&(V={columns:q.Db(),values:[]},o.push(V)),V.values.push(q.get(null,h));q.cb()}}return o}catch(J){throw q&&q.cb(),J}finally{U&&Ue(U)}},i.prototype.ec=function(o,p,h,q,U){typeof p=="function"&&(q=h,h=p,p=void 0),o=this.Gb(o,p);try{for(;o.step();)h(o.Ob(null,U))}finally{o.cb()}if(typeof q=="function")return q()},i.prototype.Gb=function(o,p){if(ve(c),this.handleError(x(this.db,o,-1,c,0)),o=ne(c,"i32"),o===0)throw"Nothing to prepare";var h=new n(o,this);return p!=null&&h.bind(p),this.pb[o]=h},i.prototype.pc=function(o){return new r(o,this)},i.prototype.fc=function(){Object.values(this.pb).forEach(function(p){p.cb()}),Object.values(this.Sa).forEach(ie),this.Sa={},this.handleError(O(this.db));var o=$n(this.filename);return this.handleError(L(this.filename,c)),this.db=ne(c,"i32"),En(this.db),o},i.prototype.close=function(){this.db!==null&&(Object.values(this.pb).forEach(function(o){o.cb()}),Object.values(this.Sa).forEach(ie),this.Sa={},this.fb&&(ie(this.fb),this.fb=void 0),this.handleError(O(this.db)),Vt("/"+this.filename),this.db=null)},i.prototype.handleError=function(o){if(o===0)return null;throw o=Qn(this.db),Error(o)},i.prototype.kc=function(){return F(this.db)},i.prototype.bc=function(o,p){Object.prototype.hasOwnProperty.call(this.Sa,o)&&(ie(this.Sa[o]),delete this.Sa[o]);var h=Ie(function(q,U,y){U=t(U,y);try{var Q=p.apply(null,U)}catch(Y){Ke(q,Y,-1);return}e(q,Q)},"viii");return this.Sa[o]=h,this.handleError(mn(this.db,o,p.length,1,0,h,0,0,0)),this},i.prototype.ac=function(o,p){var h=p.init||function(){return null},q=p.finalize||function(V){return V},U=p.step;if(!U)throw"An aggregate function must have a step function in "+o;var y={};Object.hasOwnProperty.call(this.Sa,o)&&(ie(this.Sa[o]),delete this.Sa[o]),p=o+"__finalize",Object.hasOwnProperty.call(this.Sa,p)&&(ie(this.Sa[p]),delete this.Sa[p]);var Q=Ie(function(V,J,ht){var Ee=pn(V,1);Object.hasOwnProperty.call(y,Ee)||(y[Ee]=h()),J=t(J,ht),J=[y[Ee]].concat(J);try{y[Ee]=U.apply(null,J)}catch(br){delete y[Ee],Ke(V,br,-1)}},"viii"),Y=Ie(function(V){var J=pn(V,1);try{var ht=q(y[J])}catch(Ee){delete y[J],Ke(V,Ee,-1);return}e(V,ht),delete y[J]},"vi");return this.Sa[o]=Q,this.Sa[p]=Y,this.handleError(mn(this.db,o,U.length-1,1,0,0,Q,Y,0)),this},i.prototype.vc=function(o){return this.fb&&(fn(this.db,0,0),ie(this.fb),this.fb=void 0),o?(this.fb=Ie(function(p,h,q,U,y){switch(h){case 18:p="insert";break;case 23:p="update";break;case 9:p="delete";break;default:throw"unknown operationCode in updateHook callback: "+h}if(q=$(q),U=$(U),y>Number.MAX_SAFE_INTEGER)throw"rowId too big to fit inside a Number";o(p,q,U,Number(y))},"viiiij"),fn(this.db,this.fb,0),this):this},n.prototype.bind=n.prototype.bind,n.prototype.step=n.prototype.step,n.prototype.get=n.prototype.get,n.prototype.getColumnNames=n.prototype.Db,n.prototype.getAsObject=n.prototype.Ob,n.prototype.getSQL=n.prototype.lc,n.prototype.getNormalizedSQL=n.prototype.ic,n.prototype.run=n.prototype.Jb,n.prototype.reset=n.prototype.reset,n.prototype.freemem=n.prototype.Cb,n.prototype.free=n.prototype.cb,r.prototype.next=r.prototype.next,r.prototype.getRemainingSQL=r.prototype.jc,i.prototype.run=i.prototype.Jb,i.prototype.exec=i.prototype.exec,i.prototype.each=i.prototype.ec,i.prototype.prepare=i.prototype.Gb,i.prototype.iterateStatements=i.prototype.pc,i.prototype.export=i.prototype.fc,i.prototype.close=i.prototype.close,i.prototype.handleError=i.prototype.handleError,i.prototype.getRowsModified=i.prototype.kc,i.prototype.create_function=i.prototype.bc,i.prototype.create_aggregate=i.prototype.ac,i.prototype.updateHook=i.prototype.vc,l.Database=i};var D="./this.program",fe=(un=(an=globalThis.document)==null?void 0:an.currentScript)==null?void 0:un.src;A&&(fe=self.location.href);var Te="",te,ze;if(K||A){try{Te=new URL(".",fe).href}catch{}A&&(ze=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),te=async e=>{if(e=await fetch(e,{credentials:"same-origin"}),e.ok)return e.arrayBuffer();throw Error(e.status+" : "+e.url)}}var Qe=console.log.bind(console),se=console.error.bind(console),ge,Me=!1,Je,P,H,Re,G,M,Ze,et,z;function Nt(){var e=Xe.buffer;P=new Int8Array(e),Re=new Int16Array(e),H=new Uint8Array(e),G=new Int32Array(e),M=new Uint32Array(e),Ze=new Float32Array(e),et=new Float64Array(e),z=new BigInt64Array(e),new BigUint64Array(e)}function Ne(e){var t;throw(t=l.onAbort)==null||t.call(l,e),e="Aborted("+e+")",se(e),Me=!0,new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info.")}var tt;async function Nn(e){if(!ge)try{var t=await te(e);return new Uint8Array(t)}catch{}if(e==tt&&ge)e=new Uint8Array(ge);else if(ze)e=ze(e);else throw"both async and sync fetching of the wasm failed";return e}async function Ln(e,t){try{var n=await Nn(e);return await WebAssembly.instantiate(n,t)}catch(r){se(`failed to asynchronously prepare wasm: ${r}`),Ne(r)}}async function vn(e){var t=tt;if(!ge)try{var n=fetch(t,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(n,e)}catch(r){se(`wasm streaming compile failed: ${r}`),se("falling back to ArrayBuffer instantiation")}return Ln(t,e)}class Lt{constructor(t){oe(this,"name","ExitStatus");this.message=`Program terminated with exit(${t})`,this.status=t}}var vt=e=>{for(;0<e.length;)e.shift()(l)},wt=[],St=[],wn=()=>{var e=l.preRun.shift();St.push(e)},ce=0,Le=null;function ne(e,t="i8"){switch(t.endsWith("*")&&(t="*"),t){case"i1":return P[e];case"i8":return P[e];case"i16":return Re[e>>1];case"i32":return G[e>>2];case"i64":return z[e>>3];case"float":return Ze[e>>2];case"double":return et[e>>3];case"*":return M[e>>2];default:Ne(`invalid type for getValue: ${t}`)}}var Ce=!0;function ve(e){var t="i32";switch(t.endsWith("*")&&(t="*"),t){case"i1":P[e]=0;break;case"i8":P[e]=0;break;case"i16":Re[e>>1]=0;break;case"i32":G[e>>2]=0;break;case"i64":z[e>>3]=BigInt(0);break;case"float":Ze[e>>2]=0;break;case"double":et[e>>3]=0;break;case"*":M[e>>2]=0;break;default:Ne(`invalid type for setValue: ${t}`)}}var It=new TextDecoder,Ut=(e,t,n,r)=>{if(n=t+n,r)return n;for(;e[t]&&!(t>=n);)++t;return t},$=(e,t,n)=>e?It.decode(H.subarray(e,Ut(H,e,t,n))):"",yt=(e,t)=>{for(var n=0,r=e.length-1;0<=r;r--){var i=e[r];i==="."?e.splice(r,1):i===".."?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n;n--)e.unshift("..");return e},nt=e=>{var t=e.charAt(0)==="/",n=e.slice(-1)==="/";return(e=yt(e.split("/").filter(r=>!!r),!t).join("/"))||t||(e="."),e&&n&&(e+="/"),(t?"/":"")+e},At=e=>{var t=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);return e=t[0],t=t[1],!e&&!t?".":(t&&(t=t.slice(0,-1)),e+t)},Fe=e=>e&&e.match(/([^\/]+|\/)\/*$/)[1],Sn=()=>e=>crypto.getRandomValues(e),Ot=e=>{(Ot=Sn())(e)},In=(...e)=>{for(var t="",n=!1,r=e.length-1;-1<=r&&!n;r--){if(n=0<=r?e[r]:"/",typeof n!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!n)return"";t=n+"/"+t,n=n.charAt(0)==="/"}return t=yt(t.split("/").filter(i=>!!i),!n).join("/"),(n?"/":"")+t||"."},De=e=>{var t=Ut(e,0);return It.decode(e.buffer?e.subarray(0,t):new Uint8Array(e.slice(0,t)))},rt=[],_e=e=>{for(var t=0,n=0;n<e.length;++n){var r=e.charCodeAt(n);127>=r?t++:2047>=r?t+=2:55296<=r&&57343>=r?(t+=4,++n):t+=3}return t},Z=(e,t,n,r)=>{if(!(0<r))return 0;var i=n;r=n+r-1;for(var c=0;c<e.length;++c){var d=e.codePointAt(c);if(127>=d){if(n>=r)break;t[n++]=d}else if(2047>=d){if(n+1>=r)break;t[n++]=192|d>>6,t[n++]=128|d&63}else if(65535>=d){if(n+2>=r)break;t[n++]=224|d>>12,t[n++]=128|d>>6&63,t[n++]=128|d&63}else{if(n+3>=r)break;t[n++]=240|d>>18,t[n++]=128|d>>12&63,t[n++]=128|d>>6&63,t[n++]=128|d&63,c++}}return t[n]=0,n-i},Mt=[];function Ct(e,t){Mt[e]={input:[],output:[],kb:t},ct(e,Un)}var Un={open(e){var t=Mt[e.node.nb];if(!t)throw new f(43);e.Va=t,e.seekable=!1},close(e){e.Va.kb.lb(e.Va)},lb(e){e.Va.kb.lb(e.Va)},read(e,t,n,r){if(!e.Va||!e.Va.kb.Qb)throw new f(60);for(var i=0,c=0;c<r;c++){try{var d=e.Va.kb.Qb(e.Va)}catch{throw new f(29)}if(d===void 0&&i===0)throw new f(6);if(d==null)break;i++,t[n+c]=d}return i&&(e.node.$a=Date.now()),i},write(e,t,n,r){if(!e.Va||!e.Va.kb.Hb)throw new f(60);try{for(var i=0;i<r;i++)e.Va.kb.Hb(e.Va,t[n+i])}catch{throw new f(29)}return r&&(e.node.Ua=e.node.Ta=Date.now()),i}},yn={Qb(){var n;e:{if(!rt.length){var e=null;if((n=globalThis.window)!=null&&n.prompt&&(e=window.prompt("Input: "),e!==null&&(e+=`
`)),!e){var t=null;break e}t=Array(_e(e)+1),e=Z(e,t,0,t.length),t.length=e,rt=t}t=rt.shift()}return t},Hb(e,t){t===null||t===10?(Qe(De(e.output)),e.output=[]):t!=0&&e.output.push(t)},lb(e){var t;0<((t=e.output)==null?void 0:t.length)&&(Qe(De(e.output)),e.output=[])},Dc(){return{yc:25856,Ac:5,xc:191,zc:35387,wc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Ec(){return 0},Fc(){return[24,80]}},An={Hb(e,t){t===null||t===10?(se(De(e.output)),e.output=[]):t!=0&&e.output.push(t)},lb(e){var t;0<((t=e.output)==null?void 0:t.length)&&(se(De(e.output)),e.output=[])}},S={Za:null,ab(){return S.createNode(null,"/",16895,0)},createNode(e,t,n,r){if((n&61440)===24576||(n&61440)===4096)throw new f(63);return S.Za||(S.Za={dir:{node:{Wa:S.La.Wa,Xa:S.La.Xa,mb:S.La.mb,rb:S.La.rb,Tb:S.La.Tb,xb:S.La.xb,vb:S.La.vb,Ib:S.La.Ib,wb:S.La.wb},stream:{Ya:S.Ma.Ya}},file:{node:{Wa:S.La.Wa,Xa:S.La.Xa},stream:{Ya:S.Ma.Ya,read:S.Ma.read,write:S.Ma.write,sb:S.Ma.sb,tb:S.Ma.tb}},link:{node:{Wa:S.La.Wa,Xa:S.La.Xa,eb:S.La.eb},stream:{}},Nb:{node:{Wa:S.La.Wa,Xa:S.La.Xa},stream:Dn}}),n=Pt(e,t,n,r),j(n.mode)?(n.La=S.Za.dir.node,n.Ma=S.Za.dir.stream,n.Na={}):(n.mode&61440)===32768?(n.La=S.Za.file.node,n.Ma=S.Za.file.stream,n.Ra=0,n.Na=null):(n.mode&61440)===40960?(n.La=S.Za.link.node,n.Ma=S.Za.link.stream):(n.mode&61440)===8192&&(n.La=S.Za.Nb.node,n.Ma=S.Za.Nb.stream),n.$a=n.Ua=n.Ta=Date.now(),e&&(e.Na[t]=n,e.$a=e.Ua=e.Ta=n.$a),n},Cc(e){return e.Na?e.Na.subarray?e.Na.subarray(0,e.Ra):new Uint8Array(e.Na):new Uint8Array(0)},La:{Wa(e){var t={};return t.cc=(e.mode&61440)===8192?e.id:1,t.oc=e.id,t.mode=e.mode,t.rc=1,t.uid=0,t.nc=0,t.nb=e.nb,j(e.mode)?t.size=4096:(e.mode&61440)===32768?t.size=e.Ra:(e.mode&61440)===40960?t.size=e.link.length:t.size=0,t.$a=new Date(e.$a),t.Ua=new Date(e.Ua),t.Ta=new Date(e.Ta),t.Zb=4096,t.$b=Math.ceil(t.size/t.Zb),t},Xa(e,t){for(var n of["mode","atime","mtime","ctime"])t[n]!=null&&(e[n]=t[n]);t.size!==void 0&&(t=t.size,e.Ra!=t&&(t==0?(e.Na=null,e.Ra=0):(n=e.Na,e.Na=new Uint8Array(t),n&&e.Na.set(n.subarray(0,Math.min(t,e.Ra))),e.Ra=t)))},mb(){throw S.zb||(S.zb=new f(44),S.zb.stack="<generic error, no stack>"),S.zb},rb(e,t,n,r){return S.createNode(e,t,n,r)},Tb(e,t,n){try{var r=le(t,n)}catch{}if(r){if(j(e.mode))for(var i in r.Na)throw new f(55);ot(r)}delete e.parent.Na[e.name],t.Na[n]=e,e.name=n,t.Ta=t.Ua=e.parent.Ta=e.parent.Ua=Date.now()},xb(e,t){delete e.Na[t],e.Ta=e.Ua=Date.now()},vb(e,t){var n=le(e,t),r;for(r in n.Na)throw new f(55);delete e.Na[t],e.Ta=e.Ua=Date.now()},Ib(e){return[".","..",...Object.keys(e.Na)]},wb(e,t,n){return e=S.createNode(e,t,41471,0),e.link=n,e},eb(e){if((e.mode&61440)!==40960)throw new f(28);return e.link}},Ma:{read(e,t,n,r,i){var c=e.node.Na;if(i>=e.node.Ra)return 0;if(e=Math.min(e.node.Ra-i,r),8<e&&c.subarray)t.set(c.subarray(i,i+e),n);else for(r=0;r<e;r++)t[n+r]=c[i+r];return e},write(e,t,n,r,i,c){if(t.buffer===P.buffer&&(c=!1),!r)return 0;if(e=e.node,e.Ua=e.Ta=Date.now(),t.subarray&&(!e.Na||e.Na.subarray)){if(c)return e.Na=t.subarray(n,n+r),e.Ra=r;if(e.Ra===0&&i===0)return e.Na=t.slice(n,n+r),e.Ra=r;if(i+r<=e.Ra)return e.Na.set(t.subarray(n,n+r),i),r}c=i+r;var d=e.Na?e.Na.length:0;if(d>=c||(c=Math.max(c,d*(1048576>d?2:1.125)>>>0),d!=0&&(c=Math.max(c,256)),d=e.Na,e.Na=new Uint8Array(c),0<e.Ra&&e.Na.set(d.subarray(0,e.Ra),0)),e.Na.subarray&&t.subarray)e.Na.set(t.subarray(n,n+r),i);else for(c=0;c<r;c++)e.Na[i+c]=t[n+c];return e.Ra=Math.max(e.Ra,i+r),r},Ya(e,t,n){if(n===1?t+=e.position:n===2&&(e.node.mode&61440)===32768&&(t+=e.node.Ra),0>t)throw new f(28);return t},sb(e,t,n,r,i){if((e.node.mode&61440)!==32768)throw new f(43);if(e=e.node.Na,i&2||!e||e.buffer!==P.buffer){i=!0,r=65536*Math.ceil(t/65536);var c=nn(65536,r);if(c&&H.fill(0,c,c+r),r=c,!r)throw new f(48);e&&((0<n||n+t<e.length)&&(e.subarray?e=e.subarray(n,n+t):e=Array.prototype.slice.call(e,n,n+t)),P.set(e,r))}else i=!1,r=e.byteOffset;return{tc:r,Ub:i}},tb(e,t,n,r){return S.Ma.write(e,t,0,r,n,!1),0}}},Ft=(e,t)=>{var n=0;return e&&(n|=365),t&&(n|=146),n},at=null,Dt={},be=[],On=1,re=null,Gt=!1,$t=!0,f=class{constructor(e){oe(this,"name","ErrnoError");this.Pa=e}},Mn=class{constructor(){oe(this,"qb",{});oe(this,"node",null)}get flags(){return this.qb.flags}set flags(e){this.qb.flags=e}get position(){return this.qb.position}set position(e){this.qb.position=e}},Cn=class{constructor(e,t,n,r){oe(this,"La",{});oe(this,"Ma",{});oe(this,"ib",null);e||(e=this),this.parent=e,this.ab=e.ab,this.id=On++,this.name=t,this.mode=n,this.nb=r,this.$a=this.Ua=this.Ta=Date.now()}get read(){return(this.mode&365)===365}set read(e){e?this.mode|=365:this.mode&=-366}get write(){return(this.mode&146)===146}set write(e){e?this.mode|=146:this.mode&=-147}};function k(e,t={}){if(!e)throw new f(44);t.Bb??(t.Bb=!0),e.charAt(0)==="/"||(e="//"+e);var n=0;e:for(;40>n;n++){e=e.split("/").filter(L=>!!L);for(var r=at,i="/",c=0;c<e.length;c++){var d=c===e.length-1;if(d&&t.parent)break;if(e[c]!==".")if(e[c]==="..")if(i=At(i),r===r.parent){e=i+"/"+e.slice(c+1).join("/"),n--;continue e}else r=r.parent;else{i=nt(i+"/"+e[c]);try{r=le(r,e[c])}catch(L){if((L==null?void 0:L.Pa)===44&&d&&t.sc)return{path:i};throw L}if(!r.ib||d&&!t.Bb||(r=r.ib.root),(r.mode&61440)===40960&&(!d||t.hb)){if(!r.La.eb)throw new f(52);r=r.La.eb(r),r.charAt(0)==="/"||(r=At(i)+"/"+r),e=r+"/"+e.slice(c+1).join("/");continue e}}}return{path:i,node:r}}throw new f(32)}function it(e){for(var t;;){if(e===e.parent)return e=e.ab.Sb,t?e[e.length-1]!=="/"?`${e}/${t}`:e+t:e;t=t?`${e.name}/${t}`:e.name,e=e.parent}}function ut(e,t){for(var n=0,r=0;r<t.length;r++)n=(n<<5)-n+t.charCodeAt(r)|0;return(e+n>>>0)%re.length}function ot(e){var t=ut(e.parent.id,e.name);if(re[t]===e)re[t]=e.jb;else for(t=re[t];t;){if(t.jb===e){t.jb=e.jb;break}t=t.jb}}function le(e,t){var n=j(e.mode)?(n=he(e,"x"))?n:e.La.mb?0:2:54;if(n)throw new f(n);for(n=re[ut(e.id,t)];n;n=n.jb){var r=n.name;if(n.parent.id===e.id&&r===t)return n}return e.La.mb(e,t)}function Pt(e,t,n,r){return e=new Cn(e,t,n,r),t=ut(e.parent.id,e.name),e.jb=re[t],re[t]=e}function j(e){return(e&61440)===16384}function he(e,t){return $t?0:t.includes("r")&&!(e.mode&292)||t.includes("w")&&!(e.mode&146)||t.includes("x")&&!(e.mode&73)?2:0}function xt(e,t){if(!j(e.mode))return 54;try{return le(e,t),20}catch{}return he(e,"wx")}function Wt(e,t,n){try{var r=le(e,t)}catch(i){return i.Pa}if(e=he(e,"wx"))return e;if(n){if(!j(r.mode))return 54;if(r===r.parent||it(r)==="/")return 10}else if(j(r.mode))return 31;return 0}function Ge(e){if(!e)throw new f(63);return e}function B(e){if(e=be[e],!e)throw new f(8);return e}function Ht(e,t=-1){if(e=Object.assign(new Mn,e),t==-1)e:{for(t=0;4096>=t;t++)if(!be[t])break e;throw new f(33)}return e.bb=t,be[t]=e}function Fn(e,t=-1){var n,r;return e=Ht(e,t),(r=(n=e.Ma)==null?void 0:n.Bc)==null||r.call(n,e),e}function st(e,t,n){var r=e==null?void 0:e.Ma.Xa;e=r?e:t,r??(r=t.La.Xa),Ge(r),r(e,n)}var Dn={open(e){var t,n;e.Ma=Dt[e.node.nb].Ma,(n=(t=e.Ma).open)==null||n.call(t,e)},Ya(){throw new f(70)}};function ct(e,t){Dt[e]={Ma:t}}function Bt(e,t){var n=t==="/";if(n&&at)throw new f(10);if(!n&&t){var r=k(t,{Bb:!1});if(t=r.path,r=r.node,r.ib)throw new f(10);if(!j(r.mode))throw new f(54)}t={type:e,Gc:{},Sb:t,qc:[]},e=e.ab(t),e.ab=t,t.root=e,n?at=e:r&&(r.ib=t,r.ab&&r.ab.qc.push(t))}function $e(e,t,n){var r=k(e,{parent:!0}).node;if(e=Fe(e),!e)throw new f(28);if(e==="."||e==="..")throw new f(20);var i=xt(r,e);if(i)throw new f(i);if(!r.La.rb)throw new f(63);return r.La.rb(r,e,t,n)}function Gn(e,t=438){return $e(e,t&4095|32768,0)}function ee(e,t=511){return $e(e,t&1023|16384,0)}function Pe(e,t,n){typeof n>"u"&&(n=t,t=438),$e(e,t|8192,n)}function lt(e,t){if(!In(e))throw new f(44);var n=k(t,{parent:!0}).node;if(!n)throw new f(44);t=Fe(t);var r=xt(n,t);if(r)throw new f(r);if(!n.La.wb)throw new f(63);n.La.wb(n,t,e)}function jt(e){var t=k(e,{parent:!0}).node;e=Fe(e);var n=le(t,e),r=Wt(t,e,!0);if(r)throw new f(r);if(!t.La.vb)throw new f(63);if(n.ib)throw new f(10);t.La.vb(t,e),ot(n)}function Vt(e){var t=k(e,{parent:!0}).node;if(!t)throw new f(44);e=Fe(e);var n=le(t,e),r=Wt(t,e,!1);if(r)throw new f(r);if(!t.La.xb)throw new f(63);if(n.ib)throw new f(10);t.La.xb(t,e),ot(n)}function we(e,t){return e=k(e,{hb:!t}).node,Ge(e.La.Wa)(e)}function kt(e,t,n,r){st(e,t,{mode:n&4095|t.mode&-4096,Ta:Date.now(),dc:r})}function xe(e,t){e=typeof e=="string"?k(e,{hb:!0}).node:e,kt(null,e,t)}function Yt(e,t,n){if(j(t.mode))throw new f(31);if((t.mode&61440)!==32768)throw new f(28);var r=he(t,"w");if(r)throw new f(r);st(e,t,{size:n,timestamp:Date.now()})}function qe(e,t,n=438){if(e==="")throw new f(44);if(typeof t=="string"){var r={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[t];if(typeof r>"u")throw Error(`Unknown file open mode: ${t}`);t=r}if(n=t&64?n&4095|32768:0,typeof e=="object")r=e;else{var i=e.endsWith("/"),c=k(e,{hb:!(t&131072),sc:!0});r=c.node,e=c.path}if(c=!1,t&64)if(r){if(t&128)throw new f(20)}else{if(i)throw new f(31);r=$e(e,n|511,0),c=!0}if(!r)throw new f(44);if((r.mode&61440)===8192&&(t&=-513),t&65536&&!j(r.mode))throw new f(54);if(!c&&(r?(r.mode&61440)===40960?i=32:(i=["r","w","rw"][t&3],t&512&&(i+="w"),i=j(r.mode)&&(i!=="r"||t&576)?31:he(r,i)):i=44,i))throw new f(i);return t&512&&!c&&(i=r,i=typeof i=="string"?k(i,{hb:!0}).node:i,Yt(null,i,0)),t=Ht({node:r,path:it(r),flags:t&-131713,seekable:!0,position:0,Ma:r.Ma,uc:[],error:!1}),t.Ma.open&&t.Ma.open(t),c&&xe(r,n&511),t}function mt(e){if(e.bb===null)throw new f(8);e.Eb&&(e.Eb=null);try{e.Ma.close&&e.Ma.close(e)}catch(t){throw t}finally{be[e.bb]=null}e.bb=null}function Xt(e,t,n){if(e.bb===null)throw new f(8);if(!e.seekable||!e.Ma.Ya)throw new f(70);if(n!=0&&n!=1&&n!=2)throw new f(28);e.position=e.Ma.Ya(e,t,n),e.uc=[]}function Kt(e,t,n,r,i){if(0>r||0>i)throw new f(28);if(e.bb===null)throw new f(8);if((e.flags&2097155)===1)throw new f(8);if(j(e.node.mode))throw new f(31);if(!e.Ma.read)throw new f(28);var c=typeof i<"u";if(!c)i=e.position;else if(!e.seekable)throw new f(70);return t=e.Ma.read(e,t,n,r,i),c||(e.position+=t),t}function zt(e,t,n,r,i){if(0>r||0>i)throw new f(28);if(e.bb===null)throw new f(8);if((e.flags&2097155)===0)throw new f(8);if(j(e.node.mode))throw new f(31);if(!e.Ma.write)throw new f(28);e.seekable&&e.flags&1024&&Xt(e,0,2);var c=typeof i<"u";if(!c)i=e.position;else if(!e.seekable)throw new f(70);return t=e.Ma.write(e,t,n,r,i,void 0),c||(e.position+=t),t}function $n(e){var t=t||0;t=qe(e,t),e=we(e).size;var n=new Uint8Array(e);return Kt(t,n,0,e,0),mt(t),n}function ae(e,t,n){e=nt("/dev/"+e);var r=Ft(!!t,!!n);ae.Rb??(ae.Rb=64);var i=ae.Rb++<<8|0;ct(i,{open(c){c.seekable=!1},close(){var c;(c=n==null?void 0:n.buffer)!=null&&c.length&&n(10)},read(c,d,L,O){for(var I=0,F=0;F<O;F++){try{var x=t()}catch{throw new f(29)}if(x===void 0&&I===0)throw new f(6);if(x==null)break;I++,d[L+F]=x}return I&&(c.node.$a=Date.now()),I},write(c,d,L,O){for(var I=0;I<O;I++)try{n(d[L+I])}catch{throw new f(29)}return O&&(c.node.Ua=c.node.Ta=Date.now()),I}}),Pe(e,r,i)}var C={};function me(e,t,n){if(t.charAt(0)==="/")return t;if(e=e===-100?"/":B(e).path,t.length==0){if(!n)throw new f(44);return e}return e+"/"+t}function We(e,t){M[e>>2]=t.cc,M[e+4>>2]=t.mode,M[e+8>>2]=t.rc,M[e+12>>2]=t.uid,M[e+16>>2]=t.nc,M[e+20>>2]=t.nb,z[e+24>>3]=BigInt(t.size),G[e+32>>2]=4096,G[e+36>>2]=t.$b;var n=t.$a.getTime(),r=t.Ua.getTime(),i=t.Ta.getTime();return z[e+40>>3]=BigInt(Math.floor(n/1e3)),M[e+48>>2]=n%1e3*1e6,z[e+56>>3]=BigInt(Math.floor(r/1e3)),M[e+64>>2]=r%1e3*1e6,z[e+72>>3]=BigInt(Math.floor(i/1e3)),M[e+80>>2]=i%1e3*1e6,z[e+88>>3]=BigInt(t.oc),0}var He=void 0,Be=()=>{var e=G[+He>>2];return He+=4,e},dt=0,Pn=[0,31,60,91,121,152,182,213,244,274,305,335],xn=[0,31,59,90,120,151,181,212,243,273,304,334],Se={},Qt=e=>{if(!(e instanceof Lt||e=="unwind"))throw e},Jt=e=>{var t;throw Je=e,Ce||0<dt||((t=l.onExit)==null||t.call(l,e),Me=!0),new Lt(e)},Wn=e=>{if(!Me)try{e()}catch(t){Qt(t)}finally{if(!(Ce||0<dt))try{Je=e=Je,Jt(e)}catch(t){Qt(t)}}},pt={},Zt=()=>{var r;if(!Et){var e={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((r=globalThis.navigator)==null?void 0:r.language)??"C").replace("-","_")+".UTF-8",_:D||"./this.program"},t;for(t in pt)pt[t]===void 0?delete e[t]:e[t]=pt[t];var n=[];for(t in e)n.push(`${t}=${e[t]}`);Et=n}return Et},Et,Hn=(e,t,n,r)=>{var i={string:I=>{var F=0;if(I!=null&&I!==0){F=_e(I)+1;var x=pe(F);Z(I,H,x,F),F=x}return F},array:I=>{var F=pe(I.length);return P.set(I,F),F}};e=l["_"+e];var c=[],d=0;if(r)for(var L=0;L<r.length;L++){var O=i[n[L]];O?(d===0&&(d=Ye()),c[L]=O(r[L])):c[L]=r[L]}return n=e(...c),n=(function(I){return d!==0&&ke(d),t==="string"?$(I):t==="boolean"?!!I:I})(n)},je=e=>{var t=_e(e)+1,n=Ve(t);return n&&Z(e,H,n,t),n},de,ft=[],ie=e=>{de.delete(ue.get(e)),ue.set(e,null),ft.push(e)},en=e=>{const t=e.length;return[t%128|128,t>>7,...e]},Bn={i:127,p:127,j:126,f:125,d:124,e:111},tn=e=>en(Array.from(e,t=>Bn[t])),Ie=(e,t)=>{if(!de){de=new WeakMap;var n=ue.length;if(de)for(var r=0;r<0+n;r++){var i=ue.get(r);i&&de.set(i,r)}}if(n=de.get(e)||0)return n;n=ft.length?ft.pop():ue.grow(1);try{ue.set(n,e)}catch(c){if(!(c instanceof TypeError))throw c;t=Uint8Array.of(0,97,115,109,1,0,0,0,1,...en([1,96,...tn(t.slice(1)),...tn(t[0]==="v"?"":t[0])]),2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),t=new WebAssembly.Module(t),t=new WebAssembly.Instance(t,{e:{f:e}}).exports.f,ue.set(n,t)}return de.set(e,n),n};if(re=Array(4096),Bt(S,"/"),ee("/tmp"),ee("/home"),ee("/home/web_user"),(function(){ee("/dev"),ct(259,{read:()=>0,write:(r,i,c,d)=>d,Ya:()=>0}),Pe("/dev/null",259),Ct(1280,yn),Ct(1536,An),Pe("/dev/tty",1280),Pe("/dev/tty1",1536);var e=new Uint8Array(1024),t=0,n=()=>(t===0&&(Ot(e),t=e.byteLength),e[--t]);ae("random",n),ae("urandom",n),ee("/dev/shm"),ee("/dev/shm/tmp")})(),(function(){ee("/proc");var e=ee("/proc/self");ee("/proc/self/fd"),Bt({ab(){var t=Pt(e,"fd",16895,73);return t.Ma={Ya:S.Ma.Ya},t.La={mb(n,r){n=+r;var i=B(n);return n={parent:null,ab:{Sb:"fake"},La:{eb:()=>i.path},id:n+1},n.parent=n},Ib(){return Array.from(be.entries()).filter(([,n])=>n).map(([n])=>n.toString())}},t}},"/proc/self/fd")})(),l.noExitRuntime&&(Ce=l.noExitRuntime),l.print&&(Qe=l.print),l.printErr&&(se=l.printErr),l.wasmBinary&&(ge=l.wasmBinary),l.thisProgram&&(D=l.thisProgram),l.preInit)for(typeof l.preInit=="function"&&(l.preInit=[l.preInit]);0<l.preInit.length;)l.preInit.shift()();l.stackSave=()=>Ye(),l.stackRestore=e=>ke(e),l.stackAlloc=e=>pe(e),l.cwrap=(e,t,n,r)=>{var i=!n||n.every(c=>c==="number"||c==="boolean");return t!=="string"&&i&&!r?l["_"+e]:(...c)=>Hn(e,t,n,c)},l.addFunction=Ie,l.removeFunction=ie,l.UTF8ToString=$,l.stringToNewUTF8=je,l.writeArrayToMemory=(e,t)=>{P.set(e,t)};var Ve,Ue,nn,rn,ke,pe,Ye,Xe,ue,jn={a:(e,t,n,r)=>Ne(`Assertion failed: ${$(e)}, at: `+[t?$(t):"unknown filename",n,r?$(r):"unknown function"]),i:function(e,t){try{return e=$(e),xe(e,t),0}catch(n){if(typeof C>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},L:function(e,t,n){try{if(t=$(t),t=me(e,t),n&-8)return-28;var r=k(t,{hb:!0}).node;return r?(e="",n&4&&(e+="r"),n&2&&(e+="w"),n&1&&(e+="x"),e&&he(r,e)?-2:0):-44}catch(i){if(typeof C>"u"||i.name!=="ErrnoError")throw i;return-i.Pa}},j:function(e,t){try{var n=B(e);return kt(n,n.node,t,!1),0}catch(r){if(typeof C>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},h:function(e){try{var t=B(e);return st(t,t.node,{timestamp:Date.now(),dc:!1}),0}catch(n){if(typeof C>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},b:function(e,t,n){He=n;try{var r=B(e);switch(t){case 0:var i=Be();if(0>i)break;for(;be[i];)i++;return Fn(r,i).bb;case 1:case 2:return 0;case 3:return r.flags;case 4:return i=Be(),r.flags|=i,0;case 12:return i=Be(),Re[i+0>>1]=2,0;case 13:case 14:return 0}return-28}catch(c){if(typeof C>"u"||c.name!=="ErrnoError")throw c;return-c.Pa}},g:function(e,t){try{var n=B(e),r=n.node,i=n.Ma.Wa;e=i?n:r,i??(i=r.La.Wa),Ge(i);var c=i(e);return We(t,c)}catch(d){if(typeof C>"u"||d.name!=="ErrnoError")throw d;return-d.Pa}},H:function(e,t){t=-9007199254740992>t||9007199254740992<t?NaN:Number(t);try{if(isNaN(t))return-61;var n=B(e);if(0>t||(n.flags&2097155)===0)throw new f(28);return Yt(n,n.node,t),0}catch(r){if(typeof C>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},G:function(e,t){try{if(t===0)return-28;var n=_e("/")+1;return t<n?-68:(Z("/",H,e,t),n)}catch(r){if(typeof C>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},K:function(e,t){try{return e=$(e),We(t,we(e,!0))}catch(n){if(typeof C>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},C:function(e,t,n){try{return t=$(t),t=me(e,t),ee(t,n),0}catch(r){if(typeof C>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},J:function(e,t,n,r){try{t=$(t);var i=r&256;return t=me(e,t,r&4096),We(n,i?we(t,!0):we(t))}catch(c){if(typeof C>"u"||c.name!=="ErrnoError")throw c;return-c.Pa}},x:function(e,t,n,r){He=r;try{t=$(t),t=me(e,t);var i=r?Be():0;return qe(t,n,i).bb}catch(c){if(typeof C>"u"||c.name!=="ErrnoError")throw c;return-c.Pa}},v:function(e,t,n,r){try{if(t=$(t),t=me(e,t),0>=r)return-28;var i=k(t).node;if(!i)throw new f(44);if(!i.La.eb)throw new f(28);var c=i.La.eb(i),d=Math.min(r,_e(c)),L=P[n+d];return Z(c,H,n,r+1),P[n+d]=L,d}catch(O){if(typeof C>"u"||O.name!=="ErrnoError")throw O;return-O.Pa}},u:function(e){try{return e=$(e),jt(e),0}catch(t){if(typeof C>"u"||t.name!=="ErrnoError")throw t;return-t.Pa}},f:function(e,t){try{return e=$(e),We(t,we(e))}catch(n){if(typeof C>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},r:function(e,t,n){try{if(t=$(t),t=me(e,t),n)if(n===512)jt(t);else return-28;else Vt(t);return 0}catch(r){if(typeof C>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},q:function(e,t,n){try{t=$(t),t=me(e,t,!0);var r=Date.now(),i,c;if(n){var d=M[n>>2]+4294967296*G[n+4>>2],L=G[n+8>>2];L==1073741823?i=r:L==1073741822?i=null:i=1e3*d+L/1e6,n+=16,d=M[n>>2]+4294967296*G[n+4>>2],L=G[n+8>>2],L==1073741823?c=r:L==1073741822?c=null:c=1e3*d+L/1e6}else c=i=r;if((c??i)!==null){e=i;var O=k(t,{hb:!0}).node;Ge(O.La.Xa)(O,{$a:e,Ua:c})}return 0}catch(I){if(typeof C>"u"||I.name!=="ErrnoError")throw I;return-I.Pa}},m:()=>Ne(""),l:()=>{Ce=!1,dt=0},A:function(e,t){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e),e=new Date(1e3*e),G[t>>2]=e.getSeconds(),G[t+4>>2]=e.getMinutes(),G[t+8>>2]=e.getHours(),G[t+12>>2]=e.getDate(),G[t+16>>2]=e.getMonth(),G[t+20>>2]=e.getFullYear()-1900,G[t+24>>2]=e.getDay();var n=e.getFullYear();G[t+28>>2]=(n%4!==0||n%100===0&&n%400!==0?xn:Pn)[e.getMonth()]+e.getDate()-1|0,G[t+36>>2]=-(60*e.getTimezoneOffset()),n=new Date(e.getFullYear(),6,1).getTimezoneOffset();var r=new Date(e.getFullYear(),0,1).getTimezoneOffset();G[t+32>>2]=(n!=r&&e.getTimezoneOffset()==Math.min(r,n))|0},y:function(e,t,n,r,i,c,d){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i);try{var L=B(r);if((t&2)!==0&&(n&2)===0&&(L.flags&2097155)!==2)throw new f(2);if((L.flags&2097155)===1)throw new f(2);if(!L.Ma.sb)throw new f(43);if(!e)throw new f(28);var O=L.Ma.sb(L,e,i,t,n),I=O.tc;return G[c>>2]=O.Ub,M[d>>2]=I,0}catch(F){if(typeof C>"u"||F.name!=="ErrnoError")throw F;return-F.Pa}},z:function(e,t,n,r,i,c){c=-9007199254740992>c||9007199254740992<c?NaN:Number(c);try{var d=B(i);if(n&2){if((d.node.mode&61440)!==32768)throw new f(43);r&2||d.Ma.tb&&d.Ma.tb(d,H.slice(e,e+t),c,t,r)}}catch(L){if(typeof C>"u"||L.name!=="ErrnoError")throw L;return-L.Pa}},n:(e,t)=>{if(Se[e]&&(clearTimeout(Se[e].id),delete Se[e]),!t)return 0;var n=setTimeout(()=>{delete Se[e],Wn(()=>rn(e,performance.now()))},t);return Se[e]={id:n,Hc:t},0},B:(e,t,n,r)=>{var i=new Date().getFullYear(),c=new Date(i,0,1).getTimezoneOffset();i=new Date(i,6,1).getTimezoneOffset(),M[e>>2]=60*Math.max(c,i),G[t>>2]=+(c!=i),t=d=>{var L=Math.abs(d);return`UTC${0<=d?"-":"+"}${String(Math.floor(L/60)).padStart(2,"0")}${String(L%60).padStart(2,"0")}`},e=t(c),t=t(i),i<c?(Z(e,H,n,17),Z(t,H,r,17)):(Z(e,H,r,17),Z(t,H,n,17))},d:()=>Date.now(),s:()=>2147483648,c:()=>performance.now(),o:e=>{var t=H.length;if(e>>>=0,2147483648<e)return!1;for(var n=1;4>=n;n*=2){var r=t*(1+.2/n);r=Math.min(r,e+100663296);e:{r=(Math.min(2147483648,65536*Math.ceil(Math.max(e,r)/65536))-Xe.buffer.byteLength+65535)/65536|0;try{Xe.grow(r),Nt();var i=1;break e}catch{}i=void 0}if(i)return!0}return!1},E:(e,t)=>{var n=0,r=0,i;for(i of Zt()){var c=t+n;M[e+r>>2]=c,n+=Z(i,H,c,1/0)+1,r+=4}return 0},F:(e,t)=>{var n=Zt();M[e>>2]=n.length,e=0;for(var r of n)e+=_e(r)+1;return M[t>>2]=e,0},e:function(e){try{var t=B(e);return mt(t),0}catch(n){if(typeof C>"u"||n.name!=="ErrnoError")throw n;return n.Pa}},p:function(e,t){try{var n=B(e);return P[t]=n.Va?2:j(n.mode)?3:(n.mode&61440)===40960?7:4,Re[t+2>>1]=0,z[t+8>>3]=BigInt(0),z[t+16>>3]=BigInt(0),0}catch(r){if(typeof C>"u"||r.name!=="ErrnoError")throw r;return r.Pa}},w:function(e,t,n,r){try{e:{var i=B(e);e=t;for(var c,d=t=0;d<n;d++){var L=M[e>>2],O=M[e+4>>2];e+=8;var I=Kt(i,P,L,O,c);if(0>I){var F=-1;break e}if(t+=I,I<O)break;typeof c<"u"&&(c+=I)}F=t}return M[r>>2]=F,0}catch(x){if(typeof C>"u"||x.name!=="ErrnoError")throw x;return x.Pa}},D:function(e,t,n,r){t=-9007199254740992>t||9007199254740992<t?NaN:Number(t);try{if(isNaN(t))return 61;var i=B(e);return Xt(i,t,n),z[r>>3]=BigInt(i.position),i.Eb&&t===0&&n===0&&(i.Eb=null),0}catch(c){if(typeof C>"u"||c.name!=="ErrnoError")throw c;return c.Pa}},I:function(e){var n,r;try{var t=B(e);return(r=(n=t.Ma)==null?void 0:n.lb)==null?void 0:r.call(n,t)}catch(i){if(typeof C>"u"||i.name!=="ErrnoError")throw i;return i.Pa}},t:function(e,t,n,r){try{e:{var i=B(e);e=t;for(var c,d=t=0;d<n;d++){var L=M[e>>2],O=M[e+4>>2];e+=8;var I=zt(i,P,L,O,c);if(0>I){var F=-1;break e}if(t+=I,I<O)break;typeof c<"u"&&(c+=I)}F=t}return M[r>>2]=F,0}catch(x){if(typeof C>"u"||x.name!=="ErrnoError")throw x;return x.Pa}},k:Jt};function _t(){function e(){var i;if(l.calledRun=!0,!Me){if(!l.noFSInit&&!Gt){var t,n;Gt=!0,t??(t=l.stdin),n??(n=l.stdout),r??(r=l.stderr),t?ae("stdin",t):lt("/dev/tty","/dev/stdin"),n?ae("stdout",null,n):lt("/dev/tty","/dev/stdout"),r?ae("stderr",null,r):lt("/dev/tty1","/dev/stderr"),qe("/dev/stdin",0),qe("/dev/stdout",1),qe("/dev/stderr",1)}if(bt.N(),$t=!1,(i=l.onRuntimeInitialized)==null||i.call(l),l.postRun)for(typeof l.postRun=="function"&&(l.postRun=[l.postRun]);l.postRun.length;){var r=l.postRun.shift();wt.push(r)}vt(wt)}}if(0<ce)Le=_t;else{if(l.preRun)for(typeof l.preRun=="function"&&(l.preRun=[l.preRun]);l.preRun.length;)wn();vt(St),0<ce?Le=_t:l.setStatus?(l.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>l.setStatus(""),1),e()},1)):e()}}var bt;return(async function(){var n;function e(r){var i;return r=bt=r.exports,l._sqlite3_free=r.P,l._sqlite3_value_text=r.Q,l._sqlite3_prepare_v2=r.R,l._sqlite3_step=r.S,l._sqlite3_reset=r.T,l._sqlite3_exec=r.U,l._sqlite3_finalize=r.V,l._sqlite3_column_name=r.W,l._sqlite3_column_text=r.X,l._sqlite3_column_type=r.Y,l._sqlite3_errmsg=r.Z,l._sqlite3_clear_bindings=r._,l._sqlite3_value_blob=r.$,l._sqlite3_value_bytes=r.aa,l._sqlite3_value_double=r.ba,l._sqlite3_value_int=r.ca,l._sqlite3_value_type=r.da,l._sqlite3_result_blob=r.ea,l._sqlite3_result_double=r.fa,l._sqlite3_result_error=r.ga,l._sqlite3_result_int=r.ha,l._sqlite3_result_int64=r.ia,l._sqlite3_result_null=r.ja,l._sqlite3_result_text=r.ka,l._sqlite3_aggregate_context=r.la,l._sqlite3_column_count=r.ma,l._sqlite3_data_count=r.na,l._sqlite3_column_blob=r.oa,l._sqlite3_column_bytes=r.pa,l._sqlite3_column_double=r.qa,l._sqlite3_bind_blob=r.ra,l._sqlite3_bind_double=r.sa,l._sqlite3_bind_int=r.ta,l._sqlite3_bind_text=r.ua,l._sqlite3_bind_parameter_index=r.va,l._sqlite3_sql=r.wa,l._sqlite3_normalized_sql=r.xa,l._sqlite3_changes=r.ya,l._sqlite3_close_v2=r.za,l._sqlite3_create_function_v2=r.Aa,l._sqlite3_update_hook=r.Ba,l._sqlite3_open=r.Ca,Ve=l._malloc=r.Da,Ue=l._free=r.Ea,l._RegisterExtensionFunctions=r.Fa,nn=r.Ga,rn=r.Ha,ke=r.Ia,pe=r.Ja,Ye=r.Ka,Xe=r.M,ue=r.O,Nt(),ce--,(i=l.monitorRunDependencies)==null||i.call(l,ce),ce==0&&Le&&(r=Le,Le=null,r()),bt}ce++,(n=l.monitorRunDependencies)==null||n.call(l,ce);var t={a:jn};return l.instantiateWasm?new Promise(r=>{l.instantiateWasm(t,(i,c)=>{r(e(i))})}):(tt??(tt=l.locateFile?l.locateFile("sql-wasm-browser.wasm",Te):Te+"sql-wasm-browser.wasm"),e((await vn(t)).instance))})(),_t(),v}),s)};a.exports=m,a.exports.default=m})(qt)),qt.exports}var Lr=Nr();const vr=Rr(Lr),wr=`-- ============================================================
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
`,Sr=`-- Migration 001 : gold de départ 0 → 50
-- Seuls les joueurs à 0 gold sont mis à jour (ceux qui ont dépensé leur or ne sont pas touchés)
UPDATE personnage SET gold_actuel = 50 WHERE gold_actuel = 0;
PRAGMA user_version = 1;
`,Ir=`-- Migration 002 : ajout colonne avatar sur personnage
ALTER TABLE personnage ADD COLUMN avatar TEXT DEFAULT NULL;
PRAGMA user_version = 2;
`,Ur=`-- Migration 003 : liaison donjon <-> personnage

-- Donjon actif du personnage (NULL si pas en cours)
ALTER TABLE personnage ADD COLUMN donjon_id_actuel INTEGER REFERENCES donjon(id) DEFAULT NULL;

-- Historique des runs de donjon
CREATE TABLE IF NOT EXISTS historique_donjon (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER NOT NULL REFERENCES personnage(id),
  donjon_id INTEGER NOT NULL REFERENCES donjon(id),
  etage_max INTEGER NOT NULL DEFAULT 0,
  salle_max INTEGER NOT NULL DEFAULT 0,
  resultat TEXT NOT NULL CHECK (resultat IN ('victoire', 'defaite', 'abandon')),
  date_run TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

PRAGMA user_version = 3;
`,yr=`-- Migration 004 : système de quêtes principales et secondaires
CREATE TABLE IF NOT EXISTS quete (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER NOT NULL REFERENCES personnage(id),
  nom TEXT NOT NULL,
  description TEXT DEFAULT '',
  type TEXT NOT NULL CHECK (type IN ('principale', 'secondaire')),
  exp_recompense INTEGER DEFAULT 0,
  gold_recompense INTEGER DEFAULT 0,
  titre_recompense TEXT DEFAULT NULL,
  date_creation TEXT DEFAULT CURRENT_TIMESTAMP,
  statut TEXT DEFAULT 'en_cours' CHECK (statut IN ('en_cours', 'complete', 'abandonnee'))
);

CREATE TABLE IF NOT EXISTS quete_etape (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quete_id INTEGER NOT NULL REFERENCES quete(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  complete INTEGER DEFAULT 0
);

PRAGMA user_version = 4;
`,Ar="rogue_life",ye="db",qn="save";function Tn(){return new Promise((a,u)=>{const s=indexedDB.open(Ar,1);s.onupgradeneeded=()=>s.result.createObjectStore(ye),s.onsuccess=()=>a(s.result),s.onerror=()=>u(s.error)})}async function Or(){const a=await Tn();return new Promise((u,s)=>{const _=a.transaction(ye,"readonly").objectStore(ye).get(qn);_.onsuccess=()=>u(_.result??null),_.onerror=()=>s(_.error)})}async function Mr(a){const u=await Tn();return new Promise((s,m)=>{const _=u.transaction(ye,"readwrite");_.objectStore(ye).put(a,qn),_.oncomplete=()=>s(),_.onerror=()=>m(_.error)})}let W=null;async function g(){var s,m,_;if(W)return W;(s=navigator.storage)!=null&&s.persist&&await navigator.storage.persist();const a=await vr({locateFile:()=>`${Tr}/sql-wasm.wasm`}),u=await Or();if(u){W=new a.Database(u);const T=((_=(m=W.exec("PRAGMA user_version")[0])==null?void 0:m.values[0])==null?void 0:_[0])??0;T<1&&(W.run(Sr),await w()),T<2&&(W.run(Ir),await w()),T<3&&(W.run(Ur),await w()),T<4&&(W.run(yr),await w())}else W=new a.Database,W.run(wr),W.run("PRAGMA user_version = 1"),await w();return W}async function w(){W&&await Mr(W.export())}function gn(a){return a.replace(/\$\d+/g,"?")}function b(a,u=[]){const s=W.prepare(gn(a)),m=[];for(s.bind(u);s.step();)m.push(s.getAsObject());return s.free(),m}function E(a,u=[]){W.run(gn(a),u)}const Ae={1:{xp:15,gold:8,pv:5},2:{xp:30,gold:15,pv:10},3:{xp:50,gold:25,pv:20}};function gt(a){return a==="cauchemar"?2:a==="hard"?1.5:1}const Rn={pv_combat_max:100,attq:50,attq_spe:50,def:50,def_spe:50,vitesse:50,mana_max:100};async function Cr(a){return await g(),b("SELECT * FROM personnage WHERE id = $1",[a])[0]??null}async function Fr(a){return await g(),b("SELECT * FROM caracteristique WHERE id = $1",[a])[0]??null}async function Dr(){return await g(),b("SELECT * FROM level ORDER BY id")}async function Gr(){return await g(),b("SELECT * FROM titre")}async function $r(a,u){await g(),E("UPDATE personnage SET titre_id = $1 WHERE id = $2",[u,a]),await w()}async function Pr(){return await g(),b("SELECT * FROM stuff")}async function xr(a){return await g(),b("SELECT * FROM inventaire WHERE personnage_id = $1",[a])}const Wr=["arme_1main","arme_2mains","bouclier_1main","bouclier_2mains"],Tt=a=>a.includes("2mains")?2:1;async function Hr(a,u){var _;await g();const m=(_=b("SELECT s.slot FROM inventaire i JOIN stuff s ON s.id = i.stuff_id WHERE i.id = $1",[u])[0])==null?void 0:_.slot;if(m){if(Wr.includes(m)){const T=Tt(m),N=b(`SELECT i.id, s.slot FROM inventaire i
             JOIN stuff s ON s.id = i.stuff_id
             WHERE i.personnage_id = $1 AND i.est_equipe = 1 AND s.slot IN ('arme_1main','arme_2mains','bouclier_1main','bouclier_2mains')`,[a]);let v=N.reduce((R,l)=>R+Tt(l.slot),0);for(const R of N){if(v+T<=2)break;E("UPDATE inventaire SET est_equipe = 0 WHERE id = $1",[R.id]),v-=Tt(R.slot)}}else E(`UPDATE inventaire SET est_equipe = 0
             WHERE personnage_id = $1 AND est_equipe = 1
             AND stuff_id IN (SELECT id FROM stuff WHERE slot = $2)`,[a,m]);E("UPDATE inventaire SET est_equipe = 1 WHERE id = $1",[u]),await w()}}async function Br(a,u){await g();const m=b("SELECT s.slot, s.soin_pv, i.stuff_id FROM inventaire i JOIN stuff s ON s.id = i.stuff_id WHERE i.id = $1",[u])[0];if(!m)return;const _=b("SELECT * FROM personnage WHERE id = $1",[a])[0];if(!_)return;const T=_.mode??"normal";if(T==="hard"||T==="cauchemar")throw new Error("Utilitaires interdits en mode Hard / Cauchemar");m.slot==="consommable"&&m.soin_pv>0?E("UPDATE caracteristique SET pv_vie_actuels = MIN(pv_vie_max, pv_vie_actuels + $1) WHERE id = $2",[m.soin_pv,_.caracteristique_id]):m.slot==="joker"&&E("UPDATE personnage SET jokers_disponibles = jokers_disponibles + 1 WHERE id = $1",[a]),E("UPDATE inventaire SET quantite = quantite - 1 WHERE id = $1",[u]),E("DELETE FROM inventaire WHERE id = $1 AND quantite <= 0",[u]),await w()}async function jr(a){await g(),E("UPDATE inventaire SET est_equipe = 0 WHERE id = $1",[a]),await w()}async function Vr(a,u,s){var v;await g();const m=b("SELECT prix_vente_local FROM magasin_inventaire WHERE magasin_id = $1 AND stuff_id = $2",[u,s]);if(!m[0])throw new Error("Item introuvable dans ce magasin");const _=m[0].prix_vente_local,T=b("SELECT * FROM personnage WHERE id = $1",[a])[0];if(!T)throw new Error("Personnage introuvable");if(T.gold_actuel<_)throw new Error("Or insuffisant");if(((v=b("SELECT slot FROM stuff WHERE id = $1",[s])[0])==null?void 0:v.slot)==="joker"){const R=T.mode??"normal";if(R==="hard"||R==="cauchemar")throw new Error("Jokers interdits en mode Hard / Cauchemar")}E("UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2",[_,a]),E("INSERT OR IGNORE INTO inventaire (personnage_id, stuff_id, quantite, est_equipe) VALUES ($1, $2, 0, 0)",[a,s]),E("UPDATE inventaire SET quantite = quantite + 1 WHERE personnage_id = $1 AND stuff_id = $2",[a,s]),await w()}async function kr(a,u){var _;await g();const s=b("SELECT stuff_id, quantite FROM inventaire WHERE id = $1 AND personnage_id = $2",[u,a])[0];if(!s)throw new Error("Item introuvable");const m=Math.floor((((_=b("SELECT prix_base FROM stuff WHERE id = $1",[s.stuff_id])[0])==null?void 0:_.prix_base)??0)/4);return E("UPDATE personnage SET gold_actuel = gold_actuel + $1 WHERE id = $2",[m,a]),s.quantite<=1?E("DELETE FROM inventaire WHERE id = $1",[u]):E("UPDATE inventaire SET quantite = quantite - 1 WHERE id = $1",[u]),await w(),m}async function Yr(a){return await g(),b("SELECT * FROM magasin_inventaire WHERE magasin_id = $1",[a])}async function Xr(){return await g(),b("SELECT * FROM tache")}async function Kr(a){await g();const u=new Date().toISOString();E(`INSERT INTO tache (nom, type_activite, type, difficulte, exp_recompense, gold_recompense, pv_vie_penalite, duree_jours, date_creation, date_limite)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,[a.nom,a.type_activite,a.type??"ponctuelle",a.difficulte,a.exp_recompense,a.gold_recompense,a.pv_vie_penalite,a.duree_jours??null,u,a.date_limite??null]),await w()}async function zr(a){await g();const u=b("SELECT * FROM tache WHERE id = $1",[a])[0];if(u){if(u.date_creation){const s=(Date.now()-new Date(u.date_creation).getTime())/864e5;if(s<7)throw new Error(`Routine créée il y a ${Math.floor(s)}j — suppression possible après 7 jours`)}E("DELETE FROM tache WHERE id = $1",[a]),await w()}}async function Qr(a,u){await g();const s=b("SELECT * FROM tache WHERE id = $1",[u])[0];if(!s)return;const m=Ae[s.difficulte]??Ae[1],_=b("SELECT * FROM personnage WHERE id = $1",[a])[0],T=gt((_==null?void 0:_.mode)??"normal");E("UPDATE personnage SET experience_actuelle = experience_actuelle + $1, gold_actuel = gold_actuel + $2 WHERE id = $3",[Math.round(m.xp*T),Math.round(m.gold*T),a]),E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)",[a,u,"succes",s.nom]),await w()}async function Oe(a){await g();const u=b("SELECT * FROM personnage WHERE id = $1",[a])[0];u&&(E("UPDATE personnage SET level_id=1, experience_actuelle=0, gold_actuel=50, points_stat_disponibles=0 WHERE id=$1",[a]),E(`UPDATE caracteristique SET
            pv_vie_max=100, pv_vie_actuels=100,
            pv_combat_max=100, pv_combat_actuels=100,
            attq=10, attq_spe=10, def=8, def_spe=8, vitesse=12,
            mana_max=150, mana_actuels=150
         WHERE id=$1`,[u.caracteristique_id]),E("UPDATE personnage SET mode='normal', mode_debut=NULL, dernier_coffre_hebdo=NULL, dernier_coffre_mensuel=NULL WHERE id=$1",[a]),E("DELETE FROM personnage_competence WHERE personnage_id = $1",[a]),E("DELETE FROM competence WHERE source = 'donjon'"),E("DELETE FROM inventaire WHERE personnage_id = $1",[a]),await w())}async function Jr(a,u){await g();const s=Rn[u]??300,m=b("SELECT * FROM personnage WHERE id = $1",[a])[0];if(!m)throw new Error("Personnage introuvable");if(m.gold_actuel<s)throw new Error("Or insuffisant");E("UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2",[s,a]),u==="pv_combat_max"?E("UPDATE caracteristique SET pv_combat_max = pv_combat_max + 5, pv_combat_actuels = pv_combat_actuels + 5 WHERE id = $1",[m.caracteristique_id]):u==="mana_max"?E("UPDATE caracteristique SET mana_max = mana_max + 15, mana_actuels = mana_actuels + 15 WHERE id = $1",[m.caracteristique_id]):E(`UPDATE caracteristique SET ${u} = ${u} + 1 WHERE id = $1`,[m.caracteristique_id]),await w()}async function Zr(a,u){await g();const s=b("SELECT * FROM personnage WHERE id = $1",[a])[0];s&&(E("UPDATE caracteristique SET mana_actuels = MAX(0, MIN(mana_max, $1)) WHERE id = $2",[u,s.caracteristique_id]),await w())}async function ea(a,u){await g();const s=b("SELECT * FROM personnage WHERE id = $1",[a])[0];s&&(E("UPDATE caracteristique SET mana_actuels = MIN(mana_max, mana_actuels + $1) WHERE id = $2",[u,s.caracteristique_id]),await w())}async function ta(a){var v;await g();const u=new Date().toISOString().split("T")[0],s=new Date(Date.now()-864e5).toISOString().split("T")[0],m=b("SELECT * FROM personnage WHERE id = $1",[a])[0];if(!m)return{gameOver:!1};if(m.dernier_check===u)return{gameOver:!1};const _=b("SELECT * FROM tache WHERE type = 'routine' AND (date_creation IS NULL OR date(date_creation) <= $1)",[s]);for(const R of _)if(b("SELECT id FROM historique_activite WHERE personnage_id = $1 AND tache_id = $2 AND statut IN ('succes', 'penalite') AND date(date_action) = $3",[a,R.id,s]).length===0){const K=m.mode??"normal";if(K==="cauchemar")return E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'penalite', $3)",[a,R.id,R.nom]),E("UPDATE personnage SET dernier_check = $1 WHERE id = $2",[u,a]),await w(),await Oe(a),{gameOver:!0};if(K==="hard"||m.jokers_disponibles<=0){const A=(Ae[R.difficulte]??Ae[1]).pv;E("UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2",[A,m.caracteristique_id]),E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'penalite', $3)",[a,R.id,R.nom])}else E("UPDATE personnage SET jokers_disponibles = jokers_disponibles - 1 WHERE id = $1",[a]),m.jokers_disponibles--,E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'joker', $3)",[a,R.id,R.nom])}const T=b("SELECT * FROM tache WHERE type = 'ponctuelle'");for(const R of T){let l=null;if(R.date_limite)l=R.date_limite;else if(R.date_creation&&R.duree_jours){const A=new Date(R.date_creation);A.setDate(A.getDate()+R.duree_jours),l=A.toISOString().split("T")[0]}if(!l||l>=u)continue;b("SELECT id FROM historique_activite WHERE personnage_id = $1 AND tache_id = $2 AND statut IN ('succes', 'expire')",[a,R.id]).length===0&&(E("UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2",[R.pv_vie_penalite,m.caracteristique_id]),E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'expire', $3)",[a,R.id,R.nom]))}return E("UPDATE personnage SET dernier_check = $1 WHERE id = $2",[u,a]),(((v=b("SELECT pv_vie_actuels FROM caracteristique WHERE id = $1",[m.caracteristique_id])[0])==null?void 0:v.pv_vie_actuels)??1)<=0?(await w(),await Oe(a),{gameOver:!0}):(await w(),{gameOver:!1})}async function na(a,u){await g();const s=b("SELECT * FROM tache WHERE id = $1",[u])[0];if(!s)return;const m=b("SELECT * FROM personnage WHERE id = $1",[a])[0],_=gt((m==null?void 0:m.mode)??"normal");E("UPDATE personnage SET experience_actuelle = experience_actuelle + $1, gold_actuel = gold_actuel + $2 WHERE id = $3",[Math.round(s.exp_recompense*_),Math.round(s.gold_recompense*_),a]),E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)",[a,u,"complete",s.nom]),E("UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1",[u]),E("DELETE FROM tache WHERE id = $1",[u]),await w()}async function ra(a,u){var T;await g();const s=b("SELECT * FROM tache WHERE id = $1",[u])[0];if(!s)return{gameOver:!1};const m=b("SELECT * FROM personnage WHERE id = $1",[a])[0];return m?(m.mode??"normal")==="cauchemar"?(E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)",[a,u,"echec",s.nom]),E("UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1",[u]),E("DELETE FROM tache WHERE id = $1",[u]),await w(),await Oe(a),{gameOver:!0}):(E("UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2",[s.pv_vie_penalite,m.caracteristique_id]),E("INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)",[a,u,"echec",s.nom]),E("UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1",[u]),E("DELETE FROM tache WHERE id = $1",[u]),(((T=b("SELECT pv_vie_actuels FROM caracteristique WHERE id = $1",[m.caracteristique_id])[0])==null?void 0:T.pv_vie_actuels)??1)<=0?(await w(),await Oe(a),{gameOver:!0}):(await w(),{gameOver:!1})):{gameOver:!1}}async function Rt(a){await g();const u=b("SELECT id, date_creation FROM tache WHERE type = 'routine'",[]);if(u.length===0)return{actuel:0,record:0};const s=b(`SELECT DISTINCT date(h.date_action) as jour
         FROM historique_activite h
         WHERE h.personnage_id = $1 AND h.statut = 'succes'
         AND date(h.date_action) NOT IN (
             SELECT DISTINCT date(date_action)
             FROM historique_activite
             WHERE personnage_id = $1 AND statut = 'penalite'
         )
         ORDER BY jour DESC`,[a]),m=[];for(const{jour:A}of s){const D=u.filter(te=>!te.date_creation||te.date_creation.slice(0,10)<=A);if(D.length===0)continue;const fe=b(`SELECT tache_id FROM historique_activite
             WHERE personnage_id = $1 AND statut = 'succes' AND date(date_action) = $2
             AND tache_id IN (SELECT id FROM tache WHERE type = 'routine')`,[a,A]),Te=new Set(fe.map(te=>te.tache_id));D.every(te=>Te.has(te.id))&&m.push(A)}if(m.length===0)return{actuel:0,record:0};const _=new Date().toISOString().split("T")[0],T=new Date(Date.now()-864e5).toISOString().split("T")[0],N=[...m].sort((A,D)=>D.localeCompare(A));let v=0;if(N[0]===_||N[0]===T){let A=N[0];v=1;for(let D=1;D<N.length;D++){const fe=new Date(new Date(A).getTime()-864e5).toISOString().split("T")[0];if(N[D]===fe)v++,A=N[D];else break}}let R=0,l=1;const K=[...m].sort();for(let A=1;A<K.length;A++){const D=new Date(new Date(K[A-1]).getTime()+864e5).toISOString().split("T")[0];K[A]===D?(l++,R=Math.max(R,l)):l=1}return R=Math.max(R,l,v),{actuel:v,record:R}}async function aa(a){return await g(),b("SELECT * FROM historique_activite WHERE personnage_id = $1 ORDER BY date_action DESC",[a])}async function ia(){return await g(),b("SELECT * FROM competence WHERE source != 'donjon' OR source IS NULL ORDER BY prix_boutique ASC")}async function ua(){return await g(),b("SELECT * FROM competence WHERE source = 'donjon' ORDER BY rarete ASC")}async function oa(a){return await g(),b(`SELECT pc.id, pc.personnage_id, pc.competence_id, pc.est_equipee,
                c.id as comp_id, c.nom, c.description, c.type, c.effet_type,
                c.puissance, c.effet_secondaire,
                c.valeur, c.duree_tours, c.rarete, c.prix_boutique,
                c.element, c.source, c.cout_mana
         FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1`,[a]).map(s=>({id:s.id,personnage_id:s.personnage_id,competence_id:s.competence_id,est_equipee:!!s.est_equipee,competence:{id:s.comp_id,nom:s.nom,description:s.description,type:s.type,effet_type:s.effet_type,puissance:s.puissance??0,effet_secondaire:s.effet_secondaire??null,valeur:s.valeur,duree_tours:s.duree_tours,rarete:s.rarete,prix_boutique:s.prix_boutique,element:s.element??"neutre",source:s.source??"boutique",cout_mana:s.cout_mana??0}}))}async function sa(a,u){await g();const s=b("SELECT * FROM personnage WHERE id = $1",[a])[0];if(!s)throw new Error("Personnage introuvable");const m=b("SELECT * FROM competence WHERE id = $1",[u])[0];if(!m)throw new Error("Compétence introuvable");if(s.gold_actuel<m.prix_boutique)throw new Error("Or insuffisant");if(b("SELECT * FROM personnage_competence WHERE personnage_id = $1 AND competence_id = $2",[a,u]).length>0)throw new Error("Compétence déjà possédée");E("UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2",[m.prix_boutique,a]),E("INSERT INTO personnage_competence (personnage_id, competence_id, est_equipee) VALUES ($1, $2, 0)",[a,u]),await w()}async function ca(a,u){if(await g(),b("SELECT COUNT(*) as cnt FROM personnage_competence WHERE personnage_id = $1 AND est_equipee = 1",[a])[0].cnt>=6)throw new Error("Maximum 6 compétences équipées");E("UPDATE personnage_competence SET est_equipee = 1 WHERE id = $1",[u]),await w()}async function la(a){await g(),E("UPDATE personnage_competence SET est_equipee = 0 WHERE id = $1",[a]),await w()}async function ma(a,u,s){await g(),u==="stuff"?(E("INSERT OR IGNORE INTO inventaire (personnage_id, stuff_id, quantite, est_equipe) VALUES ($1, $2, 0, 0)",[a,s]),E("UPDATE inventaire SET quantite = quantite + 1 WHERE personnage_id = $1 AND stuff_id = $2",[a,s])):b("SELECT * FROM personnage_competence WHERE personnage_id = $1 AND competence_id = $2",[a,s]).length===0&&E("INSERT INTO personnage_competence (personnage_id, competence_id, est_equipee) VALUES ($1, $2, 0)",[a,s]),await w()}async function da(a){await g();const u=b("SELECT * FROM personnage WHERE id = $1",[a])[0];u&&(E("UPDATE caracteristique SET pv_combat_actuels = pv_combat_max, mana_actuels = mana_max WHERE id = $1",[u.caracteristique_id]),await w())}async function pa(a,u){await g();const s=b("SELECT * FROM personnage WHERE id = $1",[a])[0];s&&(E("UPDATE caracteristique SET pv_combat_actuels = MAX(0, $1) WHERE id = $2",[u,s.caracteristique_id]),await w())}async function Ea(a){await g();let u=0,s=0;for(;;){const m=b("SELECT * FROM personnage WHERE id = $1",[a])[0];if(!m)break;const _=b("SELECT * FROM level WHERE id = $1",[m.level_id])[0];if(!_||m.experience_actuelle<_.exp_max_requise||m.level_id>=10)break;E("UPDATE personnage SET level_id = $1, points_stat_disponibles = points_stat_disponibles + 5 WHERE id = $2",[m.level_id+1,a]),u++,s+=5}return u>0&&await w(),{levels_gagnes:u,points_gagnes:s}}async function fa(a,u){await g();const s=b("SELECT * FROM personnage WHERE id = $1",[a])[0];!s||(s.points_stat_disponibles??0)<=0||(E("UPDATE personnage SET points_stat_disponibles = points_stat_disponibles - 1 WHERE id = $1",[a]),u==="pv_combat_max"?E("UPDATE caracteristique SET pv_combat_max = pv_combat_max + 5, pv_combat_actuels = pv_combat_actuels + 5 WHERE id = $1",[s.caracteristique_id]):u==="mana_max"?E("UPDATE caracteristique SET mana_max = mana_max + 15, mana_actuels = mana_actuels + 15 WHERE id = $1",[s.caracteristique_id]):E(`UPDATE caracteristique SET ${u} = ${u} + 1 WHERE id = $1`,[s.caracteristique_id]),await w())}async function _a(a){var m;await g(),E("UPDATE personnage SET compteur_loot_donjon = COALESCE(compteur_loot_donjon, 0) + 1 WHERE id = $1",[a]);const u=((m=b("SELECT compteur_loot_donjon FROM personnage WHERE id = $1",[a])[0])==null?void 0:m.compteur_loot_donjon)??1;if(await w(),u%50===0)return"legendaire";const s=Math.floor((u-1)/3)%3;return["peu_commun","rare","epique"][s]}async function ba(a){await g();try{return b("SELECT * FROM personnage_affinite WHERE personnage_id = $1",[a])}catch{return[]}}async function ha(a,u){await g();const s=b("SELECT * FROM personnage WHERE id = $1",[a])[0];if(!s)return;const m=s.mode??"normal",_={normal:0,hard:1,cauchemar:2};if(_[u]<_[m]&&s.mode_debut){const v=(Date.now()-new Date(s.mode_debut).getTime())/864e5;if(v<3)throw new Error(`Mode actif depuis ${Math.floor(v)}j — retour possible après 3 jours`)}const T=new Date().toISOString().split("T")[0],N=u!=="normal"?m!=="normal"?s.mode_debut:T:null;E("UPDATE personnage SET mode = $1, mode_debut = $2 WHERE id = $3",[u,N,a]),await w()}async function qa(a){await g();const u=b("SELECT * FROM personnage WHERE id = $1",[a])[0];if(!u||(u.mode??"normal")==="normal")return{hebdo:null,mensuel:null};const s=u.mode,m=Date.now(),_=u.mode_debut?new Date(u.mode_debut).getTime():m,T=new Date().toISOString().split("T")[0];let N=null,v=null;const R=u.dernier_coffre_mensuel?new Date(u.dernier_coffre_mensuel).getTime():_;m-R>=30*864e5&&(v=s==="cauchemar"?"legendaire":"epique",E("UPDATE personnage SET dernier_coffre_mensuel = $1 WHERE id = $2",[T,a]));const l=u.dernier_coffre_hebdo?new Date(u.dernier_coffre_hebdo).getTime():_;return m-l>=7*864e5&&(N=s==="cauchemar"?"epique":"rare",E("UPDATE personnage SET dernier_coffre_hebdo = $1 WHERE id = $2",[T,a])),(N||v)&&await w(),{hebdo:N,mensuel:v}}async function Ta(a,u){await g(),E("UPDATE personnage SET nom = $1 WHERE id = $2",[u.trim(),a]),await w()}async function ga(a,u){await g(),E("UPDATE personnage SET avatar = $1 WHERE id = $2",[u,a]),await w()}async function Ra(a){await g();const u=b(`SELECT h.statut, t.type as type_tache, COUNT(*) as cnt
         FROM historique_activite h
         LEFT JOIN tache t ON t.id = h.tache_id
         WHERE h.personnage_id = $1
         GROUP BY h.statut, t.type`,[a]);let s=0,m=0,_=0,T=0;for(const N of u)N.statut==="succes"&&N.type_tache==="routine"?_+=N.cnt:N.statut==="succes"?s+=N.cnt:N.statut==="echec"?m+=N.cnt:N.statut==="penalite"&&(T+=N.cnt);return{taches_succes:s,taches_echec:m,routines_faites:_,penalites:T}}async function Na(a){var v;await g();const u=b("SELECT * FROM personnage WHERE id = $1",[a])[0];if(!u)return;if((((v=b(`SELECT COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 AND c.rarete = 'legendaire'`,[a])[0])==null?void 0:v.cnt)??0)>=3){await X(u,30);return}if(u.gold_actuel>=5e3){await X(u,29);return}const{actuel:m}=await Rt(a);if(m>=365){await X(u,28);return}if(m>=180){await X(u,27);return}if(m>=30){await X(u,26);return}if(m>=14){await X(u,25);return}if(m>=7){await X(u,24);return}const _=b(`SELECT c.element, COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 GROUP BY c.element`,[a]),T={feu:14,eau:15,terre:16,air:17,technologie:18,surnaturel:19,mort:20,vie:21,lumiere:22,tenebres:23},N={feu:4,eau:5,terre:6,air:7,technologie:8,surnaturel:9,mort:10,vie:11,lumiere:12,tenebres:13};for(const R of _)if((R.cnt??0)>=10&&T[R.element]){await X(u,T[R.element]);return}for(const R of _)if((R.cnt??0)>=5&&N[R.element]){await X(u,N[R.element]);return}if(u.level_id>=5){await X(u,3);return}if(u.level_id>=3){await X(u,2);return}await X(u,1)}async function La(a){var A;await g();const u=b("SELECT * FROM personnage WHERE id = $1",[a])[0];if(!u)return[1];const s=[1];u.level_id>=3&&s.push(2),u.level_id>=5&&s.push(3),u.gold_actuel>=5e3&&s.push(29);const{actuel:m,record:_}=await Rt(a),T=Math.max(m,_);T>=7&&s.push(24),T>=14&&s.push(25),T>=30&&s.push(26),T>=180&&s.push(27),T>=365&&s.push(28);const N=b(`SELECT c.element, COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 GROUP BY c.element`,[a]),v={feu:4,eau:5,terre:6,air:7,technologie:8,surnaturel:9,mort:10,vie:11,lumiere:12,tenebres:13},R={feu:14,eau:15,terre:16,air:17,technologie:18,surnaturel:19,mort:20,vie:21,lumiere:22,tenebres:23};for(const D of N)(D.cnt??0)>=5&&v[D.element]&&s.push(v[D.element]),(D.cnt??0)>=10&&R[D.element]&&s.push(R[D.element]);(((A=b(`SELECT COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 AND c.rarete = 'legendaire'`,[a])[0])==null?void 0:A.cnt)??0)>=3&&s.push(30);const K=b("SELECT id FROM titre WHERE id > 30");for(const D of K)s.push(D.id);return s}async function X(a,u){a.titre_id!==u&&(E("UPDATE personnage SET titre_id = $1 WHERE id = $2",[u,a.id]),await w())}async function va(a,u=[]){return await g(),b(a,u)}async function wa(a,u=[]){await g(),E(a,u),await w()}async function Sa(a){await g();const u=b("SELECT * FROM quete WHERE personnage_id = $1 AND statut = 'en_cours' ORDER BY type DESC, date_creation ASC",[a]);for(const s of u)s.etapes=b("SELECT * FROM quete_etape WHERE quete_id = $1 ORDER BY id",[s.id]);return u}async function Ia(a,u){await g(),E(`INSERT INTO quete (personnage_id, nom, description, type, exp_recompense, gold_recompense, titre_recompense, date_creation)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,[a.personnage_id,a.nom,a.description,a.type,a.exp_recompense,a.gold_recompense,a.titre_recompense??null,new Date().toISOString()]);const s=b("SELECT last_insert_rowid() as id")[0].id;for(const m of u)E("INSERT INTO quete_etape (quete_id, nom) VALUES ($1,$2)",[s,m]);await w()}async function Ua(a,u){await g();const s=b("SELECT * FROM quete_etape WHERE id = $1",[a])[0];if(!s||s.complete)return;const m=b("SELECT * FROM quete WHERE id = $1",[s.quete_id])[0];if(!m)return;const _=b("SELECT COUNT(*) as n FROM quete_etape WHERE quete_id = $1",[m.id])[0].n,T=Math.round(m.exp_recompense*.5/_),N=Math.round(m.gold_recompense*.5/_);E("UPDATE quete_etape SET complete = 1 WHERE id = $1",[a]),E("UPDATE personnage SET experience_actuelle = experience_actuelle + $1, gold_actuel = gold_actuel + $2 WHERE id = $3",[T,N,u]),await w()}async function ya(a,u){await g();const s=b("SELECT * FROM quete WHERE id = $1",[a])[0];if(!s)return;const _=b("SELECT COUNT(*) as n FROM quete_etape WHERE quete_id = $1",[a])[0].n>0?.5:1,T=Math.round(s.exp_recompense*_),N=Math.round(s.gold_recompense*_);if(E("UPDATE personnage SET experience_actuelle = experience_actuelle + $1, gold_actuel = gold_actuel + $2 WHERE id = $3",[T,N,u]),s.titre_recompense){E("INSERT INTO titre (nom, bonus_stat) VALUES ($1, 'aucun')",[s.titre_recompense]);const v=b("SELECT last_insert_rowid() as id")[0].id;E("UPDATE personnage SET titre_id = $1 WHERE id = $2",[v,u])}E("UPDATE quete SET statut = 'complete' WHERE id = $1",[a]),await w()}async function Aa(a){await g(),E("UPDATE quete SET statut = 'abandonnee' WHERE id = $1",[a]),await w()}async function Oa(a,u){await g(),E("INSERT INTO quete_etape (quete_id, nom) VALUES ($1,$2)",[a,u.trim()]),await w()}const $a=Object.freeze(Object.defineProperty({__proto__:null,ROUTINE_STATS:Ae,STAT_SHOP_PRIX:Rn,_classesRun:wa,_classesSelect:va,abandonnerQuete:Aa,acheterCompetence:sa,acheterItem:Vr,acheterStat:Jr,ajouterEtapeQuete:Oa,ajouterRecompenseDonjon:ma,allouerStat:fa,calculerEtAttribuerTitre:Na,calculerStreak:Rt,calculerTitresDebloques:La,changerAvatar:ga,changerMode:ha,changerTitre:$r,checkDailyPenalties:ta,checkLevelUp:Ea,checkModeCoffres:qa,completerEtape:Ua,completerQuete:ya,completerRoutine:Qr,completerTache:na,createQuete:Ia,createTache:Kr,desequiperCompetence:la,desequiperItem:jr,echouerTache:ra,equiperCompetence:ca,equiperItem:Hr,gameOver:Oe,getCaracteristique:Fr,getCompetences:ia,getCompetencesDonjon:ua,getHistoriqueActivite:aa,getInventaire:xr,getLevels:Dr,getMagasinInventaire:Yr,getModeMultiplier:gt,getPersonnage:Cr,getPersonnageAffinites:ba,getPersonnageCompetences:oa,getQuetes:Sa,getStatsResume:Ra,getStuffs:Pr,getTaches:Xr,getTitres:Gr,incrementerLootDonjon:_a,regenMana:ea,renommerPersonnage:Ta,resetPvCombat:da,supprimerRoutine:zr,updateManaActuels:Zr,updatePvCombat:pa,utiliserConsommable:Br,vendreItem:kr},Symbol.toStringTag,{value:"Module"}));export{_a as $,ca as A,Yr as B,ia as C,sa as D,Vr as E,Ra as F,aa as G,qa as H,Xr as I,Sa as J,ua as K,ma as L,Ia as M,Kr as N,na as O,Ea as P,ra as Q,Ae as R,Rn as S,zr as T,Qr as U,ya as V,Aa as W,Oa as X,Ua as Y,ta as Z,va as _,wa as a,pa as a0,Zr as a1,ea as a2,da as a3,$a as a4,Gr as b,Na as c,La as d,Rt as e,Fr as f,Cr as g,Dr as h,xr as i,Pr as j,ba as k,$r as l,ga as m,Jr as n,ha as o,Oe as p,fa as q,Ta as r,Ga as s,Da as t,oa as u,Br as v,jr as w,Hr as x,kr as y,la as z};

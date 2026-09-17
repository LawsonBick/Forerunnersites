import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync('src/components/conversion-tracking.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
let listener,cleanup;const events=[];
class Element { constructor(href){this.href=new URL(href,'http://localhost').href;this.raw=href;}closest(selector){return selector==='a[href]'?this:null;}getAttribute(){return this.raw;} }
const sandbox={exports:{},require:()=>({useEffect:(effect)=>{cleanup=effect();}}),Element,URL,document:{addEventListener:(name,fn)=>{listener=fn;},removeEventListener:(name,fn)=>{assert.equal(fn,listener);listener=null;}},window:{location:{origin:'http://localhost',pathname:'/restaurant-web-design'},gtag:(...args)=>events.push(args)}};
vm.runInNewContext(code,sandbox);sandbox.exports.ConversionTracking();
for(const [path,href,expected] of [['/restaurant-web-design','/contact','primary_cta_click'],['/pricing','/contact?package=growth','pricing_cta_click'],['/work/manuels','/contact','case_study_cta_click'],['/','mailto:hello@forerunnersites.com','email_click'],['/','tel:+15555555555','phone_click'],['/','/work',null],['/','https://example.com/contact',null]]){
 sandbox.window.location.pathname=path;const count=events.length;listener({target:new Element(href)});assert.equal(events.length-count,expected?1:0);if(expected)assert.equal(events.at(-1)[1],expected);
}
assert(!JSON.stringify(events).includes('hello@'));assert(!JSON.stringify(events).includes('155555'));assert(!JSON.stringify(events).includes('?package'));
cleanup();assert.equal(listener,null);console.log('PASS: exclusive CTA classification, email/phone privacy, unrelated-link exclusion, listener cleanup. No analytics transmitted.');

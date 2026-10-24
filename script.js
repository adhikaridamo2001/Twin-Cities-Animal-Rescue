'use strict';
const opportunities = [
  {id:'volunteer',label:'Volunteer',description:'Help with events, animal care, and community support.'},
  {id:'foster',label:'Foster',description:'Offer a temporary home while a pet waits for adoption.'},
  {id:'adoption',label:'Adoption information',description:'Learn about finding a pet who fits your household.'}
];
const storageKeys = {interest:'tcar-interest',name:'tcar-name'};
function safelyRead(key){try{return localStorage.getItem(key)||''}catch{return ''}}
function safelySave(key,value){try{localStorage.setItem(key,value)}catch{}}
function selectOpportunity(id){
  const item=opportunities.find(entry=>entry.id===id);
  if(!item)return;
  document.querySelectorAll('.choice-button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.id===id)));
  document.getElementById('choice-result').textContent=`Your choice: ${item.label}. ${item.description}`;
  const select=document.getElementById('interest-type');
  if(select)select.value=id;
  safelySave(storageKeys.interest,id);
}
function renderOpportunities(){
  const area=document.getElementById('opportunity-options');
  if(!area)return;
  opportunities.forEach(item=>{
    const button=document.createElement('button');
    button.type='button';button.className='choice-button';button.dataset.id=item.id;
    button.setAttribute('aria-pressed','false');button.textContent=item.label;
    button.addEventListener('click',()=>selectOpportunity(item.id));area.appendChild(button);
  });
  const previous=safelyRead(storageKeys.interest);
  if(opportunities.some(item=>item.id===previous))selectOpportunity(previous);
}
function showError(field,message){
  const target=document.getElementById(`${field.id}-error`);
  if(target)target.textContent=message;
  field.classList.toggle('invalid',Boolean(message));
  field.setAttribute('aria-invalid',String(Boolean(message)));
}
function validateField(field){
  const value=field.value.trim();
  let error='';
  if(field.required&&!value)error='Please complete this field.';
  else if(field.id==='full-name'&&value.length<2)error='Please enter at least 2 characters.';
  else if(field.id==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))error='Please enter a valid email address.';
  else if(field.tagName==='TEXTAREA'&&value.length<10)error='Please write at least 10 characters.';
  showError(field,error);return !error;
}
function setupForm(){
  const form=document.getElementById('interest-form');if(!form)return;
  form.noValidate=true;
  const name=document.getElementById('full-name');
  name.value=safelyRead(storageKeys.name);
  name.addEventListener('input',()=>safelySave(storageKeys.name,name.value));
  const fields=[...form.querySelectorAll('input,select,textarea')];
  fields.forEach(field=>{field.addEventListener('input',()=>validateField(field));field.addEventListener('change',()=>validateField(field))});
  document.getElementById('interest-type').addEventListener('change',event=>{if(event.target.value)selectOpportunity(event.target.value)});
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const valid=fields.map(validateField).every(Boolean);
    const status=document.getElementById('form-status');
    status.textContent=valid?'Your details look good. This is a demonstration form; nothing has been sent.':'Please correct the highlighted fields before continuing.';
    if(!valid)fields.find(field=>field.getAttribute('aria-invalid')==='true')?.focus();
  });
}
document.addEventListener('DOMContentLoaded',()=>{renderOpportunities();setupForm()});

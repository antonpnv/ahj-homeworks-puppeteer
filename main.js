!function(){"use strict";function t(t,e){t.textContent=e}class e{constructor(){this.cardInput=document.querySelector(".input"),this.validationMessage=document.querySelector(".validation-message"),this.cardLogos=document.querySelectorAll(".card-logo"),this.handleCardInput=this.handleCardInput.bind(this),this.validateCard=this.validateCard.bind(this)}isValidCardNumber(t){const e=t.replace(/\s/g,"");if(!/^\d{13,19}$/.test(e))return!1;const s=Array.from(e,Number).reverse();for(let t=1;t<s.length;t+=2)s[t]*=2,s[t]>9&&(s[t]-=9);return s.reduce(((t,e)=>t+e),0)%10==0}getCardType(t){const e=t.substr(0,16),s=e.charAt(0);return/^4/.test(s)?"VISA":/^5/.test(s)?"MASTERCARD":/^2/.test(s)?"MIR":/^6/.test(s)?"MAESTRO":/^3[47]/.test(e)?"AMERICAN_EXPRESS":"Unknown"}validateCard(e){e.preventDefault();const s=this.cardInput.value.replace(/\s/g,"");if(this.isValidCardNumber(s)){const e=`Карта действительна. Тип: ${this.getCardType(s)}`;t(this.validationMessage,e)}else t(this.validationMessage,"Недействительный номер карты. Пожалуйста, проверьте ещё раз.")}updateCardLogoVisibility(t){const e=this.getCardType(t);this.cardLogos.forEach((t=>{t.classList.contains(e)?t.style.filter="brightness(100%)":t.style.filter="brightness(35%)"}))}handleCardInput(){const t=this.cardInput.value.replace(/\s/g,"");""===t.trim()?(this.validationMessage.textContent="",this.cardLogos.forEach((t=>{t.style.filter="brightness(100%)"}))):this.updateCardLogoVisibility(t)}}document.addEventListener("DOMContentLoaded",(()=>{const t=new e;document.querySelector(".input").addEventListener("input",t.handleCardInput.bind(t)),document.querySelector(".button").addEventListener("click",t.validateCard.bind(t))}))}();
//# sourceMappingURL=main.js.map
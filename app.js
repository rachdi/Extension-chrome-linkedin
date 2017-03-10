(function() {

	"use strict"

	var app = {

		XPathName: "/html/body//h1[contains(@class, 'name')]",
		XPathHeadline: "/html/body//h2[contains(@class, 'headline')]",
		XPathCompetences: "/html/body//span[contains(@class, 'pv-skill-entity__skill-name')]",
		XPathTab: [],
		tab: [],

		init: function() {
			this.getData();
		},

		getData: function() {

			this.XPathTab.push(this.XPathName, this.XPathHeadline, this.XPathCompetences);
			
			chrome.runtime.onMessage.addListener(
				function(request, sender, sendResponse) {

					app.triggerClick();
					app.tab = [];

					//récupération des autres éléments avec le XPath
					app.XPathTab.forEach(function(element) {
						var headings = document.evaluate(element, document, null, XPathResult.ANY_TYPE, null);

						var thisHeading = headings.iterateNext(); 
						var element = "";
						while (thisHeading) {
							element += thisHeading.textContent + "\n";
							thisHeading = headings.iterateNext();
						}
						
						app.tab.push(element);

					});


					//récupération lien linkedin et tél séparément car class identique indifféreciable avec le Xpath
					var allDiv = document.querySelectorAll('div.pv-contact-info__contact-item');
					
					if (allDiv[1] == undefined) {

						var linkedin = allDiv[0].innerHTML;
						app.tab.push(linkedin, "Pas de téléphone");

					} else {

						var linkedin = allDiv[0].innerHTML;
						var tel = allDiv[1].innerHTML;
						app.tab.push(linkedin, tel);
					}


					//récupération email
					var allSpan = document.querySelectorAll('span.pv-contact-info__contact-item');
					
					if (allSpan[0] == undefined) {

						app.tab.push("Pas d'email");

					} else {

						var email = allSpan[0].innerHTML;	
						app.tab.push(email);
					}


					//envoi du tableau contenant les informations vers popup.js
					sendResponse(app.tab);
				}
				);
		},

		triggerClick: function() {
			var btnContact = document.querySelector('.contact-see-more-less');
			// var btnPdf = document.querySelector('pv-top-card-overflow__trigger');

			var event = document.createEvent('MouseEvent');
				// btnPdf.dispatchEvent(event);


			event.initEvent('click', true, true);
			btnContact.dispatchEvent(event);

			window.setTimeout(function() {
				event.initEvent('click', true, true);
				btnContact.dispatchEvent(event);
			}, 100);
		},
	}
	
	document.addEventListener("DOMContentLoaded", app.init());

})();
